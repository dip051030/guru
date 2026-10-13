import { NextResponse } from "next/server";
import { parseFeed, type NewsItem } from "@/lib/rss";

// Headlines only, each linking back to the publisher.
const FEEDS = [
  { source: "BBC नेपाली", url: "https://feeds.bbci.co.uk/nepali/rss.xml" },
  { source: "अनलाइनखबर", url: "https://www.onlinekhabar.com/feed" },
  { source: "सेतोपाटी", url: "https://www.setopati.com/feed" },
  { source: "रातोपाटी", url: "https://ratopati.com/feed" },
];

export const revalidate = 900; // 15 minutes

async function load(feed: (typeof FEEDS)[number]): Promise<NewsItem[]> {
  try {
    const res = await fetch(feed.url, {
      headers: { "User-Agent": "GuruNilhari/1.0 (+https://www.gurunilhari.com)", Accept: "application/rss+xml, application/xml, text/xml" },
      next: { revalidate },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return [];
    return parseFeed(await res.text(), feed.source, 8);
  } catch {
    return [];
  }
}

export async function GET() {
  const results = await Promise.all(FEEDS.map(load));
  const items = results
    .flat()
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""))
    .slice(0, 16);
  if (!items.length) {
    return NextResponse.json({ success: false, items: [] }, { status: 503 });
  }
  return NextResponse.json({ success: true, items });
}
