import type { Metadata } from "next";
import DatenschutzClient from "@/components/DatenschutzClient";

export const metadata: Metadata = {
  title: "Datenschutz",
  description:
    "Datenschutzerklärung von Marlow Coffee Roasters nach Art. 13 DSGVO: keine Cookies, kein Tracking, selbst gehostete Schriften.",
  alternates: { canonical: "/datenschutz/" },
  robots: { index: false, follow: true },
};

export default function DatenschutzPage() {
  return <DatenschutzClient />;
}
