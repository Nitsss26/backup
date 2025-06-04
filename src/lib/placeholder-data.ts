
import type { Course, Review, User, Certificate, Order } from './types';
import { CATEGORIES, DIFFICULTY_LEVELS, LANGUAGES, INSTRUCTOR_TYPES } from './constants';

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
  { id: 'user1', name: indianStudentNames[0], email: 'priya.sharma@example.com', role: 'student', avatarUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=PS', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), bio: "Lifelong learner passionate about technology and design.", notificationPreferences: { courseUpdates: true, promotions: false, platformAnnouncements: true } },
  { id: 'user4', name: indianStudentNames[1], email: 'rahul.kumar@example.com', role: 'student', avatarUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=RK', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), bio: "Exploring new skills to advance my career in finance.", notificationPreferences: { courseUpdates: true, promotions: true, platformAnnouncements: true } },
  { id: 'user7', name: indianStudentNames[2], email: 'ananya.singh@example.com', role: 'student', avatarUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=AS', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 40).toISOString(), bio: "Preparing for NEET and exploring creative writing.", notificationPreferences: { courseUpdates: false, promotions: false, platformAnnouncements: true } },
  { id: 'user9', name: indianStudentNames[3], email: 'amit.patel@example.com', role: 'student', avatarUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=AP', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(), bio: "Student of Computer Science, eager to learn new programming languages.", notificationPreferences: { courseUpdates: true, promotions: true, platformAnnouncements: false } },
  { id: 'user10', name: indianStudentNames[4], email: 'sneha.reddy@example.com', role: 'student', avatarUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=SR', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(), bio: "Future marketing professional, looking for courses on digital marketing.", notificationPreferences: { courseUpdates: true, promotions: true, platformAnnouncements: true } },

  // Providers/Sellers
  { id: 'user2', name: indianSellerNames[0], email: 'expert.tutors@example.com', role: 'provider', avatarUrl: 'https://placehold.co/100x100/CCDEF9/1E40AF?text=ET', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(), verificationStatus: 'pending', documentsSubmitted: true, bio: "Dedicated to providing top-notch coding bootcamps and exam preparation courses. We believe in practical learning." },
  { id: 'user5', name: indianSellerNames[1], email: 'kaushik.learning@example.com', role: 'provider', avatarUrl: 'https://placehold.co/100x100/CCDEF9/1E40AF?text=KL', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(), verificationStatus: 'verified', documentsSubmitted: true, bio: "Leading institution for business, finance, and government exam courses. Our faculty are industry experts." },
  { id: 'user6', name: indianSellerNames[2], email: 'vidya.mandir@example.com', role: 'provider', avatarUrl: 'https://placehold.co/100x100/CCDEF9/1E40AF?text=VM', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), verificationStatus: 'rejected', documentsSubmitted: true, bio: "Specialized in language learning and arts. We focus on immersive learning experiences." },
  { id: 'user8', name: indianSellerNames[3], email: 'innovate.skillhub@example.com', role: 'provider', avatarUrl: 'https://placehold.co/100x100/CCDEF9/1E40AF?text=IS', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 120).toISOString(), verificationStatus: 'verified', documentsSubmitted: true, bio: "Premier destination for cutting-edge Computer Science and Personal Development programs. We foster innovation." },
  { id: 'user11', name: indianSellerNames[4], email: 'gyan.ganga@example.com', role: 'provider', avatarUrl: 'https://placehold.co/100x100/CCDEF9/1E40AF?text=GG', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 200).toISOString(), verificationStatus: 'unverified', documentsSubmitted: false, bio: "Traditional and modern teaching methods for competitive exams and skill development." },
  
  // Admin
  { id: 'user3', name: indianAdminName, email: 'admin@example.com', role: 'admin', avatarUrl: 'https://placehold.co/100x100/7CB9F9/183265?text=AK', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(), bio: "Ensuring EdTechCart runs smoothly for everyone. Committed to quality and user satisfaction." },
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
    id: 'featured-iitjee-01',
    title: 'IIT-JEE Physics: Mechanics & Electrodynamics Masterclass',
    instructor: 'Expert Tutors Academy', // Using a placeholder seller name
    sellerId: placeholderUsers.find(u => u.email === 'expert.tutors@example.com')?.id || 'user2',
    rating: 4.8,
    reviewsCount: 1250,
    price: 4999,
    originalPrice: 7999,
    category: 'IIT-JEE',
    imageUrl: 'https://placehold.co/600x400/EBF4FF/3B82F6?text=IIT-JEE+Physics',
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
    providerInfo: { name: 'Expert Tutors Academy', verified: placeholderUsers.find(u => u.email === 'expert.tutors@example.com')?.verificationStatus === 'verified', logoUrl: placeholderUsers.find(u => u.email === 'expert.tutors@example.com')?.avatarUrl, type: 'Coaching Center' },
    approvalStatus: 'approved',
    moneyBackGuaranteeDays: 15,
  },
  {
    id: 'featured-neet-01',
    title: 'NEET Biology: Complete Syllabus Coverage Course',
    instructor: 'Kaushik Learning Solutions', // Using a placeholder seller name
    sellerId: placeholderUsers.find(u => u.email === 'kaushik.learning@example.com')?.id || 'user5',
    rating: 4.9,
    reviewsCount: 1800,
    price: 4499,
    originalPrice: 6999,
    category: 'NEET',
    imageUrl: 'https://placehold.co/600x400/E0F2F7/00BCD4?text=NEET+Biology',
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
    id: 'featured-gov-01',
    title: 'UPSC CSE Prelims: GS Paper 1 Strategy Course',
    instructor: 'Vidya Mandir Online', // Using a placeholder seller name
    sellerId: placeholderUsers.find(u => u.email === 'vidya.mandir@example.com')?.id || 'user6',
    rating: 4.7,
    reviewsCount: 950,
    price: 3500,
    category: 'Government Exams',
    imageUrl: 'https://placehold.co/600x400/FFF9C4/FFC107?text=UPSC+GS+Strategy',
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
    providerInfo: { name: 'Vidya Mandir Online', verified: placeholderUsers.find(u => u.email === 'vidya.mandir@example.com')?.verificationStatus === 'verified', logoUrl: placeholderUsers.find(u => u.email === 'vidya.mandir@example.com')?.avatarUrl, type: 'Institute' },
    approvalStatus: 'approved',
    moneyBackGuaranteeDays: 7,
  },
  {
    id: 'featured-cs-01',
    title: 'Full Stack Web Development Course: React & Node',
    instructor: 'Innovate Skill Hub', // Using a placeholder seller name
    sellerId: placeholderUsers.find(u => u.email === 'innovate.skillhub@example.com')?.id || 'user8',
    rating: 4.9,
    reviewsCount: 2100,
    price: 2999,
    originalPrice: 5999,
    category: 'Computer Science',
    imageUrl: 'https://placehold.co/600x400/D1C4E9/673AB7?text=Full+Stack+Web+Dev',
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
  }
];

// Curated Data for "Top Courses by Category" on Homepage
export const topCategoryShowcaseData = [
  {
    categoryName: "IIT-JEE",
    categorySlug: "iit-jee",
    courses: [
      { id: 'iitjee-showcase-pw', title: 'JEE Physics Ultimate Course', instructor: 'Physics Wallah PVT LTD', imageUrl: 'https://placehold.co/600x400/EBF4FF/0A7AFF?text=JEE+Physics+PW', dataAiHint: "IIT-JEE physics lecture", rating: 4.9, reviewsCount: 2500, price: 5500, category: "IIT-JEE", approvalStatus: 'approved', providerInfo: { name: "Physics Wallah PVT LTD", verified: true, logoUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=PW', type: 'Institute'} },
      { id: 'iitjee-showcase-un', title: 'JEE Chemistry Complete Prep', instructor: 'Unacademy JEE', imageUrl: 'https://placehold.co/600x400/E0F7FA/00ACC1?text=JEE+Chemistry+Unacademy', dataAiHint: "IIT-JEE chemistry experiments", rating: 4.8, reviewsCount: 2200, price: 5200, category: "IIT-JEE", approvalStatus: 'approved', providerInfo: { name: "Unacademy JEE", verified: true, logoUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=UJ', type: 'Institute'} },
      { id: 'iitjee-showcase-ve', title: 'JEE Maths Masterclass', instructor: 'Vedantu JEE', imageUrl: 'https://placehold.co/600x400/FCE4EC/EC407A?text=JEE+Maths+Vedantu', dataAiHint: "IIT-JEE maths problems", rating: 4.7, reviewsCount: 1900, price: 5000, category: "IIT-JEE", approvalStatus: 'approved', providerInfo: { name: "Vedantu JEE", verified: true, logoUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=VJ', type: 'Institute'} },
      { id: 'iitjee-showcase-by', title: 'JEE Full Syllabus Revision', instructor: "Byju's Classes", imageUrl: 'https://placehold.co/600x400/FFF8E1/FFB300?text=JEE+Revision+Byjus', dataAiHint: "IIT-JEE study group", rating: 4.6, reviewsCount: 1800, price: 4800, category: "IIT-JEE", approvalStatus: 'approved', providerInfo: { name: "Byju's Classes", verified: true, logoUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=BC', type: 'Institute'} },
    ]
  },
  {
    categoryName: "NEET",
    categorySlug: "neet",
    courses: [
      { id: 'neet-showcase-1', title: 'NEET Biology In-Depth', instructor: 'NEET Prep Experts', imageUrl: 'https://placehold.co/600x400/E8F5E9/4CAF50?text=NEET+Bio+1', dataAiHint: "NEET biology DNA", rating: 4.9, reviewsCount: 2800, price: 5300, category: "NEET", approvalStatus: 'approved', providerInfo: { name: "NEET Prep Experts", verified: true, logoUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=NP', type: 'Coaching Center'} },
      { id: 'neet-showcase-2', title: 'NEET Physics Problem Solving', instructor: 'Alpha Medical Academy', imageUrl: 'https://placehold.co/600x400/F1F8E9/8BC34A?text=NEET+Physics+2', dataAiHint: "NEET physics formulas", rating: 4.7, reviewsCount: 2100, price: 4900, category: "NEET", approvalStatus: 'approved', providerInfo: { name: "Alpha Medical Academy", verified: true, logoUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=AM', type: 'Institute'} },
      { id: 'neet-showcase-3', title: 'NEET Chemistry Simplified', instructor: 'Med Scholars Hub', imageUrl: 'https://placehold.co/600x400/F9FBE7/CDDC39?text=NEET+Chemistry+3', dataAiHint: "NEET chemistry beakers", rating: 4.8, reviewsCount: 2400, price: 5100, category: "NEET", approvalStatus: 'approved', providerInfo: { name: "Med Scholars Hub", verified: true, logoUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=MS', type: 'Institute'} },
      { id: 'neet-showcase-4', title: 'NEET Full Mock Test Series', instructor: 'Target NEET', imageUrl: 'https://placehold.co/600x400/FFFDE7/FFEB3B?text=NEET+Mock+Test+4', dataAiHint: "NEET exam hall", rating: 4.6, reviewsCount: 1900, price: 3500, category: "NEET", approvalStatus: 'approved', providerInfo: { name: "Target NEET", verified: true, logoUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=TN', type: 'Coaching Center'} },
    ]
  },
  {
    categoryName: "Government Exams",
    categorySlug: "gov-exams",
    courses: [
      { id: 'govexams-showcase-1', title: 'UPSC Civil Services GS Foundation', instructor: 'Sarkari Pariksha Pro', imageUrl: 'https://placehold.co/600x400/EDE7F6/5E35B1?text=UPSC+GS', dataAiHint: "UPSC exam books", rating: 4.8, reviewsCount: 3000, price: 6000, category: "Government Exams", approvalStatus: 'approved', providerInfo: { name: "Sarkari Pariksha Pro", verified: true, logoUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=SP', type: 'Institute'} },
      { id: 'govexams-showcase-2', title: 'Banking Exams: Quant & Reasoning', instructor: 'IBPS Masters', imageUrl: 'https://placehold.co/600x400/E3F2FD/42A5F5?text=Banking+Quant', dataAiHint: "Banking exam graphs", rating: 4.7, reviewsCount: 2500, price: 3500, category: "Government Exams", approvalStatus: 'approved', providerInfo: { name: "IBPS Masters", verified: true, logoUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=IM', type: 'Coaching Center'} },
      { id: 'govexams-showcase-3', title: 'SSC CGL Tier 1 & 2 Comprehensive', instructor: 'ExamCrackers Academy', imageUrl: 'https://placehold.co/600x400/E8EAF6/7986CB?text=SSC+CGL+Prep', dataAiHint: "SSC CGL study material", rating: 4.6, reviewsCount: 2200, price: 4000, category: "Government Exams", approvalStatus: 'approved', providerInfo: { name: "ExamCrackers Academy", verified: true, logoUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=EC', type: 'Coaching Center'} },
      { id: 'govexams-showcase-4', title: 'State PSC General Studies Special', instructor: 'Public Service Pathshala', imageUrl: 'https://placehold.co/600x400/E1F5FE/29B6F6?text=State+PSC+GS', dataAiHint: "State PSC map India", rating: 4.5, reviewsCount: 1800, price: 3800, category: "Government Exams", approvalStatus: 'approved', providerInfo: { name: "Public Service Pathshala", verified: true, logoUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=PS', type: 'Institute'} },
    ]
  },
  {
    categoryName: "Computer Science",
    categorySlug: "computer-science",
    courses: [
      { id: 'cs-showcase-1', title: 'Machine Learning A-Z™: Python & R', instructor: 'Innovate Skill Hub', imageUrl: 'https://placehold.co/600x400/FBEAEB/D96666?text=Machine+Learning+AZ', dataAiHint: "Machine Learning neural network", rating: 4.9, reviewsCount: 3500, price: 3200, category: "Computer Science", approvalStatus: 'approved', providerInfo: { name: "Innovate Skill Hub", verified: true, logoUrl: placeholderUsers.find(u=>u.email === 'innovate.skillhub@example.com')?.avatarUrl || 'https://placehold.co/100x100/EBF4FF/3B82F6?text=IS', type: 'Institute'} },
      { id: 'cs-showcase-2', title: 'Data Structures & Algorithms Bootcamp', instructor: 'Expert Tutors Academy', imageUrl: 'https://placehold.co/600x400/E3FCEF/50C878?text=DSA+Bootcamp', dataAiHint: "Data Structures algorithms code", rating: 4.8, reviewsCount: 2800, price: 2800, category: "Computer Science", approvalStatus: 'approved', providerInfo: { name: "Expert Tutors Academy", verified: true, logoUrl: placeholderUsers.find(u=>u.email === 'expert.tutors@example.com')?.avatarUrl || 'https://placehold.co/100x100/EBF4FF/3B82F6?text=ET', type: 'Coaching Center'} },
      { id: 'cs-showcase-3', title: 'Deep Learning Specialization (TensorFlow)', instructor: 'AI Learning Co.', imageUrl: 'https://placehold.co/600x400/E6E6FA/9370DB?text=Deep+Learning+TF', dataAiHint: "Deep Learning AI brain", rating: 4.7, reviewsCount: 2600, price: 3500, category: "Computer Science", approvalStatus: 'approved', providerInfo: { name: "AI Learning Co.", verified: true, logoUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=AI', type: 'Institute'} },
      { id: 'cs-showcase-4', title: 'Algorithmic Toolbox: Core Algorithms', instructor: 'CodeMasters Institute', imageUrl: 'https://placehold.co/600x400/FFEBCD/FFA500?text=Algorithmic+Toolbox', dataAiHint: "Algorithms flowchart logic", rating: 4.6, reviewsCount: 2000, price: 2500, category: "Computer Science", approvalStatus: 'approved', providerInfo: { name: "CodeMasters Institute", verified: true, logoUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=CM', type: 'Institute'} },
    ]
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

