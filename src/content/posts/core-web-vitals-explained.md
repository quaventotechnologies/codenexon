Core Web Vitals are three measurements Google uses to judge how a page feels to a real visitor: how fast the main content appears (LCP), how quickly the page reacts when you tap or click (INP), and how much the layout jumps around while loading (CLS). A page passes when 75% of visits get an LCP of 2.5 seconds or less, an INP of 200 milliseconds or less, and a CLS of 0.1 or less.

This guide explains each metric in plain English, shows how to check your own site for free, and lists the fixes that move each number.

> **How this guide was researched.** The thresholds, definitions and reasoning are taken from Google's web.dev documentation, linked under Sources. The fixes are standard web performance practice. We have not published benchmark results for specific sites or hosts in this post, so measure each change on your own pages.

## Core Web Vitals at a glance

| Metric | What it measures | Good | Needs improvement | Poor |
|--------|------------------|------|-------------------|------|
| Largest Contentful Paint (LCP) | Loading: when the largest visible element finishes rendering | 2.5 seconds or less | Above 2.5 and up to 4 seconds | Above 4 seconds |
| Interaction to Next Paint (INP) | Responsiveness: the delay between an interaction and the next visual update | 200 ms or less | Above 200 and up to 500 ms | Above 500 ms |
| Cumulative Layout Shift (CLS) | Visual stability: how much content moves unexpectedly | 0.1 or less | Above 0.1 and up to 0.25 | Above 0.25 |

All three are judged at the 75th percentile of page views, and the same thresholds apply to phones and desktops.

## Why the 75th percentile?

An average hides the visits that went badly. If nine visitors get a one-second load and one gets fifteen seconds, the average looks acceptable while one person in ten had a miserable time.

Google looks at the 75th percentile instead. That means three out of four visits must be at or under the threshold. According to web.dev, this percentile was chosen to balance two goals: it should make sure "a majority of visits to a page or site experienced the target level of performance", and it should not be "overly impacted by outliers".

In practice, the 75th percentile reflects your slower visitors: people on older phones, on mobile data, or far from your server. Tuning the site on a fast laptop with office Wi-Fi tells you very little about them.

The thresholds themselves were set using research on human perception and a check that they are achievable. Google required that at least 10% of websites already met each "good" threshold.

## Field data and lab data

There are two ways to measure, and they answer different questions.

| | Field data | Lab data |
|---|-----------|----------|
| Source | Real visits by Chrome users, collected over the previous 28 days | One simulated visit on a set device and connection |
| Tells you | What your actual audience experienced | What happens under controlled conditions |
| Good for | Knowing whether you pass | Finding and fixing the cause |
| Limits | Needs enough traffic. Changes take weeks to show | Cannot measure INP properly, since no one is interacting |

Google's assessment of your site uses field data. Lab tools are for diagnosis. A page can score well in a lab test and fail in the field because real visitors have slower devices, and the reverse can also happen.

New and low-traffic sites often have no field data at all. That is normal. Use lab tools until the data appears.

## How to check your Core Web Vitals

### PageSpeed Insights

Go to PageSpeed Insights and enter a page address. The top section, "Discover what your real users are experiencing", is field data. It shows each metric at the 75th percentile and whether the page passes. The section below it is a lab test with a list of specific problems.

Check the Mobile tab first. Most sites do worse there.

### Google Search Console

If you have verified your site in Search Console, open the Core Web Vitals report under Experience. It groups all your pages into Good, Needs improvement and Poor, and shows which type of page has a problem. This is the best view for a whole site, because it tells you which templates to fix first.

### Chrome DevTools

Press F12 in Chrome, open the Performance panel and load your page. It shows LCP, CLS and INP live as you use the page, and names the element responsible for each. This is the fastest way to find out which image is your LCP element and what is shifting.

## Largest Contentful Paint (LCP)

LCP is the moment the largest thing in the visible part of the page finishes drawing. That is usually a hero image, a banner or the main heading. It is the best single measure of "when did the page look loaded".

**Target:** 2.5 seconds or less. Above 4 seconds is poor.

### The four parts of LCP

The time breaks down into four stages, and DevTools shows you each one.

1. **Time to First Byte.** The wait for the server to start responding.
2. **Resource load delay.** The gap before the browser starts downloading the LCP image.
3. **Resource load duration.** How long that download takes.
4. **Element render delay.** The gap between the download finishing and the element appearing.

Knowing which stage is slow tells you what to fix. A long first stage is a server problem. A long third stage is an image that is too heavy.

### How to improve LCP

**Fix the server response first.** Google's guidance for Time to First Byte is 0.8 seconds or less. If the first byte takes two seconds, an LCP of 2.5 seconds is out of reach. Page caching and a CDN are the usual fixes, covered in [What Is TTFB?](/what-is-ttfb) and [What Is a CDN?](/what-is-a-cdn).

**Shrink the LCP image.** Resize it to the size it is displayed at, and serve it as WebP or AVIF. A hero image should rarely exceed 200 KB.

**Do not lazy load the LCP image.** Lazy loading tells the browser to wait, which is the opposite of what you want for the most important image. Remove `loading="lazy"` from it and add a priority hint:

```
<img src="hero.webp" width="1200" height="630" fetchpriority="high" alt="Product on a desk">
```

**Let the browser find the image early.** If the image is set as a CSS background or injected by JavaScript, the browser cannot discover it until late. Put it in an `<img>` tag in the HTML, or preload it:

```
<link rel="preload" as="image" href="hero.webp" fetchpriority="high">
```

**Cut render-blocking files.** Stylesheets and scripts in the page head delay everything. Remove unused CSS, defer scripts that are not needed immediately, and load fonts with `font-display: swap`.

## Interaction to Next Paint (INP)

INP measures how long the page takes to respond visibly after someone taps, clicks or presses a key. It looks at interactions across the whole visit and reports one of the slowest, so a page that is quick at first and sluggish later still gets a poor score.

INP became a Core Web Vital in March 2024, replacing First Input Delay. The older metric only measured the delay before the first interaction started to be processed. INP measures the full wait until the screen updates, for every interaction.

**Target:** 200 milliseconds or less. Above 500 milliseconds is poor.

### What causes a poor INP

The browser has one main thread that handles JavaScript, layout and drawing. While it is busy running a script, it cannot respond to a tap. The usual causes are:

- Large JavaScript bundles running on page load.
- Third-party scripts: ads, chat widgets, analytics, social embeds and tag managers.
- Event handlers that do heavy work before updating the screen.
- Very large pages with thousands of elements, which make every update slow.

### How to improve INP

**Remove scripts you do not need.** Audit every third-party tag. Each one competes for the same thread. Old tracking pixels and unused widgets are common, easy wins.

**Delay non-essential scripts.** Load chat widgets and similar tools after the page is interactive, or when the visitor first scrolls.

**Break up long tasks.** Any task that runs longer than 50 milliseconds blocks input. Developers can split work into smaller pieces and yield to the browser between them:

```
async function processItems(items) {
  for (const item of items) {
    handle(item);
    // Give the browser a chance to respond to input
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
}
```

**Show feedback straight away.** Update the screen first, for example by showing a pressed state or a spinner, then do the slow work.

**Keep the page simple.** Fewer elements mean faster updates. Paginate long lists instead of rendering everything at once.

On WordPress, INP problems nearly always trace back to plugins and page builders adding JavaScript. Our guide to [fixing a slow WordPress site](/why-is-my-wordpress-site-slow) shows how to find which plugin is responsible.

## Cumulative Layout Shift (CLS)

CLS measures how much visible content moves without the visitor causing it. You have felt this when you go to tap a link and an ad loads above it, pushing the link down so you tap something else.

The score has no unit. It is calculated from how much of the screen moved and how far. Zero means nothing shifted.

**Target:** 0.1 or less. Above 0.25 is poor.

### What causes layout shift

- Images and videos without width and height, so the browser does not know how much room to leave.
- Ads, embeds and iframes that load late and push content down.
- Cookie banners and promotional bars inserted at the top of the page.
- Web fonts that swap in with different letter widths, reflowing the text.
- Content added by JavaScript above what the visitor is already reading.

### How to improve CLS

**Always set image dimensions.** Include `width` and `height` on every image and video. The browser uses them to reserve the right space before the file arrives.

```
<img src="chart.webp" width="800" height="450" alt="Monthly visits chart">
```

**Reserve space for ads and embeds.** Give the container a fixed minimum height so the page does not jump when the content loads:

```
.ad-slot {
  min-height: 250px;
}
```

**Overlay banners instead of inserting them.** A cookie notice fixed to the bottom of the screen causes no shift. One that pushes the whole page down does.

**Stabilize fonts.** Preload your main font file and choose a fallback font with similar proportions. Hosting fonts on your own domain avoids a connection to another server.

**Add new content below the fold.** If JavaScript must add something, add it under what is already on screen, or in response to a tap.

## Do Core Web Vitals affect Google rankings?

Yes, modestly. Google has confirmed that Core Web Vitals are used by its ranking systems as part of page experience. It has also been clear that relevance comes first. A fast page with a weak answer will not outrank a slower page that answers the search better.

Think of it as a tie-breaker and a floor. When two pages are similarly useful, the better experience can win. And a very slow page loses visitors before they read anything, which hurts every other signal.

The stronger argument is commercial. People leave slow pages, abandon checkouts that lag and distrust layouts that jump. Improving these numbers improves the site for the people using it, whatever it does for rankings.

## Which metric should you fix first?

Work on whichever metric is failing in field data, in this order when more than one fails.

| Priority | Fix | Why first |
|----------|-----|-----------|
| 1 | Time to First Byte | Everything else waits on it |
| 2 | LCP | Usually the largest gain, and often fixed by images and caching |
| 3 | CLS | Often a few lines of HTML and CSS |
| 4 | INP | Needs JavaScript changes, which take longest |

Fix one template at a time. A blog usually has three or four: the home page, a post, a category page and a static page. Fixing the post template fixes every post.

After a change, check the lab result immediately, then wait. Field data covers the previous 28 days, so the full effect takes about a month to appear in PageSpeed Insights and Search Console.

## How hosting affects Core Web Vitals

Hosting influences LCP through Time to First Byte, and it has almost no effect on INP or CLS. Those two depend on your page's code.

That matters when you are deciding whether to change hosts. If your problem is a slow first byte on uncached pages, better hosting or a CDN will help. If your problem is a 2 MB slider script or images without dimensions, a new host changes nothing.

If you do need to compare hosts, test during the refund window and measure from where your customers are. [How to Choose a Web Hosting Provider](/how-to-choose-web-hosting) covers what to check, and [Shared vs VPS vs Cloud Hosting](/shared-vs-vps-vs-cloud-hosting) explains which type suits which site.

## Frequently asked questions

### What are the three Core Web Vitals?

The three Core Web Vitals are Largest Contentful Paint, which measures loading, Interaction to Next Paint, which measures responsiveness, and Cumulative Layout Shift, which measures visual stability. The good thresholds are 2.5 seconds, 200 milliseconds and 0.1, each at the 75th percentile of page views.

### What is a good LCP score?

A good Largest Contentful Paint is 2.5 seconds or less, measured at the 75th percentile of page views. Between 2.5 and 4 seconds needs improvement, and above 4 seconds is poor. The same thresholds apply on mobile and desktop.

### What replaced First Input Delay?

Interaction to Next Paint replaced First Input Delay as a Core Web Vital in March 2024. First Input Delay measured only the delay before the first interaction was processed. Interaction to Next Paint measures the full time until the screen updates, across all interactions during a visit.

### How do I check my Core Web Vitals?

Use PageSpeed Insights for a single page and the Core Web Vitals report in Google Search Console for a whole site. Both show field data from real Chrome users over the previous 28 days. Chrome DevTools shows the metrics live and identifies the elements responsible.

### Why does my site pass in the lab but fail in the field?

Lab tests simulate one visit on a set device and connection. Field data reflects real visitors, many on slower phones and networks, measured at the 75th percentile. Lab tests also cannot measure Interaction to Next Paint properly, because nobody is interacting with the page.

### How long does it take for improvements to show?

Lab results change immediately. Field data in PageSpeed Insights and Search Console covers the previous 28 days, so a fix takes about a month to be fully reflected. Check the lab numbers first to confirm the change worked, then wait for field data.

### Does changing hosts improve Core Web Vitals?

It can improve Largest Contentful Paint if a slow server response is the cause. Hosting has little effect on Interaction to Next Paint or Cumulative Layout Shift, which depend on your page's JavaScript, images and layout. Diagnose the failing metric before paying for a new host.

## Sources

- [web.dev: Web Vitals](https://web.dev/articles/vitals)
- [web.dev: How the Core Web Vitals metrics thresholds were defined](https://web.dev/articles/defining-core-web-vitals-thresholds)
- [web.dev: Time to First Byte](https://web.dev/articles/ttfb)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Google Search Console](https://search.google.com/search-console/about)
