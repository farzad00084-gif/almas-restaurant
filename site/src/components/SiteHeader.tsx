"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes, site } from "@/content";
import { ui } from "@/content/copy";
import type { Locale } from "@/content/types";
import { BrandMark } from "./BrandMark";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

interface NavItem {
  href: string;
  label: string;
  current?: boolean;
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const copy = ui[locale];
  const isHome = pathname === routes.home[locale];
  const isMenu = pathname === routes.menu[locale];
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const [scrolled, setScrolled] = useState(false);
  const setOpen = useCallback(
    (next: boolean) => setOpenPath(next ? pathname : null),
    [pathname],
  );
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const homeHref = routes.home[locale];
  const menuHref = routes.menu[locale];

  const desktopNav: NavItem[] = isHome
    ? [
        { href: menuHref, label: copy.menu },
        { href: "#kitchen", label: copy.kitchen },
        { href: "#sourcing", label: copy.origin },
        { href: "#visit", label: copy.visit },
      ]
    : [
        { href: homeHref, label: copy.home },
        { href: menuHref, label: copy.menu, current: isMenu },
      ];

  const mobileNav: NavItem[] = isHome
    ? [
        { href: menuHref, label: copy.menu },
        { href: "#kitchen", label: copy.kitchen },
        { href: "#sourcing", label: copy.origin },
        { href: "#visit", label: copy.visit },
      ]
    : [
        { href: homeHref, label: copy.home },
        { href: menuHref, label: copy.menu, current: isMenu },
      ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const menu = mobileMenuRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.classList.add("menu-open");
    document.body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(
        menu?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((element) => element.offsetParent !== null);

    const timer = window.setTimeout(() => focusables()[0]?.focus(), 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const onResize = () => {
      if (window.innerWidth > 900) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      document.body.classList.remove("menu-open");
      document.body.style.overflow = previousOverflow;
    };
  }, [open, setOpen]);

  const closeMenu = () => {
    setOpen(false);
    window.setTimeout(() => menuButtonRef.current?.focus(), 0);
  };

  return (
    <>
      <header
        className={`site-header${isHome ? " site-header--over-hero" : ""}${
          scrolled ? " is-scrolled" : ""
        }`}
      >
        <div className="header-inner">
          <Link className="brand" href={homeHref} aria-label={copy.brandAria}>
            <BrandMark />
            <span>
              <span className="brand-word">ALMAS</span>
              <span className="brand-place">AARAU</span>
            </span>
          </Link>

          <nav className="primary-nav" aria-label={copy.mainNavLabel}>
            {desktopNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={item.current ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-tools">
            <LanguageSwitcher locale={locale} />
            <ThemeToggle locale={locale} />
            <button
              ref={menuButtonRef}
              className="menu-btn"
              type="button"
              aria-controls="mobile-menu"
              aria-expanded={open}
              onClick={() => (open ? closeMenu() : setOpen(true))}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span className="sr-only">
                {open ? copy.closeMenu : copy.openMenu}
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        className="mobile-menu"
        id="mobile-menu"
        ref={mobileMenuRef}
        hidden={!open}
      >
        <nav className="mobile-menu-nav" aria-label={copy.mobileNavLabel}>
          {mobileNav.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              <span>{item.label}</span>
              <span className="mono">{String(index + 1).padStart(2, "0")}</span>
            </Link>
          ))}
        </nav>
        <div className="mobile-menu-meta">
          <div>
            <p className="mono">{copy.address}</p>
            <p>
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}
            </p>
          </div>
          <div>
            <p className="mono">{copy.phone}</p>
            <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
          </div>
          <LanguageSwitcher locale={locale} />
        </div>
      </div>
    </>
  );
}
