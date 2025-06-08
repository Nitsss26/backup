
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserModel from '../src/models/User';
import CourseModel from '../src/models/Course';
import ReviewModel from '../src/models/Review';
import OrderModel from '../src/models/Order';
import CertificateModel from '../src/models/Certificate';
import { 
  placeholderUsers, 
  placeholderCourses, 
  placeholderReviews, 
  placeholderOrders, 
  placeholderCertificates,
  featuredCoursesForHomepage,
  topCategoryShowcaseData
} from '../src/lib/placeholder-data';
import type { User, Course, Review as ReviewType, Order as OrderType, Certificate as CertificateType } from '../src/lib/types';

dotenv.config({ path: '.env.local' }); // Load .env.local first if it exists
dotenv.config(); // Load .env

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
  console.log("🗑️  Database cleared.");
};

const seedUsers = async () => {
  console.log("👤 Seeding users...");
  const userMap = new Map<string, mongoose.Types.ObjectId>();
  
  for (const userData of placeholderUsers) {
    // In a real app, hash passwords here before saving.
    // For seeding, we'll assume passwords are not critical or are handled elsewhere.
    const user = new UserModel({
      ...userData,
      _id: new mongoose.Types.ObjectId(), // Ensure new ObjectId
      password: 'password123', // Placeholder password - REMOVE FOR PRODUCTION
      // Ensure all required fields from IUser are present
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
  
  // Combine all course sources
  const allPlaceholderCourses = [
    ...placeholderCourses,
    ...featuredCoursesForHomepage,
    ...topCategoryShowcaseData.flatMap(cat => cat.courses)
  ];

  // Deduplicate courses by ID, giving priority to earlier occurrences (e.g., featured)
  const uniqueCoursesData = Array.from(new Map(allPlaceholderCourses.map(course => [course.id, course])).values());


  for (const courseData of uniqueCoursesData) {
    const sellerMongoId = userMap.get(courseData.sellerId || '');
    if (!sellerMongoId && courseData.sellerId) {
      console.warn(`⚠️ Seller ID ${courseData.sellerId} for course "${courseData.title}" not found in userMap. Skipping seller link.`);
    }

    let languageForDb = courseData.language ? courseData.language.toLowerCase() : 'english';
    if (languageForDb === 'mandarin chinese') {
      languageForDb = 'chinese-simplified';
    }

    const course = new CourseModel({
      ...courseData,
      _id: new mongoose.Types.ObjectId(),
      seller: sellerMongoId || undefined, // Use mapped seller ID or leave undefined if not found
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
      // Ensure all required fields from ICourse are present
      shortDescription: courseData.shortDescription || 'Default short description if missing.',
      language: languageForDb,
      providerInfo: courseData.providerInfo || { name: courseData.instructor, verified: false },
      lastUpdated: courseData.lastUpdated ? new Date(courseData.lastUpdated) : new Date(),
      createdAt: courseData.createdAt ? new Date(courseData.createdAt) : new Date(),
    });
    await course.save();
    courseMap.set(courseData.id, course._id);

    // If seller exists, add this course to their coursesCreated list
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
          moderationStatus: reviewData.moderationStatus || 'approved', // Default to approved for seed
          createdAt: reviewData.createdAt ? new Date(reviewData.createdAt) : new Date(),
        });
        await review.save();
        count++;
      } catch (error: any) {
        if (error.code === 11000) { // Duplicate key error
          // console.warn(`⚠️ Skipping duplicate review for course ${reviewData.courseId} by user ${reviewData.userId}.`);
        } else {
          // console.error(`🔴 Error seeding review for course ${reviewData.courseId}:`, error);
        }
      }
    } else {
      // console.warn(`⚠️ Could not find user or course for review ID ${reviewData.id}. User: ${reviewData.userId}, Course: ${reviewData.courseId}`);
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
        if (!courseMongoId) {
          // console.warn(`⚠️ Course ID ${item.id} not found for order ${orderData.id}. Skipping item.`);
          return null;
        }
        return {
          course: courseMongoId,
          priceAtPurchase: item.price,
          titleAtPurchase: item.title,
        };
      }).filter(item => item !== null) as any[]; // Filter out nulls

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
        // Add this order to the user's orders list
        await UserModel.findByIdAndUpdate(userMongoId, { $addToSet: { orders: order._id } });
      }
    } else {
      // console.warn(`⚠️ User ID ${orderData.userId} not found for order ${orderData.id}. Skipping order.`);
    }
  }
  console.log(`🛒 Seeded ${count} orders.`);
};

const seedCertificates = async (userMap: Map<string, mongoose.Types.ObjectId>, courseMap: Map<string, mongoose.Types.ObjectId>) => {
  console.log("📜 Seeding certificates...");
  let count = 0;
  for (const certData of placeholderCertificates) {
    // Find user by name as placeholder data uses name for studentName in certificates
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
        verificationId: new mongoose.Types.ObjectId().toHexString(), // Ensure unique verification ID
      });
      await certificate.save();
      count++;
    } else {
      // console.warn(`⚠️ Could not find user (${certData.studentName}) or course (${certData.courseId}) for certificate ID ${certData.id}.`);
    }
  }
  console.log(`📜 Seeded ${count} certificates.`);
};

const seedDatabase = async () => {
  await connectDB();
  
  // WARNING: This will delete all existing data in these collections!
  // Comment out if you don't want to clear the database on every seed.
  await clearDatabase(); 

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
