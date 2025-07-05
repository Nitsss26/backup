// // 'use client';

// // import React, { useState, useRef, useEffect } from 'react';
// // import { Play, Pause, Volume2, VolumeX, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

// // interface VideoData {
// //   id: string;
// //   title: string;
// //   creator: string;
// //   thumbnail: string;
// //   videoUrl: string;
// //   price: string;
// //   originalPrice?: string;
// //   description: string;
// //   rating: number;
// //   totalRatings: number;
// //   duration: string;
// //   category: string;
// // }

// // interface VideoPlayerProps {
// //   video: VideoData;
// //   isPlaying: boolean;
// //   onPlayPause: () => void;
// //   currentTime: number;
// //   duration: number;
// // }

// // const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
// //   video, 
// //   isPlaying, 
// //   onPlayPause, 
// //   currentTime, 
// //   duration 
// // }) => {
// //   const [isMuted, setIsMuted] = useState(true);
// //   const [showControls, setShowControls] = useState(false);

// //   const formatTime = (time: number) => {
// //     const minutes = Math.floor(time / 60);
// //     const seconds = Math.floor(time % 60);
// //     return `${minutes}:${seconds.toString().padStart(2, '0')}`;
// //   };

// //   const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

// //   return (
// //     <div 
// //       className="relative w-full h-80 bg-gray-900 rounded-lg overflow-hidden group cursor-pointer"
// //       onMouseEnter={() => setShowControls(true)}
// //       onMouseLeave={() => setShowControls(false)}
// //       onClick={onPlayPause}
// //     >
// //       {/* Video Thumbnail/Background */}
// //       <div 
// //         className="absolute inset-0 bg-cover bg-center"
// //         style={{ backgroundImage: `url(${video.thumbnail})` }}
// //       >
// //         <div className="absolute inset-0 bg-black bg-opacity-40"></div>
// //       </div>

// //       {/* Course Category Badge */}
// //       <div className="absolute top-3 left-3 z-20">
// //         <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded">
// //           {video.category}
// //         </span>
// //       </div>

// //       {/* Creator Handle */}
// //       <div className="absolute bottom-20 left-3 z-20">
// //         <span className="text-white text-sm font-medium bg-black bg-opacity-50 px-2 py-1 rounded">
// //           @{video.creator}
// //         </span>
// //       </div>

// //       {/* Video Controls Overlay */}
// //       <div className={`absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300 ${
// //         showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
// //       }`}>
        
// //         {/* Center Play/Pause Button */}
// //         <div className="absolute inset-0 flex items-center justify-center">
// //           <button
// //             onClick={(e) => {
// //               e.stopPropagation();
// //               onPlayPause();
// //             }}
// //             className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-4 transition-all duration-200"
// //           >
// //             {isPlaying ? (
// //               <Pause className="w-8 h-8 text-white" />
// //             ) : (
// //               <Play className="w-8 h-8 text-white ml-1" />
// //             )}
// //           </button>
// //         </div>

// //         {/* Bottom Controls */}
// //         <div className="absolute bottom-0 left-0 right-0 p-4">
// //           {/* Progress Bar */}
// //           <div className="w-full bg-gray-600 bg-opacity-50 h-1 rounded-full mb-3">
// //             <div 
// //               className="bg-blue-500 h-full rounded-full transition-all duration-300"
// //               style={{ width: `${progressPercentage}%` }}
// //             ></div>
// //           </div>

// //           {/* Control Buttons */}
// //           <div className="flex items-center justify-between">
// //             <div className="flex items-center space-x-3">
// //               <button
// //                 onClick={(e) => {
// //                   e.stopPropagation();
// //                   onPlayPause();
// //                 }}
// //                 className="text-white hover:text-blue-400 transition-colors"
// //               >
// //                 {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
// //               </button>
              
// //               <button
// //                 onClick={(e) => {
// //                   e.stopPropagation();
// //                   setIsMuted(!isMuted);
// //                 }}
// //                 className="text-white hover:text-blue-400 transition-colors"
// //               >
// //                 {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
// //               </button>

// //               <button
// //                 onClick={(e) => {
// //                   e.stopPropagation();
// //                 }}
// //                 className="text-white hover:text-blue-400 transition-colors"
// //               >
// //                 <RotateCcw className="w-5 h-5" />
// //               </button>

// //               <span className="text-white text-sm">
// //                 {formatTime(currentTime)} / {formatTime(duration)}
// //               </span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const FeaturedVideos: React.FC = () => {
// //   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
// //   const [isPlaying, setIsPlaying] = useState(false);
// //   const [currentTime, setCurrentTime] = useState(0);
// //   const [duration, setDuration] = useState(180); // Mock duration
// //   const videoRef = useRef<NodeJS.Timeout | null>(null);

// //   // Mock video data - replace with your actual data
// //   const videos: VideoData[] = [
// //     {
// //       id: '1',
// //       title: 'IIT-JEE Physics: Mechanics & Thermodynamics',
// //       creator: 'expert.tutors.academy',
// //       thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=600&fit=crop',
// //       videoUrl: '',
// //       price: '₹4,999',
// //       originalPrice: '₹7,999',
// //       description: 'Complete IIT-JEE Physics course covering Mechanics and Thermodynamics',
// //       rating: 4.5,
// //       totalRatings: 1250,
// //       duration: '120 hours total',
// //       category: 'IIT-JEE'
// //     },
// //     {
// //       id: '2',
// //       title: 'NEET Biology: Complete Syllabus Coverage',
// //       creator: 'kaushik.learning.solutions',
// //       thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
// //       videoUrl: '',
// //       price: '₹4,499',
// //       originalPrice: '₹6,999',
// //       description: 'Comprehensive NEET Biology preparation course',
// //       rating: 4.3,
// //       totalRatings: 800,
// //       duration: '150 hours total',
// //       category: 'NEET'
// //     },
// //     {
// //       id: '3',
// //       title: 'UPSC CSE Prelims: GS Paper 1 Strategy Course',
// //       creator: 'vidya.mandir.online',
// //       thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
// //       videoUrl: '',
// //       price: '₹3,500',
// //       description: 'Strategic approach to UPSC CSE Prelims General Studies Paper 1',
// //       rating: 4.6,
// //       totalRatings: 950,
// //       duration: '100 hours total',
// //       category: 'Government Exams'
// //     },
// //     {
// //       id: '4',
// //       title: 'Full Stack Web Development Course: MERN Stack',
// //       creator: 'innovate.skill.hub',
// //       thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
// //       videoUrl: '',
// //       price: '₹2,999',
// //       originalPrice: '₹5,999',
// //       description: 'Complete Full Stack Web Development using MERN Stack',
// //       rating: 4.4,
// //       totalRatings: 2100,
// //       duration: '80 hours total',
// //       category: 'Computer Science'
// //     }
// //   ];

// //   const currentVideo = videos[currentVideoIndex];

// //   const handlePlayPause = () => {
// //     setIsPlaying(!isPlaying);
// //   };

// //   const nextVideo = () => {
// //     setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
// //     setIsPlaying(false);
// //     setCurrentTime(0);
// //   };

// //   const prevVideo = () => {
// //     setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
// //     setIsPlaying(false);
// //     setCurrentTime(0);
// //   };

// //   // Mock video progress
// //   useEffect(() => {
// //     if (isPlaying) {
// //       videoRef.current = setInterval(() => {
// //         setCurrentTime((prev) => {
// //           if (prev >= duration) {
// //             setIsPlaying(false);
// //             return 0;
// //           }
// //           return prev + 1;
// //         });
// //       }, 1000);
// //     } else {
// //       if (videoRef.current) {
// //         clearInterval(videoRef.current);
// //       }
// //     }

// //     return () => {
// //       if (videoRef.current) {
// //         clearInterval(videoRef.current);
// //       }
// //     };
// //   }, [isPlaying, duration]);

// //   const renderStars = (rating: number) => {
// //     const stars = [];
// //     const fullStars = Math.floor(rating);
// //     const hasHalfStar = rating % 1 !== 0;

// //     for (let i = 0; i < fullStars; i++) {
// //       stars.push(<span key={i} className="text-yellow-400">★</span>);
// //     }
// //     if (hasHalfStar) {
// //       stars.push(<span key="half" className="text-yellow-400">★</span>);
// //     }
// //     for (let i = stars.length; i < 5; i++) {
// //       stars.push(<span key={i} className="text-gray-600">★</span>);
// //     }
// //     return stars;
// //   };

// //   return (
// //     <div className="bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
// //       <div className="max-w-7xl mx-auto">
// //         {/* Header */}
// //         <div className="mb-8">
// //           <h2 className="text-3xl font-bold text-white mb-2">Featured in Videos</h2>
// //           <p className="text-gray-400">See what creators are sharing</p>
// //         </div>

// //         {/* Main Content */}
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //           {/* Video Player Section */}
// //           <div className="lg:col-span-2">
// //             <div className="relative">
// //               <VideoPlayer
// //                 video={currentVideo}
// //                 isPlaying={isPlaying}
// //                 onPlayPause={handlePlayPause}
// //                 currentTime={currentTime}
// //                 duration={duration}
// //               />
              
// //               {/* Navigation Arrows */}
// //               <button
// //                 onClick={prevVideo}
// //                 className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
// //               >
// //                 <ChevronLeft className="w-6 h-6" />
// //               </button>
              
// //               <button
// //                 onClick={nextVideo}
// //                 className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
// //               >
// //                 <ChevronRight className="w-6 h-6" />
// //               </button>
// //             </div>

// //             {/* Video Info */}
// //             <div className="mt-6 bg-gray-800 rounded-lg p-6">
// //               <div className="flex items-start justify-between">
// //                 <div className="flex-1">
// //                   <h3 className="text-xl font-semibold text-white mb-2">
// //                     {currentVideo.title}
// //                   </h3>
// //                   <p className="text-gray-400 mb-3">
// //                     By {currentVideo.creator.replace(/\./g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2')}
// //                   </p>
// //                   <p className="text-gray-300 mb-4">{currentVideo.description}</p>
                  
// //                   <div className="flex items-center space-x-4 mb-4">
// //                     <div className="flex items-center">
// //                       {renderStars(currentVideo.rating)}
// //                       <span className="text-gray-400 ml-2">({currentVideo.totalRatings})</span>
// //                     </div>
// //                     <span className="text-gray-400">{currentVideo.duration}</span>
// //                   </div>
// //                 </div>
                
// //                 <div className="text-right ml-6">
// //                   <div className="text-2xl font-bold text-white mb-1">
// //                     {currentVideo.price}
// //                   </div>
// //                   {currentVideo.originalPrice && (
// //                     <div className="text-gray-500 line-through text-sm">
// //                       {currentVideo.originalPrice}
// //                     </div>
// //                   )}
// //                   <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
// //                     View Details
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Video List Sidebar */}
// //           <div className="space-y-4">
// //             <h3 className="text-lg font-semibold text-white mb-4">Related Courses</h3>
// //             {videos.map((video, index) => (
// //               <div
// //                 key={video.id}
// //                 onClick={() => {
// //                   setCurrentVideoIndex(index);
// //                   setIsPlaying(false);
// //                   setCurrentTime(0);
// //                 }}
// //                 className={`bg-gray-800 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:bg-gray-700 ${
// //                   index === currentVideoIndex ? 'ring-2 ring-blue-500' : ''
// //                 }`}
// //               >
// //                 <div className="flex space-x-3">
// //                   <div className="relative w-16 h-12 bg-gray-700 rounded overflow-hidden flex-shrink-0">
// //                     <div 
// //                       className="w-full h-full bg-cover bg-center"
// //                       style={{ backgroundImage: `url(${video.thumbnail})` }}
// //                     />
// //                     <div className="absolute inset-0 flex items-center justify-center">
// //                       <Play className="w-4 h-4 text-white" />
// //                     </div>
// //                   </div>
// //                   <div className="flex-1 min-w-0">
// //                     <h4 className="text-sm font-medium text-white truncate mb-1">
// //                       {video.title}
// //                     </h4>
// //                     <p className="text-xs text-gray-400 mb-1">
// //                       @{video.creator}
// //                     </p>
// //                     <div className="flex items-center justify-between">
// //                       <span className="text-sm font-semibold text-blue-400">
// //                         {video.price}
// //                       </span>
// //                       <div className="flex items-center">
// //                         {renderStars(video.rating)}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Video Indicators */}
// //         <div className="flex justify-center mt-8 space-x-2">
// //           {videos.map((_, index) => (
// //             <button
// //               key={index}
// //               onClick={() => {
// //                 setCurrentVideoIndex(index);
// //                 setIsPlaying(false);
// //                 setCurrentTime(0);
// //               }}
// //               className={`w-3 h-3 rounded-full transition-colors duration-200 ${
// //                 index === currentVideoIndex ? 'bg-blue-500' : 'bg-gray-600'
// //               }`}
// //             />
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default FeaturedVideos;


// import React, { useRef, useState } from 'react';

// const Video = () => {
//   const videoRefs = [
//     useRef(null),
//     useRef(null),
//     useRef(null),
//     useRef(null),
//   ];
//   const [isPlaying, setIsPlaying] = useState([false, false, false, false]);

//   const handleHover = (index) => {
//     if (videoRefs[index].current) {
//       videoRefs[index].current.play();
//       setIsPlaying((prev) => {
//         const newState = [...prev];
//         newState[index] = true;
//         return newState;
//       });
//     }
//   };

//   const handleLeave = (index) => {
//     if (videoRefs[index].current) {
//       videoRefs[index].current.pause();
//       setIsPlaying((prev) => {
//         const newState = [...prev];
//         newState[index] = false;
//         return newState;
//       });
//     }
//   };

//   const togglePlayPause = (index) => {
//     if (videoRefs[index].current) {
//       if (isPlaying[index]) {
//         videoRefs[index].current.pause();
//       } else {
//         videoRefs[index].current.play();
//       }
//       setIsPlaying((prev) => {
//         const newState = [...prev];
//         newState[index] = !newState[index];
//         return newState;
//       });
//     }
//   };

//   const videos = [
//     {
//       src: '/a.mp4',
//       caption: 'Intro to Python Programming',
//       handle: '@ineuron_cs',
//       price: '99.99',
//       description: 'Master Python for Data Science and AI',
//     },
//     {
//       src: '/b.mp4',
//       caption: 'Advanced Algorithms',
//       handle: '@ineuron_cs',
//       price: '$129.99',
//       description: 'Deep dive into algorithm design and analysis',
//     },
//     {
//       src: '/c.mp4',
//       caption: 'Web Development with JavaScript',
//       handle: '@ineuron_cs',
//       price: '$89.99',
//       description: 'Build dynamic web apps with modern JS',
//     },
//     {
//       src: '/d.mp4',
//       caption: 'Machine Learning Basics',
//       handle: '@ineuron_cs',
//       price: '$149.99',
//       description: 'Learn ML fundamentals with practical projects',
//     },
//   ];

//   return (
//     <div className="bg-gray-900 text-white p-6">
//       <h2 className="text-2xl font-bold mb-4">Featured in videos</h2>
//       <p className="text-sm mb-4 text-gray-400">Explore computer science courses</p>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {videos.map((video, index) => (
//           <div
//             key={index}
//             className="bg-gray-800 rounded-lg overflow-hidden relative"
//             onMouseEnter={() => handleHover(index)}
//             onMouseLeave={() => handleLeave(index)}
//           >
//             <div className="w-full" style={{ paddingTop: '159.99%' }}>
//               <video
//                 ref={videoRefs[index]}
//                 className="absolute top-0 left-0 w-full h-full object-cover"
//                 muted
//                 loop
//               >
//                 <source src={video.src} type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//               <button
//                 onClick={() => togglePlayPause(index)}
//                 className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full"
//               >
//                 {isPlaying[index] ? 'Pause' : 'Play'}
//               </button>
//             </div>
//             <div className="p-2">
//               <p className="text-xs text-gray-400">{video.caption}</p>
//               <p className="text-sm font-semibold">{video.handle}</p>
//               <p className="text-green-400 text-sm">{video.price}</p>
//               <p className="text-xs text-gray-300">{video.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Video;

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
      description: 'Time and Tru Women’s Cotton Off the Shoulder Midi Dress Sizes XS-XXXXL',
    },
    {
      src: '/b.mp4',
      caption: '@walmartfinds',
      handle: '@walmartfinds',
      price: '$16.99',
      description: 'Madden NYC Women’s Raffia Flat Platform Sandals with Adjustable Straps',
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
      description: 'No Boundaries Seamless Tank Top, Women’s',
    },
  ];

  return (
    <div className="bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Featured in videos</h2>
      <p className="text-sm mb-4 text-gray-400">See what creators are sharing</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
    </div>
  );
};

export default Video;