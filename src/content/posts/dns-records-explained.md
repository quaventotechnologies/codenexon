DNS records are the instructions that tell the internet where to find the services behind your domain name. An A record points the domain at a server's IP address, a CNAME points one name at another name, MX records say where email is delivered, and TXT records hold verification and email security text. Six record types cover almost everything a small website needs.

This guide explains each one with a real example, shows how TTL controls the speed of changes, and walks through pointing a domain at a new host without losing email.

> **How this guide was researched.** Record formats follow the DNS standards, and the examples use reserved documentation addresses (such as 203.0.113.10 and example.com) so nothing here points at a real server. The TTL figures for Cloudflare come from its documentation, linked under Sources.

## How DNS works in one minute

Computers find each other by number, not by name. When someone types `example.com`, their device asks a DNS resolver for the IP address that goes with that name. The resolver asks the domain's authoritative nameservers, which hold your records, and returns the answer. The browser then connects to that address.

Three parties are involved, and it helps to keep them separate:

- **The registrar** is where you bought the domain. It records which nameservers are in charge.
- **The DNS host** runs those nameservers and stores your records. It is often the registrar, your web host or a service such as Cloudflare.
- **The web host** is the server the records point to.

All three can be one company or three different ones. When a change does not seem to work, the usual reason is that it was made at a company that is not the active DNS host. Check which nameservers your domain uses before editing anything.

## The six DNS records you will actually use

| Record | What it does | Example value |
|--------|--------------|---------------|
| A | Points a name at an IPv4 address | 203.0.113.10 |
| AAAA | Points a name at an IPv6 address | 2001:db8::10 |
| CNAME | Points a name at another name | example.com |
| MX | Says which servers receive email | 10 mail.example.com |
| TXT | Holds text for verification and email security | v=spf1 include:_spf.example.net ~all |
| NS | Names the servers that hold the domain's records | ns1.example.net |

## A record: the address of your site

An A record maps a name to an IPv4 address. It is the record that makes your website load.

```
Type   Name   Value          TTL
A      @      203.0.113.10   3600
```

The `@` symbol means the root of the domain, which is `example.com` with nothing in front. Your host gives you the IP address, usually in the welcome email or the control panel.

You can have more than one A record for the same name. Resolvers will hand out the addresses in turn, which spreads traffic across servers. Most small sites have exactly one.

## AAAA record: the same thing for IPv6

An AAAA record does the job of an A record for IPv6 addresses, which are the longer format that looks like `2001:db8::10`.

```
Type   Name   Value          TTL
AAAA   @      2001:db8::10   3600
```

Add one only if your host gives you an IPv6 address. If you add an AAAA record that points somewhere wrong, visitors on IPv6 networks will fail to reach the site while everyone else is fine, which is a confusing fault to track down. When you move hosts, remember to update or remove the old AAAA record as well as the A record.

## CNAME record: an alias for another name

A CNAME says "this name is another name for that one". The resolver follows it and looks up the target instead.

```
Type    Name   Value         TTL
CNAME   www    example.com   3600
```

With this record, `www.example.com` always resolves to wherever `example.com` points. Change the A record once and both follow.

CNAMEs are also how you connect a subdomain to an outside service. A shop, a help center or a hosting platform will ask you to create something like:

```
Type    Name   Value                        TTL
CNAME   shop   shops.example-platform.com   3600
```

Two rules prevent most CNAME problems:

1. **A name with a CNAME cannot have any other record.** You cannot put a CNAME and an MX record on the same name.
2. **The root domain cannot be a standard CNAME**, because the root must hold NS and other records. Some DNS hosts offer a workaround called CNAME flattening or an ALIAS record, which behaves like a CNAME at the root. If your platform asks for a CNAME on the bare domain and your DNS host does not support flattening, use the A record the platform provides instead.

## MX record: where your email goes

MX records tell other mail servers where to deliver messages for your domain. They are completely separate from the records that run your website.

```
Type   Name   Priority   Value                 TTL
MX     @      10         mx1.mailhost.example   3600
MX     @      20         mx2.mailhost.example   3600
```

The priority number decides the order. Lower numbers are tried first, so `10` is the primary server and `20` is the backup. The value must be a hostname, never an IP address.

This separation is why your website and email can live with different companies. It is also why email breaks during a careless migration. If you change nameservers to a new host and do not copy the MX records across, mail has nowhere to go. Copy every record before you switch.

## TXT record: proof and email security

A TXT record stores a line of text. It has two everyday uses.

**Verifying ownership.** Services such as Google Search Console ask you to add a specific string to prove you control the domain:

```
Type   Name   Value                                   TTL
TXT    @      google-site-verification=abc123example   3600
```

**Email authentication.** SPF, DKIM and DMARC are all published as TXT records. They tell receiving mail servers which senders are allowed to use your domain:

```
Type   Name     Value                                               TTL
TXT    @        v=spf1 include:_spf.mailhost.example ~all            3600
TXT    _dmarc   v=DMARC1; p=none; rua=mailto:reports@example.com     3600
```

A domain should have only one SPF record. If you use two sending services, merge them into a single record with two `include:` parts. Full instructions are in [SPF, DKIM and DMARC Explained](/spf-dkim-dmarc-explained).

## NS record: who holds your records

NS records name the authoritative nameservers for the domain.

```
Type   Name   Value                 TTL
NS     @      ns1.dnshost.example   86400
NS     @      ns2.dnshost.example   86400
```

You set these at your registrar, usually on a screen labeled "nameservers". Changing them hands control of every record to a different DNS host. That is a bigger step than editing an A record, and it is the step where records get lost. If you only want to move your website, change the A record and leave the nameservers alone.

## What is TTL and why does it matter?

TTL stands for time to live. It is the number of seconds a resolver may keep a record in its cache before asking again. A TTL of 3600 means resolvers can reuse the answer for one hour.

| TTL | Duration | When to use it |
|-----|----------|----------------|
| 300 | 5 minutes | In the day before and during a migration |
| 3600 | 1 hour | A sensible everyday default |
| 14400 | 4 hours | Records that rarely change |
| 86400 | 1 day | NS records and other stable settings |

TTL is the real meaning behind "DNS propagation". There is no wave spreading around the world. Each resolver simply holds the old answer until its copy expires. If your A record has a TTL of 86400 and you change it, some visitors will be sent to the old server for up to 24 hours. If the TTL was 300, almost everyone sees the change within five minutes.

Limits vary by DNS host. Cloudflare's documentation states that proxied records use a TTL of "Auto", which is set to 300 seconds, and that unproxied records can be set between 60 seconds and one day on non-Enterprise plans.

Lower the TTL before a change, not at the same time. The old, long TTL is what resolvers already cached, so you need to wait out that period once before the short TTL takes effect.

## How to point a domain at a new host

This sequence moves a website to a new server while leaving email untouched.

1. **List your current records.** Export or screenshot the full DNS zone at your current DNS host. Pay attention to MX and TXT records.
2. **Lower the TTL.** Set the TTL on the A record, the AAAA record if you have one, and the `www` record to 300. Wait at least as long as the old TTL. A full day is safe.
3. **Set up the site on the new host.** Upload the files, import the database and install an SSL certificate if the host does not do it for you.
4. **Test before switching.** Use the new host's temporary URL, or add a line to your computer's hosts file so that only you see the new server.
5. **Change the A record** to the new IP address. Update or delete the AAAA record.
6. **Verify.** Run a lookup and load the site in a private browser window.
7. **Raise the TTL** back to 3600 after a day or two.
8. **Keep the old hosting active for a week.** A few resolvers ignore TTLs, and you may need to recover a file.

For WordPress, the complete procedure including the database is in [How to Migrate a WordPress Site to a New Host Without Downtime](/how-to-migrate-wordpress-site).

## How to check your DNS records

You do not need special software. These commands are built into most systems.

On Windows:

```
nslookup -type=A example.com
nslookup -type=MX example.com
nslookup -type=TXT example.com
```

On macOS and Linux:

```
dig example.com A +short
dig example.com MX +short
dig example.com TXT +short
dig example.com NS +short
```

To see what a specific public resolver returns, name it at the end. This asks Google's public DNS:

```
dig example.com A +short @8.8.8.8
```

If your computer shows the old address and `8.8.8.8` shows the new one, your local cache is stale. Clear it with `ipconfig /flushdns` on Windows, or wait for the TTL to expire.

## Common DNS mistakes and how to fix them

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Site works without www but not with it | No `www` record | Add a CNAME for `www` pointing at the root domain |
| Email stopped after moving hosts | MX records were not copied to the new nameservers | Recreate the MX and related TXT records |
| Change made but nothing happened | Edited records at a company that is not the active DNS host | Check the NS records and edit at that provider |
| Some visitors see the old site | Old answer still cached | Wait for the previous TTL to expire |
| Site fails only on some mobile networks | Stale AAAA record | Update or remove the AAAA record |
| Mail lands in spam after adding a service | Two SPF records | Merge them into one TXT record |
| SSL certificate will not issue | Domain does not yet resolve to the new server | Confirm the A record, then retry |

That last row comes up often with free certificates. Let's Encrypt has to reach your server through the domain name to confirm you control it, so the A record must be correct first. The steps are in [How to Get a Free SSL Certificate With Let's Encrypt](/free-ssl-certificate-lets-encrypt).

## Should DNS be with your registrar, your host or a separate service?

Any of the three works. The choice affects convenience and risk more than speed for a small site.

- **At the registrar.** Simple and usually free. Good default if you rarely change records.
- **At the web host.** Convenient, since the host often creates records for you. The drawback is that leaving the host means moving DNS at the same moment, which is when records get lost.
- **At a dedicated DNS service.** Keeps DNS independent of both your registrar and your host, so you can change either without touching the other. Several CDN providers include DNS hosting on their free plans.

If you expect to change hosts in the next few years, keeping DNS separate makes that move a single A record edit.

## Frequently asked questions

### What is the difference between an A record and a CNAME?

An A record points a name directly at an IPv4 address, such as 203.0.113.10. A CNAME points a name at another name, and the resolver then looks up that name's address. Use an A record for the root domain and a CNAME for subdomains like www.

### How long do DNS changes take?

A change is visible once the previous record's TTL expires in each resolver's cache. With a TTL of 300 seconds, most visitors see the change within five minutes. With a TTL of 86400, it can take up to 24 hours. Nameserver changes can take up to 48 hours.

### What does the @ symbol mean in DNS?

The @ symbol stands for the root of your domain, also called the apex. In the zone for example.com, a record named @ applies to example.com itself, with no subdomain in front. Some DNS panels ask you to leave the name field blank instead.

### Can I have more than one MX record?

Yes, and it is common. Each MX record has a priority number, and sending servers try the lowest number first. A second record with a higher number acts as a backup if the primary mail server does not respond.

### Will changing my A record affect my email?

No. Email delivery is controlled by MX records, which are separate. Changing only the A record moves your website and leaves email alone. Email is affected if you change nameservers and do not recreate the MX records at the new DNS host.

### Why can I not use a CNAME on my root domain?

DNS rules say a name with a CNAME cannot hold any other records, and the root domain must hold NS and SOA records. Some DNS hosts offer CNAME flattening or ALIAS records as a workaround. Otherwise, use an A record at the root.

### What TTL should I use?

Use 3600 seconds, which is one hour, for everyday records. Lower it to 300 seconds a day before a planned change so the switch happens quickly, then raise it again afterwards. Very low TTLs all the time add extra lookups without much benefit.

## Sources

- [Cloudflare DNS documentation: Time to Live (TTL)](https://developers.cloudflare.com/dns/manage-dns-records/reference/ttl/)
- [Google Workspace Admin Help: Email sender guidelines](https://support.google.com/a/answer/81126?hl=en)
- [Let's Encrypt FAQ](https://letsencrypt.org/docs/faq/)
