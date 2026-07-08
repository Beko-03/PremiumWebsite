"use client";

/* Marlow — Demo-Warenkorb (localStorage "marlow_cart", wie im Original).
   In Kundenprojekten wird hier Stripe/Shopify o. Ä. angebunden. */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { productById } from "./data";
import { useI18n } from "./i18n";
import { useUi } from "./ui";

const CART_KEY = "marlow_cart";

export interface CartItem {
  id: string;
  qty: number;
  /** Mahlgrad-Schlüssel, z. B. "grind.filter" (null = ganze Bohne/ohne Auswahl) */
  grind: string | null;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (id: string, qty?: number, grind?: string | null) => void;
  changeQty: (index: number, delta: number) => void;
  removeItem: (index: number) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function readStoredCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const hydrated = useRef(false);
  const { t, L } = useI18n();
  const { toast } = useUi();

  /* Beim Mount aus localStorage laden (SSG rendert leeren Warenkorb) */
  useEffect(() => {
    setItems(readStoredCart());
    hydrated.current = true;
  }, []);

  /* Änderungen persistieren */
  useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {
      /* noop */
    }
  }, [items]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addToCart = useCallback(
    (id: string, qty = 1, grind: string | null = null) => {
      const product = productById(id);
      if (!product) return;
      setItems((prev) => {
        const next = prev.map((it) => ({ ...it }));
        const existing = next.find((it) => it.id === id && it.grind === grind);
        if (existing) existing.qty = Math.min(99, existing.qty + qty);
        else next.push({ id, qty, grind });
        return next;
      });
      toast(t("cart.added", { name: L(product.name) }));
    },
    [toast, t, L]
  );

  const changeQty = useCallback((index: number, delta: number) => {
    setItems((prev) =>
      prev.map((it, i) =>
        i === index ? { ...it, qty: Math.min(99, Math.max(1, it.qty + delta)) } : it
      )
    );
  }, []);

  const removeItem = useCallback((index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const { count, subtotal } = useMemo(() => {
    let count = 0;
    let subtotal = 0;
    for (const it of items) {
      count += it.qty;
      const p = productById(it.id);
      if (p) subtotal += p.price * it.qty;
    }
    return { count, subtotal };
  }, [items]);

  const value = useMemo(
    () => ({ items, count, subtotal, isOpen, openCart, closeCart, addToCart, changeQty, removeItem }),
    [items, count, subtotal, isOpen, openCart, closeCart, addToCart, changeQty, removeItem]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart muss innerhalb von <CartProvider> verwendet werden");
  return ctx;
}
