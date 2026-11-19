"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { menuPageCopy, type OrderingCopy } from "@/content/copy";
import type { Locale, Localized, MenuItem } from "@/content/types";
import { CartDialog } from "./CartDialog";
import { ItemDialog } from "./ItemDialog";
import { OrderDock } from "./OrderDock";

const STORAGE_KEY = "almas-order-v1";
const MAX_LINES = 60;
export const MAX_ORDER_QTY = 20;
const MAX_NOTE = 500;

export interface OrderableItem {
  item: MenuItem;
  categoryTitle: Localized;
  photoId: string;
  photoIsPlaceholder: boolean;
}

export interface CartLine {
  key: string;
  itemId: string;
  name: Localized;
  variantLabel: Localized | null;
  qty: number;
  unitPriceCents: number | null;
  unitPriceDisplay: string;
}

export interface AddItemOptions {
  qty: number;
  variant: "base" | "family";
}

interface OrderingContextValue {
  locale: Locale;
  copy: OrderingCopy;
  active: OrderableItem | null;
  cartOpen: boolean;
  lines: CartLine[];
  note: string;
  itemCount: number;
  subtotalCents: number;
  hasUnknownPrice: boolean;
  openItem: (entry: OrderableItem) => void;
  closeItem: () => void;
  openCart: () => void;
  closeCart: () => void;
  addItem: (entry: OrderableItem, options: AddItemOptions) => void;
  setQty: (key: string, qty: number) => void;
  removeLine: (key: string) => void;
  clearCart: () => void;
  updateNote: (note: string) => void;
}

const OrderingContext = createContext<OrderingContextValue | null>(null);

function isLocalized(value: unknown): value is Localized {
  if (!value || typeof value !== "object") return false;
  const entry = value as Record<string, unknown>;
  return typeof entry.de === "string" && typeof entry.en === "string";
}

function isCartLine(value: unknown): value is CartLine {
  if (!value || typeof value !== "object") return false;
  const line = value as Partial<CartLine>;
  return (
    typeof line.key === "string" &&
    typeof line.itemId === "string" &&
    isLocalized(line.name) &&
    (line.variantLabel === null || isLocalized(line.variantLabel)) &&
    Number.isInteger(line.qty) &&
    (line.qty as number) > 0 &&
    (line.qty as number) <= MAX_ORDER_QTY &&
    (line.unitPriceCents === null ||
      (typeof line.unitPriceCents === "number" &&
        Number.isFinite(line.unitPriceCents) &&
        line.unitPriceCents >= 0)) &&
    typeof line.unitPriceDisplay === "string"
  );
}

export function OrderingProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const copy = menuPageCopy[locale].ordering;
  const [active, setActive] = useState<OrderableItem | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [lines, setLines] = useState<CartLine[]>([]);
  const [note, setNote] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // The server cannot read localStorage. Hydrating the stored order after
    // mount is the only way to avoid a server/client markup mismatch.
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          lines?: unknown;
          note?: unknown;
        };
        if (Array.isArray(parsed.lines)) {
          setLines(parsed.lines.filter(isCartLine).slice(0, MAX_LINES));
        }
        if (typeof parsed.note === "string") {
          setNote(parsed.note.slice(0, MAX_NOTE));
        }
      }
    } catch {
      // A corrupted or unavailable storage entry must not break ordering.
    }
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ lines, note }),
      );
    } catch {
      // Storage may be full or blocked; the in-memory order still works.
    }
  }, [lines, note, hydrated]);

  const openItem = useCallback((entry: OrderableItem) => {
    setCartOpen(false);
    setActive(entry);
  }, []);

  const closeItem = useCallback(() => setActive(null), []);

  const openCart = useCallback(() => {
    setActive(null);
    setCartOpen(true);
  }, []);

  const closeCart = useCallback(() => setCartOpen(false), []);

  const addItem = useCallback(
    (entry: OrderableItem, options: AddItemOptions) => {
      const { item } = entry;
      const useFamily =
        options.variant === "family" && Boolean(item.familyPriceDisplay);
      const familyCents = item.familyPriceDisplay
        ? Math.round(Number.parseFloat(item.familyPriceDisplay) * 100)
        : null;
      const unitPriceCents = useFamily
        ? Number.isFinite(familyCents)
          ? familyCents
          : null
        : item.priceNumeric;
      const unitPriceDisplay = useFamily
        ? (item.familyPriceDisplay ?? item.priceDisplay)
        : item.priceDisplay;
      const variantLabel = useFamily ? item.familyLabel : null;
      const key = `${item.id}::${useFamily ? "family" : "base"}`;
      const qty = Math.max(
        1,
        Math.min(MAX_ORDER_QTY, Math.trunc(options.qty)),
      );

      setLines((current) => {
        const existing = current.find((line) => line.key === key);
        if (existing) {
          return current.map((line) =>
            line.key === key
              ? { ...line, qty: Math.min(MAX_ORDER_QTY, line.qty + qty) }
              : line,
          );
        }
        if (current.length >= MAX_LINES) return current;
        return [
          ...current,
          {
            key,
            itemId: item.id,
            name: item.name,
            variantLabel,
            qty,
            unitPriceCents,
            unitPriceDisplay,
          },
        ];
      });
    },
    [],
  );

  const setQty = useCallback((key: string, qty: number) => {
    const next = Math.max(
      1,
      Math.min(MAX_ORDER_QTY, Math.trunc(qty)),
    );
    setLines((current) =>
      current.map((line) =>
        line.key === key ? { ...line, qty: next } : line,
      ),
    );
  }, []);

  const removeLine = useCallback((key: string) => {
    setLines((current) => current.filter((line) => line.key !== key));
  }, []);

  const clearCart = useCallback(() => {
    setLines([]);
    setNote("");
  }, []);

  const updateNote = useCallback((value: string) => {
    setNote(value.slice(0, MAX_NOTE));
  }, []);

  const itemCount = useMemo(
    () => lines.reduce((sum, line) => sum + line.qty, 0),
    [lines],
  );
  const subtotalCents = useMemo(
    () =>
      lines.reduce(
        (sum, line) => sum + (line.unitPriceCents ?? 0) * line.qty,
        0,
      ),
    [lines],
  );
  const hasUnknownPrice = useMemo(
    () => lines.some((line) => line.unitPriceCents === null),
    [lines],
  );

  const value = useMemo<OrderingContextValue>(
    () => ({
      locale,
      copy,
      active,
      cartOpen,
      lines,
      note,
      itemCount,
      subtotalCents,
      hasUnknownPrice,
      openItem,
      closeItem,
      openCart,
      closeCart,
      addItem,
      setQty,
      removeLine,
      clearCart,
      updateNote,
    }),
    [
      locale,
      copy,
      active,
      cartOpen,
      lines,
      note,
      itemCount,
      subtotalCents,
      hasUnknownPrice,
      openItem,
      closeItem,
      openCart,
      closeCart,
      addItem,
      setQty,
      removeLine,
      clearCart,
      updateNote,
    ],
  );

  return (
    <OrderingContext.Provider value={value}>
      {children}
      <ItemDialog key={active ? active.item.id : "item-dialog-empty"} />
      <CartDialog />
      <OrderDock />
    </OrderingContext.Provider>
  );
}

export function useOrdering(): OrderingContextValue {
  const context = useContext(OrderingContext);
  if (!context) {
    throw new Error("useOrdering must be used within OrderingProvider.");
  }
  return context;
}
