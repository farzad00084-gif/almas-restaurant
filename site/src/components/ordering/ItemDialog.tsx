"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { images } from "@/content/images";
import { MAX_ORDER_QTY, useOrdering } from "./OrderingContext";

export function ItemDialog() {
  const {
    active,
    addItem,
    closeItem,
    openCart,
    copy,
    locale,
    itemCount,
  } = useOrdering();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState<"base" | "family">("base");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active && !dialog.open) {
      dialog.showModal();
    } else if (!active && dialog.open) {
      dialog.close();
    }
  }, [active]);

  const item = active?.item;
  const hasFamily = Boolean(
    item?.familyPriceDisplay && item?.familyLabel,
  );

  const changeQty = (next: number) => {
    setAdded(false);
    setQty(Math.max(1, Math.min(MAX_ORDER_QTY, next)));
  };

  return (
    <dialog
      ref={dialogRef}
      className="order-dialog item-dialog"
      aria-labelledby="item-dialog-title"
      onClose={closeItem}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeItem();
      }}
    >
      {active && item ? (
        <div className="item-dialog-panel">
          <div className="item-dialog-media">
            <Image
              src={images[active.photoId] ?? images["kebab-plate"]}
              alt=""
              fill
              sizes="(max-width: 760px) 100vw, 440px"
            />
            {active.photoIsPlaceholder ? (
              <p className="order-photo-badge">
                {copy.dialog.placeholderPhoto}
              </p>
            ) : null}
          </div>

          <div className="item-dialog-body">
            <div className="item-dialog-head">
              <p className="eyebrow">
                <span className="diamond" aria-hidden="true" />
                <span>{active.categoryTitle[locale]}</span>
              </p>
              <button
                type="button"
                className="order-dialog-close"
                aria-label={copy.dialog.close}
                onClick={closeItem}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <h2 id="item-dialog-title" className="item-dialog-title">
              {item.name[locale]}
            </h2>
            <p className="item-dialog-desc">
              {item.description
                ? item.description[locale]
                : copy.dialog.noDescription}
            </p>

            <div className="item-dialog-price">
              {hasFamily ? (
                <fieldset className="order-choices">
                  <legend className="order-qty-label">
                    {copy.dialog.sizeLabel}
                  </legend>
                  <label
                    className={`order-choice ${variant === "base" ? "is-selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name="item-variant"
                      value="base"
                      checked={variant === "base"}
                      onChange={() => {
                        setVariant("base");
                        setAdded(false);
                      }}
                    />
                    <span>CHF {item.priceDisplay}</span>
                  </label>
                  <label
                    className={`order-choice ${variant === "family" ? "is-selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name="item-variant"
                      value="family"
                      checked={variant === "family"}
                      onChange={() => {
                        setVariant("family");
                        setAdded(false);
                      }}
                    />
                    <span>
                      {item.familyLabel?.[locale]} · CHF{" "}
                      {item.familyPriceDisplay}
                    </span>
                  </label>
                </fieldset>
              ) : (
                <p className="order-price">
                  <span className="order-price-currency">CHF</span>{" "}
                  {item.priceDisplay}
                </p>
              )}
              <p className="order-price-note">{copy.dialog.priceNote}</p>
              {!hasFamily && item.priceNumeric === null ? (
                <p className="order-price-unknown">
                  {copy.dialog.unknownPrice}
                </p>
              ) : null}
            </div>

            <div className="item-dialog-actions">
              <div className="order-qty">
                <span className="order-qty-label">
                  {copy.dialog.quantity}
                </span>
                <div className="order-stepper">
                  <button
                    type="button"
                    aria-label={copy.dialog.decrease}
                    disabled={qty <= 1}
                    onClick={() => changeQty(qty - 1)}
                  >
                    <span aria-hidden="true">−</span>
                  </button>
                  <output aria-live="polite">{qty}</output>
                  <button
                    type="button"
                    aria-label={copy.dialog.increase}
                    disabled={qty >= MAX_ORDER_QTY}
                    onClick={() => changeQty(qty + 1)}
                  >
                    <span aria-hidden="true">+</span>
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary order-add"
                onClick={() => {
                  addItem(active, {
                    qty,
                    variant: hasFamily ? variant : "base",
                  });
                  setAdded(true);
                }}
              >
                {copy.dialog.add}
              </button>
            </div>

            <p className="order-status" role="status">
              {added ? copy.dialog.added : ""}
            </p>
            {added ? (
              <button
                type="button"
                className="link-arrow order-view"
                onClick={openCart}
              >
                <span>
                  {copy.dialog.viewOrder} ({itemCount})
                </span>
                <span aria-hidden="true">→</span>
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
