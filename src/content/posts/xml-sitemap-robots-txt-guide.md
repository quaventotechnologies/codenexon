An XML sitemap is a list of the pages you want search engines to find, and robots.txt is a file that tells crawlers which parts of your site they may visit. They work together: robots.txt points crawlers to the sitemap, and the sitemap lists your important URLs with the date each one last changed. Google caps a sitemap at 50,000 URLs or 50 MB uncompressed, ignores the `priority` and `changefreq` fields, and treats robots.txt as a crawling instruction, not a way to keep pages out of search results.

This guide shows what a good sitemap and robots.txt file look like, the mistakes that hide pages from Google, and how to set both up on WordPress and other sites.

> **How this guide was researched.** The limits and behaviors described here are quoted from Google Search Central's documentation, linked under Sources. Example files use example.com. CodeNexon's own sitemap and robots.txt are used as working examples of the same rules.

## Sitemap vs robots.txt at a glance

| | XML sitemap | robots.txt |
|---|-------------|------------|
| Purpose | Lists pages you want found | Tells crawlers what they may not request |
| Location | Usually `/sitemap.xml` | Must be `/robots.txt` at the root |
| Required? | No, but strongly recommended | No |
| Controls indexing? | No | No |
| Google's limits | 50,000 URLs or 50 MB uncompressed per file | 500 KiB file size |
| Fields Google ignores | `priority`, `changefreq` | `crawl-delay` |

The two most common misunderstandings are both in that table. A sitemap does not force pages into Google, and robots.txt does not keep them out.

## Part 1: XML sitemaps

### What a sitemap looks like

A minimal sitemap lists each URL and, ideally, when it last changed:

```
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2026-10-07</lastmod>
  </url>
  <url>
    <loc>https://example.com/hosting/choose-a-host</loc>
    <lastmod>2026-10-06</lastmod>
  </url>
</urlset>
```

That is all a sitemap needs. Everything else is optional, and some of it is ignored.

### What Google uses and what it ignores

| Field | What Google does with it |
|-------|--------------------------|
| `<loc>` | Required. The page address |
| `<lastmod>` | Used when it is consistently and verifiably accurate |
| `<priority>` | Ignored |
| `<changefreq>` | Ignored |

Google's documentation says plainly: "Google ignores `<priority>` and `<changefreq>` values." Many sitemap tools still add them. They do no harm, but they do no good either, so do not spend time tuning them.

### Get lastmod right

`lastmod` is the one optional field that matters, and only if you are honest with it. Google says it uses the value when it is consistently accurate, and that it should reflect "the last significant update to the page". Changes to the main content, structured data or links count. Changing the copyright year in the footer does not.

The common mistake is setting every page's `lastmod` to today's date on every build. Google learns the value is meaningless and stops trusting it. Set it from the date the page content actually changed. On CodeNexon, each post's `lastmod` comes from the post's own "updated" date, which only changes when the guide is substantively revised.

### Which pages belong in a sitemap

Include pages you want people to find in search:

- Your home page.
- Category and hub pages.
- Every post, product and service page.
- Important information pages such as About and Contact.

Leave out:

- Pages marked `noindex`.
- Pages that redirect elsewhere. List the final address only.
- Duplicate versions, such as URLs with tracking parameters. List the canonical address.
- Thin pages such as tag archives, internal search results and login pages.
- Pages that return errors.

A sitemap full of redirects and noindexed pages sends mixed signals and makes Search Console's reports harder to read. Every URL in the sitemap should return a 200 status and be the version you want indexed.

### Limits and sitemap index files

Google limits each sitemap to 50,000 URLs or 50 MB uncompressed. A large site splits its URLs across several sitemaps and lists them in a sitemap index:

```
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://example.com/sitemap-posts.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://example.com/sitemap-products.xml</loc>
  </sitemap>
</sitemapindex>
```

You then submit just the index. Most small sites never come near these limits. A blog with 300 posts fits comfortably in one file.

### How to tell Google about your sitemap

Google lists three ways:

1. **Submit it in Search Console** under Indexing, Sitemaps. This also gives you a report of how many URLs were discovered and any errors.
2. **Use the Search Console API,** if you manage many sites.
3. **Add a line to robots.txt:**

```
Sitemap: https://example.com/sitemap.xml
```

Do both 1 and 3. The robots.txt line lets every search engine find it, and Search Console gives you the reporting. [How to Set Up Google Search Console](/google-search-console-setup) walks through submitting it.

### What a sitemap does not do

A sitemap is a hint. It helps search engines discover pages and decide when to recrawl them, which matters most for new sites with few links and large sites with deep pages. It does not guarantee that a page is crawled, indexed or ranked. A page with thin content can be in your sitemap for a year and never be indexed.

## Part 2: robots.txt

### What robots.txt does

Robots.txt is a plain text file at the root of your domain that tells crawlers which paths they should not request. Google requires it to be in the top-level directory, so it must live at `https://example.com/robots.txt`, not in a subfolder.

A simple, sensible file for most sites:

```
User-agent: *
Allow: /

Sitemap: https://example.com/sitemap.xml
```

That says every crawler may request everything, and here is the sitemap. For many websites, this is all you need.

### The directives Google supports

| Directive | Meaning |
|-----------|---------|
| `User-agent` | Which crawler the following rules apply to. `*` means all |
| `Disallow` | A path the crawler should not request |
| `Allow` | An exception within a disallowed path |
| `Sitemap` | The full address of a sitemap |

Google supports these four. It does not support `crawl-delay`, so that line has no effect on Googlebot, though some other crawlers read it.

Google also recognizes two wildcards: `*` matches any sequence of characters, and `$` marks the end of the URL.

```
User-agent: *
Disallow: /cart/
Disallow: /*?sort=
Disallow: /*.pdf$
```

This blocks the cart, any URL containing `?sort=`, and any URL ending in `.pdf`.

### The big misunderstanding: robots.txt does not prevent indexing

This catches out experienced site owners. Google's documentation explains that it "can't index the content of pages which are disallowed for crawling, but it may still index the URL and show it in search results without a snippet."

So if another site links to a page you blocked in robots.txt, Google can still list that URL in results, with a line saying no information is available. Blocking also stops Google from seeing a `noindex` tag on the page, because it never fetches the page to read it.

To keep a page out of search results:

| Goal | Use |
|------|-----|
| Keep a page out of search results | A `noindex` meta tag or `X-Robots-Tag: noindex` header, and leave the page crawlable |
| Keep a page private | Password protection |
| Save crawl effort on endless filter or search URLs | `Disallow` in robots.txt |
| Remove a page already in results quickly | Search Console's Removals tool, plus noindex or deletion |

The noindex tag looks like this:

```
<meta name="robots" content="noindex">
```

A staging site is the classic case. Blocking it in robots.txt alone can still leave its URLs in search. Use password protection plus noindex instead, as covered in [How to Create a WordPress Staging Site](/wordpress-staging-site).

### How Google handles a missing or broken robots.txt

| Response for /robots.txt | What Google does |
|--------------------------|------------------|
| 200 with valid content | Follows the rules |
| 404 or another 4xx (except 429) | Treats it as if there were no robots.txt, so crawls everything |
| 5xx server error | Pauses crawling and retries, and after long-running errors may assume no rules or stop crawling |

A missing robots.txt is harmless. A robots.txt that returns server errors is not, because Google stops crawling while it waits. If your server is unreliable, this file is worth monitoring. [Website Uptime Monitoring](/website-uptime-monitoring) covers how.

Google also processes only the first 500 KiB of the file. That is far more than any normal site needs.

### Rules for AI crawlers

AI companies run their own crawlers, and robots.txt is how you allow or refuse them. Some examples you may see in logs and documentation are GPTBot and OAI-SearchBot from OpenAI, ClaudeBot from Anthropic, PerplexityBot, CCBot from Common Crawl, and Google-Extended, which controls whether Google may use your content for its AI models.

To refuse one of them:

```
User-agent: GPTBot
Disallow: /
```

The trade-off is real. Blocking AI crawlers keeps your content out of some AI training and answers. Allowing them gives your pages a chance to be cited when people ask AI assistants questions you answer. CodeNexon allows them on purpose, lists them by name in its robots.txt, and also publishes an `llms.txt` file that summarizes the site for AI systems.

Robots.txt is a request, not a lock. Reputable crawlers obey it, and anything genuinely private should be behind a login.

### Mistakes that hide your whole site

| Mistake | Effect | Fix |
|---------|--------|-----|
| `Disallow: /` under `User-agent: *` | Blocks the entire site | Remove it, or change to `Allow: /` |
| Leftover rules from a development site | Live site blocked after launch | Check robots.txt on launch day |
| Blocking CSS and JavaScript folders | Google cannot render pages properly | Allow theme and script files |
| Blocking a page you also mark noindex | Google never sees the noindex | Allow crawling so the tag can be read |
| Sitemap line with a relative path | Sitemap not found | Use the full URL |

The first two are the most common cause of a new site getting no search traffic at all. WordPress's **Discourage search engines** setting is often left switched on after a site is built. Check Settings, Reading on launch day.

## Setting both up on WordPress

- **Sitemap:** WordPress has created a basic sitemap at `/wp-sitemap.xml` since version 5.5. SEO plugins such as Rank Math and Yoast SEO replace it with their own, usually at `/sitemap_index.xml`, with more control over what is included. Use one or the other, not both. [Rank Math vs Yoast SEO](/rank-math-vs-yoast) compares the plugins.
- **robots.txt:** WordPress serves a virtual robots.txt if no file exists. SEO plugins let you edit it from the dashboard. Or upload your own `robots.txt` file to the site's root folder, which takes priority.

After any change, open both addresses in a browser to confirm what is actually being served.

## Setting both up on other sites

Most frameworks and static site generators can build both files from your content. In Next.js, `app/sitemap.ts` and `app/robots.ts` generate them. CodeNexon uses exactly that, so every new post appears in the sitemap automatically with its correct `lastmod` date, and the robots.txt always points to the current sitemap.

If you deploy a static export, those route files must be marked as static. [How to Deploy Next.js to Firebase Hosting](/how-to-deploy-nextjs-to-firebase-hosting) covers that detail.

## How to check both files

1. Open `https://yourdomain.com/robots.txt` and read it line by line.
2. Open your sitemap address and confirm it lists your real pages with sensible dates.
3. In Search Console, open the Sitemaps report and check the number of discovered URLs.
4. Use Search Console's robots.txt report to see the version Google last fetched and any errors.
5. Use the URL Inspection tool on an important page. It shows whether the page is allowed by robots.txt and whether it is indexed.

## Frequently asked questions

### Do I need an XML sitemap?

Not strictly, but it is recommended. A sitemap helps search engines find your pages, especially on new sites with few links and large sites with deep pages. Most platforms generate one automatically. It does not guarantee pages will be indexed.

### How many URLs can a sitemap have?

Google limits a single sitemap to 50,000 URLs or 50 MB uncompressed. Larger sites split their URLs across several sitemaps and list them in a sitemap index file, which is then submitted on its own.

### Does Google use priority and changefreq?

No. Google's documentation states that it ignores the priority and changefreq values in sitemaps. It does use lastmod, but only when the dates are consistently accurate and reflect significant changes to the page.

### Does robots.txt stop a page from appearing in Google?

No. Robots.txt stops crawling, not indexing. Google may still index a blocked URL and show it without a snippet if other pages link to it. To keep a page out of search results, use a noindex tag and leave the page crawlable.

### Where should robots.txt be located?

It must be in the top-level directory of the domain, at an address like https://example.com/robots.txt. A robots.txt file in a subfolder is not used. Each subdomain needs its own robots.txt.

### Does Google support crawl-delay?

No. Google supports the user-agent, allow, disallow and sitemap fields in robots.txt and does not support crawl-delay. Some other search engines and crawlers still read it.

### Should I block AI crawlers in robots.txt?

It depends on your goals. Blocking crawlers such as GPTBot or ClaudeBot keeps your content out of those systems. Allowing them gives your pages a chance to be cited in AI answers. Reputable crawlers follow robots.txt, but private content should be protected by a login.

## Sources

- [Google Search Central: Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google Search Central: How Google interprets the robots.txt specification](https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt)
- [Google Search Central: Block indexing with noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
- [Sitemaps.org protocol](https://www.sitemaps.org/protocol.html)
