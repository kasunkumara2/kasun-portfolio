import { cn } from "@/lib/utils";

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-10", className)}>
      {eyebrow && (
        <div className="text-xs uppercase tracking-[0.30em] text-white/55">
          {eyebrow}
        </div>
      )}
      <h2 className="mt-3 text-3xl md:text-4xl font-extrabold">{title}</h2>
      {subtitle && <p className="mt-3 text-white/70 max-w-2xl leading-relaxed">{subtitle}</p>}
    </div>
  );
}
