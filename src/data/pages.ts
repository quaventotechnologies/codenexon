export interface InfoPage {
  slug: string;
  title: string;
  description: string;
  updatedAt: string;
  // Company pages explain who we are; policy pages are the legal and editorial rules
  group: "company" | "policy";
}

// Policy and information pages. Bodies live in src/content/pages/<slug>.md
export const infoPages: InfoPage[] = [
  {
    slug: "about",
    title: "About CodeNexon",
    description:
      "What CodeNexon covers, who writes it, who owns it and the rules every guide follows.",
    updatedAt: "2026-10-06",
    group: "company",
  },
  {
    slug: "how-we-test",
    title: "How We Test and Research",
    description:
      "The research method behind every CodeNexon guide, and the test protocol and scoring rubric used for hands-on reviews.",
    updatedAt: "2026-10-06",
    group: "company",
  },
  {
    slug: "contact",
    title: "Contact",
    description: "How to reach CodeNexon with a correction, a question or a business enquiry.",
    updatedAt: "2026-10-06",
    group: "company",
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description:
      "What personal data CodeNexon collects, why, where it is stored, and how to ask for it to be removed.",
    updatedAt: "2026-10-06",
    group: "policy",
  },
  {
    slug: "terms-and-conditions",
    title: "Terms & Conditions",
    description: "The terms that apply when you read or use CodeNexon, including acceptable use and liability.",
    updatedAt: "2026-10-06",
    group: "policy",
  },
  {
    slug: "copyright-policy",
    title: "Copyright Policy",
    description:
      "Who owns the content on CodeNexon, how you may quote it, and how to report a copyright concern.",
    updatedAt: "2026-10-06",
    group: "policy",
  },
  {
    slug: "disclosure",
    title: "Disclosure",
    description:
      "How CodeNexon is funded, its position on affiliate links and sponsored content, and how recommendations are made.",
    updatedAt: "2026-10-06",
    group: "policy",
  },
  {
    slug: "disclaimer",
    title: "Disclaimer",
    description:
      "The limits of the information on CodeNexon: prices change, guides are general information, and trademarks belong to their owners.",
    updatedAt: "2026-10-06",
    group: "policy",
  },
  {
    slug: "editorial-policy",
    title: "Editorial Policy",
    description:
      "How CodeNexon researches, writes, dates and corrects its guides, and how it uses AI tools.",
    updatedAt: "2026-10-06",
    group: "policy",
  },
];

export function getInfoPage(slug: string) {
  return infoPages.find((page) => page.slug === slug);
}

export function infoPagesByGroup(group: InfoPage["group"]) {
  return infoPages.filter((page) => page.group === group);
}
