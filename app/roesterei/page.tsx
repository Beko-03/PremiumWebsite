import type { Metadata } from "next";
import RoesterelClient from "@/components/RoesterelClient";

export const metadata: Metadata = {
  title: { absolute: "Die Rösterei — Marlow Coffee Roasters | Handwerk seit 2014" },
  description:
    "Vom Garagenröster zur Hafenstraße: die Geschichte von Marlow Coffee Roasters. Direct Trade, wöchentliche Röstung, öffentliche Cuppings in Münster.",
  alternates: { canonical: "/roesterei/" },
  openGraph: {
    title: "Die Rösterei — Marlow Coffee Roasters",
    description: "Direct Trade, wöchentliche Röstung, öffentliche Cuppings in Münster.",
    images: ["/assets/img/roastery-hall.webp"],
  },
};

export default function RoesterelPage() {
  return <RoesterelClient />;
}
