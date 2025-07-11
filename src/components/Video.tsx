import React, { useRef, useState } from 'react';

const Video = () => {
  const videoRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const [isPlaying, setIsPlaying] = useState([false, false, false, false]);
  const [isMuted, setIsMuted] = useState([true, true, true, true]);

  const handleHover = (index) => {
    if (videoRefs[index].current) {
      videoRefs[index].current.play();
      setIsPlaying((prev) => {
        const newState = [...prev];
        newState[index] = true;
        return newState;
      });
    }
  };

  const handleLeave = (index) => {
    if (videoRefs[index].current) {
      videoRefs[index].current.pause();
      setIsPlaying((prev) => {
        const newState = [...prev];
        newState[index] = false;
        return newState;
      });
    }
  };

  const togglePlayPause = (index) => {
    if (videoRefs[index].current) {
      if (isPlaying[index]) {
        videoRefs[index].current.pause();
      } else {
        videoRefs[index].current.play();
      }
      setIsPlaying((prev) => {
        const newState = [...prev];
        newState[index] = !newState[index];
        return newState;
      });
    }
  };

  const toggleMute = (index) => {
    if (videoRefs[index].current) {
      videoRefs[index].current.muted = !isMuted[index];
      setIsMuted((prev) => {
        const newState = [...prev];
        newState[index] = !newState[index];
        return newState;
      });
    }
  };

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

  return (
    <div className="bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Featured in videos</h2>
      <p className="text-sm mb-4 text-gray-400">See what creators are sharing</p>
      
      {/* Desktop Grid - unchanged */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {videos.map((video, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg overflow-hidden relative"
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => handleLeave(index)}
          >
            <div className="w-full" style={{ paddingTop: '128.00%' }}>
              <video
                ref={videoRefs[index]}
                className="absolute top-0 left-0 w-full h-full object-cover"
                muted={isMuted[index]}
                loop
              >
                <source src={video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <button
                onClick={() => togglePlayPause(index)}
                className="absolute top-2 right-12 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full"
              >
                {isPlaying[index] ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 5V19L18 12L6 5Z" fill="white"/>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5V19L19 12L8 5Z" fill="white"/>
                  </svg>
                )}
              </button>
              <button
                onClick={() => toggleMute(index)}
                className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full"
              >
                {isMuted[index] ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9V15H7L12 20V4L7 9H3ZM16 7V17H18V7H16ZM18 5H14.5L19.5 10V14L14.5 19H18L23 14V10L18 5Z" fill="white"/>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9V15H7L12 20V4L7 9H3ZM14 6H16L19 9V15L16 18H14V6Z" fill="white"/>
                  </svg>
                )}
              </button>
            </div>
            <div className="p-2">
              <p className="text-xs text-gray-400">{video.caption}</p>
              <p className="text-sm font-semibold">{video.handle}</p>
              <p className="text-green-400 text-sm">{video.price}</p>
              <p className="text-xs text-gray-300">{video.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Grid - 2 columns */}
      <div className="md:hidden grid grid-cols-2 gap-3">
        {videos.map((video, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg overflow-hidden relative"
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => handleLeave(index)}
          >
            <div className="w-full" style={{ paddingTop: '128.00%' }}>
              <video
                ref={videoRefs[index]}
                className="absolute top-0 left-0 w-full h-full object-cover"
                muted={isMuted[index]}
                loop
              >
                <source src={video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <button
                onClick={() => togglePlayPause(index)}
                className="absolute top-1 right-8 bg-gray-700 hover:bg-gray-600 text-white p-1 rounded-full"
              >
                {isPlaying[index] ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 5V19L18 12L6 5Z" fill="white"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5V19L19 12L8 5Z" fill="white"/>
                  </svg>
                )}
              </button>
              <button
                onClick={() => toggleMute(index)}
                className="absolute top-1 right-1 bg-gray-700 hover:bg-gray-600 text-white p-1 rounded-full"
              >
                {isMuted[index] ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9V15H7L12 20V4L7 9H3ZM16 7V17H18V7H16ZM18 5H14.5L19.5 10V14L14.5 19H18L23 14V10L18 5Z" fill="white"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9V15H7L12 20V4L7 9H3ZM14 6H16L19 9V15L16 18H14V6Z" fill="white"/>
                  </svg>
                )}
              </button>
            </div>
            <div className="p-2">
              <p className="text-xs text-gray-400 truncate">{video.caption}</p>
              <p className="text-sm font-semibold truncate">{video.handle}</p>
              <p className="text-green-400 text-sm">{video.price}</p>
              <p className="text-xs text-gray-300 line-clamp-2">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Video;
