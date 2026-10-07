// Minimal Markdown parser for post bodies in src/content/posts.
// Supports: ## and ### headings, paragraphs, - and 1. lists, pipe tables,
// > callouts, fenced code, and inline **bold**, `code` and [links](url).

export type Block =
  | { type: "h2" | "h3"; text: string; id: string }
  | { type: "p"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "callout"; text: string }
  | { type: "code"; text: string };

export interface FaqItem {
  question: string;
  answer: string;
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function splitRow(line: string) {
  return line
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((cell) => cell.trim());
}

export function parseMarkdown(source: string): Block[] {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    if (line.startsWith("```")) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) code.push(lines[i++]);
      i++;
      blocks.push({ type: "code", text: code.join("\n") });
      continue;
    }

    const heading = /^(#{2,3})\s+(.*)$/.exec(line);
    if (heading) {
      const text = heading[2].trim();
      blocks.push({ type: heading[1].length === 2 ? "h2" : "h3", text, id: slugify(text) });
      i++;
      continue;
    }

    if (line.startsWith("|")) {
      const head = splitRow(line);
      i += 2; // skip the header separator row
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith("|")) rows.push(splitRow(lines[i++]));
      blocks.push({ type: "table", head, rows });
      continue;
    }

    if (line.startsWith(">")) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) quote.push(lines[i++].replace(/^>\s?/, ""));
      blocks.push({ type: "callout", text: quote.join(" ") });
      continue;
    }

    const listMatch = /^(-|\d+\.)\s+/.exec(line);
    if (listMatch) {
      const ordered = listMatch[1] !== "-";
      const pattern = ordered ? /^\d+\.\s+/ : /^-\s+/;
      const items: string[] = [];
      while (i < lines.length && pattern.test(lines[i])) items.push(lines[i++].replace(pattern, ""));
      blocks.push({ type: ordered ? "ol" : "ul", items });
      continue;
    }

    const paragraph: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(#{2,3}\s|\||>|```|-\s|\d+\.\s)/.test(lines[i])) {
      paragraph.push(lines[i++].trim());
    }
    blocks.push({ type: "p", text: paragraph.join(" ") });
  }

  return blocks;
}

export function stripInline(text: string) {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1");
}

// Question/answer pairs under the "Frequently asked questions" heading, for FAQPage markup
export function extractFaq(blocks: Block[]): FaqItem[] {
  const start = blocks.findIndex((b) => b.type === "h2" && /^frequently asked questions/i.test(b.text));
  if (start === -1) return [];

  const faq: FaqItem[] = [];
  for (let i = start + 1; i < blocks.length; i++) {
    const block = blocks[i];
    if (block.type === "h2") break;
    if (block.type === "h3") {
      faq.push({ question: block.text, answer: "" });
    } else if (block.type === "p" && faq.length > 0) {
      const current = faq[faq.length - 1];
      current.answer = `${current.answer} ${stripInline(block.text)}`.trim();
    }
  }
  return faq;
}

export function countWords(source: string) {
  return stripInline(source)
    .replace(/[#>|`*-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}
