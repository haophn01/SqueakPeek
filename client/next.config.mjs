/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configures the Google image when user is redirected
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
      },
      {
        hostname: "www.amazon.com",
        protocol: "https",
      },
      {
        hostname: "cdn.brandfetch.io",
        protocol: "https",
      },
    ],
  },
  reactStrictMode: false
};

export default nextConfig;
