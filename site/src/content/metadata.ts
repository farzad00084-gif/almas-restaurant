import type { Metadata } from "next";
import { absoluteUrl, allowIndexing, routes } from "@/content";
import type { RouteKey } from "@/content";
import { homeCopy, legalCopy, menuPageCopy } from "./copy";
import type { Locale } from "./types";

function titleFor(locale: Locale, key: RouteKey): string {
  if (key === "home") return homeCopy[locale].meta.title;
  if (key === "menu") return menuPageCopy[locale].meta.title;
  return legalCopy[locale][key].meta.title;
}

function descriptionFor(locale: Locale, key: RouteKey): string {
  if (key === "home") return homeCopy[locale].meta.description;
  if (key === "menu") return menuPageCopy[locale].meta.description;
  return legalCopy[locale][key].meta.description;
}

export function pageMetadata(locale: Locale, key: RouteKey): Metadata {
  const title = titleFor(locale, key);
  const description = descriptionFor(locale, key);
  const path = routes[key][locale];
  const canonical = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "de-CH": absoluteUrl(routes[key].de),
        en: absoluteUrl(routes[key].en),
        "x-default": absoluteUrl(routes[key].de),
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "ALMAS Restaurant",
      locale: locale === "de" ? "de_CH" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    robots: {
      index: allowIndexing,
      follow: allowIndexing,
    },
  };
}
