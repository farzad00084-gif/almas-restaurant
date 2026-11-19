import { NextResponse, type NextRequest } from "next/server";
import { locales } from "@/content/types";

/**
 * Locale routing:
 *   /              -> /de (or /en when the visitor chose English before)
 *   /speisekarte   -> /de/speisekarte
 *   /en/speisekarte -> /en/menu
 *
 * The canonical map keeps one URL per page and language. It is
 * permanent because it never depends on cookies or request headers.
 */
const canonical: Record<string, string> = {
  "/de/menu": "/de/speisekarte",
  "/en/speisekarte": "/en/menu",
  "/de/imprint": "/de/impressum",
  "/en/impressum": "/en/imprint",
  "/de/privacy": "/de/datenschutz",
  "/en/datenschutz": "/en/privacy",
};

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const canonicalPath = canonical[pathname];
  if (canonicalPath) {
    const url = request.nextUrl.clone();
    url.pathname = canonicalPath;
    return NextResponse.redirect(url, 308);
  }

  const first = pathname.split("/")[1] ?? "";

  if ((locales as readonly string[]).includes(first)) {
    return NextResponse.next();
  }

  const preferred = request.cookies.get("almas-lang")?.value;
  const locale = preferred === "en" ? "en" : "de";

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  url.search = search;

  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
