"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";
import type { Product } from "@/lib/data";

export default function ProductCard({ product }: { product: Product }) {
  const { L, t, fmtPrice } = useI18n();
  const { addToCart } = useCart();
  const href = `/produkt/${product.id}/`;

  return (
    <article className="product-card reveal is-visible" data-category={product.category}>
      {product.badge && (
        <span className={`badge${product.category === "espresso" ? " badge--dark" : ""}`}>
          {L(product.badge)}
        </span>
      )}
      <Link className="product-card__photo" href={href} tabIndex={-1} aria-hidden="true">
        <img src={product.img} alt="" loading="lazy" width={600} height={750} />
      </Link>
      <div className="product-card__body">
        <p className="product-card__origin">{L(product.origin)}</p>
        <h3>
          <Link href={href} style={{ color: "inherit", textDecoration: "none" }}>
            {L(product.name)}
          </Link>
        </h3>
        <ul className="product-card__notes">
          {L(product.notes).map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
        <div className="product-card__foot">
          <p className="product-card__price">
            {fmtPrice(product.price)} <span>{product.weight}</span>
          </p>
          <button className="btn btn--primary" type="button" onClick={() => addToCart(product.id)}>
            {t("quiz.result.cta")}
          </button>
        </div>
      </div>
    </article>
  );
}
