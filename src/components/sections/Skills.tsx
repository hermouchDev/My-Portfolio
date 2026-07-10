"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

import {
  Code2, Database, Terminal, Webhook, Paintbrush,
  Gauge, Zap, Cloud, Wrench, BrainCircuit, Globe, PenTool, MousePointer2, FileText
} from "lucide-react";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiGreensock,
  SiNodedotjs, SiLaravel, SiMysql, SiPostgresql,
  SiFigma, SiFramer, SiLighthouse, SiGit, SiDocker, SiVercel, SiLinux,
  SiVite, SiBootstrap, SiExpress, SiMongodb, SiPrisma, SiSupabase, SiPhp,
  SiCloudinary, SiJsonwebtokens, SiGoogle,
  SiJquery, SiRedux, SiPython, SiCanva, SiJira,
  SiGithubcopilot
} from "react-icons/si";

const skills = [
  {
    num: "01",
    name: "Front-end",
    icon: Code2,
    tools: [
      { name: "HTML", icon: Globe },
      { name: "CSS", icon: Paintbrush },
      { name: "JavaScript", icon: Zap },
      { name: "React JS", icon: SiReact },
      { name: "Next JS", icon: SiNextdotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Bootstrap", icon: SiBootstrap },
      { name: "jQuery", icon: SiJquery },
      { name: "Redux", icon: SiRedux },
      { name: "UX/UI", icon: PenTool },
      { name: "GSAP", icon: SiGreensock },
      { name: "Vite", icon: SiVite },
    ],
  },
  {
    num: "02",
    name: "Back-end",
    icon: Terminal,
    tools: [
      { name: "PHP", icon: SiPhp },
      { name: "Laravel", icon: SiLaravel },
      { name: "Python", icon: SiPython },
      { name: "Node JS", icon: SiNodedotjs },
      { name: "Express JS", icon: SiExpress },
    ],
  },
  {
    num: "03",
    name: "Base de données",
    icon: Database,
    tools: [
      { name: "MySQL", icon: SiMysql },
      { name: "NoSQL", icon: Database },
      { name: "MongoDB", icon: SiMongodb },
      { name: "JSON", icon: SiJsonwebtokens },
      { name: "Supabase", icon: SiSupabase },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Prisma", icon: SiPrisma },
    ],
  },
  {
    num: "04",
    name: "Outils & Workflow",
    icon: Wrench,
    tools: [
      { name: "GitHub", icon: SiGit },
      { name: "Git", icon: SiGit },
      { name: "Docker", icon: SiDocker },
      { name: "Vercel", icon: SiVercel },
      { name: "Linux", icon: SiLinux },
      { name: "Agil / Scrum", icon: Webhook },
      { name: "Jira", icon: SiJira },
      { name: "Canva", icon: SiCanva },
      { name: "Figma", icon: SiFigma },
      { name: "Framer", icon: SiFramer },
      { name: "Microsoft Office", icon: FileText },
    ],
  },
  {
    num: "05",
    name: "Cloud & APIs",
    icon: Cloud,
    tools: [
      { name: "Google Gemini AI", icon: SiGoogle },
      { name: "Cloudinary", icon: SiCloudinary },
      { name: "REST APIs", icon: Webhook },
      { name: "JWT Auth", icon: SiJsonwebtokens },
      { name: "Lighthouse", icon: SiLighthouse },
      { name: "Web Vitals", icon: Gauge },
    ],
  },
  {
    num: "06",
    name: "AI-Assisted Dev",
    icon: BrainCircuit,
    tools: [
      { name: "Cursor", icon: MousePointer2 },
      { name: "GitHub Copilot", icon: SiGithubcopilot },
      { name: "Claude Code", icon: Cloud },
      { name: "Antigravity", icon: Zap },
      { name: "Open Code", icon: Terminal },
    ],
  },
];

export function Skills() {
  const containerRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  const [activeSkill, setActiveSkill] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

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

      // Header animation
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
            stagger: 0.02,
            ease: "power4.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
            }
          }
        );
      }

      // Stagger rows
      gsap.fromTo(
        rowsRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills-list",
            start: "top 80%",
          }
        }
      );
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
    <section ref={containerRef} id="skills" className="relative py-32 w-full bg-bg-dark text-white overflow-hidden">
      {/* Massive Background Text */}
      <div className="absolute top-20 left-0 w-full overflow-hidden pointer-events-none opacity-[0.05] select-none flex justify-center z-0">
        <h2 className="bg-text-parallax text-[clamp(8rem,20vw,25rem)] font-bold leading-none tracking-tighter whitespace-nowrap text-white">
          EXPERTISE
        </h2>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div ref={headerRef} className="flex flex-col justify-center items-center text-center mb-24 gap-6">
          <h2 className="text-[clamp(3rem,6vw,5rem)] font-bold leading-[0.9] tracking-tighter text-white">
            {renderAnimatedText("Core Capabilities.")}
          </h2>
          <p className="text-xl text-white/60 max-w-xl">
            {renderAnimatedText("A synergistic blend of design and engineering to build premium digital experiences.")}
          </p>
        </div>

        <div className="flex flex-col relative">

          {/* Interactive List */}
          <div className="skills-list w-full flex flex-col border-t border-white/20">
            {skills.map((skill, index) => {
              const isActive = activeSkill === index;
              const isAnyActive = activeSkill !== null;

              return (
                <div
                  key={skill.num}
                  ref={el => { rowsRef.current[index] = el; }}
                  className={cn(
                    "group relative border-b border-white/20 py-8 lg:py-12 cursor-pointer transition-all duration-500",
                    isAnyActive && !isActive ? "opacity-30" : "opacity-100"
                  )}
                  onMouseEnter={() => setActiveSkill(index)}
                  onMouseLeave={() => setActiveSkill(null)}
                >
                  <div className="flex flex-col gap-6">

                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                      <span className="text-sm font-bold text-white/40 md:w-12 shrink-0">
                        {skill.num}
                      </span>

                      <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
                        <skill.icon className={cn(
                          "w-8 h-8 md:w-10 md:h-10 transition-colors duration-500 shrink-0",
                          isActive ? "text-white" : "text-white/40"
                        )} />
                        <h3 className={cn(
                          "text-[clamp(2rem,4vw,3.5rem)] font-bold uppercase tracking-tight leading-none transition-transform duration-500 origin-left",
                          isActive ? "lg:translate-x-4 text-white" : "text-white/80"
                        )}>
                          {skill.name}
                        </h3>
                      </div>
                    </div>

                    {/* Tools - Accordion effect on Desktop, Always visible on Mobile */}
                    <div className={cn(
                      "transition-all duration-500 overflow-hidden",
                      isActive ? "max-h-[500px] opacity-100 mt-2" : "lg:max-h-0 lg:opacity-0 lg:mt-0 max-h-[500px] opacity-100 mt-2"
                    )}>
                      <div className="flex flex-wrap gap-3 md:pl-20">
                        {skill.tools.map(tool => (
                          <span
                            key={tool.name}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-sm font-medium text-white/80 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 hover:shadow-lg hover:shadow-white/20 cursor-default"
                          >
                            <tool.icon className="w-5 h-5" />
                            {tool.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
