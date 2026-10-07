import InfoPageView, { infoPageMetadata } from "@/components/InfoPageView";

const SLUG = "terms-and-conditions";

export const metadata = infoPageMetadata(SLUG);

export default function Page() {
  return <InfoPageView slug={SLUG} />;
}
