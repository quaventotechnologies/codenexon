You can get a free SSL certificate from Let's Encrypt in about ten minutes. Install Certbot on your server, run one command for Nginx or Apache, and Certbot will request the certificate, configure HTTPS and schedule automatic renewal. The certificate is valid for 90 days and renews itself, so there is nothing to pay and nothing to remember.

This tutorial covers the full process on an Ubuntu or Debian server, the simpler route on shared hosting, wildcard certificates and the errors you are most likely to meet.

> **How this guide was researched.** Certificate lifetimes, renewal guidance and the wildcard rule are quoted from the Let's Encrypt FAQ, linked under Sources. The commands are the standard Certbot ones. Run them on your own server and adjust the domain names. Test with the staging option first if you are new to this.

## What is an SSL certificate and why do you need one?

An SSL certificate (the modern name is TLS certificate) does two things. It encrypts the connection between a visitor's browser and your server, so passwords and form entries cannot be read in transit. It also proves that the server really answers for the domain in the address bar.

Without one, browsers label your site "Not secure", some features such as geolocation and service workers will not run, and payment providers will refuse to work with you. Every site needs HTTPS now, including sites that do not collect any data.

### Is a free certificate as secure as a paid one?

Yes, for encryption. A Let's Encrypt certificate uses the same encryption as a paid one, and browsers trust both equally. Let's Encrypt states plainly: "We do not charge a fee for our certificates."

What paid certificates add is identity checking and extras. An organization validation or extended validation certificate involves a manual check of the company behind the site. Some paid certificates also come with a warranty or support contract. A blog, a small business site or an online store using a hosted payment page does not need those.

## Before you start

You need four things in place.

| Requirement | How to check |
|-------------|--------------|
| A domain pointing at your server | `dig example.com A +short` returns your server's IP |
| SSH access with sudo rights | You can log in and run `sudo -v` |
| Nginx or Apache already serving the site over HTTP | `http://example.com` loads in a browser |
| Ports 80 and 443 open | Your firewall and cloud security group allow both |

The first row matters most. Let's Encrypt confirms that you control the domain by connecting to it. If the DNS record still points at an old server, the request fails. [DNS Records Explained](/dns-records-explained) shows how to check and fix the A record.

If you are on shared hosting, skip to the section "On shared hosting: use the control panel". You do not need the command line.

## Step 1: Install Certbot

Certbot is the free tool recommended for obtaining Let's Encrypt certificates. On Ubuntu and Debian, the supported way to install it is through snap.

```
sudo apt update
sudo apt install snapd
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

Confirm that it installed:

```
certbot --version
```

You should see a version number. If an older copy of Certbot was installed with `apt`, remove it first with `sudo apt remove certbot` so the two do not conflict.

## Step 2: Open the firewall

Certbot proves domain ownership over port 80, and HTTPS runs on port 443. If you use UFW, the default firewall on Ubuntu, allow both.

For Nginx:

```
sudo ufw allow 'Nginx Full'
sudo ufw status
```

For Apache:

```
sudo ufw allow 'Apache Full'
sudo ufw status
```

On a cloud server, also check the provider's own firewall. DigitalOcean, Amazon Lightsail and others have a network firewall outside the server that blocks port 443 until you open it.

## Step 3: Request and install the certificate

Run the command for your web server. List every hostname the site answers on. Most sites need both the bare domain and the `www` version.

For Nginx:

```
sudo certbot --nginx -d example.com -d www.example.com
```

For Apache:

```
sudo certbot --apache -d example.com -d www.example.com
```

Certbot asks three questions the first time:

1. An email address, used for urgent notices about your certificates.
2. Agreement to the Let's Encrypt terms of service.
3. Whether to share your email with the Electronic Frontier Foundation, which is optional.

It then contacts Let's Encrypt, completes the ownership check, downloads the certificate and edits your web server configuration to use it. It also adds a redirect so that HTTP requests go to HTTPS.

When it finishes, you will see a message with the paths to your files:

```
Certificate is saved at: /etc/letsencrypt/live/example.com/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/example.com/privkey.pem
```

Open `https://example.com` in a browser. The padlock should be there.

### Practice run with the staging server

If you expect to make several attempts, add `--test-cert` to the command. This uses the Let's Encrypt staging environment, which has much higher limits. The certificate it issues is not trusted by browsers, so run the command again without the flag once everything works.

```
sudo certbot --nginx --test-cert -d example.com -d www.example.com
```

## Step 4: Confirm automatic renewal

Let's Encrypt's FAQ says its default certificates are valid for 90 days, and it recommends renewing 90-day certificates every 60 days. The snap version of Certbot installs a systemd timer that checks twice a day and renews any certificate that is close to expiring.

Check that the timer exists:

```
sudo systemctl list-timers | grep certbot
```

Then simulate a renewal without changing anything:

```
sudo certbot renew --dry-run
```

If the dry run ends with "Congratulations, all simulated renewals succeeded", you are finished. Renewal will happen on its own.

To see what certificates you have and when they expire:

```
sudo certbot certificates
```

### What about the new short-lived certificates?

Let's Encrypt also offers certificates that are valid for six days. The FAQ describes them as opt-in and recommends renewing them every three days. A shorter lifetime limits the damage if a private key is ever stolen. They only make sense with fully automated renewal, and most small sites should stay with the 90-day default for now.

## On shared hosting: use the control panel

Most shared and managed hosts have Let's Encrypt built in, so you never touch Certbot.

- **cPanel:** look for "SSL/TLS Status" or "Let's Encrypt SSL". Select your domains and choose "Run AutoSSL" or "Issue".
- **Plesk:** open the domain, choose "SSL/TLS Certificates", then "Install" under the free Let's Encrypt option.
- **Custom panels:** hosts such as Hostinger and SiteGround issue the certificate automatically when you add a domain, or offer a one-click button under a "Security" or "SSL" menu.

After the certificate is active, turn on the "Force HTTPS" option in the same panel, or in WordPress under Settings, General, change both site addresses to begin with `https://`.

If your host charges a yearly fee for a basic certificate and offers no free option, that is a cost worth counting when you compare plans. See point 7 in [How to Choose a Web Hosting Provider](/how-to-choose-web-hosting).

## How to get a wildcard certificate

A wildcard certificate covers every subdomain at one level, such as `blog.example.com`, `shop.example.com` and `app.example.com`, with a single certificate for `*.example.com`.

Let's Encrypt supports wildcards with one condition. Its FAQ states: "Wildcard issuance must use the DNS-01 challenge." Instead of placing a file on your web server, you prove ownership by adding a TXT record to your DNS.

The manual method looks like this:

```
sudo certbot certonly --manual --preferred-challenges dns -d example.com -d "*.example.com"
```

Certbot shows a value and asks you to create a TXT record named `_acme-challenge.example.com`. Add it at your DNS host, wait a minute or two, confirm it is visible, and then continue:

```
dig _acme-challenge.example.com TXT +short
```

The manual method does not renew automatically, because someone has to add a new TXT record each time. For automatic renewal, use a Certbot DNS plugin for your DNS provider. Plugins exist for Cloudflare, DigitalOcean, Amazon Route 53 and others. The plugin uses an API token to create the record for you.

Most sites do not need a wildcard. If you have three or four subdomains, list them all with `-d` flags in a normal request. It is simpler and renews without any DNS access.

## Common errors and how to fix them

| Error message or symptom | Cause | Fix |
|--------------------------|-------|-----|
| "DNS problem: NXDOMAIN looking up A for example.com" | The domain has no A record, or it has not reached Let's Encrypt's resolvers yet | Add or correct the A record and wait for the TTL |
| "Timeout during connect (likely firewall problem)" | Port 80 is blocked | Open port 80 in UFW and in your cloud firewall |
| "Could not automatically find a matching server block" | Nginx has no `server_name` line for the domain | Add `server_name example.com www.example.com;` and reload Nginx |
| "too many certificates already issued" | You have hit a rate limit | Wait, and use `--test-cert` while troubleshooting |
| Padlock shows a warning about mixed content | The page loads images or scripts over `http://` | Change those URLs to `https://` |
| Certificate works for the bare domain but not www | `www` was left out of the request | Run Certbot again with both `-d` values |
| Renewal fails months later | The web server config changed, or port 80 was closed | Run `sudo certbot renew --dry-run` and read the error |

### A note on rate limits

Let's Encrypt limits how many certificates can be issued for one domain in a given period, and how many failed attempts are allowed per hour. The exact numbers are published on its rate limits page and are adjusted from time to time. Normal use never comes close. People hit the limits by rerunning a failing command over and over. If a request fails twice, stop, read the error, and switch to `--test-cert` until it succeeds.

## After the certificate is installed

Four checks finish the job properly.

1. **Test the redirect.** Visit `http://example.com` and confirm it lands on `https://`. One redirect is the goal. A chain of several adds delay, as explained in [What Is TTFB?](/what-is-ttfb).
2. **Fix mixed content.** Open the browser console on a few pages. Warnings about insecure resources mean hard-coded `http://` links. On WordPress, a search and replace on the database fixes them in one pass.
3. **Update external services.** Change the site URL to HTTPS in Google Search Console, your analytics tool and any payment or email service that stores your address.
4. **Run an external test.** The SSL Labs server test grades your configuration and lists old protocols you may want to disable.

## How to renew or revoke manually

You should rarely need these, but they are useful to know.

Force a renewal now:

```
sudo certbot renew --force-renewal
```

Remove a certificate you no longer need:

```
sudo certbot delete --cert-name example.com
```

Revoke a certificate, for example after a server was compromised:

```
sudo certbot revoke --cert-path /etc/letsencrypt/live/example.com/cert.pem
```

After revoking, request a new certificate and generate a new private key.

## Frequently asked questions

### Is Let's Encrypt really free?

Yes. Let's Encrypt is run by a nonprofit and states that it does not charge a fee for its certificates. There is no paid tier and no limit on how long you can keep renewing. Your only cost is the server or hosting plan the certificate runs on.

### How long does a Let's Encrypt certificate last?

Default Let's Encrypt certificates are valid for 90 days. Let's Encrypt recommends renewing them every 60 days, which Certbot does automatically. It also offers opt-in short-lived certificates that are valid for six days and should be renewed every three days.

### Does Certbot renew certificates automatically?

Yes. When installed through snap, Certbot adds a systemd timer that runs twice a day and renews any certificate nearing expiry. Confirm it is working with the command sudo certbot renew --dry-run. If the dry run succeeds, renewals will happen without your involvement.

### Can I use Let's Encrypt on shared hosting?

Usually, yes. Most shared hosts include Let's Encrypt in their control panel and issue certificates with one click or automatically. Look under SSL/TLS Status in cPanel or SSL/TLS Certificates in Plesk. You do not need SSH access or Certbot.

### Does Let's Encrypt support wildcard certificates?

Yes. Let's Encrypt issues wildcard certificates such as *.example.com, but only through the DNS-01 challenge. That means proving ownership with a TXT record in your DNS instead of a file on your web server. A DNS plugin for Certbot can automate the process.

### Will a free SSL certificate hurt my SEO?

No. Search engines treat HTTPS as a positive signal and do not distinguish between free and paid certificates. What matters is that the certificate is valid, covers every hostname you use and that HTTP redirects to HTTPS in a single step.

### What happens if my certificate expires?

Visitors see a full-page browser warning and most will leave. The site itself is unharmed. Run sudo certbot renew on the server to get a new certificate, then find out why automatic renewal failed, which is usually a closed port 80 or a changed web server configuration.

## Sources

- [Let's Encrypt FAQ](https://letsencrypt.org/docs/faq/)
- [Let's Encrypt rate limits](https://letsencrypt.org/docs/rate-limits/)
- [Certbot instructions](https://certbot.eff.org/instructions)
- [SSL Labs server test](https://www.ssllabs.com/ssltest/)
