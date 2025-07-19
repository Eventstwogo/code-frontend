import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
    ],
     domains: [
      'upload.wikimedia.org',
      'i.guim.co.uk',
      'cdn.pixabay.com',
      'wonderla.com',
      'images.unsplash.com',
      'plus.unsplash.com',
      'www.shutterstock.com',
       "assets.monica.im"

    ],
  },
};

export default nextConfig;
