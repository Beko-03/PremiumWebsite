import type { Metadata } from "next";
import ImpressumClient from "@/components/ImpressumClient";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung von Marlow Coffee Roasters gemäß § 5 DDG.",
  alternates: { canonical: "/impressum/" },
  robots: { index: false, follow: true },
};

export default function ImpressumPage() {
  return <ImpressumClient />;
}
