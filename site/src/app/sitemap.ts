import type { MetadataRoute } from "next";
import { absoluteUrl, routes } from "@/content";
import type { Locale } from "@/content/types";

const lastModified = new Date("2026-11-18T00:00:00.000Z");

const priority: Record<string, number> = {
  home: 1,
  menu: 0.9,
  imprint: 0.2,
  privacy: 0.2,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return (
    Object.entries(routes) as [
      keyof typeof routes,
      Record<Locale, string>,
    ][]
  ).flatMap(([key, localized]) =>
    (["de", "en"] as const).map((locale) => ({
      url: absoluteUrl(localized[locale]),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: priority[key] ?? 0.5,
      alternates: {
        languages: {
          "de-CH": absoluteUrl(localized.de),
          en: absoluteUrl(localized.en),
        },
      },
    })),
  );
}
