"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { Project } from "@/lib/projects";

interface NextProjectTeaserProps {
  project: Project;
}

export function NextProjectTeaser({ project }: NextProjectTeaserProps) {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !imageRef.current || !textRef.current) return;

    // Setup initial hover state animation
    const tl = gsap.timeline({ paused: true });
    
    tl.to(imageRef.current, {
      scale: 1.05,
      duration: 0.6,
      ease: "power2.out",
    }, 0)
    .to(textRef.current, {
      y: -10,
      duration: 0.4,
      ease: "power2.out",
    }, 0);

    const onMouseEnter = () => tl.play();
    const onMouseLeave = () => tl.reverse();

    const element = containerRef.current;
    element.addEventListener("mouseenter", onMouseEnter);
    element.addEventListener("mouseleave", onMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", onMouseEnter);
      element.removeEventListener("mouseleave", onMouseLeave);
    };
  }, { scope: containerRef });

  return (
    <Link 
      href={`/works/${project.slug}`}
      ref={containerRef}
      className="block w-full h-[60vh] md:h-[80vh] relative overflow-hidden group cursor-pointer mt-32"
    >
      <div className="absolute inset-0 z-0">
        {project.image ? (
          <Image 
            ref={imageRef}
            src={project.image} 
            alt={project.title} 
            fill 
            className="object-cover transition-transform origin-center will-change-transform" 
          />
        ) : (
          <div 
            ref={imageRef as any} 
            className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-800 transition-transform origin-center will-change-transform" 
          />
        )}
        <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/50" />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-white p-6">
        <div ref={textRef} className="flex flex-col items-center text-center">
          <span className="text-label text-white/70 mb-4 uppercase tracking-widest">Next Project</span>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter">{project.title}</h2>
        </div>
      </div>
    </Link>
  );
}
