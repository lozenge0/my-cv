"use client";

import localFont from "next/font/local";
import "./globals.css";
import ChatWidget from "../components/ChatWidget/ChatWidget";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useEffect, useState } from "react";
import CookieBanner from "@/components/CookieBanner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    // On client side, check for consent from localStorage
    if (localStorage.getItem("cookieConsent") === "true") {
      setAnalyticsEnabled(true);
    }
  }, []);

  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {analyticsEnabled && <Analytics />}
        {analyticsEnabled && <SpeedInsights />}
        <CookieBanner onAccept={() => setAnalyticsEnabled(true)} />
        <div className="max-w-5xl mx-auto px-4 py-8">{children}</div>
        <ChatWidget />
      </body>
    </html>
  );
}
