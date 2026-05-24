"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const items = [
  "Frontend Development",
  "Backend Development",
  "UI/UX Design",
  "Performance",
  "Open Source",
  "Responsive Design",
  "SEO Optimization",
];

export function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Duplicate content for seamless loop
    const tl = gsap.to(containerRef.current, {
      xPercent: -50, // Move halfway (since we duplicate)
      repeat: -1,
      duration: 30,
      ease: "none",
    });

    const handleEnter = () => tl.pause();
    const handleLeave = () => tl.play();

    const node = containerRef.current;
    node.addEventListener("mouseenter", handleEnter);
    node.addEventListener("mouseleave", handleLeave);

    return () => {
      tl.kill();
      node.removeEventListener("mouseenter", handleEnter);
      node.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const content = (
    <div className="flex items-center gap-12 px-6 shrink-0">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-12">
          <span className="text-4xl md:text-7xl font-bold whitespace-nowrap">{item}</span>
          <span className="text-4xl md:text-7xl text-accent">•</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full overflow-hidden bg-bg py-24 border-t border-primary-text/10">
      <div ref={containerRef} className="flex w-fit cursor-pointer">
        {content}
        {content}
      </div>
    </div>
  );
}
