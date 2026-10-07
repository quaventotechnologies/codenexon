HTTP security headers are short instructions your server sends with every page that tell the browser how to protect visitors. Six of them cover most of the benefit for a typical website: Strict-Transport-Security forces HTTPS, Content-Security-Policy limits which scripts can run, X-Content-Type-Options stops file-type guessing, a frame setting blocks clickjacking, Referrer-Policy limits what you leak to other sites, and Permissions-Policy turns off browser features you do not use. Most take one line of configuration each.

This guide explains what each header does, gives a safe value to start with, and shows how to add them on Apache, Nginx, WordPress and static hosts.

> **How this guide was researched.** Header syntax and behavior come from MDN's HTTP reference, linked under Sources. The recommended values are cautious starting points, not a policy tailored to your site. Test every change on a staging copy first, because a strict Content-Security-Policy in particular can break a page.

## What a security header looks like

When a browser loads a page, the server sends headers before the content. You can see them with one command:

```
curl -sI https://example.com/
```

A site with good headers returns lines like these among the others:

```
strict-transport-security: max-age=63072000; includeSubDomains
x-content-type-options: nosniff
referrer-policy: strict-origin-when-cross-origin
```

Headers cost nothing and add no visible weight to the page. They close off whole categories of attack that would otherwise depend on you never making a mistake.

## The six headers at a glance

| Header | Protects against | Safe starting value |
|--------|------------------|---------------------|
| Strict-Transport-Security | Connections being downgraded to unencrypted HTTP | `max-age=63072000; includeSubDomains` |
| Content-Security-Policy | Injected scripts (cross-site scripting) | Start in report-only mode |
| X-Content-Type-Options | Browsers running a file as the wrong type | `nosniff` |
| Content-Security-Policy `frame-ancestors`, or X-Frame-Options | Clickjacking through hidden frames | `frame-ancestors 'self'` or `SAMEORIGIN` |
| Referrer-Policy | Leaking full URLs to other sites | `strict-origin-when-cross-origin` |
| Permissions-Policy | Unwanted access to camera, microphone, location | `camera=(), microphone=(), geolocation=()` |

## Strict-Transport-Security (HSTS)

HSTS tells the browser: for this domain, never use plain HTTP again, for the next so many seconds.

### Why it matters

Without HSTS, the first request to `http://example.com` travels unencrypted before your server redirects it to HTTPS. On a hostile network, such as untrusted public Wi-Fi, an attacker can intercept that first request. Once the browser has seen an HSTS header, it switches to HTTPS on its own before sending anything.

MDN describes the sequence: the first visit uses HTTP, the server redirects to HTTPS, the HTTPS response carries the header, and the browser remembers the domain and applies the policy to future requests.

### The value

```
Strict-Transport-Security: max-age=63072000; includeSubDomains
```

- `max-age` is in seconds. 63,072,000 is two years. 31,536,000 is one year.
- `includeSubDomains` applies the rule to every subdomain as well.
- `preload` is optional and asks to be included in the list built into browsers. MDN notes that preload requires a `max-age` of at least one year and `includeSubDomains`.

### Roll it out in stages

HSTS is hard to undo. Browsers ignore the header if it is sent over plain HTTP, and once they have it, the only way to cancel it is to send `max-age=0` over HTTPS and wait for each visitor to return. MDN also warns that browsers will not let a visitor click past a certificate error on an HSTS site.

So start small and increase:

1. `max-age=300` (five minutes) for a day. Check that everything, including subdomains, works over HTTPS.
2. `max-age=86400` (one day) for a week.
3. `max-age=31536000` (one year), then add `includeSubDomains` once every subdomain has a valid certificate.

Do not add `preload` unless you are sure every subdomain will stay on HTTPS for good. Removing a domain from browser preload lists can take months.

HSTS needs a working certificate first. [How to Get a Free SSL Certificate With Let's Encrypt](/free-ssl-certificate-lets-encrypt) covers that.

## Content-Security-Policy (CSP)

CSP lists the places a page is allowed to load scripts, styles, images, fonts and frames from. If an attacker manages to inject a script into your page, through a vulnerable plugin or a comment form, the browser refuses to run it because it is not on the list.

It is the most powerful header here and the only one likely to break your site, so it needs care.

### A minimal policy

```
Content-Security-Policy: default-src 'self'; img-src 'self' data: https:; object-src 'none'; base-uri 'self'; frame-ancestors 'self'
```

Reading it piece by piece:

| Directive | Meaning |
|-----------|---------|
| `default-src 'self'` | By default, load things only from your own domain |
| `img-src 'self' data: https:` | Images from your domain, inline data images, or any HTTPS address |
| `object-src 'none'` | Block old plugin content such as Flash entirely |
| `base-uri 'self'` | Stop injected code from changing the page's base address |
| `frame-ancestors 'self'` | Only your own site may show this page in a frame |

Most real sites need more than this. An analytics script, a font service, an embedded video and a payment form each come from another domain, and each needs adding to the right directive.

### Start in report-only mode

Use the report-only version of the header first. The browser applies nothing, but reports every rule it would have broken in the developer console:

```
Content-Security-Policy-Report-Only: default-src 'self'; img-src 'self' data: https:
```

Open your main pages with the browser console showing. Each violation tells you which address to add and to which directive. When a full click-through of the site produces no violations, switch the header name to `Content-Security-Policy`.

### The hard part: inline scripts

Many sites have small scripts written directly in the page. A strict CSP blocks them. The tempting fix is `'unsafe-inline'`, which allows all inline scripts and throws away most of the protection. Better options are a hash of each inline script or a nonce generated per request. Both need either a build step or server support. If you cannot do that yet, a CSP that at least restricts `object-src`, `base-uri` and `frame-ancestors` is still worth having.

## X-Content-Type-Options

```
X-Content-Type-Options: nosniff
```

Browsers sometimes guess what a file is from its contents instead of trusting the type the server declares. An attacker can exploit that by uploading a file that looks harmless but is treated as a script. `nosniff` tells the browser to trust the declared type. It has one value and almost never causes problems. Add it everywhere.

## Clickjacking protection: frame-ancestors or X-Frame-Options

Clickjacking loads your page invisibly inside a frame on another site and tricks visitors into clicking buttons they cannot see, such as "delete account" or "confirm payment".

The modern control is the `frame-ancestors` directive in your CSP, shown above. The older header does the same job and is still widely used:

```
X-Frame-Options: SAMEORIGIN
```

`SAMEORIGIN` allows framing only by your own site. `DENY` blocks all framing. If both are present, current browsers follow `frame-ancestors`. Sending both is harmless and covers older browsers.

If you intentionally let other sites embed your content, such as a booking widget, set `frame-ancestors` to list those sites instead.

## Referrer-Policy

When someone clicks a link from your site to another, the browser can tell the destination which page they came from. Sometimes that address contains information you would not want shared, such as a search term, a reset token or an order number.

```
Referrer-Policy: strict-origin-when-cross-origin
```

With this value, links within your site send the full address, links to other sites send only your domain, and nothing is sent from HTTPS to HTTP. Current browsers use this as their default, but setting it explicitly protects older ones and documents your intent.

Your analytics still work, because they track visitors arriving at your site, not leaving it. If you rely on other sites seeing which of your pages sent the visitor, use UTM parameters on the links instead. [UTM Parameters Explained](/utm-parameters-guide) covers how.

## Permissions-Policy

This header turns off browser features your site does not use, so a malicious script or a compromised third-party embed cannot request them.

```
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
```

Empty brackets mean the feature is disabled for everyone, including your own pages. If your site does use one, for example a store locator that asks for location, change that entry to `geolocation=(self)`.

## Headers to stop sending

Some headers give away information or do more harm than good.

- **`Server` and `X-Powered-By`** often reveal the exact software and version, such as `Apache/2.4.41` or `PHP/7.4.3`. That helps attackers match your site to known flaws. Remove the version, or the whole header where you can.
- **`X-XSS-Protection`** controlled an old filter that browsers have removed. Leave it out, or set it to `0`, and rely on CSP.

## How to add the headers

### Apache (.htaccess)

Apache needs `mod_headers`, which most hosts enable. Add this to `.htaccess` in your site's root folder, after taking a backup:

```
<IfModule mod_headers.c>
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
    Header always unset X-Powered-By
</IfModule>
```

### Nginx

Add the lines inside the `server` block for your HTTPS site, then test and reload:

```
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
server_tokens off;
```

```
sudo nginx -t
sudo systemctl reload nginx
```

One Nginx detail catches people: if a `location` block contains its own `add_header`, it replaces all the headers from the `server` block for that location instead of adding to them. Repeat the security headers there, or keep all `add_header` lines in one place. [How to Set Up a VPS](/how-to-set-up-a-vps) covers the rest of a basic Nginx setup.

### WordPress

If you cannot edit server files, a security plugin can set headers for you, and some hosts have a headers option in the control panel. Plugins set headers from inside WordPress, so they do not apply to static files such as images. Server configuration is better where you have access. Our [WordPress security checklist](/wordpress-security-checklist) covers the other protections to put in place alongside these.

### Static hosts and developer platforms

Firebase Hosting, Netlify and Vercel each have a configuration file for headers. On Firebase Hosting they go in `firebase.json`:

```
"headers": [
  {
    "source": "**",
    "headers": [
      { "key": "X-Content-Type-Options", "value": "nosniff" },
      { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
      { "key": "X-Frame-Options", "value": "SAMEORIGIN" }
    ]
  }
]
```

Netlify uses a `_headers` file or `netlify.toml`, and Vercel uses `vercel.json`. [How to Deploy Next.js to Firebase Hosting](/how-to-deploy-nextjs-to-firebase-hosting) shows the full Firebase file.

### Behind a CDN

If your site sits behind a CDN, headers set at your server pass through. Many CDNs also let you add or change headers at the edge, which is useful when you cannot edit the server. Check that you are not setting the same header in two places with different values. [What Is a CDN?](/what-is-a-cdn) explains how the layers fit together.

## How to test your headers

1. Run `curl -sI https://example.com/` and read the response.
2. Repeat for an inner page, an image and a CSS file, since some setups add headers to HTML only.
3. Open the browser console on your main pages and look for CSP or mixed-content warnings.
4. Use a free scanner such as Mozilla's HTTP Observatory, which grades the headers and explains what is missing.
5. Test the site's key journeys after each change: login, contact form, checkout and any embedded videos or maps.

## A sensible order to add them

| Order | Header | Risk of breaking something |
|-------|--------|----------------------------|
| 1 | X-Content-Type-Options | Very low |
| 2 | Referrer-Policy | Very low |
| 3 | X-Frame-Options or frame-ancestors | Low, unless you embed your own pages elsewhere |
| 4 | Permissions-Policy | Low |
| 5 | Strict-Transport-Security, short max-age first | Medium until you are sure every subdomain has HTTPS |
| 6 | Content-Security-Policy, report-only first | High if rushed |

The first four can go live in an afternoon. Spread HSTS over a couple of weeks and CSP over as long as it takes to clear the report-only warnings.

## Frequently asked questions

### What are HTTP security headers?

They are instructions sent by a web server with each response that tell the browser how to handle the page securely. Examples include Strict-Transport-Security, which forces HTTPS, and Content-Security-Policy, which limits where scripts can load from. They are set in server or hosting configuration.

### Which security headers should every website have?

At minimum: Strict-Transport-Security, X-Content-Type-Options set to nosniff, a clickjacking control through frame-ancestors or X-Frame-Options, Referrer-Policy and Permissions-Policy. Add a Content-Security-Policy as well, starting in report-only mode so you can find what it would block.

### What is a good HSTS max-age?

Start short, such as 300 seconds, to confirm everything works over HTTPS, then raise it to one year, 31,536,000 seconds, or two years, 63,072,000. MDN notes that HSTS preload requires a max-age of at least one year and the includeSubDomains directive.

### Can security headers break my website?

Most cannot. Content-Security-Policy can, because it blocks scripts and resources that are not on its allow list. HSTS can cause problems if a subdomain lacks a valid certificate. Use report-only mode for CSP and a short max-age for HSTS before tightening them.

### Is X-Frame-Options still needed?

The frame-ancestors directive in Content-Security-Policy replaces it in current browsers, and when both are present browsers follow frame-ancestors. Sending X-Frame-Options as well is harmless and protects visitors using older browsers.

### Do security headers improve SEO?

Not directly. Search engines do not rank sites on these headers. HTTPS itself is a positive signal, and HSTS helps enforce it. The main benefit is protecting visitors and your site from attacks that could lead to malware warnings in search results.

### How do I check my site's security headers?

Run curl -sI followed by your address in a terminal and read the headers in the response, or open the Network tab in your browser's developer tools and select the page request. Mozilla's HTTP Observatory gives a free graded report with explanations.

## Sources

- [MDN: Strict-Transport-Security](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)
- [MDN: Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)
- [MDN: X-Content-Type-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options)
- [MDN: Referrer-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy)
- [MDN: Permissions-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy)
- [Mozilla HTTP Observatory](https://developer.mozilla.org/en-US/observatory)
