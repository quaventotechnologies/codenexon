SPF, DKIM and DMARC are three DNS records that prove an email really comes from your domain. SPF lists the servers allowed to send for you. DKIM adds a digital signature to each message. DMARC tells receiving mail servers what to do when a message fails both checks, and sends you reports. Without them, your newsletters and invoices are far more likely to land in spam, and Gmail now requires them.

This guide explains each record in plain English, gives examples you can adapt, and shows a safe order for setting them up.

> **How this guide was researched.** Gmail's sender requirements are quoted from Google's Email sender guidelines, read on October 6, 2026 and linked under Sources. Record syntax follows the published standards for SPF, DKIM and DMARC. Example values use placeholder domains. Copy the exact records from your own email provider's setup screen.

## What Gmail requires from senders

Google publishes its rules, and they apply to anyone sending to Gmail addresses.

| Requirement | All senders | Bulk senders (5,000 or more messages a day) |
|-------------|-------------|---------------------------------------------|
| SPF or DKIM authentication | Required, at least one | Both required |
| DMARC record | Recommended | Required. A policy of `p=none` is accepted |
| From domain aligned with SPF or DKIM | Recommended | Required |
| TLS connection for sending | Required | Required |
| Valid forward and reverse DNS for sending IPs | Required | Required |
| Spam rate in Postmaster Tools | Below 0.3% | Below 0.3% |
| One-click unsubscribe for marketing email | Recommended | Required |
| Messages formatted to RFC 5322 | Required | Required |

Two points are easy to miss. First, the basic rules apply to everyone, including a business that sends twenty emails a day from its own domain. Second, the bulk threshold is 5,000 messages a day to Gmail accounts, and other large mailbox providers have published similar requirements.

If you send through a service such as Google Workspace, Microsoft 365, MailerLite or Mailchimp, that service handles TLS, reverse DNS and message formatting. Your part is the three DNS records.

## How the three records work together

Think of a letter arriving at an office.

- **SPF** is the reception desk checking that the courier is on the approved list.
- **DKIM** is a tamper-proof seal on the envelope that only your company could have made.
- **DMARC** is the written policy telling reception what to do with a letter that has no seal and came with an unknown courier: accept it, set it aside or refuse it. It also asks reception to send you a daily log.

| Record | Question it answers | Where it lives in DNS |
|--------|---------------------|-----------------------|
| SPF | Is this server allowed to send for this domain? | TXT record on the root domain |
| DKIM | Was this message signed by the domain and left unchanged? | TXT or CNAME record at `selector._domainkey` |
| DMARC | What should happen when the checks fail, and who gets the report? | TXT record at `_dmarc` |

All three are published as DNS records. If you have not edited DNS before, read [DNS Records Explained](/dns-records-explained) first.

## SPF: who may send for your domain

SPF stands for Sender Policy Framework. It is a single TXT record listing every service that sends email using your domain.

### An SPF record, piece by piece

```
v=spf1 include:_spf.google.com include:servers.mcsv.net ~all
```

| Part | Meaning |
|------|---------|
| `v=spf1` | This is an SPF record |
| `include:_spf.google.com` | Google Workspace may send for this domain |
| `include:servers.mcsv.net` | Mailchimp may send for this domain |
| `~all` | Anything else should be treated as suspicious (soft fail) |

The ending matters. `~all` is a soft fail, which marks unlisted senders as suspect. `-all` is a hard fail, which tells receivers to reject them. Start with `~all`. Once DMARC reports show every legitimate sender passing, you can move to `-all`.

### How to add SPF

1. List every service that sends email as your domain: your mailbox provider, newsletter tool, invoicing software, help desk, website contact form and store platform.
2. Find each one's SPF `include` value in its setup documentation.
3. Combine them into one record and add it as a TXT record on the root domain, with the name `@`.

### Three SPF rules that cause most failures

**One SPF record per domain.** Two separate TXT records beginning with `v=spf1` make SPF fail for every message. If you add a second service, edit the existing record instead of creating another.

Wrong:

```
v=spf1 include:_spf.google.com ~all
v=spf1 include:servers.mcsv.net ~all
```

Right:

```
v=spf1 include:_spf.google.com include:servers.mcsv.net ~all
```

**No more than 10 DNS lookups.** Each `include`, `a`, `mx` and `redirect` in the record counts as a lookup, and so do the lookups inside each included record. Past ten, SPF returns a permanent error. Remove services you no longer use.

**SPF checks the hidden return address, not the From line.** SPF validates the bounce address, also called the envelope sender or Return-Path. That address often belongs to your email service, not to you. This is why SPF alone does not protect the From address your readers see, and why DKIM and DMARC are needed.

## DKIM: a signature on every message

DKIM stands for DomainKeys Identified Mail. Your sending service signs each outgoing message with a private key that only it holds. The matching public key is published in your DNS. The receiving server uses the public key to confirm two things: the message was signed by your domain, and it was not altered on the way.

### What a DKIM record looks like

DKIM records live at a name made of a selector, then `._domainkey`, then your domain. The selector is a label chosen by the sending service, which lets several services each have their own key.

```
Name:   google._domainkey.example.com
Type:   TXT
Value:  v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...
```

The long string after `p=` is the public key. You do not write it yourself. Your provider generates it.

Many newsletter tools ask for CNAME records instead, so they can rotate keys without your involvement:

```
Name:   k1._domainkey.example.com
Type:   CNAME
Value:  dkim.mailservice.example
```

### How to add DKIM

1. In your email service, open the domain authentication or sender settings.
2. Generate the DKIM record. Choose a 2048-bit key if you are offered a choice.
3. Copy the name and value exactly into your DNS as a TXT or CNAME record, whichever the service specifies.
4. Return to the service and click its verify or "start authentication" button.

Repeat this for each service that sends as your domain. Unlike SPF, there is no limit of one. Each service gets its own selector and its own record.

A common mistake is pasting the full name, such as `google._domainkey.example.com`, into a DNS panel that adds the domain automatically. The result is `google._domainkey.example.com.example.com`, which never verifies. If your panel appends the domain, enter only `google._domainkey`.

## DMARC: the policy and the reports

DMARC stands for Domain-based Message Authentication, Reporting and Conformance. It builds on the other two. A message passes DMARC when it passes SPF or DKIM, and the domain that passed matches the domain in the visible From address. That matching is called alignment.

Alignment is the part that closes the gap. A scammer can pass SPF for their own domain while putting your domain in the From line. DMARC catches that, because the two domains do not match.

### A DMARC record, piece by piece

```
v=DMARC1; p=none; rua=mailto:dmarc-reports@example.com
```

| Tag | Meaning |
|-----|---------|
| `v=DMARC1` | This is a DMARC record |
| `p=none` | Policy: take no action on failures, only report |
| `rua=mailto:...` | Where to send daily summary reports |

Add it as a TXT record with the name `_dmarc`.

### The three DMARC policies

| Policy | What receivers do with failing mail | When to use it |
|--------|-------------------------------------|----------------|
| `p=none` | Deliver as normal and report | While you find and fix every sender |
| `p=quarantine` | Send to spam | Once legitimate mail passes consistently |
| `p=reject` | Refuse the message | Final state. Full protection against spoofing |

Google accepts `p=none` as meeting its requirement for bulk senders. It is the right place to start, and a poor place to stay, because it offers no protection against someone forging your domain.

### Other useful DMARC tags

- `pct=25` applies the policy to a percentage of failing mail, which lets you tighten gradually.
- `sp=reject` sets a separate policy for subdomains.
- `adkim=s` and `aspf=s` demand an exact domain match for alignment. The default, relaxed, also accepts subdomains and is fine for most senders.

A stricter record, once you are confident:

```
v=DMARC1; p=reject; rua=mailto:dmarc-reports@example.com; adkim=r; aspf=r
```

## A safe setup order

Rushing to a strict policy is how businesses block their own invoices. Follow this sequence.

1. **Inventory your senders.** Write down every tool that sends email as your domain. Check with whoever handles billing, support and the website. Forgotten senders are the main cause of trouble later.
2. **Publish SPF** with every sender included, ending in `~all`.
3. **Turn on DKIM** for each sending service.
4. **Publish DMARC at `p=none`** with a reporting address.
5. **Read the reports for two to four weeks.** Reports arrive as XML files, which are hard to read directly. Free and paid DMARC report tools turn them into a table of sending sources with pass and fail counts.
6. **Fix whatever fails.** Usually this is a service missing from SPF or without DKIM enabled.
7. **Move to `p=quarantine`**, optionally starting at `pct=25` and raising it over a few weeks.
8. **Move to `p=reject`** once failures are limited to senders you do not recognize.

Steps 1 to 4 can be done in an afternoon and satisfy Gmail's requirements. Steps 5 to 8 are what actually stop other people from sending email in your name.

## How to check that it works

### Send yourself a test

Send an email from your domain to a Gmail address. Open it, click the three-dot menu and choose "Show original". Near the top you will see a summary like this:

```
SPF:    PASS with IP 203.0.113.25
DKIM:   'PASS' with domain example.com
DMARC:  'PASS'
```

All three should say PASS. Check that the DKIM domain is your own domain and not your email service's. If it shows the service's domain, DKIM is working but not aligned, and you still need to complete domain authentication in that service.

### Look up the records

```
dig example.com TXT +short
dig google._domainkey.example.com TXT +short
dig _dmarc.example.com TXT +short
```

On Windows, use `nslookup -type=TXT` followed by the same names. The first command should show exactly one line beginning with `v=spf1`.

### Watch your spam rate

Sign up for Google Postmaster Tools and verify your domain. It shows the percentage of your mail that Gmail users mark as spam. Google's requirement is to keep that rate below 0.3%. On a send to 1,000 people, three complaints puts you at the line.

## Common problems and fixes

| Symptom | Cause | Fix |
|---------|-------|-----|
| SPF shows PERMERROR | Two SPF records, or more than 10 lookups | Merge into one record. Remove unused includes |
| SPF passes but DMARC fails | SPF passed for the email service's domain, not yours | Enable DKIM with your own domain, or set a custom return path |
| DKIM never verifies | Record name has the domain appended twice, or the key was cut off | Re-enter the record exactly. Check the full key was pasted |
| Contact form emails go to spam | The website sends mail directly from the web server | Send through an authenticated SMTP service using a plugin |
| Forwarded mail fails SPF | Forwarding changes the sending server | Rely on DKIM, which survives forwarding |
| Mail rejected after moving to `p=reject` | A legitimate sender was never authenticated | Return to `p=quarantine`, fix the sender, try again |

The contact form row deserves attention. WordPress sends form notifications through the web server by default, which is rarely listed in your SPF record and does not sign with DKIM. An SMTP plugin that routes mail through your authenticated email service fixes it.

## Beyond authentication: what else affects deliverability

Passing all three checks gets your mail considered. It does not guarantee the inbox. These habits matter as much.

- **Send only to people who asked.** Purchased lists produce complaints, and complaints are the fastest way past 0.3%.
- **Make unsubscribing easy.** Bulk senders must offer one-click unsubscribe. Every sender benefits, because the alternative to an easy unsubscribe is the spam button.
- **Remove addresses that bounce or never open.** A smaller engaged list performs better than a large stale one.
- **Warm up a new domain or tool.** Start with small sends to your most engaged readers and increase over a couple of weeks.
- **Keep the From address consistent.** Use the same sending domain for the same type of mail.

If you are choosing a newsletter tool, both of the ones we compared in [MailerLite vs Mailchimp](/mailerlite-vs-mailchimp) guide you through domain authentication during setup.

## Frequently asked questions

### Do I need SPF, DKIM and DMARC?

Gmail requires every sender to set up SPF or DKIM. Anyone sending 5,000 or more messages a day to Gmail accounts must have all three. Small senders benefit from all three as well, since together they improve inbox placement and stop others from forging your domain.

### What is the difference between SPF and DKIM?

SPF checks whether the server that sent a message is on your domain's approved list. DKIM checks a cryptographic signature added to the message itself. SPF breaks when mail is forwarded. DKIM survives forwarding, because the signature travels with the message.

### What DMARC policy should I start with?

Start with p=none and a reporting address. That policy changes nothing about delivery and sends you reports showing who sends mail as your domain. After two to four weeks of clean reports, move to p=quarantine, and later to p=reject.

### Can I have two SPF records?

No. A domain must have exactly one SPF record. Two records cause a permanent error and SPF fails for all mail. If you use several sending services, put all of their include values into a single record that ends with one all mechanism.

### Why are my emails going to spam with SPF and DKIM set up?

Authentication is only one factor. Check that DMARC passes with your own domain aligned, that your spam complaint rate in Google Postmaster Tools is below 0.3%, and that you send only to people who subscribed. Content, list quality and sending history all count.

### How long do SPF, DKIM and DMARC take to work?

The records work as soon as they are visible in DNS, which usually takes a few minutes to an hour depending on the TTL. Verification buttons in email services can take longer to update. DMARC reports start arriving within one to two days.

### What spam rate does Gmail allow?

Google's sender guidelines say to keep the spam rate reported in Postmaster Tools below 0.3%. That is three complaints for every 1,000 messages delivered to Gmail inboxes. Staying well under that level leaves room for the occasional bad send.

## Sources

- [Google Workspace Admin Help: Email sender guidelines](https://support.google.com/a/answer/81126?hl=en)
- [Google Postmaster Tools](https://postmaster.google.com/)
- [RFC 7208: Sender Policy Framework](https://datatracker.ietf.org/doc/html/rfc7208)
- [RFC 6376: DomainKeys Identified Mail Signatures](https://datatracker.ietf.org/doc/html/rfc6376)
- [RFC 7489: DMARC](https://datatracker.ietf.org/doc/html/rfc7489)
