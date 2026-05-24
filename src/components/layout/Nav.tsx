"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Skills", href: "/#skills" },
  { name: "Certificates", href: "/#certificates" },
  { name: "Works", href: "/#works" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "Contact", href: "/#contact" },
];

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="z-50 relative">
      {/* Hamburger Button Tab */}
      <nav className="fixed top-0 left-0 right-0 z-40">
        <button 
          onClick={() => setIsOpen(true)}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[40px] flex items-center justify-center group"
        >
          <svg className="absolute inset-0 w-full h-full text-bg transition-transform group-hover:scale-[1.03] origin-top" viewBox="0 0 120 40" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0 H120 L95 34 Q93 40 86 40 H34 Q27 40 25 34 Z" fill="currentColor" />
          </svg>
          
          <div className="relative z-10 flex flex-col gap-[6px] items-center justify-center w-5 -mt-1">
            <span className="block h-[1px] w-full bg-black transition-transform group-hover:-translate-y-[1px]" />
            <span className="block h-[1px] w-full bg-black transition-transform group-hover:translate-y-[1px]" />
          </div>
        </button>
      </nav>

      {/* Fullscreen Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6 animate-in fade-in duration-300">
          
          {/* Top Center Close Button Tab */}
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[40px] flex items-center justify-center group z-10"
          >
            <svg className="absolute inset-0 w-full h-full text-white drop-shadow-md transition-transform group-hover:scale-[1.03] origin-top" viewBox="0 0 120 40" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0 H120 L95 34 Q93 40 86 40 H34 Q27 40 25 34 Z" fill="currentColor" />
            </svg>
            
            <div className="relative z-10 flex items-center justify-center -mt-1 text-black group-hover:scale-110 transition-transform">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 13L13 1M1 1L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>

          {/* Modal White Box */}
          <div className="bg-white text-black w-full max-w-2xl rounded-2xl p-8 md:p-14 shadow-2xl relative flex flex-col mt-8">
            
            {/* Logo top center of modal */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-black rounded-full flex items-center justify-center text-white shadow-xl border-4 border-white">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8 2 8 8 12 12C16 8 16 2 12 2ZM12 22C16 22 16 16 12 12C8 16 8 22 12 22ZM2 12C2 8 8 8 12 12C8 16 2 16 2 12ZM22 12C22 16 16 16 12 12C16 8 22 8 22 12Z" />
              </svg>
            </div>

            {/* Title Line */}
            <div className="flex items-center gap-4 w-full mt-6 mb-10">
              <span className="text-sm font-bold tracking-tight text-black">Quick Links</span>
              <div className="h-[1px] flex-1 bg-black/10"></div>
            </div>

            {/* Content Split */}
            <div className="flex flex-col md:flex-row gap-12 w-full justify-between items-stretch">
              
              {/* Left: Links */}
              <div className="flex flex-col gap-5 w-full md:w-auto shrink-0 justify-center">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg md:text-xl font-medium text-black/60 hover:text-black hover:translate-x-2 transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Right: Image Preview */}
              <div className="hidden md:block relative w-[240px] shrink-0 rounded-xl overflow-hidden shadow-inner bg-black/5 aspect-[4/5]">
                <Image 
                  src="/about-photo.jpg" 
                  alt="Menu Preview" 
                  fill 
                  className="object-cover"
                />
              </div>

            </div>
          </div>

        </div>
      )}
    </header>
  );
}
