import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every page is prerendered, so the site ships as static files (Firebase Hosting).
  // Redirects live in firebase.json because a static export has no server to run them.
  output: "export",
};

export default nextConfig;
