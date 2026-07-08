"use client";

/* Globale Overlays: Scrim, Warenkorb-Drawer, Bestätigungs-Modal, Toast. */

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart } from "@/lib/cart";
import { useI18n, type StringKey } from "@/lib/i18n";
import { useUi } from "@/lib/ui";
import { productById, settings } from "@/lib/data";

export default function SiteChrome() {
  const cart = useCart();
  const { t, L, fmtPrice } = useI18n();
  const { toastState, modalState, modal, hideModal } = useUi();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const modalBtnRef = useRef<HTMLButtonElement>(null);

  const scrimOpen = cart.isOpen || modalState.open;

  /* Escape schließt Drawer + Modal */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        cart.closeCart();
        hideModal();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [cart, hideModal]);

  /* Fokus in den Drawer bzw. ins Modal setzen */
  useEffect(() => {
    if (cart.isOpen) closeBtnRef.current?.focus();
  }, [cart.isOpen]);

  useEffect(() => {
    if (modalState.open) modalBtnRef.current?.focus();
  }, [modalState.open]);

  const subtotal = cart.subtotal;
  const target = settings.freeShippingFrom;
  const shipPct = Math.min(100, Math.round((subtotal / target) * 100));

  return (
    <>
      {/* Scrim */}
      <div
        className={`scrim${scrimOpen ? " is-open" : ""}`}
        onClick={() => {
          hideModal();
          cart.closeCart();
        }}
      />

      {/* Warenkorb-Drawer */}
      <aside className={`drawer${cart.isOpen ? " is-open" : ""}`} aria-label={t("cart.title")}>
        <div className="drawer__head">
          <h2>{t("cart.title")}</h2>
          <button
            ref={closeBtnRef}
            className="icon-btn"
            type="button"
            aria-label={t("cart.close")}
            onClick={cart.closeCart}
          >
            <svg aria-hidden="true">
              <use href="#i-close" />
            </svg>
          </button>
        </div>

        <div className="drawer__body">
          {cart.items.length === 0 ? (
            <div className="drawer__empty">
              <svg aria-hidden="true">
                <use href="#i-bean" />
              </svg>
              <p>{t("cart.empty")}</p>
              <Link className="btn btn--primary" href="/shop/" onClick={cart.closeCart}>
                {t("cart.empty.cta")}
              </Link>
            </div>
          ) : (
            cart.items.map((item, index) => {
              const p = productById(item.id);
              if (!p) return null;
              const meta = [p.weight];
              if (item.grind) meta.push(t(item.grind as StringKey));
              return (
                <div className="cart-item" key={`${item.id}-${item.grind ?? "none"}`}>
                  <img src={p.img} alt="" width={72} height={84} />
                  <div>
                    <p className="cart-item__name">{L(p.name)}</p>
                    <p className="cart-item__meta">{meta.join(" · ")}</p>
                    <div className="qty" style={{ marginTop: ".375rem" }}>
                      <button
                        type="button"
                        aria-label={t("cart.qty.less")}
                        onClick={() => cart.changeQty(index, -1)}
                      >
                        −
                      </button>
                      <input value={item.qty} readOnly aria-label="Anzahl" />
                      <button
                        type="button"
                        aria-label={t("cart.qty.more")}
                        onClick={() => cart.changeQty(index, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="cart-item__price">{fmtPrice(p.price * item.qty)}</p>
                    <button
                      type="button"
                      className="cart-item__remove"
                      onClick={() => cart.removeItem(index)}
                    >
                      {t("cart.remove")}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {cart.items.length > 0 && (
          <div className="drawer__foot">
            <div className="shipbar">
              <span>
                {subtotal >= target
                  ? t("cart.ship.free")
                  : t("cart.ship.progress", { amount: fmtPrice(target - subtotal) })}
              </span>
              <div className="shipbar__track">
                <div className="shipbar__fill" style={{ width: `${shipPct}%` }} />
              </div>
            </div>
            <div className="drawer__total">
              <span>{t("cart.subtotal")}</span>
              <span>{fmtPrice(subtotal)}</span>
            </div>
            <button
              className="btn btn--primary"
              type="button"
              onClick={() => {
                cart.closeCart();
                modal(t("checkout.title"), t("checkout.text"));
              }}
            >
              {t("cart.checkout")}
            </button>
          </div>
        )}
      </aside>

      {/* Bestätigungs-Modal */}
      <div
        className={`modal${modalState.open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) hideModal();
        }}
      >
        <div className="modal__card">
          <div className="modal__icon">
            <svg aria-hidden="true">
              <use href="#i-check" />
            </svg>
          </div>
          <h2 id="modal-title" style={{ fontSize: "1.5rem" }}>
            {modalState.title}
          </h2>
          <p style={{ color: "var(--roast)" }}>{modalState.text}</p>
          <button ref={modalBtnRef} className="btn btn--primary" type="button" onClick={hideModal}>
            {t("modal.ok")}
          </button>
        </div>
      </div>

      {/* Toast */}
      <div className={`toast${toastState.visible ? " is-visible" : ""}`} role="status" aria-live="polite">
        <svg aria-hidden="true">
          <use href="#i-check" />
        </svg>
        <span>{toastState.message}</span>
      </div>
    </>
  );
}
