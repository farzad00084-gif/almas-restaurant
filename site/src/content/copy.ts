import type { Locale, Localized } from "./types";

export interface UiCopy {
  skipToContent: string;
  brandAria: string;
  mainNavLabel: string;
  mobileNavLabel: string;
  menuNavLabel: string;
  home: string;
  menu: string;
  kitchen: string;
  origin: string;
  visit: string;
  openMenu: string;
  closeMenu: string;
  languageLabel: string;
  themeToggle: string;
  switchToDark: string;
  switchToLight: string;
  address: string;
  phone: string;
  contact: string;
  follow: string;
  explore: string;
  legal: string;
  contents: string;
  imprint: string;
  privacy: string;
  call: string;
  directions: string;
  quickNavLabel: string;
  mapConsentTitle: string;
  mapConsentBody: string;
  loadMap: string;
  mapIframeTitle: string;
  mapPrivacyNote: string;
  socialPlaceholderNote: string;
  previewTag: string;
  previewFooterNote: string;
  previewAria: string;
  notFoundEyebrow: string;
  notFoundTitle: string;
  notFoundBody: string;
  backHome: string;
  viewMenu: string;
}

export const ui: Record<Locale, UiCopy> = {
  de: {
    skipToContent: "Zum Inhalt springen",
    brandAria: "ALMAS Restaurant — Aarau",
    mainNavLabel: "Hauptnavigation",
    mobileNavLabel: "Mobile Navigation",
    menuNavLabel: "Speisekarten-Navigation",
    home: "Startseite",
    menu: "Speisekarte",
    kitchen: "Küche",
    origin: "Herkunft",
    visit: "Besuch",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schliessen",
    languageLabel: "Sprache",
    themeToggle: "Farbmodus wechseln",
    switchToDark: "Zum dunklen Modus wechseln",
    switchToLight: "Zum hellen Modus wechseln",
    address: "Adresse",
    phone: "Telefon",
    contact: "Kontakt",
    follow: "Folgen",
    explore: "Entdecken",
    legal: "Rechtliches",
    contents: "Inhalt",
    imprint: "Impressum",
    privacy: "Datenschutz",
    call: "Anrufen",
    directions: "Route",
    quickNavLabel: "Schnellzugriff",
    mapConsentTitle: "Karte laden?",
    mapConsentBody:
      "Die Karte wird von OpenStreetMap geladen. Mit dem Klick werden Daten an OpenStreetMap übertragen.",
    loadMap: "Karte laden",
    mapIframeTitle: "Karte: Bahnhofstrasse 92, 5000 Aarau",
    mapPrivacyNote: "Mehr im Datenschutz",
    socialPlaceholderNote: "Links folgen in Kürze.",
    previewTag: "Stage 5 · Vorschau",
    previewFooterNote:
      "Vorschau, nicht veröffentlicht. Symbolbilder von Unsplash. Preise und Angaben gemäss Speisekarte, vor Veröffentlichung zu bestätigen.",
    previewAria: "Vorschauhinweis",
    notFoundEyebrow: "Fehler 404",
    notFoundTitle: "Diese Seite gibt es nicht.",
    notFoundBody:
      "Die Adresse ist falsch oder die Seite wurde verschoben. Zurück zur Startseite oder direkt zur Speisekarte.",
    backHome: "Zur Startseite",
    viewMenu: "Zur Speisekarte",
  },
  en: {
    skipToContent: "Skip to content",
    brandAria: "ALMAS Restaurant — Aarau",
    mainNavLabel: "Main navigation",
    mobileNavLabel: "Mobile navigation",
    menuNavLabel: "Menu navigation",
    home: "Home",
    menu: "Menu",
    kitchen: "Kitchen",
    origin: "Origin",
    visit: "Visit",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageLabel: "Language",
    themeToggle: "Switch colour mode",
    switchToDark: "Switch to dark mode",
    switchToLight: "Switch to light mode",
    address: "Address",
    phone: "Phone",
    contact: "Contact",
    follow: "Follow",
    explore: "Explore",
    legal: "Legal",
    contents: "Contents",
    imprint: "Imprint",
    privacy: "Privacy",
    call: "Call",
    directions: "Directions",
    quickNavLabel: "Quick actions",
    mapConsentTitle: "Load the map?",
    mapConsentBody:
      "The map is loaded from OpenStreetMap. Clicking will transfer data to OpenStreetMap.",
    loadMap: "Load map",
    mapIframeTitle: "Map: Bahnhofstrasse 92, 5000 Aarau",
    mapPrivacyNote: "More in the privacy policy",
    socialPlaceholderNote: "Links to follow shortly.",
    previewTag: "Stage 5 · Preview",
    previewFooterNote:
      "Preview, not published. Placeholder photography from Unsplash. Prices and details as printed on the menu, to be confirmed before publication.",
    previewAria: "Preview notice",
    notFoundEyebrow: "Error 404",
    notFoundTitle: "This page does not exist.",
    notFoundBody:
      "The address is wrong or the page has moved. Return to the homepage or go straight to the menu.",
    backHome: "Back to home",
    viewMenu: "View the menu",
  },
};

export interface Headline {
  lead: string;
  accent: string;
}

export interface HomeCopy {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    headline: Headline;
    sub: string;
    primaryCta: string;
    secondaryCta: string;
    credit: string;
  };
  statement: {
    index: string;
    label: string;
    headline: Headline;
    body: string;
    signature: string;
  };
  craft: {
    index: string;
    label: string;
    headline: Headline;
    body: string;
    placeholderNote: string;
    link: string;
  };
  menuPreview: {
    index: string;
    label: string;
    headline: Headline;
    link: string;
    note: string;
    dishNote: string;
    items: {
      menuItemId: string;
      mediaId: string;
      description?: Localized;
    }[];
  };
  bread: {
    eyebrow: string;
    headline: Headline;
    body: string;
    link: string;
  };
  origin: {
    index: string;
    label: string;
    headline: Headline;
    items: { label: Localized; value: Localized }[];
    note: string;
  };
  visit: {
    index: string;
    label: string;
    headline: Headline;
    lede: string;
    call: string;
    directions: string;
  };
}

export const homeCopy: Record<Locale, HomeCopy> = {
  de: {
    meta: {
      title: "ALMAS Restaurant — Grill, Teig, Aarau",
      description:
        "ALMAS Restaurant, Bahnhofstrasse 92, 5000 Aarau: Grill, Pizza, Pide, Lahmacun und Baklava. Speisekarte und Kontakt.",
    },
    hero: {
      eyebrow: "ALMAS Restaurant · Aarau",
      headline: { lead: "Grill. Teig.", accent: "Gastfreundschaft." },
      sub: "Fleisch vom Grill, Pizza und Pide aus dem Ofen, Baklava zum Schluss. An der Bahnhofstrasse in Aarau.",
      primaryCta: "Speisekarte ansehen",
      secondaryCta: "Besuch planen",
      credit: "Symbolbild · Stock",
    },
    statement: {
      index: "01",
      label: "Das Haus",
      headline: { lead: "Viele Facetten.", accent: "Ein Tisch." },
      body: "ALMAS Restaurant ist ein Restaurant an der Bahnhofstrasse in Aarau. Auf den Tisch kommt, was Grill und Ofen hergeben: Fleisch, Pizza, Pide, Lahmacun, Salate und Baklava zum Schluss. Gutes Essen, ein gedeckter Tisch und Zeit für den Abend — mehr muss es nicht sein.",
      signature: "ALMAS Restaurant · Bahnhofstrasse 92 · 5000 Aarau",
    },
    craft: {
      index: "02",
      label: "Teig",
      headline: { lead: "Drei Formen.", accent: "Ein Ofen." },
      body: "Pide, Lahmacun und Pizza teilen den Ofen. Auf der Karte stehen sie neben dem Grill, nicht dahinter. Teig ist hier keine Beilage.",
      placeholderNote:
        "Symbolbild · Teig und Ofen werden vor der Veröffentlichung fotografiert.",
      link: "Pide und Pizza ansehen",
    },
    menuPreview: {
      index: "03",
      label: "Aus der Küche",
      headline: { lead: "Was auf den", accent: "Tisch kommt." },
      link: "Ganze Speisekarte",
      note: "Symbolbilder. Preise gemäss gedruckter Speisekarte; vor Veröffentlichung zu bestätigen.",
      dishNote: "Symbolbild",
      items: [
        {
          menuItemId: "teller-grilled-lamb-plate",
          mediaId: "kebab-plate",
        },
        {
          menuItemId: "pizza-pizza-margherita",
          mediaId: "pizza-margherita",
          description: {
            de: "Tomaten, Mozzarella, Oregano. Familienpizza 40 cm: 24.00.",
            en: "Tomatoes, mozzarella, oregano. Family pizza 40 cm: 24.00.",
          },
        },
        { menuItemId: "box-baklava", mediaId: "baklava" },
      ],
    },
    bread: {
      eyebrow: "04 — Ofen",
      headline: { lead: "Aus dem", accent: "Ofen." },
      body: "Pide, Lahmacun und Pizza kommen aus dem Ofen. Auf der Karte stehen sie gleichberechtigt neben dem Grill — Teig gehört hier zum Tisch.",
      link: "Zur Speisekarte",
    },
    origin: {
      index: "05",
      label: "Herkunft",
      headline: { lead: "Woher das", accent: "Fleisch kommt." },
      items: [
        {
          label: { de: "Poulet", en: "Chicken" },
          value: { de: "CH / Brasilien", en: "CH / Brazil" },
        },
        {
          label: { de: "Lamm", en: "Lamb" },
          value: {
            de: "Neuseeland / Australien",
            en: "New Zealand / Australia",
          },
        },
        {
          label: { de: "Rind / Kalb", en: "Beef / veal" },
          value: { de: "CH", en: "CH" },
        },
        {
          label: {
            de: "Salami / Vorderschinken / Speck",
            en: "Salami / ham / bacon",
          },
          value: { de: "CH", en: "CH" },
        },
        {
          label: { de: "Pangasius / Crevetten", en: "Pangasius / prawns" },
          value: { de: "Vietnam", en: "Vietnam" },
        },
      ],
      note: "Angaben gemäss gedruckter Speisekarte. Vor Veröffentlichung vom Restaurant bestätigen lassen.",
    },
    visit: {
      index: "06",
      label: "Besuch",
      headline: { lead: "Komm", accent: "vorbei." },
      lede: "Bahnhofstrasse 92, 5000 Aarau. Rufen Sie an oder kommen Sie direkt vorbei.",
      call: "Anrufen",
      directions: "Route öffnen",
    },
  },
  en: {
    meta: {
      title: "ALMAS Restaurant — Grill, dough, Aarau",
      description:
        "ALMAS Restaurant, Bahnhofstrasse 92, 5000 Aarau: grill, pizza, pide, lahmacun and baklava. Menu and contact.",
    },
    hero: {
      eyebrow: "ALMAS Restaurant · Aarau",
      headline: { lead: "Grill. Dough.", accent: "Hospitality." },
      sub: "Meat from the grill, pizza and pide from the oven, baklava to finish. On Bahnhofstrasse in Aarau.",
      primaryCta: "View the menu",
      secondaryCta: "Plan a visit",
      credit: "Placeholder · stock",
    },
    statement: {
      index: "01",
      label: "The house",
      headline: { lead: "Many facets.", accent: "One table." },
      body: "ALMAS Restaurant is a restaurant on Bahnhofstrasse in Aarau. The table is set with what the grill and the oven give: meat, pizza, pide, lahmacun, salads and baklava to finish. Good food, a set table and time for the evening — it does not need more than that.",
      signature: "ALMAS Restaurant · Bahnhofstrasse 92 · 5000 Aarau",
    },
    craft: {
      index: "02",
      label: "Dough",
      headline: { lead: "Three shapes.", accent: "One oven." },
      body: "Pide, lahmacun and pizza share the oven. On the menu they stand beside the grill, not behind it. Dough is not a side dish here.",
      placeholderNote:
        "Placeholder image · dough and oven to be photographed before publication.",
      link: "See pide and pizza",
    },
    menuPreview: {
      index: "03",
      label: "From the kitchen",
      headline: { lead: "What comes", accent: "to the table." },
      link: "Full menu",
      note: "Placeholder images. Prices as printed on the menu; to be confirmed before publication.",
      dishNote: "Placeholder image",
      items: [
        {
          menuItemId: "teller-grilled-lamb-plate",
          mediaId: "kebab-plate",
        },
        {
          menuItemId: "pizza-pizza-margherita",
          mediaId: "pizza-margherita",
          description: {
            de: "Tomaten, Mozzarella, Oregano. Familienpizza 40 cm: 24.00.",
            en: "Tomatoes, mozzarella, oregano. Family pizza 40 cm: 24.00.",
          },
        },
        { menuItemId: "box-baklava", mediaId: "baklava" },
      ],
    },
    bread: {
      eyebrow: "04 — Oven",
      headline: { lead: "From the", accent: "oven." },
      body: "Pide, lahmacun and pizza come from the oven. On the menu they stand alongside the grill — dough belongs at this table.",
      link: "See the menu",
    },
    origin: {
      index: "05",
      label: "Origin",
      headline: { lead: "Where the", accent: "meat comes from." },
      items: [
        {
          label: { de: "Poulet", en: "Chicken" },
          value: { de: "CH / Brasilien", en: "CH / Brazil" },
        },
        {
          label: { de: "Lamm", en: "Lamb" },
          value: {
            de: "Neuseeland / Australien",
            en: "New Zealand / Australia",
          },
        },
        {
          label: { de: "Rind / Kalb", en: "Beef / veal" },
          value: { de: "CH", en: "CH" },
        },
        {
          label: {
            de: "Salami / Vorderschinken / Speck",
            en: "Salami / ham / bacon",
          },
          value: { de: "CH", en: "CH" },
        },
        {
          label: { de: "Pangasius / Crevetten", en: "Pangasius / prawns" },
          value: { de: "Vietnam", en: "Vietnam" },
        },
      ],
      note: "As printed on the menu. To be confirmed by the restaurant before publication.",
    },
    visit: {
      index: "06",
      label: "Visit",
      headline: { lead: "Come", accent: "by." },
      lede: "Bahnhofstrasse 92, 5000 Aarau. Call us or simply come by.",
      call: "Call",
      directions: "Get directions",
    },
  },
};

export interface OrderingCopy {
  hint: string;
  noscript: string;
  detailsAria: string;
  action: string;
  dialog: {
    close: string;
    quantity: string;
    decrease: string;
    increase: string;
    add: string;
    added: string;
    viewOrder: string;
    placeholderPhoto: string;
    noDescription: string;
    priceNote: string;
    sizeLabel: string;
    unknownPrice: string;
  };
  cart: {
    title: string;
    close: string;
    open: string;
    empty: string;
    emptyBody: string;
    noteLabel: string;
    notePlaceholder: string;
    total: string;
    totalPartial: string;
    unknownLine: string;
    remove: string;
    clear: string;
    send: string;
    sendHint: string;
    priceNote: string;
    backToMenu: string;
    itemOne: string;
    itemMany: string;
  };
  message: {
    greeting: string;
    intro: string;
    total: string;
    totalPartial: string;
    unknownPrice: string;
    noteLabel: string;
    confirmation: string;
    thanks: string;
  };
}

export interface MenuPageCopy {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    titleBefore: string;
    titleAccent: string;
    intro: string;
    note: string;
  };
  galleryAria: string;
  ordering: OrderingCopy;
  cta: {
    eyebrow: string;
    headline: Headline;
    body: string;
    note: string;
  };
}

export const menuPageCopy: Record<Locale, MenuPageCopy> = {
  de: {
    meta: {
      title: "Speisekarte — ALMAS Restaurant Aarau",
      description:
        "Die Speisekarte von ALMAS, Bahnhofstrasse 92, 5000 Aarau: Teller, Pizza, Pide, Lahmacun, Snacks, Boxen, Salat und Dessert. Preise in CHF.",
    },
    hero: {
      eyebrow: "ALMAS · Speisekarte",
      titleBefore: "Speise",
      titleAccent: "karte",
      intro:
        "Grill, Ofen, Teig. Die vollständige Karte — von Tellern über Pizza und Pide bis zum Dessert.",
      note: "Preise in CHF · Stand November 2026 · Änderungen vorbehalten",
    },
    galleryAria: "Einblicke in die Küche",
    ordering: {
      hint: "Tippen Sie auf ein Gericht: Details, Foto und Bestellung.",
      noscript:
        "Die Bestellfunktion benötigt JavaScript. Telefonisch erreichen Sie uns unter 062 797 50 00.",
      detailsAria: "Details und Bestellung",
      action: "Bestellen",
      dialog: {
        close: "Schliessen",
        quantity: "Menge",
        decrease: "Menge verringern",
        increase: "Menge erhöhen",
        add: "Zur Bestellung hinzufügen",
        added: "Zur Bestellung hinzugefügt.",
        viewOrder: "Bestellung ansehen",
        placeholderPhoto: "Platzhalterbild — kein Foto dieses Gerichts.",
        noDescription:
          "Die gedruckte Karte nennt zu diesem Gericht keine weiteren Angaben.",
        priceNote: "Preis gemäss gedruckter Karte, noch nicht bestätigt.",
        sizeLabel: "Ausführung",
        unknownPrice:
          "Auf der Karte steht ein doppelter Preis. Der einzelne Preis ist nicht eindeutig; bitte im Restaurant bestätigen.",
      },
      cart: {
        title: "Ihre Bestellung",
        close: "Schliessen",
        open: "Bestellung ansehen",
        empty: "Noch nichts ausgewählt.",
        emptyBody:
          "Tippen Sie in der Speisekarte auf ein Gericht, um es hinzuzufügen.",
        noteLabel: "Anmerkung (optional)",
        notePlaceholder: "z. B. ohne Zwiebeln, ohne scharfe Sauce",
        total: "Total gemäss Website",
        totalPartial: "Teiltotal der Positionen mit Einzelpreis",
        unknownLine:
          "Für diese Position ist auf der Karte kein einzelner Preis angegeben.",
        remove: "Entfernen",
        clear: "Bestellung leeren",
        send: "Über WhatsApp senden",
        sendHint:
          "WhatsApp öffnet sich mit einer vorbereiteten Nachricht. Sie senden sie dort selbst ab.",
        priceNote:
          "Die Preise auf dieser Website sind noch nicht bestätigt. Bitte prüfen Sie die Nachricht vor dem Senden.",
        backToMenu: "Weiter zur Karte",
        itemOne: "1 Position",
        itemMany: "Positionen",
      },
      message: {
        greeting: "Hallo ALMAS",
        intro: "ich möchte folgende Bestellung aufgeben:",
        total: "Total gemäss Website (noch nicht bestätigt)",
        totalPartial:
          "Teiltotal der Positionen mit Einzelpreis (noch nicht bestätigt)",
        unknownPrice:
          "Hinweis: Für diese Position ist auf der Karte kein einzelner Preis angegeben:",
        noteLabel: "Anmerkung",
        confirmation: "Bitte bestätigen Sie mir Verfügbarkeit und Preis.",
        thanks: "Vielen Dank.",
      },
    },
    cta: {
      eyebrow: "Fragen zur Karte",
      headline: { lead: "Lieber direkt", accent: "fragen?" },
      body: "Für Fragen zu Gerichten, Allergenen oder grösseren Bestellungen rufen Sie uns an.",
      note: "Alle Preise und Angaben gemäss gedruckter Speisekarte. Vor Veröffentlichung vom Restaurant bestätigen lassen.",
    },
  },
  en: {
    meta: {
      title: "Menu — ALMAS Restaurant Aarau",
      description:
        "The menu at ALMAS, Bahnhofstrasse 92, 5000 Aarau: plates, pizza, pide, lahmacun, snacks, boxes, salad and dessert. Prices in CHF.",
    },
    hero: {
      eyebrow: "ALMAS · Menu",
      titleBefore: "The ",
      titleAccent: "menu",
      intro:
        "Grill, oven, dough. The complete menu — from plates and pizza to pide and dessert.",
      note: "Prices in CHF · As of November 2026 · Subject to change",
    },
    galleryAria: "Impressions from the kitchen",
    ordering: {
      hint: "Tap a dish for details, a photo and ordering.",
      noscript:
        "Ordering needs JavaScript. You can reach us by phone on 062 797 50 00.",
      detailsAria: "Details and ordering",
      action: "Order",
      dialog: {
        close: "Close",
        quantity: "Quantity",
        decrease: "Decrease quantity",
        increase: "Increase quantity",
        add: "Add to order",
        added: "Added to your order.",
        viewOrder: "View order",
        placeholderPhoto: "Placeholder image — not a photo of this dish.",
        noDescription:
          "The printed menu gives no further details for this dish.",
        priceNote: "Price as printed on the menu, not yet confirmed.",
        sizeLabel: "Option",
        unknownPrice:
          "The menu shows two prices. The individual price is not clear; please confirm it with the restaurant.",
      },
      cart: {
        title: "Your order",
        close: "Close",
        open: "View order",
        empty: "Nothing selected yet.",
        emptyBody: "Tap a dish on the menu to add it.",
        noteLabel: "Note (optional)",
        notePlaceholder: "e.g. no onions, no hot sauce",
        total: "Total as shown on the website",
        totalPartial: "Subtotal for items with a single price",
        unknownLine: "The menu does not give a single price for this item.",
        remove: "Remove",
        clear: "Clear order",
        send: "Send via WhatsApp",
        sendHint:
          "WhatsApp opens with a prepared message. You send it yourself there.",
        priceNote:
          "The prices on this website are not yet confirmed. Please check the message before sending.",
        backToMenu: "Back to the menu",
        itemOne: "1 item",
        itemMany: "items",
      },
      message: {
        greeting: "Hello ALMAS",
        intro: "I would like to place the following order:",
        total: "Total as shown on the website (not yet confirmed)",
        totalPartial:
          "Subtotal for items with a single price (not yet confirmed)",
        unknownPrice:
          "Note: the menu does not give a single price for:",
        noteLabel: "Note",
        confirmation: "Please confirm availability and price.",
        thanks: "Thank you.",
      },
    },
    cta: {
      eyebrow: "Questions about the menu",
      headline: { lead: "Rather ask", accent: "directly?" },
      body: "For questions about dishes, allergens or larger orders, please call us.",
      note: "All prices and details as printed on the menu. To be confirmed by the restaurant before publication.",
    },
  },
};

export interface LegalSection {
  id: string;
  heading: string;
  paragraphs: string[];
}

export interface LegalPageCopy {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  intro: string;
  draftNotice: string;
  lastUpdatedLabel: string;
  lastUpdated: string;
  sections: LegalSection[];
  contactHeading: string;
  contactNote: string;
}

export const legalCopy: Record<
  Locale,
  { imprint: LegalPageCopy; privacy: LegalPageCopy }
> = {
  de: {
    imprint: {
      meta: {
        title: "Impressum — ALMAS Restaurant Aarau",
        description:
          "Entwurf des Impressums für ALMAS Restaurant, Bahnhofstrasse 92, 5000 Aarau. Vor Veröffentlichung rechtlich zu prüfen.",
      },
      eyebrow: "Rechtliches",
      title: "Impressum",
      intro:
        "Dies ist ein Entwurf. Die endgültigen Angaben werden von ALMAS geliefert und vor der Veröffentlichung rechtlich geprüft.",
      draftNotice:
        "Entwurf — nicht veröffentlichen. Es fehlen noch der rechtliche Firmenname, die verantwortliche Person, die E-Mail-Adresse sowie Register- und Steuerangaben.",
      lastUpdatedLabel: "Entwurfsstand",
      lastUpdated: "18. November 2026",
      sections: [
        {
          id: "betreiber",
          heading: "Betreiber",
          paragraphs: [
            "ALMAS Restaurant, Bahnhofstrasse 92, 5000 Aarau, Schweiz.",
            "Rechtlicher Firmenname und Rechtsform: ausstehend.",
          ],
        },
        {
          id: "kontakt",
          heading: "Kontakt",
          paragraphs: [
            "Telefon: 062 797 50 00.",
            "E-Mail-Adresse: ausstehend.",
          ],
        },
        {
          id: "verantwortlich",
          heading: "Verantwortlich für den Inhalt",
          paragraphs: [
            "Name und Kontakt der verantwortlichen Person: ausstehend.",
          ],
        },
        {
          id: "register",
          heading: "Register- und Steuerangaben",
          paragraphs: [
            "Handelsregistereintrag und Mehrwertsteuernummer: ausstehend, sofern anwendbar.",
          ],
        },
        {
          id: "pruefung",
          heading: "Rechtliche Prüfung",
          paragraphs: [
            "Haftungs-, Urheberrechts- und Streitbeilegungsangaben werden vor der Veröffentlichung durch eine qualifizierte Schweizer Rechtsberatung ergänzt.",
          ],
        },
      ],
      contactHeading: "Kontaktstelle",
      contactNote:
        "Bis zur Veröffentlichung sind nur die bestätigte Adresse und Telefonnummer verfügbar. Die E-Mail-Adresse wird ergänzt, sobald sie von ALMAS bestätigt ist.",
    },
    privacy: {
      meta: {
        title: "Datenschutz — ALMAS Restaurant Aarau",
        description:
          "Entwurf der Datenschutzerklärung für ALMAS Restaurant, Bahnhofstrasse 92, 5000 Aarau. Vor Veröffentlichung rechtlich zu prüfen.",
      },
      eyebrow: "Rechtliches",
      title: "Datenschutzerklärung",
      intro:
        "Dies ist ein Entwurf. Die Erklärung wird vor der Veröffentlichung vervollständigt und rechtlich geprüft.",
      draftNotice:
        "Entwurf — nicht veröffentlichen. Hosting-Anbieter, Rechtsgrundlagen und die endgültige Kontaktadresse für Datenschutzanfragen sind noch zu bestätigen.",
      lastUpdatedLabel: "Entwurfsstand",
      lastUpdated: "19. November 2026",
      sections: [
        {
          id: "verantwortlich",
          heading: "Verantwortliche Stelle",
          paragraphs: [
            "ALMAS Restaurant, Bahnhofstrasse 92, 5000 Aarau, Schweiz.",
            "Rechtlicher Firmenname und Datenschutzkontakt: ausstehend.",
          ],
        },
        {
          id: "hosting",
          heading: "Hosting",
          paragraphs: [
            "Der Hosting-Anbieter ist noch nicht bestätigt. Beim Aufruf der Website können technisch notwendige Serverdaten wie IP-Adresse, Zeitpunkt, angeforderte Seite und Browserinformationen verarbeitet werden. Anbieter, Standort und Auftragsverarbeitung werden vor der Veröffentlichung ergänzt.",
          ],
        },
        {
          id: "speicherung",
          heading: "Sprache und Farbmodus",
          paragraphs: [
            "Die Website speichert die gewählte Sprache in einem funktionalen Cookie und den Farbmodus im lokalen Speicher des Browsers. Diese Angaben bleiben auf dem Gerät und werden nicht an ALMAS gesendet. Es werden keine Marketing- oder Analyse-Cookies gesetzt.",
          ],
        },
        {
          id: "bestellung",
          heading: "Bestellung über WhatsApp",
          paragraphs: [
            "Die Bestellfunktion speichert Ihre Auswahl und eine allfällige Anmerkung im lokalen Speicher Ihres Browsers, damit die Bestellung beim nächsten Besuch erhalten bleibt. Diese Angaben bleiben auf Ihrem Gerät und werden nicht an einen Server dieser Website übermittelt. Mit «Bestellung leeren» können Sie sie jederzeit löschen.",
            "Erst wenn Sie «Über WhatsApp senden» anklicken, öffnet sich WhatsApp mit einer vorbereiteten Nachricht. Sie senden diese Nachricht dort selbst ab. Dabei werden der Nachrichteninhalt und Ihre Telefonnummer an WhatsApp übermittelt; für diese Übermittlung gelten die Datenschutzbestimmungen von WhatsApp. Über diese Website wird keine Bestellung entgegengenommen, gespeichert oder bestätigt.",
          ],
        },
        {
          id: "karte",
          heading: "Kartendienst OpenStreetMap",
          paragraphs: [
            "Die Karte wird erst geladen, wenn Sie «Karte laden» anklicken. Erst dann werden Daten wie Ihre IP-Adresse an OpenStreetMap übertragen. Anbieter: OpenStreetMap Foundation. Weitere Informationen finden Sie in der Datenschutzerklärung von OpenStreetMap.",
          ],
        },
        {
          id: "schriften",
          heading: "Schriften",
          paragraphs: [
            "Die Schriften werden mit der Website ausgeliefert. Es wird keine Verbindung zu Google Fonts hergestellt.",
          ],
        },
        {
          id: "analyse",
          heading: "Analyse",
          paragraphs: [
            "Derzeit ist kein Analysewerkzeug aktiv. Wird eines eingesetzt, wird diese Erklärung vor der Veröffentlichung ergänzt.",
          ],
        },
        {
          id: "rechte",
          heading: "Ihre Rechte",
          paragraphs: [
            "Nach anwendbarem Recht können Sie Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch und Datenübertragbarkeit verlangen. Kontakt für Datenschutzanfragen: ausstehend.",
          ],
        },
        {
          id: "aenderungen",
          heading: "Änderungen",
          paragraphs: [
            "Diese Erklärung wird vor der Veröffentlichung vervollständigt und danach bei Änderungen aktualisiert.",
          ],
        },
      ],
      contactHeading: "Datenschutzanfragen",
      contactNote:
        "Die Kontaktadresse für Datenschutzanfragen wird ergänzt, sobald sie von ALMAS bestätigt ist.",
    },
  },
  en: {
    imprint: {
      meta: {
        title: "Imprint — ALMAS Restaurant Aarau",
        description:
          "Draft imprint for ALMAS Restaurant, Bahnhofstrasse 92, 5000 Aarau. To be reviewed legally before publication.",
      },
      eyebrow: "Legal",
      title: "Imprint",
      intro:
        "This is a draft. The final details will be supplied by ALMAS and reviewed legally before publication.",
      draftNotice:
        "Draft — do not publish. The legal entity name, responsible person, email address and register/tax details are still missing.",
      lastUpdatedLabel: "Draft date",
      lastUpdated: "18 November 2026",
      sections: [
        {
          id: "operator",
          heading: "Operator",
          paragraphs: [
            "ALMAS Restaurant, Bahnhofstrasse 92, 5000 Aarau, Switzerland.",
            "Legal entity name and legal form: pending.",
          ],
        },
        {
          id: "contact",
          heading: "Contact",
          paragraphs: ["Phone: 062 797 50 00.", "Email address: pending."],
        },
        {
          id: "responsible",
          heading: "Responsible for content",
          paragraphs: ["Name and contact of the responsible person: pending."],
        },
        {
          id: "register",
          heading: "Register and tax details",
          paragraphs: [
            "Commercial register entry and VAT number: pending, where applicable.",
          ],
        },
        {
          id: "review",
          heading: "Legal review",
          paragraphs: [
            "Liability, copyright and dispute-resolution information will be added by qualified Swiss legal counsel before publication.",
          ],
        },
      ],
      contactHeading: "Contact details",
      contactNote:
        "Until publication, only the confirmed address and phone number are available. The email address will be added once ALMAS confirms it.",
    },
    privacy: {
      meta: {
        title: "Privacy — ALMAS Restaurant Aarau",
        description:
          "Draft privacy policy for ALMAS Restaurant, Bahnhofstrasse 92, 5000 Aarau. To be reviewed legally before publication.",
      },
      eyebrow: "Legal",
      title: "Privacy policy",
      intro:
        "This is a draft. The policy will be completed and reviewed legally before publication.",
      draftNotice:
        "Draft — do not publish. The hosting provider, legal bases and the final contact address for privacy requests are still to be confirmed.",
      lastUpdatedLabel: "Draft date",
      lastUpdated: "19 November 2026",
      sections: [
        {
          id: "controller",
          heading: "Controller",
          paragraphs: [
            "ALMAS Restaurant, Bahnhofstrasse 92, 5000 Aarau, Switzerland.",
            "Legal entity name and privacy contact: pending.",
          ],
        },
        {
          id: "hosting",
          heading: "Hosting",
          paragraphs: [
            "The hosting provider is not yet confirmed. When the website is accessed, technically necessary server data such as IP address, time, requested page and browser information may be processed. Provider, location and data processing agreement will be added before publication.",
          ],
        },
        {
          id: "storage",
          heading: "Language and colour mode",
          paragraphs: [
            "The website stores the selected language in a functional cookie and the colour mode in the browser's local storage. This information stays on the device and is not sent to ALMAS. No marketing or analytics cookies are set.",
          ],
        },
        {
          id: "ordering",
          heading: "Ordering via WhatsApp",
          paragraphs: [
            "The ordering feature stores your selection and any note in your browser's local storage so the order survives your next visit. This information stays on your device and is not sent to a server operated by this website. You can delete it at any time with “Clear order”.",
            "Only when you click “Send via WhatsApp” does WhatsApp open with a prepared message. You send that message yourself there. The message content and your phone number are then transmitted to WhatsApp; WhatsApp's own privacy policy applies to that transmission. No order is received, stored or confirmed through this website.",
          ],
        },
        {
          id: "map",
          heading: "OpenStreetMap",
          paragraphs: [
            "The map is loaded only after you click “Load map”. Only then is data such as your IP address transferred to OpenStreetMap. Provider: OpenStreetMap Foundation. See the OpenStreetMap privacy policy for more information.",
          ],
        },
        {
          id: "fonts",
          heading: "Fonts",
          paragraphs: [
            "The fonts are delivered with the website. No connection to Google Fonts is made.",
          ],
        },
        {
          id: "analytics",
          heading: "Analytics",
          paragraphs: [
            "No analytics tool is active at present. If one is introduced, this policy will be updated before publication.",
          ],
        },
        {
          id: "rights",
          heading: "Your rights",
          paragraphs: [
            "Under applicable law you may request access, correction, deletion, restriction, objection and data portability. Privacy contact: pending.",
          ],
        },
        {
          id: "changes",
          heading: "Changes",
          paragraphs: [
            "This policy will be completed before publication and updated when things change.",
          ],
        },
      ],
      contactHeading: "Privacy requests",
      contactNote:
        "The contact address for privacy requests will be added once ALMAS confirms it.",
    },
  },
};
