import type { Metadata } from "next";
import KontaktClient from "@/components/KontaktClient";

export const metadata: Metadata = {
  title: { absolute: "Kontakt & Anfahrt — Marlow Coffee Roasters Münster" },
  description:
    "Fragen zu Bestellung, Abo oder Großhandel? Schreib uns — oder komm direkt an die Hafenstraße 12 in Münster. Alle Öffnungszeiten & Anfahrt.",
  alternates: { canonical: "/kontakt/" },
  openGraph: {
    title: "Kontakt & Anfahrt — Marlow Coffee Roasters",
    description: "Schreib uns — oder komm direkt an die Hafenstraße 12 in Münster.",
  },
};

export default function KontaktPage() {
  return <KontaktClient />;
}
