import type { AddOn } from './types';
import mongoose from 'mongoose';

const generateObjectIdString = () => new mongoose.Types.ObjectId().toHexString();

export const placeholderAddons: AddOn[] = [
  


 
  {
    id: 'addon-001',
    title: 'Fullstack Web Development with placement assistance',
    provider: 'Geekster',
    rating: 4.8,
    reviewsCount: 1000,
    price: 0,
    category: 'Computer Science',
    imageUrl: 'https://images.geekster.in/ds-coursepage-images/certificate.png',
    description: 'Learn DSA, MERN, and AWS to become the top 1% developer. Curriculum designed and delivered by experts from Google, Microsoft and Amazon. Build projects like Google Drive, LinkedIn and E-commerce.',
    details: [
        { label: 'Average CTC', value: '8.2 LPA' },
        { label: 'Highest CTC', value: '33 LPA' },
        { label: 'Students Placed', value: '1000+' },
    ],
    benefits: [
        "Practitioner-led Live Classes",
        "Booster Practice Sessions",
        "Full Day Doubt Support",
        "Personalized Progress Evaluation",
        "Weekly Test",
        "1:1 Mentorship",
        "Soft Skill Sessions",
        "Interview Preparation Every Month",
        "Mock Interviews",
        "Geekathon (Hackathons)",
        "Real World Projects",
        "Intensive Placement Assistance including profile building, interview prep, and job referrals."
    ],
    faqs: [
        {q: "Is there an upfront fee?", a: "This is an income-sharing agreement based program. You pay only when you get a job."},
        {q: "What is the certification?", a: "You get a prestigious certification from E&ICT Academy, IIT Guwahati, which is highly recognized by recruiters."}
    ],
    reviews: [
        { id: generateObjectIdString(), userName: 'SDE-Ankit', rating: 5, comment: 'Got a job at a top MNC through their placement assistance. The curriculum is very industry-relevant.', createdAt: '2024-06-10T14:00:00Z', userAvatar: 'https://i.pravatar.cc/150?u=ankit' },
    ]
  },
  {
    id: 'addon-002',
    title: 'UPSC Essential + Mentorship (July Refresh Batch)',
    provider: 'UPSCprep.com',
    rating: 4.9,
    reviewsCount: 150,
    price: 19999,
    category: 'UPSC',
    imageUrl: 'https://d18qz45wk4tdlr.cloudfront.net/institute/upscprep/product_images/198/0453f2eb7f774b61b1b819ea25f8b9d7.png',
    description: 'One course for all your needs - Comprehensive Lectures, Test Series, 1:1 Mentorship, Notes, Current Affairs etc. Suitable for UPSC 2026 and 2027.',
    details: [
        { label: 'Chapters', value: '43' },
        { label: 'Contents', value: '241' },
    ],
    benefits: [
        "Comprehensive Coverage of UPSC CSE - from absolute basics to advance level",
        "Live Sessions with recordings provided with 3 Years access",
        "Covers all aspects of UPSC exam - Prelims (including CSAT), Mains and Interview",
        "Personalised Mentorship Sessions - on demand mentorship for 3 years",
        "Free Test Series included with the course (Both Prelims and Mains)",
        "Weekly current affairs - lectures + material",
        "Write with Toppers - Interactive Live Answer Writing sessions with past UPSC rankers.",
        "Comprehensive Analysis of Last 10 Years Prelims Previous Year Questions",
        "Complimentary access to NCERT based foundation lectures (Pre-recorded)."
    ],
    faqs: [
        {q: "Who should join this course?", a: "Freshers who are starting their UPSC prep, those struggling to clear prelims, and those needing guidance on answer writing."},
        {q: "What about discounts?", a: "10% off for existing students. Group discounts are also available. Pre-Launch offer - 10% off till 10th June 2025. (Coupon Code PL10)"}
    ],
    reviews: [
        { id: generateObjectIdString(), userName: 'Aspirant2026', rating: 5, comment: 'The mentorship is a game changer. Really helps in structuring my preparation.', createdAt: '2024-07-15T10:00:00Z', userAvatar: 'https://i.pravatar.cc/150?u=aspirant' },
    ]
  },
  {
    id: 'addon-003',
    title: 'Curious Jr. Science Experiment Kit For Class 6th - CBSE and NCERT Topics based Experiments with Video Tutorials and Manual (Multicolor) | Science Project Kit',
    provider: 'PW',
    rating: 4.6,
    reviewsCount: 16,
    price: 1480,
    inStock: true,
    category: 'STEM Kits',
    imageUrl: 'https://store.pw.live/_next/image?url=https%3A%2F%2Fd2bps9p1kiy4ka.cloudfront.net%2F5eb393ee95fab7468a79d189%2F15419cc8-1c0a-4037-8062-8e54ad76b8c6.jpg&w=1920&q=75',
    description: "PW's science experiment kit for class 6th is designed to spark kids curiosity, promote hands-on learning, and inspire a lifelong love for science.",
    details: [],
    reviews: [
      { id: generateObjectIdString(), userName: 'Vinay Kumar Maurya', rating: 5, comment: 'Great Introduction to Science. This kit provided a great introduction to basic science concepts. My daughter loved studying the solubility of solids and liquids. The materials were of good quality.', createdAt: '2024-08-27T01:03:00Z', userAvatar: 'https://i.pravatar.cc/150?u=vinay' },
      { id: generateObjectIdString(), userName: 'Kuldeep Verma', rating: 5, comment: 'Fun and Informative. This kit is both fun and informative. My child enjoyed learning about attraction and repulsion in magnets and constructing a compass. The experiments were easy to follow.', createdAt: '2024-08-26T09:10:00Z', userAvatar: 'https://i.pravatar.cc/150?u=kuldeep' },
      { id: generateObjectIdString(), userName: 'Adarsh verma', rating: 4, comment: 'Fantastic Learning Kit for Kids. This kit is fantastic! My child enjoyed testing for starch, protein, and fat in food. The QR code videos made it even easier to understand. A must-have for young learners!', createdAt: '2024-08-24T18:50:00Z', userAvatar: 'https://i.pravatar.cc/150?u=adarsh' },
      { id: generateObjectIdString(), userName: 'Banangsan Shangpliang', rating: 5, comment: 'Engaging Learning Experience. The experiments in this kit provided an engaging learning experience for my child. He loved testing solubility, studying electrical circuits, and learning about light reflection.', createdAt: '2024-08-19T01:34:00Z', userAvatar: 'https://i.pravatar.cc/150?u=banangsan' },
      { id: generateObjectIdString(), userName: 'Rudra Naik', rating: 4, comment: 'Great Value for Money. This experiment kit offers great value for money. My son learned about the importance of oxygen for combustion and observed magnetic field lines. The quality of materials is top-notch.', createdAt: '2024-08-17T08:54:00Z', userAvatar: 'https://i.pravatar.cc/150?u=rudra' },
    ],
    faqs: [
        {q: "Shipping Policy", a: "Standard shipping policies apply. Please allow 5-7 business days for delivery."},
        {q: "Cancellation Policy", a: "Orders can be cancelled within 24 hours of placement."},
        {q: "Return & Refund Policy", a: "Returns are accepted within 15 days of delivery for damaged or incorrect items."}
    ]
  },
  {
    id: 'addon-004',
    title: 'Absolute JEE Advanced Physics, Chemistry, Mathematics Combo Set of 3 Books 2500+ Questions with Formula Sheet Latest Solved Paper and 3 Mock Tests',
    provider: 'PW',
    rating: 4.8,
    reviewsCount: 4,
    price: 1398,
    originalPrice: 1747,
    discount: '20% OFF',
    inStock: true,
    category: 'IIT JEE Books',
    imageUrl: 'https://store.pw.live/_next/image?url=https%3A%2F%2Fd2bps9p1kiy4ka.cloudfront.net%2F5eb393ee95fab7468a79d189%2Fc67a4b93-2134-4e1b-862a-facc99f02768.png&w=1920&q=75',
    description: 'Conquer for JEE Advanced with Questions that Challenge your limits! The ‘Absolute JEE Advanced 2500+ Questions Physics, Mathematics, Chemistry Combo Set of 3 Books’ is a comprehensive and meticulously crafted resource designed to offer rigorous practice for students preparing for the JEE Advanced examination. This Set serves as an essential tool for mastering the complexities of the subjects, offering a wide range of questions that cover all aspects of the exam.',
    details: [
      { label: 'Publication', value: 'Physics Wallah' },
      { label: 'Publication Year', value: '2025' },
      { label: 'No of Books', value: '3' },
      { label: 'Language', value: 'English' },
      { label: 'ISBN', value: '9789368971382' },
    ],
    extraOptions: {
        label: 'Subject Variant',
        options: ['Physics', 'Mathematics', 'Chemistry'],
    },
    reviews: [
      { id: generateObjectIdString(), userName: 'Kavy', rating: 5, comment: 'thanks ok', createdAt: '2025-07-20T01:13:00Z', userAvatar: 'https://i.pravatar.cc/150?u=kavy' },
      { id: generateObjectIdString(), userName: 'Yogendra', rating: 5, comment: 'iske question matlab iit', createdAt: '2025-07-16T18:55:00Z', userAvatar: 'https://i.pravatar.cc/150?u=yogendra' },
      { id: generateObjectIdString(), userName: 'Parth Pawar', rating: 5, comment: 'wow nice', createdAt: '2025-06-21T15:19:00Z', userAvatar: 'https://i.pravatar.cc/150?u=parth' },
      { id: generateObjectIdString(), userName: 'Piyush', rating: 4, comment: 'nice book for improving concept application', createdAt: '2025-06-17T20:59:00Z', userAvatar: 'https://i.pravatar.cc/150?u=piyush' },
    ],
    faqs: [
        {q: "Shipping Policy", a: "Standard shipping policies apply. Please allow 5-7 business days for delivery."},
        {q: "Cancellation Policy", a: "Orders can be cancelled within 24 hours of placement."},
        {q: "Return & Refund Policy", a: "Returns are accepted within 15 days of delivery for damaged or incorrect items."}
    ]
  },
  {
    id: 'addon-005',
    title: '15 JEE Main Rankers Test Series 2025 As Per Revised NTA Pattern (75 Questions) | Elaborated Solutions with College Cutoff and Shiftwise Past Paper Analysis',
    provider: 'PW',
    rating: 4.9,
    reviewsCount: 41,
    price: 407,
    originalPrice: 449,
    discount: '9% OFF',
    inStock: true,
    category: 'IIT JEE Books',
    imageUrl: 'https://store.pw.live/_next/image?url=https%3A%2F%2Fd2bps9p1kiy4ka.cloudfront.net%2F5eb393ee95fab7468a79d189%2F9f72134a-ddb0-4003-80a4-d4f3e4551509.png&w=1920&q=75',
    description: 'Prepare to rise above the competition and make your mark in the JEE Main! Elevate your JEE preparation with the ‘JEE Main Rankers Test Series 2025’ as per the Revised NTA Pattern (75 Questions). Get ready for an in-depth journey featuring Elaborated Solutions, College Cutoff Insights, and Shift-wise Past Paper Analysis that will guide you toward your goal and help you master the exam format like never before.',
    details: [
      { label: 'Publication', value: 'Physics Wallah' },
      { label: 'Publication Year', value: '2024' },
      { label: 'No of Books', value: '1' },
      { label: 'Language', value: 'English' },
      { label: 'ISBN', value: '9789348446039' },
    ],
    extraOptions: {
        label: 'Exam',
        options: ['Main', 'Advanced'],
    },
    reviews: [
      { id: generateObjectIdString(), userName: 'Laiba Khan', rating: 5, comment: 'Extremely helpful', createdAt: '2025-06-25T19:48:00Z', userAvatar: 'https://i.pravatar.cc/150?u=laiba' },
      { id: generateObjectIdString(), userName: 'Akash', rating: 5, comment: 'great 👌🏼', createdAt: '2025-03-11T06:57:00Z', userAvatar: 'https://i.pravatar.cc/150?u=akash' },
      { id: generateObjectIdString(), userName: 'Subhra Tejsi', rating: 4, comment: 'Hatsoff to the appreciable efforts of pw. Relevent content', createdAt: '2025-03-06T18:30:00Z', userAvatar: 'https://i.pravatar.cc/150?u=subhra' },
      { id: generateObjectIdString(), userName: 'Rashi Singh', rating: 4, comment: 'nice book good for practice', createdAt: '2025-03-05T15:53:00Z', userAvatar: 'https://i.pravatar.cc/150?u=rashi' },
      { id: generateObjectIdString(), userName: 'Shaswat', rating: 5, comment: 'bhery gud bhery gud book', createdAt: '2025-02-20T17:35:00Z', userAvatar: 'https://i.pravatar.cc/150?u=shaswat' },
    ],
    faqs: [
        {q: "Shipping Policy", a: "Standard shipping policies apply. Please allow 5-7 business days for delivery."},
        {q: "Cancellation Policy", a: "Orders can be cancelled within 24 hours of placement."},
        {q: "Return & Refund Policy", a: "Returns are accepted within 15 days of delivery for damaged or incorrect items."},
        {q: "Return & Replacement Policy", a: "Returns are accepted within 15 days of delivery for damaged or incorrect items."}
    ]
  },
  {
    id: 'addon-006',
    title: 'NEET UG 2027 Online Course for Class 11th | ONE Pro - MAHAPACK (All-in-One)',
    provider: 'PW',
    rating: 4.9,
    reviewsCount: 50,
    price: 10598.94,
    originalPrice: 19998,
    discount: '47% OFF',
    inStock: true,
    category: 'NEET Courses',
    imageUrl: '/adda.png',
    description: 'The ultimate NEET preparation solution for Class 11 students, offering unlimited access to future batches, expert-led video courses, and structured study resources for a strong foundation. Includes live doubt-solving sessions and exclusive mentorship.',
    details: [
      { label: 'Exams Covered', value: 'NEET Class 11th, NEET MAHAPACK' },
      { label: 'Validity', value: '22 Months' },
      { label: 'Language', value: 'Hinglish' },
      { label: 'Delivery', value: 'Books delivered in 7-10 days' },
    ],
    extraOptions: {
      label: 'Mode',
      options: ['Live + Recorded'],
    },
    reviews: [
      { id: generateObjectIdString(), userName: 'Aman Sharma', rating: 5, comment: 'Excellent course with great faculty support.', createdAt: '2025-07-15T10:00:00Z', userAvatar: 'https://i.pravatar.cc/150?u=aman' },
      { id: generateObjectIdString(), userName: 'Priya Gupta', rating: 4, comment: 'Good resources, but delivery took time.', createdAt: '2025-07-10T12:30:00Z', userAvatar: 'https://i.pravatar.cc/150?u=priya' },
    ],
    faqs: [
      { q: "How to attend Live Classes?", a: "Access via the app after purchase." },
      { q: "What if I miss a live class?", a: "Recordings are available 24x7." },
      { q: "How long for book delivery?", a: "7-10 days after dispatch." },
    ]
  },
  {
    id: 'addon-007',
    title: 'Padho India - NEET 2026 (Dropper)',
    provider: 'eSaral',
    rating: 4.8,
    reviewsCount: 30,
    price: 3900,
    originalPrice: 7800,
    discount: '50% OFF',
    inStock: true,
    category: 'NEET Courses',
    imageUrl: '/esarl.jpg',
    description: 'A 1-year course for NEET 2026 droppers, covering Class 11th and 12th PCB syllabus with video lectures, practice sheets, and test series by top Kota faculties.',
    details: [
      { label: 'Language', value: 'English & Hindi' },
      { label: 'Validity', value: '2026-05-15' },
      { label: 'Courses', value: '16' },
    ],
    extraOptions: {
      label: 'Target Exam',
      options: ['NEET 2026'],
    },
    reviews: [
      { id: generateObjectIdString(), userName: 'Ravi Kumar', rating: 5, comment: 'Great content, helped me a lot!', createdAt: '2025-07-20T09:00:00Z', userAvatar: 'https://i.pravatar.cc/150?u=ravi' },
      { id: generateObjectIdString(), userName: 'Neha Singh', rating: 4, comment: 'Good test series, needs more live sessions.', createdAt: '2025-07-18T14:00:00Z', userAvatar: 'https://i.pravatar.cc/150?u=neha' },
    ],
    faqs: [
      { q: "What is included?", a: "Video lectures, practice sheets, and test series." },
      { q: "Is there a refund?", a: "No refund policy applies." },
      { q: "How to access videos?", a: "Via the eSaral app." },
    ]
  },
  {
    id: 'addon-008',
    title: 'Yakeen Smart Notebook Set of 3 (Physics, Chemistry, and Biology)',
    provider: 'PW',
    rating: 4.8,
    reviewsCount: 35,
    price: 391,
    originalPrice: 480,
    discount: '19% OFF',
    inStock: true,
    category: 'Stationery',
    imageUrl: 'https://store.pw.live/_next/image?url=https%3A%2F%2Fd2bps9p1kiy4ka.cloudfront.net%2F5eb393ee95fab7468a79d189%2F08f75706-612f-4b47-b558-915da61e485f.jpg&w=1920&q=75',
    description: 'High-quality smart notebooks for Physics, Chemistry, and Biology, designed to aid NEET and JEE preparation with excellent page quality and durability.',
    details: [
      { label: 'Subject', value: 'PCB' },
      { label: 'Quantity', value: '3' },
      { label: 'Delivery', value: 'Check pincode for estimated date' },
    ],
    extraOptions: {
      label: 'Subject Variant',
      options: ['Physics', 'Chemistry', 'Biology'],
    },
    reviews: [
      { id: generateObjectIdString(), userName: 'Ayush Sinha', rating: 5, comment: 'Very Good and Helpful smart notebook', createdAt: '2025-07-25T13:41:00Z', userAvatar: 'https://i.pravatar.cc/150?u=ayush' },
      { id: generateObjectIdString(), userName: 'Barsha Mondal', rating: 5, comment: 'good, page questions are excellent', createdAt: '2025-07-23T18:45:00Z', userAvatar: 'https://i.pravatar.cc/150?u=barsha' },
    ],
    faqs: [
      { q: "Shipping Policy", a: "Check delivery options by pincode." },
      { q: "Cancellation Policy", a: "Can be cancelled within 24 hours." },
      { q: "Return Policy", a: "Returns accepted within 15 days." },
    ]
  },
  {
    id: 'addon-009',
    title: 'Complete IIT JEE Physical Notes with Test Series',
    provider: 'Unacademy',
    rating: 4.7,
    reviewsCount: 20,
    price: 2599,
    inStock: true,
    category: 'IIT JEE Books',
    imageUrl: '/uux.png',
    description: 'A comprehensive set of 24 physical notes books for Physics, Chemistry, and Mathematics, aligned with NCERT and IIT JEE pattern, including 15 test series for practice.',
    details: [
      { label: 'No of Books', value: '24' },
      { label: 'Language', value: 'English' },
      { label: 'Delivery', value: '12-15 working days' },
      { label: 'Tests', value: '15' },
    ],
    extraOptions: {
      label: 'Target Class',
      options: ['Class 11', 'Class 12'],
    },
    reviews: [
      { id: generateObjectIdString(), userName: 'Vikram Sharma', rating: 5, comment: 'Excellent notes, tests are very helpful.', createdAt: '2025-07-22T11:00:00Z', userAvatar: 'https://i.pravatar.cc/150?u=vikram' },
      { id: generateObjectIdString(), userName: 'Anjali Patel', rating: 4, comment: 'Good quality, but delivery was slow.', createdAt: '2025-07-19T16:00:00Z', userAvatar: 'https://i.pravatar.cc/150?u=anjali' },
    ],
    faqs: [
      { q: "What is included?", a: "24 physical notes and 15 test series." },
      { q: "Delivery time?", a: "12-15 working days after address update." },
      { q: "Can I track delivery?", a: "Yes, tracking is available." },
    ]
  },
  {
    id: 'addon-010',
    title: '38 Years NEET Previous Year Solved Question Papers Physics, Chemistry and Biology PYQ Combo Set of 3 Books (2025 - 1988) Chapterwise Topicwise Solutions For NEET Exam 2026',
    provider: 'PW',
    rating: 4.8,
    reviewsCount: 105,
    price: 981,
    originalPrice: 1307,
    discount: '25% OFF',
    inStock: true,
    category: 'NEET Books',
    imageUrl: 'https://d2bps9p1kiy4ka.cloudfront.net/5eb393ee95fab7468a79d189/7b3e0a85-13d8-4367-9a6d-0cfc1a4db472.png', // Using the URL from the error context as a placeholder
    description: 'NEET PYQ - Excel in NEET Exams with Targeted Practice and the Latest Updates! Prepare for NEET with ‘38 Years NEET Previous Year Solved Question Papers (PYQs) Physics, Chemistry, Biology Combo Set of 3 Books (2025-1988)’. This NEET PYQ book offers a practical approach with 38 Years of Solved Question Papers, helping you understand exam patterns and key topics. It aligns with the latest NEET syllabus and includes updated questions to support your focused revision. Additionally, it provides chapter-wise topic-wise solutions for the NEET Exam 2026 with newly added topics, ensuring comprehensive coverage for your preparation.',
    details: [
      { label: 'Publication', value: 'Physics Wallah' },
      { label: 'Publication Year', value: '2025' },
      { label: 'No of Books', value: '3' },
      { label: 'Language', value: 'English' },
      { label: 'ISBN', value: '9789371538152' }, // Assuming a placeholder ISBN
    ],
    extraOptions: {
      label: 'Subject Variant',
      options: ['PCB', 'Biology', 'Physics', 'Chemistry'],
    },
    reviews: [
      { id: generateObjectIdString(), userName: 'Manoj Wagha', rating: 5, comment: 'very nice book for neet aspirants', createdAt: '2025-07-29T03:25:00Z', userAvatar: 'https://i.pravatar.cc/150?u=manoj' },
      { id: generateObjectIdString(), userName: 'Rupali Pradhan', rating: 5, comment: 'very good quality', createdAt: '2025-07-28T17:12:00Z', userAvatar: 'https://i.pravatar.cc/150?u=rupali' },
      { id: generateObjectIdString(), userName: 'Bhargav Paliwal', rating: 4, comment: 'okok', createdAt: '2025-07-28T11:21:00Z', userAvatar: 'https://i.pravatar.cc/150?u=bhargav' },
      { id: generateObjectIdString(), userName: 'Asha Katara', rating: 5, comment: "that's amazing", createdAt: '2025-07-26T18:03:00Z', userAvatar: 'https://i.pravatar.cc/150?u=asha' },
      { id: generateObjectIdString(), userName: 'Sam Ganatra', rating: 5, comment: 'worth it', createdAt: '2025-07-25T16:28:00Z', userAvatar: 'https://i.pravatar.cc/150?u=sam' },
    ],
    faqs: [
      { q: 'Shipping Policy', a: 'Standard shipping policies apply. Please allow 5-7 business days for delivery.' },
      { q: 'Cancellation Policy', a: 'Orders can be cancelled within 24 hours of placement.' },
      { q: 'Return & Refund Policy', a: 'Returns are accepted within 15 days of delivery for damaged or incorrect items.' },
      { q: 'Return & Replacement Policy', a: 'Returns are accepted within 15 days of delivery for damaged or incorrect items.' },
    ],
  },
  {
    id: 'addon-011',
    title: 'SKC Physics Crush Class 11 Handwritten Format Notes By Saleem Sir & JEE Main 7 Years All 143 Shifts Online Previous Years Solved Papers Chapterwise & Topicwise PYQs Combo',
    provider: 'PW',
    rating: 4.8,
    reviewsCount: 4, // Placeholder, as no specific count provided
    price: 1125,
    originalPrice: 1324,
    discount: '15% OFF',
    inStock: true,
    category: 'IIT JEE Books',
    imageUrl: 'https://static.pw.live/0b27cf2d-9c2d-4e8c-aad5-c51e5fc23a74.png', // Using a related image URL as a placeholder
    description: 'Master Physics with ease and make complex concepts unforgettable! Master Physics with ‘the SKC Physics Crush Class 11 Handwritten Format Notes by Saleem Sir & JEE Main 7 Years All 143 Shifts Online Previous Years Solved Papers Chapterwise & Topicwise PYQs Combo Set of 2 Books’. This combo offers clear, engaging handwritten notes and 143 shift papers from the last seven years, broken down chapterwise and topicwise. With precise solutions and targeted practice, you\'ll build your understanding and problem-solving skills to ace your JEE Main exams confidently.',
    details: [
      { label: 'Publication', value: 'Physics Wallah' },
      { label: 'Publication Year', value: '2025' },
      { label: 'No of Books', value: '2' },
      { label: 'Language', value: 'English' },
      { label: 'ISBN', value: '9789371538152' }, // Using a placeholder ISBN
    ],
    reviews: [
      { id: generateObjectIdString(), userName: 'Kavy', rating: 5, comment: 'thanks ok', createdAt: '2025-07-20T01:13:00Z', userAvatar: 'https://i.pravatar.cc/150?u=kavy' },
      { id: generateObjectIdString(), userName: 'Yogendra', rating: 5, comment: 'iske question matlab iit', createdAt: '2025-07-16T18:55:00Z', userAvatar: 'https://i.pravatar.cc/150?u=yogendra' },
      { id: generateObjectIdString(), userName: 'Parth Pawar', rating: 5, comment: 'wow nice', createdAt: '2025-06-21T15:19:00Z', userAvatar: 'https://i.pravatar.cc/150?u=parth' },
      { id: generateObjectIdString(), userName: 'Piyush', rating: 4, comment: 'nice book for improving concept application', createdAt: '2025-06-17T20:59:00Z', userAvatar: 'https://i.pravatar.cc/150?u=piyush' },
    ],
    faqs: [
      { q: 'Shipping Policy', a: 'Standard shipping policies apply. Please allow 5-7 business days for delivery.' },
      { q: 'Cancellation Policy', a: 'Orders can be cancelled within 24 hours of placement.' },
      { q: 'Return & Refund Policy', a: 'Returns are accepted within 15 days of delivery for damaged or incorrect items.' },
      { q: 'Return & Replacement Policy', a: 'Returns are accepted within 15 days of delivery for damaged or incorrect items.' },
    ],
  },
  {
    id: 'addon-012',
    title: 'Class 12 Board The Catalyst For Chemistry & Physics Combo with Most Relevant Practice Questions Booklet By Om Pandey, By Gagan Sir & Rajwant Sir | Handwritten Notes',
    provider: 'PW',
    rating: 4.9,
    reviewsCount: 75,
    price: 801,
    originalPrice: 1148,
    discount: '30% OFF',
    inStock: true,
    category: 'CBSE Class 12th Books',
    imageUrl: 'https://d2bps9p1kiy4ka.cloudfront.net/5eb393ee95fab7468a79d189/65673665-4fa6-4187-aafd-d7e69573b299.png', // Using a related image URL as a placeholder
    description: 'Prepare to master chemistry and physics, making your Board Exams feel smoother than ever! Step into your Chemistry board exams confidently using ‘Class 12 Board The Catalyst For Chemistry & Physics with Most Relevant Practice Questions Booklet By Om Pandey, Gagan Sir & Rajwant Sir’. This book combines detailed NCERT-based notes, CBSE PYQs, and explanations designed to simplify and strengthen your understanding. Competency-based questions, simplified flowcharts, and a CBSE-patterned mock test equip you with everything you need to excel in your exams.',
    details: [
      { label: 'Publication', value: 'Physics Wallah' },
      { label: 'Publication Year', value: '2024' },
      { label: 'No of Books', value: '2' },
      { label: 'Language', value: 'English' },
      { label: 'ISBN', value: '9789348083531' },
    ],
    reviews: [
      { id: generateObjectIdString(), userName: 'Anurag Tiwari', rating: 5, comment: 'NEVER BUY THIS BOOK OTHERWISE YOU TOP THE EXAM expecially in mathematics THIS isVEFY HELPFUL FOR calculus in mathematics', createdAt: '2025-07-29T14:04:00Z', userAvatar: 'https://i.pravatar.cc/150?u=anurag' },
      { id: generateObjectIdString(), userName: 'Anshul Prajapati', rating: 5, comment: 'Both books are extremely usable for students and exactly made for all syllabus', createdAt: '2025-07-27T20:24:00Z', userAvatar: 'https://i.pravatar.cc/150?u=anshul' },
      { id: generateObjectIdString(), userName: 'Tanmay', rating: 5, comment: 'GOAT BOOKS', createdAt: '2025-07-24T09:03:00Z', userAvatar: 'https://i.pravatar.cc/150?u=tanmay' },
      { id: generateObjectIdString(), userName: 'Abhi', rating: 5, comment: 'Fantastic book, best recommended book for boards if you are also preparing for jee', createdAt: '2025-07-23T10:00:00Z', userAvatar: 'https://i.pravatar.cc/150?u=abhi' },
      { id: generateObjectIdString(), userName: 'Rohit Kaushik', rating: 5, comment: 'AWESOME!!!', createdAt: '2025-07-22T21:44:00Z', userAvatar: 'https://i.pravatar.cc/150?u=rohit' },
    ],
    faqs: [
      { q: 'Shipping Policy', a: 'Standard shipping policies apply. Please allow 5-7 business days for delivery.' },
      { q: 'Cancellation Policy', a: 'Orders can be cancelled within 24 hours of placement.' },
      { q: 'Return & Refund Policy', a: 'Returns are accepted within 15 days of delivery for damaged or incorrect items.' },
      { q: 'Return & Replacement Policy', a: 'Returns are accepted within 15 days of delivery for damaged or incorrect items.' },
    ],
  },
  {
    id: 'addon-013',
    title: 'UPSC Mains Wallah Previous 11 Years\' (2013-2023) General Studies Solved Papers 1 to 4 Combo Set of 4 Books For Civil Services Mains Exams',
    provider: 'PW',
    rating: 4.8,
    reviewsCount: 12,
    price: 1189,
    originalPrice: 1486,
    discount: '20% OFF',
    inStock: false,
    category: 'UPSC CSE Books',
    imageUrl: 'https://d2bps9p1kiy4ka.cloudfront.net/5eb393ee95fab7468a79d189/5284f34e-5c86-4228-9ccd-7fbcef378ad8.png', // Using a related image URL as a placeholder
    description: 'Excel in UPSC Mains with Clarity and Value Addition! Designed for serious UPSC aspirants, the ‘Mains Wallah UPSC Mains PYQs Booklet’ offers a structured and effective approach to mastering previous-year questions (PYQs) for the Mains exam. Comprising four dedicated booklets covering 11 Years of PYQs across all four GS papers, this resource ensures comprehensive practice with well-organized solutions. It helps aspirants understand question patterns, refine answer-writing skills, and develop a strategic approach to tackling Mains with confidence.',
    details: [
      { label: 'Publication', value: 'Physics Wallah' },
      { label: 'Publication Year', value: '2024' },
      { label: 'No of Books', value: '4' },
      { label: 'Language', value: 'English' },
      { label: 'ISBN', value: '9788197733086' },
    ],
    extraOptions: {
      label: 'Language Variant',
      options: ['English', 'Hindi'],
    },
    reviews: [
      { id: generateObjectIdString(), userName: 'Shiva Main', rating: 5, comment: 'perfect', createdAt: '2025-06-07T02:56:00Z', userAvatar: 'https://i.pravatar.cc/150?u=shiva' },
      { id: generateObjectIdString(), userName: 'Seheli Pervin', rating: 4, comment: 'g', createdAt: '2025-04-29T09:11:00Z', userAvatar: 'https://i.pravatar.cc/150?u=seheli' },
      { id: generateObjectIdString(), userName: 'Patnam Venkata Puneeth Gu', rating: 5, comment: 'super', createdAt: '2025-02-13T15:02:00Z', userAvatar: 'https://i.pravatar.cc/150?u=patnam' },
      { id: generateObjectIdString(), userName: 'Aditya Yadav', rating: 5, comment: 'best product', createdAt: '2025-01-09T15:56:00Z', userAvatar: 'https://i.pravatar.cc/150?u=aditya' },
      { id: generateObjectIdString(), userName: 'Sayam', rating: 5, comment: 'good product', createdAt: '2025-01-06T10:33:00Z', userAvatar: 'https://i.pravatar.cc/150?u=sayam' },
    ],
    faqs: [
      { q: 'Shipping Policy', a: 'Standard shipping policies apply. Please allow 5-7 business days for delivery.' },
      { q: 'Cancellation Policy', a: 'Orders can be cancelled within 24 hours of placement.' },
      { q: 'Return & Refund Policy', a: 'Returns are accepted within 15 days of delivery for damaged or incorrect items.' },
      { q: 'Return & Replacement Policy', a: 'Returns are accepted within 15 days of delivery for damaged or incorrect items.' },
    ],
  },
];

export const getAddOnById = (id: string): AddOn | undefined => {
    return placeholderAddons.find(addon => addon.id === id);
}
