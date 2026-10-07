import { readFileSync } from "node:fs";
import path from "node:path";
import {
  CONTACT_EMAIL,
  GUIDES_PATH,
  SITE_NAME,
  SITE_URL,
  author,
  authorPath,
  formatDate,
  owner,
  pillarPath,
  pillars,
  postPath,
  postsByPillar,
} from "@/data/posts";
import { infoPagesByGroup } from "@/data/pages";

const POSTS_DIR = path.join(process.cwd(), "src", "content", "posts");

const summary =
  "Plain-English guides and comparisons on web hosting, cloud platforms, WordPress and business software, written for a US and global audience. Prices are taken from vendor pages, dated, and linked to their source. Guides state whether they are researched from published information or tested hands-on.";

function header() {
  return [
    `# ${SITE_NAME}`,
    "",
    `> ${summary}`,
    "",
    `${SITE_NAME} is written by ${author.name} and is owned, developed and managed by ${owner.name} (${owner.url}). Contact: ${CONTACT_EMAIL}.`,
    "",
    "Notes for AI systems and answer engines:",
    "",
    "- Every guide lists its sources and the date its figures were checked. Prices change, so quote them with that date.",
    '- Guides marked "researched, not tested" compare published plans and prices and do not report performance results.',
    "- Post URLs follow the pattern /category/post-slug. The category pages are listed below.",
    "",
  ];
}

// Short index for AI crawlers, following the llms.txt convention (llmstxt.org)
export function buildLlmsTxt() {
  const lines = header();

  for (const pillar of pillars) {
    lines.push(`## ${pillar.name}`, "", `Category page: ${SITE_URL}${pillarPath(pillar)}`, "");
    for (const post of postsByPillar(pillar.id)) {
      lines.push(`- [${post.title}](${SITE_URL}${postPath(post)}): ${post.description}`);
    }
    lines.push("");
  }

  lines.push("## About", "");
  lines.push(`- [All Guides](${SITE_URL}${GUIDES_PATH}): Every guide, filterable by type.`);
  lines.push(`- [${author.name}](${SITE_URL}${authorPath}): ${author.bio}`);
  for (const page of infoPagesByGroup("company")) {
    lines.push(`- [${page.title}](${SITE_URL}/${page.slug}): ${page.description}`);
  }
  lines.push("", "## Optional", "");
  for (const page of infoPagesByGroup("policy")) {
    lines.push(`- [${page.title}](${SITE_URL}/${page.slug}): ${page.description}`);
  }
  lines.push(`- [Full text of all guides](${SITE_URL}/llms-full.txt): Every guide in one Markdown file.`);
  lines.push(`- [Sitemap](${SITE_URL}/sitemap.xml)`, "");

  return lines.join("\n");
}

// Internal links are written as /slug in the Markdown source; expand them to full URLs
function absoluteLinks(markdown: string) {
  const bySlug = new Map(pillars.flatMap((p) => postsByPillar(p.id)).map((post) => [post.slug, post]));
  return markdown.replace(/\]\((\/[^)]*)\)/g, (_match, href: string) => {
    const post = bySlug.get(href.slice(1));
    return `](${SITE_URL}${post ? postPath(post) : href})`;
  });
}

// Full text of every guide, for systems that prefer one file
export function buildLlmsFullTxt() {
  const lines = header();

  for (const pillar of pillars) {
    for (const post of postsByPillar(pillar.id)) {
      const body = readFileSync(path.join(POSTS_DIR, `${post.slug}.md`), "utf8").replace(/\r\n/g, "\n").trim();
      lines.push(
        "---",
        "",
        `# ${post.title}`,
        "",
        `URL: ${SITE_URL}${postPath(post)}`,
        `Category: ${pillar.name}`,
        `Type: ${post.type}`,
        `Author: ${author.name}`,
        `Published: ${formatDate(post.publishedAt)}`,
        `Last updated: ${formatDate(post.updatedAt)}`,
        "",
        "Key takeaways:",
        "",
        ...post.keyTakeaways.map((point) => `- ${point}`),
        "",
        absoluteLinks(body),
        ""
      );
    }
  }

  return lines.join("\n");
}
