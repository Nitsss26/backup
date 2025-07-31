"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star, Heart, ShoppingCart,Eye } from "lucide-react"

const Caro = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const slides = [
    // Slide 1 - Featured Layout (Exactly matching the image)
    {
      id: 1,
      type: "featured",
      content: {
        mainGame: {
          title: "Dune: Awakening",
          subtitle: "Open World Survival Craft",
          tags: ["Open World", "Survival Craft", "Adventure", "Base Building"],
          rating: "4/5",
          score: "80",
          // originalPrice: "₹1,999",
          currentPrice: "",
          discount: "-15%",
          platforms: ["steam", "windows"],
          image: "https://store.pw.live/_next/image?url=https%3A%2F%2Fd2bps9p1kiy4ka.cloudfront.net%2F5eb393ee95fab7468a79d189%2F5dcf0d9f-034c-42f1-bd1d-2040e6acdf96.jpg&w=1920&q=75",
        },
        // sideDeals: [  {
        //     title: "",
        //     badge: "",
        //     image: "/1.jpg",
        //     hasCart: false,
        //   },
        //     {
        //         title: "",
        //         badge: "",
        //         price: "",
        //         originalPrice: "",
        //         discount: "",
        //         platforms: ["", "", ""],
        //         image: "https://image.api.playstation.com/vulcan/ap/rnd/202506/2702/4ec432409752e54f55ddff2be99285ab0b55f720aa7dc6b1.png?w=440&thumb=false",
        //         hasCart: false,
        //       },
        
         
         
        //   {
        //     title: "",
        //     badge: "",
        //     image: "/pkk.jpg",
        //     hasCart: false,
        //   },
        //   {
        //     title: "",
        //     subtitle: "",
        //     badge: "",
        //     image: "https://assets.nintendo.com/image/fetch/q_auto/f_auto/https://atum-img-lp1.cdn.nintendo.net/i/c/07751f86ef4b4b8ebbac1fd74a274153_1024",
        //     hasCart: false,
        //   },
        // ],
        sideDeals: [
            {
              title: "",
              badge: "",
              image:"https://store.pw.live/_next/image?url=https%3A%2F%2Fd2bps9p1kiy4ka.cloudfront.net%2F5eb393ee95fab7468a79d189%2F84acc100-c930-4aff-8cba-16f58acbc87a.png&w=1920&q=75",
             // image: "/1.jpg",
              hasCart: false,
              url:"https://www.edtechcart.com/add-ons/addon-010"
           //   url: "https://games.capcomusa.com/#118170", // optional, empty means no redirect
            },
            {
              title: "",
              badge: "",
              price: "",
              originalPrice: "",
              discount: "",
              platforms: ["", "", ""],
              image:"https://static.pw.live/0b27cf2d-9c2d-4e8c-aad5-c51e5fc23a74.png",
             
             // image: "https://image.api.playstation.com/vulcan/ap/rnd/202506/2702/4ec432409752e54f55ddff2be99285ab0b55f720aa7dc6b1.png?w=440&thumb=false",
              hasCart: false,
           //   url: "https://store.playstation.com/en-in/concept/10013248", // example link
         
             url:"https://www.edtechcart.com/add-ons/addon-011"
          },
            {
              title: "",
              badge: "",
              //image: "/pkk.jpg",
              image:"https://d2bps9p1kiy4ka.cloudfront.net/5eb393ee95fab7468a79d189/65673665-4fa6-4187-aafd-d7e69573b299.png",
              hasCart: false,
              //url: "https://www.nintendo.com/us/store/products/pokemon-brilliant-diamond-switch/",
            url:"https://www.edtechcart.com/add-ons/addon-012"
            },
            {
              title: "",
              subtitle: "",
              badge: "",
              image:"https://d2bps9p1kiy4ka.cloudfront.net/5eb393ee95fab7468a79d189/5284f34e-5c86-4228-9ccd-7fbcef378ad8.png",
              //image: "https://assets.nintendo.com/image/fetch/q_auto/f_auto/https://atum-img-lp1.cdn.nintendo.net/i/c/07751f86ef4b4b8ebbac1fd74a274153_1024",
              hasCart: false,
              url:"https://www.edtechcart.com/add-ons/addon-013"
             // url: "https://www.nintendo.com/us/store/products/marvel-ultimate-alliance-3-the-black-order-switch/", // example link
            },
          ],
          
      },
    },
   
  ]

  // useEffect(() => {
  //   if (isAutoPlaying) {
  //     const interval = setInterval(() => {
  //       setCurrentSlide((prev) => (prev + 1) % slides.length)
  //     }, 8000)
  //     return () => clearInterval(interval)
  //   }
  // }, [isAutoPlaying, slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  // Desktop Featured Layout - CORRECTED 2x2 Grid
  const renderFeaturedSlideDesktop = (slide) => (
    <div className="bg-[--bg-dark] text-white p-8 min-h-[500px]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-white">Featured Deals</h1>

        <div className="flex gap-8 h-[400px]">
          {/* Main Game - Left Side (60% width) */}
          <div className="flex-[3] relative">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-800">
              <img
                src="https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/d9bd4982-b58d-41cd-b026-dd59bf7ffb6e.png"
                alt={slide.content.mainGame.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 " />

              {/* Game Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                {/* <h2 className="text-5xl font-bold mb-4 text-white tracking-wide">{slide.content.mainGame.title}</h2> */}

                {/* Tags */}
                {/* <div className="flex flex-wrap gap-3 mb-6">
                  {slide.content.mainGame.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gray-700/80 text-white text-sm rounded-md backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div> */}

                {/* Rating, Platforms and Price */}
                <div className="flex items-center justify-between">
                  {/* <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-white">{slide.content.mainGame.rating}</span>
                      <Star className="w-6 h-6 text-yellow-400 fill-current" />
                    </div>
                    <div className="bg-green-600 text-white px-3 py-1 rounded-md text-lg font-bold">
                      {slide.content.mainGame.score}
                    </div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>

                
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                        <span className="text-sm font-bold text-black">S</span>
                      </div>
                      <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                        <span className="text-sm font-bold text-black">⊞</span>
                      </div>
                    </div>
                  </div> */}

                  <div className="flex justify gap-4">
                    {/* <span className="bg-black text-white px-4 py-2 rounded text-xl font-bold">
                      {slide.content.mainGame.discount}
                    </span> */}
                    <div className="text-right">
                      <div className="text-lg text-whiteline-through">{slide.content.mainGame.originalPrice}</div>
                      <div className="text-3xl font-bold text-white">{slide.content.mainGame.currentPrice}</div>
                    </div>
                    {/* <button
  className="bg-[#5593f7] hover:bg-blue-600 p-3 rounded-lg transition-colors"
  onClick={() => window.location.href = 'https://www.pw.live/defence/cds-afcat/batches/airforce-vayu-xy-3-0-2026-185524'}
>
  <Eye className="w-6 h-6 text-white" />
</button> */}

                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Deals - Right Side (40% width) - CORRECTED 2x2 GRID */}
          <div className="flex-[2] grid grid-cols-2 grid-rows-2 gap-4">
  {slide.content.sideDeals.map((deal, index) => (
    <div
      key={index}
      className="relative rounded-xl overflow-hidden bg-gray-800 group hover:scale-105 transition-transform cursor-pointer"
      onClick={() => {
        if (deal.url) {
          window.open(deal.url, "_blank"); // opens in new tab
        }
      }}
    >
      <img
        src={deal.image || "/placeholder.svg"}
        alt={deal.title}
        className="w-full h-full object-cover pointer-events-none"
      />

      <div className="absolute inset-0 pointer-events-none" />

      {/* Deal Info */}
      <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-start">
          {/* <span className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold">{deal.badge}</span> */}
          {/* {deal.hasCart && (
            <button className="bg-[#5593f7] hover:bg-blue-600 p-2 rounded transition-colors pointer-events-auto">
              <Eye className="w-4 h-4 text-white" />
            </button>
          )} */}
        </div>

        <div>
          <h3 className="text-white font-bold text-lg mb-1">{deal.title}</h3>
          {deal.subtitle && <p className="text-gray-300 text-sm mb-2">{deal.subtitle}</p>}
          {deal.price && (
            <div className="flex items-center gap-2 mb-2">
              {deal.originalPrice && (
                <span className="text-sm text-gray-400 line-through">{deal.originalPrice}</span>
              )}
              <span className="text-orange-400 font-bold text-lg">{deal.price}</span>
              {deal.discount && (
                <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
                  {deal.discount}
                </span>
              )}
            </div>
          )}
          {/* {deal.platforms && (
            <div className="flex items-center gap-2">
              {deal.platforms.map((platform, idx) => (
                <div key={idx} className="w-5 h-5 bg-white rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-black">
                    {platform === "steam"
                      ? "S"
                      : platform === "windows"
                      ? "⊞"
                      : platform === "apple"
                      ? "🍎"
                      : "N"}
                  </span>
                </div>
              ))}
            </div>
          )} */}
        </div>
      </div>
    </div>
  ))}
</div>



        </div>

        {/* Dots Navigation */}
        {/* <div className="flex justify-center mt-12 space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-gray-600"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div> */}
      </div>
    </div>
  )

  // Mobile Featured Layout - Completely Different, Spacious Layout
  const renderFeaturedSlideMobile = (slide) => (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-xl md:text-3xl font-bold mb-4 md:mb-8 mt-0 md:mt-0 text-center">Featured Deals</h1>

        {/* Main Game - Full Width */}
        <div className="mb-8">
          <div className="relative w-full h-64 rounded-xl overflow-hidden bg-gray-800">
            <img
              src={slide.content.mainGame.image || "/placeholder.svg"}
              alt={slide.content.mainGame.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" />

            <div className="absolute bottom-0 left-0 right-0 p-4">
              {/* <h2 className="text-2xl font-bold mb-2 text-white">{slide.content.mainGame.title}</h2> */}
              <div className="flex items-center justify-between">
                {/* <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">{slide.content.mainGame.rating}</span>
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                </div> */}
                <div className="flex items-center gap-2">
                  {/* <span className="bg-black text-white px-2 py-1 rounded text-sm">
                    {slide.content.mainGame.discount}
                  </span> */}
                  <div className="text-lg text-white line-through">{slide.content.mainGame.originalPrice}</div>
                  <span className="text-white font-bold">{slide.content.mainGame.currentPrice}</span>
                  {/* <button
  className="bg-[#5593f7] hover:bg-blue-600 p-3 rounded-lg transition-colors"
  onClick={() => window.location.href = 'https://www.pw.live/defence/cds-afcat/batches/airforce-vayu-xy-3-0-2026-185524'}
>
  <Eye className="w-4 h-4 text-white" />
</button> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side Deals - Stacked Vertically with Spacing */}
        <div className="space-y-4 p-2 gradient-background">
  {slide.content.sideDeals.map((deal, index) => (
    <div key={index} className="w-[260px] mx-auto relative items-center">
      <img
        src={deal.image || "/placeholder.svg"}
        alt={deal.title || `Deal ${index + 1}`}
        className="w-full h-[200px] object-cover rounded-lg"
        onError={(e) => { e.target.src = "/placeholder.svg"; }}
      />
      <div className="absolute bottom-2 right-2">
        <button
          className="bg-[#5593f7] hover:bg-blue-600 text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors"
          onClick={() => window.location.href = deal.url || '#'}
        >
          Buy
        </button>
      </div>
    </div>
  ))}
</div>
      </div>
    </div>
  )

  // Categories Layout - Desktop
  // const renderCategoriesSlideDesktop = (slide) => (
  //   <div className="bg-gray-900 text-white p-8 min-h-[500px]">
  //     <div className="max-w-7xl mx-auto">
  //       <div className="grid grid-cols-4 gap-6 h-[400px] mt-10">
  //         {slide.content.map((category, index) => (
  //           <div
  //             key={index}
  //             className="relative rounded-xl overflow-hidden group cursor-pointer"
  //             onClick={() => {
  //               if (category.url) {
  //                 window.open(category.url, "_blank"); // 🔗 opens URL in new tab
  //               }
  //             }}
  //           >
  //             <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-80`} />
  //             <img
  //               src={category.image || "/placeholder.svg"}
  //               alt={category.title}
  //               className="w-full h-full object-cover"
  //             />
  //             <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
  
  //             <div className="absolute inset-0 p-6 flex flex-col justify-between">
  //               <div>
  //                 {/* <span
  //                   className={`inline-block px-3 py-1 rounded text-xs font-bold ${
  //                     category.badge === "BESTSELLER" ? "bg-orange-600 text-white" : "bg-green-600 text-white"
  //                   }`}
  //                 >
  //                   {category.badge}
  //                 </span> */}
  //               </div>
  
  //               <div>
  //                 <h3 className="text-white font-bold text-xl mb-2">{category.title}</h3>
  //                 <p className="text-gray-200 text-sm">{category.subtitle}</p>
  //               </div>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // )
  

  // Categories Layout - Mobile
  // const renderCategoriesSlideMobile = (slide) => (
  //   <div className="bg-gray-900 text-white min-h-screen p-4">
  //     <div className="max-w-md mx-auto">
  //       <div className="grid grid-cols-1 gap-4">
  //         {slide.content.map((category, index) => (
  //           <div key={index} className="relative rounded-xl overflow-hidden h-[270px]"  onClick={() => {
  //             if (category.url) {
  //               window.open(category.url, "_blank"); // 🔗 opens URL in new tab
  //             }
  //           }}>
  //             <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-80`} />
  //             <img
  //               src={category.image || "/placeholder.svg"}
  //               alt={category.title}
  //               className="w-full h-full object-cover"
  //             />
  //             <div className="absolute inset-0 bg-black/40" />

  //             <div className="absolute inset-0 p-4 flex flex-col justify-end h-full">
  //               <div>
  //                 <h3 className="text-white font-bold text-lg mb-1">{category.title}</h3>
  //                 <p className="text-gray-200 text-sm">{category.subtitle}</p>
  //               </div>
  //               {/* <span
  //                 className={`px-2 py-1 rounded text-xs font-bold ${
  //                   category.badge === "BESTSELLER" ? "bg-orange-600 text-white" : "bg-green-600 text-white"
  //                 }`}
  //               >
  //                 {category.badge}
  //               </span> */}
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // )

  // Mobile Layout - Desktop
//   const renderMobileSlideDesktop = (slide) => (
//     <div className="bg-gray-900 text-white p-8 min-h-[500px]">
//       <div className="max-w-7xl mx-auto">
//         {/* <div className="mb-12">
//           <h1 className="text-5xl font-bold mb-6 text-white">{slide.title}</h1>
//           <p className="text-gray-400 text-xl max-w-4xl">{slide.subtitle}</p>
//         </div> */}

//         <div className="flex gap-8 h-[400px] mt-5">
//           {/* Left Section - Game Cards */}
//           <div className="flex-[3] grid grid-cols-2 gap-6">
//             {slide.content.leftSection.map((game, index) => (
//               <div
//                 key={index}
//                 className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors"
//               >
//                 <div className="text-xs text-white-500 mb-4 uppercase font-medium">{game.badge}</div>
//                 <div className="flex gap-4">
//                   <img
//                     src={game.image || "/placeholder.svg"}
//                     alt={game.title}
//                     className="w-20 h-30 rounded-lg object-cover flex-shrink-0"
//                   />
//                   <div className="flex-1">
//                     <h3 className="font-semibold text-white mb-3 text-md">{game.title}</h3>
//                     <div className="flex items-center gap-2 mb-3">
//                       <div className="w-2 h-2 bg-[#5593f7] rounded-full"></div>
//                       <span className="text-sm text-[#5593f7] font-medium">{game.tag}</span>
//                       {/* {game.platforms && (
//                         <div className="flex gap-1 ml-2">
//                           {game.platforms.map((platform, idx) => (
//                             <div key={idx} className="w-5 h-5 bg-gray-600 rounded flex items-center justify-center">
//                               <span className="text-xs text-white">
//                                 {platform === "steam" ? "S" : platform === "key" ? "K" : "N"}
//                               </span>
//                             </div>
//                           ))}
//                         </div>
//                       )} */}
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <span className="font-bold text-xl text-white">{game.price}</span>
//                         {game.originalPrice && (
//                           <>
//                             {/* <span className="text-sm text-gray-500 line-through">{game.originalPrice}</span> */}
//                             {/* <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded font-bold">
//                               {game.discount}
//                             </span> */}
//                           </>
//                         )}
//                       </div>
//                       {/* <Heart className="w-6 h-6 text-gray-400 hover:text-red-500 cursor-pointer transition-colors" /> */}
//                       <button
//   onClick={() => window.open(game.url, "_blank")}
//   className="bg-[#5593f7] text-white px-4 py-2 rounded-lg font-semibold text-xs hover:bg-blue-600 transition-colors"
// >
//   Buy Now
// </button>

//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Right Section - Promotional */}
//           <div className="flex-[2]">
//             <div className="bg-gradient-to-br from-gray-800 to-gray-800 rounded-xl p-8 h-full flex flex-col justify-center items-center text-center text-white">
//               <img
//                 src={slide.content.rightSection.image || "/placeholder.svg"}
//                 alt="Gaming illustration"
//                 className="w-full max-w-sm h-[350px] mb-6 rounded-lg mt-36"
//               />
//               <h2 className="text-xl font-bold mb-2 mt-2">{slide.content.rightSection.title}</h2>
//               <p className="text-xl opacity-90 mb-16">{slide.content.rightSection.subtitle}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )

  // Mobile Layout - Mobile
//   const renderMobileSlideMobile = (slide) => (
//     <div className="bg-gray-900 text-white min-h-screen p-4">
//       <div className="max-w-md mx-auto">
//         {/* <div className="mb-8">
//           <h1 className="text-3xl font-bold mb-4 text-center">{slide.title}</h1>
//           <p className="text-gray-400 text-center">{slide.subtitle}</p>
//         </div> */}

//         {/* Promotional Section First on Mobile */}
//         <div className="mb-8">
//           <div className="bg-gradient-to-br from-gray-800 to-gray-800 rounded-xl p-6 text-center text-white">
//             <img
//               src={slide.content.rightSection.image || "/placeholder.svg"}
//               alt="Gaming illustration"
//               className="w-full max-w-xs mx-auto mb-4 rounded-lg"
//             />
//             <h2 className="text-2xl font-bold mb-2">{slide.content.rightSection.title}</h2>
//             <p className="opacity-90">{slide.content.rightSection.subtitle}</p>
//           </div>
//         </div>

//         {/* Game Cards */}
//         <div className="space-y-4">
//           {slide.content.leftSection.map((game, index) => (
//             <div key={index} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
//               <div className="text-xs text-gray-500 mb-3 uppercase">{game.badge}</div>
//               <div className="flex gap-4">
//                 <img
//                   src={game.image || "/placeholder.svg"}
//                   alt={game.title}
//                   className="w-16 h-25 rounded-lg object-cover flex-shrink-0"
//                 />
//                 <div className="flex-1">
//                   <h3 className="font-semibold text-white mb-2 text-sm">{game.title}</h3>
//                   <div className="flex items-center gap-2 mb-2">
//                     <div className="w-2 h-2 bg-[#5593f7] rounded-full"></div>
//                     <span className="text-xs text-[#5593f7]">{game.tag}</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       <span className="font-bold text-white">{game.price}</span>
//                       {game.originalPrice && (
//                         <>
//                           <span className="text-xs text-gray-500 line-through">{game.originalPrice}</span>
//                           <span className="bg-orange-500 text-white text-xs px-1 py-0.5 rounded">{game.discount}</span>
//                         </>
//                       )}
//                     </div>
//                     {/* <Heart className="w-4 h-4 text-gray-400" /> */}
//                     <button
//   onClick={() => window.open(game.url, "_blank")}
//   className="bg-[#5593f7] text-white px-4 py-2 rounded-lg font-semibold text-xs hover:bg-blue-600 transition-colors"
// >
//   Buy Now
// </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )

  const renderSlide = (slide) => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768

    switch (slide.type) {
      case "featured":
        return isMobile ? renderFeaturedSlideMobile(slide) : renderFeaturedSlideDesktop(slide)
      default:
        return null
    }
  }

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0">
            {renderSlide(slide)}
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Hidden on Mobile */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10 md:block"
        aria-label="Previous slide"
      >
        <ChevronLeft className="md:w-6 md:h-6 w-2 h-2" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10 md:block"
        aria-label="Next slide"
      >
        <ChevronRight className="md:w-6 md:h-6 w-2 h-2" />
      </button>

      {/* Slide Indicators */}
      {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10 mb-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div> */}
    </div>
  )
}

export default Caro