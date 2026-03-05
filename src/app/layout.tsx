import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Creative Developer Portfolio",
  description: "High-end scrollytelling personal portfolio website.",
};

import CustomCursor from "@/components/CustomCursor";
import { Preloader } from "@/components/Preloader";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground cursor-none`}>
        <SmoothScroll />
        <ScrollProgress />
        <Preloader />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
