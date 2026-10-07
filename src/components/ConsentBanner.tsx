"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { onOpenConsentSettings, setConsent, startAnalytics, useConsent } from "@/lib/analytics";

// Asks once whether analytics may run. Reopened from "Cookie settings" in the footer.
export default function ConsentBanner() {
  const consent = useConsent();
  const [reopened, setReopened] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Storage is only readable in the browser, so decide visibility after mount
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    void startAnalytics();
    return onOpenConsentSettings(() => setReopened(true));
  }, []);

  if (!mounted || (consent !== "unset" && !reopened)) return null;

  const choose = (choice: "granted" | "denied") => {
    setReopened(false);
    setConsent(choice);
  };

  return (
    <div
      role="dialog"
      aria-label="Analytics cookies"
      className="fixed inset-x-0 bottom-0 z-40 bg-white dark:bg-neutral-900 border-t-4 border-red-600 shadow-[0_-4px_16px_rgba(0,0,0,0.12)]"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
        <p className="flex-1 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
          <span className="font-bold text-neutral-950 dark:text-white">Can we count visits?</span> We use Google
          Analytics to see which guides are read, so we know what to improve. It sets cookies only if you accept.
          Details are in the{" "}
          <Link href="/privacy-policy" className="text-red-600 dark:text-red-400 underline underline-offset-2 hover:no-underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => choose("denied")}
            className="flex-1 md:flex-none border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-bold uppercase tracking-wider text-xs px-4 py-2.5 transition"
          >
            Decline
          </button>
          <button
            onClick={() => choose("granted")}
            className="flex-1 md:flex-none bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider text-xs px-4 py-2.5 transition"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
