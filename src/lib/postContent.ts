import { readFileSync } from "node:fs";
import path from "node:path";
import { parseMarkdown } from "@/lib/markdown";

const POSTS_DIR = path.join(process.cwd(), "src", "content", "posts");

// Server-only: post bodies are read from disk at build time
export function loadPostBlocks(slug: string) {
  const source = readFileSync(path.join(POSTS_DIR, `${slug}.md`), "utf8");
  return parseMarkdown(source);
}

const PAGES_DIR = path.join(process.cwd(), "src", "content", "pages");

export function loadPageBlocks(slug: string) {
  const source = readFileSync(path.join(PAGES_DIR, `${slug}.md`), "utf8");
  return parseMarkdown(source);
}
