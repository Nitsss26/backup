// // import { Header } from '@/components/layout/Header';
// // import { Footer } from '@/components/layout/Footer';
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
// //         </section>
// //       </main>
// //       <Footer />
// //     </div>
// //   );
// // }

// // <iframe width="560" height="315" src="https://www.youtube.com/embed/363zQW6r0Gk?si=nF-5LFXXjz21N-mf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>



// import { Header } from '@/components/layout/Header';
// import { Footer } from '@/components/layout/Footer';
// import { Button } from '@/components/ui/button';
// import { CourseCard } from '@/components/CourseCard';
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
//                 <CourseCard
//                   key={course.id}
//                   course={{ ...course, providerInfo: { name: 'iNeuron' } }}
//                 />
//               ))}
//             </div>
//           </div>
//         </section>

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
//   <div className="container">
//     <h2 className="text-3xl font-bold mb-8 text-center text-[--text-light]">All Courses</h2>
//     <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
//       {allCourses.map((course) => (
//         <CourseCard
//           key={course.id}
//           course={{ ...course, providerInfo: { name: 'iNeuron' } }}
//         />
//       ))}
//     </div>
//     <div className="text-center mt-8">
//       <Button className="bg-[--primary-blue] text-[--text-light] px-8 py-3 rounded-full font-semibold hover:bg-[#5593f7] transition-colors">
//         <a href="https://ineuron.ai/courses" target="_blank" rel="noopener noreferrer">
//           Show All
//         </a>
//       </Button>
//     </div>
//   </div>
// </section>
//         {/* <section className="py-12 px-6 bg-[--bg-dark] section-divider">
//           <div className="container">
//             <h2 className="text-3xl font-bold mb-8 text-center text-[--text-light]">All Courses</h2>
//             <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
//               {allCourses.map((course) => (
//                 <CourseCard
//                   key={course.id}
//                   course={{ ...course, providerInfo: { name: 'iNeuron' } }}
//                 />
//               ))}
//             </div>
//           </div>
//         </section> */}

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


import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { CourseCard } from '@/components/CourseCard';
import { RedirectCard } from '@/components/RedirectCard'; // Import the new RedirectCard
import { SellerStoreHeader } from '@/components/SellerStoreHeader';
import { SellerStoreCategoryCard } from '@/components/SellerStoreCategoryCard';
import { SellerStoreBanner } from '@/components/SellerStoreBanner';
import { ineuronData } from '@/lib/ineuronData';

export default function INeuronStore() {
  const { sellerInfo, categories, featuredCourses, banners, allCourses } = ineuronData;

  return (
    <div className="flex flex-col min-h-screen bg-[--bg-dark]">
      <Header />
      <main className="flex-grow">
        {/* Seller Header */}
        <section className="py-12 px-6">
          <div className="container">
            <SellerStoreHeader
              name={sellerInfo.name}
              logo={sellerInfo.logo}
              tagline={sellerInfo.tagline}
              bannerImage={sellerInfo.bannerImage}
            />
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 px-6 bg-[--bg-medium] section-divider">
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
        </section>

        {/* Featured Courses */}
        <section className="py-12 px-6 bg-[--bg-dark] section-divider">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-center text-[--text-light]">Featured Courses</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {featuredCourses.map((course) => (
                <RedirectCard
                  key={course.id}
                  course={{ ...course, providerInfo: { name: 'iNeuron' }, cta: course.ctaLink || 'https://ineuron.ai' }}
                />
              ))}
            </div>
          </div>
        </section>
        {/* <section className="py-12 px-6 bg-[--bg-dark] section-divider">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-center text-[--text-light]">Featured Courses</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {featuredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={{ ...course, providerInfo: { name: 'iNeuron' } }}
                />
              ))}
            </div>
          </div>
        </section> */}

        {/* Promotional Banners */}
        <section className="py-12 px-6 bg-[--bg-medium] section-divider">
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

        {/* All Courses */}
        <section className="py-12 px-6 bg-[--bg-dark] section-divider">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-center text-[--text-light]">All Courses</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {allCourses.map((course) => (
                <RedirectCard
                  key={course.id}
                  course={{ ...course, providerInfo: { name: 'iNeuron' }, cta: course.ctaLink || 'http.xy.com' }}
                />
              ))}
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
            <h2 className="text-3xl font-bold mb-8 text-center text-[--text-light]">Watch Our Latest Video</h2>
            <div className="flex justify-center">
              <div className="relative w-full max-w-3xl aspect-video rounded-lg shadow-lg overflow-hidden border border-[--border-color] hover:border-[--primary-blue] transition-colors duration-300">
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
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}