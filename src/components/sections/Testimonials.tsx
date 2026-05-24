"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";

/* ─── Data ─────────────────────────────────────────────────────── */
const row1Data = [
  {
    name: "Karim B.",
    role: "CTO · FinSync",
    quote:
      "He built our entire fintech dashboard from scratch — Next.js frontend, Node.js backend, PostgreSQL database. Clean architecture, zero technical debt. Shipped in 3 weeks.",
    avatar: "https://i.pravatar.cc/52?img=11",
  },
  {
    name: "Sophie L.",
    role: "Product Lead · Shopwave",
    quote:
      "Integrated Stripe payments and built our custom checkout flow. Conversion rate jumped 34% after launch. He understood the business goal, not just the technical spec.",
    avatar: "https://i.pravatar.cc/52?img=5",
  },
  {
    name: "Yassine M.",
    role: "Founder · Launchpad",
    quote:
      "Rebuilt our entire platform from a slow WordPress site to a fast Next.js app with a REST API backend. Page load went from 6s to under 1s. Users noticed immediately.",
    avatar: "https://i.pravatar.cc/52?img=15",
  },
  {
    name: "Elena R.",
    role: "CEO · Novalab",
    quote:
      "He built our SaaS MVP in 4 weeks — auth system, dashboard, subscription billing, admin panel. Everything worked on day one. Rare to find this level of reliability.",
    avatar: "https://i.pravatar.cc/52?img=9",
  },
];

const row3Data = [...row1Data].reverse();

const row2Data = [
  {
    name: "Marcus T.",
    role: "Engineering Lead · Orbitly",
    quote:
      "Best API design I have seen from a freelancer. RESTful, well documented, properly typed with TypeScript end to end. Our team plugged into his work with zero onboarding friction.",
    avatar: "https://i.pravatar.cc/52?img=3",
  },
  {
    name: "Amira H.",
    role: "Co-founder · Storify",
    quote:
      "He took our Figma designs and turned them into pixel-perfect, fully animated React components. The scroll animations alone made our investors ask who built the site.",
    avatar: "https://i.pravatar.cc/52?img=20",
  },
  {
    name: "David C.",
    role: "Director · Cloudbase",
    quote:
      "Migrated our legacy PHP monolith to a modern Node.js microservices architecture. Zero downtime during migration. Communicated every step clearly. Will work with him again.",
    avatar: "https://i.pravatar.cc/52?img=7",
  },
  {
    name: "Sara N.",
    role: "CPO · Taskr",
    quote:
      "He built our real-time collaboration feature using WebSockets and it handled 500 concurrent users on day one without breaking a sweat. Performance obsessed in the best way.",
    avatar: "https://i.pravatar.cc/52?img=25",
  },
];

/* ─── Card ──────────────────────────────────────────────────────── */
function TestimonialCard({
  name,
  role,
  quote,
  avatar,
}: {
  name: string;
  role: string;
  quote: string;
  avatar: string;
}) {
  return (
    <div
      className="
        t-card relative flex-shrink-0 w-[300px] md:w-[380px] lg:w-[450px] bg-[#1A1A1A]
        border border-white/10 rounded-2xl p-6 md:p-8 mx-3 md:mx-4
        overflow-hidden cursor-default
        transition-all duration-300 ease-out
        hover:border-white/25 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(255,255,255,0.06)]
      "
    >
      {/* Large faded quotation mark — top-right */}
      <span
        className="absolute top-4 right-6 text-[100px] font-serif text-white/[0.07] leading-none select-none pointer-events-none"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* Author row */}
      <div className="flex items-center gap-4 mb-5 relative z-10">
        <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden border border-white/10 flex-shrink-0">
          <Image
            src={avatar}
            alt={name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-bold text-white text-base leading-tight">
            {name}
          </span>
          <span className="text-white/50 text-xs leading-tight">{role}</span>
          {/* Stars */}
          <div className="flex gap-1 mt-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>

      {/* Quote */}
      <p className="text-white/70 text-[15px] italic leading-relaxed line-clamp-4 relative z-10">
        &ldquo;{quote}&rdquo;
      </p>
    </div>
  );
}

/* ─── Section ───────────────────────────────────────────────────── */
export function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const row1WrapRef = useRef<HTMLDivElement>(null);
  const row2WrapRef = useRef<HTMLDivElement>(null);
  const row3WrapRef = useRef<HTMLDivElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);
  const track3Ref = useRef<HTMLDivElement>(null);

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

  // Create highly duplicated arrays so we never run out of content during normal scroll
  const row1Cards = [...row1Data, ...row1Data, ...row1Data, ...row1Data, ...row1Data, ...row1Data];
  const row2Cards = [...row2Data, ...row2Data, ...row2Data, ...row2Data, ...row2Data, ...row2Data];
  const row3Cards = [...row3Data, ...row3Data, ...row3Data, ...row3Data, ...row3Data, ...row3Data];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax text
      gsap.to(".bg-text-parallax-testimonials", {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      /* ── Title entrance ─────────────────────────────────── */
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

      /* ── Subtitle mask reveal ───────────────────────────── */
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

      /* ── Row entrance animations ─────────────────────────── */
      gsap.fromTo(
        row1WrapRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row1WrapRef.current,
            start: "top 90%",
          },
        }
      );

      gsap.fromTo(
        row2WrapRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row2WrapRef.current,
            start: "top 90%",
          },
        }
      );

      gsap.fromTo(
        row3WrapRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row3WrapRef.current,
            start: "top 90%",
          },
        }
      );

      /* ── Scroll-driven rows ────────────────────────
       * Rows slide as the user scrolls through the section.
       * Uses absolute fromTo with scrub:1 — no relative deltas.
       * ───────────────────────────────────────────────────── */
      gsap.fromTo(
        track1Ref.current,
        { x: -500 },
        {
          x: -1700,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        track2Ref.current,
        { x: -1700 },
        {
          x: -500,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        track3Ref.current,
        { x: -500 },
        {
          x: -1700,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="testimonials"
      /* 
       * overflow-hidden here is fine — the tracks are inside this section
       * and their left/right overflow is what we WANT hidden (the mask handles it).
       * The marquee animation is horizontal within this section, not outside it.
       */
      className="relative w-full bg-[#0A0A0A] overflow-hidden py-28 md:py-36"
    >
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top + bottom section fades */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0A0A0A] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none z-10" />

      {/* Massive Background Text */}
      <div className="absolute top-20 left-0 w-full overflow-hidden pointer-events-none opacity-[0.02] select-none flex justify-center z-0">
        <h2 className="bg-text-parallax-testimonials text-[clamp(8rem,20vw,25rem)] font-bold leading-none tracking-tighter whitespace-nowrap text-white">
          REVIEWS
        </h2>
      </div>

      {/* ── Title ─────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 relative z-10 w-full pt-12 pb-12">
        <div className="flex flex-col justify-center items-center text-center mb-16 gap-6">
          <h2 ref={titleRef} className="text-[clamp(3rem,6vw,5rem)] font-bold leading-[0.9] tracking-tighter text-white">
            Trusted by Innovative Teams.
          </h2>
          <p ref={subtitleRef} className="text-xl text-white/60 max-w-xl">
            {renderAnimatedText("Kind words from clients, founders, and engineering leads I've collaborated with.")}
          </p>
        </div>
      </div>

      {/* ── Row 1 — moves LEFT ─────────────────────────────────── */}
      <div
        ref={row1WrapRef}
        className="relative z-10 mb-5 opacity-0"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        {/* Track with many duplicated cards for infinite-feeling runway */}
        <div ref={track1Ref} className="flex will-change-transform">
          {row1Cards.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </div>

      {/* ── Row 2 — moves RIGHT ────────────────────────────────── */}
      <div
        ref={row2WrapRef}
        className="relative z-10 opacity-0 mb-5"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        {/* Track with many duplicated cards for infinite-feeling runway */}
        <div ref={track2Ref} className="flex will-change-transform">
          {row2Cards.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </div>

      {/* ── Row 3 — moves LEFT ────────────────────────────────── */}
      <div
        ref={row3WrapRef}
        className="relative z-10 opacity-0"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        {/* Track with many duplicated cards for infinite-feeling runway */}
        <div ref={track3Ref} className="flex will-change-transform">
          {row3Cards.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
