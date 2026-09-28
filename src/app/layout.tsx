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
  title: "गुरु निलहरि (Guru Nilhari) | Vedic Sanatan Kendra UK",
  description:
    "Official portal of Guru Nilhari (CEO | Chief Consultant). Vedic Sanatan Kendra UK - Astrology (Jyotish & Horoscope), Gemstone Identification (Ratna Consultation), Vastu Shastra (Home & Office Harmony), and Karmakanda (Vedic Rituals & Puja). Direct UK & Global Online Consultations: +44 7838 820518 | www.gurunilhari.com.",
  keywords: [
    "Guru Nilhari",
    "गुरु निलहरि",
    "Vedic Sanatan Kendra UK",
    "वैदिक सनातन केन्द्र युके",
    "gurunilhari.com",
    "Astrology Jyotish",
    "Gemstone Identification Ratna",
    "Vastu Shastra UK",
    "Vedic Karmakanda Puja",
    "Nepali Patro",
    "Janma Kundali",
  ],
  authors: [{ name: "Guru Nilhari" }],
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
