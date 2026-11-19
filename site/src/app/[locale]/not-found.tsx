import type { Metadata } from "next";
import { NotFoundLocale } from "@/components/NotFoundLocale";

export const metadata: Metadata = {
  title: "404 — ALMAS Restaurant",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return <NotFoundLocale />;
}
