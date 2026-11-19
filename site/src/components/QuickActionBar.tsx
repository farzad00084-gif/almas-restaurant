"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes, site } from "@/content";
import { ui } from "@/content/copy";
import type { Locale } from "@/content/types";

export function QuickActionBar({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const copy = ui[locale];
  const menuHref =
    pathname === routes.menu[locale] ? "#main" : routes.menu[locale];

  return (
    <nav className="mobile-bar" aria-label={copy.quickNavLabel}>
      <Link href={menuHref}>{copy.menu}</Link>
      <a href={`tel:${site.phoneHref}`}>{copy.call}</a>
      <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
        {copy.directions}
      </a>
    </nav>
  );
}
