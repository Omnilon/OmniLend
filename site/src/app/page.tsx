import { Suspense } from "react";
import { BrandPage } from "@/components/BrandPage";

export default function Home() {
  return (
    <Suspense fallback={null}>
      <BrandPage />
    </Suspense>
  );
}
