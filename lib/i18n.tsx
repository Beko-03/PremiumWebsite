"use client";

/* Marlow — Zweisprachigkeit (DE Standard, EN via Umschalter im Header).
   Die Sprache wird in localStorage ("marlow_lang") gemerkt.
   Statische Seitentexte liegen als {de,en}-Objekte direkt in den Komponenten;
   hier wohnen der Provider + die von mehreren Stellen genutzten UI-Strings. */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { loc, type Lang, type Localized } from "./data";

const STORAGE_KEY = "marlow_lang";

/* ---------- Gemeinsame UI-Strings (Warenkorb, Buchung, Quiz, Nav …) ---------- */

const STRINGS = {
  "a11y.skip": { de: "Zum Inhalt springen", en: "Skip to main content" },
  "a11y.cart": { de: "Warenkorb öffnen", en: "Open cart" },
  "crumb.home": { de: "Startseite", en: "Home" },

  "nav.shop": { de: "Shop", en: "Shop" },
  "nav.roastery": { de: "Rösterei", en: "Roastery" },
  "nav.journal": { de: "Journal", en: "Journal" },
  "nav.b2b": { de: "Für Cafés", en: "For cafés" },
  "nav.contact": { de: "Kontakt", en: "Contact" },
  "nav.reserve": { de: "Reservieren", en: "Book a table" },
  "nav.open": { de: "Menü öffnen", en: "Open menu" },
  "nav.close": { de: "Menü schließen", en: "Close menu" },

  "hours.monfri": { de: "Mo – Fr", en: "Mon – Fri" },
  "hours.sat": { de: "Samstag", en: "Saturday" },
  "hours.sun": { de: "Sonntag", en: "Sunday" },
  "hours.sun.v": { de: "Geschlossen — wir rösten", en: "Closed — we roast" },
  "hours.sun.short": { de: "Geschlossen", en: "Closed" },

  "footer.about": {
    de: "Kleinserien-Specialty-Coffee, direkt gehandelt und mit Geduld geröstet — seit 2014 in Münster.",
    en: "Small-batch specialty coffee, directly traded and roasted with patience — in Münster since 2014.",
  },
  "footer.shop": { de: "Shop", en: "Shop" },
  "footer.shop.all": { de: "Alle Kaffees", en: "All coffees" },
  "footer.shop.abo": { de: "Kaffee-Abo", en: "Coffee subscription" },
  "footer.shop.set": { de: "Probierpaket", en: "Tasting set" },
  "footer.shop.b2b": { de: "Großhandel für Cafés", en: "Wholesale for cafés" },
  "footer.company": { de: "Rösterei", en: "Roastery" },
  "footer.co.story": { de: "Unsere Geschichte", en: "Our story" },
  "footer.co.reserve": { de: "Tisch reservieren", en: "Book a table" },
  "footer.co.journal": { de: "Journal", en: "Journal" },
  "footer.co.contact": { de: "Kontakt & Anfahrt", en: "Contact & directions" },
  "footer.nl": { de: "Newsletter", en: "Newsletter" },
  "footer.nl.label": {
    de: "Eine Mail im Monat: neue Röstungen, Cupping-Termine, Brühtipps.",
    en: "One e-mail a month: new roasts, cupping dates, brew tips.",
  },
  "footer.nl.ph": { de: "du@beispiel.de", en: "you@example.com" },
  "footer.nl.cta": { de: "Anmelden", en: "Sign up" },
  "footer.rights": { de: "Alle Rechte vorbehalten.", en: "All rights reserved." },
  "footer.imprint": { de: "Impressum", en: "Imprint" },
  "footer.privacy": { de: "Datenschutz", en: "Privacy" },
  "footer.shipping": { de: "Versand & Retouren", en: "Shipping & returns" },

  "cart.title": { de: "Warenkorb", en: "Cart" },
  "cart.close": { de: "Warenkorb schließen", en: "Close cart" },
  "cart.empty": { de: "Dein Warenkorb ist noch leer.", en: "Your cart is still empty." },
  "cart.empty.cta": { de: "Zum Shop", en: "Go to shop" },
  "cart.subtotal": { de: "Zwischensumme", en: "Subtotal" },
  "cart.checkout": { de: "Zur Kasse (Demo)", en: "Checkout (demo)" },
  "cart.remove": { de: "Entfernen", en: "Remove" },
  "cart.ship.progress": { de: "Noch {amount} bis zum Gratisversand", en: "{amount} away from free shipping" },
  "cart.ship.free": { de: "Gratisversand freigeschaltet", en: "Free shipping unlocked" },
  "cart.added": { de: "{name} liegt im Warenkorb", en: "{name} added to cart" },
  "cart.qty.less": { de: "Menge verringern", en: "Decrease quantity" },
  "cart.qty.more": { de: "Menge erhöhen", en: "Increase quantity" },
  "checkout.title": { de: "Demo-Checkout", en: "Demo checkout" },
  "checkout.text": {
    de: "In der Live-Version übergibt der Shop hier an Ihren Zahlungsanbieter (z. B. Stripe, PayPal oder Shopify Payments). Diese Vorlage zeigt den kompletten Weg bis zur Kasse.",
    en: "In the live version the shop hands over to your payment provider here (e.g. Stripe, PayPal or Shopify Payments). This template demonstrates the full journey up to checkout.",
  },
  "modal.ok": { de: "Alles klar", en: "Got it" },
  "grind.whole": { de: "Ganze Bohne", en: "Whole bean" },
  "grind.filter": { de: "Filter", en: "Filter" },
  "grind.espresso": { de: "Espresso", en: "Espresso" },

  "bk.slots.title": { de: "2. Uhrzeit wählen", en: "2. Choose a time" },
  "bk.slots.hint": { de: "Bitte wähle zuerst links einen geöffneten Tag.", en: "Please pick an open day on the left first." },
  "bk.closed.sun": { de: "Sonntags rösten wir — das Café ist geschlossen.", en: "On Sundays we roast — the café is closed." },
  "bk.closed.holiday": { de: "An diesem Tag haben wir geschlossen.", en: "We are closed on this day." },
  "bk.summary": { de: "{date}, {time} Uhr · {persons}", en: "{date} at {time} · {persons}" },
  "bk.person.one": { de: "1 Person", en: "1 person" },
  "bk.person.many": { de: "{n} Personen", en: "{n} people" },
  "bk.success.title": { de: "Reservierung bestätigt!", en: "Reservation confirmed!" },
  "bk.success.text": {
    de: "Wir haben deinen Tisch reserviert. Eine Bestätigung ginge in der Live-Version jetzt per E-Mail an {email}.",
    en: "Your table is booked. In the live version a confirmation e-mail would now go to {email}.",
  },
  "bk.success.code": { de: "Buchungscode", en: "Booking code" },
  "bk.new": { de: "Weitere Reservierung", en: "Make another reservation" },
  "bk.err.required": { de: "Bitte fülle dieses Feld aus.", en: "Please fill in this field." },
  "bk.err.email": { de: "Bitte gib eine gültige E-Mail-Adresse an.", en: "Please enter a valid e-mail address." },
  "bk.err.slot": { de: "Bitte wähle Datum und Uhrzeit.", en: "Please choose a date and time." },
  "bk.prev": { de: "Vorheriger Monat", en: "Previous month" },
  "bk.next": { de: "Nächster Monat", en: "Next month" },

  "quiz.q1": { de: "Wie bereitest du deinen Kaffee zu?", en: "How do you brew your coffee?" },
  "quiz.q1.a": { de: "Handfilter / Pour Over", en: "Pour-over / filter" },
  "quiz.q1.b": { de: "Siebträger / Espresso", en: "Espresso machine" },
  "quiz.q1.c": { de: "Vollautomat", en: "Bean-to-cup machine" },
  "quiz.q1.d": { de: "French Press / Cold Brew", en: "French press / cold brew" },
  "quiz.q2": { de: "Welche Richtung darf es geschmacklich sein?", en: "Which flavour direction do you prefer?" },
  "quiz.q2.a": { de: "Fruchtig & floral", en: "Fruity & floral" },
  "quiz.q2.b": { de: "Schokoladig & süß", en: "Chocolatey & sweet" },
  "quiz.q2.c": { de: "Kräftig & dunkel", en: "Bold & dark" },
  "quiz.q3": { de: "Wie trinkst du ihn meistens?", en: "How do you usually drink it?" },
  "quiz.q3.a": { de: "Schwarz", en: "Black" },
  "quiz.q3.b": { de: "Mit Milch oder Hafer", en: "With milk or oat" },
  "quiz.back": { de: "Zurück", en: "Back" },
  "quiz.result.eyebrow": { de: "Deine Empfehlung", en: "Our pick for you" },
  "quiz.result.text": {
    de: "Passt zu deiner Zubereitung und deinem Geschmack — frisch geröstet am nächsten Dienstag.",
    en: "Matched to your brew method and taste — freshly roasted next Tuesday.",
  },
  "quiz.result.cta": { de: "In den Warenkorb", en: "Add to cart" },
  "quiz.result.more": { de: "Zum Produkt", en: "View product" },
  "quiz.restart": { de: "Quiz neu starten", en: "Restart quiz" },

  "abo.week": { de: "Wöchentlich", en: "Weekly" },
  "abo.biweek": { de: "Alle 14 Tage", en: "Every 14 days" },
  "abo.month": { de: "Monatlich", en: "Monthly" },
  "abo.roasters": { de: "Röster-Wahl (Überraschung)", en: "Roaster's choice (surprise)" },
  "abo.per.delivery": { de: "pro Lieferung", en: "per delivery" },
  "abo.save": {
    de: "Du sparst {amount} pro Lieferung (10 % Abo-Vorteil)",
    en: "You save {amount} per delivery (10% subscription perk)",
  },
  "abo.success.title": { de: "Abo angelegt (Demo)", en: "Subscription created (demo)" },
  "abo.success.text": {
    de: "In der Live-Version startet hier das Abo mit Kundenkonto, Pause- und Kündigungsfunktion. Erste Lieferung: nächster Rösttag.",
    en: "In the live version the subscription starts here with a customer account, pause and cancel options. First delivery: next roast day.",
  },

  "form.sent.title": { de: "Nachricht gesendet (Demo)", en: "Message sent (demo)" },
  "form.sent.text": {
    de: "Danke! In der Live-Version landet diese Anfrage direkt im Postfach bzw. CRM des Teams.",
    en: "Thank you! In the live version this enquiry goes straight to the team's inbox or CRM.",
  },

  "roast.today": { de: "Heute wird geröstet!", en: "We are roasting today!" },
  "roast.batch": { de: "Charge", en: "Batch" },
  "roast.next": { de: "Nächster Rösttag", en: "Next roast day" },
  "roast.in.days": { de: "in {n} Tagen", en: "in {n} days" },
  "roast.in.one": { de: "morgen", en: "tomorrow" },
} satisfies Record<string, Localized>;

export type StringKey = keyof typeof STRINGS;

/* ---------- Context ---------- */

interface I18nContextValue {
  lang: Lang;
  setLang: (next: Lang) => void;
  toggleLang: () => void;
  /** UI-String nach Schlüssel, optional mit {platzhaltern} */
  t: (key: StringKey, vars?: Record<string, string | number>) => string;
  /** Lokalisiertes Feld ({de,en} oder string) in der aktiven Sprache */
  L: <T>(field: T | Localized<T> | null | undefined) => T;
  fmtPrice: (n: number) => string;
  fmtDate: (dateLike: string | Date, opts?: Intl.DateTimeFormatOptions) => string;
  locale: string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("de");

  /* Gespeicherte Sprache erst nach dem Mount lesen (SSG rendert immer DE) */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "de") setLangState(saved);
    } catch {
      /* Storage evtl. blockiert */
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* noop */
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next: Lang = prev === "de" ? "en" : "de";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* noop */
      }
      return next;
    });
  }, []);

  const value = useMemo<I18nContextValue>(() => {
    const locale = lang === "de" ? "de-DE" : "en-GB";

    const t = (key: StringKey, vars?: Record<string, string | number>) => {
      const entry = STRINGS[key] as Localized | undefined;
      let str = entry ? entry[lang] ?? entry.de : String(key);
      if (vars) {
        for (const k of Object.keys(vars)) {
          str = str.replace(`{${k}}`, String(vars[k]));
        }
      }
      return str;
    };

    const L = <T,>(field: T | Localized<T> | null | undefined): T => loc(field, lang);

    const fmtPrice = (n: number) =>
      new Intl.NumberFormat(locale, { style: "currency", currency: "EUR" }).format(n);

    const fmtDate = (dateLike: string | Date, opts?: Intl.DateTimeFormatOptions) => {
      const d = typeof dateLike === "string" ? new Date(dateLike + "T12:00:00") : dateLike;
      return new Intl.DateTimeFormat(
        locale,
        opts ?? { year: "numeric", month: "long", day: "numeric" }
      ).format(d);
    };

    return { lang, setLang, toggleLang, t, L, fmtPrice, fmtDate, locale };
  }, [lang, setLang, toggleLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n muss innerhalb von <LanguageProvider> verwendet werden");
  return ctx;
}
