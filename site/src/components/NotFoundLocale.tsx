"use client";

import { useParams } from "next/navigation";
import { isLocale } from "@/content/types";
import { NotFoundPage } from "./NotFoundPage";

export function NotFoundLocale() {
  const params = useParams<{ locale?: string | string[] }>();
  const raw = Array.isArray(params?.locale) ? params.locale[0] : params?.locale;
  const locale = raw && isLocale(raw) ? raw : "de";
  return <NotFoundPage locale={locale} />;
}
