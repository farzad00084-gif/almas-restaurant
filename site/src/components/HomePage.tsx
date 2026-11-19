import Image from "next/image";
import Link from "next/link";
import {
  getMenuItem,
  getMedia,
  routes,
  site,
} from "@/content";
import { images } from "@/content/images";
import { homeCopy, ui } from "@/content/copy";
import type { Locale } from "@/content/types";
import { ConsentMap } from "./ConsentMap";
import { DisplayHeadline, SectionLabel } from "./Typography";

function Money({ value }: { value: string }) {
  return (
    <span>
      <span className="sr-only">CHF </span>
      {value}
    </span>
  );
}

export function HomePage({ locale }: { locale: Locale }) {
  const copy = homeCopy[locale];
  const labels = ui[locale];
  const menuHref = routes.menu[locale];
  const heroImage = getMedia("hero-grill");
  const doughImage = getMedia("dough-hands");
  const pomegranateImage = getMedia("pomegranate");
  const pideImage = getMedia("pide");

  return (
    <>
      <section className="hero-obsidian hero-hybrid">
        <div className="hero-bg">
          <Image
            src={images["hero-grill"]}
            alt={heroImage.alt[locale]}
            sizes="100vw"
            priority
          />
        </div>
        <div className="hero-shade" aria-hidden="true" />

        <div className="hero-inner">
          <div className="container">
            <p className="eyebrow">
              <span className="diamond" aria-hidden="true" />
              <span>{copy.hero.eyebrow}</span>
            </p>
            <DisplayHeadline
              headline={copy.hero.headline}
              level="h1"
              className="display-xl"
            />
            <p className="hero-sub">{copy.hero.sub}</p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href={menuHref}>
                <span>{copy.hero.primaryCta}</span>
                <span className="arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
              <a className="btn btn-ghost" href="#visit">
                <span>{copy.hero.secondaryCta}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="hero-info">
          <div className="container hero-info-inner hero-info-inner--two">
            <div className="hero-info-item">
              <span className="mono">{labels.address}</span>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {site.address.street}, {site.address.city}
              </a>
            </div>
            <div className="hero-info-item">
              <span className="mono">{labels.phone}</span>
              <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
            </div>
          </div>
        </div>

        <span className="hero-credit mono">{copy.hero.credit}</span>
      </section>

      <section className="section section-statement" id="kitchen">
        <div className="container statement-grid">
          <SectionLabel index={copy.statement.index}>
            {copy.statement.label}
          </SectionLabel>
          <div className="statement-copy reveal">
            <DisplayHeadline
              headline={copy.statement.headline}
              className="display-l"
            />
            <div className="statement-body">
              <p>{copy.statement.body}</p>
              <p className="statement-signature mono">
                {copy.statement.signature}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-craft" id="craft">
        <div className="container craft-grid">
          <div className="craft-copy reveal">
            <SectionLabel index={copy.craft.index}>
              {copy.craft.label}
            </SectionLabel>
            <DisplayHeadline
              headline={copy.craft.headline}
              className="display-l"
            />
            <p>{copy.craft.body}</p>
            <p className="prototype-note">{copy.craft.placeholderNote}</p>
            <Link className="link-arrow" href={menuHref}>
              <span>{copy.craft.link}</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="craft-visual reveal">
            <span className="craft-index mono">02 / {copy.craft.label}</span>
            <div className="craft-diamond">
              <Image
                src={images["dough-hands"]}
                alt={doughImage.alt[locale]}
                sizes="(max-width: 900px) 70vw, 34vw"
              />
            </div>
            <div className="craft-accent" aria-hidden="true">
              <Image
                src={images.pomegranate}
                alt={pomegranateImage.alt[locale]}
                sizes="160px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section section-menu-preview" id="menu">
        <div className="container">
          <div className="section-top reveal">
            <SectionLabel index={copy.menuPreview.index}>
              {copy.menuPreview.label}
            </SectionLabel>
            <DisplayHeadline
              headline={copy.menuPreview.headline}
              className="display-l"
            />
            <Link className="link-arrow" href={menuHref}>
              <span>{copy.menuPreview.link}</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="dish-grid reveal">
            {copy.menuPreview.items.map((featured) => {
              const item = getMenuItem(featured.menuItemId);
              const image = getMedia(featured.mediaId);
              return (
                <article className="dish" key={featured.menuItemId}>
                  <div className="dish-media">
                    <Image
                      src={images[featured.mediaId]}
                      alt={image.alt[locale]}
                      sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
                    />
                  </div>
                  <div className="dish-head">
                    <h3 className="dish-name">{item.name[locale]}</h3>
                    <span className="dish-price">
                      <Money value={item.priceDisplay} />
                    </span>
                  </div>
                  <p className="dish-desc">
                    {featured.description?.[locale] ??
                      item.description?.[locale] ??
                      ""}
                  </p>
                  <p className="dish-note">{copy.menuPreview.dishNote}</p>
                </article>
              );
            })}
          </div>

          <p className="prototype-note preview-note">
            {copy.menuPreview.note}
          </p>
        </div>
      </section>

      <section className="section section-bread">
        <figure className="bread-figure">
          <Image
            src={images.pide}
            alt={pideImage.alt[locale]}
            sizes="100vw"
          />
          <figcaption className="bread-panel reveal">
            <p className="eyebrow">
              <span className="diamond" aria-hidden="true" />
              <span>{copy.bread.eyebrow}</span>
            </p>
            <DisplayHeadline
              headline={copy.bread.headline}
              className="display-m"
            />
            <p>{copy.bread.body}</p>
            <Link className="link-arrow" href={menuHref}>
              <span>{copy.bread.link}</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </figcaption>
        </figure>
      </section>

      <section className="section section-sourcing" id="sourcing">
        <div className="container sourcing-grid">
          <SectionLabel index={copy.origin.index}>
            {copy.origin.label}
          </SectionLabel>
          <div className="reveal">
            <DisplayHeadline
              headline={copy.origin.headline}
              className="display-m"
            />
            <dl className="origin-list">
              {copy.origin.items.map((entry) => (
                <div key={entry.label[locale]}>
                  <dt>{entry.label[locale]}</dt>
                  <dd>{entry.value[locale]}</dd>
                </div>
              ))}
            </dl>
            <p className="prototype-note sourcing-note">
              {copy.origin.note}
            </p>
          </div>
        </div>
      </section>

      <section className="section section-visit" id="visit">
        <div className="container visit-grid">
          <div className="visit-copy reveal">
            <SectionLabel index={copy.visit.index}>
              {copy.visit.label}
            </SectionLabel>
            <DisplayHeadline
              headline={copy.visit.headline}
              className="display-l"
            />
            <p className="visit-lede">{copy.visit.lede}</p>
            <dl className="visit-facts">
              <div>
                <dt>{labels.address}</dt>
                <dd>
                  <a
                    href={site.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {site.address.street}
                    <br />
                    {site.address.postalCode} {site.address.city}
                  </a>
                </dd>
              </div>
              <div>
                <dt>{labels.phone}</dt>
                <dd>
                  <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
                </dd>
              </div>
            </dl>
            <div className="visit-actions">
              <a className="btn btn-primary" href={`tel:${site.phoneHref}`}>
                <span>{copy.visit.call}</span>
              </a>
              <a
                className="btn btn-ghost"
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{copy.visit.directions}</span>
                <span className="arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>
          </div>

          <ConsentMap locale={locale} />
        </div>
      </section>
    </>
  );
}
