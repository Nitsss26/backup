
import type { EBook } from './types';
import mongoose from 'mongoose';

const generateObjectIdString = () => new mongoose.Types.ObjectId().toHexString();

export const placeholderEBooks: EBook[] = [
  {
    id: 'ebook-heightmax-01',
    _id: generateObjectIdString(),
    title: "Heightmax Method: Grow Taller After Puberty",
    author: "Maxmen",
    rating: 4.9,
    reviewsCount: 152,
    price: 499,
    originalPrice: 1999,
    category: "Health & Fitness",
    imageUrl: "https://placehold.co/600x800/1E293B/FFFFFF?text=HeightMax",
    pages: 85,
    level: 'All Levels',
    shortDescription: "Unlock your tallest potential with a comprehensive, natural, and effective guide to achieving your desired height after puberty.",
    description: `Unlock Your Tallest Potential with "The HeighMax Method" 🌱 Are you ready to reach new heights and stand tall with confidence? Introducing "HeighMax" – your ultimate guide to achieving your desired height naturally and effectively. This ebook is more than just a collection of tips; it's a blueprint crafted to elevate your stature and boost your self-esteem. In "The HeightMax Method" we delve into the science and art of height enhancement. This comprehensive guide provides not only practical strategies but also an understanding of the factors that influence height growth. Increasing your height will undoubtably change your life forever.`,
    benefits: [
      "Boost Confidence: Gain the stature that reflects your inner confidence and self-assuredness.",
      "Natural Approach: Embrace a natural, science-backed method to enhance your height.",
      "Holistic Well-being: Experience overall well-being with a focus on nutrition, exercise, and mental health.",
      "Improved Sleep: Discover how sleep quality influences growth and ways to enhance it.",
      "Targeted Exercises: Access a curated collection of exercises designed to stimulate growth.",
      "Mindfulness Techniques: Incorporate mindfulness into your routine for a holistic approach.",
      "Educational Resource: Equip yourself with knowledge about factors influencing height growth.",
      "Transformative Lifestyle: Embark on a journey that not only enhances your height but transforms your lifestyle positively."
    ],
    lastUpdated: new Date().toISOString(),
    language: 'English',
    providerInfo: {
      name: "Maxmen",
      email: "pacerunners1@gmail.com",
      instagramUrl: "#" // Placeholder, replace with actual Instagram URL if available
    },
    tags: ["height increase", "personal development", "health", "fitness", "self-improvement"],
    purchaseInstructions: [
      "Take a screenshot of the transaction confirmation.",
      "Email the screenshot along with your name and email address to pacerunners1@gmail.com.",
      "Once we confirm the payment, we will send you the download link for the ebook to your email address within 6 hours."
    ],
    importantNotice: "The price of our ebook is set to increase in just a few days! Don’t miss out on this opportunity to grab it at the current low price. Act now and take full advantage of the savings while you still can. Secure your copy today and start your journey towards greater height and confidence before the price goes up! 🚀"
  },
];

export const getEBookById = (id: string): EBook | undefined => {
    return placeholderEBooks.find(ebook => ebook.id === id);
}
