/**
 * Remark plugin to transform .md links to website paths.
 * This allows markdown files to use portable .md links for local editing
 * while automatically converting them to web paths at build time.
 */
import { visit } from "unist-util-visit";
import type { Root, Link } from "mdast";

export function remarkTransformLinks() {
  return (tree: Root) => {
    visit(tree, "link", (node: Link) => {
      if (node.url) {
        // Transform .md and .mdx extensions to clean URLs
        // Handles: /file.md, ./file.md, ../file.md, file.md
        node.url = node.url.replace(/\.mdx?$/, "");
      }
    });
  };
}
