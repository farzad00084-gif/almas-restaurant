import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/HomePage";
import { pageMetadata } from "@/content/metadata";
import { isLocale } from "@/content/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return pageMetadata(locale, "home");
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <HomePage locale={locale} />;
}
