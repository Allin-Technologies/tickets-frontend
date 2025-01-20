import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Straqa",
    short_name: "Straqa",
    description: "Ticket experience made easy",
    start_url: "/",
    display: "standalone",
    background_color: "#f2f2f2",
    theme_color: "#f2f2f2",
    icons: [
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
