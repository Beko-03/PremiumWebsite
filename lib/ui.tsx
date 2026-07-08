"use client";

/* Marlow — globale UI-Zustände: Toast + Bestätigungs-Modal.
   Gerendert werden beide in components/SiteChrome.tsx. */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface ModalState {
  open: boolean;
  title: string;
  text: string;
}

interface ToastState {
  visible: boolean;
  message: string;
}

interface UiContextValue {
  toastState: ToastState;
  modalState: ModalState;
  toast: (message: string) => void;
  modal: (title: string, text: string) => void;
  hideModal: () => void;
}

const UiContext = createContext<UiContextValue | null>(null);

export function UiProvider({ children }: { children: ReactNode }) {
  const [toastState, setToastState] = useState<ToastState>({ visible: false, message: "" });
  const [modalState, setModalState] = useState<ModalState>({ open: false, title: "", text: "" });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toast = useCallback((message: string) => {
    setToastState({ visible: true, message });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => {
      setToastState((s) => ({ ...s, visible: false }));
    }, 3500);
  }, []);

  const modal = useCallback((title: string, text: string) => {
    setModalState({ open: true, title, text });
  }, []);

  const hideModal = useCallback(() => {
    setModalState((s) => ({ ...s, open: false }));
  }, []);

  const value = useMemo(
    () => ({ toastState, modalState, toast, modal, hideModal }),
    [toastState, modalState, toast, modal, hideModal]
  );

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export function useUi(): UiContextValue {
  const ctx = useContext(UiContext);
  if (!ctx) throw new Error("useUi muss innerhalb von <UiProvider> verwendet werden");
  return ctx;
}
