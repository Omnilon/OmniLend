"use client";
import { ReactNode } from "react";
import { BrandProviders as BrandProviderStack } from "@/components/BrandProviders";

export function BrandProviders({ children }: { children: ReactNode }) {
  return <BrandProviderStack>{children}</BrandProviderStack>;
}
