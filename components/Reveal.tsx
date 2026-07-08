"use client";

/* Scroll-Reveal: blendet Elemente beim ersten Sichtbarwerden ein.
   Respektiert prefers-reduced-motion (dann sofort sichtbar). */

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

interface RevealProps {
  as?: ElementType;
  className?: string;
  /** Verzögerung in ms (CSS-Variable --reveal-delay) */
  delay?: number;
  style?: CSSProperties;
  children?: ReactNode;
  [key: string]: unknown;
}

export default function Reveal({
  as: Tag = "div",
  className,
  delay,
  style,
  children,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const mergedStyle: CSSProperties | undefined =
    delay != null
      ? ({ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties)
      : style;

  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={mergedStyle}
      {...rest}
    >
      {children}
    </Tag>
  );
}
