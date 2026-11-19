"use client";

import { ui } from "@/content/copy";
import type { Locale } from "@/content/types";
import { useTheme } from "./useTheme";

function SunIcon() {
  return (
    <svg
      className="icon-sun"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      className="icon-moon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
    </svg>
  );
}

export function ThemeToggle({ locale }: { locale: Locale }) {
  const copy = ui[locale];
  const { theme, toggle } = useTheme();
  const label = theme === "dark" ? copy.switchToLight : copy.switchToDark;

  return (
    <button
      className="icon-btn"
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      aria-pressed={theme === "dark"}
    >
      <SunIcon />
      <MoonIcon />
    </button>
  );
}
