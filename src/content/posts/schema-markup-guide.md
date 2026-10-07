Schema markup is structured data you add to a page, usually as a block of JSON-LD code, that tells search engines exactly what the page contains: an article and its author, a product and its price, a local business and its opening hours. It does not raise rankings directly, but it makes a page eligible for rich results such as review stars, product prices and breadcrumbs in Google, and it helps search engines and AI systems understand who wrote what. Use JSON-LD, mark up only what is visible on the page, and test every type with Google's Rich Results Test.

This guide explains how schema works, which types are worth adding, what changed in 2023, and how to add it to WordPress or any other site.

> **How this guide was researched.** Rules on formats and rich result eligibility come from Google Search Central documentation, and the 2023 FAQ and HowTo changes from Google's announcement of August 8, 2023, both linked under Sources. The examples use placeholder names and addresses. Google changes which rich results it shows, so check the current Search Gallery before adding a new type.

## What schema markup does

A search engine reading your page sees text. It has to guess that "$49" is a price, that "Jane Smith" is the author and that "4.6" is an average rating. Schema markup removes the guessing by labeling each piece of information using an agreed vocabulary from Schema.org.

That has three effects.

1. **Rich result eligibility.** Some types can change how your page appears in Google, with stars, prices, breadcrumbs or other details.
2. **Better understanding.** Clear labels help search engines connect a page to an author, an organization and a topic.
3. **Clean data for other systems.** Social platforms, assistants and AI tools read the same signals when deciding what a page is about and who is responsible for it.

What it does not do is make a page rank higher on its own. Google describes structured data as helping it understand content and enabling rich results, not as a ranking boost.

## JSON-LD, Microdata or RDFa?

Schema can be written in three formats.

| Format | How it is added | Recommendation |
|--------|-----------------|----------------|
| JSON-LD | A separate script block in the page | Google's recommended format. Easiest to add and maintain |
| Microdata | Attributes added to existing HTML tags | Works, but mixes data into your layout code |
| RDFa | Attributes added to existing HTML tags | Works, rarely used for search today |

Use JSON-LD. It sits in one place, does not touch your page design, and plugins and frameworks generate it easily.

## A first example: an article

Here is a typical JSON-LD block for a blog post. It goes anywhere in the page, often in the head.

```
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "How to Choose a Web Hosting Provider",
  "description": "A 9-point checklist for choosing web hosting.",
  "image": "https://example.com/images/hosting-checklist.png",
  "datePublished": "2026-10-06",
  "dateModified": "2026-10-07",
  "author": {
    "@type": "Person",
    "name": "Jane Smith",
    "url": "https://example.com/author/jane-smith"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Example Media",
    "url": "https://example.com"
  }
}
</script>
```

Every value matches something a visitor can see on the page: the headline, the date, the author's name. That rule is the most important one in this guide.

## The golden rule: mark up only what is visible

Google's structured data guidelines require the markup to describe content that is actually on the page and visible to users. Adding review stars that do not appear on the page, a price that differs from the one shown, or FAQs that are not displayed is treated as spam.

The penalty is a manual action in Search Console that removes rich results from your site, and fixing it means removing the misleading markup and asking for a review. It is not worth the risk.

A useful test: if a visitor could not confirm a value by reading the page, it should not be in the markup.

## Which schema types are worth adding

| Type | Use it on | Possible result in Google |
|------|-----------|---------------------------|
| Organization | Home page | Helps Google identify your logo and official details |
| WebSite | Home page | Identifies your site name |
| Article or BlogPosting | Articles and posts | Better understanding of headline, dates, author and image |
| BreadcrumbList | Every page with a breadcrumb trail | Breadcrumb path shown in place of the raw URL |
| Person | Author pages | Connects articles to their author |
| Product with Offer | Product pages | Price, availability and rating details |
| Review and AggregateRating | Genuine reviews on the page | Star ratings, where eligible |
| LocalBusiness | Business home or contact page | Supports address and opening hours details |
| Event | Event pages | Event date and location details |
| Recipe | Recipe pages | Image, rating and cooking time |
| VideoObject | Pages with a main video | Video details and thumbnails |

For a typical small business website, the useful set is Organization and WebSite on the home page, BreadcrumbList everywhere, Article or BlogPosting on posts, and LocalBusiness if you serve customers at an address. Add Product markup if you sell online.

## What changed for FAQ and HowTo in 2023

These two were once the most popular types for content sites, because they made a result much larger in search. That changed.

On August 8, 2023, Google announced that FAQ rich results would only be shown for well-known, authoritative government and health websites, and would no longer be shown regularly for other sites. HowTo rich results were first limited to desktop, and Google then stopped showing them entirely in September 2023.

What that means for you:

- **Keep FAQ sections for readers.** A clear question-and-answer block still helps visitors, and well-structured answers are easy for search engines and AI assistants to quote. That value does not depend on rich results.
- **FAQPage markup is optional.** It is not harmful and still describes your content, but most sites should not expect FAQ rich results from it. Google said there was no need to rush to remove existing markup.
- **Drop HowTo markup from your plans.** Google no longer shows the rich result.

This is a good example of why schema strategies should not chase a single display feature. Display features come and go. Clear, accurate structured data keeps its value.

## Breadcrumbs: small effort, visible result

Breadcrumb markup is one of the most reliably useful types. It describes the path to a page, and Google can show it in search results instead of the full URL.

```
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://example.com" },
    { "@type": "ListItem", "position": 2, "name": "Hosting", "item": "https://example.com/hosting" },
    { "@type": "ListItem", "position": 3, "name": "How to Choose a Web Host", "item": "https://example.com/hosting/choose-a-host" }
  ]
}
</script>
```

The trail in the markup should match the breadcrumb visitors see and, ideally, the structure of your URLs. CodeNexon uses this pattern on every post: Home, then the category, then the post, matching addresses such as `/hosting-cloud/what-is-ttfb`.

## Local business markup

If customers visit you or you serve a local area, LocalBusiness markup on your home or contact page states your official details.

```
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Riverside Accounting",
  "url": "https://example.com",
  "telephone": "+1-312-555-0147",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "100 Example Street",
    "addressLocality": "Chicago",
    "addressRegion": "IL",
    "postalCode": "60601",
    "addressCountry": "US"
  },
  "openingHours": "Mo-Fr 09:00-17:00"
}
</script>
```

Use a more specific type when one fits, such as `Dentist`, `Restaurant` or `LegalService`. Keep the name, address and phone number exactly as they appear on your website and on your Google Business Profile, since mismatches create confusion about which details are correct.

## Product markup for online stores

Product pages benefit most from structured data, because price and availability are exactly what shoppers scan for.

```
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Oak Desk Organizer",
  "image": "https://example.com/images/desk-organizer.webp",
  "description": "Solid oak organizer with three compartments.",
  "sku": "DO-114",
  "brand": { "@type": "Brand", "name": "Example Woodworks" },
  "offers": {
    "@type": "Offer",
    "price": "49.00",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "url": "https://example.com/products/desk-organizer"
  }
}
</script>
```

The price must match the price on the page, and it must stay current. If your markup says $49 and the page says $59, Google may stop showing rich results for your products. Generate product markup automatically from your store's data so the two can never drift apart.

Only add `aggregateRating` if the page shows genuine reviews from customers. Ratings you write yourself about your own products are not eligible.

## How to add schema in WordPress

You rarely need to write JSON-LD by hand on WordPress.

- **SEO plugins** such as Rank Math and Yoast SEO generate Organization, WebSite, Article, BreadcrumbList and Person markup automatically. Rank Math's free version includes a schema generator with 18 predefined types. [Rank Math vs Yoast SEO](/rank-math-vs-yoast) compares the two.
- **Store plugins** such as WooCommerce output Product markup for product pages.
- **Specialist plugins** exist for recipes, events and local businesses.

The common problem is duplication. A theme, an SEO plugin and a store plugin can each add their own markup, producing two Article blocks with conflicting dates. After installing anything that adds schema, run the Rich Results Test and check that each type appears once.

## How to add schema on other sites

On a custom or framework-built site, generate the JSON-LD from the same data that renders the page, so the two always agree. In Next.js, for example, you can build the object in the page component and output it in a script tag:

```
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
/>
```

The `replace` call escapes any `<` characters in your content, so a title containing a tag cannot break out of the script block. CodeNexon generates its BlogPosting, BreadcrumbList, FAQPage, CollectionPage and ProfilePage markup this way, from the same post data that builds each page.

## How to test your markup

1. **Rich Results Test.** Paste a URL or code at search.google.com/test/rich-results. It shows which rich result types the page is eligible for, and lists errors and warnings.
2. **Schema Markup Validator.** At validator.schema.org, it checks that the markup is valid Schema.org, including types Google does not use for rich results.
3. **Search Console enhancements.** After Google recrawls your pages, the reports under Enhancements show valid items, warnings and errors across your whole site. [How to Set Up Google Search Console](/google-search-console-setup) covers where to find them.

Errors stop a page being eligible. Warnings usually mean a recommended property is missing and the page can still qualify. Fix errors first.

Valid markup does not guarantee a rich result. Google decides whether to show one based on the query, the page and its own quality judgments.

## A schema checklist for a small business site

Work through this list once, then check it whenever you change themes or plugins.

| Page | Schema to have | Check |
|------|----------------|-------|
| Home page | Organization and WebSite | Name, logo and URL match what visitors see |
| Every page with a breadcrumb | BreadcrumbList | Trail matches the visible breadcrumb and the URL path |
| Blog posts | Article or BlogPosting | Headline, image, published and updated dates, author link |
| Author pages | Person | Name, role and a link from every post the person wrote |
| Contact or location page | LocalBusiness, if you serve customers at an address | Address and phone identical to your Google Business Profile |
| Product pages | Product with Offer | Price and stock status match the page exactly |
| Pages with genuine customer reviews | AggregateRating | Count and average match the reviews shown |

Three habits keep it accurate over time:

1. **Generate markup from your data.** When the price, date or author in your content management system changes, the markup should change with it. Hand-written blocks drift.
2. **Update `dateModified` only for real changes.** Search engines learn to ignore dates that move every time the site is rebuilt.
3. **Retest after every plugin or theme change.** A new plugin that adds its own markup is the most common cause of duplicate or conflicting schema.

If you are unsure where to start, add Organization, BreadcrumbList and Article markup first. Those three cover most small sites and rarely cause problems.

## Frequently asked questions

### What is schema markup?

Schema markup is structured data added to a web page, usually in JSON-LD format, that labels information such as the article headline, author, price or business address using the Schema.org vocabulary. It helps search engines understand the page and can make it eligible for rich results.

### Does schema markup improve rankings?

Not directly. Google uses structured data to understand content and to decide eligibility for rich results such as breadcrumbs, product prices and review stars. Those can make a result more noticeable, which may increase clicks, but the markup itself is not a ranking boost.

### Which schema format should I use?

Use JSON-LD, which Google recommends. It is a separate script block that does not mix into your page layout, so it is easier to add, update and generate automatically. Microdata and RDFa also work but are harder to maintain.

### Do FAQ rich results still work?

Only for some sites. On August 8, 2023, Google announced that FAQ rich results would be shown only for well-known, authoritative government and health websites. Other sites can still use FAQ sections and FAQPage markup, but should not expect the rich result.

### Is HowTo schema still supported?

No longer as a rich result. Google limited HowTo rich results to desktop in August 2023 and stopped showing them entirely in September 2023. There is no search display benefit to adding HowTo markup now.

### Can schema markup get my site penalized?

Yes, if it is misleading. Marking up content that is not visible on the page, such as fake reviews, wrong prices or hidden FAQs, breaks Google's structured data guidelines and can lead to a manual action that removes rich results from your site.

### How do I check my schema markup?

Use Google's Rich Results Test to see which rich results a page qualifies for and any errors, and the Schema Markup Validator to check general Schema.org validity. After Google recrawls your site, the Enhancements reports in Search Console show issues across all pages.

## Sources

- [Google Search Central: Introduction to structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [Google Search Central: General structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Google Search Central: Changes to HowTo and FAQ rich results](https://developers.google.com/search/blog/2023/08/howto-faq-changes)
- [Google Search Gallery](https://developers.google.com/search/docs/appearance/structured-data/search-gallery)
- [Schema.org](https://schema.org/)
- [Rich Results Test](https://search.google.com/test/rich-results)
