import type { OrderingCopy } from "@/content/copy";
import type { Locale } from "@/content/types";
import type { CartLine } from "./OrderingContext";

/** Prices are stored in Rappen (cents) so totals stay exact. */
export function formatChf(cents: number): string {
  return (cents / 100).toFixed(2);
}

export function buildOrderMessage(
  locale: Locale,
  lines: CartLine[],
  note: string,
  copy: OrderingCopy["message"],
): string {
  const parts: string[] = [copy.greeting, "", copy.intro, ""];

  for (const line of lines) {
    const variant = line.variantLabel
      ? ` (${line.variantLabel[locale]})`
      : "";
    const price =
      line.unitPriceCents !== null
        ? `CHF ${formatChf(line.unitPriceCents * line.qty)}`
        : `CHF ${line.unitPriceDisplay}`;
    parts.push(`${line.qty} × ${line.name[locale]}${variant} — ${price}`);
  }

  const priced = lines.filter((line) => line.unitPriceCents !== null);
  if (priced.length > 0) {
    const subtotal = priced.reduce(
      (sum, line) => sum + (line.unitPriceCents as number) * line.qty,
      0,
    );
    parts.push("");
    parts.push(
      `${priced.length === lines.length ? copy.total : copy.totalPartial}: CHF ${formatChf(subtotal)}`,
    );
  }

  const unpriced = lines.filter((line) => line.unitPriceCents === null);
  if (unpriced.length > 0) {
    parts.push(
      `${copy.unknownPrice} ${unpriced
        .map((line) => line.name[locale])
        .join(", ")}`,
    );
  }

  const trimmedNote = note.trim();
  if (trimmedNote) {
    parts.push("", `${copy.noteLabel}: ${trimmedNote}`);
  }

  parts.push("", copy.confirmation, "", copy.thanks);
  return parts.join("\n");
}
