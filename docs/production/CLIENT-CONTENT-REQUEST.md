# ALMAS — Content and Access Request

**Project:** ALMAS Restaurant website, Bahnhofstrasse 92, 5000 Aarau
**Stage:** 4 — Production planning
**Purpose:** Collect the facts, files and access needed to build and launch the production site
**Status:** Issued 18 November 2026 · updated 19 November 2026 for the WhatsApp ordering flow

Please send what you can in one batch. Items marked **P0** block the build or launch; **P1** are needed before the content freeze; **P2** improve the launch but can follow shortly after.

Do not send passwords by email. Use a password manager or a secure transfer link for credentials.

---

## 1. Menu verification — P0

The menu has been transcribed from your printed menu: **6 categories, 60 items**. We need you to verify it before it becomes the production menu.

Please review `docs/content/menu-source.md` (or the PDF/printout we send) and confirm:

- [ ] Every dish name is correct.
- [ ] Every description is correct; nothing is missing.
- [ ] Every price is correct.
- [ ] Pizza sizes are correct: standard and family 40 cm.
- [ ] The family price applies only to the pizzas that show one.
- [ ] The Döner Box price `12.00 / 10.00` is explained: which price is small, which is regular, or whether it should be shown exactly as printed.
- [ ] All items are currently available.
- [ ] Category names and order are correct: Teller, Pizza, Pide, Lahmacun, Snacks, Box · Salat · Dessert.
- [ ] The meat-origin footnote on the Teller category is current and can be published.
- [ ] The “Extra Pommes +2.00 · Extra Fleisch +3.00” note in Snacks is current.
- [ ] No dish has been discontinued or added since the printed menu.
- [ ] Any new dish or price change is supplied in writing.

**Allergens and dietary labels — P0 if you want them published**

We will not guess. If you want allergen or dietary information:

- [ ] Supply the allergens per dish, based on your recipes and supplier information.
- [ ] Confirm which dishes are vegetarian, vegan, gluten-free or lactose-free only if verified.
- [ ] Confirm who is responsible for keeping this information current.

If you do not have verified data, we will leave allergens and dietary labels off the site rather than publish something inaccurate.

---

## 2. Opening hours — P0 if shown

Hours are currently absent from the site. If you want them published:

- [ ] Full weekly schedule, including kitchen closing time if it differs from the restaurant closing time.
- [ ] Holiday closures and special hours for the next 12 months.
- [ ] Whether hours differ for takeaway.
- [ ] Who updates hours when they change.

If the hours are not verified, the site will launch without them. We will not show “probably open” times.

---

## 3. Contact and service — P0

- [ ] Email address for the website and enquiries.
- [ ] Who monitors that inbox and how quickly.
- [ ] Preferred phone number for the site: `062 797 50 00`?
- [ ] Confirmation that `062 797 50 00` is active on WhatsApp and may receive orders.
- [ ] Whether WhatsApp orders are for pickup only, delivery, dine-in, or a mix.
- [ ] Any limits the site must state (minimum order, pickup window), or anything it must not promise.
- [ ] Who monitors the WhatsApp inbox and within what timeframe.
- [ ] WhatsApp or other messaging channel, if you want it shown.
- [ ] Takeaway: yes/no, and how customers order.
- [ ] Delivery: yes/no, which provider, and the correct link.
- [ ] Reservations: yes/no, phone or provider.
- [ ] Online ordering: yes/no, which platform, and the correct link.
- [ ] Anything the site must **not** promise (for example delivery radius, delivery time, minimum order).

The preview now includes a WhatsApp ordering flow. Guests build an order on the
device, add an optional note, and press **Send via WhatsApp**. WhatsApp opens
with a prefilled message which the guest sends from their own account. The site
does not receive, store or confirm the order.

The target is currently the confirmed phone number `062 797 50 00`, stored as
`verified: false` because the printed menu only labels it as a telephone number.
Until you confirm it is on WhatsApp, the production gate fails and the number
must not be advertised as an ordering channel.

We will not build a fake ordering or reservation flow. We link to a real channel or show the phone.

---

## 4. Social media — P0

- [ ] Instagram URL.
- [ ] Facebook URL.
- [ ] TikTok URL.
- [ ] Any other profile you want linked.
- [ ] Confirmation that the accounts are official and active.

Until URLs arrive, the buttons stay disabled placeholders in preview. They will not ship as disabled buttons.

---

## 5. Domain, hosting and email — P0

- [ ] Who owns `almasrestaurant.ch`?
- [ ] Registrar name and account owner.
- [ ] Who controls DNS?
- [ ] Is there an existing website or email on the domain?
- [ ] Current email provider and who administers it.
- [ ] Google Business Profile access or the person who manages it.
- [ ] Preferred domain: `almasrestaurant.ch`, `www.almasrestaurant.ch`, or both?
- [ ] Any other domains or social handles that should redirect.

We will provide the exact DNS records. We will not change MX records without your email administrator.

---

## 6. Legal and privacy — P0

For a Swiss commercial website, we need:

- [ ] Exact legal name of the business.
- [ ] Legal form (sole proprietor, GmbH, AG, etc.).
- [ ] Registered address, if different from the restaurant.
- [ ] Commercial register number, if applicable.
- [ ] VAT number, if applicable.
- [ ] Name of the person responsible for the website content.
- [ ] Contact email and phone for legal/privacy enquiries.
- [ ] Any existing Impressum or privacy policy.
- [ ] Confirmation of whether you want a cookie banner (we recommend avoiding non-essential cookies so one is not needed).
- [ ] Confirmation of whether you collect any customer data through the site (forms, reservations, newsletter).
- [ ] Confirmation that the privacy policy may describe the WhatsApp ordering flow as implemented.
- [ ] Confirmation of how WhatsApp order messages are handled and how long they are kept, so the policy can be accurate.
- [ ] Your legal advisor's contact, if you have one.

We will draft the pages from your details, but a qualified Swiss advisor should review them before launch. We do not provide legal advice.

---

## 7. Story and positioning — P1

The current homepage uses approved generic brand copy. For the final site:

- [ ] Do you want a verified history section? If yes, supply the facts and dates.
- [ ] Founder/owner story, if you want it told.
- [ ] What makes ALMAS different, in your own words.
- [ ] Confirm whether the restaurant should be positioned as Afghan, Turkish, grill/Italian, or a combination.
- [ ] Confirm whether Afghan dishes exist and should be added. They are not on the supplied menu, so we have not invented any.
- [ ] Any awards, certifications or press coverage — only with a verifiable source.
- [ ] Any claims we must avoid.

---

## 8. Photography — P0 for launch

Stock placeholders are fine for preview, but not for launch. We need real photography of ALMAS.

**Shot list (minimum)**

- [ ] Hero: grill/fire or a signature dish, landscape and portrait crops.
- [ ] Kebab/plate or mixed grill.
- [ ] Pizza Margherita, whole and a slice.
- [ ] Pide, whole and cut.
- [ ] Lahmacun.
- [ ] Baklava/dessert.
- [ ] Interior: room, counter, seating, entrance sign.
- [ ] Preparation: hands, grill, dough/oven (no identifiable staff unless approved).
- [ ] Details: ingredients, table setting, signage.

**Technical**

- [ ] High-resolution originals (at least 3000 px on the long edge).
- [ ] RAW or high-quality JPEG.
- [ ] No heavy filters or text overlays.
- [ ] Usage rights for web and social, confirmed in writing.
- [ ] Photographer credit, if required.
- [ ] Delivery date.

**Per-dish photos for ordering — P0**

Every menu item opens a detail dialog. Until a real photo exists, the dialog
shows a category stock image with a visible “placeholder image” badge. Launch
requires real photography for every item that can be ordered.

- [ ] One photo per menu item, named with the item ID (for example `teller-kebab-plate.jpg`, `pizza-pizza-margherita.jpg`).
- [ ] At least 1600 px on the long edge for the dialog.
- [ ] The dish as actually served, without props that are not part of the order.
- [ ] Confirmation that each photo matches the named item.
- [ ] If fewer than 60 photos are possible, tell us as early as possible; the site cannot pass its production gate until every item has a real photo.

If a professional shoot is not possible, we can discuss a carefully directed phone shoot, but the final quality must be approved before launch.

---

## 9. Brand assets — P1

- [ ] Vector logo (AI, EPS, SVG or PDF), if one exists.
- [ ] Brand colours (Pantone/CMYK/RGB), if defined.
- [ ] Any existing brand guidelines.
- [ ] Confirmation that the recreated A + diamond mark is approved for production.
- [ ] Favicon/app icon preference.

If no vector exists, we will refine the mark from the menu cover, as agreed.

---

## 10. Analytics and consent — P1

- [ ] Choose one: no analytics / Vercel Analytics / Plausible.
- [ ] Confirm you do **not** want Google Analytics, Meta Pixel or TikTok Pixel.
- [ ] Confirm who should receive the monthly traffic summary.
- [ ] Confirm whether you need a cookie banner for any other tool.

We recommend cookie-free, aggregate analytics only.

---

## 11. Launch logistics — P0

- [ ] Target launch date.
- [ ] Preferred launch day/time (avoid Friday or a holiday).
- [ ] Approval contact for the final sign-off.
- [ ] Any blackout dates.
- [ ] Who will be available on launch day for a quick phone check.
- [ ] Who owns the domain/hosting/CMS accounts after handover.
- [ ] Support contact after launch.

---

## 12. How to send

- Put files in a shared folder (Google Drive, Dropbox, OneDrive) and send the link.
- Use a password manager for credentials; never send passwords in plain email.
- Name photos clearly: `almas-<subject>-<date>-<photographer>`.
- Send menu corrections as a marked-up document or a clear list.
- If something is unknown, say “unknown” rather than guessing. We will keep it off the site.

---

## 13. Suggested email

### German

**Betreff:** ALMAS Website — Inhalte und Zugänge für die Produktion

Guten Tag

Vielen Dank für die Freigabe des Light-Mode-Designs. Damit wir die Website produzieren und lancieren können, brauchen wir noch die folgenden Angaben und Dateien:

1. Verifizierte Speisekarte (6 Kategorien, 60 Gerichte) inklusive Preisen, Beschreibungen und Pizzagrössen.
2. Öffnungszeiten und Feiertage — oder die Bestätigung, dass keine Zeiten angezeigt werden.
3. E-Mail-Adresse, Telefonnummer, Bestätigung der WhatsApp-Bestellnummer und Angaben zu Takeaway, Lieferung und Reservationen.
4. Instagram-, Facebook- und TikTok-Links.
5. Domain, Registrar, DNS und E-Mail-Anbieter.
6. Rechtliche Angaben: Firmenname, Rechtsform, verantwortliche Person, Impressum und Datenschutz.
7. Verifizierte Geschichte/Positionierung und die Entscheidung zu afghanischen Gerichten.
8. Echte Fotos von Essen, Innenraum und Zubereitung mit Nutzungsrechten — inklusive je einem Foto pro Gericht für die Bestellansicht.
9. Gewünschtes Analytics (oder keine) und die verantwortliche Kontaktperson für den Launch.

Die vollständige Liste finden Sie im Dokument „ALMAS — Content and Access Request“. Bitte senden Sie Passwörter nicht per E-Mail, sondern über einen Passwortmanager.

Freundliche Grüsse

### English

**Subject:** ALMAS website — content and access for production

Hello

Thank you for approving the light-mode design. To produce and launch the website, we still need:

1. Verified menu (6 categories, 60 items), including prices, descriptions and pizza sizes.
2. Opening hours and holidays — or confirmation that no hours should be shown.
3. Email address, phone number, confirmation of the WhatsApp ordering number, and details for takeaway, delivery and reservations.
4. Instagram, Facebook and TikTok links.
5. Domain, registrar, DNS and email provider.
6. Legal details: legal name, legal form, responsible person, Impressum and privacy policy.
7. Verified story/positioning and the decision on Afghan dishes.
8. Real food, interior and preparation photography with usage rights — including one photo per dish for the ordering view.
9. Preferred analytics (or none) and the launch approval contact.

The full list is in “ALMAS — Content and Access Request”. Please do not send passwords by email; use a password manager.

Kind regards

---

## 14. What happens next

1. We review the inputs and flag anything missing or inconsistent.
2. We import the verified menu into the CMS.
3. We build the production site in Stage 5.
4. You review a private preview.
5. We run the launch checklist and agree a go/no-go.
6. We launch, monitor and hand over.

**Nothing is published and no production account is created until the Stage 4 plan and stack are approved.**
