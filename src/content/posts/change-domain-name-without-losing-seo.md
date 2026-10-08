To change your domain name without losing search traffic, map every old URL to its new address, set up permanent 301 redirects from each one, submit a Change of Address in Google Search Console, and keep the old domain and its redirects running for at least a year. Google's own guidance says to keep redirects "for as long as possible, generally at least 1 year", and warns that it can take a few weeks or more for a medium-sized site to settle. Expect a dip during that period, not a permanent loss, if the redirects are complete.

This guide walks through the full move in the order that protects your rankings, with the checks that catch problems early.

> **How this guide was researched.** The recommendations quoted come from Google Search Central's documentation on site moves with URL changes, linked under Sources. The steps also apply to Bing and other search engines, which follow the same redirects. Example domains are old-example.com and new-example.com.

## Why a domain change is risky

Over the years your old domain has collected signals: links from other sites, bookmarks, an indexing history and a reputation with search engines. Those belong to the old addresses. A new domain starts with none of them.

Redirects are how you pass those signals along. When every old address permanently redirects to its exact new equivalent, search engines transfer the old pages' standing to the new ones. When redirects are missing, sent to the wrong page or removed too early, that standing is lost.

Most traffic losses after a domain change come from one of four mistakes:

1. Redirecting everything to the new home page instead of page to page.
2. Missing pages that had links or traffic.
3. Using temporary 302 redirects instead of permanent 301 or 308.
4. Letting the old domain expire, which breaks every redirect at once.

## Before you start: decide what changes

Do one thing at a time if you can. Google's guidance treats a domain change as one type of site move, and every extra change makes problems harder to diagnose.

| Change | Risk | Advice |
|--------|------|--------|
| New domain only, same paths | Lowest | The simplest move. `/about` becomes `new-example.com/about` |
| New domain and new URL structure | Higher | Map every URL individually |
| New domain, new structure and new design | Highest | Split into stages if you can |
| New domain and new host | Moderate | Move hosts first, settle, then change the domain |

If you are also changing hosts, [How to Migrate a WordPress Site to a New Host](/how-to-migrate-wordpress-site) covers that move. Do it a few weeks before or after the domain change, not on the same day.

## Step 1: Build a complete list of old URLs

You cannot redirect pages you do not know about. Gather URLs from several sources and combine them:

- **Your current sitemap.** The starting list.
- **Google Search Console.** The Pages report and the Performance report list URLs Google knows and URLs that receive clicks.
- **Analytics.** Landing pages over the last 12 months, including old pages still getting visits.
- **Backlink data.** Pages other sites link to. These matter most, because links are the hardest signal to rebuild.
- **A crawl of your site** with a crawler tool, to catch pages not in the sitemap.

Remove duplicates and put them in a spreadsheet. A small business site might have 50 to 200 URLs. A blog with years of posts might have several thousand.

## Step 2: Map every old URL to a new one

Add a second column with the destination for each old address.

| Old URL | New URL |
|---------|---------|
| old-example.com/ | new-example.com/ |
| old-example.com/services/web-design | new-example.com/services/web-design |
| old-example.com/blog/hosting-tips | new-example.com/blog/hosting-tips |
| old-example.com/old-promo-2023 | new-example.com/offers |

Rules for the mapping:

- **One to one wherever possible.** Each page goes to its direct equivalent.
- **Closest relevant page for removed content.** A discontinued product goes to its category, not the home page.
- **No mass redirects to the home page.** Search engines treat an irrelevant redirect much like a missing page, and visitors arriving at a home page instead of the article they clicked usually leave.
- **Let genuinely dead pages return 404.** If nothing replaces a page and it has no links or traffic, an honest not found is fine.

If your paths are not changing, the mapping is a pattern rather than a list, and one rule handles everything. Keep the spreadsheet anyway, to test against.

## Step 3: Prepare the new domain

1. Register the new domain and point it at your hosting. [DNS Records Explained](/dns-records-explained) covers the records.
2. Install an SSL certificate on it. [How to Get a Free SSL Certificate With Let's Encrypt](/free-ssl-certificate-lets-encrypt) has the steps.
3. Copy the site to the new domain and update its internal links, canonical tags, sitemap and structured data to use the new addresses. On WordPress, use WP-CLI's search-replace, which handles serialized data correctly:

```
wp search-replace 'https://old-example.com' 'https://new-example.com' --all-tables --dry-run
```

Run it without `--dry-run` once the report looks right.

4. Verify the new domain in Google Search Console as a Domain property. [How to Set Up Google Search Console](/google-search-console-setup) covers verification.
5. Keep the new site hidden from search engines until launch only if it is publicly reachable, and remember to remove any block on launch day.

## Step 4: Set up the redirects

Google recommends "server side permanent redirects from the old URLs to the new URLs" as mapped, using a permanent status such as 301 or 308, and sending each old URL straight to its final destination.

### If the paths stay the same

On Apache, in the old domain's `.htaccess`:

```
RewriteEngine On
RewriteCond %{HTTP_HOST} ^(www\.)?old-example\.com$ [NC]
RewriteRule ^(.*)$ https://new-example.com/$1 [L,R=301]
```

On Nginx, in the old domain's server blocks for both HTTP and HTTPS:

```
server {
    listen 80;
    listen 443 ssl;
    server_name old-example.com www.old-example.com;
    return 301 https://new-example.com$request_uri;
}
```

The old domain still needs a valid SSL certificate, or visitors following `https://old-example.com` links see a certificate warning before the redirect happens.

### If paths change

Add specific rules for every mapped URL before the general rule. On Apache:

```
Redirect 301 /old-promo-2023 https://new-example.com/offers
Redirect 301 /services/seo-audits https://new-example.com/services/seo
```

On WordPress, a redirect plugin can import the mapping spreadsheet as a CSV, which is easier for hundreds of URLs. [301 vs 302 Redirects](/301-vs-302-redirects) explains the options in detail.

### Avoid chains

If the old site already had redirects, update them to point straight at the new domain. A chain such as `http://old` to `https://old` to `https://www.old` to `https://new` adds a round trip at each hop.

## Step 5: Test before and after switching

Test a sample of URLs from your spreadsheet, including the important ones:

```
curl -sIL https://old-example.com/blog/hosting-tips | grep -i -E "^HTTP|^location"
```

Each should show a single 301 and land on a 200 at the right new address. For hundreds of URLs, a crawler tool can check the whole list from a file.

Check these in particular:

- The home page with and without `www`, and over HTTP and HTTPS.
- Your 20 most-visited pages.
- Your 20 most-linked pages.
- A page with a query string, such as a search or tracking parameter.

## Step 6: Tell Google with the Change of Address tool

Once the redirects are live, Google says: "If you're changing domain names or subdomains, submit a Change of Address in Search Console for the old site."

1. Open Search Console for the **old** domain.
2. Go to **Settings, Change of address**.
3. Choose the new domain from your verified properties.
4. Search Console checks that the redirects work, then confirms the request.

Google advises submitting it for every verified variant of the old domain, including subdomains and `www` and non-`www` versions, even ones you no longer use.

Then submit the new sitemap in the new property. Google says this "will help Google learn about the new URLs". You can remove the old sitemap once Google is using the new one.

## Step 7: Update everything you control

Search engines are one audience. Update every other place that holds your old address:

- Google Business Profile and other business listings.
- Social media profiles.
- Email signatures and newsletter templates.
- Analytics settings. In GA4, update the data stream URL. [How to Set Up Google Analytics 4](/ga4-setup-guide) covers the settings.
- Payment and email services that store your website address.
- Printed material, at the next reprint.
- Links from other sites you have a relationship with. Ask partners and directories to update them. Each direct link saves a redirect hop.

Your email can stay on the old domain for a while, but if you move it, follow [SPF, DKIM and DMARC Explained](/spf-dkim-dmarc-explained) for the new domain before sending.

## Step 8: Monitor for the next few months

Google expects that "it can take a few weeks or more for Google to gradually start showing the new URLs instead of the old ones" for a medium-sized site, and longer for large ones. During that time:

| When | Check |
|------|-------|
| Day 1 to 7 | Redirect tests, Search Console coverage on the new property, server errors |
| Week 2 to 6 | Indexed page count rising on the new domain and falling on the old |
| Month 2 to 3 | Clicks and impressions on the new property approaching the old totals |
| Ongoing | 404 errors on the new domain, which reveal URLs you missed |

Watch the Pages report on the new property for "Not found" URLs. Each one is an old link that is missing from your mapping. Add a redirect and the problem is fixed.

## How long to keep the old domain and redirects

Google's guidance: "Keep the redirects for as long as possible, generally at least 1 year." It also suggests, from a user's point of view, keeping them indefinitely.

The cost of keeping the old domain is small: a renewal fee of around $11 a year for a .com at a registrar such as Porkbun. Old links, bookmarks and printed material keep working for as long as you renew it. Letting it expire saves that fee and breaks every one of those links. Someone else can then register it.

Set the old domain to auto-renew and put a reminder in your calendar. [How to Transfer a Domain](/how-to-transfer-a-domain) covers keeping domains at a registrar with sensible renewal prices.

## The move on one page

1. List every old URL and map each to its new address.
2. Set up the new domain with SSL, updated internal links and a new sitemap.
3. Add page-to-page 301 redirects and test a sample.
4. Submit a Change of Address and the new sitemap in Search Console.
5. Update listings, profiles and partner links.
6. Watch the new property's Not found report and renew the old domain.

## Frequently asked questions

### Will changing my domain name hurt SEO?

There is usually a temporary dip while search engines process the move, and it can take a few weeks or more for a medium-sized site to settle, according to Google. With complete page-to-page 301 redirects and a Change of Address submitted, most sites recover their previous traffic.

### How long should I keep redirects after a domain change?

Google recommends keeping redirects for as long as possible, generally at least one year, and suggests considering keeping them indefinitely for users. Renew the old domain so old links and bookmarks keep working.

### What is Google's Change of Address tool?

It is a Search Console setting that tells Google your site has moved to a new domain. Open the old domain's property, go to Settings and choose Change of address. It requires both domains to be verified and the redirects to be working.

### Should I redirect all old pages to the new home page?

No. Redirect each old page to its direct equivalent on the new domain. Redirecting everything to the home page is treated much like the pages being missing, loses their search standing and frustrates visitors who clicked a specific article.

### Can I change domains and redesign at the same time?

You can, but it raises the risk. If traffic drops, you will not know whether the domain change or the redesign caused it. Google treats each change as an additional variable. Split the work into separate stages a few weeks apart where possible.

### Do I need an SSL certificate on the old domain?

Yes. Many links point to https:// addresses on your old domain. Without a valid certificate, visitors see a security warning before the redirect can happen. Keep the certificate active for as long as you keep the redirects.

### What should I do if traffic does not recover?

Check the new property's Pages report for not found URLs and add missing redirects. Test that old URLs return one 301 to the correct page, not a chain or a 302. Confirm the Change of Address was accepted and the new sitemap was submitted.

## Sources

- [Google Search Central: Site moves with URL changes](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)
- [Google Search Central: Redirects and Google Search](https://developers.google.com/search/docs/crawling-indexing/301-redirects)
- [Search Console Help: Change of Address tool](https://support.google.com/webmasters/answer/9370220?hl=en)
- [Porkbun .com pricing](https://porkbun.com/tld/com)
