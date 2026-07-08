"use client";

import Link from "next/link";
import Quiz from "@/components/Quiz";
import ProductCard from "@/components/ProductCard";
import PostCard from "@/components/PostCard";
import Reveal from "@/components/Reveal";
import RoastTicker from "@/components/RoastTicker";
import VideoHero from "@/components/VideoHero";
import { productById, sortedArticles } from "@/lib/data";
import { useI18n } from "@/lib/i18n";

/* Statische Texte der Startseite (DE = Original, EN = Übersetzung) */
const T = {
  heroEyebrow: { de: "Kleinserien · Im Haus geröstet", en: "Small batch · Roasted in house" },
  heroL1: { de: "Ehrlicher Kaffee,", en: "Honest coffee," },
  heroL2: {
    de: (
      <>
        geröstet mit <em>Geduld</em>.
      </>
    ),
    en: (
      <>
        roasted with <em>patience</em>.
      </>
    ),
  },
  heroLede: {
    de: "Wir kaufen direkt bei Familien, die wir beim Namen kennen, und rösten jeden Dienstag in 12-Kilo-Chargen — frischer kommt Kaffee nicht in deine Tasse.",
    en: "We buy directly from families we know by name and roast in 12-kilo batches every Tuesday — coffee doesn't reach your cup any fresher.",
  },
  heroCta1: { de: "Röstungen entdecken", en: "Explore the roasts" },
  heroCta2: { de: "Tisch reservieren", en: "Book a table" },
  heroScroll: { de: "Scrollen", en: "Scroll" },

  tickerTitle: { de: "Live aus der Rösterei", en: "Live from the roastery" },
  tickerSub: {
    de: "Geröstet wird jeden Dienstag — versendet am selben Tag",
    en: "We roast every Tuesday — and ship the same day",
  },
  tickerBatch: { de: "Nächste Charge", en: "Next batch" },
  tickerNext: { de: "Nächster Rösttag", en: "Next roast day" },
  tickerCountdown: { de: "Countdown", en: "Countdown" },

  v1t: { de: "Wöchentlich geröstet", en: "Roasted weekly" },
  v1p: {
    de: "Jede Tüte trägt ihr Röstdatum. Nichts verlässt das Lager älter als sieben Tage.",
    en: "Every bag carries its roast date. Nothing leaves the warehouse older than seven days.",
  },
  v2t: { de: "Direct Trade", en: "Direct trade" },
  v2p: {
    de: "Langfristige Verträge, Preise deutlich über Fairtrade-Minimum.",
    en: "Long-term contracts, prices well above the Fairtrade minimum.",
  },
  v3t: { de: "Gratisversand ab 35 €", en: "Free shipping over €35" },
  v3p: {
    de: "Klimaneutral in 1–3 Werktagen, direkt aus der Rösterei.",
    en: "Carbon-neutral in 1–3 working days, straight from the roastery.",
  },
  v4t: { de: "Frische-Versprechen", en: "Freshness promise" },
  v4p: {
    de: "Nicht begeistert? Wir ersetzen oder erstatten — ohne Diskussion.",
    en: "Not delighted? We replace or refund — no questions asked.",
  },

  shopEyebrow: { de: "Die aktuellen Röstungen", en: "This season's roasts" },
  shopTitle: {
    de: "Drei Kaffees, die wir gerade selbst trinken",
    en: "Three coffees we're drinking ourselves right now",
  },
  shopLede: {
    de: "Ganze Bohne oder frisch gemahlen — jede Tüte ist rückverfolgbar bis zur Farm.",
    en: "Whole bean or freshly ground — every bag is traceable back to the farm.",
  },
  shopAll: { de: "Das ganze Sortiment ansehen", en: "Browse the full range" },

  storyEyebrow: { de: "Unsere Geschichte", en: "Our story" },
  storyTitle: { de: "Vom Garagenröster zur Hafenstraße", en: "From a garage roaster to Hafenstraße" },
  storyP1: {
    de: "Marlow begann 2014 mit einem gebrauchten 5-Kilo-Röster und einer sturen Idee: Kaffee schmeckt besser, wenn die Person, die ihn anbaut, fair bezahlt wird — und die Person, die ihn röstet, keine Eile hat.",
    en: "Marlow started in 2014 with a second-hand 5-kilo roaster and one stubborn idea: coffee tastes better when the person growing it is paid fairly — and the person roasting it is in no hurry.",
  },
  storyP2: {
    de: "Zehn Jahre später cuppen wir noch immer jede Charge von Hand, kaufen bei denselben Familien in Guji und Huila und rösten nie mehr, als wir frisch verkaufen können.",
    en: "Ten years on we still cup every batch by hand, buy from the same families in Guji and Huila, and never roast more than we can sell fresh.",
  },
  storyFigStrong: { de: "Unser 12-Kilo-Trommelröster „Greta“", en: "Our 12-kilo drum roaster “Greta”" },
  storyFigSpan: { de: "im Einsatz seit 2017, über 8.000 Chargen", en: "in service since 2017, over 8,000 batches" },
  storyS1: { de: "Jahre Rösterfahrung", en: "years of roasting" },
  storyS2: { de: "Partnerfarmen", en: "partner farms" },
  storyS3: { de: "verschickte Tüten", en: "bags shipped" },
  storyCta: { de: "Die Rösterei kennenlernen", en: "Meet the roastery" },

  quizEyebrow: { de: "Coffee Finder", en: "Coffee finder" },
  quizTitle: { de: "Welche Röstung passt zu dir?", en: "Which roast suits you?" },
  quizLede: {
    de: "Drei Fragen, eine ehrliche Empfehlung — kein Konto, keine E-Mail nötig.",
    en: "Three questions, one honest recommendation — no account, no e-mail required.",
  },

  aboEyebrow: { de: "Das Marlow-Abo", en: "The Marlow subscription" },
  aboTitle: {
    de: (
      <>
        Nie wieder <em style={{ fontStyle: "italic", color: "var(--copper-deep)" }}>leere</em> Kaffeedosen
      </>
    ),
    en: (
      <>
        Never stare into an <em style={{ fontStyle: "italic", color: "var(--copper-deep)" }}>empty</em> coffee
        tin again
      </>
    ),
  },
  aboP: {
    de: "Rhythmus wählen, Menge wählen, fertig: Wir verschicken deine Röstung an dem Tag, an dem sie aus der Trommel kommt. Pausieren, wechseln oder kündigen — jederzeit.",
    en: "Pick a rhythm, pick an amount, done: we ship your roast on the day it leaves the drum. Pause, switch or cancel — anytime.",
  },
  aboB1: { de: "10 % Rabatt auf jede Lieferung", en: "10% off every delivery" },
  aboB2: { de: "Immer versandkostenfrei", en: "Always free shipping" },
  aboB3: { de: "Röstnotizen & Brühguide inklusive", en: "Roast notes & brew guide included" },
  aboCta: { de: "Abo konfigurieren", en: "Configure your subscription" },

  visitEyebrow: { de: "Rösterei-Café", en: "Roastery café" },
  visitTitle: { de: "Komm vorbei — am besten mit Reservierung", en: "Come by — ideally with a reservation" },
  visitP: {
    de: "Unser Café an der Hafenstraße ist Testlabor und Wohnzimmer zugleich: Hier probierst du neue Ernten zuerst. Samstags wird es voll — reserviere dir deinen Tisch in unter einer Minute.",
    en: "Our café on Hafenstraße is test lab and living room in one: new harvests are tasted here first. Saturdays get busy — book your table in under a minute.",
  },
  visitCta: { de: "Jetzt Tisch reservieren", en: "Book a table now" },

  journalEyebrow: { de: "Aus dem Journal", en: "From the journal" },
  journalTitle: { de: "Brühwissen & Geschichten von der Farm", en: "Brew knowledge & stories from the farm" },
  journalAll: { de: "Alle Beiträge lesen", en: "Read all stories" },
};

const FEATURED_IDS = ["buku-hambela", "la-esperanza", "marlow-no1"];

export default function HomeClient() {
  const { L, t } = useI18n();
  const teaser = sortedArticles().slice(0, 2);

  return (
    <>
      {/* ============ Video-Hero: „Roast in Motion“ ============ */}
      <VideoHero
        eyebrow={L(T.heroEyebrow)}
        line1={L(T.heroL1)}
        line2={L(T.heroL2)}
        lede={L(T.heroLede)}
        cta1={L(T.heroCta1)}
        cta2={L(T.heroCta2)}
        scrollHint={L(T.heroScroll)}
      />

      {/* ============ Röst-Ticker ============ */}
      <RoastTicker
        title={L(T.tickerTitle)}
        sub={L(T.tickerSub)}
        batchLabel={L(T.tickerBatch)}
        nextLabel={L(T.tickerNext)}
        countdownLabel={L(T.tickerCountdown)}
      />

      {/* ============ Werte ============ */}
      <section className="values" aria-label="Warum Marlow">
        <div className="container values__grid">
          {(
            [
              [T.v1t, T.v1p, "#i-flame", 0],
              [T.v2t, T.v2p, "#i-leaf", 60],
              [T.v3t, T.v3p, "#i-truck", 120],
              [T.v4t, T.v4p, "#i-cup", 180],
            ] as const
          ).map(([title, text, icon, delay]) => (
            <Reveal key={icon} className="value" delay={delay || undefined}>
              <span className="value__icon">
                <svg aria-hidden="true">
                  <use href={icon} />
                </svg>
              </span>
              <div>
                <h3>{L(title)}</h3>
                <p>{L(text)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ Sortiment ============ */}
      <section className="section" id="sortiment">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="eyebrow">{L(T.shopEyebrow)}</p>
            <h2>{L(T.shopTitle)}</h2>
            <p>{L(T.shopLede)}</p>
          </div>
          <div className="products__grid">
            {FEATURED_IDS.map((id) => {
              const product = productById(id);
              return product ? <ProductCard key={id} product={product} /> : null;
            })}
          </div>
          <p style={{ textAlign: "center", margin: "2.5rem 0 0" }}>
            <Link className="btn btn--ghost" href="/shop/">
              {L(T.shopAll)}
            </Link>
          </p>
        </div>
      </section>

      {/* ============ Story ============ */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container grid-2">
          <Reveal as="figure" className="figure-quote img-frame" style={{ margin: 0 }}>
            <img
              src="/assets/img/roastery-hall.webp"
              alt="Kupferfarbener Trommelröster in der Marlow-Rösterei"
              width={1280}
              height={720}
              loading="lazy"
            />
            <figcaption>
              <strong>{L(T.storyFigStrong)}</strong> — <span>{L(T.storyFigSpan)}</span>
            </figcaption>
          </Reveal>
          <div>
            <p className="eyebrow">{L(T.storyEyebrow)}</p>
            <h2>{L(T.storyTitle)}</h2>
            <p>{L(T.storyP1)}</p>
            <p>{L(T.storyP2)}</p>
            <div className="story__stats">
              <div>
                <strong>10+</strong>
                <span>{L(T.storyS1)}</span>
              </div>
              <div>
                <strong>14</strong>
                <span>{L(T.storyS2)}</span>
              </div>
              <div>
                <strong>96k</strong>
                <span>{L(T.storyS3)}</span>
              </div>
            </div>
            <p style={{ marginTop: "2rem" }}>
              <Link className="btn btn--primary" href="/roesterei/">
                {L(T.storyCta)}
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ============ Coffee-Finder-Quiz ============ */}
      <section className="quiz section" id="finder">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="eyebrow">{L(T.quizEyebrow)}</p>
            <h2>{L(T.quizTitle)}</h2>
            <p>{L(T.quizLede)}</p>
          </div>
          <div className="quiz__card">
            <Quiz />
          </div>
        </div>
      </section>

      {/* ============ Abo-Teaser ============ */}
      <section className="section">
        <div className="container grid-2">
          <div>
            <p className="eyebrow">{L(T.aboEyebrow)}</p>
            <h2>{L(T.aboTitle)}</h2>
            <p>{L(T.aboP)}</p>
            <ul className="subscribe__perks" style={{ color: "var(--roast)" }}>
              {[T.aboB1, T.aboB2, T.aboB3].map((item, i) => (
                <li key={i}>
                  <svg aria-hidden="true" style={{ color: "var(--copper-deep)" }}>
                    <use href="#i-check" />
                  </svg>
                  <span>{L(item)}</span>
                </li>
              ))}
            </ul>
            <p style={{ marginTop: "2rem" }}>
              <Link className="btn btn--primary" href="/abo/">
                {L(T.aboCta)}
              </Link>
            </p>
          </div>
          <Reveal className="img-frame" style={{ aspectRatio: "4/3" }}>
            <img
              src="/assets/img/beans-macro.webp"
              alt="Frisch geröstete Kaffeebohnen auf einem Kupfertablett"
              width={1280}
              height={720}
              loading="lazy"
            />
          </Reveal>
        </div>
      </section>

      {/* ============ Café & Reservierung ============ */}
      <section className="section" style={{ paddingTop: 0 }} id="besuch">
        <div className="container grid-2">
          <Reveal className="img-frame" style={{ aspectRatio: "16/10" }}>
            <img
              src="/assets/img/cafe-interior.webp"
              alt="Innenraum des Marlow-Cafés mit Holztischen und Kupferlampen"
              width={1280}
              height={800}
              loading="lazy"
            />
          </Reveal>
          <div>
            <p className="eyebrow">{L(T.visitEyebrow)}</p>
            <h2>{L(T.visitTitle)}</h2>
            <p>{L(T.visitP)}</p>
            <div className="visit-card" style={{ boxShadow: "none", padding: "1.5rem", marginBlock: "1.25rem" }}>
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
                  <dd>{t("hours.sun.v")}</dd>
                </div>
              </dl>
            </div>
            <Link className="btn btn--primary" href="/reservierung/">
              <svg aria-hidden="true">
                <use href="#i-calendar" />
              </svg>
              <span>{L(T.visitCta)}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ Journal-Teaser ============ */}
      <section className="section quotes" id="journal">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="eyebrow">{L(T.journalEyebrow)}</p>
            <h2>{L(T.journalTitle)}</h2>
          </div>
          <div className="post-grid">
            {teaser.map((article) => (
              <PostCard key={article.id} article={article} />
            ))}
          </div>
          <p style={{ textAlign: "center", margin: "2.5rem 0 0" }}>
            <Link className="btn btn--ghost" href="/journal/">
              {L(T.journalAll)}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
