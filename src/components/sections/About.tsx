"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";

export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !headlineRef.current || !imageRef.current || !wrapperRef.current) return;

    // Scrub Headline Reveal (opacity scrub instead of clipPath)
    const splitHeadline = new SplitText(headlineRef.current, { type: "words" });
    gsap.fromTo(
      splitHeadline.words,
      { opacity: 0.15 },
      {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: headlineRef.current,
          start: "top 80%",
          end: "bottom 40%",
          scrub: true,
        },
      }
    );

    // Counter Animation
    const counterEl = headlineRef.current.querySelector(".counter-number");
    if (counterEl) {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: 2, // Changed to 2+
        ease: "none",
        scrollTrigger: {
          trigger: headlineRef.current,
          start: "top 80%",
          end: "bottom 40%",
          scrub: true,
        },
        onUpdate: () => {
          counterEl.textContent = Math.round(obj.val).toString();
        },
      });
    }

    // Image Parallax 
    gsap.fromTo(
      imageRef.current,
      { y: "-10%" },
      {
        y: "10%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    // Entrance animation for image wrapper
    gsap.fromTo(
      wrapperRef.current,
      { x: -80, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 80%",
        }
      }
    );

    return () => {
      splitHeadline.revert();
    };
  }, []);

  return (
    <section ref={containerRef} id="about" className="py-32 px-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-between">

        {/* Left Side: Label and Image */}
        <div className="w-full lg:w-[40%] mb-12 lg:mb-0 flex flex-col gap-8">
          <div>
            <SectionLabel text="Who Am I" />
          </div>
          <div ref={wrapperRef} className="opacity-0">
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mr-auto overflow-hidden rounded-2xl shadow-2xl">
              <div ref={imageRef} className="absolute inset-0 h-[120%] -top-[20%]">
                <Image
                  src="/about-photo.jpg"
                  alt="About me"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Text */}
        <div className="w-full lg:w-[60%] flex flex-col">
          <h2
            ref={headlineRef}
            className="text-[clamp(1.75rem,3.5vw,3rem)] font-medium leading-[1.2] tracking-tight"
          >
            I&apos;m a Full Stack Developer With <span className="counter-number tabular-nums">0</span>+ Years of Experience in Building Scalable Web Applications and High-growth Digital Products. <br /><br />Based in Morocco 🇲🇦 <br /> Open to remote opportunities worldwide.
          </h2>

          <div className="flex flex-wrap gap-4 mt-12">
            <a
              href="/cv/hermouch-abdelmajid-cv-new.pdf"
              download="hermouch-abdelmajid-cv-new.pdf"
              className="bg-black text-white hover:bg-black/80 rounded-full px-8 py-3.5 text-sm font-medium transition-colors inline-flex items-center justify-center"
            >
              Resume
            </a>
            <a
              href="#works"
              className="bg-black/5 text-black hover:bg-black/10 rounded-full px-8 py-3.5 text-sm font-medium transition-colors inline-flex items-center justify-center"
            >
              View My Work
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
