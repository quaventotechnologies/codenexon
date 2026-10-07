"use client";

import React from "react";

interface AffiliateLinkProps {
  href: string;
  // Identifies the post and placement in the affiliate dashboard, e.g. "ttfb-verdict"
  subId?: string;
  // Query parameter the program uses for sub-IDs
  subIdParam?: string;
  className?: string;
  children: React.ReactNode;
}

// Outbound affiliate link: marked rel="sponsored" and reports the click to analytics
// when a dataLayer exists. Not used until an affiliate program is in place; pages
// that use it must also carry the disclosure described on /disclosure.
export default function AffiliateLink({
  href,
  subId,
  subIdParam = "subid",
  className = "text-red-600 dark:text-red-400 underline underline-offset-2 hover:no-underline",
  children,
}: AffiliateLinkProps) {
  let url = href;
  if (subId) {
    try {
      const parsed = new URL(href);
      parsed.searchParams.set(subIdParam, subId);
      url = parsed.toString();
    } catch {
      // Leave malformed URLs untouched
    }
  }

  const trackClick = () => {
    const layer = (window as unknown as { dataLayer?: unknown[] }).dataLayer;
    layer?.push({ event: "affiliate_click", affiliate_url: href, affiliate_sub_id: subId ?? null });
  };

  return (
    <a href={url} target="_blank" rel="sponsored nofollow noopener" onClick={trackClick} className={className}>
      {children}
    </a>
  );
}
