Most hacked WordPress sites are compromised through an outdated plugin, a weak or reused password, or an abandoned theme, not through WordPress itself. You can close nearly all of that risk with fifteen checks: keep everything updated, remove what you do not use, use strong passwords with two-factor authentication, limit login attempts, keep tested backups off the server, and lock down a few files. The first seven take under an hour and cost nothing.

> **How this guide was researched.** The settings, constants and commands here are documented WordPress features and standard server configuration. Version recommendations come from WordPress.org's requirements page, linked under Sources. Plugins are named as widely used examples, and we have not run comparative tests on security plugins for this post. Take a backup before changing files or configuration.

## Why WordPress sites get hacked

WordPress runs a large share of the web, so attackers automate. A bot does not choose your site. It scans millions of addresses looking for one of a few known weaknesses and breaks in wherever it finds one. That is good news in one respect: you do not need to out-think a determined attacker. You need to not be the easy target.

The common ways in, roughly in order:

1. **Vulnerable plugins and themes.** A flaw is published, a fix is released, and sites that have not updated are attacked within days.
2. **Stolen or guessed passwords.** Reused passwords from other breaches, or simple ones tried by brute force.
3. **Nulled software.** "Free" copies of paid plugins and themes that carry a backdoor.
4. **Compromised hosting accounts.** A weak control panel password, or another site in the same account being infected.
5. **Misconfiguration.** Writable files, exposed backups and debug output left on.

Every item in the checklist below addresses at least one of these.

## The 15-point WordPress security checklist

| # | Check | Time | Cost |
|---|-------|------|------|
| 1 | Turn on automatic updates | 5 minutes | Free |
| 2 | Delete unused plugins and themes | 10 minutes | Free |
| 3 | Use unique, long passwords | 10 minutes | Free |
| 4 | Enable two-factor authentication | 10 minutes | Free |
| 5 | Review user accounts and roles | 5 minutes | Free |
| 6 | Limit login attempts | 5 minutes | Free |
| 7 | Set up off-site backups and test a restore | 20 minutes | Free |
| 8 | Force HTTPS everywhere | 5 minutes | Free |
| 9 | Run a current PHP version | 5 minutes | Free |
| 10 | Disable file editing in the dashboard | 2 minutes | Free |
| 11 | Fix file permissions and protect wp-config.php | 10 minutes | Free |
| 12 | Block PHP execution in uploads | 5 minutes | Free |
| 13 | Restrict XML-RPC if you do not use it | 5 minutes | Free |
| 14 | Add a firewall or security plugin | 15 minutes | Free to paid |
| 15 | Secure the hosting account itself | 10 minutes | Free |

## Part 1: The essentials

### 1. Turn on automatic updates

Updates are the single most effective defense, because most attacks use flaws that already have a fix.

WordPress applies minor core and security releases automatically by default. Extend that to plugins and themes:

- Go to **Plugins**, and click "Enable auto-updates" beside each plugin.
- Go to **Appearance, Themes**, open your active theme and enable auto-updates there.
- Under **Dashboard, Updates**, confirm the site is set to receive automatic updates for all new versions of WordPress, or at least maintenance and security releases.

People worry that an automatic update will break the site. It occasionally does, and a broken page for an hour is a far smaller problem than a hacked site. Backups, covered in point 7, are what make automatic updates safe.

### 2. Delete unused plugins and themes

A deactivated plugin still sits on the server, and its files can still be attacked. Remove anything you are not using.

- Delete inactive plugins, not just deactivate them.
- Keep your active theme and one default theme as a fallback. Delete the rest.
- Replace any plugin that has not been updated in over a year or has been removed from the WordPress.org directory.
- Never install nulled plugins or themes. A pirated copy of a paid plugin is the most reliable way to give someone else control of your site.

### 3. Use unique, long passwords

Password guessing works because people reuse passwords. If your WordPress password was also used on a site that was breached, it is on a list that bots try automatically.

- Use a password manager and let it generate a random password of at least 16 characters for every administrator.
- Never reuse a password between WordPress, your hosting account and your email.
- Do not use "admin" as a username. If you have one, create a new administrator with a different name, log in as that user and delete the old account, assigning its content to the new one.

### 4. Enable two-factor authentication

Two-factor authentication asks for a code from your phone as well as the password. A stolen password alone is then useless.

Install a two-factor plugin such as Two-Factor, WP 2FA or the feature included in Wordfence, and enable it for every administrator and editor. Use an authenticator app in preference to SMS. Save the backup codes in your password manager, or you can lock yourself out when you change phones.

If you do only one thing from this list beyond updates, do this.

### 5. Review user accounts and roles

Every account is a way in. Open **Users** and check each one.

| Role | Can do | Give it to |
|------|--------|-----------|
| Administrator | Everything, including installing plugins and editing users | As few people as possible |
| Editor | Publish and edit all posts and pages | People who manage content |
| Author | Publish and edit their own posts | Regular writers |
| Contributor | Write posts but not publish them | Guest writers |
| Subscriber | Manage their own profile | Members and customers |

Remove accounts for people who have left. Downgrade anyone who has more access than their job needs. A freelance developer who needed administrator rights for a week should not still have them a year later.

### 6. Limit login attempts

By default WordPress lets anyone try passwords as often as they like. A login limiter blocks an address after a set number of failures.

Install Limit Login Attempts Reloaded or use the equivalent feature in a security plugin. A reasonable setting is a lockout of 20 minutes after four or five failed attempts, with longer lockouts for repeat offenders. Many hosts also do this at the server level.

### 7. Set up off-site backups and test a restore

Backups do not prevent an attack. They decide whether an attack costs you an afternoon or the whole site.

- Back up the database daily and files weekly, more often for a store.
- Store copies somewhere other than your web server, such as Google Drive, Dropbox or Amazon S3.
- Keep at least 30 days of copies. Infections are often discovered weeks late.
- Restore a backup to a test site once a quarter to prove it works.

The full method, including a ten-minute restore test, is in [How to Back Up a WordPress Site](/how-to-back-up-wordpress-site).

## Part 2: Hardening the site

### 8. Force HTTPS everywhere

Without HTTPS, your password crosses the network in readable form every time you log in. A free certificate from Let's Encrypt removes that risk, and most hosts install one automatically.

Once the certificate is active, set both addresses under **Settings, General** to begin with `https://`, and force the dashboard to use it by adding this to `wp-config.php`:

```
define( 'FORCE_SSL_ADMIN', true );
```

If you manage your own server, see [How to Get a Free SSL Certificate With Let's Encrypt](/free-ssl-certificate-lets-encrypt).

### 9. Run a current PHP version

WordPress.org recommends PHP 8.3 or greater, with MySQL 8.0 or greater, or MariaDB 10.11 or greater. Older PHP versions eventually stop receiving security fixes, which leaves known flaws open permanently.

Check your version under **Tools, Site Health, Info, Server**, and change it in your hosting control panel. Test on a staging copy first if you run older plugins. A current PHP version is also faster, as we cover in [Why Is My WordPress Site Slow?](/why-is-my-wordpress-site-slow).

### 10. Disable file editing in the dashboard

WordPress includes an editor that lets administrators change plugin and theme code from the browser. If an attacker gets into an administrator account, that editor is the quickest way to plant malicious code. Turn it off by adding one line to `wp-config.php`, above the line that says "That's all, stop editing":

```
define( 'DISALLOW_FILE_EDIT', true );
```

You can still edit files over SFTP. You lose nothing you should be using on a live site.

### 11. Fix file permissions and protect wp-config.php

Permissions decide who can read and change each file. The standard for WordPress is 755 for folders and 644 for files. Nothing should be 777, which lets anyone write to it.

With SSH access, from the WordPress folder:

```
find . -type d -exec chmod 755 {} \;
find . -type f -exec chmod 644 {} \;
chmod 600 wp-config.php
```

The last line restricts `wp-config.php`, which holds your database password, so that only the file's owner can read it. On some shared hosts 600 is too strict and 640 or 644 is required. If the site shows a database error after the change, use 640.

On Apache you can also deny web access to the file by adding this to `.htaccess`:

```
<Files wp-config.php>
    Require all denied
</Files>
```

While you are in `wp-config.php`, check that the eight authentication keys and salts are filled with long random strings, not placeholder text. The official generator at api.wordpress.org/secret-key/1.1/salt/ creates a fresh set. Replacing them logs everyone out, which is also a useful step after a suspected break-in.

### 12. Block PHP execution in uploads

The uploads folder should contain images and documents, never code. A common attack uploads a PHP file disguised as an image and then runs it. Stop that by telling the server not to execute PHP there.

On Apache, create a file at `wp-content/uploads/.htaccess` containing:

```
<FilesMatch "\.(php|phtml|php[0-9])$">
    Require all denied
</FilesMatch>
```

On Nginx, add this inside the site's `server` block and reload:

```
location ~* ^/wp-content/uploads/.*\.php$ {
    deny all;
}
```

### 13. Restrict XML-RPC if you do not use it

XML-RPC is an older remote access feature at `/xmlrpc.php`. The WordPress mobile app and Jetpack use it. It also lets an attacker try many passwords in a single request, which sidesteps simple login limits.

If you use neither the mobile app nor Jetpack, block it. On Apache:

```
<Files xmlrpc.php>
    Require all denied
</Files>
```

If you do use them, leave it on and rely on two-factor authentication and a security plugin that rate-limits XML-RPC.

### 14. Add a firewall or security plugin

A web application firewall filters malicious requests before they reach WordPress. There are two kinds.

| Type | Where it runs | Examples | Good to know |
|------|---------------|----------|--------------|
| Plugin firewall | On your server, inside WordPress | Wordfence, Solid Security, All-In-One Security | Free versions cover most small sites. Uses some server resources |
| Cloud firewall | In front of your server, at the network edge | Cloudflare, Sucuri | Blocks traffic before it reaches you, and usually includes a CDN |

A free plugin firewall with malware scanning is enough for most small sites. Use one security plugin, not several, since they overlap and conflict. If you already use a CDN, check what firewall features it includes before adding another layer. [What Is a CDN and Does a Small Website Need One?](/what-is-a-cdn) explains the setup.

A security plugin adds to the basics above. It does not replace updates, strong passwords or backups.

### 15. Secure the hosting account itself

The hosting control panel sits above WordPress. Whoever controls it controls every site in the account, the database and the backups.

- Use a unique password and two-factor authentication on the hosting account and on the email address that can reset it.
- Use SFTP or SSH, never plain FTP, which sends passwords unencrypted.
- Do not host a neglected test site alongside your main site. An infection in one can spread to others in the same account.
- Delete old backups, `.sql` files and zip archives from public folders.
- Turn off debug output on the live site. In `wp-config.php`, `WP_DEBUG` should be `false`.

If your host makes any of this hard, or still defaults to an old PHP version, that is worth weighing when you next compare providers. See [How to Choose a Web Hosting Provider](/how-to-choose-web-hosting).

## A monthly security routine

Security is maintenance. Fifteen minutes a month catches most problems early.

1. Log in and confirm that updates are applying. Clear anything pending.
2. Review the user list for accounts you do not recognize.
3. Check that the latest backup exists in your off-site storage and has a sensible file size.
4. Run a malware scan with your security plugin.
5. Look at the security plugin's log for unusual activity, such as logins from unexpected countries.
6. Remove any plugin you stopped using this month.

Once a quarter, add a test restore of your backup.

## How to tell if your site has been hacked

| Sign | What it may mean |
|------|------------------|
| Visitors redirected to unrelated sites | Malicious code injected into files or the database |
| New administrator accounts you did not create | An attacker has access |
| Google shows "This site may be hacked" or a browser warning | The site has been flagged for malware or phishing |
| Unfamiliar files in the WordPress folders | A backdoor |
| Sudden slowness or a suspension notice from your host | The site is sending spam or being used in attacks |
| Search results showing strange text for your pages | Spam content injected for search engines |

## What to do if your site is hacked

Work through this in order, and do not skip the password changes.

1. **Put the site in maintenance mode** or ask your host to take it offline, so visitors are not exposed.
2. **Take a backup of the hacked state.** It sounds odd, but it preserves evidence and any recent content.
3. **Restore a clean backup** from before the infection. This is the fastest reliable fix, and the reason you keep 30 days of copies.
4. **If you have no clean backup,** reinstall WordPress core from **Dashboard, Updates**, delete and reinstall every plugin and theme from the original source, and scan what remains.
5. **Change every password:** all WordPress users, the database, SFTP, the hosting account and the related email accounts.
6. **Replace the keys and salts** in `wp-config.php` to end all existing sessions.
7. **Delete unknown users** and check that the remaining ones have the right roles.
8. **Update everything** and find the way in. Usually it is an outdated plugin, which you should replace or remove.
9. **Request a review** in Google Search Console if the site was flagged.

If the infection returns after a cleanup, a backdoor was missed. At that point a professional cleanup service, or moving to a fresh hosting account and restoring only content you have checked, is the dependable route. [How to Migrate a WordPress Site](/how-to-migrate-wordpress-site) covers the move.

## Frequently asked questions

### Is WordPress secure?

WordPress core is actively maintained and receives regular security releases. Most compromises come from outdated plugins and themes, weak or reused passwords, and pirated software. A site that is kept updated, uses strong passwords with two-factor authentication and has tested backups is at low risk.

### What is the most important WordPress security step?

Keeping WordPress, plugins and themes updated, since most attacks use flaws that already have a fix. Enable automatic updates for all three. After that, turn on two-factor authentication for every administrator and keep backups stored away from the web server.

### Do I need a WordPress security plugin?

A security plugin is useful but not sufficient by itself. It adds a firewall, login limits and malware scanning. It cannot protect a site running outdated plugins or weak passwords. Install one, and treat it as an extra layer on top of updates, strong logins and backups.

### How do I know if my WordPress site has been hacked?

Common signs are visitors being redirected to other sites, administrator accounts you did not create, browser or Google warnings, unfamiliar files in the WordPress folders, and a suspension notice from your host. Run a malware scan with a security plugin and check the user list.

### Should I disable XML-RPC in WordPress?

Disable it if you do not use the WordPress mobile app, Jetpack or another tool that depends on it. XML-RPC allows many password attempts in one request, which helps brute-force attacks. If you need it, keep it on and use two-factor authentication.

### What file permissions should WordPress use?

Folders should be 755 and files 644. The wp-config.php file can be tightened to 600 or 640 so that other accounts on the server cannot read your database password. Nothing should be set to 777, which allows anyone to write to the file.

### How often should I back up a WordPress site?

Back up the database daily and the files weekly for a typical site, and more often for an online store. Keep at least 30 days of copies in storage separate from your web server, and restore one to a test site every quarter to confirm it works.

## Sources

- [WordPress.org server requirements](https://wordpress.org/about/requirements/)
- [WordPress.org documentation: Hardening WordPress](https://developer.wordpress.org/advanced-administration/security/hardening/)
- [WordPress.org documentation: Roles and capabilities](https://wordpress.org/documentation/article/roles-and-capabilities/)
- [Let's Encrypt FAQ](https://letsencrypt.org/docs/faq/)
