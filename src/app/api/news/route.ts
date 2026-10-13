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

/** The article's share image (og:image), for feeds that don't carry photos. */
async function ogImage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "GuruNilhari/1.0 (+https://www.gurunilhari.com)", Accept: "text/html" },
      next: { revalidate },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return null;
    // The meta tag is in <head>; no need to read the whole page.
    const head = (await res.text()).slice(0, 60000);
    const m =
      head.match(/<meta[^>]+property=["']og:image(?::secure_url)?["'][^>]+content=["']([^"']+)["']/i) ??
      head.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
    const img = m?.[1]?.replace(/&amp;/g, "&");
    return img && /^https:\/\//i.test(img) ? img : null;
  } catch {
    return null;
  }
}

export async function GET() {
  const results = await Promise.all(FEEDS.map(load));
  const items = results
    .flat()
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""))
    .slice(0, 16);
  await Promise.all(
    items.map(async (item) => {
      if (!item.image) item.image = await ogImage(item.link);
    })
  );
  if (!items.length) {
    return NextResponse.json({ success: false, items: [] }, { status: 503 });
  }
  return NextResponse.json({ success: true, items });
}
