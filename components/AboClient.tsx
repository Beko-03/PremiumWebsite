"use client";

import Link from "next/link";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import { productById, settings } from "@/lib/data";
import { useI18n, type StringKey } from "@/lib/i18n";
import { useUi } from "@/lib/ui";

const SIZE_FACTOR: Record<string, number> = { "250": 1, "500": 1.9, "1000": 3.6 };
const ROASTERS_CHOICE_BASE = 13.5;

const T = {
  eyebrow: {
    de: "10 % Rabatt · Versandkostenfrei · Jederzeit pausierbar",
    en: "10% off · Free shipping · Pause anytime",
  },
  title: { de: "Stell dir dein Kaffee-Abo zusammen", en: "Build your coffee subscription" },
  lede: {
    de: "Drei Entscheidungen, dreißig Sekunden: Deine Röstung kommt ab sofort automatisch — immer am Tag, an dem sie aus der Trommel kommt.",
    en: "Three decisions, thirty seconds: from now on your roast arrives automatically — always on the day it leaves the drum.",
  },
  crumb: { de: "Kaffee-Abo", en: "Coffee subscription" },
  o1: { de: "1. Welche Röstung?", en: "1. Which roast?" },
  o1Surprise: { de: "Röster-Wahl (Überraschung)", en: "Roaster's choice (surprise)" },
  o1Hint: {
    de: "Röster-Wahl: Wir schicken dir unsere jeweils frischeste Saison-Röstung.",
    en: "Roaster's choice: we send whichever seasonal roast is freshest.",
  },
  o2: { de: "2. Wie viel pro Lieferung?", en: "2. How much per delivery?" },
  o2Hint: {
    de: "Faustregel: 250 g ergeben etwa 15 Tassen Filterkaffee.",
    en: "Rule of thumb: 250 g makes about 15 cups of filter coffee.",
  },
  o3: { de: "3. Wie oft?", en: "3. How often?" },
  o3Hint: {
    de: "Der Rhythmus lässt sich später jederzeit ändern oder pausieren.",
    en: "You can change or pause the rhythm at any time.",
  },
  sumTitle: { de: "Dein Abo", en: "Your subscription" },
  sumCoffee: { de: "Röstung", en: "Roast" },
  sumSize: { de: "Menge", en: "Amount" },
  sumRhythm: { de: "Rhythmus", en: "Rhythm" },
  sumShip: { de: "Versand", en: "Shipping" },
  sumShipV: { de: "Kostenlos", en: "Free" },
  sumPer: { de: "pro Lieferung", en: "per delivery" },
  cta: { de: "Abo starten (Demo)", en: "Start subscription (demo)" },
  note: {
    de: "Kein Risiko: pausieren, wechseln oder kündigen — jederzeit, ohne Frist.",
    en: "No risk: pause, switch or cancel — anytime, no notice period.",
  },
  howEyebrow: { de: "So funktioniert es", en: "How it works" },
  howTitle: { de: "Vom Rösttag direkt in deinen Briefkasten", en: "From roast day straight to your letterbox" },
  s1t: { de: "1. Dienstag: Röstung", en: "1. Tuesday: roasting" },
  s1p: {
    de: "Deine Bohnen werden frisch geröstet, gecuppt und noch warm verpackt.",
    en: "Your beans are roasted fresh, cupped and packed while still warm.",
  },
  s2t: { de: "2. Gleicher Tag: Versand", en: "2. Same day: shipping" },
  s2p: {
    de: "Klimaneutrale Zustellung in 1–3 Werktagen, passt als Brief in den Kasten.",
    en: "Carbon-neutral delivery in 1–3 working days — fits through the letterbox.",
  },
  s3t: { de: "3. Du: bester Kaffee", en: "3. You: better coffee" },
  s3p: {
    de: "Mit Röstnotizen und Brühempfehlung — genau dann, wenn der Kaffee am besten ist.",
    en: "With roast notes and a brew recommendation — right when the coffee is at its best.",
  },
};

const COFFEE_OPTIONS = [
  { value: "buku-hambela", label: "Buku Hambela" },
  { value: "la-esperanza", label: "Finca La Esperanza" },
  { value: "marlow-no1", label: "Marlow No. 1" },
] as const;

export default function AboClient() {
  const { L, t, fmtPrice } = useI18n();
  const { modal } = useUi();
  const [coffee, setCoffee] = useState<string>("buku-hambela");
  const [size, setSize] = useState<string>("250");
  const [rhythm, setRhythm] = useState<string>("14");

  const selectedProduct = coffee === "roasters" ? null : productById(coffee);
  const base = selectedProduct ? selectedProduct.price : ROASTERS_CHOICE_BASE;
  const full = base * SIZE_FACTOR[size];
  const discounted = full * (1 - settings.aboDiscount);

  const rhythmKey: StringKey = rhythm === "7" ? "abo.week" : rhythm === "14" ? "abo.biweek" : "abo.month";
  const coffeeName = selectedProduct ? L(selectedProduct.name) : t("abo.roasters");
  const sizeLabel = size === "1000" ? "1 kg" : `${size} g`;

  return (
    <>
      <div className="container">
        <nav className="breadcrumbs" aria-label="Brotkrumen">
          <ol>
            <li>
              <Link href="/">{t("crumb.home")}</Link>
            </li>
            <li>
              <Link href="/shop/">{t("nav.shop")}</Link>
            </li>
            <li aria-current="page">{L(T.crumb)}</li>
          </ol>
        </nav>

        <header className="page-hero">
          <p className="eyebrow">{L(T.eyebrow)}</p>
          <h1>{L(T.title)}</h1>
          <p className="page-hero__lede">{L(T.lede)}</p>
        </header>

        <div className="abo">
          <form className="abo__options">
            <fieldset className="opt-group">
              <legend>{L(T.o1)}</legend>
              <div className="opt-pills">
                {COFFEE_OPTIONS.map((opt) => (
                  <label className="opt-pill" key={opt.value}>
                    <input
                      type="radio"
                      name="abo-coffee"
                      value={opt.value}
                      checked={coffee === opt.value}
                      onChange={() => setCoffee(opt.value)}
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
                <label className="opt-pill">
                  <input
                    type="radio"
                    name="abo-coffee"
                    value="roasters"
                    checked={coffee === "roasters"}
                    onChange={() => setCoffee("roasters")}
                  />
                  <span>{L(T.o1Surprise)}</span>
                </label>
              </div>
              <p className="field__hint">{L(T.o1Hint)}</p>
            </fieldset>

            <fieldset className="opt-group">
              <legend>{L(T.o2)}</legend>
              <div className="opt-pills">
                {["250", "500", "1000"].map((value) => (
                  <label className="opt-pill" key={value}>
                    <input
                      type="radio"
                      name="abo-size"
                      value={value}
                      checked={size === value}
                      onChange={() => setSize(value)}
                    />
                    <span>{value === "1000" ? "1 kg" : `${value} g`}</span>
                  </label>
                ))}
              </div>
              <p className="field__hint">{L(T.o2Hint)}</p>
            </fieldset>

            <fieldset className="opt-group">
              <legend>{L(T.o3)}</legend>
              <div className="opt-pills">
                {(
                  [
                    ["7", "abo.week"],
                    ["14", "abo.biweek"],
                    ["30", "abo.month"],
                  ] as [string, StringKey][]
                ).map(([value, key]) => (
                  <label className="opt-pill" key={value}>
                    <input
                      type="radio"
                      name="abo-rhythm"
                      value={value}
                      checked={rhythm === value}
                      onChange={() => setRhythm(value)}
                    />
                    <span>{t(key)}</span>
                  </label>
                ))}
              </div>
              <p className="field__hint">{L(T.o3Hint)}</p>
            </fieldset>
          </form>

          <aside className="abo__summary" aria-live="polite">
            <h2>{L(T.sumTitle)}</h2>
            <dl className="abo__rows">
              <div>
                <dt>{L(T.sumCoffee)}</dt>
                <dd>{coffeeName}</dd>
              </div>
              <div>
                <dt>{L(T.sumSize)}</dt>
                <dd>{sizeLabel}</dd>
              </div>
              <div>
                <dt>{L(T.sumRhythm)}</dt>
                <dd>{t(rhythmKey)}</dd>
              </div>
              <div>
                <dt>{L(T.sumShip)}</dt>
                <dd>{L(T.sumShipV)}</dd>
              </div>
            </dl>
            <div className="abo__price">
              <strong>{fmtPrice(discounted)}</strong>
              <s aria-label="Preis ohne Abo">{fmtPrice(full)}</s>
            </div>
            <p
              style={{
                fontSize: ".875rem",
                color: "color-mix(in srgb,var(--cream) 70%,var(--espresso-deep))",
                margin: "0 0 .5rem",
              }}
            >
              {L(T.sumPer)}
            </p>
            <p className="abo__save">{t("abo.save", { amount: fmtPrice(full - discounted) })}</p>
            <button
              className="btn btn--light"
              type="button"
              onClick={() => modal(t("abo.success.title"), t("abo.success.text"))}
            >
              {L(T.cta)}
            </button>
            <p className="abo__note">{L(T.note)}</p>
          </aside>
        </div>
      </div>

      <section className="quotes section">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="eyebrow">{L(T.howEyebrow)}</p>
            <h2>{L(T.howTitle)}</h2>
          </div>
          <div className="grid-3">
            {(
              [
                [T.s1t, T.s1p, "#i-bean", 0],
                [T.s2t, T.s2p, "#i-cart", 80],
                [T.s3t, T.s3p, "#i-check", 160],
              ] as const
            ).map(([title, text, icon, delay]) => (
              <Reveal key={icon} className="visit-card" style={{ textAlign: "center" }} delay={delay || undefined}>
                <span className="visit-card__icon" style={{ marginInline: "auto" }}>
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
    </>
  );
}
