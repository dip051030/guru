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
});
