import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow ? (
        <p className={cn("omni-chip", align === "center" ? "mx-auto" : "")}>{eyebrow}</p>
      ) : null}
      <h2 className="mt-4 text-[clamp(1.9rem,5vw,3.8rem)] font-semibold uppercase leading-[0.92] tracking-[0.015em] text-[color:var(--text)]">
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-4 text-sm leading-6 text-[color:var(--muted)] md:text-base md:leading-7",
            align === "center" ? "mx-auto" : ""
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
