import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
    remotePatterns: [
       {
        protocol: 'http',
        hostname: 'localhost',
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
       "assets.monica.im",
       "m.media-amazon.com",
       "encrypted-tbn0.gstatic.com"

    ],
  },
};

export default nextConfig;
