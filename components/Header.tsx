"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart";
import { useI18n, type StringKey } from "@/lib/i18n";

const NAV_ITEMS: { href: string; key: StringKey; matches: string[] }[] = [
  { href: "/shop/", key: "nav.shop", matches: ["/shop", "/produkt"] },
  { href: "/roesterei/", key: "nav.roastery", matches: ["/roesterei"] },
  { href: "/journal/", key: "nav.journal", matches: ["/journal", "/artikel"] },
  { href: "/b2b/", key: "nav.b2b", matches: ["/b2b"] },
  { href: "/kontakt/", key: "nav.contact", matches: ["/kontakt"] },
];

export default function Header() {
  const { t, lang, toggleLang } = useI18n();
  const { count, openCart } = useCart();
  const pathname = usePathname() ?? "/";
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Mobile-Nav mit Escape schließen */
  useEffect(() => {
    if (!navOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setNavOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [navOpen]);

  /* Bei Seitenwechsel schließen */
  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  const isCurrent = (item: (typeof NAV_ITEMS)[number]) =>
    item.matches.some((m) => pathname === m || pathname.startsWith(`${m}/`));

  return (
    <>
      <a className="skip-link" href="#main">
        {t("a11y.skip")}
      </a>

      <header className={`header${scrolled ? " is-scrolled" : ""}`} id="top">
        <div className="container header__inner">
          <Link className="brand" href="/" aria-label="Marlow Coffee Roasters — Startseite">
            <svg className="brand__mark" aria-hidden="true">
              <use href="#i-bean" />
            </svg>
            <span>
              <span className="brand__name">MARLOW</span>
              <span className="brand__tag">Coffee Roasters</span>
            </span>
          </Link>

          <button
            ref={toggleRef}
            className="nav-toggle"
            type="button"
            aria-expanded={navOpen}
            aria-controls="site-nav"
            aria-label={t(navOpen ? "nav.close" : "nav.open")}
            onClick={() => setNavOpen((open) => !open)}
          >
            <svg className="icon-menu" aria-hidden="true">
              <use href="#i-menu" />
            </svg>
            <svg className="icon-close" aria-hidden="true">
              <use href="#i-close" />
            </svg>
          </button>

          <nav
            className={`nav${navOpen ? " is-open" : ""}`}
            id="site-nav"
            aria-label="Hauptnavigation"
            onClick={(event) => {
              if ((event.target as HTMLElement).closest("a")) setNavOpen(false);
            }}
          >
            <ul className="nav__list">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    className="nav__link"
                    href={item.href}
                    aria-current={isCurrent(item) ? "page" : undefined}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
            <Link className="btn btn--primary" href="/reservierung/">
              {t("nav.reserve")}
            </Link>
          </nav>

          <div className="header__actions">
            <button
              className="icon-btn icon-btn--lang"
              type="button"
              onClick={toggleLang}
              aria-label={lang === "de" ? "Switch language to English" : "Sprache auf Deutsch umstellen"}
            >
              {lang === "de" ? "EN" : "DE"}
            </button>
            <button className="icon-btn" type="button" aria-label={t("a11y.cart")} onClick={openCart}>
              <svg aria-hidden="true">
                <use href="#i-cart" />
              </svg>
              <span className="cart-count" hidden={count === 0}>
                {count}
              </span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
