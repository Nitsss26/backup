
export interface Course {
  id: string;
  title: string;
  instructor: string; // Keep for backward compatibility or simple display name
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
  lastUpdated?: string; 
  language?: string;
  certificateAvailable?: boolean;
  highlights?: string[]; 
  sellerId?: string; 
  providerInfo?: { // Enhanced provider/seller information
    name: string;
    logoUrl?: string;
    verified?: boolean;
    description?: string; // Short bio or description of the seller/institute
  };
  shortDescription?: string;
  tags?: string[];
  approvalStatus?: 'pending' | 'approved' | 'rejected'; 
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
  courseId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string; 
  helpfulVotes: number;
  unhelpfulVotes: number;
  moderationStatus?: 'pending' | 'approved' | 'rejected'; 
}

export type UserRole = 'student' | 'provider' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  bio?: string; // Added bio field
  createdAt?: string;
  verificationStatus?: 'pending' | 'verified' | 'rejected' | 'unverified'; // Added 'unverified'
  documentsSubmitted?: boolean; 
}

export interface CartItem {
  course: Course;
}

export interface WishlistItem {
  course: Course;
}

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
  items: Course[]; // Could be Course ID and snapshot of price/title at time of purchase
  totalAmount: number;
  paymentMethod: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  orderDate: string;
  transactionId?: string;
}
