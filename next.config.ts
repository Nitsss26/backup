
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // experimental: { // Removing allowedDevOrigins from here to consolidate in next.config.js
  //   allowedDevOrigins: [
  //       'https://6000-firebase-studio-1748862865024.cluster-htdgsbmflbdmov5xrjithceibm.cloudworkstations.dev',
  //       // Add other origins if needed, e.g., http://localhost:XXXX if you also run/test locally
  //   ]
  // }
};

export default nextConfig;
