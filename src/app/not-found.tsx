import type { Metadata } from "next";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import { GUIDES_PATH, Post, getPillar, getPost, pillarPath, pillars, postPath } from "@/data/posts";

// Guides most likely to help someone who followed an old or broken link
const popularSlugs = [
  "best-web-hosting-for-small-business",
  "how-to-choose-web-hosting",
  "why-is-my-wordpress-site-slow",
  "how-much-does-a-website-cost",
  "spf-dkim-dmarc-explained",
  "mailchimp-alternatives",
];

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false },
};

export default function NotFound() {
  const popular = popularSlugs.map(getPost).filter((post): post is Post => Boolean(post));

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">Error 404</p>
          <h1 className="mt-1 text-[1.7rem] sm:text-4xl font-black tracking-tight text-neutral-950 dark:text-white leading-tight">
            This page could not be found
          </h1>
          <p className="mt-3 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
            The address may be mistyped, or the page may have moved. Guides now live under their category, so an older
            link can point to the wrong place.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/"
              className="bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider text-xs px-5 py-2.5 transition"
            >
              Go to the home page
            </Link>
            <Link
              href={GUIDES_PATH}
              className="border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-bold uppercase tracking-wider text-xs px-5 py-2.5 transition"
            >
              Browse all guides
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white mb-3">
            Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {pillars.map((pillar) => (
              <Link
                key={pillar.id}
                href={pillarPath(pillar)}
                className="group p-4 border border-neutral-200 dark:border-neutral-700 hover:border-red-500 transition"
              >
                <span className="block text-base font-bold text-neutral-950 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition">
                  {pillar.name}
                </span>
                <span className="block mt-1 text-xs text-neutral-600 dark:text-neutral-400">{pillar.blurb}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white mb-3">
            Popular guides
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 divide-y divide-neutral-200 dark:divide-neutral-800 md:divide-y-0">
            {popular.map((post) => (
              <li key={post.slug} className="py-3 md:border-b md:border-neutral-200 md:dark:border-neutral-800">
                <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
                  {getPillar(post.pillar).name}
                </span>
                <Link
                  href={postPath(post)}
                  className="block text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100 leading-snug hover:text-red-600 dark:hover:text-red-400"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
