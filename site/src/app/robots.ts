import type { MetadataRoute } from "next";
import { absoluteUrl, allowIndexing } from "@/content";

export default function robots(): MetadataRoute.Robots {
  if (!allowIndexing) {
    return {
      rules: [
        {
          userAgent: "*",
          disallow: "/",
        },
      ],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
