/* Marlow — Abo-Konfigurator: Rhythmus + Menge + Sorte → Live-Preis */

(function () {
  "use strict";

  var root = document.getElementById("abo-form");
  if (!root) return;

  var I = function () { return window.MARLOW_I18N; };
  var DATA = window.MARLOW;

  var SIZE_FACTOR = { "250": 1, "500": 1.9, "1000": 3.6 };
  var ROASTERS_CHOICE_BASE = 13.5;

  function currentCoffee() {
    var val = root.querySelector('input[name="abo-coffee"]:checked').value;
    if (val === "roasters") return null;
    return DATA.products.find(function (p) { return p.id === val; });
  }

  function render() {
    var i18n = I();
    var lang = i18n.lang;
    var coffee = currentCoffee();
    var size = root.querySelector('input[name="abo-size"]:checked').value;
    var rhythmVal = root.querySelector('input[name="abo-rhythm"]:checked').value;

    var base = coffee ? coffee.price : ROASTERS_CHOICE_BASE;
    var full = base * SIZE_FACTOR[size];
    var discounted = full * (1 - DATA.settings.aboDiscount);

    var rhythmKey = rhythmVal === "7" ? "abo.week" : rhythmVal === "14" ? "abo.biweek" : "abo.month";
    var coffeeName = coffee ? DATA.loc(coffee.name, lang) : i18n.t("abo.roasters");
    var sizeLabel = size === "1000" ? "1 kg" : size + " g";

    document.getElementById("abo-sum-coffee").textContent = coffeeName;
    document.getElementById("abo-sum-rhythm").textContent = i18n.t(rhythmKey);
    document.getElementById("abo-sum-size").textContent = sizeLabel;
    document.getElementById("abo-price").textContent = i18n.fmtPrice(discounted);
    document.getElementById("abo-price-old").textContent = i18n.fmtPrice(full);
    document.getElementById("abo-save").textContent = i18n.t("abo.save", {
      amount: i18n.fmtPrice(full - discounted)
    });
  }

  root.addEventListener("change", render);
  document.addEventListener("marlow:lang", render);

  document.getElementById("abo-submit").addEventListener("click", function () {
    var i18n = I();
    window.MARLOW_UI.modal(i18n.t("abo.success.title"), i18n.t("abo.success.text"));
  });

  render();
})();
