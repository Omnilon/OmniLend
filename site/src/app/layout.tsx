import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import localFont from "next/font/local";
import { BrandProviders } from "./_providers/BrandProviders";
import { NoiseOverlay } from "./_components/NoiseOverlay";
import { omniContent } from "@content/omnilend";

const brandSans = localFont({
  src: [
    { path: "../../public/fonts/brand-sans-regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/brand-sans-medium.otf", weight: "500", style: "normal" },
    { path: "../../public/fonts/brand-sans-bold.otf", weight: "700", style: "normal" }
  ],
  variable: "--font-grotesk",
  display: "swap"
});

const brandMono = localFont({
  src: [{ path: "../../public/fonts/brand-mono-medium.otf", weight: "500", style: "normal" }],
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
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${brandSans.variable} ${brandMono.variable} bg-bg text-text antialiased`}
      >
        <BrandProviders>
          {children}
          <NoiseOverlay />
        </BrandProviders>
      </body>
    </html>
  );
}
