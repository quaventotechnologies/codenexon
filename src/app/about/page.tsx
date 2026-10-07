import InfoPageView, { infoPageMetadata } from "@/components/InfoPageView";

const SLUG = "about";

export const metadata = infoPageMetadata(SLUG);

export default function Page() {
  return <InfoPageView slug={SLUG} />;
}
