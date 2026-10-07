For most developers, the choice of entry-level VPS comes down to three well-known providers with near-identical pricing: Akamai's Linode at $5 a month for 1 GB, DigitalOcean at $6 a month for 1 GiB, and Amazon Lightsail at $7 a month for 1 GB with two vCPUs. At 2 GB and 4 GB all three charge the same $12 and $24. The differences that matter are the CPU count at each size, what backups cost, how overage is billed, and which ecosystem you want to be inside.

This guide compares the published plans line by line and explains how to pick, with the numbers to back it up.

> **Researched, not tested.** Prices and specifications were read from each provider's own pricing page on October 6 and 7, 2026, and are linked under Sources. We have not benchmarked CPU, disk or network performance on these servers, so this guide does not name a fastest provider. Two other popular providers, Vultr and Hetzner, are not included because we could not read their current pricing pages directly.

## Quick picks

| If you want | Consider | Published price |
|-------------|----------|-----------------|
| The lowest price for 1 GB | Linode Nanode 1 GB | $5 a month |
| The smallest possible server | DigitalOcean 512 MiB Droplet | $4 a month |
| Two vCPUs on a small plan | Amazon Lightsail 1 GB | $7 a month |
| The most transfer at 1 GB | Amazon Lightsail 1 GB | 2 TB included |
| A path into the wider AWS platform | Amazon Lightsail | From $5 a month |
| A managed layer on top of a VPS | A managed cloud host | Higher monthly fee |

## Entry plans compared

### 1 GB plans

| | Linode Nanode 1 GB | DigitalOcean Basic | Amazon Lightsail |
|---|--------------------|--------------------|------------------|
| Monthly price | $5 | $6 | $7 |
| Memory | 1 GB | 1 GiB | 1 GB |
| vCPUs | 1 | 1 | 2 |
| SSD storage | 25 GB | 25 GB | 40 GB |
| Transfer included | 1 TB | 1,000 GiB | 2 TB |

Linode is cheapest by a dollar. Lightsail costs the most and gives the most: twice the vCPUs, 60% more disk and double the transfer.

### 2 GB plans

| | Linode 2 GB | DigitalOcean Basic | Amazon Lightsail |
|---|-------------|--------------------|------------------|
| Monthly price | $12 | $12 | $12 |
| Memory | 2 GB | 2 GiB | 2 GB |
| vCPUs | 1 | 1 | 2 |
| SSD storage | 50 GB | 50 GB | 60 GB |
| Transfer included | 2 TB | 2,000 GiB | 3 TB |

At the same $12, Lightsail lists an extra vCPU, 10 GB more disk and 1 TB more transfer. DigitalOcean also sells a 2 GiB Droplet with 2 vCPUs, 60 GB of disk and 3,000 GiB of transfer for $18.

### 4 GB plans

| | Linode 4 GB | DigitalOcean Basic | Amazon Lightsail |
|---|-------------|--------------------|------------------|
| Monthly price | $24 | $24 | $24 |
| Memory | 4 GB | 4 GiB | 4 GB |
| vCPUs | 2 | 2 | 2 |
| SSD storage | 80 GB | 80 GB | 80 GB |
| Transfer included | 4 TB | 4,000 GiB | 4 TB |

By 4 GB the three are the same on paper. Choose on the factors below, not on the plan table.

### The smallest plans

| Provider | Plan | Monthly price | Memory | vCPUs | Storage | Transfer |
|----------|------|---------------|--------|-------|---------|----------|
| DigitalOcean | Basic | $4 | 512 MiB | 1 | 10 GB | 500 GiB |
| Amazon Lightsail | Smallest bundle with a public IPv4 address | $5 | 0.5 GB | 2 | 20 GB | 1 TB |
| Linode | Nanode 1 GB | $5 | 1 GB | 1 | 25 GB | 1 TB |

Half a gigabyte of memory is enough for a static site, a small API or a bot. It is tight for a database on the same machine. For $5, Linode's Nanode gives you twice the memory of the other two smallest plans, which makes it the better starting point for most projects.

## A note on shared vCPUs

Every plan in these tables uses shared CPUs. Your virtual processor runs on a physical core that other customers' servers also use, and the provider balances the load. For websites, APIs and development environments this is fine, because they spend most of their time idle.

It matters when a workload uses the processor constantly: video encoding, large builds, data processing or a busy database. On a shared plan, sustained heavy use can be throttled or slowed by neighbors. All three providers sell dedicated CPU plans for that, at noticeably higher prices.

A count of "2 vCPUs" on a shared plan is therefore not directly comparable between providers, and it does not guarantee twice the performance of 1 vCPU. Without benchmarks, treat Lightsail's extra vCPU as a likely advantage for multi-process workloads, not a measured one.

## What backups cost

A VPS has no backups unless you add them. This is the most commonly overlooked line on the bill.

Akamai publishes its Linode backup prices alongside the plans: $2 a month for the 1 GB plan and $2.50 a month for the 2 GB plan.

| Linode plan | Server | Backups | Total |
|-------------|--------|---------|-------|
| Nanode 1 GB | $5.00 | $2.00 | $7.00 |
| Linode 2 GB | $12.00 | $2.50 | $14.50 |

DigitalOcean and Lightsail also sell automated backups or snapshots as a paid extra. Their prices depend on the option and the amount stored, so check the current rate when you create the server.

Whatever the provider charges, add it to the plan price before comparing. A $5 server with $2 of backups costs the same as a $7 server, and a server without backups is a server you will eventually have to rebuild from memory.

Provider backups live in the same account as the server. Keep a second copy elsewhere as well. [How to Back Up a WordPress Site](/how-to-back-up-wordpress-site) includes a script that works for any site.

## Transfer and overage

Each plan includes a monthly transfer allowance. For most projects it is far more than you will use. A site serving 2 MB pages would need 500,000 page views in a month to use 1 TB.

What happens when you exceed it differs.

- **Linode** publishes a flat overage rate of $0.005 per GB. An extra 100 GB costs $0.50.
- **DigitalOcean and Lightsail** charge overage at rates that depend on the region, so check the pricing page for the region you choose.

Compare that with developer platforms, where bandwidth beyond the allowance costs $0.13 to $0.15 per GB. On those terms an extra 100 GB costs $13 to $15. If you serve a lot of data, a VPS is much cheaper per gigabyte. [Firebase Hosting vs Vercel vs Netlify](/firebase-hosting-vs-vercel-vs-netlify) has the platform figures.

## What each provider is like to use

Plan tables are nearly identical. The experience around them is not.

### DigitalOcean

DigitalOcean built its reputation on simplicity and documentation. Its tutorials are some of the most widely used references for setting up Linux servers, whichever provider you end up with. The product range extends to managed databases, object storage, load balancers, a container platform and an app platform, all with predictable flat pricing.

**Suits:** developers who want a clean control panel and a clear path from one server to a small production stack.

**Watch for:** the 1 GiB plan lists one vCPU where Lightsail lists two at a similar price.

### Akamai (Linode)

Linode has been selling Linux servers since 2003 and is now part of Akamai. The lineup is simple, pricing is flat, and it publishes backup and overage rates plainly, which makes budgeting easy.

**Suits:** developers who want the lowest entry price for 1 GB and transparent add-on costs.

**Watch for:** the brand is in transition to Akamai Cloud, so documentation and product names are a mix of both.

### Amazon Lightsail

Lightsail is Amazon's simplified VPS product. It bundles a server, storage and transfer at a fixed monthly price, which hides the complexity of the main AWS platform. The pricing page notes that new customers can get started free through the AWS Free Tier.

**Suits:** developers who expect to grow into other AWS services, or whose company already uses AWS.

**Watch for:** once you step outside the bundle into wider AWS services, pricing becomes usage-based and harder to predict. Set a billing alarm on day one. Check also that you are choosing a bundle with a public IPv4 address, since the pricing page lists those separately.

## What a year costs

| Setup | Monthly | Yearly |
|-------|---------|--------|
| Linode Nanode 1 GB | $5 | $60 |
| Linode Nanode 1 GB with backups | $7 | $84 |
| DigitalOcean 1 GiB Droplet | $6 | $72 |
| Amazon Lightsail 1 GB | $7 | $84 |
| Any of the three at 2 GB | $12 | $144 |
| Linode 2 GB with backups | $14.50 | $174 |
| Any of the three at 4 GB | $24 | $288 |

None of these has a promotional first term or a renewal increase, which is a real difference from shared hosting. A shared plan advertised at $3.99 a month can renew at $17.99. A $6 VPS is $6 in month one and in month 49. We work through that comparison in [Web Hosting Renewal Prices](/web-hosting-renewal-prices).

Add a domain at about $11 a year and you have the full infrastructure bill. See [How Much Does a Website Cost?](/how-much-does-a-website-cost).

## How to choose in four questions

**1. How much memory do you need?**

| Workload | Sensible starting size |
|----------|------------------------|
| Static site, small API, bot | 512 MB to 1 GB |
| One WordPress site with its database | 1 GB with swap, or 2 GB |
| Node.js or Python app with a database | 2 GB |
| Several sites, or a small store | 2 to 4 GB |
| Docker with several containers | 4 GB |

Start small. All three providers let you resize upward in a few minutes with a reboot.

**2. Where are your users?**

Pick a provider with a data center on the same continent as most of your users, and choose that region when you create the server. Distance adds delay that no tuning removes. [What Is TTFB?](/what-is-ttfb) explains how to measure it.

**3. What else will you need?**

If a managed database, object storage or a load balancer is in your future, look at how each provider prices those now. Moving a single server between providers is an afternoon. Moving a stack is a project.

**4. Do you actually want to run a server?**

A VPS is cheap because you do the administration: updates, firewall, backups, monitoring and fixing it when it breaks. If that is not how you want to spend time, a developer platform or managed hosting costs more and takes that work away. [Shared vs VPS vs Cloud Hosting](/shared-vs-vps-vs-cloud-hosting) covers the trade.

## Before you deploy anything

A new VPS allows root login and has no firewall rules. Bots start probing it within hours. Whichever provider you choose, the first 45 minutes are the same:

1. Update the system.
2. Create a non-root user with sudo.
3. Switch to SSH keys and disable password login.
4. Enable the firewall.
5. Turn on automatic security updates.
6. Install your web server and a free HTTPS certificate.

The commands for all of it are in [How to Set Up a VPS: 10 Steps to a Secure Ubuntu Server](/how-to-set-up-a-vps).

## Test it yourself

Since the plans are so close on paper, a short trial tells you more than any table. All three bill by the hour, so a test costs cents.

1. Create the same size server at two providers, in the same region.
2. Deploy your actual application, not a synthetic benchmark.
3. Measure response time under realistic load with a tool such as k6.
4. Check disk and network speed if your app depends on them.
5. Open a support request with a simple question and time the reply.
6. Delete the server you do not keep.

An hour or two on a $6 server costs about two cents. It is the cheapest research you can do.

## Frequently asked questions

### What is the cheapest VPS for developers?

Among the three providers compared, DigitalOcean's 512 MiB Droplet is the cheapest at $4 a month. For 1 GB of memory, Linode's Nanode is cheapest at $5 a month, followed by DigitalOcean at $6 and Amazon Lightsail at $7, on October 2026 pricing.

### Is DigitalOcean or Linode better?

Their plans are nearly identical. At 1 GB, Linode is $5 and DigitalOcean is $6, with the same memory, disk and transfer. At 2 GB and 4 GB the prices and specifications match. Choose on documentation, control panel preference, data center locations and the other services you expect to use.

### Is Amazon Lightsail cheaper than DigitalOcean?

At 1 GB, Lightsail costs $7 a month against $6 for DigitalOcean, and includes 2 vCPUs, 40 GB of disk and 2 TB of transfer compared with 1 vCPU, 25 GB and 1,000 GiB. At 2 GB both cost $12, and Lightsail lists more vCPUs, disk and transfer.

### How much RAM does a VPS need?

A static site or small API runs in 512 MB to 1 GB. One WordPress site with its database needs 1 GB with swap, or 2 GB for comfort. Applications with a database, several sites or Docker containers should start at 2 to 4 GB. You can resize later.

### Do VPS plans include backups?

Not by default. Backups are a paid add-on. Akamai lists Linode backups at $2 a month for the 1 GB plan and $2.50 for the 2 GB plan. DigitalOcean and Lightsail also charge extra. Add the backup cost to the plan price when you compare.

### Do VPS prices increase at renewal?

No. DigitalOcean, Linode and Lightsail charge a flat monthly rate with no promotional first term, so there is no renewal jump. Providers can change their list prices over time, but the price you start at is the regular price.

### Should I use a VPS or a platform like Vercel?

Use a platform if you deploy a framework such as Next.js from Git and want no server maintenance. Use a VPS if you need long-running processes, full control or a flat bill at high traffic. Bandwidth overage costs about $0.005 per GB on Linode against $0.15 per GB on platforms.

## Sources

Prices were read on October 6 and 7, 2026. Confirm them on the provider's page before you buy.

- [DigitalOcean Droplet pricing](https://www.digitalocean.com/pricing/droplets)
- [Akamai Cloud pricing, North America](https://www.akamai.com/cloud/pricing/north-america)
- [Amazon Lightsail pricing](https://aws.amazon.com/lightsail/pricing/)
- [Vercel pricing](https://vercel.com/pricing)
- [Firebase pricing](https://firebase.google.com/pricing)
