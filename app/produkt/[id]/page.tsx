import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/ProductDetailClient";
import { loc, productById, products, SITE_URL } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = productById(id);
  if (!product) return {};
  const name = loc(product.name, "de");
  return {
    title: name,
    description: product.desc.de,
    alternates: { canonical: `/produkt/${product.id}/` },
    openGraph: {
      type: "website",
      title: `${name} — Marlow Coffee Roasters`,
      description: product.desc.de,
      images: [product.img],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = productById(id);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: loc(product.name, "de"),
    description: product.desc.de,
    image: `${SITE_URL}${product.img}`,
    brand: { "@type": "Brand", name: "Marlow Coffee Roasters" },
    offers: {
      "@type": "Offer",
      price: product.price.toFixed(2),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductDetailClient product={product} />
    </>
  );
}
