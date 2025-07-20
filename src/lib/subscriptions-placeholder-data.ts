
import type { Subscription, Review } from './types';
import mongoose from 'mongoose';

const generateObjectIdString = () => new mongoose.Types.ObjectId().toHexString();

const placeholderReviews: { [key: string]: Review[] } = {
  "sub-001": [
    { id: generateObjectIdString(), _id: generateObjectIdString(), courseId: 'sub-001', userId: 'user-sample-1', userName: 'Arthur F.', userAvatar: 'https://i.pravatar.cc/150?u=arthur', rating: 5, comment: "Everything fine. Due to timezone difference it took some time to activate my account, but when I asked for help they replied very fast. Account works just as I expected.", createdAt: new Date('2025-03-04T10:00:00Z').toISOString() },
    { id: generateObjectIdString(), _id: generateObjectIdString(), courseId: 'sub-001', userId: 'user-sample-2', userName: 'SYJU K', userAvatar: 'https://i.pravatar.cc/150?u=syju', rating: 5, comment: "Very good.", createdAt: new Date('2025-02-05T11:00:00Z').toISOString() },
    { id: generateObjectIdString(), _id: generateObjectIdString(), courseId: 'sub-001', userId: 'user-sample-3', userName: 'Devansh', userAvatar: 'https://i.pravatar.cc/150?u=devansh', rating: 5, comment: "Fast service. Gives genuine products at a cheap rate. No problem in watching no one interrupt in between. Loving till now the product is best", createdAt: new Date('2024-10-04T11:00:00Z').toISOString() },
  ],
  "sub-002": [
    { id: generateObjectIdString(), _id: generateObjectIdString(), courseId: 'sub-002', userId: 'user-sample-4', userName: 'John D.', userAvatar: 'https://i.pravatar.cc/150?u=john', rating: 5, comment: "Everything is good. The first day is normal.", createdAt: new Date('2025-07-08T12:15:00Z').toISOString() },
    { id: generateObjectIdString(), _id: generateObjectIdString(), courseId: 'sub-002', userId: 'user-sample-5', userName: 'Alex P.', userAvatar: 'https://i.pravatar.cc/150?u=alex', rating: 5, comment: "paid. For an hour, the seller wrote me. Deleted instructions and promotional code. Registered according to instructions and received a PRO account for a year. super super!", createdAt: new Date('2025-06-25T01:24:00Z').toISOString() },
  ],
  "sub-003": [
    { id: generateObjectIdString(), _id: generateObjectIdString(), courseId: 'sub-003', userId: 'user-sample-6', userName: 'Alfonso R.', userAvatar: 'https://i.pravatar.cc/150?u=alfonso', rating: 5, comment: "It’s really a worthwhile service, and best of all, it’s reliable over time. If there’s a problem, they’re there to attend to. Let them stay that way.", createdAt: new Date('2025-01-08T00:00:00Z').toISOString() },
    { id: generateObjectIdString(), _id: generateObjectIdString(), courseId: 'sub-003', userId: 'user-sample-7', userName: 'Avadh Joshi', userAvatar: 'https://i.pravatar.cc/150?u=avadh', rating: 5, comment: "Recently purchased this product from your site and i am very happy with the purchase of netflix premium yearly. Great price and got same day delivery also.", createdAt: new Date('2024-12-02T00:00:00Z').toISOString() },
  ],
  "sub-004": [
    { id: generateObjectIdString(), _id: generateObjectIdString(), courseId: 'sub-004', userId: 'user-sample-8', userName: 'David', userAvatar: 'https://i.pravatar.cc/150?u=david', rating: 5, comment: "At the moment it works, and on Spotify it says that the subscription ends next year, it's really a bomb.", createdAt: new Date('2025-07-14T00:00:00Z').toISOString() },
    { id: generateObjectIdString(), _id: generateObjectIdString(), courseId: 'sub-004', userId: 'user-sample-9', userName: 'USAMEX', userAvatar: 'https://i.pravatar.cc/150?u=usamex', rating: 5, comment: "As soon as I logged in the Premium subscription was enabled for the 12 months Just had to change the password and keep the email address to access the account further I hope this works for the whole year, I'll update the review if anything changes", createdAt: new Date('2025-07-02T00:00:00Z').toISOString() },
  ],
};

export const placeholderSubscriptions: Subscription[] = [
  {
    id: 'sub-001',
    title: "Amazon Prime Video Premium",
    price: 65.00,
    originalPrice: 125.00,
    category: "Subscription",
    imageUrl: "/prime.jpeg",
    rating: 4.89,
    reviewsCount: 122,
    providerInfo: {
      name: "Prime Video Services",
      verified: true
    },
    shortDescription: "Private Prime Video Premium subscription supporting all devices. Create your own profile and set a pin.",
    description: "Get your private Prime Video Premium subscription. It supports all devices including Android, iOS, Windows, Mac, and Smart TVs. You can use it on up to 2 devices simultaneously. You can create your own profile and secure it with a pin. For Amazon Prime shopping, please check our other listings. This subscription is 100% legitimate and safe, with a full replacement warranty.",
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
      "Maximum 2 devices are allowed to be logged in, else account will be banned.",
      "Cannot change account details and password.",
      "This membership only includes Prime Videos, not Amazon Prime shopping benefits.",
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
        {q: "Can I change the password?", a: "No, you cannot change the account details or password. You can, however, create your own profile and set a PIN."}
    ]
  },
  {
    id: 'sub-002',
    title: "Perplexity Pro - 1 Year Subscription",
    price: 450,
    originalPrice: 16500,
    category: "Subscription",
    imageUrl: "/p.png",
    rating: 5.0,
    reviewsCount: 12,
    providerInfo: {
      name: "GGsel Resellers",
      verified: false
    },
    shortDescription: "Get one year of Perplexity Pro AI with advanced models like GPT-4.1, Claude 4, and Grok-3 on your personal mail.",
    description: "The original cost of Perplexity Pro is $200 per year. However, we are offering it at an exclusive price of just $5.5 (approx ₹450) for a limited time! This includes AI models like DeepSeek R1, OpenAI's o4, GPT-4.1, Google Gemini Flash 2.5 Pro, Claude 4 Sonnet, Grok-3, and their own Sonar model. It also features image generation by Flux.1, DALL-E 3, and Playground v3.",
    validityOptions: [
      { duration: "1 Year", price: 450, originalPrice: 16500 }
    ],
    features: [
      "Access to Advanced AI Models: GPT-4.1, Claude 4, etc.",
      "Image Generation with DALL-E 3 and more",
      "Full 1-Year Warranty (if subscription stops)",
      "Activation on your personal email address",
      "Works globally, including Russia"
    ],
    purchaseInstructions: [
      "After purchase on our platform, you will receive a code.",
      "Send us this code in the GGsell chat to start the delivery process.",
      "After verification, the subscription will be activated on your mail."
    ],
    reviews: placeholderReviews['sub-002'],
     faqs: [
        {q: "Is this a shared account?", a: "No, the subscription is activated on your personal email address."},
        {q: "What happens if the subscription stops working?", a: "This purchase comes with a full 1-year warranty. If it stops working, we will provide a replacement."}
    ]
  },
  {
    id: 'sub-003',
    title: "Netflix Premium - 1 Year Subscription",
    price: 1695,
    originalPrice: 6000,
    category: "Subscription",
    imageUrl: "/n.png",
    rating: 4.83,
    reviewsCount: 41,
    providerInfo: {
      name: "Global Subscriptions",
      verified: true
    },
    shortDescription: "Enjoy Netflix Premium for 12 months with 4K Ultra HD quality, multi-device support, and global access.",
    description: "Get a stable, prepaid Netflix Premium account for 12 months. This is not a trial. Enjoy 4K Ultra HD + HDR streaming on a single screen at a time. The subscription works on all devices and can be streamed globally without restrictions. We offer a full 12-month replacement warranty.",
    validityOptions: [
      { duration: "12 Months", price: 1695, originalPrice: 6000 }
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
      "Add the subscription to your cart and proceed to checkout.",
      "After payment is completed, login credentials will be delivered via email within 30-180 minutes.",
      "Use the credentials to log in on the Netflix website or app and start streaming."
    ],
    reviews: placeholderReviews['sub-003'],
    faqs: [
        {q: "Is this a legitimate subscription?", a: "Yes, this is a 100% original and safe-to-use account. We provide a full replacement warranty for the entire duration."},
        {q: "Can I use this outside of India?", a: "Absolutely. Our Netflix Premium subscription works worldwide, and no VPN is required to stream."}
    ]
  },
  {
    id: 'sub-004',
    title: "Spotify Premium - 12 Months Subscription",
    price: 999,
    originalPrice: 2388,
    category: "Subscription",
    imageUrl: "/sp.png",
    rating: 4.87,
    reviewsCount: 15,
    providerInfo: {
      name: "Music Hub",
      verified: false
    },
    shortDescription: "Get a personal Spotify Premium account for 12 months. Enjoy ad-free music, offline mode, and unlimited skips.",
    description: "This product provides you with a unique Spotify Premium account for 12 months. You will receive login and password details after purchase. Enjoy unlimited high-quality streaming, offline mode, and no ad interruptions. It is recommended to not change the country settings of the account.",
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
      "This is a unique account, not a code. It cannot be activated on an existing Spotify account.",
      "Family Share feature is not available.",
      "It is recommended not to change country settings.",
      "It is advisable to start using the account immediately as duration is limited by activation time."
    ],
    purchaseInstructions: [
      "Complete the purchase.",
      "You will receive login and password details for a Spotify account via email.",
      "Log in and start enjoying your premium subscription."
    ],
    reviews: placeholderReviews['sub-004'],
    faqs: [
        {q: "Can I use this on my existing Spotify account?", a: "No, this is a new, unique account. You will receive login credentials for it. You cannot activate this on an existing account."},
        {q: "What if I change the country?", a: "It's recommended not to change the country settings, as it may lead to changes in the subscription type or loss of premium features."}
    ]
  }
];

export const getSubscriptionById = (id: string): Subscription | undefined => {
    return placeholderSubscriptions.find(sub => sub.id === id);
}
