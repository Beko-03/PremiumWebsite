import type { NextConfig } from "next";

/**
 * Static Export: `next build` erzeugt den fertigen Auftritt im Ordner `out/`.
 * Der Inhalt von `out/` kann 1:1 auf Hostinger (public_html) hochgeladen werden —
 * es wird kein Node-Server benötigt.
 */
const nextConfig: NextConfig = {
  output: "export",
  // /shop -> out/shop/index.html — funktioniert ohne Server-Rewrites (Apache/LiteSpeed)
  trailingSlash: true,
  // next/image-Optimierung braucht einen Server; beim Static Export deaktivieren
  images: { unoptimized: true },
};

export default nextConfig;
