To transfer a domain to a new registrar, unlock it at your current registrar, request the authorization code (also called an EPP or auth code), and start the transfer at the new registrar using that code. Under ICANN's Transfer Policy your current registrar must give you the code within five calendar days, and if it does not respond to the transfer request within five days, the transfer is approved by default. For a .com, the transfer usually adds one year to your registration.

This guide covers each step, the 60-day rule that blocks most early transfers, what it costs, and how to keep your website and email running throughout.

> **How this guide was researched.** The rules quoted here come from ICANN's Transfer Policy for generic top-level domains such as .com, .net and .org, linked under Sources. Country-code domains like .uk or .in follow their own registry's rules. The price example uses Porkbun's published .com rate, read on October 6, 2026.

## Why move a domain at all?

The most common reasons are money and control.

- **Renewal price.** Many registrars discount the first year and charge much more afterwards. Porkbun, for example, lists a .com at $11.08 a year for both registration and renewal, with WHOIS privacy included. A registrar renewing at $20 or more costs you the difference every year.
- **Privacy charges.** Some registrars still charge for WHOIS privacy, which hides your name and address from the public register.
- **Keeping things separate.** If your domain is registered with your web host, leaving the host means moving the domain too. Holding the domain at an independent registrar makes changing hosts a single DNS edit. [How to Choose a Web Hosting Provider](/how-to-choose-web-hosting) explains why that matters.
- **Consolidation.** Managing ten domains at one registrar is easier than at four.

## Transferring a domain is not the same as moving a website

People mix these up, and it causes needless worry.

| You are changing | What actually moves | Website affected? |
|------------------|---------------------|-------------------|
| Registrar | The company you pay for the domain name | No, if DNS stays the same |
| DNS host | Where your DNS records are stored | Only if records are copied incorrectly |
| Web host | The server your site files live on | Yes. That is a site migration |

A registrar transfer on its own changes who you pay. Your website and email keep working as long as your nameservers and DNS records stay the same. This guide is about the registrar. If you are also moving the website, see [How to Migrate a WordPress Site to a New Host](/how-to-migrate-wordpress-site), and do the two jobs at different times.

## The rules that decide whether you can transfer

ICANN's Transfer Policy sets the rules for generic domains. These are the parts that affect you.

| Rule | What it means for you |
|------|-----------------------|
| Auth code within 5 days | Your registrar must provide the authorization code within five calendar days of your request |
| Default approval after 5 days | If your current registrar does not respond to the registry within five calendar days, the transfer is approved |
| 60 days after registration | A registrar may deny a transfer requested within 60 days of the domain's creation |
| 60 days after a transfer | A registrar may deny a transfer within 60 days of a previous transfer |
| One-year extension | A completed transfer adds one year to the registration, up to the 10-year maximum |

The policy also lists the other reasons a registrar can refuse: evidence of fraud, a dispute over who owns the domain, unpaid fees, or an express objection from the domain's owner. A registrar must refuse if the domain is subject to a pending dispute proceeding or a court order.

### The 60-day rule in practice

If you registered the domain last month, or moved it to its current registrar last month, expect to wait. Most registrars apply the 60-day restriction, and it is the single most common reason a transfer is rejected.

Some registrars also lock a domain for 60 days after you change the owner's name, organization or email address. They are allowed to let you opt out of that lock when you make the change, so if you need to update contact details and then transfer, ask before you edit anything.

## What a transfer costs

For most generic domains, you pay the new registrar for one year of registration, and that year is added to the time you already have. Nothing is lost.

Here is an example. Your domain expires on March 1, 2027, and you transfer it in October 2026 to a registrar charging $11.08 for a .com. After the transfer, the domain expires on March 1, 2028. You paid $11.08 and gained a year.

Some registrars add a small fee on top, and some country-code domains transfer without adding a year. Check the transfer price on the new registrar's page before you start, and compare it with their renewal price. A low transfer price followed by an expensive renewal leaves you no better off.

The losing registrar does not refund unused time, but because the year is added rather than replaced, there is nothing to refund.

## Before you start: a checklist

1. **Check the dates.** The domain must be older than 60 days and not transferred in the last 60 days.
2. **Check the expiry date.** Do not leave a transfer until the last week. If the domain expires during the process, you can end up in a renewal or recovery fee at the old registrar. Start at least 15 days before expiry.
3. **Confirm your contact email works.** The approval messages go to the email address on the domain record. If that is an old address, update it first, bearing in mind the 60-day change lock above.
4. **Record your DNS.** Take a full copy of every record: A, AAAA, CNAME, MX, TXT. See [DNS Records Explained](/dns-records-explained) for what each one does.
5. **Find out where your DNS is hosted.** Look up your nameservers. If they belong to your old registrar, your DNS records may stop working when the domain leaves. More on this below.
6. **Turn off auto-renew at the old registrar** only after the transfer completes, not before.

## Step-by-step: transferring a domain

### Step 1: Unlock the domain

Log in at your current registrar and find the domain's settings. Look for **Domain lock**, **Registrar lock** or **Transfer lock**, and switch it off. Registrars turn this on by default to stop unauthorized transfers, and a locked domain cannot move.

### Step 2: Turn off privacy if your registrar requires it

Most registrars no longer need this, because current rules send transfer messages without exposing your details. Some older systems still block transfers while privacy is on. If the new registrar's transfer fails to find your contact email, this is the likely cause.

### Step 3: Get the authorization code

At the current registrar, request the **authorization code**, **auth code** or **EPP code**. It is a string of letters, numbers and symbols, often 8 to 16 characters long, that proves you control the domain.

Some registrars show it on screen. Others email it to the domain's contact address. Under ICANN's policy they must provide it within five calendar days of your request. Treat it like a password.

### Step 4: Start the transfer at the new registrar

At the new registrar, choose **Transfer a domain**, enter the domain name and paste the authorization code. You pay for the transfer at this point.

### Step 5: Approve the transfer

You will usually receive one or two emails:

- One from the new registrar asking you to confirm you started the transfer.
- One from the old registrar giving you the option to approve it now or cancel it.

Approving at the old registrar speeds things up. If you do nothing, the transfer generally completes on its own after five days, because a registrar that does not respond is treated as approving.

### Step 6: Wait, then check

Most .com transfers complete within about five to seven days, and sometimes within hours if you approve at the old registrar. When it finishes, the domain appears in your new registrar's account with the new expiry date.

Check three things the same day:

1. The expiry date has moved forward by a year.
2. The nameservers are the ones you expect.
3. Your website loads and a test email arrives.

## Keeping your website and email running

This is where transfers go wrong, and it is entirely avoidable.

**If your nameservers point at your web host or a DNS service** such as Cloudflare, nothing changes during a registrar transfer. The nameservers travel with the domain. Your records stay where they are.

**If your nameservers belong to the old registrar,** your DNS records live on the old registrar's servers. Once the domain leaves, the old registrar may stop serving those records, and your website and email go offline. To prevent that:

1. Before the transfer, recreate every DNS record at your new DNS host. That might be the new registrar, your web host or a dedicated DNS service.
2. Compare the two sets of records line by line. MX and TXT records for email are the ones most often missed.
3. Change the nameservers to the new DNS host and wait at least 24 to 48 hours.
4. Confirm the site and email still work.
5. Only then start the registrar transfer.

Doing DNS first and the transfer second means each change can be tested on its own. If email stops after step 3, you know exactly where to look.

If email authentication records go missing in the move, messages from your domain may start landing in spam. [SPF, DKIM and DMARC Explained](/spf-dkim-dmarc-explained) lists what should be there.

## How to check a transfer's progress

Every registrar shows the status in its dashboard. You can also look at the public registration data for the domain:

```
whois example.com
```

On Windows without a `whois` command, use the lookup tool at lookup.icann.org. The output lists the registrar, the expiry date and the status codes.

Status codes you might see:

| Status | Meaning |
|--------|---------|
| `clientTransferProhibited` | The domain is locked at the registrar. Unlock it to transfer |
| `pendingTransfer` | A transfer is in progress |
| `ok` | No restrictions |
| `redemptionPeriod` | The domain expired and was not renewed. Recovery costs extra |

If you still see `clientTransferProhibited` after unlocking, wait an hour and check again. Some registrars take a little time to update the registry.

## Common transfer problems

| Problem | Likely cause | Fix |
|---------|--------------|-----|
| "Domain is locked" | Registrar lock still on | Unlock it at the current registrar |
| "Invalid authorization code" | Old, mistyped or expired code | Request a new code and copy it exactly |
| Transfer rejected | Within 60 days of registration or a previous transfer | Wait until the 60 days have passed |
| Approval email never arrives | Out-of-date contact email, or privacy blocking delivery | Update the email, or turn off privacy temporarily |
| Website down after transfer | DNS was hosted at the old registrar | Recreate records at a new DNS host and update nameservers |
| Email stopped after transfer | MX records not copied | Add the MX and related TXT records |
| Transfer stuck for over a week | Waiting for approval at one end | Contact both registrars with the domain name and dates |

## Transferring several domains

If you are moving a batch, most registrars let you paste several domains and codes at once. Do one low-stakes domain first, a spare one if you have it, to learn both registrars' process. Then move the rest, leaving your main business domain until last.

Keep a simple table as you go: domain, expiry date, nameservers, auth code requested, transfer started, transfer completed. It turns a confusing week of emails into a checklist.

## After the transfer

- **Turn on the registrar lock** again at the new registrar.
- **Enable auto-renew** and check the card on file, so the domain cannot lapse.
- **Turn on two-factor authentication** for the registrar account. Whoever controls the registrar account controls your domain, your website and your email.
- **Close or empty the old account** once you are sure nothing else is there.
- **Put the renewal date in your calendar** anyway. Auto-renew fails when cards expire.

A domain is the one part of a website you cannot replace if it is lost. It is worth ten minutes to protect.

## Frequently asked questions

### How long does a domain transfer take?

Most .com transfers complete in about five to seven days. Under ICANN's Transfer Policy, a transfer is approved by default if the current registrar does not respond within five calendar days. Approving the transfer at your current registrar can finish it within hours.

### Why can't I transfer my domain within 60 days?

ICANN's Transfer Policy allows registrars to deny a transfer requested within 60 days of a domain's registration or within 60 days of a previous transfer. Most registrars apply this restriction. Some also lock a domain for 60 days after the owner's contact details change.

### What is an EPP or authorization code?

An EPP code, also called an auth code or authorization code, is a password-like string that proves you control a domain. You get it from your current registrar and enter it at the new one. ICANN requires registrars to provide it within five calendar days of a request.

### Does transferring a domain cause downtime?

Not if your DNS is hosted somewhere other than the old registrar, because the nameservers stay the same. If your DNS records are hosted at the old registrar, recreate them at a new DNS host and switch nameservers before starting the transfer.

### Do I lose the time left on my registration when I transfer?

No. For generic domains such as .com, a completed transfer adds one year to the existing registration, up to the 10-year maximum. If your domain expires in March 2027 and you transfer it in October 2026, it will then expire in March 2028.

### How much does it cost to transfer a domain?

Usually the price of one year's registration at the new registrar, which is added to your current term. Porkbun listed a .com at $11.08 a year for registration and renewal in October 2026. Compare the renewal price as well as the transfer price.

### Can I transfer a domain that is about to expire?

Yes, but start at least 15 days before the expiry date. If the domain expires during the transfer, you may have to renew it at the old registrar first, and a domain past expiry can enter a redemption period that costs extra to recover.

## Sources

- [ICANN Transfer Policy](https://www.icann.org/resources/pages/transfer-policy-2016-06-01-en)
- [ICANN Lookup](https://lookup.icann.org/)
- [Porkbun .com pricing](https://porkbun.com/tld/com)
