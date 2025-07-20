
import type { EBook, Review } from './types';
import mongoose from 'mongoose';

const generateObjectIdString = () => new mongoose.Types.ObjectId().toHexString();

const placeholderReviews: { [key: string]: Review[] } = {
  "ebook-001": [
    { id: 'review-ebook-1-1', _id: generateObjectIdString(), courseId: 'ebook-001', userId: 'user-sample-1', userName: 'Rohan Verma', userAvatar: 'https://i.pravatar.cc/150?u=rohan', rating: 5, comment: "I started getting compliments within 3 weeks—this guide is gold. The facial exercises are easy to follow and actually effective. My jawline feels much sharper.", createdAt: new Date('2024-06-20T10:00:00Z').toISOString() },
    { id: 'review-ebook-1-2', _id: generateObjectIdString(), courseId: 'ebook-001', userId: 'user-sample-2', userName: 'Aman Singh', userAvatar: 'https://i.pravatar.cc/150?u=aman', rating: 4, comment: "Solid advice, especially the skincare section. I wish the photoshoot poses section was a bit more detailed, but overall a great value.", createdAt: new Date('2024-06-18T11:00:00Z').toISOString() },
  ],
  "ebook-002": [
    { id: 'review-ebook-2-1', _id: generateObjectIdString(), courseId: 'ebook-002', userId: 'user-sample-3', userName: 'Vikrant Kumar', userAvatar: 'https://i.pravatar.cc/150?u=vikrant', rating: 5, comment: "I’ve never looked this good—this book gave me a full makeover plan. The golden ratio section was an eye-opener!", createdAt: new Date('2024-07-01T08:00:00Z').toISOString() },
  ],
  "ebook-003": [
    { id: 'review-ebook-3-1', _id: generateObjectIdString(), courseId: 'ebook-003', userId: 'user-sample-4', userName: 'Sumit Patel', userAvatar: 'https://i.pravatar.cc/150?u=sumit', rating: 5, comment: "Helped me go from average to above average height. It’s a total game changer. The mobility training really works if you are consistent.", createdAt: new Date('2024-06-25T18:00:00Z').toISOString() },
  ],
  "ebook-004": [
    { id: 'review-ebook-4-1', _id: generateObjectIdString(), courseId: 'ebook-004', userId: 'user-sample-5', userName: 'Alisha', userAvatar: 'https://i.pravatar.cc/150?u=alisha', rating: 5, comment: "This Excel e-book is a game-changer! As a beginner, I found it incredibly easy to follow along and understand complex concepts. Plus, at just Rs 99, it's a steal!", createdAt: new Date('2024-06-22T09:00:00Z').toISOString() },
    { id: 'review-ebook-4-2', _id: generateObjectIdString(), courseId: 'ebook-004', userId: 'user-sample-6', userName: 'Riya', userAvatar: 'https://i.pravatar.cc/150?u=riya', rating: 5, comment: "I never thought I could learn Excel so quickly and affordably until I found this e-book! It's perfect for beginners like me, and the price is unbeatable. Thank you for simplifying Excel for us!", createdAt: new Date('2024-06-21T15:00:00Z').toISOString() },
    { id: 'review-ebook-4-3', _id: generateObjectIdString(), courseId: 'ebook-004', userId: 'user-sample-7', userName: 'Neha Sharma', userAvatar: 'https://i.pravatar.cc/150?u=neha', rating: 5, comment: "Wow! This Excel e-book is a lifesaver for anyone starting their Excel journey. The step-by-step instructions and clear explanations make learning a breeze. Highly recommend it to all my friends!", createdAt: new Date('2024-06-20T12:00:00Z').toISOString() },
    { id: 'review-ebook-4-4', _id: generateObjectIdString(), courseId: 'ebook-004', userId: 'user-sample-8', userName: 'Rohan Singh', userAvatar: 'https://i.pravatar.cc/150?u=rohan_s', rating: 5, comment: "As a beginner in Excel, I was hesitant to invest in expensive courses. But this e-book changed everything! It's concise, easy to understand.", createdAt: new Date('2024-06-19T17:00:00Z').toISOString() },
  ],
  "ebook-005": [
     { id: 'review-ebook-5-1', _id: generateObjectIdString(), courseId: 'ebook-005', userId: 'user-sample-9', userName: 'Karan Mehra', userAvatar: 'https://i.pravatar.cc/150?u=karan', rating: 5, comment: "I didn’t think I had room to grow—but I was wrong. This changed everything. The biohacking tools are something I've never seen before.", createdAt: new Date('2024-07-02T14:00:00Z').toISOString() },
  ]
};

export const placeholderEBooks: EBook[] = [
  {
    id: 'ebook-001',
    title: "GOD MODE – Upgrade Your Facial Aesthetics",
    author: "Ruhan",
    rating: 4.9,
    reviewsCount: 78,
    price: 399,
    originalPrice: 999,
    category: "Self-Improvement",
    imageUrl: "https://picasso.cosmofeed.com/media.cosmofeed.com/IMG_20250707_020547_011-2025-06-07-08-36-48.jpg?w=600&&q=100",
    shortDescription: "A manual for enhancing facial symmetry, jawline sharpness, and skin quality using practical, affordable methods.",
    description: "GOD MODE is your go-to manual for enhancing facial symmetry, jawline sharpness, and skin quality using practical, affordable methods that truly work. Built for guys who want to level up without surgery.",
    benefits: [
        "Sharpen your jawline and improve symmetry with daily drills.",
        "Build a glow-up routine using science-backed products.",
        "Techniques to reduce dark circles and tired eyes.",
        "Frame your face with the right grooming plan.",
        "Learn angles that make you look elite in pictures.",
        "Affordable, natural improvements with fast results."
    ],
    providerInfo: {
        name: "Ruhan",
        email: "Ruhanshr123@gmail.com",
    },
    reviews: placeholderReviews['ebook-001'],
  },
  {
    id: 'ebook-002',
    title: "Thanos Method – Complete Lookmaxing Blueprint",
    author: "Ruhan",
    rating: 4.8,
    reviewsCount: 92,
    price: 450,
    originalPrice: 1200,
    category: "Self-Improvement",
    imageUrl: "https://picasso.cosmofeed.com/media.cosmofeed.com/IMG-20250707-WA0001-2025-06-07-08-33-55.jpg?w=600&&q=100",
    shortDescription: "Unlock elite lookmaxing techniques used by top influencers to sculpt your face and exude confidence.",
    description: "Thanos method unlocks elite lookmaxing techniques used by top influencers and actors to sculpt their face, enhance features, and exude confidence. High-impact results without expensive procedures.",
    benefits: [
        "Understand how your features align with model standards using the Golden Ratio.",
        "Reshape your face over time with proper mewing and tongue posture.",
        "Fashion hacks to look taller, leaner, and sharper.",
        "Mental strategies to radiate charisma effortlessly.",
        "Laser-focused tweaks for hair, brows, and teeth.",
        "Transforms average guys into head-turners."
    ],
    providerInfo: {
        name: "Ruhan",
        email: "Ruhanshr123@gmail.com",
    },
    reviews: placeholderReviews['ebook-002'],
  },
  {
    id: 'ebook-003',
    title: "BEAST METHOD – Teen & Adult Edition",
    author: "Ruhan",
    rating: 4.7,
    reviewsCount: 115,
    price: 499,
    originalPrice: 1500,
    category: "Health & Fitness",
    imageUrl: "https://picasso.cosmofeed.com/media.cosmofeed.com/Screenshot_20250706_230537_Drive-2025-06-07-08-24-7.jpg?w=600&&q=100",
    shortDescription: "Your ultimate toolkit to increase height naturally, combining biohacking and fitness strategies.",
    description: "BEAST METHOD is your ultimate toolkit to increase height naturally, combining the best of biohacking and fitness strategies into one actionable guide. Created for teens and adults serious about maximizing their height.",
    benefits: [
        "Structured morning and evening rituals for growth.",
        "Loosen tight muscles that restrict vertical expansion.",
        "Natural ways to stimulate growth hormone release.",
        "Stay consistent with built-in habit trackers.",
        "Overcome limiting beliefs and grow with confidence.",
        "Practical, no-fluff, and result-oriented."
    ],
    providerInfo: {
        name: "Ruhan",
        email: "Ruhanshr123@gmail.com",
    },
    reviews: placeholderReviews['ebook-003'],
  },
  {
    id: 'ebook-004',
    title: "4 eBooks for Beginning of Excel In English PDF",
    author: "Peer Irfan Ahmed",
    rating: 5,
    reviewsCount: 210,
    price: 99,
    originalPrice: 499,
    category: "Business & Finance",
    imageUrl: "https://picasso.cosmofeed.com/media.cosmofeed.com/file_00000000a6b051f781cbb66a330b2452_conversation_id-67f0a536-8c84-8008-8bf0-5859a717f59d-message_id-5222c818-dce5-48c5-b163-7508ff1a3eba-2025-05-04-03-45-26.PNG?w=600&q=100",
    shortDescription: "Lifetime access to over 1,000 pages across 4 E-Books, tailor-made for Excel beginners.",
    description: "Dive into Excel with confidence! Our e-book 'Beginning of Excel' is tailor-made for beginners, simplifying complex concepts into easy-to-follow steps. At just Rs 99, this e-book offers unbeatable value, making Excel learning accessible to everyone.",
    benefits: [
        "Master essential formulas and create captivating charts effortlessly.",
        "Learn to manage worksheets like a pro.",
        "Uncover time-saving tips and tricks.",
        "Lifetime access to all four E-Books.",
        "Affordable price for comprehensive learning.",
        "Perfect for students and professionals starting with Excel."
    ],
    providerInfo: {
        name: "Peer Irfan Ahmed",
        email: "excelformulafun@gmail.com",
    },
    reviews: placeholderReviews['ebook-004'],
  },
  {
    id: 'ebook-005',
    title: "BRUTAL METHOD – Biohacking Your Way Taller",
    author: "Ruhan",
    rating: 4.8,
    reviewsCount: 130,
    price: 550,
    originalPrice: 1800,
    category: "Health & Fitness",
    imageUrl: "https://picasso.cosmofeed.com/media.cosmofeed.com/IMG-20250706-WA0002-2025-06-07-08-28-28.jpg?w=600&&q=100",
    shortDescription: "Reveals cutting-edge growth techniques using nutrition, biomechanics, and modern posture correction.",
    description: "BRUTAL METHOD reveals cutting-edge growth techniques using nutrition, biomechanics, and modern posture correction to push your height limits naturally. Great for fitness enthusiasts looking to optimize looks and stature.",
    benefits: [
        "Use red light, inversion, and other biohacking tools to grow taller.",
        "Combine strength training with height-boosting movements.",
        "Instantly add inches with smart clothing and shoe tricks.",
        "Align testosterone and HGH for peak performance.",
        "Includes a “Height Audit” checklist and tracking system.",
        "Maximizes every inch you’ve got—naturally and confidently."
    ],
    providerInfo: {
        name: "Ruhan",
        email: "Ruhanshr123@gmail.com",
    },
    reviews: placeholderReviews['ebook-005'],
  }
];

export const getEBookById = (id: string): EBook | undefined => {
    return placeholderEBooks.find(ebook => ebook.id === id);
}
