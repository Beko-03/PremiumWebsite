import type { Metadata } from "next";
import BookingClient from "@/components/BookingClient";

export const metadata: Metadata = {
  title: { absolute: "Tisch reservieren — Marlow Coffee Roasters Café Münster" },
  description:
    "Reserviere deinen Tisch im Marlow Rösterei-Café in Münster: Kalender mit allen Öffnungstagen, freie Zeitslots, Bestätigung in unter einer Minute.",
  alternates: { canonical: "/reservierung/" },
  openGraph: {
    title: "Tisch reservieren — Marlow Coffee Roasters",
    description: "Kalender mit allen Öffnungstagen, freie Zeitslots, sofortige Bestätigung.",
    images: ["/assets/img/cafe-interior.webp"],
  },
};

export default function ReservierungPage() {
  return <BookingClient />;
}
