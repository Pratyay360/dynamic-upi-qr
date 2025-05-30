const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: "raw.githubusercontent.com" },
      { hostname: "github.com" },
      { hostname: "wekwttnnowtwqzntesch.supabase.co" },
      { hostname: "cdn.hashnode.com" },
      { hostname: "private-user-images.githubusercontent.com" },
    ],
  },
  allowedDevOrigins: ["localhost", "local.dev", "192.168.0.114"],
};

export default nextConfig;