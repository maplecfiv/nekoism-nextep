import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    serviceType: "standalone",
    frontend: "http://localhost:3000",
    backend: "http://localhost:3000",
    parseServer: "http://localhost:1337",
    parseAppId: "APPLICATION_ID",
    parseMasterId: "MASTER_KEY"
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
