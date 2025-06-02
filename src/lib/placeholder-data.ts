
import type { Course, Review, User, Certificate, Order } from './types';
import { CATEGORIES, DIFFICULTY_LEVELS, LANGUAGES } from './constants';

export const placeholderUsers: User[] = [
  { id: 'user1', name: 'Alice Student', email: 'alice@example.com', role: 'student', avatarUrl: 'https://placehold.co/100x100.png?text=AS', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), bio: "Lifelong learner passionate about technology and design." },
  { id: 'user2', name: 'Bob Seller Academy', email: 'provider@example.com', role: 'provider', avatarUrl: 'https://placehold.co/100x100.png?text=BS', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(), verificationStatus: 'pending', documentsSubmitted: true, bio: "Dedicated to providing top-notch coding bootcamps." },
  { id: 'user3', name: 'Charlie Admin', email: 'admin@example.com', role: 'admin', avatarUrl: 'https://placehold.co/100x100.png?text=CA', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(), bio: "Ensuring EdTechCart runs smoothly for everyone." },
  { id: 'user4', name: 'Diana Learner', email: 'diana@example.com', role: 'student', avatarUrl: 'https://placehold.co/100x100.png?text=DL', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), bio: "Exploring new skills to advance my career." },
  { id: 'user5', name: 'Eva Education Inc.', email: 'eva.provider@example.com', role: 'provider', avatarUrl: 'https://placehold.co/100x100.png?text=EE', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(), verificationStatus: 'verified', documentsSubmitted: true, bio: "Leading institution for business and finance courses." },
  { id: 'user6', name: 'Frank Teacher', email: 'frank.teach@example.com', role: 'provider', avatarUrl: 'https://placehold.co/100x100.png?text=FT', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), verificationStatus: 'rejected', documentsSubmitted: true, bio: "Independent language instructor with 10 years of experience." },

];

export const placeholderCourses: Course[] = Array.from({ length: 24 }, (_, i) => {
  const category = CATEGORIES[i % CATEGORIES.length];
  const sellerCandidates = placeholderUsers.filter(u => u.role === 'provider');
  const seller = sellerCandidates[i % sellerCandidates.length];
  return {
    id: `course${i + 1}`,
    title: `Mastering ${category.name}: From Zero to Hero ${i + 1}`,
    instructor: seller.name, // Legacy field, use providerInfo.name
    sellerId: seller.id,
    rating: parseFloat((Math.random() * (5 - 3.5) + 3.5).toFixed(1)),
    reviewsCount: Math.floor(Math.random() * 300) + 50,
    price: parseFloat((Math.random() * (199.99 - 19.99) + 19.99).toFixed(2)),
    originalPrice: i % 3 === 0 ? parseFloat((Math.random() * (299.99 - 99.99) + 99.99).toFixed(2)) : undefined,
    category: category.name,
    imageUrl: `https://placehold.co/600x400.png`, 
    shortDescription: `Unlock the secrets of ${category.name} with this comprehensive course from ${seller.name}. Perfect for aspiring professionals and enthusiasts.`,
    duration: `${Math.floor(Math.random() * 20) + 5} hours`,
    level: DIFFICULTY_LEVELS[i % DIFFICULTY_LEVELS.length],
    description: `Dive deep into the world of ${category.name} with ${seller.name}. This course covers foundational concepts to advanced techniques. You'll learn A, B, C, and how to apply them in real-world scenarios. Suitable for ${DIFFICULTY_LEVELS[i % DIFFICULTY_LEVELS.length]} learners looking to enhance their skills. Includes hands-on projects and expert guidance. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    curriculum: [
      { id: `m1c${i+1}`, title: 'Module 1: Getting Started', order: 1, lessons: [
        { id: `l1m1c${i+1}`, title: 'Course Introduction & Overview', type: 'video', duration: '5min', order: 1, isFreePreview: true },
        { id: `l2m1c${i+1}`, title: 'Fundamental Concepts of ' + category.name, type: 'text', order: 2 },
        { id: `l3m1c${i+1}`, title: 'Setting up Your Environment for ' + category.name, type: 'video', duration: '10min', order: 3 }
      ]},
      { id: `m2c${i+1}`, title: 'Module 2: Core Principles in ' + category.name, order: 2, lessons: [
        { id: `l1m2c${i+1}`, title: 'Advanced Topic A in ' + category.name, type: 'video', duration: '15min', order: 1 },
        { id: `l2m2c${i+1}`, title: 'Practical Exercise 1: ' + category.name + ' Application', type: 'pdf', order: 2 },
        { id: `l3m2c${i+1}`, title: 'Quiz 1: Check Your Understanding of ' + category.name, type: 'quiz', order: 3 }
      ]},
      { id: `m3c${i+1}`, title: 'Module 3: Advanced Techniques & Projects', order: 3, lessons: [
        { id: `l1m3c${i+1}`, title: 'Deep Dive into Topic B: ' + category.name, type: 'video', duration: '20min', order: 1 },
        { id: `l2m3c${i+1}`, title: 'Case Study Analysis: ' + category.name + ' Success Stories', type: 'assignment', order: 2 },
        { id: `l3m3c${i+1}`, title: 'Project: Real-world Application of ' + category.name, type: 'pdf', order: 3 }
      ]},
    ],
    studentsEnrolled: Math.floor(Math.random() * 1500) + 200,
    lastUpdated: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 90).toISOString().split('T')[0],
    language: LANGUAGES[i % LANGUAGES.length],
    certificateAvailable: i % 2 === 0,
    highlights: [`Learn ${category.name} from scratch`, 'Real-world project examples', 'Lifetime access to course materials', 'Certificate of completion', 'Downloadable resources & articles', 'Access on mobile and TV', 'Instructor Q&A'],
    providerInfo: {
      name: seller.name, 
      verified: seller.verificationStatus === 'verified',
      logoUrl: seller.avatarUrl?.replace('100x100', '150x150'),
      description: seller.bio || `Leading provider of courses in ${category.name}.`
    },
    tags: [category.name.toLowerCase().replace(' & ', '-').replace(' ', '-'), DIFFICULTY_LEVELS[i % DIFFICULTY_LEVELS.length].toLowerCase(), 'top-rated'],
    approvalStatus: seller.verificationStatus === 'rejected' ? 'rejected' : (i % 4 === 0 && seller.verificationStatus !== 'rejected' ? 'pending' : 'approved'),
  };
});

export const placeholderReviews: Review[] = placeholderCourses.flatMap(course => 
  Array.from({ length: Math.floor(Math.random() * 8) + 2 }, (_, i) => ({
    id: `review${course.id}-${i}`,
    courseId: course.id,
    userId: placeholderUsers[i % placeholderUsers.length].id,
    userName: placeholderUsers[i % placeholderUsers.length].name,
    userAvatar: placeholderUsers[i % placeholderUsers.length].avatarUrl,
    rating: Math.floor(Math.random() * 3) + 3, 
    comment: `This course on ${course.category} was ${['excellent', 'very informative', 'quite good', 'helpful', 'a game-changer'][i%5]}! I learned so much and the instructor, ${course.providerInfo?.name || course.instructor}, was ${['clear', 'engaging', 'knowledgeable'][i%3]}. Highly recommend it.`,
    createdAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 180).toISOString().split('T')[0],
    helpfulVotes: Math.floor(Math.random() * 100),
    unhelpfulVotes: Math.floor(Math.random() * 20),
    moderationStatus: i % 5 === 0 ? 'pending' : (i % 5 === 1 ? 'rejected' : 'approved'),
  }))
);

export const placeholderCertificates: Certificate[] = placeholderCourses
  .filter(c => c.certificateAvailable && c.studentsEnrolled && c.studentsEnrolled > 500 && c.approvalStatus === 'approved') 
  .slice(0,3)
  .map((course, i) => ({
    id: `cert${course.id}-user1-${i}`,
    courseId: course.id,
    courseTitle: course.title,
    studentName: placeholderUsers[0].name, // Assuming user1 is Alice Student
    issueDate: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30 * (i+1)).toISOString().split('T')[0],
    certificateUrl: `/placeholder-certificate-${course.id}.pdf` 
}));

export const placeholderOrders: Order[] = [
  {
    id: 'order1',
    userId: 'user1', // Alice Student
    items: [placeholderCourses[0], placeholderCourses[2]],
    totalAmount: placeholderCourses[0].price + placeholderCourses[2].price,
    paymentMethod: 'Credit Card',
    status: 'completed',
    orderDate: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 5).toISOString().split('T')[0],
    transactionId: 'txn_123abc'
  },
  {
    id: 'order2',
    userId: 'user1', // Alice Student
    items: [placeholderCourses[4]],
    totalAmount: placeholderCourses[4].price,
    paymentMethod: 'UPI',
    status: 'completed',
    orderDate: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 15).toISOString().split('T')[0],
    transactionId: 'txn_456def'
  },
  {
    id: 'order3',
    userId: 'user4', // Diana Learner
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
    return placeholderCourses.filter(course => course.category === category.name);
};
export const getCertificatesByUserId = (userId: string): Certificate[] => {
    const user = placeholderUsers.find(u => u.id === userId);
    if (!user) return [];
    // Filter certificates for the student (user1 is Alice in this mock data)
    return placeholderCertificates.filter(cert => cert.studentName === placeholderUsers[0].name); 
};
export const getOrdersByUserId = (userId: string): Order[] => placeholderOrders.filter(order => order.userId === userId);

export const featuredCourses = placeholderCourses.filter(c => c.approvalStatus === 'approved').slice(0, 4);
export const recommendedCourses = placeholderCourses.filter(c => c.approvalStatus === 'approved').slice(4, 8);
export const recentlyViewedCourses = placeholderCourses.filter(c => c.approvalStatus === 'approved').slice(8,12);
export const popularCategories = CATEGORIES.slice(0,6);
