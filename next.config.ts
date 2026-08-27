import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "whatsapp.ebms.ae",
      },
    ],
  },
};

export default createNextIntlPlugin("./i18n/request.ts")(nextConfig);
