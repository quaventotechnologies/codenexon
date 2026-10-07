import AppShell from "@/components/AppShell";
import { LeadSection, PillarSection, StartHereSection } from "@/components/HomeSections";
import GuideTypeSection from "@/components/GuideTypeSection";
import NewsletterBanner from "@/components/NewsletterBanner";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL, owner, pillars } from "@/data/posts";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    email: CONTACT_EMAIL,
    parentOrganization: { "@type": "Organization", name: owner.name, url: owner.url },
  },
];

export default function HomePage() {
  return (
    <AppShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Lead guide, two secondary guides and the latest list */}
      <LeadSection />

      {/* One section per content pillar */}
      {pillars.map((pillar) => (
        <PillarSection key={pillar.id} pillarId={pillar.id} />
      ))}

      {/* Every post, filterable by post type */}
      <GuideTypeSection />

      {/* Suggested reading order for new visitors */}
      <StartHereSection />

      <NewsletterBanner />
    </AppShell>
  );
}
