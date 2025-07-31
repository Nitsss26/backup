

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
 
  images: {
    domains: ['static.uacdn.net', 'static.pw.live', 'images.unsplash.com', 'encrypted-tbn0.gstatic.com','res.cloudinary.com'],
    remotePatterns: [ 
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'careerwill.com',
        port: '',
        pathname: '/**',
      },
   
      {
        protocol: 'https',
        hostname: 'sttc.gamersgate.com',
        port: '',
        pathname: '/**',
      },     
      {
        protocol: 'https',
        hostname: 'picasso.cosmofeed.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/**',
      },
        {
          protocol: 'https',
          hostname: 'cdn.pwskills.com',
          port: '',
          pathname: '/**',
        },
      {
        protocol: 'https',
        hostname: 'logowik.com',
        port: '',
        pathname: '/**',
      }, {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.svgrepo.com',
        port: '',
        pathname: '/**',
      }, {
        protocol: 'https',
        hostname: 'i.postimg.cc',
        port: '',
        pathname: '/**',
      },{
        protocol: 'https',
        hostname: 'd2bps9p1kiy4ka.cloudfront.net',
        port: '',
        pathname: '/**',
      },{
        protocol: 'https',
        hostname: 'images.geekster.in',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'd18qz45wk4tdlr.cloudfront.net',
        port: '',
        pathname: '/**',
      },     {
        protocol: 'https',
        hostname: 'store.pw.live',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '/**', 
      },   {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        port: '',
        pathname: '/**',
      },{
        protocol: 'https',
        hostname: 'yt3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },{
        protocol: 'https',
        hostname: 'static.wixstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.uacdn.net',
        pathname: '/**',
      },{
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.pw.live',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ineuron.ai',
      },
      {
        protocol: 'https',
        hostname: 'cdn.ineuron.ai',
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
      { 
        protocol: 'https',
        hostname: 'img.freepik.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co', 
        port: '',
        pathname: '/**',
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
      }, {
        protocol: 'https',
        hostname: 'internship.ineuron.ai',
        port: '',
        pathname: '/**',
      }, {
        protocol: 'https',
        hostname: 'santrapub.com',
        port: '',
        pathname: '/**',
      },{
        protocol: 'https',
        hostname: 'ineuron.ai',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.ineuron.ai',
        pathname: '/**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    allowedDevOrigins: [
        'https://6000-firebase-studio-1748862865024.cluster-htdgsbmflbdmov5xrjithceibm.cloudworkstations.dev',
        'https://9003-firebase-studio-1748862865024.cluster-htdgsbmflbdmov5xrjithceibm.cloudworkstations.dev', // Added new origin with port 9003
    ]
  }
};

module.exports = nextConfig;

