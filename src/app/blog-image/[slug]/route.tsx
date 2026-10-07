import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getPillar, getPost, posts } from "@/data/posts";

// PNG version of the blog image template (components/PostCover.tsx), used for
// social previews and structured data. One file per post, built ahead of time.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

const RED = "#dc2626";

// Same typeface as the site (Rethink Sans, SIL Open Font License)
const fontFile = path.join(process.cwd(), "src", "assets", "fonts", "RethinkSans-ExtraBold.ttf");

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return new Response("Not found", { status: 404 });

  const fontData = await readFile(fontFile);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#0a0a0a",
          color: "#ffffff",
          fontFamily: "Rethink Sans",
        }}
      >
        {/* Red corner band */}
        <div
          style={{
            position: "absolute",
            right: -144,
            top: -144,
            width: 408,
            height: 408,
            transform: "rotate(45deg)",
            backgroundColor: RED,
          }}
        />
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 14, backgroundColor: RED }} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "60px 60px 60px 72px",
          }}
        >
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                backgroundColor: RED,
                fontSize: 40,
                fontWeight: 800,
                padding: "6px 14px",
                borderRadius: 6,
                marginRight: 16,
              }}
            >
              CN
            </div>
            <div style={{ display: "flex", fontSize: 40, fontWeight: 800, letterSpacing: -1 }}>
              <span>CODE</span>
              <span style={{ color: RED }}>NEXON</span>
            </div>
          </div>

          {/* Blog name */}
          <div
            style={{
              display: "flex",
              fontSize: 66,
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: -1.5,
              paddingRight: 120,
            }}
          >
            {post.title}
          </div>

          {/* Category and post type */}
          <div style={{ display: "flex", alignItems: "center", fontSize: 28, fontWeight: 700, letterSpacing: 3 }}>
            <span style={{ color: "#ef4444" }}>{getPillar(post.pillar).name.toUpperCase()}</span>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#737373",
                margin: "0 20px",
              }}
            />
            <span style={{ color: "#d4d4d4" }}>{post.type.toUpperCase()}</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Rethink Sans", data: fontData, weight: 800, style: "normal" }],
    }
  );
}
