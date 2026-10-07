import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import AppShell from "@/components/AppShell";
import Breadcrumbs from "@/components/Breadcrumbs";
import PostBody from "@/components/PostBody";
import PostCover from "@/components/PostCover";
import BookmarkButton from "@/components/BookmarkButton";
import {
  SITE_NAME,
  SITE_URL,
  author,
  authorPath,
  formatDate,
  getPillar,
  getPost,
  owner,
  pillarPath,
  postImagePath,
  postPath,
  posts,
  postsByPillar,
} from "@/data/posts";
import { extractFaq } from "@/lib/markdown";
import { loadPostBlocks } from "@/lib/postContent";

type Props = { params: Promise<{ category: string; slug: string }> };

// Only /category/slug pairs listed in posts.ts exist; anything else is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ category: getPillar(post.pillar).slug, slug: post.slug }));
}

async function resolvePost(params: Props["params"]) {
  const { category, slug } = await params;
  const post = getPost(slug);
  return post && getPillar(post.pillar).slug === category ? post : undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await resolvePost(params);
  if (!post) return {};

  const image = { url: postImagePath(post), width: 1200, height: 630, alt: post.title };

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: author.name, url: authorPath }],
    alternates: { canonical: postPath(post) },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: postPath(post),
      siteName: SITE_NAME,
      locale: "en_US",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [`${SITE_URL}${authorPath}`],
      tags: post.tags,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: [image] },
  };
}

export default async function PostPage({ params }: Props) {
  const post = await resolvePost(params);
  if (!post) notFound();

  const blocks = loadPostBlocks(post.slug);
  const pillar = getPillar(post.pillar);
  const toc = blocks.flatMap((block) => (block.type === "h2" ? [block] : []));
  const faq = extractFaq(blocks);
  const related = postsByPillar(post.pillar)
    .filter((other) => other.slug !== post.slug)
    .slice(0, 4);
  const url = `${SITE_URL}${postPath(post)}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      image: `${SITE_URL}${postImagePath(post)}`,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      mainEntityOfPage: url,
      keywords: post.tags.join(", "),
      articleSection: pillar.name,
      author: { "@type": "Person", name: author.name, jobTitle: author.role, url: `${SITE_URL}${authorPath}` },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        parentOrganization: { "@type": "Organization", name: owner.name, url: owner.url },
      },
    },
    ...(faq.length > 0
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          },
        ]
      : []),
  ];

  return (
    <AppShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        {/* Home > Category > Post, the same order as the URL */}
        <Breadcrumbs
          trail={[
            { label: pillar.name, path: pillarPath(pillar) },
            { label: post.title, path: postPath(post) },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <article className="lg:col-span-8 min-w-0">
            <header>
              <div className="flex items-center gap-2 mb-2">
                <Link
                  href={pillarPath(pillar)}
                  className="bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm transition"
                >
                  {pillar.name}
                </Link>
                <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{post.type}</span>
              </div>

              <h1 className="text-[1.7rem] sm:text-4xl font-black tracking-tight text-neutral-950 dark:text-white leading-tight">
                {post.title}
              </h1>

              <div className="mt-4 pb-4 border-b border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs text-neutral-600 dark:text-neutral-400">
                <div>
                  <p className="font-bold text-neutral-900 dark:text-white text-sm">
                    By{" "}
                    <Link href={authorPath} rel="author" className="hover:text-red-600 dark:hover:text-red-400 underline-offset-2 hover:underline">
                      {author.name}
                    </Link>
                  </p>
                  <p className="text-[11px] text-neutral-500">{author.role}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>
                      Updated <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time> •{" "}
                      {post.readMinutes} min read
                    </span>
                  </span>
                  <BookmarkButton slug={post.slug} withLabel />
                </div>
              </div>
            </header>

            <PostCover post={post} className="mt-5 w-full" />

            {/* Answer-first summary */}
            <div className="mt-5 p-4 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 border-l-4 border-l-red-600">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white mb-2">
                Key Takeaways
              </h2>
              <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                {post.keyTakeaways.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">▪</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Table of contents on phones and tablets */}
            <details className="lg:hidden mt-5 border border-neutral-200 dark:border-neutral-700">
              <summary className="px-4 py-3 text-sm font-bold cursor-pointer">In this guide</summary>
              <ol className="px-4 pb-3 space-y-2 text-sm list-decimal list-inside">
                {toc.map((heading) => (
                  <li key={heading.id}>
                    <a href={`#${heading.id}`} className="hover:text-red-600">
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ol>
            </details>

            <PostBody blocks={blocks} />

            {/* Update history: only changes when something substantive changed */}
            <section aria-label="Update history" className="mt-10 p-4 border border-neutral-200 dark:border-neutral-700">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white mb-2">
                Update history
              </h2>
              <ul className="space-y-1.5 text-sm text-neutral-600 dark:text-neutral-400">
                {[{ date: post.publishedAt, note: "First published." }, ...(post.changelog ?? [])].map((entry) => (
                  <li key={`${entry.date}-${entry.note}`} className="flex flex-wrap gap-x-2">
                    <time dateTime={entry.date} className="font-bold text-neutral-800 dark:text-neutral-200">
                      {formatDate(entry.date)}:
                    </time>
                    <span>{entry.note}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Author */}
            <footer className="mt-8 pt-6 border-t-2 border-neutral-900 dark:border-neutral-100">
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">About the author</p>
              <p className="mt-1 text-sm font-bold text-neutral-950 dark:text-white">
                <Link href={authorPath} rel="author" className="hover:text-red-600 dark:hover:text-red-400 underline-offset-2 hover:underline">
                  {author.name}
                </Link>
              </p>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{author.bio}</p>
              <Link
                href={authorPath}
                className="mt-2 inline-block text-xs font-bold uppercase text-red-600 dark:text-red-400 hover:underline"
              >
                View author profile
              </Link>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs px-2.5 py-1 rounded-sm border border-neutral-200 dark:border-neutral-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </footer>
          </article>

          {/* Sidebar: contents and related guides */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-4 space-y-6">
              <nav aria-label="In this guide" className="hidden lg:block border border-neutral-200 dark:border-neutral-700 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white mb-3">
                  In this guide
                </p>
                <ol className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                  {toc.map((heading) => (
                    <li key={heading.id}>
                      <a href={`#${heading.id}`} className="hover:text-red-600 dark:hover:text-red-400">
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              {related.length > 0 && (
                <div className="border border-neutral-200 dark:border-neutral-700">
                  <p className="bg-neutral-950 text-white px-3.5 py-2.5 border-b-2 border-red-600 text-xs font-extrabold uppercase tracking-wider">
                    <Link href={pillarPath(pillar)} className="hover:text-red-400">
                      More in {pillar.name}
                    </Link>
                  </p>
                  <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
                    {related.map((other) => (
                      <li key={other.slug} className="p-3.5">
                        <span className="text-[10px] font-bold text-red-600 uppercase">{other.type}</span>
                        <Link
                          href={postPath(other)}
                          className="block text-sm font-bold text-neutral-900 dark:text-neutral-100 leading-snug hover:text-red-600 dark:hover:text-red-400"
                        >
                          {other.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
