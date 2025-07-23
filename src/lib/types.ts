

export interface Course {
  id: string;
  _id?: string; // Add _id for consistency with API responses
  title: string;
  instructor: string; 
  rating: number;
  reviewsCount: number;
  price: number;
  originalPrice?: number;
  category: string;
  imageUrl: string;
  duration?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  description: string;
  curriculum?: Module[];
  studentsEnrolled?: number;
  studentsEnrolledCount?: number;
  lastUpdated?: string;
  language?: string;
  certificateAvailable?: boolean;
  highlights?: string[];
  sellerId?: string;
  providerInfo?: { 
    name: string;
    logoUrl?: string;
    verified?: boolean;
    description?: string; 
    websiteUrl?: string;
    type?: 'Individual' | 'Institute' | 'Coaching Center' | 'Verified Educator';
  };
  shortDescription?: string;
  tags?: string[];
  approvalStatus?: 'pending' | 'approved' | 'rejected';
  moneyBackGuaranteeDays?: number;
  freeTrialAvailable?: boolean;
  demoVideoUrl?: string; 
  downloadableMaterialsDescription?: string; 
  detailedScheduleDescription?: string; 
}

export interface EBook {
  id: string;
  _id?: string;
  title: string;
  author: string;
  rating: number;
  reviewsCount: number;
  price: number;
  originalPrice?: number;
  category: string;
  imageUrl: string;
  pages?: number;
  description: string;
  benefits?: string[];
  lastUpdated?: string;
  language?: string;
  providerInfo: {
    name: string;
    logoUrl?: string;
    verified?: boolean;
    email?: string;
    instagramUrl?: string;
  };
  shortDescription: string;
  tags?: string[];
  purchaseInstructions?: string[];
  importantNotice?: string;
  reviews?: Review[];
  faqs?: { q: string; a: string }[];
}

export interface Book {
  id: string;
  _id?: string;
  title: string;
  author?: string;
  category: string;
  subcategory: string;
  imageUrl: string;
  listingType: 'sell' | 'rent';
  price: number;
  rentPricePerMonth?: number;
  seller: User;
  location: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
    address: string;
  };
  approvalStatus: 'pending' | 'approved' | 'rejected';
}


export interface Subscription {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  category: 'Subscription';
  imageUrl: string;
  rating: number;
  reviewsCount: number;
  providerInfo: {
    name: string;
    logoUrl?: string;
  };
  shortDescription: string;
  description: string;
  validityOptions: {
    duration: string;
    price: number;
    originalPrice?: number;
  }[];
  features: string[];
  usageLimitations?: string[];
  purchaseInstructions?: string[];
  reviews?: Review[];
  faqs?: { q: string; a: string }[];
}


export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  order: number;
}

export interface Lesson {
  id:string;
  title: string;
  type: 'video' | 'pdf' | 'quiz' | 'text' | 'assignment';
  duration?: string;
  contentUrl?: string;
  textContent?: string;
  order: number;
  isFreePreview?: boolean;
}

export interface Review {
  id: string;
  _id?: string;
  courseId: string; // Can be course, ebook, or subscription ID
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
  helpfulVotes?: number;
  unhelpfulVotes?: number;
  moderationStatus?: 'pending' | 'approved' | 'rejected';
}

export type UserRole = 'student' | 'provider' | 'admin';

export interface User {
  id: string;
  _id?: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  avatarUrl?: string;
  bio?: string; 
  createdAt?: string;
  verificationStatus?: 'pending' | 'verified' | 'rejected' | 'unverified'; 
  documentsSubmitted?: boolean;
  notificationPreferences?: {
    courseUpdates?: boolean;
    promotions?: boolean;
    platformAnnouncements?: boolean;
  };
  whatsappNumber?: string;
}

export type CartItem = {
    type: 'course';
    item: Course;
} | {
    type: 'ebook';
    item: EBook;
} | {
    type: 'subscription';
    item: Subscription;
};

export type WishlistItem = {
    type: 'course';
    item: Course;
} | {
    type: 'ebook';
    item: EBook;
} | {
    type: 'subscription';
    item: Subscription;
} | {
    type: 'book';
    item: Book;
};

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: React.ElementType;
  subcategories?: Category[];
}

export interface PaymentOption {
  id: string;
  name: string;
  icon?: React.ElementType;
}

export interface Certificate {
  id: string;
  courseId: string;
  courseTitle: string;
  studentName: string;
  issueDate: string;
  certificateUrl: string;
}

export interface Order {
  id: string;
  userId: string;
  items: Array<{
    item: Course | EBook | Subscription,
    type: 'course' | 'ebook' | 'subscription',
    priceAtPurchase: number,
    titleAtPurchase: string
  }>;
  totalAmount: number;
  paymentMethod: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  orderDate: string;
  transactionId?: string;
}

    