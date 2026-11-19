"use client";

import { formatChf } from "./order-message";
import { useOrdering } from "./OrderingContext";

export function OrderDock() {
  const { copy, itemCount, subtotalCents, hasUnknownPrice, openCart } =
    useOrdering();

  if (itemCount === 0) return null;

  const countLabel =
    itemCount === 1 ? copy.cart.itemOne : `${itemCount} ${copy.cart.itemMany}`;
  const hasPricedLines = subtotalCents > 0 || !hasUnknownPrice;

  return (
    <button
      type="button"
      className="order-dock"
      onClick={openCart}
      aria-haspopup="dialog"
    >
      <span className="order-dock-label">{copy.cart.open}</span>
      <span className="order-dock-count" aria-label={countLabel}>
        {itemCount}
      </span>
      {hasPricedLines ? (
        <span className="order-dock-total">
          CHF {formatChf(subtotalCents)}
          {hasUnknownPrice ? "+" : ""}
        </span>
      ) : null}
    </button>
  );
}
