export const locales = ["de", "en"] as const;

export type Locale = (typeof locales)[number];

export type Localized<T = string> = Record<Locale, T>;

export interface MenuItem {
  id: string;
  order: number;
  name: Localized;
  description: Localized | null;
  priceDisplay: string;
  priceNumeric: number | null;
  priceVerified: boolean;
  familyPriceDisplay: string | null;
  familyLabel: Localized | null;
  available: boolean;
  image: string | null;
}

export interface MenuCategory {
  id: string;
  order: number;
  title: Localized;
  note: Localized | null;
  footnote: Localized | null;
  items: MenuItem[];
}

export interface MenuContent {
  version: string;
  source: string;
  generatedFrom: string;
  priceVerified: boolean;
  categories: MenuCategory[];
}

export interface MediaEntry {
  id: string;
  file: string;
  alt: Localized;
  caption?: Localized;
  decorative?: boolean;
  credit: string;
  licence: string;
  sourceUrl: string;
  isPlaceholder: boolean;
}

export interface SocialLink {
  url: string | null;
  verified: boolean;
}

export interface SiteConfig {
  restaurantName: string;
  titleName: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };
  phone: string;
  phoneHref: string;
  email: string | null;
  geo: { lat: number; lng: number };
  mapsUrl: string;
  osmEmbedUrl: string;
  social: {
    instagram: SocialLink;
    facebook: SocialLink;
    tiktok: SocialLink;
  };
  hours: null;
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function assertLocale(value: string): Locale {
  if (!isLocale(value)) {
    throw new Error(`Unsupported locale: ${value}`);
  }
  return value;
}
