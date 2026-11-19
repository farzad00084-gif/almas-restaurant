"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function readTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function writeTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  try {
    window.localStorage.setItem("almas-theme", theme);
  } catch {
    /* Storage may be unavailable in private or embedded contexts. */
  }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", theme === "dark" ? "#191719" : "#EAE5DC");
  }
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  const onStorage = (event: StorageEvent) => {
    if (event.key !== "almas-theme") return;
    const next: Theme = event.newValue === "dark" ? "dark" : "light";
    const root = document.documentElement;
    root.dataset.theme = next;
    root.style.colorScheme = next;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", next === "dark" ? "#191719" : "#EAE5DC");
    }
    emit();
  };

  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): Theme {
  return readTheme();
}

function getServerSnapshot(): Theme {
  return "light";
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return {
    theme,
    toggle() {
      writeTheme(theme === "dark" ? "light" : "dark");
    },
  };
}
