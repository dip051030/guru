import { describe, it, expect } from "vitest";
import { parseFeed } from "./rss";

describe("parseFeed", () => {
  it("reads RSS 2.0 items with CDATA and entities", () => {
    const xml = `<rss><channel><title>Feed</title>
      <item><title><![CDATA[काठमाडौंमा &quot;बाढी&quot; & पहिरो]]></title><link>https://example.com/a</link><pubDate>Tue, 13 Oct 2026 05:00:00 GMT</pubDate></item>
      <item><title>Bad link</title><link>javascript:alert(1)</link></item>
      <item><title>दोस्रो समाचार</title><link>https://example.com/b</link></item>
    </channel></rss>`;
    const items = parseFeed(xml, "Test");
    expect(items).toHaveLength(2);
    expect(items[0].title).toBe('काठमाडौंमा "बाढी" & पहिरो');
    expect(items[0].publishedAt).toBe("2026-10-13T05:00:00.000Z");
    expect(items[1].publishedAt).toBeNull();
  });

  it("reads Atom entries", () => {
    const xml = `<feed><entry><title>Atom headline</title><link rel="alternate" href="https://example.com/x"/><updated>2026-10-13T06:00:00Z</updated></entry></feed>`;
    expect(parseFeed(xml, "A")[0]).toMatchObject({ title: "Atom headline", link: "https://example.com/x" });
  });

  it("finds the article photo in the common feed formats", () => {
    const wrap = (inner: string) => `<rss><channel><item><title>T</title><link>https://e.com/a</link>${inner}</item></channel></rss>`;
    const img = (inner: string) => parseFeed(wrap(inner), "S")[0].image;
    // BBC style
    expect(img('<media:thumbnail width="240" url="https://ichef.bbci.co.uk/x.jpg"/>')).toBe("https://ichef.bbci.co.uk/x.jpg");
    // media:content with medium
    expect(img('<media:content url="https://cdn.e.com/p.jpg" medium="image"/>')).toBe("https://cdn.e.com/p.jpg");
    // enclosure
    expect(img('<enclosure url="https://cdn.e.com/e.webp" length="1" type="image/webp"/>')).toBe("https://cdn.e.com/e.webp");
    // WordPress: <img> inside escaped description
    expect(img('<description>&lt;p&gt;&lt;img src="https://cdn.e.com/wp.jpg" /&gt;Body text&lt;/p&gt;</description>')).toBe("https://cdn.e.com/wp.jpg");
    // CDATA content:encoded
    expect(img('<content:encoded><![CDATA[<figure><img class="a" src="https://cdn.e.com/c.jpg"></figure>]]></content:encoded>')).toBe("https://cdn.e.com/c.jpg");
    // http-only or missing -> null
    expect(img('<enclosure url="http://insecure.e.com/a.jpg" type="image/jpeg"/>')).toBeNull();
    expect(img("")).toBeNull();
  });

  it("makes a short plain-text excerpt", () => {
    const xml = `<rss><item><title>T</title><link>https://e.com/a</link><description><![CDATA[<p>${"शब्द ".repeat(60)}</p>]]></description></item></rss>`;
    const e = parseFeed(xml, "S")[0].excerpt;
    expect(e.length).toBeLessThanOrEqual(180);
    expect(e).not.toContain("<");
  });
});
