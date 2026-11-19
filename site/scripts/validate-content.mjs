#!/usr/bin/env node
/**
 * Content gate for ALMAS.
 *
 * Default mode checks the structure of the local content adapter and
 * prints the launch blockers as warnings. `--strict` turns every
 * launch blocker into a build failure and is intended for the public
 * production build.
 *
 * No external service is contacted. This script only reads files.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dirname, "..");
const strict =
  process.argv.includes("--strict") ||
  process.env.NEXT_PUBLIC_CONTENT_MODE === "production";

const failures = [];
const warnings = [];
const passes = [];

const fail = (message) => failures.push(message);
const warn = (message) => warnings.push(message);
const pass = (message) => passes.push(message);

/** A launch blocker: fatal in strict production mode, warning in preview. */
const blocker = (message) => {
  if (strict) fail(message);
  else warn(message);
};

function readJson(relativePath) {
  const file = path.join(root, relativePath);
  if (!fs.existsSync(file)) {
    fail(`Missing file: ${relativePath}`);
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    fail(`Invalid JSON in ${relativePath}: ${error.message}`);
    return null;
  }
}

const menu = readJson("src/content/menu.json");
const media = readJson("src/content/media.json");
const site = readJson("src/content/site.json");

const expectedCategories = {
  teller: 9,
  pizza: 17,
  pide: 4,
  lahmacun: 2,
  snacks: 13,
  box: 15,
};

function validateMenu() {
  if (!menu) return;
  if (!Array.isArray(menu.categories)) {
    fail("menu.json: categories must be an array.");
    return;
  }

  if (menu.categories.length !== 6) {
    fail(`menu.json: expected 6 categories, found ${menu.categories.length}.`);
  } else {
    pass("menu.json: 6 categories.");
  }

  const ids = new Set();
  let itemCount = 0;
  let unverifiedPrices = 0;

  for (const category of menu.categories) {
    const expected = expectedCategories[category.id];
    if (expected === undefined) {
      fail(`menu.json: unexpected category id "${category.id}".`);
      continue;
    }
    if (!Array.isArray(category.items)) {
      fail(`menu.json: category "${category.id}" has no items array.`);
      continue;
    }
    if (category.items.length !== expected) {
      fail(
        `menu.json: category "${category.id}" has ${category.items.length} items, expected ${expected}.`,
      );
    }
    if (!category.title?.de || !category.title?.en) {
      fail(`menu.json: category "${category.id}" is missing a DE/EN title.`);
    }

    for (const item of category.items) {
      itemCount += 1;

      if (!item.id || typeof item.id !== "string") {
        fail(`menu.json: an item in "${category.id}" has no id.`);
        continue;
      }
      if (ids.has(item.id)) {
        fail(`menu.json: duplicate item id "${item.id}".`);
      }
      ids.add(item.id);

      if (!item.name?.de || !item.name?.en) {
        fail(`menu.json: "${item.id}" is missing a DE/EN name.`);
      }
      if (
        item.description !== null &&
        (!item.description?.de || !item.description?.en)
      ) {
        fail(`menu.json: "${item.id}" has an incomplete description.`);
      }
      if (!/^\d+\.\d{2}( \/ \d+\.\d{2})?$/.test(item.priceDisplay ?? "")) {
        fail(`menu.json: "${item.id}" has an invalid price "${item.priceDisplay}".`);
      }
      if (item.priceVerified !== true) unverifiedPrices += 1;

      if (item.familyPriceDisplay) {
        if (!/^\d+\.\d{2}$/.test(item.familyPriceDisplay)) {
          fail(
            `menu.json: "${item.id}" has an invalid family price "${item.familyPriceDisplay}".`,
          );
        }
        if (!item.familyLabel?.de || !item.familyLabel?.en) {
          fail(`menu.json: "${item.id}" has a family price without a label.`);
        }
      }

      if (item.available !== true) {
        warn(`menu.json: "${item.id}" is marked unavailable and stays visible.`);
      }
    }
  }

  if (itemCount !== 60) {
    fail(`menu.json: expected 60 items, found ${itemCount}.`);
  } else {
    pass("menu.json: 60 menu items, all with unique ids.");
  }

  if (unverifiedPrices > 0) {
    blocker(
      `menu.json: ${unverifiedPrices} of ${itemCount} prices are not verified.`,
    );
  } else {
    pass("menu.json: every price is verified.");
  }

  if (menu.priceVerified !== true && unverifiedPrices === 0) {
    blocker("menu.json: the menu-level priceVerified flag is still false.");
  }

  const sourceFile = path.resolve(root, "..", menu.source ?? "");
  if (!menu.source || !fs.existsSync(sourceFile)) {
    warn("menu.json: the printed-menu audit trail could not be found.");
  } else {
    pass(`menu.json: audit trail present (${menu.source}).`);
  }
}

function validateMedia() {
  if (!media) return;
  if (!Array.isArray(media.images)) {
    fail("media.json: images must be an array.");
    return;
  }

  const ids = new Set();
  let placeholders = 0;

  for (const image of media.images) {
    if (!image.id) {
      fail("media.json: an image has no id.");
      continue;
    }
    if (ids.has(image.id)) {
      fail(`media.json: duplicate image id "${image.id}".`);
    }
    ids.add(image.id);

    if (!image.file || !fs.existsSync(path.join(root, "src/media", image.file))) {
      fail(`media.json: "${image.id}" points to a missing file "${image.file}".`);
    }
    if (image.decorative !== true && (!image.alt?.de || !image.alt?.en)) {
      fail(`media.json: "${image.id}" needs DE/EN alt text.`);
    }
    if (!image.credit || !image.licence || !image.sourceUrl) {
      fail(`media.json: "${image.id}" is missing credit, licence or source.`);
    }
    if (image.isPlaceholder === true) placeholders += 1;
  }

  if (placeholders > 0) {
    blocker(
      `media.json: ${placeholders} of ${media.images.length} images are stock placeholders.`,
    );
  } else {
    pass("media.json: no placeholder images.");
  }

  const required = [
    "hero-grill",
    "dough-hands",
    "kebab-plate",
    "pizza-margherita",
    "baklava",
    "pide",
    "pomegranate",
  ];
  for (const id of required) {
    if (!ids.has(id)) fail(`media.json: required image "${id}" is missing.`);
  }

  const imagesSource = fs.readFileSync(
    path.join(root, "src/content/images.ts"),
    "utf8",
  );
  for (const id of ids) {
    if (!imagesSource.includes(id)) {
      fail(`images.ts: image "${id}" is not imported for next/image.`);
    }
  }
}

function validateSite() {
  if (!site) return;

  const required = [
    ["restaurantName", site.restaurantName],
    ["titleName", site.titleName],
    ["phone", site.phone],
    ["phoneHref", site.phoneHref],
    ["mapsUrl", site.mapsUrl],
    ["osmEmbedUrl", site.osmEmbedUrl],
  ];
  for (const [key, value] of required) {
    if (!value) fail(`site.json: "${key}" is empty.`);
  }

  const address = site.address ?? {};
  for (const key of ["street", "postalCode", "city", "country"]) {
    if (!address[key]) fail(`site.json: address.${key} is empty.`);
  }
  if (!Number.isFinite(site.geo?.lat) || !Number.isFinite(site.geo?.lng)) {
    fail("site.json: geo coordinates are missing.");
  }

  if (!site.email) {
    blocker("site.json: no verified email address is available.");
  } else {
    pass("site.json: email address present.");
  }

  if (!site.hours) {
    blocker("site.json: no verified opening hours are available.");
  } else {
    pass("site.json: opening hours present.");
  }

  const socials = site.social ?? {};
  const unverified = Object.entries(socials).filter(
    ([, value]) => !value?.verified || !value?.url,
  );
  if (unverified.length > 0) {
    warn(
      `site.json: ${unverified.map(([name]) => name).join(", ")} not verified; the footer hides them.`,
    );
  }
}

function validateLegalCopy() {
  const copyPath = path.join(root, "src/content/copy.ts");
  if (!fs.existsSync(copyPath)) {
    fail("src/content/copy.ts is missing.");
    return;
  }
  const copy = fs.readFileSync(copyPath, "utf8");

  const draftMarkers = [
    "Entwurf",
    "Draft",
    "ausstehend",
    "pending",
    "nicht veröffentlichen",
    "do not publish",
  ];
  const found = draftMarkers.filter((marker) => copy.includes(marker));

  if (found.length > 0) {
    blocker(
      `copy.ts: legal copy still contains draft markers: ${found.join(", ")}.`,
    );
  } else {
    pass("copy.ts: no legal draft markers.");
  }
}

function validateEnvironment() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const mode = process.env.NEXT_PUBLIC_CONTENT_MODE ?? "preview";
  const indexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

  if (strict) {
    if (!siteUrl || /localhost|127\.0\.0\.1/.test(siteUrl)) {
      fail(
        "NEXT_PUBLIC_SITE_URL must be the final https:// domain for a production build.",
      );
    } else if (!siteUrl.startsWith("https://")) {
      fail("NEXT_PUBLIC_SITE_URL must use https:// for production.");
    } else {
      pass(`production URL: ${siteUrl}`);
    }

    if (mode !== "production") {
      fail("NEXT_PUBLIC_CONTENT_MODE must be production.");
    }
    if (!indexing) {
      fail("NEXT_PUBLIC_ALLOW_INDEXING must be true for the public build.");
    }
  } else {
    if (mode === "production") {
      warn(
        "NEXT_PUBLIC_CONTENT_MODE=production without --strict; run the strict gate before deploying.",
      );
    }
    if (!siteUrl) {
      warn(
        "NEXT_PUBLIC_SITE_URL is not set; metadata and the sitemap use http://localhost:3000.",
      );
    }
    if (indexing) {
      warn(
        "Indexing is enabled while the preview contains unverified content.",
      );
    }
  }
}

validateMenu();
validateMedia();
validateSite();
validateLegalCopy();
validateEnvironment();

const label = strict ? "Production content gate" : "Preview content check";
console.log(`\n${label}\n${"=".repeat(label.length)}`);
console.log(
  `${passes.length} passed · ${warnings.length} warning(s) · ${failures.length} failure(s)\n`,
);

if (warnings.length > 0) {
  console.log("Warnings");
  for (const message of warnings) console.log(`  ! ${message}`);
  console.log("");
}

if (failures.length > 0) {
  console.log("Failures");
  for (const message of failures) console.log(`  x ${message}`);
  console.log("\nContent gate failed. Nothing may be published.\n");
  process.exit(1);
}

if (strict) {
  console.log("Strict content gate passed.\n");
} else {
  console.log(
    "Preview structure is valid. Launch blockers above are expected until the client supplies verified content.\n",
  );
}
