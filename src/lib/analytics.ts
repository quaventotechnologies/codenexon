"use client";

import { useSyncExternalStore } from "react";

// Google Analytics (through Firebase) loads only after the visitor accepts it.
export type Consent = "granted" | "denied" | "unset";

const STORAGE_KEY = "codenexon_analytics_consent";
const OPEN_EVENT = "codenexon:open-consent";

let memoryConsent: Consent = "unset";
let started = false;
const listeners = new Set<() => void>();

export function getConsent(): Consent {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "granted" || saved === "denied") return saved;
  } catch {
    // Fall through to the in-memory choice
  }
  return memoryConsent;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function useConsent() {
  return useSyncExternalStore<Consent>(subscribe, getConsent, () => "unset");
}

export async function startAnalytics() {
  if (started || getConsent() !== "granted") return;
  started = true;
  try {
    const [{ getAnalytics, isSupported }, { app }] = await Promise.all([
      import("firebase/analytics"),
      import("@/lib/firebase"),
    ]);
    if (await isSupported()) getAnalytics(app);
  } catch (error) {
    started = false;
    console.warn("Analytics could not start:", error);
  }
}

export function setConsent(consent: "granted" | "denied") {
  const wasRunning = started;
  memoryConsent = consent;
  try {
    localStorage.setItem(STORAGE_KEY, consent);
  } catch {
    // Storage blocked: the choice lasts for this page view only
  }
  listeners.forEach((listener) => listener());

  if (consent === "granted") {
    void startAnalytics();
  } else if (wasRunning) {
    // Analytics cannot be unloaded in place, so reload without it
    window.location.reload();
  }
}

// Lets the footer "Cookie settings" link reopen the banner
export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onOpenConsentSettings(handler: () => void) {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}
