A simple do-it-yourself business website costs about $59 in its first year at the low end, made up of $47.88 for hosting and $11.08 for a domain, and anywhere from about $11 to $227 a year after that, depending on the hosting term you chose. Add premium tools and the running cost reaches about $370 a year. If you sell online, payment processing fees will be far larger than everything else combined: about $350 a month on $10,000 of sales.

Every figure below comes from a vendor's published price list, read on October 6, 2026, so you can check the arithmetic and swap in your own choices.

> **How this guide was researched.** Prices were taken from the pricing pages of the vendors named and are linked under Sources. Totals are our own arithmetic. We could not confirm a few US prices directly and say so where that applies. The cost of hiring a designer or developer varies too widely to quote reliably, so this guide covers the costs you can look up and explains how to get quotes for the rest.

## The short answer

| Type of website | First year | Typical later year | Main costs |
|-----------------|-----------|--------------------|------------|
| Developer site on a free platform | $11.08 | $11.08 | Domain only |
| DIY brochure site, 12-month hosting term | $58.96 | $226.96 | Hosting renewal |
| DIY brochure site, long hosting term | $154.60 | $11.08 until the term ends | Hosting paid up front |
| Small business site with premium tools | About $370 a year when averaged | About $370 | Hosting, theme, SEO plugin, email tool |
| Small online store, $10,000 a month in sales | Hosting and tools as above, plus about $4,200 | Same | Payment fees |

The rest of this guide explains each line.

## The costs every website has

### 1. A domain name

Your domain is your address, such as example.com. You rent it by the year.

At Porkbun, a .com costs $11.08 a year. The company states that this is its everyday price, with the same rate for renewal and no first-year discount, and that WHOIS privacy is included free. WHOIS privacy hides your name and address from the public domain register.

Two things to know when comparing registrars:

- **First-year discounts are common.** A domain advertised at a few dollars usually renews at the standard rate. Check the renewal price, the same way you would for hosting.
- **A "free domain" from a host is free for one year.** After that it renews at the host's domain rate, which is rarely shown on the hosting page.

Other endings cost different amounts. Country codes and newer endings such as .io or .ai are often several times the price of a .com.

Registering your domain separately from your hosting keeps the two independent, which makes changing hosts simpler later. [DNS Records Explained](/dns-records-explained) shows how to connect them.

**Budget:** about $11 a year for a .com.

### 2. Hosting

Hosting is the server your site lives on. It is the cost with the widest range and the most confusing pricing.

| Option | Published price | Commitment | Suits |
|--------|-----------------|------------|-------|
| Hostinger Premium | $2.99 a month, renews at $10.99 | 48 months, $143.52 at checkout | Lowest long-run cost |
| Bluehost Starter | $3.99 a month, renews at $9.99 | 36 months, $143.64 at checkout | Several small sites |
| SiteGround StartUp | $3.99 a month, renews at $17.99 | 12 months, $47.88 at checkout | Shortest commitment |
| DigitalOcean Droplet, 1 GiB | $6 a month, flat | None | People who can manage a server |
| Vercel Hobby, Netlify Free, Firebase Spark | $0 | None | Developers, within usage limits |
| Vercel Pro or Netlify Pro | $20 a month | None | Commercial sites built with code |

The headline price on a shared hosting page is a first-term discount. What you pay at checkout is that monthly figure multiplied by the whole term, in one payment. What you pay later is the renewal rate.

Over five years the three shared plans above cost $275.40, $383.40 and $911.40. The full working is in [Web Hosting Renewal Prices](/web-hosting-renewal-prices), and the plans are compared in [Best Web Hosting for Small Business](/best-web-hosting-for-small-business).

**Budget:** $48 to $144 in the first payment, then $120 to $216 a year at renewal for shared hosting.

### 3. An SSL certificate

The certificate that puts the padlock and `https://` on your site should cost nothing. Let's Encrypt issues them free, and all three shared hosts above include one. If a provider wants to charge a yearly fee for a basic certificate on a small site, count that as part of the hosting price. On your own server, [installing one takes about ten minutes](/free-ssl-certificate-lets-encrypt).

**Budget:** $0.

## The costs that depend on how you build it

### 4. The software

WordPress, the software behind a large share of small business sites, is free and open source. So are thousands of themes and plugins. You can build a complete, professional site without paying for software.

Website builders such as Wix and Squarespace take a different approach. They bundle hosting, design and software into one monthly subscription. That is simpler and usually costs more over time than WordPress on shared hosting. Their prices vary by country, and we could not confirm current US prices directly for this guide, so check their pricing pages for a like-for-like comparison.

**Budget:** $0 for WordPress itself.

### 5. Design: a theme

The free themes in the WordPress directory are enough for many sites. Paid themes add more design options, starter templates and support.

| Theme product | Published price | Notes |
|---------------|-----------------|-------|
| Free themes, including the default WordPress themes | $0 | No support beyond community forums |
| GeneratePress GP Premium | $59 a year | Usable on up to 500 sites, 30-day refund |
| GeneratePress One | $149 a year | Adds GenerateBlocks Pro and GenerateCloud |
| Kadence Essentials | $99 a year | Priced per site |

Annual licenses renew. If you stop paying, the theme keeps working but stops receiving updates, which becomes a security concern over time.

**Budget:** $0 to $99 a year.

### 6. Plugins

Most sites need a handful of plugins, and free versions cover the essentials:

- **Backups:** free, with UpdraftPlus and free cloud storage. See [How to Back Up a WordPress Site](/how-to-back-up-wordpress-site).
- **Caching:** free. See [Why Is My WordPress Site Slow?](/why-is-my-wordpress-site-slow).
- **Security:** free. See our [WordPress security checklist](/wordpress-security-checklist).
- **Contact forms:** free.
- **SEO:** free versions of Rank Math or Yoast SEO.

Paid upgrades are optional. For SEO, Yoast SEO Premium is $118.80 a year for one site, and Rank Math PRO has a regular price of $107.88 a year for unlimited personal sites. We compare them in [Rank Math vs Yoast SEO](/rank-math-vs-yoast).

Add paid plugins when you hit a specific limit, not in advance. Every subscription is a yearly renewal, and they add up quietly.

**Budget:** $0 to about $120 a year.

### 7. Business email

An address at your own domain, such as hello@example.com, looks more credible than a free webmail address.

Some hosts include mailboxes. Hostinger lists 2 mailboxes per website on its Premium plan, free for the first year. Dedicated email services charge per mailbox per month and keep your email independent of your web host, which means it survives a hosting move. Prices vary by region and we could not confirm US rates for this guide, so check the provider's pricing page.

Whichever you use, add SPF, DKIM and DMARC records to the domain so your mail reaches the inbox. [SPF, DKIM and DMARC Explained](/spf-dkim-dmarc-explained) lists them.

**Budget:** $0 in year one with some hosts. Otherwise a monthly fee per mailbox.

### 8. Email marketing

A newsletter tool is free while your list is small.

| Tool and plan | Price | Limit |
|---------------|-------|-------|
| MailerLite Free | $0 | 250 subscribers, 2,500 emails a month |
| MailerLite Comfort | From $12 a month | 50 automations, 3 seats |
| Mailchimp Free | $0 | 250 contacts, 500 emails a month |
| Mailchimp Essentials | About $13 a month | Send limit of 10 times your contacts |

Prices rise with list size. The comparison is in [MailerLite vs Mailchimp](/mailerlite-vs-mailchimp).

**Budget:** $0 to start, about $144 a year once you outgrow the free plan.

### 9. Taking payments

There is no monthly fee for standard payment processing. You pay a share of each sale.

| Provider | US rate | Fee on a $50 sale |
|----------|---------|-------------------|
| Stripe, online card | 2.9% + $0.30 | $1.75 |
| PayPal, advanced card payments | 2.89% + $0.29 | $1.74 |
| PayPal, standard card payments | 2.99% + $0.49 | $1.99 |
| PayPal Checkout | 3.49% + $0.49 | $2.24 |

On 200 orders of $50 in a month, which is $10,000 in sales, that comes to between $347 and $447. Over a year it is $4,164 to $5,364. For a store, this one line is larger than every other cost on this page combined. The detail is in [Stripe vs PayPal Fees](/stripe-vs-paypal-fees).

**Budget:** roughly 3% to 4.5% of sales.

## Three worked budgets

### Budget 1: A lean brochure site

A five-page site for a local service business, built yourself on WordPress with free tools.

**With a 12-month hosting term (lowest first payment):**

| Item | Year 1 | Year 2 |
|------|--------|--------|
| Domain, .com at Porkbun | $11.08 | $11.08 |
| Hosting, SiteGround StartUp | $47.88 | $215.88 |
| SSL, theme, plugins | $0 | $0 |
| **Total** | **$58.96** | **$226.96** |

**With a 48-month hosting term (lowest long-run cost):**

| Item | Year 1 | Years 2 to 4 |
|------|--------|--------------|
| Domain, .com at Porkbun | $11.08 | $11.08 a year |
| Hosting, Hostinger Premium | $143.52 | $0, already paid |
| SSL, theme, plugins | $0 | $0 |
| **Total** | **$154.60** | **$11.08 a year** |

The second option costs $96 more on day one and $187.84 over four years in total. The first option costs $58.96 in year one and $739.84 over the same four years. If you are confident the business will be around, the longer term saves about $552. If you are testing an idea, the 12-month term limits what you can lose.

### Budget 2: A small business site with premium tools

The same site, with a paid theme, a paid SEO plugin and a newsletter that has outgrown the free plan. To compare evenly, hosting is averaged per year.

| Item | Per year |
|------|----------|
| Domain, .com at Porkbun | $11.08 |
| Hosting, Bluehost Starter ($143.64 for 36 months) | $47.88 |
| Theme, GeneratePress GP Premium | $59.00 |
| SEO plugin, Rank Math PRO | $107.88 |
| Email marketing, MailerLite Comfort at $12 a month | $144.00 |
| **Total** | **$369.84** |

That is about $31 a month. Note that the email tool is the largest item, and the hosting figure rises to $119.88 a year when Bluehost's first term ends.

### Budget 3: A developer-built site

A site built with a framework such as Next.js and deployed to a platform.

| Setup | Per year |
|-------|----------|
| Personal project on a free tier, plus a domain | $11.08 |
| Commercial site on Vercel Pro or Netlify Pro at $20 a month, plus a domain | $251.08 |
| Self-managed 1 GiB VPS at $6 a month, plus a domain | $83.08 |

Free tiers have limits on traffic and, on Vercel, on commercial use. See [Firebase Hosting vs Vercel vs Netlify](/firebase-hosting-vs-vercel-vs-netlify). The VPS is the cheapest paid option and needs the most work, as [How to Set Up a VPS](/how-to-set-up-a-vps) shows.

## What about paying someone to build it?

Hiring a freelancer or an agency is the biggest variable, and it is the one cost we cannot give you a reliable figure for. Rates depend on the country, the designer's experience, the number of pages, and whether you need custom features, copywriting or photography. Published "average" figures are too broad to be useful.

A better approach is to get comparable quotes.

1. **Write a one-page brief.** List the pages, the features (contact form, booking, shop), examples of sites you like, and your deadline.
2. **Ask three providers for a fixed quote** against that same brief.
3. **Ask what is included.** Hosting, the domain, licenses, content entry, training and revisions are common gaps.
4. **Ask what it costs to maintain.** Monthly care plans are normal. Find out what they cover.
5. **Ask who owns what.** You should hold the domain, the hosting account and the administrator login yourself.

That last point matters more than price. If the domain is registered in your developer's name, moving away later depends on their cooperation.

Whoever builds the site, the running costs in this guide still apply afterwards.

## Costs people forget

- **Renewals.** Hosting, domain, theme and every paid plugin renew each year, usually automatically and sometimes at a higher price than the first term.
- **Your time.** A DIY site is cheap in dollars and costs evenings. Updates, backups and security checks take about an hour a month.
- **Content.** Writing the pages and taking decent photos is usually the slowest part of a new site.
- **Sales tax and VAT.** Published prices normally exclude them.
- **Add-ons at checkout.** Hosts often preselect extras such as domain privacy or security scanning. Untick what you did not ask for.
- **Growth.** More traffic, more subscribers and more sales all move you up a pricing tier.

## How to keep the cost down

1. **Start with free tools** and pay only when you hit a real limit.
2. **Compare hosts on the renewal price,** not the sale price. See our [9-point checklist](/how-to-choose-web-hosting).
3. **Register the domain at a registrar with flat pricing,** not wherever is cheapest in year one.
4. **Put every renewal date in your calendar** and review each subscription before it charges.
5. **Avoid overlapping plugins.** One caching plugin, one SEO plugin, one security plugin.
6. **Keep the site fast and lean** so the entry hosting plan lasts longer.
7. **Offer bank payments on large invoices** if you bill clients. Stripe's ACH rate is 0.8% with a $5 cap.

## Frequently asked questions

### How much does a website cost per year?

A basic do-it-yourself WordPress site costs about $59 in the first year with a 12-month hosting plan and a .com domain, based on October 2026 prices. Later years cost about $11 to $227, depending on the hosting term and renewal rate. Premium tools bring a typical small business site to about $370 a year.

### How much does a domain name cost?

A .com domain costs about $11 a year. Porkbun lists $11.08 for both registration and renewal, with WHOIS privacy included. Many registrars discount the first year and charge more at renewal, so compare renewal prices. Other endings can cost several times as much.

### Can I build a website for free?

Nearly. WordPress, many themes and the essential plugins are free, and developer platforms have free hosting tiers. You will still want your own domain, which costs about $11 a year. Free website builder plans usually show the provider's branding and do not allow your own domain.

### What is the cheapest way to host a website?

For most people, shared hosting on a long term: Hostinger Premium works out to $4.59 a month over five years. Developers can host small sites free on Vercel, Netlify or Firebase within usage limits. A self-managed VPS costs about $6 a month at a flat rate.

### How much does it cost to run an online store?

Hosting and tools cost roughly the same as any business site, about $370 a year with premium tools. Payment processing is the large cost: about 3% to 4.5% of sales. On $10,000 a month in sales, fees are $347 to $447 a month.

### Do I have to pay for an SSL certificate?

No. Let's Encrypt provides free certificates, and most hosts install them automatically. Paid certificates add organization validation or a warranty, which a small business site rarely needs. Treat a mandatory SSL fee as part of the hosting price when comparing.

### Why do website costs go up in the second year?

Hosting plans are sold with a first-term discount and renew at a higher regular rate. Among three large hosts, entry plans rose from $2.99 to $3.99 a month to between $9.99 and $17.99 at renewal. Discounted domains and paid plugins also renew at full price.

## Sources

All prices were read on October 6, 2026. Confirm them before you buy.

- [Porkbun .com pricing](https://porkbun.com/tld/com)
- [Hostinger web hosting plans](https://www.hostinger.com/web-hosting)
- [Bluehost shared hosting plans](https://www.bluehost.com/hosting/shared)
- [SiteGround web hosting plans](https://www.siteground.com/web-hosting.htm)
- [DigitalOcean Droplet pricing](https://www.digitalocean.com/pricing/droplets)
- [Vercel pricing](https://vercel.com/pricing)
- [Netlify pricing](https://www.netlify.com/pricing/)
- [GeneratePress pricing](https://generatepress.com/pricing/)
- [Kadence pricing](https://www.liquidweb.com/software/kadence/)
- [Yoast SEO for WordPress](https://yoast.com/wordpress/plugins/seo/)
- [Rank Math pricing](https://rankmath.com/pricing/)
- [MailerLite pricing](https://www.mailerlite.com/pricing)
- [PayPal US merchant fees](https://www.paypal.com/us/business/paypal-business-fees)
