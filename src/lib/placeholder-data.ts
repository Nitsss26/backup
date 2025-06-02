import type { Course, Review, User, Certificate, Order } from './types';
import { CATEGORIES, DIFFICULTY_LEVELS, LANGUAGES } from './constants';

export const placeholderUsers: User[] = [
  { id: 'user1', name: 'Alice Student', email: 'alice@example.com', role: 'student', avatarUrl: 'https://placehold.co/100x100.png', createdAt: new Date().toISOString() },
  { id: 'user2', name: 'Bob Provider', email: 'bob@example.com', role: 'provider', avatarUrl: 'https://placehold.co/100x100.png', createdAt: new Date().toISOString() },
  { id: 'user3', name: 'Charlie Admin', email: 'charlie@example.com', role: 'admin', avatarUrl: 'https://placehold.co/100x100.png', createdAt: new Date().toISOString() },
  { id: 'user4', name: 'Diana Learner', email: 'diana@example.com', role: 'student', avatarUrl: 'https://placehold.co/100x100.png', createdAt: new Date().toISOString() },
];

export const placeholderCourses: Course[] = Array.from({ length: 24 }, (_, i) => {
  const category = CATEGORIES[i % CATEGORIES.length];
  return {
    id: `course${i + 1}`,
    title: `Mastering ${category.name}: From Zero to Hero ${i + 1}`,
    instructor: `Dr. Expert ${i % 5 + 1}`,
    rating: parseFloat((Math.random() * (5 - 3.5) + 3.5).toFixed(1)),
    reviewsCount: Math.floor(Math.random() * 300) + 50,
    price: parseFloat((Math.random() * (199.99 - 19.99) + 19.99).toFixed(2)),
    originalPrice: i % 3 === 0 ? parseFloat((Math.random() * (299.99 - 99.99) + 99.99).toFixed(2)) : undefined,
    category: category.name,
    imageUrl: `https://placehold.co/600x400.png`,
    shortDescription: `Unlock the secrets of ${category.name} with this comprehensive course. Perfect for aspiring professionals and enthusiasts.`,
    duration: `${Math.floor(Math.random() * 20) + 5} hours`,
    level: DIFFICULTY_LEVELS[i % DIFFICULTY_LEVELS.length],
    description: `Dive deep into the world of ${category.name}. This course covers foundational concepts to advanced techniques. You'll learn A, B, C, and how to apply them in real-world scenarios. Suitable for ${DIFFICULTY_LEVELS[i % DIFFICULTY_LEVELS.length]} learners looking to enhance their skills. Includes hands-on projects and expert guidance.`,
    curriculum: [
      { id: `m1c${i+1}`, title: 'Module 1: Getting Started', order: 1, lessons: [
        { id: `l1m1c${i+1}`, title: 'Course Introduction & Overview', type: 'video', duration: '5min', order: 1, isFreePreview: true },
        { id: `l2m1c${i+1}`, title: 'Fundamental Concepts', type: 'text', order: 2 },
        { id: `l3m1c${i+1}`, title: 'Setting up Your Environment', type: 'video', duration: '10min', order: 3 }
      ]},
      { id: `m2c${i+1}`, title: 'Module 2: Core Principles', order: 2, lessons: [
        { id: `l1m2c${i+1}`, title: 'Advanced Topic A', type: 'video', duration: '15min', order: 1 },
        { id: `l2m2c${i+1}`, title: 'Practical Exercise 1', type: 'pdf', order: 2 },
        { id: `l3m2c${i+1}`, title: 'Quiz 1: Check Your Understanding', type: 'quiz', order: 3 }
      ]},
      { id: `m3c${i+1}`, title: 'Module 3: Advanced Techniques', order: 3, lessons: [
        { id: `l1m3c${i+1}`, title: 'Deep Dive into Topic B', type: 'video', duration: '20min', order: 1 },
        { id: `l2m3c${i+1}`, title: 'Case Study Analysis', type: 'assignment', order: 2 },
        { id: `l3m3c${i+1}`, title: 'Project: Real-world Application', type: 'pdf', order: 3 }
      ]},
    ],
    studentsEnrolled: Math.floor(Math.random() * 1500) + 200,
    lastUpdated: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 90).toISOString().split('T')[0],
    language: LANGUAGES[i % LANGUAGES.length],
    certificateAvailable: i % 2 === 0,
    highlights: ['Lifetime access to course materials', 'Certificate of completion', 'Downloadable resources & articles', 'Access on mobile and TV', 'Instructor Q&A'],
    providerInfo: {
      name: `EduSolutions Inc. ${i % 4 + 1}`,
      verified: i % 2 === 0,
      logoUrl: `https://placehold.co/80x80.png`
    },
    tags: [category.name.toLowerCase().replace(' & ', '-').replace(' ', '-'), DIFFICULTY_LEVELS[i % DIFFICULTY_LEVELS.length].toLowerCase(), 'top-rated']
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
    comment: `This course on ${course.category} was ${['excellent', 'very informative', 'quite good', 'helpful', 'a game-changer'][i%5]}! I learned so much and the instructor was ${['clear', 'engaging', 'knowledgeable'][i%3]}. Highly recommend it.`,
    createdAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 180).toISOString().split('T')[0],
    helpfulVotes: Math.floor(Math.random() * 100),
    unhelpfulVotes: Math.floor(Math.random() * 20),
  }))
);

export const placeholderCertificates: Certificate[] = placeholderCourses
  .filter(c => c.certificateAvailable && c.id.includes('1')) // for user1
  .slice(0,3)
  .map((course, i) => ({
    id: `cert${course.id}-user1-${i}`,
    courseId: course.id,
    courseTitle: course.title,
    studentName: placeholderUsers[0].name,
    issueDate: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30 * (i+1)).toISOString().split('T')[0],
    certificateUrl: `/placeholder-certificate-${course.id}.pdf`
}));

export const placeholderOrders: Order[] = [
  {
    id: 'order1',
    userId: 'user1',
    items: [placeholderCourses[0], placeholderCourses[2]],
    totalAmount: placeholderCourses[0].price + placeholderCourses[2].price,
    paymentMethod: 'Credit Card',
    status: 'completed',
    orderDate: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 5).toISOString().split('T')[0],
    transactionId: 'txn_123abc'
  },
  {
    id: 'order2',
    userId: 'user1',
    items: [placeholderCourses[4]],
    totalAmount: placeholderCourses[4].price,
    paymentMethod: 'UPI',
    status: 'completed',
    orderDate: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 15).toISOString().split('T')[0],
    transactionId: 'txn_456def'
  }
];


export const getCourseById = (id: string): Course | undefined => placeholderCourses.find(c => c.id === id);
export const getReviewsByCourseId = (courseId: string): Review[] => placeholderReviews.filter(r => r.courseId === courseId);
export const getCoursesByCategory = (categorySlug: string): Course[] => {
    const category = CATEGORIES.find(cat => cat.slug === categorySlug);
    if (!category) return [];
    return placeholderCourses.filter(course => course.category === category.name);
};
export const getCertificatesByUserId = (userId: string): Certificate[] => placeholderCertificates.filter(cert => cert.studentName === placeholderUsers.find(u => u.id === userId)?.name); // simplified
export const getOrdersByUserId = (userId: string): Order[] => placeholderOrders.filter(order => order.userId === userId);

export const featuredCourses = placeholderCourses.slice(0, 4);
export const recommendedCourses = placeholderCourses.slice(4, 8);
export const recentlyViewedCourses = placeholderCourses.slice(8,12);
export const popularCategories = CATEGORIES.slice(0,6);
