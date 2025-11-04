"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AssetCardProps = {
  title: string;
  description: string;
  imageSrc: string;
  tag?: string;
  className?: string;
  footer?: ReactNode;
};

export function AssetCard({
  title,
  description,
  imageSrc,
  tag,
  className,
  footer
}: AssetCardProps) {
  return (
    <motion.article
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5",
        "backdrop-blur-sm transition-transform duration-500 ease-brand",
        className
      )}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
    >
      <div className="relative aspect-video w-full">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 320px, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        {tag ? (
          <span className="font-mono text-[10px] uppercase tracking-[0.36em] text-accent-orange">
            {tag}
          </span>
        ) : null}
        <h3 className="font-grotesk text-xl font-semibold text-white">{title}</h3>
        <p className="text-sm text-muted">{description}</p>
        {footer}
      </div>
    </motion.article>
  );
}
