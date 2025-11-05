import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import { BrandProviders } from "./_providers/BrandProviders";
import { NoiseOverlay } from "./_components/NoiseOverlay";

export const metadata: Metadata = {
  title: "OmniLend Brand System",
  description: "A high-contrast brand experience shell showcasing OmniLend design DNA.",
};

const grotesk = Inter({ subsets: ["latin"], display: "swap", variable: "--font-grotesk" });
const mono = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-mono" });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${grotesk.variable} ${mono.variable}`}>
      <body className="bg-bg text-text antialiased font-sans">
        <BrandProviders>
          {children}
          <NoiseOverlay />
        </BrandProviders>
      </body>
    </html>
  );
}
