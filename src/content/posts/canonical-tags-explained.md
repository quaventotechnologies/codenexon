A canonical tag tells search engines which version of a page is the main one when the same content can be reached at more than one address. It is a single line in the page's head, `<link rel="canonical" href="https://example.com/page">`, and Google treats it as a strong signal, though not an order. Put a self-referencing canonical on every page, always use the full absolute URL, and never point canonicals at pages that redirect, are blocked or are marked noindex.

This guide explains why duplicate URLs happen, how Google chooses a canonical, the mistakes that confuse it, and how to check what Google actually picked.

> **How this guide was researched.** The rules and quotations come from Google Search Central's documentation on consolidating duplicate URLs, linked under Sources. Example addresses use example.com. Canonical handling by other search engines, such as Bing, follows the same principles.

## Why the same page has several addresses

Most sites create duplicate URLs without meaning to. All of these can show identical content:

```
https://example.com/shoes/running
https://www.example.com/shoes/running
http://example.com/shoes/running
https://example.com/shoes/running/
https://example.com/shoes/running?utm_source=newsletter
https://example.com/shoes/running?sort=price
https://example.com/shoes?category=running
```

Common causes:

| Cause | Example |
|-------|---------|
| `www` and non-`www` both work | `www.example.com` and `example.com` |
| HTTP and HTTPS both work | `http://` and `https://` |
| Trailing slash differences | `/page` and `/page/` |
| Tracking parameters | `?utm_source=newsletter` |
| Sorting and filtering | `?sort=price&color=blue` |
| Print or mobile versions | `/page?print=1` |
| A product in several categories | `/men/shoe-123` and `/sale/shoe-123` |
| Syndicated or copied content | Your article republished on a partner site |

To a person these are one page. To a search engine they are seven URLs with the same content. Without guidance, it has to decide which one to index and show in results, and it may split links and signals across several of them.

## What canonicalization does

Canonicalization is the process of choosing one representative URL from a group of duplicates. Google picks the canonical, indexes it, and generally shows that version in search results. Links pointing at the other versions are consolidated onto it.

You do not have to declare a canonical. Google says that without one, it identifies the best version itself. Declaring one gives you control over which address appears in results, instead of leaving it to Google's judgment.

## The ways to tell Google which URL is canonical

Google lists methods "in order of how strongly they can influence canonicalization":

| Method | Strength, in Google's words | Use it when |
|--------|-----------------------------|-------------|
| Redirects | "A strong signal that the target of the redirect should become canonical" | The duplicate URL should never be visited |
| `rel="canonical"` link | "A strong signal that the specified URL should become canonical" | The duplicate needs to stay reachable, such as a filtered or tracked URL |
| Sitemap inclusion | "A weak signal" | Always, alongside the others |

A canonical can also be sent as an HTTP header, which is useful for files such as PDFs that have no HTML head:

```
Link: <https://example.com/guides/hosting-checklist.pdf>; rel="canonical"
```

Google advises picking either the HTML element or the header for a page, not both.

### When to redirect instead

If a duplicate never needs to exist, redirect it. That is the strongest signal and it also sends visitors to the right place. Duplicates caused by `www`, HTTP or trailing slashes should be redirected site-wide, so only one version of every URL ever loads. [301 vs 302 Redirects](/301-vs-302-redirects) shows how.

Use a canonical tag when the duplicate URL has a purpose: a filtered product list, a page with tracking parameters, a product reachable through two category paths.

## How to write a canonical tag

```
<link rel="canonical" href="https://example.com/shoes/running">
```

Place it inside the `<head>` of the page. Four rules matter.

### 1. Use absolute URLs

Google's advice: "Use absolute paths rather than relative paths with the rel="canonical" link element." Relative paths are supported, but Google warns they "can cause problems in the long run". A relative canonical copied onto a staging site or another domain points at the wrong place.

```
<!-- Good -->
<link rel="canonical" href="https://example.com/shoes/running">

<!-- Avoid -->
<link rel="canonical" href="/shoes/running">
```

### 2. Add a self-referencing canonical

Google recommends including a canonical link "on the canonical page itself", even though it is not required. A page that names itself as canonical protects against tracking parameters and other variations people add when they link to it. Most SEO plugins and frameworks do this automatically.

### 3. One canonical per page

Two canonical tags with different URLs, perhaps one from the theme and one from a plugin, send mixed signals. Google may ignore both.

### 4. Match your other signals

Google warns against naming different canonical URLs for the same page across techniques. The canonical URL should be the one in your sitemap, the one your internal links point to, and the one your redirects lead to. If your sitemap lists `/page/` and your canonical says `/page`, you are contradicting yourself.

## Mistakes that confuse Google

| Mistake | Why it is a problem |
|---------|---------------------|
| Canonical points to a URL that redirects | Sends Google on a detour and weakens the signal |
| Canonical points to a 404 or noindexed page | The page you named cannot be indexed |
| Canonical on paginated pages pointing to page 1 | Hides the content on pages 2, 3 and onward |
| Every page's canonical set to the home page | Usually a template error. Google ignores it or drops pages |
| Using robots.txt to hide duplicates | Google says not to. Blocked URLs can still be indexed without their content |
| Using noindex to pick a canonical | Google does not recommend it, because noindex "will completely block the page from Search" |
| Canonical with a `#fragment` | Google says not to specify a fragment as canonical |
| Relative URL copied to another domain | Points at the wrong site |

The paginated case is worth a closer look. On a blog archive or product list with several pages, each page has different items. Page 2 should canonicalize to itself, not to page 1. Otherwise the posts or products that appear only on later pages lose a way to be found.

## Does Google always follow your canonical?

No. Google treats `rel="canonical"` as a strong signal, not a directive. It weighs your declaration against everything else: redirects, internal links, sitemap entries, whether the page uses HTTPS, and which version other sites link to.

If those signals disagree with your tag, Google may choose a different URL. That is usually a sign that something else on the site contradicts the canonical, most often internal links pointing at the non-canonical version.

## How to check which canonical Google chose

1. Open Google Search Console and use the **URL Inspection** tool on the page.
2. Look at **User-declared canonical** and **Google-selected canonical**.
3. If they match, everything agrees.
4. If they differ, find what is pulling Google toward the other URL.

The Pages report under Indexing also lists URLs excluded as "Alternate page with proper canonical tag", which is normal and needs no action, and "Duplicate, Google chose different canonical than user", which deserves a look. [How to Set Up Google Search Console](/google-search-console-setup) explains where these reports live.

To check what a page declares, view its source and search for `canonical`, or use curl:

```
curl -s https://example.com/shoes/running | grep -i 'rel="canonical"'
```

Check the HTTP header version too:

```
curl -sI https://example.com/guides/hosting-checklist.pdf | grep -i "^link"
```

## Common situations and what to do

### Tracking parameters

Links with UTM tags create a new URL for every campaign. A self-referencing canonical on the page points them all back to the clean address. This is why tagging campaign links is safe for SEO. [UTM Parameters Explained](/utm-parameters-guide) covers the tagging side.

### Product filters and sorting

A category page sorted by price shows the same products as the default. Canonicalize sort orders to the unsorted category. For filters that create useful, distinct pages, such as "red running shoes" with real search demand, a self-referencing canonical lets that filtered page rank on its own.

### Products in several categories

Choose one main URL for each product, and canonicalize the others to it. Better still, build product URLs that do not include the category, such as `/products/shoe-123`, so there is only ever one.

### Syndicated content

If your article is republished on another site, ask the publisher to add a canonical tag pointing to your original. If they will not, ask for a clear link back to the original article.

### HTTP and HTTPS, www and non-www

Redirect, do not canonicalize. Choose one version of the domain and send everything else to it with a permanent redirect. HSTS can then enforce HTTPS in the browser, as covered in [HTTP Security Headers Explained](/http-security-headers).

## Canonical tags in WordPress and other platforms

- **WordPress** adds a canonical tag to single posts and pages by default. SEO plugins such as Rank Math and Yoast SEO extend this to archives and let you override the canonical for an individual page. Check that your theme does not add a second one. [Rank Math vs Yoast SEO](/rank-math-vs-yoast) compares the plugins.
- **Shopify and other store platforms** add canonical tags to product and collection pages automatically.
- **Next.js and similar frameworks** let you set the canonical in each page's metadata. CodeNexon sets an absolute, self-referencing canonical on every post and category page this way, built from the same path used in the sitemap.

After any theme or plugin change, spot-check a few pages for exactly one canonical tag.

## A canonical audit you can run in an afternoon

If you have never looked at canonicals on your site, this five-step check finds most problems.

1. **List your page templates.** Most sites have only a handful: home page, post, page, category, tag, product and search results. Pick one example URL of each.
2. **View the source of each example** and find the canonical tag. Confirm there is exactly one, that it uses the full `https://` address, and that it points to the page itself unless you deliberately chose otherwise.
3. **Add a tracking parameter** to each example, such as `?utm_source=test`, reload, and check that the canonical still points to the clean URL without the parameter.
4. **Open the version without `www`, or with `http://`.** It should redirect to your preferred version in one step, not load a duplicate page.
5. **Inspect three important URLs in Search Console** and compare the user-declared and Google-selected canonicals.

Record what you find in a simple table: template, canonical correct, duplicates redirect, Google agrees. Fix templates rather than individual pages, since one template fix corrects every page built from it.

Repeat the check after any theme change, SEO plugin change or site migration. Those are the moments canonicals most often break, usually because a new plugin adds a second tag or a migration leaves the old domain in the template. [How to Change Your Domain Name Without Losing SEO](/change-domain-name-without-losing-seo) covers the migration case.

## Frequently asked questions

### What is a canonical tag?

A canonical tag is an HTML element, link rel="canonical", placed in a page's head to tell search engines which URL is the main version when the same or very similar content is available at several addresses. Search engines then generally index and show that URL.

### Does Google always respect canonical tags?

No. Google describes rel="canonical" as a strong signal, not a directive. It also considers redirects, internal links, sitemaps and other signals. If those contradict the tag, Google may choose a different URL as canonical.

### Should every page have a canonical tag?

Yes. Google recommends a self-referencing canonical on the canonical page itself, even though it is not required. It protects the page against duplicate URLs created by tracking parameters and other variations.

### Should canonical URLs be absolute or relative?

Absolute. Google advises using absolute URLs with the rel="canonical" element. Relative paths are supported but can cause problems over time, for example when a page is copied to a staging site or a different domain.

### What is the difference between a canonical tag and a 301 redirect?

A 301 redirect sends visitors and search engines to another URL, and the original address stops showing content. A canonical tag leaves the duplicate page reachable but tells search engines which URL to index. Google ranks redirects as the strongest canonicalization signal.

### Can I use noindex instead of a canonical tag?

Google does not recommend noindex for choosing a canonical within your site, because it completely blocks the page from Search. Use a canonical tag or a redirect to consolidate duplicates, and reserve noindex for pages you never want in search results.

### How do I find out which canonical Google picked?

Use the URL Inspection tool in Google Search Console. It shows the user-declared canonical and the Google-selected canonical for the page. If they differ, look for internal links, sitemap entries or redirects that point at the other URL.

## Sources

- [Google Search Central: How to specify a canonical URL](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google Search Central: What is canonicalization](https://developers.google.com/search/docs/crawling-indexing/canonicalization)
- [Google Search Central: Redirects and Google Search](https://developers.google.com/search/docs/crawling-indexing/301-redirects)
- [Search Console Help: URL Inspection tool](https://support.google.com/webmasters/answer/9012289?hl=en)
