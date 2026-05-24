"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/lib/projects";
import { VideoSection } from "@/components/ui/VideoSection";
import { NextProjectTeaser } from "@/components/ui/NextProjectTeaser";

gsap.registerPlugin(ScrollTrigger);

interface WorkDetailClientProps {
  project: Project;
}

export function WorkDetailClient({ project }: WorkDetailClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();

    // Cinematic Entrance
    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
      { y: 0, opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)", duration: 1.2, ease: "power4.out" }
    )
      .fromTo(
        metaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8"
      );

    // Overview & Problem Reveal
    if (overviewRef.current) {
      const children = overviewRef.current.children;
      gsap.fromTo(
        children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: overviewRef.current,
            start: "top 85%",
          },
        }
      );
    }

    // Gallery Stagger Reveal
    if (galleryRef.current) {
      const items = galleryRef.current.children;
      gsap.fromTo(
        items,
        { y: 100, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 80%",
          },
        }
      );
    }

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative z-10 w-full overflow-hidden">
      <article className="pt-48 pb-32 px-6 max-w-7xl mx-auto w-full">
        {/* Header */}
        <Link href="/#works" className="inline-flex items-center gap-2 text-primary-text/60 hover:text-primary-text mb-16 transition-colors">
          &larr; Back to Works
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-primary-text/10 pb-8 mb-12">
          <div className="flex flex-col gap-4 w-full md:w-3/4">
            <h1 ref={titleRef} className="text-5xl md:text-hero font-bold tracking-tighter leading-tight">{project.title}</h1>
            <div ref={metaRef} className="flex flex-wrap gap-2 text-sm text-primary-text/60 font-medium">
              <span>Tags:</span>
              {project.tags.map((tag, i) => (
                <span key={tag}>
                  {tag}{i < project.tags.length - 1 ? " • " : ""}
                </span>
              ))}
            </div>
          </div>
          <span className="text-2xl font-medium md:mb-4">{project.year}</span>
        </div>

        {/* Video Section at the top */}
        <div className="mb-24">
          <VideoSection videoUrl={project.videoUrl} title={project.title} />
        </div>

        {/* Overview & Problem */}
        <div ref={overviewRef} className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-bold uppercase tracking-widest border-b border-primary-text/10 pb-4">Overview</h3>
            <p className="text-xl leading-relaxed text-primary-text/80">
              {project.overview}
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-bold uppercase tracking-widest border-b border-primary-text/10 pb-4">The Problem</h3>
            <p className="text-xl leading-relaxed text-primary-text/80">
              {project.problem}
            </p>
          </div>
        </div>

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <div className="mb-24">
            <h3 className="text-lg font-bold uppercase tracking-widest border-b border-primary-text/10 pb-4 mb-8">Features</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-lg text-primary-text/80">
                  <span className="text-accent mt-1">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack & Links */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 border-t border-primary-text/10 pt-16 mb-32">
          <div className="flex flex-col gap-6 w-full md:w-1/2">
            <h3 className="text-lg font-bold uppercase tracking-widest">Tech Stack</h3>
            <div className="flex flex-wrap gap-4">
              {project.tags.map(tag => (
                <span key={tag} className="px-6 py-3 rounded-full border border-primary-text/20 text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-medium bg-black text-white hover:bg-black/90 transition-colors">
                ▶ Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-medium border border-black text-black hover:bg-black/5 transition-colors">
                &lt;/&gt; GitHub
              </a>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
