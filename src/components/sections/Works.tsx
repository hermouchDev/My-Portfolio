"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { projects } from "@/lib/projects";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Works() {
  const containerRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

  useEffect(() => {
    if (!containerRef.current || !stickyRef.current) return;

    // "Works" title char reveal
    const titleCtx = gsap.context(() => {
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

      if (titleRef.current) {
        const splitTitle = new SplitText(titleRef.current, { type: "chars" });
        gsap.fromTo(
          splitTitle.chars,
          { opacity: 0.08 },
          {
            opacity: 1,
            stagger: 0.05,
            ease: "none",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
              end: "top 40%",
              scrub: true,
            },
          }
        );
      }

      // Subtitle mask reveal
      if (subtitleRef.current) {
        const words = subtitleRef.current.querySelectorAll(".word");
        gsap.fromTo(
          words,
          { y: "120%", rotationZ: 4, opacity: 0 },
          {
            y: "0%",
            rotationZ: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.02,
            ease: "power4.out",
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, containerRef);

    // Stacking/Sliding images logic
    const stickyCtx = gsap.context(() => {
      const bgLayers = gsap.utils.toArray<HTMLElement>(".bg-layer");
      const stripImages = gsap.utils.toArray<HTMLElement>(".strip-image");

      // Set initial states
      bgLayers.forEach((layer, i) =>
        gsap.set(layer, { opacity: i === 0 ? 1 : 0 })
      );
      stripImages.forEach((img, i) =>
        gsap.set(img, { yPercent: i === 0 ? 0 : 100 })
      );

      // Create a timeline for the pinned section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stickyRef.current,
          start: "top top",
          end: `+=${(projects.length - 1) * 100}%`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            // Update the active project index based on scroll progress
            setActiveIndex(Math.round(self.progress * (projects.length - 1)));
          },
        },
      });

      // Animate between projects
      projects.forEach((_, i) => {
        if (i === 0) return;

        tl.to(bgLayers[i - 1], { opacity: 0, duration: 1 }, `step${i}`)
          .to(bgLayers[i], { opacity: 1, duration: 1 }, `step${i}`)
          .to(stripImages[i - 1], { yPercent: -100, duration: 1 }, `step${i}`)
          .to(stripImages[i], { yPercent: 0, duration: 1 }, `step${i}`);
      });
    }, stickyRef);

    return () => {
      titleCtx.revert();
      stickyCtx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} id="works" className="relative w-full bg-bg">
      {/* Massive Background Text */}
      <div className="absolute top-20 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03] select-none flex justify-center z-0">
        <h2 className="bg-text-parallax text-[clamp(8rem,20vw,25rem)] font-bold leading-none tracking-tighter whitespace-nowrap">
          PORTFOLIO
        </h2>
      </div>

      {/* Header — scrolls normally before pinned section */}
      <div className="max-w-6xl mx-auto px-6 relative z-10 w-full pt-24 pb-12">
        <div className="flex flex-col justify-center items-center text-center mb-16 gap-6">
          <h2 ref={titleRef} className="text-[clamp(3rem,6vw,5rem)] font-bold leading-[0.9] tracking-tighter text-primary-text">
            Selected Works.
          </h2>
          <p ref={subtitleRef} className="text-xl text-primary-text/60 max-w-xl">
            {renderAnimatedText("A curated selection of my latest projects, crafted with precision and passion.")}
          </p>
        </div>
      </div>

      {/* Sticky Pinned Section */}
      <div ref={stickyRef as any} className="w-full h-screen relative overflow-hidden bg-[#F5F3EE]">

        {/* Fading Background Layers */}
        {projects.map((project, idx) => (
          <div key={`bg-${project.slug}`} className="bg-layer absolute inset-0 z-0">
            {/* Inner padding container to show the off-white background */}
            <div
              className="absolute inset-0"
              style={{
                padding: "clamp(24px, 5vw, 64px)",
                paddingTop: "clamp(16px, 3vw, 40px)",
                paddingBottom: "clamp(24px, 5vw, 64px)",
              }}
            >
              <div
                className="relative w-full h-full overflow-hidden"
                style={{ borderRadius: "clamp(10px, 1.2vw, 16px)" }}
              >
                {/* Blurred Background Image */}
                {project.image ? (
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority={idx === 0}
                    style={{
                      filter: "blur(8px)",
                      transform: "scale(1.05)",
                    }}
                  />
                ) : (
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-800"
                    style={{
                      filter: "blur(8px)",
                      transform: "scale(1.05)",
                    }}
                  />
                )}

                {/* Dark Overlay for text contrast */}
                <div
                  className="absolute inset-0"
                  style={{ background: "rgba(0,0,0,0.15)" }}
                />

                {/* Project Title */}
                <h3
                  className="absolute font-bold tracking-tight z-20"
                  style={{
                    bottom: "clamp(20px, 3vw, 48px)",
                    left: "clamp(20px, 3vw, 48px)",
                    fontSize: "clamp(1.25rem, 2.5vw, 2.25rem)",
                    color: "#FFFFFF",
                    lineHeight: 1.1,
                    textShadow: "0 2px 12px rgba(0,0,0,0.4)",
                  }}
                >
                  <span style={{ marginRight: "0.3em" }}>·</span>
                  {project.title}
                </h3>

                {/* Project Year */}
                <span
                  className="absolute font-medium z-20"
                  style={{
                    bottom: "clamp(20px, 3vw, 48px)",
                    right: "clamp(20px, 3vw, 48px)",
                    fontSize: "clamp(0.75rem, 1vw, 0.95rem)",
                    color: "rgba(255,255,255,0.85)",
                    textShadow: "0 1px 8px rgba(0,0,0,0.3)",
                  }}
                >
                  {project.year}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Fixed Center Card */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center pointer-events-none"
          style={{ width: "clamp(260px, 45vw, 560px)" }}
        >
          {/* Mask Container for Sliding Images */}
          <div
            className="relative w-full overflow-hidden shadow-2xl z-10 bg-[#F5F3EE] pointer-events-auto"
            style={{ aspectRatio: "2 / 1" }}
          >
            {projects.map((project) => (
              <Link
                href={`/works/${project.slug}`}
                key={`img-${project.slug}`}
                className="strip-image absolute inset-0 block w-full h-full"
              >
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 90vw, 45vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-800 flex items-center justify-center p-4 text-center">
                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight opacity-70">
                      {project.title}
                    </h3>
                  </div>
                )}
              </Link>
            ))}
          </div>

          {/* Bottom Explore Now */}
          <Link
            href={`/works/${projects[activeIndex]?.slug || "#"}`}
            className="group w-full bg-white text-black text-center font-medium shadow-lg relative z-20 pointer-events-auto transition-colors duration-300 hover:bg-gray-100"
            style={{
              fontSize: "clamp(0.65rem, 0.8vw, 0.8rem)",
              padding: "clamp(8px, 1vw, 14px) clamp(24px, 3vw, 48px)",
              letterSpacing: "0.02em",
              marginTop: "-1px",
            }}
          >
            <span className="inline-block transition-transform duration-300 group-hover:scale-105">
              Explore Now
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}
