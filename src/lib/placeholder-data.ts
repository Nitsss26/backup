
import type { Course, Review, User, Certificate, Order } from './types';
import { CATEGORIES, DIFFICULTY_LEVELS, LANGUAGES, INSTRUCTOR_TYPES } from './constants';
import mongoose from 'mongoose';

const indianStudentNames = [
  "Priya Sharma", "Rahul Kumar", "Ananya Singh", "Amit Patel", "Sneha Reddy",
  "Vikram Iyer", "Deepika Joshi", "Arjun Mehta", "Neha Gupta", "Rohan Desai",
  "Aarav Gupta", "Ishaan Sharma", "Myra Singh", "Vivaan Patel", "Anika Reddy",
  "Advik Iyer", "Diya Joshi", "Kabir Mehta", "Pari Gupta", "Sai Desai"
];
const indianSellerNames = [
  "Expert Tutors Academy", "Kaushik Learning Solutions", "Vidya Mandir Online", "Innovate Skill Hub", "Gyan Ganga Institute",
  "Shiksha Kendra Pro", "Future Skills Center", "LearnWell Institute", "Prodigy Prep", "CareerLaunch Pad"
];
const indianAdminName = "Aditya Kumar";


export const placeholderUsers: User[] = [
  // Students
  { id: new mongoose.Types.ObjectId("6845b4ad188aa67dd409342b").toHexString(), name: indianStudentNames[0], email: 'priya.sharma@example.com', role: 'student', avatarUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=PS', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), bio: "Lifelong learner passionate about technology and design.", notificationPreferences: { courseUpdates: true, promotions: false, platformAnnouncements: true } },
  { id: new mongoose.Types.ObjectId("6845b4ad188aa67dd409342e").toHexString(), name: indianStudentNames[1], email: 'rahul.kumar@example.com', role: 'student', avatarUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=RK', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), bio: "Exploring new skills to advance my career in finance.", notificationPreferences: { courseUpdates: true, promotions: true, platformAnnouncements: true } },
  { id: new mongoose.Types.ObjectId("6845b4ad188aa67dd4093431").toHexString(), name: indianStudentNames[2], email: 'ananya.singh@example.com', role: 'student', avatarUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=AS', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 40).toISOString(), bio: "Preparing for NEET and exploring creative writing.", notificationPreferences: { courseUpdates: false, promotions: false, platformAnnouncements: true } },
  { id: new mongoose.Types.ObjectId("6845b4ad188aa67dd4093433").toHexString(), name: indianStudentNames[3], email: 'amit.patel@example.com', role: 'student', avatarUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=AP', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(), bio: "Student of Computer Science, eager to learn new programming languages.", notificationPreferences: { courseUpdates: true, promotions: true, platformAnnouncements: false } },
  { id: new mongoose.Types.ObjectId("6845b4ad188aa67dd4093434").toHexString(), name: indianStudentNames[4], email: 'sneha.reddy@example.com', role: 'student', avatarUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=SR', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(), bio: "Future marketing professional, looking for courses on digital marketing.", notificationPreferences: { courseUpdates: true, promotions: true, platformAnnouncements: true } },

  // Providers/Sellers
  { id: new mongoose.Types.ObjectId("6845b4ad188aa67dd409342c").toHexString(), name: indianSellerNames[0], email: 'expert.tutors@example.com', role: 'provider', avatarUrl: 'https://placehold.co/100x100/CCDEF9/1E40AF?text=ET', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(), verificationStatus: 'pending', documentsSubmitted: true, bio: "Dedicated to providing top-notch coding bootcamps and exam preparation courses. We believe in practical learning." },
  { id: new mongoose.Types.ObjectId("6845b4ad188aa67dd409342f").toHexString(), name: indianSellerNames[1], email: 'kaushik.learning@example.com', role: 'provider', avatarUrl: 'https://placehold.co/100x100/CCDEF9/1E40AF?text=KL', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(), verificationStatus: 'verified', documentsSubmitted: true, bio: "Leading institution for business, finance, and government exam courses. Our faculty are industry experts." },
  { id: new mongoose.Types.ObjectId("6845b4ad188aa67dd4093430").toHexString(), name: indianSellerNames[2], email: 'vidya.mandir@example.com', role: 'provider', avatarUrl: 'https://placehold.co/100x100/CCDEF9/1E40AF?text=VM', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), verificationStatus: 'rejected', documentsSubmitted: true, bio: "Specialized in language learning and arts. We focus on immersive learning experiences." },
  { id: new mongoose.Types.ObjectId("6845b4ad188aa67dd4093432").toHexString(), name: indianSellerNames[3], email: 'innovate.skillhub@example.com', role: 'provider', avatarUrl: 'https://placehold.co/100x100/CCDEF9/1E40AF?text=IS', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 120).toISOString(), verificationStatus: 'verified', documentsSubmitted: true, bio: "Premier destination for cutting-edge Computer Science and Personal Development programs. We foster innovation." },
  { id: new mongoose.Types.ObjectId("6845b4ad188aa67dd4093435").toHexString(), name: indianSellerNames[4], email: 'gyan.ganga@example.com', role: 'provider', avatarUrl: 'https://placehold.co/100x100/CCDEF9/1E40AF?text=GG', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 200).toISOString(), verificationStatus: 'unverified', documentsSubmitted: false, bio: "Traditional and modern teaching methods for competitive exams and skill development." },
  
  // Admin
  { id: new mongoose.Types.ObjectId("6845b4ad188aa67dd409342d").toHexString(), name: indianAdminName, email: 'admin@example.com', role: 'admin', avatarUrl: 'https://placehold.co/100x100/7CB9F9/183265?text=AK', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(), bio: "Ensuring EdTechCart runs smoothly for everyone. Committed to quality and user satisfaction." },
];


export const placeholderCourses: Course[] = Array.from({ length: 30 }, (_, i) => {
  const category = CATEGORIES[i % CATEGORIES.length];
  const sellerCandidates = placeholderUsers.filter(u => u.role === 'provider');
  const seller = sellerCandidates[i % sellerCandidates.length];
  const priceInINR = Math.floor(Math.random() * (12000 - 399) + 399);
  const isApprovedSeller = seller.verificationStatus === 'verified';
  
  let approvalStatus: 'pending' | 'approved' | 'rejected' = 'pending';
  if (isApprovedSeller) {
    approvalStatus = (i % 5 === 0) ? 'pending' : 'approved';
  } else if (seller.verificationStatus === 'rejected') {
    approvalStatus = 'rejected';
  } else { 
    approvalStatus = 'pending';
  }

  let providerType: Course['providerInfo']['type'] = 'Individual';
  if (seller.name.toLowerCase().includes('academy') || seller.name.toLowerCase().includes('institute') || seller.name.toLowerCase().includes('center') || seller.name.toLowerCase().includes('solutions') || seller.name.toLowerCase().includes('hub') ) {
    providerType = 'Institute';
  } else if (i % 4 === 1) {
    providerType = 'Coaching Center';
  } else if (seller.verificationStatus === 'verified' && i % 4 === 2) {
     providerType = 'Verified Educator';
  }


  return {
    id: `course${i + 1}`,
    title: `Comprehensive ${category.name} Program ${i + 1}`,
    instructor: seller.name,
    sellerId: seller.id,
    rating: parseFloat((Math.random() * (5 - 3.8) + 3.8).toFixed(1)),
    reviewsCount: Math.floor(Math.random() * 500) + 100,
    price: priceInINR,
    originalPrice: i % 2 === 0 ? Math.floor(priceInINR * (Math.random() * 0.4 + 1.3)) : undefined,
    category: category.name,
    imageUrl: `https://placehold.co/600x400.png`,
    shortDescription: `A detailed program covering ${category.name} by ${seller.name}. Ideal for aspirants and professionals.`,
    duration: `${Math.floor(Math.random() * 30) + 15} hours total`,
    level: DIFFICULTY_LEVELS[i % DIFFICULTY_LEVELS.length],
    description: `Explore advanced topics in ${category.name} with ${seller.name}. This comprehensive masterclass covers everything from core principles to specialized applications. You will engage with complex problem-solving, case studies, and advanced project work. This course is designed for ${DIFFICULTY_LEVELS[i % DIFFICULTY_LEVELS.length]} learners aiming to become experts in ${category.name}. We provide extensive resources, expert mentorship, and a collaborative learning environment. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula.`,
    curriculum: [
      { id: `m1c${i+1}`, title: `Module 1: Foundations of ${category.name}`, order: 1, lessons: [
        { id: `l1m1c${i+1}`, title: 'Welcome & Program Overview', type: 'video', duration: '7min', order: 1, isFreePreview: true, contentUrl: 'https://example.com/preview_video.mp4' },
        { id: `l2m1c${i+1}`, title: `Deep Dive into ${category.name} Core Theories`, type: 'text', order: 2, textContent: 'Detailed textual content covering advanced theories...' },
        { id: `l3m1c${i+1}`, title: `Setting Up Your ${category.name} Toolkit`, type: 'video', duration: '15min', order: 3, contentUrl: 'https://example.com/setup_video.mp4' }
      ]},
      { id: `m2c${i+1}`, title: `Module 2: Specialized Techniques in ${category.name}`, order: 2, lessons: [
        { id: `l1m2c${i+1}`, title: `Mastering Technique X in ${category.name}`, type: 'video', duration: '22min', order: 1, contentUrl: 'https://example.com/technique_x.mp4' },
        { id: `l2m2c${i+1}`, title: 'Downloadable: ${category.name} Frameworks & Case Studies', type: 'pdf', order: 2, contentUrl: 'https://example.com/frameworks.pdf' },
        { id: `l3m2c${i+1}`, title: 'Quiz 1: Specialized Knowledge Assessment', type: 'quiz', order: 3 }
      ]},
      { id: `m3c${i+1}`, title: `Module 3: Capstone Project & ${category.name} Strategy`, order: 3, lessons: [
        { id: `l1m3c${i+1}`, title: `Developing a Strategic ${category.name} Plan`, type: 'video', duration: '30min', order: 1, contentUrl: 'https://example.com/strategy_plan.mp4' },
        { id: `l2m3c${i+1}`, title: `Capstone Project: ${category.name} Implementation Challenge`, type: 'assignment', order: 2 },
        { id: `l3m3c${i+1}`, title: 'Final Review & Future Trends in ' + category.name, type: 'text', order: 3, textContent: 'Concluding thoughts and future outlook...' }
      ]},
    ],
    studentsEnrolled: Math.floor(Math.random() * 2500) + 300,
    lastUpdated: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 60).toISOString().split('T')[0],
    language: LANGUAGES[i % LANGUAGES.length],
    certificateAvailable: i % 2 !== 0,
    highlights: [`Become an expert in ${category.name}`, 'Tackle complex real-world projects', 'Receive a verified certificate of completion', 'Lifetime access to course content & updates', 'Exclusive access to expert Q&A sessions', 'Comprehensive downloadable resources', `Learn advanced strategies for ${category.name}`],
    providerInfo: {
      name: seller.name,
      verified: seller.verificationStatus === 'verified',
      logoUrl: seller.avatarUrl?.replace('100x100', '150x150'),
      description: seller.bio || `A leading expert in ${category.name}, committed to delivering high-impact learning experiences.`,
      websiteUrl: `https://example.com/seller/${seller.id}`,
      type: providerType,
    },
    tags: [category.name.toLowerCase().replace(' & ', '-').replace(/\s+/g, '-'), DIFFICULTY_LEVELS[i % DIFFICULTY_LEVELS.length].toLowerCase().replace(' ', '-'), 'advanced', 'certification', 'expert-led'],
    approvalStatus: approvalStatus,
    moneyBackGuaranteeDays: (i % 3 === 0) ? 30 : ((i%3 === 1) ? 15 : 0),
    freeTrialAvailable: i % 4 === 0,
    demoVideoUrl: i % 3 === 0 ? `https://example.com/demo_video_${i+1}.mp4` : undefined,
    downloadableMaterialsDescription: i % 2 === 0 ? "Includes 20+ PDF guides, cheat sheets, and project templates." : "Key lecture slides and summary notes available for download.",
    detailedScheduleDescription: "Module 1 (Week 1-2): Core Concepts. Module 2 (Week 3-4): Advanced Techniques. Module 3 (Week 5-6): Project Work. Live Q&A every Friday.",
  };
});

// Curated Featured Courses for Homepage (Specific Order and Content)
export const featuredCoursesForHomepage: Course[] = [
  {
    id: '6845b4b7188aa67dd4093785',
    title: 'IIT-JEE Physics: Mechanics & Electrodynamics Masterclass',
    instructor: 'Expert Tutors Academy',
    rating: 4.8,
    reviewsCount: 1250,
    price: 4999,
    originalPrice: 7999,
    category: 'IIT-JEE',
    imageUrl: 'https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    shortDescription: 'Master crucial Physics topics for IIT-JEE mains and advanced with in-depth lectures and problem-solving sessions.',
    duration: '120 hours total',
    level: 'Advanced',
    description: 'This comprehensive course covers Newtonian Mechanics, Electromagnetism, and Modern Physics concepts essential for cracking the IIT-JEE. Includes detailed theory, numerous solved examples, and mock tests.',
    curriculum: [
      { id: 'm1fi01', title: 'Mechanics Fundamentals', order: 1, lessons: [{id:'l1m1fi01', title: 'Kinematics & Dynamics', type: 'video', duration: '2h', order: 1}] },
      { id: 'm2fi01', title: 'Electrodynamics Explained', order: 2, lessons: [{id:'l1m2fi01', title: 'Electrostatics & Magnetism', type: 'video', duration: '2.5h', order: 1}] },
    ],
    studentsEnrolled: 5500,
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString().split('T')[0],
    language: 'English',
    certificateAvailable: true,
    highlights: ['Covers complete IIT-JEE Physics syllabus', 'Problem-solving techniques', 'Mock tests included', 'Doubt clearing sessions'],
    providerInfo: { name: 'Expert Tutors Academy', verified: placeholderUsers.find(u => u.email === 'kaushik.learning@example.com')?.verificationStatus === 'verified', logoUrl: placeholderUsers.find(u => u.email === 'kaushik.learning@example.com')?.avatarUrl, type: 'Coaching Center' },
    approvalStatus: 'approved',
    moneyBackGuaranteeDays: 15,
  },
  {
    id: '6845b4b7188aa67dd4093790',
    title: 'NEET Biology: Complete Syllabus Coverage Course',
    instructor: 'Kaushik Learning Solutions',
    rating: 4.9,
    reviewsCount: 1800,
    price: 4499,
    originalPrice: 6999,
    category: 'NEET',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Ace your NEET Biology section with this extensive course covering Botany and Zoology in detail.',
    duration: '150 hours total',
    level: 'Advanced',
    description: 'A meticulously designed course for NEET aspirants focusing on NCERT syllabus with additional insights for competitive edge. Includes diagrams, mnemonics, and chapter-wise tests.',
     curriculum: [
        { id: 'm1fn01', title: 'Cell Biology & Genetics', order: 1, lessons: [{id:'l1m1fn01', title: 'Cell Structure and Function', type: 'video', duration: '3h', order: 1}] },
        { id: 'm2fn01', title: 'Plant & Animal Physiology', order: 2, lessons: [{id:'l1m2fn01', title: 'Human Physiology Systems', type: 'video', duration: '4h', order: 1}] },
    ],
    studentsEnrolled: 7200,
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString().split('T')[0],
    language: 'English',
    certificateAvailable: true,
    highlights: ['NCERT-focused curriculum', 'Diagrams and Mnemonics', 'Chapter-wise tests', 'NEET pattern questions'],
    providerInfo: { name: 'Kaushik Learning Solutions', verified: placeholderUsers.find(u => u.email === 'kaushik.learning@example.com')?.verificationStatus === 'verified', logoUrl: placeholderUsers.find(u => u.email === 'kaushik.learning@example.com')?.avatarUrl, type: 'Institute' },
    approvalStatus: 'approved',
  },
  {
    id: '6845b4b7188aa67dd409379b',
    title: 'UPSC CSE Prelims: GS Paper 1 Strategy Course',
    instructor: 'Vidya Mandir Online',
    rating: 4.7,
    reviewsCount: 950,
    price: 3500,
    category: 'Government Exams',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    shortDescription: 'A strategic approach to tackle UPSC Civil Services Prelims General Studies Paper 1 with current affairs focus.',
    duration: '100 hours total',
    level: 'Advanced',
    description: 'This course helps you develop a strong foundation and effective strategy for the UPSC CSE Prelims GS Paper 1. Covers all subjects including History, Geography, Polity, Economy, Environment and current events.',
     curriculum: [
        { id: 'm1fg01', title: 'Indian Polity & Governance', order: 1, lessons: [{id:'l1m1fg01', title: 'Constitutional Framework', type: 'video', duration: '2.5h', order: 1}] },
        { id: 'm2fg01', title: 'Current Affairs Analysis', order: 2, lessons: [{id:'l1m2fg01', title: 'Last 12 Months Review', type: 'pdf', order: 1}] },
    ],
    studentsEnrolled: 3200,
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString().split('T')[0],
    language: 'English',
    certificateAvailable: false,
    highlights: ['Comprehensive GS coverage', 'Current affairs integration', 'Prelims-focused strategy', 'Answer writing tips (bonus)'],
    providerInfo: { name: 'Vidya Mandir Online', verified: placeholderUsers.find(u => u.email === 'kaushik.learning@example.com')?.verificationStatus === 'verified', logoUrl: placeholderUsers.find(u => u.email === 'kaushik.learning@example.com')?.avatarUrl, type: 'Institute' },
    approvalStatus: 'approved',
    moneyBackGuaranteeDays: 7,
  },
  {
    id: '6845b4b7188aa67dd40937a6',
    title: 'Full Stack Web Development Course: React & Node',
    instructor: 'Innovate Skill Hub',
    rating: 4.9,
    reviewsCount: 2100,
    price: 2999,
    originalPrice: 5999,
    category: 'Computer Science',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Become a full-stack developer. Learn to build modern web applications using React, Node.js, Express, and MongoDB.',
    duration: '80 hours total',
    level: 'Intermediate',
    description: 'This immersive course takes you from foundational concepts to deploying complex web applications. Covers frontend with React, backend with Node.js/Express, and database management with MongoDB.',
    curriculum: [
        { id: 'm1fcs01', title: 'React Frontend Development', order: 1, lessons: [{id:'l1m1fcs01', title: 'Components & State Management', type: 'video', duration: '3h', order: 1}] },
        { id: 'm2fcs01', title: 'Node.js Backend & APIs', order: 2, lessons: [{id:'l1m2fcs01', title: 'Building RESTful APIs', type: 'video', duration: '3.5h', order: 1}] },
    ],
    studentsEnrolled: 8500,
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString().split('T')[0],
    language: 'English',
    certificateAvailable: true,
    highlights: ['Build real-world projects', 'Master React & Node.js', 'Database integration with MongoDB', 'Deployment strategies'],
    providerInfo: { name: 'Innovate Skill Hub', verified: placeholderUsers.find(u => u.email === 'innovate.skillhub@example.com')?.verificationStatus === 'verified', logoUrl: placeholderUsers.find(u => u.email === 'innovate.skillhub@example.com')?.avatarUrl, type: 'Institute' },
    approvalStatus: 'approved',
    freeTrialAvailable: true,
  }, 
      {
        id: '6845b4b9188aa67dd4093835',
        title: 'Machine Learning A-Z™: Python & R',
        instructor: 'Innovate Skill Hub',
      //  sellerId: placeholderUsers.find(u => u.email === 'innovate.skillhub@example.com')?.id || 'user8',
        rating: 4.9,
        reviewsCount: 3500,
        price: 3200,
        originalPrice: 6000,
        category: "Computer Science",
        imageUrl: 'https://plus.unsplash.com/premium_photo-1682124651258-410b25fa9dc0?q=80&w=1921&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
       // dataAiHint: "Machine Learning neural network",
        shortDescription: 'Learn Machine Learning from scratch using Python and R with hands-on projects.',
        duration: '90 hours total',
        level: 'Intermediate',
        description: 'Innovate Skill Hub’s Machine Learning A-Z course covers supervised and unsupervised learning, with practical projects in Python and R.',
        curriculum: [
          { id: 'm1is01', title: 'ML Basics', order: 1, lessons: [{ id: 'l1m1is01', title: 'Regression Models', type: 'video', duration: '3h', order: 1 }] },
          { id: 'm2is01', title: 'Advanced ML', order: 2, lessons: [{ id: 'l1m2is01', title: 'Neural Networks', type: 'video', duration: '3h', order: 1 }] },
        ],
        studentsEnrolled: 9000,
        lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString().split('T')[0],
        language: 'English',
        certificateAvailable: true,
        highlights: ['Hands-on projects', 'Python & R focus', 'Supervised & unsupervised learning', 'Practical applications'],
        providerInfo: { name: "Innovate Skill Hub", verified: true, logoUrl: placeholderUsers.find(u => u.email === 'innovate.skillhub@example.com')?.avatarUrl || 'https://placehold.co/100x100/EBF4FF/3B82F6?text=IS', type: 'Institute' },
        approvalStatus: 'approved',
      //  freeTrialAvailable: true,
      },

];

export const topCategoryShowcaseData = [
  {
    categoryName: "IIT-JEE",
    categorySlug: "iit-jee",
    courses: [
      {
        id: '6845b4b7188aa67dd40937b1',
        title: 'Arjuna JEE 2026',
        instructor: 'Physics Wallah PVT LTD',
        rating: 4.8,
        reviewsCount: 2500,
        price: 4500,
        originalPrice: 8500,
        category: "IIT-JEE",
        imageUrl: 'https://static.pw.live/5eb393ee95fab7468a79d189/26212ce5-2d50-4060-bc8a-8d59583744de.jpg',
        dataAiHint: "IIT-JEE physics lecture",
        shortDescription: 'Dominate JEE Physics with this ultimate course covering all key concepts and advanced problem-solving.',
        duration: '130 hours total',
        level: 'Advanced',
        description: 'This course by Physics Wallah offers a deep dive into JEE Physics topics like Mechanics, Thermodynamics, and Waves. Includes live sessions, doubt clearing, and mock tests.',
        curriculum: [
          { id: 'm1pw01', title: 'Mechanics for JEE', order: 1, lessons: [{ id: 'l1m1pw01', title: 'Laws of Motion', type: 'video', duration: '2h', order: 1 }] },
          { id: 'm2pw01', title: 'Thermodynamics', order: 2, lessons: [{ id: 'l1m2pw01', title: 'Heat and Work', type: 'video', duration: '2.5h', order: 1 }] },
        ],
        studentsEnrolled: 6200,
        lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString().split('T')[0],
        language: 'English',
        certificateAvailable: true,
        highlights: ['Live doubt-clearing sessions', 'JEE-focused mock tests', 'Comprehensive syllabus coverage', 'Advanced problem-solving'],
        providerInfo: { name: "Physics Wallah PVT LTD", verified: true, logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvmNCtUxGTpR8gFKlx_lWZyT0-2LIb8Om63g&s', type: 'Institute' },
        approvalStatus: 'approved',
        moneyBackGuaranteeDays: 15,
      },
      {
        id: '6845b4b7188aa67dd40937bc',
        title: 'JEE Chemistry Complete Prep',
        instructor: 'Unacademy JEE',
        rating: 4.8,
        reviewsCount: 2200,
        price: 5200,
        originalPrice: 8000,
        category: "IIT-JEE",
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbpMfeXTlFvxT9G67vRFQOq_ZTNMNf3TF6mw&s',
        dataAiHint: "IIT-JEE chemistry experiments",
        shortDescription: 'Comprehensive JEE Chemistry prep with focus on Organic, Inorganic, and Physical Chemistry.',
        duration: '110 hours total',
        level: 'Advanced',
        description: 'Unacademy JEE brings you a complete preparation course for JEE Chemistry, covering all topics with detailed explanations, NCERT-based content, and practice questions.',
        curriculum: [
          { id: 'm1un01', title: 'Organic Chemistry Basics', order: 1, lessons: [{ id: 'l1m1un01', title: 'Hydrocarbons', type: 'video', duration: '2h', order: 1 }] },
          { id: 'm2un01', title: 'Physical Chemistry', order: 2, lessons: [{ id: 'l1m2un01', title: 'Chemical Kinetics', type: 'video', duration: '2h', order: 1 }] },
        ],
        studentsEnrolled: 5800,
        lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString().split('T')[0],
        language: 'English',
        certificateAvailable: true,
        highlights: ['NCERT-aligned content', 'Practice with past papers', 'Detailed reaction mechanisms', 'Weekly tests'],
        providerInfo: { name: "Unacademy JEE", verified: true, logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3I8MHCoQwIr7JRNGJofutnnyXyD12S0aRBw&s', type: 'Institute' },
        approvalStatus: 'approved',
        moneyBackGuaranteeDays: 15,
      },
      {
        id: '6845b4b7188aa67dd40937c7',
        title: 'JEE Maths Advanced Course',
        instructor: 'Vedantu JEE',
        rating: 4.7,
        reviewsCount: 1900,
        price: 5000,
        originalPrice: 7500,
        category: "IIT-JEE",
        imageUrl: 'https://www.vedantu.store/cdn/shop/files/MOCK_UP_FILE_FOR_1.png?v=1745297444&width=750',
        dataAiHint: "IIT-JEE maths problems",
        shortDescription: 'Master JEE Maths with this intensive course focusing on Algebra, Calculus, and Geometry.',
        duration: '100 hours total',
        level: 'Advanced',
        description: 'Vedantu JEE’s Maths Masterclass helps you excel in JEE Maths with conceptual clarity, shortcut techniques, and extensive problem-solving practice.',
        curriculum: [
          { id: 'm1ve01', title: 'Algebra for JEE', order: 1, lessons: [{ id: 'l1m1ve01', title: 'Quadratic Equations', type: 'video', duration: '2h', order: 1 }] },
          { id: 'm2ve01', title: 'Calculus Concepts', order: 2, lessons: [{ id: 'l1m2ve01', title: 'Differentiation', type: 'video', duration: '2h', order: 1 }] },
        ],
        studentsEnrolled: 5100,
        lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString().split('T')[0],
        language: 'English',
        certificateAvailable: true,
        highlights: ['Shortcut techniques', 'In-depth problem-solving', 'Conceptual clarity', 'Regular assessments'],
        providerInfo: { name: "Vedantu JEE", verified: true, logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbulXgK3aHpzc1Yfu5fpVpiKJi-jWiQOEyPw&s', type: 'Institute' },
        approvalStatus: 'approved',
        moneyBackGuaranteeDays: 15,
      },
      {
        id: '6845b4b8188aa67dd40937d2',
        title: 'JEE Full Syllabus Revision',
        instructor: "Byju's Classes",
        rating: 4.6,
        reviewsCount: 1800,
        price: 4800,
        originalPrice: 7200,
        category: "IIT-JEE",
        imageUrl: 'https://5.imimg.com/data5/SM/CM/LL/SELLER-26999314/jee-2020-crash-course-main-advanced-.png',
        dataAiHint: "IIT-JEE study group",
        shortDescription: 'Revise the entire JEE syllabus with this crash course designed for last-minute preparation.',
        duration: '90 hours total',
        level: 'Advanced',
        description: 'Byju’s Classes offers a JEE full syllabus revision course, ideal for last-minute preparation, with concise notes, key concepts, and mock tests.',
        curriculum: [
          { id: 'm1by01', title: 'Physics Quick Revision', order: 1, lessons: [{ id: 'l1m1by01', title: 'Mechanics Recap', type: 'video', duration: '1.5h', order: 1 }] },
          { id: 'm2by01', title: 'Chemistry Quick Recap', order: 2, lessons: [{ id: 'l1m2by01', title: 'Organic Chemistry', type: 'video', duration: '1.5h', order: 1 }] },
        ],
        studentsEnrolled: 4900,
        lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString().split('T')[0],
        language: 'English',
        certificateAvailable: true,
        highlights: ['Concise revision notes', 'Mock tests included', 'Last-minute tips', 'Key concept focus'],
        providerInfo: { name: "Byju's Classes", verified: true, logoUrl: 'https://pbs.twimg.com/profile_images/1244973172039933952/u4pP2E7e_400x400.jpg', type: 'Institute' },
        approvalStatus: 'approved',
        moneyBackGuaranteeDays: 15,
      },
    ],
  },
  {
    categoryName: "NEET",
    categorySlug: "neet",
    courses: [
      {
        id: '6845b4b8188aa67dd40937dd',
        title: 'NEET Biology In-Depth',
        instructor: 'NEET Prep Experts',
        rating: 4.9,
        reviewsCount: 2800,
        price: 5300,
        originalPrice: 8200,
        category: "NEET",
        imageUrl: 'https://santrapub.com/cdn/shop/files/NEETBiologyf_1200x1200.jpg?v=1733131563',
        dataAiHint: "NEET biology DNA",
        shortDescription: 'Deep dive into NEET Biology with a focus on Botany and Zoology for top scores.',
        duration: '140 hours total',
        level: 'Advanced',
        description: 'NEET Prep Experts bring you an in-depth Biology course covering all NEET topics with detailed explanations, diagrams, and practice questions.',
        curriculum: [
          { id: 'm1np01', title: 'Botany Fundamentals', order: 1, lessons: [{ id: 'l1m1np01', title: 'Plant Anatomy', type: 'video', duration: '3h', order: 1 }] },
          { id: 'm2np01', title: 'Zoology Insights', order: 2, lessons: [{ id: 'l1m2np01', title: 'Animal Kingdom', type: 'video', duration: '3h', order: 1 }] },
        ],
        studentsEnrolled: 6900,
        lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString().split('T')[0],
        language: 'English',
        certificateAvailable: true,
        highlights: ['Detailed diagrams', 'NCERT-focused content', 'Practice questions', 'Revision sessions'],
        providerInfo: { name: "NEET Prep Experts", verified: true, logoUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=NP', type: 'Coaching Center' },
        approvalStatus: 'approved',
        moneyBackGuaranteeDays: 15,
      },
      {
        id: 'neet-showcase-2',
        title: 'NEET Physics Problem Solving',
        instructor: 'Alpha Medical Academy',
        rating: 4.7,
        reviewsCount: 2100,
        price: 4900,
        originalPrice: 7500,
        category: "NEET",
        imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        dataAiHint: "NEET physics formulas",
        shortDescription: 'Boost your NEET Physics score with this problem-solving focused course.',
        duration: '100 hours total',
        level: 'Advanced',
        description: 'Alpha Medical Academy’s NEET Physics course emphasizes problem-solving techniques with a focus on Mechanics, Optics, and Modern Physics.',
        curriculum: [
          { id: 'm1am01', title: 'Mechanics for NEET', order: 1, lessons: [{ id: 'l1m1am01', title: 'Kinematics', type: 'video', duration: '2h', order: 1 }] },
          { id: 'm2am01', title: 'Optics', order: 2, lessons: [{ id: 'l1m2am01', title: 'Wave Optics', type: 'video', duration: '2h', order: 1 }] },
        ],
        studentsEnrolled: 5400,
        lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString().split('T')[0],
        language: 'English',
        certificateAvailable: true,
        highlights: ['Problem-solving focus', 'Formula sheets', 'NEET pattern questions', 'Regular tests'],
        providerInfo: { name: "Alpha Medical Academy", verified: true, logoUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=AM', type: 'Institute' },
        approvalStatus: 'approved',
        moneyBackGuaranteeDays: 15,
      },
      {
        id: 'neet-showcase-3',
        title: 'NEET Chemistry Simplified',
        instructor: 'Med Scholars Hub',
        rating: 4.8,
        reviewsCount: 2400,
        price: 5100,
        originalPrice: 7800,
        category: "NEET",
        imageUrl: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        dataAiHint: "NEET chemistry beakers",
        shortDescription: 'Simplify NEET Chemistry with this course covering Organic, Inorganic, and Physical Chemistry.',
        duration: '120 hours total',
        level: 'Advanced',
        description: 'Med Scholars Hub offers a simplified NEET Chemistry course with easy explanations, reaction mechanisms, and practice problems.',
        curriculum: [
          { id: 'm1ms01', title: 'Organic Chemistry', order: 1, lessons: [{ id: 'l1m1ms01', title: 'Alkanes & Alkenes', type: 'video', duration: '2.5h', order: 1 }] },
          { id: 'm2ms01', title: 'Inorganic Chemistry', order: 2, lessons: [{ id: 'l1m2ms01', title: 'Periodic Table', type: 'video', duration: '2h', order: 1 }] },
        ],
        studentsEnrolled: 6100,
        lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString().split('T')[0],
        language: 'English',
        certificateAvailable: true,
        highlights: ['Simplified explanations', 'Reaction mechanisms', 'Practice problems', 'Mock tests'],
        providerInfo: { name: "Med Scholars Hub", verified: true, logoUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=MS', type: 'Institute' },
        approvalStatus: 'approved',
        moneyBackGuaranteeDays: 15,
      },
      {
        id: 'neet-showcase-4',
        title: 'NEET Full Mock Test Series',
        instructor: 'Target NEET',
        rating: 4.6,
        reviewsCount: 1900,
        price: 3500,
        originalPrice: 5500,
        category: "NEET",
        imageUrl: 'https://plus.unsplash.com/premium_photo-1683121859548-b4514fa05e52?q=80&w=1998&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        dataAiHint: "NEET exam hall",
        shortDescription: 'Prepare for NEET with this full mock test series designed to simulate the real exam.',
        duration: '50 hours total',
        level: 'Advanced',
        description: 'Target NEET’s mock test series includes full-length tests, detailed solutions, and performance analysis to help you excel in the NEET exam.',
        curriculum: [
          { id: 'm1tn01', title: 'Mock Test 1', order: 1, lessons: [{ id: 'l1m1tn01', title: 'Full-Length Test 1', type: 'quiz', duration: '3h', order: 1 }] },
          { id: 'm2tn01', title: 'Mock Test 2', order: 2, lessons: [{ id: 'l1m2tn01', title: 'Full-Length Test 2', type: 'quiz', duration: '3h', order: 1 }] },
        ],
        studentsEnrolled: 4800,
        lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString().split('T')[0],
        language: 'English',
        certificateAvailable: false,
        highlights: ['Full-length mock tests', 'Detailed solutions', 'Performance analysis', 'Exam simulation'],
        providerInfo: { name: "Target NEET", verified: true, logoUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=TN', type: 'Coaching Center' },
        approvalStatus: 'approved',
        moneyBackGuaranteeDays: 7,
      },
    ],
  },
  {
    categoryName: "Government Exams",
    categorySlug: "gov-exams",
    courses: [
      {
        id: 'govexams-showcase-1',
        title: 'UPSC Civil Services GS Foundation',
        instructor: 'Sarkari Pariksha Pro',
        rating: 4.8,
        reviewsCount: 3000,
        price: 6000,
        originalPrice: 9000,
        category: "Government Exams",
        imageUrl: 'https://images.unsplash.com/photo-1643706755594-d0e8d8d42a09?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        dataAiHint: "UPSC exam books",
        shortDescription: 'Build a strong foundation for UPSC Civil Services with this GS-focused course.',
        duration: '150 hours total',
        level: 'Advanced',
        description: 'Sarkari Pariksha Pro offers a comprehensive GS Foundation course for UPSC aspirants, covering History, Geography, Polity, and Current Affairs.',
        curriculum: [
          { id: 'm1sp01', title: 'History for UPSC', order: 1, lessons: [{ id: 'l1m1sp01', title: 'Ancient India', type: 'video', duration: '2.5h', order: 1 }] },
          { id: 'm2sp01', title: 'Geography Concepts', order: 2, lessons: [{ id: 'l1m2sp01', title: 'Physical Geography', type: 'video', duration: '2h', order: 1 }] },
        ],
        studentsEnrolled: 7100,
        lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString().split('T')[0],
        language: 'English',
        certificateAvailable: true,
        highlights: ['Comprehensive GS coverage', 'Current affairs updates', 'Answer writing practice', 'Expert guidance'],
        providerInfo: { name: "Sarkari Pariksha Pro", verified: true, logoUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=SP', type: 'Institute' },
        approvalStatus: 'approved',
        moneyBackGuaranteeDays: 15,
      },
      {
        id: 'govexams-showcase-2',
        title: 'Banking Exams: Quant & Reasoning',
        instructor: 'IBPS Masters',
        rating: 4.7,
        reviewsCount: 2500,
        price: 3500,
        originalPrice: 5500,
        category: "Government Exams",
        imageUrl: 'https://images.unsplash.com/photo-1601987177651-8edfe6c20009?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        dataAiHint: "Banking exam graphs",
        shortDescription: 'Excel in Banking Exams with this Quantitative Aptitude and Reasoning course.',
        duration: '80 hours total',
        level: 'Intermediate',
        description: 'IBPS Masters provides a focused course on Quantitative Aptitude and Reasoning for Banking Exams like IBPS PO and SBI Clerk.',
        curriculum: [
          { id: 'm1im01', title: 'Quantitative Aptitude', order: 1, lessons: [{ id: 'l1m1im01', title: 'Number Systems', type: 'video', duration: '2h', order: 1 }] },
          { id: 'm2im01', title: 'Logical Reasoning', order: 2, lessons: [{ id: 'l1m2im01', title: 'Puzzles', type: 'video', duration: '2h', order: 1 }] },
        ],
        studentsEnrolled: 5900,
        lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString().split('T')[0],
        language: 'English',
        certificateAvailable: true,
        highlights: ['Banking exam focus', 'Quantitative techniques', 'Reasoning practice', 'Mock tests'],
        providerInfo: { name: "IBPS Masters", verified: true, logoUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=IM', type: 'Coaching Center' },
        approvalStatus: 'approved',
        moneyBackGuaranteeDays: 7,
      },
      {
        id: 'govexams-showcase-3',
        title: 'SSC CGL Tier 1 & 2 Comprehensive',
        instructor: 'ExamCrackers Academy',
        rating: 4.6,
        reviewsCount: 2200,
        price: 4000,
        originalPrice: 6500,
        category: "Government Exams",
        imageUrl: 'https://plus.unsplash.com/premium_photo-1695449439526-9cebdbfa1a2c?q=80&w=2009&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        dataAiHint: "SSC CGL study material",
        shortDescription: 'Prepare for SSC CGL Tier 1 & 2 with this comprehensive course.',
        duration: '110 hours total',
        level: 'Intermediate',
        description: 'ExamCrackers Academy offers a complete preparation course for SSC CGL Tier 1 & 2, covering all sections with practice tests.',
        curriculum: [
          { id: 'm1ec01', title: 'Tier 1 Preparation', order: 1, lessons: [{ id: 'l1m1ec01', title: 'General Awareness', type: 'video', duration: '2h', order: 1 }] },
          { id: 'm2ec01', title: 'Tier 2 Focus', order: 2, lessons: [{ id: 'l1m2ec01', title: 'Quantitative Abilities', type: 'video', duration: '2h', order: 1 }] },
        ],
        studentsEnrolled: 5200,
        lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString().split('T')[0],
        language: 'English',
        certificateAvailable: true,
        highlights: ['All sections covered', 'Practice tests', 'Detailed explanations', 'Time management tips'],
        providerInfo: { name: "ExamCrackers Academy", verified: true, logoUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=EC', type: 'Coaching Center' },
        approvalStatus: 'approved',
        moneyBackGuaranteeDays: 7,
      },
      {
        id: 'govexams-showcase-4',
        title: 'State PSC General Studies Special',
        instructor: 'Public Service Pathshala',
        rating: 4.5,
        reviewsCount: 1800,
        price: 3800,
        originalPrice: 6000,
        category: "Government Exams",
        imageUrl: 'https://campustechnology.com/-/media/EDU/CampusTechnology/2019-Images/20191209online.jpg',
        dataAiHint: "State PSC map India",
        shortDescription: 'Prepare for State PSC exams with this General Studies course.',
        duration: '90 hours total',
        level: 'Intermediate',
        description: 'Public Service Pathshala’s General Studies course for State PSC exams covers regional and national topics with a focus on exam patterns.',
        curriculum: [
          { id: 'm1ps01', title: 'State-Specific Topics', order: 1, lessons: [{ id: 'l1m1ps01', title: 'State History', type: 'video', duration: '2h', order: 1 }] },
          { id: 'm2ps01', title: 'National GS', order: 2, lessons: [{ id: 'l1m2ps01', title: 'Indian Polity', type: 'video', duration: '2h', order: 1 }] },
        ],
        studentsEnrolled: 4500,
        lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString().split('T')[0],
        language: 'English',
        certificateAvailable: true,
        highlights: ['State-specific content', 'National GS coverage', 'Exam pattern focus', 'Practice questions'],
        providerInfo: { name: "Public Service Pathshala", verified: true, logoUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=PS', type: 'Institute' },
        approvalStatus: 'approved',
        moneyBackGuaranteeDays: 7,
      },
    ],
  },
  {
    categoryName: "Computer Science",
    categorySlug: "computer-science",
    courses: [
      {
        id: 'cs-showcase-1',
        title: 'Machine Learning A-Z™: Python & R',
        instructor: 'Innovate Skill Hub',
        rating: 4.9,
        reviewsCount: 3500,
        price: 3200,
        originalPrice: 6000,
        category: "Computer Science",
        imageUrl: 'https://plus.unsplash.com/premium_photo-1682124651258-410b25fa9dc0?q=80&w=1921&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        dataAiHint: "Machine Learning neural network",
        shortDescription: 'Learn Machine Learning from scratch using Python and R with hands-on projects.',
        duration: '90 hours total',
        level: 'Intermediate',
        description: 'Innovate Skill Hub’s Machine Learning A-Z course covers supervised and unsupervised learning, with practical projects in Python and R.',
        curriculum: [
          { id: 'm1is01', title: 'ML Basics', order: 1, lessons: [{ id: 'l1m1is01', title: 'Regression Models', type: 'video', duration: '3h', order: 1 }] },
          { id: 'm2is01', title: 'Advanced ML', order: 2, lessons: [{ id: 'l1m2is01', title: 'Neural Networks', type: 'video', duration: '3h', order: 1 }] },
        ],
        studentsEnrolled: 9000,
        lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString().split('T')[0],
        language: 'English',
        certificateAvailable: true,
        highlights: ['Hands-on projects', 'Python & R focus', 'Supervised & unsupervised learning', 'Practical applications'],
        providerInfo: { name: "Innovate Skill Hub", verified: true, logoUrl: placeholderUsers.find(u=>u.email === 'innovate.skillhub@example.com')?.avatarUrl || 'https://placehold.co/100x100/EBF4FF/3B82F6?text=IS', type: 'Institute' },
        approvalStatus: 'approved',
        freeTrialAvailable: true,
      },
      {
        id: 'cs-showcase-2',
        title: 'Data Structures & Algorithms Bootcamp',
        instructor: 'Expert Tutors Academy',
        rating: 4.8,
        reviewsCount: 2800,
        price: 2800,
        originalPrice: 5000,
        category: "Computer Science",
        imageUrl: 'https://plus.unsplash.com/premium_photo-1681810994162-43dbe0919d3f?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        dataAiHint: "Data Structures algorithms code",
        shortDescription: 'Master Data Structures and Algorithms for coding interviews with this bootcamp.',
        duration: '70 hours total',
        level: 'Intermediate',
        description: 'Expert Tutors Academy’s DSA Bootcamp prepares you for coding interviews with in-depth coverage of arrays, linked lists, trees, and more.',
        curriculum: [
          { id: 'm1et01', title: 'Arrays & Linked Lists', order: 1, lessons: [{ id: 'l1m1et01', title: 'Array Operations', type: 'video', duration: '2h', order: 1 }] },
          { id: 'm2et01', title: 'Trees & Graphs', order: 2, lessons: [{ id: 'l1m2et01', title: 'Binary Trees', type: 'video', duration: '2h', order: 1 }] },
        ],
        studentsEnrolled: 7500,
        lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString().split('T')[0],
        language: 'English',
        certificateAvailable: true,
        highlights: ['Coding interview prep', 'In-depth DSA coverage', 'Practice problems', 'Time complexity analysis'],
        providerInfo: { name: "Expert Tutors Academy", verified: true, logoUrl: placeholderUsers.find(u=>u.email === 'expert.tutors@example.com')?.avatarUrl || 'https://placehold.co/100x100/EBF4FF/3B82F6?text=ET', type: 'Coaching Center' },
        approvalStatus: 'approved',
        freeTrialAvailable: true,
      },
      {
        id: 'cs-showcase-3',
        title: 'Deep Learning Specialization (TensorFlow)',
        instructor: 'AI Learning Co.',
        rating: 4.7,
        reviewsCount: 2600,
        price: 3500,
        originalPrice: 6500,
        category: "Computer Science",
        imageUrl: 'https://plus.unsplash.com/premium_photo-1676637656166-cb7b3a43b81a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        dataAiHint: "Deep Learning AI brain",
        shortDescription: 'Specialize in Deep Learning with TensorFlow through this advanced course.',
        duration: '85 hours total',
        level: 'Advanced',
        description: 'AI Learning Co.’s Deep Learning Specialization covers neural networks, CNNs, and RNNs using TensorFlow, with real-world projects.',
        curriculum: [
          { id: 'm1ai01', title: 'Neural Networks', order: 1, lessons: [{ id: 'l1m1ai01', title: 'Basics of NNs', type: 'video', duration: '3h', order: 1 }] },
          { id: 'm2ai01', title: 'CNNs & RNNs', order: 2, lessons: [{ id: 'l1m2ai01', title: 'Convolutional NNs', type: 'video', duration: '3h', order: 1 }] },
        ],
        studentsEnrolled: 6800,
        lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString().split('T')[0],
        language: 'English',
        certificateAvailable: true,
        highlights: ['TensorFlow focus', 'Real-world projects', 'Deep learning concepts', 'Advanced neural networks'],
        providerInfo: { name: "AI Learning Co.", verified: true, logoUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=AI', type: 'Institute' },
        approvalStatus: 'approved',
        freeTrialAvailable: true,
      },
      {
        id: 'cs-showcase-4',
        title: 'Algorithmic Toolbox: Core Algorithms',
        instructor: 'CodeMasters Institute',
        rating: 4.6,
        reviewsCount: 2000,
        price: 2500,
        originalPrice: 4500,
        category: "Computer Science",
        imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        dataAiHint: "Algorithms flowchart logic",
        shortDescription: 'Learn core algorithms with this toolbox course for programming enthusiasts.',
        duration: '60 hours total',
        level: 'Intermediate',
        description: 'CodeMasters Institute’s Algorithmic Toolbox course teaches core algorithms like sorting, searching, and dynamic programming with practical examples.',
        curriculum: [
          { id: 'm1cm01', title: 'Sorting Algorithms', order: 1, lessons: [{ id: 'l1m1cm01', title: 'Bubble Sort', type: 'video', duration: '1.5h', order: 1 }] },
          { id: 'm2cm01', title: 'Dynamic Programming', order: 2, lessons: [{ id: 'l1m2cm01', title: 'Knapsack Problem', type: 'video', duration: '2h', order: 1 }] },
        ],
        studentsEnrolled: 5200,
        lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString().split('T')[0],
        language: 'English',
        certificateAvailable: true,
        highlights: ['Core algorithm focus', 'Practical examples', 'Coding practice', 'Problem-solving skills'],
        providerInfo: { name: "CodeMasters Institute", verified: true, logoUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=CM', type: 'Institute' },
        approvalStatus: 'approved',
        freeTrialAvailable: true,
      },
    ],
  },
];


export const placeholderReviews: Review[] = placeholderCourses.concat(featuredCoursesForHomepage).concat(topCategoryShowcaseData.flatMap(cat => cat.courses)).flatMap(course =>
  Array.from({ length: Math.floor(Math.random() * 10) + 3 }, (_, i) => {
    const studentUsers = placeholderUsers.filter(u => u.role === 'student');
    const reviewer = studentUsers[i % studentUsers.length];
    return {
    id: `review${course.id}-${i}`,
    courseId: course.id,
    userId: reviewer.id,
    userName: reviewer.name,
    userAvatar: reviewer.avatarUrl,
    rating: Math.floor(Math.random() * 2) + 4,
    comment: `The ${course.category.toLowerCase()} course by ${course.providerInfo?.name || course.instructor} was ${['excellent', 'very informative', 'a great learning experience', 'challenging but rewarding', 'highly recommended'][i%5]}! I learned a lot about advanced concepts and the practical examples were very helpful. The instructor's explanations were ${['clear and concise', 'very detailed', 'easy to follow'][i%3]}. Definitely worth the investment.`,
    createdAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 200).toISOString().split('T')[0],
    helpfulVotes: Math.floor(Math.random() * 150),
    unhelpfulVotes: Math.floor(Math.random() * 10),
    moderationStatus: i % 6 === 0 ? 'pending' : (i % 6 === 1 ? 'rejected' : 'approved'),
  }})
);

export const placeholderCertificates: Certificate[] = placeholderCourses
  .filter(c => c.certificateAvailable && c.studentsEnrolled && c.studentsEnrolled > 700 && c.approvalStatus === 'approved')
  .slice(0,5)
  .map((course, i) => ({
    id: `cert${course.id}-${placeholderUsers[i % placeholderUsers.filter(u=>u.role === 'student').length].id}`,
    courseId: course.id,
    courseTitle: course.title,
    studentName: placeholderUsers[i % placeholderUsers.filter(u=>u.role === 'student').length].name,
    issueDate: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 45 * (i+1)).toISOString().split('T')[0],
    certificateUrl: `/placeholder-certificate-${course.id}.pdf`
}));

export const placeholderOrders: Order[] = Array.from({ length: 10 }, (_, i) => {
  const studentUser = placeholderUsers.filter(u => u.role === 'student')[i % placeholderUsers.filter(u => u.role === 'student').length];
  const numItems = Math.floor(Math.random() * 2) + 1;
  const items = placeholderCourses.filter(c => c.approvalStatus === 'approved').slice(i * 2, i * 2 + numItems);
  const totalAmount = items.reduce((sum, item) => sum + item.price, 0);
  return {
    id: `order${i + 1}`,
    userId: studentUser.id,
    items: items,
    totalAmount: totalAmount,
    paymentMethod: ['Credit Card', 'UPI', 'Net Banking', 'Wallet'][i % 4],
    status: (i % 5 === 0) ? 'pending' : (i % 5 === 1 ? 'failed' : (i % 5 === 2 ? 'refunded' : 'completed')),
    orderDate: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * (i + 3)).toISOString().split('T')[0],
    transactionId: `txn_${Math.random().toString(36).substring(2, 10)}`
  };
});


export const getCourseById = (id: string): Course | undefined => {
    const allCourses = [
        ...placeholderCourses, 
        ...featuredCoursesForHomepage,
        ...topCategoryShowcaseData.flatMap(cat => cat.courses)
    ];
    // Remove duplicates by ID, preferring the first encountered (e.g. from specific lists)
    const uniqueCourses = Array.from(new Map(allCourses.map(course => [course.id, course])).values());
    return uniqueCourses.find(c => c.id === id);
}

export const getReviewsByCourseId = (courseId: string): Review[] => placeholderReviews.filter(r => r.courseId === courseId);

export const getCoursesByCategory = (categorySlug: string): Course[] => {
    const category = CATEGORIES.find(cat => cat.slug === categorySlug);
    if (!category) return [];
    // Combine all course sources and filter
    const allCourses = [
        ...placeholderCourses, 
        ...featuredCoursesForHomepage,
        ...topCategoryShowcaseData.flatMap(cat => cat.courses)
    ];
    const uniqueCourses = Array.from(new Map(allCourses.map(course => [course.id, course])).values());
    return uniqueCourses.filter(course => course.category === category.name && course.approvalStatus === 'approved');
};
export const getCertificatesByUserId = (userId: string): Certificate[] => {
    const user = placeholderUsers.find(u => u.id === userId);
    if (!user) return [];
    return placeholderCertificates.filter(cert => cert.studentName === user.name);
};
export const getOrdersByUserId = (userId: string): Order[] => placeholderOrders.filter(order => order.userId === userId);

const approvedAndPublishedCourses = placeholderCourses.filter(c => c.approvalStatus === 'approved');
export const recommendedCourses = approvedAndPublishedCourses.slice(4, 8);
export const recentlyViewedCourses = approvedAndPublishedCourses.slice(8,12);
export const popularCategories = CATEGORIES.slice(0,6);

export const getSellerCourses = (sellerId: string): Course[] => {
  const allCourses = [
        ...placeholderCourses, 
        ...featuredCoursesForHomepage,
        ...topCategoryShowcaseData.flatMap(cat => cat.courses)
    ];
  const uniqueCourses = Array.from(new Map(allCourses.map(course => [course.id, course])).values());
  return uniqueCourses.filter(course => course.sellerId === sellerId || course.providerInfo?.name === placeholderUsers.find(u=>u.id === sellerId)?.name);
}

export const getSellerReviews = (sellerId: string): Review[] => {
  const sellerCourseIds = getSellerCourses(sellerId).map(c => c.id);
  return placeholderReviews.filter(review => sellerCourseIds.includes(review.courseId));
}

export const getSellerTotalRevenue = (sellerId: string): number => {
  const sellerCourseIds = getSellerCourses(sellerId).map(c => c.id);
  return placeholderOrders
    .filter(order => order.status === 'completed')
    .flatMap(order => order.items)
    .filter(item => sellerCourseIds.includes(item.id))
    .reduce((sum, item) => sum + item.price, 0) * 0.85; // Assuming 15% platform fee
}

export const getSellerTotalStudents = (sellerId: string): number => {
  return getSellerCourses(sellerId).reduce((sum, course) => sum + (course.studentsEnrolled || 0), 0);
}
