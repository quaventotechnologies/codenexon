import React from "react";
import Link from "next/link";
import { Block } from "@/lib/markdown";
import { getPost, postPath } from "@/data/posts";

// Posts link to each other as /slug in Markdown; the live URL sits under the category
function resolveHref(href: string) {
  const post = href.startsWith("/") ? getPost(href.slice(1)) : undefined;
  return post ? postPath(post) : href;
}

// Inline Markdown: **bold**, `code` and [text](url)
function renderInline(text: string): React.ReactNode[] {
  const pattern = /\*\*([^*]+)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g;
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const key = match.index;

    if (match[1] !== undefined) {
      nodes.push(
        <strong key={key} className="font-bold text-neutral-950 dark:text-white">
          {match[1]}
        </strong>
      );
    } else if (match[2] !== undefined) {
      nodes.push(
        <code key={key} className="px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[0.9em] break-words">
          {match[2]}
        </code>
      );
    } else {
      const href = resolveHref(match[4]);
      const linkClass = "text-red-600 dark:text-red-400 underline underline-offset-2 hover:no-underline";
      nodes.push(
        href.startsWith("mailto:") ? (
          <a key={key} href={href} className={linkClass}>
            {match[3]}
          </a>
        ) : href.startsWith("/") ? (
          <Link key={key} href={href} className={linkClass}>
            {match[3]}
          </Link>
        ) : (
          <a key={key} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {match[3]}
          </a>
        )
      );
    }
    last = pattern.lastIndex;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export default function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="text-[15px] sm:text-base text-neutral-800 dark:text-neutral-200 leading-relaxed">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={index}
                id={block.id}
                className="mt-10 mb-3 text-xl sm:text-2xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-snug scroll-mt-4"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={index}
                id={block.id}
                className="mt-7 mb-2 text-lg font-bold text-neutral-950 dark:text-white leading-snug scroll-mt-4"
              >
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={index} className="my-4">
                {renderInline(block.text)}
              </p>
            );
          case "ul":
            return (
              <ul key={index} className="my-4 pl-5 list-disc space-y-2 marker:text-red-600">
                {block.items.map((item, i) => (
                  <li key={i}>{renderInline(item)}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={index} className="my-4 pl-5 list-decimal space-y-2 marker:font-bold marker:text-red-600">
                {block.items.map((item, i) => (
                  <li key={i}>{renderInline(item)}</li>
                ))}
              </ol>
            );
          case "table":
            return (
              // Wide tables scroll inside their own box on phones
              <div key={index} className="my-6 -mx-4 sm:mx-0 overflow-x-auto">
                <table className="min-w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-neutral-100 dark:bg-neutral-800 text-left">
                      {block.head.map((cell, i) => (
                        <th
                          key={i}
                          scope="col"
                          className="px-3 py-2 font-bold text-neutral-950 dark:text-white border border-neutral-200 dark:border-neutral-700 whitespace-nowrap"
                        >
                          {renderInline(cell)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={r} className="even:bg-neutral-50 dark:even:bg-neutral-800/40">
                        {row.map((cell, c) => (
                          <td key={c} className="px-3 py-2 align-top border border-neutral-200 dark:border-neutral-700">
                            {renderInline(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "callout":
            return (
              <aside
                key={index}
                className="my-6 p-4 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 border-l-4 border-l-red-600 text-sm sm:text-[15px]"
              >
                {renderInline(block.text)}
              </aside>
            );
          case "code":
            return (
              <pre
                key={index}
                className="my-5 p-4 overflow-x-auto bg-neutral-950 text-neutral-100 text-[13px] leading-relaxed rounded-sm"
              >
                <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" }}>
                  {block.text}
                </code>
              </pre>
            );
        }
      })}
    </div>
  );
}
