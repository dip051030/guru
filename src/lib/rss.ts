export interface NewsItem {
  title: string;
  link: string;
  source: string;
  publishedAt: string | null; // ISO
  /** Article photo from the feed (https only), if it carries one. */
  image: string | null;
  /** First sentence or two of the summary, plain text. */
  excerpt: string;
}

const decode = (s: string) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#039;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

const tag = (xml: string, name: string) => {
  const m = xml.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, "i"));
  return m ? decode(m[1]) : "";
};

const attr = (xml: string, pattern: RegExp) => xml.match(pattern)?.[1]?.replace(/&amp;/g, "&") ?? "";

/** Photo for an item: media:content / media:thumbnail / image enclosure / first <img> in the body. */
function findImage(b: string): string | null {
  const candidates = [
    attr(b, /<media:content[^>]*url="([^"]+)"[^>]*(?:medium="image"|type="image)/i),
    attr(b, /<media:content[^>]*(?:medium="image"|type="image)[^>]*url="([^"]+)"/i),
    attr(b, /<media:thumbnail[^>]*url="([^"]+)"/i),
    attr(b, /<enclosure[^>]*type="image[^"]*"[^>]*url="([^"]+)"/i),
    attr(b, /<enclosure[^>]*url="([^"]+)"[^>]*type="image/i),
    attr(b, /<media:content[^>]*url="([^"]+\.(?:jpe?g|png|webp)[^"]*)"/i),
    // Images inside description / content:encoded are usually entity-escaped or in CDATA.
    attr(b.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"'), /<img[^>]+src="([^"]+)"/i),
  ];
  const hit = candidates.find((u) => /^https:\/\//i.test(u));
  return hit ?? null;
}

function excerptOf(b: string): string {
  const text = tag(b, "description") || tag(b, "summary") || tag(b, "content:encoded");
  if (!text) return "";
  return text.length > 180 ? `${text.slice(0, 177).trimEnd()}…` : text;
}

/** Parse RSS 2.0 or Atom into headline items. Only http(s) links are kept. */
export function parseFeed(xml: string, source: string, limit = 10): NewsItem[] {
  const blocks = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) ?? xml.match(/<entry[\s>][\s\S]*?<\/entry>/gi) ?? [];
  const items: NewsItem[] = [];
  for (const b of blocks.slice(0, limit)) {
    const title = tag(b, "title");
    let link = tag(b, "link");
    if (!link) link = b.match(/<link[^>]*href="([^"]+)"/i)?.[1] ?? "";
    if (!title || !/^https?:\/\//i.test(link)) continue;
    const date = tag(b, "pubDate") || tag(b, "published") || tag(b, "updated") || tag(b, "dc:date");
    const t = date ? Date.parse(date) : NaN;
    items.push({
      title,
      link,
      source,
      publishedAt: Number.isNaN(t) ? null : new Date(t).toISOString(),
      image: findImage(b),
      excerpt: excerptOf(b),
    });
  }
  return items;
}
