"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { operator } from "@/lib/site-config";

/* Impressum nach § 5 DDG (früher § 5 TMG).
   Die Betreiberangaben kommen aus lib/site-config.ts. */

export default function ImpressumClient() {
  const { lang, t } = useI18n();

  return (
    <div className="container">
      <nav className="breadcrumbs" aria-label="Brotkrumen">
        <ol>
          <li>
            <Link href="/">{t("crumb.home")}</Link>
          </li>
          <li aria-current="page">{lang === "de" ? "Impressum" : "Imprint"}</li>
        </ol>
      </nav>

      <article className="prose" style={{ paddingTop: "2rem" }}>
        <header className="prose__head">
          <h1>{lang === "de" ? "Impressum" : "Imprint"}</h1>
        </header>

        <p
          style={{
            background: "var(--cream-card)",
            border: "1px solid var(--line)",
            borderRadius: "var(--radius-input)",
            padding: "1rem 1.25rem",
            fontSize: "0.9375rem",
          }}
        >
          {lang === "de"
            ? "„Marlow Coffee Roasters“ ist ein fiktives Beispielunternehmen. Diese Website ist eine Präsentations-Demo. Verantwortlich für den Betrieb der Demo ist der unten genannte Anbieter. Angaben in [eckigen Klammern] sind noch zu ergänzen; dies ersetzt keine Rechtsberatung."
            : "“Marlow Coffee Roasters” is a fictional example business. This website is a presentation demo. The provider named below is responsible for operating the demo. Details in [brackets] still need to be completed; this is no substitute for legal advice."}
        </p>

        {lang === "de" ? (
          <>
            <h2>Angaben gemäß § 5 DDG</h2>
            <p>
              {operator.name}
              <br />
              {operator.street}
              <br />
              {operator.city}
              <br />
              {operator.country}
            </p>

            <h2>Kontakt</h2>
            <p>
              {operator.phone ? (
                <>
                  Telefon: {operator.phone}
                  <br />
                </>
              ) : null}
              E-Mail: {operator.email}
            </p>

            {operator.vatId ? (
              <>
                <h2>Umsatzsteuer-Identifikationsnummer</h2>
                <p>
                  Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
                  <br />
                  {operator.vatId}
                </p>
              </>
            ) : null}

            <h2>Redaktionell verantwortlich</h2>
            <p>
              {operator.name}
              <br />
              {operator.street}, {operator.city}
            </p>

            <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
                https://ec.europa.eu/consumers/odr/
              </a>
              . Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>

            <h2>Haftung für Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den
              allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch
              nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.
            </p>

            <h2>Haftung für Links</h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss
              haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
              Seiten verantwortlich.
            </p>

            <h2>Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
              deutschen Urheberrecht. Die Abbildungen und Texte dieser Demo-Website dienen ausschließlich zu
              Präsentationszwecken.
            </p>
          </>
        ) : (
          <>
            <h2>Information pursuant to § 5 DDG (German Digital Services Act)</h2>
            <p>
              {operator.name}
              <br />
              {operator.street}
              <br />
              {operator.city}
              <br />
              {operator.country}
            </p>

            <h2>Contact</h2>
            <p>
              {operator.phone ? (
                <>
                  Phone: {operator.phone}
                  <br />
                </>
              ) : null}
              E-mail: {operator.email}
            </p>

            {operator.vatId ? (
              <>
                <h2>VAT identification number</h2>
                <p>
                  VAT ID pursuant to § 27 a of the German VAT Act:
                  <br />
                  {operator.vatId}
                </p>
              </>
            ) : null}

            <h2>Responsible for content</h2>
            <p>
              {operator.name}
              <br />
              {operator.street}, {operator.city}
            </p>

            <h2>Online dispute resolution</h2>
            <p>
              The European Commission provides a platform for online dispute resolution (ODR):{" "}
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
                https://ec.europa.eu/consumers/odr/
              </a>
              . We are neither willing nor obliged to participate in dispute resolution proceedings before a
              consumer arbitration board.
            </p>

            <h2>Copyright</h2>
            <p>
              The content and works created by the site operators on these pages are subject to German
              copyright law. The images and texts of this demo website are for presentation purposes only.
            </p>
          </>
        )}
      </article>
    </div>
  );
}
