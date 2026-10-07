"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "codenexon_saved_posts";
const EMPTY: string[] = [];

let cache: string[] = EMPTY;
let cacheRaw: string | null = null;
const listeners = new Set<() => void>();

function read(): string[] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    return cache;
  }
  // Keep the same array identity while storage is unchanged
  if (raw !== cacheRaw) {
    cacheRaw = raw;
    try {
      const parsed = raw ? JSON.parse(raw) : [];
      cache = Array.isArray(parsed) ? parsed.filter((s) => typeof s === "string") : EMPTY;
    } catch {
      cache = EMPTY;
    }
  }
  return cache;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function toggleBookmark(slug: string) {
  const current = read();
  const next = current.includes(slug) ? current.filter((s) => s !== slug) : [slug, ...current];
  cache = next;
  cacheRaw = JSON.stringify(next);
  try {
    localStorage.setItem(STORAGE_KEY, cacheRaw);
  } catch {
    // Storage blocked: bookmarks last for this session only
  }
  listeners.forEach((listener) => listener());
}

export function useBookmarks() {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}
