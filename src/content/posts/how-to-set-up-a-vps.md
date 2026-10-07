To set up a VPS safely, do ten things in order: log in, update the system, create a non-root user, switch to SSH keys, lock down SSH, turn on the firewall, enable automatic security updates, add fail2ban, set the time zone and swap, and install your web server with HTTPS. The whole process takes about 45 minutes on a fresh Ubuntu server, and it closes the gaps that automated attacks look for within hours of a server coming online.

Every command below is for Ubuntu 24.04 LTS and works the same on Ubuntu 22.04 and current Debian releases.

> **How this guide was researched.** These are standard Ubuntu administration commands, and the prices quoted come from the providers' pricing pages on October 6, 2026. Replace the example values such as `203.0.113.10`, `deploy` and `example.com` with your own. Keep your first SSH session open while you change SSH settings, so a mistake cannot lock you out.

## What you need before you start

| Item | Notes |
|------|-------|
| A VPS running Ubuntu 24.04 LTS | 1 GB of memory is a sensible minimum for a small site |
| The server's IP address and root password or key | Sent by your provider when the server is created |
| A terminal | Built into macOS, Linux and Windows 10 or later (PowerShell or Windows Terminal) |
| A domain name | Optional for now, needed for HTTPS in step 10 |

On price: a 1 GiB DigitalOcean Droplet is $6 a month and a 1 GB Amazon Lightsail instance is $7 a month, both at a flat rate with no promotional pricing. If you are still deciding whether a VPS is right for you, read [Shared vs VPS vs Cloud Hosting](/shared-vs-vps-vs-cloud-hosting) first. A VPS is cheap because you do the work in this guide yourself.

## The 10 steps at a glance

| Step | What you do | Why |
|------|-------------|-----|
| 1 | Log in as root | First access |
| 2 | Update all packages | Fresh images are already out of date |
| 3 | Create a user with sudo | Stop working as root |
| 4 | Set up SSH keys | Keys cannot be guessed like passwords |
| 5 | Disable root and password login | Shuts the door automated attacks knock on |
| 6 | Enable the firewall | Only the ports you need stay open |
| 7 | Turn on automatic security updates | Patches apply without you |
| 8 | Install fail2ban | Blocks addresses that keep failing to log in |
| 9 | Set time zone and swap | Correct logs, and a safety net for low memory |
| 10 | Install a web server and HTTPS | The server starts doing its job |

## Step 1: Log in as root

Open a terminal on your own computer and connect:

```
ssh root@203.0.113.10
```

The first time, SSH asks whether you trust the server's fingerprint. Type `yes`. Enter the root password if your provider gave you one. Some providers force you to change it on first login.

## Step 2: Update the system

Server images are built weeks or months before you use them, so the first job is to install the updates released since then.

```
apt update && apt upgrade -y
```

If the upgrade includes a new kernel, reboot and log in again:

```
reboot
```

## Step 3: Create a user with sudo rights

The root account can do anything, including destroying the system with one mistyped command. Day-to-day work should happen as a normal user who uses `sudo` when administrator rights are needed.

```
adduser deploy
usermod -aG sudo deploy
```

The first command asks you to set a password and a few optional details. The second adds the user to the `sudo` group. Choose a long password and store it in a password manager. You will need it whenever you run `sudo`.

## Step 4: Set up SSH keys

An SSH key is a pair of files. The private key stays on your computer. The public key goes on the server. Only someone with the private key can log in, and there is no password to guess.

On **your own computer**, not the server, create a key if you do not already have one:

```
ssh-keygen -t ed25519 -C "you@example.com"
```

Press Enter to accept the default location, and set a passphrase when asked. Then copy the public key to the new user on the server.

On macOS and Linux:

```
ssh-copy-id deploy@203.0.113.10
```

On Windows PowerShell, which has no `ssh-copy-id`:

```
type $env:USERPROFILE\.ssh\id_ed25519.pub | ssh deploy@203.0.113.10 "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys"
```

Now test it. Open a **second** terminal window and connect as the new user:

```
ssh deploy@203.0.113.10
```

You should get in without being asked for the account password. Check that sudo works:

```
sudo whoami
```

It should print `root`. Do not continue until both of these work. Keep the original root session open as a fallback.

## Step 5: Disable root login and password login

With key login confirmed, turn off the two weakest entry points: logging in as root and logging in with a password.

Create a small settings file. Using a separate file means system updates will not overwrite your changes.

```
sudo nano /etc/ssh/sshd_config.d/00-hardening.conf
```

Add these lines:

```
PermitRootLogin no
PasswordAuthentication no
KbdInteractiveAuthentication no
PubkeyAuthentication yes
```

Save with Ctrl+O, Enter, then exit with Ctrl+X. Check the configuration for errors before applying it:

```
sudo sshd -t
```

No output means it is valid. Restart SSH:

```
sudo systemctl restart ssh
```

Open a **third** terminal and confirm you can still log in as `deploy`. Then confirm that root is refused:

```
ssh root@203.0.113.10
```

You should see "Permission denied". Only now is it safe to close your original root session.

Some providers add their own file in the same folder, such as `50-cloud-init.conf`, which can turn password login back on. Files are read in name order and the first value wins, which is why the file above starts with `00`. You can confirm the result with:

```
sudo sshd -T | grep -E "permitrootlogin|passwordauthentication"
```

## Step 6: Turn on the firewall

Ubuntu includes UFW, a simple front end for the firewall. The rule is to block everything coming in except what you explicitly allow.

Allow SSH first. If you enable the firewall without this, you lock yourself out.

```
sudo ufw allow OpenSSH
sudo ufw enable
sudo ufw status
```

When you install a web server in step 10, you will open ports 80 and 443 as well. Until then, SSH is the only way in.

Many cloud providers also have a network firewall in their control panel, outside the server. DigitalOcean calls it Cloud Firewalls and Lightsail has a Networking tab. A port must be open in both places to be reachable. Using both is good practice, because the provider's firewall still protects you if UFW is switched off by accident.

## Step 7: Enable automatic security updates

New vulnerabilities are found constantly, and the fix is useless until it is installed. The `unattended-upgrades` package installs security patches on its own.

```
sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

Choose "Yes" when asked. Confirm it is active:

```
systemctl status unattended-upgrades
```

Some updates, mainly kernel updates, need a reboot to take effect. You can check whether one is pending:

```
cat /var/run/reboot-required
```

If that file exists, reboot at a quiet time. To have the server reboot itself when needed, edit `/etc/apt/apt.conf.d/50unattended-upgrades` and set:

```
Unattended-Upgrade::Automatic-Reboot "true";
Unattended-Upgrade::Automatic-Reboot-Time "03:30";
```

## Step 8: Install fail2ban

Even with passwords disabled, bots will hammer your SSH port, filling the logs. Fail2ban watches for repeated failures and blocks the offending address for a while.

```
sudo apt install fail2ban -y
```

Create a local settings file so package updates do not overwrite it:

```
sudo nano /etc/fail2ban/jail.local
```

Add:

```
[DEFAULT]
bantime = 1h
findtime = 10m
maxretry = 5

[sshd]
enabled = true
```

This bans an address for one hour after five failures within ten minutes. Start it and check the status:

```
sudo systemctl enable --now fail2ban
sudo fail2ban-client status sshd
```

After a day, that last command will show how many addresses have been banned. The number is usually a surprise.

## Step 9: Set the time zone and add swap

### Time zone

Logs are much easier to read when the timestamps make sense to you. UTC is the common choice for servers, since it has no daylight saving changes.

```
sudo timedatectl set-timezone UTC
timedatectl
```

To use a local zone instead, list them with `timedatectl list-timezones` and set, for example, `America/New_York`.

### Swap

Swap is disk space the system can use when memory runs out. It is slow, but on a 1 GB server it is the difference between a brief slowdown and the database being killed. Check whether you already have any:

```
sudo swapon --show
```

If that prints nothing, create a 1 GB swap file:

```
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

The last line makes it permanent across reboots. Tell the system to prefer real memory and use swap only when it must:

```
echo 'vm.swappiness=10' | sudo tee /etc/sysctl.d/99-swappiness.conf
sudo sysctl --system
```

Confirm with `free -h`.

## Step 10: Install a web server and HTTPS

Install Nginx and open the web ports:

```
sudo apt install nginx -y
sudo ufw allow 'Nginx Full'
```

Visit `http://203.0.113.10` in a browser, using your own IP. You should see the Nginx welcome page.

To serve your own site, point your domain at the server by creating an A record with the server's IP address. [DNS Records Explained](/dns-records-explained) shows how. Then create a site configuration:

```
sudo nano /etc/nginx/sites-available/example.com
```

```
server {
    listen 80;
    listen [::]:80;
    server_name example.com www.example.com;
    root /var/www/example.com;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

Create the folder, enable the site and reload:

```
sudo mkdir -p /var/www/example.com
sudo chown -R deploy:deploy /var/www/example.com
echo "It works" > /var/www/example.com/index.html
sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

Finally, add a free HTTPS certificate with Certbot:

```
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
sudo certbot --nginx -d example.com -d www.example.com
```

Certbot installs the certificate, configures the redirect to HTTPS and sets up automatic renewal. The full walkthrough, including common errors, is in [How to Get a Free SSL Certificate With Let's Encrypt](/free-ssl-certificate-lets-encrypt).

## After setup: three habits that keep a server healthy

### Back it up

A hardened server can still lose data to a failed disk or a bad command. Use two layers:

- **Provider snapshots.** DigitalOcean and Lightsail both sell automated backups of the whole server as a paid extra. They are off by default. Turn them on.
- **Your own copy off the server.** Export databases and site files on a schedule and sync them to separate storage. [How to Back Up a WordPress Site](/how-to-back-up-wordpress-site) includes a script you can adapt.

### Watch it

At minimum, know when the site is down and when the disk is filling.

```
df -h
free -h
sudo journalctl -p err -b
```

These show disk space, memory and errors logged since the last boot. A free uptime monitor that pings your site every few minutes will email you when it stops responding.

### Keep the surface small

Install only what you use. Every extra service is something to patch. Do not expose database ports to the internet. MySQL, PostgreSQL and Redis should listen on `127.0.0.1` unless you have a specific reason and a firewall rule to match. Check what is listening:

```
sudo ss -tlnp
```

Anything on `0.0.0.0` or `[::]` is reachable from outside if the firewall allows the port.

## Troubleshooting

| Problem | Likely cause | Fix |
|---------|--------------|-----|
| "Permission denied (publickey)" | The key was not copied, or you are using the wrong user | Use the provider's web console to log in and check `~/.ssh/authorized_keys` |
| Locked out after enabling UFW | SSH was not allowed first | Use the provider's web console and run `ufw allow OpenSSH` |
| Password login still works | Another file in `sshd_config.d` overrides yours | Run `sudo sshd -T` and rename your file so it sorts first |
| Website does not load | Port 80 or 443 closed in UFW or the provider firewall | Open the port in both |
| `nginx -t` fails | Typo in the site configuration | Read the line number in the error and correct it |
| Certbot fails | The domain does not point at the server yet | Check the A record with `dig example.com +short` |
| Server sluggish or services killed | Out of memory | Add swap, or resize to a larger plan |

Nearly every lockout can be recovered through the web console in your provider's control panel, which gives you a terminal that does not depend on SSH. Find it before you need it.

## Frequently asked questions

### How long does it take to set up a VPS?

About 45 minutes for the ten steps in this guide on a fresh Ubuntu server, if you follow them in order. Pointing a domain and waiting for DNS can add time. After the first server, most people complete the same steps in 15 to 20 minutes.

### Is a VPS secure by default?

No. A new VPS usually allows root login over SSH, often with a password, and has no firewall rules. Automated bots begin trying to log in within hours. Creating a sudo user, using SSH keys, disabling password login and enabling the firewall close the common gaps.

### Should I disable root login on my VPS?

Yes. Every Linux server has an account called root, so attackers already know half of the login. Create a separate user with sudo rights, confirm you can log in with an SSH key, then set PermitRootLogin to no in the SSH configuration.

### Do I need a firewall if my provider has one?

Use both. The provider's network firewall blocks traffic before it reaches the server, and UFW on the server protects you if the provider's rules are changed or misconfigured. A port must be open in both to be reachable from the internet.

### How much memory does a VPS need?

For a single small website, 1 GB is a sensible minimum, with a 1 GB swap file as a safety net. A 512 MB server suits static sites. Stores, several sites or background jobs need 2 GB or more. Watch usage with free -h and resize if it stays above 80%.

### What is the cheapest way to run a VPS?

Entry VPS plans cost $4 to $7 a month at providers such as DigitalOcean and Amazon Lightsail, based on October 2026 pricing. A 1 GiB DigitalOcean Droplet is $6 a month. Automated backups cost extra, and your own time for maintenance is the larger cost.

### Do I need to update my VPS manually?

Install unattended-upgrades so security patches apply automatically. You still need to reboot occasionally for kernel updates, and to upgrade to a new Ubuntu release every few years. Check for a pending reboot by looking for the file /var/run/reboot-required.

## Sources

Prices were read on October 6, 2026.

- [DigitalOcean Droplet pricing](https://www.digitalocean.com/pricing/droplets)
- [Amazon Lightsail pricing](https://aws.amazon.com/lightsail/pricing/)
- [Ubuntu Server documentation](https://documentation.ubuntu.com/server/)
- [Certbot instructions](https://certbot.eff.org/instructions)
- [Let's Encrypt FAQ](https://letsencrypt.org/docs/faq/)
