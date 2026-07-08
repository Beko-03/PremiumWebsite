"use client";

/* Video-Hero „Roast in Motion“ (Intro + Dampf-Loop).
   Beim Laden spielt das Video einmal das Intro (fallende Bohnen), danach
   loopt nur noch das ruhige Dampf-Segment endlos; der Loop-Sprung wird mit
   einer kurzen Abblende kaschiert. Bei prefers-reduced-motion: Standbild. */

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* Stellschrauben (Sekunden im Video):
   INTRO_END = wo das Intro endet und der Loop beginnt.
   LOOP_TAIL = Abstand zum Videoende, an dem zurückgesprungen wird. */
const INTRO_END = 3.0;
const LOOP_TAIL = 0.12;
const FADE_LEAD = 0.3;

interface VideoHeroProps {
  eyebrow: ReactNode;
  line1: ReactNode;
  line2: ReactNode;
  lede: ReactNode;
  cta1: ReactNode;
  cta2: ReactNode;
  scrollHint: ReactNode;
}

export default function VideoHero({ eyebrow, line1, line2, lede, cta1, cta2, scrollHint }: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const [isStatic, setIsStatic] = useState(false);
  /* Anzahl eingeblendeter Elemente: line1, line2, lede, actions */
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    const fade = fadeRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches) {
      setIsStatic(true);
      setShown(4);
      if (video) {
        video.removeAttribute("autoplay");
        video.pause();
      }
      return;
    }

    /* Texte kurz nach dem Laden gestaffelt einblenden */
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < 4; i++) {
      timers.push(setTimeout(() => setShown(i + 1), 350 + i * 280));
    }

    if (!video) return () => timers.forEach(clearTimeout);

    video.muted = true;

    let loopEnd = 0;
    let fading = false;

    const onLoadedMetadata = () => {
      loopEnd = Math.max(INTRO_END + 0.5, (video.duration || 0) - LOOP_TAIL);
    };

    const onTimeUpdate = () => {
      if (!loopEnd) return;
      /* Kurz vor dem Sprung abblenden */
      if (!fading && video.currentTime >= loopEnd - FADE_LEAD) {
        fading = true;
        fade?.classList.add("is-on");
      }
      /* Zurück zum Anfang des Dampf-Segments */
      if (video.currentTime >= loopEnd) {
        video.currentTime = INTRO_END;
      }
    };

    const onSeeked = () => {
      if (fading) {
        setTimeout(() => {
          fade?.classList.remove("is-on");
          fading = false;
        }, 120);
      }
    };

    /* Sicherheitsnetz: Das Video darf nie stehen bleiben */
    const onEnded = () => {
      fade?.classList.add("is-on");
      fading = true;
      video.currentTime = INTRO_END;
      void video.play();
    };

    const onVisibility = () => {
      if (!document.hidden && video.paused) void video.play();
    };

    /* Falls der Browser Autoplay blockiert: beim ersten Tipp/Scroll starten */
    const tryPlay = () => {
      const p = video.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          const once = () => {
            void video.play();
            window.removeEventListener("pointerdown", once);
            window.removeEventListener("scroll", once);
          };
          window.addEventListener("pointerdown", once, { once: true });
          window.addEventListener("scroll", once, { once: true, passive: true });
        });
      }
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("ended", onEnded);
    document.addEventListener("visibilitychange", onVisibility);

    if (video.readyState >= 1) onLoadedMetadata();
    if (video.readyState >= 2) tryPlay();
    else video.addEventListener("canplay", tryPlay, { once: true });

    return () => {
      timers.forEach(clearTimeout);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("canplay", tryPlay);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <section className={`vhero${isStatic ? " is-static" : ""}`} aria-label="Intro">
      <div className="vhero__stage">
        <video
          ref={videoRef}
          className="vhero__media"
          autoPlay
          muted
          playsInline
          preload="auto"
          poster="/assets/img/roastery-hall.webp"
          src="/assets/video/hero-roast.mp4"
        />
        <div ref={fadeRef} className="vhero__fade" aria-hidden="true" />
        <div className="vhero__content">
          <p className="eyebrow">{eyebrow}</p>
          <h1>
            <span className={`vhero__line${shown >= 1 ? " is-in" : ""}`}>{line1}</span>
            <span className={`vhero__line${shown >= 2 ? " is-in" : ""}`}>{line2}</span>
          </h1>
          <p className={`vhero__lede${shown >= 3 ? " is-in" : ""}`}>{lede}</p>
          <div className={`vhero__actions${shown >= 4 ? " is-in" : ""}`}>
            <Link className="btn btn--primary" href="/shop/">
              <span>{cta1}</span>
              <svg aria-hidden="true">
                <use href="#i-arrow" />
              </svg>
            </Link>
            <Link className="btn btn--ghost vhero__btn-ghost" href="/reservierung/">
              {cta2}
            </Link>
          </div>
        </div>
        <p className="vhero__scrollhint" aria-hidden="true">
          {scrollHint}
        </p>
      </div>
    </section>
  );
}
