Internal links are links from one page on your site to another, and they do two jobs: they help visitors find the next useful page, and they show search engines which pages matter and how your content fits together. A good internal linking setup has a hub page for each topic linking to every related post, each post linking back to its hub and to two to four related posts, descriptive anchor text instead of "click here", and no pages left without any links pointing at them. It costs nothing and is one of the few ranking factors entirely under your control.

This guide covers how to plan internal links, how to write anchor text, how many links to add, and how to find and fix the gaps on an existing site.

> **How this guide was written.** The principles here follow Google Search Central's guidance on links and crawling, linked under Sources. The structure described is the one CodeNexon itself uses: category hubs, posts linking up to their category and across to related guides, and descriptive anchors. Example URLs use example.com.

## Why internal links matter

### For visitors

Someone who has just read your guide on slow WordPress sites is a good candidate for your guide on caching, or on choosing better hosting. A link at the right moment answers their next question and keeps them on your site. Without it, they go back to the search results and find the answer somewhere else.

### For search engines

Search engines discover pages mostly by following links. A page with no internal links pointing at it, called an orphan page, may only be found through the sitemap, and is treated as less important. Internal links also carry signals:

- **Discovery.** New pages linked from established ones are found and crawled sooner.
- **Importance.** Pages that many other pages link to are understood as central to the site.
- **Context.** The words in a link tell search engines what the target page is about.
- **Relationships.** Links between related pages show that your site covers a topic in depth, not just one page.

## The hub and spoke model

The structure that works for most content sites is a set of topic clusters.

| Layer | What it is | Example |
|-------|------------|---------|
| Hub page | A broad page covering a topic and linking to every page in it | Best Web Hosting for Small Business |
| Spoke pages | Specific guides on one aspect of the topic | Renewal prices, Hostinger vs Bluehost, what TTFB is |
| Category page | A listing of every post in a section | `/hosting-cloud` |

The links follow a simple pattern:

1. The hub links down to every spoke.
2. Every spoke links up to the hub.
3. Spokes link across to closely related spokes.
4. The category page lists them all.

On CodeNexon, the guide [Best Web Hosting for Small Business](/best-web-hosting-for-small-business) is the hub for hosting. It links to the renewal price breakdown, the Hostinger and Bluehost comparison, the TTFB explainer and the others, and each of those links back to it.

This pattern does two things at once. Visitors can move from a broad question to a specific answer and back. Search engines see a clearly connected group of pages about one subject.

## Plan links before you write

Retrofitting links into dozens of finished posts is slow. Planning them is quick.

1. **List your topics.** Group your posts and planned posts by subject. Each group needs one hub.
2. **Decide the hub for each group.** Usually the broadest page, often a "best" guide, a complete guide or a category page.
3. **For each new post, note three things in the brief:** the hub it links to, two to four related posts it links to, and two to four existing posts that should link to it.
4. **Add the links in both directions when you publish.** The third item is the one most people skip.

That last step matters most. A new post linking out to older ones helps visitors, but it does nothing to help the new post get found. The new post needs links pointing **to** it from pages that already have traffic and links.

## Anchor text: what the link says

Anchor text is the clickable text of a link. It tells both readers and search engines what to expect on the other side.

| Anchor text | Quality | Why |
|-------------|---------|-----|
| click here | Poor | Says nothing about the destination |
| this article | Poor | Same problem |
| read more | Poor | Fine as a button under a summary, poor in running text |
| our hosting guide | Fair | Better, but vague |
| how to choose a web hosting provider | Good | Describes the page clearly |
| renewal prices at Hostinger, Bluehost and SiteGround | Good | Specific and natural |

Guidelines:

- **Describe the destination.** A reader should know what they will get before clicking.
- **Keep it natural.** Write the sentence first, then link the words that describe the target.
- **Vary it.** Use different natural phrases for the same page across your site, rather than the identical keyword every time.
- **Keep it short.** A few words, not a whole sentence.
- **Avoid linking the same words to different pages** on one page, which confuses readers.

A practical test: read only the linked words on a page, as a screen reader user might. They should make sense out of context.

## How many internal links should a page have?

There is no exact number, and anyone giving you one is guessing. Use judgment based on the page.

| Page type | Sensible range | Notes |
|-----------|----------------|-------|
| Short news or update post | 2 to 4 | Link to the main guide it relates to |
| Standard guide of about 2,000 words | 5 to 10 in the body | One every few sections where it genuinely helps |
| Hub or pillar page | One to every page in the cluster | Its job is to connect them |
| Category page | Every post in the category | Automatically generated |

Navigation menus, breadcrumbs, footers and "related posts" boxes add more links on top of these. That is fine. What matters is that the links in the body text are relevant and placed where a reader would want them.

A page with 200 links in its body is hard to use. A page with none is a dead end. Between those, add a link wherever it answers the reader's obvious next question.

## Where to place links in a post

- **Early, for the main related guide.** If a post depends on another, link it in the opening paragraphs.
- **At the point of need.** When you mention a concept another guide explains, link it there. "Measure your Time to First Byte" is the right place to link the TTFB guide.
- **In "next steps" or a short related section** near the end.
- **From the hub, near the top,** to the most important spokes.

Links in the main body text carry more weight with readers, and generally with search engines, than links tucked into footers or sidebars.

## Breadcrumbs and category pages

Breadcrumbs, such as Home > Hosting & Cloud > What Is TTFB, give every post a link up to its category and home page automatically. They help visitors orient themselves and help search engines understand your structure. Adding BreadcrumbList structured data lets Google show the trail in results. [Schema Markup Explained](/schema-markup-guide) covers the markup.

Category pages give every post at least one internal link the moment it is published, which prevents orphans. Make sure your categories are real pages with a short description, not just thin lists.

## Finding and fixing internal linking problems

### Orphan pages

An orphan is a page that no other page on the site links to. To find them:

1. Export the list of URLs in your sitemap.
2. Crawl the site with a crawler tool, which records only pages reachable by links.
3. Compare the two lists. URLs in the sitemap but not found by the crawl are orphans.

Fix each one by linking to it from its hub and from two or three related posts, or remove it if it has no value.

### Pages that deserve more links

In Google Search Console, the **Links** report shows your most-linked pages internally. Compare it with your most important pages. If a key guide or service page has only two internal links while an old news post has fifty, rebalance. [How to Set Up Google Search Console](/google-search-console-setup) shows where the report is.

Also look at pages ranking in positions 8 to 20 in the Performance report. Adding a few relevant internal links from strong pages is one of the simplest ways to move them up.

### Broken internal links

Links to deleted or renamed pages send visitors to a 404 and waste crawling. A crawler tool lists them. Fix each one by updating the link to the correct page, not just by adding a redirect, so visitors skip the extra hop. [How to Fix 404 Errors and Broken Links](/fix-404-errors-broken-links) covers the process.

### Links through redirects

After a site move or URL change, many internal links may still point at old addresses that redirect. Each one adds a round trip. Update them to the final URL directly.

## Internal links in WordPress

- **Linking while writing:** in the block editor, select text, press Ctrl+K or Cmd+K, and type part of a post title. WordPress searches your own posts and pages.
- **Related posts:** many themes and plugins add a related posts section automatically. Check that it chooses genuinely related posts, not just the most recent ones.
- **Suggestions:** Yoast SEO Premium suggests relevant pages to link to as you write, and detects orphaned content. Rank Math's Business plan includes automated linking tools. [Rank Math vs Yoast SEO](/rank-math-vs-yoast) compares them.
- **Changing a URL:** WordPress redirects old slugs for posts, but your internal links still point at the old address. Update them.

## What to avoid

- **Linking for the sake of it.** A link that does not help the reader is noise.
- **The same exact anchor everywhere.** Repeating one keyword-heavy phrase across hundreds of links looks unnatural.
- **Hidden links.** Links styled to be invisible are against search engine guidelines.
- **Mixing affiliate links and navigation.** Keep internal links for guiding readers. Commercial links, when you have them, should be clearly marked.
- **Nofollow on internal links.** There is rarely a reason to add `rel="nofollow"` to links within your own site. It only stops search engines following your own structure.

## A 30-minute internal linking routine for each new post

1. Link the new post to its hub page.
2. Link it to two to four related posts at the point where each is relevant.
3. Find two to four existing posts that mention the topic, using your site search or a `site:example.com topic` Google search.
4. Add a link from each of those to the new post, with descriptive anchor text.
5. Add the new post to the hub page's list.
6. Check that every link works.

Done consistently, this keeps a growing site connected without ever needing a large clean-up.

## Frequently asked questions

### What is internal linking?

Internal linking is linking from one page on your website to another page on the same site. It helps visitors find related content and helps search engines discover pages, understand how they relate, and judge which pages are most important.

### How many internal links should a blog post have?

There is no fixed number. A standard guide of about 2,000 words often has five to ten links in the body, placed where they answer the reader's next question. Hub pages link to every page in their topic, and navigation adds more links on top.

### What is good anchor text for internal links?

Good anchor text describes the destination in a few natural words, such as how to choose a web hosting provider. Avoid generic text like click here or this article, and vary the wording rather than repeating one exact keyword for every link.

### What is an orphan page?

An orphan page has no internal links pointing to it. Visitors cannot reach it by navigating the site, and search engines may find it only through the sitemap and treat it as unimportant. Fix it by linking to it from its hub and related posts.

### Do internal links help SEO?

Yes. Internal links help search engines discover and crawl pages, pass signals between pages, and understand which topics your site covers in depth. Adding relevant links from strong pages is one of the simplest ways to help pages that are close to the first page of results.

### Should internal links be nofollow?

Rarely. Adding nofollow to links within your own site stops search engines following your site's structure and has no real benefit. Use normal links internally and reserve nofollow or sponsored attributes for certain external links.

### How do I find pages with no internal links?

Compare the URLs in your sitemap with the URLs a crawler finds by following links from your home page. Pages in the sitemap that the crawler never reached are orphans. Search Console's Links report also shows which pages have the fewest internal links.

## Sources

- [Google Search Central: Link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
- [Google Search Central: SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google Search Central: Spam policies](https://developers.google.com/search/docs/essentials/spam-policies)
- [Search Console Help: Links report](https://support.google.com/webmasters/answer/9049606?hl=en)
