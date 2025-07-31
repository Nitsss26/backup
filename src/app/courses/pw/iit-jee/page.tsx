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
      "_id": "64c8b4ae188aa67dd4093517",
      "title": "Lakshya JEE Hindi 2.0 2026",
      "instructor": "PW Faculty",
      "sellerId": "64c8b4ae188aa67dd4093460",
      "rating": 4.8,
      "reviewsCount": 450,
      "price": 2999,
      "originalPrice": 4800,
      "category": "IIT-JEE",
      "imageUrl": "https://d2bps9p1kiy4ka.cloudfront.net/5eb393ee95fab7468a79d189/cfe2f5e9-413e-4472-a80c-a7e9d0a1a1e0.png",
      "shortDescription": "Comprehensive JEE preparation program for Class 12 students in Hindi by PW Faculty",
      "duration": "12 months total",
      "level": "Advanced",
      "description": "Explore JEE preparation in Hindi with PW Faculty. This comprehensive program covers Class 12 syllabus through Hindi medium with expert faculty. Students will develop strong foundations through problem-solving, practice tests, and structured study materials designed specifically for Hindi-medium JEE aspirants.",
      "curriculum": [
        {
          "_id": "64c8b4ae188aa67dd4093518",
          "title": "Physics",
          "order": 1,
          "lessons": [
            {
              "_id": "64c8b4ae188aa67dd4093519",
              "title": "Demo Lecture By Sourabh Kumar Agrawal Sir",
              "type": "video",
              "duration": "60min",
              "order": 1,
              "isFreePreview": true,
              "contentUrl": "https://example.com/physics_demo.mp4",
              "id": "64c8b4ae188aa67dd4093519"
            },
            {
              "_id": "64c8b4ae188aa67dd4093520",
              "title": "Electrostatics - Introduction",
              "type": "video",
              "duration": "45min",
              "order": 2,
              "contentUrl": "https://example.com/electrostatics_intro.mp4",
              "id": "64c8b4ae188aa67dd4093520"
            }
          ],
          "id": "64c8b4ae188aa67dd4093518"
        },
        {
          "_id": "64c8b4ae188aa67dd4093521",
          "title": "Mathematics",
          "order": 2,
          "lessons": [
            {
              "_id": "64c8b4ae188aa67dd4093522",
              "title": "Demo Lecture By Shailendra Tomar Sir",
              "type": "video",
              "duration": "60min",
              "order": 1,
              "isFreePreview": true,
              "contentUrl": "https://example.com/maths_demo.mp4",
              "id": "64c8b4ae188aa67dd4093522"
            },
            {
              "_id": "64c8b4ae188aa67dd4093523",
              "title": "सारणिक का परिचय (Determinants Introduction)",
              "type": "video",
              "duration": "50min",
              "order": 2,
              "contentUrl": "https://example.com/determinants_intro.mp4",
              "id": "64c8b4ae188aa67dd4093523"
            },
            {
              "_id": "64c8b4ae188aa67dd4093524",
              "title": "त्रिकोणमिति (Trigonometry Basics)",
              "type": "video",
              "duration": "55min",
              "order": 3,
              "contentUrl": "https://example.com/trigonometry_basics.mp4",
              "id": "64c8b4ae188aa67dd4093524"
            }
          ],
          "id": "64c8b4ae188aa67dd4093521"
        },
        {
          "_id": "64c8b4ae188aa67dd4093525",
          "title": "Chemistry",
          "order": 3,
          "lessons": [
            {
              "_id": "64c8b4ae188aa67dd4093526",
              "title": "Demo Lecture By Keshav Jaju Sir",
              "type": "video",
              "duration": "60min",
              "order": 1,
              "isFreePreview": true,
              "contentUrl": "https://example.com/chemistry_demo.mp4",
              "id": "64c8b4ae188aa67dd4093526"
            },
            {
              "_id": "64c8b4ae188aa67dd4093527",
              "title": "Demo Lecture By Dr. Mohit Upadhyay Sir",
              "type": "video",
              "duration": "60min",
              "order": 2,
              "isFreePreview": true,
              "contentUrl": "https://example.com/chemistry_demo2.mp4",
              "id": "64c8b4ae188aa67dd4093527"
            },
            {
              "_id": "64c8b4ae188aa67dd4093528",
              "title": "Demo Lecture By Puneet Rana Sir",
              "type": "video",
              "duration": "60min",
              "order": 3,
              "isFreePreview": true,
              "contentUrl": "https://example.com/chemistry_demo3.mp4",
              "id": "64c8b4ae188aa67dd4093528"
            },
            {
              "_id": "64c8b4ae188aa67dd4093529",
              "title": "विलयन (Solutions Introduction)",
              "type": "video",
              "duration": "45min",
              "order": 4,
              "contentUrl": "https://example.com/solutions_intro.mp4",
              "id": "64c8b4ae188aa67dd4093529"
            }
          ],
          "id": "64c8b4ae188aa67dd4093525"
        },
        {
          "_id": "64c8b4ae188aa67dd4093530",
          "title": "Practice Tests",
          "order": 4,
          "lessons": [
            {
              "_id": "64c8b4ae188aa67dd4093531",
              "title": "Full Syllabus Test 1",
              "type": "quiz",
              "duration": "180min",
              "order": 1,
              "contentUrl": "https://example.com/full_test_1",
              "id": "64c8b4ae188aa67dd4093531"
            }
          ],
          "id": "64c8b4ae188aa67dd4093530"
        }
      ],
      "studentsEnrolledCount": 2000,
      "lastUpdated": "2025-07-09",
      "language": "English",
      "certificateAvailable": false,
      "highlights": [
        "Live Lectures by top faculties",
        "DPPs with Video Solution",
        "Regular Test with Discussion",
        "24*7 Doubt Support",
        "Free Access to Arjuna Hindi 2025",
        "PDF & Handwritten Notes"
      ],
      "providerInfo": {
        "name": "Physics Wallah PVT LTD",
        "verified": true,
        "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvmNCtUxGTpR8gFKlx_lWZyT0-2LIb8Om63g&s",
        "description": "A leading coaching institute for JEE preparation in Hindi medium, committed to delivering high-impact learning experiences.",
        "websiteUrl": "https://www.pw.live",
        "type": "Coaching Institute"
      },
      "tags": [
        "iit-jee",
        "class-12",
        "hindi-medium",
        "engineering-entrance"
      ],
      "approvalStatus": "approved",
      "moneyBackGuaranteeDays": 15,
      "freeTrialAvailable": true,
      "demoVideoUrl": "https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/83feca06-952a-4714-b4e6-5736fdc76029.png",
      "downloadableMaterialsDescription": "Includes PDF Notes in Hindi, DPPs with Video Solutions, and Handwritten Notes",
      "detailedScheduleDescription": "Course Duration: 09 July 2025 - 14 December 2025. Schedule: 2 Classes/per day, Classes will be held for 6 days/per week.",
      "id": "64c8b4ae188aa67dd4093517",
      "seller": {
        "name": "Physics Wallah PVT LTD",
        "avatarUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvmNCtUxGTpR8gFKlx_lWZyT0-2LIb8Om63g&s",
        "verified": true,
        "type": "Coaching Institute",
        "description": "A leading coaching institute for JEE preparation in Hindi medium, committed to delivering high-impact learning experiences."
      }
    },
    {
      "_id": "64c8b4ae188aa67dd4093561",
      "title": "Prayas JEE 2.0 2026",
      "instructor": "PW Faculty",
      "sellerId": "6845b4ad188aa67dd4093431",
      "rating": 4.2,
      "reviewsCount": 230,
      "price": 4800,
      "originalPrice": 5200,
      "category": "IIT-JEE",
      "imageUrl": "https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/9c540787-e6ae-4b31-a459-be903c6d2ace.jpg",
      "shortDescription": "Comprehensive JEE preparation program for Dropper students by PW Faculty",
      "duration": "12.5 months total",
      "level": "Advanced",
      "description": "Explore JEE preparation with PW Faculty. This comprehensive Dropper program covers Physics, Chemistry and Mathematics through expert-led lectures, problem-solving sessions, and advanced study materials. Designed specifically for JEE aspirants, the course provides structured preparation with regular tests and doubt resolution.",
      "curriculum": [
        {
          "_id": "64c8b4ae188aa67dd4093562",
          "title": "Physics",
          "order": 1,
          "lessons": [
            {
              "_id": "64c8b4ae188aa67dd4093563",
              "title": "Demo Lecture By NKC Sir",
              "type": "video",
              "duration": "60min",
              "order": 1,
              "isFreePreview": true,
              "contentUrl": "https://example.com/physics_demo_nkc.mp4",
              "id": "64c8b4ae188aa67dd4093563"
            }
          ],
          "id": "64c8b4ae188aa67dd4093562"
        },
        {
          "_id": "64c8b4ae188aa67dd4093564",
          "title": "Mathematics",
          "order": 2,
          "lessons": [
            {
              "_id": "64c8b4ae188aa67dd4093565",
              "title": "Demo Lecture By Tarun Sir",
              "type": "video",
              "duration": "60min",
              "order": 1,
              "isFreePreview": true,
              "contentUrl": "https://example.com/maths_demo_tarun.mp4",
              "id": "64c8b4ae188aa67dd4093565"
            },
            {
              "_id": "64c8b4ae188aa67dd4093566",
              "title": "Basic Mathematics 01 : Starting this Journey in Prayas || Number System",
              "type": "video",
              "duration": "60min",
              "order": 2,
              "isFreePreview": true,
              "contentUrl": "https://example.com/number_system.mp4",
              "id": "64c8b4ae188aa67dd4093566"
            },
            {
              "_id": "64c8b4ae188aa67dd4093567",
              "title": "Basic Math 01 : Quadratic Equation",
              "type": "video",
              "duration": "60min",
              "order": 3,
              "isFreePreview": true,
              "contentUrl": "https://example.com/quadratic_equation.mp4",
              "id": "64c8b4ae188aa67dd4093567"
            }
          ],
          "id": "64c8b4ae188aa67dd4093564"
        },
        {
          "_id": "64c8b4ae188aa67dd4093568",
          "title": "Chemistry",
          "order": 3,
          "lessons": [
            {
              "_id": "64c8b4ae188aa67dd4093569",
              "title": "Demo Lecture By Rahul Dudi Sir",
              "type": "video",
              "duration": "60min",
              "order": 1,
              "isFreePreview": true,
              "contentUrl": "https://example.com/chemistry_demo_rahul.mp4",
              "id": "64c8b4ae188aa67dd4093569"
            },
            {
              "_id": "64c8b4ae188aa67dd4093570",
              "title": "Demo Lecture By Pankaj Sir",
              "type": "video",
              "duration": "60min",
              "order": 2,
              "isFreePreview": true,
              "contentUrl": "https://example.com/chemistry_demo_pankaj.mp4",
              "id": "64c8b4ae188aa67dd4093570"
            },
            {
              "_id": "64c8b4ae188aa67dd4093571",
              "title": "Demo Lecture By Om Pandey Sir",
              "type": "video",
              "duration": "60min",
              "order": 3,
              "isFreePreview": true,
              "contentUrl": "https://example.com/chemistry_demo_om.mp4",
              "id": "64c8b4ae188aa67dd4093571"
            },
            {
              "_id": "64c8b4ae188aa67dd4093572",
              "title": "Mole Concept 01 : Physical Chemistry - Introduction",
              "type": "video",
              "duration": "60min",
              "order": 4,
              "isFreePreview": true,
              "contentUrl": "https://example.com/mole_concept.mp4",
              "id": "64c8b4ae188aa67dd4093572"
            }
          ],
          "id": "64c8b4ae188aa67dd4093568"
        },
        {
          "_id": "64c8b4ae188aa67dd4093573",
          "title": "Study Techniques",
          "order": 4,
          "lessons": [
            {
              "_id": "64c8b4ae188aa67dd4093574",
              "title": "Important Update: New Update in Ask Doubt",
              "type": "video",
              "duration": "20min",
              "order": 1,
              "contentUrl": "https://example.com/ask_doubt_update.mp4",
              "id": "64c8b4ae188aa67dd4093574"
            },
            {
              "_id": "64c8b4ae188aa67dd4093575",
              "title": "New Update: Study Page (Web)",
              "type": "video",
              "duration": "20min",
              "order": 2,
              "contentUrl": "https://example.com/study_page_web.mp4",
              "id": "64c8b4ae188aa67dd4093575"
            }
          ],
          "id": "64c8b4ae188aa67dd4093573"
        }
      ],
      "studentsEnrolledCount": 2000,
      "lastUpdated": "2025-05-27",
      "language": "English",
      "certificateAvailable": false,
      "highlights": [
        "Live Lectures by top faculties",
        "DPPs with Video Solution",
        "Regular Test with Discussion",
        "24*7 Doubt Support",
        "PDF & Handwritten Notes",
        "All India Test series"
      ],
      "providerInfo": {
        "name": "Physics Wallah PVT LTD",
        "verified": true,
        "sellerId": "6845b4ad188aa67dd4093431",
        "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvmNCtUxGTpR8gFKlx_lWZyT0-2LIb8Om63g&s",
        "description": "A leading coaching institute for JEE preparation, committed to delivering high-impact learning experiences.",
        "websiteUrl": "https://www.pw.live",
        "type": "Coaching Institute"
      },
      "tags": [
        "iit-jee",
        "dropper",
        "engineering-entrance",
        "advanced"
      ],
      "approvalStatus": "approved",
      "moneyBackGuaranteeDays": 15,
      "freeTrialAvailable": true,
      "demoVideoUrl": "https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/1a4a55a8-6066-4bac-a555-e3fd061f916e.png",
      "downloadableMaterialsDescription": "Includes PDF Notes, DPPs with Video Solutions, and Handwritten Notes",
      "detailedScheduleDescription": "Course Duration: 09 Jun 2025 - 10 Jan 2026. Schedule: 3 Classes/per day, Classes will be held for 6 days/per week.",
      "id": "64c8b4ae188aa67dd4093561",
      "seller": {
        "name": "Physics Wallah PVT LTD",
        "avatarUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvmNCtUxGTpR8gFKlx_lWZyT0-2LIb8Om63g&s",
        "verified": true,
        "type": "Coaching Institute",
        "description": "A leading coaching institute for JEE preparation, committed to delivering high-impact learning experiences."
      }
    },
    {      "_id": "64c8b4ae188aa67dd4093547",
        "title": "Arjuna JEE 2.0 2026",
        "instructor": "PW Faculty",
        "sellerId": "6845b4ad188aa67dd4093431",
        "rating": 4.5,
        "reviewsCount": 120,
        "price": 4900,
        "originalPrice": 5300,
        "category": "IIT-JEE",
        "imageUrl": "https://d2bps9p1kiy4ka.cloudfront.net/5eb393ee95fab7468a79d189/f26e4e16-7aa9-4a3b-b4ba-b00fdc24f5db.jpg",
        "shortDescription": "Comprehensive JEE preparation program for Class 11 students by PW Faculty",
        "duration": "25 months total",
        "level": "Advanced",
        "description": "Explore JEE preparation with PW Faculty. This comprehensive Class 11 program covers Physics, Chemistry and Mathematics through expert-led lectures, problem-solving sessions, and advanced study materials. Designed specifically for JEE aspirants, the course provides structured preparation with regular tests and doubt resolution.",
        "curriculum": [
          {
            "_id": "64c8b4ae188aa67dd4093548",
            "title": "Physics",
            "order": 1,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093549",
                "title": "Demo Lecture By Rajwant Singh Sir",
                "type": "video",
                "duration": "60min",
                "order": 1,
                "isFreePreview": true,
                "contentUrl": "https://example.com/physics_demo.mp4",
                "id": "64c8b4ae188aa67dd4093549"
              },
              {
                "_id": "64c8b4ae188aa67dd4093550",
                "title": "Units, Dimensions and Measurement - Introduction",
                "type": "video",
                "duration": "45min",
                "order": 2,
                "contentUrl": "https://example.com/units_dimensions.mp4",
                "id": "64c8b4ae188aa67dd4093550"
              }
            ],
            "id": "64c8b4ae188aa67dd4093548"
          },
          {
            "_id": "64c8b4ae188aa67dd4093551",
            "title": "Mathematics",
            "order": 2,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093552",
                "title": "Demo Lecture By Tarun Khandelwal Sir",
                "type": "video",
                "duration": "60min",
                "order": 1,
                "isFreePreview": true,
                "contentUrl": "https://example.com/maths_demo.mp4",
                "id": "64c8b4ae188aa67dd4093552"
              },
              {
                "_id": "64c8b4ae188aa67dd4093553",
                "title": "Basic Mathematics - Number System",
                "type": "video",
                "duration": "50min",
                "order": 2,
                "contentUrl": "https://example.com/number_system.mp4",
                "id": "64c8b4ae188aa67dd4093553"
              }
            ],
            "id": "64c8b4ae188aa67dd4093551"
          },
          {
            "_id": "64c8b4ae188aa67dd4093554",
            "title": "Chemistry",
            "order": 3,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093555",
                "title": "Demo Lecture By Faisal Razaq Sir",
                "type": "video",
                "duration": "60min",
                "order": 1,
                "isFreePreview": true,
                "contentUrl": "https://example.com/chemistry_demo.mp4",
                "id": "64c8b4ae188aa67dd4093555"
              },
              {
                "_id": "64c8b4ae188aa67dd4093556",
                "title": "Demo Lecture By Rohit Agarwal Sir",
                "type": "video",
                "duration": "60min",
                "order": 2,
                "isFreePreview": true,
                "contentUrl": "https://example.com/chemistry_demo2.mp4",
                "id": "64c8b4ae188aa67dd4093556"
              },
              {
                "_id": "64c8b4ae188aa67dd4093557",
                "title": "Demo Lecture By Amitabh Sharma Sir",
                "type": "video",
                "duration": "60min",
                "order": 3,
                "isFreePreview": true,
                "contentUrl": "https://example.com/chemistry_demo3.mp4",
                "id": "64c8b4ae188aa67dd4093557"
              },
              {
                "_id": "64c8b4ae188aa67dd4093558",
                "title": "Basic Concepts of Chemistry - Matter Classification",
                "type": "video",
                "duration": "55min",
                "order": 4,
                "contentUrl": "https://example.com/matter_classification.mp4",
                "id": "64c8b4ae188aa67dd4093558"
              }
            ],
            "id": "64c8b4ae188aa67dd4093554"
          },
          {
            "_id": "64c8b4ae188aa67dd4093559",
            "title": "Study Techniques",
            "order": 4,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093560",
                "title": "How to use PW Batch",
                "type": "video",
                "duration": "20min",
                "order": 1,
                "contentUrl": "https://example.com/batch_usage.mp4",
                "id": "64c8b4ae188aa67dd4093560"
              }
            ],
            "id": "64c8b4ae188aa67dd4093559"
          }
        ],
        "studentsEnrolledCount": 3000,
        "lastUpdated": "2025-05-26",
        "language": "English",
        "certificateAvailable": false,
        "highlights": [
          "Live Lectures by top faculties",
          "DPPs with Video Solution",
          "Regular Test & AITS",
          "24*7 Doubt Support",
          "Class notes & Handwritten Notes",
          "Access to 7000+ videos"
        ],
        "providerInfo": {
          "name": "Physics Wallah PVT LTD",
          "verified": true,
          "sellerId": "6845b4ad188aa67dd4093431",
          "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvmNCtUxGTpR8gFKlx_lWZyT0-2LIb8Om63g&s",
          "description": "A leading coaching institute for JEE preparation, committed to delivering high-impact learning experiences.",
          "websiteUrl": "https://www.pw.live",
          "type": "Coaching Institute"
        },
        "tags": [
          "iit-jee",
          "class-11",
          "engineering-entrance",
          "advanced"
        ],
        "approvalStatus": "approved",
        "moneyBackGuaranteeDays": 15,
        "freeTrialAvailable": true,
        "demoVideoUrl": "https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/0b3e52db-c4cc-4c10-a1c1-a5ee1ca4ac9f.png",
        "downloadableMaterialsDescription": "Includes PDF Notes, DPPs with Video Solutions, and Handwritten Notes",
        "detailedScheduleDescription": "Course Duration: 26 May 2025 - 10 February 2026. Schedule: 2 Classes/per day, Classes will be held for 6 days/per week.",
        "id": "64c8b4ae188aa67dd4093547",
        "seller": {
          "name": "Physics Wallah PVT LTD",
          "avatarUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvmNCtUxGTpR8gFKlx_lWZyT0-2LIb8Om63g&s",
          "verified": true,
          "type": "Coaching Institute",
          "description": "A leading coaching institute for JEE preparation, committed to delivering high-impact learning experiences."
        }
      },    {
        "_id": "64c8b4ae188aa67dd4093459",
        "title": "Prayas JEE 3.0 2026",
        "instructor": "PW Faculty",
        "sellerId": "64c8b4ae188aa67dd4093460",
        "rating": 4.2,
        "reviewsCount": 350,
        "price": 4200,
        "originalPrice": 4800,
        "category": "IIT-JEE",
        "imageUrl": "https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/70e31017-6636-4fff-bc57-0e7eef7bca1b.jpg",
        "shortDescription": "Comprehensive JEE preparation program for dropper students by PW Faculty",
        "duration": "11 months total",
        "level": "Advanced",
        "description": "Explore advanced topics in IIT JEE preparation with PW Faculty. This comprehensive program covers everything from core principles to specialized applications. You will engage with complex problem-solving, practice tests, and advanced study materials. This course is designed for dropper students aiming to crack JEE Advanced. We provide extensive resources, expert mentorship, and a collaborative learning environment.",
        "curriculum": [
          {
            "_id": "64c8b4ae188aa67dd4093461",
            "title": "Physics",
            "order": 1,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093462",
                "title": "Demo Lecture By Gagan Garg Sir",
                "type": "video",
                "duration": "60min",
                "order": 1,
                "isFreePreview": true,
                "contentUrl": "https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/0bd98c48-c8c7-43a3-9a0f-57a4b7c3648a.png",
                "id": "64c8b4ae188aa67dd4093462"
              }
            ],
            "id": "64c8b4ae188aa67dd4093461"
          },
          {
            "_id": "64c8b4ae188aa67dd4093463",
            "title": "Mathematics",
            "order": 2,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093464",
                "title": "Demo Lecture By Manish Kumar Suman Sir",
                "type": "video",
                "duration": "60min",
                "order": 1,
                "isFreePreview": true,
                "contentUrl": "https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/0d39dc04-6994-4cd4-a989-fdea5369f030.png",
                "id": "64c8b4ae188aa67dd4093464"
              }
            ],
            "id": "64c8b4ae188aa67dd4093463"
          },
          {
            "_id": "64c8b4ae188aa67dd4093465",
            "title": "Chemistry",
            "order": 3,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093466",
                "title": "Demo Lecture By Faisal Razaq Sir",
                "type": "video",
                "duration": "60min",
                "order": 1,
                "isFreePreview": true,
                "contentUrl": "https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/0bd98c48-c8c7-43a3-9a0f-57a4b7c3648a.png",
                "id": "64c8b4ae188aa67dd4093466"
              }
            ],
            "id": "64c8b4ae188aa67dd4093465"
          }
        ],
        "lastUpdated": "2025-07-15",
        "language": "English",
        "certificateAvailable": false,
        "highlights": [
          "Live Lectures by top faculties",
          "DPPs with Video Solution",
          "Regular Test with Discussion",
          "24*7 Doubt Support",
          "PDF & Handwritten Notes",
          "All India Test series"
        ],
        "providerInfo": {
          "name": "Physics Wallah PVT LTD",
          "verified": true,
          "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvmNCtUxGTpR8gFKlx_lWZyT0-2LIb8Om63g&s",
          "description": "A leading coaching institute for JEE preparation, committed to delivering high-impact learning experiences.",
          "websiteUrl": "https://www.pw.live",
          "type": "Coaching Institute"
        },
        "tags": [
          "iit-jee",
          "advanced",
          "dropper-batch",
          "engineering-entrance"
        ],
        "approvalStatus": "approved",
        "moneyBackGuaranteeDays": 0,
        "freeTrialAvailable": true,
        "demoVideoUrl": "https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/0bd98c48-c8c7-43a3-9a0f-57a4b7c3648a.png",
        "downloadableMaterialsDescription": "Includes PDF Notes, DPPs with Video Solutions, and Handwritten Notes",
        "detailedScheduleDescription": "Course Duration: 28th July 2025 - 15th Jan 2026. Schedule: 3 Classes/per day, Classes will be held for 6 days/per week.",
        "studentsEnrolledCount": 1500,
        "id": "64c8b4ae188aa67dd4093459",
        "seller": {
          "name": "Physics Wallah PVT LTD",
          "avatarUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvmNCtUxGTpR8gFKlx_lWZyT0-2LIb8Om63g&s",
          "verified": true,
          "type": "Coaching Institute",
          "description": "A leading coaching institute for JEE preparation, committed to delivering high-impact learning experiences."
        }
      },
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
              Best Selling IIT-JEE Courses
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