import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  className,
  children
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("relative scroll-mt-24 py-3 md:scroll-mt-32", className)}>
      <div className="omni-page-shell">
        <div className="omni-panel omni-section-panel">{children}</div>
      </div>
    </section>
  );
}
