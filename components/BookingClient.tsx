"use client";

/* Reservierung: Kalender mit farblich markierten Öffnungstagen,
   Zeitslots aus den Öffnungszeiten, Validierung und Demo-Bestätigung. */

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Reveal from "@/components/Reveal";
import { settings } from "@/lib/data";
import { useI18n } from "@/lib/i18n";
import { useUi } from "@/lib/ui";

const T = {
  eyebrow: { de: "Rösterei-Café · Hafenstraße 12", en: "Roastery café · Hafenstraße 12" },
  title: { de: "Tisch reservieren", en: "Book a table" },
  lede: {
    de: "Wähle einen unserer geöffneten Tage — sie sind farblich markiert — und sichere dir deinen Zeitslot. Die Bestätigung kommt sofort.",
    en: "Pick one of our open days — they are highlighted in colour — and secure your time slot. Confirmation is instant.",
  },
  step1: { de: "1. Tag wählen", en: "1. Choose a day" },
  step3: { de: "3. Deine Daten", en: "3. Your details" },
  lgOpen: { de: "Geöffnet", en: "Open" },
  lgClosed: { de: "Geschlossen", en: "Closed" },
  lgSelected: { de: "Deine Auswahl", en: "Your selection" },
  fPersons: { de: "Personen", en: "Guests" },
  fPersonsHint: {
    de: "Mehr als 8 Personen? Schreib uns kurz an hello@marlow.coffee.",
    en: "More than 8 people? Drop us a line at hello@marlow.coffee.",
  },
  fName: { de: "Name", en: "Name" },
  fEmail: { de: "E-Mail", en: "E-mail" },
  fNote: { de: "Anmerkung (optional)", en: "Note (optional)" },
  fNotePh: { de: "Kinderstuhl, Fensterplatz, Überraschung …", en: "High chair, window seat, surprise …" },
  submit: { de: "Verbindlich reservieren", en: "Confirm reservation" },
  info1t: { de: "So findest du uns", en: "How to find us" },
  info2t: { de: "Öffnungszeiten", en: "Opening hours" },
  info3t: { de: "Gut zu wissen", en: "Good to know" },
  info3p: {
    de: "Reservierungen halten wir 15 Minuten frei. Öffentliches Cupping: jeden ersten Samstag um 10 Uhr — ohne Anmeldung, kostenlos.",
    en: "We hold reservations for 15 minutes. Public cupping: every first Saturday at 10 am — free, no sign-up needed.",
  },
};

function iso(d: Date): string {
  return (
    d.getFullYear() +
    "-" +
    String(d.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(d.getDate()).padStart(2, "0")
  );
}

function isOpenDay(d: Date): boolean {
  if (settings.closedDates.includes(iso(d))) return false;
  return settings.openDays.includes(d.getDay());
}

interface BookingSuccess {
  code: string;
  dateLabel: string;
  email: string;
}

export default function BookingClient() {
  const { L, t, fmtDate, locale } = useI18n();
  const { toast } = useUi();

  /* Datum erst nach dem Mount berechnen (SSG-HTML ist datumsunabhängig) */
  const [today, setToday] = useState<Date | null>(null);
  const [view, setView] = useState<{ y: number; m: number } | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [persons, setPersons] = useState("2");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [success, setSuccess] = useState<BookingSuccess | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const now = new Date();
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    setToday(d);
    setView({ y: d.getFullYear(), m: d.getMonth() });
  }, []);

  useEffect(() => {
    if (success) successRef.current?.focus();
  }, [success]);

  const summaryText = (personsValue: string, date: Date, time: string) =>
    t("bk.summary", {
      date: fmtDate(date, { weekday: "long", day: "numeric", month: "long" }),
      time,
      persons:
        personsValue === "1" ? t("bk.person.one") : t("bk.person.many", { n: personsValue }),
    });

  /* ---------- Zeitslots ---------- */

  const slotsFor = (d: Date): string[] => {
    const span = settings.hours[d.getDay()];
    if (!span || !today) return [];
    const out: string[] = [];
    const [startH, startM] = span[0].split(":").map((n) => parseInt(n, 10));
    const endH = parseInt(span[1].split(":")[0], 10);
    const cursor = new Date(d);
    cursor.setHours(startH, startM, 0, 0);
    const end = new Date(d);
    end.setHours(endH, 0, 0, 0);
    end.setMinutes(end.getMinutes() - 30); /* letzter Slot 30 min vor Schluss */

    const now = new Date();
    while (cursor <= end) {
      if (!(iso(d) === iso(today) && cursor <= now)) {
        out.push(
          String(cursor.getHours()).padStart(2, "0") + ":" + String(cursor.getMinutes()).padStart(2, "0")
        );
      }
      cursor.setMinutes(cursor.getMinutes() + settings.slotMinutes);
    }
    return out;
  };

  /* ---------- Absenden ---------- */

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!selectedDate || !selectedTime) {
      toast(t("bk.err.slot"));
      return;
    }
    let valid = true;
    if (!name.trim()) {
      setNameError(t("bk.err.required"));
      valid = false;
    } else setNameError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(t("bk.err.email"));
      valid = false;
    } else setEmailError("");
    if (!valid) return;

    const code = "MRLW-" + Math.random().toString(36).slice(2, 6).toUpperCase();
    const booking = {
      code,
      date: iso(selectedDate),
      time: selectedTime,
      persons,
      name: name.trim(),
      email: email.trim(),
      note: note.trim(),
    };
    try {
      const all = JSON.parse(localStorage.getItem("marlow_bookings") || "[]");
      all.push(booking);
      localStorage.setItem("marlow_bookings", JSON.stringify(all));
    } catch {
      /* noop */
    }

    setSuccess({ code, dateLabel: summaryText(persons, selectedDate, selectedTime), email: booking.email });
  };

  const resetBooking = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setName("");
    setEmail("");
    setNote("");
    setPersons("2");
    setNameError("");
    setEmailError("");
    setSuccess(null);
  };

  /* ---------- Kalender rendern ---------- */

  const renderCalendar = () => {
    if (!view || !today) return null;

    const first = new Date(view.y, view.m, 1);
    const maxView = new Date(today.getFullYear(), today.getMonth() + 3, 1);
    const prevDisabled = view.y === today.getFullYear() && view.m === today.getMonth();
    const nextDisabled = new Date(view.y, view.m + 1, 1) >= maxView;

    /* Wochentagszeile, Montag zuerst (1. Juni 2026 = Montag) */
    const dows = Array.from({ length: 7 }, (_, i) => {
      const ref = new Date(2026, 5, 1 + i);
      return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(ref).replace(".", "");
    });

    const lead = (first.getDay() + 6) % 7; /* Mo=0 … So=6 */
    const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();

    const monthLabel = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(first);

    return (
      <>
        <div className="cal__head">
          <p className="cal__month" aria-live="polite">
            {monthLabel}
          </p>
          <div className="cal__nav">
            <button
              type="button"
              aria-label={t("bk.prev")}
              disabled={prevDisabled}
              onClick={() =>
                setView((v) => (v ? (v.m === 0 ? { y: v.y - 1, m: 11 } : { y: v.y, m: v.m - 1 }) : v))
              }
            >
              <svg aria-hidden="true">
                <use href="#i-chevl" />
              </svg>
            </button>
            <button
              type="button"
              aria-label={t("bk.next")}
              disabled={nextDisabled}
              onClick={() =>
                setView((v) => (v ? (v.m === 11 ? { y: v.y + 1, m: 0 } : { y: v.y, m: v.m + 1 }) : v))
              }
            >
              <svg aria-hidden="true">
                <use href="#i-chevr" />
              </svg>
            </button>
          </div>
        </div>
        <div className="cal__grid">
          {dows.map((dow) => (
            <div className="cal__dow" aria-hidden="true" key={dow}>
              {dow}
            </div>
          ))}
          {Array.from({ length: lead }, (_, i) => (
            <div key={`lead-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const d = new Date(view.y, view.m, day);
            const open = isOpenDay(d);
            const isPast = d < today;
            const disabled = isPast || !open;
            const classes = ["cal__day"];
            if (isPast) classes.push("is-past");
            else if (open) classes.push("is-open");
            else classes.push("is-closed");
            if (iso(d) === iso(today)) classes.push("is-today");
            const isSelected = selectedDate != null && iso(d) === iso(selectedDate);
            if (isSelected) classes.push("is-selected");

            const label =
              new Intl.DateTimeFormat(locale, { weekday: "long", day: "numeric", month: "long" }).format(d) +
              (open ? "" : ` – ${L({ de: "geschlossen", en: "closed" })}`);

            return (
              <button
                type="button"
                key={day}
                className={classes.join(" ")}
                disabled={disabled}
                aria-label={label}
                aria-pressed={isSelected || undefined}
                onClick={() => {
                  setSelectedDate(new Date(iso(d) + "T12:00:00"));
                  setSelectedTime(null);
                }}
              >
                {day}
              </button>
            );
          })}
        </div>
      </>
    );
  };

  const slots = selectedDate ? slotsFor(selectedDate) : [];

  return (
    <div className="container">
      <nav className="breadcrumbs" aria-label="Brotkrumen">
        <ol>
          <li>
            <Link href="/">{t("crumb.home")}</Link>
          </li>
          <li aria-current="page">{t("nav.reserve")}</li>
        </ol>
      </nav>

      <header className="page-hero">
        <p className="eyebrow">{L(T.eyebrow)}</p>
        <h1>{L(T.title)}</h1>
        <p className="page-hero__lede">{L(T.lede)}</p>
      </header>

      {!success ? (
        <div className="booking">
          {/* Schritt 1: Kalender */}
          <section className="booking__panel" aria-labelledby="bk-step1">
            <h2 id="bk-step1" style={{ fontSize: "1.125rem" }}>
              {L(T.step1)}
            </h2>
            {renderCalendar()}
            <div className="cal__legend">
              <span>
                <i className="lg-open" /> <span>{L(T.lgOpen)}</span>
              </span>
              <span>
                <i className="lg-closed" /> <span>{L(T.lgClosed)}</span>
              </span>
              <span>
                <i className="lg-selected" /> <span>{L(T.lgSelected)}</span>
              </span>
            </div>
          </section>

          {/* Schritt 2 + 3: Zeit & Daten */}
          <section className="booking__panel" aria-labelledby="bk-step2">
            <h2 id="bk-step2" style={{ fontSize: "1.125rem" }}>
              {t("bk.slots.title")}
            </h2>
            {!selectedDate ? (
              <p className="slots__hint">{t("bk.slots.hint")}</p>
            ) : (
              <div className="slots__grid" role="group">
                {slots.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    className="slot"
                    aria-pressed={slot === selectedTime}
                    onClick={() => {
                      setSelectedTime(slot);
                      setTimeout(() => nameRef.current?.focus(), 0);
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}

            {selectedDate && selectedTime && (
              <div>
                <div className="bk-summary">
                  <svg aria-hidden="true">
                    <use href="#i-calendar" />
                  </svg>
                  <span>{summaryText(persons, selectedDate, selectedTime)}</span>
                </div>
                <h3>{L(T.step3)}</h3>
                <form noValidate onSubmit={onSubmit}>
                  <div className="field">
                    <label htmlFor="bk-persons">
                      {L(T.fPersons)} <span className="req">*</span>
                    </label>
                    <select
                      id="bk-persons"
                      name="persons"
                      value={persons}
                      onChange={(event) => setPersons(event.target.value)}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                    <p className="field__hint">{L(T.fPersonsHint)}</p>
                  </div>
                  <div className="field-row">
                    <div className={`field${nameError ? " has-error" : ""}`}>
                      <label htmlFor="bk-name">
                        {L(T.fName)} <span className="req">*</span>
                      </label>
                      <input
                        ref={nameRef}
                        type="text"
                        id="bk-name"
                        name="name"
                        autoComplete="name"
                        required
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                      />
                      <p className="field__error" aria-live="polite">
                        {nameError}
                      </p>
                    </div>
                    <div className={`field${emailError ? " has-error" : ""}`}>
                      <label htmlFor="bk-email">
                        {L(T.fEmail)} <span className="req">*</span>
                      </label>
                      <input
                        type="email"
                        id="bk-email"
                        name="email"
                        autoComplete="email"
                        inputMode="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                      <p className="field__error" aria-live="polite">
                        {emailError}
                      </p>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="bk-note">{L(T.fNote)}</label>
                    <textarea
                      id="bk-note"
                      name="note"
                      rows={3}
                      placeholder={L(T.fNotePh)}
                      value={note}
                      onChange={(event) => setNote(event.target.value)}
                    />
                  </div>
                  <button className="btn btn--primary" type="submit" style={{ width: "100%" }}>
                    {L(T.submit)}
                  </button>
                </form>
              </div>
            )}
          </section>
        </div>
      ) : (
        /* Erfolg */
        <div
          ref={successRef}
          className="booking__panel bk-success"
          tabIndex={-1}
          style={{ maxWidth: 560, marginInline: "auto", marginBottom: "var(--section-pad)" }}
        >
          <div className="bk-success__icon">
            <svg aria-hidden="true">
              <use href="#i-check" />
            </svg>
          </div>
          <h2 style={{ fontSize: "1.625rem" }}>{t("bk.success.title")}</h2>
          <p className="bk-summary" style={{ justifyContent: "center" }}>
            <svg aria-hidden="true">
              <use href="#i-calendar" />
            </svg>
            <span>{success.dateLabel}</span>
          </p>
          <p style={{ color: "var(--roast)" }}>{t("bk.success.text", { email: success.email })}</p>
          <p className="bk-code">
            {t("bk.success.code")}: {success.code}
          </p>
          <p style={{ marginTop: "1.5rem" }}>
            <button className="btn btn--ghost" type="button" onClick={resetBooking}>
              {t("bk.new")}
            </button>
          </p>
        </div>
      )}

      {/* Info-Karten */}
      <div className="visit__grid" style={{ paddingBottom: "var(--section-pad)" }}>
        <Reveal className="visit-card">
          <span className="visit-card__icon">
            <svg aria-hidden="true">
              <use href="#i-pin" />
            </svg>
          </span>
          <h3>{L(T.info1t)}</h3>
          <p>
            Marlow Coffee Roasters
            <br />
            Hafenstraße 12
            <br />
            48153 Münster
          </p>
        </Reveal>
        <Reveal className="visit-card" delay={80}>
          <span className="visit-card__icon">
            <svg aria-hidden="true">
              <use href="#i-clock" />
            </svg>
          </span>
          <h3>{L(T.info2t)}</h3>
          <dl>
            <div className="hours-row">
              <dt>{t("hours.monfri")}</dt>
              <dd>8:00 – 18:00</dd>
            </div>
            <div className="hours-row">
              <dt>{t("hours.sat")}</dt>
              <dd>9:00 – 17:00</dd>
            </div>
            <div className="hours-row">
              <dt>{t("hours.sun")}</dt>
              <dd>{t("hours.sun.v")}</dd>
            </div>
          </dl>
        </Reveal>
        <Reveal className="visit-card" delay={160}>
          <span className="visit-card__icon">
            <svg aria-hidden="true">
              <use href="#i-calendar" />
            </svg>
          </span>
          <h3>{L(T.info3t)}</h3>
          <p>{L(T.info3p)}</p>
        </Reveal>
      </div>
    </div>
  );
}
