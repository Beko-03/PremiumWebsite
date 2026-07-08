"use client";

import Link from "next/link";
import { useRef } from "react";
import { useI18n } from "@/lib/i18n";
import { useDemoForm } from "@/lib/useDemoForm";

const T = {
  eyebrow: { de: "Wir antworten schnell", en: "We answer fast" },
  title: { de: "Kontakt & Anfahrt", en: "Contact & directions" },
  lede: {
    de: "Fragen zur Bestellung, zum Abo oder zur nächsten Cupping-Runde? Schreib uns — werktags antworten wir innerhalb weniger Stunden.",
    en: "Questions about an order, the subscription or the next cupping? Write to us — on weekdays we reply within a few hours.",
  },
  formTitle: { de: "Schreib uns", en: "Write to us" },
  name: { de: "Name", en: "Name" },
  email: { de: "E-Mail", en: "E-mail" },
  topic: { de: "Worum geht es?", en: "What is it about?" },
  tOrder: { de: "Bestellung & Versand", en: "Order & shipping" },
  tAbo: { de: "Kaffee-Abo", en: "Coffee subscription" },
  tB2b: { de: "Großhandel / Gastronomie", en: "Wholesale / hospitality" },
  tVisit: { de: "Café & Reservierung", en: "Café & reservations" },
  tOther: { de: "Etwas anderes", en: "Something else" },
  msg: { de: "Deine Nachricht", en: "Your message" },
  send: { de: "Nachricht senden", en: "Send message" },
  mapLabel: {
    de: "Stilisierte Karte: Marlow liegt an der Hafenstraße 12 in Münster",
    en: "Stylised map: Marlow is located at Hafenstraße 12 in Münster",
  },
  addrT: { de: "Adresse", en: "Address" },
  hoursT: { de: "Öffnungszeiten", en: "Opening hours" },
};

export default function KontaktClient() {
  const { L, t } = useI18n();
  const formRef = useRef<HTMLFormElement>(null);
  const { onSubmit, errors } = useDemoForm(formRef);

  return (
    <div className="container">
      <nav className="breadcrumbs" aria-label="Brotkrumen">
        <ol>
          <li>
            <Link href="/">{t("crumb.home")}</Link>
          </li>
          <li aria-current="page">{t("nav.contact")}</li>
        </ol>
      </nav>

      <header className="page-hero">
        <p className="eyebrow">{L(T.eyebrow)}</p>
        <h1>{L(T.title)}</h1>
        <p className="page-hero__lede">{L(T.lede)}</p>
      </header>

      <div className="grid-2" style={{ alignItems: "start", paddingBottom: "var(--section-pad)" }}>
        <div className="booking__panel">
          <h2 style={{ fontSize: "1.375rem" }}>{L(T.formTitle)}</h2>
          <form ref={formRef} noValidate onSubmit={onSubmit}>
            <div className="field-row">
              <div className={`field${errors.name ? " has-error" : ""}`}>
                <label htmlFor="ct-name">
                  {L(T.name)} <span className="req">*</span>
                </label>
                <input type="text" id="ct-name" name="name" autoComplete="name" required />
                <p className="field__error" aria-live="polite">
                  {errors.name}
                </p>
              </div>
              <div className={`field${errors.email ? " has-error" : ""}`}>
                <label htmlFor="ct-email">
                  {L(T.email)} <span className="req">*</span>
                </label>
                <input type="email" id="ct-email" name="email" autoComplete="email" inputMode="email" required />
                <p className="field__error" aria-live="polite">
                  {errors.email}
                </p>
              </div>
            </div>
            <div className="field">
              <label htmlFor="ct-topic">{L(T.topic)}</label>
              <select id="ct-topic" name="topic">
                <option>{L(T.tOrder)}</option>
                <option>{L(T.tAbo)}</option>
                <option>{L(T.tB2b)}</option>
                <option>{L(T.tVisit)}</option>
                <option>{L(T.tOther)}</option>
              </select>
            </div>
            <div className={`field${errors.message ? " has-error" : ""}`}>
              <label htmlFor="ct-msg">
                {L(T.msg)} <span className="req">*</span>
              </label>
              <textarea id="ct-msg" name="message" rows={5} required />
              <p className="field__error" aria-live="polite">
                {errors.message}
              </p>
            </div>
            <button className="btn btn--primary" type="submit">
              {L(T.send)}
            </button>
          </form>
        </div>

        <div>
          <div className="map-panel" role="img" aria-label={L(T.mapLabel)}>
            <svg viewBox="0 0 640 420" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
              <rect width="640" height="420" fill="#f3e8d3" />
              <path d="M0 210 C120 190 200 240 320 220 S540 180 640 200" stroke="#dbc9a8" strokeWidth="26" fill="none" />
              <path d="M100 0 C110 140 90 280 120 420" stroke="#e7d9c2" strokeWidth="14" fill="none" />
              <path d="M420 0 C430 120 400 300 440 420" stroke="#e7d9c2" strokeWidth="14" fill="none" />
              <path d="M0 80 C200 100 420 60 640 90" stroke="#e7d9c2" strokeWidth="10" fill="none" />
              <path d="M0 330 C220 310 420 350 640 320" stroke="#e7d9c2" strokeWidth="10" fill="none" />
              <circle cx="320" cy="186" r="9" fill="#9c4f2c" />
              <circle cx="320" cy="186" r="18" fill="none" stroke="#9c4f2c" strokeWidth="2" opacity=".45" />
            </svg>
            <p className="map-panel__pin">
              <svg aria-hidden="true">
                <use href="#i-pin" />
              </svg>
              <span>Hafenstraße 12</span>
            </p>
          </div>

          <div className="visit__grid" style={{ gridTemplateColumns: "1fr 1fr", marginTop: "1.5rem" }}>
            <div className="visit-card">
              <span className="visit-card__icon">
                <svg aria-hidden="true">
                  <use href="#i-pin" />
                </svg>
              </span>
              <h3>{L(T.addrT)}</h3>
              <p>
                Marlow Coffee Roasters
                <br />
                Hafenstraße 12
                <br />
                48153 Münster
                <br />
                <a href="mailto:hello@marlow.coffee">hello@marlow.coffee</a>
              </p>
            </div>
            <div className="visit-card">
              <span className="visit-card__icon">
                <svg aria-hidden="true">
                  <use href="#i-clock" />
                </svg>
              </span>
              <h3>{L(T.hoursT)}</h3>
              <dl>
                <div className="hours-row">
                  <dt>{t("hours.monfri")}</dt>
                  <dd>8:00 – 18:00</dd>
                </div>
                <div className="hours-row">
                  <dt>{t("hours.sat")}</dt>
                  <dd>9:00 – 17:00</dd>
                </div>
                <div className="hours-row">
                  <dt>{t("hours.sun")}</dt>
                  <dd>{t("hours.sun.short")}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
