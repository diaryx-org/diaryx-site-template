/**
 * Custom Astro content loader that uses @diaryx/wasm-node to parse
 * workspace files. This makes diaryx_core the single source of truth
 * for frontmatter parsing.
 *
 * Astro still handles markdown-to-HTML rendering via its remark/rehype pipeline.
 */
import type { Loader, LoaderContext } from "astro/loaders";
import { resolve, relative, join, dirname } from "node:path";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

interface DiaryxLoaderOptions {
  /** Path to workspace/content directory. Defaults to DIARYX_CONTENT_PATH env or ./src/content/diaryx */
  base?: string;
}

interface ExecuteResponse {
  type: string;
  data?: Record<string, unknown>;
}

/** ISO 8601 date pattern: YYYY-MM-DD with optional time component */
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}(T[\d:.]+)?/;

/**
 * Recursively walk an object and convert date-like strings to Date objects.
 * Needed because diaryx dumps dates as ISO strings, but Astro's
 * Zod schema expects Date objects for z.date() fields.
 */
function reviveDates(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string" && ISO_DATE_RE.test(value)) {
      const d = new Date(value);
      result[key] = isNaN(d.getTime()) ? value : d;
    } else if (Array.isArray(value)) {
      result[key] = value.map((item) =>
        typeof item === "object" && item !== null
          ? reviveDates(item as Record<string, unknown>)
          : item,
      );
    } else if (typeof value === "object" && value !== null) {
      result[key] = reviveDates(value as Record<string, unknown>);
    } else {
      result[key] = value;
    }
  }
  return result;
}

/** Recursively collect all .md files under a directory, returning relative and absolute paths. */
function collectMdFiles(
  dir: string,
  baseDir: string,
): Array<{ relativePath: string; absolutePath: string }> {
  const results: Array<{ relativePath: string; absolutePath: string }> = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    // Skip underscore/dot folders (same as glob loader pattern)
    if (entry.name.startsWith("_") || entry.name.startsWith(".")) continue;
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectMdFiles(fullPath, baseDir));
    } else if (entry.name.endsWith(".md")) {
      results.push({
        relativePath: relative(baseDir, fullPath),
        absolutePath: fullPath,
      });
    }
  }
  return results;
}

/** Load all .md files from disk into the WASM in-memory filesystem. */
async function loadFilesIntoBackend(
  contentPath: string,
  backend: { execute: (cmd: string) => Promise<string> },
): Promise<void> {
  const files = collectMdFiles(contentPath, contentPath);
  for (const { relativePath, absolutePath } of files) {
    const content = readFileSync(absolutePath, "utf-8");
    await backend.execute(
      JSON.stringify({
        type: "WriteFile",
        params: { path: relativePath, content },
      }),
    );
  }
}

export function diaryxLoader(options: DiaryxLoaderOptions = {}): Loader {
  return {
    name: "diaryx-loader",

    async load(context: LoaderContext) {
      const {
        store,
        parseData,
        generateDigest,
        renderMarkdown,
        logger,
        watcher,
        config,
      } = context;

      const base =
        options.base ??
        process.env.DIARYX_CONTENT_PATH ??
        "./src/content/diaryx";
      const contentPath = resolve(fileURLToPath(config.root), base);

      // Init WASM + in-memory backend
      // @diaryx/wasm-node is built with wasm-pack --target web (ESM).
      // In Node.js we load the .wasm bytes from disk and use initSync.
      const wasm = await import("@diaryx/wasm-node");
      const require = createRequire(import.meta.url);
      const wasmPath = join(
        dirname(require.resolve("@diaryx/wasm-node")),
        "diaryx_wasm_bg.wasm",
      );
      const wasmBytes = readFileSync(wasmPath);
      wasm.initSync({ module: wasmBytes });
      const backend = wasm.DiaryxBackend.createInMemory();

      // Load all .md files from disk into in-memory FS
      await loadFilesIntoBackend(contentPath, backend);

      // Collect files and process each
      const files = collectMdFiles(contentPath, contentPath);

      store.clear();

      for (const { relativePath, absolutePath } of files) {
        // Get entry via WASM (parses frontmatter with diaryx_core)
        const entryResult: ExecuteResponse = JSON.parse(
          await backend.execute(
            JSON.stringify({
              type: "GetEntry",
              params: { path: relativePath },
            }),
          ),
        );

        if (entryResult.type !== "Entry" || !entryResult.data) continue;

        const { frontmatter, content } = entryResult.data as {
          frontmatter: Record<string, unknown>;
          content: string;
        };

        const id = relativePath.replace(/\.md$/, "");
        const data = reviveDates(frontmatter);

        const parsedData = await parseData({
          id,
          data,
          filePath: absolutePath,
        });

        const body = (content as string) ?? "";
        const digest = generateDigest(body);

        const rendered = await renderMarkdown(body, {
          fileURL: new URL(`file://${absolutePath}`),
        });

        store.set({
          id,
          data: parsedData,
          body,
          filePath: relative(fileURLToPath(config.root), absolutePath),
          digest,
          rendered,
        });
      }

      logger.info(`Loaded ${files.length} entries via @diaryx/wasm-node`);

      // Dev mode file watching
      if (watcher) {
        watcher.add(contentPath);
        let timeout: ReturnType<typeof setTimeout> | null = null;
        const debouncedReload = () => {
          if (timeout) clearTimeout(timeout);
          timeout = setTimeout(() => this.load(context), 300);
        };
        for (const event of ["change", "add", "unlink"] as const) {
          watcher.on(event, (path: string) => {
            if (path.startsWith(contentPath) && path.endsWith(".md"))
              debouncedReload();
          });
        }
      }
    },
  };
}
