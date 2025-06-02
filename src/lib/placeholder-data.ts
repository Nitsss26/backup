
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

  // Assign provider type based on seller name or index for variety
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
    title: `Advanced ${category.name} Masterclass ${i + 1}`,
    instructor: seller.name,
    sellerId: seller.id,
    rating: parseFloat((Math.random() * (5 - 3.8) + 3.8).toFixed(1)),
    reviewsCount: Math.floor(Math.random() * 500) + 100,
    price: priceInINR,
    originalPrice: i % 2 === 0 ? Math.floor(priceInINR * (Math.random() * 0.4 + 1.3)) : undefined,
    category: category.name,
    imageUrl: `https://placehold.co/600x400.png`,
    shortDescription: `Elevate your ${category.name} skills with this in-depth masterclass by ${seller.name}. Ideal for professionals seeking mastery.`,
    duration: `${Math.floor(Math.random() * 30) + 15} hours total`,
    level: DIFFICULTY_LEVELS[i % DIFFICULTY_LEVELS.length],
    description: `Explore advanced topics in ${category.name} with ${seller.name}. This comprehensive masterclass covers everything from core principles to specialized applications. You will engage with complex problem-solving, case studies, and advanced project work. This course is designed for ${DIFFICULTY_LEVELS[i % DIFFICULTY_LEVELS.length]} learners aiming to become experts in ${category.name}. We provide extensive resources, expert mentorship, and a collaborative learning environment. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula.`,
    curriculum: [
      { id: `m1c${i+1}`, title: `Module 1: Foundations of Advanced ${category.name}`, order: 1, lessons: [
        { id: `l1m1c${i+1}`, title: 'Welcome & Program Overview', type: 'video', duration: '7min', order: 1, isFreePreview: true, contentUrl: 'https://example.com/preview_video.mp4' },
        { id: `l2m1c${i+1}`, title: `Deep Dive into ${category.name} Core Theories`, type: 'text', order: 2, textContent: 'Detailed textual content covering advanced theories...' },
        { id: `l3m1c${i+1}`, title: `Setting Up Your Advanced ${category.name} Toolkit`, type: 'video', duration: '15min', order: 3, contentUrl: 'https://example.com/setup_video.mp4' }
      ]},
      { id: `m2c${i+1}`, title: `Module 2: Specialized Techniques in ${category.name}`, order: 2, lessons: [
        { id: `l1m2c${i+1}`, title: `Mastering Technique X in ${category.name}`, type: 'video', duration: '22min', order: 1, contentUrl: 'https://example.com/technique_x.mp4' },
        { id: `l2m2c${i+1}`, title: 'Downloadable: Advanced ${category.name} Frameworks', type: 'pdf', order: 2, contentUrl: 'https://example.com/frameworks.pdf' },
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
    moneyBackGuaranteeDays: (i % 3 === 0) ? 30 : ((i%3 === 1) ? 15 : 0), // Make 0 an option for no guarantee
    freeTrialAvailable: i % 4 === 0,
    demoVideoUrl: i % 3 === 0 ? `https://example.com/demo_video_${i+1}.mp4` : undefined,
    downloadableMaterialsDescription: i % 2 === 0 ? "Includes 20+ PDF guides, cheat sheets, and project templates." : "Key lecture slides and summary notes available for download.",
    detailedScheduleDescription: "Module 1 (Week 1-2): Core Concepts. Module 2 (Week 3-4): Advanced Techniques. Module 3 (Week 5-6): Project Work. Live Q&A every Friday.",
  };
});

export const placeholderReviews: Review[] = placeholderCourses.flatMap(course =>
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


export const getCourseById = (id: string): Course | undefined => placeholderCourses.find(c => c.id === id);
export const getReviewsByCourseId = (courseId: string): Review[] => placeholderReviews.filter(r => r.courseId === courseId);
export const getCoursesByCategory = (categorySlug: string): Course[] => {
    const category = CATEGORIES.find(cat => cat.slug === categorySlug);
    if (!category) return [];
    return placeholderCourses.filter(course => course.category === category.name && course.approvalStatus === 'approved');
};
export const getCertificatesByUserId = (userId: string): Certificate[] => {
    const user = placeholderUsers.find(u => u.id === userId);
    if (!user) return [];
    return placeholderCertificates.filter(cert => cert.studentName === user.name);
};
export const getOrdersByUserId = (userId: string): Order[] => placeholderOrders.filter(order => order.userId === userId);

const approvedAndPublishedCourses = placeholderCourses.filter(c => c.approvalStatus === 'approved');
export const featuredCourses = approvedAndPublishedCourses.slice(0, 4); // This can be used for a generic "Featured Courses" section if needed
export const recommendedCourses = approvedAndPublishedCourses.slice(4, 8);
export const recentlyViewedCourses = approvedAndPublishedCourses.slice(8,12);
export const popularCategories = CATEGORIES.slice(0,6);

export const getSellerCourses = (sellerId: string): Course[] => {
  return placeholderCourses.filter(course => course.sellerId === sellerId);
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
