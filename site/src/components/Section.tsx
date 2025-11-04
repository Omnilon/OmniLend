"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  label?: string;
  title: string;
  kicker?: string;
  intro?: string;
  children?: ReactNode;
  className?: string;
};

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

export function Section({
  id,
  label,
  title,
  intro,
  children,
  className
}: SectionProps) {
  return (
    <section id={id} className={cn("relative py-24", className)}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          variants={containerVariants}
          className="max-w-3xl"
        >
          {label ? (
            <span className="mb-4 inline-flex font-mono text-[10px] uppercase tracking-[0.36em] text-accent-purple">
              {label}
            </span>
          ) : null}
          <h2 className="font-grotesk text-[32px] font-bold leading-none text-white">
            {title}
          </h2>
          {intro ? (
            <p className="mt-4 text-[14px] leading-[1.5] tracking-tightest text-muted">
              {intro}
            </p>
          ) : null}
        </motion.div>
        {children}
      </div>
    </section>
  );
}
