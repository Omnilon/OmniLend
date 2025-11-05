import type { Metadata } from "next/types";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { ReactNode } from "react";
import { BrandProviders } from "@/components/BrandProviders";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import "../styles/globals.css";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap"
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  title: "SITE_OWNER Brand System",
  description:
    "A high-contrast brand experience shell showcasing SITE_OWNER design DNA."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${grotesk.variable} ${mono.variable}`}>
      <body className="bg-bg text-text antialiased">
        <BrandProviders>
          {children}
          <NoiseOverlay />
        </BrandProviders>
      </body>
    </html>
  );
}
