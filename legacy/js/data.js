/* Marlow — zentrale Daten (Demo-CMS). Produkte & Journal in DE/EN. */

window.MARLOW = {
  settings: {
    freeShippingFrom: 35,
    aboDiscount: 0.1,
    /* Öffnungstage: 1 = Montag … 6 = Samstag (0 = Sonntag geschlossen) */
    openDays: [1, 2, 3, 4, 5, 6],
    hours: {
      1: ["08:00", "18:00"],
      2: ["08:00", "18:00"],
      3: ["08:00", "18:00"],
      4: ["08:00", "18:00"],
      5: ["08:00", "18:00"],
      6: ["09:00", "17:00"]
    },
    slotMinutes: 30,
    /* Beispiel-Feiertage (geschlossen), Format JJJJ-MM-TT */
    closedDates: ["2026-10-03", "2026-12-24", "2026-12-25", "2026-12-26", "2026-12-31", "2027-01-01"],
    roastWeekday: 2 /* Dienstag = Rösttag */
  },

  products: [
    {
      id: "buku-hambela",
      name: "Buku Hambela",
      origin: { de: "Äthiopien · Guji", en: "Ethiopia · Guji" },
      category: "filter",
      price: 14.5,
      weight: "250 g",
      img: "assets/img/bag-ethiopia.webp",
      accent: "#9c4f2c",
      badge: { de: "Bestseller", en: "Bestseller" },
      notes: {
        de: ["Bergamotte", "Aprikose", "Schwarztee"],
        en: ["Bergamot", "Apricot", "Black tea"]
      },
      desc: {
        de: "Ein floraler, leuchtender Filterkaffee von der Kooperative Buku Hambela auf 2.100 m. Langsam hell geröstet, damit Bergamotte und Steinfrucht klar durchkommen — unsere Empfehlung für Handfilter und AeroPress.",
        en: "A floral, luminous filter coffee from the Buku Hambela cooperative at 2,100 m. Roasted slowly and light so bergamot and stone fruit shine through — our pick for pour-over and AeroPress."
      },
      facts: {
        de: { Höhe: "2.100 m", Aufbereitung: "Gewaschen", Varietät: "Heirloom" },
        en: { Altitude: "2,100 m", Process: "Washed", Variety: "Heirloom" }
      },
      roastLevel: { de: "Hell", en: "Light" }
    },
    {
      id: "la-esperanza",
      name: "Finca La Esperanza",
      origin: { de: "Kolumbien · Huila", en: "Colombia · Huila" },
      category: "filter",
      price: 13.0,
      weight: "250 g",
      img: "assets/img/bag-colombia.webp",
      accent: "#6b7b3c",
      badge: null,
      notes: {
        de: ["Milchschokolade", "Rote Pflaume", "Karamell"],
        en: ["Milk chocolate", "Red plum", "Caramel"]
      },
      desc: {
        de: "Seit 2016 kaufen wir die gesamte Ernte der Familie Rodríguez. Honey-Aufbereitung, viel Süße, weicher Körper — ein Kaffee, der im Handfilter genauso funktioniert wie im Vollautomaten.",
        en: "We have bought the Rodríguez family's entire harvest since 2016. Honey-processed, plenty of sweetness, a soft body — works in the pour-over just as well as in a bean-to-cup machine."
      },
      facts: {
        de: { Höhe: "1.750 m", Aufbereitung: "Honey", Varietät: "Caturra & Castillo" },
        en: { Altitude: "1,750 m", Process: "Honey", Variety: "Caturra & Castillo" }
      },
      roastLevel: { de: "Mittel", en: "Medium" }
    },
    {
      id: "marlow-no1",
      name: "Marlow No. 1",
      origin: { de: "Hausmischung · Espresso", en: "House blend · Espresso" },
      category: "espresso",
      price: 12.0,
      weight: "250 g",
      img: "assets/img/bag-espresso.webp",
      accent: "#4a342a",
      badge: { de: "Café-Liebling", en: "Café favourite" },
      notes: {
        de: ["Dunkler Kakao", "Haselnuss", "Brauner Zucker"],
        en: ["Dark cocoa", "Hazelnut", "Brown sugar"]
      },
      desc: {
        de: "Unsere Espresso-Basis aus Brasilien und Kolumbien: schokoladig, rund, verlässlich — pur als Espresso ebenso wie im Cappuccino. Der Kaffee, mit dem unsere Theke jeden Morgen startet.",
        en: "Our espresso base from Brazil and Colombia: chocolatey, round, dependable — as a straight shot or in a cappuccino. The coffee our bar starts every morning with."
      },
      facts: {
        de: { Basis: "Brasilien & Kolumbien", Aufbereitung: "Natural & Gewaschen", Röstung: "Mittel-dunkel" },
        en: { Base: "Brazil & Colombia", Process: "Natural & washed", Roast: "Medium-dark" }
      },
      roastLevel: { de: "Mittel-dunkel", en: "Medium-dark" }
    },
    {
      id: "probierpaket",
      name: { de: "Probierpaket", en: "Tasting set" },
      origin: { de: "Set · 3 × 100 g", en: "Set · 3 × 100 g" },
      category: "sets",
      price: 19.9,
      weight: "3 × 100 g",
      img: "assets/img/beans-macro.webp",
      accent: "#b4633a",
      badge: { de: "Für Einsteiger", en: "Great to start" },
      notes: {
        de: ["Alle drei Röstungen", "Verkostungskarte", "Brühguide"],
        en: ["All three roasts", "Tasting card", "Brew guide"]
      },
      desc: {
        de: "Alle drei aktuellen Röstungen in kleinen Dosen, dazu Verkostungskarte und Brühguide. Das beliebteste Geschenk in unserem Café — und der beste Einstieg in das Marlow-Sortiment.",
        en: "All three current roasts in small doses, plus a tasting card and brew guide. The most popular gift in our café — and the best introduction to the Marlow range."
      },
      facts: {
        de: { Inhalt: "3 × 100 g", Mahlung: "Ganze Bohne", Extra: "Brühguide" },
        en: { Contents: "3 × 100 g", Grind: "Whole bean", Extra: "Brew guide" }
      },
      roastLevel: null
    },
    {
      id: "v60-set",
      name: { de: "V60 Starter-Set", en: "V60 starter kit" },
      origin: { de: "Zubehör · Handfilter", en: "Gear · Pour-over" },
      category: "zubehoer",
      price: 39.0,
      weight: "Set",
      img: "assets/img/barista-pourover.webp",
      accent: "#6e5f53",
      badge: null,
      notes: {
        de: ["Keramik-Dripper", "40 Filter", "250 g Kaffee"],
        en: ["Ceramic dripper", "40 filters", "250 g coffee"]
      },
      desc: {
        de: "Alles für den ersten richtig guten Handfilter zu Hause: Keramik-Dripper, 40 Papierfilter und eine Tüte Buku Hambela. Dazu unser Schritt-für-Schritt-Brühguide aus dem Journal.",
        en: "Everything for your first properly good pour-over at home: ceramic dripper, 40 paper filters and a bag of Buku Hambela. Includes our step-by-step brew guide from the journal."
      },
      facts: {
        de: { Dripper: "Keramik, Gr. 02", Filter: "40 Stück", Kaffee: "250 g inklusive" },
        en: { Dripper: "Ceramic, size 02", Filters: "40 pcs", Coffee: "250 g included" }
      },
      roastLevel: null
    },
    {
      id: "geschenk-abo",
      name: { de: "Geschenk-Abo (3 Monate)", en: "Gift subscription (3 months)" },
      origin: { de: "Gutschein · Abo", en: "Voucher · Subscription" },
      category: "sets",
      price: 42.0,
      weight: "3 × 250 g",
      img: "assets/img/cafe-interior.webp",
      accent: "#9c4f2c",
      badge: null,
      notes: {
        de: ["3 Lieferungen", "Versandkostenfrei", "Karte inklusive"],
        en: ["3 deliveries", "Free shipping", "Card included"]
      },
      desc: {
        de: "Drei Monate lang jeweils unsere frischeste Röstung, versandkostenfrei und mit persönlicher Karte zum Verschenken. Endet automatisch — kein Kündigen nötig.",
        en: "Our freshest roast every month for three months, free shipping, with a personal card for gifting. Ends automatically — nothing to cancel."
      },
      facts: {
        de: { Laufzeit: "3 Monate", Menge: "je 250 g", Versand: "Inklusive" },
        en: { Term: "3 months", Amount: "250 g each", Shipping: "Included" }
      },
      roastLevel: null
    }
  ],

  articles: [
    {
      id: "bruehguide-v60",
      tag: { de: "Brühwissen", en: "Brew guides" },
      title: { de: "Brühguide: Der perfekte V60 in vier Minuten", en: "Brew guide: the perfect V60 in four minutes" },
      date: "2026-06-12",
      minutes: 6,
      img: "assets/img/barista-pourover.webp",
      excerpt: {
        de: "Vier Minuten, eine Waage und 18 Gramm Kaffee: So gelingt der Handfilter, mit dem wir jede Röstung zuerst verkosten.",
        en: "Four minutes, a scale and 18 grams of coffee: how to nail the pour-over we use to taste every roast first."
      },
      body: {
        de: "<p>Der V60 ist unser Referenz-Brüher: Er verzeiht wenig — und genau deshalb zeigt er ehrlich, was in einer Röstung steckt. Mit diesem Rezept verkosten wir im Labor jede Charge, bevor sie in den Verkauf geht.</p><h2>Das Rezept</h2><ul><li>18 g Kaffee, mittelfein gemahlen (Meersalz-Textur)</li><li>300 g Wasser, 94 °C</li><li>Blooming: 50 g Wasser, 45 Sekunden quellen lassen</li><li>Dann in zwei ruhigen Spiralen bis 300 g aufgießen</li><li>Gesamtzeit: 3:30 bis 4:00 Minuten</li></ul><p>Läuft der Kaffee schneller durch, mahle feiner; dauert es länger, mahle gröber. Mehr musst du an diesem Rezept nie ändern.</p><blockquote>„Wir verkosten jede Charge mit exakt diesem Rezept — wenn du es zu Hause nachbrühst, schmeckst du, was wir freigegeben haben.“</blockquote><p>Für den Einstieg empfehlen wir den <em>Buku Hambela</em>: Seine florale Säure zeigt sofort, wie präzise du gegossen hast.</p>",
        en: "<p>The V60 is our reference brewer: it forgives very little — which is exactly why it shows honestly what a roast is made of. This is the recipe we use in the lab to taste every batch before it goes on sale.</p><h2>The recipe</h2><ul><li>18 g coffee, medium-fine grind (sea-salt texture)</li><li>300 g water at 94 °C</li><li>Bloom: 50 g of water, rest for 45 seconds</li><li>Then pour in two calm spirals up to 300 g</li><li>Total time: 3:30 to 4:00 minutes</li></ul><p>If the coffee draws down faster, grind finer; if it takes longer, grind coarser. That is the only thing you will ever need to change.</p><blockquote>“We cup every batch with exactly this recipe — brew it at home and you taste what we approved.”</blockquote><p>To get started we recommend <em>Buku Hambela</em>: its floral acidity shows immediately how precisely you poured.</p>"
      }
    },
    {
      id: "guji-reise",
      tag: { de: "Herkunft", en: "Origin" },
      title: { de: "Zu Besuch in Guji: Woher unser Äthiopier kommt", en: "Visiting Guji: where our Ethiopian comes from" },
      date: "2026-05-28",
      minutes: 8,
      img: "assets/img/coffee-cherries.webp",
      excerpt: {
        de: "Im Februar waren wir zum achten Mal bei der Kooperative Buku Hambela. Ein Reisebericht über Preise, Partnerschaft und 2.100 Höhenmeter.",
        en: "In February we visited the Buku Hambela cooperative for the eighth time. Notes on prices, partnership and 2,100 metres of altitude."
      },
      body: {
        de: "<p>Acht Reisen in acht Jahren: Die Kooperative Buku Hambela in Guji ist unsere längste Partnerschaft — und der Grund, warum „Direct Trade“ bei uns kein Etikett ist, sondern ein Terminkalender.</p><p>2.100 Meter über dem Meer wachsen die Heirloom-Varietäten langsam. Die Kirschen reifen über Wochen, werden selektiv von Hand gepflückt und noch am selben Tag gewaschen. Diese Langsamkeit schmeckt man später als Klarheit in der Tasse.</p><h2>Was wir zahlen</h2><p>Für die Ernte 2026 zahlen wir 4,20 USD pro Pfund Rohkaffee — mehr als das Doppelte des Fairtrade-Minimums. Nicht aus Wohltätigkeit, sondern weil diese Qualität diesen Preis wert ist und die Kooperative planen können muss.</p><p>Die neue Ernte ist seit Mai bei uns im Lager und wird jeden Dienstag frisch geröstet. Wer den Weg der Bohne einmal selbst verkosten will: Jeden ersten Samstag im Monat cuppen wir öffentlich in der Rösterei.</p>",
        en: "<p>Eight trips in eight years: the Buku Hambela cooperative in Guji is our longest partnership — and the reason “direct trade” is not a label for us but a travel schedule.</p><p>At 2,100 metres above sea level the heirloom varieties grow slowly. The cherries ripen over weeks, are picked selectively by hand and washed the same day. You taste that slowness later as clarity in the cup.</p><h2>What we pay</h2><p>For the 2026 harvest we are paying 4.20 USD per pound of green coffee — more than double the Fairtrade minimum. Not out of charity, but because this quality is worth this price and the cooperative needs to be able to plan.</p><p>The new harvest has been in our warehouse since May and is roasted fresh every Tuesday. If you want to taste the bean's journey yourself: we hold a public cupping at the roastery on the first Saturday of every month.</p>"
      }
    },
    {
      id: "roestdatum",
      tag: { de: "Rösterei", en: "Roastery" },
      title: { de: "Warum das Röstdatum wichtiger ist als der Röstgrad", en: "Why the roast date matters more than the roast level" },
      date: "2026-04-15",
      minutes: 5,
      img: "assets/img/beans-macro.webp",
      excerpt: {
        de: "Hell oder dunkel ist Geschmackssache. Frisch oder alt ist Qualität. Ein Plädoyer für das unterschätzteste Datum auf der Kaffeetüte.",
        en: "Light or dark is a matter of taste. Fresh or stale is a matter of quality. In defence of the most underrated date on the bag."
      },
      body: {
        de: "<p>Im Supermarkt findest du auf Kaffeetüten ein Mindesthaltbarkeitsdatum — oft zwei Jahre in der Zukunft. Was du selten findest: das Röstdatum. Dabei entscheidet genau dieses Datum darüber, was in deiner Tasse passiert.</p><p>Kaffee ist ein Frischeprodukt. In den ersten Tagen nach der Röstung gast er CO₂ aus, danach beginnen die Aromen langsam zu oxidieren. Unser Erfahrungswert: Zwischen Tag 5 und Tag 42 nach der Röstung ist ein Kaffee am besten — danach wird er flach, egal wie gut er geröstet wurde.</p><h2>Unsere Konsequenz</h2><p>Jede Marlow-Tüte trägt ihr Röstdatum gut sichtbar auf dem Etikett, nichts verlässt das Lager später als sieben Tage nach der Röstung, und was wir nicht frisch verkaufen, rösten wir gar nicht erst. Deshalb gibt es unser Sortiment nur in Chargen — und deshalb lohnt sich das Abo: Es hängt direkt an unserem Röstkalender.</p>",
        en: "<p>On supermarket coffee you will find a best-before date — often two years in the future. What you rarely find is the roast date. Yet that date is what decides what happens in your cup.</p><p>Coffee is a fresh product. In the first days after roasting it releases CO₂, after that the aromas slowly begin to oxidise. Our rule of thumb: a coffee is at its best between day 5 and day 42 after roasting — after that it goes flat, no matter how well it was roasted.</p><h2>What we do about it</h2><p>Every Marlow bag carries its roast date clearly on the label, nothing leaves the warehouse later than seven days after roasting, and what we cannot sell fresh we simply do not roast. That is why our range comes in batches — and why the subscription makes sense: it is tied directly to our roast calendar.</p>"
      }
    },
    {
      id: "cold-brew",
      tag: { de: "Neues", en: "News" },
      title: { de: "Cold-Brew-Saison: Unsere Sommer-Empfehlungen", en: "Cold brew season: our summer picks" },
      date: "2026-06-30",
      minutes: 4,
      img: "assets/img/cafe-interior.webp",
      excerpt: {
        de: "Zwölf Stunden Geduld, null Bitterkeit: Mit diesen zwei Röstungen und einem Grundrezept wird der Sommer koffeinhaltig.",
        en: "Twelve hours of patience, zero bitterness: two roasts and one base recipe for a properly caffeinated summer."
      },
      body: {
        de: "<p>Ab sofort gibt es im Café wieder Cold Brew vom Fass — und für zu Hause das passende Grundrezept. Kalt extrahiert verliert Kaffee fast alle Bitterstoffe und zeigt stattdessen Süße und Frucht.</p><h2>Das Grundrezept</h2><ul><li>100 g Kaffee, grob gemahlen</li><li>1 Liter kaltes Wasser</li><li>12 Stunden im Kühlschrank ziehen lassen, dann filtern</li><li>Hält sich verschlossen bis zu einer Woche</li></ul><p>Unsere Empfehlung für fruchtigen Cold Brew ist der <em>Buku Hambela</em> — eisgekühlt schmeckt er wie Eistee mit Aprikose. Wer es schokoladig mag, nimmt die <em>Finca La Esperanza</em> mit einem Schuss Milch.</p><p>Beide Röstungen gibt es im Juli im Sommer-Duo mit 10 % Rabatt im Shop.</p>",
        en: "<p>Cold brew is back on tap at the café — and here is the base recipe for home. Extracted cold, coffee loses almost all its bitterness and shows sweetness and fruit instead.</p><h2>The base recipe</h2><ul><li>100 g coffee, coarsely ground</li><li>1 litre of cold water</li><li>Steep for 12 hours in the fridge, then filter</li><li>Keeps sealed for up to a week</li></ul><p>Our pick for fruity cold brew is <em>Buku Hambela</em> — over ice it tastes like apricot iced tea. If you prefer chocolate notes, take <em>Finca La Esperanza</em> with a dash of milk.</p><p>Both roasts are available as a summer duo with 10% off in the shop throughout July.</p>"
      }
    }
  ]
};

/* Hilfsfunktionen für lokalisierte Felder */
window.MARLOW.loc = function (field, lang) {
  if (field == null) return "";
  if (typeof field === "string") return field;
  return field[lang] != null ? field[lang] : field.de;
};
