"use client";

import Link from "next/link";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { products, type Product } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { useI18n, type StringKey } from "@/lib/i18n";

const T = {
  vat: { de: " · inkl. MwSt., zzgl. Versand", en: " · incl. VAT, plus shipping" },
  grind: { de: "Mahlung", en: "Grind" },
  acc1t: { de: "Versand & Frische", en: "Shipping & freshness" },
  acc1p: {
    de: "Geröstet wird jeden Dienstag, versendet am selben Tag. Ab 35 € liefern wir versandkostenfrei innerhalb Deutschlands (1–3 Werktage, klimaneutral).",
    en: "We roast every Tuesday and ship the same day. Orders over €35 ship free within Germany (1–3 working days, carbon-neutral).",
  },
  acc2t: { de: "Herkunft & Partnerschaft", en: "Origin & partnership" },
  acc2p: {
    de: "Wir kaufen direkt und langfristig: feste Abnahmen, Preise deutlich über Fairtrade-Minimum, Besuche vor Ort. Mehr dazu im Journal.",
    en: "We buy directly and long-term: fixed volumes, prices well above the Fairtrade minimum, visits on site. More in the journal.",
  },
  acc3t: { de: "Zubereitungsempfehlung", en: "Brew recommendation" },
  acc3p: {
    de: "Unser V60-Referenzrezept: 18 g auf 300 g Wasser bei 94 °C, 3:30–4:00 Minuten. Für Espresso: 18 g auf 40 g in 26–30 Sekunden.",
    en: "Our V60 reference recipe: 18 g to 300 g of water at 94 °C, 3:30–4:00 minutes. For espresso: 18 g to 40 g in 26–30 seconds.",
  },
  relEyebrow: { de: "Passt dazu", en: "Goes well with" },
  relTitle: { de: "Das trinken andere dazu", en: "What others drink alongside" },
};

const GRIND_OPTIONS: StringKey[] = ["grind.whole", "grind.filter", "grind.espresso"];

export default function ProductDetailClient({ product }: { product: Product }) {
  const { L, t, fmtPrice } = useI18n();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [grind, setGrind] = useState<StringKey>("grind.whole");

  const isCoffee = product.category === "filter" || product.category === "espresso";
  const facts = L(product.facts);
  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

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
            <li aria-current="page">{L(product.name)}</li>
          </ol>
        </nav>

        <div className="pd">
          <div className="pd__gallery">
            <div className="img-frame">
              <img src={product.img} alt={`${L(product.name)} – Verpackung`} width={740} height={925} />
            </div>
          </div>
          <div>
            <p className="product-card__origin">{L(product.origin)}</p>
            <h1 className="pd__title">{L(product.name)}</h1>
            <ul className="product-card__notes" aria-label="Geschmacksnoten">
              {L(product.notes).map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
            <p className="pd__price">{fmtPrice(product.price)}</p>
            <p className="pd__price-note">
              {product.weight}
              {L(T.vat)}
            </p>
            <p className="pd__desc">{L(product.desc)}</p>

            {isCoffee && (
              <fieldset className="opt-group">
                <legend>{L(T.grind)}</legend>
                <div className="opt-pills">
                  {GRIND_OPTIONS.map((key) => (
                    <label className="opt-pill" key={key}>
                      <input
                        type="radio"
                        name="grind"
                        value={key}
                        checked={grind === key}
                        onChange={() => setGrind(key)}
                      />
                      <span>{t(key)}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            <div className="pd__buy">
              <div className="qty">
                <button
                  type="button"
                  aria-label={t("cart.qty.less")}
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  −
                </button>
                <input value={qty} readOnly inputMode="numeric" aria-label="Anzahl" />
                <button
                  type="button"
                  aria-label={t("cart.qty.more")}
                  onClick={() => setQty((q) => Math.min(99, q + 1))}
                >
                  +
                </button>
              </div>
              <button
                className="btn btn--primary"
                type="button"
                onClick={() => addToCart(product.id, qty, isCoffee ? grind : null)}
              >
                {t("quiz.result.cta")}
              </button>
            </div>

            <div className="pd__facts">
              {Object.entries(facts).map(([key, value]) => (
                <div key={key}>
                  <strong>{value}</strong>
                  <span>{key}</span>
                </div>
              ))}
            </div>

            <div className="accordion">
              <details>
                <summary>{L(T.acc1t)}</summary>
                <div className="accordion__body">{L(T.acc1p)}</div>
              </details>
              <details>
                <summary>{L(T.acc2t)}</summary>
                <div className="accordion__body">{L(T.acc2p)}</div>
              </details>
              <details>
                <summary>{L(T.acc3t)}</summary>
                <div className="accordion__body">{L(T.acc3p)}</div>
              </details>
            </div>
          </div>
        </div>
      </div>

      <section className="quotes section">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="eyebrow">{L(T.relEyebrow)}</p>
            <h2>{L(T.relTitle)}</h2>
          </div>
          <div className="products__grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
