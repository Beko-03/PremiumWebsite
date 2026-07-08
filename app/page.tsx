import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import { SITE_URL } from "@/lib/data";

export const metadata: Metadata = {
  title: {
    absolute: "Marlow Coffee Roasters — Specialty Coffee, frisch geröstet in Münster",
  },
  description:
    "Kleinserien-Rösterei in Münster: Direct-Trade-Kaffee, jeden Dienstag frisch geröstet. Shop, Abo, Rösterei-Café mit Reservierung.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Marlow Coffee Roasters — Specialty Coffee aus Münster",
    description: "Direct-Trade-Kaffee, jeden Dienstag frisch geröstet. Shop, Abo & Rösterei-Café.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: "Marlow Coffee Roasters",
  description:
    "Specialty-Kaffeerösterei mit Café in Münster. Direct Trade, wöchentliche Röstung, öffentliche Cuppings.",
  image: `${SITE_URL}/assets/img/roastery-hall.webp`,
  servesCuisine: "Coffee",
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Hafenstraße 12",
    postalCode: "48153",
    addressLocality: "Münster",
    addressCountry: "DE",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "17:00" },
  ],
  acceptsReservations: "True",
  email: "hello@marlow.coffee",
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeClient />
    </>
  );
}
