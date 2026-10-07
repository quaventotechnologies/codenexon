"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchModal from "@/components/SearchModal";
import SavedArticlesDrawer from "@/components/SavedArticlesDrawer";
import ConsentBanner from "@/components/ConsentBanner";
import { useBookmarks } from "@/lib/bookmarks";

// Shared page frame: header, footer, search and the saved-posts drawer
export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const saved = useBookmarks();

  // Lock page scroll behind the search and saved overlays
  const isOverlayOpen = isSearchOpen || isSavedOpen;
  useEffect(() => {
    if (!isOverlayOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOverlayOpen]);

  return (
    <div className="min-h-dvh flex flex-col bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-colors">
      <Header
        onSearchOpen={() => setIsSearchOpen(true)}
        onSavedOpen={() => setIsSavedOpen(true)}
        savedCount={saved.length}
      />

      <main className="flex-1">{children}</main>

      <Footer />

      <SavedArticlesDrawer isOpen={isSavedOpen} onClose={() => setIsSavedOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <ConsentBanner />
    </div>
  );
}
