#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Imports the approved prototype menu into the production content adapter.
 *
 * Source of truth: prototypes/assets/js/menu-data.js (copied to
 * scripts/menu-data.source.js). The printed menu audit trail remains
 * docs/content/menu-source.md.
 *
 * This script must not "fix" or translate anything. It normalises the
 * prototype shape, adds stable keys and verification flags, and refuses to
 * write output if the 6-category / 60-item contract is broken.
 */
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const sourcePath = path.join(__dirname, "menu-data.source.js");
const outputPath = path.join(root, "src", "content", "menu.json");

const source = fs.readFileSync(sourcePath, "utf8");
const sandbox = { window: {} };
vm.runInNewContext(source, sandbox, { filename: sourcePath });
const raw = sandbox.window.ALMAS_MENU;

const expectedCounts = {
  teller: 9,
  pizza: 17,
  pide: 4,
  lahmacun: 2,
  snacks: 13,
  box: 15,
};

/** URL-safe key from an English dish name. Kept stable across imports. */
function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const usedKeys = new Set();
const categories = raw.map((category, categoryIndex) => ({
  id: category.id,
  order: categoryIndex + 1,
  title: { de: category.title.de, en: category.title.en },
  note: category.note
    ? { de: category.note.de, en: category.note.en }
    : null,
  footnote: category.source
    ? { de: category.source.de, en: category.source.en }
    : null,
  items: category.items.map((item, itemIndex) => {
    const base = slugify(item.name.en);
    let key = `${category.id}-${base}`;
    let suffix = 2;
    while (usedKeys.has(key)) {
      key = `${category.id}-${base}-${suffix}`;
      suffix += 1;
    }
    usedKeys.add(key);

    const singlePrice = /^\d+\.\d{2}$/.test(item.price);

    return {
      id: key,
      order: itemIndex + 1,
      name: { de: item.name.de, en: item.name.en },
      description: item.desc ? { de: item.desc.de, en: item.desc.en } : null,
      priceDisplay: item.price,
      priceNumeric: singlePrice ? Math.round(Number(item.price) * 100) : null,
      priceVerified: false,
      familyPriceDisplay: item.family ?? null,
      familyLabel: item.family ? { de: "40 cm", en: "40 cm" } : null,
      available: true,
      image: null,
    };
  }),
}));

const total = categories.reduce((sum, category) => sum + category.items.length, 0);

if (categories.length !== 6) {
  throw new Error(`Expected 6 categories, found ${categories.length}.`);
}
if (total !== 60) {
  throw new Error(`Expected 60 items, found ${total}.`);
}
for (const category of categories) {
  const expected = expectedCounts[category.id];
  if (!expected) {
    throw new Error(`Unexpected category id: ${category.id}`);
  }
  if (category.items.length !== expected) {
    throw new Error(
      `${category.id}: expected ${expected} items, found ${category.items.length}.`,
    );
  }
  for (const item of category.items) {
    if (!item.name.de || !item.name.en) {
      throw new Error(`${item.id}: missing a German or English name.`);
    }
    if (!/^\d+\.\d{2}( \/ \d+\.\d{2})?$/.test(item.priceDisplay)) {
      throw new Error(`${item.id}: unexpected price ${item.priceDisplay}.`);
    }
  }
}

const output = {
  version: "2026-11",
  source: "docs/content/menu-source.md",
  generatedFrom: "prototypes/assets/js/menu-data.js",
  priceVerified: false,
  categories,
};

fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(
  `Wrote ${outputPath} — ${categories.length} categories, ${total} items, ${usedKeys.size} unique keys.`,
);
