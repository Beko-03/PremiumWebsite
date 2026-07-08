"use client";

/* Coffee-Finder-Quiz: 3 Fragen → Röstungs-Empfehlung */

import Link from "next/link";
import { useState } from "react";
import { productById } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { useI18n, type StringKey } from "@/lib/i18n";

interface QuizOption {
  key: StringKey;
  value: string;
  icon: string;
}

const QUESTIONS: { q: StringKey; options: QuizOption[] }[] = [
  {
    q: "quiz.q1",
    options: [
      { key: "quiz.q1.a", value: "filter", icon: "#i-cup" },
      { key: "quiz.q1.b", value: "espresso", icon: "#i-flame" },
      { key: "quiz.q1.c", value: "auto", icon: "#i-bean" },
      { key: "quiz.q1.d", value: "immersion", icon: "#i-clock" },
    ],
  },
  {
    q: "quiz.q2",
    options: [
      { key: "quiz.q2.a", value: "fruity", icon: "#i-leaf" },
      { key: "quiz.q2.b", value: "choco", icon: "#i-bean" },
      { key: "quiz.q2.c", value: "bold", icon: "#i-flame" },
    ],
  },
  {
    q: "quiz.q3",
    options: [
      { key: "quiz.q3.a", value: "black", icon: "#i-cup" },
      { key: "quiz.q3.b", value: "milk", icon: "#i-star" },
    ],
  },
];

function recommend(answers: string[]): string {
  const brew = answers[0];
  const taste = answers[1];
  const milk = answers[2] === "milk";

  if (brew === "espresso") return "marlow-no1";
  if (taste === "bold") return "marlow-no1";
  if (taste === "fruity") return milk ? "la-esperanza" : "buku-hambela";
  return "la-esperanza";
}

export default function Quiz() {
  const { t, L, fmtPrice } = useI18n();
  const { addToCart } = useCart();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  if (step >= QUESTIONS.length) {
    const product = productById(recommend(answers))!;
    return (
      <div className="quiz__result">
        <img src={product.img} alt={L(product.name)} />
        <p className="eyebrow" style={{ justifyContent: "center" }}>
          {t("quiz.result.eyebrow")}
        </p>
        <p className="product-card__origin">{L(product.origin)}</p>
        <h3>{L(product.name)}</h3>
        <p>{t("quiz.result.text")}</p>
        <div style={{ display: "flex", gap: ".75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn btn--light" type="button" onClick={() => addToCart(product.id)}>
            {t("quiz.result.cta")} · {fmtPrice(product.price)}
          </button>
          <Link className="btn vhero__btn-ghost btn--ghost" href={`/produkt/${product.id}/`}>
            {t("quiz.result.more")}
          </Link>
        </div>
        <button
          className="quiz__back"
          type="button"
          onClick={() => {
            setStep(0);
            setAnswers([]);
          }}
        >
          {t("quiz.restart")}
        </button>
      </div>
    );
  }

  const question = QUESTIONS[step];

  return (
    <>
      <div className="quiz__progress" aria-hidden="true">
        {QUESTIONS.map((_, i) => (
          <i key={i} className={i <= step ? "is-done" : undefined} />
        ))}
      </div>
      <p className="quiz__q">{t(question.q)}</p>
      <div className="quiz__opts" role="group" aria-label={t(question.q)}>
        {question.options.map((opt) => (
          <button
            key={opt.value}
            className="quiz__opt"
            type="button"
            onClick={() => {
              setAnswers((prev) => {
                const next = [...prev];
                next[step] = opt.value;
                return next;
              });
              setStep((s) => s + 1);
            }}
          >
            <svg aria-hidden="true">
              <use href={opt.icon} />
            </svg>
            <span>{t(opt.key)}</span>
          </button>
        ))}
      </div>
      {step > 0 && (
        <button className="quiz__back" type="button" onClick={() => setStep((s) => Math.max(0, s - 1))}>
          ← {t("quiz.back")}
        </button>
      )}
    </>
  );
}
