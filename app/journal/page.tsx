import type { Metadata } from "next";
import JournalClient from "@/components/JournalClient";

export const metadata: Metadata = {
  title: { absolute: "Journal — Marlow Coffee Roasters | Brühwissen & Herkunftsgeschichten" },
  description:
    "Das Marlow-Journal: Brühguides, Reiseberichte von unseren Partnerfarmen und Neuigkeiten aus der Rösterei in Münster.",
  alternates: { canonical: "/journal/" },
  openGraph: {
    title: "Journal — Marlow Coffee Roasters",
    description: "Brühguides, Reiseberichte und Neuigkeiten aus der Rösterei.",
  },
};

export default function JournalPage() {
  return <JournalClient />;
}
