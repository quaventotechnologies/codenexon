For a Next.js site, Vercel is the simplest choice because the same company builds the framework and every feature works without configuration. Netlify is the closest alternative and now bills through a credit system. Firebase is the best fit if your app already uses Firebase Auth or Firestore, but server-rendered Next.js needs Firebase App Hosting on the paid Blaze plan. All three host small projects for free or close to it.

Below is how the free tiers, paid plans and bandwidth charges compare, using prices read from each company's pricing page on October 6, 2026.

> **How this guide was researched.** This comparison uses published pricing and documentation, linked under Sources. It is not a speed benchmark. CodeNexon itself is built with Next.js and uses Firebase for its newsletter form, which is why we follow these three platforms closely.

## Quick answer: which platform for which project?

| Your project | Best fit | Why |
|--------------|----------|-----|
| Personal Next.js site or portfolio | Vercel Hobby | 100 GB transfer a month, zero setup |
| Client or business site on Next.js | Vercel Pro or Netlify Pro | Both are $20 a month and allow commercial use |
| Static site or Astro, Hugo, Eleventy | Netlify Free or Firebase Hosting | Generous for static files, simple deploys |
| App already using Firestore and Firebase Auth | Firebase App Hosting | One project, one bill, one console |
| Side project that must stay at $0 for commercial use | Netlify Free or Firebase Hosting (static export) | Neither restricts commercial use on the free tier |

## Pricing side by side

| | Vercel | Netlify | Firebase |
|---|--------|---------|----------|
| Free plan | Hobby, $0 | Free, $0 | Spark, $0 |
| Free bandwidth | 100 GB a month | Paid from 300 monthly credits at 20 credits per GB | 360 MB a day on Hosting |
| Entry paid plan | Pro, $20 a month | Personal, $9 a month. Pro, $20 a month | Blaze, pay as you go |
| Included on paid plan | 1 TB transfer, 10 million CDN requests | 1,000 credits on Personal, 3,000 on Pro | Same free allowances, then metered |
| Extra bandwidth | From $0.15 per GB | 20 credits per GB, about $0.13 on Pro | $0.15 per GB on Hosting |
| Server-side rendering on free plan | Yes | Yes, paid from credits | No. App Hosting needs Blaze |

## Vercel: built for Next.js

Vercel is the company that develops Next.js, and the platform is designed around it. You connect a Git repository, and each push builds the site and gives you a preview link. Server components, route handlers, image optimization and incremental static regeneration all work without adapters or extra settings.

### Vercel pricing

**Hobby ($0).** The pricing page lists 100 GB of Fast Data Transfer and 1 million function invocations a month. Vercel describes the plan as "the perfect starting place for your web app or personal project", and its fair use terms restrict Hobby to personal, non-commercial projects. If the site earns money, sells something or belongs to a client, you are expected to be on Pro.

**Pro ($20 a month).** Pro includes 1 TB of Fast Data Transfer and 10 million CDN requests a month. Beyond that, transfer starts at $0.15 per GB and CDN requests at $2 per million. Function invocations start at $0.60 per million. Build minutes are billed by the minute according to the machine size you choose.

**Enterprise.** Custom pricing.

### What to watch on Vercel

The flat $20 is easy to understand. The usage lines are where a bill grows. Three settings are worth checking in the first week:

- **Spend management.** Set a monthly cap and choose whether projects pause when it is reached.
- **Image optimization.** Next.js image optimization is metered. Large galleries with many sizes add up.
- **Function duration.** Slow API routes and long server renders use more compute than you might expect.

### Who should choose Vercel

Pick Vercel if you want Next.js to work exactly as the documentation describes, you value preview deployments for every pull request, and $20 a month is acceptable once the project is commercial.

## Netlify: flexible, now priced in credits

Netlify popularized the Git-based deploy workflow and remains framework-neutral. It runs Next.js through its own adapter, and it is just as comfortable with Astro, SvelteKit, Hugo or plain HTML. Forms, redirects and serverless functions are built in.

### Netlify pricing

Netlify moved to credit-based pricing. Each plan includes a monthly pool of credits, and every kind of usage draws from that one pool.

| Plan | Price | Credits per month |
|------|-------|-------------------|
| Free | $0 | 300 |
| Personal | $9 a month | 1,000 |
| Pro | $20 a month | 3,000 |
| Enterprise | Custom | Custom |

What a credit buys, according to the pricing page:

| Usage | Credit cost |
|-------|-------------|
| Production deploy | 15 credits each |
| Bandwidth | 20 credits per GB |
| Compute | 10 credits per GB-hour |
| Web requests | 2 credits per 10,000 requests |

If you run out, extra packs are 500 credits for $5 on Personal and 1,500 credits for $10 on Pro.

### What 300 free credits actually cover

The credit system is clear once you run the numbers. A hobby project on the Free plan might use its 300 credits like this in a month:

- 10 production deploys: 150 credits
- 5 GB of bandwidth: 100 credits
- 250,000 web requests: 50 credits

That is the whole allowance. Deploys are the item people overlook. At 15 credits each, 20 production deploys in a month would use all 300 credits before a single visitor arrives. If you push to production several times a day, batch your changes or use preview deploys while you work.

On Pro, 3,000 credits could cover 30 deploys (450), 100 GB of bandwidth (2,000) and 1 million requests (200), with 350 credits left for compute.

### Who should choose Netlify

Pick Netlify if you use more than one framework, want forms and redirects without extra services, or need a free tier that allows commercial projects. Watch the deploy count.

## Firebase: two different hosting products

Firebase has two products with similar names, and choosing the wrong one is the most common mistake.

**Firebase Hosting** serves static files from Google's CDN. It works on the free Spark plan. It is ideal for a static export of a Next.js site, a single-page app or any site generated at build time.

**Firebase App Hosting** is the newer product for full-stack frameworks. It builds and runs server-rendered Next.js and Angular apps on Google Cloud, deploying from a GitHub repository. It is available only on the Blaze pay-as-you-go plan.

### Firebase pricing

| | Spark (free) | Blaze (pay as you go) |
|---|--------------|----------------------|
| Hosting storage | 10 GB | Free up to 10 GB, then $0.026 per GB |
| Hosting data transfer | 360 MB a day | Free up to 360 MB a day, then $0.15 per GB |
| App Hosting | Not available | Uncached bandwidth free up to 10 GiB a month, then $0.20 per GiB. Cached bandwidth $0.15 per GiB |
| App Hosting storage | Not available | Free up to 5 GB, then $0.10 per GB |
| Custom domain and SSL | Included | Included |

App Hosting also uses Cloud Run and Cloud Build behind the scenes, and those are billed at their own Google Cloud rates. Small projects often stay within the free allowances for both, but the bill has more moving parts than Vercel's or Netlify's.

### What 360 MB a day means in practice

The Spark limit is daily, not monthly, which changes how it behaves. If your average page weighs 1.5 MB and nothing is cached in the visitor's browser, 360 MB covers about 240 full page loads a day. Over a 30-day month the allowance totals about 10.8 GB.

That is plenty for a portfolio or documentation site. A post that gets shared widely on one afternoon can exceed the daily limit, at which point the site stops serving on Spark until the quota resets. On Blaze you would pay $0.15 per extra GB and stay online.

### Who should choose Firebase

Pick Firebase if your app already depends on Firestore, Firebase Auth, Cloud Functions or Cloud Messaging. Keeping hosting in the same project means one set of credentials, one console and one bill. If you have no other tie to Firebase or Google Cloud, Vercel or Netlify will get a Next.js site online with less setup.

## How well does each platform support Next.js features?

| Next.js feature | Vercel | Netlify | Firebase Hosting | Firebase App Hosting |
|-----------------|--------|---------|------------------|----------------------|
| Static pages | Yes | Yes | Yes | Yes |
| Server-side rendering | Yes | Yes | No | Yes |
| Route handlers and server actions | Yes | Yes | No | Yes |
| Image optimization | Built in | Through Netlify Image CDN | Not with static export | Yes |
| Preview deploys per branch | Yes | Yes | Preview channels | Rollouts from GitHub |

If you use `output: "export"` in your Next.js config, the build produces plain HTML, CSS and JavaScript, and any of the four options will host it. You give up server rendering, route handlers and the default image optimizer. For a blog or marketing site that trade is often fine.

New Next.js features reach Vercel first because the same team ships both. Netlify and Firebase support them through adapters, which usually follow within weeks. If you plan to adopt new framework features the day they are released, that gap is the main technical argument for Vercel.

## What would each cost for a real site?

Estimates are only useful with numbers, so here are three scenarios. They cover hosting charges only and assume static or cached pages.

### Scenario 1: personal blog, 20 GB of transfer a month

- **Vercel Hobby:** $0. Well inside 100 GB.
- **Netlify Free:** 20 GB needs 400 credits, which is more than the 300 included. You would need the $9 Personal plan.
- **Firebase Hosting Spark:** the monthly total of about 10.8 GB is not enough. On Blaze the extra 9.2 GB costs about $1.38.

### Scenario 2: small business site, 80 GB a month, 15 deploys

- **Vercel Pro:** $20. Commercial use needs Pro, and 80 GB is inside 1 TB.
- **Netlify Pro:** 80 GB is 1,600 credits and 15 deploys is 225, a total of 1,825 of the 3,000 included. $20.
- **Firebase Hosting Blaze:** 80 GB minus the free 10.8 GB is 69.2 GB at $0.15, about $10.38.

### Scenario 3: growing content site, 500 GB a month

- **Vercel Pro:** $20. Still inside 1 TB.
- **Netlify Pro:** 500 GB is 10,000 credits. After the 3,000 included, you need 7,000 more, which is five packs of 1,500 at $10 each. About $70 in total.
- **Firebase Hosting Blaze:** 489.2 GB at $0.15 is about $73.38.

The pattern is clear. At very low traffic all three are free or nearly free. In the middle, Firebase's metered pricing is cheapest. At higher bandwidth, Vercel Pro's 1 TB allowance is the best value of the three. Function usage, builds and image optimization are extra on every platform, so treat these as a floor.

If you would rather pay a flat fee and manage the server yourself, a $6 VPS includes 1,000 GiB of transfer. We compare that route in [Shared vs VPS vs Cloud Hosting](/shared-vs-vps-vs-cloud-hosting).

## How to move between them

Lock-in is lower than it looks, because your code is a standard Next.js project.

1. Keep platform-specific code in a few files. Environment variables, redirects and headers are the usual culprits.
2. Use `next.config` for redirects and headers where you can, instead of `vercel.json`, `netlify.toml` or `firebase.json`.
3. Move the domain last. Deploy to the new platform on its default URL, test it, then update your DNS records. [DNS Records Explained](/dns-records-explained) covers the records involved.
4. Lower the DNS TTL to 300 seconds a day before the switch so the change takes effect within minutes.

Data is the sticky part. A site that uses Firestore or Vercel's storage products has more to migrate than one that only serves pages.

## Frequently asked questions

### Is Vercel free for commercial use?

No. Vercel's Hobby plan is free and includes 100 GB of data transfer a month, but its fair use terms limit it to personal, non-commercial projects. A business site, a client site or anything that earns revenue belongs on the Pro plan at $20 a month.

### Can I host Next.js on Firebase for free?

Only as a static export. Firebase Hosting on the free Spark plan serves static files with 10 GB of storage and 360 MB of transfer a day. Server-rendered Next.js needs Firebase App Hosting, which is available only on the pay-as-you-go Blaze plan.

### How do Netlify credits work?

Each Netlify plan includes monthly credits: 300 on Free, 1,000 on Personal and 3,000 on Pro. Usage draws from that pool. A production deploy costs 15 credits, bandwidth costs 20 credits per GB, compute costs 10 credits per GB-hour and web requests cost 2 credits per 10,000.

### Which is cheapest for a high-traffic site?

Among these three, Vercel Pro is cheapest for bandwidth-heavy sites up to 1 TB a month because that transfer is included in the $20 fee. At 500 GB a month, Netlify Pro and Firebase Hosting both come to about $70 to $73. A self-managed VPS costs less still.

### Does Netlify support Next.js server-side rendering?

Yes. Netlify runs Next.js through its own adapter, which supports server rendering, route handlers and incremental static regeneration. New Next.js releases are usually supported shortly after launch. Compute and requests used by server rendering are paid from your monthly credits.

### What happens if I exceed the free limits?

On Vercel Hobby and Firebase Spark, the project is paused or stops serving until the limit resets or you upgrade. On Netlify Free, the site pauses when credits run out unless you move to a paid plan. Paid plans on all three bill for extra usage, so set a spending limit.

### Should I use Firebase Hosting or Firebase App Hosting?

Use Firebase Hosting for static sites and single-page apps. It is simpler and works on the free plan. Use Firebase App Hosting when you need server-side rendering, server actions or route handlers in Next.js or Angular, and accept that it requires the Blaze plan.

## Sources

All prices were read on October 6, 2026. These platforms change pricing often, so confirm the figures before you commit.

- [Vercel pricing](https://vercel.com/pricing)
- [Netlify pricing](https://www.netlify.com/pricing/)
- [Firebase pricing](https://firebase.google.com/pricing)
- [DigitalOcean Droplet pricing](https://www.digitalocean.com/pricing/droplets)
