import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AhiLight | Enterprise Intelligence Research",
  description: "AhiLight builds research-driven software systems to solve the most critical operational challenges in the enterprise.",
  openGraph: {
    title: "AhiLight | Enterprise Intelligence Research",
    description: "Systems that actually think. Research-driven software for the autonomous enterprise.",
    url: "https://ahilight.com",
    siteName: "AhiLight",
    images: [
      {
        url: "/og-image.jpg", // Placeholder
        width: 1200,
        height: 630,
        alt: "AhiLight Enterprise Intelligence",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AhiLight | Enterprise Intelligence Research",
    description: "Systems that actually think. Research-driven software for the autonomous enterprise.",
    creator: "@ahilight",
    images: ["/og-image.jpg"], // Placeholder
  },
};


import { CursorGlow } from "@/components/ui/cursor-glow";
import PageWrapper from "@/components/layout/page-wrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} ${ibmPlexSans.variable} antialiased text-foreground bg-background font-sans relative overflow-x-hidden`}
      >
        <CursorGlow />
        <Navbar />
        <PageWrapper>
          <main className="min-h-screen relative z-10">
            {children}
          </main>
        </PageWrapper>
        <Footer />
      </body>
    </html>
  );
}
