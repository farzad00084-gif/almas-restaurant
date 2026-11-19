import Image from "next/image";
import {
  getMedia,
  menu,
  site,
} from "@/content";
import { images } from "@/content/images";
import { menuPageCopy } from "@/content/copy";
import type { Locale, MenuCategory } from "@/content/types";
import { MenuNav } from "./MenuNav";
import { DisplayHeadline, SectionLabel } from "./Typography";

function MenuSection({
  category,
  index,
  locale,
}: {
  category: MenuCategory;
  index: number;
  locale: Locale;
}) {
  return (
    <section className="menu-section" id={`menu-${category.id}`}>
      <div className="container">
        <div className="menu-section-head">
          <SectionLabel index={String(index + 1).padStart(2, "0")}>
            {category.title[locale]}
          </SectionLabel>
          <div>
            <h2 className="menu-section-title">{category.title[locale]}</h2>
            {category.note ? (
              <p className="menu-category-note">{category.note[locale]}</p>
            ) : null}
          </div>
        </div>

        <div className="menu-list">
          {category.items.map((item) => (
            <article className="menu-item" key={item.id}>
              <div className="menu-item-main">
                <h3 className="menu-item-name">{item.name[locale]}</h3>
                {item.description ? (
                  <p className="menu-item-desc">
                    {item.description[locale]}
                  </p>
                ) : null}
              </div>
              <div className="menu-item-price">
                <span className="menu-item-amount">
                  <span className="sr-only">CHF </span>
                  {item.priceDisplay}
                </span>
                {item.familyPriceDisplay && item.familyLabel ? (
                  <span className="price-family">
                    <span aria-hidden="true">
                      {item.familyLabel[locale]} ·{" "}
                      {item.familyPriceDisplay}
                    </span>
                    <span className="sr-only">
                      {item.familyLabel[locale]}, CHF{" "}
                      {item.familyPriceDisplay}
                    </span>
                  </span>
                ) : null}
              </div>
            </article>
          ))}
          {category.footnote ? (
            <p className="menu-source">{category.footnote[locale]}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function MenuPage({ locale }: { locale: Locale }) {
  const copy = menuPageCopy[locale];
  const pideImage = getMedia("pide");
  const galleryImages = [
    getMedia("kebab-plate"),
    getMedia("pizza-margherita"),
    getMedia("baklava"),
  ];
  const topCategories = menu.categories.slice(0, 3);
  const bottomCategories = menu.categories.slice(3);

  return (
    <>
      <section className="menu-hero">
        <div className="container menu-hero-grid">
          <div>
            <p className="eyebrow">
              <span className="diamond" aria-hidden="true" />
              <span>{copy.hero.eyebrow}</span>
            </p>
            <h1 className="display-xl">
              {copy.hero.titleBefore}
              <em>{copy.hero.titleAccent}</em>
            </h1>
          </div>
          <div className="menu-intro">
            <p>{copy.hero.intro}</p>
            <p className="mono">{copy.hero.note}</p>
          </div>
        </div>
      </section>

      <section className="menu-gallery" aria-label={copy.galleryAria}>
        {galleryImages.map((image) => (
          <figure key={image.id}>
            <Image
              src={images[image.id]}
              alt={image.alt[locale]}
              sizes="(max-width: 640px) 100vw, 33vw"
            />
            {image.caption ? (
              <figcaption className="mono">
                {image.caption[locale]}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </section>

      <MenuNav
        locale={locale}
        categories={menu.categories.map((category) => ({
          id: category.id,
          title: category.title,
        }))}
      />

      {topCategories.map((category, index) => (
        <MenuSection
          key={category.id}
          category={category}
          index={index}
          locale={locale}
        />
      ))}

      <figure className="menu-band reveal">
        <Image
          src={images.pide}
          alt={pideImage.alt[locale]}
          sizes="100vw"
        />
        {pideImage.caption ? (
          <figcaption className="mono">
            {pideImage.caption[locale]}
          </figcaption>
        ) : null}
      </figure>

      {bottomCategories.map((category, index) => (
        <MenuSection
          key={category.id}
          category={category}
          index={index + topCategories.length}
          locale={locale}
        />
      ))}

      <section className="menu-cta">
        <div className="container">
          <p className="eyebrow">
            <span className="diamond" aria-hidden="true" />
            <span>{copy.cta.eyebrow}</span>
          </p>
          <DisplayHeadline
            headline={copy.cta.headline}
            className="display-m"
          />
          <p>{copy.cta.body}</p>
          <a className="btn btn-primary" href={`tel:${site.phoneHref}`}>
            <span>{site.phone}</span>
          </a>
          <p className="prototype-note">{copy.cta.note}</p>
        </div>
      </section>
    </>
  );
}
