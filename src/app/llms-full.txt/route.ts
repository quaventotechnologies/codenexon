import { buildLlmsFullTxt } from "@/lib/llms";

// Built once with the site; the full text of every guide in one file
export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsFullTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
