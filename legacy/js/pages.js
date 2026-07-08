/* Marlow — Journal-Liste, Artikelseite, Kontakt-/B2B-Formulare (Demo) */

(function () {
  "use strict";

  var I = function () { return window.MARLOW_I18N; };
  var DATA = window.MARLOW;

  function postCard(article, lang, i18n, headingTag) {
    var h = headingTag || "h3";
    return (
      '<article class="post-card reveal is-visible">' +
      '<a class="post-card__img" href="artikel.html?id=' + article.id + '" tabindex="-1" aria-hidden="true">' +
      '<img src="' + article.img + '" alt="" loading="lazy" width="640" height="360">' +
      "</a>" +
      '<div class="post-card__body">' +
      '<p class="post-card__meta"><span class="post-card__tag">' + DATA.loc(article.tag, lang) + "</span>" +
      "<span>" + i18n.fmtDate(article.date) + "</span><span>·</span><span>" +
      article.minutes + " min</span></p>" +
      "<" + h + '><a href="artikel.html?id=' + article.id + '">' +
      DATA.loc(article.title, lang) + "</a></" + h + ">" +
      "<p>" + DATA.loc(article.excerpt, lang) + "</p>" +
      '<span class="post-card__more">' + (lang === "de" ? "Weiterlesen →" : "Read more →") + "</span>" +
      "</div></article>"
    );
  }

  /* ---------- Journal-Übersicht ---------- */

  var journalGrid = document.getElementById("journal-grid");
  if (journalGrid) {
    var renderJournal = function () {
      var i18n = I();
      var lang = i18n.lang;
      journalGrid.innerHTML = DATA.articles
        .slice()
        .sort(function (a, b) { return b.date.localeCompare(a.date); })
        .map(function (a) { return postCard(a, lang, i18n, "h2"); })
        .join("");
    };
    document.addEventListener("marlow:lang", renderJournal);
    renderJournal();
  }

  /* ---------- Journal-Teaser (Startseite) ---------- */

  var teaser = document.getElementById("journal-teaser");
  if (teaser) {
    var renderTeaser = function () {
      var i18n = I();
      var lang = i18n.lang;
      teaser.innerHTML = DATA.articles
        .slice()
        .sort(function (a, b) { return b.date.localeCompare(a.date); })
        .slice(0, 2)
        .map(function (a) { return postCard(a, lang, i18n); })
        .join("");
    };
    document.addEventListener("marlow:lang", renderTeaser);
    renderTeaser();
  }

  /* ---------- Artikelseite ---------- */

  var articleRoot = document.getElementById("article-root");
  if (articleRoot) {
    var params = new URLSearchParams(location.search);
    var article = DATA.articles.find(function (a) { return a.id === params.get("id"); }) ||
      DATA.articles[0];

    var renderArticle = function () {
      var i18n = I();
      var lang = i18n.lang;
      document.title = DATA.loc(article.title, lang) + " — Marlow Journal";

      articleRoot.innerHTML =
        '<header class="prose__head">' +
        '<p class="post-card__meta" style="justify-content:center"><span class="post-card__tag">' +
        DATA.loc(article.tag, lang) + "</span><span>" + i18n.fmtDate(article.date) +
        "</span><span>·</span><span>" + article.minutes + " min</span></p>" +
        "<h1>" + DATA.loc(article.title, lang) + "</h1>" +
        "</header>" +
        '<div class="media-band"><img src="' + article.img + '" alt="" width="1280" height="720"></div>' +
        DATA.loc(article.body, lang);

      var related = document.getElementById("article-related");
      if (related) {
        related.innerHTML = DATA.articles
          .filter(function (a) { return a.id !== article.id; })
          .slice(0, 2)
          .map(function (a) { return postCard(a, lang, i18n); })
          .join("");
      }
    };

    document.addEventListener("marlow:lang", renderArticle);
    renderArticle();
  }

  /* ---------- Demo-Formulare (Kontakt, B2B, Newsletter) ---------- */

  function bindDemoForm(id) {
    var form = document.getElementById(id);
    if (!form) return;
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var invalid = false;
      form.querySelectorAll("[required]").forEach(function (input) {
        var field = input.closest(".field");
        var bad = !input.value.trim() ||
          (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value));
        if (field) {
          field.classList.toggle("has-error", bad);
          var err = field.querySelector(".field__error");
          if (err) err.textContent = bad
            ? I().t(input.type === "email" && input.value.trim() ? "bk.err.email" : "bk.err.required")
            : "";
        }
        if (bad && !invalid) {
          invalid = true;
          input.focus();
        }
      });
      if (invalid) return;
      form.reset();
      window.MARLOW_UI.modal(I().t("form.sent.title"), I().t("form.sent.text"));
    });
  }

  bindDemoForm("contact-form");
  bindDemoForm("b2b-form");
  bindDemoForm("newsletter-form");
})();
