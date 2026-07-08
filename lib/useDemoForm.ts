"use client";

/* Gemeinsame Validierungslogik für Demo-Formulare (B2B, Kontakt):
   Pflichtfelder + E-Mail-Format prüfen, bei Erfolg zurücksetzen und
   die "Nachricht gesendet (Demo)"-Bestätigung zeigen. */

import { useState, type FormEvent, type RefObject } from "react";
import { useI18n } from "./i18n";
import { useUi } from "./ui";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useDemoForm(formRef: RefObject<HTMLFormElement | null>) {
  const { t } = useI18n();
  const { modal } = useUi();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = formRef.current ?? event.currentTarget;
    const nextErrors: Record<string, string> = {};
    let firstInvalidName: string | null = null;

    form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("[required]").forEach((input) => {
      const bad =
        !input.value.trim() || (input.type === "email" && !EMAIL_RE.test(input.value));
      if (bad) {
        nextErrors[input.name] = t(
          input.type === "email" && input.value.trim() ? "bk.err.email" : "bk.err.required"
        );
        if (firstInvalidName == null) firstInvalidName = input.name;
      }
    });

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      if (firstInvalidName) {
        form.querySelector<HTMLElement>(`[name="${firstInvalidName}"]`)?.focus();
      }
      return;
    }

    form.reset();
    modal(t("form.sent.title"), t("form.sent.text"));
  };

  return { onSubmit, errors };
}
