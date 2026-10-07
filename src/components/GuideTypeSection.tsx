"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ListFilter } from "lucide-react";
import PostCard from "@/components/PostCard";
import { GUIDES_PATH, PostType, posts } from "@/data/posts";

const types: PostType[] = ["Guide", "Explainer", "Comparison", "Tutorial", "Troubleshooting"];
const availableTypes = types.filter((type) => posts.some((post) => post.type === type));

const typeLabels: Record<PostType, string> = {
  Guide: "Buying Guides",
  Explainer: "Explainers",
  Comparison: "Comparisons",
  Tutorial: "Tutorials",
  Troubleshooting: "Troubleshooting",
};

type Filter = PostType | "All";

interface GuideTypeSectionProps {
  // The /guides page lists everything; the home page shows one type at a time
  showAll?: boolean;
}

export default function GuideTypeSection({ showAll = false }: GuideTypeSectionProps) {
  const filters: Filter[] = showAll ? ["All", ...availableTypes] : availableTypes;
  const [active, setActive] = useState<Filter>(filters[0]);
  const activePosts = active === "All" ? posts : posts.filter((post) => post.type === active);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 border-b border-neutral-200 dark:border-neutral-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-6 border-b-2 border-neutral-900 dark:border-neutral-100 gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-1.5 h-6 shrink-0 bg-red-600" />
          <h2 className="text-base sm:text-xl font-extrabold uppercase tracking-wide sm:tracking-wider text-neutral-950 dark:text-white flex items-center gap-2">
            <ListFilter className="w-5 h-5 shrink-0 text-red-600" />
            <span>{showAll ? "Browse by Type" : "Guides by Type"}</span>
          </h2>
        </div>

        {/* Type filter pills */}
        <div role="tablist" className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {filters.map((filter) => {
            const isCurrent = active === filter;
            return (
              <button
                key={filter}
                role="tab"
                aria-selected={isCurrent}
                onClick={() => setActive(filter)}
                className={`px-3 py-1.5 sm:py-1 text-xs font-bold uppercase transition rounded-sm whitespace-nowrap ${
                  isCurrent
                    ? "bg-red-600 text-white"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                }`}
              >
                {filter === "All" ? `All (${posts.length})` : typeLabels[filter]}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activePosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {!showAll && (
        <div className="mt-6 text-center">
          <Link
            href={GUIDES_PATH}
            className="inline-flex items-center gap-1 text-xs font-bold text-red-600 dark:text-red-400 hover:underline uppercase"
          >
            <span>See all {posts.length} guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </section>
  );
}
