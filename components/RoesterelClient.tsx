"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import { useI18n } from "@/lib/i18n";

const T = {
  eyebrow: { de: "Handwerk seit 2014", en: "Craft since 2014" },
  title: { de: "Eine Rösterei, die es nicht eilig hat", en: "A roastery in no particular hurry" },
  lede: {
    de: "Zwölf Kilo pro Charge, zwei Rösttage pro Woche, ein Cupping für jede einzelne Röstung — so bleibt Qualität kein Zufall.",
    en: "Twelve kilos per batch, two roast days a week, a cupping for every single roast — that's how quality stops being luck.",
  },
  tlEyebrow: { de: "Unsere Geschichte", en: "Our story" },
  tlTitle: {
    de: "Von 5 auf 12 Kilo — und keinen Schritt schneller",
    en: "From 5 to 12 kilos — and not one step faster",
  },
  tlP1: {
    de: "Was 2014 in einer Garage im Kreuzviertel begann, füllt heute eine Halle an der Hafenstraße. Gewachsen sind Trommel, Team und Lager — nicht aber das Tempo: Geröstet wird nach Profil, gecuppt wird jede Charge, verkauft wird nur, was frisch ist.",
    en: "What started in 2014 in a garage in the Kreuzviertel now fills a hall on Hafenstraße. The drum, the team and the warehouse have grown — the pace has not: we roast to profile, cup every batch and only sell what is fresh.",
  },
  tlP2: {
    de: "Dass wir dabei wirtschaftlich denken, verdanken wir unseren Café-Partnern und Abonnenten: Planbare Mengen bedeuten planbare Einkäufe — und faire, langfristige Verträge mit unseren Farmen.",
    en: "That the numbers work is thanks to our café partners and subscribers: predictable volumes mean predictable buying — and fair, long-term contracts with our farms.",
  },
  tl2014: {
    de: "Erster 5-Kilo-Röster, gebraucht gekauft. Verkauf auf dem Wochenmarkt.",
    en: "First 5-kilo roaster, bought second-hand. Sales at the weekly market.",
  },
  tl2016: {
    de: "Erste Direktimporte aus Guji (Äthiopien) und Huila (Kolumbien).",
    en: "First direct imports from Guji (Ethiopia) and Huila (Colombia).",
  },
  tl2017: {
    de: "„Greta“ zieht ein: unser 12-Kilo-Trommelröster, bis heute im Dienst.",
    en: "“Greta” moves in: our 12-kilo drum roaster, in service to this day.",
  },
  tl2019: { de: "Eröffnung des Rösterei-Cafés an der Hafenstraße 12.", en: "The roastery café opens at Hafenstraße 12." },
  tl2023: {
    de: "Klimaneutraler Versand und Mehrweg-Pfandsystem fürs Café.",
    en: "Carbon-neutral shipping and a reusable-cup deposit system for the café.",
  },
  tl2026: {
    de: "14 Partnerfarmen, 9 Kolleg:innen, über 96.000 verschickte Tüten.",
    en: "14 partner farms, a team of 9, over 96,000 bags shipped.",
  },
  figStrong: { de: "Röstmeister Jonas", en: "Head roaster Jonas" },
  figSpan: {
    de: "prüft jede Charge von Hand, bevor sie in den Verkauf geht",
    en: "checks every batch by hand before it goes on sale",
  },
  howEyebrow: { de: "So arbeiten wir", en: "How we work" },
  howTitle: { de: "Drei Regeln, keine Ausnahmen", en: "Three rules, no exceptions" },
  r1t: { de: "Einkauf mit Handschlag", en: "Buying with a handshake" },
  r1p: {
    de: "Wir kaufen direkt, besuchen jede Partnerfarm und zahlen deutlich über Fairtrade-Minimum — seit Jahren dieselben Familien.",
    en: "We buy directly, visit every partner farm and pay well above the Fairtrade minimum — the same families for years.",
  },
  r2t: { de: "Röstung nach Profil", en: "Roasting to profile" },
  r2p: {
    de: "Jede Herkunft bekommt ihr eigenes Röstprofil, protokolliert auf die Sekunde. Wiederholbarkeit ist unser Qualitätsversprechen.",
    en: "Every origin gets its own roast profile, logged to the second. Repeatability is our quality promise.",
  },
  r3t: { de: "Cupping vor Verkauf", en: "Cupping before selling" },
  r3p: {
    de: "Keine Charge geht raus, die wir nicht verkostet haben. Was nicht überzeugt, wird nicht verkauft — Punkt.",
    en: "No batch leaves the house untasted. What doesn't convince us doesn't get sold — full stop.",
  },
  ctaEyebrow: { de: "Selbst überzeugen?", en: "See for yourself?" },
  ctaTitle: {
    de: (
      <>
        Komm zum <em>öffentlichen Cupping</em>
      </>
    ),
    en: (
      <>
        Join the <em>public cupping</em>
      </>
    ),
  },
  ctaP: {
    de: "Jeden ersten Samstag im Monat um 10 Uhr verkosten wir die neuen Ernten — kostenlos, ohne Anmeldung, Anfänger ausdrücklich willkommen.",
    en: "Every first Saturday of the month at 10 am we taste the new harvests — free, no sign-up, beginners very welcome.",
  },
  ctaBtn1: { de: "Tisch im Café reservieren", en: "Book a table at the café" },
  ctaBtn2: { de: "Röstungen probieren", en: "Try the roasts" },
};

export default function RoesterelClient() {
  const { L, t } = useI18n();

  return (
    <>
      <div className="container">
        <nav className="breadcrumbs" aria-label="Brotkrumen">
          <ol>
            <li>
              <Link href="/">{t("crumb.home")}</Link>
            </li>
            <li aria-current="page">{t("nav.roastery")}</li>
          </ol>
        </nav>

        <header className="page-hero page-hero--center">
          <p className="eyebrow">{L(T.eyebrow)}</p>
          <h1>{L(T.title)}</h1>
          <p className="page-hero__lede">{L(T.lede)}</p>
        </header>

        <Reveal className="media-band">
          <img
            src="/assets/img/roastery-hall.webp"
            alt="Die Marlow-Rösthalle mit kupferfarbenem Trommelröster und Kühlsieb"
            width={1920}
            height={1080}
          />
        </Reveal>
      </div>

      <section className="section">
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <div>
            <p className="eyebrow">{L(T.tlEyebrow)}</p>
            <h2>{L(T.tlTitle)}</h2>
            <p>{L(T.tlP1)}</p>
            <p>{L(T.tlP2)}</p>
          </div>
          <ol className="timeline">
            {(
              [
                ["2014", T.tl2014],
                ["2016", T.tl2016],
                ["2017", T.tl2017],
                ["2019", T.tl2019],
                ["2023", T.tl2023],
                ["2026", T.tl2026],
              ] as const
            ).map(([year, text]) => (
              <li key={year}>
                <strong>{year}</strong>
                <p>{L(text)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section quotes" style={{ paddingBlock: "var(--section-pad)" }}>
        <div className="container grid-2">
          <figure className="figure-quote img-frame" style={{ margin: 0, aspectRatio: "3/2" }}>
            <img
              src="/assets/img/team-roaster.webp"
              alt="Ein Marlow-Röster prüft frisch geröstete Bohnen am Cupping-Tisch"
              width={1280}
              height={853}
              loading="lazy"
            />
            <figcaption>
              <strong>{L(T.figStrong)}</strong> — <span>{L(T.figSpan)}</span>
            </figcaption>
          </figure>
          <div>
            <p className="eyebrow">{L(T.howEyebrow)}</p>
            <h2>{L(T.howTitle)}</h2>
            {(
              [
                [T.r1t, T.r1p, "#i-leaf"],
                [T.r2t, T.r2p, "#i-flame"],
                [T.r3t, T.r3p, "#i-cup"],
              ] as const
            ).map(([title, text, icon], i, arr) => (
              <div className="value" style={{ marginBottom: i < arr.length - 1 ? "1.5rem" : 0 }} key={icon}>
                <span className="value__icon">
                  <svg aria-hidden="true">
                    <use href={icon} />
                  </svg>
                </span>
                <div>
                  <h3>{L(title)}</h3>
                  <p>{L(text)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band section">
        <div className="container">
          <p className="eyebrow">{L(T.ctaEyebrow)}</p>
          <h2>{L(T.ctaTitle)}</h2>
          <p style={{ maxWidth: "52ch" }}>{L(T.ctaP)}</p>
          <div className="hero__actions">
            <Link className="btn btn--light" href="/reservierung/">
              <svg aria-hidden="true">
                <use href="#i-calendar" />
              </svg>
              <span>{L(T.ctaBtn1)}</span>
            </Link>
            <Link className="btn btn--ghost vhero__btn-ghost" href="/shop/">
              {L(T.ctaBtn2)}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
