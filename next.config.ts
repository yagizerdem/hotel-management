import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // The public home page lives at /home. Redirecting here, before rendering,
  // answers with a real 307; redirect() in a page would stream a 200 with a
  // client-side redirect instead.
  async redirects() {
    return [{ source: "/", destination: "/home", permanent: false }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
