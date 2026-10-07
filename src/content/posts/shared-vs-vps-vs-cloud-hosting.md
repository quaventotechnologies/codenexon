Shared hosting puts your site on a server with hundreds of others and costs $3 to $4 a month to start. A VPS gives you a fixed slice of a server that nobody else can use, from about $4 to $6 a month, but you manage it yourself. Cloud hosting bills you for what you use and scales up on its own. Most new sites should start on shared hosting and move only when they have a reason.

The rest of this guide explains how each type works, what it costs with real October 2026 prices, and the specific signs that tell you it is time to move from one to the next.

> **How this guide was researched.** Prices and plan specifications were read from each provider's pricing page on October 6, 2026 and are linked under Sources. This is an explainer, not a benchmark. We have not run speed tests on these plans for this post.

## Shared vs VPS vs cloud at a glance

| | Shared hosting | VPS | Cloud platform |
|---|----------------|-----|----------------|
| What you get | A folder on a server shared with many sites | A virtual machine with fixed CPU, memory and disk | Capacity on demand across many machines |
| Starting price | $2.99 to $3.99/month on a long first term | $4 to $7/month | $0 to $20/month plus usage |
| Who manages the server | The host | You | The platform |
| Skills needed | None | Linux command line | Git and a framework, or cloud consoles |
| Handles traffic spikes | Poorly | Up to the size you bought | Well, and bills you for it |
| Best for | New sites, blogs, small business sites | Custom apps, several sites, steady traffic | Web apps, variable traffic, developer teams |

## What is shared hosting?

Shared hosting means your website lives on one physical server together with many other customers' sites. Everyone shares the same processor, memory and network connection. The host installs and updates the server software, and you manage your site through a control panel.

The apartment comparison holds up well. You pay little because the building's costs are split among many tenants. You do not fix the plumbing. In exchange, you cannot knock down walls, and a noisy neighbor can affect you.

### What shared hosting costs

On October 6, 2026 the entry plans at three large hosts were priced like this.

| Host and plan | First-term price | Renewal price | Websites | Storage |
|---------------|------------------|---------------|----------|---------|
| Hostinger Premium | $2.99/month for 48 months | $10.99/month | 3 | 20 GB SSD |
| Bluehost Starter | $3.99/month for 36 months | $9.99/month | 10 | 10 GB NVMe |
| SiteGround StartUp | $3.99/month for 12 months | $17.99/month | 1 | 10 GB |

Those first-term prices need a prepayment for the whole term, and the renewal price applies afterwards. Our post on [web hosting renewal prices](/web-hosting-renewal-prices) works through what each plan costs over five years.

### Where shared hosting works well

- A new blog, portfolio or company site with up to a few thousand visits a month.
- Anyone who does not want to maintain a server.
- Sites built on WordPress, where one-click installers and automatic updates save real time.

### Where it runs out

Shared plans limit how much processor time and memory each account can use, even when the plan says "unlimited" bandwidth. SiteGround is unusually direct about this and states that StartUp suits about 10,000 visits a month. When you pass a plan's limits, pages slow down or the host asks you to upgrade.

You also cannot change server-level settings or install your own software. If your project needs Node.js running as a long-lived process, a specific database version or a background worker, shared hosting is the wrong tool.

## What is a VPS?

A virtual private server is one physical machine divided into several isolated virtual machines. Each one gets its own guaranteed share of CPU, memory and disk, its own operating system and its own root login. Other customers on the same hardware cannot use your share.

This is the townhouse. The walls are yours, you choose the furniture, and you fix what breaks.

### What a VPS costs

VPS pricing is simpler than shared hosting. There is no promotional rate and no renewal jump. You pay the listed price monthly, or by the hour if you delete the server early.

| Provider and size | Monthly price | Memory | vCPUs | SSD | Transfer included |
|-------------------|---------------|--------|-------|-----|-------------------|
| DigitalOcean Basic | $4 | 512 MiB | 1 | 10 GB | 500 GiB |
| DigitalOcean Basic | $6 | 1 GiB | 1 | 25 GB | 1,000 GiB |
| DigitalOcean Basic | $12 | 2 GiB | 1 | 50 GB | 2,000 GiB |
| DigitalOcean Basic | $24 | 4 GiB | 2 | 80 GB | 4,000 GiB |
| Amazon Lightsail | $5 | 0.5 GB | 2 | 20 GB | 1 TB |
| Amazon Lightsail | $7 | 1 GB | 2 | 40 GB | 2 TB |
| Amazon Lightsail | $12 | 2 GB | 2 | 60 GB | 3 TB |
| Amazon Lightsail | $24 | 4 GB | 2 | 80 GB | 4 TB |

Notice two things. A $6 DigitalOcean Droplet costs less than the renewal price of every shared plan in the earlier table. And the included data transfer is large: 1,000 GiB a month on that $6 server is far more than a small site will use.

### The real cost of a VPS is your time

The monthly bill is low because the provider does very little for you. On an unmanaged VPS, you are responsible for:

- Installing the web server, PHP or Node.js and the database.
- Applying operating system security updates.
- Configuring the firewall and SSH access.
- Setting up backups. DigitalOcean and Lightsail both sell automated snapshots as a paid extra.
- Renewing SSL certificates, which Certbot can automate. See [How to Get a Free SSL Certificate With Let's Encrypt](/free-ssl-certificate-lets-encrypt).
- Diagnosing the problem when the site goes down at 2 a.m.

If that list sounds fine, a VPS is very good value. If it sounds like a second job, look at managed VPS or managed WordPress plans, where the provider handles the server for a higher monthly fee.

### How much memory do you need?

As a rough guide for a single WordPress site with page caching:

- **512 MB:** enough for a static site or a very small blog. Tight for WordPress with a database on the same machine.
- **1 GB:** a sensible minimum for one WordPress site with MySQL on the same server.
- **2 GB:** comfortable for a small WooCommerce store or two or three small sites.
- **4 GB and up:** several sites, or one site with heavier traffic and background jobs.

These are starting points, not guarantees. Watch memory use for a week with a tool such as `htop` and resize if you are consistently above 80%. Resizing a VPS takes a few minutes and a reboot.

## What is cloud hosting?

The word "cloud" gets used for two different things, and it helps to separate them.

**Infrastructure clouds** such as Amazon Web Services, Google Cloud and Microsoft Azure rent raw building blocks: virtual machines, storage, databases and networking. A VPS from DigitalOcean or Lightsail is the simplest form of this. You assemble the pieces yourself.

**Platform clouds** such as Vercel, Netlify and Firebase hide the servers completely. You connect a code repository, and the platform builds your site, puts it on a global network and scales it for you. You never log in to a machine.

The hotel comparison fits both. You pay for the nights you stay, the building can always find another room, and someone else does the maintenance. A long stay can cost more than a lease.

### What cloud platforms cost

Platform pricing has a free tier, a flat team plan and usage charges on top. These were the figures on October 6, 2026.

| Platform | Free tier | Paid plan | Bandwidth beyond the allowance |
|----------|-----------|-----------|-------------------------------|
| Vercel | Hobby: 100 GB transfer/month | Pro: $20/month with 1 TB transfer | From $0.15 per GB |
| Netlify | Free: 300 credits/month | Pro: $20/month with 3,000 credits | 20 credits per GB, about $0.13 |
| Firebase Hosting | Spark: 10 GB storage, 360 MB transfer/day | Blaze: pay as you go | $0.15 per GB |

For a low-traffic site these platforms cost nothing. That is a real advantage over both shared hosting and a VPS. The detailed comparison is in [Firebase Hosting vs Vercel vs Netlify for Next.js](/firebase-hosting-vs-vercel-vs-netlify).

### Why cloud bills are harder to predict

Usage pricing rewards small sites and can surprise growing ones. Take a site that serves 500 GB of data in a month.

- On a $6 DigitalOcean Droplet, 1,000 GiB of transfer is included. The bill is $6.
- On Firebase Hosting's Blaze plan, the first 360 MB a day is free, which is about 10.8 GB over 30 days. The remaining 489.2 GB at $0.15 comes to $73.38.
- On Vercel Pro, 500 GB sits inside the 1 TB included with the $20 plan. The bill is $20, plus any charges for functions and builds.

None of these is wrong. They are different trades. The VPS is cheapest and needs the most work. The platforms cost more and take the server off your plate. What matters is that you estimate your monthly transfer before choosing. Page weight multiplied by monthly page views gets you close enough: a 2 MB page viewed 100,000 times is about 200 GB.

Set a budget alert on any usage-billed account on the first day. All the major platforms have one, and it is the difference between an email and an unexpected invoice.

## How do the three compare on speed?

There is no fixed ranking, because speed depends more on configuration than on hosting type. A cached WordPress page on good shared hosting can respond faster than an uncached page on a large VPS.

What changes between the types is consistency. On shared hosting, response time varies with what your neighbors are doing. On a VPS, your resources are reserved, so performance is steady until you hit the ceiling of the size you bought. On a cloud platform, static files are served from locations near each visitor, which helps a global audience most.

Whichever you choose, measure it. Google's guidance is a Time to First Byte of 0.8 seconds or less for 75% of visits. [What Is TTFB?](/what-is-ttfb) explains how to test yours.

## When should you move from shared hosting to a VPS?

Move when you see a specific problem that shared hosting cannot solve. Good reasons include:

1. **Resource limit warnings.** Your host emails you about CPU or memory overuse, or throttles the site.
2. **Slow uncached pages.** Admin screens, checkout pages and logged-in views are slow even after you have optimized the site.
3. **Software you cannot install.** You need a specific runtime, a queue worker, or a database setting the host will not change.
4. **Several sites.** You manage five or ten sites and one VPS costs less than separate shared plans.
5. **The renewal price.** Your shared plan renews at $11 to $18 a month and a $6 or $12 VPS would do the job, provided you can manage it.

A bad reason is a vague sense that the site should be on something more serious. If pages load quickly and you get no warnings, the upgrade buys you nothing.

Before moving, try the cheaper fixes. Turn on page caching, compress images and update PHP. Our list of [12 fixes for a slow WordPress site](/why-is-my-wordpress-site-slow) covers them in order.

## When does a cloud platform make more sense?

Choose a platform cloud over a VPS when:

- You build with a framework such as Next.js, Astro or SvelteKit and deploy from Git.
- Your traffic is uneven, with quiet weeks and sudden peaks.
- You work in a team and want preview links for every code change.
- You would rather pay more than patch a server.

Choose a VPS over a platform when you need long-running processes, full control of the stack, or a predictable flat bill at high traffic.

## Which one should you pick?

| If this describes you | Start with |
|-----------------------|-----------|
| First website, no technical background | Shared hosting on a 12-month term |
| WordPress site that has outgrown shared limits | Managed WordPress hosting or a 2 GB VPS |
| Comfortable with Linux, want the lowest steady cost | A $6 to $12 VPS |
| Building a Next.js or static site | Vercel, Netlify or Firebase free tier |
| Web app with unpredictable traffic | A cloud platform with a budget alert |
| Agency hosting many small client sites | One VPS per group of sites, or a reseller plan |

If you are still choosing a provider within one of these types, work through [How to Choose a Web Hosting Provider](/how-to-choose-web-hosting) next.

## Frequently asked questions

### Is VPS hosting faster than shared hosting?

A VPS is more consistent than shared hosting because its CPU and memory are reserved for you. It is not automatically faster. A well-cached site on shared hosting can beat a poorly configured VPS. The gain shows up most on pages that cannot be cached, such as checkouts and dashboards.

### How much traffic can shared hosting handle?

It varies by host and by how well the site is cached. SiteGround states that its StartUp plan suits about 10,000 visits a month and its GrowBig plan about 100,000. A cached blog can exceed those figures. A store with many logged-in users will reach the limit sooner.

### Is cloud hosting more expensive than a VPS?

At low traffic, cloud platforms are cheaper because their free tiers cost nothing. At high traffic, a VPS is usually cheaper because transfer is included. Serving 500 GB in a month costs $6 on a DigitalOcean Droplet and about $73 on Firebase Hosting's pay-as-you-go plan.

### Do I need a VPS for WordPress?

No. Most WordPress sites run well on shared or managed WordPress hosting. Consider a VPS when you receive resource warnings, run a busy store, host several sites, or need server settings your host will not change. A 1 GB VPS is a reasonable minimum for one WordPress site.

### What is managed hosting?

Managed hosting means the provider handles server setup, security updates, backups and often performance tuning. It is available for both VPS and WordPress. You pay more per month than for an unmanaged server of the same size, and you get back the hours you would spend on maintenance.

### Can I move from shared hosting to a VPS later?

Yes. Your site is a set of files and a database, and both can be copied to a new server. Lower your DNS TTL a day ahead, copy the site, test it, then switch the DNS records. Our WordPress migration guide lists every step.

### Is a VPS the same as a dedicated server?

No. A VPS is a virtual machine that shares physical hardware with other virtual machines, each with reserved resources. A dedicated server is an entire physical machine rented to one customer. Dedicated servers cost much more and suit workloads that need all of a machine's capacity.

## Sources

All prices were read on October 6, 2026. Confirm them on the provider's page before you buy.

- [Hostinger web hosting plans](https://www.hostinger.com/web-hosting)
- [Bluehost shared hosting plans](https://www.bluehost.com/hosting/shared)
- [SiteGround web hosting plans](https://www.siteground.com/web-hosting.htm)
- [DigitalOcean Droplet pricing](https://www.digitalocean.com/pricing/droplets)
- [Amazon Lightsail pricing](https://aws.amazon.com/lightsail/pricing/)
- [Vercel pricing](https://vercel.com/pricing)
- [Netlify pricing](https://www.netlify.com/pricing/)
- [Firebase pricing](https://firebase.google.com/pricing)
- [web.dev: Time to First Byte](https://web.dev/articles/ttfb)
