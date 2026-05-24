"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface VideoSectionProps {
  videoUrl: string | null;
  title: string;
}

export function VideoSection({ videoUrl, title }: VideoSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Reveal animation when scrolling into view
    gsap.fromTo(
      containerRef.current,
      { y: 100, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full aspect-video rounded-2xl overflow-hidden bg-bg-dark text-white relative flex items-center justify-center group">
      {videoUrl ? (
        (videoUrl.includes("youtu.be") || videoUrl.includes("youtube.com")) ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoUrl.includes("youtu.be/")
              ? videoUrl.split("youtu.be/")[1]?.split("?")[0]
              : videoUrl.split("v=")[1]?.split("&")[0]
              }?autoplay=1&mute=1&loop=1&controls=1&playlist=${videoUrl.includes("youtu.be/")
                ? videoUrl.split("youtu.be/")[1]?.split("?")[0]
                : videoUrl.split("v=")[1]?.split("&")[0]
              }`}
            title={title}
            className="w-full h-full object-cover"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-contain"
            autoPlay
            muted
            loop
            controls
            playsInline
          />
        )
      ) : (
        <div className="flex flex-col items-center justify-center gap-6 p-8 text-center border border-white/10 rounded-2xl w-full h-full">
          <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
          <h3 className="text-2xl md:text-4xl font-bold tracking-tight">Coming Soon</h3>
          <p className="text-white/50 max-w-md">The project video for {title} is currently being prepared and will be available soon.</p>
        </div>
      )}
    </div>
  );
}
