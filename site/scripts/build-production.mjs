#!/usr/bin/env node
/**
 * Public production build.
 *
 * Sets the production content mode and indexing flags, runs the strict
 * content gate, and only then builds the site. Refuses to build without
 * a real https:// site URL.
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dirname, "..");

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
if (!siteUrl || /localhost|127\.0\.0\.1/.test(siteUrl)) {
  console.error(
    "\nRefusing the production build: set NEXT_PUBLIC_SITE_URL to the final https:// domain.\n",
  );
  process.exit(1);
}

const env = {
  ...process.env,
  NEXT_PUBLIC_CONTENT_MODE: "production",
  NEXT_PUBLIC_ALLOW_INDEXING: "true",
  NEXT_PUBLIC_SITE_URL: siteUrl,
};

function run(args) {
  const result = spawnSync(process.execPath, args, {
    cwd: root,
    env,
    stdio: "inherit",
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run(["scripts/validate-content.mjs", "--strict"]);
run([path.join("node_modules", "next", "dist", "bin", "next"), "build"]);
