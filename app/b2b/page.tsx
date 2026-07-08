import type { Metadata } from "next";
import B2bClient from "@/components/B2bClient";

export const metadata: Metadata = {
  title: { absolute: "Großhandel für Cafés & Gastronomie — Marlow Coffee Roasters" },
  description:
    "Marlow für Gastronomie: Staffelpreise, Barista-Schulungen, Leihequipment und ein Röstplan, der sich nach deinem Café richtet. Jetzt Musterpaket anfragen.",
  alternates: { canonical: "/b2b/" },
  openGraph: {
    title: "Großhandel für Cafés — Marlow Coffee Roasters",
    description: "Staffelpreise, Barista-Schulungen und ein Röstplan, der sich nach deinem Café richtet.",
    images: ["/assets/img/b2b-espresso.webp"],
  },
};

export default function B2bPage() {
  return <B2bClient />;
}
