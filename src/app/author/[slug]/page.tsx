import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, FileText, FolderOpen, Mail } from "lucide-react";
import AppShell from "@/components/AppShell";
import Breadcrumbs from "@/components/Breadcrumbs";
import PostCard from "@/components/PostCard";
import {
  CONTACT_EMAIL,
  SITE_NAME,
  SITE_URL,
  author,
  authorPath,
  owner,
  pillarPath,
  pillars,
  posts,
  postsByPillar,
} from "@/data/posts";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ slug: author.slug }];
}

export const metadata: Metadata = {
  title: `${author.name}, ${author.role}`,
  description: author.bio,
  alternates: { canonical: authorPath },
  openGraph: {
    type: "profile",
    title: `${author.name}, ${author.role}`,
    description: author.bio,
    url: authorPath,
    siteName: SITE_NAME,
  },
};

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  if (slug !== author.slug) notFound();

  const initials = author.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: author.name,
      jobTitle: author.role,
      description: author.bio,
      url: `${SITE_URL}${authorPath}`,
      knowsAbout: author.expertise,
      worksFor: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    },
  };

  const stats = [
    { icon: FileText, label: "Guides published", value: String(posts.length) },
    { icon: FolderOpen, label: "Categories covered", value: String(pillars.length) },
    { icon: CalendarDays, label: "Writing for CodeNexon since", value: author.since },
  ];

  return (
    <AppShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <Breadcrumbs trail={[{ label: author.name, path: authorPath }]} />

        {/* Profile */}
        <header className="pb-6 mb-6 border-b-2 border-neutral-900 dark:border-neutral-100 flex flex-col sm:flex-row gap-5 sm:items-center">
          <div
            aria-hidden="true"
            className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-red-600 text-white flex items-center justify-center text-2xl sm:text-3xl font-black tracking-tight"
          >
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">Author</p>
            <h1 className="mt-1 text-[1.7rem] sm:text-4xl font-black tracking-tight text-neutral-950 dark:text-white leading-tight">
              {author.name}
            </h1>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{author.role}</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-8 min-w-0">
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white mb-2">About</h2>
              <div className="space-y-4 text-[15px] sm:text-base text-neutral-800 dark:text-neutral-200 leading-relaxed">
                {author.about.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p>
                  CodeNexon is owned, developed and managed by{" "}
                  <a
                    href={owner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 dark:text-red-400 underline underline-offset-2 hover:no-underline"
                  >
                    {owner.name}
                  </a>
                  . How guides are researched and corrected is set out in the{" "}
                  <Link
                    href="/editorial-policy"
                    className="text-red-600 dark:text-red-400 underline underline-offset-2 hover:no-underline"
                  >
                    editorial policy
                  </Link>
                  .
                </p>
              </div>
            </section>

            {/* Guides, grouped by category */}
            {pillars.map((pillar) => {
              const pillarPosts = postsByPillar(pillar.id);
              if (pillarPosts.length === 0) return null;
              return (
                <section key={pillar.id} className="mt-10">
                  <div className="flex items-center justify-between gap-3 pb-3 mb-5 border-b-2 border-neutral-900 dark:border-neutral-100">
                    <h2 className="text-base sm:text-xl font-extrabold uppercase tracking-wide text-neutral-950 dark:text-white">
                      <Link href={pillarPath(pillar)} className="hover:text-red-600 dark:hover:text-red-400 transition">
                        {pillar.name}
                      </Link>
                    </h2>
                    <span className="text-xs text-neutral-500">{pillarPosts.length} guides</span>
                  </div>
                  <div className="grid grid-cols-1 gap-5">
                    {pillarPosts.map((post) => (
                      <PostCard key={post.slug} post={post} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-4 space-y-6">
              <div className="border border-neutral-200 dark:border-neutral-700">
                <p className="bg-neutral-950 text-white px-3.5 py-2.5 border-b-2 border-red-600 text-xs font-extrabold uppercase tracking-wider">
                  At a glance
                </p>
                <dl className="divide-y divide-neutral-200 dark:divide-neutral-800">
                  {stats.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="p-3.5 flex items-center justify-between gap-3">
                      <dt className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                        <Icon className="w-4 h-4 text-red-600" />
                        {label}
                      </dt>
                      <dd className="text-sm font-bold text-neutral-950 dark:text-white">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="border border-neutral-200 dark:border-neutral-700 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white mb-3">
                  Areas of expertise
                </p>
                <ul className="flex flex-wrap gap-2">
                  {author.expertise.map((topic) => (
                    <li
                      key={topic}
                      className="bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs px-2.5 py-1 rounded-sm border border-neutral-200 dark:border-neutral-700"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-neutral-200 dark:border-neutral-700 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white mb-2">
                  Get in touch
                </p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Found an error or an out-of-date price? Send a correction and it will be checked against the source.
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-red-600 dark:text-red-400 hover:underline break-all"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
