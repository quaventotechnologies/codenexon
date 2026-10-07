"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Search, X, ArrowRight } from "lucide-react";
import { getPillar, postPath, posts } from "@/data/posts";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const popularTags = ["Web hosting", "DNS", "Site speed", "WordPress migration", "Email deliverability", "Fees"];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.type.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));

      const matchTag = !selectedTag || post.tags.includes(selectedTag);

      return matchQuery && matchTag;
    });
  }, [query, selectedTag]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-start justify-center pt-3 sm:pt-16 px-2 sm:px-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search guides"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 max-h-[calc(100dvh-1.5rem)] sm:max-h-[80dvh] flex flex-col"
      >
        {/* Search Input Bar */}
        <div className="p-3 sm:p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-2 sm:gap-3">
          <Search className="w-5 h-5 text-red-600 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guides, topics or tools..."
            className="flex-1 min-w-0 bg-transparent text-sm sm:text-base text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-neutral-400 hover:text-neutral-600 p-1"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="shrink-0 px-2 py-1.5 sm:py-1 border border-neutral-300 dark:border-neutral-700 text-xs rounded text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-label="Close search"
          >
            <span className="hidden sm:inline">ESC</span>
            <X className="w-4 h-4 sm:hidden" />
          </button>
        </div>

        {/* Quick topic filters */}
        <div className="px-4 py-2 bg-neutral-50 dark:bg-neutral-800/60 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          <span className="text-neutral-400 text-[11px] uppercase font-bold shrink-0">Quick Topics:</span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-2 py-1 sm:py-0.5 rounded-sm border text-[11px] whitespace-nowrap transition ${
                selectedTag === tag
                  ? "bg-red-600 text-white border-red-600"
                  : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto overscroll-contain divide-y divide-neutral-200 dark:divide-neutral-800 p-2 sm:p-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12 text-neutral-400">
              <p className="text-sm">No guides match &ldquo;{query}&rdquo;.</p>
              <p className="text-xs text-neutral-500 mt-1">Try a broader word such as hosting, WordPress or email.</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <Link
                key={post.slug}
                href={postPath(post)}
                onClick={onClose}
                className="flex items-center justify-between gap-4 group hover:bg-neutral-50 dark:hover:bg-neutral-800/40 p-2 rounded transition"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-red-600 uppercase mb-1">
                    <span>{getPillar(post.pillar).name}</span>
                    <span className="text-neutral-400">• {post.type}</span>
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-red-600 transition leading-snug">
                    {post.title}
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5">{post.excerpt}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-red-600 shrink-0" />
              </Link>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 text-[11px] text-neutral-500 flex items-center justify-between">
          <span>
            {filteredPosts.length} of {posts.length} guides
          </span>
          <span className="hidden sm:inline">Press ESC to close</span>
        </div>
      </div>
    </div>
  );
}
