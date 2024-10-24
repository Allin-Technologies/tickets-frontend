import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tickets by All-in",
    short_name: "Tickets by All-in",
    description: "Ticket experience made easy",
    start_url: "/",
    display: "standalone",
    background_color: "#f2f2f2",
    theme_color: "#f2f2f2",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
