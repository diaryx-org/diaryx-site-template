import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";

function toYaml(data: Record<string, unknown>): string {
  const lines: string[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value === null) continue;
    if (value instanceof Date) {
      lines.push(`${key}: ${value.toISOString()}`);
    } else if (Array.isArray(value)) {
      if (value.length === 0) {
        lines.push(`${key}: []`);
      } else {
        lines.push(`${key}:`);
        for (const item of value) {
          lines.push(`  - ${String(item)}`);
        }
      }
    } else {
      lines.push(`${key}: ${String(value)}`);
    }
  }
  return lines.join("\n");
}

export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await getCollection("diaryx");
  return entries.map((entry) => ({
    params: { path: entry.id },
    props: { entry },
  }));
};

export const GET: APIRoute = ({ props }) => {
  const { entry } = props;
  const frontmatter = toYaml(entry.data as Record<string, unknown>);
  const content = `---\n${frontmatter}\n---\n\n${entry.body}`;
  return new Response(content, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
