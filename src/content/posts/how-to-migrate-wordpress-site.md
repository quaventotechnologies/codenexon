To migrate a WordPress site to a new host without downtime, copy the files and the database to the new server, test the copy there through a temporary address or your hosts file, and only then change your DNS record. The old site keeps serving visitors until the switch, so nobody sees a gap. Plan for one to three hours of work, plus a day of waiting beforehand for a DNS setting to take effect.

This tutorial gives the full sequence in eight steps, with both a plugin method and a manual method using SSH and WP-CLI.

> **How this guide was researched.** The commands are standard WP-CLI, MySQL and rsync commands. Addresses such as 203.0.113.10 and example.com are reserved for documentation, so replace them with your own. Take a backup before you start, and read each command before you run it.

## What you are actually moving

A WordPress site has two parts, and a migration is complete only when both arrive.

| Part | What it contains | Where it lives |
|------|------------------|----------------|
| Files | WordPress core, themes, plugins and everything you uploaded | The site folder, often `public_html` |
| Database | Posts, pages, comments, users, settings and orders | A MySQL or MariaDB database |

The file `wp-config.php` joins them. It holds the database name, username and password. On the new host those details will be different, and updating that file is the step people most often miss.

A third thing does not move with the site at all: your domain's DNS records. Email, in particular, is controlled by MX records that have nothing to do with WordPress files. Handle those separately, as described in step 6.

## Before you start: a checklist

- Admin login for the WordPress site.
- Control panel or SSH access at the old host.
- Control panel or SSH access at the new host, with the account already set up.
- Access to wherever your DNS records are managed.
- At least as much free disk space on the new host as the site uses now.
- A quiet time of day for your site, if it takes orders or comments.

## Should you use a plugin or do it manually?

| Method | Best for | Limits |
|--------|----------|--------|
| The new host's free migration service | Anyone who would rather not do it themselves | You depend on their schedule, and should still test the result |
| Migration plugin | Small and medium sites, no SSH needed | Free versions often cap the site size. Large sites can time out on shared hosting |
| Manual with SSH and WP-CLI | Large sites, developers, anyone who wants full control | Needs command line access on both servers |

Ask the new host first. Many offer a free migration for new accounts, and it costs nothing to check. If you do it yourself, both routes are below.

## Step 1: Lower your DNS TTL a day ahead

TTL, or time to live, tells DNS resolvers how long to remember your records. If your A record has a TTL of 14400 seconds, some visitors will keep reaching the old server for four hours after you change it.

Log in to your DNS host and set the TTL on your A record, and on the `www` record, to 300 seconds. Then wait at least as long as the previous TTL before continuing. Waiting 24 hours is the safe choice.

Do this first. It is the one step that cannot be rushed. [DNS Records Explained](/dns-records-explained) has more on how TTL works.

## Step 2: Take a full backup

Make a backup that you could restore from if everything else failed, and download it to your own computer.

With WP-CLI over SSH, from the WordPress folder on the old server:

```
wp db export backup.sql
tar -czf site-backup.tar.gz --exclude='wp-content/cache' .
```

The first command writes the whole database to a file. The second packs every file in the folder, including that database export, into one archive and skips the cache folder.

Without SSH, use a backup plugin such as UpdraftPlus to create a backup of files and database, then download all the parts. The three backup methods are covered in [How to Back Up a WordPress Site](/how-to-back-up-wordpress-site).

## Step 3: Prepare the new host

On the new server, set up an empty home for the site.

1. **Add the domain** in the control panel so the server knows to answer for it.
2. **Create a database and a database user**, and give the user all privileges on that database. Write down the database name, username, password and host. The host is usually `localhost`.
3. **Match the PHP version** to the old server for now. You can upgrade after the move, once you know the site works. Changing two things at once makes problems harder to trace.

If you have SSH and prefer SQL, the database setup looks like this:

```
CREATE DATABASE wp_newsite CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'wp_user'@'localhost' IDENTIFIED BY 'use-a-long-random-password';
GRANT ALL PRIVILEGES ON wp_newsite.* TO 'wp_user'@'localhost';
FLUSH PRIVILEGES;
```

## Step 4: Copy the site

### Option A: With a migration plugin

Duplicator, All-in-One WP Migration and Migrate Guru all do this job. The general flow with Duplicator is:

1. Install the plugin on the old site and build a package. You get two files: an archive and an `installer.php` script.
2. Download both files.
3. Upload both to the empty site folder on the new host.
4. Open `installer.php` through the new host's temporary URL.
5. Enter the new database details from step 3 and let the installer run.
6. Delete the installer files when it finishes. The plugin prompts you to.

If the package build fails or times out, the site is probably too large for the plugin on your current hosting. Exclude the uploads folder from the package and copy that folder separately by SFTP, or use the manual method.

### Option B: Manually with SSH

From the old server, send the files straight to the new one with rsync. This is faster than downloading and re-uploading, and it can resume if the connection drops.

```
rsync -avz --exclude='wp-content/cache' ./ user@203.0.113.10:/home/user/public_html/
```

Then, on the new server, edit `wp-config.php` so it uses the new database:

```
define( 'DB_NAME', 'wp_newsite' );
define( 'DB_USER', 'wp_user' );
define( 'DB_PASSWORD', 'use-a-long-random-password' );
define( 'DB_HOST', 'localhost' );
```

Import the database export you made in step 2:

```
wp db import backup.sql
```

Finally, check that file ownership and permissions are right. Folders should be 755 and files 644:

```
find . -type d -exec chmod 755 {} \;
find . -type f -exec chmod 644 {} \;
```

Delete `backup.sql` from the web folder when you are done. A database dump left in a public folder can be downloaded by anyone who guesses the name.

### If the domain name is changing too

If you are moving to a new domain at the same time, the old address is stored throughout the database. Replace it with WP-CLI, which handles serialized data correctly. A plain find and replace in the SQL file will corrupt it.

```
wp search-replace 'https://old-domain.com' 'https://new-domain.com' --all-tables --dry-run
```

Read the report, then run the same command without `--dry-run`. If the domain is staying the same, skip this.

## Step 5: Test the new site before switching DNS

This is the step that makes the migration free of downtime. You look at the new server while the rest of the world still sees the old one.

Edit the hosts file on your own computer to point your domain at the new server's IP address.

- **Windows:** open Notepad as Administrator and edit `C:\Windows\System32\drivers\etc\hosts`
- **macOS and Linux:** run `sudo nano /etc/hosts`

Add one line, using the new server's IP:

```
203.0.113.10   example.com www.example.com
```

Save the file, open a private browser window and visit your site. Your computer now goes to the new server, and only your computer.

Work through this checklist:

| Check | What to look for |
|-------|------------------|
| Home page and three or four inner pages | Layout, images and menus all load |
| Login | You can reach wp-admin and sign in |
| Permalinks | Posts open without a 404. If not, go to Settings, Permalinks and click Save |
| Forms | A test submission arrives |
| Search | Results appear |
| Media | Images in older posts display |
| Store, if you have one | Add to cart and reach the payment step in test mode |
| HTTPS | See step 7 |

Remove the line from your hosts file when you finish testing, or you will forget it is there.

Some hosts provide a temporary URL or a preview link instead. That works for a quick look, but WordPress stores its own address in the database, so links and redirects can behave oddly on a temporary URL. The hosts file method shows the site exactly as visitors will see it.

## Step 6: Switch the DNS records

The site has changed on the old server since you copied it if anyone posted, commented or ordered. For a blog this rarely matters. For a store or a busy community, put the old site into maintenance mode, export and import the database once more, then continue immediately.

Now make the change at your DNS host:

1. Edit the A record for the root domain and enter the new server's IP address.
2. Make sure `www` follows it, either as a CNAME to the root or as an A record with the same IP.
3. Update or remove any AAAA record. A stale IPv6 record is a common cause of "it works for me but not for them".
4. **Do not touch MX or TXT records** unless you are also moving email.

### Keeping email working

If you only change the A record, email is unaffected, because mail follows the MX records.

Email breaks when you change nameservers to the new host and it starts with an empty set of records. If you must change nameservers, recreate every MX, TXT, SPF, DKIM and DMARC record at the new DNS host before you switch. If your mailboxes were hosted at the old web host, they need their own migration, which is a separate job from moving WordPress.

## Step 7: Install SSL and verify

Many hosts issue a free Let's Encrypt certificate automatically, but only once the domain actually points at their server. So this often has to happen just after the DNS change.

- In the control panel, open the SSL section and issue or run the free certificate for the domain.
- On your own server, use Certbot as described in [How to Get a Free SSL Certificate With Let's Encrypt](/free-ssl-certificate-lets-encrypt).

To avoid even a brief certificate warning, ask the new host whether you can upload your existing certificate before the switch, or use a CDN that provides its own certificate at the edge.

Then confirm the change is live:

```
dig example.com A +short
```

When that returns the new IP address, load the site in a private window and click through the same checklist as in step 5.

## Step 8: Clean up after the move

- **Wait a week before cancelling the old host.** Some resolvers hold old records longer than they should, and you may discover a file you forgot.
- **Raise the TTL** back to 3600 seconds after a day or two.
- **Clear every cache:** the WordPress cache plugin, any server cache and your CDN.
- **Set up backups on the new host.** Do not assume they are on by default.
- **Resubmit your sitemap** in Google Search Console and watch for crawl errors over the next week.
- **Check scheduled tasks** such as backups and email sends, since cron jobs do not move with the files.
- **Now upgrade PHP** if you held it back in step 3. WordPress recommends PHP 8.3 or greater.

## Troubleshooting common migration problems

| Problem | Cause | Fix |
|---------|-------|-----|
| "Error establishing a database connection" | Wrong details in `wp-config.php` | Recheck DB_NAME, DB_USER, DB_PASSWORD and DB_HOST against the new host |
| Home page works, every other page is a 404 | Rewrite rules were not regenerated | Settings, Permalinks, Save. On Nginx, check the server block has the WordPress `try_files` rule |
| White screen | PHP error, often a version mismatch or memory limit | Enable `WP_DEBUG` in `wp-config.php` and read the message |
| Images missing | Uploads folder incomplete or wrong permissions | Copy `wp-content/uploads` again and reset permissions |
| Redirect loop after enabling HTTPS | CDN or proxy using HTTP to the origin | Set the CDN's encryption mode to full |
| Strange characters in text | Character set changed during import | Export and import again using utf8mb4 |
| Some people still see the old site | Cached DNS | Wait for the old TTL to pass |

## Frequently asked questions

### How long does it take to migrate a WordPress site?

The hands-on work takes one to three hours for a typical site: backing up, copying files and database, testing and switching DNS. Lowering the DNS TTL should be done a day earlier. Very large sites take longer because of the time needed to transfer uploads.

### Will migrating my WordPress site cause downtime?

Not if you test the new server before changing DNS. The old site keeps serving visitors until you update the A record, and with a TTL of 300 seconds most visitors move to the new server within five minutes. Both servers are live during the switch.

### Will I lose SEO rankings when I change hosts?

A host change alone does not affect rankings when URLs, content and redirects stay the same. Keep the same permalink structure, make sure HTTPS works immediately and avoid long outages. Check Google Search Console for crawl errors during the week after the move.

### Can I migrate WordPress without a plugin?

Yes. Export the database with wp db export or phpMyAdmin, copy the files with rsync or SFTP, create a new database on the new host, import the export and update the database details in wp-config.php. The manual method suits large sites that make plugins time out.

### What is the best WordPress migration plugin?

Duplicator, All-in-One WP Migration and Migrate Guru are all widely used. Duplicator gives you an archive and installer you control. All-in-One WP Migration is the simplest for small sites. Migrate Guru transfers through its own servers, which helps on hosts with strict limits.

### Do I need to move my email when I change web hosts?

Only if your mailboxes are hosted at the old web host. If you use a separate email service, leave your MX records unchanged and email continues to work. If you change nameservers, recreate all MX and TXT records at the new DNS host first.

### When can I cancel my old hosting account?

Wait at least seven days after switching DNS. That covers resolvers that cache old records too long and gives you time to notice missing files or emails. Download a final backup from the old account before you close it.

## Sources

- [WordPress.org server requirements](https://wordpress.org/about/requirements/)
- [WP-CLI command reference](https://developer.wordpress.org/cli/commands/)
- [Cloudflare DNS documentation: Time to Live (TTL)](https://developers.cloudflare.com/dns/manage-dns-records/reference/ttl/)
- [Let's Encrypt FAQ](https://letsencrypt.org/docs/faq/)
