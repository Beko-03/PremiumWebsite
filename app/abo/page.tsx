import type { Metadata } from "next";
import AboClient from "@/components/AboClient";

export const metadata: Metadata = {
  title: { absolute: "Kaffee-Abo konfigurieren — Marlow Coffee Roasters" },
  description:
    "Dein Kaffee-Abo von Marlow: Rhythmus, Menge und Röstung wählen — 10 % Rabatt, versandkostenfrei, jederzeit pausierbar. Immer frisch vom Rösttag.",
  alternates: { canonical: "/abo/" },
  openGraph: {
    title: "Kaffee-Abo — Marlow Coffee Roasters",
    description: "10 % Rabatt, versandkostenfrei, jederzeit pausierbar — immer frisch vom Rösttag.",
  },
};

export default function AboPage() {
  return <AboClient />;
}
