import React from "react";
import Link from "next/link";
import PostCover from "@/components/PostCover";
import { Post, formatDate, postPath } from "@/data/posts";

// Card used on category, author and guide listing pages
export default function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={postPath(post)}
      className="flex flex-col sm:flex-row gap-4 p-3 sm:p-4 border border-neutral-200 dark:border-neutral-700 hover:border-red-500 group bg-neutral-50/50 dark:bg-neutral-900/50 transition"
    >
      <PostCover post={post} className="w-full sm:w-52 shrink-0 self-start" />

      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
            {post.type}
          </span>
          <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition leading-snug">
            {post.title}
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 line-clamp-2">{post.excerpt}</p>
        </div>

        <div className="mt-3 pt-2 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[11px] text-neutral-500">
          <span>Updated {formatDate(post.updatedAt)}</span>
          <span>{post.readMinutes} min read</span>
        </div>
      </div>
    </Link>
  );
}
