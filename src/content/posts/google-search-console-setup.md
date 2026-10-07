To set up Google Search Console, add your site as a Domain property, verify ownership by adding a TXT record at your DNS provider, and submit your XML sitemap. It is free, takes about 15 minutes, and is the only place to see which searches your site appears for, how many clicks it gets and which pages Google has not indexed. Keep the verification record in place permanently, because Search Console checks it periodically and removes access if it disappears.

This guide covers setup, the reports worth checking every week, and how to turn the data into specific fixes.

> **How this guide was researched.** Verification methods and their rules come from Google's Search Console Help, linked under Sources. Menu names match Search Console in October 2026. Google renames and moves reports from time to time, so a label may differ slightly on your screen.

## What Search Console tells you that nothing else does

Analytics tools show what visitors do once they arrive. Search Console shows what happens before that, inside Google:

- Which searches your pages appear for, and how often.
- How many people clicked, and your average position.
- Which pages are indexed, and why others are not.
- Problems Google found: crawl errors, broken structured data, page experience issues and security warnings.
- Which other sites link to you.

It is also how Google contacts you about a manual action or a hacked site.

## Step 1: Choose a property type

When you add a site, Search Console asks for one of two property types.

| | Domain property | URL-prefix property |
|---|-----------------|---------------------|
| Example | `example.com` | `https://www.example.com/` |
| Covers | Every subdomain and both HTTP and HTTPS | Only addresses starting with that exact prefix |
| Verification | DNS record only | Several methods |
| Best for | Most sites | Sites where you cannot edit DNS, or one section of a site |

Choose a Domain property if you can. It shows data for `example.com`, `www.example.com`, `blog.example.com` and both protocols in one place. A URL-prefix property for `https://example.com/` would miss traffic to `www.example.com`, which is a common reason people see less data than they expect.

## Step 2: Verify ownership

### For a Domain property: DNS verification

Domain properties can only be verified through your domain name provider.

1. In Search Console, enter your domain without `https://` or `www`, for example `example.com`.
2. Search Console shows a TXT record that starts with `google-site-verification=`.
3. Log in where your DNS is managed. That may be your registrar, your web host or a service such as Cloudflare.
4. Add a TXT record for the root of the domain, usually written as `@`, with that value.
5. Return to Search Console and click **Verify**.

The record looks like this in most DNS panels:

```
Type   Name   Value                                             TTL
TXT    @      google-site-verification=AbC123exampleToken456    3600
```

If verification fails, wait and try again. New DNS records can take from a few minutes to a few hours to become visible. You can check whether it is live yet:

```
dig example.com TXT +short
```

You can have several TXT records on the same name. The verification record sits alongside your SPF and other records without affecting them. [DNS Records Explained](/dns-records-explained) covers TXT records in more detail.

### For a URL-prefix property: other methods

If you cannot edit DNS, a URL-prefix property accepts these methods:

| Method | How it works |
|--------|--------------|
| HTML file upload | Upload a file Google gives you to your site's root folder |
| HTML tag | Add a `<meta>` tag to your home page's head |
| Google Analytics | Uses your existing Analytics tag, if you have edit access |
| Google Tag Manager | Uses your existing Tag Manager container |
| Domain name provider | The DNS record method, which also works here |

WordPress SEO plugins usually have a field for the HTML tag method. Paste only the code value, not the whole tag.

### Keep the verification in place

Google's help pages are explicit: "To stay verified, don't remove the DNS record from your provider, even after verification succeeds." Search Console periodically checks that the token is still present. If you delete the record, the file or the tag, you lose access.

Note it somewhere, so whoever tidies up your DNS records in a year knows not to delete it.

## Step 3: Submit your sitemap

1. Open **Indexing, Sitemaps** in the left menu.
2. Enter your sitemap address, for example `sitemap.xml` or `sitemap_index.xml` for many WordPress SEO plugins.
3. Click **Submit**.

The status should change to **Success** within a day or two, with a count of discovered pages. If it shows **Couldn't fetch**, open the sitemap address in your browser to confirm it loads, and check that robots.txt is not blocking it.

If you are not sure what your sitemap should contain, [XML Sitemaps and Robots.txt Explained](/xml-sitemap-robots-txt-guide) covers it.

## Step 4: Add other people

Under **Settings, Users and permissions**, you can add a developer, an agency or a colleague.

| Permission | Can do |
|------------|--------|
| Owner | Everything, including adding and removing users |
| Full user | See all data and take most actions |
| Restricted user | See most data, cannot make changes |

Give people the lowest level they need. An agency usually needs Full. A colleague who reads reports needs Restricted. When someone stops working with you, remove them.

## The reports worth checking

Data starts appearing a few days after you verify, and grows over the following weeks. Here is what to look at once it does.

### Performance: search results

This is the report you will use most. It shows four numbers for any date range:

| Metric | Meaning |
|--------|---------|
| Total clicks | Times someone clicked through to your site from Google |
| Total impressions | Times one of your pages appeared in results someone saw |
| Average CTR | Clicks divided by impressions |
| Average position | Your average ranking for the queries shown |

Below the chart, switch between tabs for **Queries**, **Pages**, **Countries** and **Devices**. Clicking a query and then the Pages tab shows which page ranks for it.

### Indexing: pages

This report splits your URLs into **Indexed** and **Not indexed**, with a reason for each group of excluded pages. Some reasons are normal and need no action:

| Reason | Usually means | Action |
|--------|---------------|--------|
| Excluded by noindex tag | You told Google not to index it | None, if intended |
| Page with redirect | The URL redirects elsewhere | None, if intended |
| Alternate page with proper canonical tag | A duplicate that points to the main version | None |
| Not found (404) | The page does not exist | Redirect if it was moved, otherwise ignore |
| Crawled, currently not indexed | Google saw it and chose not to index it yet | Improve the content or internal links |
| Discovered, currently not indexed | Google knows it exists but has not crawled it | Common on new sites. Add internal links and wait |
| Blocked by robots.txt | Robots.txt prevents crawling | Check this was intended |

The two "currently not indexed" reasons are the ones worth working on. They usually point to thin or duplicate content, or pages with few internal links pointing to them.

### URL Inspection

Paste any URL from your site into the search bar at the top. It tells you whether that page is indexed, when Google last crawled it, the canonical URL Google chose, and whether it is mobile friendly. After you publish or significantly update a page, **Request indexing** asks Google to recrawl it. Use it for important pages, not as a daily routine.

### Experience: Core Web Vitals

This report groups your URLs into Good, Needs improvement and Poor for real-user loading, responsiveness and visual stability, using field data from Chrome. It needs enough traffic to show data. [Core Web Vitals Explained](/core-web-vitals-explained) explains the three metrics and how to fix them.

### Enhancements

If your pages have structured data, such as breadcrumbs or products, a report appears for each type with valid items, warnings and errors. [Schema Markup Explained](/schema-markup-guide) covers what to add and how to fix errors.

### Security and manual actions

Check **Security issues** and **Manual actions** occasionally. Both should say no issues detected. If either shows a problem, it explains what was found and how to request a review once it is fixed.

## Turning the data into actions

The Performance report is most useful when you look for specific patterns.

### High impressions, low CTR

Filter the Queries or Pages tab for rows with many impressions and a low click-through rate. People see your result and do not click. Rewrite the title and meta description to answer the search more directly, and check that the title matches what people are actually searching for.

### Positions 8 to 20

Pages averaging position 8 to 20 are on the edge of the first page, often called striking distance. Small improvements move them up: add a missing section that competing pages cover, update out-of-date information, and add links to the page from your other relevant posts.

To find them, click **Average position** at the top of the report so the column appears, then sort the Pages tab by position.

### Queries you did not target

Look for queries where you rank but your page only partly answers the question. Each one is either a section to add to an existing page or a sign that a new page is needed.

### Pages losing clicks

Compare the last three months with the previous three. Pages with a clear drop may have been overtaken by fresher competitors or may have out-of-date details. Update them, and note the change in the page's update history.

## A 30-minute weekly routine

1. **Performance:** compare the last 7 days with the previous 7. Note any big change in clicks.
2. **Indexing:** check whether the count of indexed pages has dropped unexpectedly.
3. **New pages:** use URL Inspection on anything published this week.
4. **Messages:** read any new messages from Google, shown by the bell icon.

Once a month, add the CTR and striking-distance checks above and pick two or three pages to improve.

## Search Console and Google Analytics together

The two tools measure different stages and their numbers will never match exactly. Search Console counts clicks from Google search. Analytics counts sessions on your site, and only from visitors whose browsers run the tracking script and who accepted analytics where consent is required.

You can link them so Search Console data appears in Analytics reports. [How to Set Up Google Analytics 4](/ga4-setup-guide) covers the Analytics side.

## Frequently asked questions

### Is Google Search Console free?

Yes. Google Search Console is free for any site owner. You need a Google account and the ability to verify that you own or manage the site, usually by adding a DNS record or a small file or tag to the site.

### What is the difference between a Domain property and a URL-prefix property?

A Domain property covers every subdomain and both HTTP and HTTPS, and can only be verified with a DNS record. A URL-prefix property covers only addresses starting with the exact prefix you enter, such as https://www.example.com/, and accepts several verification methods.

### How do I verify my site in Search Console?

For a Domain property, add the TXT record Search Console gives you at your DNS provider and click Verify. For a URL-prefix property, you can also upload an HTML file, add a meta tag to your home page, or use an existing Google Analytics or Tag Manager setup.

### Can I remove the verification record after I am verified?

No. Google's help pages say not to remove the DNS record even after verification succeeds. Search Console checks periodically that the verification token is still present, and you lose access if it has been removed.

### How long until data appears in Search Console?

Data usually starts appearing within a few days of verification. Performance data covers the period after you added the property, and reports fill in over the following weeks as Google crawls more of your pages.

### Why is my page not indexed?

Open the Pages report under Indexing, or inspect the URL. Common reasons include a noindex tag, a block in robots.txt, a redirect, duplication of another page, or Google deciding the page is not yet worth indexing. The report gives the specific reason for each URL.

### Should I use Request Indexing for every new post?

Use it for important new or substantially updated pages, but it is not needed for everything. Google finds new pages through your sitemap and internal links. Request Indexing is useful when you want a significant change picked up sooner.

## Sources

- [Search Console Help: Verify your site ownership](https://support.google.com/webmasters/answer/9008080?hl=en)
- [Search Console Help: Performance report](https://support.google.com/webmasters/answer/7576553?hl=en)
- [Search Console Help: Page indexing report](https://support.google.com/webmasters/answer/7440203?hl=en)
- [Google Search Central: Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google Search Console](https://search.google.com/search-console/about)
