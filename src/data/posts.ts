export type PillarId = "hosting" | "wordpress" | "saas";

export type PostType = "Guide" | "Explainer" | "Comparison" | "Tutorial" | "Troubleshooting";

export interface Pillar {
  id: PillarId;
  name: string;
  // URL segment: /hosting-cloud, /wordpress, /saas-tools
  slug: string;
  blurb: string;
  description: string;
}

export interface Post {
  slug: string;
  title: string;
  // Meta description, about 150 to 160 characters
  description: string;
  excerpt: string;
  pillar: PillarId;
  type: PostType;
  keyTakeaways: string[];
  publishedAt: string;
  updatedAt: string;
  readMinutes: number;
  tags: string[];
  // Substantive changes after first publication, newest last
  changelog?: { date: string; note: string }[];
}

export const SITE_URL = "https://codenexon.com";
export const SITE_NAME = "CodeNexon";

export const owner = {
  name: "Quavento Technologies",
  url: "https://quaventotechnologies.com/",
};

export const CONTACT_EMAIL = "info@codenexon.com";

export const author = {
  slug: "shubham-handore",
  name: "Shubham Handore",
  role: "Founder and Tech Writer, CodeNexon",
  bio: "Shubham Handore founded CodeNexon in 2024 and writes its guides on hosting, WordPress and the software small teams use to run a business online.",
  about: [
    "Shubham Handore started CodeNexon in 2024 to give people a plain, jargon-free place to work out technology decisions. He writes every guide on the site.",
    "His focus is the practical side of running a website: choosing and paying for hosting, keeping WordPress fast and backed up, getting DNS and email records right, and picking the tools a small business depends on.",
    "Each guide follows the same rules. Prices and limits are taken from the vendor's own page and carry the date they were checked. Sources are linked at the end of every post. Where a product has not been tested hands-on, the post says so.",
  ],
  expertise: [
    "Web hosting and cloud platforms",
    "WordPress performance and maintenance",
    "DNS, SSL and CDNs",
    "Email deliverability",
    "Payments and SaaS pricing",
    "Next.js deployment",
  ],
  since: "2024",
};

export const pillars: Pillar[] = [
  {
    id: "hosting",
    name: "Hosting & Cloud",
    slug: "hosting-cloud",
    blurb: "Shared, VPS and cloud hosting, developer platforms, DNS, SSL and CDNs.",
    description:
      "Guides to choosing and running web hosting: shared, VPS and cloud plans, developer platforms such as Vercel, Netlify and Firebase, and the DNS, SSL and CDN setup around them. Prices are dated and linked to the vendor's page.",
  },
  {
    id: "wordpress",
    name: "WordPress",
    slug: "wordpress",
    blurb: "Speed, migrations, backups and day-to-day site care.",
    description:
      "Practical WordPress guides: fixing a slow site, moving to a new host without downtime, and setting up backups you can actually restore. Each one lists the exact steps and commands.",
  },
  {
    id: "saas",
    name: "SaaS & Tools",
    slug: "saas-tools",
    blurb: "Email, payments and the software a small business runs on.",
    description:
      "Comparisons and explainers for the software a small business runs on: email marketing tools, email authentication, and payment processing fees, with worked examples using real prices.",
  },
];

const PUBLISHED = "2026-10-06";

export const posts: Post[] = [
  {
    slug: "best-web-hosting-for-small-business",
    title: "Best Web Hosting for Small Business: 2026 Plans Compared",
    description:
      "Small business web hosting compared on real 2026 prices: nine shared plans, VPS and developer platforms, with five-year costs and a five-step way to choose.",
    excerpt:
      "Three plans advertised at $3.99 a month cost $383, $395 and $911 over five years. This hub compares nine shared plans, two VPS providers and three developer platforms, and links to every hosting guide we publish.",
    pillar: "hosting",
    type: "Guide",
    keyTakeaways: [
      "Hostinger Premium has the lowest five-year cost of the nine shared plans compared: $275.40.",
      "Bluehost Starter includes 10 websites, a staging site and a listed 99.99% uptime SLA for $383.40 over five years.",
      "SiteGround StartUp needs only a 12-month commitment, then renews at $17.99 a month.",
      "These plans were compared on published pricing and features. They have not been speed tested by us yet.",
    ],
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    readMinutes: 16,
    tags: ["Web hosting", "Small business", "Buying guide", "Hosting pricing"],
  },
  {
    slug: "how-to-choose-web-hosting",
    title: "How to Choose a Web Hosting Provider: A 9-Point Checklist",
    description:
      "A 9-point checklist for choosing web hosting: renewal price, uptime terms, server location, backups, support and limits, with real 2026 prices as examples.",
    excerpt:
      "Most hosting regret comes from three things: the renewal bill, a slow server far from your visitors, and backups that were never there. This checklist covers all nine checks, with real prices.",
    pillar: "hosting",
    type: "Guide",
    keyTakeaways: [
      "Compare hosts on the renewal price, not the first-term price. Hostinger Premium is $2.99 a month for 48 months, then $10.99.",
      "Pick a data center on the same continent as most of your visitors.",
      "Confirm daily backups and a free restore before you pay.",
      "A 99.9% uptime promise still allows about 8 hours 46 minutes of downtime a year.",
    ],
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    readMinutes: 13,
    tags: ["Web hosting", "Buying guide", "Small business"],
  },
  {
    slug: "shared-vs-vps-vs-cloud-hosting",
    title: "Shared vs VPS vs Cloud Hosting: Which One Do You Need?",
    description:
      "Shared, VPS and cloud hosting compared on price, speed, control and effort, with real 2026 prices from Hostinger, DigitalOcean and Amazon Lightsail.",
    excerpt:
      "Shared hosting is an apartment, a VPS is a townhouse, and cloud hosting is a hotel that bills by the night. Here is how to tell which one your site needs, and when to move.",
    pillar: "hosting",
    type: "Explainer",
    keyTakeaways: [
      "Shared hosting suits new sites and blogs. Entry plans run $3 to $4 a month on long terms.",
      "A VPS gives you fixed resources. A 1 GB DigitalOcean Droplet is $6 a month.",
      "Cloud platforms bill for usage, which is cheap at low traffic and hard to predict at high traffic.",
    ],
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    readMinutes: 11,
    tags: ["Shared hosting", "VPS", "Cloud hosting"],
  },
  {
    slug: "firebase-hosting-vs-vercel-vs-netlify",
    title: "Firebase Hosting vs Vercel vs Netlify for Next.js (2026 Pricing)",
    description:
      "Firebase, Vercel and Netlify compared for Next.js sites: free limits, paid pricing, bandwidth costs and commercial-use rules, checked October 2026.",
    excerpt:
      "All three will host a Next.js site for free at small scale. They differ in what the free tier allows, how bandwidth is billed, and how much of Next.js works without extra setup.",
    pillar: "hosting",
    type: "Comparison",
    keyTakeaways: [
      "Vercel Hobby includes 100 GB of data transfer a month but is meant for personal projects.",
      "Netlify now bills in credits: 300 on Free, 3,000 on the $20 Pro plan, and bandwidth costs 20 credits per GB.",
      "Firebase Hosting's free tier allows 360 MB of transfer a day. Server-rendered Next.js needs App Hosting on the paid Blaze plan.",
    ],
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    readMinutes: 10,
    tags: ["Next.js", "Vercel", "Netlify", "Firebase"],
  },
  {
    slug: "hostinger-vs-bluehost",
    title: "Hostinger vs Bluehost: Price, Limits and Features Compared",
    description:
      "Hostinger vs Bluehost on 2026 prices, renewal rates, websites, storage, email, backups and support. Five-year cost: $275.40 against $383.40.",
    excerpt:
      "Both entry plans cost about $143 at checkout. Hostinger's lasts four years and Bluehost's lasts three. Here is how the two compare on price, limits, email, backups, staging and support.",
    pillar: "hosting",
    type: "Comparison",
    keyTakeaways: [
      "Five-year cost on entry plans: Hostinger Premium $275.40, Bluehost Starter $383.40.",
      "Bluehost Starter allows 10 websites and lists a staging site. Hostinger Premium allows 3.",
      "Hostinger lists mailboxes free for the first year. Bluehost's plan cards did not list email.",
      "Neither host was speed tested for this comparison.",
    ],
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    readMinutes: 11,
    tags: ["Hostinger", "Bluehost", "Web hosting", "Hosting pricing"],
  },
  {
    slug: "web-hosting-renewal-prices",
    title: "Web Hosting Renewal Prices: What $2.99 a Month Really Costs",
    description:
      "Intro vs renewal prices at Hostinger, Bluehost and SiteGround, checked October 2026, with the math for what each plan costs over three and five years.",
    excerpt:
      "The price on a hosting homepage is a first-term discount. We pulled the renewal rates for nine plans at three hosts and worked out what each one costs over five years.",
    pillar: "hosting",
    type: "Guide",
    keyTakeaways: [
      "SiteGround StartUp goes from $3.99 to $17.99 a month at renewal, a 351% increase.",
      "Hostinger's lowest prices need a 48-month prepayment of about $143.52 on Premium.",
      "Bluehost Starter has the smallest jump of the three: $3.99 to $9.99.",
    ],
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    readMinutes: 10,
    tags: ["Hosting pricing", "Hostinger", "Bluehost", "SiteGround"],
  },
  {
    slug: "what-is-ttfb",
    title: "What Is TTFB? Time to First Byte Explained, With Fixes",
    description:
      "TTFB is the time from request to the first byte of the response. Google's good threshold is 0.8 seconds. Here is what it includes and how to lower it.",
    excerpt:
      "Time to First Byte tells you how long a visitor waits before your server sends anything at all. Google calls 0.8 seconds or less good. Here is what makes it slow and what fixes it.",
    pillar: "hosting",
    type: "Explainer",
    keyTakeaways: [
      "Good TTFB is 0.8 seconds or less at the 75th percentile. Poor is above 1.8 seconds.",
      "TTFB is not a Core Web Vital, but a slow one makes a good LCP almost impossible.",
      "Page caching and a CDN fix most slow TTFB without changing hosts.",
    ],
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    readMinutes: 10,
    tags: ["TTFB", "Site speed", "Core Web Vitals"],
  },
  {
    slug: "dns-records-explained",
    title: "DNS Records Explained: A, CNAME, MX and TXT in Plain English",
    description:
      "What A, AAAA, CNAME, MX, TXT and NS records do, how TTL works, and how to point a domain at a new host without losing email. Real record examples included.",
    excerpt:
      "Six record types handle almost everything a small site needs. This guide shows what each one does, what a correct record looks like, and how to switch hosts without breaking email.",
    pillar: "hosting",
    type: "Explainer",
    keyTakeaways: [
      "A and AAAA records point a name at an IP address. CNAME points a name at another name.",
      "MX records route email and are separate from your website records.",
      "Lower the TTL to 300 seconds a day before a migration so the switch takes minutes.",
    ],
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    readMinutes: 10,
    tags: ["DNS", "Domains", "Email setup"],
  },
  {
    slug: "free-ssl-certificate-lets-encrypt",
    title: "How to Get a Free SSL Certificate With Let's Encrypt",
    description:
      "Step-by-step: install a free Let's Encrypt SSL certificate with Certbot on Nginx or Apache, set up auto-renewal, and fix the common errors.",
    excerpt:
      "Let's Encrypt certificates cost nothing and last 90 days. With Certbot you can install one in about ten minutes and never renew it by hand. Here are the exact commands.",
    pillar: "hosting",
    type: "Tutorial",
    keyTakeaways: [
      "Let's Encrypt certificates are free and valid for 90 days. Renew every 60 days.",
      "Certbot installs the certificate and sets up automatic renewal in one command.",
      "Wildcard certificates need the DNS-01 challenge, not the usual HTTP one.",
    ],
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    readMinutes: 9,
    tags: ["SSL", "HTTPS", "Let's Encrypt", "Certbot"],
  },
  {
    slug: "what-is-a-cdn",
    title: "What Is a CDN and Does a Small Website Need One?",
    description:
      "A CDN stores copies of your site on servers near your visitors. Learn how caching works, what it costs in 2026, and when a small site should add one.",
    excerpt:
      "A CDN keeps copies of your files in cities around the world so visitors download them from nearby. For most small sites the free tiers are enough. Here is how it works and what to cache.",
    pillar: "hosting",
    type: "Explainer",
    keyTakeaways: [
      "A CDN cuts the distance data travels, which lowers latency for far-away visitors.",
      "By default most CDNs cache images, CSS and JavaScript but not HTML.",
      "Bandwidth beyond the free tiers runs about $0.13 to $0.15 per GB on developer platforms.",
    ],
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    readMinutes: 10,
    tags: ["CDN", "Caching", "Site speed"],
  },
  {
    slug: "core-web-vitals-explained",
    title: "Core Web Vitals Explained: LCP, INP and CLS in Plain English",
    description:
      "What Core Web Vitals measure, the thresholds Google uses (2.5 s, 200 ms, 0.1), how to check your site for free, and the fixes for each metric.",
    excerpt:
      "Google judges page experience on three numbers: how fast the main content loads, how quickly the page responds, and how much the layout jumps. Here are the targets and how to hit them.",
    pillar: "hosting",
    type: "Explainer",
    keyTakeaways: [
      "Good scores are LCP of 2.5 seconds or less, INP of 200 ms or less and CLS of 0.1 or less.",
      "Each is judged at the 75th percentile of real visits, so three in four must pass.",
      "INP replaced First Input Delay as a Core Web Vital in March 2024.",
      "Hosting affects LCP through server response time. It barely affects INP or CLS.",
    ],
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    readMinutes: 11,
    tags: ["Core Web Vitals", "Site speed", "LCP", "INP", "CLS"],
  },
  {
    slug: "how-to-set-up-a-vps",
    title: "How to Set Up a VPS: 10 Steps to a Secure Ubuntu Server",
    description:
      "Set up a new Ubuntu VPS in 10 steps: sudo user, SSH keys, firewall, automatic updates, fail2ban, swap, Nginx and free HTTPS. Exact commands included.",
    excerpt:
      "A new VPS allows root login with a password and has no firewall. These ten steps, with the exact commands, take about 45 minutes and close the gaps bots look for.",
    pillar: "hosting",
    type: "Tutorial",
    keyTakeaways: [
      "Create a sudo user and switch to SSH keys before changing anything else.",
      "Disable root login and password login once key login is confirmed in a second terminal.",
      "Allow SSH in the firewall before enabling it, or you lock yourself out.",
      "A 1 GiB DigitalOcean Droplet costs $6 a month. Backups are a paid extra.",
    ],
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    readMinutes: 10,
    tags: ["VPS", "Ubuntu", "Server security", "Nginx"],
  },
  {
    slug: "best-vps-hosting-for-developers",
    title: "Best VPS Hosting for Developers: DigitalOcean vs Linode vs Lightsail",
    description:
      "Entry VPS plans compared on real 2026 prices: Linode at $5, DigitalOcean at $6 and Lightsail at $7 for 1 GB, plus backups, overage and how to choose.",
    excerpt:
      "Three well-known providers charge almost the same for a small server. The differences are in the vCPU count, what backups cost and how overage is billed. Here are the plans, line by line.",
    pillar: "hosting",
    type: "Comparison",
    keyTakeaways: [
      "For 1 GB of memory: Linode $5, DigitalOcean $6, Lightsail $7 a month.",
      "At 2 GB and 4 GB all three charge $12 and $24.",
      "Lightsail lists 2 vCPUs on its small plans. The other two list 1.",
      "Backups cost extra. Linode lists $2 a month on its 1 GB plan.",
    ],
    publishedAt: "2026-10-07",
    updatedAt: "2026-10-07",
    readMinutes: 10,
    tags: ["VPS", "DigitalOcean", "Linode", "Amazon Lightsail"],
  },
  {
    slug: "how-to-deploy-nextjs-to-firebase-hosting",
    title: "How to Deploy a Next.js Site to Firebase Hosting for Free",
    description:
      "Deploy a Next.js site to Firebase Hosting on the free plan: static export, firebase.json, custom domain, redirects, preview channels and rollback, step by step.",
    excerpt:
      "Set output to export, point firebase.json at the out folder and run one command. Here is the full process, with the errors CodeNexon hit on its own deploy and how to fix them.",
    pillar: "hosting",
    type: "Tutorial",
    keyTakeaways: [
      "A static export runs on Firebase's free Spark plan: 10 GB storage, 360 MB transfer a day.",
      "Server-side rendering needs Firebase App Hosting on the paid Blaze plan.",
      "Redirects in next.config do not work in a static export. Put them in firebase.json.",
      "Every deploy can be rolled back from the Firebase console in seconds.",
    ],
    publishedAt: "2026-10-07",
    updatedAt: "2026-10-07",
    readMinutes: 10,
    tags: ["Next.js", "Firebase Hosting", "Deployment", "Static export"],
  },
  {
    slug: "how-to-transfer-a-domain",
    title: "How to Transfer a Domain to a New Registrar Without Downtime",
    description:
      "Transfer a domain step by step: unlock it, get the auth code, approve the move, and keep your website and email running. Includes ICANN's 5-day and 60-day rules.",
    excerpt:
      "Unlock the domain, get the authorization code and start the transfer. ICANN's rules give your registrar five days to hand over the code. Here is the full process and how to avoid downtime.",
    pillar: "hosting",
    type: "Tutorial",
    keyTakeaways: [
      "Registrars must provide the auth code within 5 calendar days, under ICANN's Transfer Policy.",
      "A transfer can be refused within 60 days of registration or a previous transfer.",
      "A completed .com transfer adds one year to the registration.",
      "If DNS is hosted at the old registrar, move it first, or the site and email can go offline.",
    ],
    publishedAt: "2026-10-07",
    updatedAt: "2026-10-07",
    readMinutes: 11,
    tags: ["Domains", "Domain transfer", "DNS", "Registrars"],
  },
  {
    slug: "http-security-headers",
    title: "HTTP Security Headers Explained: 6 to Add to Your Website",
    description:
      "What HSTS, Content-Security-Policy, X-Content-Type-Options, X-Frame-Options, Referrer-Policy and Permissions-Policy do, with safe values and Apache, Nginx and Firebase setup.",
    excerpt:
      "Six short headers block whole categories of attack, from HTTPS downgrades to clickjacking. Here is what each does, a safe starting value, and how to add them without breaking your site.",
    pillar: "hosting",
    type: "Explainer",
    keyTakeaways: [
      "Start HSTS with a short max-age and raise it to one year once HTTPS works everywhere.",
      "Run Content-Security-Policy in report-only mode before enforcing it.",
      "X-Content-Type-Options: nosniff is safe to add everywhere today.",
      "Remove version numbers from Server and X-Powered-By headers.",
    ],
    publishedAt: "2026-10-07",
    updatedAt: "2026-10-07",
    readMinutes: 10,
    tags: ["Security headers", "HSTS", "Content-Security-Policy", "Website security"],
  },
  {
    slug: "website-uptime-monitoring",
    title: "Website Uptime Monitoring: How to Know Your Site Is Down First",
    description:
      "How website uptime monitoring works, what to monitor beyond the home page, check intervals explained, and what 99.9% uptime really allows, with free plan details.",
    excerpt:
      "Your host's SLA tells you what credit you can claim, not when your site is down. A free monitor checks every 5 minutes and alerts you first. Here is what to monitor and how to read the numbers.",
    pillar: "hosting",
    type: "Guide",
    keyTakeaways: [
      "UptimeRobot's free plan covers 50 monitors checked every 5 minutes.",
      "99.9% uptime still allows about 8 hours 46 minutes of downtime a year.",
      "Use a keyword monitor to catch pages that load but show an error.",
      "Monitor SSL and domain expiry as well as the home page.",
    ],
    publishedAt: "2026-10-07",
    updatedAt: "2026-10-07",
    readMinutes: 10,
    tags: ["Uptime monitoring", "Website reliability", "UptimeRobot", "SLA"],
  },
  {
    slug: "why-is-my-wordpress-site-slow",
    title: "Why Is My WordPress Site Slow? 12 Fixes in Order",
    description:
      "Twelve fixes for a slow WordPress site, ordered from most likely to least, with the Core Web Vitals targets to aim for and how to measure each change.",
    excerpt:
      "Slow WordPress sites usually share the same four causes: no page cache, oversized images, too many plugins and an old PHP version. Work through these twelve fixes in order.",
    pillar: "wordpress",
    type: "Troubleshooting",
    keyTakeaways: [
      "Measure first. The targets are LCP within 2.5 seconds, INP of 200 ms or less and CLS of 0.1 or less.",
      "Page caching is the single biggest fix for most sites.",
      "WordPress recommends PHP 8.3 or greater. Old PHP versions are slower and unsupported.",
    ],
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    readMinutes: 11,
    tags: ["WordPress speed", "Core Web Vitals", "Caching"],
  },
  {
    slug: "how-to-migrate-wordpress-site",
    title: "How to Migrate a WordPress Site to a New Host Without Downtime",
    description:
      "Move a WordPress site to a new host in eight steps: back up, copy files and database, test on the new server, switch DNS and keep email working.",
    excerpt:
      "A WordPress site is two things: a folder of files and a database. Move both, test on the new server before touching DNS, and visitors never see a gap. Here is the full sequence.",
    pillar: "wordpress",
    type: "Tutorial",
    keyTakeaways: [
      "Lower your DNS TTL to 300 seconds at least 24 hours before the move.",
      "Test the new site with a hosts file entry before you change DNS.",
      "Keep the old hosting account active for at least a week after the switch.",
    ],
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    readMinutes: 11,
    tags: ["WordPress migration", "DNS", "WP-CLI"],
  },
  {
    slug: "how-to-back-up-wordpress-site",
    title: "How to Back Up a WordPress Site: Plugin, Host and Manual Methods",
    description:
      "Three ways to back up WordPress, how often to run them, where to store copies, and how to test a restore. Includes the exact WP-CLI commands.",
    excerpt:
      "A backup you have never restored is a guess. This guide covers the three ways to back up WordPress, the 3-2-1 rule for where to keep copies, and a ten-minute restore test.",
    pillar: "wordpress",
    type: "Tutorial",
    keyTakeaways: [
      "A complete backup has two parts: the wp-content folder and the database.",
      "Follow the 3-2-1 rule: three copies, two kinds of storage, one off-site.",
      "Run a test restore on a staging site at least once a quarter.",
    ],
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    readMinutes: 10,
    tags: ["WordPress backup", "UpdraftPlus", "WP-CLI"],
  },
  {
    slug: "rank-math-vs-yoast",
    title: "Rank Math vs Yoast SEO: Features and Pricing Compared (2026)",
    description:
      "Rank Math vs Yoast SEO: free features, paid pricing, sites covered and how to switch. Yoast Premium is $118.80 a year per site. Rank Math PRO covers unlimited personal sites.",
    excerpt:
      "Yoast SEO Premium costs $118.80 a year for one site. Rank Math PRO covers unlimited personal sites for one fee and includes redirects in its free version. Here is which one fits your setup.",
    pillar: "wordpress",
    type: "Comparison",
    keyTakeaways: [
      "Yoast SEO Premium: $118.80 a year, excluding VAT, for one site.",
      "Rank Math PRO: $107.88 a year regular price, with a first-year discount, for unlimited personal websites.",
      "Rank Math's free version includes a redirect manager and 404 monitoring. Yoast's redirect manager is Premium only.",
      "Run only one SEO plugin at a time.",
    ],
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    readMinutes: 11,
    tags: ["WordPress SEO", "Rank Math", "Yoast SEO", "Plugins"],
  },
  {
    slug: "wordpress-security-checklist",
    title: "WordPress Security Checklist: 15 Steps to Protect Your Site",
    description:
      "A 15-point WordPress security checklist: updates, passwords, two-factor login, backups, file permissions and firewalls, with the exact settings and code.",
    excerpt:
      "Most hacked WordPress sites are broken into through an outdated plugin or a reused password. These fifteen checks close nearly all of that risk, and the first seven take under an hour.",
    pillar: "wordpress",
    type: "Guide",
    keyTakeaways: [
      "Turn on automatic updates for WordPress, plugins and themes.",
      "Use two-factor authentication on every administrator account.",
      "Keep 30 days of backups off the server and test a restore each quarter.",
      "Folders should be 755 and files 644. Nothing should be 777.",
    ],
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    readMinutes: 13,
    tags: ["WordPress security", "Two-factor authentication", "Backups", "Hardening"],
  },
  {
    slug: "301-vs-302-redirects",
    title: "301 vs 302 Redirects: Which to Use and How to Set Them Up",
    description:
      "When to use a 301 or 302 redirect, how Google treats each, and how to set them up on Apache, Nginx and WordPress without chains or loops.",
    excerpt:
      "A 301 says a page has moved for good. A 302 says it will be back. Pick the wrong one and the wrong address can sit in search results for months. Here is how to choose and set them up.",
    pillar: "wordpress",
    type: "Explainer",
    keyTakeaways: [
      "Use 301 for permanent moves and 302 for temporary ones.",
      "Google treats 301 and 308 as permanent, and 302, 303 and 307 as temporary.",
      "Point old addresses straight at the final page to avoid redirect chains.",
      "Keep redirects for at least a year, and indefinitely for pages with outside links.",
    ],
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    readMinutes: 11,
    tags: ["Redirects", "SEO", "Apache", "Nginx"],
  },
  {
    slug: "how-much-does-a-website-cost",
    title: "How Much Does a Website Cost? Real 2026 Prices, Line by Line",
    description:
      "What a website costs in 2026: domain, hosting, themes, plugins, email and payment fees, with three worked budgets from $59 to $370 a year.",
    excerpt:
      "A do-it-yourself business site costs about $59 in its first year. With premium tools it runs about $370 a year. Here is every line, with real prices and three budgets you can adapt.",
    pillar: "wordpress",
    type: "Guide",
    keyTakeaways: [
      "A .com domain costs about $11 a year. Porkbun lists $11.08 with no renewal increase.",
      "Shared hosting costs $48 to $144 at checkout and $120 to $216 a year at renewal.",
      "WordPress, SSL and the essential plugins are free.",
      "For a store, payment fees of about 3% to 4.5% of sales outweigh every other cost.",
    ],
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    readMinutes: 12,
    tags: ["Website cost", "Small business", "Domains", "Hosting pricing"],
  },
  {
    slug: "best-wordpress-hosting-for-beginners",
    title: "Best WordPress Hosting for Beginners: Shared vs Managed Plans",
    description:
      "WordPress hosting for beginners compared on 2026 prices: shared plans from $2.99 a month and managed plans from $28, with what each includes and who needs which.",
    excerpt:
      "A first WordPress site runs well on a $3 to $4 shared plan. Managed hosting costs about ten times as much. Here is what each includes, what it costs over time, and when the upgrade is worth it.",
    pillar: "wordpress",
    type: "Guide",
    keyTakeaways: [
      "Shared hosting at $2.99 to $3.99 a month is enough for a new WordPress site.",
      "Bluehost Starter lists a staging site and a 99.99% uptime SLA on its entry plan.",
      "Managed hosting starts at $28 a month at WP Engine and $30 to $35 at Kinsta.",
      "These plans were compared on published features. We have not speed tested them.",
    ],
    publishedAt: "2026-10-07",
    updatedAt: "2026-10-07",
    readMinutes: 10,
    tags: ["WordPress hosting", "Managed WordPress", "Beginners", "Kinsta", "WP Engine"],
  },
  {
    slug: "image-optimization-webp-avif",
    title: "Image Optimization for the Web: Resize, WebP, AVIF and Lazy Loading",
    description:
      "How to optimize website images: resize to display size, convert to WebP or AVIF, compress, set width and height, and lazy load correctly. WordPress steps included.",
    excerpt:
      "A 4 MB phone photo can become a 230 KB WebP with no visible difference. Here is how to resize, convert and compress images, and write image tags that help Core Web Vitals.",
    pillar: "wordpress",
    type: "Tutorial",
    keyTakeaways: [
      "Resize first. A 1,600 pixel image has 16% of the pixels of a 4,000 pixel one.",
      "Google's web.dev recommends WebP and AVIF over JPEG and PNG where possible.",
      "Always set width and height to prevent layout shift.",
      "Lazy load images below the fold, never the main image at the top.",
    ],
    publishedAt: "2026-10-07",
    updatedAt: "2026-10-07",
    readMinutes: 10,
    tags: ["Image optimization", "WebP", "AVIF", "Site speed"],
  },
  {
    slug: "wordpress-staging-site",
    title: "How to Create a WordPress Staging Site and Push Changes Safely",
    description:
      "Three ways to create a WordPress staging site, how to lock it down, and how to push changes to live without overwriting orders, comments or users.",
    excerpt:
      "A staging site lets you test updates privately before visitors see them. Here are three ways to create one, the settings that stop it emailing real customers, and the safe way to push changes live.",
    pillar: "wordpress",
    type: "Tutorial",
    keyTakeaways: [
      "Use your host's one-click staging tool if it has one.",
      "Password-protect staging and set it to noindex.",
      "Block email and switch payments to test mode on staging.",
      "Never push a staging database over a live store. Orders since the copy will be lost.",
    ],
    publishedAt: "2026-10-07",
    updatedAt: "2026-10-07",
    readMinutes: 10,
    tags: ["WordPress staging", "WordPress maintenance", "WP-CLI", "Testing"],
  },
  {
    slug: "schema-markup-guide",
    title: "Schema Markup Explained: Structured Data That Actually Helps",
    description:
      "What schema markup is, which types are worth adding, what changed for FAQ and HowTo in 2023, and how to add and test JSON-LD on WordPress and other sites.",
    excerpt:
      "Schema markup labels your content so search engines know what it is. Here is which types are worth adding, what Google stopped showing in 2023, and how to test your markup.",
    pillar: "wordpress",
    type: "Guide",
    keyTakeaways: [
      "Use JSON-LD, Google's recommended format.",
      "Mark up only information visitors can see on the page.",
      "Since August 2023, FAQ rich results show mainly for authoritative government and health sites.",
      "Google stopped showing HowTo rich results in September 2023.",
    ],
    publishedAt: "2026-10-07",
    updatedAt: "2026-10-07",
    readMinutes: 10,
    tags: ["Schema markup", "Structured data", "JSON-LD", "SEO"],
  },
  {
    slug: "xml-sitemap-robots-txt-guide",
    title: "XML Sitemaps and Robots.txt Explained: What Google Uses",
    description:
      "How XML sitemaps and robots.txt work, Google's limits (50,000 URLs, 500 KiB), why robots.txt does not stop indexing, and how to set both up correctly.",
    excerpt:
      "A sitemap lists the pages you want found. Robots.txt says what crawlers may request. Google ignores priority and changefreq, and robots.txt does not keep pages out of results. Here is what works.",
    pillar: "wordpress",
    type: "Explainer",
    keyTakeaways: [
      "Google limits a sitemap to 50,000 URLs or 50 MB uncompressed.",
      "Google ignores priority and changefreq, and uses lastmod only when it is accurate.",
      "Robots.txt stops crawling, not indexing. Use noindex to keep a page out of results.",
      "Google does not support crawl-delay.",
    ],
    publishedAt: "2026-10-07",
    updatedAt: "2026-10-07",
    readMinutes: 10,
    tags: ["XML sitemap", "Robots.txt", "Technical SEO", "Crawling"],
  },
  {
    slug: "mailerlite-vs-mailchimp",
    title: "MailerLite vs Mailchimp: Pricing and Limits Compared (2026)",
    description:
      "MailerLite vs Mailchimp on free plan limits, paid pricing, automation and send caps, checked October 2026. See which fits a list under 1,000 subscribers.",
    excerpt:
      "Both free plans now stop at 250 contacts, but MailerLite lets you send 2,500 emails a month to Mailchimp's 500 and includes automation. Here is the full comparison.",
    pillar: "saas",
    type: "Comparison",
    keyTakeaways: [
      "MailerLite Free: 250 subscribers, 2,500 emails a month, 3 automations.",
      "Mailchimp Free: 250 contacts, 500 emails a month, no automation.",
      "Paid plans start at $12 a month for MailerLite Comfort and about $13 for Mailchimp Essentials.",
    ],
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    readMinutes: 11,
    tags: ["Email marketing", "MailerLite", "Mailchimp"],
  },
  {
    slug: "spf-dkim-dmarc-explained",
    title: "SPF, DKIM and DMARC Explained: Stop Your Email Going to Spam",
    description:
      "What SPF, DKIM and DMARC do, the exact DNS records to add, and Gmail's sender rules: authentication for everyone and a spam rate below 0.3%.",
    excerpt:
      "Gmail requires every sender to authenticate with SPF or DKIM, and anyone sending 5,000 or more messages a day needs all three records. Here are the records, with examples you can copy.",
    pillar: "saas",
    type: "Explainer",
    keyTakeaways: [
      "SPF lists who may send for your domain. DKIM signs each message. DMARC tells receivers what to do when both fail.",
      "Gmail's bulk sender rules start at 5,000 messages a day.",
      "Keep your spam complaint rate below 0.3% in Google Postmaster Tools.",
    ],
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    readMinutes: 11,
    tags: ["Email deliverability", "SPF", "DKIM", "DMARC"],
  },
  {
    slug: "stripe-vs-paypal-fees",
    title: "Stripe vs PayPal Fees: What You Pay on a $50 Sale (2026)",
    description:
      "Stripe and PayPal US fees compared with worked examples on $10, $50 and $500 sales, plus international, dispute and currency conversion costs.",
    excerpt:
      "On a $50 US card sale you keep $48.25 with Stripe and $47.76 with PayPal Checkout. The gap grows on small payments. Here is the math for each fee.",
    pillar: "saas",
    type: "Comparison",
    keyTakeaways: [
      "Stripe's US online card rate is 2.9% plus 30 cents.",
      "PayPal Checkout is 3.49% plus 49 cents. Standard card payments are 2.99% plus 49 cents.",
      "PayPal's higher fixed fee hurts most on sales under $20.",
    ],
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    readMinutes: 10,
    tags: ["Payments", "Stripe", "PayPal", "Fees"],
  },
  {
    slug: "utm-parameters-guide",
    title: "UTM Parameters Explained: How to Track Campaigns in GA4",
    description:
      "What UTM parameters are, which ones GA4 requires, how to name and build tagged links, where to find the data, and the mistakes that corrupt it.",
    excerpt:
      "Without tags, visits from email and messaging apps show up as unexplained direct traffic. UTM parameters fix that. Here is how to name them, build links and read the results in GA4.",
    pillar: "saas",
    type: "Tutorial",
    keyTakeaways: [
      "GA4 lists utm_source, utm_medium and utm_campaign as required.",
      "Values are case sensitive. Use lowercase everywhere.",
      "Stick to standard mediums such as email, cpc and social so GA4 can group channels.",
      "Never put UTM tags on links inside your own site.",
    ],
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    readMinutes: 10,
    tags: ["Analytics", "GA4", "UTM parameters", "Campaign tracking"],
  },
  {
    slug: "mailchimp-alternatives",
    title: "Mailchimp Alternatives: 5 Email Tools With Bigger Free Plans",
    description:
      "Five Mailchimp alternatives compared on 2026 free limits and prices: Sender, EmailOctopus, Kit, beehiiv and MailerLite, with which suits which list.",
    excerpt:
      "Mailchimp's free plan stops at 250 contacts and 500 emails. Sender and EmailOctopus give you 2,500 subscribers free, and Kit goes to 10,000. Here is how five alternatives compare.",
    pillar: "saas",
    type: "Comparison",
    keyTakeaways: [
      "Sender is free to 2,500 subscribers and 15,000 emails a month, with automation.",
      "Kit is free up to 10,000 subscribers, without visual automations.",
      "MailerLite is the closest all-round swap, from $12 a month.",
      "Free plans from Sender, EmailOctopus and beehiiv carry the provider's branding.",
    ],
    publishedAt: "2026-10-07",
    updatedAt: "2026-10-07",
    readMinutes: 12,
    tags: ["Email marketing", "Mailchimp", "Kit", "beehiiv", "Sender"],
  },
  {
    slug: "google-search-console-setup",
    title: "How to Set Up Google Search Console and Use Its Reports",
    description:
      "Set up Google Search Console in 15 minutes: Domain property, DNS verification, sitemap submission, and the reports that show what to fix next.",
    excerpt:
      "Search Console is the only place to see which Google searches your site appears for. Here is how to verify a Domain property, submit your sitemap and turn the reports into fixes.",
    pillar: "saas",
    type: "Tutorial",
    keyTakeaways: [
      "Use a Domain property, which covers every subdomain and both HTTP and HTTPS.",
      "Domain properties can only be verified with a DNS TXT record.",
      "Never remove the verification record. Search Console checks it periodically.",
      "Pages ranking 8 to 20 are the quickest wins to improve.",
    ],
    publishedAt: "2026-10-07",
    updatedAt: "2026-10-07",
    readMinutes: 9,
    tags: ["Google Search Console", "SEO", "Indexing", "Sitemaps"],
  },
  {
    slug: "ga4-setup-guide",
    title: "How to Set Up Google Analytics 4: The Settings Most Sites Miss",
    description:
      "Set up Google Analytics 4 step by step: property, data stream and tag, then data retention, internal traffic, key events and Search Console linking.",
    excerpt:
      "Installing the GA4 tag takes ten minutes. Four settings decide whether the data is useful a year later: retention, internal traffic, key events and Search Console. Here is the full setup.",
    pillar: "saas",
    type: "Tutorial",
    keyTakeaways: [
      "Universal Analytics stopped processing data on July 1, 2023.",
      "Set data retention to the longest option. It affects explorations, not standard reports.",
      "Filter out your own visits with an internal traffic rule.",
      "Visitors who decline consent are not counted, so GA4 undercounts real traffic.",
    ],
    publishedAt: "2026-10-07",
    updatedAt: "2026-10-07",
    readMinutes: 10,
    tags: ["Google Analytics 4", "Analytics", "Key events", "Consent"],
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getPillar(id: PillarId) {
  return pillars.find((pillar) => pillar.id === id) as Pillar;
}

export function getPillarBySlug(slug: string) {
  return pillars.find((pillar) => pillar.slug === slug);
}

export function postsByPillar(id: PillarId) {
  return posts.filter((post) => post.pillar === id);
}

// URL helpers: posts live under their category, e.g. /hosting-cloud/what-is-ttfb
export function pillarPath(pillar: Pillar) {
  return `/${pillar.slug}`;
}

export function postPath(post: Post) {
  return `/${getPillar(post.pillar).slug}/${post.slug}`;
}

export function postImagePath(post: Post) {
  return `/blog-image/${post.slug}`;
}

export const authorPath = `/author/${author.slug}`;

export const GUIDES_PATH = "/guides";

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
