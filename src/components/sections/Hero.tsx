"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { ProfileCard } from "@/components/ui/ProfileCard";
import { gsap } from "@/lib/gsap";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const profileCardRef = useRef<HTMLDivElement>(null);
  const bgWrapperRef = useRef<HTMLDivElement>(null);

  // Parallax and Entrance animations
  useEffect(() => {
    if (!textRef.current || !profileCardRef.current || !bgWrapperRef.current || !heroRef.current) return;

    // Parallax background
    gsap.to(bgWrapperRef.current, {
      y: "15%",
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    const texts = textRef.current.querySelectorAll(".hero-text");

    gsap.fromTo(
      texts,
      { y: 50, opacity: 0, filter: "blur(10px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.5 }
    );

    gsap.fromTo(
      profileCardRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 1 }
    );
  }, []);

  return (
    <section ref={heroRef} id="hero" className="relative h-screen w-full p-3 md:p-5 pb-0 flex flex-col bg-bg">
      <div className="relative w-full h-full rounded-[2rem] bg-bg-dark overflow-hidden shadow-2xl">
        {/* Background Image Wrapper */}
        <div
          ref={bgWrapperRef}
          className="absolute inset-0 w-full h-[100%] -top-[0%]"
        >
          {/* Mobile image: visible on small screens only */}
          <Image
            src="/hero_section_image_mobile.png"
            alt="Hero Background Mobile"
            fill
            className="object-cover block md:hidden"
            priority
          />
          {/* Desktop image: visible on medium and larger screens */}
          <Image
            src="/hero_image2.png"
            alt="Hero Background"
            fill
            className="object-cover hidden md:block"
            priority
          />
          {/* Subtle gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="absolute inset-0 w-full h-full px-8 md:px-16 flex flex-col justify-end pb-12 md:pb-16">
          <div className="flex flex-col md:flex-row justify-between md:items-end w-full gap-8">
            <div ref={textRef} className="text-white z-10">
              <p className="hero-text text-lg md:text-lg mb-4 font-medium tracking-wide">Hello There — I&apos;m</p>
              <h1 className="hero-text text-[clamp(2.5rem,8vw,7rem)] font-bold leading-[0.85] tracking-[-0.04em]">
                Hermouch<br />Abdelmajid
              </h1>
            </div>

            <div ref={profileCardRef} className="hidden md:block z-10 self-end">
              <ProfileCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
