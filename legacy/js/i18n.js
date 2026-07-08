/* Marlow — Zweisprachigkeit (DE Standard, EN via Umschalter).
   Statisches HTML ist deutsch; EN-Übersetzungen liegen in js/i18n.en.js
   (window.MARLOW_I18N_EN). Deutsche Originale werden beim ersten Wechsel
   aus dem DOM gecacht, sodass verlustfrei zurückgeschaltet werden kann. */

(function () {
  "use strict";

  var EN = window.MARLOW_I18N_EN || {};

  /* Strings, die per JavaScript erzeugt werden (Warenkorb, Buchung, Quiz …) */
  var S = {
    "cart.title": { de: "Warenkorb", en: "Cart" },
    "cart.close": { de: "Warenkorb schließen", en: "Close cart" },
    "cart.empty": { de: "Dein Warenkorb ist noch leer.", en: "Your cart is still empty." },
    "cart.empty.cta": { de: "Zum Shop", en: "Go to shop" },
    "cart.subtotal": { de: "Zwischensumme", en: "Subtotal" },
    "cart.checkout": { de: "Zur Kasse (Demo)", en: "Checkout (demo)" },
    "cart.remove": { de: "Entfernen", en: "Remove" },
    "cart.ship.progress": { de: "Noch {amount} bis zum Gratisversand", en: "{amount} away from free shipping" },
    "cart.ship.free": { de: "Gratisversand freigeschaltet", en: "Free shipping unlocked" },
    "cart.added": { de: "{name} liegt im Warenkorb", en: "{name} added to cart" },
    "cart.qty.less": { de: "Menge verringern", en: "Decrease quantity" },
    "cart.qty.more": { de: "Menge erhöhen", en: "Increase quantity" },
    "checkout.title": { de: "Demo-Checkout", en: "Demo checkout" },
    "checkout.text": {
      de: "In der Live-Version übergibt der Shop hier an Ihren Zahlungsanbieter (z. B. Stripe, PayPal oder Shopify Payments). Diese Vorlage zeigt den kompletten Weg bis zur Kasse.",
      en: "In the live version the shop hands over to your payment provider here (e.g. Stripe, PayPal or Shopify Payments). This template demonstrates the full journey up to checkout."
    },
    "modal.ok": { de: "Alles klar", en: "Got it" },
    "grind.whole": { de: "Ganze Bohne", en: "Whole bean" },
    "grind.filter": { de: "Filter", en: "Filter" },
    "grind.espresso": { de: "Espresso", en: "Espresso" },

    "bk.slots.title": { de: "2. Uhrzeit wählen", en: "2. Choose a time" },
    "bk.slots.hint": { de: "Bitte wähle zuerst links einen geöffneten Tag.", en: "Please pick an open day on the left first." },
    "bk.closed.sun": { de: "Sonntags rösten wir — das Café ist geschlossen.", en: "On Sundays we roast — the café is closed." },
    "bk.closed.holiday": { de: "An diesem Tag haben wir geschlossen.", en: "We are closed on this day." },
    "bk.summary": { de: "{date}, {time} Uhr · {persons}", en: "{date} at {time} · {persons}" },
    "bk.person.one": { de: "1 Person", en: "1 person" },
    "bk.person.many": { de: "{n} Personen", en: "{n} people" },
    "bk.success.title": { de: "Reservierung bestätigt!", en: "Reservation confirmed!" },
    "bk.success.text": {
      de: "Wir haben deinen Tisch reserviert. Eine Bestätigung ginge in der Live-Version jetzt per E-Mail an {email}.",
      en: "Your table is booked. In the live version a confirmation e-mail would now go to {email}."
    },
    "bk.success.code": { de: "Buchungscode", en: "Booking code" },
    "bk.new": { de: "Weitere Reservierung", en: "Make another reservation" },
    "bk.err.required": { de: "Bitte fülle dieses Feld aus.", en: "Please fill in this field." },
    "bk.err.email": { de: "Bitte gib eine gültige E-Mail-Adresse an.", en: "Please enter a valid e-mail address." },
    "bk.err.slot": { de: "Bitte wähle Datum und Uhrzeit.", en: "Please choose a date and time." },
    "bk.prev": { de: "Vorheriger Monat", en: "Previous month" },
    "bk.next": { de: "Nächster Monat", en: "Next month" },

    "quiz.q1": { de: "Wie bereitest du deinen Kaffee zu?", en: "How do you brew your coffee?" },
    "quiz.q1.a": { de: "Handfilter / Pour Over", en: "Pour-over / filter" },
    "quiz.q1.b": { de: "Siebträger / Espresso", en: "Espresso machine" },
    "quiz.q1.c": { de: "Vollautomat", en: "Bean-to-cup machine" },
    "quiz.q1.d": { de: "French Press / Cold Brew", en: "French press / cold brew" },
    "quiz.q2": { de: "Welche Richtung darf es geschmacklich sein?", en: "Which flavour direction do you prefer?" },
    "quiz.q2.a": { de: "Fruchtig & floral", en: "Fruity & floral" },
    "quiz.q2.b": { de: "Schokoladig & süß", en: "Chocolatey & sweet" },
    "quiz.q2.c": { de: "Kräftig & dunkel", en: "Bold & dark" },
    "quiz.q3": { de: "Wie trinkst du ihn meistens?", en: "How do you usually drink it?" },
    "quiz.q3.a": { de: "Schwarz", en: "Black" },
    "quiz.q3.b": { de: "Mit Milch oder Hafer", en: "With milk or oat" },
    "quiz.back": { de: "Zurück", en: "Back" },
    "quiz.result.eyebrow": { de: "Deine Empfehlung", en: "Our pick for you" },
    "quiz.result.text": { de: "Passt zu deiner Zubereitung und deinem Geschmack — frisch geröstet am nächsten Dienstag.", en: "Matched to your brew method and taste — freshly roasted next Tuesday." },
    "quiz.result.cta": { de: "In den Warenkorb", en: "Add to cart" },
    "quiz.result.more": { de: "Zum Produkt", en: "View product" },
    "quiz.restart": { de: "Quiz neu starten", en: "Restart quiz" },

    "abo.week": { de: "Wöchentlich", en: "Weekly" },
    "abo.biweek": { de: "Alle 14 Tage", en: "Every 14 days" },
    "abo.month": { de: "Monatlich", en: "Monthly" },
    "abo.roasters": { de: "Röster-Wahl (Überraschung)", en: "Roaster's choice (surprise)" },
    "abo.per.delivery": { de: "pro Lieferung", en: "per delivery" },
    "abo.save": { de: "Du sparst {amount} pro Lieferung (10 % Abo-Vorteil)", en: "You save {amount} per delivery (10% subscription perk)" },
    "abo.success.title": { de: "Abo angelegt (Demo)", en: "Subscription created (demo)" },
    "abo.success.text": {
      de: "In der Live-Version startet hier das Abo mit Kundenkonto, Pause- und Kündigungsfunktion. Erste Lieferung: nächster Rösttag.",
      en: "In the live version the subscription starts here with a customer account, pause and cancel options. First delivery: next roast day."
    },

    "form.sent.title": { de: "Nachricht gesendet (Demo)", en: "Message sent (demo)" },
    "form.sent.text": {
      de: "Danke! In der Live-Version landet diese Anfrage direkt im Postfach bzw. CRM des Teams.",
      en: "Thank you! In the live version this enquiry goes straight to the team's inbox or CRM."
    },

    "roast.today": { de: "Heute wird geröstet!", en: "We are roasting today!" },
    "roast.batch": { de: "Charge", en: "Batch" },
    "roast.next": { de: "Nächster Rösttag", en: "Next roast day" },
    "roast.in.days": { de: "in {n} Tagen", en: "in {n} days" },
    "roast.in.one": { de: "morgen", en: "tomorrow" },
    "nav.open": { de: "Menü öffnen", en: "Open menu" },
    "nav.close": { de: "Menü schließen", en: "Close menu" }
  };

  var STORAGE_KEY = "marlow_lang";
  var lang = "de";
  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "de") lang = saved;
  } catch (e) { /* Storage evtl. blockiert */ }

  var deCache = new WeakMap();

  function t(key, vars) {
    var entry = S[key];
    var str = entry ? (entry[lang] || entry.de) : key;
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        str = str.replace("{" + k + "}", vars[k]);
      });
    }
    return str;
  }

  function fmtPrice(n) {
    return new Intl.NumberFormat(lang === "de" ? "de-DE" : "en-GB", {
      style: "currency",
      currency: "EUR"
    }).format(n);
  }

  function fmtDate(dateLike, opts) {
    var d = typeof dateLike === "string" ? new Date(dateLike + "T12:00:00") : dateLike;
    return new Intl.DateTimeFormat(
      lang === "de" ? "de-DE" : "en-GB",
      opts || { year: "numeric", month: "long", day: "numeric" }
    ).format(d);
  }

  function applyToDom() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!deCache.has(el)) deCache.set(el, el.innerHTML);
      if (lang === "en") {
        if (EN[key] != null) el.innerHTML = EN[key];
      } else {
        el.innerHTML = deCache.get(el);
      }
    });

    ["placeholder", "aria-label", "content", "title"].forEach(function (attr) {
      var sel = "[data-i18n-" + attr + "]";
      document.querySelectorAll(sel).forEach(function (el) {
        var key = el.getAttribute("data-i18n-" + attr);
        var cacheKey = "i18nDe" + attr.replace(/[^a-z]/g, "");
        if (el.dataset[cacheKey] == null) el.dataset[cacheKey] = el.getAttribute(attr) || "";
        if (lang === "en") {
          if (EN[key] != null) el.setAttribute(attr, EN[key]);
        } else {
          el.setAttribute(attr, el.dataset[cacheKey]);
        }
      });
    });

    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll(".js-lang-toggle").forEach(function (btn) {
      btn.textContent = lang === "de" ? "EN" : "DE";
      btn.setAttribute(
        "aria-label",
        lang === "de" ? "Switch language to English" : "Sprache auf Deutsch umstellen"
      );
    });
  }

  function setLang(next) {
    lang = next === "en" ? "en" : "de";
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* noop */ }
    applyToDom();
    document.dispatchEvent(new CustomEvent("marlow:lang", { detail: { lang: lang } }));
  }

  document.addEventListener("click", function (event) {
    var btn = event.target.closest(".js-lang-toggle");
    if (btn) setLang(lang === "de" ? "en" : "de");
  });

  document.addEventListener("DOMContentLoaded", applyToDom);

  window.MARLOW_I18N = {
    get lang() { return lang; },
    t: t,
    fmtPrice: fmtPrice,
    fmtDate: fmtDate,
    setLang: setLang,
    refresh: applyToDom
  };
})();
