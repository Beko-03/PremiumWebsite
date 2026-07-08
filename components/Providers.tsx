"use client";

import type { ReactNode } from "react";
import { LanguageProvider } from "@/lib/i18n";
import { UiProvider } from "@/lib/ui";
import { CartProvider } from "@/lib/cart";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <UiProvider>
        <CartProvider>{children}</CartProvider>
      </UiProvider>
    </LanguageProvider>
  );
}
