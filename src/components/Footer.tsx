"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, CalendarCheck, Link2, FlaskConical } from "lucide-react";
import { GUIDES_PATH, author, authorPath, owner, pillarPath, pillars, postPath, posts, postsByPillar } from "@/data/posts";
import { infoPagesByGroup } from "@/data/pages";
import { openConsentSettings } from "@/lib/analytics";

const headingClass = "font-bold uppercase tracking-wider text-white border-b border-red-600 pb-1.5 mb-3";
const listClass = "space-y-2.5 sm:space-y-2 text-neutral-400";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const latestPosts = [...posts].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 6);

  return (
    <footer className="bg-neutral-950 text-neutral-300 border-t-4 border-red-600">
      {/* 1. BRAND */}
      <div className="border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 text-center md:text-left">
            <div>
              <Link href="/" className="inline-flex items-center gap-2">
                <span className="bg-red-600 text-white font-black text-2xl px-2 py-0.5 rounded tracking-tighter">
                  CN
                </span>
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
                  Code<span className="text-red-600">Nexon</span>
                </span>
              </Link>
              <p className="text-xs text-neutral-400 mt-2 max-w-md">
                Guides and comparisons on hosting, WordPress and business software for people who build and run
                websites.
              </p>
            </div>

            <div className="max-w-sm text-xs text-neutral-400">
              <span className="block font-bold uppercase tracking-wider text-white mb-1">
                Written by{" "}
                <Link href={authorPath} className="hover:text-red-400 underline underline-offset-2">
                  {author.name}
                </Link>
              </span>
              <p>{author.bio}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. LINK COLUMNS */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-8 text-xs">
          {/* Categories */}
          <div className="lg:col-span-2">
            <h4 className={headingClass}>Categories</h4>
            <ul className={listClass}>
              {pillars.map((pillar) => (
                <li key={pillar.id}>
                  <Link href={pillarPath(pillar)} className="hover:text-red-400">
                    {pillar.name}
                  </Link>
                  <span className="text-neutral-600"> ({postsByPillar(pillar.id).length})</span>
                </li>
              ))}
              <li>
                <Link href={GUIDES_PATH} className="hover:text-red-400">
                  All Guides
                </Link>
                <span className="text-neutral-600"> ({posts.length})</span>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className={headingClass}>Company</h4>
            <ul className={listClass}>
              {infoPagesByGroup("company").map((page) => (
                <li key={page.slug}>
                  <Link href={`/${page.slug}`} className="hover:text-red-400">
                    {page.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={authorPath} className="hover:text-red-400">
                  About the Author
                </Link>
              </li>
            </ul>
          </div>

          {/* Latest blogs */}
          <div className="lg:col-span-5">
            <h4 className={headingClass}>Latest Blogs</h4>
            <ul className={`${listClass} lg:columns-2 lg:gap-x-6 lg:[&>li]:break-inside-avoid`}>
              {latestPosts.map((post) => (
                <li key={post.slug}>
                  <Link href={postPath(post)} className="hover:text-red-400">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div className="lg:col-span-3">
            <h4 className={headingClass}>Policies</h4>
            <ul className={listClass}>
              {infoPagesByGroup("policy").map((page) => (
                <li key={page.slug}>
                  <Link href={`/${page.slug}`} className="hover:text-red-400">
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 3. EDITORIAL STANDARDS */}
      <div className="border-t border-neutral-800 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4 text-[11px] text-neutral-400">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <CalendarCheck className="w-4 h-4 text-red-500" />
              <span>Prices carry the date they were checked</span>
            </span>
            <span className="flex items-center gap-1.5 text-neutral-300">
              <Link2 className="w-4 h-4 text-sky-500" />
              <span>Facts link to the vendor&apos;s own page</span>
            </span>
            <span className="flex items-center gap-1.5 text-neutral-300">
              <FlaskConical className="w-4 h-4 text-yellow-500" />
              <span>No test results claimed unless we ran the test</span>
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-neutral-400 hover:text-white px-2 py-1 border border-neutral-700 hover:border-neutral-500 rounded text-xs transition"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4. COPYRIGHT STRIP */}
      <div className="border-t border-neutral-800 bg-black">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1 text-center text-[11px] text-neutral-500">
          <span>© 2026 CodeNexon</span>
          <span aria-hidden="true">|</span>
          <span>All rights reserved</span>
          <span aria-hidden="true">|</span>
          <span>
            Owned, developed and managed by{" "}
            <a
              href={owner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-300 hover:text-red-400 underline underline-offset-2"
            >
              {owner.name}
            </a>
          </span>
          <span aria-hidden="true">|</span>
          <button onClick={openConsentSettings} className="hover:text-red-400 underline underline-offset-2">
            Cookie settings
          </button>
        </div>
      </div>
    </footer>
  );
}
