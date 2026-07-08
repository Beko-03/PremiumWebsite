"use client";

import Link from "next/link";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { products, type Category, type Localized } from "@/lib/data";
import { useI18n } from "@/lib/i18n";

type Filter = "alle" | Category;

const T = {
  eyebrow: { de: "Frisch geröstet · Rückverfolgbar", en: "Freshly roasted · Traceable" },
  title: { de: "Unser Sortiment", en: "Our range" },
  lede: {
    de: "Alles hier wurde am letzten Rösttag geröstet oder wird es am nächsten. Ab 35 € liefern wir versandkostenfrei — klimaneutral in 1–3 Werktagen.",
    en: "Everything here was roasted on the last roast day or will be on the next. Orders over €35 ship free — carbon-neutral in 1–3 working days.",
  },
  fAll: { de: "Alle", en: "All" },
  fFilter: { de: "Filterkaffee", en: "Filter coffee" },
  fEspresso: { de: "Espresso", en: "Espresso" },
  fSets: { de: "Sets & Geschenke", en: "Sets & gifts" },
  fGear: { de: "Zubehör", en: "Gear" },
  ctaEyebrow: { de: "Lieber im Abo?", en: "Prefer a subscription?" },
  ctaTitle: {
    de: (
      <>
        Spar dir das Nachbestellen — <em>10 %</em> günstiger
      </>
    ),
    en: (
      <>
        Skip the reordering — <em>10%</em> cheaper
      </>
    ),
  },
  ctaP: {
    de: "Deine Lieblingsröstung kommt automatisch am Rösttag, versandkostenfrei und jederzeit pausierbar.",
    en: "Your favourite roast arrives automatically on roast day, shipping free, pause anytime.",
  },
  ctaBtn: { de: "Abo konfigurieren", en: "Configure your subscription" },
};

const FILTERS: { value: Filter; label: Localized }[] = [
  { value: "alle", label: T.fAll },
  { value: "filter", label: T.fFilter },
  { value: "espresso", label: T.fEspresso },
  { value: "sets", label: T.fSets },
  { value: "zubehoer", label: T.fGear },
];

export default function ShopClient() {
  const { L, t } = useI18n();
  const [filter, setFilter] = useState<Filter>("alle");

  const items = products.filter((p) => filter === "alle" || p.category === filter);

  return (
    <>
      <div className="container">
        <nav className="breadcrumbs" aria-label="Brotkrumen">
          <ol>
            <li>
              <Link href="/">{t("crumb.home")}</Link>
            </li>
            <li aria-current="page">{t("nav.shop")}</li>
          </ol>
        </nav>

        <header className="page-hero">
          <p className="eyebrow">{L(T.eyebrow)}</p>
          <h1>{L(T.title)}</h1>
          <p className="page-hero__lede">{L(T.lede)}</p>
        </header>

        <div className="chipbar" role="group" aria-label="Sortiment filtern">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className="chip"
              type="button"
              aria-pressed={filter === f.value}
              onClick={() => setFilter(f.value)}
            >
              {L(f.label)}
            </button>
          ))}
        </div>

        <div className="products__grid" style={{ paddingBottom: "var(--section-pad)" }}>
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <section className="cta-band section">
        <div className="container">
          <p className="eyebrow">{L(T.ctaEyebrow)}</p>
          <h2>{L(T.ctaTitle)}</h2>
          <p style={{ maxWidth: "52ch" }}>{L(T.ctaP)}</p>
          <div className="hero__actions">
            <Link className="btn btn--light" href="/abo/">
              {L(T.ctaBtn)}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
