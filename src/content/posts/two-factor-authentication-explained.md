Two-factor authentication (2FA) adds a second check to your password, so a stolen password alone is not enough to get into an account. The methods are not equal. From weakest to strongest: SMS codes, email codes, authenticator app codes, push approvals, and phishing-resistant options such as passkeys and hardware security keys. Any of them is far better than a password alone. For the accounts that control everything else, such as your email, domain registrar and bank, use an authenticator app at minimum and a passkey or security key where the service supports it.

This guide explains how each method works, what current US government guidance says about them, and how to set 2FA up without locking yourself out.

> **How this guide was researched.** Guidance on authenticator types quotes NIST Special Publication 800-63B, and passkey figures come from the FIDO Alliance's passkeys page, both linked under Sources. The FIDO Alliance figures are claims attributed to companies and surveys on that page, which we have not independently verified. We have not tested specific authenticator apps for this post.

## Why a password alone is not enough

Passwords leak in ways you cannot control. A service you used years ago is breached, a password is reused somewhere else, or a convincing fake login page collects it. Attackers then try those passwords against email, banking and business accounts automatically.

A second factor breaks that chain. The attacker has your password but not your phone, your security key or your fingerprint. Most account takeovers rely on passwords alone, which is why turning on 2FA is one of the most effective single steps you can take.

## The three kinds of factor

| Factor | Means | Examples |
|--------|-------|----------|
| Something you know | A secret in your head | Password, PIN |
| Something you have | A device in your possession | Phone with an authenticator app, security key |
| Something you are | A physical trait | Fingerprint, face |

Two-factor authentication combines two different kinds. A password plus a security question is not true 2FA, because both are things you know.

## The methods compared

| Method | How it works | Phishing-resistant? | Main weakness |
|--------|--------------|--------------------|---------------|
| SMS code | A code is texted to your phone | No | SIM swapping, interception, no signal |
| Email code | A code is sent to your inbox | No | Only as safe as your email account |
| Authenticator app (TOTP) | An app generates a new 6-digit code every 30 seconds | No | Code can be typed into a fake site |
| Push approval | Your phone asks "Is this you?" | No | People approve prompts they did not start |
| Passkey | Your device proves who you are with cryptography, unlocked by fingerprint, face or PIN | Yes | Needs a supported service and device |
| Hardware security key | A USB or NFC key does the cryptography | Yes | Costs money, and can be lost |

## What NIST says about these methods

The US National Institute of Standards and Technology publishes digital identity guidelines, SP 800-63B, used across government and widely followed by businesses. Three points matter here.

**SMS and phone codes are restricted.** NIST states that "use of the PSTN for out-of-band verification is restricted", PSTN meaning the public telephone network that carries SMS and voice calls. It asks services to watch for risk signals such as "device swap, SIM change, number porting" and to make other authenticator types available to everyone.

**Typed codes are not phishing-resistant.** NIST explains that phishing resistance "requires single- or multi-factor cryptographic authentication", and that manually entered outputs such as one-time codes are not considered phishing-resistant.

**Higher assurance needs phishing resistance.** At NIST's middle assurance level, services must offer at least one phishing-resistant option, and at the highest level it is required.

In short: SMS is the weakest option still in common use, codes you type can be stolen by a fake site, and cryptographic methods such as passkeys and security keys are the strongest.

## Each method in more detail

### SMS codes

The service texts a six-digit code to your phone number. It is easy, which is why it is common, and it stops most automated attacks that only have your password.

The weakness is the phone number itself. In a SIM swap, an attacker persuades your mobile carrier to move your number to a SIM card they control, and then receives your codes. Codes can also be read on a locked phone's lock screen.

**Use it** when it is the only option, and add a carrier PIN or port-out lock to your mobile account. Move to an app or passkey wherever the service allows.

### Email codes

The service emails a code or a sign-in link. This is only as secure as your email account. If your email is protected with a strong 2FA method, email codes for other services are reasonable. If your email uses a weak password, they add little.

### Authenticator apps

An authenticator app generates time-based one-time passwords, often called TOTP. When you set it up, the service shows a QR code containing a shared secret. Your app and the service both use that secret and the current time to calculate the same six-digit code, which changes every 30 seconds.

Because the code is generated on your phone, a SIM swap does not expose it, and it works without mobile signal. Common authenticator apps include Google Authenticator, Microsoft Authenticator and the authenticators built into password managers.

The remaining weakness is phishing. If you type the current code into a convincing fake login page, the attacker can use it within its 30-second window.

### Push approvals

Some services send a notification asking you to approve or deny a sign-in. It is convenient, but attackers exploit it by triggering prompt after prompt until a tired person taps "Approve". This is called MFA fatigue. Services that show a number on screen, which you must match on your phone, reduce the risk a lot.

**Rule:** never approve a sign-in prompt you did not start. If prompts arrive unexpectedly, your password is known. Change it.

### Passkeys

A passkey replaces the password and the code with cryptography. The FIDO Alliance describes a passkey as "an authentication credential based on FIDO standards" and says that "unlike passwords, passkeys are always strong and phishing-resistant".

When you create a passkey, your device makes a key pair. The service stores the public key, and the private key stays on your device or in your password manager. To sign in, you unlock the passkey with your fingerprint, face or device PIN, and your device proves possession of the private key. Two things make it resistant to phishing:

- A passkey only works on the website it was created for, so a fake site with a similar address cannot use it.
- The server holds no shared secret, so a breach of the service does not leak anything an attacker could sign in with.

Passkeys come in two forms, according to the FIDO Alliance: synced passkeys, which move between your devices through a cloud service such as your phone's password manager, and device-bound passkeys, which never leave one device, including those stored on hardware security keys.

The FIDO Alliance's page also reports adoption and performance figures: in a 2024 survey it commissioned, 53% of people said they had enabled passkeys on at least one account, and it attributes a 6x faster sign-in time to Amazon and a 4x improvement in sign-in success rate to Google. Treat these as the companies' own reported results.

### Hardware security keys

A security key is a small USB or NFC device that performs the same kind of cryptographic check as a passkey, with the private key stored on the key itself. It is the strongest common option and suits high-value accounts such as your registrar, email administrator account and banking. Keep at least two, registered to each account, and store the spare somewhere safe.

## Which method to use for which account

| Account | Minimum | Better |
|---------|---------|--------|
| Business email administrator | Authenticator app | Passkey or security key |
| Domain registrar | Authenticator app | Passkey or security key |
| Bank and payment processor | Whatever the bank offers | Passkey if available |
| Password manager | Authenticator app | Security key |
| Hosting and DNS | Authenticator app | Passkey or security key |
| WordPress administrators | Authenticator app plugin | Passkey plugin |
| Social media | Authenticator app | Passkey |
| Low-value accounts | SMS if nothing else is offered | Authenticator app |

The first five rows are the ones that control everything else. An attacker with your email or your registrar can reset passwords and redirect your website and email. [How to Transfer a Domain](/how-to-transfer-a-domain) and [Password Managers for Small Business](/password-manager-for-small-business) cover protecting those accounts.

## How to set up 2FA without locking yourself out

The most common 2FA problem is not an attacker. It is losing your phone. Follow these steps for each account.

1. **Find the setting.** It is usually under Security, Login or Account settings, labeled two-factor, two-step or multi-factor authentication.
2. **Choose the strongest method offered.** Passkey or security key first, then authenticator app, then SMS.
3. **Save the backup codes.** Most services give you eight to ten one-time recovery codes. Store them in your password manager or print them and keep them somewhere safe. They are how you get back in if you lose your phone.
4. **Add a second method.** Register a second security key, or a second device, where the service allows.
5. **Test it.** Sign out and sign back in using the new method before you close the settings page.
6. **Record which accounts use which method,** so changing phones is a checklist and not a crisis.

### When you change phones

Authenticator app codes live on the phone. Before resetting or replacing it, either use the app's own transfer or backup feature, or sign in to each service and move 2FA to the new phone. Do this while the old phone still works. Synced passkeys move automatically with your phone's account, which is one of their advantages.

## Rolling 2FA out across a team

1. **Start with administrators.** Require 2FA for every account with admin rights: email, hosting, registrar, website and finance.
2. **Then require it for everyone.** Most business email and software platforms let an administrator enforce 2FA for all users.
3. **Ban SMS where the platform allows,** and offer authenticator apps or passkeys instead.
4. **Write down the recovery process,** including who can reset a colleague's 2FA and how they confirm the request is genuine. Attackers often pose as an employee who lost their phone.
5. **Train people on prompts.** One rule covers most of it: never approve a sign-in you did not start, and report unexpected prompts.

For WordPress sites, two-factor login for every administrator and editor is one of the highest-value steps in our [WordPress security checklist](/wordpress-security-checklist).

## Frequently asked questions

### What is two-factor authentication?

Two-factor authentication requires two different kinds of proof to sign in, usually a password plus something you have, such as a code from your phone or a security key. A stolen password alone is then not enough to get into the account.

### Is SMS two-factor authentication safe?

It is much better than a password alone but is the weakest common method. NIST's SP 800-63B lists use of the telephone network for out-of-band verification as restricted, because codes can be intercepted or stolen through SIM swapping. Use an authenticator app or passkey where possible.

### What is the most secure type of 2FA?

Phishing-resistant methods based on cryptography: passkeys and hardware security keys. NIST states that typed codes, including SMS and authenticator app codes, are not phishing-resistant, while cryptographic authenticators are.

### What is a passkey?

A passkey is a sign-in credential based on FIDO standards that replaces a password. Your device holds a private key and proves possession of it after you unlock it with a fingerprint, face or PIN. It only works on the site it was created for, so it resists phishing.

### What happens if I lose my phone with 2FA on it?

Use the backup codes the service gave you when you set up 2FA, or a second registered device or security key. If you have neither, you will need the service's account recovery process, which can be slow. Save backup codes for every account before you need them.

### Are authenticator apps better than SMS?

Yes. Authenticator apps generate codes on your device, so they are not exposed to SIM swapping and work without mobile signal. They can still be phished if you type a code into a fake site, which passkeys and security keys prevent.

### Should a small business require 2FA for all employees?

Yes, starting with every administrator account and then all users. Business email and most software platforms let administrators enforce it. Prefer authenticator apps or passkeys over SMS, and document how lost devices are handled.

## Sources

- [NIST SP 800-63B: Digital Identity Guidelines, Authentication](https://pages.nist.gov/800-63-4/sp800-63b.html)
- [FIDO Alliance: Passkeys](https://fidoalliance.org/passkeys/)
- [CISA: More than a password](https://www.cisa.gov/MFA)
