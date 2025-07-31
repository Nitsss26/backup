
import type { Subscription, Review } from './types';
import mongoose from 'mongoose';

const generateObjectIdString = () => new mongoose.Types.ObjectId().toHexString();

const placeholderReviews: { [key: string]: Review[] } = {
  "unacademy-plus-3-months": [
    { id: generateObjectIdString(), _id: generateObjectIdString(), courseId: 'unacademy-plus-3-months', userId: 'user-sample-1', userName: 'Rohan V.', userAvatar: 'https://i.pravatar.cc/150?u=rohan', rating: 5, comment: "Great content and amazing educators. Helped me a lot for my CSIR-UGC NET prep.", createdAt: new Date('2024-06-20T10:00:00Z').toISOString() },
  ],
  "udemy-annual-subscription": [
    { id: generateObjectIdString(), _id: generateObjectIdString(), courseId: 'udemy-annual-subscription', userId: 'user-sample-2', userName: 'Priya S.', userAvatar: 'https://i.pravatar.cc/150?u=priya', rating: 4, comment: "Huge variety of courses. The team plan is great for my startup. Analytics could be better though.", createdAt: new Date('2024-06-18T11:00:00Z').toISOString() },
  ],
  "coursera-plus-1-month": [
    { id: generateObjectIdString(), _id: generateObjectIdString(), courseId: 'coursera-plus-1-month', userId: 'user-sample-3', userName: 'Vikram K.', userAvatar: 'https://i.pravatar.cc/150?u=vikram', rating: 5, comment: "Access to university-level courses is incredible. The flexibility of the monthly plan is perfect for me.", createdAt: new Date('2024-07-01T08:00:00Z').toISOString() },
  ],
  "skillshare-1-month-subscription": [
     { id: generateObjectIdString(), _id: generateObjectIdString(), courseId: 'skillshare-1-month-subscription', userId: 'user-sample-4', userName: 'Anjali M.', userAvatar: 'https://i.pravatar.cc/150?u=anjali', rating: 4, comment: "Love the creative classes. Great for learning new hobbies and skills. The project-based learning is very effective.", createdAt: new Date('2024-06-25T18:00:00Z').toISOString() },
  ],
  "edx-verified-track-subscription": [
    { id: generateObjectIdString(), _id: generateObjectIdString(), courseId: 'edx-verified-track-subscription', userId: 'user-sample-5', userName: 'Sameer P.', userAvatar: 'https://i.pravatar.cc/150?u=sameer', rating: 5, comment: "The quality of courses from top universities is unmatched. The verified track is great for my career profile.", createdAt: new Date('2024-06-22T09:00:00Z').toISOString() },
  ],
};

export const placeholderEducationalSubscriptions: Subscription[] = [
  {
    id: 'unacademy-plus-3-months',
    title: 'Unacademy Plus Subscription',
    price: 6399,
    category: "Subscription",
    imageUrl: "/un.jpeg",
    rating: 4.7,
    reviewsCount: 150,
    providerInfo: { name: 'Unacademy' },
    shortDescription: "Get exclusive discounts on Unacademy Subscriptions for various competitive exams like UPSC, IIT-JEE, NEET UG, and more.",
    description: "Access live classes from top educators, structured courses, and mock tests to crack your target exam. This plan provides unlimited access to all courses within your chosen category.",
    validityOptions: [
      { duration: "SSC JE & State AE (24 Mo)", price: 6399, description: "Ideal for long-term preparation for state engineering exams." },
      { duration: "IIT-JEE (24 Mo)", price: 9999, originalPrice: 15000, description: "Comprehensive two-year plan for JEE aspirants."},
      { duration: "UPSC CSE - GS (12 Mo)", price: 49998, description: "One year of intensive General Studies preparation for Civil Services."},
    ],
    features: [
      "Live interactive classes with top educators",
      "Structured courses & downloadable PDFs",
      "Live tests, quizzes, and mock tests",
      "Access to curated test series",
      "1:1 Live Mentorship (with Iconic plan)",
      "Customized Doubt Solving sessions"
    ],
    reviews: placeholderReviews['unacademy-plus-3-months'],
    faqs: [
        {q: "Can I watch recorded classes?", a: "Yes, recordings of all live classes are available to watch anytime at your convenience."},
        {q: "What is the difference between Plus and Iconic subscriptions?", a: "Iconic subscriptions include all Plus benefits, along with additional features like 1:1 Live Mentorship, Customized Doubt Solving, and sometimes physical notes."},
    ],
    url: "https://unacademy.com/goal/iit-jee-preparation/TMUVD/subscribe"
  },
  {
    id: 'udemy-annual-subscription',
    title: 'Udemy for Business',
    price: 8999,
    category: "Subscription",
    imageUrl: "/ud.png",
    rating: 4.6,
    reviewsCount: 1200,
    providerInfo: { name: 'Udemy' },
    shortDescription: "Access 25,000+ top courses for your team with flexible plans.",
    description: "Upskill your workforce with access to over 25,000 top-rated courses on technical and business skills. Udemy for Business offers fresh content on the most in-demand skills, AI-powered coding exercises, and advanced analytics.",
    validityOptions: [
        { duration: "Team Plan (2-20 users)", price: 2000, originalPrice: 0, description: "Get access to 13,000+ courses for your small team."},
        { duration: "Enterprise Plan (21+ users)", price: 0, originalPrice: 0, description: "Custom pricing with access to 25,000+ courses and advanced features."}
    ],
    features: [
      "Access to 13,000+ (Team) or 25,000+ (Enterprise) courses",
      "Goal-focused recommendations",
      "AI-powered coding exercises",
      "Advanced analytics and adoption reports",
      "Dedicated customer success team (Enterprise)",
      "International course collection in 15 languages"
    ],
    priceSuffix: "/user/month",
    reviews: placeholderReviews['udemy-annual-subscription'],
    faqs: [
        {q: "What is the minimum team size for the Team Plan?", a: "The Team Plan is designed for teams of 2 to 20 people."},
        {q: "How do I get pricing for the Enterprise Plan?", a: "You need to contact Udemy's sales team for custom pricing based on your organization's needs."}
    ],
    url: "https://www.udemy.com/business/plans-and-pricing/"
  },
  {
    id: 'coursera-plus-1-month',
    title: 'Coursera Plus Subscription',
    price: 4975,
    category: "Subscription",
    imageUrl: "/c.png",
    rating: 4.9,
    reviewsCount: 2500,
    providerInfo: { name: 'Coursera' },
    shortDescription: "Earn unlimited certificates from 170+ leading companies and universities.",
    description: "Coursera Plus offers unlimited access to over 10,000 courses, Specializations, and Professional Certificates. Learn job-relevant skills and earn credentials from industry leaders like Google, Meta, and top universities.",
    validityOptions: [
      { duration: "Monthly Plan", price: 4975, description: "Cancel anytime. Ideal for short-term learning goals."},
      { duration: "Annual Plan", price: 34275, description: "Save money with a yearly subscription and get a 14-day money-back guarantee."}
    ],
    features: [
      "Unlimited access to 10,000+ courses and Specializations",
      "Earn unlimited Professional Certificates",
      "Learn with 1,000+ applied projects and labs",
      "Start with a 7-day free trial"
    ],
    priceSuffix: "/month",
    reviews: placeholderReviews['coursera-plus-1-month'],
    faqs: [
        {q: "Can I cancel my monthly subscription anytime?", a: "Yes, the Coursera Plus Monthly subscription can be canceled at any time. You will retain access until the end of your billing period."},
        {q: "Are all courses on Coursera included in Plus?", a: "Most courses are included. However, some degree and MasterTrack programs are excluded. Look for the Coursera Plus badge on course pages."}
    ],
    url: "https://www.coursera.org/courseraplus"
  },
  {
    id: 'skillshare-1-month-subscription',
    title: 'Skillshare Premium Membership',
    price: 1165,
    category: "Subscription",
    imageUrl: "/s.png",
    rating: 4.5,
    reviewsCount: 800,
    providerInfo: { name: 'Skillshare' },
    shortDescription: "Explore thousands of creative classes with a premium membership.",
    description: "Unlock your creativity with Skillshare Premium. Get unlimited access to thousands of inspiring classes taught by industry experts and working professionals. From design and illustration to marketing and photography, learn new skills with hands-on projects.",
    validityOptions: [
        { duration: "Annual Membership", price: 1165, originalPrice: 1950, description: "Billed annually at ₹13,980. Best value for continuous learning."},
        { duration: "Team Plan (per user)", price: 13250, description: "Starting price per user, billed annually for teams."}
    ],
    features: [
      "Unlimited access to all classes",
      "Project-based, hands-on learning",
      "Download classes for offline viewing",
      "Support for creators with every membership",
      "No ads, ever"
    ],
    priceSuffix: "/month (billed annually)",
    reviews: placeholderReviews['skillshare-1-month-subscription'],
    faqs: [
        {q: "Is there a free trial?", a: "Yes, Skillshare typically offers a free trial when you sign up for a premium plan, allowing you to explore the platform before committing."},
        {q: "What kind of classes are available?", a: "Skillshare focuses on creative skills, offering classes in categories like design, illustration, photography, video, freelancing, and more."}
    ],
    url: "https://www.skillshare.com/en/membership"
  },
  {
    id: 'edx-verified-track-subscription',
    title: 'edX Subscription for Institutions',
    price: 29999,
    category: "Subscription",
    imageUrl: "https://img.freepik.com/premium-psd/pricing-plans-web-elements-website_206192-14.jpg",
    rating: 4.8,
    reviewsCount: 950,
    providerInfo: { name: 'edX' },
    shortDescription: "Provide unlimited access to top courses for your students or employees.",
    description: "Empower your institution with edX for Higher Education or Business. Offer your learners access to over 1,300 in-demand, self-paced courses from the world's top universities and companies like Harvard, MIT, Google, and Microsoft.",
    validityOptions: [
      { duration: "Starter Plan (per learner)", price: 29999, description: "For your classroom or department. Includes unlimited catalog access."},
      { duration: "Campus Plan", price: 0, description: "Custom pricing to scale learning across your entire academic institution."}
    ],
    features: [
      "Unlimited access to 1,300+ courses",
      "Informed by the science of learning from MIT and Harvard",
      "Seamlessly integrates with leading LMS platforms",
      "Self-paced learning experience",
      "Reporting and analytics dashboards"
    ],
    priceSuffix: "/learner/year",
    reviews: placeholderReviews['edx-verified-track-subscription'],
    faqs: [
        {q: "Is this for individuals or institutions?", a: "These plans are designed for higher education institutions and businesses. Individual learners can audit courses for free or pay for a verified certificate on a per-course basis."},
        {q: "How does LMS integration work?", a: "edX integrates with leading LMS platforms like Canvas, Moodle, and Blackboard, allowing for SSO login and grade pass-back."}
    ],
    url: "https://www.edx.org/business"
  },
];

export const getEducationalSubscriptionById = (id: string): Subscription | undefined => {
    return placeholderEducationalSubscriptions.find(sub => sub.id === id);
}
