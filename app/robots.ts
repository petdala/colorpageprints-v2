import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/launch/"]
      }
    ],
    sitemap: "https://www.colorpageprints.com/sitemap.xml"
  };
}
