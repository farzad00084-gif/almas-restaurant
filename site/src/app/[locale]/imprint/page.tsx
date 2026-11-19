import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage, legalPageCopy } from "@/components/LegalPage";
import { pageMetadata } from "@/content/metadata";
import { isLocale } from "@/content/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return pageMetadata(locale, "imprint");
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  if (locale !== "en") notFound();
  return (
    <LegalPage locale={locale} page={legalPageCopy(locale, "imprint")} kind="imprint" />
  );
}
