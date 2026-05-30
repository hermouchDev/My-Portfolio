import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Marquee } from "@/components/layout/Marquee";
import { Preloader } from "@/components/layout/Preloader";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Certificates } from "@/components/sections/Certificates";
import { Works } from "@/components/sections/Works";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Preloader />
      <Nav />
      <Hero />
      <div className="bg-bg relative z-10">
        <About />
        <Skills />
        <Certificates />
        <Works />
      </div>
      <Testimonials />
      <div className="bg-bg relative z-10">
        <Contact />
        <Marquee />
      </div>
      <Footer />
    </main>
  );
}
