import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Footer() {
  return (
    <footer className="bg-bg-dark text-white py-32 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-24">

        {/* Top: Newsletter */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-b border-white/10 pb-16">
          <div className="flex flex-col gap-4 max-w-md">
            <h3 className="text-xl">Subscribe to my newsletter</h3>
            <p className="text-white/60 text-base">Get the latest updates on my projects and freelance availability.</p>
          </div>
          <div className="flex w-full md:w-auto items-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent border-b border-white/30 text-white pb-2 outline-none focus:border-white w-full md:w-64 transition-colors"
            />
            <Button variant="secondary" className="bg-white text-bg-dark hover:bg-white/90 shrink-0">Submit</Button>
          </div>
        </div>

        {/* Middle: Links */}
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="flex flex-col gap-4">
            <span className="text-label text-white/50 mb-2">Pages</span>
            <div className="flex flex-row gap-12">
              <div className="flex flex-col gap-4">
                <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
                <Link href="#about" className="hover:text-white/70 transition-colors">About</Link>
                <Link href="#skills" className="hover:text-white/70 transition-colors">Skills</Link>
              </div>
              <div className="flex flex-col gap-4">
                <Link href="#works" className="hover:text-white/70 transition-colors">Works</Link>
                <Link href="#certificates" className="hover:text-white/70 transition-colors">Certificates</Link>
                <Link href="#testimonials" className="hover:text-white/70 transition-colors">Testimonials</Link>
                <Link href="#contact" className="hover:text-white/70 transition-colors">Contact</Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-label text-white/50 mb-2">Social</span>
            <a href="https://github.com/hermouchDev" className="hover:text-white/70 transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/abdelmajid-hermouch/" className="hover:text-white/70 transition-colors">LinkedIn</a>
          </div>
        </div>

        {/* Bottom: Logotype */}
        <div className="flex flex-col items-center gap-8 mt-16 overflow-hidden">
          <h2 className="text-[12vw] md:text-[8vw] lg:text-[5vw] font-black tracking-tighter leading-none w-full text-center flex items-center justify-center gap-4">
            Abdelmajid
            <div className="relative w-[15vw] h-[15vw] md:w-[10vw] md:h-[10vw] lg:w-[6vw] lg:h-[6vw] rounded-xl overflow-hidden shrink-0 inline-block">
              <Image
                src="/about-photo.jpg"
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            Hermouch
          </h2>
        </div>

      </div>
    </footer>
  );
}
