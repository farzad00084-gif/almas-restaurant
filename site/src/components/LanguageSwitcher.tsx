"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { counterpartPath, routes } from "@/content";
import { ui } from "@/content/copy";
import type { Locale } from "@/content/types";

const labels: Record<Locale, string> = { de: "DE", en: "EN" };
const hrefLangs: Record<Locale, string> = { de: "de-CH", en: "en" };

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const copy = ui[locale];
  const [hash, setHash] = useState("");

  useEffect(() => {
    const update = () => setHash(window.location.hash);
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  const currentPath = pathname || routes.home[locale];

  return (
    <div className="lang-switch" role="group" aria-label={copy.languageLabel}>
      {(Object.keys(labels) as Locale[]).map((target, index) => {
        const isCurrent = target === locale;
        const href = isCurrent ? currentPath : counterpartPath(currentPath);
        return (
          <span key={target} className="lang-switch-item">
            {index > 0 ? (
              <span className="lang-sep" aria-hidden="true">
                /
              </span>
            ) : null}
            <a
              href={`${href}${hash}`}
              hrefLang={hrefLangs[target]}
              lang={hrefLangs[target]}
              aria-current={isCurrent ? "true" : undefined}
              onClick={() => {
                try {
                  document.cookie = `almas-lang=${target}; Path=/; Max-Age=31536000; SameSite=Lax`;
                } catch {
                  /* Cookies may be unavailable. The URL still carries the language. */
                }
              }}
            >
              {labels[target]}
            </a>
          </span>
        );
      })}
    </div>
  );
}
