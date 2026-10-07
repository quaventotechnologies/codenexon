UTM parameters are short tags added to the end of a link that tell your analytics tool where a visitor came from. A link tagged with `utm_source=newsletter`, `utm_medium=email` and `utm_campaign=spring_sale` shows up in Google Analytics as a visit from that email campaign instead of an unexplained "direct" visit. Google Analytics 4 treats three of them as required: source, medium and campaign.

This guide covers what each parameter means, how to name them consistently, how to build tagged links, where to find the results in GA4, and the mistakes that quietly ruin the data.

> **How this guide was researched.** The parameter list, definitions and example values are taken from Google's Analytics Help documentation, read on October 6, 2026 and linked under Sources. The naming conventions are our recommendations. Example links use example.com.

## What a UTM-tagged link looks like

Here is a normal link and the same link with tracking added.

```
https://example.com/pricing
```

```
https://example.com/pricing?utm_source=newsletter&utm_medium=email&utm_campaign=spring_sale
```

Everything after the question mark is a set of `name=value` pairs joined by `&`. The page that loads is identical. The tags are read by the analytics script on your site and stored with the visit.

UTM stands for Urchin Tracking Module, after Urchin, the analytics company Google bought in 2005 and turned into Google Analytics. The format has outlived the product and is now understood by nearly every analytics tool.

## Why you need them

Analytics tools work out where a visitor came from using the referrer, a piece of information the browser sends along. That works for a click from one website to another. It fails in many common cases:

- Links in email, opened in a mail app.
- Links in messaging apps such as WhatsApp or Slack.
- Links in PDFs, documents and presentations.
- QR codes on printed material.
- Links in mobile apps, which often send no referrer.

In each case the visit lands in "direct", lumped in with people who typed your address. If your direct traffic is surprisingly high, untagged email and messaging links are the usual reason.

UTM parameters solve this by putting the answer in the link itself. They also let you separate things a referrer cannot: two different emails, two ads on the same platform, or the link in your social bio against a link in a post.

## The UTM parameters GA4 supports

Google Analytics 4 recognizes nine parameters. Google's documentation groups them like this.

| Parameter | Status | What it identifies | Google's examples |
|-----------|--------|--------------------|-------------------|
| `utm_source` | Required | The referrer: where the traffic comes from | google, newsletter4, billboard |
| `utm_medium` | Required | The marketing medium | cpc, banner, email |
| `utm_campaign` | Required | The product, slogan or promo code | spring_sale |
| `utm_id` | Recommended | A campaign ID, used to identify a specific campaign or promotion | An ID that matches your uploaded campaign data |
| `utm_source_platform` | Recommended | The platform responsible for directing traffic | Search Ads 360, Display & Video 360 |
| `utm_term` | Optional | The paid keyword | The search term you bid on |
| `utm_content` | Optional | Differentiates creatives or links within one campaign | A different value per link |
| `utm_creative_format` | Optional | The type of creative | display, native, video, search |
| `utm_marketing_tactic` | Optional | Targeting criteria applied to a campaign | remarketing, prospecting |

Google notes that `utm_creative_format` and `utm_marketing_tactic` are not currently reported in GA4, so there is little reason to use them yet.

Most small businesses need four: the three required ones, plus `utm_content` when a campaign has more than one link.

### utm_source: who sent the visitor

The source is the specific place the link lives: a named website, platform or list.

Examples: `google`, `facebook`, `linkedin`, `newsletter`, `partner_acme`

### utm_medium: what kind of channel

The medium is the category of traffic. It is the most important one to get right, because GA4 uses it to sort visits into its default channel groups such as Email, Paid Search and Organic Social.

| Use this medium | For | GA4 files it under |
|-----------------|-----|--------------------|
| `email` | Newsletters and email campaigns | Email |
| `cpc` | Paid search ads | Paid Search |
| `paid_social` | Paid ads on social platforms | Paid Social |
| `social` | Unpaid social posts and profile links | Organic Social |
| `display` | Banner and display ads | Display |
| `affiliate` | Affiliate partner links | Affiliates |
| `referral` | Links you placed on other websites | Referral |
| `sms` | Text message campaigns | SMS |

If you invent your own medium, such as `utm_medium=newsletter_march`, GA4 cannot match it to a channel and files the visit under "Unassigned". Keep the medium to a short, standard list.

### utm_campaign: which effort

The campaign names the specific promotion, launch or theme, so you can see everything it produced across all sources.

Examples: `spring_sale`, `product_launch_2026`, `weekly_newsletter`, `black_friday`

### utm_content: which link

Use content to tell apart several links that share the same source, medium and campaign.

Examples: `header_button`, `footer_link`, `image_a`, `image_b`, `text_cta`

If one email has a button at the top and a text link at the bottom, tagging them `utm_content=top_button` and `utm_content=bottom_link` shows which one people click.

### utm_term: which keyword

Term was designed for the keyword behind a paid search ad. Google Ads fills this in for you through auto-tagging, so you rarely set it by hand. Some teams reuse it for audience names in paid social.

## Naming rules that keep your data clean

UTM values are free text, and analytics tools record exactly what you type. Google's documentation is explicit: "Parameter values are case sensitive, e.g. `utm_source=google` is different from `utm_source=Google`".

That means these four links create four separate rows in your reports, even though you meant them as one:

```
utm_source=Facebook
utm_source=facebook
utm_source=facebook.com
utm_source=fb
```

A small set of rules prevents this.

1. **Lowercase everything.** Always.
2. **No spaces.** Use underscores or hyphens, and pick one. A space becomes `%20` or `+` in the link and is easy to mistype.
3. **Use a fixed list of mediums.** The table above is a good starting point.
4. **Use the platform's plain name for the source.** `facebook`, not `fb` or `Facebook_Page`.
5. **Put variable detail in the campaign or content,** not in the medium.
6. **Add a date or version to campaign names** when you repeat them: `newsletter_2026_10` or `spring_sale_2026`.
7. **Write the rules down** in a shared document, and keep a log of every tagged link you create.

A spreadsheet with five columns is enough for the log: the destination address, source, medium, campaign and content. A sixth column can join them into the final link with a formula, which removes typing errors.

## How to build a UTM link

### By hand

1. Start with the destination address.
2. Add a question mark.
3. Add each parameter as `name=value`, separated by `&`.

```
https://example.com/guide?utm_source=linkedin&utm_medium=social&utm_campaign=guide_launch&utm_content=post_1
```

Two details trip people up.

**If the address already contains a question mark**, add your tags with `&` instead of a second question mark:

```
https://example.com/search?q=hosting&utm_source=newsletter&utm_medium=email&utm_campaign=october
```

**If the address has a fragment** (a `#` and an anchor), the UTM tags must come before it. Anything after the `#` is not sent to the server and may be ignored:

```
https://example.com/guide?utm_source=newsletter&utm_medium=email&utm_campaign=october#pricing
```

### With Google's Campaign URL Builder

Google provides a free form called the Campaign URL Builder. You paste the destination address, fill in the fields and copy the result. It handles the question marks and encoding for you. It does not enforce your naming rules, so the lowercase discipline is still yours.

### With your email or ad platform

Many tools add UTM tags automatically.

- **Email tools.** Most have a setting to tag every link in a campaign for Google Analytics. Check what values it uses, because the default source and medium may not match your conventions. If you are choosing a tool, see [MailerLite vs Mailchimp](/mailerlite-vs-mailchimp).
- **Google Ads.** Leave auto-tagging on. It adds its own identifier, the `gclid`, which carries more detail than manual UTM tags, and GA4 reads it directly.
- **Other ad platforms.** Most offer URL parameters or templates at the campaign or ad level, where you can set UTM tags once and have them applied to every ad.

## Worked examples

**A monthly newsletter with two links to the same article:**

```
https://example.com/blog/hosting-guide?utm_source=newsletter&utm_medium=email&utm_campaign=newsletter_2026_10&utm_content=headline
https://example.com/blog/hosting-guide?utm_source=newsletter&utm_medium=email&utm_campaign=newsletter_2026_10&utm_content=read_more_button
```

**An unpaid LinkedIn post:**

```
https://example.com/blog/hosting-guide?utm_source=linkedin&utm_medium=social&utm_campaign=hosting_guide_launch
```

**A paid Facebook ad testing two images:**

```
https://example.com/offer?utm_source=facebook&utm_medium=paid_social&utm_campaign=spring_sale_2026&utm_content=image_a
https://example.com/offer?utm_source=facebook&utm_medium=paid_social&utm_campaign=spring_sale_2026&utm_content=image_b
```

**A QR code on a printed flyer:**

```
https://example.com/menu?utm_source=flyer&utm_medium=print&utm_campaign=grand_opening
```

The last one uses `print`, which is not one of GA4's standard mediums, so it will appear as Unassigned in channel reports. You can still see it by source and campaign, and for offline material that is a reasonable trade.

Long tagged links look untidy on a flyer or in a social post. Use a link shortener or a short redirect on your own domain, such as `example.com/menu-flyer`, that forwards to the full tagged address. Our guide to [301 and 302 redirects](/301-vs-302-redirects) shows how to set one up.

## Where to see UTM data in GA4

1. Open Google Analytics and go to **Reports**.
2. Choose **Acquisition**, then **Traffic acquisition**.
3. Above the table, change the primary dimension from "Session primary channel group" to **Session source / medium** to see pairs such as `newsletter / email`, or to **Session campaign** to see results by campaign name.
4. To see content values, click the plus icon beside the dimension and add **Session manual ad content** as a secondary dimension.

For a quick check that tagging works, open your own tagged link and watch **Reports, Realtime**. The visit should appear within a minute with the source and medium you set. Standard reports can take 24 to 48 hours to fill in.

GA4 has two versions of each dimension. "Session" dimensions describe what brought a particular visit. "First user" dimensions describe what brought that person the first time. Use Session source and medium to judge a campaign. Use First user source and medium to see where new customers originally found you.

## Mistakes that corrupt your data

### Tagging links inside your own website

Never put UTM parameters on internal links, such as a banner on your home page that points to your pricing page. When a visitor clicks it, analytics starts treating the visit as coming from that banner and discards the real source. A visitor who arrived from Google and clicked your banner is now recorded as coming from `homepage_banner`. You lose the information you most wanted.

To measure clicks within your site, use event tracking instead.

### Inconsistent names

`Email`, `email` and `e-mail` are three different mediums to GA4. One typo splits a campaign across several rows and breaks the channel grouping. The log spreadsheet and the lowercase rule exist to stop this.

### Putting personal information in a tag

UTM values are visible in the address bar, saved in browser history and stored in analytics. Never include an email address, name, phone number or customer ID. Google's terms prohibit sending personally identifiable information to Analytics, and it creates a privacy problem under laws such as GDPR and CCPA.

### Tagging Google Ads by hand when auto-tagging is on

If both are active with different values, the two can disagree. Leave auto-tagging on and let it do the work unless you have a specific reason to override it.

### Forgetting the redirect

If the tagged link passes through a redirect that drops the query string, the tags never reach your site. Test the full path: click the final link and check that the parameters are still in the address bar when the page loads.

### Forgetting consent

Analytics only records a visit if it runs. If your site asks visitors for consent before loading analytics, visits from people who decline will not appear in any report, tagged or not. Expect your campaign numbers in GA4 to be lower than the click counts reported by your email tool or ad platform.

## Do UTM parameters affect SEO?

They can create duplicate addresses. `example.com/page` and `example.com/page?utm_source=newsletter` show the same content at two different URLs. Search engines handle this well when the page has a canonical tag pointing at the clean address, which most modern sites and SEO plugins add automatically.

Check yours by viewing the page source of a tagged link and looking for a line like this, without any UTM tags in it:

```
<link rel="canonical" href="https://example.com/page">
```

If it is there, you are covered. Since internal links should never carry UTM tags anyway, search engines will rarely meet the tagged versions.

## Frequently asked questions

### What are UTM parameters?

UTM parameters are tags added to the end of a link, such as utm_source, utm_medium and utm_campaign. They tell analytics tools where a visitor came from and which campaign sent them. They do not change the page that loads.

### Which UTM parameters are required?

Google Analytics 4 lists utm_source, utm_medium and utm_campaign as required. It recommends also setting utm_id and utm_source_platform. The parameters utm_term and utm_content are optional. Most small businesses use the three required ones plus utm_content.

### Are UTM parameters case sensitive?

Yes. Google states that parameter values are case sensitive, so utm_source=google and utm_source=Google are recorded as two different sources. Use lowercase for every value and keep a written list of the names you use.

### What is the difference between utm_source and utm_medium?

The source is the specific place a link appears, such as facebook, google or newsletter. The medium is the type of channel, such as social, cpc or email. GA4 uses the medium to sort traffic into its default channel groups.

### Should I use UTM parameters on internal links?

No. Tagging links within your own site overwrites the visitor's original source in analytics, so a visit from Google can be recorded as coming from your own banner. Use UTM parameters only on links that bring people to your site from elsewhere.

### Where do I find UTM data in Google Analytics 4?

Go to Reports, Acquisition, Traffic acquisition. Change the primary dimension to Session source / medium or Session campaign. Add Session manual ad content as a secondary dimension to see utm_content values. Use the Realtime report to test a link immediately.

### Do UTM parameters hurt SEO?

Not when the page has a canonical tag pointing to its clean address, which tells search engines to ignore the tagged version. Problems arise only when tagged links are used internally or when pages lack canonical tags.

## Sources

- [Google Analytics Help: URL builders, collect campaign data with custom URLs](https://support.google.com/analytics/answer/10917952?hl=en)
- [Google Campaign URL Builder](https://ga-dev-tools.google/ga4/campaign-url-builder/)
- [Google Search Central: Redirects and Google Search](https://developers.google.com/search/docs/crawling-indexing/301-redirects)
