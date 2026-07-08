"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

/* Datenschutzerklärung nach Art. 13 DSGVO.
   Der technische Teil beschreibt exakt das Verhalten dieser Seite:
   keine Cookies, kein Tracking, selbst gehostete Schriften, lokale Speicherung
   (localStorage) für Warenkorb/Sprache/Reservierungs-Demo, Demo-Formulare ohne
   Datenübermittlung. Platzhalter [in Klammern] vom Betreiber ausfüllen. */

export default function DatenschutzClient() {
  const { lang, t } = useI18n();

  return (
    <div className="container">
      <nav className="breadcrumbs" aria-label="Brotkrumen">
        <ol>
          <li>
            <Link href="/">{t("crumb.home")}</Link>
          </li>
          <li aria-current="page">{lang === "de" ? "Datenschutz" : "Privacy"}</li>
        </ol>
      </nav>

      <article className="prose" style={{ paddingTop: "2rem" }}>
        <header className="prose__head">
          <h1>{lang === "de" ? "Datenschutzerklärung" : "Privacy policy"}</h1>
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
            ? "Hinweis für den Betreiber: Ersetzen Sie die [Platzhalter] durch Ihre Angaben. Sobald Formulare echte Daten versenden oder externe Dienste (Zahlung, Analyse, Karten) eingebunden werden, muss dieser Text entsprechend ergänzt werden. Keine Rechtsberatung."
            : "Note for the operator: replace the [placeholders] with your details. As soon as forms transmit real data or external services (payment, analytics, maps) are added, this text must be extended accordingly. Not legal advice."}
        </p>

        {lang === "de" ? (
          <>
            <h2>1. Verantwortlicher</h2>
            <p>
              Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der
              Datenschutz-Grundverordnung (DSGVO) ist:
            </p>
            <p>
              [Firmenname / Inhaber]
              <br />
              [Straße und Hausnummer]
              <br />
              [PLZ und Ort], Deutschland
              <br />
              E-Mail: hello@marlow.coffee
            </p>

            <h2>2. Überblick — was diese Website tut (und was nicht)</h2>
            <ul>
              <li>Es werden keine Cookies zu Werbe- oder Analysezwecken gesetzt.</li>
              <li>Es findet kein Tracking und keine Reichweitenmessung statt (kein Google Analytics o. Ä.).</li>
              <li>Schriftarten werden lokal vom eigenen Server geladen — es besteht keine Verbindung zu Google Fonts.</li>
              <li>Es werden keine externen Skripte, Werbenetzwerke oder Social-Media-Plugins nachgeladen.</li>
              <li>
                Funktionale Angaben (Warenkorb, Spracheinstellung, Reservierungs-Demo) werden ausschließlich
                lokal in Ihrem Browser gespeichert (localStorage) und nicht an uns übertragen.
              </li>
            </ul>

            <h2>3. Aufruf der Website / Server-Logfiles</h2>
            <p>
              Beim Aufruf der Website verarbeitet unser Hosting-Anbieter automatisch technisch notwendige
              Daten, die Ihr Browser übermittelt (z. B. IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene
              Seite, übertragene Datenmenge, Referrer, Browsertyp und Betriebssystem). Diese Daten dienen dem
              sicheren und stabilen Betrieb der Website.
            </p>
            <p>
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der sicheren
              Bereitstellung der Website).
            </p>

            <h2>4. Hosting</h2>
            <p>
              Diese Website wird bei [Hosting-Anbieter, z. B. Hostinger International Ltd., 61 Lordou Vironos
              Street, 6023 Larnaka, Zypern] gehostet. Der Anbieter verarbeitet die unter Ziffer 3 genannten
              Server-Logfiles in unserem Auftrag. Mit dem Anbieter besteht ein Vertrag zur Auftragsverarbeitung
              gemäß Art. 28 DSGVO.
            </p>

            <h2>5. Lokale Speicherung im Browser (localStorage)</h2>
            <p>Für die Funktion der Seite speichern wir folgende Angaben ausschließlich in Ihrem Browser:</p>
            <ul>
              <li>
                <strong>Warenkorb</strong> (<code>marlow_cart</code>) — die von Ihnen ausgewählten Produkte,
                damit der Warenkorb beim Seitenwechsel erhalten bleibt.
              </li>
              <li>
                <strong>Spracheinstellung</strong> (<code>marlow_lang</code>) — Ihre Auswahl Deutsch/Englisch.
              </li>
              <li>
                <strong>Reservierungs-Demo</strong> (<code>marlow_bookings</code>) — in dieser Demo-Version
                verbleiben Reservierungsdaten nur lokal in Ihrem Browser.
              </li>
            </ul>
            <p>
              Diese Daten sind für den Betrieb der von Ihnen gewünschten Funktionen erforderlich und werden
              nicht an uns oder Dritte übertragen. Rechtsgrundlage ist § 25 Abs. 2 Nr. 2 TDDDG (unbedingt
              erforderliche Speicherung) sowie Art. 6 Abs. 1 lit. f DSGVO. Sie können die Daten jederzeit über
              die Einstellungen Ihres Browsers löschen.
            </p>

            <h2>6. Kontakt-, Reservierungs- und Newsletter-Formulare</h2>
            <p>
              In dieser Demo-Version werden die Formulare (Kontakt, Reservierung, Großhandelsanfrage,
              Newsletter) <strong>nicht</strong> tatsächlich versendet — es werden keine Daten an einen Server
              übermittelt. Es findet nur eine Anzeige zur Veranschaulichung statt.
            </p>
            <p>
              [Für den Live-Betrieb ergänzen: Beschreibung, wohin Formulardaten übermittelt werden (z. B.
              E-Mail-Postfach, CRM, Buchungssystem, Zahlungsdienstleister), zu welchem Zweck, auf welcher
              Rechtsgrundlage (i. d. R. Art. 6 Abs. 1 lit. b bzw. lit. a DSGVO) und wie lange sie gespeichert
              werden.]
            </p>

            <h2>7. Ihre Rechte</h2>
            <p>Sie haben im Rahmen der gesetzlichen Vorgaben jederzeit das Recht auf:</p>
            <ul>
              <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO),</li>
              <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO),</li>
              <li>Löschung (Art. 17 DSGVO),</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO),</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO),</li>
              <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO).</li>
            </ul>
            <p>
              Zudem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77
              DSGVO). Für die Ausübung Ihrer Rechte genügt eine formlose Nachricht an die oben genannte
              E-Mail-Adresse.
            </p>

            <h2>8. Aktualität</h2>
            <p>
              Diese Datenschutzerklärung hat den Stand [Monat/Jahr]. Durch die Weiterentwicklung der Website
              oder geänderte gesetzliche Vorgaben kann eine Anpassung erforderlich werden.
            </p>
          </>
        ) : (
          <>
            <h2>1. Controller</h2>
            <p>The controller responsible for data processing on this website under the GDPR is:</p>
            <p>
              [Company name / owner]
              <br />
              [Street and number]
              <br />
              [Postal code and city], Germany
              <br />
              E-mail: hello@marlow.coffee
            </p>

            <h2>2. Overview — what this website does (and does not)</h2>
            <ul>
              <li>No cookies are set for advertising or analytics purposes.</li>
              <li>There is no tracking or audience measurement (no Google Analytics or similar).</li>
              <li>Fonts are served locally from our own server — there is no connection to Google Fonts.</li>
              <li>No external scripts, ad networks or social-media plugins are loaded.</li>
              <li>
                Functional data (cart, language setting, reservation demo) is stored exclusively in your
                browser (localStorage) and is not transmitted to us.
              </li>
            </ul>

            <h2>3. Accessing the website / server log files</h2>
            <p>
              When you access the website, our hosting provider automatically processes technically necessary
              data transmitted by your browser (e.g. IP address, date and time of access, page requested, data
              volume, referrer, browser type and operating system) for the secure and stable operation of the
              site. The legal basis is Art. 6(1)(f) GDPR (legitimate interest).
            </p>

            <h2>4. Hosting</h2>
            <p>
              This website is hosted by [hosting provider, e.g. Hostinger International Ltd., 61 Lordou Vironos
              Street, 6023 Larnaca, Cyprus], which processes the server log files on our behalf under a data
              processing agreement pursuant to Art. 28 GDPR.
            </p>

            <h2>5. Local storage in the browser (localStorage)</h2>
            <p>For the site to function we store the following only in your browser:</p>
            <ul>
              <li>
                <strong>Cart</strong> (<code>marlow_cart</code>) — the products you selected.
              </li>
              <li>
                <strong>Language setting</strong> (<code>marlow_lang</code>) — your German/English choice.
              </li>
              <li>
                <strong>Reservation demo</strong> (<code>marlow_bookings</code>) — in this demo, reservation
                data stays local in your browser only.
              </li>
            </ul>
            <p>
              This data is necessary for the functions you request and is not transmitted to us or third
              parties. You can delete it at any time via your browser settings.
            </p>

            <h2>6. Contact, reservation and newsletter forms</h2>
            <p>
              In this demo version the forms (contact, reservation, wholesale enquiry, newsletter) are{" "}
              <strong>not</strong> actually sent — no data is transmitted to a server.
            </p>
            <p>
              [For live operation, add: where form data is transmitted (e.g. e-mail, CRM, booking system,
              payment provider), for what purpose, on what legal basis and for how long it is stored.]
            </p>

            <h2>7. Your rights</h2>
            <p>
              Within the statutory framework you have the right to access, rectification, erasure, restriction
              of processing, data portability and objection, as well as the right to lodge a complaint with a
              supervisory authority (Art. 15–21, 77 GDPR). An informal message to the e-mail address above is
              sufficient.
            </p>

            <h2>8. Status</h2>
            <p>This privacy policy is dated [month/year] and may need to be updated as the website evolves.</p>
          </>
        )}
      </article>
    </div>
  );
}
