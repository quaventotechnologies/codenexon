Use a 301 redirect when a page has moved for good, and a 302 when the move is temporary. A 301 tells search engines to treat the new address as the real one and carry the old page's standing over to it. A 302 tells them to keep the old address indexed because it is coming back. Choosing the wrong one will not break your site for visitors, but it can leave the wrong address in search results for months.

This guide explains each redirect type, how Google treats them, and how to set them up on Apache, Nginx and WordPress, with the mistakes to avoid when you move or delete pages.

> **How this guide was researched.** The descriptions of how Google handles redirects are quoted from Google Search Central's documentation, linked under Sources. The server snippets are standard Apache and Nginx configuration. Example addresses use example.com. Test redirects on a staging copy or a single page before applying them site-wide.

## What is a redirect?

A redirect is an instruction from your server that says "what you asked for is at a different address". The browser receives a short response with a status code and a new location, and loads that location instead. Visitors usually never notice.

You need redirects whenever an address changes:

- You rename a page or change its URL.
- You delete a page and want to send visitors to the closest alternative.
- You move the site to a new domain.
- You switch from HTTP to HTTPS, or choose between the `www` and non-`www` versions.
- You merge two similar pages into one.

Without a redirect, anyone following an old link gets a "404 Not Found" page, and any value the old page had built up in search is lost.

## Redirect types at a glance

| Code | Name | Use it when | Google treats it as |
|------|------|-------------|---------------------|
| 301 | Moved Permanently | The page has moved and will not come back | Permanent |
| 308 | Permanent Redirect | Same as 301, and the request method must not change | Permanent |
| 302 | Found | The move is temporary | Temporary |
| 303 | See Other | After a form submission, to send the browser to a result page | Temporary |
| 307 | Temporary Redirect | Same as 302, and the request method must not change | Temporary |
| Meta refresh, 0 seconds | HTML tag in the page | You cannot configure the server | Permanent |
| Meta refresh, delayed | HTML tag with a wait | Rarely appropriate | Temporary |
| JavaScript redirect | Script changes the location | Last resort | Permanent, if Google runs the script |

For day-to-day website work you need two of these: 301 for permanent moves and 302 for temporary ones.

## 301 vs 302: the practical difference

Both send the visitor to the new address. They differ in what they tell search engines.

Google's documentation puts it this way. For a permanent redirect, "Googlebot follows the redirect, and the indexing pipeline uses the redirect as a signal that the redirect target should be canonical." For a temporary redirect, "Googlebot follows the redirect, but the indexing pipeline doesn't use the redirect as a signal that the redirect target should be canonical."

In plain terms:

| | 301 | 302 |
|---|-----|-----|
| Which address appears in search | The new one | The old one |
| Links pointing at the old page | Counted toward the new address | Stay credited to the old address |
| Browser caching | Cached, often for a long time | Not cached by default |
| Easy to undo | No. Browsers remember it | Yes |

That last row matters in practice. Browsers cache 301 redirects aggressively. If you set one up by mistake, visitors who already followed it may keep being redirected even after you remove it. Test with a 302 first, confirm it goes where you intend, then switch to 301.

### When to use a 301

- You changed a page's URL permanently.
- You moved to a new domain.
- You moved from HTTP to HTTPS.
- You merged two pages and one address is retired.
- You deleted a product or post and a close replacement exists.

Google advises using a permanent redirect "when you're sure that the redirect won't be reverted".

### When to use a 302

- A product page is temporarily replaced by a seasonal version.
- You are running a short promotion on a different page.
- A page is down for maintenance and you are pointing visitors elsewhere for a few days.
- You are testing a new version of a page.
- You send visitors to different pages by location or device.

### What happens if you use the wrong one

Using a 302 for a permanent move is the common mistake. The old address stays in the index, and the new one may take much longer to appear. Google does eventually work out that a long-standing 302 is really permanent, but "eventually" is not a plan.

Using a 301 for a temporary move is harder to reverse, because search engines have already switched to the new address and browsers have cached the redirect.

## 307 and 308: the stricter versions

A 307 is a temporary redirect and a 308 is a permanent one. They exist because of a technical detail: with a 301 or 302, a browser is allowed to change a POST request (such as a form submission) into a GET request when it follows the redirect. With a 307 or 308, it must repeat the request exactly as it was.

For ordinary page links this makes no difference, and Google treats 308 the same as 301 and 307 the same as 302. Use 307 or 308 when you are redirecting an address that receives form submissions or API calls and the data must survive the redirect. Some platforms issue 308 by default for permanent redirects, which is fine.

You may also see a 307 that your server never sent. When a site uses HSTS, the browser itself upgrades HTTP requests to HTTPS and reports this as an internal 307. It is not a real response from the server.

## How to set up redirects

Server-level redirects are the most reliable. Google lists its order of preference as server-side redirects first, then meta refresh, then JavaScript as a last resort.

### Apache (.htaccess)

Most shared hosting runs Apache or a compatible server and reads a file named `.htaccess` in the site's root folder. Back the file up before editing it. A syntax error in `.htaccess` takes the whole site down until it is fixed.

Redirect one page:

```
Redirect 301 /old-page/ https://example.com/new-page/
```

Redirect a whole folder, keeping the rest of the path:

```
RedirectMatch 301 ^/blog/(.*)$ https://example.com/articles/$1
```

Send all HTTP traffic to HTTPS and the `www` version to the bare domain, in a single hop:

```
RewriteEngine On
RewriteCond %{HTTPS} off [OR]
RewriteCond %{HTTP_HOST} ^www\. [NC]
RewriteRule ^(.*)$ https://example.com/$1 [L,R=301]
```

Move an entire site to a new domain:

```
RewriteEngine On
RewriteCond %{HTTP_HOST} ^(www\.)?old-domain\.com$ [NC]
RewriteRule ^(.*)$ https://new-domain.com/$1 [L,R=301]
```

For a temporary redirect, replace `301` with `302`.

### Nginx

Nginx does not use `.htaccess`. Redirects go in the site's server configuration, followed by a reload.

Redirect one page:

```
location = /old-page/ {
    return 301 https://example.com/new-page/;
}
```

Redirect a folder, keeping the rest of the path:

```
location ~ ^/blog/(.*)$ {
    return 301 https://example.com/articles/$1;
}
```

Send HTTP and `www` to the HTTPS bare domain:

```
server {
    listen 80;
    server_name example.com www.example.com;
    return 301 https://example.com$request_uri;
}

server {
    listen 443 ssl;
    server_name www.example.com;
    return 301 https://example.com$request_uri;
}
```

Test and apply:

```
sudo nginx -t
sudo systemctl reload nginx
```

If you are setting up a server from scratch, [How to Set Up a VPS](/how-to-set-up-a-vps) covers Nginx and HTTPS installation.

### WordPress

You do not need to edit server files on WordPress.

- **Changed a post's slug?** WordPress automatically redirects the old address to the new one for posts and pages. This covers simple renames only.
- **Need more control?** Use a redirect manager. The free Redirection plugin is the long-standing choice. Rank Math includes a redirect manager in its free version, and Yoast SEO includes one in Premium. We compare the two in [Rank Math vs Yoast SEO](/rank-math-vs-yoast).

In any of these, you enter the old path, the new address and the type (301 or 302). The plugin also logs 404 errors, which tells you which old addresses people are still trying to reach.

Plugin redirects run after WordPress loads, so they are slightly slower than server rules. For a handful of redirects that is irrelevant. For thousands, or for site-wide rules such as HTTP to HTTPS, use the server configuration.

### Static hosts and developer platforms

Platforms such as Firebase Hosting, Netlify and Vercel configure redirects in a file in your project. On Firebase Hosting, for example, they go in `firebase.json`:

```
"redirects": [
  { "source": "/old-page", "destination": "/new-page", "type": 301 }
]
```

Each platform has its own format and its own default status code, so check which code is sent. See [Firebase Hosting vs Vercel vs Netlify](/firebase-hosting-vs-vercel-vs-netlify) for how they compare.

### Meta refresh and JavaScript

If you cannot change server settings at all, a meta refresh in the page head is the fallback:

```
<meta http-equiv="refresh" content="0; url=https://example.com/new-page/">
```

With a delay of zero, Google treats it as permanent. With a delay above zero, it treats it as temporary. JavaScript redirects are the least reliable, since they only work if the script runs. Use either only when a server-side redirect is impossible.

## How to check a redirect

Never assume a redirect works. Check the status code it actually returns.

From a terminal:

```
curl -I https://example.com/old-page/
```

The first line shows the code and the `location` line shows the destination:

```
HTTP/2 301
location: https://example.com/new-page/
```

To follow the whole chain and see every hop:

```
curl -sIL https://example.com/old-page/ | grep -i -E "^HTTP|^location"
```

In a browser, open DevTools with F12, go to the Network tab, tick "Preserve log" and load the old address. The first row shows the status code. Use a private window, since your normal browser may have cached an earlier 301.

## Redirect chains and loops

A **chain** is a redirect that leads to another redirect:

```
http://example.com/page  ->  https://example.com/page  ->  https://www.example.com/page  ->  https://www.example.com/new-page
```

That is three hops before the visitor gets a page. Each hop is a full round trip to a server, which adds delay to every visit. It also adds to Time to First Byte, as covered in [What Is TTFB?](/what-is-ttfb). Search engine crawlers follow only a limited number of hops before giving up.

Fix chains by pointing every old address directly at the final destination. When you add a new redirect, check whether anything already redirects to the page you are moving, and update those rules too.

A **loop** is a chain that never ends: A redirects to B and B redirects back to A. The browser shows "too many redirects". The usual causes are:

- An HTTPS rule on the server combined with a CDN that connects to the server over HTTP. Set the CDN's encryption mode to full.
- Two rules that disagree about `www`.
- A plugin redirect that conflicts with a server rule.

Clear your cookies for the site or use a private window when testing, since a cached redirect can make a fixed loop look broken.

## A checklist for moving or deleting pages

1. **List the old addresses.** Export your sitemap or crawl the site before you change anything.
2. **Map each old address to its best new one.** Match pages one to one where possible.
3. **Do not send everything to the home page.** A redirect to an unrelated page is treated much like a missing page, and it frustrates visitors.
4. **Let genuinely dead pages return 404 or 410.** If nothing replaces a page, an honest "not found" is correct. A 410 says it is gone on purpose.
5. **Use 301 for permanent changes.**
6. **Update your internal links** to point at the new addresses directly, so visitors skip the redirect.
7. **Update your sitemap** to list only the new addresses.
8. **Test a sample** with curl and check for chains.
9. **Keep the redirects in place.** A year is a sensible minimum, and indefinitely is better for pages with links from other sites. Removing a redirect turns every old link into a 404.
10. **Watch Google Search Console** for a few weeks. The Pages report shows which addresses return errors.

If the move is to a new host as well as new addresses, do them separately where you can. Changing one thing at a time makes problems far easier to trace. [How to Migrate a WordPress Site to a New Host](/how-to-migrate-wordpress-site) covers the hosting side.

## Frequently asked questions

### What is the difference between a 301 and a 302 redirect?

A 301 is a permanent redirect and a 302 is temporary. With a 301, search engines treat the new address as the main one and credit it with links to the old page. With a 302, they keep the old address indexed because it is expected to return.

### Does a 301 redirect hurt SEO?

No. A 301 is the correct way to move a page and passes the old page's standing to the new address. Problems come from redirecting to an irrelevant page, building chains of several redirects, or removing the redirect later so old links lead to a 404.

### When should I use a 302 redirect?

Use a 302 when the original address will be used again: a temporary promotion, short maintenance, a test of a new page version, or sending visitors to different pages by location. If the change is permanent, use a 301.

### How long should I keep a 301 redirect?

Keep it for at least a year, and indefinitely if other websites link to the old address. Search engines need time to process the move, and people keep following old links and bookmarks for years. Removing the redirect turns those visits into errors.

### What is a redirect chain?

A redirect chain is a series of redirects, where one address redirects to a second, which redirects to a third. Each hop adds a round trip and slows the page. Fix it by pointing every old address straight at the final destination.

### What is the difference between 301 and 308?

Both are permanent, and Google treats them the same way. A 308 requires the browser to repeat the request with the same method, so a form submission stays a form submission. A 301 allows the browser to change it. For normal page links there is no practical difference.

### How do I create a redirect in WordPress?

WordPress redirects automatically when you change a post's slug. For anything else, install a redirect manager such as the free Redirection plugin, or use the one built into Rank Math. Enter the old path, the new address and choose 301 or 302.

## Sources

- [Google Search Central: Redirects and Google Search](https://developers.google.com/search/docs/crawling-indexing/301-redirects)
- [MDN: Redirections in HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Redirections)
- [Firebase Hosting: Configure redirects](https://firebase.google.com/docs/hosting/full-config#redirects)
- [Google Search Console](https://search.google.com/search-console/about)
