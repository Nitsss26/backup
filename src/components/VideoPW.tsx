"use client";

import React, { useRef, useState, useEffect } from 'react';

const videos = [
  {
    src: '/j.mp4',
    caption: 'WALMART under $5 haul',
    handle: '@alexnicolehome',
    price: '$10.57',
    description: "Time and Tru Women's Cotton Off the Shoulder Midi Dress Sizes XS-XXXXL",
  },
  {
    src: '/k.mp4',
    caption: '@walmartfinds',
    handle: '@walmartfinds',
    price: '$16.99',
    description: 'Madden NYC Women\'s Raffia Flat Platform Sandals with Adjustable Straps',
  },
  {
    src: '/l.mp4',
    caption: 'cutest water bottles',
    handle: '@fabfindswithfallon',
    price: '$10.97',
    description: 'TAL Stainless Steel Paracord Handle Water Bottle 24 oz, Pink',
  },
  {
    src: '/m.mp4',
    caption: '@burleighford',
    handle: '@burleighford',
    price: '$5.48',
    description: 'No Boundaries Seamless Tank Top, Women\'s',
  },
];

const VideoCard = ({ video }: { video: typeof videos[0] }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => console.info("Autoplay prevented on hover:", error));
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play().catch((error) => console.info("Play action prevented:", error));
      } else {
        video.pause();
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);

    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, []);

  return (
    <div
      className="bg-gray-800 rounded-lg overflow-hidden relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full" style={{ paddingTop: '128.00%' }}>
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          muted={isMuted}
          loop
          playsInline
        >
          <source src={video.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={togglePlayPause}
            className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200 z-10"
          >
            {isPlaying ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 4H10V20H6V4ZM14 4H18V20H14V4Z" fill="white"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5V19L19 12L8 5Z" fill="white"/>
              </svg>
            )}
          </button>
          <button
            onClick={toggleMute}
            className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200 z-10"
          >
            {isMuted ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.5 12C16.5 10.23 15.5 8.71 14 7.97V10.18L16.45 12.63C16.48 12.43 16.5 12.22 16.5 12ZM19 12C19 12.94 18.8 13.82 18.46 14.64L19.97 16.15C20.63 14.91 21 13.5 21 12C21 7.72 18 4.14 14 3.23V5.29C16.89 6.15 19 8.83 19 12ZM4.27 3L3 4.27L7.73 9H3V15H7L12 20V13.27L16.25 17.53C15.58 18.04 14.83 18.46 14 18.7V20.77C15.38 20.45 16.63 19.82 17.68 18.96L19.73 21L21 19.73L12 10.73L4.27 3ZM12 4L9.91 6.09L12 8.18V4Z" fill="white"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9V15H7L12 20V4L7 9H3ZM16.5 12C16.5 10.23 15.5 8.71 14 7.97V16.02C15.5 15.29 16.5 13.77 16.5 12ZM14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23Z" fill="white"/>
              </svg>
            )}
          </button>
        </div>
      </div>
      {/* <div className="p-2">
        <p className="text-sm font-medium">{video.caption}</p>
        <p className="text-xs text-gray-400">{video.handle}</p>
        <p className="text-xs text-green-400">{video.price}</p>
        <p className="text-xs text-gray-300 line-clamp-2">{video.description}</p>
      </div> */}
    </div>
  );
};

const Video = () => {
  return (
    <div className="bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Featured in videos</h2>
      <p className="text-sm mb-4 text-gray-400">See what creators are sharing</p>
      
      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {videos.map((video, index) => (
          <VideoCard key={index} video={video} />
        ))}
      </div>

      {/* Mobile Grid */}
      <div className="md:hidden grid grid-cols-2 gap-3">
        {videos.map((video, index) => (
          <VideoCard key={index} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Video;