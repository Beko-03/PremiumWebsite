# Marlow Coffee Roasters — Design System (Master)

Global Source of Truth. Page-specific overrides live in `design-system/pages/<page>.md`
and take precedence over this file when present.

## Brand

- Product type: Artisan coffee roaster (Bakery/Café profile — order-focused)
- Landing pattern: Hero + Value Prop + Featured Products + Story + CTA (Hero-Centric Design + Conversion)
- Style: **Nature Distilled** — muted earthy warmth, handmade/artisan quality, organic softness, subtle grain texture
- Logo: cream field, copper line-art bean-in-circle mark, dark espresso serif wordmark, letterspaced copper sans subtitle
  (`FirmenLogo/hf_20260704_142535_89ea2009-cb3e-4045-ac60-289f4bc30eb8.png`)

## Color Tokens

All pairs verified against WCAG 2.1 (body text ≥ 4.5:1, large text/UI ≥ 3:1).

| Token             | Hex       | Role                                              | Contrast notes                        |
|-------------------|-----------|---------------------------------------------------|---------------------------------------|
| `--cream`         | `#FAF3E3` | Page background                                   | —                                     |
| `--cream-card`    | `#FFFBF0` | Card / raised surface                             | —                                     |
| `--espresso`      | `#2E211B` | Primary text, dark headings                       | 13.9:1 on cream ✓                     |
| `--espresso-deep` | `#241813` | Dark section background (subscription band, footer) | cream text on it: 15.6:1 ✓          |
| `--roast`         | `#4A342A` | Secondary text                                    | 8.9:1 on cream ✓                      |
| `--copper`        | `#B4633A` | Decorative accent: icons, large display text, rules | 3.97:1 on cream — large text/UI only |
| `--copper-deep`   | `#9C4F2C` | Buttons, links, small accents                     | 5.3:1 on cream, white on it 5.9:1 ✓   |
| `--copper-light`  | `#D98E5F` | Accent on dark backgrounds                        | 6.6:1 on espresso-deep ✓              |
| `--stone`         | `#6E5F53` | Muted text, captions                              | 5.6:1 on cream ✓                      |
| `--line`          | `#E7D9C2` | Borders, dividers                                 | decorative                            |

Rules:
- Never place `--copper` body-size text on cream; use `--copper-deep` instead.
- Dark sections use `--copper-light` for accents, never raw `--copper`.
- No raw hex in components — tokens only.

## Typography

- Headings: **Playfair Display** 600/700 (echoes logo wordmark serif)
- Body / UI: **Karla** 400/500/700
- Eyebrow labels: Karla 700, uppercase, `letter-spacing: 0.18em`, copper-deep (echoes "COFFEE ROASTERS" logo line)
- Scale: 13 / 15 / 17 (body) / 20 / 24 / 32 / 44 / clamp hero `clamp(2.6rem, 5.5vw, 4.5rem)`
- Body line-height 1.65; headings 1.1–1.2; line length ≤ 65ch

## Spacing, Shape, Elevation

- 8px rhythm (4px half-step); section padding `clamp(4.5rem, 9vw, 7.5rem)`
- Container `max-width: 1140px`, gutter `clamp(1.25rem, 4vw, 2.5rem)`
- Radius: cards 20px, inputs 12px, buttons pill (999px), images 24px organic
- Shadow scale (natural, warm-tinted):
  - sm `0 1px 2px rgba(46,33,27,.06)`
  - md `0 8px 24px rgba(46,33,27,.09)`
  - lg `0 20px 48px rgba(46,33,27,.13)`
- Grain: SVG turbulence overlay at ~4% opacity on page background only

## Motion

- Micro-interactions 150–250ms `ease-out` in, ~150ms out; nothing over 400ms
- Transform/opacity only (no width/height/top/left animation)
- Scroll-reveal: 16px rise + fade, staggered ≤ 60ms per item, IntersectionObserver
- Full `prefers-reduced-motion` support: reveals render instantly, hovers static

## Iconography

- Inline SVG only (Lucide-style: 24px grid, `stroke-width: 2`, round caps) — **no emoji icons**
- Bean mark recreated as inline SVG (crisp at any size; do not ship the 3.8 MB logo PNG on the page)
- One stroke weight per hierarchy level

## Accessibility (non-negotiable)

- Skip link; visible `:focus-visible` ring `2px solid var(--copper-deep)`, offset 3px
- Touch targets ≥ 44×44px; sequential heading levels; labels on all form fields
- `aria-expanded` on mobile nav toggle; `aria-label` on icon-only buttons
- Color never sole meaning carrier

## Seitenarchitektur (Stand: Premium-Ausbau)

| Seite | Datei | Besonderheit |
|---|---|---|
| Start | `index.html` | Video-Hero: Bohnen-Intro einmal, dann Dampf-Segment im Loop (`js/hero-video.js`), Röst-Ticker, Coffee-Finder-Quiz |
| Shop | `shop.html` | Filter-Chips, Warenkorb-Drawer (localStorage) |
| Produkt | `produkt.html?id=…` | Mahlgrad/Menge, Akkordeon, Product-JSON-LD |
| Abo | `abo.html` | Konfigurator mit Live-Preis (10 % Abo-Rabatt) |
| Reservierung | `reservierung.html` | Kalender: Öffnungstage kupfern markiert (`.cal__day.is-open`), Slots aus `settings.hours` |
| Rösterei | `roesterei.html` | Timeline, Prinzipien, Cupping-CTA |
| Journal / Artikel | `journal.html`, `artikel.html?id=…` | Inhalte aus `js/data.js` (Demo-CMS), DE+EN |
| B2B | `b2b.html` | Staffelpreis-Tabelle, Musterpaket-Formular |
| Kontakt | `kontakt.html` | Validiertes Formular, stilisierte SVG-Karte |

- i18n: Deutsch im Markup, EN via `js/i18n.en.js` + `data-i18n`-Attribute; JS-Strings zweisprachig in `js/i18n.js`
- Assets: KI-generiert (Nano Banana 2 → `assets/img/*.webp` 2K, Kling 3.0 → `assets/video/hero-roast.mp4`)
- Hero-Video-Regel: Text nie ins Video rendern — immer HTML-Overlay (SEO, i18n, Reduced Motion)

## Anti-patterns (from style profile)

- No neon, no glassmorphism, no hard tech gradients — breaks the handmade warmth
- No pure white `#FFFFFF` page background (cream only)
- No cold grays — warm-tinted neutrals throughout
- No hover-only affordances; no layout-shifting press states
