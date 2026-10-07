import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import Breadcrumbs from "@/components/Breadcrumbs";
import GuideTypeSection from "@/components/GuideTypeSection";
import { GUIDES_PATH, SITE_NAME, posts } from "@/data/posts";

const description =
  "Every CodeNexon guide in one place: hosting, WordPress and business software, filterable by buying guides, explainers, comparisons, tutorials and troubleshooting.";

export const metadata: Metadata = {
  title: "All Guides",
  description,
  alternates: { canonical: GUIDES_PATH },
  openGraph: { type: "website", title: "All Guides", description, url: GUIDES_PATH, siteName: SITE_NAME },
};

export default function GuidesPage() {
  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 pt-6 sm:pt-8">
        <Breadcrumbs trail={[{ label: "All Guides", path: GUIDES_PATH }]} />

        <header>
          <p className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">Library</p>
          <h1 className="mt-1 text-[1.7rem] sm:text-4xl font-black tracking-tight text-neutral-950 dark:text-white leading-tight">
            All Guides
          </h1>
          <p className="mt-3 max-w-3xl text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {posts.length} guides on hosting, WordPress and business software. Newest first. Use the filter to narrow
            by the kind of help you need.
          </p>
        </header>
      </div>

      <GuideTypeSection showAll />
    </AppShell>
  );
}
