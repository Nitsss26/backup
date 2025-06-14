import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CourseCard } from '@/components/CourseCard';
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
                <CourseCard
                  key={course.id}
                  course={{ ...course, providerInfo: { name: 'iNeuron' } }}
                />
              ))}
            </div>
          </div>
        </section>

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
                <CourseCard
                  key={course.id}
                  course={{ ...course, providerInfo: { name: 'iNeuron' } }}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}