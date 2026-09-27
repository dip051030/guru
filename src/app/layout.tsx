import type { Metadata } from "next";
import { Playfair_Display, Outfit, JetBrains_Mono } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Guru Neel Hari | Neel Hari Vedic Jyotish Kendra, Kathmandu",
  description:
    "Official consultancy of Guru Neel Hari. Authentic Vedic Jyotish, Janma Kundali analysis, Vivaha Milan, auspicious Muhurta timing, and Nepali Patro calendar consultation in Kathmandu, Nepal.",
  keywords: [
    "Guru Neel Hari",
    "गुरु नील हरि",
    "Neel Hari Jyotish",
    "Nepali Patro",
    "Janma Kundali",
    "Vedic Astrology Nepal",
    "Vivaha Muhurta",
    "Kathmandu Astrologer",
  ],
  authors: [{ name: "Guru Neel Hari" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ne"
      className={`${playfair.variable} ${outfit.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-secondary/20 selection:text-foreground">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
