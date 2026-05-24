"use client";

import { useRef, useEffect, useState } from "react";
import { ProfileCard } from "@/components/ui/ProfileCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { gsap } from "@/lib/gsap";

export function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    if (!containerRef.current || !formRef.current) return;

    const fields = formRef.current.querySelectorAll(".form-field");

    gsap.fromTo(
      fields,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("loading");

    try {
      const response = await fetch("https://formsubmit.co/ajax/hermouch.webdev@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: "New contact from your portfolio!"
        })
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section ref={containerRef} id="contact" className="py-32 px-6 max-w-7xl mx-auto w-full">
      <SectionLabel text="Contact" />

      <div className="flex flex-col md:flex-row gap-16 lg:gap-24">
        {/* Left */}
        <div className="w-full md:w-1/2 flex flex-col gap-12">
          <h2 className="text-[clamp(3rem,6vw,5rem)] font-bold leading-[0.9] tracking-tighter">
            Let&apos;s Work<br />Together.
          </h2>
          <p className="text-xl text-primary-text/70 max-w-sm leading-relaxed">
            Open for freelance projects and full-time opportunities.
          </p>
          <div className="bg-bg-dark rounded-2xl w-max p-2 mt-4 shadow-2xl">
            <ProfileCard />
          </div>
        </div>

        {/* Right */}
        <div className="w-full md:w-1/2">
          <form ref={formRef} className="flex flex-col gap-12 mt-4" onSubmit={handleSubmit}>
            <div className="form-field flex flex-col gap-2 border-b border-primary-text/20 pb-4">
              <label htmlFor="name" className="text-sm font-medium text-primary-text/60 uppercase tracking-widest">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Hermouch Abdelmajid"
                className="bg-transparent text-xl md:text-2xl outline-none placeholder-primary-text/20"
              />
            </div>

            <div className="form-field flex flex-col gap-2 border-b border-primary-text/20 pb-4">
              <label htmlFor="email" className="text-sm font-medium text-primary-text/60 uppercase tracking-widest">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="hermouch@example.com"
                className="bg-transparent text-xl md:text-2xl outline-none placeholder-primary-text/20"
              />
            </div>

            <div className="form-field flex flex-col gap-2 border-b border-primary-text/20 pb-4">
              <label htmlFor="message" className="text-sm font-medium text-primary-text/60 uppercase tracking-widest">Message</label>
              <textarea
                id="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tell me about your project..."
                className="bg-transparent text-xl md:text-2xl outline-none placeholder-primary-text/20 resize-none"
              ></textarea>
            </div>

            <div className="form-field self-end mt-4 flex items-center gap-4">
              {status === "success" && <span className="text-green-500 text-sm font-medium">Message sent successfully!</span>}
              {status === "error" && <span className="text-red-500 text-sm font-medium">Failed to send. Try again.</span>}
              <Button type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Sending..." : <>Send It &rarr;</>}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
