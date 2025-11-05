import type { ReactNode } from "react";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "../styles/globals.css";
import { BrandProviders } from "../components/BrandProviders";
import { NoiseOverlay } from "../components/NoiseOverlay";

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

export const metadata = {
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
