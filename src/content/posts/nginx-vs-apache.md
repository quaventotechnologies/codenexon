Nginx and Apache are the two most common web servers, and for a typical website either one works well. Nginx is usually the better choice for a new server you manage yourself, because it serves static files efficiently, handles many simultaneous connections with little memory, and works well as a reverse proxy in front of apps. Apache is the better fit when you are on shared hosting or need `.htaccess` files, which let you change settings per folder without access to the main configuration. Many servers run both, with Nginx in front and Apache behind.

This guide compares how they work, how they are configured, how each runs PHP and WordPress, and which to pick for your situation.

> **How this guide was written.** The configuration examples are standard Nginx and Apache 2.4 syntax on Ubuntu. Performance descriptions explain how each server's design behaves. We have not published benchmarks in this post, so if raw speed is the deciding factor, test with your own application.

## Quick answer

| Your situation | Choose | Why |
|----------------|--------|-----|
| Shared hosting | Whatever your host runs | You cannot change it, and `.htaccess` usually works |
| New VPS for a website or app | Nginx | Lower memory use, simple reverse proxy, common in tutorials |
| WordPress that relies on `.htaccess` rules from plugins | Apache, or Nginx with rules converted | Plugins write Apache rules by default |
| Node.js, Python or Go app | Nginx as a reverse proxy | Built for passing requests to an app server |
| Several people each managing their own folder | Apache | Per-folder `.htaccess` without root access |
| High traffic of static files | Nginx | Designed to serve many connections efficiently |

## How each server handles connections

The biggest difference is internal design, and it explains most of the others.

### Apache: processes and threads

Apache handles requests through modules called multi-processing modules (MPMs). There are three:

| MPM | How it works | Notes |
|-----|--------------|-------|
| prefork | One process per connection | Old style. Needed for the old `mod_php`. Uses the most memory |
| worker | Several threads per process | Lighter than prefork |
| event | Threads, with idle keep-alive connections handed to a listener | The default on current Apache. Closest to Nginx's efficiency |

With prefork in particular, each connection ties up a whole process. A burst of slow visitors, such as people on poor mobile connections, can use up memory quickly. The event MPM narrows this gap a lot, which is why the "Apache is slow" reputation is partly out of date.

### Nginx: event-driven workers

Nginx runs a small, fixed number of worker processes, usually one per CPU core. Each worker handles thousands of connections at once by reacting to events: data ready to read, a socket ready to write. An idle connection costs very little.

This design is why Nginx stays steady under load and why it became the standard reverse proxy and load balancer. It is also why Nginx does not run application code itself. It hands that work to something else.

## Configuration: one file vs many

This is the difference you will notice day to day.

### Apache and .htaccess

Apache reads its main configuration at startup, and it can also read a file called `.htaccess` in any folder on every request. A `.htaccess` file can set redirects, rewrite rules, password protection and headers for that folder and everything below it.

```
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [L,R=301]
```

That flexibility is why shared hosting uses Apache. Each customer can change their own site's behavior without touching the server's configuration. It is also why WordPress plugins for caching, security and redirects write their rules into `.htaccess`.

The cost is speed. Apache has to look for `.htaccess` files in each folder on the path of every request. On a busy server, most administrators disable it with `AllowOverride None` and move the rules into the main configuration.

### Nginx: central configuration only

Nginx has no equivalent to `.htaccess`. All settings live in its configuration files, usually one file per site in `/etc/nginx/sites-available/`, and changes need a reload:

```
server {
    listen 80;
    server_name example.com www.example.com;
    return 301 https://example.com$request_uri;
}
```

```
sudo nginx -t
sudo systemctl reload nginx
```

This is faster and easier to audit, because every rule is in one place. The trade-off is that you need server access to change anything, and plugin rules written for Apache must be translated by hand.

### Side-by-side syntax

| Task | Apache | Nginx |
|------|--------|-------|
| Redirect one page | `Redirect 301 /old /new` | `location = /old { return 301 /new; }` |
| Force HTTPS | Rewrite rules or a `Redirect` in the port 80 vhost | `return 301 https://$host$request_uri;` in the port 80 server block |
| Deny a file | `<Files wp-config.php> Require all denied </Files>` | `location = /wp-config.php { deny all; }` |
| Add a header | `Header always set X-Content-Type-Options "nosniff"` | `add_header X-Content-Type-Options "nosniff" always;` |
| Test config | `sudo apachectl configtest` | `sudo nginx -t` |
| Apply changes | `sudo systemctl reload apache2` | `sudo systemctl reload nginx` |

[301 vs 302 Redirects](/301-vs-302-redirects) and [HTTP Security Headers Explained](/http-security-headers) have fuller examples for both servers.

## Running PHP and WordPress

### Apache

Apache can run PHP in two ways:

- **mod_php** loads PHP inside every Apache process. Simple, but it forces the prefork MPM and makes every process heavy, even ones serving images.
- **PHP-FPM** runs PHP as a separate service. Apache passes PHP requests to it and serves static files itself. This works with the event MPM and is the better choice today.

WordPress works on Apache out of the box. Its permalink rules live in `.htaccess`, and WordPress writes them for you.

### Nginx

Nginx always uses PHP-FPM, because it cannot run PHP itself. A typical WordPress server block looks like this:

```
server {
    listen 443 ssl;
    server_name example.com;
    root /var/www/example.com;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$args;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php8.3-fpm.sock;
    }
}
```

The `try_files` line replaces the permalink rules WordPress would write to `.htaccess`. If you forget it, the home page loads and every other page returns a 404.

WordPress recommends PHP 8.3 or greater. Match the socket path in `fastcgi_pass` to the PHP version you installed.

### What to watch for when a plugin expects Apache

Caching, security and redirect plugins often say "add these rules to .htaccess". On Nginx, those rules do nothing. Check whether the plugin offers Nginx instructions, add the equivalent rules to your server block, and test. The most common gaps are blocking PHP in the uploads folder and caching rules. Our [WordPress security checklist](/wordpress-security-checklist) gives the Nginx versions of the important ones.

## Static files and caching

Serving images, stylesheets and scripts is where Nginx's design shows most clearly. It sends static files with very little overhead and holds many slow downloads open cheaply. Apache with the event MPM is much closer than older versions were, but Nginx is still the usual choice when static traffic is heavy.

In practice, for a small site, the difference is rarely what decides your speed. A page cache, compressed images and a CDN matter more. [What Is a CDN?](/what-is-a-cdn) covers that layer.

## Nginx as a reverse proxy

A reverse proxy receives requests from visitors and passes them to another server behind it. Nginx is widely used this way, in front of:

- Node.js, Python, Ruby or Go applications.
- An Apache server, so Nginx serves static files and Apache handles PHP with `.htaccess` support.
- Several application servers, with Nginx spreading the load between them.

A minimal proxy for a Node.js app running on port 3000:

```
server {
    listen 443 ssl;
    server_name app.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

The headers pass the visitor's real address and protocol to the app. Without them, your app sees every request as coming from 127.0.0.1 over plain HTTP.

Apache can act as a reverse proxy too, with `mod_proxy`. It works, and it is common where a server already runs Apache, but most new setups use Nginx for this role.

## Memory use on a small VPS

On the small servers many people start with, memory is the tightest resource. A 1 GB VPS from DigitalOcean costs $6 a month and a 1 GB Linode costs $5.

| Setup | Memory behavior |
|-------|-----------------|
| Nginx plus PHP-FPM | Nginx itself uses little. Most memory goes to PHP-FPM workers and the database |
| Apache event MPM plus PHP-FPM | Comparable for small sites |
| Apache prefork plus mod_php | Each process carries PHP, so memory climbs quickly with concurrent visitors |

Whichever server you use, tune the number of PHP-FPM workers to fit your memory, and add a swap file as a safety net. [How to Set Up a VPS](/how-to-set-up-a-vps) shows how, and [Best VPS Hosting for Developers](/best-vps-hosting-for-developers) compares the plans.

## Security and maintenance

Both are mature, actively maintained and secure when kept updated. The real risks are configuration mistakes and outdated versions, not the choice of server.

- Install from your operating system's packages so security updates arrive with `unattended-upgrades`.
- Hide version numbers: `server_tokens off;` in Nginx, and `ServerTokens Prod` with `ServerSignature Off` in Apache.
- On Apache, disable modules you do not use with `a2dismod`.
- On both, test configuration before reloading, so a typo does not take the site down.

## Using both together

A common pattern on WordPress servers is Nginx in front, handling HTTPS, static files and caching, with Apache behind it handling PHP and `.htaccess` rules. Visitors only ever talk to Nginx.

This gives plugin compatibility with Nginx's efficiency, at the cost of running and maintaining two servers. Many managed WordPress hosts use a layered setup like this behind the scenes, which is one reason managed hosting costs more. [Best WordPress Hosting for Beginners](/best-wordpress-hosting-for-beginners) compares managed and shared options.

## Logs and troubleshooting

When something goes wrong, both servers tell you why in their logs. Knowing where to look saves most of the time spent debugging.

| | Apache on Ubuntu | Nginx on Ubuntu |
|---|------------------|-----------------|
| Access log | `/var/log/apache2/access.log` | `/var/log/nginx/access.log` |
| Error log | `/var/log/apache2/error.log` | `/var/log/nginx/error.log` |
| Config test | `sudo apachectl configtest` | `sudo nginx -t` |
| Status | `sudo systemctl status apache2` | `sudo systemctl status nginx` |

Watch the error log live while you reproduce a problem:

```
sudo tail -f /var/log/nginx/error.log
```

Common errors and what they usually mean:

| Error | Likely cause |
|-------|--------------|
| 502 Bad Gateway | The app server or PHP-FPM behind the web server is not running, or the socket path is wrong |
| 504 Gateway Timeout | The app took too long to respond, often a slow database query |
| 403 Forbidden | File permissions, or a deny rule matching the request |
| 413 Request Entity Too Large | Upload larger than the limit. Raise `client_max_body_size` in Nginx or `LimitRequestBody` in Apache |
| Address already in use on port 80 | Apache and Nginx both trying to listen on the same port |

The last one happens often when people install Nginx on a server that already runs Apache. Stop and disable one of them, or move Apache to another port behind Nginx.

For PHP errors, also check the PHP-FPM log, usually at `/var/log/php8.3-fpm.log`. A 502 from either web server is often explained there.

## Frequently asked questions

### Is Nginx faster than Apache?

Nginx is usually more efficient at serving static files and handling many simultaneous connections, because of its event-driven design. Apache's event MPM has narrowed the gap. For a typical small site, caching and image size matter more than the choice of web server.

### Should I use Nginx or Apache for WordPress?

Both run WordPress well. Apache works out of the box with .htaccess rules that plugins write automatically. Nginx is lighter but needs a try_files rule for permalinks and manual translation of plugin rules. Many hosts run Nginx in front of Apache to get both.

### What is .htaccess and does Nginx support it?

An .htaccess file lets you change Apache settings, such as redirects and access rules, for a single folder without editing the main configuration. Nginx does not support .htaccess. All Nginx rules go in its central configuration files, followed by a reload.

### Can I run Nginx and Apache on the same server?

Yes. A common setup has Nginx listening on ports 80 and 443 as a reverse proxy, serving static files and passing PHP requests to Apache on another port. Visitors only connect to Nginx.

### Which web server uses less memory?

Nginx itself uses very little memory per connection. Apache with the event MPM and PHP-FPM is comparable for small sites. Apache with the prefork MPM and mod_php uses the most, because every process carries the PHP interpreter.

### Why does my WordPress site show 404 errors on Nginx?

Usually the try_files rule is missing. On Apache, WordPress writes permalink rules to .htaccess, but Nginx ignores that file. Add try_files $uri $uri/ /index.php?$args; inside the location / block and reload Nginx.

### How do I switch from Apache to Nginx?

Install Nginx, write a server block for each site, convert any .htaccess rules to Nginx syntax, and test on a different port or a staging server. Then stop Apache, start Nginx on ports 80 and 443, and check every important page and redirect.

## Sources

- [Nginx documentation](https://nginx.org/en/docs/)
- [Apache HTTP Server 2.4 documentation](https://httpd.apache.org/docs/2.4/)
- [Apache: Multi-Processing Modules](https://httpd.apache.org/docs/2.4/mpm.html)
- [Apache: .htaccess files](https://httpd.apache.org/docs/2.4/howto/htaccess.html)
- [WordPress.org server requirements](https://wordpress.org/about/requirements/)
