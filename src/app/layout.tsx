import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Aviral Mishra | Friendly Neighborhood Developer",
  description: "Spider-Man themed developer portfolio of Aviral Mishra.",
};

import Navbar from "@/components/shared/Navbar";
import CustomCursor from "@/components/shared/CustomCursor";
import WebLoader from "@/components/animations/WebLoader";
import VisitorPresence from "@/components/shared/VisitorPresence";
import AudioToggle from "@/components/shared/AudioToggle";
import DayNightSync from "@/components/shared/DayNightSync";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-50 relative">
        <DayNightSync />
        <WebLoader />
        <CustomCursor />
        <VisitorPresence />
        <Navbar />
        {children}
        <AudioToggle />
      </body>
    </html>
  );
}
