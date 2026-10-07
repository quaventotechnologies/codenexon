import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SITE_URL } from "@/data/posts";

export interface Crumb {
  label: string;
  // Site-relative path, e.g. /hosting-cloud. The trail mirrors the URL.
  path: string;
}

// Visible breadcrumb trail plus matching BreadcrumbList structured data
export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const items: Crumb[] = [{ label: "Home", path: "/" }, ...trail];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex flex-wrap items-center gap-1 text-xs text-neutral-500">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1 min-w-0">
                {index > 0 && <ChevronRight className="w-3 h-3 shrink-0" />}
                {isLast ? (
                  <span aria-current="page" className="text-neutral-700 dark:text-neutral-300 line-clamp-1">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.path} className="hover:text-red-600 dark:hover:text-red-400 whitespace-nowrap">
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
