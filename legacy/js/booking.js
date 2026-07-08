/* Marlow — Reservierung: Kalender mit farblich markierten Öffnungstagen,
   Zeitslots aus den Öffnungszeiten, Validierung und Demo-Bestätigung. */

(function () {
  "use strict";

  var calGrid = document.getElementById("cal-grid");
  if (!calGrid) return;

  var I = function () { return window.MARLOW_I18N; };
  var S = window.MARLOW.settings;

  var calMonthEl = document.getElementById("cal-month");
  var prevBtn = document.getElementById("cal-prev");
  var nextBtn = document.getElementById("cal-next");
  var slotsBox = document.getElementById("bk-slots");
  var formBox = document.getElementById("bk-form-box");
  var form = document.getElementById("bk-form");
  var summaryEl = document.getElementById("bk-summary");
  var successBox = document.getElementById("bk-success");

  var today = new Date();
  today.setHours(0, 0, 0, 0);

  var view = { y: today.getFullYear(), m: today.getMonth() };
  var maxView = new Date(today.getFullYear(), today.getMonth() + 3, 1);
  var selectedDate = null;
  var selectedTime = null;

  function iso(d) {
    return d.getFullYear() + "-" +
      String(d.getMonth() + 1).padStart(2, "0") + "-" +
      String(d.getDate()).padStart(2, "0");
  }

  function isOpen(d) {
    if (S.closedDates.indexOf(iso(d)) !== -1) return false;
    return S.openDays.indexOf(d.getDay()) !== -1;
  }

  function localeOf() {
    return I().lang === "de" ? "de-DE" : "en-GB";
  }

  /* ---------- Kalender ---------- */

  function renderCalendar() {
    var locale = localeOf();
    var first = new Date(view.y, view.m, 1);

    calMonthEl.textContent = new Intl.DateTimeFormat(locale, {
      month: "long",
      year: "numeric"
    }).format(first);

    prevBtn.disabled = view.y === today.getFullYear() && view.m === today.getMonth();
    nextBtn.disabled = new Date(view.y, view.m + 1, 1) >= maxView;
    prevBtn.setAttribute("aria-label", I().t("bk.prev"));
    nextBtn.setAttribute("aria-label", I().t("bk.next"));

    /* Wochentagszeile, Montag zuerst */
    var dow = [];
    for (var i = 0; i < 7; i++) {
      var ref = new Date(2026, 5, 1 + i); /* 1. Juni 2026 = Montag */
      dow.push('<div class="cal__dow" aria-hidden="true">' +
        new Intl.DateTimeFormat(locale, { weekday: "short" }).format(ref).replace(".", "") +
        "</div>");
    }

    var cells = [];
    var lead = (first.getDay() + 6) % 7; /* Mo=0 … So=6 */
    for (var b = 0; b < lead; b++) cells.push("<div></div>");

    var daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
    for (var day = 1; day <= daysInMonth; day++) {
      var d = new Date(view.y, view.m, day);
      var classes = ["cal__day"];
      var disabled = false;
      var open = isOpen(d);

      if (d < today) { classes.push("is-past"); disabled = true; }
      else if (open) { classes.push("is-open"); }
      else { classes.push("is-closed"); disabled = true; }

      if (iso(d) === iso(today)) classes.push("is-today");
      if (selectedDate && iso(d) === iso(selectedDate)) classes.push("is-selected");

      var label = new Intl.DateTimeFormat(locale, {
        weekday: "long", day: "numeric", month: "long"
      }).format(d);

      cells.push(
        "<button type=\"button\" class=\"" + classes.join(" ") + "\"" +
        (disabled ? " disabled" : "") +
        ' data-date="' + iso(d) + '"' +
        ' aria-label="' + label + (open ? "" : " – " + (I().lang === "de" ? "geschlossen" : "closed")) + '"' +
        (selectedDate && iso(d) === iso(selectedDate) ? ' aria-pressed="true"' : "") +
        ">" + day + "</button>"
      );
    }

    calGrid.innerHTML = dow.join("") + cells.join("");
  }

  /* ---------- Zeitslots ---------- */

  function slotsFor(d) {
    var span = S.hours[d.getDay()];
    if (!span) return [];
    var out = [];
    var startH = parseInt(span[0].split(":")[0], 10);
    var startM = parseInt(span[0].split(":")[1], 10);
    var endH = parseInt(span[1].split(":")[0], 10);
    var cursor = new Date(d);
    cursor.setHours(startH, startM, 0, 0);
    var end = new Date(d);
    end.setHours(endH, 0, 0, 0);
    end.setMinutes(end.getMinutes() - 30); /* letzter Slot 30 min vor Schluss */

    var now = new Date();
    while (cursor <= end) {
      if (!(iso(d) === iso(today) && cursor <= now)) {
        out.push(String(cursor.getHours()).padStart(2, "0") + ":" +
          String(cursor.getMinutes()).padStart(2, "0"));
      }
      cursor.setMinutes(cursor.getMinutes() + S.slotMinutes);
    }
    return out;
  }

  function renderSlots() {
    var i18n = I();
    if (!selectedDate) {
      slotsBox.innerHTML = '<p class="slots__hint">' + i18n.t("bk.slots.hint") + "</p>";
      formBox.hidden = true;
      return;
    }
    var slots = slotsFor(selectedDate);
    slotsBox.innerHTML =
      '<div class="slots__grid" role="group">' +
      slots
        .map(function (s) {
          return (
            '<button type="button" class="slot" data-time="' + s + '"' +
            ' aria-pressed="' + (s === selectedTime ? "true" : "false") + '">' +
            s +
            "</button>"
          );
        })
        .join("") +
      "</div>";
    formBox.hidden = !selectedTime;
    renderSummary();
  }

  function renderSummary() {
    if (!selectedDate || !selectedTime || !summaryEl) return;
    var i18n = I();
    var persons = parseInt(document.getElementById("bk-persons").value, 10) || 2;
    summaryEl.querySelector("span").textContent = i18n.t("bk.summary", {
      date: i18n.fmtDate(selectedDate, { weekday: "long", day: "numeric", month: "long" }),
      time: selectedTime,
      persons: persons === 1 ? i18n.t("bk.person.one") : i18n.t("bk.person.many", { n: persons })
    });
  }

  /* ---------- Interaktion ---------- */

  prevBtn.addEventListener("click", function () {
    view.m -= 1;
    if (view.m < 0) { view.m = 11; view.y -= 1; }
    renderCalendar();
  });

  nextBtn.addEventListener("click", function () {
    view.m += 1;
    if (view.m > 11) { view.m = 0; view.y += 1; }
    renderCalendar();
  });

  calGrid.addEventListener("click", function (event) {
    var btn = event.target.closest(".cal__day");
    if (!btn || btn.disabled) return;
    selectedDate = new Date(btn.getAttribute("data-date") + "T12:00:00");
    selectedTime = null;
    renderCalendar();
    renderSlots();
  });

  slotsBox.addEventListener("click", function (event) {
    var slot = event.target.closest(".slot");
    if (!slot) return;
    selectedTime = slot.getAttribute("data-time");
    renderSlots();
    formBox.hidden = false;
    renderSummary();
    document.getElementById("bk-name").focus();
  });

  document.getElementById("bk-persons").addEventListener("change", renderSummary);

  /* ---------- Absenden ---------- */

  function setError(fieldId, message) {
    var field = document.getElementById(fieldId).closest(".field");
    field.classList.toggle("has-error", !!message);
    field.querySelector(".field__error").textContent = message || "";
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var i18n = I();
    var name = document.getElementById("bk-name");
    var email = document.getElementById("bk-email");
    var valid = true;

    if (!selectedDate || !selectedTime) {
      window.MARLOW_UI.toast(i18n.t("bk.err.slot"));
      return;
    }
    if (!name.value.trim()) {
      setError("bk-name", i18n.t("bk.err.required"));
      valid = false;
    } else setError("bk-name", "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      setError("bk-email", i18n.t("bk.err.email"));
      valid = false;
    } else setError("bk-email", "");

    if (!valid) {
      (form.querySelector(".has-error input") || name).focus();
      return;
    }

    var code = "MRLW-" + Math.random().toString(36).slice(2, 6).toUpperCase();
    var booking = {
      code: code,
      date: iso(selectedDate),
      time: selectedTime,
      persons: document.getElementById("bk-persons").value,
      name: name.value.trim(),
      email: email.value.trim(),
      note: document.getElementById("bk-note").value.trim()
    };
    try {
      var all = JSON.parse(localStorage.getItem("marlow_bookings") || "[]");
      all.push(booking);
      localStorage.setItem("marlow_bookings", JSON.stringify(all));
    } catch (e) { /* noop */ }

    document.getElementById("bk-flow").hidden = true;
    successBox.hidden = false;
    successBox.querySelector(".js-bk-success-title").textContent = i18n.t("bk.success.title");
    successBox.querySelector(".js-bk-success-text").textContent =
      i18n.t("bk.success.text", { email: booking.email });
    successBox.querySelector(".js-bk-summary").textContent = i18n.t("bk.summary", {
      date: i18n.fmtDate(selectedDate, { weekday: "long", day: "numeric", month: "long" }),
      time: selectedTime,
      persons: booking.persons === "1"
        ? i18n.t("bk.person.one")
        : i18n.t("bk.person.many", { n: booking.persons })
    });
    successBox.querySelector(".bk-code").textContent =
      i18n.t("bk.success.code") + ": " + code;
    successBox.querySelector(".js-bk-new").textContent = i18n.t("bk.new");
    successBox.focus();
  });

  successBox.querySelector(".js-bk-new").addEventListener("click", function () {
    selectedDate = null;
    selectedTime = null;
    form.reset();
    successBox.hidden = true;
    document.getElementById("bk-flow").hidden = false;
    renderCalendar();
    renderSlots();
  });

  document.addEventListener("marlow:lang", function () {
    renderCalendar();
    renderSlots();
  });

  renderCalendar();
  renderSlots();
})();
