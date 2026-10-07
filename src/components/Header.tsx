"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Bookmark, Menu, X, Plus, Ellipsis, Sparkles } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { GUIDES_PATH, getPost, pillarPath, pillars, postPath } from "@/data/posts";

interface HeaderProps {
  onSearchOpen: () => void;
  onSavedOpen: () => void;
  savedCount: number;
}

export const navLinks = [
  { label: "Home", href: "/" },
  ...pillars.map((pillar) => ({ label: pillar.name, href: pillarPath(pillar) })),
  { label: "All Guides", href: GUIDES_PATH },
  { label: "About", href: "/about" },
  { label: "How We Test", href: "/how-we-test" },
];

// Short labels for the topic bar under the main navigation
const topicLinks = [
  { label: "Choosing a Host", slug: "how-to-choose-web-hosting" },
  { label: "Renewal Prices", slug: "web-hosting-renewal-prices" },
  { label: "Vercel vs Netlify vs Firebase", slug: "firebase-hosting-vs-vercel-vs-netlify" },
  { label: "Slow WordPress", slug: "why-is-my-wordpress-site-slow" },
  { label: "SPF, DKIM, DMARC", slug: "spf-dkim-dmarc-explained" },
  { label: "Stripe vs PayPal", slug: "stripe-vs-paypal-fees" },
  { label: "Free SSL", slug: "free-ssl-certificate-lets-encrypt" },
].flatMap((topic) => {
  const post = getPost(topic.slug);
  return post ? [{ label: topic.label, href: postPath(post) }] : [];
});

export default function Header({ onSearchOpen, onSavedOpen, savedCount }: HeaderProps) {
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium");
  const [menuOpen, setMenuOpen] = useState(false);

  // Font size toggle
  const cycleFontSize = () => {
    const nextSize = fontSize === "small" ? "medium" : fontSize === "medium" ? "large" : "small";
    setFontSize(nextSize);
    document.documentElement.setAttribute("data-font-size", nextSize);
  };

  return (
    <header className="w-full bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      {/* 1. TOP UTILITY STRIP */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between gap-3">
          {/* Short wording on phones so the strip stays on one row */}
          <span className="min-w-0 truncate font-medium text-neutral-800 dark:text-neutral-200">
            <span className="sm:hidden">Prices dated and sourced</span>
            <span className="hidden sm:inline">Prices and facts are dated and linked to their source</span>
          </span>

          <div className="flex shrink-0 items-center space-x-3 sm:space-x-4">
            {/* Font size resizer */}
            <button
              onClick={cycleFontSize}
              title="Adjust Font Size"
              className="px-1.5 py-0.5 border border-neutral-300 dark:border-neutral-700 rounded text-[11px] hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
            >
              A{fontSize === "small" ? "-" : fontSize === "large" ? "+" : ""}
            </button>

            {/* Saved posts */}
            <button
              onClick={onSavedOpen}
              className="flex items-center gap-1 hover:text-red-600 dark:hover:text-red-400 transition"
              title="Saved posts"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Saved</span>
              {savedCount > 0 && (
                <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 rounded-full">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Theme: Light / Dark / Device */}
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* 2. MASTHEAD */}
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div className="hidden lg:block text-left text-xs text-neutral-500 max-w-[200px]">
            <p className="font-semibold text-neutral-800 dark:text-neutral-200">INDEPENDENT GUIDES</p>
            <p className="text-[11px] text-neutral-500">
              Plain answers on hosting, WordPress and business software.
            </p>
          </div>

          {/* Center: Brand Logo */}
          <Link href="/" className="justify-self-center text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="bg-red-600 text-white font-black text-xl min-[380px]:text-2xl md:text-3xl px-2.5 py-0.5 rounded tracking-tighter">
                CN
              </span>
              <span className="text-[1.7rem] min-[380px]:text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-950 dark:text-white uppercase">
                Code<span className="text-red-600">Nexon</span>
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] tracking-widest text-neutral-500 uppercase mt-1 font-semibold">
              Hosting, WordPress and Software Guides
            </p>
          </Link>
        </div>
      </div>

      {/* 3. PRIMARY NAVIGATION: section bar + topic bar */}
      <nav aria-label="Primary" className="relative z-30">
        {/* Row 1: brand mark, sections, Latest / search / menu */}
        <div className="bg-neutral-100 dark:bg-neutral-800/60">
          <div className="max-w-7xl mx-auto px-3 sm:px-4">
            <div className="flex items-center h-12 border-b-2 border-neutral-900 dark:border-neutral-100">
              {/* Brand mark */}
              <Link
                href="/"
                className="shrink-0 flex items-start pr-3 sm:pr-4 text-lg sm:text-xl font-black tracking-tight leading-none text-neutral-950 dark:text-white"
                aria-label="CodeNexon home"
              >
                CN
                <Plus className="w-3.5 h-3.5 text-red-600 -ml-px" strokeWidth={5} />
              </Link>

              {/* Sections: swipeable rail when they do not all fit */}
              <div className="flex flex-1 min-w-0 items-center overflow-x-auto no-scrollbar">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center h-12 px-2.5 lg:px-3 text-sm sm:text-[15px] font-medium whitespace-nowrap text-neutral-900 dark:text-neutral-100 transition-colors hover:text-red-600 dark:hover:text-red-400"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* More sections */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="hidden sm:flex shrink-0 items-center h-12 px-2.5 text-neutral-900 dark:text-neutral-100 hover:text-red-600 dark:hover:text-red-400"
                aria-label="More sections"
                aria-expanded={menuOpen}
              >
                <Ellipsis className="w-5 h-5" strokeWidth={3} />
              </button>

              {/* Right: Latest, search, menu */}
              <div className="shrink-0 flex items-center gap-1 sm:gap-2 pl-2 sm:pl-4">
                <Link
                  href={GUIDES_PATH}
                  className="flex items-center gap-1.5 h-9 px-2 sm:px-2.5 rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:bg-red-100 dark:hover:bg-red-950/70 transition-colors"
                  aria-label="Latest posts"
                >
                  <Sparkles className="w-5 h-5 text-red-600" />
                  <span className="hidden min-[400px]:inline">Latest</span>
                </Link>

                <button
                  onClick={onSearchOpen}
                  className="flex items-center justify-center w-9 h-9 rounded text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center justify-center w-9 h-9 rounded text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                  aria-label="Toggle navigation menu"
                  aria-expanded={menuOpen}
                >
                  {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" strokeWidth={1.5} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* All sections panel */}
        {menuOpen && (
          <div className="absolute inset-x-0 top-12 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1.5 text-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-2.5 px-3 rounded font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Row 2: popular guides */}
        <div className="bg-white dark:bg-neutral-900">
          <div className="max-w-7xl mx-auto px-3 sm:px-4">
            <div className="flex items-center h-12 sm:h-14 gap-3">
              <span className="shrink-0 text-sm sm:text-[15px] font-semibold text-red-600 dark:text-red-400 whitespace-nowrap">
                Popular Guides
              </span>

              <div className="flex flex-1 min-w-0 items-center overflow-x-auto no-scrollbar">
                {topicLinks.map((topic) => (
                  <Link
                    key={topic.href}
                    href={topic.href}
                    className="flex items-center h-12 px-2.5 sm:px-3.5 text-sm sm:text-[15px] font-medium text-neutral-900 dark:text-neutral-100 whitespace-nowrap hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    {topic.label}
                  </Link>
                ))}
              </div>

              <a
                href="https://www.google.com/preferences/source?q=codenexon.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex shrink-0 items-center gap-1.5 h-8 px-2.5 rounded border border-neutral-700 dark:border-neutral-400 text-[13px] font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors whitespace-nowrap"
              >
                <span>Preferred on</span>
                <svg viewBox="0 0 24 24" className="w-4 h-4" aria-label="Google" role="img">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.07H2.18a11 11 0 0 0 0 9.86l3.66-2.84z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
