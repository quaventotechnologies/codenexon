On a $50 online card sale in the US, Stripe charges 2.9% plus 30 cents, which is $1.75, and you keep $48.25. PayPal Checkout charges 3.49% plus 49 cents, which is $2.24, and you keep $47.76. PayPal's higher fixed fee makes the gap widest on small payments. PayPal's Advanced card rate of 2.89% plus 29 cents is almost identical to Stripe's, so the answer depends on which PayPal product you use.

This guide puts the published US fees side by side and works through real sale amounts, international payments, bank transfers and disputes.

> **How this guide was researched.** PayPal's rates were read from its US merchant fees page on October 6, 2026. Stripe's US rates are its long-standing published standard rates, cross-checked against several 2026 fee breakdowns, because Stripe's pricing page showed regional pricing when we loaded it. All take-home amounts are our own arithmetic, rounded to the cent. Fees differ by country and can be negotiated at volume, so confirm on each company's pricing page for your region.

## Stripe vs PayPal fees at a glance

| Fee type (US) | Stripe | PayPal |
|---------------|--------|--------|
| Online card payment | 2.9% + $0.30 | 2.99% + $0.49 (standard card) or 2.89% + $0.29 (advanced card) |
| Branded wallet checkout | Same as card | 3.49% + $0.49 (PayPal Checkout) |
| International card | Add 1.5% | Add 1.50% |
| Currency conversion | Add 1% | 4.00% on most conversions, 3.00% on some |
| Manually entered card | Add 0.5% | Depends on product |
| ACH bank payment | 0.8%, capped at $5 | Not listed on the standard fees table |
| Invoices | Card rate, plus an invoicing fee on some plans | 3.49% + $0.49 through PayPal, 2.99% + $0.49 by card |
| QR code payment | Not applicable | 2.29% + $0.09 |
| Dispute or chargeback | $15 | $15 standard dispute fee, $20 chargeback fee |
| Monthly fee | None for standard payments | None for standard payments |

Neither company charges a setup fee or a monthly fee for its standard payment products.

## PayPal has four different rates

Most confusion about PayPal's cost comes from treating it as one price. It has several, and the one you pay depends on how the customer checks out.

| PayPal product | Rate | When it applies |
|----------------|------|-----------------|
| PayPal Checkout | 3.49% + $0.49 | The customer pays with the PayPal button, a PayPal balance or Pay Later |
| Standard credit and debit card payments | 2.99% + $0.49 | The customer types a card into PayPal's standard hosted form |
| Advanced credit and debit card payments | 2.89% + $0.29 | You integrate PayPal's card fields into your own checkout |
| QR code transactions | 2.29% + $0.09 | In-person payments by QR code |

A store that offers the yellow PayPal button pays the 3.49% rate on every order placed through it. A store that uses PayPal only as its card processor through the advanced integration pays 2.89% plus 29 cents, which is fractionally below Stripe.

Many stores end up with a mix. If 40% of your customers click the PayPal button, 40% of your orders carry the higher rate regardless of which card processor handles the rest.

## What you keep on each sale

The fixed part of the fee matters more as the sale gets smaller. This table shows the fee and the amount you keep for four US card sale sizes.

| Sale | Stripe (2.9% + $0.30) | PayPal Checkout (3.49% + $0.49) | PayPal standard card (2.99% + $0.49) | PayPal advanced card (2.89% + $0.29) |
|------|-----------------------|---------------------------------|--------------------------------------|--------------------------------------|
| $10 | Fee $0.59, keep $9.41 | Fee $0.84, keep $9.16 | Fee $0.79, keep $9.21 | Fee $0.58, keep $9.42 |
| $50 | Fee $1.75, keep $48.25 | Fee $2.24, keep $47.76 | Fee $1.99, keep $48.01 | Fee $1.74, keep $48.26 |
| $100 | Fee $3.20, keep $96.80 | Fee $3.98, keep $96.02 | Fee $3.48, keep $96.52 | Fee $3.18, keep $96.82 |
| $500 | Fee $14.80, keep $485.20 | Fee $17.94, keep $482.06 | Fee $15.44, keep $484.56 | Fee $14.74, keep $485.26 |

### The fee as a share of the sale

| Sale | Stripe | PayPal Checkout |
|------|--------|-----------------|
| $10 | 5.9% | 8.4% |
| $50 | 3.5% | 4.5% |
| $100 | 3.2% | 4.0% |
| $500 | 3.0% | 3.6% |

On a $10 sale, PayPal Checkout takes 8.4% of the money. On a $500 sale it takes 3.6%. If you sell low-priced items such as digital downloads, tips or small subscriptions, the 49 cent fixed fee is the number to watch.

## What it adds up to in a month

Take a small online store with 200 orders a month at an average of $50, for $10,000 in sales.

| Scenario | Monthly fees | Share of sales |
|----------|--------------|----------------|
| All orders through Stripe | $350.00 | 3.50% |
| All orders through PayPal advanced card | $347.00 | 3.47% |
| All orders through PayPal standard card | $397.00 | 3.97% |
| All orders through PayPal Checkout | $447.00 | 4.47% |
| 60% Stripe cards, 40% PayPal Checkout | $388.80 | 3.89% |

The difference between the cheapest and most expensive row is $100 a month, or $1,200 a year, on the same $10,000 of sales.

The last row is the realistic one. Most stores offer both a card form and a PayPal button, because some shoppers will only pay with PayPal. The question to ask is not which is cheaper, but whether the PayPal button brings in enough extra orders to cover its higher rate. For many stores it does. In this example the button adds $38.80 a month in fees compared with sending everything through Stripe, which is less than the revenue from a single $50 order.

## International payments

Both companies add a surcharge when the customer's card or account is from another country, and both charge for currency conversion.

| | Stripe | PayPal |
|---|--------|--------|
| Cross-border surcharge | 1.5% | 1.50% |
| Currency conversion | 1% | 4.00% on most conversions |

Here is a $50 sale to a customer abroad, paid in a currency that needs converting.

**Stripe:** 2.9% plus 1.5% plus 1% is 5.4%, or $2.70, plus the 30 cent fixed fee. The total is $3.00, and you keep $47.00.

**PayPal Checkout:** 3.49% plus 1.50% is 4.99%, or $2.50 after rounding, plus the fixed fee, which is $0.49 for US dollars and differs by currency. That is about $2.99 before conversion. If PayPal converts the money, its conversion charge of 4.00% is built into the exchange rate you receive.

The transaction fees come out almost level. Currency conversion is where they separate: 1% against 4%. A business with many overseas customers should look closely at that line. Both platforms let you hold balances in some foreign currencies, which avoids conversion on money you will spend in that currency anyway.

## Bank payments for larger invoices

Card fees are a percentage with no ceiling, so they get expensive on large invoices. Stripe's ACH Direct Debit rate is 0.8% with a $5 cap, which changes the math for service businesses.

| Invoice amount | Stripe card fee | Stripe ACH fee |
|----------------|-----------------|----------------|
| $200 | $6.10 | $1.60 |
| $500 | $14.80 | $4.00 |
| $1,000 | $29.30 | $5.00 |
| $5,000 | $145.30 | $5.00 |

On a $5,000 invoice, ACH saves $140.30. The trade-offs are speed and risk. Bank payments take several business days to settle and can fail after the fact if the account lacks funds. For a consultant or agency billing known clients, offering ACH on invoices over a few hundred dollars is an easy saving.

PayPal's standard merchant fee table lists invoice payments at 3.49% plus 49 cents when the client pays with PayPal, and 2.99% plus 49 cents when they pay by card. On a $5,000 invoice paid through PayPal that is $174.99.

## Disputes and chargebacks

A dispute happens when a customer asks their bank or PayPal to reverse a payment.

| | Stripe | PayPal |
|---|--------|--------|
| Fee per dispute | $15 | $15 for a standard dispute |
| Fee per card chargeback | Included above | $20 |

Both companies charge when a dispute is filed, on top of holding the disputed amount while it is reviewed. PayPal's fee page lists a $15 standard dispute fee for claims filed through PayPal and a separate $20 chargeback fee when the buyer disputes through their card issuer.

One dispute can wipe out the profit on a dozen small sales. Clear billing descriptors, order confirmation emails and a visible refund policy do more to control this cost than the choice of processor. Authenticated email helps here too, since confirmation emails that land in spam lead to "I do not recognize this charge" disputes. See [SPF, DKIM and DMARC Explained](/spf-dkim-dmarc-explained).

## Getting paid: payouts and instant transfers

Standard payouts to your bank account are free on both platforms and take a couple of business days.

Both also offer instant transfers to a debit card or bank for a fee. PayPal's fees page lists instant transfer at 1.50% of the amount, with a minimum of $0.50. On a $1,000 transfer that is $15. Stripe charges a percentage for instant payouts as well, so check its current rate before relying on it.

If cash flow is tight, that fee is a real cost. Paying 1.5% to get money two days earlier, every week, is expensive credit. Use instant transfers for emergencies, not as a habit.

## Fees are not the only difference

A fraction of a percent matters less than whether the tool fits how you sell.

| Consideration | Stripe | PayPal |
|---------------|--------|--------|
| Customer experience | Card form inside your own site | Customer often leaves to log in to PayPal, or uses the button |
| Buyer familiarity | Invisible to the buyer | Highly recognized. Some buyers prefer it |
| Developer tools | Extensive API and documentation | Good, with more product variations to choose between |
| Subscriptions | Built-in billing product | Supported |
| Setup without code | Payment links and hosted checkout | Buttons and payment links |
| Wallets | Apple Pay, Google Pay and others through one integration | PayPal balance, Venmo and Pay Later through its button |

For a custom-built site or app, Stripe is usually the simpler integration. For a seller with no website, PayPal invoices and links are quick to start with. For an online store, the common answer is both: Stripe or a similar processor for cards, and the PayPal button for shoppers who want it.

## How to lower your payment fees

1. **Check which PayPal rate you are on.** If you process cards through PayPal's standard form at 2.99% plus 49 cents, the advanced integration at 2.89% plus 29 cents saves 25 cents on a $50 sale.
2. **Offer ACH for large invoices.** At 0.8% it costs less than a card at any amount, and the fee stops rising once an invoice passes $625.
3. **Set a minimum order or bundle small items.** The fixed fee is the same on a $5 sale and a $50 sale.
4. **Bill annually where it suits the customer.** One $120 charge on Stripe costs $3.78. Twelve $10 charges cost $7.08.
5. **Avoid unnecessary currency conversion.** Hold foreign balances if you have costs in that currency.
6. **Ask for volume pricing.** Both companies offer custom rates to larger businesses. Stripe mentions custom pricing for high volume, and PayPal has merchant rate programs. It costs nothing to ask once you process steady volume.
7. **Reduce disputes.** Each one costs $15 to $20 before you count the lost sale.

Passing fees on to customers as a surcharge is regulated. Card network rules and state laws limit when and how you can do it, and debit cards are treated differently from credit cards. Check the rules for your location before adding one.

## Which should you choose?

| If you | Consider |
|--------|----------|
| Run a custom website or app and want one integration | Stripe |
| Sell mostly low-priced items under $20 | Stripe, or PayPal advanced card payments |
| Send large invoices to business clients | Stripe with ACH enabled |
| Sell to customers who expect a PayPal button | Both, with PayPal as a second option |
| Have no website and need to take a payment today | PayPal invoices or payment links |
| Sell heavily to customers abroad | Compare currency conversion costs closely before deciding |

If you are setting up a store from scratch, the payment processor is one of several running costs to plan for. Hosting is another, and its headline prices need the same scrutiny. See [Web Hosting Renewal Prices](/web-hosting-renewal-prices).

## Frequently asked questions

### Is Stripe cheaper than PayPal?

Compared with PayPal Checkout, yes. Stripe's US rate is 2.9% plus 30 cents, against 3.49% plus 49 cents for PayPal Checkout. On a $50 sale that is $1.75 against $2.24. PayPal's advanced card rate of 2.89% plus 29 cents is about the same as Stripe.

### What percentage does PayPal take in 2026?

For US merchants, PayPal lists 3.49% plus $0.49 for PayPal Checkout, 2.99% plus $0.49 for standard card payments, 2.89% plus $0.29 for advanced card payments and 2.29% plus $0.09 for QR code payments. International payments add 1.50%.

### How much does Stripe charge per transaction?

Stripe's standard US rate for online card payments is 2.9% plus 30 cents per successful charge. International cards add 1.5%, currency conversion adds 1%, and manually entered cards add 0.5%. ACH Direct Debit costs 0.8% with a $5 cap.

### Why is PayPal more expensive on small payments?

PayPal's fixed fee is 49 cents on Checkout and standard card payments, compared with 30 cents on Stripe. On a $10 sale, PayPal Checkout's total fee is $0.84, which is 8.4% of the sale. Stripe's is $0.59, or 5.9%.

### Should I offer both Stripe and PayPal?

Many online stores do. Cards go through Stripe at the lower rate, and the PayPal button serves shoppers who prefer it. The PayPal orders cost more per sale, so the button is worth keeping when it brings in orders you would otherwise lose.

### What is the cheapest way to accept a large payment?

A bank payment. Stripe's ACH Direct Debit costs 0.8% with a $5 cap, so a $5,000 invoice costs $5 instead of $145.30 by card. Bank payments take several business days to settle and can be returned if the account lacks funds.

### Do Stripe and PayPal charge monthly fees?

No, not for their standard payment products. Both charge per transaction with no setup or monthly fee. Some optional products, such as advanced billing, invoicing tiers, fraud tools and certain PayPal payment packages, carry their own monthly or per-use charges.

## Sources

PayPal fees were read on October 6, 2026. Confirm current rates for your country before making a decision.

- [PayPal US merchant fees](https://www.paypal.com/us/business/paypal-business-fees)
- [Stripe pricing](https://stripe.com/pricing)
- [Google Workspace Admin Help: Email sender guidelines](https://support.google.com/a/answer/81126?hl=en)
