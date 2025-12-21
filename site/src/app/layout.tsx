import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { BrandProviders } from "./_providers/BrandProviders";
import { NoiseOverlay } from "./_components/NoiseOverlay";
import { omniContent } from "@content/omnilend";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap"
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: omniContent.site.title,
    template: "%s | OmniLend"
  },
  description: omniContent.site.description,
  metadataBase: new URL(omniContent.site.url),
  openGraph: {
    title: omniContent.site.title,
    description: omniContent.site.description,
    url: omniContent.site.url,
    siteName: omniContent.site.name,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: omniContent.site.title,
    description: omniContent.site.description
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} bg-bg text-text antialiased`}
      >
        <BrandProviders>
          {children}
          <NoiseOverlay />
        </BrandProviders>
      </body>
    </html>
  );
}
