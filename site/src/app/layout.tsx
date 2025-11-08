import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { BrandProviders } from "./_providers/BrandProviders";
import { NoiseOverlay } from "./_components/NoiseOverlay";

export const metadata: Metadata = {
  title: "OmniLend Brand System",
  description: "A high-contrast brand experience shell showcasing OmniLend design DNA.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bg text-text antialiased font-sans">
        <BrandProviders>
          {children}
          <NoiseOverlay />
        </BrandProviders>
      </body>
    </html>
  );
}
