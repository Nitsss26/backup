"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CourseCard } from '@/components/CourseCardPW';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';

export default function HomePage() {
  // Embedded courses data directly in the file
  const courses = [
   
    {
        "_id": "64c8b4ae188aa67dd4093482",
        "title": "Arjuna NEET Hindi 2.0 2026",
        "instructor": "PW Faculty",
        "sellerId": "64c8b4ae188aa67dd4093460",
        "rating": 4.7,
        "reviewsCount": 300,
        "price": 2999,
        "originalPrice": 4800,
        "category": "NEET",
        "imageUrl": "https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/a65a0276-f55b-4a00-a9d6-0b7f6c92d64d.png",
        "shortDescription": "Comprehensive NEET preparation program for Class 11 students in Hindi by PW Faculty",
        "duration": "23 months total",
        "level": "Intermediate",
        "description": "Explore NEET preparation in Hindi with PW Faculty. This comprehensive program covers Class 11 syllabus through Hindi medium with expert faculty. Students will develop strong foundations through problem-solving, practice tests, and structured study materials designed specifically for Hindi-medium aspirants.",
        "curriculum": [
          {
            "_id": "64c8b4ae188aa67dd4093483",
            "title": "Physics",
            "order": 1,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093484",
                "title": "Demo Lecture By Akhil Goyal Sir",
                "type": "video",
                "duration": "60min",
                "order": 1,
                "isFreePreview": true,
                "contentUrl": "https://example.com/physics_demo.mp4",
                "id": "64c8b4ae188aa67dd4093484"
              }
            ],
            "id": "64c8b4ae188aa67dd4093483"
          },
          {
            "_id": "64c8b4ae188aa67dd4093485",
            "title": "Chemistry",
            "order": 2,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093486",
                "title": "Demo Lecture By Ajay Kumar Sir",
                "type": "video",
                "duration": "60min",
                "order": 1,
                "isFreePreview": true,
                "contentUrl": "https://example.com/chemistry_demo.mp4",
                "id": "64c8b4ae188aa67dd4093486"
              }
            ],
            "id": "64c8b4ae188aa67dd4093485"
          },
          {
            "_id": "64c8b4ae188aa67dd4093487",
            "title": "Biology",
            "order": 3,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093488",
                "title": "Demo Lecture By Dr. Priyanka Mishra Ma'am",
                "type": "video",
                "duration": "60min",
                "order": 1,
                "isFreePreview": true,
                "contentUrl": "https://example.com/biology_demo.mp4",
                "id": "64c8b4ae188aa67dd4093488"
              }
            ],
            "id": "64c8b4ae188aa67dd4093487"
          }
        ],
        "studentsEnrolledCount": 2500,
        "lastUpdated": "2025-07-12",
        "language": "english",
        "certificateAvailable": false,
        "highlights": [
          "Live Lectures by top faculties",
          "DPPs with Video Solution",
          "Regular Test with Discussion",
          "24*7 Doubt Support",
          "PDF & Handwritten Notes"
        ],
        "providerInfo": {
          "name": "Physics Wallah PVT LTD",
          "verified": true,
          "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvmNCtUxGTpR8gFKlx_lWZyT0-2LIb8Om63g&s",
          "description": "A leading coaching institute for NEET preparation in Hindi medium, committed to delivering high-impact learning experiences.",
          "websiteUrl": "https://www.pw.live",
          "type": "Coaching Institute"
        },
        "tags": [
          "neet",
          "class-11",
          "hindi-medium",
          "medical-entrance"
        ],
        "approvalStatus": "approved",
        "moneyBackGuaranteeDays": 15,
        "freeTrialAvailable": true,
        "demoVideoUrl": "https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/90d34f56-3ab4-487f-8144-6103bb2b5471.png",
        "downloadableMaterialsDescription": "Includes PDF Notes, DPPs with Video Solutions in Hindi, and Handwritten Notes",
        "detailedScheduleDescription": "Course Duration: 22 July 2025 - 05 February 2026. Schedule: 2 Classes/per day, Classes will be held for 6 days/per week.",
        "id": "64c8b4ae188aa67dd4093482",
        "seller": {
          "name": "Physics Wallah PVT LTD",
          "avatarUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvmNCtUxGTpR8gFKlx_lWZyT0-2LIb8Om63g&s",
          "verified": true,
          "type": "Coaching Institute",
          "description": "A leading coaching institute for NEET preparation in Hindi medium, committed to delivering high-impact learning experiences."
        }
      },
      
      {
        "_id": "64c8b4ae188aa67dd4093503",
        "title": "Yakeen NEET English 2026",
        "instructor": "PW Faculty",
        "rating": 4.6,
        "reviewsCount": 150,
        "price": 4299,
        "originalPrice": 5000,
        "category": "NEET",
        "imageUrl": "https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/64f99424-12fd-469f-8ce1-f968fe85d737.png",
        "shortDescription": "Comprehensive NEET preparation program for dropper students in English by PW Faculty",
        "duration": "11 months total",
        "level": "Advanced",
        "description": "Explore NEET preparation in English with PW Faculty. This comprehensive dropper program covers the complete NEET syllabus through expert-led lectures, problem-solving sessions, and advanced study materials. Designed specifically for dropper students, the course provides structured preparation with regular tests and doubt resolution.",
        "curriculum": [
          {
            "_id": "64c8b4ae188aa67dd4093504",
            "title": "Physics",
            "order": 1,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093505",
                "title": "Demo Lecture By Subrat Sharma Sir",
                "type": "video",
                "duration": "60min",
                "order": 1,
                "isFreePreview": true,
                "contentUrl": "https://example.com/physics_demo.mp4",
                "id": "64c8b4ae188aa67dd4093505"
              },
              {
                "_id": "64c8b4ae188aa67dd4093506",
                "title": "Mechanics - Introduction",
                "type": "video",
                "duration": "45min",
                "order": 2,
                "contentUrl": "https://example.com/mechanics_intro.mp4",
                "id": "64c8b4ae188aa67dd4093506"
              }
            ],
            "id": "64c8b4ae188aa67dd4093504"
          },
          {
            "_id": "64c8b4ae188aa67dd4093507",
            "title": "Chemistry",
            "order": 2,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093508",
                "title": "Demo Lecture By Keshav Jaju Sir",
                "type": "video",
                "duration": "60min",
                "order": 1,
                "isFreePreview": true,
                "contentUrl": "https://example.com/chemistry_demo.mp4",
                "id": "64c8b4ae188aa67dd4093508"
              },
              {
                "_id": "64c8b4ae188aa67dd4093509",
                "title": "Organic Chemistry - Basics",
                "type": "video",
                "duration": "50min",
                "order": 2,
                "contentUrl": "https://example.com/organic_basics.mp4",
                "id": "64c8b4ae188aa67dd4093509"
              }
            ],
            "id": "64c8b4ae188aa67dd4093507"
          },
          {
            "_id": "64c8b4ae188aa67dd4093510",
            "title": "Biology",
            "order": 3,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093511",
                "title": "Demo Lecture By Shalini Somashekar Ma'am",
                "type": "video",
                "duration": "60min",
                "order": 1,
                "isFreePreview": true,
                "contentUrl": "https://example.com/botany_demo.mp4",
                "id": "64c8b4ae188aa67dd4093511"
              },
              {
                "_id": "64c8b4ae188aa67dd4093512",
                "title": "Demo Lecture By Vindhya Rao Ma'am",
                "type": "video",
                "duration": "60min",
                "order": 2,
                "isFreePreview": true,
                "contentUrl": "https://example.com/zoology_demo.mp4",
                "id": "64c8b4ae188aa67dd4093512"
              },
              {
                "_id": "64c8b4ae188aa67dd4093513",
                "title": "Cell Biology - Fundamentals",
                "type": "video",
                "duration": "55min",
                "order": 3,
                "contentUrl": "https://example.com/cell_biology.mp4",
                "id": "64c8b4ae188aa67dd4093513"
              }
            ],
            "id": "64c8b4ae188aa67dd4093510"
          },
          {
            "_id": "64c8b4ae188aa67dd4093514",
            "title": "Study Techniques",
            "order": 4,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093515",
                "title": "How to Ask Relevant Doubts",
                "type": "video",
                "duration": "15min",
                "order": 1,
                "contentUrl": "https://example.com/doubt_solving.mp4",
                "id": "64c8b4ae188aa67dd4093515"
              },
              {
                "_id": "64c8b4ae188aa67dd4093516",
                "title": "How to Give Tests",
                "type": "video",
                "duration": "20min",
                "order": 2,
                "contentUrl": "https://example.com/test_guidance.mp4",
                "id": "64c8b4ae188aa67dd4093516"
              }
            ],
            "id": "64c8b4ae188aa67dd4093514"
          }
        ],
        "studentsEnrolledCount": 1800,
        "lastUpdated": "2025-06-09T00:00:00.000Z",
        "language": "English",
        "certificateAvailable": false,
        "highlights": [
          "600+ Classes",
          "DPPs and Tests",
          "Community Support",
          "Access to 5000+ videos (Infinity version)",
          "Free access to all upcoming NEET test series"
        ],
        "providerInfo": {
          "name": "Physics Wallah PVT LTD",
          "verified": true,
          "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvmNCtUxGTpR8gFKlx_lWZyT0-2LIb8Om63g&s",
          "description": "A leading coaching institute for NEET preparation, committed to delivering high-impact learning experiences.",
          "websiteUrl": "https://www.pw.live",
          "type": "Coaching Institute"
        },
        "tags": [
          "neet",
          "dropper-batch",
          "medical-entrance",
          "english-medium"
        ],
        "approvalStatus": "approved",
        "moneyBackGuaranteeDays": 15,
        "freeTrialAvailable": true,
        "demoVideoUrl": "https://d2bps9p1kiy4ka.cloudfront.net/5eb393ee95fab7468a79d189/b2771f29-9725-4cb0-ad0a-86d565aa6abf.png",
        "downloadableMaterialsDescription": "Includes PDF Notes, DPPs with solutions, and test papers",
        "detailedScheduleDescription": "Course Duration: 16 June 2025 - 12 March 2026. Schedule: 3 Classes/per day, Classes will be held for 6 days/per week.",
        "id": "64c8b4ae188aa67dd4093503"
      },
      {
        "_id": "64c8b4ae188aa67dd4093489",
        "title": "Lakshya NEET 2.0 2026",
        "instructor": "PW Faculty",
        "sellerId": "64c8b4ae188aa67dd4093460",
        "rating": 4.6,
        "reviewsCount": 250,
        "price": 4699,
        "originalPrice": 5300,
        "category": "NEET",
        "imageUrl": "https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/c2c0958f-84fe-449a-978c-da648d32ff99.jpg",
        "shortDescription": "Comprehensive NEET preparation program for Class 12 students by PW Faculty",
        "duration": "12 months total",
        "level": "Advanced",
        "description": "Explore NEET preparation for Class 12 with PW Faculty. This comprehensive program covers the complete Class 12 syllabus through expert-led lectures, problem-solving sessions, and advanced study materials. Designed specifically for NEET aspirants, the course provides structured preparation with regular tests and doubt resolution.",
        "curriculum": [
          {
            "_id": "64c8b4ae188aa67dd4093490",
            "title": "Physics",
            "order": 1,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093491",
                "title": "Demo Lecture By Abhishek Verma Sir",
                "type": "video",
                "duration": "60min",
                "order": 1,
                "isFreePreview": true,
                "contentUrl": "https://example.com/physics_demo.mp4",
                "id": "64c8b4ae188aa67dd4093491"
              },
              {
                "_id": "64c8b4ae188aa67dd4093492",
                "title": "Electrostatics - Introduction",
                "type": "video",
                "duration": "45min",
                "order": 2,
                "contentUrl": "https://example.com/electrostatics_intro.mp4",
                "id": "64c8b4ae188aa67dd4093492"
              }
            ],
            "id": "64c8b4ae188aa67dd4093490"
          },
          {
            "_id": "64c8b4ae188aa67dd4093493",
            "title": "Chemistry",
            "order": 2,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093494",
                "title": "Demo Lecture By Amit Mahajan Sir",
                "type": "video",
                "duration": "60min",
                "order": 1,
                "isFreePreview": true,
                "contentUrl": "https://example.com/chemistry_demo.mp4",
                "id": "64c8b4ae188aa67dd4093494"
              },
              {
                "_id": "64c8b4ae188aa67dd4093495",
                "title": "Organic Chemistry - Basics",
                "type": "video",
                "duration": "50min",
                "order": 2,
                "contentUrl": "https://example.com/organic_basics.mp4",
                "id": "64c8b4ae188aa67dd4093495"
              },
              {
                "_id": "64c8b4ae188aa67dd4093496",
                "title": "Inorganic Chemistry - Periodic Table",
                "type": "video",
                "duration": "55min",
                "order": 3,
                "contentUrl": "https://example.com/periodic_table.mp4",
                "id": "64c8b4ae188aa67dd4093496"
              }
            ],
            "id": "64c8b4ae188aa67dd4093493"
          },
          {
            "_id": "64c8b4ae188aa67dd4093497",
            "title": "Biology",
            "order": 3,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093498",
                "title": "Demo Lecture By Vipin Sharma Sir",
                "type": "video",
                "duration": "60min",
                "order": 1,
                "isFreePreview": true,
                "contentUrl": "https://example.com/botany_demo.mp4",
                "id": "64c8b4ae188aa67dd4093498"
              },
              {
                "_id": "64c8b4ae188aa67dd4093499",
                "title": "Demo Lecture By Sujeet Tripathi Sir",
                "type": "video",
                "duration": "60min",
                "order": 2,
                "isFreePreview": true,
                "contentUrl": "https://example.com/zoology_demo.mp4",
                "id": "64c8b4ae188aa67dd4093499"
              },
              {
                "_id": "64c8b4ae188aa67dd4093500",
                "title": "Genetics - Fundamentals",
                "type": "video",
                "duration": "65min",
                "order": 3,
                "contentUrl": "https://example.com/genetics_fundamentals.mp4",
                "id": "64c8b4ae188aa67dd4093500"
              }
            ],
            "id": "64c8b4ae188aa67dd4093497"
          },
          {
            "_id": "64c8b4ae188aa67dd4093501",
            "title": "Practice Tests",
            "order": 4,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093502",
                "title": "Full Syllabus Test 1",
                "type": "quiz",
                "duration": "180min",
                "order": 1,
                "contentUrl": "https://example.com/full_test_1",
                "id": "64c8b4ae188aa67dd4093502"
              }
            ],
            "id": "64c8b4ae188aa67dd4093501"
          }
        ],
        "studentsEnrolledCount": 2000,
        "lastUpdated": "2025-06-09",
        "language": "english",
        "certificateAvailable": false,
        "highlights": [
          "Live Lectures by top faculties",
          "DPPs with Video Solutions",
          "Regular Test & AITS",
          "24*7 Doubt Support",
          "Class notes & Handwritten Notes",
          "Access to 7000+ videos"
        ],
        "providerInfo": {
          "name": "Physics Wallah PVT LTD",
          "verified": true,
          "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvmNCtUxGTpR8gFKlx_lWZyT0-2LIb8Om63g&s",
          "description": "A leading coaching institute for NEET preparation, committed to delivering high-impact learning experiences.",
          "websiteUrl": "https://www.pw.live",
          "type": "Coaching Institute"
        },
        "tags": [
          "neet",
          "class-12",
          "medical-entrance",
          "advanced"
        ],
        "approvalStatus": "approved",
        "moneyBackGuaranteeDays": 15,
        "freeTrialAvailable": true,
        "demoVideoUrl": "https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/f164546e-eb36-433a-8d2e-d77f4d2f8fed.png",
        "downloadableMaterialsDescription": "Includes PDF Notes, DPPs with Video Solutions, and Handwritten Notes",
        "detailedScheduleDescription": "Course Duration: 09 June 2025 - 14 Dec 2025. Schedule: 2 Classes/per day, Classes will be held for 6 days/per week.",
        "id": "64c8b4ae188aa67dd4093489",
        "seller": {
          "name": "Physics Wallah PVT LTD",
          "avatarUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvmNCtUxGTpR8gFKlx_lWZyT0-2LIb8Om63g&s",
          "verified": true,
          "type": "Coaching Institute",
          "description": "A leading coaching institute for NEET preparation, committed to delivering high-impact learning experiences."
        }
      },
      {
        "_id": "64c8b4ae188aa67dd4093475",
        "title": "Yakeen NEET 3.0 2026",
        "instructor": "PW Faculty",
        "rating": 4.5,
        "reviewsCount": 350,
        "price": 4800,
        "originalPrice": 5200,
        "category": "NEET",
        "imageUrl": "https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/7a515ce1-0711-4707-8de5-b0c02c151b19.png",
        "shortDescription": "Comprehensive NEET preparation program for dropper students by PW Faculty",
        "duration": "11 months total",
        "level": "Advanced",
        "description": "Explore advanced topics in NEET preparation with PW Faculty. This comprehensive program covers everything from core principles to specialized applications. You will engage with complex problem-solving, practice tests, and advanced study materials. This course is designed for dropper students aiming to crack NEET. We provide extensive resources, expert mentorship, and a collaborative learning environment.",
        "curriculum": [
          {
            "_id": "64c8b4ae188aa67dd4093476",
            "title": "Physics",
            "order": 1,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093477",
                "title": "Demo Lecture By Tanuj Bansal Sir",
                "type": "video",
                "duration": "60min",
                "order": 1,
                "isFreePreview": true,
                "contentUrl": "https://example.com/physics_demo.mp4",
                "id": "64c8b4ae188aa67dd4093477"
              }
            ],
            "id": "64c8b4ae188aa67dd4093476"
          },
          {
            "_id": "64c8b4ae188aa67dd4093478",
            "title": "Chemistry",
            "order": 2,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093479",
                "title": "Demo Lecture By Amit Mahajan Sir",
                "type": "video",
                "duration": "60min",
                "order": 1,
                "isFreePreview": true,
                "contentUrl": "https://example.com/chemistry_demo.mp4",
                "id": "64c8b4ae188aa67dd4093479"
              }
            ],
            "id": "64c8b4ae188aa67dd4093478"
          },
          {
            "_id": "64c8b4ae188aa67dd4093480",
            "title": "Biology",
            "order": 3,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093481",
                "title": "Demo Lecture By Dr. Akanksha Agarwal Ma'am",
                "type": "video",
                "duration": "60min",
                "order": 1,
                "isFreePreview": true,
                "contentUrl": "https://example.com/biology_demo.mp4",
                "id": "64c8b4ae188aa67dd4093481"
              }
            ],
            "id": "64c8b4ae188aa67dd4093480"
          }
        ],
        "lastUpdated": "2025-07-14T00:00:00.000Z",
        "language": "English",
        "certificateAvailable": false,
        "highlights": [
          "Live Lectures by top faculties",
          "DPPs with Video Solution",
          "Regular Test & AITS",
          "24*7 Doubt Support",
          "Class notes & Handwritten Notes"
        ],
        "providerInfo": {
          "name": "Physics Wallah PVT LTD",
          "verified": true,
          "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvmNCtUxGTpR8gFKlx_lWZyT0-2LIb8Om63g&s",
          "description": "A leading coaching institute for NEET preparation, committed to delivering high-impact learning experiences.",
          "websiteUrl": "https://www.pw.live",
          "type": "Coaching Institute"
        },
        "tags": [
          "neet",
          "advanced",
          "dropper-batch",
          "medical-entrance"
        ],
        "approvalStatus": "approved",
        "moneyBackGuaranteeDays": 15,
        "freeTrialAvailable": true,
        "demoVideoUrl": "https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/86b59e00-aa88-40f8-b5f2-cea51408a0ea.png",
        "downloadableMaterialsDescription": "Includes PDF Notes, DPPs with Video Solutions, and Handwritten Notes",
        "detailedScheduleDescription": "Course Duration: 14 July 2025 - 10 March 2026. Schedule: 3 Classes/per day, Classes will be held for 6 days/per week.",
        "studentsEnrolledCount": 5500,
        "id": "64c8b4ae188aa67dd4093475"
      }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <section className="py-12 px-6 bg-[--bg-dark] section-divider">
          <div className="container">
            <motion.h2
              className="text-3xl md:text-3xl font-bold mb-8 text-center text-[--text-light] fade-in-up text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Best Selling NEET Courses
            </motion.h2>
            
            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
              {courses.slice(0, 4).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
            
            {/* Mobile Horizontal Scroll */}
            <div className="md:hidden px-2">
              <div 
                className="flex -mx-14 px-1 gap-3 overflow-x-auto pb-4" 
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
                
                {courses.slice(0, 4).map((course) => (
                  <div 
                    key={course.id} 
                    className="flex-shrink-0"
                    style={{
                      width: 'calc(48vw - 24px)', // 2 cards visible with proper spacing
                      minWidth: '160px', // Minimum width for readability
                      maxWidth: '180px'  // Maximum width to ensure 2.3 cards are visible
                    }}
                  >
                    <CourseCard course={course} isMobile={true} />
                  </div>
                ))}
                
                {/* Spacer to ensure last card can be fully scrolled into view */}
                <div className="w-4 flex-shrink-0"></div>
              </div>
            </div>
            
            {/* Show All Button - visible on both desktop and mobile */}
            {/* <div className="text-center mt-8">
              <Link href="/courses?category=iit-jee&category=neet&page=1" passHref>
                <Button
                  asChild
                  className="bg-[--primary-blue] text-[--text-light] px-8 py-3 rounded-full font-semibold hover:bg-[#5593f7] transition-colors"
                >
                  <span>Show All</span>
                </Button>
              </Link>
            </div> */}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}