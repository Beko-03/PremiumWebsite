import type { Metadata } from "next";
import { Karla, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Providers from "@/components/Providers";
import SiteChrome from "@/components/SiteChrome";
import SvgSprite from "@/components/SvgSprite";
import { SITE_URL } from "@/lib/data";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-karla",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Marlow Coffee Roasters — Specialty Coffee, frisch geröstet in Münster",
    template: "%s — Marlow Coffee Roasters",
  },
  description:
    "Kleinserien-Rösterei in Münster: Direct-Trade-Kaffee, jeden Dienstag frisch geröstet. Shop, Abo, Rösterei-Café mit Reservierung.",
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Marlow Coffee Roasters",
    images: ["/assets/img/roastery-hall.webp"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" className={`${playfair.variable} ${karla.variable}`}>
      <body>
        <Providers>
          <SvgSprite />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <SiteChrome />
        </Providers>
      </body>
    </html>
  );
}
