import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CustomCursor } from "@/components/custom-cursor";
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
  title: "George Simak - Full-Stack Developer",
  description: "Full-Stack Developer based in Paris. Vue.js, React, Angular, TypeScript, Node.js. Available for freelance web development and technical consulting.",
  keywords: ["full-stack developer", "frontend developer", "freelance", "Vue.js", "React", "Angular", "TypeScript", "Paris"],
  authors: [{ name: "George Simak" }],
  creator: "George Simak",
  publisher: "George Simak",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://smk-portfolio-website.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "George Simak - Full-Stack Developer",
    description: "Full-Stack Developer based in Paris. Vue.js, React, Angular, TypeScript, Node.js.",
    url: "https://smk-portfolio-website.vercel.app",
    siteName: "George Simak Portfolio",
    locale: "en_US",
    type: "website",
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
        {children}
      </body>
    </html>
  );
}
