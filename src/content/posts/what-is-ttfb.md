Time to First Byte (TTFB) is the time between a browser asking for a page and receiving the first byte of the response. Google's guidance is that a good TTFB is 0.8 seconds or less, and a poor one is above 1.8 seconds, measured at the 75th percentile of visits. A slow TTFB delays everything else on the page, so it is the first number to check when a site feels sluggish.

This guide explains what TTFB includes, how to measure it with free tools, and which fixes lower it, starting with the ones that cost nothing.

> **How this guide was researched.** The thresholds and definitions come from Google's web.dev documentation, linked under Sources. The commands shown are standard and you can run them against your own site. We have not published benchmark numbers for specific hosts in this post.

## What does TTFB measure?

TTFB measures the wait before any content arrives. It starts when the browser begins navigating to a URL and ends when the first byte of the server's response reaches the browser. Nothing can be drawn on screen before that moment.

According to web.dev, TTFB is the sum of these phases:

1. Redirect time
2. Service worker startup time, if the site uses one
3. DNS lookup
4. Connection and TLS negotiation
5. The request, up to the point the first byte of the response arrives

Only the last phase is your server "thinking". The first four happen before your application code runs at all. That matters when you start fixing things, because a slow TTFB caused by a redirect chain needs a different fix from one caused by a slow database query.

## What is a good TTFB?

| Rating | TTFB at the 75th percentile |
|--------|-----------------------------|
| Good | 0.8 seconds or less |
| Needs improvement | Above 0.8 and up to 1.8 seconds |
| Poor | Above 1.8 seconds |

The 75th percentile means that three out of four visits should be at or under the threshold. Averages hide slow visits, so Google looks at the experience of the slower quarter of your audience, which often means people on mobile networks or far from your server.

### Is TTFB a Core Web Vital?

No. The three Core Web Vitals are Largest Contentful Paint (LCP), Interaction to Next Paint (INP) and Cumulative Layout Shift (CLS). web.dev states that because TTFB is not a Core Web Vitals metric, it is not strictly necessary to meet the good threshold, as long as it does not stop you from scoring well on the metrics that matter.

In practice the two are tied together. LCP should happen within 2.5 seconds of the page starting to load. If the first byte takes 1.8 seconds to arrive, the browser has 0.7 seconds left to download the HTML, fetch the stylesheet and render the largest image. That is rarely enough. A fast TTFB does not guarantee a good LCP, but a slow one almost always rules it out.

## How to measure TTFB

Use at least two methods. Lab tools show what happens from one location under controlled conditions. Field data shows what real visitors get.

### Method 1: curl from your terminal

This command works on macOS, Linux and Windows 10 or later. Replace the URL with your own.

```
curl -o /dev/null -s -w "DNS: %{time_namelookup}s\nConnect: %{time_connect}s\nTLS: %{time_appconnect}s\nTTFB: %{time_starttransfer}s\nTotal: %{time_total}s\n" https://example.com/
```

On Windows Command Prompt, use `NUL` instead of `/dev/null`. The output looks like this:

```
DNS: 0.012s
Connect: 0.041s
TLS: 0.098s
TTFB: 0.412s
Total: 0.455s
```

Each number is cumulative from the start of the request. In this example, DNS took 12 ms, the TCP connection completed at 41 ms, the TLS handshake at 98 ms, and the first byte arrived at 412 ms. Subtract the TLS figure from the TTFB figure to see how long the server took to produce the response: about 314 ms here.

Run the command five times and look at the middle value. A single run can be thrown off by a cold cache or a busy moment.

### Method 2: Chrome DevTools

1. Open the page in Chrome and press F12.
2. Go to the Network tab and reload.
3. Click the first request in the list, which is the HTML document.
4. Open the Timing tab.

The line labeled "Waiting for server response" is the server portion of TTFB. The lines above it show DNS lookup, initial connection and SSL separately.

### Method 3: PageSpeed Insights

Enter your URL at PageSpeed Insights. If your site has enough Chrome traffic, the top of the report shows field data collected from real users over the previous 28 days, including TTFB at the 75th percentile. This is the number Google itself sees, and it is the one to track over time.

New and low-traffic sites will not have field data. Use the lab methods until you do.

### Method 4: WebPageTest from another region

Your own connection flatters your site if you live near the server. WebPageTest lets you run a test from a city of your choice. Test from where your customers are. A site hosted in Virginia may show a 200 ms TTFB from New York and 700 ms from Sydney.

## What causes a slow TTFB?

| Cause | How to recognize it | Typical fix |
|-------|---------------------|-------------|
| No page caching | TTFB is slow on every request and similar each time | Enable full-page caching |
| Slow database queries | Logged-in and search pages are much slower than cached pages | Add indexes, remove heavy plugins, use an object cache |
| Underpowered or overloaded hosting | TTFB varies widely between identical requests | Upgrade the plan or move hosts |
| Distance from the server | Fast nearby, slow from other continents | Use a CDN or a closer data center |
| Redirect chains | curl shows more than one hop before the final page | Link directly to the final URL |
| Old PHP version | Site runs on PHP 7.x or early 8.x | Update to PHP 8.3 or newer |
| Slow DNS | The DNS figure in curl is above 100 ms | Move DNS to a faster provider |

Most sites have one dominant cause. Find it before changing anything, or you may fix the wrong thing.

## How to reduce TTFB: 8 fixes in order

### 1. Turn on full-page caching

This is the largest single improvement for most content sites. Without caching, a WordPress page request loads PHP, runs dozens of database queries and assembles the HTML every time. With caching, the server sends a saved copy. The difference is often the gap between 800 ms and under 200 ms.

On WordPress, use your host's built-in cache if it has one, or a plugin such as WP Super Cache, W3 Total Cache or LiteSpeed Cache. After enabling it, run the curl command twice. The second request should be noticeably faster than the first.

### 2. Put a CDN in front of the site

A content delivery network keeps copies of your files on servers around the world. For TTFB, the important setting is whether the CDN caches your HTML, not only images and scripts. By default most CDNs cache static files only, which helps total load time but leaves TTFB unchanged for far-away visitors.

Caching HTML at the edge is safe for pages that are the same for everyone, such as blog posts. It needs rules to skip logged-in users, carts and checkout pages. [What Is a CDN and Does a Small Website Need One?](/what-is-a-cdn) explains the setup.

### 3. Update PHP

WordPress recommends PHP 8.3 or greater. Each major PHP release has processed requests faster than the last, and old versions no longer receive security updates. Most hosts let you switch versions from the control panel in under a minute. Test on a staging copy first if you run older plugins.

### 4. Remove redirect hops

Every redirect adds a full round trip before the real request starts. A common chain looks like this:

```
http://example.com  ->  https://example.com  ->  https://www.example.com/
```

That is two extra trips. Check yours with:

```
curl -sIL http://example.com | grep -i -E "^HTTP|^location"
```

Fix it by making the first redirect go straight to the final address, and by using the final address in your internal links, your sitemap and your advertising URLs.

### 5. Add an object cache for dynamic pages

Page caching cannot help pages that differ per user, such as account dashboards, carts and admin screens. An object cache such as Redis or Memcached stores the results of repeated database queries in memory. Many managed hosts offer it as a switch. On a VPS you install it yourself.

### 6. Audit plugins and queries

On WordPress, install the free Query Monitor plugin and load a slow page while logged in. It lists every database query, how long each took and which plugin ran it. One plugin running a slow query on every page is a common finding. Replace it or switch it off on pages that do not need it.

### 7. Use faster DNS

DNS lookup is part of TTFB for first-time visitors. If the DNS figure in your curl output is regularly above 100 ms, your DNS provider is adding delay. Managed DNS services, including the free tiers from large CDN companies, generally answer in a few tens of milliseconds. See [DNS Records Explained](/dns-records-explained) before you move anything.

### 8. Upgrade or change hosting

If caching is on, PHP is current and TTFB on uncached pages is still above a second, the server is the limit. On shared hosting, other accounts compete for the same CPU. Moving up a tier, to a VPS or to a host with a data center nearer your visitors addresses that directly. Our guide to [shared, VPS and cloud hosting](/shared-vs-vps-vs-cloud-hosting) explains which step makes sense.

Do this last. It is the only fix on the list that costs money every month, and the earlier ones often make it unnecessary.

## A worked example

Suppose your curl output for a blog post looks like this:

```
DNS: 0.140s
Connect: 0.210s
TLS: 0.330s
TTFB: 1.450s
Total: 1.520s
```

Read it in order. DNS took 140 ms, which is slow. The connection and TLS handshake added another 190 ms, which suggests the server is some distance away. Then the server spent 1,120 ms producing the page, which is the main problem.

The plan follows from the numbers. Enable page caching to cut the 1,120 ms. Move DNS to a faster provider to trim the 140 ms. If visitors are far from the server, add a CDN that caches HTML. After those three changes, a result under 400 ms is realistic for cached pages, and you have not changed hosts.

## What TTFB does not tell you

TTFB says nothing about what happens after the first byte. A page can have a 150 ms TTFB and still take six seconds to become usable because of a 3 MB hero image and a pile of scripts. Treat it as the first check, then look at LCP, INP and CLS. If you run WordPress, [Why Is My WordPress Site Slow? 12 Fixes in Order](/why-is-my-wordpress-site-slow) continues from here.

Also be careful when comparing TTFB between sites that work differently. A server-rendered page does its work before the first byte. A client-rendered app can send a nearly empty HTML shell very quickly and do all its work afterwards. The second has a better TTFB and may give visitors a worse experience.

## Frequently asked questions

### What is a good TTFB?

Google's web.dev guidance says a good TTFB is 0.8 seconds or less and a poor TTFB is greater than 1.8 seconds, measured at the 75th percentile of page loads. For cached pages on a well-configured site, 200 to 400 ms is a realistic target.

### Does TTFB affect SEO?

TTFB is not a Core Web Vital and is not a direct ranking factor on its own. It affects Largest Contentful Paint, which is a Core Web Vital with a target of 2.5 seconds. A slow TTFB makes a good LCP very hard to reach.

### Why is my TTFB slow on WordPress?

The usual cause is missing page caching, which forces WordPress to run PHP and many database queries on every request. Other common causes are slow plugins, an outdated PHP version, overloaded shared hosting and a server far from your visitors. Enable caching first and measure again.

### How do I check TTFB?

Run curl with the time_starttransfer variable from a terminal, or open Chrome DevTools, select the HTML request in the Network tab and read "Waiting for server response" under Timing. For real-user data, check the field data section of PageSpeed Insights.

### Does a CDN reduce TTFB?

A CDN reduces TTFB when it caches your HTML at edge locations near visitors. If it caches only images, CSS and JavaScript, which is the default on most CDNs, the HTML request still travels to your origin server and TTFB stays the same.

### Is TTFB the same as server response time?

Not exactly. Server response time is the part of TTFB spent generating the page. TTFB also includes redirects, DNS lookup, the TCP connection and the TLS handshake. A server can respond in 100 ms while TTFB is 600 ms because of network distance.

### Can a slow DNS provider increase TTFB?

Yes. DNS lookup is one of the phases included in TTFB for a visitor's first request to your domain. If lookups take more than about 100 ms, switching to a faster DNS provider lowers TTFB for new visitors. Returning visitors usually have the answer cached.

## Sources

- [web.dev: Time to First Byte (TTFB)](https://web.dev/articles/ttfb)
- [web.dev: Web Vitals](https://web.dev/articles/vitals)
- [WordPress.org server requirements](https://wordpress.org/about/requirements/)
- [PageSpeed Insights](https://pagespeed.web.dev/)
