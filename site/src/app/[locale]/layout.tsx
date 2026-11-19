import type { Metadata } from "next";
import { DM_Sans, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import {
  absoluteUrl,
  allowIndexing,
  isPreview,
  routes,
  site,
  siteUrl,
} from "@/content";
import { homeCopy, ui } from "@/content/copy";
import { assertLocale, locales } from "@/content/types";
import { QuickActionBar } from "@/components/QuickActionBar";
import { RevealController } from "@/components/RevealController";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "../globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const themeScript = `(function(){try{var r=document.documentElement;var s=window.localStorage.getItem("almas-theme");var t=s==="dark"?"dark":"light";r.setAttribute("data-theme",t);r.style.colorScheme=t;r.classList.add("js");var m=document.querySelector('meta[name="theme-color"]');if(m){m.setAttribute("content",t==="dark"?"#191719":"#EAE5DC");}}catch(e){document.documentElement.setAttribute("data-theme","light");document.documentElement.classList.add("js");}})();`;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = assertLocale(raw);
  const copy = homeCopy[locale];

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: copy.meta.title,
      template: `%s`,
    },
    description: copy.meta.description,
    applicationName: site.titleName,
    authors: [{ name: site.titleName }],
    creator: site.titleName,
    publisher: site.titleName,
    robots: {
      index: allowIndexing,
      follow: allowIndexing,
    },
    openGraph: {
      type: "website",
      siteName: site.titleName,
      locale: locale === "de" ? "de_CH" : "en_US",
      title: copy.meta.title,
      description: copy.meta.description,
      url: absoluteUrl(routes.home[locale]),
    },
    twitter: {
      card: "summary",
      title: copy.meta.title,
      description: copy.meta.description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = assertLocale(raw);
  const copy = ui[locale];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.titleName,
    url: absoluteUrl(routes.home[locale]),
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    hasMenu: absoluteUrl(routes.menu[locale]),
  };

  return (
    <html
      lang={locale === "de" ? "de-CH" : "en"}
      data-theme="light"
      data-locale={locale}
      className={`${instrumentSerif.variable} ${dmSans.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#EAE5DC" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          {copy.skipToContent}
        </a>

        <SiteHeader locale={locale} />

        <main id="main">{children}</main>

        <SiteFooter locale={locale} />
        <QuickActionBar locale={locale} />
        <RevealController />

        {isPreview ? (
          <span className="proto-tag" aria-hidden="true">
            {copy.previewTag}
          </span>
        ) : null}
      </body>
    </html>
  );
}
