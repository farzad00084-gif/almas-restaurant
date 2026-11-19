import Link from "next/link";
import { routes } from "@/content";
import { ui } from "@/content/copy";
import type { Locale } from "@/content/types";

export function NotFoundPage({ locale }: { locale: Locale }) {
  const copy = ui[locale];

  return (
    <section className="not-found-page">
      <div className="container">
        <p className="eyebrow">
          <span className="diamond" aria-hidden="true" />
          <span>{copy.notFoundEyebrow}</span>
        </p>
        <p className="not-found-code" aria-hidden="true">
          404
        </p>
        <h1 className="display-l">{copy.notFoundTitle}</h1>
        <p>{copy.notFoundBody}</p>
        <div className="not-found-actions">
          <Link className="btn btn-primary" href={routes.home[locale]}>
            {copy.backHome}
          </Link>
          <Link className="btn btn-ghost" href={routes.menu[locale]}>
            {copy.viewMenu}
          </Link>
        </div>
      </div>
    </section>
  );
}
