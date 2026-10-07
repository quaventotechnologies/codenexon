Every CodeNexon guide is built on one of two kinds of evidence: published information that we check and date, or hands-on tests that we run ourselves. This page explains both, so you can judge how much weight to give any page on the site.

> **Where we are today.** Every guide currently on the site is a researched guide, based on vendor pricing pages and documentation. We have not yet published hands-on product reviews. When we do, they will follow the test protocol below, and each review will state exactly what was tested.

## Two kinds of guide

| | Researched guide | Tested review |
|---|------------------|---------------|
| Based on | Vendor pricing pages, documentation and published standards | Our own accounts, measurements and logs |
| How to recognize it | A note near the top beginning "How this guide was researched" | A note stating the plan, region, tools and dates of the tests |
| What it can tell you | What a product costs, what it includes and how options compare on paper | How a product performed when we used it |
| What it cannot tell you | How fast or reliable a product is in practice | How it will perform on a different plan or in a different region |

We never describe a product as tested unless we ran the test.

## How researched guides are made

1. **Start from the primary source.** Prices, limits and requirements come from the vendor's own page or the relevant standards body, not from other review sites.
2. **Record the date.** Each guide states the day its figures were checked.
3. **Note the currency and region.** Vendors show different prices in different countries. Where we could not see US dollar pricing directly, the guide says so and marks the figure as approximate.
4. **Do the arithmetic in the open.** Multi-year totals, percentage increases and per-sale fees are calculated from the published rates, with the inputs shown.
5. **Link everything.** The Sources section at the end of each guide lists the pages used.
6. **Say what is missing.** If a detail could not be confirmed, the guide says so.

## The test protocol for hosting reviews

When we review a hosting plan hands-on, these are the tests it goes through.

| Test | How it is run | Tools | Frequency |
|------|---------------|-------|-----------|
| Speed | The same standard test site is deployed on each plan. Load time and server response are measured from several regions, and the median is reported | WebPageTest, GTmetrix, Lighthouse | Three or more runs on different days |
| Uptime | Each test site is monitored continuously and every incident is logged with a timestamp | An uptime monitor such as UptimeRobot | At least 30 days before a verdict |
| Load handling | Modest, controlled load is applied to see how response time changes, within the provider's acceptable-use terms | k6, Loader.io | Once per plan |
| Support | At least three requests on different topics: basic, technical and billing. Response time and outcome are recorded | A support log | Per review |
| Ease of use | Key tasks are timed: sign-up, installing WordPress, creating and restoring a backup, pointing a domain, setting up SSL | Stopwatch and screenshots | Per review |
| Pricing | First-term price, renewal price, required term and add-ons are recorded with a dated screenshot | Screenshot archive | Monthly for key posts |
| Features and limits | Claims about backups, staging, CDN, email, storage and refunds are checked in the dashboard and documentation | Dashboard and vendor docs | Per review |

## The test protocol for software reviews

1. Define three to five real tasks a reader would do, such as sending a campaign, importing a list or creating an invoice.
2. Complete them on a real trial or paid plan, recording time taken and any friction or errors.
3. Check plan limits, integrations, export options and data portability.
4. Test support where there is a free way to do so.
5. Record pricing for each tier with the date.
6. Record what the product does badly. Every review includes real downsides.

## How products are scored

Tested products in the same category are scored with the same rubric. Each area is scored and weighted, for a total out of 100.

| Area | Hosting weight | Software weight |
|------|----------------|-----------------|
| Performance or core capability | 25 | 25 |
| Reliability | 20 | 10 |
| Support | 15 | 10 |
| Features and limits | 15 | 20 |
| Pricing and value, including renewal | 15 | 20 |
| Ease of use | 10 | 15 |
| **Total** | **100** | **100** |

Scores are given only to products we have tested. Researched guides do not carry scores.

## Keeping results current

- Prices on our most-read guides are rechecked monthly.
- Reviews and comparisons are reviewed in full every quarter.
- Speed and support tests are repeated every 6 to 12 months.
- When a vendor changes its pricing or features materially, the affected guides are updated and the change is listed in the guide's update history.

## What does not influence a result

No company can pay for a score, a ranking or a mention. Our funding and our rules for commercial relationships are set out on the [Disclosure](/disclosure) page.

## Tell us if we got something wrong

If a figure is out of date or a step did not work for you, write to [info@codenexon.com](mailto:info@codenexon.com) with the page address. Corrections are handled as described in the [Editorial Policy](/editorial-policy).
