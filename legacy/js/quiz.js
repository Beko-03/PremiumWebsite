/* Marlow — Coffee-Finder-Quiz (3 Fragen → Röstungs-Empfehlung) */

(function () {
  "use strict";

  var root = document.getElementById("quiz-root");
  if (!root) return;

  var I = function () { return window.MARLOW_I18N; };
  var DATA = window.MARLOW;

  var state = { step: 0, answers: [] };

  var QUESTIONS = [
    {
      q: "quiz.q1",
      options: [
        { key: "quiz.q1.a", value: "filter", icon: "#i-cup" },
        { key: "quiz.q1.b", value: "espresso", icon: "#i-flame" },
        { key: "quiz.q1.c", value: "auto", icon: "#i-bean" },
        { key: "quiz.q1.d", value: "immersion", icon: "#i-clock" }
      ]
    },
    {
      q: "quiz.q2",
      options: [
        { key: "quiz.q2.a", value: "fruity", icon: "#i-leaf" },
        { key: "quiz.q2.b", value: "choco", icon: "#i-bean" },
        { key: "quiz.q2.c", value: "bold", icon: "#i-flame" }
      ]
    },
    {
      q: "quiz.q3",
      options: [
        { key: "quiz.q3.a", value: "black", icon: "#i-cup" },
        { key: "quiz.q3.b", value: "milk", icon: "#i-star" }
      ]
    }
  ];

  function recommend(answers) {
    var brew = answers[0];
    var taste = answers[1];
    var milk = answers[2] === "milk";

    if (brew === "espresso") return "marlow-no1";
    if (taste === "bold") return "marlow-no1";
    if (taste === "fruity") return milk ? "la-esperanza" : "buku-hambela";
    return "la-esperanza";
  }

  function render() {
    var i18n = I();

    if (state.step >= QUESTIONS.length) {
      var product = DATA.products.find(function (p) {
        return p.id === recommend(state.answers);
      });
      var lang = i18n.lang;
      root.innerHTML =
        '<div class="quiz__result">' +
        '<img src="' + product.img + '" alt="' + DATA.loc(product.name, lang) + '">' +
        '<p class="eyebrow" style="justify-content:center">' + i18n.t("quiz.result.eyebrow") + "</p>" +
        '<p class="product-card__origin">' + DATA.loc(product.origin, lang) + "</p>" +
        "<h3>" + DATA.loc(product.name, lang) + "</h3>" +
        "<p>" + i18n.t("quiz.result.text") + "</p>" +
        '<div style="display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap">' +
        '<button class="btn btn--light" type="button" data-add-to-cart="' + product.id + '">' +
        i18n.t("quiz.result.cta") + " · " + i18n.fmtPrice(product.price) +
        "</button>" +
        '<a class="btn vhero__btn-ghost btn--ghost" href="produkt.html?id=' + product.id + '">' +
        i18n.t("quiz.result.more") +
        "</a>" +
        "</div>" +
        '<button class="quiz__back js-quiz-restart" type="button">' + i18n.t("quiz.restart") + "</button>" +
        "</div>";
      return;
    }

    var question = QUESTIONS[state.step];
    root.innerHTML =
      '<div class="quiz__progress" aria-hidden="true">' +
      QUESTIONS.map(function (_, i) {
        return "<i" + (i <= state.step ? ' class="is-done"' : "") + "></i>";
      }).join("") +
      "</div>" +
      '<p class="quiz__q">' + i18n.t(question.q) + "</p>" +
      '<div class="quiz__opts" role="group" aria-label="' + i18n.t(question.q) + '">' +
      question.options
        .map(function (opt) {
          return (
            '<button class="quiz__opt" type="button" data-value="' + opt.value + '">' +
            '<svg aria-hidden="true"><use href="' + opt.icon + '"/></svg>' +
            "<span>" + i18n.t(opt.key) + "</span>" +
            "</button>"
          );
        })
        .join("") +
      "</div>" +
      (state.step > 0
        ? '<button class="quiz__back js-quiz-back" type="button">← ' + i18n.t("quiz.back") + "</button>"
        : "");
  }

  root.addEventListener("click", function (event) {
    var opt = event.target.closest(".quiz__opt");
    if (opt) {
      state.answers[state.step] = opt.getAttribute("data-value");
      state.step += 1;
      render();
      return;
    }
    if (event.target.closest(".js-quiz-back")) {
      state.step = Math.max(0, state.step - 1);
      render();
    }
    if (event.target.closest(".js-quiz-restart")) {
      state = { step: 0, answers: [] };
      render();
    }
  });

  document.addEventListener("marlow:lang", render);
  render();
})();
