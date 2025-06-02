
import type { Course, Review, User, Certificate, Order } from './types';
import { CATEGORIES, DIFFICULTY_LEVELS, LANGUAGES } from './constants';

// More diverse Indian names
const indianStudentNames = [
  "Priya Sharma", "Rahul Kumar", "Ananya Singh", "Amit Patel", "Sneha Reddy",
  "Vikram Iyer", "Deepika Joshi", "Arjun Mehta", "Neha Gupta", "Rohan Desai"
];
const indianSellerNames = [
  "Expert Tutors Academy", "Kaushik Learning Solutions", "Vidya Mandir Online", "Innovate Skill Hub", "Gyan Ganga Institute"
];

export const placeholderUsers: User[] = [
  { id: 'user1', name: indianStudentNames[0], email: 'priya.student@example.com', role: 'student', avatarUrl: 'https://placehold.co/100x100.png?text=PS', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), bio: "Lifelong learner passionate about technology and design." },
  { id: 'user2', name: indianSellerNames[0], email: 'expert.tutors@example.com', role: 'provider', avatarUrl: 'https://placehold.co/100x100.png?text=ET', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(), verificationStatus: 'pending', documentsSubmitted: true, bio: "Dedicated to providing top-notch coding bootcamps and exam preparation courses." },
  { id: 'user3', name: "Admin Kumar", email: 'admin@example.com', role: 'admin', avatarUrl: 'https://placehold.co/100x100.png?text=AK', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(), bio: "Ensuring EdTechCart runs smoothly for everyone." },
  { id: 'user4', name: indianStudentNames[1], email: 'rahul.learner@example.com', role: 'student', avatarUrl: 'https://placehold.co/100x100.png?text=RK', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), bio: "Exploring new skills to advance my career in finance." },
  { id: 'user5', name: indianSellerNames[1], email: 'kaushik.learning@example.com', role: 'provider', avatarUrl: 'https://placehold.co/100x100.png?text=KL', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(), verificationStatus: 'verified', documentsSubmitted: true, bio: "Leading institution for business, finance, and government exam courses." },
  { id: 'user6', name: indianSellerNames[2], email: 'vidya.mandir@example.com', role: 'provider', avatarUrl: 'https://placehold.co/100x100.png?text=VM', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), verificationStatus: 'rejected', documentsSubmitted: true, bio: "Specialized in language learning and arts. Awaiting clarification on document resubmission." },
  { id: 'user7', name: indianStudentNames[2], email: 'ananya.student@example.com', role: 'student', avatarUrl: 'https://placehold.co/100x100.png?text=AS', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 40).toISOString(), bio: "Preparing for NEET and exploring creative writing." },
  { id: 'user8', name: indianSellerNames[3], email: 'innovate.skillhub@example.com', role: 'provider', avatarUrl: 'https://placehold.co/100x100.png?text=IS', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 120).toISOString(), verificationStatus: 'verified', documentsSubmitted: true, bio: "Premier destination for cutting-edge Computer Science and Personal Development programs." },
];


export const placeholderCourses: Course[] = Array.from({ length: 24 }, (_, i) => {
  const category = CATEGORIES[i % CATEGORIES.length];
  const sellerCandidates = placeholderUsers.filter(u => u.role === 'provider');
  const seller = sellerCandidates[i % sellerCandidates.length];
  const priceInINR = Math.floor(Math.random() * (15000 - 499) + 499);
  return {
    id: `course${i + 1}`,
    title: `Mastering ${category.name}: From Zero to Hero ${i + 1}`,
    instructor: seller.name,
    sellerId: seller.id,
    rating: parseFloat((Math.random() * (5 - 3.5) + 3.5).toFixed(1)),
    reviewsCount: Math.floor(Math.random() * 300) + 50,
    price: priceInINR,
    originalPrice: i % 3 === 0 ? Math.floor(priceInINR * (Math.random() * 0.5 + 1.2)) : undefined, // Original price 20-70% higher
    category: category.name,
    imageUrl: `https://placehold.co/600x400.png`,
    shortDescription: `Unlock the secrets of ${category.name} with this comprehensive course from ${seller.name}. Perfect for aspiring professionals and enthusiasts.`,
    duration: `${Math.floor(Math.random() * 20) + 10} hours video`, // More specific duration
    level: DIFFICULTY_LEVELS[i % DIFFICULTY_LEVELS.length],
    description: `Dive deep into the world of ${category.name} with ${seller.name}. This course covers foundational concepts to advanced techniques. You'll learn A, B, C, and how to apply them in real-world scenarios. Suitable for ${DIFFICULTY_LEVELS[i % DIFFICULTY_LEVELS.length]} learners looking to enhance their skills. Includes hands-on projects and expert guidance. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. This course provides detailed modules on core topics including advanced problem-solving strategies and practical application development tailored for ${category.name}.`,
    curriculum: [
      { id: `m1c${i+1}`, title: 'Module 1: Introduction to ' + category.name, order: 1, lessons: [
        { id: `l1m1c${i+1}`, title: 'Course Welcome & Learning Objectives', type: 'video', duration: '5min', order: 1, isFreePreview: true },
        { id: `l2m1c${i+1}`, title: 'Core Concepts of ' + category.name, type: 'text', order: 2 },
        { id: `l3m1c${i+1}`, title: 'Environment Setup for ' + category.name, type: 'video', duration: '12min', order: 3 }
      ]},
      { id: `m2c${i+1}`, title: 'Module 2: Fundamental Principles in ' + category.name, order: 2, lessons: [
        { id: `l1m2c${i+1}`, title: 'Exploring Key Topic A in ' + category.name, type: 'video', duration: '18min', order: 1 },
        { id: `l2m2c${i+1}`, title: 'Downloadable Resource: ' + category.name + ' Cheatsheet', type: 'pdf', order: 2 },
        { id: `l3m2c${i+1}`, title: 'Quiz 1: Assess Your Knowledge of ' + category.name + ' Basics', type: 'quiz', order: 3 }
      ]},
      { id: `m3c${i+1}`, title: 'Module 3: Advanced Applications & Case Studies', order: 3, lessons: [
        { id: `l1m3c${i+1}`, title: 'Mastering Topic B: Advanced ' + category.name, type: 'video', duration: '25min', order: 1 },
        { id: `l2m3c${i+1}`, title: 'Assignment: ' + category.name + ' Real-World Problem Solving', type: 'assignment', order: 2 },
        { id: `l3m3c${i+1}`, title: 'Final Project: Building a ' + category.name + ' Solution', type: 'pdf', order: 3 }
      ]},
    ],
    studentsEnrolled: Math.floor(Math.random() * 1500) + 200,
    lastUpdated: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 90).toISOString().split('T')[0],
    language: LANGUAGES[i % LANGUAGES.length],
    certificateAvailable: i % 2 === 0,
    highlights: [`Master ${category.name} from fundamentals to advanced`, 'Build real-world projects', 'Lifetime access to all course materials and updates', 'Certificate of Completion upon finishing', 'Downloadable resources, articles, and templates', 'Accessible on mobile, desktop, and TV', 'Dedicated Q&A section with instructor support'],
    providerInfo: {
      name: seller.name,
      verified: seller.verificationStatus === 'verified',
      logoUrl: seller.avatarUrl?.replace('100x100', '150x150'),
      description: seller.bio || `Leading provider of high-quality courses in ${category.name}. Our mission is to empower students with practical skills.`
    },
    tags: [category.name.toLowerCase().replace(' & ', '-').replace(/\s+/g, '-'), DIFFICULTY_LEVELS[i % DIFFICULTY_LEVELS.length].toLowerCase().replace(' ', '-'), 'top-rated', 'popular'],
    approvalStatus: seller.verificationStatus === 'rejected' ? 'rejected' : (i % 4 === 0 && seller.verificationStatus !== 'rejected' ? 'pending' : 'approved'),
    moneyBackGuaranteeDays: (i % 2 === 0) ? 30 : 15, // Some courses have 30 day, some 15 day
  };
});

export const placeholderReviews: Review[] = placeholderCourses.flatMap(course =>
  Array.from({ length: Math.floor(Math.random() * 8) + 2 }, (_, i) => {
    const reviewer = placeholderUsers.filter(u => u.role === 'student')[i % placeholderUsers.filter(u => u.role === 'student').length];
    return {
    id: `review${course.id}-${i}`,
    courseId: course.id,
    userId: reviewer.id,
    userName: reviewer.name,
    userAvatar: reviewer.avatarUrl,
    rating: Math.floor(Math.random() * 3) + 3,
    comment: `This course on ${course.category} was ${['excellent', 'very informative', 'quite good', 'helpful', 'a game-changer'][i%5]}! I learned so much. The instructor, ${course.providerInfo?.name || course.instructor}, was ${['clear', 'engaging', 'knowledgeable'][i%3]}. Highly recommend it to anyone looking to master ${course.category.toLowerCase()}. The practical examples were particularly useful.`,
    createdAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 180).toISOString().split('T')[0],
    helpfulVotes: Math.floor(Math.random() * 100),
    unhelpfulVotes: Math.floor(Math.random() * 20),
    moderationStatus: i % 5 === 0 ? 'pending' : (i % 5 === 1 ? 'rejected' : 'approved'),
  }})
);

export const placeholderCertificates: Certificate[] = placeholderCourses
  .filter(c => c.certificateAvailable && c.studentsEnrolled && c.studentsEnrolled > 500 && c.approvalStatus === 'approved')
  .slice(0,3)
  .map((course, i) => ({
    id: `cert${course.id}-user1-${i}`,
    courseId: course.id,
    courseTitle: course.title,
    studentName: placeholderUsers.find(u => u.role === 'student')?.name || "Student User",
    issueDate: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30 * (i+1)).toISOString().split('T')[0],
    certificateUrl: `/placeholder-certificate-${course.id}.pdf`
}));

export const placeholderOrders: Order[] = [
  {
    id: 'order1',
    userId: placeholderUsers.find(u => u.role === 'student')?.id || 'user1',
    items: [placeholderCourses[0], placeholderCourses[2]],
    totalAmount: placeholderCourses[0].price + placeholderCourses[2].price,
    paymentMethod: 'Credit Card',
    status: 'completed',
    orderDate: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 5).toISOString().split('T')[0],
    transactionId: 'txn_123abc'
  },
  {
    id: 'order2',
    userId: placeholderUsers.find(u => u.role === 'student')?.id || 'user1',
    items: [placeholderCourses[4]],
    totalAmount: placeholderCourses[4].price,
    paymentMethod: 'UPI',
    status: 'completed',
    orderDate: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 15).toISOString().split('T')[0],
    transactionId: 'txn_456def'
  },
  {
    id: 'order3',
    userId: placeholderUsers.filter(u => u.role === 'student')[1]?.id || 'user4',
    items: [placeholderCourses[1], placeholderCourses[3]],
    totalAmount: placeholderCourses[1].price + placeholderCourses[3].price,
    paymentMethod: 'Net Banking',
    status: 'pending',
    orderDate: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 2).toISOString().split('T')[0],
    transactionId: 'txn_789ghi'
  }
];


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
    // Filter certificates for the student (user1 is Alice in this mock data)
    return placeholderCertificates.filter(cert => cert.studentName === placeholderUsers[0].name);
};
export const getOrdersByUserId = (userId: string): Order[] => placeholderOrders.filter(order => order.userId === userId);

// Select diverse courses for featured, ensuring they are approved
const approvedCourses = placeholderCourses.filter(c => c.approvalStatus === 'approved');
export const featuredCourses = approvedCourses.slice(0, 4);
export const recommendedCourses = approvedCourses.slice(4, 8);
export const recentlyViewedCourses = approvedCourses.slice(8,12);
export const popularCategories = CATEGORIES.slice(0,6);
