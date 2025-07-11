
"use client";

import React, { useRef, useState, useEffect } from 'react';

const Video = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [mutedIndex, setMutedIndex] = useState<number | null>(null);

  const videos = [
    {
      src: '/a.mp4',
      caption: 'WALMART under $5 haul',
      handle: '@alexnicolehome',
      price: '$10.57',
      description: "Time and Tru Women's Cotton Off the Shoulder Midi Dress Sizes XS-XXXXL",
    },
    {
      src: '/b.mp4',
      caption: '@walmartfinds',
      handle: '@walmartfinds',
      price: '$16.99',
      description: "Madden NYC Women's Raffia Flat Platform Sandals with Adjustable Straps",
    },
    {
      src: '/c.mp4',
      caption: 'cutest water bottles',
      handle: '@fabfindswithfallon',
      price: '$10.97',
      description: 'TAL Stainless Steel Paracord Handle Water Bottle 24 oz, Pink',
    },
    {
      src: '/d.mp4',
      caption: '@burleighford',
      handle: '@burleighford',
      price: '$5.48',
      description: "No Boundaries Seamless Tank Top, Women's",
    },
  ];

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videos.length);
  }, [videos.length]);

  const handleMouseEnter = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.play().catch(error => console.info("Autoplay prevented:", error));
      setPlayingIndex(index);
    }
  };

  const handleMouseLeave = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      setPlayingIndex(null);
    }
  };

  const togglePlayPause = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      if (video.paused) {
        video.play().catch(error => console.info("Play action prevented:", error));
        setPlayingIndex(index);
      } else {
        video.pause();
        setPlayingIndex(null);
      }
    }
  };

  const toggleMute = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.muted = !video.muted;
      setMutedIndex(video.muted ? null : index);
    }
  };

  const VideoCard = ({ video, index }: { video: typeof videos[0], index: number }) => (
    <div
      className="bg-gray-800 rounded-lg overflow-hidden relative group"
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseLeave={() => handleMouseLeave(index)}
    >
      <div className="w-full" style={{ paddingTop: '128.00%' }}>
        <video
          ref={el => videoRefs.current[index] = el}
          className="absolute top-0 left-0 w-full h-full object-cover"
          muted={mutedIndex !== index}
          loop
          playsInline // Important for mobile browsers
        >
          <source src={video.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => togglePlayPause(index)}
            className="bg-gray-700/50 hover:bg-gray-600/70 text-white p-2 rounded-full backdrop-blur-sm"
            aria-label={playingIndex === index ? "Pause" : "Play"}
          >
            {playingIndex === index ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="white"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 5v14l11-7z" fill="white"/></svg>
            )}
          </button>
          <button
            onClick={() => toggleMute(index)}
            className="bg-gray-700/50 hover:bg-gray-600/70 text-white p-2 rounded-full backdrop-blur-sm"
            aria-label={mutedIndex === index ? "Mute" : "Unmute"}
          >
            {mutedIndex === index ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21A2.5 2.5 0 0 1 16.5 12zm-4.5 0v-2.14l4.5 4.5V12h-4.5zM3 9v6h4l5 5V4L7 9H3z" fill="white"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05A4.5 4.5 0 0 0 16.5 12z" fill="white"/></svg>
            )}
          </button>
        </div>
      </div>
      <div className="p-2">
        <p className="text-xs text-gray-400 truncate">{video.caption}</p>
        <p className="text-sm font-semibold truncate">{video.handle}</p>
        <p className="text-green-400 text-sm">{video.price}</p>
        <p className="text-xs text-gray-300 line-clamp-2">{video.description}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Featured in videos</h2>
      <p className="text-sm mb-4 text-gray-400">See what creators are sharing</p>
      
      {/* Desktop and Mobile Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {videos.map((video, index) => (
          <VideoCard key={index} video={video} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Video;
