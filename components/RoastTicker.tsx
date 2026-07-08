"use client";

/* Röst-Ticker: nächster Rösttag + Chargen-Nr. (berechnet im Browser) */

import { useEffect, useState, type ReactNode } from "react";
import { settings } from "@/lib/data";
import { useI18n } from "@/lib/i18n";

interface RoastTickerProps {
  title: ReactNode;
  sub: ReactNode;
  batchLabel: ReactNode;
  nextLabel: ReactNode;
  countdownLabel: ReactNode;
}

export default function RoastTicker({ title, sub, batchLabel, nextLabel, countdownLabel }: RoastTickerProps) {
  const { t, fmtDate, locale, lang } = useI18n();
  const [ticker, setTicker] = useState<{ date: string; count: string; batch: string } | null>(null);

  useEffect(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const daysUntil = (settings.roastWeekday - today.getDay() + 7) % 7;
    const nextRoast = new Date(today);
    nextRoast.setDate(today.getDate() + daysUntil);

    /* Chargen-Nr.: Röstwochen seit Gründung im März 2014, 2 Chargen/Woche */
    const founding = new Date(2014, 2, 4);
    const weeks = Math.floor((today.getTime() - founding.getTime()) / (7 * 24 * 3600 * 1000));
    const batch = 1200 + weeks * 2;

    setTicker({
      date:
        daysUntil === 0
          ? t("roast.today")
          : fmtDate(nextRoast, { weekday: "long", day: "numeric", month: "long" }),
      count:
        daysUntil === 0
          ? t("roast.today")
          : daysUntil === 1
            ? t("roast.in.one")
            : t("roast.in.days", { n: daysUntil }),
      batch: "#" + batch.toLocaleString(locale),
    });
  }, [t, fmtDate, locale, lang]);

  return (
    <section className="roast-ticker" aria-label="Röstkalender">
      <div className="container roast-ticker__grid">
        <span className="roast-ticker__flame">
          <svg aria-hidden="true">
            <use href="#i-flame" />
          </svg>
        </span>
        <div className="roast-ticker__label">
          <strong>{title}</strong>
          <span>{sub}</span>
        </div>
        <div className="roast-ticker__stat">
          <strong>{ticker?.batch ?? "#—"}</strong>
          <span>{batchLabel}</span>
        </div>
        <div className="roast-ticker__stat">
          <strong>{ticker?.date ?? "—"}</strong>
          <span>{nextLabel}</span>
        </div>
        <div className="roast-ticker__stat">
          <strong>{ticker?.count ?? "—"}</strong>
          <span>{countdownLabel}</span>
        </div>
      </div>
    </section>
  );
}
