import InfoPageView, { infoPageMetadata } from "@/components/InfoPageView";

const SLUG = "privacy-policy";

export const metadata = infoPageMetadata(SLUG);

export default function Page() {
  return <InfoPageView slug={SLUG} />;
}
