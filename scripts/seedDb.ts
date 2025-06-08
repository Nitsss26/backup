
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserModel from '../src/models/User';
import CourseModel from '../src/models/Course';
import ReviewModel from '../src/models/Review';
import OrderModel from '../src/models/Order';
import CertificateModel from '../src/models/Certificate';
import CategoryModel from '../src/models/Category';
import LookupModel from '../src/models/Lookup';
import SortOptionModel from '../src/models/SortOption';
import PaymentOptionModel from '../src/models/PaymentOption';

import { 
  placeholderUsers, 
  placeholderCourses, 
  placeholderReviews, 
  placeholderOrders, 
  placeholderCertificates,
  featuredCoursesForHomepage,
  topCategoryShowcaseData
} from '../src/lib/placeholder-data';

import {
  CATEGORIES,
  INSTRUCTOR_TYPES,
  DIFFICULTY_LEVELS,
  LANGUAGES,
  SORT_OPTIONS,
  PAYMENT_OPTIONS
} from '../src/lib/constants';

import type { User, Course, Review as ReviewType, Order as OrderType, Certificate as CertificateType } from '../src/lib/types';

dotenv.config({ path: '.env.local' }); 
dotenv.config(); 

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://mlrd:mlrddreamscloudtech@cluster0.yzhly.mongodb.net/edtechcart_dev?retryWrites=true&w=majority";

if (!MONGODB_URI) {
  console.error("🔴 MongoDB URI not found. Please set MONGODB_URI in your .env file.");
  process.exit(1);
}

console.log("🌱 Starting database seed process...");

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log("ℹ️  Already connected to MongoDB.");
      return;
    }
    console.log(" MONGODB_URI: " + MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.error("🔴 MongoDB Connection Error:", error);
    process.exit(1);
  }
};

const clearDatabase = async () => {
  console.log("🗑️  Clearing existing data...");
  await UserModel.deleteMany({});
  await CourseModel.deleteMany({});
  await ReviewModel.deleteMany({});
  await OrderModel.deleteMany({});
  await CertificateModel.deleteMany({});
  await CategoryModel.deleteMany({});
  await LookupModel.deleteMany({});
  await SortOptionModel.deleteMany({});
  await PaymentOptionModel.deleteMany({});
  console.log("🗑️  Database cleared.");
};

const seedUsers = async () => {
  console.log("👤 Seeding users...");
  const userMap = new Map<string, mongoose.Types.ObjectId>();
  
  for (const userData of placeholderUsers) {
    const user = new UserModel({
      ...userData,
      _id: new mongoose.Types.ObjectId(), 
      password: 'password123', // IMPORTANT: In a real app, hash passwords securely (e.g., using bcrypt)
      verificationStatus: userData.verificationStatus || 'unverified',
      documentsSubmitted: userData.documentsSubmitted || false,
      notificationPreferences: userData.notificationPreferences || { courseUpdates: true, promotions: false, platformAnnouncements: true },
      coursesCreated: [],
      coursesEnrolled: [],
      wishlist: [],
      orders: [],
    });
    await user.save();
    userMap.set(userData.id, user._id);
  }
  console.log(`👤 Seeded ${userMap.size} users.`);
  return userMap;
};

const seedCourses = async (userMap: Map<string, mongoose.Types.ObjectId>) => {
  console.log("📚 Seeding courses...");
  const courseMap = new Map<string, mongoose.Types.ObjectId>();
  
  const allPlaceholderCourses = [
    ...placeholderCourses,
    ...featuredCoursesForHomepage,
    ...topCategoryShowcaseData.flatMap(cat => cat.courses)
  ];

  const uniqueCoursesData = Array.from(new Map(allPlaceholderCourses.map(course => [course.id, course])).values());

  for (const courseData of uniqueCoursesData) {
    const sellerMongoId = userMap.get(courseData.sellerId || '');
    if (!sellerMongoId && courseData.sellerId) {
      console.warn(`⚠️ Seller ID ${courseData.sellerId} for course "${courseData.title}" not found in userMap. Skipping seller link.`);
    }

    let languageForDb: string;
    const rawLanguage = courseData.language || 'english';
    const lowerCaseRawLanguage = rawLanguage.toLowerCase().trim();

    if (lowerCaseRawLanguage === 'mandarin chinese') {
      languageForDb = 'chinese-simplified';
    } else if (lowerCaseRawLanguage === 'hindi') {
      languageForDb = 'hindi'; // Store as 'hindi' (lowercase) for MongoDB text index
    } else {
      languageForDb = lowerCaseRawLanguage;
    }
    
    if (!languageForDb) { // Fallback, though courseData.language || 'english' should prevent this
        languageForDb = 'english';
    }


    const course = new CourseModel({
      ...courseData,
      _id: new mongoose.Types.ObjectId(),
      seller: sellerMongoId || undefined,
      curriculum: courseData.curriculum?.map(mod => ({
        ...mod,
        _id: new mongoose.Types.ObjectId(),
        lessons: mod.lessons.map(lesson => ({
          ...lesson,
          _id: new mongoose.Types.ObjectId(),
        }))
      })),
      studentsEnrolledCount: courseData.studentsEnrolled || 0,
      reviewsCount: courseData.reviewsCount || 0,
      shortDescription: courseData.shortDescription || 'Default short description if missing.',
      language: languageForDb,
      providerInfo: courseData.providerInfo || { name: courseData.instructor, verified: false },
      lastUpdated: courseData.lastUpdated ? new Date(courseData.lastUpdated) : new Date(),
      createdAt: courseData.createdAt ? new Date(courseData.createdAt) : new Date(),
    });
    await course.save();
    courseMap.set(courseData.id, course._id);

    if (sellerMongoId) {
        await UserModel.findByIdAndUpdate(sellerMongoId, { $addToSet: { coursesCreated: course._id } });
    }
  }
  console.log(`📚 Seeded ${courseMap.size} courses.`);
  return courseMap;
};

const seedReviews = async (userMap: Map<string, mongoose.Types.ObjectId>, courseMap: Map<string, mongoose.Types.ObjectId>) => {
  console.log("🌟 Seeding reviews...");
  let count = 0;
  for (const reviewData of placeholderReviews) {
    const userMongoId = userMap.get(reviewData.userId);
    const courseMongoId = courseMap.get(reviewData.courseId);

    if (userMongoId && courseMongoId) {
      try {
        const review = new ReviewModel({
          ...reviewData,
          _id: new mongoose.Types.ObjectId(),
          user: userMongoId,
          course: courseMongoId,
          moderationStatus: reviewData.moderationStatus || 'approved',
          createdAt: reviewData.createdAt ? new Date(reviewData.createdAt) : new Date(),
        });
        await review.save();
        count++;
      } catch (error: any) {
        if (error.code !== 11000) { // Mute duplicate key errors during seeding for reviews
            console.error(`🔴 Error seeding review for course ${reviewData.courseId} by user ${reviewData.userId}:`, error);
        }
      }
    }
  }
  console.log(`🌟 Seeded ${count} reviews.`);
};

const seedOrders = async (userMap: Map<string, mongoose.Types.ObjectId>, courseMap: Map<string, mongoose.Types.ObjectId>) => {
  console.log("🛒 Seeding orders...");
  let count = 0;
  for (const orderData of placeholderOrders) {
    const userMongoId = userMap.get(orderData.userId);
    if (userMongoId) {
      const orderItems = orderData.items.map(item => {
        const courseMongoId = courseMap.get(item.id);
        if (!courseMongoId) return null;
        return {
          course: courseMongoId,
          priceAtPurchase: item.price,
          titleAtPurchase: item.title,
        };
      }).filter(item => item !== null) as any[]; 

      if (orderItems.length > 0) {
        const order = new OrderModel({
          ...orderData,
          _id: new mongoose.Types.ObjectId(),
          user: userMongoId,
          items: orderItems,
          orderDate: orderData.orderDate ? new Date(orderData.orderDate) : new Date(),
        });
        await order.save();
        count++;
        await UserModel.findByIdAndUpdate(userMongoId, { $addToSet: { orders: order._id } });
      }
    }
  }
  console.log(`🛒 Seeded ${count} orders.`);
};

const seedCertificates = async (userMap: Map<string, mongoose.Types.ObjectId>, courseMap: Map<string, mongoose.Types.ObjectId>) => {
  console.log("📜 Seeding certificates...");
  let count = 0;
  for (const certData of placeholderCertificates) {
    const studentUser = placeholderUsers.find(u => u.name === certData.studentName);
    const userMongoId = studentUser ? userMap.get(studentUser.id) : undefined;
    const courseMongoId = courseMap.get(certData.courseId);

    if (userMongoId && courseMongoId) {
      const certificate = new CertificateModel({
        ...certData,
        _id: new mongoose.Types.ObjectId(),
        user: userMongoId,
        course: courseMongoId,
        issueDate: certData.issueDate ? new Date(certData.issueDate) : new Date(),
        verificationId: new mongoose.Types.ObjectId().toHexString(),
      });
      await certificate.save();
      count++;
    }
  }
  console.log(`📜 Seeded ${count} certificates.`);
};

const seedCategories = async () => {
  console.log("🗂️  Seeding categories...");
  let count = 0;
  for (const categoryData of CATEGORIES) {
    try {
      const category = new CategoryModel({ name: categoryData.name, slug: categoryData.slug });
      await category.save();
      count++;
    } catch (error: any) {
      if (error.code !== 11000) console.error(`🔴 Error seeding category ${categoryData.name}:`, error);
    }
  }
  console.log(`🗂️  Seeded ${count} categories.`);
};

const seedLookups = async () => {
  console.log("🏷️  Seeding lookups (instructor types, difficulty levels, languages)...");
  let count = 0;
  
  const lookupDataConfig = [
    { type: 'INSTRUCTOR_TYPE', values: INSTRUCTOR_TYPES },
    { type: 'DIFFICULTY_LEVEL', values: DIFFICULTY_LEVELS },
    { type: 'LANGUAGE', values: LANGUAGES },
  ];

  for (const config of lookupDataConfig) {
    for (const value of config.values) {
      let dbValue = value.toLowerCase().trim();
      if (config.type === 'LANGUAGE') {
        if (dbValue === 'mandarin chinese') {
          dbValue = 'chinese-simplified';
        } else if (dbValue === 'hindi') {
          dbValue = 'hindi'; // Ensure 'hindi' (lowercase) for lookup storage
        }
      }
      try {
        const newLookup = new LookupModel({ type: config.type, value: dbValue });
        await newLookup.save();
        count++;
      } catch (error: any) {
        if (error.code !== 11000) console.error(`🔴 Error seeding lookup ${config.type} - ${value}:`, error);
      }
    }
  }
  console.log(`🏷️  Seeded ${count} lookup items.`);
};

const seedSortOptions = async () => {
  console.log("↕️  Seeding sort options...");
  let count = 0;
  for (const option of SORT_OPTIONS) {
    try {
      const newSortOption = new SortOptionModel(option);
      await newSortOption.save();
      count++;
    } catch (error: any) {
      if (error.code !== 11000) console.error(`🔴 Error seeding sort option ${option.label}:`, error);
    }
  }
  console.log(`↕️  Seeded ${count} sort options.`);
};

const seedPaymentOptions = async () => {
  console.log("💳 Seeding payment options...");
  let count = 0;
  for (const option of PAYMENT_OPTIONS) {
    try {
      const newPaymentOption = new PaymentOptionModel({ optionId: option.id, name: option.name });
      await newPaymentOption.save();
      count++;
    } catch (error: any) {
      if (error.code !== 11000) console.error(`🔴 Error seeding payment option ${option.name}:`, error);
    }
  }
  console.log(`💳 Seeded ${count} payment options.`);
};

const seedDatabase = async () => {
  await connectDB();
  
  await clearDatabase(); 

  await seedCategories();
  await seedLookups();
  await seedSortOptions();
  await seedPaymentOptions();

  const userMap = await seedUsers();
  const courseMap = await seedCourses(userMap);
  await seedReviews(userMap, courseMap);
  await seedOrders(userMap, courseMap);
  await seedCertificates(userMap, courseMap);

  console.log("✅ Database seeding completed successfully!");
  await mongoose.disconnect();
  console.log("🔌 MongoDB disconnected.");
  process.exit(0);
};

seedDatabase().catch(error => {
  console.error("🔴 Error during database seeding:", error);
  mongoose.disconnect();
  process.exit(1);
});
