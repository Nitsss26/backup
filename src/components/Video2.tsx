// // import React, { useRef, useState } from 'react';

// // const Video2 = () => {
// //   const carouselRef = useRef(null);
// //   const [currentIndex, setCurrentIndex] = useState(0);

// //   const handleNext = () => {
// //     if (currentIndex < 6) {
// //       setCurrentIndex(currentIndex + 3);
// //       carouselRef.current.scrollLeft += carouselRef.current.offsetWidth;
// //     }
// //   };

// //   const comics = [
// //     {
// //       src: '/comic1.pdf',
// //       caption: 'Spawn #1',
// //       handle: '@darkhorsecomics',
// //       price: '$9.99',
// //       description: 'The origin of Spawn in this iconic issue',
// //     },
// //     {
// //       src: '/comic2.pdf',
// //       caption: 'Batman: The Dark Knight Returns',
// //       handle: '@dccomics',
// //       price: '$12.99',
// //       description: 'An aging Batman returns to fight crime',
// //     },
// //     {
// //       src: '/comic3.pdf',
// //       caption: 'Watchmen',
// //       handle: '@dccomics',
// //       price: '$10.99',
// //       description: 'A dark and complex superhero tale',
// //     },
// //     {
// //       src: '/comic4.pdf',
// //       caption: 'The Sandman #1',
// //       handle: '@vertigocomics',
// //       price: '$8.99',
// //       description: 'Enter the world of Morpheus',
// //     },
// //     {
// //       src: '/comic5.pdf',
// //       caption: 'X-Men: Days of Future Past',
// //       handle: '@marvelcomics',
// //       price: '$11.99',
// //       description: 'A dystopian future for the X-Men',
// //     },
// //     {
// //       src: '/comic6.pdf',
// //       caption: 'Hellboy: Seed of Destruction',
// //       handle: '@darkhorsecomics',
// //       price: '$13.99',
// //       description: 'Hellboy’s first major adventure',
// //     },
// //     {
// //       src: '/comic7.pdf',
// //       caption: 'The Walking Dead #1',
// //       handle: '@imagecomics',
// //       price: '$9.50',
// //       description: 'The start of the zombie apocalypse',
// //     },
// //     {
// //       src: '/comic8.pdf',
// //       caption: 'Spider-Man: Blue',
// //       handle: '@marvelcomics',
// //       price: '$10.50',
// //       description: 'A heartfelt Spider-Man story',
// //     },
// //     {
// //       src: '/comic9.pdf',
// //       caption: 'Saga #1',
// //       handle: '@imagecomics',
// //       price: '$8.50',
// //       description: 'A space opera with a twist',
// //     },
// //   ];

// //   return (
// //     <div className="bg-gray-900 text-white p-6">
// //       <h2 className="text-2xl font-bold mb-4">Summer's must-have comics</h2>
// //       <p className="text-sm mb-4 text-gray-400">Explore the best comic bundles</p>
// //       <div className="flex">
// //         {/* Left Banner */}
// //         <div className="w-1/3 pr-4">
// //           <div className="bg-gray-800 rounded-lg overflow-hidden relative h-full">
// //             <div className="w-full" style={{ paddingTop: '56.25%' }}>
// //               <img
// //                 src="/hellboy-banner.jpg"
// //                 alt="Hellboy Bundle"
// //                 className="absolute top-0 left-0 w-full h-full object-cover"
// //               />
// //               <div className="absolute bottom-4 left-4 text-white">
// //                 <h3 className="text-xl font-bold">The World According to Hellboy Bundle</h3>
// //                 <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
// //                   Shop now
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //         {/* Carousel */}
// //         <div className="w-2/3">
// //           <div className="flex items-center">
// //             <div className="flex-1 overflow-hidden">
// //               <div
// //                 ref={carouselRef}
// //                 className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth"
// //                 style={{ scrollBehavior: 'smooth' }}
// //               >
// //                 {comics.map((comic, index) => (
// //                   <div
// //                     key={index}
// //                     className="bg-gray-800 rounded-lg overflow-hidden relative min-w-[calc(33.33%-0.75rem)]"
// //                   >
// //                     <div className="w-full" style={{ paddingTop: '128.00%' }}>
// //                       <a href={comic.src} target="_blank" rel="noopener noreferrer">
// //                         <div className="absolute top-0 left-0 w-full h-full bg-gray-700 flex items-center justify-center">
// //                           <span className="text-gray-500">View PDF</span>
// //                         </div>
// //                       </a>
// //                     </div>
// //                     <div className="p-2">
// //                       <p className="text-xs text-gray-400">{comic.caption}</p>
// //                       <p className="text-sm font-semibold">{comic.handle}</p>
// //                       <p className="text-green-400 text-sm">{comic.price}</p>
// //                       <p className="text-xs text-gray-300">{comic.description}</p>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //             <button
// //               onClick={handleNext}
// //               className="ml-4 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full"
// //             >
// //               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// //                 <path d="M9 18L15 12L9 6V18Z" fill="white"/>
// //               </svg>
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Video2;


// import React, { useRef, useState } from 'react';

// const Video2 = () => {
//   const carouselRef = useRef(null);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleNext = () => {
//     if (currentIndex < 6) {
//       setCurrentIndex(currentIndex + 1);
//       carouselRef.current.style.transform = `translateX(-${currentIndex + 1}00%)`;
//     }
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//       carouselRef.current.style.transform = `translateX(-${currentIndex - 1}00%)`;
//     }
//   };

//   const eBooks = [
//     {
//       src: 'https://fanatical.imgix.net/product/original/e6e4dd15-eb4b-489f-93c9-3a6c6f1d6747.jpeg?auto=compress,format&w=960&fit=max',
//       caption: 'Python for Beginners',
//       handle: '@edtechpro',
//       originalPrice: '$19.99',
//       price: '$12.99',
//       discount: '35%',
//       description: 'Start your coding journey with Python',
//     },
//     {
//       src: 'https://fanatical.imgix.net/product/original/cdaaaccb-ed06-480a-80d1-c248810fe280.jpeg?auto=compress,format&w=480&fit=max',
//       caption: 'JavaScript Essentials',
//       handle: '@edtechpro',
//       originalPrice: '$15.99',
//       price: '$9.99',
//       discount: '38%',
//       description: 'Master JavaScript fundamentals',
//     },
//     {
//       src: 'https://fanatical.imgix.net/product/original/bfe01839-f3df-48bb-ab3f-4af1b9981795.jpeg?auto=compress,format&w=480&fit=max',
//       caption: 'Data Science 101',
//       handle: '@edtechpro',
//       originalPrice: '$24.99',
//       price: '$16.99',
//       discount: '32%',
//       description: 'Intro to data science techniques',
//     },
//     {
//       src: 'https://fanatical.imgix.net/product/original/2be4759d-1d42-43a6-928b-a9a9c64fdf78.jpeg?auto=compress,format&w=600&fit=max',
//       caption: 'Web Design Basics',
//       handle: '@edtechpro',
//       originalPrice: '$14.99',
//       price: '$8.99',
//       discount: '40%',
//       description: 'Learn to design stunning websites',
//     },
//     {
//       src: 'https://fanatical.imgix.net/product/original/36e2ea1e-038c-4382-ab92-c1461305c857.jpeg?auto=compress,format&w=600&fit=max',
//       caption: 'Machine Learning Crash Course',
//       handle: '@edtechpro',
//       originalPrice: '$22.99',
//       price: '$14.99',
//       discount: '35%',
//       description: 'Quick start to machine learning',
//     },
//     {
//       src: 'https://fanatical.imgix.net/product/original/bfe01839-f3df-48bb-ab3f-4af1b9981795.jpeg?auto=compress,format&w=480&fit=max',
//       caption: 'Cybersecurity Fundamentals',
//       handle: '@edtechpro',
//       originalPrice: '$18.99',
//       price: '$11.99',
//       discount: '37%',
//       description: 'Basics of securing digital systems',
//     },
//     // {
//     //   src: '/ebook7.jpg',
//     //   caption: 'AI for Everyone',
//     //   handle: '@edtechpro',
//     //   originalPrice: '$20.99',
//     //   price: '$13.99',
//     //   discount: '33%',
//     //   description: 'Understand AI concepts easily',
//     // },
//   ];

//   return (
//     <div className="bg-gray-900 text-white p-6">
//       <h2 className="text-2xl font-bold mb-4">Trending eBooks</h2>
//       <p className="text-sm mb-4 text-gray-400">Explore the best eBook deals <a href="#" className="text-blue-400 underline">View all</a></p>
//       <div className="flex">
//         {/* Left Banner */}
//         <div className="w-2/3 pr-4">
//           <div className="bg-gray-800 rounded-lg overflow-hidden relative">
//             <div className="w-full" style={{ paddingTop: '52%' }}>
//               <img
//                 src="https://fanatical.imgix.net/product/original/67433d11-9a8e-49b4-87ed-97f7b5d298ac.jpeg?auto=compress,format&w=1124&fit=crop&h=632"
//                 alt="Hellboy Bundle"
//                 className="absolute top-0 left-0 w-full h-full object-cover"
//               />
//               <div className="absolute bottom-4 left-4 text-white">
//                 <h3 className="text-xl font-bold">The World According to Hellboy Bundle</h3>
//                 <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
//                   Shop now
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Carousel */}
//         <div className="w-2/3 relative">
//           <div className="flex items-center justify-center">
//             <button
//               onClick={handlePrev}
//               className="absolute left-0 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full z-10"
//               disabled={currentIndex === 0}
//             >
//               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M15 18L9 12L15 6V18Z" fill="white"/>
//               </svg>
//             </button>
//             <div className="w-full overflow-hidden">
//               <div
//                 ref={carouselRef}
//                 className="flex transition-transform duration-300 ease-in-out"
//                 style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//               >
//                 {eBooks.map((ebook, index) => (
//                   <div
//                     key={index}
//                     className="bg-gray-800 rounded-lg overflow-hidden relative flex-shrink-0 mx-2"
//                     style={{ width: 'calc(33.33% - 1rem)' }}
//                   >
//                     <div className="w-full" style={{ paddingTop: '130%' }}>
//                       <img
//                         src={ebook.src}
//                         alt={ebook.caption}
//                         className="absolute top-0 left-0 w-full h-full object-cover"
//                       />
//                     </div>
//                     <div className="p-2">
//                       {/* <p className="text-xs text-gray-400">{ebook.caption}</p>
//                       <p className="text-sm font-semibold">{ebook.handle}</p> */}
//                       <p className="text-gray-500 line-through text-sm">{ebook.originalPrice}</p>
//                       <p className="text-green-400 text-sm">{ebook.price}</p>
//                       <p className="text-red-400 text-xs">{ebook.discount} off</p>
//                       {/* <p className="text-xs text-gray-300">{ebook.description}</p>
//                       <button className="mt-2 bg-gray-700 hover:bg-gray-600 text-white py-1 px-2 text-xs rounded">
//                         Options
//                       </button> */}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <button
//               onClick={handleNext}
//               className="absolute right-0 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full z-10"
//               disabled={currentIndex >= eBooks.length - 1}
//             >
//               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M9 18L15 12L9 6V18Z" fill="white"/>
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Video2;

import React, { useRef, useState } from 'react';

const Video2 = () => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < 6) {
      setCurrentIndex(currentIndex + 1);
      carouselRef.current.style.transform = `translateX(-${currentIndex + 1}00%)`;
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      carouselRef.current.style.transform = `translateX(-${currentIndex - 1}00%)`;
    }
  };

  const eBooks = [
    {
      src: 'https://fanatical.imgix.net/product/original/e6e4dd15-eb4b-489f-93c9-3a6c6f1d6747.jpeg?auto=compress,format&w=960&fit=max',
      caption: 'Python for Beginners',
      handle: '@edtechpro',
      originalPrice: '$19.99',
      price: '$12.99',
      discount: '35%',
      description: 'Start your coding journey with Python',
    },
    {
      src: 'https://fanatical.imgix.net/product/original/cdaaaccb-ed06-480a-80d1-c248810fe280.jpeg?auto=compress,format&w=480&fit=max',
      caption: 'JavaScript Essentials',
      handle: '@edtechpro',
      originalPrice: '$15.99',
      price: '$9.99',
      discount: '38%',
      description: 'Master JavaScript fundamentals',
    },
    {
      src: 'https://fanatical.imgix.net/product/original/bfe01839-f3df-48bb-ab3f-4af1b9981795.jpeg?auto=compress,format&w=480&fit=max',
      caption: 'Data Science 101',
      handle: '@edtechpro',
      originalPrice: '$24.99',
      price: '$16.99',
      discount: '32%',
      description: 'Intro to data science techniques',
    },
    {
      src: 'https://fanatical.imgix.net/product/original/2be4759d-1d42-43a6-928b-a9a9c64fdf78.jpeg?auto=compress,format&w=600&fit=max',
      caption: 'Web Design Basics',
      handle: '@edtechpro',
      originalPrice: '$14.99',
      price: '$8.99',
      discount: '40%',
      description: 'Learn to design stunning websites',
    },
    {
      src: 'https://fanatical.imgix.net/product/original/36e2ea1e-038c-4382-ab92-c1461305c857.jpeg?auto=compress,format&w=600&fit=max',
      caption: 'Machine Learning Crash Course',
      handle: '@edtechpro',
      originalPrice: '$22.99',
      price: '$14.99',
      discount: '35%',
      description: 'Quick start to machine learning',
    },
    {
      src: 'https://fanatical.imgix.net/product/original/bfe01839-f3df-48bb-ab3f-4af1b9981795.jpeg?auto=compress,format&w=480&fit=max',
      caption: 'Cybersecurity Fundamentals',
      handle: '@edtechpro',
      originalPrice: '$18.99',
      price: '$11.99',
      discount: '37%',
      description: 'Basics of securing digital systems',
    },
    // {
    //   src: '/ebook7.jpg',
    //   caption: 'AI for Everyone',
    //   handle: '@edtechpro',
    //   originalPrice: '$20.99',
    //   price: '$13.99',
    //   discount: '33%',
    //   description: 'Understand AI concepts easily',
    // },
  ];

  return (
    <div className="bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Trending eBooks</h2>
      <p className="text-sm mb-4 text-gray-400">Explore the best eBook deals <a href="#" className="text-blue-400 underline">View all</a></p>
      
      {/* Desktop Layout - unchanged */}
      <div className="hidden md:flex">
        {/* Left Banner */}
        <div className="w-2/3 pr-4">
          <div className="bg-gray-800 rounded-lg overflow-hidden relative">
            <div className="w-full" style={{ paddingTop: '52%' }}>
              <img
                src="https://fanatical.imgix.net/product/original/67433d11-9a8e-49b4-87ed-97f7b5d298ac.jpeg?auto=compress,format&w=1124&fit=crop&h=632"
                alt="Hellboy Bundle"
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">The World According to Hellboy Bundle</h3>
                <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                  Shop now
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Carousel */}
        <div className="w-2/3 relative">
          <div className="flex items-center justify-center">
            <button
              onClick={handlePrev}
              className="absolute left-0 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full z-10"
              disabled={currentIndex === 0}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6V18Z" fill="white"/>
              </svg>
            </button>
            <div className="w-full overflow-hidden">
              <div
                ref={carouselRef}
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {eBooks.map((ebook, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 rounded-lg overflow-hidden relative flex-shrink-0 mx-2"
                    style={{ width: 'calc(33.33% - 1rem)' }}
                  >
                    <div className="w-full" style={{ paddingTop: '130%' }}>
                      <img
                        src={ebook.src}
                        alt={ebook.caption}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2">
                      <p className="text-gray-500 line-through text-sm">{ebook.originalPrice}</p>
                      <p className="text-green-400 text-sm">{ebook.price}</p>
                      <p className="text-red-400 text-xs">{ebook.discount} off</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={handleNext}
              className="absolute right-0 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full z-10"
              disabled={currentIndex >= eBooks.length - 1}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6V18Z" fill="white"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Featured Banner */}
        <div className="mb-6">
          <div className="bg-gray-800 rounded-lg overflow-hidden relative">
            <div className="w-full" style={{ paddingTop: '52%' }}>
              <img
                src="https://fanatical.imgix.net/product/original/67433d11-9a8e-49b4-87ed-97f7b5d298ac.jpeg?auto=compress,format&w=1124&fit=crop&h=632"
                alt="Hellboy Bundle"
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-bold">The World According to Hellboy Bundle</h3>
                <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm">
                  Shop now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Vertical Stack - 2 cards visible, no swipe */}
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {eBooks.slice(0, 2).map((ebook, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg overflow-hidden relative"
                style={{ width: '40%', minWidth: '140px' }} // Preserve original width
              >
                <div className="w-full" style={{ paddingTop: '130%' }}> {/* Preserve original height */}
                  <img
                    src={ebook.src}
                    alt={ebook.caption}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-2">
                  <p className="text-gray-500 line-through text-sm">{ebook.originalPrice}</p>
                  <p className="text-green-400 text-sm">{ebook.price}</p>
                  <p className="text-red-400 text-xs">{ebook.discount} off</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video2;