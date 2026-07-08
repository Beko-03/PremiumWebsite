import type { Metadata } from "next";
import ShopClient from "@/components/ShopClient";

export const metadata: Metadata = {
  title: { absolute: "Shop — Marlow Coffee Roasters | Specialty Coffee kaufen" },
  description:
    "Frisch gerösteter Specialty Coffee: Single Origins aus Äthiopien & Kolumbien, Espresso-Hausmischung, Sets und Zubehör. Geröstet jeden Dienstag.",
  alternates: { canonical: "/shop/" },
  openGraph: {
    title: "Shop — Marlow Coffee Roasters",
    description: "Single Origins, Espresso & Sets — jeden Dienstag frisch geröstet.",
    images: ["/assets/img/bag-ethiopia.webp"],
  },
};

export default function ShopPage() {
  return <ShopClient />;
}
