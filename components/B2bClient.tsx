"use client";

import Link from "next/link";
import { useRef } from "react";
import Reveal from "@/components/Reveal";
import { useI18n } from "@/lib/i18n";
import { useDemoForm } from "@/lib/useDemoForm";

const T = {
  eyebrow: { de: "Großhandel & Gastronomie", en: "Wholesale & hospitality" },
  title: { de: "Dein Café verdient eine eigene Rösterei", en: "Your café deserves its own roastery" },
  lede: {
    de: "Über 40 Cafés, Restaurants und Büros arbeiten mit Marlow-Kaffee. Du bekommst Staffelpreise, Schulungen und einen Röstplan, der sich nach deinem Bedarf richtet — nicht umgekehrt.",
    en: "More than 40 cafés, restaurants and offices work with Marlow coffee. You get volume pricing, training and a roast schedule that follows your needs — not the other way round.",
  },
  wEyebrow: { de: "Was du bekommst", en: "What you get" },
  wTitle: { de: "Mehr als Bohnen im Karton", en: "More than beans in a box" },
  w1t: { de: "Röstfrisch nach Plan", en: "Roasted fresh, on schedule" },
  w1p: {
    de: "Wir rösten auf Bestellung und liefern in deinem Rhythmus — auf Wunsch mit eigenem House-Blend-Profil für dein Café.",
    en: "We roast to order and deliver on your rhythm — with your own house-blend profile if you like.",
  },
  w2t: { de: "Barista-Schulungen", en: "Barista training" },
  w2p: {
    de: "Einführung, Rezeptkalibrierung und Latte-Art-Basics für dein Team — bei uns in der Rösterei oder direkt an deiner Maschine.",
    en: "Onboarding, recipe calibration and latte-art basics for your team — at our roastery or right at your machine.",
  },
  w3t: { de: "Verlässliche Logistik", en: "Reliable logistics" },
  w3p: {
    de: "Feste Liefertage, kurzfristige Nachbestellungen bis 12 Uhr, Leihequipment für Events — ein Anruf genügt.",
    en: "Fixed delivery days, same-day top-ups if ordered by noon, loan equipment for events — one call is enough.",
  },
  pEyebrow: { de: "Transparente Konditionen", en: "Transparent terms" },
  pTitle: { de: "Staffelpreise pro Monat", en: "Volume pricing per month" },
  pCaption: { de: "Staffelpreise nach monatlicher Abnahmemenge", en: "Volume pricing by monthly purchase amount" },
  h1: { de: "Monatliche Menge", en: "Monthly volume" },
  h2: { de: "Preis pro Kilo", en: "Price per kilo" },
  h3: { de: "Ersparnis", en: "Savings" },
  h4: { de: "Extras", en: "Extras" },
  r1e: { de: "Starter-Schulung inklusive", en: "Starter training included" },
  r2e: { de: "+ Quartals-Cupping fürs Team", en: "+ quarterly team cupping" },
  r3e: { de: "+ eigener House Blend möglich", en: "+ your own house blend possible" },
  r4m: { de: "ab 80 kg", en: "from 80 kg" },
  r4p: { de: "auf Anfrage", en: "on request" },
  r4s: { de: "individuell", en: "individual" },
  r4e: { de: "+ Co-Branding & Maschinenberatung", en: "+ co-branding & machine consulting" },
  pNote: {
    de: "Alle Preise netto zzgl. MwSt., frei Haus ab 15 kg. Demo-Daten dieser Vorlage.",
    en: "All prices net plus VAT, free delivery from 15 kg. Demo data for this template.",
  },
  fEyebrow: { de: "Unverbindlich testen", en: "Try before you commit" },
  fTitle: { de: "Fordere dein Musterpaket an", en: "Request your sample pack" },
  fP: {
    de: "Wir schicken dir drei Röstungen deiner Wahl als 250-g-Muster plus Konditionsblatt — kostenlos für Gastronomie-Betriebe. Antwort garantiert innerhalb eines Werktags.",
    en: "We'll send you three roasts of your choice as 250 g samples plus our terms sheet — free for hospitality businesses. Guaranteed reply within one working day.",
  },
  b1: { de: "3 × 250 g Muster, kostenlos", en: "3 × 250 g samples, free" },
  b2: { de: "Konditionen ohne Kleingedrucktes", en: "Terms with no small print" },
  b3: { de: "Probe-Cupping in der Rösterei", en: "Trial cupping at the roastery" },
  company: { de: "Betrieb", en: "Business" },
  name: { de: "Name", en: "Name" },
  email: { de: "E-Mail", en: "E-mail" },
  volume: { de: "Geschätzter Monatsbedarf", en: "Estimated monthly volume" },
  v1: { de: "Noch unklar", en: "Not sure yet" },
  v2: { de: "mehr als 80 kg", en: "more than 80 kg" },
  msg: { de: "Erzähl uns kurz von deinem Betrieb", en: "Tell us a little about your place" },
  msgPh: { de: "Konzept, Maschine, aktueller Kaffee …", en: "Concept, machine, current coffee …" },
  send: { de: "Musterpaket anfragen", en: "Request sample pack" },
};

export default function B2bClient() {
  const { L, t } = useI18n();
  const formRef = useRef<HTMLFormElement>(null);
  const { onSubmit, errors } = useDemoForm(formRef);

  return (
    <>
      <div className="container">
        <nav className="breadcrumbs" aria-label="Brotkrumen">
          <ol>
            <li>
              <Link href="/">{t("crumb.home")}</Link>
            </li>
            <li aria-current="page">{t("nav.b2b")}</li>
          </ol>
        </nav>

        <header className="page-hero">
          <p className="eyebrow">{L(T.eyebrow)}</p>
          <h1>{L(T.title)}</h1>
          <p className="page-hero__lede">{L(T.lede)}</p>
        </header>

        <Reveal className="media-band">
          <img
            src="/assets/img/b2b-espresso.webp"
            alt="Espressomaschine zieht zwei Espressi in Keramiktassen an einer Café-Theke"
            width={1920}
            height={1080}
          />
        </Reveal>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">{L(T.wEyebrow)}</p>
            <h2>{L(T.wTitle)}</h2>
          </div>
          <div className="grid-3">
            {(
              [
                [T.w1t, T.w1p, "#i-flame", 0],
                [T.w2t, T.w2p, "#i-cup", 80],
                [T.w3t, T.w3p, "#i-truck", 160],
              ] as const
            ).map(([title, text, icon, delay]) => (
              <Reveal key={icon} className="visit-card" delay={delay || undefined}>
                <span className="visit-card__icon">
                  <svg aria-hidden="true">
                    <use href={icon} />
                  </svg>
                </span>
                <h3>{L(title)}</h3>
                <p>{L(text)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">{L(T.pEyebrow)}</p>
            <h2>{L(T.pTitle)}</h2>
          </div>
          <div className="table-wrap">
            <table>
              <caption className="sr-only">{L(T.pCaption)}</caption>
              <thead>
                <tr>
                  <th scope="col">{L(T.h1)}</th>
                  <th scope="col">{L(T.h2)}</th>
                  <th scope="col">{L(T.h3)}</th>
                  <th scope="col">{L(T.h4)}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>5 – 15 kg</td>
                  <td>
                    <strong>36,00 €</strong>
                  </td>
                  <td>—</td>
                  <td>{L(T.r1e)}</td>
                </tr>
                <tr>
                  <td>16 – 40 kg</td>
                  <td>
                    <strong>33,50 €</strong>
                  </td>
                  <td>– 7 %</td>
                  <td>{L(T.r2e)}</td>
                </tr>
                <tr>
                  <td>41 – 80 kg</td>
                  <td>
                    <strong>31,00 €</strong>
                  </td>
                  <td>– 14 %</td>
                  <td>{L(T.r3e)}</td>
                </tr>
                <tr>
                  <td>{L(T.r4m)}</td>
                  <td>
                    <strong>{L(T.r4p)}</strong>
                  </td>
                  <td>{L(T.r4s)}</td>
                  <td>{L(T.r4e)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="field__hint" style={{ marginTop: ".75rem" }}>
            {L(T.pNote)}
          </p>
        </div>
      </section>

      <section className="section quotes" id="anfrage">
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <div>
            <p className="eyebrow">{L(T.fEyebrow)}</p>
            <h2>{L(T.fTitle)}</h2>
            <p>{L(T.fP)}</p>
            <ul className="subscribe__perks" style={{ color: "var(--roast)" }}>
              {[T.b1, T.b2, T.b3].map((item, i) => (
                <li key={i}>
                  <svg aria-hidden="true" style={{ color: "var(--copper-deep)" }}>
                    <use href="#i-check" />
                  </svg>
                  <span>{L(item)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="booking__panel">
            <form ref={formRef} noValidate onSubmit={onSubmit}>
              <div className="field-row">
                <div className={`field${errors.company ? " has-error" : ""}`}>
                  <label htmlFor="bb-company">
                    {L(T.company)} <span className="req">*</span>
                  </label>
                  <input type="text" id="bb-company" name="company" autoComplete="organization" required />
                  <p className="field__error" aria-live="polite">
                    {errors.company}
                  </p>
                </div>
                <div className={`field${errors.name ? " has-error" : ""}`}>
                  <label htmlFor="bb-name">
                    {L(T.name)} <span className="req">*</span>
                  </label>
                  <input type="text" id="bb-name" name="name" autoComplete="name" required />
                  <p className="field__error" aria-live="polite">
                    {errors.name}
                  </p>
                </div>
              </div>
              <div className={`field${errors.email ? " has-error" : ""}`}>
                <label htmlFor="bb-email">
                  {L(T.email)} <span className="req">*</span>
                </label>
                <input type="email" id="bb-email" name="email" autoComplete="email" inputMode="email" required />
                <p className="field__error" aria-live="polite">
                  {errors.email}
                </p>
              </div>
              <div className="field">
                <label htmlFor="bb-volume">{L(T.volume)}</label>
                <select id="bb-volume" name="volume">
                  <option>{L(T.v1)}</option>
                  <option>5 – 15 kg</option>
                  <option>16 – 40 kg</option>
                  <option>41 – 80 kg</option>
                  <option>{L(T.v2)}</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="bb-msg">{L(T.msg)}</label>
                <textarea id="bb-msg" name="message" rows={4} placeholder={L(T.msgPh)} />
              </div>
              <button className="btn btn--primary" type="submit" style={{ width: "100%" }}>
                {L(T.send)}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
