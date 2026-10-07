To back up a WordPress site, you need a copy of two things: the files in the `wp-content` folder and the database. You can get both with a backup plugin, with your host's built-in backups, or manually with two commands. Whichever you choose, store at least one copy somewhere other than your web server, and restore it once to prove it works.

This guide explains all three methods, how often to run backups, where to keep them, and a ten-minute restore test.

> **How this guide was researched.** The commands are standard WP-CLI, tar and MySQL commands that you can run on your own server. The plugins named are free and widely used. We have not timed or ranked backup plugins for this post. Check current feature lists on each plugin's page before relying on a specific feature.

## What needs to be backed up?

| Item | Contains | Can it be recreated without a backup? |
|------|----------|---------------------------------------|
| Database | Posts, pages, comments, users, orders, settings | No |
| `wp-content/uploads` | Every image and file you uploaded | No |
| `wp-content/themes` | Your theme and any child theme edits | Only if you never customized it |
| `wp-content/plugins` | Installed plugins | Mostly. They can be downloaded again, but versions may differ |
| `wp-config.php` | Database credentials, security keys, custom settings | Partly. Easy to rebuild, annoying to lose |
| `.htaccess` or Nginx config | Redirects and rewrite rules | Only if you remember every rule |
| WordPress core files | The software itself | Yes. Download it from WordPress.org |

The first two rows are irreplaceable. If you back up nothing else, back up the database and the uploads folder.

A database-only backup is not enough. It restores your posts with broken images. A files-only backup restores your images with no posts to put them in.

## How often should you back up?

Match the schedule to how much you can afford to lose. Ask one question: if the site disappeared now, how many hours of changes would hurt?

| Type of site | Database | Files | Keep for |
|--------------|----------|-------|----------|
| Brochure site, updated a few times a year | Weekly | Monthly | 3 months |
| Blog with a few posts a week | Daily | Weekly | 30 days |
| Busy blog with active comments | Daily | Daily | 30 days |
| Online store or membership site | Hourly or real time | Daily | 30 to 90 days |

Also take a manual backup right before any of these:

- Updating WordPress core, your theme or several plugins at once.
- Changing the PHP version.
- Moving to a new host.
- Editing theme files or `wp-config.php`.

Keeping backups for 30 days matters more than it seems. Malware and silent data corruption are often noticed weeks later. If you keep only the last three days, every copy you have may already contain the problem.

## The 3-2-1 rule: where to keep backups

The 3-2-1 rule is the standard for backups of any kind:

- **3** copies of your data in total, including the live site.
- **2** different kinds of storage.
- **1** copy off-site, away from the original.

For a WordPress site, that works out as:

1. The live site on your web server.
2. A backup at your host or on the same server, for fast restores.
3. A backup in cloud storage that your host cannot touch, such as Google Drive, Dropbox, Amazon S3 or Backblaze B2.

The third copy is the one that saves you. Backups stored only on the same server share its fate. A hacked account, a failed disk, a billing dispute or a host going out of business can take the site and every backup together.

## Method 1: Use a backup plugin

A plugin is the best choice for most site owners. It runs on a schedule, sends copies to remote storage and restores from inside WordPress.

### Setting up UpdraftPlus (free version)

UpdraftPlus is one of the most widely installed backup plugins, and its free version covers scheduled backups to remote storage.

1. In WordPress, go to Plugins, Add New, search for "UpdraftPlus" and install and activate it.
2. Open Settings, UpdraftPlus Backups, then the Settings tab.
3. Set the **files backup schedule** and the **database backup schedule** using the table above. For a typical blog, choose weekly for files and daily for the database.
4. Set how many backups to retain. With a daily database backup, retaining 30 gives you a month.
5. Choose a **remote storage** destination, such as Google Drive or Dropbox, and follow the prompts to authorize it.
6. Under "Include in files backup", leave plugins, themes and uploads ticked.
7. Save, then return to the first tab and click **Backup Now** to run the first one.
8. Confirm the files arrived by looking in the remote storage account itself.

That last check matters. A plugin that reports success while the upload quietly fails is the classic way people discover they have no backups.

### Other plugins worth knowing

| Plugin | How it works | Good to know |
|--------|--------------|--------------|
| UpdraftPlus | Scheduled backups to your own cloud storage | Free version covers most needs. Incremental backups are a paid feature |
| Duplicator | Builds a single archive plus an installer script | Popular for migrations as well as backups |
| BackWPup | Scheduled backups to several storage services | Free version available |
| Jetpack VaultPress Backup | Real-time backups stored on Jetpack's servers | Paid subscription. Suits stores that cannot lose orders |
| BlogVault | Incremental backups on its own servers, with staging | Paid subscription |

Use one backup plugin, not several. Two plugins running at once compete for server resources and can cause both to time out.

### Limits of plugin backups

- On large sites, building an archive on shared hosting can hit time or memory limits. Split the schedule so files and database run at different times, or exclude large folders and back those up separately.
- If WordPress itself will not load, you cannot use the plugin's restore screen. You need to know how to restore manually, which is covered below.
- Backups stored in `wp-content` use your hosting disk space. Send them to remote storage and let the plugin delete local copies.

## Method 2: Use your host's backups

Most hosts take automatic backups, and restoring one is often a single click. This is the fastest way to recover from a bad update.

Find out exactly what your plan includes. Look in the control panel under "Backups", "Backup Manager" or "JetBackup", and check four things:

1. **Frequency.** Daily is standard on better plans. Some entry plans back up weekly.
2. **Retention.** How many days of copies are kept.
3. **Restore cost.** Whether you can restore yourself for free, or whether support charges a fee.
4. **Download.** Whether you can save a copy to your own computer.

Treat host backups as your convenient second copy, not your only one. They live with the same company as the site. If your account is suspended or compromised, you may lose access to both at once. We list this among the checks in [How to Choose a Web Hosting Provider](/how-to-choose-web-hosting).

On a VPS, backups are usually a paid extra and are off by default. Providers such as DigitalOcean and Amazon Lightsail sell automated snapshots of the whole server. Turn them on, or build your own with the manual method.

## Method 3: Back up manually

The manual method needs no plugin and works even when WordPress is broken. It is also the easiest to automate on a server you control.

### With SSH and WP-CLI

Log in over SSH and go to the folder that contains `wp-config.php`. Then run:

```
wp db export db-$(date +%F).sql
tar -czf files-$(date +%F).tar.gz wp-content wp-config.php .htaccess
```

The first command exports the database to a file named with today's date, such as `db-2026-10-06.sql`. The second compresses your content folder and two key configuration files into one archive.

If WP-CLI is not installed, export the database with `mysqldump` using the credentials from `wp-config.php`:

```
mysqldump -u DB_USER -p DB_NAME > db-$(date +%F).sql
```

Download both files to your computer, or copy them to remote storage, then delete them from the server. A database export left in a public web folder can be downloaded by anyone who guesses its name.

```
scp user@203.0.113.10:/home/user/public_html/db-2026-10-06.sql ./
scp user@203.0.113.10:/home/user/public_html/files-2026-10-06.tar.gz ./
```

### With cPanel and phpMyAdmin

Without SSH, you can do the same thing through the control panel.

1. **Database:** open phpMyAdmin, select your WordPress database, click Export, choose the "Quick" method and SQL format, and click Export.
2. **Files:** open File Manager, go to your site folder, select `wp-content` and `wp-config.php`, click Compress, and download the resulting zip file.

cPanel also has a Backup Wizard that produces a full account backup in one step.

### Automating the manual method

On a VPS you can schedule the commands with cron. This small script keeps 14 days of backups in a folder outside the web root:

```
#!/bin/bash
SITE=/var/www/example.com
DEST=/var/backups/wordpress
STAMP=$(date +%F)

mkdir -p "$DEST"
wp db export "$DEST/db-$STAMP.sql" --path="$SITE" --allow-root
tar -czf "$DEST/files-$STAMP.tar.gz" -C "$SITE" wp-content wp-config.php
find "$DEST" -type f -mtime +14 -delete
```

Save it as `/usr/local/bin/wp-backup.sh`, make it executable with `chmod +x`, and run it every night at 3 a.m. by adding this line with `crontab -e`:

```
0 3 * * * /usr/local/bin/wp-backup.sh
```

This gives you a local copy only. To satisfy the off-site part of the 3-2-1 rule, add a step that syncs the folder to cloud storage with a tool such as rclone.

## How to test a restore in ten minutes

A backup is unproven until you have restored it. Do this once now and once a quarter.

1. **Create a test site.** Use your host's staging feature, a subdomain such as `test.example.com`, or a free local tool such as Local or WordPress Studio on your own computer.
2. **Restore the backup there.** With a plugin, install the same plugin on the test site and upload the backup files. Manually, extract the files archive and import the database export.
3. **Check five things:** the home page loads, a recent post shows its images, you can log in, a page from last month exists, and the newest content matches the backup date.
4. **Note how long it took.** That is your real recovery time.
5. **Delete the test site** so an outdated copy is not left online.

Never test a restore on the live site.

## How to restore when something goes wrong

Start with the least drastic option.

| Situation | Restore method |
|-----------|----------------|
| A plugin update broke the site but wp-admin loads | Restore from the backup plugin's screen, or roll back just that plugin |
| White screen and no access to wp-admin | Use the host's one-click restore, or rename the faulty plugin's folder over SFTP |
| Site hacked | Restore files and database from a date before the infection, then change every password |
| Server lost or host account closed | Manual restore of your off-site copy on a new host |

For a manual restore on a fresh server, the steps mirror the backup:

```
tar -xzf files-2026-10-06.tar.gz
wp db import db-2026-10-06.sql
```

Install WordPress core first if it is not there, create a database and update `wp-config.php` with its credentials. The process is the same as moving hosts, which is covered step by step in [How to Migrate a WordPress Site to a New Host Without Downtime](/how-to-migrate-wordpress-site).

After any restore, visit Settings, Permalinks and click Save to rebuild the rewrite rules, and clear your caches. If pages feel slower than before, work through [Why Is My WordPress Site Slow?](/why-is-my-wordpress-site-slow).

## Backup mistakes to avoid

- **Keeping the only copy on the web server.** One incident removes both.
- **Never testing.** Corrupt and incomplete archives are common and invisible until you need them.
- **Backing up the database only.** You lose every upload.
- **Short retention.** Three days of copies will not help with a problem found three weeks later.
- **Leaving archives in a public folder.** They contain your database, including user emails and password hashes.
- **Not securing the backup storage.** Use a strong, unique password and two-factor authentication on the cloud account that holds your backups.
- **Assuming the host has it covered.** Read what your plan includes and what a restore costs.

## Frequently asked questions

### How do I back up my WordPress site for free?

Install a free plugin such as UpdraftPlus, set a schedule and connect free cloud storage like Google Drive or Dropbox. Or do it manually: export the database from phpMyAdmin and download the wp-content folder through your host's file manager. Both methods cost nothing.

### How often should I back up my WordPress site?

Back up the database daily and the files weekly for a typical blog. Stores and membership sites need hourly or real-time database backups. A site that changes a few times a year can use weekly and monthly. Always take a manual backup before updates.

### Where are WordPress backups stored?

That depends on the method. Host backups stay on the host's systems. Plugins store them in a folder under wp-content unless you connect remote storage. For safety, send a copy to off-site storage such as Google Drive, Dropbox, Amazon S3 or Backblaze B2.

### Does WordPress back up automatically?

No. WordPress has no built-in backup feature. Its export tool under Tools, Export saves posts and pages as an XML file, but not your uploads, themes, plugins or settings. You need a plugin, your host's backup service or a manual process.

### What is the 3-2-1 backup rule?

Keep three copies of your data, on two different kinds of storage, with one copy off-site. For WordPress that means the live site, a backup at your host for quick restores and another copy in separate cloud storage that your hosting account cannot delete.

### Is my hosting company's backup enough?

Not on its own. Host backups are convenient for quick restores, but they are held by the same company as your site. An account suspension, a security breach or a billing problem can lock you out of both. Keep an independent off-site copy as well.

### How do I restore a WordPress site from a backup?

With a plugin, open its backup list and choose Restore. With host backups, use the restore option in your control panel. Manually, extract the files archive into the site folder, import the database export and confirm the credentials in wp-config.php are correct.

## Sources

- [WordPress.org documentation: WordPress backups](https://wordpress.org/documentation/article/wordpress-backups/)
- [WP-CLI command reference: wp db export](https://developer.wordpress.org/cli/commands/db/export/)
- [UpdraftPlus plugin page](https://wordpress.org/plugins/updraftplus/)
- [WordPress.org server requirements](https://wordpress.org/about/requirements/)
