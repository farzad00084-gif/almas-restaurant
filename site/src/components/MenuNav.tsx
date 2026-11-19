"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ui } from "@/content/copy";
import type { Locale, Localized } from "@/content/types";

interface MenuNavProps {
  locale: Locale;
  categories: { id: string; title: Localized }[];
}

export function MenuNav({ locale, categories }: MenuNavProps) {
  const copy = ui[locale];
  const navRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "");

  const updateActive = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(".menu-section"),
    );
    if (sections.length === 0) return;

    const header = document.querySelector<HTMLElement>(".site-header");
    const offset = (header?.offsetHeight ?? 0) + 96;
    let nextActive = sections[0].id;

    for (const section of sections) {
      if (section.getBoundingClientRect().top - offset <= 0) {
        nextActive = section.id;
      }
    }

    setActiveId(nextActive);

    const activeLink = nav.querySelector<HTMLElement>("a.is-active");
    if (!activeLink || nav.scrollWidth <= nav.clientWidth + 8) return;

    const linkRect = activeLink.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    const targetLeft =
      nav.scrollLeft +
      (linkRect.left - navRect.left) -
      (nav.clientWidth - linkRect.width) / 2;
    const maxLeft = nav.scrollWidth - nav.clientWidth;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    nav.scrollTo({
      left: Math.max(0, Math.min(maxLeft, targetLeft)),
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, []);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        updateActive();
        ticking = false;
      });
    };

    const frame = window.requestAnimationFrame(updateActive);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [updateActive]);

  return (
    <nav className="menu-nav" aria-label={copy.menuNavLabel}>
      <div className="container">
        <div className="menu-nav-inner" ref={navRef}>
          {categories.map((category) => (
            <a
              key={category.id}
              href={`#menu-${category.id}`}
              className={category.id === activeId ? "is-active" : undefined}
              aria-current={
                category.id === activeId ? "location" : undefined
              }
              onClick={() => setActiveId(category.id)}
            >
              {category.title[locale]}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
