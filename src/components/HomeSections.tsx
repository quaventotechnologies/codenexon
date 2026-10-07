import React from "react";
import Link from "next/link";
import { Clock, Server, LayoutTemplate, Blocks, Compass, ArrowRight } from "lucide-react";
import PostCover from "@/components/PostCover";
import BookmarkButton from "@/components/BookmarkButton";
import {
  Post,
  PillarId,
  author,
  authorPath,
  formatDate,
  getPillar,
  getPost,
  pillarPath,
  postPath,
  posts,
  postsByPillar,
} from "@/data/posts";

const pillarIcons = { hosting: Server, wordpress: LayoutTemplate, saas: Blocks };

function SectionHeader({
  icon: Icon,
  title,
  note,
  href,
  linkLabel,
}: {
  icon: typeof Server;
  title: string;
  note?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 pb-3 mb-6 border-b-2 border-neutral-900 dark:border-neutral-100">
      <div className="flex items-center gap-2.5">
        <div className="w-1.5 h-6 shrink-0 bg-red-600" />
        <h2 className="text-base sm:text-xl font-extrabold uppercase tracking-wide sm:tracking-wider text-neutral-950 dark:text-white flex items-center gap-2">
          <Icon className="w-5 h-5 shrink-0 text-red-600" />
          {href ? (
            <Link href={href} className="hover:text-red-600 dark:hover:text-red-400 transition">
              {title}
            </Link>
          ) : (
            <span>{title}</span>
          )}
        </h2>
      </div>
      {href && linkLabel ? (
        <Link
          href={href}
          className="shrink-0 whitespace-nowrap text-xs font-bold text-red-600 dark:text-red-400 hover:underline uppercase flex items-center gap-1"
        >
          <span className="hidden sm:inline">{linkLabel}</span>
          <span className="sm:hidden">View all</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      ) : (
        note && <span className="text-xs text-neutral-500 hidden sm:inline">{note}</span>
      )}
    </div>
  );
}

function Meta({ post }: { post: Post }) {
  return (
    <span className="text-[11px] text-neutral-500">
      {formatDate(post.updatedAt)} • {post.readMinutes} min read
    </span>
  );
}

// Thumbnail + headline row used in the lists
function PostRow({ post, showExcerpt = false }: { post: Post; showExcerpt?: boolean }) {
  return (
    <article className="py-3 first:pt-0 last:pb-0 flex items-start gap-4 group">
      <Link href={postPath(post)} className="shrink-0" tabIndex={-1} aria-hidden="true">
        <PostCover post={post} className="w-28 sm:w-36" />
      </Link>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold text-neutral-900 dark:text-white leading-snug">
          <Link href={postPath(post)} className="group-hover:text-red-600 dark:group-hover:text-red-400 transition">
            {post.title}
          </Link>
        </h3>
        {showExcerpt && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2 hidden sm:block">
            {post.excerpt}
          </p>
        )}
        <div className="mt-1 flex items-center justify-between gap-2">
          <Meta post={post} />
          <BookmarkButton slug={post.slug} />
        </div>
      </div>
    </article>
  );
}

export function LeadSection() {
  const [lead, ...rest] = posts;
  const secondary = rest.slice(0, 2);
  const latest = rest.slice(2, 8);

  return (
    <section className="max-w-7xl mx-auto px-4 py-6 border-b border-neutral-200 dark:border-neutral-800">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Lead guide + two secondary guides */}
        <div className="lg:col-span-8">
          <article>
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 mb-2">
              <div className="flex items-center gap-2">
                <span className="bg-red-600 text-white text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm">
                  Start Here
                </span>
                <Link
                  href={pillarPath(getPillar(lead.pillar))}
                  className="text-red-700 dark:text-red-400 text-xs font-semibold uppercase tracking-wide hover:underline"
                >
                  {getPillar(lead.pillar).name}
                </Link>
              </div>
              <div className="flex items-center gap-3 text-xs text-neutral-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Updated {formatDate(lead.updatedAt)}
                </span>
                <span>•</span>
                <span>{lead.readMinutes} min read</span>
              </div>
            </div>

            <h1 className="text-[1.6rem] sm:text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-tight mb-3">
              <Link href={postPath(lead)} className="hover:text-red-600 dark:hover:text-red-400 transition">
                {lead.title}
              </Link>
            </h1>

            <Link href={postPath(lead)} tabIndex={-1} aria-hidden="true">
              <PostCover post={lead} className="w-full" />
            </Link>

            <p className="mt-3 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {lead.excerpt}
            </p>

            <div className="mt-4 p-3.5 bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-700/60 border-l-4 border-l-red-600 rounded-r-sm">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 mb-2">
                Key Takeaways
              </h2>
              <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                {lead.keyTakeaways.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="text-red-600 font-bold shrink-0 mt-0.5">▪</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-600 dark:text-neutral-400">
              <div>
                <span className="font-bold text-neutral-900 dark:text-white">
                  By{" "}
                  <Link href={authorPath} className="hover:text-red-600 dark:hover:text-red-400 underline-offset-2 hover:underline">
                    {author.name}
                  </Link>
                </span>
                <span className="block text-[11px] text-neutral-500">{author.role}</span>
              </div>
              <div className="flex items-center gap-3">
                <BookmarkButton slug={lead.slug} withLabel />
                <Link
                  href={postPath(lead)}
                  className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1.5 rounded transition"
                >
                  Read the guide <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </article>

          <div className="mt-6 pt-6 border-t-2 border-neutral-200 dark:border-neutral-800 grid grid-cols-1 md:grid-cols-2 gap-6">
            {secondary.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col justify-between border-b border-neutral-200 dark:border-neutral-800 last:border-b-0 md:border-b-0 pb-4 last:pb-0 md:pb-0"
              >
                <div>
                  <Link href={postPath(post)} tabIndex={-1} aria-hidden="true">
                    <PostCover post={post} className="w-full mb-2.5" />
                  </Link>
                  <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white leading-snug">
                    <Link href={postPath(post)} className="group-hover:text-red-600 dark:group-hover:text-red-400 transition">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-1.5 text-xs text-neutral-600 dark:text-neutral-400 line-clamp-3">{post.excerpt}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <Meta post={post} />
                  <BookmarkButton slug={post.slug} />
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Latest guides list */}
        <aside className="lg:col-span-4 lg:border-l lg:border-neutral-200 dark:lg:border-neutral-800 lg:pl-6">
          <div className="border border-neutral-200 dark:border-neutral-700">
            <div className="bg-neutral-950 text-white px-3.5 py-2.5 border-b-2 border-red-600">
              <h2 className="font-extrabold text-xs tracking-wider uppercase">Latest Guides</h2>
            </div>
            <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {latest.map((post) => (
                <article key={post.slug} className="p-3.5 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                      {post.type}
                    </span>
                    <span className="text-[11px] text-neutral-500">{post.readMinutes} min read</span>
                  </div>
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                    <Link href={postPath(post)} className="hover:text-red-600 dark:hover:text-red-400">
                      {post.title}
                    </Link>
                  </h3>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-6 border border-neutral-200 dark:border-neutral-700 p-4 text-xs text-neutral-600 dark:text-neutral-400">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">
              How these guides are written
            </span>
            <p>
              Every price and limit is taken from the vendor&apos;s own page, dated, and linked in the Sources section
              of each post. Where we have not run hands-on tests yet, the post says so.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

export function PillarSection({ pillarId }: { pillarId: PillarId }) {
  const pillar = getPillar(pillarId);
  // The first three posts already appear in the lead section
  const shownAbove = posts.slice(0, 3);
  const [feature, ...rest] = postsByPillar(pillarId).filter((post) => !shownAbove.includes(post));

  if (!feature) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 border-b border-neutral-200 dark:border-neutral-800">
      <SectionHeader
        icon={pillarIcons[pillarId]}
        title={pillar.name}
        href={pillarPath(pillar)}
        linkLabel={`All ${pillar.name} guides`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <article className="lg:col-span-6 group flex flex-col justify-between">
          <div>
            <Link href={postPath(feature)} tabIndex={-1} aria-hidden="true">
              <PostCover post={feature} className="w-full mb-3" />
            </Link>
            <h3 className="text-lg sm:text-xl font-bold text-neutral-950 dark:text-white leading-snug">
              <Link href={postPath(feature)} className="group-hover:text-red-600 dark:group-hover:text-red-400 transition">
                {feature.title}
              </Link>
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {feature.excerpt}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <Meta post={feature} />
            <BookmarkButton slug={feature.slug} />
          </div>
        </article>

        <div className="lg:col-span-6 divide-y divide-neutral-200 dark:divide-neutral-800">
          {rest.map((post) => (
            <PostRow key={post.slug} post={post} showExcerpt />
          ))}
        </div>
      </div>
    </section>
  );
}

const startHereSlugs = [
  "best-web-hosting-for-small-business",
  "how-to-choose-web-hosting",
  "shared-vs-vps-vs-cloud-hosting",
  "web-hosting-renewal-prices",
  "why-is-my-wordpress-site-slow",
];

export function StartHereSection() {
  const picks = startHereSlugs.map(getPost).filter((post): post is Post => Boolean(post));

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 border-b border-neutral-200 dark:border-neutral-800">
      <SectionHeader icon={Compass} title="New Here? Read These First" note="Five guides, in reading order" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {picks.map((post, index) => (
          <article
            key={post.slug}
            className="group flex flex-col justify-between border-b border-neutral-200 dark:border-neutral-800 lg:border-b-0 pb-4 lg:pb-0"
          >
            <div>
              <div className="text-4xl sm:text-5xl font-black text-red-600 tracking-tighter leading-none mb-2">
                0{index + 1}
              </div>
              <Link
                href={pillarPath(getPillar(post.pillar))}
                className="text-[10px] font-bold text-red-700 dark:text-red-400 uppercase tracking-wider block mb-1 hover:underline"
              >
                {getPillar(post.pillar).name}
              </Link>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white leading-snug">
                <Link href={postPath(post)} className="group-hover:text-red-600 dark:group-hover:text-red-400 transition">
                  {post.title}
                </Link>
              </h3>
            </div>
            <div className="mt-3 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <Meta post={post} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
