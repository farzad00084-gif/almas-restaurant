import Link from "next/link";
import {
  isPreview,
  routes,
  site,
  verifiedSocialLinks,
} from "@/content";
import { ui } from "@/content/copy";
import type { Locale } from "@/content/types";
import { BrandMark } from "./BrandMark";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

const socialNames = ["instagram", "facebook", "tiktok"] as const;
const socialLabels: Record<(typeof socialNames)[number], string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
};

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = ui[locale];
  const homeHref = routes.home[locale];
  const menuHref = routes.menu[locale];
  const showSocial = verifiedSocialLinks.length > 0 || isPreview;

  return (
    <footer className="site-footer site-footer--light">
      <div className="container">
        <div className="footer-top">
          <div className="footer-lockup">
            <BrandMark />
            <span>
              <span className="brand-word">ALMAS</span>
              <span className="brand-place">AARAU</span>
            </span>
          </div>

          <div
            className={`footer-cols${showSocial ? "" : " footer-cols--two"}`}
          >
            <div className="footer-col">
              <p className="mono">{copy.explore}</p>
              <ul>
                <li>
                  <Link href={homeHref}>{copy.home}</Link>
                </li>
                <li>
                  <Link href={menuHref}>{copy.menu}</Link>
                </li>
                <li>
                  <Link href={`${homeHref}#kitchen`}>{copy.kitchen}</Link>
                </li>
                <li>
                  <Link href={`${homeHref}#visit`}>{copy.visit}</Link>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <p className="mono">{copy.contact}</p>
              <ul>
                <li>
                  <a
                    href={site.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {site.address.street}
                    <br />
                    {site.address.postalCode} {site.address.city}
                  </a>
                </li>
                <li>
                  <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
                </li>
              </ul>
            </div>

            {showSocial ? (
              <div className="footer-col">
                <p className="mono">{copy.follow}</p>
                <div className="social-row">
                  {verifiedSocialLinks.length > 0
                    ? verifiedSocialLinks.map((link) => (
                        <a
                          key={link.name}
                          className="social-link"
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {socialLabels[link.name]}
                        </a>
                      ))
                    : socialNames.map((name) => (
                        <span
                          key={name}
                          className="social-link"
                          aria-disabled="true"
                          aria-label={`${socialLabels[name]} — ${copy.socialPlaceholderNote}`}
                        >
                          {socialLabels[name]}
                        </span>
                      ))}
                </div>
                {verifiedSocialLinks.length === 0 ? (
                  <p className="footer-disclaimer social-note">
                    {copy.socialPlaceholderNote}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        <p className="footer-word" aria-hidden="true">
          ALMAS
        </p>

        <div className="footer-bottom">
          <div>
            <p className="mono">© 2026 ALMAS Restaurant · Aarau</p>
            {isPreview ? (
              <p className="footer-disclaimer">{copy.previewFooterNote}</p>
            ) : null}
            <p className="footer-legal-links">
              <Link href={routes.imprint[locale]}>{copy.imprint}</Link>
              <span aria-hidden="true">·</span>
              <Link href={routes.privacy[locale]}>{copy.privacy}</Link>
            </p>
          </div>
          <div className="footer-tools">
            <LanguageSwitcher locale={locale} />
            <ThemeToggle locale={locale} />
          </div>
        </div>
      </div>
    </footer>
  );
}
