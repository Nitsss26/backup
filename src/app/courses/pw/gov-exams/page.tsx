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
        "_id": "64c8b4ae188aa67dd4093576",
        "title": "Vijay GATE 2026 Rank Improvement Batch Electronics",
        "instructor": "PW Faculty",
        "sellerId": "6845b4ad188aa67dd4093431",
        "rating": 4.2,
        "reviewsCount": 150,
        "price": 5999,
        "originalPrice": 11999,
        "category": "Government Exams",
        "imageUrl": "https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/e3964556-92c2-43a1-82e0-8fbcede1bf7f.png",
        "shortDescription": "Rank improvement program for GATE Electronics aspirants by PW Faculty",
        "duration": "8 months total",
        "level": "Advanced",
        "description": "Comprehensive GATE preparation program for Electronics engineering students. This rank improvement batch covers all key subjects including EDC, Communication systems, EMFT, and more through expert-led lectures, problem-solving sessions, and advanced study materials designed specifically for GATE aspirants.",
        "curriculum": [
          {
            "_id": "64c8b4ae188aa67dd4093577",
            "title": "Demo Lectures",
            "order": 1,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093578",
                "title": "Demo Lecture by Kamesh Sir",
                "type": "video",
                "duration": "60min",
                "order": 1,
                "isFreePreview": true,
                "contentUrl": "https://example.com/demo_kamesh.mp4",
                "id": "64c8b4ae188aa67dd4093578"
              },
              {
                "_id": "64c8b4ae188aa67dd4093579",
                "title": "Demo Lecture by Chandan Gupta Sir",
                "type": "video",
                "duration": "60min",
                "order": 2,
                "isFreePreview": true,
                "contentUrl": "https://example.com/demo_chandan.mp4",
                "id": "64c8b4ae188aa67dd4093579"
              },
              {
                "_id": "64c8b4ae188aa67dd4093580",
                "title": "Demo Lecture by Sonu Lal Gupta Sir",
                "type": "video",
                "duration": "60min",
                "order": 3,
                "isFreePreview": true,
                "contentUrl": "https://example.com/demo_sonu.mp4",
                "id": "64c8b4ae188aa67dd4093580"
              },
              {
                "_id": "64c8b4ae188aa67dd4093581",
                "title": "Demo Lecture by Pankaj Singh Sir",
                "type": "video",
                "duration": "60min",
                "order": 4,
                "isFreePreview": true,
                "contentUrl": "https://example.com/demo_pankaj_singh.mp4",
                "id": "64c8b4ae188aa67dd4093581"
              },
              {
                "_id": "64c8b4ae188aa67dd4093582",
                "title": "Demo Lecture by Sathish Kumar Sir",
                "type": "video",
                "duration": "60min",
                "order": 5,
                "isFreePreview": true,
                "contentUrl": "https://example.com/demo_sathish.mp4",
                "id": "64c8b4ae188aa67dd4093582"
              },
              {
                "_id": "64c8b4ae188aa67dd4093583",
                "title": "Demo Lecture by Siddharth Sir",
                "type": "video",
                "duration": "60min",
                "order": 6,
                "isFreePreview": true,
                "contentUrl": "https://example.com/demo_siddharth.mp4",
                "id": "64c8b4ae188aa67dd4093583"
              },
              {
                "_id": "64c8b4ae188aa67dd4093584",
                "title": "Demo Lecture by Sujal Patel Sir",
                "type": "video",
                "duration": "60min",
                "order": 7,
                "isFreePreview": true,
                "contentUrl": "https://example.com/demo_sujal.mp4",
                "id": "64c8b4ae188aa67dd4093584"
              },
              {
                "_id": "64c8b4ae188aa67dd4093585",
                "title": "Demo Lecture by Pankaj Shukla Sir",
                "type": "video",
                "duration": "60min",
                "order": 8,
                "isFreePreview": true,
                "contentUrl": "https://example.com/demo_pankaj_shukla.mp4",
                "id": "64c8b4ae188aa67dd4093585"
              },
              {
                "_id": "64c8b4ae188aa67dd4093586",
                "title": "Demo Lecture by Puneet Sir",
                "type": "video",
                "duration": "60min",
                "order": 9,
                "isFreePreview": true,
                "contentUrl": "https://example.com/demo_puneet.mp4",
                "id": "64c8b4ae188aa67dd4093586"
              },
              {
                "_id": "64c8b4ae188aa67dd4093587",
                "title": "Demo Lecture by Amulya Ratan Sir",
                "type": "video",
                "duration": "60min",
                "order": 10,
                "isFreePreview": true,
                "contentUrl": "https://example.com/demo_amulya.mp4",
                "id": "64c8b4ae188aa67dd4093587"
              }
            ],
            "id": "64c8b4ae188aa67dd4093577"
          },
          {
            "_id": "64c8b4ae188aa67dd4093588",
            "title": "Orientation",
            "order": 2,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093589",
                "title": "Mitra's Welcome Video",
                "type": "video",
                "duration": "20min",
                "order": 1,
                "isFreePreview": true,
                "contentUrl": "https://example.com/welcome.mp4",
                "id": "64c8b4ae188aa67dd4093589"
              },
              {
                "_id": "64c8b4ae188aa67dd4093590",
                "title": "Doubt Resolution",
                "type": "video",
                "duration": "20min",
                "order": 2,
                "isFreePreview": true,
                "contentUrl": "https://example.com/doubt_resolution.mp4",
                "id": "64c8b4ae188aa67dd4093590"
              },
              {
                "_id": "64c8b4ae188aa67dd4093591",
                "title": "App Navigation",
                "type": "video",
                "duration": "20min",
                "order": 3,
                "isFreePreview": true,
                "contentUrl": "https://example.com/app_navigation.mp4",
                "id": "64c8b4ae188aa67dd4093591"
              }
            ],
            "id": "64c8b4ae188aa67dd4093588"
          },
          {
            "_id": "64c8b4ae188aa67dd4093592",
            "title": "Technical Subjects",
            "order": 3,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093593",
                "title": "Network Theory - Introduction",
                "type": "video",
                "duration": "60min",
                "order": 1,
                "contentUrl": "https://example.com/network_theory.mp4",
                "id": "64c8b4ae188aa67dd4093593"
              }
            ],
            "id": "64c8b4ae188aa67dd4093592"
          }
        ],
        "studentsEnrolledCount": 1500,
        "lastUpdated": "2025-07-02",
        "language": "English",
        "certificateAvailable": false,
        "highlights": [
          "Live and Recorded Lectures",
          "Topicwise Practice Sheets with Video Solution",
          "Tests with Video Solution",
          "Doubts Solving",
          "GATE PYQ Book",
          "Mentorship Program"
        ],
        "providerInfo": {
          "name": "Physics Wallah PVT LTD",
          "verified": true,
          "sellerId": "6845b4ad188aa67dd4093431",
          "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvmNCtUxGTpR8gFKlx_lWZyT0-2LIb8Om63g&s",
          "description": "A leading coaching institute for GATE preparation, committed to delivering high-impact learning experiences.",
          "websiteUrl": "https://www.pw.live",
          "type": "Coaching Institute"
        },
        "tags": [
          "gate",
          "electronics",
          "engineering",
          "rank-improvement"
        ],
        "approvalStatus": "approved",
        "moneyBackGuaranteeDays": 0,
        "freeTrialAvailable": true,
        "demoVideoUrl": "https://d2bps9p1kiy4ka.cloudfront.net/5eb393ee95fab7468a79d189/aa02e2ca-7da9-46ec-89cf-2d6ad03dee86.png",
        "downloadableMaterialsDescription": "Includes Practice Sheets, GATE PYQ Books, and Study Materials",
        "detailedScheduleDescription": "Course Duration: 28 July 2025 - 05 December 2025. Classes conducted from Monday to Friday. Validity till 31 March 2026.",
        "id": "64c8b4ae188aa67dd4093576",
        "seller": {
          "name": "Physics Wallah PVT LTD",
          "avatarUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvmNCtUxGTpR8gFKlx_lWZyT0-2LIb8Om63g&s",
          "verified": true,
          "type": "Coaching Institute",
          "description": "A leading coaching institute for GATE preparation, committed to delivering high-impact learning experiences."
        }
      },
      {
        "_id": "64c8b4ae188aa67dd4093594",
        "title": "ESE Non Tech 2026 - General Studies and Engineering Aptitude",
        "instructor": "PW Faculty",
        "sellerId": "6845b4ad188aa67dd4093431",
        "rating": 4.5,
        "reviewsCount": 160,
        "price": 4999,
        "originalPrice": 9900,
        "category": "Government Exams",
        "imageUrl": "https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/ea4d1bbe-bd5a-4a00-8f1c-084297652935.png",
        "shortDescription": "Target Batch for ESE & GATE 2026 Aspirants covering General Studies and Engineering Aptitude",
        "duration": "8 months total",
        "level": "Advanced",
        "description": "Comprehensive preparation program for ESE and GATE aspirants covering non-technical subjects including General Studies, Engineering Aptitude, and other essential topics through expert-led lectures and study materials.",
        "curriculum": [
          {
            "_id": "64c8b4ae188aa67dd4093595",
            "title": "Orientation",
            "order": 1,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093596",
                "title": "Mitra's Welcome Video",
                "type": "video",
                "duration": "20min",
                "order": 1,
                "isFreePreview": true,
                "contentUrl": "https://example.com/welcome.mp4",
                "id": "64c8b4ae188aa67dd4093596"
              },
              {
                "_id": "64c8b4ae188aa67dd4093597",
                "title": "Doubt Resolution",
                "type": "video",
                "duration": "20min",
                "order": 2,
                "isFreePreview": true,
                "contentUrl": "https://example.com/doubt_resolution.mp4",
                "id": "64c8b4ae188aa67dd4093597"
              },
              {
                "_id": "64c8b4ae188aa67dd4093598",
                "title": "App Navigation",
                "type": "video",
                "duration": "20min",
                "order": 3,
                "isFreePreview": true,
                "contentUrl": "https://example.com/app_navigation.mp4",
                "id": "64c8b4ae188aa67dd4093598"
              }
            ],
            "id": "64c8b4ae188aa67dd4093595"
          },
          {
            "_id": "64c8b4ae188aa67dd4093599",
            "title": "Demo Lectures",
            "order": 2,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093600",
                "title": "Demo Lecture by Puneet Sir",
                "type": "video",
                "duration": "60min",
                "order": 1,
                "isFreePreview": true,
                "contentUrl": "https://example.com/demo_puneet.mp4",
                "id": "64c8b4ae188aa67dd4093600"
              },
              {
                "_id": "64c8b4ae188aa67dd4093601",
                "title": "Demo Lecture by Amulya Ratan Sir",
                "type": "video",
                "duration": "60min",
                "order": 2,
                "isFreePreview": true,
                "contentUrl": "https://example.com/demo_amulya.mp4",
                "id": "64c8b4ae188aa67dd4093601"
              },
              {
                "_id": "64c8b4ae188aa67dd4093602",
                "title": "Demo Lecture By Swadesh Kumar Singh Sir",
                "type": "video",
                "duration": "60min",
                "order": 3,
                "isFreePreview": true,
                "contentUrl": "https://example.com/demo_swadesh.mp4",
                "id": "64c8b4ae188aa67dd4093602"
              }
            ],
            "id": "64c8b4ae188aa67dd4093599"
          },
          {
            "_id": "64c8b4ae188aa67dd4093603",
            "title": "Energy and Environment",
            "order": 3,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093604",
                "title": "Introduction to Energy and Environment",
                "type": "video",
                "duration": "60min",
                "order": 1,
                "contentUrl": "https://example.com/energy_environment.mp4",
                "id": "64c8b4ae188aa67dd4093604"
              }
            ],
            "id": "64c8b4ae188aa67dd4093603"
          },
          {
            "_id": "64c8b4ae188aa67dd4093605",
            "title": "Study Tools",
            "order": 4,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093606",
                "title": "How to find Test Paper and Answer key in the test section",
                "type": "video",
                "duration": "20min",
                "order": 1,
                "contentUrl": "https://example.com/test_paper_guide.mp4",
                "id": "64c8b4ae188aa67dd4093606"
              },
              {
                "_id": "64c8b4ae188aa67dd4093607",
                "title": "New Feature Update: Notes Feature in Video Player",
                "type": "video",
                "duration": "20min",
                "order": 2,
                "contentUrl": "https://example.com/notes_feature.mp4",
                "id": "64c8b4ae188aa67dd4093607"
              }
            ],
            "id": "64c8b4ae188aa67dd4093605"
          }
        ],
        "studentsEnrolledCount": 1500,
        "lastUpdated": "2025-06-21",
        "language": "English",
        "certificateAvailable": false,
        "highlights": [
          "Live Lectures by top faculties",
          "Practice sheets with solutions",
          "Regular tests aligned with ESE pattern",
          "One to One Telephonic Mentorship",
          "4 full length mock tests",
          "Doubt solving support"
        ],
        "providerInfo": {
          "name": "Physics Wallah PVT LTD",
          "verified": true,
          "sellerId": "6845b4ad188aa67dd4093431",
          "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvmNCtUxGTpR8gFKlx_lWZyT0-2LIb8Om63g&s",
          "description": "A leading coaching institute for ESE and GATE preparation, committed to delivering high-impact learning experiences.",
          "websiteUrl": "https://www.pw.live",
          "type": "Coaching Institute"
        },
        "tags": [
          "ese",
          "gate",
          "civil",
          "general-studies",
          "engineering-aptitude"
        ],
        "approvalStatus": "approved",
        "moneyBackGuaranteeDays": 0,
        "freeTrialAvailable": true,
        "demoVideoUrl": "https://i.ytimg.com/vi/zVm4PkMJ_W4/mqdefault.jpg",
        "downloadableMaterialsDescription": "Includes Practice Sheets, Study Materials, and Mock Tests",
        "detailedScheduleDescription": "Course Duration: 02 July 2025 - 31 December 2025. Classes conducted from Monday to Friday/Saturday. Validity till 28 February 2026.",
        "id": "64c8b4ae188aa67dd4093594",
        "seller": {
          "name": "Physics Wallah PVT LTD",
          "avatarUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvmNCtUxGTpR8gFKlx_lWZyT0-2LIb8Om63g&s",
          "verified": true,
          "type": "Coaching Institute",
          "description": "A leading coaching institute for ESE and GATE preparation, committed to delivering high-impact learning experiences."
        }
      },
      {
        "_id": "64c8b4ae188aa67dd4093608",
        "title": "Airforce Vayu Y 3.0 2026",
        "instructor": "PW Faculty",
        "sellerId": "6845b4ad188aa67dd4093431",
        "rating": 4.7,
        "reviewsCount": 120,
        "price": 399,
        "originalPrice": 599,
        "category": "Government Exams",
        "imageUrl": "https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/472f806a-a10a-4aed-8118-a249cf1f04af.png",
        "shortDescription": "Preparation program for Airforce Group Y Intake 02/2026 Aspirants",
        "duration": "8 weeks total",
        "level": "Intermediate",
        "description": "Comprehensive preparation program for Agniveer Air Force aspirants targeting Airforce Y Intake 02/2026. Covers English, Reasoning, General Maths and General Awareness through expert-led lectures and practice materials.",
        "curriculum": [
          {
            "_id": "64c8b4ae188aa67dd4093609",
            "title": "Demo Lectures",
            "order": 1,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093610",
                "title": "Demo Lecture by Ravi Sir",
                "type": "video",
                "duration": "60min",
                "order": 1,
                "isFreePreview": true,
                "contentUrl": "https://example.com/demo_ravi.mp4",
                "id": "64c8b4ae188aa67dd4093610"
              },
              {
                "_id": "64c8b4ae188aa67dd4093611",
                "title": "Demo Lecture By Sachin Modi Sir",
                "type": "video",
                "duration": "60min",
                "order": 2,
                "isFreePreview": true,
                "contentUrl": "https://example.com/demo_sachin.mp4",
                "id": "64c8b4ae188aa67dd4093611"
              },
              {
                "_id": "64c8b4ae188aa67dd4093612",
                "title": "Demo lecture By Lokesh Sir",
                "type": "video",
                "duration": "60min",
                "order": 3,
                "isFreePreview": true,
                "contentUrl": "https://example.com/demo_lokesh.mp4",
                "id": "64c8b4ae188aa67dd4093612"
              },
              {
                "_id": "64c8b4ae188aa67dd4093613",
                "title": "Demo lecture by Ankit yadav sir",
                "type": "video",
                "duration": "60min",
                "order": 4,
                "isFreePreview": true,
                "contentUrl": "https://example.com/demo_ankit.mp4",
                "id": "64c8b4ae188aa67dd4093613"
              }
            ],
            "id": "64c8b4ae188aa67dd4093609"
          },
          {
            "_id": "64c8b4ae188aa67dd4093614",
            "title": "English",
            "order": 2,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093615",
                "title": "English - Introduction",
                "type": "video",
                "duration": "60min",
                "order": 1,
                "contentUrl": "https://example.com/english_intro.mp4",
                "id": "64c8b4ae188aa67dd4093615"
              }
            ],
            "id": "64c8b4ae188aa67dd4093614"
          },
          {
            "_id": "64c8b4ae188aa67dd4093616",
            "title": "Reasoning",
            "order": 3,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093617",
                "title": "Reasoning - Introduction",
                "type": "video",
                "duration": "60min",
                "order": 1,
                "contentUrl": "https://example.com/reasoning_intro.mp4",
                "id": "64c8b4ae188aa67dd4093617"
              }
            ],
            "id": "64c8b4ae188aa67dd4093616"
          },
          {
            "_id": "64c8b4ae188aa67dd4093618",
            "title": "Study Tools",
            "order": 4,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093619",
                "title": "New Feature Update: Notes Feature in Video Player",
                "type": "video",
                "duration": "20min",
                "order": 1,
                "contentUrl": "https://example.com/notes_feature.mp4",
                "id": "64c8b4ae188aa67dd4093619"
              },
              {
                "_id": "64c8b4ae188aa67dd4093620",
                "title": "New Feature Update: New Quality Options in Video Player",
                "type": "video",
                "duration": "20min",
                "order": 2,
                "contentUrl": "https://example.com/quality_options.mp4",
                "id": "64c8b4ae188aa67dd4093620"
              }
            ],
            "id": "64c8b4ae188aa67dd4093618"
          }
        ],
        "studentsEnrolledCount": 1500,
        "lastUpdated": "2025-07-09",
        "language": "English",
        "certificateAvailable": false,
        "highlights": [
          "Live/Recorded Lectures",
          "Daily Practice Problems (DPPs)",
          "Weekly Subject-wise Tests",
          "3 Full Syllabus Mock Tests",
          "Doubt Engine support",
          "4 Live Lectures Per Day"
        ],
        "providerInfo": {
          "name": "Physics Wallah PVT LTD",
          "verified": true,
          "sellerId": "6845b4ad188aa67dd4093431",
          "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvmNCtUxGTpR8gFKlx_lWZyT0-2LIb8Om63g&s",
          "description": "A leading coaching institute for defence exam preparation, committed to delivering high-impact learning experiences.",
          "websiteUrl": "https://www.pw.live",
          "type": "Coaching Institute"
        },
        "tags": [
          "defence",
          "airforce",
          "agniveer",
          "group-y",
          "military-exams"
        ],
        "approvalStatus": "approved",
        "moneyBackGuaranteeDays": 0,
        "freeTrialAvailable": true,
        "demoVideoUrl": "https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/3bd3d999-b21f-4739-97cd-adc150d70749.png",
        "downloadableMaterialsDescription": "Includes DPPs with answer keys, Practice Tests, and Study Materials",
        "detailedScheduleDescription": "Course Duration: 14th July 2025 - 31 August 2025. 4 Live Lectures Per Day. Validity till 30 September 2025.",
        "id": "64c8b4ae188aa67dd4093608",
        "seller": {
          "name": "Physics Wallah PVT LTD",
          "avatarUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvmNCtUxGTpR8gFKlx_lWZyT0-2LIb8Om63g&s",
          "verified": true,
          "type": "Coaching Institute",
          "description": "A leading coaching institute for defence exam preparation, committed to delivering high-impact learning experiences."
        }
      },
      {
        "_id": "64c8b4ae188aa67dd4093621",
        "title": "Offline UPSC GS Foundation (Target 2026) - English",
        "instructor": "PW Faculty",
        "sellerId": "6845b4ad188aa67dd4093431",
        "rating": 4.5,
        "reviewsCount": 420,
        "price": 25800,
        "originalPrice": 11800,
        "category": "Government Exams",
        "imageUrl": "https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/8fd04139-0783-40e7-9348-7b00b676edaa.png",
        "shortDescription": "Comprehensive offline GS foundation program for UPSC 2026 aspirants",
        "duration": "12-14 months total",
        "level": "Advanced",
        "description": "Complete offline preparation program for UPSC Civil Services Examination covering General Studies for Prelims & Mains. Includes classroom teaching, test series, mentorship and comprehensive study materials.",
        "curriculum": [
          {
            "_id": "64c8b4ae188aa67dd4093622",
            "title": "Demo Lectures",
            "order": 1,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093623",
                "title": "Demo Lecture By Prateek Sir 01",
                "type": "video",
                "duration": "60min",
                "order": 1,
                "isFreePreview": true,
                "contentUrl": "https://example.com/demo_prateek1.mp4",
                "id": "64c8b4ae188aa67dd4093623"
              },
              {
                "_id": "64c8b4ae188aa67dd4093624",
                "title": "Demo Lecture By Prateek Sir 02",
                "type": "video",
                "duration": "60min",
                "order": 2,
                "isFreePreview": true,
                "contentUrl": "https://example.com/demo_prateek2.mp4",
                "id": "64c8b4ae188aa67dd4093624"
              },
              {
                "_id": "64c8b4ae188aa67dd4093625",
                "title": "Demo Lecture By Ritesh Sir 01",
                "type": "video",
                "duration": "60min",
                "order": 3,
                "isFreePreview": true,
                "contentUrl": "https://example.com/demo_ritesh1.mp4",
                "id": "64c8b4ae188aa67dd4093625"
              },
              {
                "_id": "64c8b4ae188aa67dd4093626",
                "title": "Demo Lecture By Ritesh Sir 02",
                "type": "video",
                "duration": "60min",
                "order": 4,
                "isFreePreview": true,
                "contentUrl": "https://example.com/demo_ritesh2.mp4",
                "id": "64c8b4ae188aa67dd4093626"
              }
            ],
            "id": "64c8b4ae188aa67dd4093622"
          },
          {
            "_id": "64c8b4ae188aa67dd4093627",
            "title": "Economy",
            "order": 2,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093628",
                "title": "Economy - Introduction",
                "type": "video",
                "duration": "60min",
                "order": 1,
                "contentUrl": "https://example.com/economy_intro.mp4",
                "id": "64c8b4ae188aa67dd4093628"
              }
            ],
            "id": "64c8b4ae188aa67dd4093627"
          },
          {
            "_id": "64c8b4ae188aa67dd4093629",
            "title": "Geography",
            "order": 3,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093630",
                "title": "Geography - Introduction",
                "type": "video",
                "duration": "60min",
                "order": 1,
                "contentUrl": "https://example.com/geography_intro.mp4",
                "id": "64c8b4ae188aa67dd4093630"
              }
            ],
            "id": "64c8b4ae188aa67dd4093629"
          },
          {
            "_id": "64c8b4ae188aa67dd4093631",
            "title": "Study Materials",
            "order": 4,
            "lessons": [
              {
                "_id": "64c8b4ae188aa67dd4093632",
                "title": "How to use study materials",
                "type": "video",
                "duration": "30min",
                "order": 1,
                "contentUrl": "https://example.com/study_materials.mp4",
                "id": "64c8b4ae188aa67dd4093632"
              }
            ],
            "id": "64c8b4ae188aa67dd4093631"
          }
        ],
        "studentsEnrolledCount": 1800,
        "lastUpdated": "2024-04-30",
        "language": "English",
        "certificateAvailable": false,
        "highlights": [
          "Offline General Studies Classes",
          "Online NCERT Batch Access",
          "Weekly Current Affairs Classes",
          "Prelims & Mains Test Series",
          "Personalized Mentor Assistance",
          "24 UPSC Standard Books in Hardcopy"
        ],
        "providerInfo": {
          "name": "Physics Wallah PVT LTD",
          "verified": true,
          "sellerId": "6845b4ad188aa67dd4093431",
          "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvmNCtUxGTpR8gFKlx_lWZyT0-2LIb8Om63g&s",
          "description": "A leading coaching institute for UPSC preparation, committed to delivering high-impact learning experiences.",
          "websiteUrl": "https://www.pw.live",
          "type": "Coaching Institute"
        },
        "tags": [
          "upsc",
          "civil-services",
          "gs-foundation",
          "offline-course",
          "ias-preparation"
        ],
        "approvalStatus": "approved",
        "moneyBackGuaranteeDays": 0,
        "freeTrialAvailable": true,
        "demoVideoUrl": "https://d2bps9p1kiy4ka.cloudfront.net/5eb393ee95fab7468a79d189/a12d1669-8e2f-4108-bc6d-abcd251ae33e.jpeg",
        "downloadableMaterialsDescription": "Includes 24 UPSC Standard Books, Current Affairs Magazines, and Revision Booklets",
        "detailedScheduleDescription": "Course Duration: 12-14 Months. General Studies Classes 6 Days/Week. Validity: 3 Years (Till 30th Sep 2028).",
        "id": "64c8b4ae188aa67dd4093621",
        "seller": {
          "name": "Physics Wallah PVT LTD",
          "avatarUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvmNCtUxGTpR8gFKlx_lWZyT0-2LIb8Om63g&s",
          "verified": true,
          "type": "Coaching Institute",
          "description": "A leading coaching institute for UPSC preparation, committed to delivering high-impact learning experiences."
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
              Best Selling Government Exams Courses
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