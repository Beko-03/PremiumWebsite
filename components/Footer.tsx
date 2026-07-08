"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useI18n } from "@/lib/i18n";
import { useUi } from "@/lib/ui";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Footer() {
  const { t } = useI18n();
  const { modal } = useUi();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const value = email.trim();
    if (!value) {
      setError(t("bk.err.required"));
      return;
    }
    if (!EMAIL_RE.test(value)) {
      setError(t("bk.err.email"));
      return;
    }
    setError("");
    setEmail("");
    modal(t("form.sent.title"), t("form.sent.text"));
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <Link className="brand" href="/" aria-label="Marlow Coffee Roasters — Startseite">
              <svg className="brand__mark" aria-hidden="true">
                <use href="#i-bean" />
              </svg>
              <span>
                <span className="brand__name">MARLOW</span>
                <span className="brand__tag">Coffee Roasters</span>
              </span>
            </Link>
            <p className="footer__about">{t("footer.about")}</p>
            <div className="footer__social">
              <a href="#" aria-label="Marlow auf Instagram">
                <svg aria-hidden="true">
                  <use href="#i-instagram" />
                </svg>
              </a>
              <a href="#" aria-label="Marlow auf Facebook">
                <svg aria-hidden="true">
                  <use href="#i-facebook" />
                </svg>
              </a>
              <a href="mailto:hello@marlow.coffee" aria-label="E-Mail an Marlow">
                <svg aria-hidden="true">
                  <use href="#i-mail" />
                </svg>
              </a>
            </div>
          </div>

          <nav aria-label="Shop-Links">
            <h3>{t("footer.shop")}</h3>
            <ul>
              <li>
                <Link className="footer__link" href="/shop/">
                  {t("footer.shop.all")}
                </Link>
              </li>
              <li>
                <Link className="footer__link" href="/abo/">
                  {t("footer.shop.abo")}
                </Link>
              </li>
              <li>
                <Link className="footer__link" href="/produkt/probierpaket/">
                  {t("footer.shop.set")}
                </Link>
              </li>
              <li>
                <Link className="footer__link" href="/b2b/">
                  {t("footer.shop.b2b")}
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Unternehmens-Links">
            <h3>{t("footer.company")}</h3>
            <ul>
              <li>
                <Link className="footer__link" href="/roesterei/">
                  {t("footer.co.story")}
                </Link>
              </li>
              <li>
                <Link className="footer__link" href="/reservierung/">
                  {t("footer.co.reserve")}
                </Link>
              </li>
              <li>
                <Link className="footer__link" href="/journal/">
                  {t("footer.co.journal")}
                </Link>
              </li>
              <li>
                <Link className="footer__link" href="/kontakt/">
                  {t("footer.co.contact")}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="newsletter">
            <h3>{t("footer.nl")}</h3>
            <form onSubmit={onSubmit} noValidate>
              <div className={`field${error ? " has-error" : ""}`} style={{ marginBottom: ".75rem" }}>
                <label htmlFor="newsletter-email">{t("footer.nl.label")}</label>
                <div className="newsletter__row">
                  <input
                    type="email"
                    id="newsletter-email"
                    name="email"
                    autoComplete="email"
                    required
                    placeholder={t("footer.nl.ph")}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <button className="btn btn--primary" type="submit">
                    {t("footer.nl.cta")}
                  </button>
                </div>
                <p className="field__error" aria-live="polite">
                  {error}
                </p>
              </div>
            </form>
          </div>
        </div>

        <div className="footer__base">
          <p>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> Marlow Coffee Roasters.{" "}
            <span>{t("footer.rights")}</span>
          </p>
          <p>
            <Link href="/impressum/">{t("footer.imprint")}</Link> ·{" "}
            <Link href="/datenschutz/">{t("footer.privacy")}</Link> · <a href="#">{t("footer.shipping")}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
