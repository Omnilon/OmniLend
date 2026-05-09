import { cn } from "@/lib/utils";

export function SectionLabel({
  children,
  className
}: {
  children: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-[0.68rem] uppercase tracking-[0.36em] text-[color:var(--division-accent)]",
        className
      )}
    >
      {children}
    </p>
  );
}
