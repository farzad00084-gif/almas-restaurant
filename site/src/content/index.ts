import menuJson from "./menu.json";
import mediaJson from "./media.json";
import siteJson from "./site.json";
import type {
  Locale,
  MediaEntry,
  MenuContent,
  MenuItem,
  SiteConfig,
} from "./types";

export const menu = menuJson as MenuContent;
export const mediaEntries = mediaJson.images as MediaEntry[];
export const site = siteJson as SiteConfig;

export const isPreview = process.env.NEXT_PUBLIC_CONTENT_MODE !== "production";
export const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

export { siteUrl };

export const absoluteUrl = (path: string) =>
  `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

export const routes = {
  home: { de: "/de", en: "/en" },
  menu: { de: "/de/speisekarte", en: "/en/menu" },
  imprint: { de: "/de/impressum", en: "/en/imprint" },
  privacy: { de: "/de/datenschutz", en: "/en/privacy" },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof routes;

export function routeFor(key: RouteKey, locale: Locale): string {
  return routes[key][locale];
}

export function counterpartPath(pathname: string): string {
  const clean = pathname.replace(/\/+$/, "") || "/";

  if (clean === "/" || clean === "/de" || clean === "/en") {
    return clean === "/en" ? routes.home.de : routes.home.en;
  }

  for (const key of Object.keys(routes) as RouteKey[]) {
    for (const locale of ["de", "en"] as const) {
      if (routes[key][locale] === clean) {
        return routes[key][locale === "de" ? "en" : "de"];
      }
    }
  }

  return routes.home.en;
}

/** Every menu item, flattened, for lookups and count checks. */
export const allMenuItems: MenuItem[] = menu.categories.flatMap(
  (category) => category.items,
);

export function getMenuItem(id: string): MenuItem {
  const item = allMenuItems.find((entry) => entry.id === id);
  if (!item) {
    throw new Error(`Unknown menu item: ${id}`);
  }
  return item;
}

export function getCategory(id: string): MenuContent["categories"][number] {
  const category = menu.categories.find((entry) => entry.id === id);
  if (!category) {
    throw new Error(`Unknown menu category: ${id}`);
  }
  return category;
}

export function getMedia(id: string): MediaEntry {
  const entry = mediaEntries.find((image) => image.id === id);
  if (!entry) {
    throw new Error(`Unknown media entry: ${id}`);
  }
  return entry;
}

export const verifiedSocialLinks = (
  [
    ["instagram", site.social.instagram],
    ["facebook", site.social.facebook],
    ["tiktok", site.social.tiktok],
  ] as const
).flatMap(([name, link]) =>
  link.verified && link.url ? [{ name, url: link.url }] : [],
);
