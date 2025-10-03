import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { CustomCursor } from "@/components/custom-cursor";
import { PerformanceMonitor } from "@/components/performance-monitor";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Georgiy Simak - Frontend & Game Developer",
  description: "Expert frontend developer and game designer creating immersive digital experiences. Specializing in React, Next.js, Unity, and modern web technologies.",
  keywords: ["frontend developer", "game developer", "React", "Next.js", "Unity", "web development", "game design"],
  authors: [{ name: "Georgiy Simak" }],
  creator: "Georgiy Simak",
  publisher: "Georgiy Simak",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://alexchen.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Georgiy Simak - Frontend & Game Developer",
    description: "Expert frontend developer and game designer creating immersive digital experiences.",
    url: "https://alexchen.dev",
    siteName: "Georgiy Simak Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Georgiy Simak - Frontend & Game Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Georgiy Simak - Frontend & Game Developer",
    description: "Expert frontend developer and game designer creating immersive digital experiences.",
    images: ["/og-image.jpg"],
    creator: "@alexchen",
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
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CustomCursor />
        <PerformanceMonitor />
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
