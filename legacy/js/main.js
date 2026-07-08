/* Marlow — globales Verhalten: Header, Warenkorb, Reveals, Toast/Modal, Röst-Ticker */

(function () {
  "use strict";

  var I = function () { return window.MARLOW_I18N; };
  var DATA = function () { return window.MARLOW; };

  /* ---------- Header: Mobile-Nav + Scroll-Schatten ---------- */

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function closeNav() {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", I().t("nav.open"));
    nav.classList.remove("is-open");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", I().t(open ? "nav.open" : "nav.close"));
      nav.classList.toggle("is-open", !open);
    });
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeNav();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        closeNav();
        toggle.focus();
      }
    });
  }

  var header = document.querySelector(".header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Scroll-Reveals ---------- */

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var revealItems = document.querySelectorAll(".reveal");

  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    revealItems.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    revealItems.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Fußzeile: Jahr ---------- */

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- Toast + Modal ---------- */

  var toastEl = null;
  var toastTimer = null;

  function toast(message) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      toastEl.setAttribute("role", "status");
      toastEl.setAttribute("aria-live", "polite");
      toastEl.innerHTML =
        '<svg aria-hidden="true"><use href="#i-check"/></svg><span></span>';
      document.body.appendChild(toastEl);
    }
    toastEl.querySelector("span").textContent = message;
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove("is-visible");
    }, 3500);
  }

  var modalEl = null;

  function modal(title, text) {
    if (!modalEl) {
      modalEl = document.createElement("div");
      modalEl.className = "modal";
      modalEl.setAttribute("role", "dialog");
      modalEl.setAttribute("aria-modal", "true");
      modalEl.setAttribute("aria-labelledby", "modal-title");
      modalEl.innerHTML =
        '<div class="modal__card">' +
        '<div class="modal__icon"><svg aria-hidden="true"><use href="#i-check"/></svg></div>' +
        '<h2 id="modal-title" style="font-size:1.5rem"></h2>' +
        '<p style="color:var(--roast)"></p>' +
        '<button class="btn btn--primary js-modal-close" type="button"></button>' +
        "</div>";
      document.body.appendChild(modalEl);
      modalEl.addEventListener("click", function (event) {
        if (event.target.closest(".js-modal-close") || event.target === modalEl) {
          hideModal();
        }
      });
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") hideModal();
      });
    }
    modalEl.querySelector("h2").textContent = title;
    modalEl.querySelector("p").textContent = text;
    modalEl.querySelector(".js-modal-close").textContent = I().t("modal.ok");
    scrim(true);
    modalEl.classList.add("is-open");
    modalEl.querySelector(".js-modal-close").focus();
  }

  function hideModal() {
    if (modalEl && modalEl.classList.contains("is-open")) {
      modalEl.classList.remove("is-open");
      if (!drawerEl || !drawerEl.classList.contains("is-open")) scrim(false);
    }
  }

  /* ---------- Scrim ---------- */

  var scrimEl = null;

  function scrim(show) {
    if (!scrimEl) {
      scrimEl = document.createElement("div");
      scrimEl.className = "scrim";
      document.body.appendChild(scrimEl);
      scrimEl.addEventListener("click", function () {
        hideModal();
        closeCart();
      });
    }
    scrimEl.classList.toggle("is-open", !!show);
  }

  /* ---------- Warenkorb ---------- */

  var CART_KEY = "marlow_cart";
  var drawerEl = null;

  function readCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function writeCart(items) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch (e) { /* noop */ }
    updateBadge();
    renderCart();
  }

  function productById(id) {
    return DATA().products.find(function (p) { return p.id === id; });
  }

  function cartCount() {
    return readCart().reduce(function (sum, it) { return sum + it.qty; }, 0);
  }

  function cartSubtotal() {
    return readCart().reduce(function (sum, it) {
      var p = productById(it.id);
      return p ? sum + p.price * it.qty : sum;
    }, 0);
  }

  function updateBadge() {
    var n = cartCount();
    document.querySelectorAll(".cart-count").forEach(function (el) {
      el.textContent = String(n);
      if (n > 0) el.removeAttribute("hidden");
      else el.setAttribute("hidden", "");
    });
  }

  function ensureDrawer() {
    if (drawerEl) return;
    drawerEl = document.createElement("aside");
    drawerEl.className = "drawer";
    drawerEl.setAttribute("aria-label", I().t("cart.title"));
    drawerEl.innerHTML =
      '<div class="drawer__head">' +
      '<h2 class="js-cart-title"></h2>' +
      '<button class="icon-btn js-cart-close" type="button"><svg aria-hidden="true"><use href="#i-close"/></svg></button>' +
      "</div>" +
      '<div class="drawer__body"></div>' +
      '<div class="drawer__foot" hidden>' +
      '<div class="shipbar"><span class="js-ship-label"></span><div class="shipbar__track"><div class="shipbar__fill"></div></div></div>' +
      '<div class="drawer__total"><span class="js-subtotal-label"></span><span class="js-subtotal"></span></div>' +
      '<button class="btn btn--primary js-checkout" type="button"></button>' +
      "</div>";
    document.body.appendChild(drawerEl);

    drawerEl.querySelector(".js-cart-close").addEventListener("click", closeCart);
    drawerEl.querySelector(".js-checkout").addEventListener("click", function () {
      closeCart();
      modal(I().t("checkout.title"), I().t("checkout.text"));
    });
    drawerEl.addEventListener("click", function (event) {
      var minus = event.target.closest(".js-qty-minus");
      var plus = event.target.closest(".js-qty-plus");
      var remove = event.target.closest(".js-remove");
      if (!minus && !plus && !remove) return;
      var row = event.target.closest("[data-index]");
      var index = Number(row.getAttribute("data-index"));
      var items = readCart();
      if (minus) items[index].qty = Math.max(1, items[index].qty - 1);
      if (plus) items[index].qty = Math.min(99, items[index].qty + 1);
      if (remove) items.splice(index, 1);
      writeCart(items);
    });
  }

  function renderCart() {
    if (!drawerEl) return;
    var i18n = I();
    var lang = i18n.lang;
    var loc = DATA().loc;
    var items = readCart();

    drawerEl.querySelector(".js-cart-title").textContent = i18n.t("cart.title");
    drawerEl.querySelector(".js-cart-close").setAttribute("aria-label", i18n.t("cart.close"));

    var body = drawerEl.querySelector(".drawer__body");
    var foot = drawerEl.querySelector(".drawer__foot");

    if (!items.length) {
      body.innerHTML =
        '<div class="drawer__empty">' +
        '<svg aria-hidden="true"><use href="#i-bean"/></svg>' +
        "<p>" + i18n.t("cart.empty") + "</p>" +
        '<a class="btn btn--primary" href="shop.html">' + i18n.t("cart.empty.cta") + "</a>" +
        "</div>";
      foot.setAttribute("hidden", "");
      return;
    }

    body.innerHTML = items
      .map(function (it, index) {
        var p = productById(it.id);
        if (!p) return "";
        var meta = [p.weight];
        if (it.grind) meta.push(i18n.t(it.grind));
        return (
          '<div class="cart-item" data-index="' + index + '">' +
          '<img src="' + p.img + '" alt="" width="72" height="84">' +
          "<div>" +
          '<p class="cart-item__name">' + loc(p.name, lang) + "</p>" +
          '<p class="cart-item__meta">' + meta.join(" · ") + "</p>" +
          '<div class="qty" style="margin-top:.375rem">' +
          '<button type="button" class="js-qty-minus" aria-label="' + i18n.t("cart.qty.less") + '">−</button>' +
          '<input value="' + it.qty + '" readonly aria-label="Anzahl">' +
          '<button type="button" class="js-qty-plus" aria-label="' + i18n.t("cart.qty.more") + '">+</button>' +
          "</div>" +
          "</div>" +
          "<div>" +
          '<p class="cart-item__price">' + i18n.fmtPrice(p.price * it.qty) + "</p>" +
          '<button type="button" class="cart-item__remove js-remove">' + i18n.t("cart.remove") + "</button>" +
          "</div>" +
          "</div>"
        );
      })
      .join("");

    foot.removeAttribute("hidden");
    var subtotal = cartSubtotal();
    var target = DATA().settings.freeShippingFrom;
    var shipLabel = drawerEl.querySelector(".js-ship-label");
    var fill = drawerEl.querySelector(".shipbar__fill");
    if (subtotal >= target) {
      shipLabel.textContent = i18n.t("cart.ship.free");
      fill.style.width = "100%";
    } else {
      shipLabel.textContent = i18n.t("cart.ship.progress", {
        amount: i18n.fmtPrice(target - subtotal)
      });
      fill.style.width = Math.round((subtotal / target) * 100) + "%";
    }
    drawerEl.querySelector(".js-subtotal-label").textContent = i18n.t("cart.subtotal");
    drawerEl.querySelector(".js-subtotal").textContent = i18n.fmtPrice(subtotal);
  }

  function openCart() {
    ensureDrawer();
    renderCart();
    scrim(true);
    drawerEl.classList.add("is-open");
    drawerEl.querySelector(".js-cart-close").focus();
  }

  function closeCart() {
    if (drawerEl && drawerEl.classList.contains("is-open")) {
      drawerEl.classList.remove("is-open");
      if (!modalEl || !modalEl.classList.contains("is-open")) scrim(false);
    }
  }

  function addToCart(id, qty, grind) {
    var p = productById(id);
    if (!p) return;
    var items = readCart();
    var existing = items.find(function (it) {
      return it.id === id && it.grind === (grind || null);
    });
    if (existing) existing.qty = Math.min(99, existing.qty + (qty || 1));
    else items.push({ id: id, qty: qty || 1, grind: grind || null });
    writeCart(items);
    toast(I().t("cart.added", { name: DATA().loc(p.name, I().lang) }));
  }

  /* Delegierte Klicks: Warenkorb öffnen + „In den Warenkorb“-Buttons */
  document.addEventListener("click", function (event) {
    if (event.target.closest(".js-cart-open")) {
      event.preventDefault();
      openCart();
    }
    var add = event.target.closest("[data-add-to-cart]");
    if (add) {
      event.preventDefault();
      addToCart(add.getAttribute("data-add-to-cart"), 1, add.getAttribute("data-grind"));
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeCart();
  });

  document.addEventListener("marlow:lang", function () {
    renderCart();
    renderRoastTicker();
  });

  updateBadge();

  /* ---------- Röst-Ticker (nächster Rösttag + Chargen-Nr.) ---------- */

  function renderRoastTicker() {
    var el = document.querySelector("[data-roast-ticker]");
    if (!el) return;
    var i18n = I();
    var s = DATA().settings;
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    var daysUntil = (s.roastWeekday - today.getDay() + 7) % 7;
    var nextRoast = new Date(today);
    nextRoast.setDate(today.getDate() + daysUntil);

    /* Chargen-Nr.: Röstwochen seit Gründung im März 2014, 2 Chargen/Woche */
    var founding = new Date(2014, 2, 4);
    var weeks = Math.floor((today - founding) / (7 * 24 * 3600 * 1000));
    var batch = 1200 + weeks * 2;

    el.querySelector(".js-roast-date").textContent =
      daysUntil === 0
        ? i18n.t("roast.today")
        : i18n.fmtDate(nextRoast, { weekday: "long", day: "numeric", month: "long" });
    el.querySelector(".js-roast-count").textContent =
      daysUntil === 0
        ? i18n.t("roast.today")
        : daysUntil === 1
          ? i18n.t("roast.in.one")
          : i18n.t("roast.in.days", { n: daysUntil });
    el.querySelector(".js-roast-batch").textContent = "#" + batch.toLocaleString(
      i18n.lang === "de" ? "de-DE" : "en-GB"
    );
  }

  document.addEventListener("DOMContentLoaded", renderRoastTicker);

  /* ---------- Öffentliche API ---------- */

  window.MARLOW_UI = {
    toast: toast,
    modal: modal,
    addToCart: addToCart,
    openCart: openCart,
    renderCart: renderCart
  };
})();
