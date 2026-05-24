import { cn } from "@/lib/utils";

interface SectionLabelProps {
  text: string;
  className?: string;
}

export function SectionLabel({ text, className }: SectionLabelProps) {
  return (
    <div className={cn("inline-flex items-center gap-2 text-label text-text-muted mb-8", className)}>
      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
      <span>[ {text} ]</span>
    </div>
  );
}
