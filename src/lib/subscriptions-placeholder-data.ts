
// import type { Subscription, Review } from './types';
// import mongoose from 'mongoose';

// const generateObjectIdString = () => new mongoose.Types.ObjectId().toHexString();

// const placeholderReviews: { [key: string]: Review[] } = {
//   "unacademy-plus-3-months": [
//     { id: generateObjectIdString(), _id: generateObjectIdString(), courseId: 'unacademy-plus-3-months', userId: 'user-sample-1', userName: 'Rohan V.', userAvatar: 'https://i.pravatar.cc/150?u=rohan', rating: 5, comment: "Great content and amazing educators. Helped me a lot for my CSIR-UGC NET prep.", createdAt: new Date('2024-06-20T10:00:00Z').toISOString() },
//   ],
//   "udemy-annual-subscription": [
//     { id: generateObjectIdString(), _id: generateObjectIdString(), courseId: 'udemy-annual-subscription', userId: 'user-sample-2', userName: 'Priya S.', userAvatar: 'https://i.pravatar.cc/150?u=priya', rating: 4, comment: "Huge variety of courses. The team plan is great for my startup. Analytics could be better though.", createdAt: new Date('2024-06-18T11:00:00Z').toISOString() },
//   ],
//   "coursera-plus-1-month": [
//     { id: generateObjectIdString(), _id: generateObjectIdString(), courseId: 'coursera-plus-1-month', userId: 'user-sample-3', userName: 'Vikram K.', userAvatar: 'https://i.pravatar.cc/150?u=vikram', rating: 5, comment: "Access to university-level courses is incredible. The flexibility of the monthly plan is perfect for me.", createdAt: new Date('2024-07-01T08:00:00Z').toISOString() },
//   ],
//   "skillshare-1-month-subscription": [
//      { id: generateObjectIdString(), _id: generateObjectIdString(), courseId: 'skillshare-1-month-subscription', userId: 'user-sample-4', userName: 'Anjali M.', userAvatar: 'https://i.pravatar.cc/150?u=anjali', rating: 4, comment: "Love the creative classes. Great for learning new hobbies and skills. The project-based learning is very effective.", createdAt: new Date('2024-06-25T18:00:00Z').toISOString() },
//   ],
//   "edx-verified-track-subscription": [
//     { id: generateObjectIdString(), _id: generateObjectIdString(), courseId: 'edx-verified-track-subscription', userId: 'user-sample-5', userName: 'Sameer P.', userAvatar: 'https://i.pravatar.cc/150?u=sameer', rating: 5, comment: "The quality of courses from top universities is unmatched. The verified track is great for my career profile.", createdAt: new Date('2024-06-22T09:00:00Z').toISOString() },
//   ],
// };

// export const placeholderSubscriptions: Subscription[] = [
//   {
//     id: 'sub3',
//     title: 'Unacademy Plus - SSC JE & State AE',
//     price: 6399,
//     category: "Subscription",
//     imageUrl: "/un.jpeg",
//     rating: 4.7,
//     reviewsCount: 150,
//     providerInfo: { name: 'Unacademy', logoUrl: 'https://i.pinimg.com/474x/68/a0/42/68a042e75a0fe666c2ef0382ddb3f738.jpg' },
//     shortDescription: "Get exclusive discounts on Unacademy Subscriptions for various competitive exams like UPSC, IIT-JEE, NEET UG, and more.",
//     description: "Access live classes from top educators, structured courses, and mock tests to crack your target exam. This plan provides unlimited access to all courses within your chosen category.",
//     validityOptions: [
//       { duration: "SSC JE & State AE (24 Mo)", price: 6399, description: "Ideal for long-term preparation for state engineering exams." },
//       { duration: "IIT-JEE (24 Mo)", price: 9999, originalPrice: 15000, description: "Comprehensive two-year plan for JEE aspirants."},
//       { duration: "UPSC CSE - GS (12 Mo)", price: 49998, description: "One year of intensive General Studies preparation for Civil Services."},
//     ],
//     features: [
//       "Live interactive classes with top educators",
//       "Structured courses & downloadable PDFs",
//       "Live tests, quizzes, and mock tests",
//       "Access to curated test series",
//       "1:1 Live Mentorship (with Iconic plan)",
//       "Customized Doubt Solving sessions"
//     ],
//     reviews: placeholderReviews['unacademy-plus-3-months'],
//     faqs: [
//         {q: "Can I watch recorded classes?", a: "Yes, recordings of all live classes are available to watch anytime at your convenience."},
//         {q: "What is the difference between Plus and Iconic subscriptions?", a: "Iconic subscriptions include all Plus benefits, along with additional features like 1:1 Live Mentorship, Customized Doubt Solving, and sometimes physical notes."},
//     ],
//     url: "/edusubscriptions/sub3"
//   },
//   {
//     id: 'sub1',
//     title: 'Udemy for Business - Team Plan',
//     price: 2000,
//     category: "Subscription",
//     imageUrl: "/ud.png",
//     rating: 4.6,
//     reviewsCount: 1200,
//     providerInfo: { name: 'Udemy', logoUrl: 'https://logowik.com/content/uploads/images/udemy-new-20212512.jpg' },
//     shortDescription: "Access 13,000+ top courses for your team with flexible plans.",
//     description: "Upskill your workforce with access to top-rated courses on technical and business skills. Udemy for Business offers fresh content on the most in-demand skills, AI-powered coding exercises, and advanced analytics.",
//     validityOptions: [
//         { duration: "Team Plan (2-20 users)", price: 2000, originalPrice: 0, description: "Billed monthly. For small teams."},
//         { duration: "Enterprise Plan (21+ users)", price: 0, originalPrice: 0, description: "Custom pricing with access to 25,000+ courses and advanced features."}
//     ],
//     features: [
//       "Access to 13,000+ (Team) or 25,000+ (Enterprise) courses",
//       "Goal-focused recommendations",
//       "AI-powered coding exercises",
//       "Advanced analytics and adoption reports",
//       "Dedicated customer success team (Enterprise)",
//       "International course collection in 15 languages"
//     ],
//     priceSuffix: "/user/month",
//     reviews: placeholderReviews['udemy-annual-subscription'],
//     faqs: [
//         {q: "What is the minimum team size for the Team Plan?", a: "The Team Plan is designed for teams of 2 to 20 people."},
//         {q: "How do I get pricing for the Enterprise Plan?", a: "You need to contact Udemy's sales team for custom pricing based on your organization's needs."}
//     ],
//     url: "/edusubscriptions/sub1"
//   },
//   {
//     id: 'sub2',
//     title: 'Coursera Plus - Monthly Plan',
//     price: 4975,
//     category: "Subscription",
//     imageUrl: "/c.png",
//     rating: 4.9,
//     reviewsCount: 2500,
//     providerInfo: { name: 'Coursera', logoUrl: '/coursera.png' },
//     shortDescription: "Earn unlimited certificates from 170+ leading companies and universities.",
//     description: "Coursera Plus offers unlimited access to over 10,000 courses, Specializations, and Professional Certificates. Learn job-relevant skills and earn credentials from industry leaders like Google, Meta, and top universities.",
//     validityOptions: [
//       { duration: "Monthly Plan", price: 4975, description: "Cancel anytime. Ideal for short-term learning goals."},
//       { duration: "Annual Plan", price: 34275, description: "Save money with a yearly subscription."}
//     ],
//     features: [
//       "Unlimited access to 10,000+ courses and Specializations",
//       "Earn unlimited Professional Certificates",
//       "Learn with 1,000+ applied projects and labs",
//       "Start with a 7-day free trial"
//     ],
//     priceSuffix: "/month",
//     reviews: placeholderReviews['coursera-plus-1-month'],
//     faqs: [
//         {q: "Can I cancel my monthly subscription anytime?", a: "Yes, the Coursera Plus Monthly subscription can be canceled at any time. You will retain access until the end of your billing period."},
//     ],
//     url: "/edusubscriptions/sub2"
//   },
//   {
//     id: 'sub4',
//     title: 'Skillshare Premium Membership',
//     price: 1165,
//     category: "Subscription",
//     imageUrl: "/s.png",
//     rating: 4.5,
//     reviewsCount: 800,
//     providerInfo: { name: 'Skillshare', logoUrl: 'https://logowik.com/content/uploads/images/skill-share5249.jpg' },
//     shortDescription: "Explore thousands of creative classes with a premium membership.",
//     description: "Unlock your creativity with Skillshare Premium. Get unlimited access to thousands of inspiring classes taught by industry experts and working professionals. From design and illustration to marketing and photography, learn new skills with hands-on projects.",
//     validityOptions: [
//         { duration: "Annual Membership", price: 1165, originalPrice: 1950, description: "Billed annually at ₹13,980. Best value for continuous learning."},
//         { duration: "Team Plan (per user)", price: 13250, description: "Starting price per user, billed annually for teams."}
//     ],
//     features: [
//       "Unlimited access to all classes",
//       "Project-based, hands-on learning",
//       "Download classes for offline viewing",
//     ],
//     priceSuffix: "/month (billed annually)",
//     reviews: placeholderReviews['skillshare-1-month-subscription'],
//     faqs: [
//         {q: "Is there a free trial?", a: "Yes, Skillshare typically offers a free trial when you sign up for a premium plan, allowing you to explore the platform before committing."},
//     ],
//     url: "/edusubscriptions/sub4"
//   },
//   {
//     id: 'sub5',
//     title: 'edX Subscription - Starter Plan',
//     price: 29999,
//     category: "Subscription",
//     imageUrl: 'https://img.freepik.com/premium-psd/pricing-plans-web-elements-website_206192-14.jpg',
//     rating: 4.8,
//     reviewsCount: 950,
//     providerInfo: { name: 'edX', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/EdX_newer_logo.svg/330px-EdX_newer_logo.svg.png' },
//     shortDescription: "Provide unlimited access to top courses for your students or employees.",
//     description: "Empower your institution with edX for Higher Education or Business. Offer your learners access to over 1,300 in-demand, self-paced courses from the world's top universities and companies like Harvard, MIT, Google, and Microsoft.",
//     validityOptions: [
//       { duration: "Starter Plan (per learner)", price: 29999, description: "For your classroom or department. Includes unlimited catalog access."},
//       { duration: "Campus Plan", price: 0, description: "Custom pricing to scale learning across your entire academic institution."}
//     ],
//     features: [
//       "Unlimited access to 1,300+ courses",
//       "Informed by the science of learning from MIT and Harvard",
//       "Seamlessly integrates with leading LMS platforms",
//     ],
//     priceSuffix: "/learner/year",
//     reviews: placeholderReviews['edx-verified-track-subscription'],
//     faqs: [
//         {q: "Is this for individuals or institutions?", a: "These plans are designed for higher education institutions and businesses. Individual learners can audit courses for free or pay for a verified certificate on a per-course basis."},
//     ],
//     url: "/edusubscriptions/sub5"
//   },
// ];

// export const getSubscriptionById = (id: string): Subscription | undefined => {
//     return placeholderSubscriptions.find(sub => sub.id === id);
// }


import type { Subscription, Review } from './types';
import mongoose from 'mongoose';

const generateObjectIdString = () => new mongoose.Types.ObjectId().toHexString();

const placeholderReviews: { [key: string]: Review[] } = {
  "sub-001": [ // Amazon Prime Video
    { id: generateObjectIdString(), _id: generateObjectIdString(), courseId: 'sub-001', userId: 'user-sample-1', userName: 'Arthur F.', userAvatar: 'https://i.pravatar.cc/150?u=arthur', rating: 5, comment: "Everything fine. Due to timezone difference it took some time to activate my account, but when I asked for help they replied very fast. Account works just as I expected.", createdAt: new Date('2025-03-04T10:00:00Z').toISOString() },
    { id: generateObjectIdString(), _id: generateObjectIdString(), courseId: 'sub-001', userId: 'user-sample-2', userName: 'SYJU K', userAvatar: 'https://i.pravatar.cc/150?u=syju', rating: 5, comment: "Very good service. Received the login details within an hour. Highly recommended for affordable streaming.", createdAt: new Date('2025-02-05T11:00:00Z').toISOString() },
    { id: generateObjectIdString(), _id: generateObjectIdString(), courseId: 'sub-001', userId: 'user-sample-3', userName: 'Devansh', userAvatar: 'https://i.pravatar.cc/150?u=devansh', rating: 5, comment: "Fast service. Gives genuine products at a cheap rate. No problem in watching no one interrupt in between. Loving till now the product is best", createdAt: new Date('2024-10-04T11:00:00Z').toISOString() },
  ],
  "sub-002": [ // Perplexity Pro
    { id: generateObjectIdString(), _id: generateObjectIdString(), courseId: 'sub-002', userId: 'user-sample-4', userName: 'John D.', userAvatar: 'https://i.pravatar.cc/150?u=john', rating: 5, comment: "Everything is good. The activation process was smooth and the seller was very helpful.", createdAt: new Date('2025-07-08T12:15:00Z').toISOString() },
    { id: generateObjectIdString(), _id: generateObjectIdString(), courseId: 'sub-002', userId: 'user-sample-5', userName: 'Alex P.', userAvatar: 'https://i.pravatar.cc/150?u=alex', rating: 5, comment: "paid. For an hour, the seller wrote me. Registered according to instructions and received a PRO account for a year. super super!", createdAt: new Date('2025-06-25T01:24:00Z').toISOString() },
  ],
  "sub-003": [ // Netflix
    { id: generateObjectIdString(), _id: generateObjectIdString(), courseId: 'sub-003', userId: 'user-sample-6', userName: 'Alfonso R.', userAvatar: 'https://i.pravatar.cc/150?u=alfonso', rating: 5, comment: "It’s really a worthwhile service, and best of all, it’s reliable over time. If there’s a problem, they’re there to attend to. Let them stay that way.", createdAt: new Date('2025-01-08T00:00:00Z').toISOString() },
    { id: generateObjectIdString(), _id: generateObjectIdString(), courseId: 'sub-003', userId: 'user-sample-7', userName: 'Avadh Joshi', userAvatar: 'https://i.pravatar.cc/150?u=avadh', rating: 5, comment: "Recently purchased this product from your site and i am very happy with the purchase of netflix premium yearly. Great price and got same day delivery also.", createdAt: new Date('2024-12-02T00:00:00Z').toISOString() },
  ],
  "sub-004": [ // Spotify
    { id: generateObjectIdString(), _id: generateObjectIdString(), courseId: 'sub-004', userId: 'user-sample-8', userName: 'David', userAvatar: 'https://i.pravatar.cc/150?u=david', rating: 5, comment: "At the moment it works, and on Spotify it says that the subscription ends next year, it's really a bomb.", createdAt: new Date('2025-07-14T00:00:00Z').toISOString() },
    { id: generateObjectIdString(), _id: generateObjectIdString(), courseId: 'sub-004', userId: 'user-sample-9', userName: 'USAMEX', userAvatar: 'https://i.pravatar.cc/150?u=usamex', rating: 5, comment: "As soon as I logged in the Premium subscription was enabled for the 12 months. Just had to change the password and keep the email address to access the account further. I hope this works for the whole year.", createdAt: new Date('2025-07-02T00:00:00Z').toISOString() },
  ],
};

export const placeholderSubscriptions: Subscription[] = [
  {
    id: 'sub-001',
    title: "Amazon Prime Video Premium",
    price: 65.00,
    originalPrice: 125.00,
    category: "Entertainment",
    imageUrl: "https://i.postimg.cc/25y5DrfN/app.png",
    rating: 4.89,
    reviewsCount: 122,
    providerInfo: {
      name: "Prime Video Services",
      verified: true
    },
    shortDescription: "Private Prime Video Premium subscription supporting all devices. Create your own profile and set a pin.",
    description: "Get your private Prime Video Premium subscription. It supports all devices including Android, iOS, Windows, Mac, and Smart TVs. You can use it on up to 2 devices simultaneously. You can create your own profile and secure it with a pin. This subscription is 100% legitimate and safe, with a full replacement warranty.",
    validityOptions: [
      { duration: "1 Month", price: 65.00, originalPrice: 125.00 },
      { duration: "6 Months", price: 350.00, originalPrice: 750.00 },
      { duration: "12 Months", price: 675.00, originalPrice: 1499.00 }
    ],
    features: [
      "All Devices Supported (Android, iOS, TV)",
      "Use on up to 2 devices simultaneously",
      "Create and secure your own profile with a PIN",
      "100% Legit and Safe Subscription",
      "Full Replacement Warranty"
    ],
    usageLimitations: [
      "Login is limited to a single device.",
      "Cannot change account details and password.",
      "This membership only includes Prime Videos.",
      "Create and use your own profile only."
    ],
    purchaseInstructions: [
      "Worldwide Email Delivery within 30-180 minutes.",
      "Chat with us for any doubts or concerns.",
      "Read the description for all details before purchasing."
    ],
    reviews: placeholderReviews['sub-001'],
    faqs: [
        {q: "Is this the same as Amazon Prime for shopping?", a: "No, this subscription is only for Prime Video content. It does not include Amazon Prime shopping benefits like free delivery."},
        {q: "Can I change the password?", a: "No, you cannot change the account details or password. You can, however, create your own profile and set a PIN for it."}
    ]
  },
  {
    id: 'sub-002',
    title: "Perplexity Pro - 1 Year",
    price: 450,
    originalPrice: 16500,
    category: "Productivity",
    imageUrl: "https://i.postimg.cc/BvznZkqL/per.png",
    rating: 5.0,
    reviewsCount: 12,
    providerInfo: {
      name: "GGsel Resellers",
      verified: false
    },
    shortDescription: "One year of Perplexity Pro AI with advanced models like GPT-4o, Claude 3, and more on your personal mail.",
    description: "The original cost of Perplexity Pro is $200 per year. We are offering it at an exclusive price of just ₹450 for a limited time! This includes AI models like GPT-4o, Claude 3 Sonnet, and image generation with DALL-E 3.",
    validityOptions: [
      { duration: "1 Year", price: 450, originalPrice: 16500 }
    ],
    features: [
      "Access to Advanced AI Models: GPT-4o, Claude 3, etc.",
      "Image Generation with DALL-E 3",
      "Full 1-Year Warranty",
      "Activation on your personal email address",
      "Works globally"
    ],
    purchaseInstructions: [
      "After purchase, you will receive a code.",
      "Send us this code in the GGsell chat to start the delivery process.",
      "After verification, the subscription will be activated on your email."
    ],
    reviews: placeholderReviews['sub-002'],
     faqs: [
        {q: "Is this a shared account?", a: "No, the subscription is activated on your personal email address."},
        {q: "What happens if the subscription stops working?", a: "This purchase comes with a full 1-year warranty. If it stops working, we will provide a replacement."}
    ]
  },
  {
    id: 'sub-003',
    title: "Netflix Premium - 1 Year",
    price: 1695,
    originalPrice: 7788,
    category: "Entertainment",
    imageUrl: "https://i.postimg.cc/MpWT91PT/nt.png",
    rating: 4.83,
    reviewsCount: 41,
    providerInfo: {
      name: "Global Subscriptions",
      verified: true
    },
    shortDescription: "Enjoy Netflix Premium for 12 months with 4K Ultra HD quality, multi-device support, and global access.",
    description: "Get a stable, prepaid Netflix Premium account for 12 months. This is not a trial. Enjoy 4K Ultra HD + HDR streaming on a single screen at a time. The subscription works on all devices and can be streamed globally without restrictions. We offer a full 12-month replacement warranty.",
    validityOptions: [
      { duration: "12 Months", price: 1695, originalPrice: 7788 }
    ],
    features: [
      "4K Ultra HD + HDR Streaming",
      "Global access without VPN restrictions",
      "Supports all devices: TV, Mac, Windows, iOS, Android",
      "Stable prepaid account (not a trial)",
      "Full 12-month replacement warranty"
    ],
    usageLimitations: [
      "Login is limited to a single device at a time.",
      "Email and phone number cannot be changed."
    ],
    purchaseInstructions: [
      "Add to cart and proceed to checkout.",
      "Login credentials will be delivered via email within 30-180 minutes.",
      "Log in on the Netflix website or app and start streaming."
    ],
    reviews: placeholderReviews['sub-003'],
    faqs: [
        {q: "Is this a legitimate subscription?", a: "Yes, this is a 100% original and safe-to-use account. We provide a full replacement warranty for the entire duration."},
        {q: "Can I use this outside of India?", a: "Absolutely. Our Netflix Premium subscription works worldwide, and no VPN is required to stream."}
    ]
  },
  {
    id: 'sub-004',
    title: "Spotify Premium - 12 Months",
    price: 999,
    originalPrice: 2388,
    category: "Music",
    imageUrl: "https://i.postimg.cc/DwBzHmHc/Screenshot-2025-07-21-042127.png",
    rating: 4.87,
    reviewsCount: 15,
    providerInfo: {
      name: "Music Hub",
      verified: false
    },
    shortDescription: "Get a personal Spotify Premium account for 12 months. Enjoy ad-free music, offline mode, and unlimited skips.",
    description: "This product provides you with a unique Spotify Premium account for 12 months. You will receive login and password details after purchase. Enjoy unlimited high-quality streaming, offline mode, and no ad interruptions.",
    validityOptions: [
      { duration: "12 Months", price: 999, originalPrice: 2388 }
    ],
    features: [
      "Unlimited high-quality streaming",
      "Play music without an internet connection (offline mode)",
      "No ad interruption",
      "Unlimited skips",
      "Works on all devices"
    ],
    usageLimitations: [
      "This is a unique account, not a code.",
      "Cannot be activated on an existing Spotify account.",
      "It is recommended not to change country settings."
    ],
    purchaseInstructions: [
      "Complete the purchase.",
      "You will receive login and password details for a Spotify account via email.",
      "Log in and start enjoying your premium subscription."
    ],
    reviews: placeholderReviews['sub-004'],
    faqs: [
        {q: "Can I use this on my existing Spotify account?", a: "No, this is a new, unique account. You will receive login credentials for it."},
        {q: "What if I change the country?", a: "It's recommended not to change the country settings, as it may lead to changes in the subscription type."}
    ]
  }
];

export const getSubscriptionById = (id: string): Subscription | undefined => {
    return placeholderSubscriptions.find(sub => sub.id === id);
}
