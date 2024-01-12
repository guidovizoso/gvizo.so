import type { Metadata } from "next";
import { Inter, Inconsolata } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { config } from "@/config";
import { Nav } from "@/components/nav";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const inconsolata = Inconsolata({
  subsets: ["latin"],
  variable: "--font-inconsolata",
});

export const metadata: Metadata = {
  metadataBase: new URL(config.domain),
  title: {
    default: config.name,
    template: `%s — ${config.name}`,
  },
  description: config.description,
  openGraph: {
    title: config.name,
    description: config.description,
    url: config.domain,
    siteName: config.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${config.domain}/og`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: config.name,
    card: "summary_large_image",
    images: [
      {
        url: `${config.domain}/og`,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link
        rel="icon"
        href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${config.faviconEmoji}</text></svg>`}
      />

      <body
        className={cn(
          "min-h-[100svh] bg-background font-sans antialiased w-full",
          inter.variable,
          inconsolata.variable
        )}
      >
        <Nav />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
