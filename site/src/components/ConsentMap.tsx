"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { routes, site } from "@/content";
import { ui } from "@/content/copy";
import type { Locale } from "@/content/types";

export function ConsentMap({ locale }: { locale: Locale }) {
  const copy = ui[locale];
  const [loaded, setLoaded] = useState(false);
  const id = useId();

  return (
    <div className="visit-map reveal">
      {loaded ? (
        <iframe
          src={site.osmEmbedUrl}
          title={copy.mapIframeTitle}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="map-consent">
          <span className="diamond" aria-hidden="true" />
          <h3 className="map-consent-title">{copy.mapConsentTitle}</h3>
          <p id={id}>{copy.mapConsentBody}</p>
          <button
            className="btn btn-ghost"
            type="button"
            aria-describedby={id}
            onClick={() => setLoaded(true)}
          >
            {copy.loadMap}
          </button>
          <Link className="map-privacy-link" href={routes.privacy[locale]}>
            {copy.mapPrivacyNote}
          </Link>
        </div>
      )}
      <span className="map-label">
        <span className="diamond" aria-hidden="true" />
        <span>Bahnhofstrasse 92</span>
      </span>
    </div>
  );
}
