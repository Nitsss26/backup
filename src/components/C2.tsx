// "use client";
// import React, { useEffect, useState, useRef } from 'react';
// import Image from 'next/image';

// export function C2() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const slidesPerView = 2; // Adjust based on screen size
//   const carouselRef = useRef(null);

//   // Slide navigation
//   const goToNextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % 5); // 5 banners
//   };

//   const goToPrevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + 5) % 5); // Loop back
//   };

//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//   };

//   // Swipe handling for mobile
//   useEffect(() => {
//     const carousel = carouselRef.current;
//     if (!carousel) return;

//     let touchStartX = 0;
//     let touchEndX = 0;

//     const handleTouchStart = (e) => {
//       touchStartX = e.touches[0].clientX;
//     };

//     const handleTouchMove = (e) => {
//       touchEndX = e.touches[0].clientX;
//     };

//     const handleTouchEnd = () => {
//       if (touchStartX - touchEndX > 50) goToNextSlide(); // Swipe left
//       if (touchEndX - touchStartX > 50) goToPrevSlide(); // Swipe right
//     };

//     carousel.addEventListener('touchstart', handleTouchStart);
//     carousel.addEventListener('touchmove', handleTouchMove);
//     carousel.addEventListener('touchend', handleTouchEnd);

//     return () => {
//       carousel.removeEventListener('touchstart', handleTouchStart);
//       carousel.removeEventListener('touchmove', handleTouchMove);
//       carousel.removeEventListener('touchend', handleTouchEnd);
//     };
//   }, []);

//   // Auto-slide (optional)
//   useEffect(() => {
//     const interval = setInterval(() => {
//       goToNextSlide();
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="relative w-full max-w-[1140px] mx-auto py-6 px-4 md:px-0">
//     <h2 className="text-2xl md:text-[28px] font-lato font-bold text-[#EEEEEE] mb-4 md:mb-6">Featured Deals</h2>
//     <div className="relative w-full overflow-hidden">
//       <div className="flex items-center justify-start transition-transform duration-300 ease-in-out touch-pan-y"
//            style={{ transform: `translateX(-${currentSlide * (100 / slidesPerView)}%)` }}>
//         {/* Banner 1 */}
//         <div className="min-w-[550px] h-[434.38px] bg-transparent mx-2 md:mx-3 shadow-[0_2px_8px_rgba(0,0,0,0.12)] rounded-[8px] overflow-hidden">
//           <div className="w-[550px] h-[309.38px] overflow-hidden rounded-t-[8px]">
//             <Image
//               src="https://placehold.co/550x309"
//               alt="Featured Deal 1"
//               width={550}
//               height={309.38}
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <div className="w-[550px] h-[125px] bg-[#2B2B2B] rounded-b-[8px] p-2 md:p-3">
//             <p className="text-[#EEEEEE] font-lato text-[18px] font-normal leading-[28.80px]">Clair Obscur: Expedition 33</p>
//             <div className="flex items-center justify-between mt-2">
//               <div className="flex space-x-1">
//                 <span className="text-[#EEEEEE] font-lato text-[14px] font-bold leading-[22.40px]">5/5</span>
//                 <div className="w-[20px] h-[20px] bg-[#FDD835]"></div>
//                 <div className="w-[26px] h-[26px] bg-[#00CE7A] rounded-[3px] flex items-center justify-center">
//                   <span className="text-[#262626] font-lato text-[14px] font-bold leading-[22.40px]">92</span>
//                 </div>
//                 <div className="w-[26px] h-[26px] bg-[#FFCE35] relative">
//                   <div className="w-[18.28px] h-[8px] bg-white absolute top-[15.79px] left-[3.65px] transform rotate-[-45deg] origin-top-left"></div>
//                 </div>
//               </div>
//               <div className="flex flex-col items-end">
//                 <span className="text-[#9E9E9E] font-lato text-[14px] font-normal leading-[14px] line-through">$49.99</span>
//                 <span className="text-[#FF9800] font-lato text-[14px] font-bold leading-[14px]">$39.49</span>
//               </div>
//             </div>
//             <div className="flex space-x-2 mt-2">
//               <div className="w-[65.89px] h-[19px] bg-[#424242] rounded-[4px] flex items-center">
//                 <span className="text-[#EEEEEE] font-lato text-[12px] font-normal leading-[19.20px] px-2">Story Rich</span>
//               </div>
//               <div className="w-[35.88px] h-[19px] bg-[#424242] rounded-[4px] flex items-center">
//                 <span className="text-[#EEEEEE] font-lato text-[12px] font-normal leading-[19.20px] px-2">RPG</span>
//               </div>
//               <div className="w-[41.20px] h-[19px] bg-[#424242] rounded-[4px] flex items-center">
//                 <span className="text-[#EEEEEE] font-lato text-[12px] font-normal leading-[19.20px] px-2">JRPG</span>
//               </div>
//               <div className="w-[72.98px] h-[19px] bg-[#424242] rounded-[4px] flex items-center">
//                 <span className="text-[#EEEEEE] font-lato text-[12px] font-normal leading-[19.20px] px-2">Exploration</span>
//               </div>
//             </div>
//             <div className="flex items-center mt-2">
//               <div className="w-[46px] h-[32px] bg-black rounded-[4px] flex items-center justify-center">
//                 <span className="text-[#EEEEEE] font-lato text-[14px] font-normal leading-[14px] uppercase">-21%</span>
//               </div>
//             </div>
//           </div>
//         </div>
  
//         {/* Banner 2 */}
//         <div className="min-w-[263px] h-[205.19px] bg-transparent mx-2 md:mx-3 shadow-[0_2px_8px_rgba(0,0,0,0.12)] rounded-[8px] overflow-hidden">
//           <div className="w-[263px] h-[147.94px] overflow-hidden rounded-t-[8px]">
//             <Image
//               src="https://placehold.co/263x148"
//               alt="Featured Deal 2"
//               width={263}
//               height={147.94}
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <div className="w-[263px] h-[57.25px] bg-[#2B2B2B] rounded-b-[8px] p-2 md:p-3 flex items-center">
//             <div className="w-[63px] h-[20px] bg-[#EEEEEE]"></div>
//             <div className="w-[46px] h-[32px] bg-black rounded-[4px] ml-2 flex items-center justify-center">
//               <span className="text-[#EEEEEE] font-lato text-[14px] font-normal leading-[14px] uppercase">-35%</span>
//             </div>
//             <div className="flex flex-col items-end ml-2">
//               <span className="text-[#9E9E9E] font-lato text-[14px] font-normal leading-[14px] line-through">$69.99</span>
//               <span className="text-[#FF9800] font-lato text-[14px] font-bold leading-[14px]">$45.49</span>
//             </div>
//           </div>
//           <div className="w-[63px] h-[23.59px] bg-[#26C6DA] absolute top-0 left-0 flex items-center">
//             <span className="text-black font-lato text-[11px] font-normal leading-[17.60px] uppercase px-2">Star Deal</span>
//           </div>
//         </div>
  
//         {/* Banner 3 */}
//         <div className="min-w-[263px] h-[205.19px] bg-transparent mx-2 md:mx-3 shadow-[0_2px_8px_rgba(0,0,0,0.12)] rounded-[8px] overflow-hidden">
//           <div className="w-[263px] h-[147.94px] overflow-hidden rounded-t-[8px]">
//             <Image
//               src="https://placehold.co/263x148"
//               alt="Featured Deal 3"
//               width={263}
//               height={147.94}
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <div className="w-[263px] h-[57.25px] bg-[#2B2B2B] rounded-b-[8px] p-2 md:p-3 flex items-center">
//             <div className="w-[85.98px] h-[24px] bg-[#3949AB] rounded-[4px] flex items-center">
//               <span className="text-white font-lato text-[12px] font-normal leading-[19.20px] px-2">Publisher Sale</span>
//             </div>
//           </div>
//         </div>
  
//         {/* Banner 4 */}
//         <div className="min-w-[263px] h-[205.19px] bg-transparent mx-2 md:mx-3 shadow-[0_2px_8px_rgba(0,0,0,0.12)] rounded-[8px] overflow-hidden">
//           <div className="w-[263px] h-[147.94px] overflow-hidden rounded-t-[8px]">
//             <Image
//               src="https://placehold.co/263x148"
//               alt="Featured Deal 4"
//               width={263}
//               height={147.94}
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <div className="w-[263px] h-[57.25px] bg-[#2B2B2B] rounded-b-[8px] p-2 md:p-3 flex items-center">
//             <div className="w-[93.72px] h-[32px] bg-black rounded-[4px] flex items-center justify-center">
//               <span className="text-[#EEEEEE] font-lato text-[13px] font-normal leading-[20.80px] uppercase">30 Days Left</span>
//             </div>
//           </div>
//         </div>
  
//         {/* Banner 5 */}
//         <div className="min-w-[263px] h-[205.19px] bg-transparent mx-2 md:mx-3 shadow-[0_2px_8px_rgba(0,0,0,0.12)] rounded-[8px] overflow-hidden">
//           <div className="w-[263px] h-[147.94px] overflow-hidden rounded-t-[8px]">
//             <Image
//               src="https://placehold.co/263x148"
//               alt="Featured Deal 5"
//               width={263}
//               height={147.94}
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <div className="w-[263px] h-[57.25px] bg-[#2B2B2B] rounded-b-[8px] p-2 md:p-3 flex items-center">
//             <div className="w-[46px] h-[32px] bg-black rounded-[4px] ml-2 flex items-center justify-center">
//               <span className="text-[#EEEEEE] font-lato text-[14px] font-normal leading-[14px] uppercase">-33%</span>
//             </div>
//             <div className="flex flex-col items-end ml-2">
//               <span className="text-[#9E9E9E] font-lato text-[14px] font-normal leading-[14px] line-through">$49.99</span>
//               <span className="text-[#FF9800] font-lato text-[14px] font-bold leading-[14px]">$33.74</span>
//             </div>
//           </div>
//         </div>
//       </div>
  
//       {/* Navigation Arrows (Desktop) */}
//       <button
//         className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-[30px] h-[30px] flex items-center justify-center shadow-md hidden md:flex"
//         onClick={() => goToPrevSlide()}
//       >
//         <span className="w-[8px] h-[14px] bg-white ml-1"></span>
//       </button>
//       <button
//         className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-[30px] h-[30px] flex items-center justify-center shadow-md hidden md:flex"
//         onClick={() => goToNextSlide()}
//       >
//         <span className="w-[8px] h-[14px] bg-white mr-1 rotate-180"></span>
//       </button>
  
//       {/* Pagination Dots */}
//       <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         {Array.from({ length: 5 }).map((_, index) => (
//           <span
//             key={index}
//             className={`w-[10px] h-[10px] rounded-full cursor-pointer ${index === currentSlide ? 'bg-[#757575]' : 'bg-[#F5F5F5]'}`}
//             onClick={() => goToSlide(index)}
//           />
//         ))}
//       </div>
//     </div>
//   </section>
//   );
// }

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from 'lucide-react';

interface GameDeal {
  id: number;
  title: string;
  image: string;
  rating?: string;
  tags: string[];
  originalPrice: string;
  discountPrice: string;
  discount: string;
  badge?: {
    text: string;
    color: string;
  };
  size: 'large' | 'medium';
}

const C2: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sample data - 15 games across 3 slides (5 games per slide)
  const gameDeals: GameDeal[][] = [
    [
      {
        id: 1,
        title: "Clair Obscur: Expedition 33",
        image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=550&h=309&fit=crop",
        rating: "5/5",
        tags: ["Story Rich", "RPG", "JRPG", "Exploration"],
        originalPrice: "$49.99",
        discountPrice: "$39.49",
        discount: "-21%",
        size: "large"
      },
      {
        id: 2,
        title: "Monster Hunter World",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=263&h=148&fit=crop",
        originalPrice: "$69.99",
        discountPrice: "$45.49",
        discount: "-35%",
        badge: { text: "Star Deal", color: "bg-cyan-400" },
        tags: [],
        size: "medium"
      },
      {
        id: 3,
        title: "Cyberpunk 2077",
        image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=263&h=148&fit=crop",
        badge: { text: "Publisher Sale", color: "bg-indigo-600" },
        originalPrice: "$59.99",
        discountPrice: "$29.99",
        discount: "-50%",
        tags: [],
        size: "medium"
      },
      {
        id: 4,
        title: "Elden Ring",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=263&h=148&fit=crop",
        originalPrice: "$59.99",
        discountPrice: "$41.99",
        discount: "-30%",
        badge: { text: "30 Days Left", color: "bg-black" },
        tags: [],
        size: "medium"
      },
      {
        id: 5,
        title: "The Witcher 3",
        image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=263&h=148&fit=crop",
        originalPrice: "$49.99",
        discountPrice: "$33.74",
        discount: "-33%",
        tags: [],
        size: "medium"
      }
    ],
    [
      {
        id: 6,
        title: "God of War Ragnarök",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=550&h=309&fit=crop",
        rating: "4.8/5",
        tags: ["Action", "Adventure", "Norse", "Story Rich"],
        originalPrice: "$69.99",
        discountPrice: "$48.99",
        discount: "-30%",
        size: "large"
      },
      {
        id: 7,
        title: "Horizon Zero Dawn",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=263&h=148&fit=crop",
        originalPrice: "$39.99",
        discountPrice: "$19.99",
        discount: "-50%",
        badge: { text: "Best Deal", color: "bg-red-500" },
        tags: [],
        size: "medium"
      },
      {
        id: 8,
        title: "Spider-Man Remastered",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=263&h=148&fit=crop",
        badge: { text: "Weekly Deal", color: "bg-purple-600" },
        originalPrice: "$59.99",
        discountPrice: "$35.99",
        discount: "-40%",
        tags: [],
        size: "medium"
      },
      {
        id: 9,
        title: "Red Dead Redemption 2",
        image: "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?w=263&h=148&fit=crop",
        originalPrice: "$59.99",
        discountPrice: "$23.99",
        discount: "-60%",
        badge: { text: "Flash Sale", color: "bg-orange-500" },
        tags: [],
        size: "medium"
      },
      {
        id: 10,
        title: "Assassin's Creed Valhalla",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=263&h=148&fit=crop",
        originalPrice: "$59.99",
        discountPrice: "$17.99",
        discount: "-70%",
        tags: [],
        size: "medium"
      }
    ],
    [
      {
        id: 11,
        title: "Baldur's Gate 3",
        image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=550&h=309&fit=crop",
        rating: "4.9/5",
        tags: ["RPG", "Turn-Based", "D&D", "Story Rich"],
        originalPrice: "$59.99",
        discountPrice: "$53.99",
        discount: "-10%",
        size: "large"
      },
      {
        id: 12,
        title: "Starfield",
        image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=263&h=148&fit=crop",
        originalPrice: "$69.99",
        discountPrice: "$34.99",
        discount: "-50%",
        badge: { text: "New Release", color: "bg-blue-500" },
        tags: [],
        size: "medium"
      },
      {
        id: 13,
        title: "Forza Horizon 5",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=263&h=148&fit=crop",
        badge: { text: "Racing Sale", color: "bg-green-600" },
        originalPrice: "$59.99",
        discountPrice: "$29.99",
        discount: "-50%",
        tags: [],
        size: "medium"
      },
      {
        id: 14,
        title: "Call of Duty: Modern Warfare II",
        image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=263&h=148&fit=crop",
        originalPrice: "$69.99",
        discountPrice: "$41.99",
        discount: "-40%",
        badge: { text: "Limited Time", color: "bg-black" },
        tags: [],
        size: "medium"
      },
      {
        id: 15,
        title: "FIFA 24",
        image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=263&h=148&fit=crop",
        originalPrice: "$69.99",
        discountPrice: "$34.99",
        discount: "-50%",
        tags: [],
        size: "medium"
      }
    ]
  ];

  const totalSlides = gameDeals.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const GameCard: React.FC<{ game: GameDeal }> = ({ game }) => (
    <div className={`
      relative bg-transparent rounded-lg shadow-lg overflow-hidden
      ${game.size === 'large' 
        ? 'w-[550px] h-[434px] md:w-[550px] md:h-[434px]' 
        : 'w-[263px] h-[205px] md:w-[263px] md:h-[205px]'
      }
      flex-shrink-0
    `}>
      {/* Badge */}
      {game.badge && (
        <div className="absolute top-0 left-0 z-20">
          <div className={`${game.badge.color} px-2 py-1 text-xs font-medium text-white uppercase tracking-wide`}>
            {game.badge.text}
          </div>
          <div className="w-5 h-6 bg-gradient-to-br from-transparent via-transparent to-current opacity-50"></div>
        </div>
      )}

      {/* Image */}
      <div className={`
        relative overflow-hidden rounded-t-lg
        ${game.size === 'large' ? 'h-[309px]' : 'h-[148px]'}
      `}>
        <img 
          src={game.image} 
          alt={game.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="bg-[#2B2B2B] p-3 rounded-b-lg flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-white font-medium text-sm md:text-base mb-2 line-clamp-1">
            {game.title}
          </h3>
          
          {/* Rating (for large cards) */}
          {game.rating && game.size === 'large' && (
            <div className="flex items-center gap-2 mb-2">
              <span className="text-white text-sm">{game.rating}</span>
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <div className="bg-green-500 text-black text-xs font-bold px-2 py-1 rounded">92</div>
            </div>
          )}

          {/* Tags (for large cards) */}
          {game.tags.length > 0 && game.size === 'large' && (
            <div className="flex flex-wrap gap-2 mb-3">
              {game.tags.map((tag, index) => (
                <span key={index} className="bg-[#424242] text-white text-xs px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Steam Logo Placeholder */}
            <div className="w-16 h-5 bg-white rounded opacity-90"></div>
          </div>
          
          <div className="flex items-center gap-2">
            {game.badge && game.size === 'medium' && (
              <div className={`${game.badge.color} text-white text-xs px-2 py-1 rounded font-medium`}>
                {game.badge.text}
              </div>
            )}
            
            {game.discount && (
              <div className="bg-black text-white text-sm px-2 py-1 rounded font-medium">
                {game.discount}
              </div>
            )}
            
            <div className="text-right">
              <div className="text-gray-400 text-sm line-through">{game.originalPrice}</div>
              <div className="text-orange-500 font-bold text-sm">{game.discountPrice}</div>
            </div>
            
            <button className="bg-orange-500 hover:bg-orange-600 p-2 rounded transition-colors">
              <ShoppingCart className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="w-full py-8 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">Featured Deals</h2>
          
          {/* Desktop Navigation Arrows */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              disabled={currentSlide === totalSlides - 1}
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Slider Container */}
        <div 
          ref={containerRef}
          className="relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="flex transition-transform duration-300 ease-in-out gap-4"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {gameDeals.map((slideGames, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-full">
                  {/* Large Featured Game */}
                  <div className="md:col-span-5">
                    <GameCard game={slideGames[0]} />
                  </div>
                  
                  {/* Grid of smaller games */}
                  <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {slideGames.slice(1).map((game) => (
                      <GameCard key={game.id} game={game} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default C2;