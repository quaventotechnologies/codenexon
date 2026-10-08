A 404 error means a page could not be found at the address requested. Most 404s are harmless: Google treats them as a normal signal that a page does not exist and simply drops that URL from its index. The 404s worth fixing are the ones that cost you something: broken links inside your own site, missing pages that other sites link to, and old pages that still get visits. Fix those by correcting the link or adding a 301 redirect to the closest relevant page, and let the rest return an honest 404.

This guide shows how to find 404 errors, decide which ones matter, fix them correctly on WordPress and other sites, and avoid the soft 404 mistake.

> **How this guide was researched.** How Google treats status codes is quoted from Google Search Central's documentation on HTTP status codes, linked under Sources. The tools and commands are free and standard. Example URLs use example.com.

## What a 404 actually tells search engines

Google's documentation says that "all 4xx errors, except 429, are treated the same". For pages that were indexed, the URL is removed from the index. For newly found 404 URLs, Google says they "aren't processed", and over time "the crawling frequency gradually decreases".

In plain terms:

- A 404 removes **that one URL** from search results.
- It does not, by itself, signal that the rest of your site is low quality.
- Google keeps checking occasionally, less and less often, in case the page comes back.

That is why most 404s need no action. A page you deleted on purpose, with no links and no traffic, should return 404. That is the correct answer.

## 404 vs 410 vs soft 404

| Response | Meaning | When to use |
|----------|---------|-------------|
| 404 Not Found | Nothing at this address | The default for missing pages |
| 410 Gone | Removed on purpose and not coming back | Deliberately deleted content. Google treats it like a 404 |
| 301 Moved Permanently | It is now at another address | The content moved or has a close replacement |
| Soft 404 | Page says "not found" but returns 200 OK | Never. It is a configuration error |

### Why soft 404s are a problem

A soft 404 is a page that looks like an error to a visitor but tells the browser and search engines that everything is fine, by returning a 200 success code. Common causes:

- A custom error page served with the wrong status code.
- Redirecting every missing URL to the home page.
- Empty search results or empty category pages that still return 200.
- A product page for a discontinued item showing "no longer available" with no other content.

Google reports these in Search Console as soft 404s. They waste crawling on empty pages, and pages that redirect everything to the home page give visitors the wrong answer. Visitors who clicked a link to a specific article and land on your home page usually leave.

## Step 1: Find your 404 errors

Use several sources, because each one catches different problems.

### Google Search Console

Open **Indexing, Pages** and look at the **Not found (404)** row. It lists URLs Google tried and could not find, with the date last crawled. Click any URL and use **Inspect URL** to see where Google found it, which often points to the broken link. [How to Set Up Google Search Console](/google-search-console-setup) explains the report.

### A site crawl

A crawler tool follows every link on your site, like a search engine does, and lists links that return 404. This is the best way to find broken **internal** links, which are entirely your responsibility to fix.

### Analytics

In GA4, look at page views for your 404 page. The page title is usually something like "Page Not Found". Add the page path as a dimension to see which missing addresses people are actually requesting. [How to Set Up Google Analytics 4](/ga4-setup-guide) covers the reports.

### Server logs

Your web server records every request. On a Linux server you can list the most requested missing paths:

```
grep ' 404 ' /var/log/nginx/access.log | awk '{print $7}' | sort | uniq -c | sort -rn | head -20
```

For Apache, change the path to `/var/log/apache2/access.log`. This shows real traffic, including requests from bots probing for files that never existed, such as `/wp-login.php` on a site that does not run WordPress. Those you can ignore.

### Broken outbound links

Links from your pages to other sites break too, when those sites move or close. A crawler tool can check external links as well. They do not create 404s on your site, but they frustrate readers and make content look neglected.

## Step 2: Decide which ones matter

Put every 404 into one of four groups.

| Group | How to recognize it | Action |
|-------|---------------------|--------|
| Broken internal link | A page on your own site links to it | Fix the link. Add a redirect too if the page moved |
| Has external links | Other sites link to the missing URL | Redirect to the closest relevant page |
| Gets real traffic | Analytics or logs show people visiting it | Redirect, or restore the page |
| Junk or deliberate | Typos, bot probes, pages deleted on purpose with no links or traffic | Leave it as a 404 |

To check whether a missing page has external links, use the Links report in Search Console or a backlink tool. A missing page with links from other sites is losing value every day, and a redirect recovers it.

## Step 3: Fix broken internal links first

Internal links are the 404s you cause yourself, and they are the easiest to fix.

1. Run a crawl and export the list of broken internal links, with the page each one appears on.
2. Open each source page and change the link to the correct current URL.
3. If the target was deleted and there is no replacement, remove the link or point it at a relevant page.
4. Crawl again to confirm.

Fix the link itself, even if you also add a redirect. A redirect works, but it adds a round trip every time someone clicks, and an updated link does not. [Internal Linking: How to Connect Your Pages](/internal-linking-guide) covers keeping links tidy as a site grows.

## Step 4: Redirect pages that moved or have value

For each missing URL that has links or traffic, choose the best destination:

| Situation | Redirect to |
|-----------|-------------|
| Page renamed or moved | Its new address |
| Two pages merged | The combined page |
| Product discontinued, replacement exists | The replacement product |
| Product discontinued, no replacement | The product's category |
| Old blog post replaced by a newer guide | The newer guide |
| Nothing relevant exists | Nothing. Let it 404 |

Use a permanent 301 redirect. [301 vs 302 Redirects](/301-vs-302-redirects) has the server configuration for Apache, Nginx, WordPress and static hosts.

### Do not redirect everything to the home page

It is tempting to send every missing page to the home page and make the 404s disappear from reports. Do not. A redirect to an unrelated page is treated much like a missing page, and Search Console may report it as a soft 404. You gain nothing in search, and visitors who wanted a specific article get your home page instead. An honest 404 with helpful links serves them better.

## Step 5: Make your 404 page useful

Some visitors will always reach a missing page: mistyped addresses, old bookmarks, links from sites you cannot change. A good 404 page turns that dead end into a path forward.

A useful 404 page:

- **Returns a real 404 status code.** Check with `curl -sI https://example.com/missing-page | head -1`. It should say 404, not 200.
- **Says clearly that the page was not found,** in plain words.
- **Offers a way forward:** a link to the home page, a search box or a link to your main sections.
- **Suggests popular content,** such as your most useful guides.
- **Keeps your normal header and footer,** so the visitor can navigate as usual.
- **Is marked noindex,** so it never appears in search results itself.

CodeNexon's own 404 page follows this pattern. It returns a 404 status, explains that guides now live under their category, offers buttons for the home page and all guides, lists the three categories, and suggests six popular guides.

## Fixing 404s in WordPress

- **Changed a post's slug?** WordPress automatically redirects the old slug for posts and pages, so simple renames are covered.
- **Every page except the home page returns 404?** Your permalink rules are missing. Go to **Settings, Permalinks** and click **Save Changes** to rebuild them. On Nginx, check that your server block includes `try_files $uri $uri/ /index.php?$args;`. [Nginx vs Apache](/nginx-vs-apache) explains why.
- **Need to manage many redirects?** The free Redirection plugin logs 404s and lets you add redirects from the dashboard. Rank Math's free version also includes a redirect manager and a 404 monitor. [Rank Math vs Yoast SEO](/rank-math-vs-yoast) compares the options.
- **Deleted a page by accident?** Restore it from the trash, or from a backup. [How to Back Up a WordPress Site](/how-to-back-up-wordpress-site) covers restores.

## After a site move or redesign

The largest wave of 404s usually follows a redesign, a change of URL structure or a new domain. Prevent most of them by mapping every old URL to a new one before launch and redirecting each one. Then watch Search Console's Not found report for a few weeks afterwards. Every URL that appears there is one your mapping missed. [How to Change Your Domain Name Without Losing SEO](/change-domain-name-without-losing-seo) walks through the mapping process.

## Server errors are a different problem

Do not confuse 404s with 5xx errors. Google's documentation says that 5xx and 429 errors "prompt Google's crawlers to temporarily slow down with crawling", and that indexed URLs are "preserved in the index, but eventually dropped" if the errors continue. A 404 affects one page. Persistent server errors affect how Google crawls your whole site.

If Search Console shows server errors, treat them as urgent. Check your hosting, your error logs and recent changes. [Website Uptime Monitoring](/website-uptime-monitoring) helps you catch them as they happen.

## A monthly 404 routine

1. Open the Not found report in Search Console and note any new URLs.
2. For each one, check whether it is linked internally, linked externally or getting traffic.
3. Fix internal links and add redirects for valuable pages.
4. Run a crawl and fix any new broken internal links.
5. Check that your 404 page still returns a 404 status.

Fifteen minutes a month keeps the problem small.

## Frequently asked questions

### Do 404 errors hurt SEO?

Not for the rest of your site. Google treats a 404 as a signal that one page does not exist and drops that URL from its index. 404s matter when they come from your own broken links or affect pages that other sites link to, because those cost you visitors and link value.

### What is the difference between a 404 and a 410?

A 404 means a page was not found, and a 410 means it was deliberately removed. Google's documentation says all 4xx errors except 429 are treated the same, so in practice both remove the URL from the index. Use 410 when you want to be explicit.

### What is a soft 404?

A soft 404 is a page that tells visitors it was not found, or shows almost no content, but returns a 200 success code instead of 404. Google flags these in Search Console. Fix them by returning a real 404 status or by redirecting to a genuinely relevant page.

### Should I redirect all 404 pages to my home page?

No. Redirecting unrelated missing pages to the home page is treated much like a missing page and may be reported as a soft 404. Redirect only to a closely relevant page, and let pages with no replacement return a proper 404.

### How do I find broken links on my website?

Use the Not found report in Google Search Console, crawl your site with a crawler tool to list broken internal links, check your analytics for visits to the 404 page, and review server logs for the most requested missing paths.

### Why does every page except the home page show a 404 in WordPress?

The permalink rewrite rules are missing or broken. Go to Settings, Permalinks and click Save Changes. On Nginx servers, make sure the site configuration includes try_files $uri $uri/ /index.php?$args; in the main location block.

### What should a good 404 page include?

A real 404 status code, a clear message, links to the home page and main sections, a search box or popular content, and your normal site header and footer. It should also be marked noindex so it does not appear in search results.

## Sources

- [Google Search Central: How HTTP status codes and network errors affect Google Search](https://developers.google.com/search/docs/crawling-indexing/http-network-errors)
- [Google Search Central: Redirects and Google Search](https://developers.google.com/search/docs/crawling-indexing/301-redirects)
- [Search Console Help: Page indexing report](https://support.google.com/webmasters/answer/7440203?hl=en)
- [MDN: 404 Not Found](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404)
