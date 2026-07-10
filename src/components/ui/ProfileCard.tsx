import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProfileCardProps {
  className?: string;
}

export function ProfileCard({ className }: ProfileCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-2xl bg-white backdrop-blur-md p-4 border border-white/20 shadow-xl",
        className
      )}
    >
      <div className="relative h-16 w-16 overflow-hidden rounded-xl">
        <Image
          src="/my-image.png"
          alt="Profile"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col text-black">
        <span className="text-sm font-bold">Hermouch Abdelmajid</span>
        <span className="text-xs text-black/70">Full Stack Developer</span>
        <span className="mt-1 flex items-center gap-1.5 text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
          Available for work
        </span>
      </div>
    </div>
  );
}
