import React from "react";
import { Post, getPillar } from "@/data/posts";

interface PostCoverProps {
  post: Post;
  className?: string;
}

// The one blog image template. Every post uses it and only the title changes.
// Sizes are in container units so it scales like an image at any width.
// Keep the layout in step with the PNG version in app/blog-image/[slug]/route.tsx.
export default function PostCover({ post, className = "" }: PostCoverProps) {
  return (
    <div
      role="img"
      aria-label={post.title}
      className={`relative aspect-[1200/630] overflow-hidden bg-neutral-950 border border-neutral-200 dark:border-neutral-700 [container-type:inline-size] ${className}`}
    >
      {/* Red corner band */}
      <div className="absolute -right-[12cqw] -top-[12cqw] w-[34cqw] h-[34cqw] rotate-45 bg-red-600" />
      <div className="absolute left-0 inset-y-0 w-[1.2cqw] bg-red-600" />

      <div className="absolute inset-0 flex flex-col justify-between p-[5cqw] pl-[6cqw]">
        {/* Brand */}
        <div className="flex items-center gap-[1.4cqw]">
          <span className="bg-red-600 text-white font-black tracking-tighter leading-none text-[3.4cqw] px-[1.2cqw] py-[0.6cqw] rounded-[0.5cqw]">
            CN
          </span>
          <span className="text-white font-black uppercase tracking-tight leading-none text-[3.4cqw]">
            Code<span className="text-red-600">Nexon</span>
          </span>
        </div>

        {/* Blog name */}
        <div className="text-white font-extrabold tracking-tight leading-[1.15] text-[5.6cqw] line-clamp-3 pr-[10cqw]">
          {post.title}
        </div>

        {/* Category and post type */}
        <div className="flex items-center gap-[1.6cqw] text-[2.4cqw] font-bold uppercase tracking-widest leading-none">
          <span className="text-red-500">{getPillar(post.pillar).name}</span>
          <span className="w-[0.6cqw] h-[0.6cqw] rounded-full bg-neutral-500" />
          <span className="text-neutral-300">{post.type}</span>
        </div>
      </div>
    </div>
  );
}
