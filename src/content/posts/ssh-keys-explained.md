An SSH key is a pair of files that lets you log in to a server without a password. The private key stays on your computer, the public key goes on the server, and the server lets you in only if you can prove you hold the matching private key. To use one, run `ssh-keygen -t ed25519` on your computer, copy the public key to the server's `~/.ssh/authorized_keys` file, and then switch off password login. Keys cannot be guessed by the bots that try thousands of passwords against every server on the internet.

This guide explains how SSH keys work, how to create and install them on macOS, Linux and Windows, and how to manage them safely over time.

> **How this guide was written.** The commands are standard OpenSSH commands, available on macOS, Linux and Windows 10 or later. Example addresses use the documentation range 203.0.113.0/24 and the username `deploy`. Keep an existing session open whenever you change SSH settings on a server, so a mistake cannot lock you out.

## Why passwords are a weak way into a server

The moment a server gets a public IP address, automated scanners start trying to log in. They work through lists of common usernames such as `root`, `admin` and `ubuntu`, paired with leaked and common passwords. A server with password login enabled will log thousands of these attempts a day.

A long, unique password will hold out against guessing, but it still has weaknesses:

- It can be reused on another service that gets breached.
- It can be typed into a fake login prompt.
- It has to be stored or remembered by every person who needs access.
- It travels to the server each time you log in, even though the connection is encrypted.

An SSH key removes all of those. The private key never leaves your computer, nothing reusable is sent to the server, and there is no password for a bot to guess. That is why the first job in [How to Set Up a VPS](/how-to-set-up-a-vps) is switching to keys.

## How an SSH key pair works

An SSH key is built on public key cryptography. You generate two related files:

| File | Example name | Where it lives | Share it? |
|------|--------------|----------------|-----------|
| Private key | `id_ed25519` | Only on your own computer | Never |
| Public key | `id_ed25519.pub` | On every server you want to access | Yes, freely |

When you connect, the server sends a challenge that only the holder of the private key can answer correctly. Your computer answers it using the private key, and the server checks the answer against the public key it has on file. The private key itself is never transmitted.

Because the public key cannot be used to work out the private key, it is safe to paste it into a server, a hosting control panel or a Git service. Only the private key needs protecting.

## Which key type to choose

| Type | Command flag | Recommendation |
|------|--------------|----------------|
| Ed25519 | `-t ed25519` | Use this. Short keys, fast and widely supported |
| RSA | `-t rsa -b 4096` | Use only for old systems that do not support Ed25519 |
| ECDSA | `-t ecdsa` | Works, but Ed25519 is preferred |
| DSA | `-t dsa` | Do not use. Disabled by default in current OpenSSH |

Ed25519 is the right default today. An Ed25519 public key is a single short line of about 80 characters, which makes it easy to copy without errors. If you must connect to a very old server that rejects it, generate a 4096-bit RSA key for that one server.

## Step 1: Create a key pair

Open a terminal on your own computer. On Windows, use PowerShell or Windows Terminal, which include OpenSSH on Windows 10 and later.

```
ssh-keygen -t ed25519 -C "jane@example.com"
```

The `-C` value is a comment that helps you identify the key later. Your email address or a description such as `jane-laptop-2026` works well.

You will see two prompts.

1. **File location.** Press Enter to accept the default, which is `~/.ssh/id_ed25519` on macOS and Linux and `C:\Users\you\.ssh\id_ed25519` on Windows.
2. **Passphrase.** Enter one. It encrypts the private key file on your disk, so a stolen laptop or a leaked backup does not hand over access to your servers.

When it finishes, you have two files: `id_ed25519` and `id_ed25519.pub`. You can see the public key with:

```
cat ~/.ssh/id_ed25519.pub
```

It looks like this:

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIExampleKeyDataOnlyForIllustration jane@example.com
```

## Step 2: Copy the public key to the server

### On macOS and Linux

```
ssh-copy-id deploy@203.0.113.10
```

It asks for the account password one last time, then adds your public key to the server's `~/.ssh/authorized_keys` file with the correct permissions.

### On Windows

Windows does not include `ssh-copy-id`. This PowerShell command does the same job:

```
type $env:USERPROFILE\.ssh\id_ed25519.pub | ssh deploy@203.0.113.10 "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys"
```

### When creating a new server

Most providers, including DigitalOcean, Amazon Lightsail and Akamai's Linode, let you paste a public key when you create the server. The key is installed before the server first boots, so password login is never needed. This is the cleanest option. [Best VPS Hosting for Developers](/best-vps-hosting-for-developers) compares those providers.

## Step 3: Test the key

Open a new terminal window and connect:

```
ssh deploy@203.0.113.10
```

If the key works, you are logged in without being asked for the account password. You may be asked for the key's passphrase instead, which is expected.

To see exactly what happened, add `-v` for verbose output. Look for a line saying the server accepted your key:

```
ssh -v deploy@203.0.113.10
```

Do not move on until this works.

## Step 4: Use an agent so you type the passphrase once

Typing a passphrase on every connection gets tiresome, which tempts people to remove it. An SSH agent holds the unlocked key in memory for your session instead.

On macOS, add the key to the agent and the system keychain:

```
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
```

On Linux, most desktops start an agent automatically:

```
ssh-add ~/.ssh/id_ed25519
```

On Windows, enable the OpenSSH agent service once in an administrator PowerShell, then add the key:

```
Get-Service ssh-agent | Set-Service -StartupType Automatic
Start-Service ssh-agent
ssh-add $env:USERPROFILE\.ssh\id_ed25519
```

You now enter the passphrase once per login session, and the key stays encrypted on disk.

## Step 5: Turn off password login on the server

With key login confirmed, remove the weaker way in. On an Ubuntu or Debian server, create a small settings file:

```
sudo nano /etc/ssh/sshd_config.d/00-hardening.conf
```

Add:

```
PasswordAuthentication no
KbdInteractiveAuthentication no
PubkeyAuthentication yes
PermitRootLogin no
```

Check the configuration, then restart SSH:

```
sudo sshd -t
sudo systemctl restart ssh
```

Keep your current session open and test in a new window that you can still log in. Then confirm that password login is refused:

```
ssh -o PubkeyAuthentication=no deploy@203.0.113.10
```

It should end with "Permission denied (publickey)". The full server hardening sequence, including the firewall and automatic updates, is in [How to Set Up a VPS](/how-to-set-up-a-vps).

## Make connecting easier with an SSH config file

If you manage several servers, a config file saves typing addresses, usernames and key paths. Create or edit `~/.ssh/config`:

```
Host web
    HostName 203.0.113.10
    User deploy
    IdentityFile ~/.ssh/id_ed25519

Host staging
    HostName 203.0.113.20
    User deploy
    IdentityFile ~/.ssh/id_ed25519
```

Now `ssh web` connects to the first server. The same names work with `scp` and `rsync`:

```
scp backup.sql web:/home/deploy/
rsync -avz ./site/ staging:/var/www/example.com/
```

## SSH keys for Git

Git services such as GitHub, GitLab and Bitbucket accept SSH keys too. Paste your public key into your account's SSH settings, then test:

```
ssh -T git@github.com
```

A successful response greets you by username. Clone repositories with the SSH address, which starts with `git@`, instead of the HTTPS one.

For automated deployments, use a separate **deploy key** for each server or repository instead of your personal key. A deploy key gives access to one repository only, and you can revoke it without affecting anything else.

## File permissions that SSH insists on

SSH refuses to use keys that other users could read or change. If login fails for no obvious reason, permissions are the usual cause.

| Path | Where | Permission |
|------|-------|------------|
| `~/.ssh` | Your computer and the server | 700 |
| `~/.ssh/id_ed25519` (private key) | Your computer | 600 |
| `~/.ssh/id_ed25519.pub` | Your computer | 644 |
| `~/.ssh/authorized_keys` | The server | 600 |

Fix them on macOS, Linux or the server with:

```
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_ed25519 ~/.ssh/authorized_keys
```

On Windows, the private key file should be readable only by your user account. If OpenSSH complains about "bad permissions", right-click the file, open Security settings, disable inheritance and remove every user except yourself.

## Managing keys over time

Keys do not expire on their own, which means old ones pile up. A few habits keep access under control.

- **One key per device.** Create a separate key on each computer you use. If a laptop is lost, you remove that one key from your servers without touching the others.
- **Label every key.** The comment at the end of each line in `authorized_keys` should say whose key it is and which device it belongs to.
- **Remove keys when people leave.** Open `~/.ssh/authorized_keys` on each server and delete the line for anyone who no longer needs access. This is the step most often forgotten.
- **Review once a quarter.** List the keys on each server and confirm you recognize every one:

```
cat ~/.ssh/authorized_keys
```

- **Never email a private key or paste it into chat.** If one is exposed, generate a new pair and remove the old public key everywhere.
- **Back up your private key securely,** encrypted with its passphrase, or accept that losing the device means using your provider's web console to add a new key.

## Troubleshooting

| Message or symptom | Likely cause | Fix |
|--------------------|--------------|-----|
| "Permission denied (publickey)" | Key not on the server, wrong user, or wrong key offered | Check `authorized_keys` and connect with `-v` to see which key was tried |
| Still asked for the account password | Key not accepted, so SSH fell back to password | Fix permissions on the server's `~/.ssh` folder |
| "UNPROTECTED PRIVATE KEY FILE" | Private key readable by other users | Set it to 600, or restrict it to your user on Windows |
| "Too many authentication failures" | The agent offered too many keys before the right one | Add `IdentitiesOnly yes` and an `IdentityFile` line in your config |
| "REMOTE HOST IDENTIFICATION HAS CHANGED" | Server rebuilt with a new host key, or a possible interception | If you rebuilt it, remove the old entry with `ssh-keygen -R 203.0.113.10` |
| Locked out after disabling passwords | Key login was not working first | Use the provider's web console and fix `authorized_keys` |

That last row is why the order matters: test keys first, disable passwords second. Every major VPS provider offers a browser-based console that works without SSH, so find it before you need it.

## A quick checklist

1. Generate an Ed25519 key with a passphrase on each device you use.
2. Install the public key on the server and test login in a new window.
3. Add the key to an SSH agent so you type the passphrase once per session.
4. Disable password and root login, then confirm passwords are refused.
5. Label every key and review each server's `authorized_keys` every quarter.

## Frequently asked questions

### What is an SSH key?

An SSH key is a pair of cryptographic files used to log in to a server without a password. The private key stays on your computer and the public key is placed on the server. The server grants access only to someone who can prove they hold the matching private key.

### Which SSH key type should I use?

Use Ed25519, created with ssh-keygen -t ed25519. It produces short keys and is fast and widely supported. Use a 4096-bit RSA key only for older systems that do not accept Ed25519. Do not use DSA keys.

### Is it safe to share my public SSH key?

Yes. The public key cannot be used to work out the private key, so you can paste it into servers, hosting dashboards and Git services. Never share the private key file, which is the one without the .pub ending.

### Should I put a passphrase on my SSH key?

Yes. A passphrase encrypts the private key on disk, so a stolen laptop or leaked backup does not give access to your servers. Use an SSH agent to unlock the key once per session so you do not have to type the passphrase on every connection.

### How do I use SSH keys on Windows?

Windows 10 and later include OpenSSH. Run ssh-keygen -t ed25519 in PowerShell, then copy the public key to the server with a type command piped through ssh, because Windows has no ssh-copy-id. Enable the ssh-agent service to store the unlocked key.

### What happens if I lose my SSH private key?

You cannot log in with that key again. Log in another way, such as with a different key or your provider's web console, add a new public key to the server, and remove the lost key's line from authorized_keys.

### How do I remove someone's SSH access to a server?

Open the authorized_keys file in the home folder of the account they use on the server and delete the line containing their public key. Their access ends immediately. Repeat this on every server they could reach.

## Sources

- [OpenSSH manual: ssh-keygen](https://man.openbsd.org/ssh-keygen)
- [OpenSSH manual: sshd_config](https://man.openbsd.org/sshd_config)
- [Microsoft: Key-based authentication in OpenSSH for Windows](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_keymanagement)
- [GitHub Docs: Connecting to GitHub with SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
