import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ALMAS Restaurant Aarau",
    short_name: "ALMAS",
    description:
      "ALMAS Restaurant, Bahnhofstrasse 92, 5000 Aarau: Grill, Pizza, Pide, Lahmacun und Baklava.",
    start_url: "/de",
    display: "standalone",
    background_color: "#EAE5DC",
    theme_color: "#EAE5DC",
    lang: "de-CH",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
