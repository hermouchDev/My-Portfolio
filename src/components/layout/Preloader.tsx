"use client";

import { useRef, useMemo, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const SKILL_WORDS = [
  "NEXTJS",
  "REACT",
  "GSAP",
  "NODEJS",
  "TAILWIND",
  "CREATIVE",
  "FRONTEND",
  "BACKEND",
  "FULLSTACK",
  "HERMOUCH",
  "ABDELMAJID",
] as const;

const FORMED_LINES = ["FRONTEND", "CREATIVE", "DEVELOPER"] as const;

const LOADER_BG = "#C8D4C8";
const LETTER_COLOR = "#2A3A2A";
const BASE_RADIUS = 280;
const MOBILE_RADIUS = 160;

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function buildLetters() {
  const chars: { char: string; id: string; rotation: number; fontSize: number }[] = [];
  SKILL_WORDS.forEach((word, wordIndex) => {
    [...word].forEach((char, charIndex) => {
      const index = chars.length;
      chars.push({
        char,
        id: `letter-${wordIndex}-${charIndex}-${char}`,
        rotation: seededRandom(index * 3 + 1) * 360 - 180,
        fontSize: 12 + seededRandom(index * 7 + 2) * 6,
      });
    });
  });
  return chars;
}

function getCircleRadius(): number {
  if (typeof window === "undefined") return BASE_RADIUS;
  return window.innerWidth < 768 ? MOBILE_RADIUS : BASE_RADIUS;
}

export const PRELOADER_COMPLETE_EVENT = "preloader-complete";

export function Preloader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const lettersRef = useRef<HTMLDivElement>(null);
  const formedRef = useRef<HTMLDivElement>(null);
  const letterElsRef = useRef<HTMLSpanElement[]>([]);
  const [visible, setVisible] = useState(true);

  const letters = useMemo(() => buildLetters(), []);

  const finish = useCallback(() => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.documentElement.classList.remove("lenis-stopped");
    window.dispatchEvent(new CustomEvent(PRELOADER_COMPLETE_EVENT));
    setVisible(false);
  }, []);

  useGSAP(
    () => {
      if (!loaderRef.current || !counterRef.current || !lettersRef.current) return;

      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.documentElement.classList.add("lenis-stopped");

      const radius = getCircleRadius();
      const totalLetters = letters.length;
      const letterEls = letterElsRef.current.filter(Boolean);

      letterEls.forEach((el, index) => {
        const angle = (index / totalLetters) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        gsap.set(el, {
          x,
          y,
          rotation: letters[index].rotation,
          transformOrigin: "center center",
          opacity: 1,
        });
      });

      gsap.set(formedRef.current, { opacity: 0 });
      gsap.set(counterRef.current, { opacity: 1 });

      const counterObj = { val: 0 };

      const mobileScale = typeof window !== "undefined" && window.innerWidth < 768 ? 0.82 : 1;
      gsap.set(lettersRef.current, { scale: mobileScale, transformOrigin: "center center" });

      const tl = gsap.timeline();

      tl.to(
        counterObj,
        {
          val: 100,
          duration: 2.5,
          ease: "power1.inOut",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = `${Math.round(counterObj.val)}%`;
            }
          },
        },
        0
      );

      tl.to(
        letterEls,
        {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 2.5,
          ease: "power2.inOut",
          stagger: {
            each: 0.01,
            from: "random",
          },
        },
        0
      );

      tl.to(
        letterEls,
        {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
        },
        1.9
      );

      if (formedRef.current) {
        const formedLines = formedRef.current.querySelectorAll(".formed-line");
        gsap.set(formedLines, { y: 6 });
        tl.to(
          formedLines,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.1,
          },
          1.85
        );
      }

      tl.to(
        loaderRef.current,
        {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
          onComplete: finish,
        },
        2.9
      );

      return () => {
        tl.kill();
      };
    },
    { scope: loaderRef, dependencies: [letters, finish] }
  );

  if (!visible) return null;

  return (
    <div
      ref={loaderRef}
      className="loader fixed inset-0 z-[100] flex items-center justify-center overflow-hidden will-change-transform"
      style={{ backgroundColor: LOADER_BG }}
      aria-hidden={false}
      aria-label="Loading"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <div
          ref={lettersRef}
          className="letters-stage pointer-events-none absolute left-1/2 top-1/2 h-0 w-0"
        >
          {letters.map((letter, index) => (
            <span
              key={letter.id}
              ref={(el) => {
                if (el) letterElsRef.current[index] = el;
              }}
              className="letter absolute left-0 top-0 select-none font-mono font-semibold leading-none will-change-transform"
              style={{
                color: LETTER_COLOR,
                fontSize: `${letter.fontSize}px`,
              }}
            >
              {letter.char}
            </span>
          ))}
        </div>

        <span
          ref={counterRef}
          className="counter relative z-10 font-mono text-base font-medium tabular-nums"
          style={{ color: LETTER_COLOR }}
        >
          0%
        </span>

        <div
          ref={formedRef}
          className="formed-words pointer-events-none absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-0.5 text-center opacity-0"
        >
          {FORMED_LINES.map((line) => (
            <p
              key={line}
              className="formed-line translate-y-2 font-mono text-sm font-bold uppercase tracking-[0.2em] opacity-0 md:text-base"
              style={{ color: LETTER_COLOR }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
