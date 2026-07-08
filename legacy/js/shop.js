/* Marlow — Shop-Raster mit Filtern + Produktdetailseite (Demo-Shop) */

(function () {
  "use strict";

  var I = function () { return window.MARLOW_I18N; };
  var DATA = window.MARLOW;

  /* ---------- Produktkarte (gemeinsam für Shop, Start, Ähnliche) ---------- */

  function productCard(p, lang, i18n) {
    var badge = p.badge
      ? '<span class="badge' + (p.category === "espresso" ? " badge--dark" : "") + '">' +
        DATA.loc(p.badge, lang) + "</span>"
      : "";
    return (
      '<article class="product-card reveal is-visible" data-category="' + p.category + '">' +
      badge +
      '<a class="product-card__photo" href="produkt.html?id=' + p.id + '" tabindex="-1" aria-hidden="true">' +
      '<img src="' + p.img + '" alt="" loading="lazy" width="600" height="750">' +
      "</a>" +
      '<div class="product-card__body">' +
      '<p class="product-card__origin">' + DATA.loc(p.origin, lang) + "</p>" +
      '<h3><a href="produkt.html?id=' + p.id + '" style="color:inherit;text-decoration:none">' +
      DATA.loc(p.name, lang) + "</a></h3>" +
      '<ul class="product-card__notes">' +
      DATA.loc(p.notes, lang).map(function (n) { return "<li>" + n + "</li>"; }).join("") +
      "</ul>" +
      '<div class="product-card__foot">' +
      '<p class="product-card__price">' + i18n.fmtPrice(p.price) +
      " <span>" + p.weight + "</span></p>" +
      '<button class="btn btn--primary" type="button" data-add-to-cart="' + p.id + '">' +
      i18n.t("quiz.result.cta") +
      "</button>" +
      "</div></div></article>"
    );
  }

  /* ---------- Shop-Übersicht ---------- */

  var grid = document.getElementById("shop-grid");
  if (grid) {
    var activeFilter = "alle";

    var renderGrid = function () {
      var i18n = I();
      var lang = i18n.lang;
      var items = DATA.products.filter(function (p) {
        return activeFilter === "alle" || p.category === activeFilter;
      });
      grid.innerHTML = items
        .map(function (p) { return productCard(p, lang, i18n); })
        .join("");
      var counter = document.getElementById("shop-count");
      if (counter) counter.textContent = String(items.length);
    };

    document.querySelectorAll(".chipbar .chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        document.querySelectorAll(".chipbar .chip").forEach(function (c) {
          c.setAttribute("aria-pressed", "false");
        });
        chip.setAttribute("aria-pressed", "true");
        activeFilter = chip.getAttribute("data-filter");
        renderGrid();
      });
    });

    document.addEventListener("marlow:lang", renderGrid);
    renderGrid();
  }

  /* ---------- Empfohlene Produkte auf der Startseite ---------- */

  var featured = document.getElementById("featured-grid");
  if (featured) {
    var renderFeatured = function () {
      var i18n = I();
      var lang = i18n.lang;
      featured.innerHTML = ["buku-hambela", "la-esperanza", "marlow-no1"]
        .map(function (id) {
          var p = DATA.products.find(function (x) { return x.id === id; });
          return productCard(p, lang, i18n);
        })
        .join("");
    };
    document.addEventListener("marlow:lang", renderFeatured);
    renderFeatured();
  }

  /* ---------- Produktdetail ---------- */

  var pd = document.getElementById("pd-root");
  if (pd) {
    var params = new URLSearchParams(location.search);
    var product = DATA.products.find(function (p) { return p.id === params.get("id"); }) ||
      DATA.products[0];

    var renderDetail = function () {
      var i18n = I();
      var lang = i18n.lang;
      var isCoffee = product.category === "filter" || product.category === "espresso";
      var facts = DATA.loc(product.facts, lang);

      document.title = DATA.loc(product.name, lang) + " — Marlow Coffee Roasters";
      var crumb = document.getElementById("crumb-product");
      if (crumb) crumb.textContent = DATA.loc(product.name, lang);

      pd.innerHTML =
        '<div class="pd__gallery">' +
        '<div class="img-frame"><img src="' + product.img + '" alt="' +
        DATA.loc(product.name, lang) + ' – Verpackung" width="740" height="925"></div>' +
        "</div>" +
        "<div>" +
        '<p class="product-card__origin">' + DATA.loc(product.origin, lang) + "</p>" +
        '<h1 class="pd__title">' + DATA.loc(product.name, lang) + "</h1>" +
        '<ul class="product-card__notes" aria-label="Geschmacksnoten">' +
        DATA.loc(product.notes, lang).map(function (n) { return "<li>" + n + "</li>"; }).join("") +
        "</ul>" +
        '<p class="pd__price">' + i18n.fmtPrice(product.price) + "</p>" +
        '<p class="pd__price-note">' + product.weight +
        (lang === "de" ? " · inkl. MwSt., zzgl. Versand" : " · incl. VAT, plus shipping") + "</p>" +
        '<p class="pd__desc">' + DATA.loc(product.desc, lang) + "</p>" +
        (isCoffee
          ? '<fieldset class="opt-group"><legend>' +
            (lang === "de" ? "Mahlung" : "Grind") +
            '</legend><div class="opt-pills" id="pd-grind">' +
            [["grind.whole", "whole"], ["grind.filter", "filter"], ["grind.espresso", "espresso"]]
              .map(function (g, idx) {
                return (
                  '<label class="opt-pill"><input type="radio" name="grind" value="' + g[0] + '"' +
                  (idx === 0 ? " checked" : "") + "><span>" + i18n.t(g[0]) + "</span></label>"
                );
              })
              .join("") +
            "</div></fieldset>"
          : "") +
        '<div class="pd__buy">' +
        '<div class="qty">' +
        '<button type="button" id="pd-minus" aria-label="' + i18n.t("cart.qty.less") + '">−</button>' +
        '<input id="pd-qty" value="1" inputmode="numeric" aria-label="Anzahl">' +
        '<button type="button" id="pd-plus" aria-label="' + i18n.t("cart.qty.more") + '">+</button>' +
        "</div>" +
        '<button class="btn btn--primary" type="button" id="pd-add">' +
        i18n.t("quiz.result.cta") +
        "</button>" +
        "</div>" +
        '<div class="pd__facts">' +
        Object.keys(facts)
          .map(function (k) {
            return "<div><strong>" + facts[k] + "</strong><span>" + k + "</span></div>";
          })
          .join("") +
        "</div>" +
        '<div class="accordion">' +
        "<details><summary>" +
        (lang === "de" ? "Versand & Frische" : "Shipping & freshness") +
        '</summary><div class="accordion__body">' +
        (lang === "de"
          ? "Geröstet wird jeden Dienstag, versendet am selben Tag. Ab 35 € liefern wir versandkostenfrei innerhalb Deutschlands (1–3 Werktage, klimaneutral)."
          : "We roast every Tuesday and ship the same day. Orders over €35 ship free within Germany (1–3 working days, carbon-neutral).") +
        "</div></details>" +
        "<details><summary>" +
        (lang === "de" ? "Herkunft & Partnerschaft" : "Origin & partnership") +
        '</summary><div class="accordion__body">' +
        (lang === "de"
          ? "Wir kaufen direkt und langfristig: feste Abnahmen, Preise deutlich über Fairtrade-Minimum, Besuche vor Ort. Mehr dazu im Journal."
          : "We buy directly and long-term: fixed volumes, prices well above the Fairtrade minimum, visits on site. More in the journal.") +
        "</div></details>" +
        "<details><summary>" +
        (lang === "de" ? "Zubereitungsempfehlung" : "Brew recommendation") +
        '</summary><div class="accordion__body">' +
        (lang === "de"
          ? "Unser V60-Referenzrezept: 18 g auf 300 g Wasser bei 94 °C, 3:30–4:00 Minuten. Für Espresso: 18 g auf 40 g in 26–30 Sekunden."
          : "Our V60 reference recipe: 18 g to 300 g of water at 94 °C, 3:30–4:00 minutes. For espresso: 18 g to 40 g in 26–30 seconds.") +
        "</div></details>" +
        "</div>" +
        "</div>";

      bindDetail();
      injectJsonLd(lang);
      renderRelated(lang, i18n);
    };

    var bindDetail = function () {
      var qtyInput = document.getElementById("pd-qty");
      document.getElementById("pd-minus").addEventListener("click", function () {
        qtyInput.value = Math.max(1, (parseInt(qtyInput.value, 10) || 1) - 1);
      });
      document.getElementById("pd-plus").addEventListener("click", function () {
        qtyInput.value = Math.min(99, (parseInt(qtyInput.value, 10) || 1) + 1);
      });
      document.getElementById("pd-add").addEventListener("click", function () {
        var grindInput = document.querySelector('#pd-grind input:checked');
        window.MARLOW_UI.addToCart(
          product.id,
          Math.max(1, parseInt(qtyInput.value, 10) || 1),
          grindInput ? grindInput.value : null
        );
      });
    };

    var renderRelated = function (lang, i18n) {
      var related = document.getElementById("related-grid");
      if (!related) return;
      related.innerHTML = DATA.products
        .filter(function (p) { return p.id !== product.id; })
        .slice(0, 3)
        .map(function (p) { return productCard(p, lang, i18n); })
        .join("");
    };

    var injectJsonLd = function (lang) {
      var old = document.getElementById("pd-jsonld");
      if (old) old.remove();
      var script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "pd-jsonld";
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: DATA.loc(product.name, lang),
        description: DATA.loc(product.desc, lang),
        image: location.origin + "/" + product.img,
        brand: { "@type": "Brand", name: "Marlow Coffee Roasters" },
        offers: {
          "@type": "Offer",
          price: product.price.toFixed(2),
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock"
        }
      });
      document.head.appendChild(script);
    };

    document.addEventListener("marlow:lang", renderDetail);
    renderDetail();
  }
})();
