A small business should use a business password manager instead of a shared spreadsheet, a notes app or one password reused across accounts. It gives every person their own vault, lets you share specific logins with specific people, and lets you remove someone's access in one step when they leave. Pricing is modest: Bitwarden's Teams plan is $4 per user per month on annual billing, so a five-person team pays $240 a year. Pair it with two-factor authentication on every important account and long, unique, generated passwords.

This guide explains what to look for, how a rollout works in practice, and what current security guidance says about passwords.

> **How this guide was researched.** Pricing for Bitwarden was read from its pricing page on October 8, 2026 and is linked under Sources, in US dollars on annual billing, excluding taxes. Bitwarden is used as the worked example because its plans and prices are published in full. 1Password's pricing page did not show business plan prices when we checked, so we have not quoted them. Password guidance quotes NIST Special Publication 800-63B. We have not run a hands-on comparison of password managers for this post.

## Why shared spreadsheets and reused passwords fail

Most small businesses start with something like this: a spreadsheet of logins on a shared drive, a few passwords everyone knows, and the same password on several services because it is easier to remember.

That arrangement fails in predictable ways.

- **One breach unlocks many accounts.** If the same password is used on your email, your hosting and your accounting software, a leak at any one service exposes all three.
- **Former staff keep access.** When someone leaves, every password they knew has to be changed. In practice, most are not.
- **No record of who has what.** You cannot tell who accessed the banking login last month.
- **The spreadsheet itself is a target.** Anyone who reaches that file reaches everything in it.

A password manager fixes each of these. Every person has a vault, shared items are shared deliberately, and access is removed by removing the person from the team.

## What current guidance says about passwords

The US National Institute of Standards and Technology publishes guidance that many organizations follow. Its current digital identity guidelines, SP 800-63B, overturn several habits people still enforce.

| Old habit | Current NIST guidance |
|-----------|-----------------------|
| Require a mix of uppercase, numbers and symbols | Verifiers "SHALL NOT impose other composition rules (e.g., requiring mixtures of different character types)" |
| Force everyone to change passwords every 90 days | Verifiers "SHALL NOT require subscribers to change passwords periodically", but must force a change if there is evidence of compromise |
| Short passwords are fine if complex | Passwords used as a single factor must be at least 15 characters |
| Anything that meets the rules is acceptable | New passwords must be checked against a blocklist of common, expected and compromised passwords |

The direction is clear: length beats complexity, forced rotation does more harm than good, and passwords already exposed in breaches must never be used. A password manager makes all three easy, because it generates long random passwords and you never have to remember them.

## What to look for in a business password manager

| Feature | Why it matters for a small team |
|---------|---------------------------------|
| Individual vaults for each person | Personal logins stay private, work logins are shared deliberately |
| Shared collections or vaults | Share the hosting login with the two people who need it, not everyone |
| Admin control of the account | The business owns the vault, not an individual employee |
| Easy offboarding | Remove a departing person and their access to shared items ends |
| Event logs | See who accessed or changed a shared login |
| Two-factor authentication support | Protects the password manager account itself |
| Browser extensions and mobile apps | People only use it if it fills passwords automatically |
| Import from browsers and spreadsheets | Move existing passwords in without retyping |
| Breach and weak password reports | Find reused and exposed passwords to fix first |
| Emergency or recovery access | Someone can still get in if the owner is unavailable |

## Bitwarden's plans as a worked example

Bitwarden publishes its full price list, which makes it a useful reference point for budgeting.

### Personal plans

| Plan | Price | Users | Key features |
|------|-------|-------|--------------|
| Free | $0 | 1 | Unlimited devices and passwords, sharing with one other user |
| Premium | $1.65 a month, $19.80 billed annually | 1 | Integrated authenticator, file attachments, emergency access, security reports, 5 GB storage |
| Families | $3.99 a month, $47.88 billed annually | Up to 6 | Six premium accounts, unlimited sharing |

### Business plans

| Plan | Price per user per month, billed annually | Key features |
|------|-------------------------------------------|--------------|
| Teams | $4 | Central ownership and management, secure sharing, event log auditing, directory sync, SCIM provisioning |
| Enterprise | $6 | Everything in Teams, plus granular access control, passwordless SSO, enterprise policies, self-hosting and a free Families plan for each user |

### What a team pays in a year

| Team size | Teams plan per year | Enterprise plan per year |
|-----------|---------------------|--------------------------|
| 3 people | $144 | $216 |
| 5 people | $240 | $360 |
| 10 people | $480 | $720 |
| 25 people | $1,200 | $1,800 |

For most small businesses, the Teams plan covers everything that matters: shared collections, central control and event logs. Enterprise becomes worth considering when you need single sign-on with your identity provider, fine-grained policies or self-hosting.

Prices exclude taxes. Other password managers price business plans in a similar range per user. Compare on the features in the earlier table, not on a dollar or two a month.

### Is the free plan enough for a business?

A personal free plan is a big step up from a spreadsheet for a one-person business. It is not designed for a team: shared items, ownership and offboarding are what the business plans add. Once a second person needs the same logins, move to a business plan so the business, not an individual, owns the vault.

## How to roll it out in a small team

### Week 1: Set up and secure the account

1. **Create the business account** using a company email address, not a personal one.
2. **Turn on two-factor authentication** for the owner account immediately. Use an authenticator app or a security key. [Two-Factor Authentication Explained](/two-factor-authentication-explained) compares the methods.
3. **Add a second owner or administrator,** so the business is not locked out if one person is unavailable.
4. **Create collections** by function: Website and hosting, Finance, Marketing, Admin.

### Week 2: Move passwords in

1. **Import from browsers and spreadsheets.** Password managers can import the CSV files that browsers export.
2. **Delete the old spreadsheet** and browser-saved passwords once the import is confirmed. Leaving copies around defeats the purpose.
3. **Move shared logins into collections** and give each person access only to the collections they need.

### Week 3: Invite the team

1. **Send invitations** and ask each person to set a long master password they have never used anywhere else.
2. **Require two-factor authentication** for every member.
3. **Install the browser extension and mobile app** together, in a short session. Adoption fails when people find it awkward on day one.

### Week 4: Fix the weak spots

1. **Run the password health reports** to find reused, weak and exposed passwords.
2. **Change the most important ones first:** email, domain registrar, hosting, banking, payment processor and the password manager itself.
3. **Turn on two-factor authentication** on each of those services while you are there.

## The accounts to protect first

If you only have time for a handful, start here. These are the accounts that control everything else.

| Account | Why it matters most |
|---------|---------------------|
| Business email | Password resets for every other account go here |
| Domain registrar | Controls your website and email addresses |
| DNS and hosting | Controls whether your site is online and what it shows |
| Payment processor | Direct access to money |
| Bank | Direct access to money |
| Password manager | Holds everything else |

An attacker who gets into your email or your registrar can take over most other accounts through password resets. [How to Transfer a Domain](/how-to-transfer-a-domain) covers securing your registrar account, and [WordPress Security Checklist](/wordpress-security-checklist) covers your website logins.

## When someone leaves

This is where a password manager pays for itself.

1. **Remove the person from the business account.** Their access to shared collections ends immediately.
2. **Check the event log** for any unusual access in their final days.
3. **Change the passwords for the most sensitive shared items** they could see, starting with finance and email. They may have copied them before leaving.
4. **Remove their accounts** on individual services, such as your hosting control panel and your website's admin area.
5. **Transfer ownership** of anything they owned personally inside the vault.

Without a password manager, step 3 means guessing which passwords they knew. With one, you have a list.

## Common mistakes

- **A weak or reused master password.** It protects everything. Make it long and unique, and protect the account with two-factor authentication.
- **One shared login for the password manager itself.** Every person needs their own account, or you lose the audit trail and the ability to remove one person.
- **Sharing everything with everyone.** Give each person the collections they need for their work.
- **Keeping the old spreadsheet "just in case".** Delete it.
- **No recovery plan.** Make sure at least two people can administer the account, and that someone knows where recovery codes are kept.

## What to tell your team

A short written policy makes a password manager stick. It does not need to be long. These seven rules cover most small businesses:

1. Every work login is stored in the company password manager. Nowhere else.
2. Use the password manager's generator. Do not invent passwords.
3. Never reuse a work password, and never use a personal password for work.
4. Turn on two-factor authentication for the password manager and for every work account that offers it.
5. Share logins only through the password manager, never by email, chat or text message.
6. Report a lost or stolen device on the same day.
7. If you think a password has been exposed, change it straight away and tell the administrator.

Put the policy in your onboarding checklist, so new starters set up the password manager on their first day instead of building the old habits first.

Review it once a year. When you add a new critical service, such as a new payment provider or a new hosting account, add it to the list of accounts to protect first and make sure it has two-factor authentication from day one.

## Frequently asked questions

### Does a small business need a password manager?

Yes, once more than one person shares logins. A password manager gives each person a private vault, shares specific logins deliberately, records who accessed what, and removes a departing employee's access in one step. Shared spreadsheets and reused passwords offer none of that.

### How much does a business password manager cost?

Bitwarden's Teams plan costs $4 per user per month billed annually, and its Enterprise plan costs $6, based on prices published in October 2026. A five-person team on Teams pays $240 a year. Other business password managers are priced in a similar range per user.

### Should employees change passwords every 90 days?

No. NIST's guidelines in SP 800-63B say verifiers shall not require periodic password changes, and should only force a change when there is evidence of compromise. Long, unique passwords stored in a password manager are more effective than frequent rotation.

### How long should a password be?

NIST's guidelines require passwords used as a single factor to be at least 15 characters, and say not to impose rules forcing mixtures of character types. Password managers can generate random passwords of 20 characters or more, which you never need to remember.

### Is a free password manager good enough for a business?

A free personal plan is fine for a sole trader. Teams need a business plan, which adds shared collections owned by the business, admin controls, event logs and simple offboarding. Without those, the vault belongs to an individual rather than the company.

### What happens if I forget my password manager's master password?

Most password managers cannot recover it, because they do not store it. Business plans usually let an administrator help a member regain access, depending on settings. Set up a second administrator and keep recovery codes somewhere safe before you need them.

### Should the password manager itself use two-factor authentication?

Yes. The password manager holds every other login, so it should be protected with two-factor authentication, ideally an authenticator app or a hardware security key. Require it for every member of the team, not just the owner.

## Sources

Bitwarden prices were read on October 8, 2026.

- [Bitwarden pricing](https://bitwarden.com/pricing/)
- [NIST SP 800-63B: Digital Identity Guidelines, Authentication](https://pages.nist.gov/800-63-4/sp800-63b.html)
- [1Password pricing](https://1password.com/pricing)
