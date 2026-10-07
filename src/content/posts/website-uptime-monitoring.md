Website uptime monitoring checks your site from outside every few minutes and alerts you when it stops responding, so you find out before your customers do. A free plan is enough for most small sites: UptimeRobot's free tier covers 50 monitors checked every 5 minutes, with email alerts and a public status page. Paid plans shorten the check interval to 60 seconds or less and add alerts in Slack and other tools.

This guide explains what monitoring catches, how check intervals affect what you see, what to monitor besides the home page, and how to read uptime percentages.

> **How this guide was researched.** Plan details were read from UptimeRobot's pricing page on October 7, 2026 and are linked under Sources. UptimeRobot is used as the worked example because its plans are published in full. Downtime figures are our own arithmetic. We have not compared monitoring services on accuracy for this post.

## Why you need monitoring even if your host has an SLA

Your host may promise 99.9% or 99.99% uptime, but that promise does not tell you when your site is down. It tells you what credit you can claim afterwards, and usually only if you notice and file a request.

Hosts also measure their own servers. Your site can be broken while the server is fine: an expired SSL certificate, a plugin error that shows a blank page, a full disk, a DNS mistake or a domain that lapsed. Only a check from outside, behaving like a visitor, sees what your customers see.

And without monitoring, you usually learn about an outage from a customer, hours after it started.

## What an uptime monitor actually does

A monitor sends a request to your site from its own servers on a fixed schedule. If the response is wrong, it checks again, often from a second location to rule out a local network fault, and then alerts you. When the site recovers, it tells you that too, along with how long the outage lasted.

| Monitor type | What it checks | Use it for |
|--------------|----------------|------------|
| HTTP(S) | The page returns a success code, usually 200 | Your home page and key pages |
| Keyword | A specific word appears, or does not appear, on the page | Catching pages that load but show an error |
| Ping | The server answers a network ping | Servers without a website |
| Port | A specific port accepts connections | Mail servers, databases you host |
| SSL certificate | The certificate is valid and when it expires | Avoiding the certificate warning page |
| Domain expiry | When the domain registration ends | Avoiding a lapsed domain |
| Heartbeat (cron) | Your own job checks in on schedule | Backups and scheduled tasks |

## Check intervals: what 5 minutes really means

The check interval is how often the monitor looks. It sets two things: how quickly you hear about a problem, and how short an outage can be and still go unseen.

| Interval | Worst-case delay before the first failed check | Checks per day |
|----------|-----------------------------------------------|----------------|
| 5 minutes | Up to 5 minutes | 288 |
| 60 seconds | Up to 1 minute | 1,440 |
| 30 seconds | Up to 30 seconds | 2,880 |
| 15 seconds | Up to 15 seconds | 5,760 |

Most monitors confirm a failure before alerting, so add a minute or two to those delays.

A 5-minute interval can also miss short outages entirely. If your site goes down at 10:01 and recovers at 10:04, a monitor checking at 10:00 and 10:05 sees nothing. For a brochure site that is acceptable. For a store taking orders, a 60-second interval is worth paying for.

## What monitoring costs: UptimeRobot as an example

| Plan | Price | Monitors | Interval | Status pages |
|------|-------|----------|----------|--------------|
| Free | $0 | 50 | 5 minutes | 1 |
| Solo | $9 a month annually, $10 monthly | 10, or 50 with annual billing | 60 seconds | 3 |
| Team | $35 a month annually, $41 monthly | 100 | 30 seconds | 100 |
| Scale | $65 a month annually, $77 monthly | 200 to 500 | 15 seconds | Unlimited |
| Enterprise | Custom | Custom | Custom | Unlimited |

The free plan lists alerts by email, SMS, voice call and email-to-SMS. Solo adds Slack, Mattermost, Telegram and Microsoft Teams. Team and Scale add webhooks, Zapier and PagerDuty.

For a small business, the free plan covers the essentials and the Solo plan at $108 a year is the sensible upgrade if minutes matter. Compare that with the cost of an outage. On a store taking $10,000 a month, an average hour is worth about $14 in sales, and outages rarely come at an average hour.

Other services work the same way with similar tiers. What follows applies to any of them.

## What to monitor

Monitoring only the home page is the most common mistake. The home page is often cached and survives problems that break everything else.

### For a business website

1. **The home page** over HTTPS.
2. **One inner page that is not cached,** such as a contact page or a search results page, so a backend fault shows up.
3. **A keyword check** on an important page for a phrase that only appears when the page renders correctly, such as your phone number.
4. **The SSL certificate,** with an alert 14 days before expiry.
5. **The domain registration,** with an alert 30 days before expiry.

### For an online store, add

6. **A product page,** checked for the "Add to cart" text.
7. **The checkout page** loading, without completing a purchase.

### For a server you manage, add

8. **A ping or port check** on the server itself.
9. **A heartbeat for your backup job,** which alerts you if the backup stops running.

That heartbeat catches a silent failure that monitoring of the website never will. A backup script that has quietly failed for six weeks is a common discovery after an incident. [How to Back Up a WordPress Site](/how-to-back-up-wordpress-site) includes a backup script you can add a check-in to.

## Keyword monitoring: catching pages that load but are broken

A page can return a success code while showing an error. WordPress's "There has been a critical error on this website" message, a blank page from a PHP fault, or a hosting suspension notice can all come back with a 200 code. An HTTP check reports the site as up.

A keyword monitor fixes that. Choose a phrase that only appears when the page is working, such as a line from your footer or your business name in the main heading. Set the monitor to alert when the phrase is missing.

You can also use it the other way round: alert when a phrase appears, such as "Error establishing a database connection".

## Setting up alerts that you will act on

Alerts are only useful if they reach someone who can respond.

- **Send alerts to two people,** so one being on holiday does not mean an outage goes unseen.
- **Use a channel you check.** If you live in Slack, an email alert sits unread. SMS and push notifications get attention fastest.
- **Wait for confirmation.** Most services let you require two or three failed checks before alerting, which removes false alarms from brief network blips.
- **Turn on recovery alerts** so you know when to stop investigating.
- **Pause monitors during planned maintenance,** or you train yourself to ignore the alerts.

## Status pages

A status page is a public page showing whether your services are up. UptimeRobot's free plan includes one. It does two jobs: customers can check it instead of emailing you during an outage, and it shows a public history of your reliability.

Put it on a subdomain such as `status.example.com`. If your main site and your status page are hosted in the same place, they go down together, so use the monitoring service's hosted page rather than a page on your own server.

## Reading uptime percentages

Percentages hide how much downtime they allow. This is what each level means over a year and a month.

| Uptime | Downtime per year | Downtime per month |
|--------|-------------------|--------------------|
| 99% | 3 days 15 hours 36 minutes | 7 hours 18 minutes |
| 99.5% | 1 day 19 hours 48 minutes | 3 hours 39 minutes |
| 99.9% | 8 hours 46 minutes | 43 minutes 48 seconds |
| 99.95% | 4 hours 23 minutes | 21 minutes 54 seconds |
| 99.99% | 52 minutes 34 seconds | 4 minutes 23 seconds |

A year has 8,760 hours, and a month averages 730. Multiply by the fraction of downtime allowed: 0.1% of 8,760 hours is 8.76 hours, which is 8 hours 46 minutes.

Your monitor's figure is only as fine as its interval. A 5-minute monitor cannot measure 99.99% reliably, since a single missed check accounts for most of a month's allowance at that level.

## When the monitor alerts: a first-response checklist

1. **Open the site yourself** in a private window, and on your phone using mobile data, not Wi-Fi.
2. **Read the error.** A certificate warning, a DNS error, a 500 error and a blank page each point somewhere different.
3. **Check your host's status page** for a wider outage.
4. **Check recent changes.** A plugin update, a DNS edit or a deploy in the last hour is the likely cause.
5. **Look at the monitor's response details,** which usually show the status code and response time before the failure.
6. **Roll back the last change** if there was one. That is faster than diagnosing.
7. **Post on your status page** if the outage will last more than a few minutes.
8. **Write down what happened** once it is fixed: start time, cause, fix and how you will prevent it.

## Monitoring response time, not just up or down

Most monitors also record how long each check took. A site that is technically up but takes eight seconds to respond is down for most visitors.

Watch the trend. A response time that creeps upward over weeks often means a growing database, a plugin problem or an overloaded shared server, and you can fix it before it becomes an outage. Google's guidance for Time to First Byte is 0.8 seconds or less. [What Is TTFB?](/what-is-ttfb) explains what drives it and [Why Is My WordPress Site Slow?](/why-is-my-wordpress-site-slow) lists the fixes.

If response times are consistently poor at certain hours, that is evidence to bring to your host, or a reason to compare options in [Shared vs VPS vs Cloud Hosting](/shared-vs-vps-vs-cloud-hosting).

## Using monitoring data with your host

Your monitoring history is your evidence when your host's SLA is breached. If your plan promises 99.9% and your monitor shows two hours of downtime in a month, which is well over the 44-minute allowance, you have the dates and durations to claim a credit.

Check how your host defines downtime first. Most exclude scheduled maintenance and problems caused by your own code or plugins, and most require you to file within a set number of days. We explain how to read those terms in [How to Choose a Web Hosting Provider](/how-to-choose-web-hosting).

## Frequently asked questions

### What is website uptime monitoring?

It is a service that checks your website from outside on a fixed schedule, such as every 5 minutes, and alerts you by email, SMS or chat when the site stops responding or returns an error. It also records the length of each outage and your overall uptime.

### Is there a free uptime monitor?

Yes. UptimeRobot's free plan, as listed in October 2026, includes 50 monitors checked every 5 minutes, alerts by email, SMS, voice call and email-to-SMS, and one status page. Paid plans shorten the interval to 60 seconds or less.

### How often should I check my website's uptime?

Every 5 minutes is enough for most brochure sites and blogs. Online stores and sites where a few minutes of downtime costs money should check every 60 seconds. Shorter intervals also catch brief outages that a 5-minute check can miss completely.

### How much downtime does 99.9% uptime allow?

99.9% uptime allows about 8 hours and 46 minutes of downtime a year, or about 44 minutes a month. 99.99% allows about 53 minutes a year, or 4 minutes 23 seconds a month.

### What should I monitor besides my home page?

Monitor an uncached inner page, a keyword on a key page so errors that still return a success code are caught, your SSL certificate expiry, your domain expiry, and for a store, a product page and the checkout page. Add a heartbeat check for backup jobs.

### What is a keyword monitor?

A keyword monitor loads a page and checks whether a specific word or phrase is present. It catches pages that load with a success code but show an error, such as a critical error message or a blank page, which a basic HTTP check would report as up.

### Do I need a status page?

A status page helps once you have customers who depend on your site. It shows current status and outage history, so people check it instead of contacting you during an incident. Host it separately from your main site so it stays online when the site does not.

## Sources

Plan details were read on October 7, 2026.

- [UptimeRobot pricing](https://uptimerobot.com/pricing/)
- [web.dev: Time to First Byte](https://web.dev/articles/ttfb)
