import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Harry Yu — Software Engineer",
    short_name: "Harry Yu",
    description:
      "Portfolio of Harry Yu, a software engineer working across systems, machine learning, game development, and interactive 3D.",
    start_url: "/",
    display: "standalone",
    background_color: "#02010a",
    theme_color: "#02010a",
    lang: "en",
    categories: ["portfolio", "technology", "productivity"],
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
