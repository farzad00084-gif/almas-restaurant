"use client";

import type { Locale, Localized, MenuItem } from "@/content/types";
import { useOrdering } from "./OrderingContext";

interface MenuItemButtonProps {
  item: MenuItem;
  categoryTitle: Localized;
  locale: Locale;
  photoId: string;
  photoIsPlaceholder: boolean;
}

export function MenuItemButton({
  item,
  categoryTitle,
  locale,
  photoId,
  photoIsPlaceholder,
}: MenuItemButtonProps) {
  const { copy, openItem } = useOrdering();

  return (
    <article className="menu-item">
      <div className="menu-item-main">
        <h3 className="menu-item-name">{item.name[locale]}</h3>
        {item.description ? (
          <p className="menu-item-desc">{item.description[locale]}</p>
        ) : null}
      </div>
      <div className="menu-item-side">
        <div className="menu-item-price">
          <span className="menu-item-amount">
            <span className="sr-only">CHF </span>
            {item.priceDisplay}
          </span>
          {item.familyPriceDisplay && item.familyLabel ? (
            <>
              <span className="price-family" aria-hidden="true">
                {item.familyLabel[locale]} · {item.familyPriceDisplay}
              </span>
              <span className="sr-only">
                {item.familyLabel[locale]}, CHF {item.familyPriceDisplay}
              </span>
            </>
          ) : null}
        </div>
        <span className="menu-item-add" aria-hidden="true">
          +
        </span>
      </div>
      <button
        type="button"
        className="menu-item-open"
        aria-haspopup="dialog"
        aria-label={`${item.name[locale]} — ${copy.detailsAria}`}
        onClick={() =>
          openItem({ item, categoryTitle, photoId, photoIsPlaceholder })
        }
      >
        <span className="sr-only">{copy.action}</span>
      </button>
    </article>
  );
}
