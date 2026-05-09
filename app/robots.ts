import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/home",
          "/saved",
          "/repo",
          "/settings",
          "/projects/new",
          "/verify-email",
          "/forgot-password",
          "/reset-password",
          "/verify-reset-otp",
        ],
      },
    ],
    sitemap: "https://equits.net/sitemap.xml",
  };
}
