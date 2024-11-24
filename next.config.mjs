/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: false, // Set to `true` if this is a permanent redirect
      },
    ];
  },
};

export default nextConfig;
