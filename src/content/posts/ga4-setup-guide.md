To set up Google Analytics 4, create a GA4 property and a web data stream, add the Google tag to every page of your site, and then change four settings most people miss: raise data retention to 14 months, filter out your own visits, mark your important actions as key events, and link Search Console. The tag takes ten minutes. The settings take another twenty, and they decide whether the data is useful a year from now.

This guide covers each step, what GA4 tracks automatically, how consent affects your numbers, and the reports worth reading.

> **How this guide was researched.** Settings and limits come from Google Analytics Help, linked under Sources. Menu names match GA4 in October 2026, and Google does rename and move items, so a label may differ slightly on your screen. CodeNexon runs GA4 through Firebase with a consent banner, and that setup is used as a working example.

## Why GA4, and what happened to the old version

Universal Analytics, the previous version of Google Analytics, stopped processing data on July 1, 2023. Every Google Analytics property today is a GA4 property.

GA4 works differently from the old version. Everything it records is an event: a page view, a scroll, a click, a form submission. Reports are built from those events. That makes it more flexible, and it also means a fresh setup collects less useful detail until you configure it.

## Step 1: Create the account and property

1. Go to analytics.google.com and sign in with the Google account that should own the data. Use a business account, not a personal one that might leave with an employee.
2. Create an **Account**, usually named after your business.
3. Create a **Property**, usually named after your website.
4. Set the **reporting time zone** to where your business operates and the **currency** you sell in. The time zone decides where a "day" starts and ends in every report.
5. Answer the business questions. They only set which reports appear by default.

## Step 2: Create a web data stream

1. When asked to choose a platform, select **Web**.
2. Enter your website address and a stream name.
3. Leave **Enhanced measurement** switched on.
4. Click **Create stream**.

You now have a **Measurement ID** that starts with `G-`, such as `G-AB12CD34EF`. That ID connects your site to this property.

One property and one web stream is right for a single website. Do not create separate properties for the `www` and non-`www` versions of the same site.

## Step 3: Add the Google tag to your site

Choose one method. Installing the tag twice counts every page view twice.

### Option A: Paste the tag directly

Google gives you a snippet to place immediately after the opening `<head>` tag on every page:

```
<script async src="https://www.googletagmanager.com/gtag/js?id=G-AB12CD34EF"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-AB12CD34EF');
</script>
```

Replace the ID with your own. On most site builders and themes there is a "header code" setting where this goes.

### Option B: A WordPress plugin

Google's own Site Kit plugin connects Analytics and Search Console from the WordPress dashboard and places the tag for you. Many SEO plugins also have a field for the Measurement ID. Use one plugin for this, not several.

### Option C: Google Tag Manager

Tag Manager is a container that holds all your tracking tags. You install its code once, then add and change tags from its dashboard without editing the site. It is worth it if you run several marketing tags or plan to track many custom events. For a simple site, it is an extra layer you may not need.

### Option D: Through Firebase

If your site already uses Firebase, as CodeNexon does, the web app configuration includes a `measurementId`, and the Firebase Analytics SDK sends data to the linked GA4 property. CodeNexon loads that SDK only after a visitor accepts analytics on its consent banner.

## Step 4: Check that it works

1. Open your site in a private browser window and click through a few pages.
2. In GA4, open **Reports, Realtime**. You should appear as an active user within a minute or so.
3. For more detail, enable **DebugView** under Admin and use Google's Tag Assistant to see each event as it fires.

If nothing appears, check that the Measurement ID is correct, that the tag is on the page (view the page source and search for your `G-` ID), and that an ad blocker or your consent banner is not blocking it.

Standard reports take 24 to 48 hours to fill in. Realtime is the place to confirm the setup on day one.

## Step 5: The four settings to change straight away

### 1. Increase data retention

Under **Admin, Data collection and modification, Data retention**, GA4 decides how long to keep detailed event-level data. For standard properties, Google lists options of 2 months or 14 months for user-level data, and 2, 14 or 26 months for other event data.

Set it to the longest option available. Google's help notes that this setting affects explorations and funnel reports, not the standard aggregated reports. If you leave a short setting, you cannot run a detailed exploration on data older than two months, which makes year-on-year analysis impossible. Changing it later does not bring back data already deleted.

### 2. Filter out your own visits

Your own visits, and your team's, distort the numbers on a small site. A business owner checking their own site 20 times a day can be a large share of total traffic.

1. Under **Admin, Data streams**, open your stream, then **Configure tag settings, Define internal traffic**.
2. Add a rule with your office IP address.
3. Under **Admin, Data filters**, find the Internal Traffic filter. It starts in **Testing** mode. Check the results, then set it to **Active**.

If you work from changing IP addresses, a browser extension that opts you out of Google Analytics works on your own devices.

### 3. Mark key events

Key events are the actions that matter to your business. Google renamed them from "conversions" in 2024. Typical examples:

| Business type | Key events |
|---------------|------------|
| Service business | Contact form submitted, phone link clicked |
| Newsletter or blog | Newsletter signup |
| Online store | Purchase, which ecommerce platforms usually send automatically |
| Lead generation | Quote request, demo booked |

To mark one, go to **Admin, Events**, find the event once it has fired at least once, and switch on **Mark as key event**. If the action is not tracked yet, create it with the **Create event** feature or in Tag Manager. A common approach is to send visitors to a thank-you page after a form and create an event when that page loads.

### 4. Link Search Console

Under **Admin, Product links, Search Console links**, connect your Search Console property. It adds reports showing the Google searches that led to your pages, alongside what those visitors did next. You need Search Console set up first. [How to Set Up Google Search Console](/google-search-console-setup) covers that.

## What GA4 tracks without extra setup

With Enhanced measurement on, GA4 records these events automatically:

| Event | Fires when |
|-------|-----------|
| `page_view` | A page loads |
| `scroll` | A visitor scrolls 90% of the way down a page |
| `click` | A visitor clicks a link to another website |
| `view_search_results` | A visitor uses your site search, detected from the URL |
| `video_start`, `video_progress`, `video_complete` | Embedded YouTube videos are played |
| `file_download` | A visitor downloads a common file type such as a PDF |
| `form_start`, `form_submit` | A visitor interacts with or submits a form |

You can switch individual items off under the stream's Enhanced measurement settings. Form tracking in particular can be unreliable on some sites, so check that its numbers make sense before relying on them.

## Consent, privacy and why numbers look low

If your site shows a consent banner, and many should, GA4 only records visitors who accept. Under privacy laws such as the GDPR in the European Union and United Kingdom, analytics cookies generally need consent before they are set.

That has a predictable effect: your GA4 numbers will be lower than your real traffic. The gap depends on your audience and how your banner is designed. Compare GA4 with Search Console clicks and your server logs to get a sense of the difference, and judge trends rather than absolute numbers.

Google's **Consent Mode** lets the tag adjust its behavior based on the visitor's choice, and in some setups lets Google model the missing data. A consent management tool can set this up for you.

Whatever you do, describe your analytics honestly in your privacy policy, and never send personal information such as email addresses or names to GA4. Google's terms prohibit it.

## The reports worth reading

GA4 has many reports. These answer most small business questions.

| Question | Report |
|----------|--------|
| How many people visited, and from where? | Reports, Acquisition, Traffic acquisition |
| Which pages do people read most? | Reports, Engagement, Pages and screens |
| Which campaign brought people in? | Traffic acquisition, with the dimension set to Session campaign |
| How many people completed a key action? | Reports, Engagement, Key events |
| Which countries and devices do visitors use? | Reports, User, Demographics and Tech |
| What is happening right now? | Reports, Realtime |

In Traffic acquisition, the default channel groups such as Organic Search, Direct, Referral and Email depend on how your links are tagged. Untagged links in emails and messaging apps tend to land in Direct. [UTM Parameters Explained](/utm-parameters-guide) shows how to tag campaign links so they are credited correctly.

### Understanding engagement

GA4 counts an **engaged session** when a visit lasts longer than 10 seconds, includes a key event, or includes two or more page views. **Engagement rate** is the share of sessions that were engaged. It replaces the old bounce rate as the main measure of whether visitors stayed. In GA4, bounce rate is simply the opposite of engagement rate.

Treat engagement rate as a comparison between your own pages, not a score against other sites. A page that answers a question in one screen can have low engagement and still be doing its job.

## Explorations for deeper questions

The **Explore** section builds custom analyses: funnels showing where people drop out of a checkout, paths showing what visitors do after landing on a page, and segments comparing groups of users. These rely on detailed event data, which is why the data retention setting above matters.

A useful first exploration for most sites is a funnel from landing page to key event. It shows exactly where interested visitors give up.

## Common setup mistakes

| Mistake | Result | Fix |
|---------|--------|-----|
| Tag installed twice | Page views doubled, engagement rate distorted | Remove one installation |
| Retention left at 2 months | Explorations cannot look back further | Set the longest retention option |
| Own visits not filtered | Traffic inflated on small sites | Define internal traffic and activate the filter |
| No key events | No way to measure results | Mark the actions that matter |
| UTM tags on internal links | Original traffic sources overwritten | Use UTM tags only on links from outside |
| Personal data in events or URLs | Breaks Google's terms and privacy rules | Never send emails, names or phone numbers |

## Frequently asked questions

### How do I set up Google Analytics 4?

Create a GA4 property at analytics.google.com, add a web data stream for your site to get a Measurement ID starting with G-, and install the Google tag on every page directly, through a plugin or through Tag Manager. Then confirm visits appear in the Realtime report.

### Is Google Analytics 4 free?

Yes. The standard version of Google Analytics 4 is free. Google sells Analytics 360, a paid version for large organizations with higher limits, longer data retention options and service agreements. Most small and medium businesses use the free version.

### How long does GA4 keep data?

For standard properties, Google lists data retention options of 2 or 14 months for user-level data and 2, 14 or 26 months for other event data. The setting affects explorations and funnel reports, not the standard aggregated reports. Set the longest option straight away.

### Why does GA4 show fewer visitors than expected?

Common reasons include visitors declining analytics on a consent banner, ad blockers preventing the tag from loading, and filters excluding traffic. GA4 counts only browsers where the tag runs, so it usually reports less than your actual traffic.

### What is a key event in GA4?

A key event is an event you have marked as important to your business, such as a form submission, a newsletter signup or a purchase. Google renamed conversions to key events in 2024. Mark them under Admin, Events.

### Do I need Google Tag Manager for GA4?

No. You can paste the Google tag directly or use a plugin. Tag Manager is useful if you run several marketing tags or want to add custom event tracking without editing your site's code each time.

### What does GA4 track automatically?

With Enhanced measurement on, GA4 tracks page views, scrolls to 90% of a page, clicks on links to other sites, site searches, YouTube video engagement, file downloads and form interactions. You can turn individual items off in the data stream settings.

## Sources

- [Google Analytics Help: Data retention](https://support.google.com/analytics/answer/7667196?hl=en)
- [Google Analytics Help: Set up Analytics for a website](https://support.google.com/analytics/answer/9304153?hl=en)
- [Google Analytics Help: Enhanced measurement events](https://support.google.com/analytics/answer/9216061?hl=en)
- [Google Analytics Help: Filter out internal traffic](https://support.google.com/analytics/answer/10104470?hl=en)
- [Google Analytics Help: URL builders and campaign data](https://support.google.com/analytics/answer/10917952?hl=en)
