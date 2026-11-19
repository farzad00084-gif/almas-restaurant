import Link from "next/link";
import { routes, site } from "@/content";
import { legalCopy, ui } from "@/content/copy";
import type { LegalPageCopy, UiCopy } from "@/content/copy";
import type { Locale } from "@/content/types";

export function LegalPage({
  locale,
  page,
  kind,
}: {
  locale: Locale;
  page: LegalPageCopy;
  kind: "imprint" | "privacy";
}) {
  const copy: UiCopy = ui[locale];

  return (
    <>
      <section className="legal-hero">
        <div className="container">
          <p className="eyebrow">
            <span className="diamond" aria-hidden="true" />
            <span>{page.eyebrow}</span>
          </p>
          <h1 className="display-l">{page.title}</h1>
          <p className="legal-intro">{page.intro}</p>
          <div className="draft-notice" role="note">
            <span className="diamond" aria-hidden="true" />
            <p>{page.draftNotice}</p>
          </div>
          <p className="mono legal-updated">
            {page.lastUpdatedLabel}: {page.lastUpdated}
          </p>
        </div>
      </section>

      <section className="legal-body">
        <div className="container legal-grid">
          <nav className="legal-toc" aria-label={copy.contents}>
            <p className="mono">{copy.contents}</p>
            <ol>
              {page.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.heading}</a>
                </li>
              ))}
              <li>
                <a href="#legal-contact">{page.contactHeading}</a>
              </li>
            </ol>
          </nav>

          <article className="legal-prose">
            {page.sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}

            <section id="legal-contact" className="legal-contact">
              <h2>{page.contactHeading}</h2>
              <p>
                {site.titleName}
                <br />
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.city}
                <br />
                <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
              </p>
              <p>{page.contactNote}</p>
            </section>

            <p className="legal-back">
              <Link href={routes.home[locale]}>← {copy.home}</Link>
              <Link href={routes.menu[locale]}>{copy.menu} →</Link>
            </p>

            {kind === "privacy" ? (
              <p className="prototype-note">
                OpenStreetMap:{" "}
                <a
                  href="https://osmfoundation.org/wiki/Privacy_Policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  osmfoundation.org/wiki/Privacy_Policy
                </a>
              </p>
            ) : null}
          </article>
        </div>
      </section>
    </>
  );
}

export function legalPageCopy(
  locale: Locale,
  kind: "imprint" | "privacy",
): LegalPageCopy {
  return legalCopy[locale][kind];
}
