"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { certificates } from "@/lib/certificates";
import { ExternalLink, Award } from "lucide-react";

export function Certificates() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax text
      gsap.to(".bg-text-parallax", {
        y: -200,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      // Header text reveal animation
      if (headerRef.current) {
        const words = headerRef.current.querySelectorAll('.word');
        gsap.fromTo(
          words,
          {
            y: "120%",
            rotationZ: 4,
            opacity: 0
          },
          {
            y: "0%",
            rotationZ: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.05,
            ease: "power4.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
            }
          }
        );
      }

      // Horizontal Scroll Animation
      const cards = gsap.utils.toArray(".certificate-card");

      const totalWidth = scrollContainerRef.current!.scrollWidth - window.innerWidth;

      gsap.to(cards, {
        x: () => -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });

      // Individual Card Parallax & Opacity
      cards.forEach((card: any, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            scrollTrigger: {
              trigger: card,
              containerAnimation: gsap.getById("horizontal-scroll") || undefined, // Not strictly needed for simple scrub, but good for custom triggers
              start: "left 80%",
              end: "left 50%",
              scrub: true,
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const renderAnimatedText = (text: string) => {
    return text.split(" ").map((word, i, arr) => (
      <span key={i} className="inline-block">
        <span className="inline-block overflow-hidden align-bottom pb-2 -mb-2">
          <span className="word inline-block origin-bottom-left leading-tight">{word}</span>
        </span>
        {i !== arr.length - 1 && <span>&nbsp;</span>}
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      id="certificates"
      className="relative w-full bg-bg h-screen overflow-hidden flex flex-col justify-center"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-accent/5 blur-[120px] pointer-events-none z-0"></div>

      {/* Massive Background Text */}
      <div className="absolute top-20 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03] select-none flex justify-center z-0">
        <h2 className="bg-text-parallax text-[clamp(8rem,20vw,25rem)] font-bold leading-none tracking-tighter whitespace-nowrap">
          CREDENTIALS
        </h2>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 w-full mt-24">
        <div ref={headerRef} className="flex flex-col justify-center items-center text-center mb-16 gap-6">
          <h2 className="text-[clamp(3rem,6vw,5rem)] font-bold leading-[0.9] tracking-tighter text-primary-text">
            {renderAnimatedText("Professional Certifications.")}
          </h2>
          <p className="text-xl text-primary-text/60 max-w-xl">
            {renderAnimatedText("Verified credentials and continuous learning to stay at the forefront of technology.")}
          </p>
        </div>
      </div>

      <div className="w-full overflow-hidden relative z-10 pb-20">
        <div
          ref={scrollContainerRef}
          className="flex gap-8 md:gap-16 px-6 md:px-12 xl:px-24 w-max"
        >
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="certificate-card group relative w-[85vw] md:w-[60vw] lg:w-[45vw] xl:w-[35vw] flex-shrink-0 flex flex-col gap-6"
            >
              {/* Image Container with Hover Effect */}
              <Link
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-[1.4/1] w-full rounded-2xl overflow-hidden bg-primary-text/5 border border-primary-text/10"
              >
                <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay"></div>
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 85vw, (max-width: 1024px) 60vw, 45vw"
                />

                {/* Floating View Button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:-translate-y-1/2">
                  <div className="flex items-center gap-2 bg-bg/90 backdrop-blur-md text-primary-text px-6 py-3 rounded-full border border-primary-text/10 shadow-xl font-medium text-sm">
                    View Credential <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </Link>

              {/* Certificate Details */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-xl md:text-2xl font-bold text-primary-text leading-tight group-hover:text-accent transition-colors duration-300">
                    {cert.title}
                  </h3>
                </div>
                <div className="flex items-center gap-3 text-primary-text/60 text-sm font-medium">
                  <span className="bg-primary-text/5 px-3 py-1 rounded-full border border-primary-text/10">
                    {cert.issuer}
                  </span>
                  <span>•</span>
                  <span>{cert.date}</span>
                </div>
              </div>
            </div>
          ))}
          {/* Spacer at the end so the last card doesn't stick to the edge */}
          <div className="w-[10vw] flex-shrink-0"></div>
        </div>
      </div>
    </section>
  );
}
