A WordPress staging site is a private copy of your live site where you test updates, new plugins and design changes before your visitors see them. The quickest way to create one is your host's one-click staging tool, which Bluehost lists on its Starter plan and Kinsta and WP Engine include on their entry managed plans. If your host has no staging tool, a plugin or a manual copy on a subdomain works too. Whichever you use, block search engines from the copy and be careful when pushing changes back, because a careless push can overwrite live orders and comments.

This guide covers the three ways to set one up, the safe way to move changes to the live site, and the mistakes that cause real damage.

> **How this guide was researched.** Host features come from each company's plan page, read on October 6 and 7, 2026 and linked under Sources. The WP-CLI and configuration examples are standard. Take a full backup before creating or pushing a staging site.

## Why bother with staging?

Most WordPress breakages come from changes, not attacks. A plugin update conflicts with your theme. A new page builder version changes your layout. A PHP upgrade exposes an old plugin. On a live site, each of those means visitors see a broken page while you work out what happened.

On staging, you make the same change, find the problem, and fix it or skip the update, all without anyone noticing. It turns a risky update into a routine one.

| Change | Risk on the live site | With staging |
|--------|----------------------|--------------|
| Updating several plugins at once | Visible errors, hard to tell which plugin caused them | Test, find the culprit, update the rest |
| Switching or redesigning a theme | Half-finished design shown to visitors | Build it privately, switch when ready |
| Upgrading PHP | White screen if an old plugin is incompatible | Find incompatible plugins first |
| Installing a new plugin | Conflicts, slowdowns | Measure the effect first |
| Editing theme code | One typo takes the site down | Mistakes stay private |

## Option 1: Your host's staging tool

This is the easiest route, and it handles the copying, the database and the address changes for you.

| Host and plan | Staging listed | Notes |
|---------------|----------------|-------|
| Bluehost Starter | WordPress staging site | Listed on the entry shared plan |
| Kinsta Single 35k | Free one-click staging environments | Included on entry managed plans |
| WP Engine Essential | 1-click staging and dev environments | Included on the entry plan |
| Hostinger Premium | Not stated on the plan page when checked | Confirm with Hostinger |

The general process is the same everywhere:

1. Open your hosting dashboard and find **Staging** for the site.
2. Click **Create staging**. The host copies your files and database to a separate address, often a subdomain such as `staging.example.com` or a host-provided URL.
3. Log in to the staging site's WordPress dashboard with your normal username and password.
4. Make and test your changes.
5. When you are happy, use the host's **Push to live** option, choosing what to push.

If staging is a feature you care about, it is worth checking before you choose a host. [Best WordPress Hosting for Beginners](/best-wordpress-hosting-for-beginners) and [Hostinger vs Bluehost](/hostinger-vs-bluehost) compare what the main plans include.

## Option 2: A staging plugin

If your host has no staging tool, several plugins can create a copy inside your existing hosting account. WP Staging is a widely used example: its free version creates a copy of your site in a subfolder, with its own database tables, and you test there.

Things to know about plugin-based staging:

- **It uses your hosting resources.** The copy takes up disk space, often doubling your site's size, and the cloning process can hit time limits on small shared plans.
- **Pushing changes back is often a paid feature.** Free versions typically create the copy. Moving changes back to live may need the paid version, or you repeat the changes by hand.
- **It shares the same server.** A test that overloads the server affects the live site too.

For an occasional plugin test on a small site, this is fine. For regular development, host staging or a separate environment is better.

## Option 3: A manual staging site on a subdomain

You can build staging yourself with the same steps as moving to a new host. It takes longer the first time, and gives you full control.

1. **Create a subdomain** such as `staging.example.com` in your hosting control panel.
2. **Create a new database** and database user for it.
3. **Copy the files** from the live site into the subdomain's folder.
4. **Export the live database and import it** into the new one.
5. **Edit `wp-config.php`** in the staging copy to use the new database name, user and password.
6. **Replace the site address** in the staging database. With WP-CLI, from the staging folder:

```
wp search-replace 'https://example.com' 'https://staging.example.com' --all-tables --dry-run
```

Read the report, then run it again without `--dry-run`. WP-CLI handles serialized data properly, which a plain text find and replace in the SQL file would corrupt.

7. **Block search engines and visitors,** as described below.

The full copy procedure, including the commands for files and database, is in [How to Migrate a WordPress Site to a New Host Without Downtime](/how-to-migrate-wordpress-site). Staging is the same job pointed at a subdomain.

## Lock the staging site down

A staging site is an exact copy of your live site at a different address. Left open, it creates three problems: search engines index duplicate content, customers find it and place orders or sign up there, and it gives attackers a second, often less maintained, copy to probe.

Do all of these:

### 1. Password-protect it

Most host staging tools offer this as a switch. On Apache, you can protect the folder with HTTP authentication. On Nginx, add `auth_basic` to the staging server block. A password stops everyone, including search engines, without depending on them obeying instructions.

### 2. Tell search engines not to index it

In the staging site's WordPress dashboard, go to **Settings, Reading** and tick **Discourage search engines from indexing this site**. Better still, add a `noindex` header at the server. Password protection plus `noindex` is the safe combination.

Do not rely on `robots.txt` alone. Google's documentation notes that a page blocked by robots.txt can still be indexed and shown without a snippet if other pages link to it. [XML Sitemaps and Robots.txt Explained](/xml-sitemap-robots-txt-guide) covers the difference.

### 3. Mark it as staging in WordPress

Add this line to the staging copy's `wp-config.php`:

```
define( 'WP_ENVIRONMENT_TYPE', 'staging' );
```

Well-behaved plugins check this setting and change their behavior, for example by not sending emails or not connecting to live payment accounts. It also makes it obvious which site you are on.

### 4. Stop it sending real email and taking real payments

This is the one that causes real harm. A staging copy contains your real customer list and your real plugin settings.

- **Email:** a staging site can send order confirmations, password resets or newsletters to real customers. Install a plugin that captures or blocks outgoing mail on staging, or disable your SMTP plugin there.
- **Payments:** switch your payment plugin to test mode, or deactivate it, so nothing on staging can charge a card.
- **Scheduled tasks:** disable WP-Cron on staging so it does not run your real scheduled jobs:

```
define( 'DISABLE_WP_CRON', true );
```

- **Webhooks and integrations:** disconnect anything that sends data to outside services, such as a CRM, an email marketing tool or an accounting app, or you will create duplicate records there.

## Pushing changes to live without losing data

This is the part of staging that needs the most care.

### The problem

Your live site keeps changing while you work on staging. New orders arrive, people comment, users register, and you may publish posts. If you push the whole staging database to live, all of that is replaced by the older copy. Orders vanish.

### The safe approach

| What changed on staging | How to push it |
|-------------------------|----------------|
| Plugin or theme updates | Push files only, or simply repeat the update on live |
| Theme code or CSS | Push files only |
| New plugin settings | Repeat the settings on live by hand |
| New pages or design built in a page builder | Push selected database tables, or rebuild on live |
| Content and orders | Never push from staging. Live is always the source |

Host staging tools usually let you choose files only, database only, or both, and some let you pick specific tables. When in doubt, push files only and repeat any database changes manually on the live site.

For online stores and membership sites, the safest rule is simple: **the database flows from live to staging, never back**. Refresh staging from live before each round of testing, and apply database changes to live by hand.

### Before every push

1. Take a full backup of the live site. [How to Back Up a WordPress Site](/how-to-back-up-wordpress-site) shows how.
2. Put the live site in maintenance mode for a store, so no orders arrive mid-push.
3. Push the smallest set of changes that does the job.
4. Clear all caches: plugin, server and CDN.
5. Check the key pages and journeys straight away.

## A routine that works for most sites

Here is a simple monthly process that keeps a site current without surprises.

1. **Refresh staging from live,** so you test against current data.
2. **Run all pending updates on staging:** WordPress core, plugins and theme.
3. **Click through the important pages:** home page, a post, a form, the cart and checkout in test mode.
4. **Check for errors** in the browser console and in Tools, Site Health.
5. **Run a speed test** on staging and compare it with live. A big drop points at a specific update. [Core Web Vitals Explained](/core-web-vitals-explained) covers what to measure.
6. **Repeat the same updates on live,** in the same order.
7. **Check live** and clear caches.

Applying updates on live, rather than pushing the staging database, avoids the data-loss problem entirely for routine maintenance.

## Staging vs local development

Some developers work on a copy of the site on their own computer instead, using a free tool such as Local or WordPress Studio.

| | Staging on your host | Local copy on your computer |
|---|----------------------|-----------------------------|
| Server matches live | Yes, usually the same server type | No, a simulated environment |
| Shareable with a client | Yes, with a password | No, unless you use a sharing feature |
| Works offline | No | Yes |
| Uses hosting resources | Yes | No |
| Best for | Final checks before going live | Building features and experimenting |

Many developers use both: build locally, test on staging, then push to live.

## Common staging mistakes

| Mistake | What happens | Prevention |
|---------|--------------|------------|
| Pushing the full database to a store | Orders and customers since the copy are lost | Push files only, apply database changes by hand |
| Staging left open to search engines | Duplicate content in search results | Password protection and noindex |
| Staging sending email | Customers receive test orders or duplicate newsletters | Block mail on staging |
| Payment plugin left live | Real cards charged during tests | Test mode or deactivate |
| Testing on a stale copy | Updates pass on staging and fail on live | Refresh from live before testing |
| Forgetting the staging site exists | An old, unpatched copy becomes a security risk | Delete or update it regularly |

The last row matters. An old staging copy with outdated plugins is as vulnerable as an unpatched live site. Keep it updated, or delete it when you are done. Our [WordPress security checklist](/wordpress-security-checklist) covers why neglected copies are a common way in.

## Frequently asked questions

### What is a WordPress staging site?

A staging site is a private copy of your WordPress site at a separate address, where you test updates, plugins, themes and code changes before applying them to the live site. Visitors never see it, so mistakes made there have no effect on your real site.

### How do I create a staging site in WordPress?

The easiest way is your host's one-click staging tool, if it has one. Without that, use a staging plugin such as WP Staging, or create a copy manually on a subdomain by copying the files and database and replacing the site address with WP-CLI.

### Which hosts include WordPress staging?

On plans checked in October 2026, Bluehost listed a WordPress staging site on its Starter plan, Kinsta included free one-click staging on its entry managed plans, and WP Engine included one-click staging on its Essential plan. Hostinger's Premium plan page did not mention staging.

### Will a staging site affect my SEO?

Only if search engines can index it, because it duplicates your live content. Password-protect the staging site and set it to noindex. Do not rely on robots.txt alone, since a blocked page can still be indexed if other sites link to it.

### Can I push changes from staging to live?

Yes, most host staging tools have a push option. Push files for theme and plugin changes. Be careful pushing the database, because it replaces content, orders and users added to the live site since the staging copy was made.

### Does a staging site use extra hosting resources?

Yes. A staging copy roughly doubles the disk space your site uses and shares the server's CPU and memory if it runs in the same account. Delete staging sites you no longer use, and keep any you keep updated.

### How do I stop my staging site sending emails?

Install a plugin on the staging copy that blocks or captures outgoing email, or deactivate your SMTP plugin there. Also switch payment plugins to test mode, disable WP-Cron, and disconnect integrations with outside services so test actions do not reach real customers.

## Sources

Plan features were read on October 6 and 7, 2026.

- [Bluehost shared hosting plans](https://www.bluehost.com/hosting/shared)
- [Kinsta pricing](https://kinsta.com/pricing/)
- [WP Engine plans](https://wpengine.com/plans/)
- [WP-CLI: wp search-replace](https://developer.wordpress.org/cli/commands/search-replace/)
- [WordPress developer reference: wp_get_environment_type](https://developer.wordpress.org/reference/functions/wp_get_environment_type/)
- [Google Search Central: Introduction to robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
