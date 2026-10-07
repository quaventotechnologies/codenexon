To deploy a Next.js site to Firebase Hosting for free, build it as a static export and upload the output folder. Set `output: "export"` in `next.config.ts`, point `firebase.json` at the `out` folder, and run `firebase deploy --only hosting`. The free Spark plan includes 10 GB of storage and 360 MB of data transfer a day, which covers most small sites. If your app needs server-side rendering, use Firebase App Hosting instead, which requires the paid Blaze plan.

CodeNexon itself is built with Next.js and deployed this way, so the steps and numbers below come from running it, not from a demo project.

> **How this guide was written.** The commands are the standard Next.js and Firebase CLI commands. Plan limits come from Firebase's pricing page, linked under Sources. Build figures quoted for CodeNexon are from its own deploys in October 2026. Replace `my-project-id` with your Firebase project ID.

## Static export or App Hosting: which do you need?

Firebase offers two products for Next.js, and the first decision is which one fits your site.

| | Firebase Hosting with static export | Firebase App Hosting |
|---|-------------------------------------|----------------------|
| What it serves | Pre-built HTML, CSS, JavaScript and images | A running Next.js server on Google Cloud |
| Plan needed | Free Spark plan works | Blaze pay-as-you-go only |
| Server-side rendering | No | Yes |
| Server actions and dynamic route handlers | No | Yes |
| Default image optimization | No | Yes |
| Deploys from | Your computer or CI with the CLI | A connected GitHub repository |
| Suits | Blogs, documentation, marketing sites, portfolios | Apps with logins, per-user data, or content that changes per request |

A static export works when every page can be built ahead of time. A blog is the classic case. You know every post when you build, so every page can be written to a file. If a page has to look different for each visitor or change on every request, you need a server, and that means App Hosting or another platform.

You can still use client-side features in a static site. CodeNexon's theme switch, saved posts, search box and newsletter form all run in the browser and work fine on Firebase Hosting.

If you are still choosing a platform, [Firebase Hosting vs Vercel vs Netlify](/firebase-hosting-vs-vercel-vs-netlify) compares the free tiers and prices.

## What you need before you start

- Node.js installed. Next.js 16 needs a current LTS release.
- A Next.js project that builds without errors using `npm run build`.
- A Google account and a Firebase project. Create one free at the Firebase console.
- The Firebase CLI:

```
npm install -g firebase-tools
firebase login
```

`firebase login` opens a browser so you can sign in. Confirm it worked with `firebase projects:list`, which should show your project.

## Step 1: Turn on static export

Open `next.config.ts` and set the output mode:

```
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
};

export default nextConfig;
```

Now `npm run build` writes the whole site to a folder called `out`. Each page becomes an HTML file, and the JavaScript and CSS go into `out/_next`.

### Pages with dynamic segments

A route such as `app/[category]/[slug]/page.tsx` has to tell Next.js every value it should build. Export `generateStaticParams` and list them:

```
export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ category: post.category, slug: post.slug }));
}
```

`dynamicParams = false` makes any address you did not list return a 404, which is what you want on a static host.

### Route handlers such as sitemap.xml

Files like `app/sitemap.ts`, `app/robots.ts` or a custom `route.ts` must be marked static, or the build stops with an error that names the route:

```
export const dynamic = "force-static";
```

CodeNexon hit exactly this on its first export. The build failed with `export const dynamic = "force-static"/export const revalidate not configured on route "/sitemap.xml"`, and one line in each file fixed it.

### Images

The default Next.js image optimizer needs a server. With a static export you have two choices: add `images: { unoptimized: true }` to the config and serve images as they are, or use plain `<img>` tags with images you have already resized and compressed. Either way, do the optimization before deploying. [Core Web Vitals Explained](/core-web-vitals-explained) covers why image size matters.

## Step 2: Build and check the output

```
npm run build
```

When it finishes, Next.js prints a route table. Each page should be marked as static. Look inside `out`: you should see `index.html`, one HTML file per page, and the `_next` folder.

For scale, CodeNexon's build produced 74 routes and an `out` folder of about 12 MB, including 26 posts and a generated social image for each one. The free plan's 10 GB of storage is not going to be the limit for a site like this.

Preview the result locally before uploading. Any static file server works:

```
npx serve out
```

Click through several pages, including a deep link opened directly in a new tab. A page that only works when you navigate to it from the home page is a sign of a routing problem you want to find now.

## Step 3: Connect the project to Firebase

From the project folder, create two small configuration files. You can run `firebase init hosting` and answer the prompts, or write them yourself.

`.firebaserc` names the project:

```
{
  "projects": {
    "default": "my-project-id"
  }
}
```

`firebase.json` tells Firebase what to upload and how to serve it:

```
{
  "hosting": {
    "public": "out",
    "cleanUrls": true,
    "trailingSlash": false,
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
  }
}
```

Three settings matter here:

- **`public: "out"`** points at the export folder.
- **`cleanUrls: true`** serves `about.html` at `/about`, so addresses have no `.html` ending.
- **`trailingSlash: false`** keeps one form of each address, which avoids duplicate URLs.

If `firebase init` asks whether to configure the site as a single-page app and rewrite all URLs to `/index.html`, answer no. A static export already has a real file for every page, and that rewrite would hide genuine 404 errors behind your home page.

## Step 4: Deploy

```
firebase deploy --only hosting
```

The CLI compares your files with what is already live and uploads only what changed. On CodeNexon's first deploy it found 215 files and uploaded 180, with the rest already present. When it finishes it prints two addresses:

- `https://my-project-id.web.app`
- `https://my-project-id.firebaseapp.com`

Both serve your site immediately, with HTTPS included.

The `--only hosting` flag matters if your project also has Firestore rules, Functions or other services configured. It deploys the website and leaves everything else alone.

## Step 5: Add your own domain

1. In the Firebase console, open Hosting and choose **Add custom domain**.
2. Enter your domain, for example `example.com`.
3. Firebase shows the DNS records to add, usually a TXT record to prove ownership and then A records pointing at Firebase.
4. Add those records at your DNS provider.
5. Add `www.example.com` as a second domain and set it to redirect to the main one.

Firebase issues an SSL certificate once the records are in place. That can take from a few minutes to several hours. If you are replacing an existing site, lower the TTL on your current records a day ahead so the switch is quick. [DNS Records Explained](/dns-records-explained) shows how.

## Redirects and headers

Next.js redirects in `next.config` do not work with a static export, because there is no server to run them. Put them in `firebase.json` instead:

```
"redirects": [
  { "source": "/about.html", "destination": "/about", "type": 301 },
  { "source": "/old-post", "destination": "/blog/new-post", "type": 301 }
]
```

CodeNexon uses this to send addresses from its previous site, such as `/about.html` and `/terms.html`, to the new pages. Use 301 for permanent moves. [301 vs 302 Redirects](/301-vs-302-redirects) explains the difference.

Headers go in the same file. This caches the hashed build files for a year, which is safe because their names change whenever their content does:

```
"headers": [
  {
    "source": "/_next/static/**",
    "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
  }
]
```

You can add security headers the same way. [HTTP Security Headers Explained](/http-security-headers) lists the useful ones.

## Preview channels: test before going live

Firebase can publish a build to a temporary address without touching the live site:

```
firebase hosting:channel:deploy preview --expires 7d
```

It prints a URL such as `https://my-project-id--preview-abc123.web.app` that you can share for review. The channel deletes itself after seven days. This is the safest way to check a large change.

## Rolling back a bad deploy

Every deploy creates a new version. In the Firebase console, open Hosting, find the release history, and choose **Rollback** on the previous version. The old version is live again within seconds, without rebuilding anything.

That is the main reason to deploy often and in small steps. If something breaks, you know which deploy did it and can undo it immediately.

## What the free plan covers

| Spark plan limit | Amount |
|------------------|--------|
| Storage | 10 GB |
| Data transfer | 360 MB a day |
| Custom domain and SSL | Included |
| Multiple sites per project | Supported |

The daily transfer limit is the one to watch. If your average page, with its scripts and images, weighs 1 MB on a first visit, 360 MB covers roughly 360 fresh page loads a day. Returning visitors use less, because their browsers keep the cached files. Over 30 days the allowance totals about 10.8 GB.

If you outgrow it, the Blaze plan keeps the same free allowances and then charges $0.15 per GB of transfer and $0.026 per GB of storage beyond 10 GB. A site serving 50 GB in a month would pay about $5.88 for the 39.2 GB above the free amount. Set a budget alert in Google Cloud when you switch, so a sudden spike sends you an email instead of a surprise bill.

## Deploying automatically from GitHub

Typing `firebase deploy` by hand works, but it is easy to forget a step. The CLI can set up a GitHub Actions workflow for you:

```
firebase init hosting:github
```

It asks for the repository, creates a service account with permission to deploy, stores its key as a secret in GitHub, and writes two workflow files: one that deploys a preview for every pull request, and one that deploys to the live site when you merge to your main branch. Check that the build command in the generated workflow is `npm ci && npm run build`.

This also avoids a problem CodeNexon ran into: the CLI's sign-in on a single computer can expire, and a deploy then fails with an authentication error until someone runs `firebase login --reauth`. A service account in CI does not have that problem.

## Common errors and fixes

| Error or symptom | Cause | Fix |
|------------------|-------|-----|
| Build fails on `sitemap.xml` or another route | Route handler not marked static | Add `export const dynamic = "force-static"` |
| Build fails on a dynamic page | Missing `generateStaticParams` | List every value the segment can take |
| Image errors during build | Default image optimizer needs a server | Set `images: { unoptimized: true }` |
| Every page shows the home page | Single-page app rewrite to `/index.html` | Remove the catch-all rewrite from `firebase.json` |
| Pages load at `/about.html` but not `/about` | `cleanUrls` not set | Add `"cleanUrls": true` |
| Redirects in `next.config` do nothing | No server in a static export | Move them to `firebase.json` |
| "Authentication Error: Your credentials are no longer valid" | CLI sign-in expired | Run `firebase login --reauth`, or deploy from CI |
| Custom domain stuck on "pending" | DNS records not added or not yet visible | Check the records with `dig example.com A +short` |

## Frequently asked questions

### Can I host a Next.js site on Firebase for free?

Yes, as a static export. Firebase Hosting on the free Spark plan includes 10 GB of storage and 360 MB of data transfer a day, a custom domain and SSL. Set output to export in your Next.js config and deploy the out folder. Server-side rendering needs the paid Blaze plan.

### Does Firebase Hosting support Next.js server-side rendering?

Not with plain Firebase Hosting. For server-side rendering, server actions and dynamic route handlers, use Firebase App Hosting, which builds and runs your Next.js app on Google Cloud. App Hosting is available only on the pay-as-you-go Blaze plan.

### What is the difference between Firebase Hosting and App Hosting?

Firebase Hosting serves static files from a global network and works on the free plan. App Hosting runs a Next.js or Angular server on Google Cloud, deploys from a GitHub repository and supports server rendering. It needs the Blaze plan and bills for the Cloud services it uses.

### How do I add redirects to a static Next.js site on Firebase?

Add them to the redirects array in firebase.json, with a source path, a destination and a type of 301 or 302. Redirects defined in next.config are not applied in a static export, because there is no server running to process them.

### How do I roll back a Firebase Hosting deploy?

Open Hosting in the Firebase console, find the release history, and choose Rollback on an earlier version. The previous version is restored within seconds without a rebuild, so it is the quickest way to undo a bad deploy.

### How long does a custom domain take on Firebase Hosting?

The site works on your domain once the DNS records Firebase gives you are visible, which can take minutes to a few hours depending on your record TTL. Firebase then issues the SSL certificate, which can take up to several hours more.

### Do I need to rebuild the whole site to change one page?

You rebuild the whole export, but the deploy uploads only files that changed. For a site the size of CodeNexon, a full build takes under a minute and a typical deploy uploads a small fraction of its files.

## Sources

- [Firebase pricing](https://firebase.google.com/pricing)
- [Firebase Hosting: configure hosting behavior](https://firebase.google.com/docs/hosting/full-config)
- [Firebase Hosting: preview channels](https://firebase.google.com/docs/hosting/test-preview-deploy)
- [Next.js: static exports](https://nextjs.org/docs/app/guides/static-exports)
- [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)
