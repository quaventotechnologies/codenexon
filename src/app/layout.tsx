import type { Metadata } from "next";
import { Rethink_Sans } from "next/font/google";
import { themeInitScript } from "@/lib/theme";
import { SITE_NAME, SITE_URL, author } from "@/data/posts";
import "./globals.css";

const rethinkSans = Rethink_Sans({
  variable: "--font-rethink-sans",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CodeNexon: Hosting, WordPress and Software Guides",
    template: "%s | CodeNexon",
  },
  description:
    "Plain-English guides and comparisons on web hosting, cloud platforms, WordPress and business software, with dated prices and linked sources.",
  authors: [{ name: author.name }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "CodeNexon: Hosting, WordPress and Software Guides",
    description:
      "Guides and comparisons on web hosting, cloud platforms, WordPress and business software, with dated prices and linked sources.",
    url: "/",
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-US"
      className={`${rethinkSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col font-sans selection:bg-red-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
