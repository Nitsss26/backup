
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
      { // Added for Freepik, though primary use should be placehold.co
        protocol: 'https',
        hostname: 'img.freepik.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  experimental: {
    allowedDevOrigins: [
        'https://6000-firebase-studio-1748862865024.cluster-htdgsbmflbdmov5xrjithceibm.cloudworkstations.dev',
        // Add other origins if needed, e.g., http://localhost:XXXX if you also run/test locally
    ]
  }
};

export default nextConfig;
