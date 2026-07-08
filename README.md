# Marlow Coffee Roasters — Premium-Website-Vorlage

Vorzeigbare Demo-Website für Kundengespräche im Segment **1.000 – 4.500 €**.
Fiktive Marke: „Marlow Coffee Roasters“ (Name & Farben aus dem Logo in `FirmenLogo/` abgeleitet).

## Tech Stack

**Next.js 15 · TypeScript · Tailwind CSS v4** — als statischer Export (`output: "export"`),
das heißt: kein Node-Server nötig, hostbar auf jedem klassischen Webspace (Hostinger, Strato, Netlify, …).

- App Router (`app/`), React Server Components + Client Components
- Tailwind v4 (`@theme`-Tokens in `app/globals.css`, siehe auch `design-system/MASTER.md`)
- Zweisprachigkeit (DE/EN) über einen eigenen `LanguageProvider` (`lib/i18n.tsx`), Umschalter im Header
- Demo-Warenkorb über React-Context + `localStorage` (`lib/cart.tsx`)
- Produkte/Artikel/Öffnungszeiten zentral in `lib/data.ts` („Mini-CMS“)
- `next/font` für Playfair Display + Karla (selbst gehostet, kein Google-Fonts-Request beim Besucher)

## Seiten

| Route | Inhalt |
|---|---|
| `/` | Video-Hero (Intro + Dampf-Loop), Live-Röstkalender, Sortiment, Story, Coffee-Finder-Quiz, Abo-Teaser, Café, Journal-Teaser |
| `/shop/`, `/produkt/[id]/` | Filter, Warenkorb-Drawer, Mahlgrad/Menge, Gratisversand-Fortschrittsbalken, Demo-Checkout |
| `/abo/` | Abo-Konfigurator mit Live-Preisberechnung (10 % Abo-Vorteil) |
| `/reservierung/` | Kalender: Öffnungstage kupferfarben markiert, Sonn-/Feiertage ausgegraut, Zeitslots aus Öffnungszeiten, Bestätigungscode |
| `/roesterei/` | Story, Timeline, Arbeitsprinzipien |
| `/journal/`, `/artikel/[id]/` | Blog aus zentraler Datenquelle |
| `/b2b/` | Staffelpreise, Musterpaket-Anfrage |
| `/kontakt/` | Formular mit Validierung, stilisierte Karte, Öffnungszeiten |

Alle `produkt/`- und `artikel/`-Detailseiten werden beim Build vorab statisch erzeugt
(`generateStaticParams`) — keine Server-Requests zur Laufzeit.

## Lokal starten

Voraussetzung: [Node.js](https://nodejs.org) 20+ (getestet mit Node 26).

```bash
npm install
npm run dev
```

Dann `http://localhost:3000` öffnen.

## Build & Vorschau des statischen Exports

```bash
npm run build      # erzeugt den fertigen Auftritt in out/
npm run preview    # serviert out/ lokal zur Kontrolle (via `serve`)
```

`npm run build` ist der Schritt, der auch für den Live-Betrieb zählt: Der komplette Inhalt
von `out/` ist die Website — reines HTML/CSS/JS, keine weitere Build-Umgebung nötig.

## Auf GitHub pushen

```bash
git init
git add .
git commit -m "Initial commit: Marlow Coffee Roasters (Next.js 15 + TS + Tailwind)"
git branch -M main
git remote add origin <URL-deines-GitHub-Repos>
git push -u origin main
```

`node_modules/`, `.next/` und `out/` sind bereits in `.gitignore` — die werden nicht mitcommittet.

## Auf Hostinger hosten

Hostinger-Shared-Hosting (und die meisten klassischen Webspaces) führen kein Node.js aus —
deshalb der Static Export. Zwei Wege:

**Variante A — manuell hochladen (einfachster Weg):**

1. `npm run build` ausführen → Ordner `out/` entsteht.
2. Im Hostinger-hPanel: *Dateien → Datei-Manager* öffnen, in `public_html/` wechseln.
3. Den kompletten **Inhalt** von `out/` (nicht den Ordner selbst) nach `public_html/` hochladen
   (per Datei-Manager-Upload oder FTP/SFTP mit den Zugangsdaten aus dem hPanel).
4. Fertig — `https://deine-domain.de` zeigt die Seite.

**Variante B — automatisch bei jedem GitHub-Push (GitHub Actions + FTP-Deploy):**

Lege `.github/workflows/deploy.yml` an, die bei jedem Push nach `main` baut und den
`out/`-Ordner per FTP zu Hostinger überträgt (z. B. mit der Action
`SamKirkland/FTP-Deploy-Action`). Die FTP-Zugangsdaten (Host, Benutzer, Passwort) findest
du im hPanel unter *Dateien → FTP-Accounts* und hinterlegst sie als GitHub-Repo-Secrets
(`FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`) — niemals im Klartext committen.

**Domain/Pfad:** Ersetze vor dem Live-Gang die Platzhalter-Domain `www.marlow-roasters.de` in
`lib/data.ts` (`SITE_URL`) — davon leiten sich `sitemap.xml`, `robots.txt` und alle
`canonical`/`og:url`-Angaben ab.

## Anpassen für den nächsten Kunden

1. Farben/Schriften: Tokens in `app/globals.css` (`@theme`-Block) + `design-system/MASTER.md`
2. Produkte/Artikel/Öffnungszeiten: `lib/data.ts`
3. Übersetzungen: `lib/i18n.tsx` (Objekt `STRINGS`) sowie die `T`-Objekte in den jeweiligen
   `components/*Client.tsx`-Dateien (Seiteninhalte sind dort direkt zweisprachig gepflegt)
4. Bilder: `public/assets/img/` (WebP, 2K), Video: `public/assets/video/hero-roast.mp4`
   - Hinweis: Das Hero-Video hat ~15 MB. Für den Live-Betrieb mit ffmpeg auf ~3–5 MB
     komprimieren (`ffmpeg -i hero-roast.mp4 -crf 28 -preset slow -an out.mp4`).
5. Platzhalter-Domain in `lib/data.ts` (`SITE_URL`) ersetzen (siehe oben)

## Ordnerstruktur

```
app/            Next.js App Router — Routen & Metadata
components/     React-Komponenten (Client Components mit "use client")
lib/            Daten (data.ts), i18n, Cart-/UI-Context, gemeinsame Hooks
public/assets/  Bilder & Hero-Video (statisch ausgeliefert)
legacy/         Ursprüngliche Vanilla-HTML/CSS/JS-Fassung (Referenz, nicht Teil des Builds)
design-system/  Design-Rationale (Farben, Typografie, Tonalität)
FirmenLogo/     Ausgangslogo, aus dem das Farbschema abgeleitet wurde
```

## Bekannte Demo-Grenzen (bewusst)

- Impressum/Datenschutz sind Platzhalter-Links
- Warenkorb/Buchung persistieren nur im Browser des Besuchers (`localStorage`)
- Checkout, Formulare und Buchung zeigen ehrliche „Demo“-Hinweise — in Kundenprojekten wird
  hier Stripe/Shopify, ein Buchungssystem bzw. ein CMS angebunden
- `prefers-reduced-motion` wird überall respektiert (Video wird Standbild, Reveals erscheinen sofort)
