// File: app/api/fetchProfileImage/route.js
import * as cheerio from "cheerio";

export async function POST(request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return Response.json({ success: false, error: "Missing URL" }, { status: 400 });
    }

    // Fetch page HTML
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    });

    const html = await res.text();

    // Parse with Cheerio
    const $ = cheerio.load(html);

    // Try to find Open Graph image (used by most social platforms)
    const ogImage = $('meta[property="og:image"]').attr("content");

    if (ogImage) {
      return Response.json({ success: true, imageUrl: ogImage });
    }

    // Fallback: Try Facebook profile image selectors
    const fbImage = $('image').attr('xlink:href') || $("img").first().attr("src");
    if (fbImage) {
      return Response.json({ success: true, imageUrl: fbImage });
    }

    return Response.json({ success: false, error: "No image found" }, { status: 404 });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}

