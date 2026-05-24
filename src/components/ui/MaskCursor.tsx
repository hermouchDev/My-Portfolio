"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function MaskCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Check if it's a touch device or fine pointer isn't supported
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice || !cursorRef.current) return;

    // Initial setup
    gsap.set(cursorRef.current, {
      xPercent: -50,
      yPercent: -50,
      width: 70,
      height: 70,
    });

    // Create quickTo for smooth following
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.6, ease: "power3" });

    // Mouse move handler
    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    // Hover effect for links and buttons
    const handleMouseEnter = () => {
      gsap.to(cursorRef.current, { width: 60, height: 60, duration: 0.3, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
      gsap.to(cursorRef.current, { width: 150, height: 150, duration: 0.3, ease: "power2.out" });
    };

    const addHoverEvents = () => {
      const interactables = document.querySelectorAll("a, button, [role='button'], input, textarea, select");
      interactables.forEach((el) => {
        // Remove first to avoid duplicates if MutationObserver fires multiple times
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    const removeHoverEvents = () => {
      const interactables = document.querySelectorAll("a, button, [role='button'], input, textarea, select");
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };

    // Mutation observer to handle dynamically added elements
    const observer = new MutationObserver(() => {
      addHoverEvents();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMouseMove);
    addHoverEvents();

    // Show cursor when GSAP is ready (prevents flash at 0,0)
    gsap.set(cursorRef.current, { opacity: 1 });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      removeHoverEvents();
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-white mix-blend-difference opacity-0 hidden md:block"
      style={{ willChange: "transform, width, height" }}
    />
  );
}
