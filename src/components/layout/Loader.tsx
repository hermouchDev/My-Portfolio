"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const screenRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const whiteTextRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Block scroll immediately
    document.body.style.overflow = "hidden";

    const screen = screenRef.current;
    const wrapper = wrapperRef.current;
    const whiteText = whiteTextRef.current;
    const counter = counterRef.current;

    if (!screen || !wrapper || !whiteText || !counter) return;

    // Master timeline
    const tl = gsap.timeline();

    // ─── ENTRANCE: zoom from 1.4 → 1.0 ───
    tl.fromTo(
      wrapper,
      { scale: 1.4 },
      { scale: 1, duration: 0.8, ease: "power3.out" }
    );

    // ─── Fade in counter ───
    tl.fromTo(
      counter,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    );

    // ─── FILL ANIMATION: clip-path reveal + counter ───
    const obj = { val: 0 };
    tl.to(obj, {
      val: 100,
      duration: 2.5,
      ease: "power1.inOut",
      onUpdate: () => {
        const progress = Math.round(obj.val);
        // Update counter text
        counter.textContent = "loading... " + progress + " %";

        // Generate wavy polygon clip-path
        const baseY = 100 - progress;
        const waveAmplitude = 6;
        const segments = 24;
        const phase = progress * 0.08;

        // Dampen wave at start and end for clean transitions
        const damping =
          Math.min(progress / 15, 1) * Math.min((100 - progress) / 15, 1);

        let polyPoints = "";
        for (let i = 0; i <= segments; i++) {
          const x = (i / segments) * 100;
          const wave =
            Math.sin((i / segments) * Math.PI * 3 + phase) * waveAmplitude * damping;
          const y = Math.max(0, Math.min(100, baseY + wave));
          polyPoints += `${x.toFixed(1)}% ${y.toFixed(1)}%`;
          if (i < segments) polyPoints += ", ";
        }

        // Close polygon at bottom corners
        whiteText.style.clipPath =
          `polygon(${polyPoints}, 100% 100%, 0% 100%)`;
      },
    });

    // ─── EXIT: after 0.3s delay ───
    const exitTl = gsap.timeline({ delay: 0.3 });

    // Step 1: zoom back in
    exitTl.to(wrapper, {
      scale: 1.4,
      duration: 0.6,
      ease: "power3.in",
    });

    // Step 2: fade entire loader to black then invisible
    exitTl.to(
      screen,
      {
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
          document.body.style.overflow = "";
          setDone(true);
          onComplete();
        },
      },
      "-=0.1"
    );

    // Chain: master timeline finishes → exit timeline plays
    tl.add(exitTl);

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (done) return null;

  return (
    <div
      ref={screenRef}
      className="loader-screen"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#0A0A0A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 1rem",
        overflow: "hidden",
      }}
    >
      {/* Name wrapper — contains both text layers + counter */}
      <div
        ref={wrapperRef}
        className="loader-name-wrapper"
        style={{
          position: "relative",
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "100%",
        }}
      >
        {/* Text container — both layers stacked */}
        <div
          style={{
            position: "relative",
            lineHeight: 1,
            width: "100%",
          }}
        >
          {/* Layer 1 (bottom): dark gray — always visible */}
          <span
            style={{
              display: "block",
              fontSize: "clamp(2.5rem, 12vw, 10rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              color: "#2A2A2A",
              textAlign: "center",
              userSelect: "none",
            }}
            aria-hidden="true"
          >
            Hermouch
          </span>

          {/* Layer 2 (top): white — clipped, revealed bottom to top */}
          <span
            ref={whiteTextRef}
            style={{
              position: "absolute",
              inset: 0,
              display: "block",
              fontSize: "clamp(2.5rem, 12vw, 10rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              textAlign: "center",
              userSelect: "none",
              clipPath: "inset(100% 0% 0% 0%)",
            }}
            aria-hidden="true"
          >
            Hermouch
          </span>
        </div>

        {/* Counter — bottom-right, relative to the text */}
        <span
          ref={counterRef}
          style={{
            position: "absolute",
            bottom: "clamp(-1.2rem, -2vw, -1.5rem)",
            right: 0,
            fontSize: "clamp(10px, 1.5vw, 12px)",
            fontFamily: "'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace",
            fontWeight: 300,
            color: "#FFFFFF",
            opacity: 0,
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          loading... 0 %
        </span>
      </div>
    </div>
  );
}
