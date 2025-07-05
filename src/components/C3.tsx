// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import Image from "next/image";

// const C3: React.FC = () => {
//   const [activeCategory, setActiveCategory] = useState("Games");
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const carouselRef = useRef<HTMLDivElement>(null);
//   const slidesPerView = window.innerWidth >= 768 ? 3 : 1; // 3 on desktop, 1 on mobile

//   // Free image sources from Unsplash (via placeholders with unique queries)
//   const images = {
//     "All Products": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=358&h=202&q=80",
//     Games: "https://images.unsplash.com/photo-1593368617947-6bebf142f70e?auto=format&fit=crop&w=358&h=202&q=80",
//     "Game Bundles": "https://images.unsplash.com/photo-1600585154526-990d71b9567e?auto=format&fit=crop&w=358&h=202&q=80",
//     "Books & Comics": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=358&h=202&q=80",
//     Other: "https://images.unsplash.com/photo-1455849315248-8d7d5e2a7e6c?auto=format&fit=crop&w=358&h=202&q=80",
//   };

//   const categories = ["All Products", "Games", "Game Bundles", "Books & Comics", "Other"];
//   const items = [
//     { id: 1, category: "Games", discount: "-21%", price: "$39.49", origPrice: "$49.99", image: images["Games"] },
//     { id: 2, category: "Game Bundles", discount: "-10%", price: "$71.99", origPrice: "$79.99", image: images["Game Bundles"] },
//     { id: 3, category: "Books & Comics", discount: "-40%", price: "$35.99", origPrice: "$59.99", image: images["Books & Comics"] },
//     { id: 4, category: "Other", discount: "-35%", price: "$45.49", origPrice: "$69.99", image: images["Other"], tag: "Star Deal" },
//     { id: 5, category: "Games", discount: "-16%", price: "$83.99", origPrice: "$99.99", image: images["Games"], tag: "Releases Oct 02" },
//     { id: 6, category: "Game Bundles", discount: "-56%", price: "$30.79", origPrice: "$69.99", image: images["Game Bundles"] },
//     { id: 7, category: "Books & Comics", discount: "-60%", price: "$28.34", origPrice: "$69.99", image: images["Books & Comics"] },
//     { id: 8, category: "Other", price: "$69.99", image: images["Other"], tag: "Releases Sep 11" },
//     { id: 9, category: "Games", discount: "-32%", price: "$47.59", origPrice: "$69.99", image: images["Games"] },
//     { id: 10, category: "Game Bundles", discount: "-93%", price: "$4.49", origPrice: "$59.99", image: images["Game Bundles"] },
//     { id: 11, category: "Books & Comics", tag: "30 Days Left", image: images["Books & Comics"] },
//   ].filter((item) => activeCategory === "All Products" || item.category === activeCategory);

//   // Navigation functions
//   const goToNextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % Math.ceil(items.length / slidesPerView));
//   };

//   const goToPrevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + Math.ceil(items.length / slidesPerView)) % Math.ceil(items.length / slidesPerView));
//   };

//   const goToSlide = (index: number) => {
//     setCurrentSlide(index);
//   };

//   // Swipe handling for mobile
//   useEffect(() => {
//     const carousel = carouselRef.current;
//     if (!carousel) return;

//     let touchStartX = 0;
//     let touchEndX = 0;

//     const handleTouchStart = (e: TouchEvent) => {
//       touchStartX = e.touches[0].clientX;
//     };

//     const handleTouchMove = (e: TouchEvent) => {
//       touchEndX = e.touches[0].clientX;
//     };

//     const handleTouchEnd = () => {
//       if (touchStartX - touchEndX > 50) goToNextSlide(); // Swipe left
//       if (touchEndX - touchStartX > 50) goToPrevSlide(); // Swipe right
//     };

//     carousel.addEventListener("touchstart", handleTouchStart);
//     carousel.addEventListener("touchmove", handleTouchMove);
//     carousel.addEventListener("touchend", handleTouchEnd);

//     return () => {
//       carousel.removeEventListener("touchstart", handleTouchStart);
//       carousel.removeEventListener("touchmove", handleTouchMove);
//       carousel.removeEventListener("touchend", handleTouchEnd);
//     };
//   }, [items.length]);

//   // Auto-slide (optional)
//   useEffect(() => {
//     const interval = setInterval(() => {
//       goToNextSlide();
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [items.length]);

//   return (
//     <section className="relative w-full max-w-[1140px] mx-auto py-6 px-4 md:px-0 h-[782.11px]">
//       <h2 className="text-2xl md:text-[28px] font-lato font-bold text-[#EEEEEE] mb-4 md:mb-6">Top Sellers</h2>
//       <div className="flex flex-col md:flex-row justify-between items-start mb-4 md:mb-6">
//         <div className="flex space-x-2 md:space-x-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
//           {categories.map((category) => (
//             <button
//               key={category}
//               className={`px-4 py-2 rounded-[15px] text-[14px] font-lato font-normal leading-[22.40px] ${
//                 activeCategory === category
//                   ? "bg-[#2B2B2B] text-[#EEEEEE]"
//                   : "bg-white text-[#212121]"
//               }`}
//               onClick={() => setActiveCategory(category)}
//             >
//               {category}
//             </button>
//           ))}
//         </div>
//         <button className="hidden md:flex items-center justify-center px-4 py-2 bg-transparent border border-[#FF9800] rounded-[4px] text-[#FF9800] font-lato text-[14px] font-normal uppercase leading-[24.50px]">
//           View all
//         </button>
//       </div>
//       <div className="relative w-full h-[713.61px] overflow-hidden">
//         <div
//           ref={carouselRef}
//           className="flex items-start transition-transform duration-300 ease-in-out touch-pan-y"
//           style={{
//             transform: `translateX(-${currentSlide * (100 / slidesPerView)}%)`,
//             gap: "12px",
//           }}
//         >
//           {items.map((item) => (
//             <div
//               key={item.id}
//               className={`min-w-[358.66px] h-[249.73px] bg-[#2B2B2B] rounded-[8px] overflow-hidden ${
//                 window.innerWidth >= 768 ? "flex-shrink-0" : "w-full"
//               }`}
//             >
//               <div className="w-full h-[201.73px] overflow-hidden rounded-t-[8px]">
//                 <Image
//                   src={item.image}
//                   alt={`Top Seller ${item.id}`}
//                   width={358.66}
//                   height={201.73}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="w-full h-[48px] bg-[#2B2B2B] rounded-b-[8px] p-2 flex items-center justify-between">
//                 <div className="w-[63px] h-[20px] bg-[#EEEEEE]"></div>
//                 <div className="flex items-center space-x-2">
//                   {item.discount && (
//                     <div className="w-[46px] h-[32px] bg-black rounded-[4px] flex items-center justify-center">
//                       <span className="text-[#EEEEEE] font-lato text-[14px] font-normal leading-[14px] uppercase">
//                         {item.discount}
//                       </span>
//                     </div>
//                   )}
//                   <div className="flex flex-col items-end">
//                     {item.origPrice && (
//                       <span className="text-[#9E9E9E] font-lato text-[14px] font-normal leading-[14px] line-through">
//                         {item.origPrice}
//                       </span>
//                     )}
//                     <span className="text-[#FF9800] font-lato text-[14px] font-bold leading-[14px]">
//                       {item.price}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               {item.tag && (
//                 <div className="absolute top-0 left-0 w-[68.09px] h-[25.19px] bg-[#26C6DA] flex items-center">
//                   <span className="text-black font-lato text-[12px] font-normal leading-[19.20px] uppercase px-2">
//                     {item.tag}
//                   </span>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Navigation Arrows (Desktop) */}
//         <button
//           className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-[30px] h-[30px] flex items-center justify-center shadow-md hidden md:flex"
//           onClick={goToPrevSlide}
//         >
//           <span className="w-[8px] h-[14px] bg-white ml-1"></span>
//         </button>
//         <button
//           className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-[30px] h-[30px] flex items-center justify-center shadow-md hidden md:flex"
//           onClick={goToNextSlide}
//         >
//           <span className="w-[8px] h-[14px] bg-white mr-1 rotate-180"></span>
//         </button>

//         {/* Pagination Dots */}
//         <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
//           {Array.from({ length: Math.ceil(items.length / slidesPerView) }).map((_, index) => (
//             <span
//               key={index}
//               className={`w-[10px] h-[10px] rounded-full cursor-pointer ${
//                 index === currentSlide ? "bg-[#757575]" : "bg-[#F5F5F5]"
//               }`}
//               onClick={() => goToSlide(index)}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default C3;

import React from 'react';

const C3: React.FC = () => {
  const isMobile = window.innerWidth <= 768;

  const products = [
    { id: 1, name: 'EXPEDITION 33', price: 39.49, originalPrice: 49.99, discount: -21, image: 'https://placehold.co/359x202?text=Expedition+33' },
    { id: 2, name: 'CLAIR OBSCUR', price: 71.99, originalPrice: 79.99, discount: -10, image: 'https://placehold.co/359x202?text=Clair+Obscur' },
    { id: 3, name: 'GHOST BLADE', price: 35.99, originalPrice: 59.99, discount: -40, image: 'https://placehold.co/359x202?text=Ghost+Blade' },
    { id: 4, name: 'MONSTER HUNTER', price: 45.49, originalPrice: 69.99, discount: -35, tag: 'Star Deal', image: 'https://placehold.co/263x148?text=Monster+Hunter' },
    { id: 5, name: 'EMILIE SHIMMER', price: 83.99, originalPrice: 99.99, discount: -16, tag: 'Releases Oct 02', image: 'https://placehold.co/263x148?text=Emilie+Shimmer' },
    { id: 6, name: 'SILENT HILL 2', price: 30.79, originalPrice: 69.99, discount: -56, image: 'https://placehold.co/263x148?text=Silent+Hill+2' },
    { id: 7, name: 'P3 RELOAD', price: 28.34, originalPrice: 69.99, discount: -60, image: 'https://placehold.co/263x148?text=P3+Reload' },
    { id: 8, name: 'BORDERLANDS 4', price: 69.99, tag: 'Releases Sep 11', image: 'https://placehold.co/263x148?text=Borderlands+4' },
    { id: 9, name: 'PRESTIGE COLLECTION', price: 69.99, tag: '30 Days Left', image: 'https://placehold.co/263x148?text=Prestige+Collection' },
    { id: 10, name: 'DYNASTY WARRIORS', price: 47.59, originalPrice: 69.99, discount: -32, image: 'https://placehold.co/263x148?text=Dynasty+Warriors' },
    { id: 11, name: 'ROBOCOP', price: 4.49, originalPrice: 59.99, discount: -93, image: 'https://placehold.co/263x148?text=Robocop' },
  ];

  const bundles = [
    { id: 12, name: 'TABLETOP & DECKBUILDER', price: 69.99, tag: '13 Days Left', image: 'https://placehold.co/263x148?text=Tabletop+Deckbuilder' },
    { id: 13, name: 'SPRING SUPERSTARS', price: 69.99, tag: '1h 23m 55s', image: 'https://placehold.co/263x148?text=Spring+Superstars' },
    { id: 14, name: 'POINT CLICK COLLECTION', price: 69.99, tag: '29 Days Left', image: 'https://placehold.co/263x148?text=Point+Click+Collection' },
  ];

  const bannerImage = isMobile
    ? 'https://placehold.co/360x200?text=Mobile+Banner'
    : 'https://placehold.co/1140x300?text=Desktop+Banner';

  return (
    <div className="relative w-full max-w-[1140px] mx-auto mt-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-200">Top Sellers</h2>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button className="px-4 py-2 bg-white text-black rounded-lg">All Products</button>
          <button className="px-4 py-2 bg-gray-800 text-gray-200 rounded-lg">Games</button>
          <button className="px-4 py-2 bg-gray-800 text-gray-200 rounded-lg">Game Bundles</button>
          <button className="px-4 py-2 bg-gray-800 text-gray-200 rounded-lg">Books & Comics</button>
          <button className="px-4 py-2 bg-gray-800 text-gray-200 rounded-lg">Other</button>
        </div>
        <button className="px-4 py-2 border-2 border-orange-500 text-orange-500 rounded uppercase text-sm mt-4 md:mt-0">
          View all
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.slice(0, 3).map((product) => (
          <div key={product.id} className="bg-gray-800 rounded-lg overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-52 object-cover rounded-t-lg" />
            <div className="p-4 flex justify-between items-center">
              <div className="w-16 h-5 bg-gray-200"></div>
              <div>
                {product.discount && (
                  <div className="bg-black text-white px-2 py-1 rounded text-sm mb-1">
                    {product.discount}%
                  </div>
                )}
                <div className="text-orange-500 font-bold">${product.price}</div>
                {product.discount && (
                  <div className="text-gray-400 text-sm line-through">${product.originalPrice}</div>
                )}
              </div>
            </div>
            {product.tag && (
              <div className="absolute top-0 left-0 bg-cyan-400 text-black px-2 py-1 text-xs uppercase">
                {product.tag}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        {products.slice(3, 11).map((product) => (
          <div key={product.id} className="bg-gray-800 rounded-lg overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-36 object-cover rounded-t-lg" />
            <div className="p-4 flex justify-between items-center">
              <div className="w-16 h-5 bg-gray-200"></div>
              <div>
                {product.discount && (
                  <div className="bg-black text-white px-2 py-1 rounded text-sm mb-1">
                    {product.discount}%
                  </div>
                )}
                <div className="text-orange-500 font-bold">${product.price}</div>
                {product.discount && (
                  <div className="text-gray-400 text-sm line-through">${product.originalPrice}</div>
                )}
              </div>
            </div>
            {product.tag && (
              <div className="absolute top-0 left-0 bg-green-500 text-black px-2 py-1 text-xs uppercase">
                {product.tag}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-bold text-gray-200 mb-4">More Game Bundles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bundles.map((bundle) => (
            <div key={bundle.id} className="bg-gray-800 rounded-lg overflow-hidden">
              <img src={bundle.image} alt={bundle.name} className="w-full h-36 object-cover rounded-t-lg" />
              <div className="p-4 flex justify-between items-center">
                <div className="w-16 h-5 bg-gray-200"></div>
                <div>
                  <div className="text-orange-500 font-bold">${bundle.price}</div>
                </div>
              </div>
              {bundle.tag && (
                <div className="absolute top-0 left-0 bg-gray-500 text-white px-2 py-1 text-xs uppercase">
                  {bundle.tag}
                </div>
              )}
            </div>
          ))}
        </div>
        <button className="px-4 py-2 border-2 border-orange-500 text-orange-500 rounded uppercase text-sm mt-4">
          View all
        </button>
      </div>

      {isMobile ? (
        <img src={bannerImage} alt="Mobile Banner" className="w-full h-50 object-cover mt-6 rounded-lg" />
      ) : (
        <img src={bannerImage} alt="Desktop Banner" className="w-full h-72 object-cover mt-6 rounded-lg" />
      )}
    </div>
  );
};

export default C3;