
/** @type {import('next').NextConfig} */
const nextConfig = {
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
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        port: '',
        pathname: '/**',
      },
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
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co', // ✅ Added this line
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.pw.live',
        pathname: '/**', // Allow all paths under this domain
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.vedantu.store',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '5.imimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'campustechnology.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    allowedDevOrigins: [
        'https://6000-firebase-studio-1748862865024.cluster-htdgsbmflbdmov5xrjithceibm.cloudworkstations.dev',
        'https://9003-firebase-studio-1748862865024.cluster-htdgsbmflbdmov5xrjithceibm.cloudworkstations.dev', // Added new origin with port 9003
        // Add other origins if needed, e.g., http://localhost:XXXX if you also run/test locally
    ]
  }
};

module.exports = nextConfig;
