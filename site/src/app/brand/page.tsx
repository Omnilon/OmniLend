'use client';

import { BrandPage } from "@/components/BrandPage";
import { BrandProviders } from "@/components/BrandProviders";

export const dynamic = "force-static";

export default function BrandRoute() {
  return (
    <BrandProviders>
      <BrandPage />
    </BrandProviders>
  );
}
