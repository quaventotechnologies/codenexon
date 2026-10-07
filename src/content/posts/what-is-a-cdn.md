A content delivery network (CDN) is a group of servers in many cities that keep copies of your website's files. When someone visits, the files come from the server nearest to them instead of from your one origin server, which shortens the distance the data travels and speeds up the page. A small website needs a CDN when a meaningful share of its visitors are far from its server, or when it serves large images and downloads. Free tiers are enough for most small sites.

This explainer covers how a CDN works, what it does and does not speed up, what it costs in 2026, and how to set one up without breaking logins or checkout pages.

> **How this guide was researched.** Pricing figures come from the vendors' pricing pages, read on October 6, 2026. The latency arithmetic is our own, from published distances and the speed of light in optical fiber. We have not benchmarked individual CDN providers for this post.

## How does a CDN work?

Without a CDN, every request goes to your origin server. If that server is in Virginia and the visitor is in Sydney, each file crosses the Pacific.

With a CDN, the flow changes:

1. The visitor's browser asks for a file on your domain.
2. DNS sends the request to the CDN's nearest location, called an edge server or point of presence.
3. If the edge server already has a fresh copy, it returns the file immediately. This is a cache hit.
4. If it does not, the edge server fetches the file from your origin, passes it to the visitor and keeps a copy for the next person. This is a cache miss.

The first visitor in each region gets the slower path. Everyone after them gets the fast one until the copy expires.

## Why distance matters: the numbers

Data in a fiber optic cable travels at roughly 200,000 kilometers per second, about two thirds of the speed of light in a vacuum. That sounds instant until you count the round trips.

New York to Sydney is about 16,000 km in a straight line. One way takes at least 80 milliseconds. A round trip takes 160 ms, and real cable routes are longer than a straight line.

Opening a secure connection needs several round trips before any content moves: one for the TCP handshake, one for the TLS 1.3 handshake, and one for the request and the first byte of the response. That is three round trips, or about 480 ms of unavoidable waiting for a Sydney visitor to a New York server, before your server has done any work.

| Visitor to server | Approximate distance | Minimum round trip | Three round trips |
|-------------------|----------------------|--------------------|-------------------|
| Same metro area | 50 km | Under 1 ms | About 2 ms |
| New York to London | 5,600 km | 56 ms | 168 ms |
| New York to Mumbai | 12,500 km | 125 ms | 375 ms |
| New York to Sydney | 16,000 km | 160 ms | 480 ms |

Google considers a Time to First Byte of 0.8 seconds or less to be good. A visitor on the far side of the world has used more than half of that budget on physics alone. A CDN edge server in their city cuts those round trips to a few milliseconds each. See [What Is TTFB?](/what-is-ttfb) for how to measure this on your own site.

## What does a CDN cache by default?

This is the part that surprises people. Most CDNs, in their default configuration, cache static files and pass HTML straight through to your origin.

| Content type | Cached by default? | Why |
|--------------|--------------------|-----|
| Images (JPG, PNG, WebP, AVIF, SVG) | Yes | Same for every visitor |
| CSS and JavaScript files | Yes | Same for every visitor |
| Fonts | Yes | Same for every visitor |
| PDFs and downloads | Usually | Depends on provider and file size |
| HTML pages | No | May differ per visitor |
| API responses | No | Usually personalized or changing |

So a default setup makes images, styles and scripts load faster everywhere, but the HTML document itself still makes the long trip to your origin. Total load time improves. Time to First Byte for the page does not.

To speed up the HTML as well, you have to tell the CDN that certain pages are safe to cache. That is worth doing for content that looks the same to everyone, such as blog posts and landing pages. It must be switched off for anything personal, such as carts, account pages and admin screens.

## How caching is controlled: Cache-Control headers

Your origin server tells the CDN and the browser how long to keep each file through a response header called `Cache-Control`. Three patterns cover most needs.

**Files with a version or hash in the name** never change, so cache them for a year:

```
Cache-Control: public, max-age=31536000, immutable
```

**HTML that can be shared but should stay fresh.** Browsers check back every time, the CDN keeps it for ten minutes:

```
Cache-Control: public, max-age=0, s-maxage=600
```

**Private pages** that must never be stored by a shared cache:

```
Cache-Control: private, no-store
```

The numbers are in seconds. `max-age` applies to browsers, and `s-maxage` applies only to shared caches such as a CDN. A year is 31,536,000 seconds.

You can see what your site sends today with one command:

```
curl -sI https://example.com/ | grep -i -E "cache-control|age|cf-cache-status|x-cache"
```

Many CDNs add a header such as `cf-cache-status` or `x-cache` with the value `HIT` or `MISS`, which tells you whether that response came from the edge.

## What a CDN does besides speed

- **Absorbs traffic spikes.** Cached files are served from the edge, so a sudden rush of visitors reaches your origin as a trickle. This can keep a small server online during a busy day.
- **Reduces origin bandwidth.** Every cache hit is a file your host did not have to send, which matters on plans that bill for data transfer.
- **Filters attacks.** Large CDN networks can absorb denial-of-service traffic that would overwhelm a single server, and many include a web application firewall.
- **Handles TLS.** The CDN terminates HTTPS at the edge and usually provides the certificate for you.
- **Optimizes files.** Compression with Brotli, HTTP/2 and HTTP/3 support, and on some plans automatic image resizing and format conversion.

## What a CDN will not fix

A CDN is not a cure for a slow site. It does not help with:

- **Slow uncached pages.** If your server takes two seconds to build a page and that page is not cached at the edge, the CDN adds nothing.
- **Heavy JavaScript.** A 1.5 MB script arrives sooner but still takes the same time to run on the visitor's phone.
- **Oversized images.** Delivering a 4 MB photo quickly is still delivering 4 MB. Resize and compress first.
- **Database problems.** Slow queries on logged-in pages are an origin issue.

Fix the origin first. On WordPress that means page caching, image compression and a current PHP version, covered in [Why Is My WordPress Site Slow? 12 Fixes in Order](/why-is-my-wordpress-site-slow).

## Does a small website need a CDN?

Use this table to decide.

| Your situation | Do you need a CDN? |
|----------------|--------------------|
| Local business, visitors within one country, server in that country | Optional. Benefit is small |
| Blog or store with visitors on several continents | Yes |
| Site with many large images, video or downloads | Yes |
| Site hosted on Vercel, Netlify or Firebase | You already have one |
| Site that gets occasional traffic spikes from social media | Yes |
| Hosting plan that bills for bandwidth | Yes, to reduce origin transfer |

The fourth row is worth noting. Developer platforms serve every site from their own global network, so adding a second CDN in front is usually unnecessary and can cause caching conflicts. Our comparison of [Firebase Hosting, Vercel and Netlify](/firebase-hosting-vs-vercel-vs-netlify) lists what each includes.

If your audience is in one region and your server is nearby, the gain is modest. There is still a case for the security and spike protection, and with free plans available the cost is your setup time.

## What does a CDN cost in 2026?

For a small site, often nothing. There are three pricing models.

**Free plans from CDN providers.** Cloudflare is the best known example and offers a free plan that includes its CDN and a TLS certificate for your domain. For a typical small site, this is where to start.

**Bundled with your host.** Many shared and managed WordPress hosts include a CDN, sometimes Cloudflare's, as a switch in the control panel.

**Usage-based.** Developer platforms and cloud providers charge for the data transferred beyond a monthly allowance. These were the published rates on October 6, 2026:

| Platform | Included transfer | Price beyond that |
|----------|-------------------|-------------------|
| Vercel Hobby | 100 GB a month | Not available. Upgrade required |
| Vercel Pro ($20/month) | 1 TB a month | From $0.15 per GB |
| Netlify Pro ($20/month) | 3,000 credits. Bandwidth costs 20 credits per GB | About $0.13 per GB with credit packs |
| Firebase Hosting | 360 MB a day | $0.15 per GB |

To estimate your own usage, multiply your average page weight by monthly page views. A 2 MB page viewed 50,000 times is 100 GB. Repeat visitors use less because their browsers keep cached files.

## How to set up a CDN in 6 steps

The steps below describe the common "reverse proxy" setup, where the CDN sits in front of your whole domain. The names of menus differ between providers.

1. **Record your current DNS.** Export or screenshot every record. You will need them if anything goes wrong. [DNS Records Explained](/dns-records-explained) explains what each one does.
2. **Add your site to the CDN.** The provider scans your existing records and copies them. Compare its list with yours, especially MX and TXT records for email.
3. **Point your domain at the CDN.** Depending on the provider, you either change your nameservers at the registrar or add a CNAME record for `www`.
4. **Set the encryption mode to full.** The CDN should connect to your origin over HTTPS and verify its certificate. If your origin has no certificate yet, add a free one first with [Let's Encrypt](/free-ssl-certificate-lets-encrypt).
5. **Check what is cached.** Load a page twice and inspect the response headers. Static files should show a hit on the second request.
6. **Add HTML caching carefully, if you want it.** Create a rule that caches pages for anonymous visitors and bypasses the cache when a login or cart cookie is present.

### DNS settings to know about

When a CDN proxies your traffic, it controls the TTL on those records. Cloudflare's documentation, for example, states that proxied records use a TTL of "Auto", which is set to 300 seconds. Unproxied records can be set between 60 seconds and one day on non-Enterprise plans.

Do not proxy your mail records. MX records and the hostnames they point to should stay DNS-only, or email delivery will fail.

## Common CDN mistakes

- **Caching logged-in pages.** One visitor sees another person's account or cart. Always bypass the cache when session cookies are present.
- **Forgetting to purge.** You update a stylesheet and visitors still see the old one. Use versioned file names, or purge the file from the CDN after deploying.
- **Redirect loops.** The CDN talks to your origin over HTTP while the origin redirects everything to HTTPS. Setting the encryption mode to full fixes this.
- **Losing visitor IP addresses.** Your server logs show the CDN's addresses. Configure your web server to read the real address from the forwarding header the CDN supplies.
- **Stacking two CDNs.** A host with a built-in CDN plus a second one in front makes cache problems hard to trace. Use one.

## Frequently asked questions

### What does CDN stand for?

CDN stands for content delivery network. It is a set of servers in many locations that store copies of a website's files and deliver them from the location closest to each visitor. The aim is to reduce the distance data travels and so reduce loading time.

### Is a CDN the same as web hosting?

No. Web hosting stores the original copy of your site and runs your application and database. A CDN stores temporary copies of files and delivers them from many locations. You still need hosting. Developer platforms such as Vercel and Netlify combine both in one service.

### Does a CDN improve SEO?

Indirectly. A CDN can improve loading speed, which affects Core Web Vitals such as Largest Contentful Paint. Faster pages give visitors a better experience. A CDN does not change your rankings on its own, and it will not make up for slow uncached pages.

### Is there a free CDN?

Yes. Cloudflare offers a free plan that includes its CDN and a TLS certificate. Developer platforms also include CDN delivery in their free tiers: Vercel Hobby includes 100 GB of transfer a month and Firebase Hosting includes 360 MB a day.

### Will a CDN reduce my hosting bill?

It can if your host charges for bandwidth, because cached files are served from the CDN instead of your server. It also reduces load on a small server during spikes. On a shared plan with unmetered bandwidth, the benefit is speed and stability, not cost.

### Can a CDN break my website?

It can if HTML caching is misconfigured. The usual problems are logged-in pages being cached, stale files after an update and redirect loops from mismatched HTTPS settings. Start with static file caching only, test, then add page caching with rules that skip logged-in users.

### How do I know if my CDN is working?

Inspect the response headers of an image or stylesheet in your browser's developer tools or with curl. Look for a cache status header showing HIT on the second request. You can also run a speed test from a distant city and compare it with a test taken before.

## Sources

Prices were read on October 6, 2026.

- [Cloudflare DNS documentation: Time to Live (TTL)](https://developers.cloudflare.com/dns/manage-dns-records/reference/ttl/)
- [web.dev: Time to First Byte](https://web.dev/articles/ttfb)
- [MDN: Cache-Control header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)
- [Vercel pricing](https://vercel.com/pricing)
- [Netlify pricing](https://www.netlify.com/pricing/)
- [Firebase pricing](https://firebase.google.com/pricing)
