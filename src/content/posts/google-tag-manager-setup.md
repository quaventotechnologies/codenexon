Google Tag Manager (GTM) is a free tool that lets you add and change tracking codes on your website from a dashboard instead of editing your site's code each time. You install one container snippet on every page, and then add tags such as Google Analytics 4, ad conversion pixels and custom event tracking inside Tag Manager. Every change can be tested in Preview mode and published as a numbered version you can roll back. It is worth using if you run several marketing tags or want to track clicks and form submissions without a developer.

This guide covers installation, the three building blocks, setting up GA4 through Tag Manager, tracking a form submission, and keeping the container tidy and privacy-compliant.

> **How this guide was written.** Steps and menu names follow Google Tag Manager's interface and help documentation as of October 2026, linked under Sources. Google renames items from time to time, so a label may differ slightly on your screen. Container IDs such as `GTM-ABC1234` and measurement IDs such as `G-AB12CD34EF` are placeholders.

## Do you need Tag Manager?

| Situation | Recommendation |
|-----------|----------------|
| One website, GA4 only, no custom events | Not needed. Add the Google tag directly or with a plugin |
| GA4 plus an ad platform pixel or two | Useful. One place to manage them |
| You want to track button clicks, form submissions or downloads | Useful. No code changes needed |
| A marketing team changes tracking often | Strongly recommended |
| Several people need to edit tracking, with an audit trail | Strongly recommended, for versions and permissions |

Tag Manager adds a layer. For a simple site with only analytics, adding the tag directly is simpler. [How to Set Up Google Analytics 4](/ga4-setup-guide) covers that route.

## The three building blocks

Everything in Tag Manager is made of three things.

| Building block | What it is | Example |
|----------------|------------|---------|
| Tag | A piece of code that sends data somewhere | The GA4 tag, an ad conversion pixel |
| Trigger | The rule that decides when a tag fires | All pages, a click on a button, a form submission |
| Variable | A value tags and triggers can use | The page URL, the text of a clicked link, a measurement ID |

A typical setup reads like a sentence: **fire this tag** when **this trigger** happens, using **these variables**. For example: send a `generate_lead` event to GA4 when the contact form is submitted, including the page path.

## Step 1: Create an account and container

1. Go to tagmanager.google.com and sign in with the business Google account that should own it.
2. Create an **Account**, usually named after your business.
3. Create a **Container**, named after your website, and choose **Web** as the target platform.
4. Accept the terms. Tag Manager shows your container ID, which starts with `GTM-`, and two code snippets.

## Step 2: Install the container snippet

The container has two parts, and both go on every page.

The first goes as high as possible inside the `<head>`:

```
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-ABC1234');</script>
<!-- End Google Tag Manager -->
```

The second goes immediately after the opening `<body>` tag, for browsers with JavaScript turned off:

```
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-ABC1234"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

Copy the snippets from your own container, which contain your real ID.

**On WordPress,** Google's Site Kit plugin can install Tag Manager for you, and many themes and SEO plugins have a header and body code field. Use one method only.

**Remove any existing direct GA4 tag** before you configure GA4 inside Tag Manager. Having both counts every page view twice.

## Step 3: Add the Google tag for GA4

1. In Tag Manager, go to **Tags** and click **New**.
2. Choose **Tag Configuration** and select **Google Tag**.
3. Enter your GA4 Measurement ID, which starts with `G-`.
4. Under **Triggering**, choose **Initialization - All Pages**, or **All Pages** if that is the option shown.
5. Name the tag clearly, for example `GA4 - Google tag`, and save.

This tag loads GA4 on every page and records page views. With Enhanced measurement switched on in GA4, it also records scrolls, outbound clicks, file downloads and site search, without any extra tags.

## Step 4: Test with Preview mode

Never publish without previewing.

1. Click **Preview** in the top right.
2. Enter your website address and connect. Your site opens in a new tab with a debug badge.
3. The Tag Assistant window lists every event as it happens: the container loading, the page view, clicks and so on.
4. Click an event to see which tags fired and which did not, and why.

Then open GA4's **Realtime** or **DebugView** report to confirm the data arrived. When everything fires correctly, move on.

## Step 5: Publish a version

1. Click **Submit**.
2. Choose **Publish and Create Version**.
3. Give the version a name and description that say what changed, for example "Add GA4 Google tag".
4. Click **Publish**.

Every published version is kept. If a change breaks something, open **Versions**, choose the previous version and publish it again. That is one of Tag Manager's biggest advantages over editing site code.

## Tracking a form submission

Contact form submissions are the most useful thing most small businesses can track. There are three common approaches, from most to least reliable.

### Option A: A thank-you page

If your form redirects to a page such as `/thank-you` after a successful submission, this is the simplest and most reliable method.

1. Create a trigger: **Trigger Configuration, Page View**, firing on **Some Page Views** where **Page Path equals /thank-you**.
2. Create a tag: **Google Analytics: GA4 Event**, with your measurement ID and the event name `generate_lead`.
3. Attach the trigger, preview, submit a test form and check the event appears.
4. In GA4, mark `generate_lead` as a key event under **Admin, Events**.

### Option B: The form pushes an event to the data layer

Many form plugins can push a message to the data layer when a form succeeds. A developer can add one line to the success handler:

```
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({ event: "form_success", form_name: "contact" });
```

In Tag Manager, create a **Custom Event** trigger with the event name `form_success`, and a GA4 event tag that uses it. Create a **Data Layer Variable** for `form_name` to send which form was used.

This is the most accurate method for forms that do not redirect, because it fires only when the submission actually succeeds.

### Option C: The built-in Form Submission trigger

Tag Manager has a Form Submission trigger, but many modern forms submit with JavaScript and never fire a standard submit event, or fire it even when validation fails. Test it carefully in Preview mode before relying on it.

## Tracking button and link clicks

To track clicks on a specific button, such as a "Call us" phone link:

1. Go to **Variables, Configure** and enable the built-in **Click** variables, including Click URL and Click Text.
2. Create a trigger: **Click - Just Links**, firing on **Some Link Clicks** where **Click URL starts with tel:**.
3. Create a GA4 event tag named `phone_click` with that trigger.
4. Preview, click the phone link, and confirm the event.

The same pattern works for email links (`mailto:`), WhatsApp links and specific buttons identified by their text or CSS class.

## Consent and privacy

Tag Manager makes it easy to add tags, which also makes it easy to collect data you should not. Three rules:

1. **Respect consent.** If your site shows a consent banner, configure tags so analytics and advertising tags only fire after the visitor accepts. Tag Manager supports Google's Consent Mode, and most consent management tools have a Tag Manager template.
2. **Never send personal information** such as names, email addresses or phone numbers to Google Analytics. Google's terms prohibit it. Check variables that read form fields or page URLs that might contain an email address.
3. **Keep your privacy policy accurate.** Every tag you add is a service that receives data from your visitors. List them.

CodeNexon, for example, loads analytics only after a visitor accepts on its consent banner, and its privacy policy names the service involved.

## Keeping the container tidy

Containers grow messy fast, and a messy container breaks quietly.

| Habit | Why |
|-------|-----|
| Name things consistently, such as `GA4 - Event - Form submit` | You can find and understand tags months later |
| Use folders for each platform or purpose | Groups related tags, triggers and variables |
| Write a description on every published version | Shows what changed and when, so rollbacks are easy |
| Delete tags you no longer use | Old pixels slow the page and may send data you did not intend |
| Limit who can publish | Use the Publish permission only for people who should push changes live |
| Review the container every quarter | Remove dead tags, check consent settings still apply |

### Performance

Every tag adds JavaScript, and too many third-party scripts slow your pages and hurt responsiveness. [Core Web Vitals Explained](/core-web-vitals-explained) covers how scripts affect Interaction to Next Paint. Keep only the tags you actually use, and use triggers that fire only on the pages that need them.

## Common problems

| Problem | Cause | Fix |
|---------|-------|-----|
| Page views doubled in GA4 | GA4 installed directly and through Tag Manager | Remove one installation |
| Tag fires in Preview but no data in GA4 | Wrong measurement ID, or consent declined | Check the ID and accept consent in the test browser |
| Changes not live on the site | Container changes not published | Submit and publish a new version |
| Form trigger fires on failed submissions | Built-in form trigger used with a JavaScript form | Use a thank-you page or a data layer event |
| Preview will not connect | Ad blocker or strict browser privacy settings | Disable the blocker for the test, or use another browser |
| Events tagged on internal links overwrite traffic source | UTM parameters used on internal links | Use events, not UTM tags, for internal clicks |

That last one catches many marketers. UTM tags belong on links from other sites to yours. [UTM Parameters Explained](/utm-parameters-guide) explains why.

## A starter container for a small business

If you are setting Tag Manager up from scratch, these tags cover what most small business sites need. Build them in this order and test each one in Preview before adding the next.

| Tag | Trigger | Purpose |
|-----|---------|---------|
| Google tag (GA4) | Initialization, all pages | Page views and enhanced measurement |
| GA4 event: `generate_lead` | Thank-you page view or form success event | Counts enquiries |
| GA4 event: `phone_click` | Link clicks where Click URL starts with `tel:` | Counts calls started from the site |
| GA4 event: `email_click` | Link clicks where Click URL starts with `mailto:` | Counts email links clicked |
| Ad platform conversion tag, if you advertise | Same trigger as `generate_lead` | Reports conversions to the ad platform |

Mark `generate_lead`, and the phone and email events if they matter to you, as key events in GA4. That gives you one report showing how many enquiries the site produced each week, which is the number most small businesses actually care about.

## Frequently asked questions

### What is Google Tag Manager?

Google Tag Manager is a free tool for adding and managing tracking codes, called tags, on a website through a dashboard. You install one container snippet on your site, then add, test and publish tags such as Google Analytics 4 and ad pixels without editing your site's code each time.

### Is Google Tag Manager free?

Yes. Google Tag Manager is free for standard use. Google sells Tag Manager 360 as part of its paid enterprise marketing platform, aimed at large organizations that need extra workspaces, approvals and support.

### Do I need Google Tag Manager for GA4?

No. You can install GA4 directly with the Google tag or a plugin. Tag Manager is useful if you run several marketing tags, want to track clicks and form submissions without code changes, or need version history and permissions for a team.

### What is the difference between a tag and a trigger?

A tag is code that sends data somewhere, such as a GA4 event or an ad conversion pixel. A trigger is the rule that decides when the tag fires, such as on all pages, on a click on a phone link, or when a form succeeds.

### How do I test Tag Manager changes before they go live?

Use Preview mode. It opens your site connected to Tag Assistant, which lists every event and shows which tags fired. Confirm the data arrives in GA4's Realtime or DebugView report, then publish a named version.

### Why is GA4 counting every page view twice?

GA4 is probably installed twice, once directly on the site and once through Tag Manager, or by two different plugins. Remove one installation so the Google tag loads only once on each page.

### Can I undo a change in Google Tag Manager?

Yes. Every published container change creates a version. Open Versions, select an earlier version and publish it to restore the previous setup immediately. Writing a clear description on each version makes this much easier.

## Sources

- [Tag Manager Help: Set up and install Tag Manager](https://support.google.com/tagmanager/answer/14842164?hl=en)
- [Tag Manager Help: Preview and debug containers](https://support.google.com/tagmanager/answer/6107056?hl=en)
- [Tag Manager Help: Consent mode support](https://support.google.com/tagmanager/answer/10718549?hl=en)
- [Google Analytics Help: Data retention](https://support.google.com/analytics/answer/7667196?hl=en)
- [Google Tag Manager](https://tagmanager.google.com/)
