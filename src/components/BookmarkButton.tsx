"use client";

import React from "react";
import { Bookmark } from "lucide-react";
import { toggleBookmark, useBookmarks } from "@/lib/bookmarks";

interface BookmarkButtonProps {
  slug: string;
  withLabel?: boolean;
}

export default function BookmarkButton({ slug, withLabel = false }: BookmarkButtonProps) {
  const isSaved = useBookmarks().includes(slug);

  if (!withLabel) {
    return (
      <button
        onClick={() => toggleBookmark(slug)}
        className="p-2 -m-1 text-neutral-500 hover:text-red-600 dark:hover:text-red-400"
        title={isSaved ? "Remove from saved" : "Save post"}
        aria-label={isSaved ? "Remove from saved" : "Save post"}
        aria-pressed={isSaved}
      >
        <Bookmark className="w-3.5 h-3.5" fill={isSaved ? "currentColor" : "none"} />
      </button>
    );
  }

  return (
    <button
      onClick={() => toggleBookmark(slug)}
      aria-pressed={isSaved}
      className={`flex items-center gap-1 px-2.5 py-1.5 rounded border text-xs transition ${
        isSaved
          ? "bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 font-bold"
          : "border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
      }`}
    >
      <Bookmark className="w-3.5 h-3.5" fill={isSaved ? "currentColor" : "none"} />
      <span>{isSaved ? "Saved" : "Save"}</span>
    </button>
  );
}
