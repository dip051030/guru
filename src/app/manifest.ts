import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "गुरु निलहरि — Guru Nilhari",
    short_name: "Guru Nilhari",
    description: "Nepali Patro, Panchanga, horoscope and consultations with Guru Nilhari, Vedic Sanatan Kendra UK.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#FAF7F2",
    theme_color: "#0E1A2E",
    lang: "ne",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
