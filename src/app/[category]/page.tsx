import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AppShell from "@/components/AppShell";
import Breadcrumbs from "@/components/Breadcrumbs";
import PostCard from "@/components/PostCard";
import { SITE_NAME, SITE_URL, getPillarBySlug, pillarPath, pillars, postPath, postsByPillar } from "@/data/posts";

type Props = { params: Promise<{ category: string }> };

// Only the categories listed in posts.ts exist; anything else is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return pillars.map((pillar) => ({ category: pillar.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const pillar = getPillarBySlug(category);
  if (!pillar) return {};

  const title = `${pillar.name} Guides`;
  return {
    title,
    description: pillar.description,
    alternates: { canonical: pillarPath(pillar) },
    openGraph: { type: "website", title, description: pillar.description, url: pillarPath(pillar), siteName: SITE_NAME },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const pillar = getPillarBySlug(category);
  if (!pillar) notFound();

  const categoryPosts = postsByPillar(pillar.id);
  const otherPillars = pillars.filter((other) => other.id !== pillar.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${pillar.name} Guides`,
    description: pillar.description,
    url: `${SITE_URL}${pillarPath(pillar)}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: categoryPosts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: post.title,
        url: `${SITE_URL}${postPath(post)}`,
      })),
    },
  };

  return (
    <AppShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <Breadcrumbs trail={[{ label: pillar.name, path: pillarPath(pillar) }]} />

        <header className="pb-5 mb-6 border-b-2 border-neutral-900 dark:border-neutral-100">
          <p className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">Category</p>
          <h1 className="mt-1 text-[1.7rem] sm:text-4xl font-black tracking-tight text-neutral-950 dark:text-white leading-tight">
            {pillar.name}
          </h1>
          <p className="mt-3 max-w-3xl text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {pillar.description}
          </p>
          <p className="mt-2 text-xs text-neutral-500">
            {categoryPosts.length} {categoryPosts.length === 1 ? "guide" : "guides"}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {categoryPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {/* Other categories */}
        <aside className="mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white mb-3">
            More categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherPillars.map((other) => (
              <Link
                key={other.id}
                href={pillarPath(other)}
                className="group p-4 border border-neutral-200 dark:border-neutral-700 hover:border-red-500 transition"
              >
                <span className="block text-base font-bold text-neutral-950 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition">
                  {other.name}
                </span>
                <span className="block mt-1 text-xs text-neutral-600 dark:text-neutral-400">{other.blurb}</span>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
