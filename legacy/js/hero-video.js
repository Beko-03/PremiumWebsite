/* Marlow — Video-Hero „Roast in Motion“ (Intro + Dampf-Loop).
   Ablauf: Beim Laden spielt das Video einmal das Intro (fallende Bohnen),
   danach loopt nur noch das ruhige Dampf-Segment endlos. Der Loop-Sprung
   wird mit einer kurzen Abblende kaschiert. Kein Scroll-Scrubbing mehr —
   die Seite scrollt normal weiter.
   Bei prefers-reduced-motion bleibt ein Standbild stehen. */

(function () {
  "use strict";

  /* Stellschrauben (Sekunden im Video, bei Bedarf anpassen):
     INTRO_END = wo das Intro endet und der Loop beginnt.
     LOOP_TAIL = Abstand zum Videoende, an dem zurückgesprungen wird. */
  var INTRO_END = 3.0;
  var LOOP_TAIL = 0.12;
  var FADE_LEAD = 0.3; /* Abblende beginnt so viele Sekunden vor dem Sprung */

  var hero = document.querySelector(".vhero");
  if (!hero) return;

  var video = hero.querySelector(".vhero__media");
  var fade = hero.querySelector(".vhero__fade");
  var lines = hero.querySelectorAll(".vhero__line");
  var lede = hero.querySelector(".vhero__lede");
  var actions = hero.querySelector(".vhero__actions");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function showAll() {
    lines.forEach(function (l) { l.classList.add("is-in"); });
    if (lede) lede.classList.add("is-in");
    if (actions) actions.classList.add("is-in");
  }

  /* Texte kurz nach dem Laden gestaffelt einblenden */
  function revealStaged() {
    var order = [];
    lines.forEach(function (l) { order.push(l); });
    if (lede) order.push(lede);
    if (actions) order.push(actions);
    order.forEach(function (el, i) {
      setTimeout(function () { el.classList.add("is-in"); }, 350 + i * 280);
    });
  }

  if (reduceMotion.matches) {
    hero.classList.add("is-static");
    if (video) {
      video.removeAttribute("autoplay");
      video.pause();
    }
    showAll();
    return;
  }

  if (!video) {
    showAll();
    return;
  }

  video.muted = true;
  revealStaged();

  var loopEnd = 0;
  var fading = false;

  video.addEventListener("loadedmetadata", function () {
    loopEnd = Math.max(INTRO_END + 0.5, (video.duration || 0) - LOOP_TAIL);
  });

  video.addEventListener("timeupdate", function () {
    if (!loopEnd) return;

    /* Kurz vor dem Sprung abblenden */
    if (!fading && video.currentTime >= loopEnd - FADE_LEAD) {
      fading = true;
      if (fade) fade.classList.add("is-on");
    }

    /* Zurück zum Anfang des Dampf-Segments */
    if (video.currentTime >= loopEnd) {
      video.currentTime = INTRO_END;
    }
  });

  video.addEventListener("seeked", function () {
    if (fading) {
      setTimeout(function () {
        if (fade) fade.classList.remove("is-on");
        fading = false;
      }, 120);
    }
  });

  /* Sicherheitsnetz: Falls das Video das Ende erreicht, bevor der
     timeupdate-Rücksprung greift, sofort zurückspringen und weiterspielen —
     das Video darf nie stehen bleiben. */
  video.addEventListener("ended", function () {
    if (fade) fade.classList.add("is-on");
    fading = true;
    video.currentTime = INTRO_END;
    video.play();
  });

  /* Nach Tab-Wechsel oder Energiespar-Pause automatisch weiterlaufen */
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden && video.paused) video.play();
  });

  /* Falls der Browser Autoplay blockiert: beim ersten Tipp/Scroll starten */
  function tryPlay() {
    var p = video.play();
    if (p && p.catch) {
      p.catch(function () {
        var once = function () {
          video.play();
          window.removeEventListener("pointerdown", once);
          window.removeEventListener("scroll", once);
        };
        window.addEventListener("pointerdown", once, { once: true });
        window.addEventListener("scroll", once, { once: true, passive: true });
      });
    }
  }

  if (video.readyState >= 2) tryPlay();
  else video.addEventListener("canplay", tryPlay, { once: true });
})();
