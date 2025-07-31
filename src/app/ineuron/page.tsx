// // // import { Header } from '@/components/layout/Header';
// // // import { Footer } from '@/components/layout/Footer';
// // // import { CourseCard } from '@/components/CourseCard';
// // // import { SellerStoreHeader } from '@/components/SellerStoreHeader';
// // // import { SellerStoreCategoryCard } from '@/components/SellerStoreCategoryCard';
// // // import { SellerStoreBanner } from '@/components/SellerStoreBanner';
// // // import { ineuronData } from '@/lib/ineuronData';

// // // export default function INeuronStore() {
// // //   const { sellerInfo, categories, featuredCourses, banners, allCourses } = ineuronData;

// // //   return (
// // //     <div className="flex flex-col min-h-screen bg-[--bg-dark]">
// // //       <Header />
// // //       <main className="flex-grow">
// // //         {/* Seller Header */}
// // //         <section className="py-12 px-6">
// // //           <div className="container">
// // //             <SellerStoreHeader
// // //               name={sellerInfo.name}
// // //               logo={sellerInfo.logo}
// // //               tagline={sellerInfo.tagline}
// // //               bannerImage={sellerInfo.bannerImage}
// // //             />
// // //           </div>
// // //         </section>

// // //         {/* Categories */}
// // //         <section className="py-12 px-6 bg-[--bg-medium] section-divider">
// // //           <div className="container">
// // //             <h2 className="text-3xl font-bold mb-8 text-center text-[--text-light]">Explore Categories</h2>
// // //             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
// // //               {categories.map((category) => (
// // //                 <SellerStoreCategoryCard
// // //                   key={category.id}
// // //                   name={category.name}
// // //                   slug={category.slug}
// // //                   image={category.image}
// // //                 />
// // //               ))}
// // //             </div>
// // //           </div>
// // //         </section>

// // //         {/* Featured Courses */}
// // //         <section className="py-12 px-6 bg-[--bg-dark] section-divider">
// // //           <div className="container">
// // //             <h2 className="text-3xl font-bold mb-8 text-center text-[--text-light]">Featured Courses</h2>
// // //             <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
// // //               {featuredCourses.map((course) => (
// // //                 <CourseCard
// // //                   key={course.id}
// // //                   course={{ ...course, providerInfo: { name: 'iNeuron' } }}
// // //                 />
// // //               ))}
// // //             </div>
// // //           </div>
// // //         </section>

// // //         {/* Promotional Banners */}
// // //         <section className="py-12 px-6 bg-[--bg-medium] section-divider">
// // //           <div className="container">
// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //               {banners.map((banner) => (
// // //                 <SellerStoreBanner
// // //                   key={banner.id}
// // //                   image={banner.image}
// // //                   title={banner.title}
// // //                   ctaText={banner.ctaText}
// // //                   ctaLink={banner.ctaLink}
// // //                 />
// // //               ))}
// // //             </div>
// // //           </div>
// // //         </section>

// // //         {/* All Courses */}
// // //         <section className="py-12 px-6 bg-[--bg-dark] section-divider">
// // //           <div className="container">
// // //             <h2 className="text-3xl font-bold mb-8 text-center text-[--text-light]">All Courses</h2>
// // //             <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
// // //               {allCourses.map((course) => (
// // //                 <CourseCard
// // //                   key={course.id}
// // //                   course={{ ...course, providerInfo: { name: 'iNeuron' } }}
// // //                 />
// // //               ))}
// // //             </div>
// // //           </div>
// // //         </section>
// // //       </main>
// // //       <Footer />
// // //     </div>
// // //   );
// // // }

// // // <iframe width="560" height="315" src="https://www.youtube.com/embed/363zQW6r0Gk?si=nF-5LFXXjz21N-mf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>



// // import { Header } from '@/components/layout/Header';
// // import { Footer } from '@/components/layout/Footer';
// // import { Button } from '@/components/ui/button';
// // import { CourseCard } from '@/components/CourseCard';
// // import { SellerStoreHeader } from '@/components/SellerStoreHeader';
// // import { SellerStoreCategoryCard } from '@/components/SellerStoreCategoryCard';
// // import { SellerStoreBanner } from '@/components/SellerStoreBanner';
// // import { ineuronData } from '@/lib/ineuronData';

// // export default function INeuronStore() {
// //   const { sellerInfo, categories, featuredCourses, banners, allCourses } = ineuronData;

// //   return (
// //     <div className="flex flex-col min-h-screen bg-[--bg-dark]">
// //       <Header />
// //       <main className="flex-grow">
// //         {/* Seller Header */}
// //         <section className="py-12 px-6">
// //           <div className="container">
// //             <SellerStoreHeader
// //               name={sellerInfo.name}
// //               logo={sellerInfo.logo}
// //               tagline={sellerInfo.tagline}
// //               bannerImage={sellerInfo.bannerImage}
// //             />
// //           </div>
// //         </section>

// //         {/* Categories */}
// //         <section className="py-12 px-6 bg-[--bg-medium] section-divider">
// //           <div className="container">
// //             <h2 className="text-3xl font-bold mb-8 text-center text-[--text-light]">Explore Categories</h2>
// //             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
// //               {categories.map((category) => (
// //                 <SellerStoreCategoryCard
// //                   key={category.id}
// //                   name={category.name}
// //                   slug={category.slug}
// //                   image={category.image}
// //                 />
// //               ))}
// //             </div>
// //           </div>
// //         </section>

// //         {/* Featured Courses */}
// //         <section className="py-12 px-6 bg-[--bg-dark] section-divider">
// //           <div className="container">
// //             <h2 className="text-3xl font-bold mb-8 text-center text-[--text-light]">Featured Courses</h2>
// //             <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
// //               {featuredCourses.map((course) => (
// //                 <CourseCard
// //                   key={course.id}
// //                   course={{ ...course, providerInfo: { name: 'iNeuron' } }}
// //                 />
// //               ))}
// //             </div>
// //           </div>
// //         </section>

// //         {/* Promotional Banners */}
// //         <section className="py-12 px-6 bg-[--bg-medium] section-divider">
// //           <div className="container">
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               {banners.map((banner) => (
// //                 <SellerStoreBanner
// //                   key={banner.id}
// //                   image={banner.image}
// //                   title={banner.title}
// //                   ctaText={banner.ctaText}
// //                   ctaLink={banner.ctaLink}
// //                 />
// //               ))}
// //             </div>
// //           </div>
// //         </section>

// //         {/* All Courses */}
// //         <section className="py-12 px-6 bg-[--bg-dark] section-divider">
// //   <div className="container">
// //     <h2 className="text-3xl font-bold mb-8 text-center text-[--text-light]">All Courses</h2>
// //     <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
// //       {allCourses.map((course) => (
// //         <CourseCard
// //           key={course.id}
// //           course={{ ...course, providerInfo: { name: 'iNeuron' } }}
// //         />
// //       ))}
// //     </div>
// //     <div className="text-center mt-8">
// //       <Button className="bg-[--primary-blue] text-[--text-light] px-8 py-3 rounded-full font-semibold hover:bg-[#5593f7] transition-colors">
// //         <a href="https://ineuron.ai/courses" target="_blank" rel="noopener noreferrer">
// //           Show All
// //         </a>
// //       </Button>
// //     </div>
// //   </div>
// // </section>
// //         {/* <section className="py-12 px-6 bg-[--bg-dark] section-divider">
// //           <div className="container">
// //             <h2 className="text-3xl font-bold mb-8 text-center text-[--text-light]">All Courses</h2>
// //             <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
// //               {allCourses.map((course) => (
// //                 <CourseCard
// //                   key={course.id}
// //                   course={{ ...course, providerInfo: { name: 'iNeuron' } }}
// //                 />
// //               ))}
// //             </div>
// //           </div>
// //         </section> */}

// //         {/* YouTube Video Section */}
// //         <section className="py-12 px-6 bg-[--bg-dark] section-divider">
// //           <div className="container">
// //             <h2 className="text-3xl font-bold mb-8 text-center text-[--text-light]">Watch Our Latest Video</h2>
// //             <div className="flex justify-center">
// //               <div className="relative w-full max-w-3xl aspect-video rounded-lg shadow-lg overflow-hidden border border-[--border-color] hover:border-[--primary-blue] transition-colors duration-300">
// //                 <iframe
// //                   width="100%"
// //                   height="100%"
// //                   src="https://www.youtube.com/embed/363zQW6r0Gk?si=nF-5LFXXjz21N-mf"
// //                   title="iNeuron Latest Video"
// //                   frameBorder="0"
// //                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
// //                   referrerPolicy="strict-origin-when-cross-origin"
// //                   allowFullScreen
// //                   className="absolute top-0 left-0 w-full h-full"
// //                 />
// //               </div>
// //             </div>
// //           </div>
// //         </section>
// //       </main>
// //       <Footer />
// //     </div>
// //   );
// // }


// import { Header } from '@/components/layout/Header';
// import { Footer } from '@/components/layout/Footer';
// import { Button } from '@/components/ui/button';
// import { CourseCard } from '@/components/CourseCard';
// import { RedirectCard } from '@/components/RedirectCard'; // Import the new RedirectCard
// import { SellerStoreHeader } from '@/components/SellerStoreHeader';
// import { SellerStoreCategoryCard } from '@/components/SellerStoreCategoryCard';
// import { SellerStoreBanner } from '@/components/SellerStoreBanner';
// import { ineuronData } from '@/lib/ineuronData';

// export default function INeuronStore() {
//   const { sellerInfo, categories, featuredCourses, banners, allCourses } = ineuronData;

//   return (
//     <div className="flex flex-col min-h-screen bg-[--bg-dark]">
//       <Header />
//       <main className="flex-grow">
//         {/* Seller Header */}
//         <section className="py-12 px-6">
//           <div className="container">
//             <SellerStoreHeader
//               name={sellerInfo.name}
//               logo={sellerInfo.logo}
//               tagline={sellerInfo.tagline}
//               bannerImage={sellerInfo.bannerImage}
//             />
//           </div>
//         </section>

//         {/* Categories */}
//         <section className="py-12 px-6 bg-[--bg-medium] section-divider">
//           <div className="container">
//             <h2 className="text-3xl font-bold mb-8 text-center text-[--text-light]">Explore Categories</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {categories.map((category) => (
//                 <SellerStoreCategoryCard
//                   key={category.id}
//                   name={category.name}
//                   slug={category.slug}
//                   image={category.image}
//                   cta={category.cta}
//                 />
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Featured Courses */}
//         <section className="py-12 px-6 bg-[--bg-dark] section-divider">
//           <div className="container">
//             <h2 className="text-3xl font-bold mb-8 text-center text-[--text-light]">Featured Courses</h2>
//             <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
//               {featuredCourses.map((course) => (
//                 <RedirectCard
//                   key={course.id}
//                   course={{ ...course, providerInfo: { name: 'iNeuron' }, cta: course.ctaLink || 'https://ineuron.ai' }}
//                 />
//               ))}
//             </div>
//           </div>
//         </section>
//         {/* <section className="py-12 px-6 bg-[--bg-dark] section-divider">
//           <div className="container">
//             <h2 className="text-3xl font-bold mb-8 text-center text-[--text-light]">Featured Courses</h2>
//             <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
//               {featuredCourses.map((course) => (
//                 <CourseCard
//                   key={course.id}
//                   course={{ ...course, providerInfo: { name: 'iNeuron' } }}
//                 />
//               ))}
//             </div>
//           </div>
//         </section> */}

//         {/* Promotional Banners */}
//         <section className="py-12 px-6 bg-[--bg-medium] section-divider">
//           <div className="container">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {banners.map((banner) => (
//                 <SellerStoreBanner
//                   key={banner.id}
//                   image={banner.image}
//                   title={banner.title}
//                   ctaText={banner.ctaText}
//                   ctaLink={banner.ctaLink}
//                 />
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* All Courses */}
//         <section className="py-12 px-6 bg-[--bg-dark] section-divider">
//           <div className="container">
//             <h2 className="text-3xl font-bold mb-8 text-center text-[--text-light]">All Courses</h2>
//             <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
//               {allCourses.map((course) => (
//                 <RedirectCard
//                   key={course.id}
//                   course={{ ...course, providerInfo: { name: 'iNeuron' }, cta: course.ctaLink || 'http.xy.com' }}
//                 />
//               ))}
//             </div>
//             <div className="text-center mt-8">
//               <Button className="bg-[--primary-blue] text-[--text-light] px-8 py-3 rounded-full font-semibold hover:bg-[#5593f7] transition-colors">
//                 <a href="https://ineuron.ai/courses" target="_blank" rel="noopener noreferrer">
//                   Show All
//                 </a>
//               </Button>
//             </div>
//           </div>
//         </section>

//         {/* YouTube Video Section */}
//         <section className="py-12 px-6 bg-[--bg-dark] section-divider">
//           <div className="container">
//             <h2 className="text-3xl font-bold mb-8 text-center text-[--text-light]">Watch Our Latest Video</h2>
//             <div className="flex justify-center">
//               <div className="relative w-full max-w-3xl aspect-video rounded-lg shadow-lg overflow-hidden border border-[--border-color] hover:border-[--primary-blue] transition-colors duration-300">
//                 <iframe
//                   width="100%"
//                   height="100%"
//                   src="https://www.youtube.com/embed/363zQW6r0Gk?si=nF-5LFXXjz21N-mf"
//                   title="iNeuron Latest Video"
//                   frameBorder="0"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                   referrerPolicy="strict-origin-when-cross-origin"
//                   allowFullScreen
//                   className="absolute top-0 left-0 w-full h-full"
//                 />
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </div>
//   );
// }


"use client"

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { RedirectCard } from '@/components/RedirectCard';
import { SellerStoreHeader } from '@/components/SellerStoreHeader';
import { SellerStoreCategoryCard } from '@/components/SellerStoreCategoryCard';
import { SellerStoreBanner } from '@/components/SellerStoreBanner';
import Video  from '@/components/Videoi';
import { ineuronData } from '@/lib/ineuronData';

export default function INeuronStore() {
  const { sellerInfo, categories, featuredCourses, banners, allCourses } = ineuronData;

  return (
    <div className="flex flex-col min-h-screen bg-[--bg-dark]">
      <Header />
      <main className="flex-grow">
        {/* Seller Header */}
        {/* <section className="py-12 px-6">
          <div className="container">
            <SellerStoreHeader
              name={sellerInfo.name}
              logo={sellerInfo.logo}
              tagline={sellerInfo.tagline}
              bannerImage={sellerInfo.bannerImage}
            />
          </div>
        </section> */}

        {/* Categories */}
        {/* <section className="py-12 px-6 bg-[--bg-medium] section-divider">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-center text-[--text-light]">Explore Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category) => (
                <SellerStoreCategoryCard
                  key={category.id}
                  name={category.name}
                  slug={category.slug}
                  image={category.image}
                  cta={category.cta}
                />
              ))}
            </div>
          </div>
        </section> */}
<section className="py-12 px-0">
  <div className="container max-w-full px-0">
    <SellerStoreHeader
      name={sellerInfo.name}
      logo={sellerInfo.logo}
      tagline={sellerInfo.tagline}
      bannerImage={sellerInfo.bannerImage}
      mobileBannerImage={sellerInfo.mobileBannerImage}
    />

    <div className="mt-6 px-6">
      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-4 gap-4">
        {categories.map((category) => (
          <SellerStoreCategoryCard
            key={category.id}
            name={category.name}
            slug={category.slug}
            image={category.image}
            cta={category.cta}
          />
        ))}
      </div>

      {/* Mobile - Stack cards vertically, no scroll */}
      <div className="md:hidden flex flex-col gap-4">
        {categories.map((category) => (
          <div key={category.id} className="w-full">
            <SellerStoreCategoryCard
              name={category.name}
              slug={category.slug}
              image={category.image}
              cta={category.cta}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
</section>


{/* <section className="py-12 px-6">
  <div className="container">
    <SellerStoreHeader
      name={sellerInfo.name}
      logo={sellerInfo.logo}
      tagline={sellerInfo.tagline}
      bannerImage={sellerInfo.bannerImage}
    />
    <div className="mt-6">
      <div className="hidden md:block relative px-4">
    
        <div className="mx-16 overflow-hidden relative">
          <div className="flex gap-4">
            {categories.map((category) => (
              <SellerStoreCategoryCard
                key={category.id}
                name={category.name}
                slug={category.slug}
                image={category.image}
                cta={category.cta}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <div 
          className="flex -mx-12 gap-4 overflow-x-auto pb-4 px-1"
          style={{
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="flex-shrink-0"
              style={{
                width: 'calc(50vw - 24px)',
                minWidth: '140px',
                maxWidth: '160px'
              }}
            >
              <SellerStoreCategoryCard
                name={category.name}
                slug={category.slug}
                image={category.image}
                cta={category.cta}
              />
            </div>
          ))}
          <div className="w-4 flex-shrink-0"></div>
        </div>
      </div>
    </div>
  </div>
</section> */}

        {/* Featured Courses */}
        <section className="py-12 px-6 bg-[--bg-dark] section-divider">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-center text-[--text-light]">Featured Courses</h2>
            <div className="hidden md:grid md:grid-cols-4 gap-6">
              {featuredCourses.map((course) => (
                <RedirectCard
                  key={course.id}
                  course={{ ...course, providerInfo: { name: 'iNeuron' }, cta: course.ctaLink || 'https://ineuron.ai' }}
                />
              ))}
            </div>
            <div className="md:hidden px-2">
              <div 
                className="flex -mx-12 gap-3 overflow-x-auto pb-4 px-1"
                style={{
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                <style jsx>{`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                {featuredCourses.map((course) => (
                  <div 
                    key={course.id} 
                    className="flex-shrink-0"
                    style={{
                      width: 'calc(48vw - 24px)',
                      minWidth: '160px',
                      maxWidth: '180px'
                    }}
                  >
                    <RedirectCard
                      course={{ ...course, providerInfo: { name: 'iNeuron' }, cta: course.ctaLink || 'https://ineuron.ai' }}
                      isMobile={true}
                    />
                  </div>
                ))}
                <div className="w-4 flex-shrink-0"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Promotional Banners */}
        <section className="py-12 -px-6 md:px-6 bg-[--bg-medium] section-divider">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {banners.map((banner) => (
                <SellerStoreBanner
                  key={banner.id}
                  image={banner.image}
                  title={banner.title}
                  ctaText={banner.ctaText}
                  ctaLink={banner.ctaLink}
                />
              ))}
            </div>
          </div>
        </section>
        <Video/>

        {/* All Courses */}
        <section className="py-12 px-6 bg-[--bg-dark] section-divider">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-center text-[--text-light]">All Courses</h2>
            <div className="hidden md:grid md:grid-cols-4 gap-6">
              {allCourses.map((course) => (
                <RedirectCard
                  key={course.id}
                  course={{ ...course, providerInfo: { name: 'iNeuron' }, cta: course.ctaLink || 'http.xy.com' }}
                />
              ))}
            </div>
            <div className="md:hidden px-2">
              <div 
                className="flex -mx-12 gap-3 overflow-x-auto pb-4 px-1"
                style={{
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                <style jsx>{`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                {allCourses.map((course) => (
                  <div 
                    key={course.id} 
                    className="flex-shrink-0"
                    style={{
                      width: 'calc(48vw - 24px)',
                      minWidth: '160px',
                      maxWidth: '180px'
                    }}
                  >
                    <RedirectCard
                      course={{ ...course, providerInfo: { name: 'iNeuron' }, cta: course.ctaLink || 'http.xy.com' }}
                      isMobile={true}
                    />
                  </div>
                ))}
                <div className="w-4 flex-shrink-0"></div>
              </div>
            </div>
            <div className="text-center mt-8">
              <Button className="bg-[--primary-blue] text-[--text-light] px-8 py-3 rounded-full font-semibold hover:bg-[#5593f7] transition-colors">
                <a href="https://ineuron.ai/courses" target="_blank" rel="noopener noreferrer">
                  Show All
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* YouTube Video Section */}
        <section className="py-12 px-6 bg-[--bg-dark] section-divider">
  <div className="container">
    <h2 className="text-3xl font-bold mb-8 text-center text-[--text-light]">
      Watch Our Latest Video
    </h2>

    <div className="flex flex-col md:flex-row justify-center gap-5">
      <div className="relative w-full md:w-1/2 aspect-video rounded-lg shadow-lg overflow-hidden border border-[--border-color] hover:border-[--primary-blue] transition-colors duration-300">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/363zQW6r0Gk?si=nF-5LFXXjz21N-mf"
          title="iNeuron Latest Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>

      <div className="relative w-full md:w-1/2 aspect-video rounded-lg shadow-lg overflow-hidden border border-[--border-color] hover:border-[--primary-blue] transition-colors duration-300">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/6qnx3okPvkc?si=Au1848geAbBYcdSG"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
    </div>
  </div>
</section>

      </main>
      <Footer />
    </div>
  );
}