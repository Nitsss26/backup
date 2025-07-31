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
        "_id": "64c8b4ae188aa67dd4093633",
        "title": "Data Science With Generative AI Course",
        "instructor": "PW Skills Faculty",
        "sellerId": "6845b4ad188aa67dd4093431",
        "rating": 4.5,
        "reviewsCount": 500,
        "price": 6999,
        "originalPrice": 9999,
        "category": "Computer Science",
        "imageUrl": "https://cdn.pwskills.com/assets/uploads/course-thumbnail/2f3b0a27-bcad-44aa-9edb-b06bf9fbda9f.jpeg",
        "shortDescription": "Become a Certified Data Scientist with PW Skills and harness the power of Machine learning, NLP and Generative AI",
        "duration": "6 months total",
        "level": "Intermediate",
        "description": "Comprehensive Data Science program covering Python, Machine Learning, Deep Learning, NLP and Generative AI through expert-led lectures and hands-on projects. Learn industry-relevant skills that can help you build a career in data science.",
        "curriculum": [
          {
            "_id": "64c8b4ae188aa67dd4093634",
            "title": "Python Fundamentals",
            "order": 1,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093635",
                "title": "Introduction to Python",
                "type": "video",
                "duration": "60min",
                "order": 1,
                "isFreePreview": true,
                "contentUrl": "https://example.com/python_intro.mp4",
                "id": "64c8b4ae188aa67dd4093635"
              },
              {
                "_id": "64c8b4ae188aa67dd4093636",
                "title": "Python Objects, Number & Booleans, Strings",
                "type": "video",
                "duration": "60min",
                "order": 2,
                "contentUrl": "https://example.com/python_objects.mp4",
                "id": "64c8b4ae188aa67dd4093636"
              }
            ],
            "id": "64c8b4ae188aa67dd4093634"
          },
          {
            "_id": "64c8b4ae188aa67dd4093637",
            "title": "Machine Learning",
            "order": 2,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093638",
                "title": "Introduction to Machine Learning",
                "type": "video",
                "duration": "60min",
                "order": 1,
                "contentUrl": "https://example.com/ml_intro.mp4",
                "id": "64c8b4ae188aa67dd4093638"
              }
            ],
            "id": "64c8b4ae188aa67dd4093637"
          },
          {
            "_id": "64c8b4ae188aa67dd4093639",
            "title": "Generative AI",
            "order": 3,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093640",
                "title": "Introduction to Generative AI",
                "type": "video",
                "duration": "60min",
                "order": 1,
                "contentUrl": "https://example.com/genai_intro.mp4",
                "id": "64c8b4ae188aa67dd4093640"
              }
            ],
            "id": "64c8b4ae188aa67dd4093639"
          }
        ],
        "studentsEnrolledCount": 3000,
        "lastUpdated": "2025-07-01",
        "language": "English",
        "certificateAvailable": true,
        "highlights": [
          "Industry-Oriented Curriculum",
          "Capstone Project",
          "Career Guidance",
          "Weekend Live Sessions",
          "Practice Exercises"
        ],
        "providerInfo": {
          "name": "PW Skills PVT LTD",
          "verified": true,
          "sellerId": "6845b4ad188aa67dd4093431",
          "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvmNCtUxGTpR8gFKlx_lWZyT0-2LIb8Om63g&s",
          "description": "A leading platform for tech upskilling, committed to delivering industry-relevant learning experiences.",
          "websiteUrl": "https://www.pwskills.com",
          "type": "EdTech Platform"
        },
        "tags": [
          "data-science",
          "machine-learning",
          "generative-ai",
          "python",
          "nlp"
        ],
        "approvalStatus": "approved",
        "moneyBackGuaranteeDays": 15,
        "freeTrialAvailable": true,
        "demoVideoUrl": "",
        "downloadableMaterialsDescription": "Includes Projects, Practice Exercises, and Study Materials",
        "detailedScheduleDescription": "Course Duration: 25th July 2025 - 25th January 2026. Weekend Live Sessions. Delivery Mode: Live + Recorded.",
        "id": "64c8b4ae188aa67dd4093633",
        "seller": {
          "name": "PW Skills PVT LTD",
          "avatarUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvmNCtUxGTpR8gFKlx_lWZyT0-2LIb8Om63g&s",
          "verified": true,
          "type": "EdTech Platform",
          "description": "A leading platform for tech upskilling, committed to delivering industry-relevant learning experiences."
        }
      },
      {
        "_id": "64c8b4ae188aa67dd4093641",
        "title": "Data Science With Generative AI- Hinglish",
        "instructor": "PW Skills Faculty",
        "sellerId": "6845b4ad188aa67dd4093431",
        "rating": 4.1,
        "reviewsCount": 210,
        "price": 15000,
        "originalPrice": 20000,
        "category": "Computer Science",
        "imageUrl": "https://cdn.pwskills.com/assets/uploads/course-thumbnail/b1f9f984-cc51-4302-af24-94472911575c.jpeg",
        "shortDescription": "Become a Certified Data Scientist with PW Skills and harness the power of Machine learning, NLP and Generative AI",
        "duration": "6 months total",
        "level": "Intermediate",
        "description": "Comprehensive Data Science program in Hinglish covering Python, Machine Learning, Deep Learning, NLP and Generative AI through expert-led lectures and hands-on projects. Learn industry-relevant skills that can help you build a career in data science.",
        "curriculum": [
          {
            "_id": "64c8b4ae188aa67dd4093642",
            "title": "Python Basics",
            "order": 1,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093643",
                "title": "Introduction to Python",
                "type": "video",
                "duration": "60min",
                "order": 1,
                "isFreePreview": true,
                "contentUrl": "https://example.com/python_intro_hinglish.mp4",
                "id": "64c8b4ae188aa67dd4093643"
              },
              {
                "_id": "64c8b4ae188aa67dd4093644",
                "title": "Python Objects, Number & Booleans, Strings",
                "type": "video",
                "duration": "60min",
                "order": 2,
                "contentUrl": "https://example.com/python_objects_hinglish.mp4",
                "id": "64c8b4ae188aa67dd4093644"
              }
            ],
            "id": "64c8b4ae188aa67dd4093642"
          },
          {
            "_id": "64c8b4ae188aa67dd4093645",
            "title": "Data Types & Functions",
            "order": 2,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093646",
                "title": "Container Objects, Mutability Of Objects",
                "type": "video",
                "duration": "60min",
                "order": 1,
                "contentUrl": "https://example.com/container_objects_hinglish.mp4",
                "id": "64c8b4ae188aa67dd4093646"
              },
              {
                "_id": "64c8b4ae188aa67dd4093647",
                "title": "Operators",
                "type": "video",
                "duration": "60min",
                "order": 2,
                "contentUrl": "https://example.com/operators_hinglish.mp4",
                "id": "64c8b4ae188aa67dd4093647"
              }
            ],
            "id": "64c8b4ae188aa67dd4093645"
          },
          {
            "_id": "64c8b4ae188aa67dd4093648",
            "title": "Generative AI Projects",
            "order": 3,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093649",
                "title": "GeneAi - An Alexa Like Assistant",
                "type": "project",
                "duration": "120min",
                "order": 1,
                "contentUrl": "https://example.com/geneai_project_hinglish.pdf",
                "id": "64c8b4ae188aa67dd4093649"
              },
              {
                "_id": "64c8b4ae188aa67dd4093650",
                "title": "Customised Chat Bot",
                "type": "project",
                "duration": "120min",
                "order": 2,
                "contentUrl": "https://example.com/chatbot_project_hinglish.pdf",
                "id": "64c8b4ae188aa67dd4093650"
              }
            ],
            "id": "64c8b4ae188aa67dd4093648"
          }
        ],
        "studentsEnrolledCount": 3000,
        "lastUpdated": "2025-07-01",
        "language": "English",
        "certificateAvailable": true,
        "highlights": [
          "Comprehensive Learning Content",
          "Practice Sessions",
          "Live Doubt Resolution Sessions",
          "Industry Oriented Curriculum",
          "Capstone Projects",
          "Assignments and Projects"
        ],
        "providerInfo": {
          "name": "PW Skills PVT LTD",
          "verified": true,
          "sellerId": "6845b4ad188aa67dd4093431",
          "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvmNCtUxGTpR8gFKlx_lWZyT0-2LIb8Om63g&s",
          "description": "A leading platform for tech upskilling, committed to delivering industry-relevant learning experiences in Hinglish.",
          "websiteUrl": "https://www.pwskills.com",
          "type": "EdTech Platform"
        },
        "tags": [
          "data-science",
          "machine-learning",
          "generative-ai",
          "python",
          "hinglish"
        ],
        "approvalStatus": "approved",
        "moneyBackGuaranteeDays": 0,
        "freeTrialAvailable": true,
        "demoVideoUrl": "",
        "downloadableMaterialsDescription": "Includes Projects, Practice Exercises, and Study Materials in Hinglish",
        "detailedScheduleDescription": "Course Duration: 6 months. Delivery Mode: Recorded with Live Doubt Sessions. Daily doubt sessions from 4PM to 10PM.",
        "id": "64c8b4ae188aa67dd4093641",
        "seller": {
          "name": "PW Skills PVT LTD",
          "avatarUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvmNCtUxGTpR8gFKlx_lWZyT0-2LIb8Om63g&s",
          "verified": true,
          "type": "EdTech Platform",
          "description": "A leading platform for tech upskilling, committed to delivering industry-relevant learning experiences in Hinglish."
        }
      },
      {
        "_id": "64c8b4ae188aa67dd4093651",
        "title": "Data Analytics with Gen AI (Offline Batch)",
        "instructor": "PW Skills Faculty",
        "sellerId": "6845b4ad188aa67dd4093431",
        "rating": 4.6,
        "reviewsCount": 420,
        "price": 45000,
        "originalPrice": 50000,
        "category": "Computer Science",
        "imageUrl": "https://cdn.pwskills.com/assets/uploads/course-thumbnail/e48fe46d-f20e-4814-b165-f7948fc9de99.jpeg",
        "shortDescription": "Dive into the world of Data Analytics and unlock the potential of tools like Excel, SQL, Python, PowerBI in offline classrooms",
        "duration": "6 months total",
        "level": "Intermediate",
        "description": "Comprehensive offline Data Analytics program covering Python, SQL, PowerBI, Tableau and Generative AI through expert-led classroom sessions. Available in Lucknow, Noida, Indore, Patna and Pune. Earn dual certification from PW Skills & PwC.",
        "curriculum": [
          {
            "_id": "64c8b4ae188aa67dd4093652",
            "title": "Introduction to Python and Data Structures",
            "order": 1,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093653",
                "title": "Introduction and Welcome to the Program",
                "type": "video",
                "duration": "60min",
                "order": 1,
                "isFreePreview": true,
                "contentUrl": "https://example.com/intro_offline.mp4",
                "id": "64c8b4ae188aa67dd4093653"
              },
              {
                "_id": "64c8b4ae188aa67dd4093654",
                "title": "Intro to Data Analyst Industry and Career Growth",
                "type": "video",
                "duration": "60min",
                "order": 2,
                "contentUrl": "https://example.com/industry_overview.mp4",
                "id": "64c8b4ae188aa67dd4093654"
              }
            ],
            "id": "64c8b4ae188aa67dd4093652"
          },
          {
            "_id": "64c8b4ae188aa67dd4093655",
            "title": "Python Fundamentals",
            "order": 2,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093656",
                "title": "Python Fundamentals",
                "type": "video",
                "duration": "90min",
                "order": 1,
                "contentUrl": "https://example.com/python_fundamentals.mp4",
                "id": "64c8b4ae188aa67dd4093656"
              },
              {
                "_id": "64c8b4ae188aa67dd4093657",
                "title": "Introduction to Python Data Structures",
                "type": "video",
                "duration": "90min",
                "order": 2,
                "contentUrl": "https://example.com/data_structures.mp4",
                "id": "64c8b4ae188aa67dd4093657"
              }
            ],
            "id": "64c8b4ae188aa67dd4093655"
          },
          {
            "_id": "64c8b4ae188aa67dd4093658",
            "title": "Projects",
            "order": 3,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093659",
                "title": "Sales & Marketing Analytics Dashboards",
                "type": "project",
                "duration": "240min",
                "order": 1,
                "contentUrl": "https://example.com/sales_dashboard.pdf",
                "id": "64c8b4ae188aa67dd4093659"
              },
              {
                "_id": "64c8b4ae188aa67dd4093660",
                "title": "Healthcare Insights Visualization",
                "type": "project",
                "duration": "240min",
                "order": 2,
                "contentUrl": "https://example.com/healthcare_project.pdf",
                "id": "64c8b4ae188aa67dd4093660"
              }
            ],
            "id": "64c8b4ae188aa67dd4093658"
          }
        ],
        "studentsEnrolledCount": 500,
        "lastUpdated": "2025-07-15",
        "language": "English",
        "certificateAvailable": true,
        "highlights": [
          "Industry-Oriented Curriculum",
          "Classroom-Based Learning",
          "Dual Certification (PW Skills & PwC)",
          "Capstone Project",
          "Career Guidance & Interview Preparation",
          "Real-World Projects"
        ],
        "providerInfo": {
          "name": "PW Skills PVT LTD",
          "verified": true,
          "sellerId": "6845b4ad188aa67dd4093431",
          "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvmNCtUxGTpR8gFKlx_lWZyT0-2LIb8Om63g&s",
          "description": "A leading platform for tech upskilling, offering industry-relevant offline and online courses.",
          "websiteUrl": "https://www.pwskills.com",
          "type": "EdTech Platform"
        },
        "tags": [
          "data-analytics",
          "offline-course",
          "python",
          "powerbi",
          "sql",
          "tableau"
        ],
        "approvalStatus": "approved",
        "moneyBackGuaranteeDays": 7,
        "freeTrialAvailable": false,
        "demoVideoUrl": "",
        "downloadableMaterialsDescription": "Includes Projects, Practice Exercises, and Study Materials",
        "detailedScheduleDescription": "Course Duration: 6 months. Delivery Mode: Offline classes in Lucknow, Noida, Indore, Patna and Pune. Cohort-2 Admission closing on 21st July.",
        "locations": [
          "Lucknow",
          "Noida",
          "Indore",
          "Patna",
          "Pune"
        ],
        "id": "64c8b4ae188aa67dd4093651",
        "seller": {
          "name": "PW Skills PVT LTD",
          "avatarUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvmNCtUxGTpR8gFKlx_lWZyT0-2LIb8Om63g&s",
          "verified": true,
          "type": "EdTech Platform",
          "description": "A leading platform for tech upskilling, offering industry-relevant offline and online courses."
        }
      },
      {
        "_id": "64c8b4ae188aa67dd4093661",
        "title": "Data Analytics Course",
        "instructor": "PW Skills Faculty",
        "sellerId": "6845b4ad188aa67dd4093431",
        "rating": 4.6,
        "reviewsCount": 420,
        "price": 6999,
        "originalPrice": 10000,
        "category": "Computer Science",
        "imageUrl": "https://cdn.pwskills.com/assets/uploads/course-thumbnail/30bfa426-e3bd-4db5-8d41-42f94877e3dd.jpeg",
        "shortDescription": "Dive into the world of Data Analytics and unlock the potential of tools like Excel, SQL, Python, PowerBI, and more",
        "duration": "6 months total",
        "level": "Intermediate",
        "description": "Comprehensive Data Analytics program covering Python, SQL, PowerBI, Tableau and AWS through expert-led lectures and hands-on projects. Learn industry-relevant techniques to analyze data and make data-driven decisions.",
        "curriculum": [
          {
            "_id": "64c8b4ae188aa67dd4093662",
            "title": "Python Fundamentals",
            "order": 1,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093663",
                "title": "Introduction to Python",
                "type": "video",
                "duration": "60min",
                "order": 1,
                "isFreePreview": true,
                "contentUrl": "https://example.com/python_intro_da.mp4",
                "id": "64c8b4ae188aa67dd4093663"
              },
              {
                "_id": "64c8b4ae188aa67dd4093664",
                "title": "Python Objects, Number & Booleans, Strings",
                "type": "video",
                "duration": "60min",
                "order": 2,
                "contentUrl": "https://example.com/python_objects_da.mp4",
                "id": "64c8b4ae188aa67dd4093664"
              }
            ],
            "id": "64c8b4ae188aa67dd4093662"
          },
          {
            "_id": "64c8b4ae188aa67dd4093665",
            "title": "SQL and Databases",
            "order": 2,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093666",
                "title": "Basics of SQL",
                "type": "video",
                "duration": "60min",
                "order": 1,
                "contentUrl": "https://example.com/sql_basics.mp4",
                "id": "64c8b4ae188aa67dd4093666"
              },
              {
                "_id": "64c8b4ae188aa67dd4093667",
                "title": "Functions, joins and subqueries",
                "type": "video",
                "duration": "60min",
                "order": 2,
                "contentUrl": "https://example.com/sql_advanced.mp4",
                "id": "64c8b4ae188aa67dd4093667"
              }
            ],
            "id": "64c8b4ae188aa67dd4093665"
          },
          {
            "_id": "64c8b4ae188aa67dd4093668",
            "title": "Projects",
            "order": 3,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093669",
                "title": "Python Project - US Census Data Analysis",
                "type": "project",
                "duration": "240min",
                "order": 1,
                "contentUrl": "https://example.com/census_project.pdf",
                "id": "64c8b4ae188aa67dd4093669"
              },
              {
                "_id": "64c8b4ae188aa67dd4093670",
                "title": "SQL Project - Airport Data Analysis",
                "type": "project",
                "duration": "240min",
                "order": 2,
                "contentUrl": "https://example.com/airport_project.pdf",
                "id": "64c8b4ae188aa67dd4093670"
              }
            ],
            "id": "64c8b4ae188aa67dd4093668"
          }
        ],
        "studentsEnrolledCount": 1500,
        "lastUpdated": "2025-07-20",
        "language": "English",
        "certificateAvailable": true,
        "highlights": [
          "Industry-Oriented Curriculum",
          "Weekend Live Sessions",
          "Capstone Project",
          "Career Guidance & Interview Preparation",
          "PwC Certification",
          "Real-World Projects"
        ],
        "providerInfo": {
          "name": "PW Skills PVT LTD",
          "verified": true,
          "sellerId": "6845b4ad188aa67dd4093431",
          "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvmNCtUxGTpR8gFKlx_lWZyT0-2LIb8Om63g&s",
          "description": "A leading platform for tech upskilling, offering industry-relevant courses in data analytics and emerging technologies.",
          "websiteUrl": "https://www.pwskills.com",
          "type": "EdTech Platform"
        },
        "tags": [
          "data-analytics",
          "python",
          "sql",
          "powerbi",
          "tableau",
          "aws"
        ],
        "approvalStatus": "approved",
        "moneyBackGuaranteeDays": 15,
        "freeTrialAvailable": true,
        "demoVideoUrl": "",
        "downloadableMaterialsDescription": "Includes Projects, Practice Exercises, and Study Materials",
        "detailedScheduleDescription": "Course Duration: 6 months. Delivery Mode: Live + Recorded. Next batch starts on 25th July 2025.",
        "id": "64c8b4ae188aa67dd4093661",
        "seller": {
          "name": "PW Skills PVT LTD",
          "avatarUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvmNCtUxGTpR8gFKlx_lWZyT0-2LIb8Om63g&s",
          "verified": true,
          "type": "EdTech Platform",
          "description": "A leading platform for tech upskilling, offering industry-relevant courses in data analytics and emerging technologies."
        }
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
              Best Selling Computer Science Courses
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