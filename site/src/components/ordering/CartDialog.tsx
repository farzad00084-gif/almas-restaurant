"use client";

import siteJson from "@/content/site.json";
import type { SiteConfig } from "@/content/types";
import { useEffect, useRef } from "react";
import { buildOrderMessage, formatChf } from "./order-message";
import { MAX_ORDER_QTY, useOrdering } from "./OrderingContext";

const site = siteJson as SiteConfig;

export function CartDialog() {
  const {
    locale,
    copy,
    cartOpen,
    closeCart,
    lines,
    note,
    updateNote,
    itemCount,
    subtotalCents,
    hasUnknownPrice,
    setQty,
    removeLine,
    clearCart,
  } = useOrdering();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (cartOpen && !dialog.open) {
      dialog.showModal();
    } else if (!cartOpen && dialog.open) {
      dialog.close();
    }
  }, [cartOpen]);

  const message = buildOrderMessage(locale, lines, note, copy.message);
  const whatsappNumber = site.whatsapp.number.replace(/\D/g, "");
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  const hasPricedLines = lines.some((line) => line.unitPriceCents !== null);
  const countLabel =
    itemCount === 1 ? copy.cart.itemOne : `${itemCount} ${copy.cart.itemMany}`;

  return (
    <dialog
      ref={dialogRef}
      className="order-dialog cart-dialog"
      aria-labelledby="cart-dialog-title"
      onClose={closeCart}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeCart();
      }}
    >
      <div className="cart-panel">
        <header className="cart-head">
          <div>
            <p className="eyebrow">
              <span className="diamond" aria-hidden="true" />
              <span id="cart-dialog-title">{copy.cart.title}</span>
            </p>
            {lines.length > 0 ? (
              <p className="cart-count">{countLabel}</p>
            ) : null}
          </div>
          <button
            type="button"
            className="order-dialog-close"
            aria-label={copy.cart.close}
            onClick={closeCart}
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <div className="cart-scroll">
          {lines.length === 0 ? (
            <div className="cart-empty">
              <p className="cart-empty-title">{copy.cart.empty}</p>
              <p>{copy.cart.emptyBody}</p>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={closeCart}
              >
                {copy.cart.backToMenu}
              </button>
            </div>
          ) : (
            <>
              <ul className="cart-lines">
                {lines.map((line) => (
                  <li className="cart-line" key={line.key}>
                    <div className="cart-line-info">
                      <p className="cart-line-name">
                        {line.name[locale]}
                        {line.variantLabel
                          ? ` · ${line.variantLabel[locale]}`
                          : ""}
                      </p>
                      <p className="cart-line-unit">
                        CHF {line.unitPriceDisplay}
                      </p>
                      {line.unitPriceCents === null ? (
                        <p className="cart-line-note">
                          {copy.cart.unknownLine}
                        </p>
                      ) : null}
                    </div>

                    <div className="cart-line-side">
                      <div className="order-stepper order-stepper--small">
                        <button
                          type="button"
                          aria-label={`${copy.dialog.decrease}: ${line.name[locale]}`}
                          disabled={line.qty <= 1}
                          onClick={() => setQty(line.key, line.qty - 1)}
                        >
                          <span aria-hidden="true">−</span>
                        </button>
                        <output aria-label={copy.dialog.quantity}>
                          {line.qty}
                        </output>
                        <button
                          type="button"
                          aria-label={`${copy.dialog.increase}: ${line.name[locale]}`}
                          disabled={line.qty >= MAX_ORDER_QTY}
                          onClick={() => setQty(line.key, line.qty + 1)}
                        >
                          <span aria-hidden="true">+</span>
                        </button>
                      </div>
                      {line.unitPriceCents !== null ? (
                        <p className="cart-line-total">
                          CHF {formatChf(line.unitPriceCents * line.qty)}
                        </p>
                      ) : null}
                      <button
                        type="button"
                        className="cart-remove"
                        onClick={() => removeLine(line.key)}
                      >
                        {copy.cart.remove}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="cart-note">
                <label className="order-qty-label" htmlFor="order-note">
                  {copy.cart.noteLabel}
                </label>
                <textarea
                  id="order-note"
                  rows={3}
                  maxLength={500}
                  value={note}
                  placeholder={copy.cart.notePlaceholder}
                  onChange={(event) => updateNote(event.target.value)}
                />
              </div>
            </>
          )}
        </div>

        {lines.length > 0 ? (
          <footer className="cart-footer">
            <div className="cart-summary">
              <p className="cart-total">
                <span>
                  {hasUnknownPrice
                    ? copy.cart.totalPartial
                    : copy.cart.total}
                </span>
                <span className="cart-total-amount">
                  {hasPricedLines
                    ? `CHF ${formatChf(subtotalCents)}`
                    : "—"}
                </span>
              </p>
              <p className="cart-price-note">{copy.cart.priceNote}</p>
            </div>

            <a
              className="btn btn-primary cart-send"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{copy.cart.send}</span>
              <span className="arrow" aria-hidden="true">
                ↗
              </span>
            </a>
            <p className="cart-send-hint">{copy.cart.sendHint}</p>
            <button
              type="button"
              className="cart-clear"
              onClick={clearCart}
            >
              {copy.cart.clear}
            </button>
          </footer>
        ) : null}
      </div>
    </dialog>
  );
}
