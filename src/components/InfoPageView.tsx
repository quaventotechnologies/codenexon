import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AppShell from "@/components/AppShell";
import Breadcrumbs from "@/components/Breadcrumbs";
import PostBody from "@/components/PostBody";
import { SITE_NAME, formatDate } from "@/data/posts";
import { getInfoPage, infoPagesByGroup } from "@/data/pages";
import { loadPageBlocks } from "@/lib/postContent";

export function infoPageMetadata(slug: string): Metadata {
  const page = getInfoPage(slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      type: "website",
      title: page.title,
      description: page.description,
      url: `/${page.slug}`,
      siteName: SITE_NAME,
    },
  };
}

// Shared layout for the policy pages
export default function InfoPageView({ slug }: { slug: string }) {
  const page = getInfoPage(slug);
  if (!page) notFound();

  const blocks = loadPageBlocks(page.slug);
  const groupLabel = page.group === "policy" ? "Policy" : "Company";
  const siblings = infoPagesByGroup(page.group);

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <Breadcrumbs trail={[{ label: page.title, path: `/${page.slug}` }]} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <article className="lg:col-span-8 min-w-0">
            <header className="pb-4 border-b-2 border-neutral-900 dark:border-neutral-100">
              <p className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">{groupLabel}</p>
              <h1 className="mt-1 text-[1.7rem] sm:text-4xl font-black tracking-tight text-neutral-950 dark:text-white leading-tight">
                {page.title}
              </h1>
              <p className="mt-2 text-xs text-neutral-500">
                Last updated <time dateTime={page.updatedAt}>{formatDate(page.updatedAt)}</time>
              </p>
            </header>

            <PostBody blocks={blocks} />
          </article>

          <aside className="lg:col-span-4">
            <nav aria-label={page.group === "policy" ? "Policies" : "Company"} className="lg:sticky lg:top-4 border border-neutral-200 dark:border-neutral-700">
              <p className="bg-neutral-950 text-white px-3.5 py-2.5 border-b-2 border-red-600 text-xs font-extrabold uppercase tracking-wider">
                {page.group === "policy" ? "Policies" : "Company"}
              </p>
              <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {siblings.map((other) => (
                  <li key={other.slug}>
                    <Link
                      href={`/${other.slug}`}
                      aria-current={other.slug === page.slug ? "page" : undefined}
                      className={`block p-3.5 text-sm font-bold leading-snug hover:text-red-600 dark:hover:text-red-400 ${
                        other.slug === page.slug
                          ? "text-red-600 dark:text-red-400"
                          : "text-neutral-900 dark:text-neutral-100"
                      }`}
                    >
                      {other.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
