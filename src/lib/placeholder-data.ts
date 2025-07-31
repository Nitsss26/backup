
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

const generateObjectIdString = () => new mongoose.Types.ObjectId().toHexString();

export const placeholderUsers: (Omit<User, 'id'> & { _id: string; id: string })[] = [
  // Students
  { _id: "6845b4ad188aa67dd409342b", id: "6845b4ad188aa67dd409342b", name: indianStudentNames[0], email: 'priya.sharma@example.com', role: 'student', avatarUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=PS', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), bio: "Lifelong learner passionate about technology and design.", notificationPreferences: { courseUpdates: true, promotions: false, platformAnnouncements: true } },
  { _id: "6845b4ad188aa67dd409342e", id: "6845b4ad188aa67dd409342e", name: indianStudentNames[1], email: 'rahul.kumar@example.com', role: 'student', avatarUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=RK', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), bio: "Exploring new skills to advance my career in finance.", notificationPreferences: { courseUpdates: true, promotions: true, platformAnnouncements: true } },
  { _id: "6845b4ad188aa67dd4093431", id: "6845b4ad188aa67dd4093431", name: indianStudentNames[2], email: 'ananya.singh@example.com', role: 'student', avatarUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=AS', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 40).toISOString(), bio: "Preparing for NEET and exploring creative writing.", notificationPreferences: { courseUpdates: false, promotions: false, platformAnnouncements: true } },
  { _id: "6845b4ad188aa67dd4093433", id: "6845b4ad188aa67dd4093433", name: indianStudentNames[3], email: 'amit.patel@example.com', role: 'student', avatarUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=AP', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(), bio: "Student of Computer Science, eager to learn new programming languages.", notificationPreferences: { courseUpdates: true, promotions: true, platformAnnouncements: false } },
  { _id: "6845b4ad188aa67dd4093434", id: "6845b4ad188aa67dd4093434", name: indianStudentNames[4], email: 'sneha.reddy@example.com', role: 'student', avatarUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=SR', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(), bio: "Future marketing professional, looking for courses on digital marketing.", notificationPreferences: { courseUpdates: true, promotions: true, platformAnnouncements: true } },

  // Providers/Sellers
  { _id: "6845b4ad188aa67dd409342c", id: "6845b4ad188aa67dd409342c", name: indianSellerNames[0], email: 'expert.tutors@example.com', role: 'provider', avatarUrl: 'https://placehold.co/100x100/CCDEF9/1E40AF?text=ET', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(), verificationStatus: 'pending', documentsSubmitted: true, bio: "Dedicated to providing top-notch coding bootcamps and exam preparation courses. We believe in practical learning." },
  { _id: "6845b4ad188aa67dd409342f", id: "6845b4ad188aa67dd409342f", name: indianSellerNames[1], email: 'kaushik.learning@example.com', role: 'provider', avatarUrl: 'https://placehold.co/100x100/CCDEF9/1E40AF?text=KL', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(), verificationStatus: 'verified', documentsSubmitted: true, bio: "Leading institution for business, finance, and government exam courses. Our faculty are industry experts." },
  { _id: "6845b4ad188aa67dd4093430", id: "6845b4ad188aa67dd4093430", name: indianSellerNames[2], email: 'vidya.mandir@example.com', role: 'provider', avatarUrl: 'https://placehold.co/100x100/CCDEF9/1E40AF?text=VM', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), verificationStatus: 'rejected', documentsSubmitted: true, bio: "Specialized in language learning and arts. We focus on immersive learning experiences." },
  { _id: "6845b4b7188aa67dd4093432", id: "6845b4b7188aa67dd4093432", name: indianSellerNames[3], email: 'innovate.skillhub@example.com', role: 'provider', avatarUrl: 'https://placehold.co/100x100/CCDEF9/1E40AF?text=IS', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 120).toISOString(), verificationStatus: 'verified', documentsSubmitted: true, bio: "Premier destination for cutting-edge Computer Science and Personal Development programs. We foster innovation." },
  { _id: "6845b4ad188aa67dd4093435", id: "6845b4ad188aa67dd4093435", name: indianSellerNames[4], email: 'gyan.ganga@example.com', role: 'provider', avatarUrl: 'https://placehold.co/100x100/CCDEF9/1E40AF?text=GG', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 200).toISOString(), verificationStatus: 'unverified', documentsSubmitted: false, bio: "Traditional and modern teaching methods for competitive exams and skill development." },
  
  // Admin
  { _id: "6845b4ad188aa67dd409342d", id: "6845b4ad188aa67dd409342d", name: indianAdminName, email: 'admin@example.com', role: 'admin', avatarUrl: 'https://placehold.co/100x100/7CB9F9/183265?text=AK', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(), bio: "Ensuring EdTechCart runs smoothly for everyone. Committed to quality and user satisfaction." },
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
    _id: generateObjectIdString(),
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
    _id: '6845b4b7188aa67dd4093785',
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
    _id: '6845b4b7188aa67dd4093790',
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
    _id: '6845b4b7188aa67dd409379b',
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
    _id: '6845b4b7188aa67dd40937a6',
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
        _id: '6845b4b9188aa67dd4093835',
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



export const topCategoryShowcaseDataPW1 = [
  {
    categoryName: "IIT-JEE",
    categorySlug: "iit-jee",
    courses: [
      {
        "_id": "64c8b4ae188aa67dd4093576",
        "title": "Vijay GATE 2026 Rank Improvement Batch Electronics",
        "instructor": "PW Faculty",
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
        "lastUpdated": "2025-07-02T00:00:00.000Z",
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
        "id": "64c8b4ae188aa67dd4093576"
      },
      {
        "_id": "64c8b4ae188aa67dd4093633",
        "title": "Data Science With Generative AI Course",
        "instructor": "PW Skills Faculty",
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
        "lastUpdated": "2025-07-01T00:00:00.000Z",
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
        "id": "64c8b4ae188aa67dd4093633"
      }

    ,  {
        "_id": "64c8b4ae188aa67dd4093621",
        "title": "Offline UPSC GS Foundation (Target 2026) - English",
        "instructor": "PW Faculty",
        "rating": 4.5,
        "reviewsCount": 420,
        "price": 11800,
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
            "_id": "64c8b4ae188aa67dd4093633",
            "title": "Data Science With Generative AI Course",
            "instructor": "PW Skills Faculty",
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
            "lastUpdated": "2025-07-01T00:00:00.000Z",
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
            "id": "64c8b4ae188aa67dd4093633"
          },{
            "_id": "64c8b4ae188aa67dd4093547",
            "title": "Arjuna JEE 2.0 2026",
            "instructor": "PW Faculty",
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
            "lastUpdated": "2025-05-26T00:00:00.000Z",
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
            "id": "64c8b4ae188aa67dd4093547"
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
        "lastUpdated": "2024-04-30T00:00:00.000Z",
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
        "id": "64c8b4ae188aa67dd4093621"
      },
      {
        "_id": "64c8b4ae188aa67dd4093547",
        "title": "Arjuna JEE 2.0 2026",
        "instructor": "PW Faculty",
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
        "lastUpdated": "2025-05-26T00:00:00.000Z",
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
        "id": "64c8b4ae188aa67dd4093547"
      }
    
    ],
  },
  {
    categoryName: "NEET",
    categorySlug: "neet",
    courses: [
    
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
        id: '6845b4b8188aa67dd40937dd',
        _id: '6845b4b8188aa67dd40937dd',
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
        _id: '6845b4b8188aa67dd40937de',
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
        _id: '6845b4b8188aa67dd40937df',
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
        _id: '6845b4b8188aa67dd40937e0',
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
        _id: '6845b4b8188aa67dd40937e1',
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
        _id: '6845b4b8188aa67dd40937e2',
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
        _id: '6845b4b8188aa67dd40937e3',
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
        _id: '6845b4b8188aa67dd40937e4',
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
        _id: '6845b4b8188aa67dd40937e5',
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
        _id: '6845b4b8188aa67dd40937e6',
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
        _id: '6845b4b8188aa67dd40937e7',
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
        _id: '6845b4b8188aa67dd40937e8',
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


export const topCategoryShowcaseDataPW = [
  {
    categoryName: "IIT-JEE",
    categorySlug: "iit-jee",
    courses: [

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
    
    ],
  },
  {
    categoryName: "NEET",
    categorySlug: "neet",
    courses: [
    
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
        id: '6845b4b8188aa67dd40937dd',
        _id: '6845b4b8188aa67dd40937dd',
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
        _id: '6845b4b8188aa67dd40937de',
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
        _id: '6845b4b8188aa67dd40937df',
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
        _id: '6845b4b8188aa67dd40937e0',
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
        _id: '6845b4b8188aa67dd40937e1',
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
        _id: '6845b4b8188aa67dd40937e2',
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
        _id: '6845b4b8188aa67dd40937e3',
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
        _id: '6845b4b8188aa67dd40937e4',
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
        _id: '6845b4b8188aa67dd40937e5',
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
        _id: '6845b4b8188aa67dd40937e6',
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
        _id: '6845b4b8188aa67dd40937e7',
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
        _id: '6845b4b8188aa67dd40937e8',
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
        _id: '6845b4b7188aa67dd40937b1',
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
        _id: '6845b4b7188aa67dd40937bc',
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
        _id: '6845b4b7188aa67dd40937c7',
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
        _id: '6845b4b8188aa67dd40937d2',
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
        _id: '6845b4b8188aa67dd40937dd',
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
        _id: '6845b4b8188aa67dd40937de',
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
        _id: '6845b4b8188aa67dd40937df',
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
        _id: '6845b4b8188aa67dd40937e0',
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
        _id: '6845b4b8188aa67dd40937e1',
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
        _id: '6845b4b8188aa67dd40937e2',
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
        _id: '6845b4b8188aa67dd40937e3',
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
        _id: '6845b4b8188aa67dd40937e4',
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
        _id: '6845b4b8188aa67dd40937e5',
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
        _id: '6845b4b8188aa67dd40937e6',
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
        _id: '6845b4b8188aa67dd40937e7',
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
        _id: '6845b4b8188aa67dd40937e8',
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


export const placeholderReviews: Review[] = [
    ...placeholderCourses, 
    ...featuredCoursesForHomepage,
    ...topCategoryShowcaseData.flatMap(cat => cat.courses)
  ]
  .filter(course => course && course.id) // Filter out any undefined/null courses or courses without an ID
  .flatMap(course =>
    Array.from({ length: Math.floor(Math.random() * 10) + 3 }, (_, i) => {
      const studentUsers = placeholderUsers.filter(u => u.role === 'student');
      const reviewer = studentUsers[i % studentUsers.length];
      return {
        id: `review${course.id}-${i}`,
        _id: generateObjectIdString(),
        courseId: course.id,
        userId: reviewer.id,
        userName: reviewer.name,
        userAvatar: reviewer.avatarUrl,
        rating: Math.floor(Math.random() * 2) + 4,
        comment: `The ${course.category.toLowerCase()} course by ${course.providerInfo?.name || course.instructor} was ${['excellent', 'very informative', 'a great learning experience', 'challenging but rewarding', 'highly recommended'][i % 5]}! I learned a lot about advanced concepts and the practical examples were very helpful. The instructor's explanations were ${['clear and concise', 'very detailed', 'easy to follow'][i % 3]}. Definitely worth the investment.`,
        createdAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 200).toISOString().split('T')[0],
        helpfulVotes: Math.floor(Math.random() * 150),
        unhelpfulVotes: Math.floor(Math.random() * 10),
        moderationStatus: i % 6 === 0 ? 'pending' : (i % 6 === 1 ? 'rejected' : 'approved'),
      };
    })
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
