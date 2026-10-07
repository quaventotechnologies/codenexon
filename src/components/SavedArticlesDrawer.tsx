"use client";

import React from "react";
import Link from "next/link";
import { X, Trash2, Bookmark } from "lucide-react";
import PostCover from "@/components/PostCover";
import { Post, getPost, postPath } from "@/data/posts";
import { toggleBookmark, useBookmarks } from "@/lib/bookmarks";

interface SavedArticlesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SavedArticlesDrawer({ isOpen, onClose }: SavedArticlesDrawerProps) {
  const savedPosts = useBookmarks()
    .map(getPost)
    .filter((post): post is Post => Boolean(post));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex justify-end" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Saved posts"
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-md bg-white dark:bg-neutral-900 h-dvh sm:border-l border-neutral-300 dark:border-neutral-700 flex flex-col"
      >
        {/* Header */}
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-neutral-800">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-red-600" />
            <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-900 dark:text-white">
              Saved Posts ({savedPosts.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 -m-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded text-neutral-600 dark:text-neutral-400"
            aria-label="Close saved posts"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto overscroll-contain divide-y divide-neutral-200 dark:divide-neutral-800 p-4">
          {savedPosts.length === 0 ? (
            <div className="text-center py-16 text-neutral-400">
              <Bookmark className="w-10 h-10 mx-auto mb-2 text-neutral-300 dark:text-neutral-600" />
              <p className="text-sm font-medium">No saved posts yet.</p>
              <p className="text-xs mt-1 text-neutral-500">
                Use the bookmark icon on any guide to keep it here for later.
              </p>
            </div>
          ) : (
            savedPosts.map((post) => (
              <div key={post.slug} className="py-3 first:pt-0 last:pb-0 flex items-start gap-3">
                <Link href={postPath(post)} onClick={onClose} className="shrink-0" tabIndex={-1} aria-hidden="true">
                  <PostCover post={post} className="w-24" />
                </Link>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-red-600 uppercase">{post.type}</span>
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white line-clamp-2 leading-snug">
                    <Link href={postPath(post)} onClick={onClose} className="hover:text-red-600">
                      {post.title}
                    </Link>
                  </h4>
                  <span className="text-[10px] text-neutral-400 block mt-1">{post.readMinutes} min read</span>
                </div>

                <button
                  onClick={() => toggleBookmark(post.slug)}
                  className="p-2 -m-1 hover:text-red-600 text-neutral-400"
                  title="Remove from saved"
                  aria-label="Remove from saved"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {savedPosts.length > 0 && (
          <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 text-center">
            <p className="text-xs text-neutral-500">Saved posts are stored in this browser only.</p>
          </div>
        )}
      </div>
    </div>
  );
}
