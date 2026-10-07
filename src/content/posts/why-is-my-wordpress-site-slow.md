A slow WordPress site is usually caused by one of four things: no page caching, images that are far larger than they need to be, too many or badly written plugins, or an old PHP version on underpowered hosting. Measure the site first, then work through the twelve fixes below in order. The first four solve the problem for most sites and cost nothing.

> **How this guide was researched.** The performance targets are Google's published Core Web Vitals thresholds, and the PHP and database versions are WordPress.org's stated recommendations. Both are linked under Sources. The plugins named are widely used free tools. We have not published our own benchmark results in this post, so test each change on your own site as described.

## Step zero: measure before you change anything

If you skip measuring, you cannot tell which fix worked. It takes five minutes.

1. Open [PageSpeed Insights](https://pagespeed.web.dev/) and test your home page and one typical post or product page.
2. Write down the three Core Web Vitals and the Time to First Byte for mobile.
3. Run the test again after each fix.

These are the targets, measured at the 75th percentile of page loads:

| Metric | What it measures | Good |
|--------|------------------|------|
| Largest Contentful Paint (LCP) | When the main content appears | Within 2.5 seconds |
| Interaction to Next Paint (INP) | How quickly the page reacts to taps and clicks | 200 milliseconds or less |
| Cumulative Layout Shift (CLS) | How much the layout jumps while loading | 0.1 or less |
| Time to First Byte (TTFB) | How long the server takes to start responding | 0.8 seconds or less |

TTFB is not a Core Web Vital, but it is the first thing to look at. It tells you which half of the problem you have.

## Quick diagnosis: which problem do you have?

| Symptom | Most likely cause | Start with |
|---------|-------------------|------------|
| TTFB above 0.8 seconds on every page | No page cache, or slow hosting | Fix 1, then Fix 4 and Fix 12 |
| TTFB is fine, LCP is slow | Large images or render-blocking files | Fix 2, Fix 6, Fix 7 |
| Site is fast for visitors, slow in wp-admin | Plugins or database | Fix 3, Fix 5, Fix 9 |
| Slow only for far-away visitors | Distance from server | Fix 8 |
| Page jumps around while loading | Images without dimensions, late-loading ads or fonts | Fix 2, Fix 7 |
| Slow to respond to taps | Too much JavaScript | Fix 3, Fix 6, Fix 10 |
| Fast most of the time, slow at random | Overloaded shared server, or WP-Cron | Fix 11, Fix 12 |

## Fix 1: Turn on page caching

Every time someone opens an uncached WordPress page, the server starts PHP, loads WordPress and every active plugin, runs dozens of database queries and assembles the HTML. A page cache saves the finished HTML and serves that copy to the next visitor, skipping almost all of that work.

For most sites this is the largest single improvement available.

**How to do it:**

- Check your host first. Many managed and shared hosts have server-level caching you switch on in the control panel. Use it if it exists, because it is faster than a plugin.
- Otherwise install one caching plugin. WP Super Cache is the simplest. W3 Total Cache has more options. LiteSpeed Cache is the right choice if your host runs LiteSpeed servers.
- Never run two caching plugins at once.

**How to check it worked:** open the site in a private browser window, view the page source and scroll to the bottom. Most cache plugins add an HTML comment saying the page was served from cache. Then test TTFB again.

## Fix 2: Resize and compress your images

Images are usually the heaviest part of a page. The common mistake is uploading a photo straight from a phone or camera. A 4,000 pixel wide, 5 MB photo displayed in a 800 pixel column wastes more than 90% of its bytes.

**How to do it:**

- Resize before upload. Content images rarely need to be wider than 1,600 pixels.
- Use a modern format. WebP and AVIF files are much smaller than JPEG or PNG at the same visual quality. WordPress has supported WebP uploads since version 5.8 and AVIF since 6.5.
- Install an optimization plugin such as ShortPixel, Imagify or EWWW Image Optimizer to compress existing uploads in bulk and convert them.
- Leave lazy loading on. WordPress adds `loading="lazy"` to images automatically. Make sure your theme does not lazy load the main image at the top of the page, since that delays LCP.
- Always set width and height. WordPress does this for images inserted through the editor. Missing dimensions cause layout shift.

**Target:** keep most images under 200 KB and the largest hero image under 400 KB.

## Fix 3: Audit your plugins

The number of plugins matters less than what each one does. Thirty small, well-built plugins can be faster than five heavy ones. The offenders are plugins that load scripts on every page, run slow database queries or call outside services while the page is being built.

**How to do it:**

1. Install the free Query Monitor plugin.
2. While logged in, load a slow page and open the Query Monitor panel in the admin bar.
3. Look at "Queries by Component" to see which plugin runs the most or slowest queries.
4. Look at "HTTP API Calls" for plugins contacting outside servers during page load.
5. Deactivate the worst offender, test again, and look for a lighter replacement.

Also delete plugins you do not use. Deactivated plugins do not slow the front end, but they still need security updates.

## Fix 4: Update PHP

WordPress.org recommends PHP version 8.3 or greater, with MySQL 8.0 or greater, or MariaDB 10.11 or greater. Each major PHP version has run WordPress faster than the one before, and old versions no longer get security fixes.

**How to do it:**

- Check your current version under Tools, Site Health, Info, Server.
- Switch versions in your hosting control panel. Look for "PHP Configuration", "PHP Manager" or "MultiPHP".
- Take a backup first, and test on a staging copy if you run older plugins or a custom theme. [How to Back Up a WordPress Site](/how-to-back-up-wordpress-site) covers the backup.

If your host does not offer a current PHP version, that is a strong signal about the host.

## Fix 5: Add an object cache

Page caching cannot help pages that are different for each person: the admin area, carts, checkouts and account pages. An object cache stores the results of repeated database queries in memory using Redis or Memcached, so WordPress does not ask the database the same question hundreds of times.

**How to do it:** check whether your host offers Redis or Memcached, enable it there, then install the matching plugin, such as Redis Object Cache. Site Health will stop showing the "You should use a persistent object cache" notice once it is working.

This matters most for WooCommerce stores, membership sites and busy multi-author sites. A small blog served almost entirely from page cache will notice little difference.

## Fix 6: Cut render-blocking CSS and JavaScript

Before a browser can show anything, it has to download and process the stylesheets and scripts in the page head. Each one delays the first paint.

**How to do it:**

- Remove what you do not use. Sliders, icon fonts, animation libraries and social widgets are common extras.
- Defer JavaScript so it loads without blocking. Most caching plugins include a "defer" or "delay JavaScript" option. Autoptimize is a free plugin dedicated to this.
- Test after every change. Deferring scripts is the fix most likely to break something, such as a menu or a form. Exclude the affected script and try again.

## Fix 7: Sort out fonts and embeds

Third-party content loads from other companies' servers, which you do not control.

- **Fonts.** Use two font families at most, and only the weights you actually use. Host the font files on your own domain in WOFF2 format and add `font-display: swap` so text appears straight away.
- **Video.** A single embedded YouTube player loads over a megabyte of scripts. Use a "lite" embed that shows a thumbnail and loads the player only on click.
- **Ads, chat widgets and trackers.** Each one adds requests and JavaScript. Load them after the main content, and remove any you no longer look at.

## Fix 8: Use a CDN

A content delivery network serves your images, styles and scripts from a location near each visitor. It helps most when your audience is spread across countries or continents. Many hosts include one, and Cloudflare has a free plan.

By default a CDN caches static files but not HTML, so it improves total load time more than TTFB. The setup and its limits are explained in [What Is a CDN and Does a Small Website Need One?](/what-is-a-cdn).

## Fix 9: Clean up the database

Over the years a WordPress database collects post revisions, trashed items, spam comments, expired transients and settings left behind by deleted plugins. Most of this is harmless. The part that hurts is the `wp_options` table, where plugins store settings that load on every single page.

**How to do it:**

- Take a backup first.
- Use WP-Optimize or a similar plugin to remove old revisions, spam and expired transients.
- Limit future revisions by adding this line to `wp-config.php`:

```
define( 'WP_POST_REVISIONS', 5 );
```

- If you have WP-CLI access, check how much data loads automatically on every request:

```
wp db query "SELECT ROUND(SUM(LENGTH(option_value))/1024) AS autoload_kb FROM wp_options WHERE autoload IN ('yes','on','auto','auto-on');"
```

A result above roughly 800 KB is worth investigating. Site Health in recent WordPress versions also warns when autoloaded options grow too large.

## Fix 10: Reconsider a heavy theme or page builder

Multipurpose themes and visual page builders are convenient, and they add weight: extra markup, large stylesheets and scripts loaded on every page whether or not the page uses them.

You do not have to rebuild the site. Try these first:

- Turn off modules and widgets you do not use in the theme or builder settings.
- Enable the builder's own performance options, such as loading assets only where needed.
- Build simple pages, like blog posts, with the standard block editor.

If the site is still slow after everything else on this list, a lightweight theme such as GeneratePress, Astra or Kadence, or a default block theme, is the remaining lever.

## Fix 11: Control WP-Cron and the Heartbeat API

WordPress runs scheduled tasks through WP-Cron, which is triggered by visits to the site. On busy sites it fires too often. On quiet sites tasks pile up and run together, making one unlucky visitor wait.

**How to do it:** disable the visit-triggered behavior in `wp-config.php`:

```
define( 'DISABLE_WP_CRON', true );
```

Then create a real scheduled task in your hosting control panel that runs every 15 minutes:

```
*/15 * * * * wget -q -O - https://example.com/wp-cron.php?doing_wp_cron >/dev/null 2>&1
```

The Heartbeat API sends a request from every open admin tab every 15 to 60 seconds. If several editors keep tabs open, that load adds up on shared hosting. A plugin such as Heartbeat Control lets you slow it down.

## Fix 12: Upgrade or change your hosting

Do this last. It is the only fix here with a monthly cost, and the earlier ones often remove the need.

It is the right move when all of these are true:

- Page caching is on and working.
- PHP is current.
- TTFB on uncached pages, such as wp-admin or a search results page, is still well over a second.
- Your host has sent resource limit warnings, or speed varies widely at different times of day.

On shared hosting you compete with other accounts for CPU. A higher tier, managed WordPress hosting or a VPS gives you more reserved resources. [Shared vs VPS vs Cloud Hosting](/shared-vs-vps-vs-cloud-hosting) explains the options, and [How to Choose a Web Hosting Provider](/how-to-choose-web-hosting) lists what to check before you move. If you do switch, [our migration guide](/how-to-migrate-wordpress-site) covers the move itself.

## What order should you do these in?

| Priority | Fixes | Time needed | Cost |
|----------|-------|-------------|------|
| Do today | 1 (caching), 2 (images), 4 (PHP) | 1 to 2 hours | Free |
| Do this week | 3 (plugins), 6 (CSS and JS), 7 (fonts and embeds) | 2 to 4 hours | Free |
| Do if needed | 5 (object cache), 8 (CDN), 9 (database), 11 (cron) | 1 to 3 hours | Free or included |
| Last resort | 10 (theme), 12 (hosting) | A day or more | Varies |

After each group, test again in PageSpeed Insights and compare with the numbers you wrote down at the start. Stop when you reach the targets. More tuning beyond that point takes time and returns little.

## Frequently asked questions

### Why is my WordPress site so slow all of a sudden?

A sudden slowdown usually follows a change: a new or updated plugin, a theme update, a traffic spike, or a problem at your host. Check what changed in the last few days, deactivate recent plugins one at a time, and look at your host's status page and resource usage graphs.

### How fast should a WordPress site load?

Aim for Google's Core Web Vitals targets: Largest Contentful Paint within 2.5 seconds, Interaction to Next Paint of 200 milliseconds or less, and Cumulative Layout Shift of 0.1 or less, each at the 75th percentile. Time to First Byte should be 0.8 seconds or less.

### Do too many plugins slow down WordPress?

Not by count alone. A plugin slows a site when it loads scripts on every page, runs slow database queries or contacts outside services during page load. Use the free Query Monitor plugin to find which ones are responsible, and replace those instead of removing plugins at random.

### What is the best free caching plugin for WordPress?

WP Super Cache is the simplest to set up. W3 Total Cache offers more control. LiteSpeed Cache is the best choice on hosts that run LiteSpeed servers. If your host provides its own server-level cache, use that first, and run only one caching system at a time.

### Will changing hosts make my WordPress site faster?

Only if hosting is the bottleneck. If Time to First Byte stays above a second on uncached pages after you enable caching and update PHP, a better host or plan will help. If the problem is large images or heavy scripts, moving hosts changes little.

### Does the WordPress theme affect speed?

Yes. Themes and page builders decide how much CSS and JavaScript loads on every page. Lightweight themes add very little. Multipurpose themes with many built-in features add more. Turn off unused features first, and switch themes only if the site is still slow after the other fixes.

### How do I find out what is slowing down my WordPress site?

Test the page in PageSpeed Insights and read the diagnostics list. Check Time to First Byte to see whether the server or the page content is the issue. Then use the Query Monitor plugin while logged in to see slow database queries and which plugin runs them.

## Sources

- [web.dev: Web Vitals](https://web.dev/articles/vitals)
- [web.dev: Time to First Byte](https://web.dev/articles/ttfb)
- [WordPress.org server requirements](https://wordpress.org/about/requirements/)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Query Monitor plugin](https://wordpress.org/plugins/query-monitor/)
