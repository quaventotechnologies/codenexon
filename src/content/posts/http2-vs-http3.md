HTTP/3 is the newest version of the protocol browsers use to load web pages. It does the same job as HTTP/2 but runs on a transport called QUIC over UDP instead of TCP, which removes a delay called head-of-line blocking and usually needs fewer round trips to set up a connection. The gain is largest on slow or unreliable mobile networks. For most website owners, the practical answer is simple: HTTP/2 should already be on, and HTTP/3 is a free switch on most CDNs and developer platforms.

This guide explains how the versions differ, what each one actually speeds up, and how to check and enable them on your site.

> **How this guide was researched.** Protocol facts and dates come from MDN's documentation on HTTP, linked under Sources, and from the IETF specifications it references. The speed explanations describe how the protocols behave. We have not published benchmark comparisons for specific sites in this post, so measure your own pages before and after a change.

## The versions at a glance

| Version | Standardized | Transport | Key change |
|---------|--------------|-----------|------------|
| HTTP/1.1 | January 1997, as RFC 2068 | TCP | Persistent connections, one request at a time per connection |
| HTTP/2 | May 2015 | TCP | Binary protocol, many requests share one connection, compressed headers |
| HTTP/3 | 2022, RFC 9114 | QUIC over UDP | Independent streams, faster setup, survives network changes |

All three carry the same thing: requests for pages, images and scripts, and the responses. MDN describes HTTP/3 as having "the same semantics as earlier versions of HTTP" while using QUIC instead of TCP for transport. Your HTML, URLs and status codes do not change. Only the way bytes travel between the browser and the server does.

## What was wrong with HTTP/1.1

A page today might need 50 to 100 files: HTML, stylesheets, scripts, fonts and images. HTTP/1.1 can only handle one request at a time on each connection. Browsers work around that by opening several connections per domain, typically six, and queuing the rest.

That workaround caused a generation of performance tricks: combining all scripts into one file, merging icons into sprite sheets, and spreading images across several subdomains to get more connections. Each trick made sites harder to maintain.

## What HTTP/2 changed

MDN lists the main improvements:

- **It is a binary protocol** rather than plain text, which is faster for computers to parse.
- **It is multiplexed.** Many requests and responses travel over a single connection at the same time.
- **It compresses headers,** which matters because the same cookies and headers repeat on every request.

Multiplexing removed most of the HTTP/1.1 workarounds. One connection carries all the files for a domain, in parallel. Spreading assets across subdomains became counterproductive, because each new domain needs its own connection setup.

Browsers support HTTP/2 only over encrypted HTTPS connections. In practice, if your site has a valid certificate and a reasonably current server or CDN, it is almost certainly already using HTTP/2. If not, [How to Get a Free SSL Certificate With Let's Encrypt](/free-ssl-certificate-lets-encrypt) is the first step.

## The problem HTTP/2 could not fix: head-of-line blocking

HTTP/2 runs on TCP, and TCP guarantees that bytes arrive in order. That guarantee is normally helpful, but it creates a bottleneck when many streams share one connection.

Picture a single connection carrying an image, a stylesheet and a script at once. If one network packet belonging to the image is lost, TCP holds back everything that arrived after it, including the stylesheet and script data, until the lost packet is resent. Every stream waits for one missing piece. This is called head-of-line blocking.

On a fast, stable office connection, packets are rarely lost and this barely matters. On a phone moving between cell towers, or on crowded public Wi-Fi, packet loss is common, and one connection carrying everything can stall repeatedly.

## How HTTP/3 and QUIC solve it

HTTP/3 replaces TCP with QUIC, a transport protocol that runs on UDP. MDN summarizes the effect: QUIC "runs multiple streams over UDP and implements packet loss detection and retransmission independently for each stream, so that if an error occurs, only the stream with data in that packet is blocked."

That brings three practical benefits.

### 1. No cross-stream blocking

Each stream recovers from its own lost packets. A lost packet in an image no longer holds up the stylesheet. Pages render more steadily on poor networks.

### 2. Faster connection setup

Before HTTP/2 can send a request over HTTPS, the browser has to complete a TCP handshake and then a TLS handshake. With TLS 1.3, that is typically two round trips. QUIC combines the transport and encryption handshakes, so a new connection usually needs one round trip, and a connection to a server the browser has visited recently can often send data immediately.

Round trips are expensive over distance. A round trip between New York and Sydney takes at least 160 milliseconds because of the speed of light in fiber. Saving one round trip on a connection to a distant server saves at least that much before anything has loaded. [What Is a CDN?](/what-is-a-cdn) works through this arithmetic.

### 3. Connections survive network changes

A TCP connection is tied to your IP address. When your phone switches from Wi-Fi to mobile data, the address changes and every connection has to be rebuilt. QUIC identifies connections with an ID instead, so a connection can continue after the switch.

## Side-by-side comparison

| | HTTP/1.1 | HTTP/2 | HTTP/3 |
|---|----------|--------|--------|
| Transport | TCP | TCP | QUIC over UDP |
| Requests per connection at once | One | Many | Many |
| Header compression | No | Yes | Yes |
| Head-of-line blocking | At the HTTP level | At the TCP level | Removed between streams |
| Typical HTTPS setup before first request | TCP plus TLS round trips | TCP plus TLS round trips | Usually one combined round trip |
| Survives switching networks | No | No | Yes |
| Encryption | Optional | Required by browsers | Always built in |

## How much faster is it really?

Honestly, it depends, and anyone quoting a single percentage is generalizing.

| Situation | Likely benefit from HTTP/3 |
|-----------|----------------------------|
| Desktop on a fast, stable connection near the server | Small |
| Visitors far from your server | Noticeable on the first connection |
| Mobile visitors on patchy networks | Largest |
| Pages loading many files from one domain | Moderate |
| A slow server that takes 2 seconds to build each page | Almost none |

The last row matters most. HTTP/3 speeds up how data travels. It does nothing about a server that is slow to produce the page in the first place. If your Time to First Byte is poor because of missing caching or overloaded hosting, fix that first. [What Is TTFB?](/what-is-ttfb) and [Why Is My WordPress Site Slow?](/why-is-my-wordpress-site-slow) cover those causes.

The useful way to judge it is with your own field data. Turn HTTP/3 on, wait four weeks, and compare your Largest Contentful Paint in PageSpeed Insights or Search Console. [Core Web Vitals Explained](/core-web-vitals-explained) explains why field data takes 28 days to update.

## How to check which version your site uses

### In the browser

1. Open your site in Chrome and press F12.
2. Go to the Network tab and reload the page.
3. Right-click a column heading and enable **Protocol**.

The column shows `http/1.1`, `h2` for HTTP/2 or `h3` for HTTP/3 for each request. You may see `h2` on the first load and `h3` on a reload. That is normal: browsers usually discover HTTP/3 support from a header on the first response and use it from then on.

### From the terminal

Check HTTP/2 with curl:

```
curl -sI --http2 https://example.com/ | head -1
```

A response starting with `HTTP/2` confirms it. To see whether a server advertises HTTP/3, look for the `alt-svc` header:

```
curl -sI https://example.com/ | grep -i alt-svc
```

A value containing `h3` means the server tells browsers that HTTP/3 is available, for example `alt-svc: h3=":443"; ma=86400`.

## How to enable HTTP/2 and HTTP/3

### On a CDN or developer platform

This is the easiest route. Most CDNs offer HTTP/3 as a setting, often already on, and developer platforms such as Firebase Hosting, Vercel and Netlify serve modern protocols from their own networks without configuration. If your site sits behind a CDN, the browser talks HTTP/3 to the CDN even if your own server only speaks HTTP/1.1. [Firebase Hosting vs Vercel vs Netlify](/firebase-hosting-vs-vercel-vs-netlify) compares those platforms.

### On shared hosting

Most hosts already serve HTTP/2 over HTTPS. Some, particularly those running LiteSpeed servers, also support HTTP/3. Check with the browser method above, and ask support if you see `http/1.1`.

### On your own Nginx server

HTTP/2 needs one word on the HTTPS listen line in older versions, or a separate directive in newer ones:

```
listen 443 ssl;
http2 on;
```

HTTP/3 support in Nginx requires a recent version built with QUIC support, a UDP listener on port 443 and an `Alt-Svc` header:

```
listen 443 quic reuseport;
listen 443 ssl;
http2 on;
add_header Alt-Svc 'h3=":443"; ma=86400';
```

You must also open UDP port 443 in your firewall, not just TCP:

```
sudo ufw allow 443/udp
```

Forgetting the UDP rule is the most common reason HTTP/3 does not work on a self-managed server. Browsers then quietly fall back to HTTP/2, so nothing breaks, but you get no benefit. The rest of a basic Nginx setup is in [How to Set Up a VPS](/how-to-set-up-a-vps).

## What to stop doing once you have HTTP/2

Several HTTP/1.1-era tricks now work against you:

- **Domain sharding.** Spreading assets over `cdn1`, `cdn2` and `img` subdomains forces extra connection setups. Serve them from your main domain or one CDN domain.
- **Giant combined bundles.** Merging every script into one large file means a change to one line invalidates the whole cache. Smaller, separately cacheable files work well over multiplexed connections.
- **Inlining everything.** Embedding large images as data in the HTML prevents them being cached separately.

Some bundling is still sensible, since hundreds of tiny files carry their own overhead. The goal is reasonable file sizes that cache well, not one file at any cost.

## Is HTTP/3 safe to turn on?

Yes. Browsers that do not support it, and networks that block UDP, fall back to HTTP/2 automatically. Visitors never see an error because HTTP/3 is unavailable. Encryption is built into QUIC, so there is no unencrypted mode to worry about.

The only operational change is that some corporate firewalls and older monitoring tools expect web traffic on TCP only. If you run your own server and use such tools, make sure they handle UDP port 443.

## A quick checklist

1. Confirm your site uses HTTPS with a valid certificate.
2. Check the Protocol column in DevTools shows `h2` or `h3`.
3. If you use a CDN or developer platform, turn on HTTP/3 in its settings if it is not already on.
4. On your own server, enable HTTP/2, add QUIC support and open UDP port 443.
5. Remove domain sharding left over from the HTTP/1.1 days.
6. Compare field data in PageSpeed Insights four weeks later.

## Frequently asked questions

### What is the difference between HTTP/2 and HTTP/3?

Both carry the same web requests and responses. HTTP/2 runs on TCP, so a single lost packet can delay every file on the connection. HTTP/3 runs on QUIC over UDP, which recovers each stream independently, usually sets up connections in fewer round trips, and survives network changes.

### Is HTTP/3 faster than HTTP/2?

Often, mainly on mobile and unreliable networks and for visitors far from the server. On a fast, stable connection the difference is small. HTTP/3 does not speed up a slow server that takes a long time to generate pages.

### Does my website support HTTP/3?

Open Chrome developer tools, go to the Network tab, enable the Protocol column and reload. Requests marked h3 use HTTP/3. You can also run curl -sI against your site and look for an alt-svc header containing h3.

### Do I need HTTPS for HTTP/2?

In practice, yes. Browsers support HTTP/2 only over encrypted HTTPS connections. HTTP/3 has encryption built into QUIC, so it is always encrypted. A free Let's Encrypt certificate is enough for both.

### Will enabling HTTP/3 break my site for some visitors?

No. Browsers that do not support HTTP/3, and networks that block UDP traffic, automatically fall back to HTTP/2. Visitors do not see an error. On your own server, remember to open UDP port 443 in the firewall.

### When was HTTP/3 standardized?

HTTP/3 is defined in RFC 9114, published by the IETF in 2022. HTTP/2 was standardized in May 2015, and HTTP/1.1 was first published in January 1997.

### Does HTTP/3 help SEO?

Not directly. Search engines do not rank sites on protocol version. HTTP/3 can improve loading for real visitors, which feeds into Core Web Vitals such as Largest Contentful Paint, and that is part of page experience.

## Sources

- [MDN: Evolution of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Evolution_of_HTTP)
- [MDN: HTTP/3](https://developer.mozilla.org/en-US/docs/Glossary/HTTP_3)
- [MDN: QUIC](https://developer.mozilla.org/en-US/docs/Glossary/QUIC)
- [IETF RFC 9114: HTTP/3](https://datatracker.ietf.org/doc/html/rfc9114)
- [Nginx documentation: HTTP/3 support](https://nginx.org/en/docs/quic.html)
