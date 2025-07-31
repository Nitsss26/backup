
// "use client";

// import React, { useRef, useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Heart, MessageSquare, MapPin,EyeOff } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import { useToast } from '@/hooks/use-toast';
// import { useWishlist } from '@/components/AppProviders';

// const Video3 = () => {
//   const carouselRef = useRef(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const router = useRouter();
//   const { toast } = useToast();
//   const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();

//   const handleNext = () => {
//     if (currentIndex < 5) {
//       setCurrentIndex(currentIndex + 1);
//       carouselRef.current.style.transform = `translateX(-${(currentIndex + 1) * 33.33}%)`;
//     }
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//       carouselRef.current.style.transform = `translateX(-${(currentIndex - 1) * 33.33}%)`;
//     }
//   };

//   const handleCardClick = (book) => {
//     window.open(`/book/${book._id}`, '_blank');
//   };

//   const handleWishlistToggle = (e, bookId) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const isBookInWishlist = wishlistItems.some(item => item.type === 'book' && item.item._id === bookId);
//     if (isBookInWishlist) {
//       removeFromWishlist(bookId, 'book');
//       toast({ title: "Removed from Wishlist", description: `"${bookId}" has been removed.` });
//     } else {
//       addToWishlist({ _id: bookId, title: bookId }, 'book');
//       toast({ title: "Added to Wishlist", description: `"${bookId}" has been added.` });
//     }
//   };

//   const handleContactSeller = (e, whatsappNumber, title) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (!whatsappNumber) {
//       toast({ title: "Error", description: "Seller's WhatsApp number is not available for this listing.", variant: "destructive" });
//       return;
//     }
//     const sellerName = "Seller";
//     const message = encodeURIComponent(`Hi ${sellerName}, I'm interested in your book "${title}" listed on EdTechCart. Is it still available?`);
//     const whatsappUrl = `https://api.whatsapp.com/send/?phone=91${whatsappNumber.replace(/\D/g, '').slice(-10)}&text=${message}&type=phone_number&app_absent=0`;
//     window.open(whatsappUrl, '_blank');
//   };

//   const formatDistance = (dist) => {
//     if (dist < 1) return `${<EyeOff/>}m away`;
//     return `${<EyeOff/>}km away`;
//   };

//   const formatPrice = (price, listingType) => {
//     if (listingType === 'sell') return `₹${price?.toLocaleString() || '0'}`;
//     return `₹${price?.toLocaleString() || '0'}/month`;
//   };

//   const books = [
//     {
//       _id: 'book1',
//       imageUrl: 'https://via.placeholder.com/300x300',
//       title: 'Introduction to Programming',
//       subcategory: 'Computer Science',
//       listingType: 'sell',
//       price: 300,
//       author: 'John Doe',
//       whatsappNumber: '9876543210',
//       distance: 1.5,
//     },
//     {
//       _id: 'book2',
//       imageUrl: 'https://via.placeholder.com/300x300',
//       title: 'Data Structures and Algorithms',
//       subcategory: 'Computer Science',
//       listingType: 'rent',
//       rentPricePerMonth: 150,
//       author: 'Jane Smith',
//       whatsappNumber: '8765432109',
//       distance: 0.8,
//     },
//     {
//       _id: 'book3',
//       imageUrl: 'https://via.placeholder.com/300x300',
//       title: 'Physics for Beginners',
//       subcategory: 'Science',
//       listingType: 'sell',
//       price: 250,
//       author: 'Robert Brown',
//       whatsappNumber: '7654321098',
//       distance: 2.3,
//     },
//     {
//       _id: 'book4',
//       imageUrl: 'https://via.placeholder.com/300x300',
//       title: 'Calculus Made Easy',
//       subcategory: 'Mathematics',
//       listingType: 'rent',
//       rentPricePerMonth: 120,
//       author: 'Alice Johnson',
//       whatsappNumber: '6543210987',
//       distance: 0.5,
//     },
//     {
//       _id: 'book5',
//       imageUrl: 'https://via.placeholder.com/300x300',
//       title: 'History of the World',
//       subcategory: 'History',
//       listingType: 'sell',
//       price: 400,
//       author: 'Michael Lee',
//       whatsappNumber: '5432109876',
//       distance: 3.0,
//     },
//     {
//       _id: 'book6',
//       imageUrl: 'https://via.placeholder.com/300x300',
//       title: 'Biology Basics',
//       subcategory: 'Science',
//       listingType: 'rent',
//       rentPricePerMonth: 180,
//       author: 'Sarah Davis',
//       whatsappNumber: '4321098765',
//       distance: 1.2,
//     },
//   ];

//   return (
//     <div className="bg-gray-900 text-white p-3 md:p-6 mt-3">
//       <h2 className="text-2xl font-bold mb-4">Buy/Rent/Donate Books</h2>
//       <p className="text-sm mb-4 text-gray-400">Discover Great Deals <a href="/books" className="text-blue-400 underline">View All</a></p>
      
//       {/* Desktop Layout */}
//       <div className="hidden md:flex">
//         {/* Left Banner */}
//         <div className="w-2/3 pr-4">
//           <div className="bg-gray-800 rounded-lg overflow-hidden relative">
//             <div className="w-full" style={{ paddingTop: '65%' }}>
//               <img
//                 src="/book.png"
//                 alt="Book Bundle"
//                 className="absolute top-0 left-0 w-full h-full object-cover"
//               />
//               <div className="absolute bottom-4 left-4 text-white">
//                 <button 
//                   className="mt-2 bg-[#5593f7] hover:bg-blue-600 text-white py-2 px-4 rounded" 
//                   onClick={() => router.push('/books')}
//                 >
//                   Shop now
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Carousel */}
//         <div className="w-1/2 relative">
//           <div className="flex items-center justify-center h-full">
//             <button
//               onClick={handlePrev}
//               className="absolute left-0 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full z-10"
//               disabled={currentIndex === 0}
//             >
//               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M15 18L9 12L15 6V18Z" fill="white"/>
//               </svg>
//             </button>
//             <div className="w-full overflow-hidden">
//               <div
//                 ref={carouselRef}
//                 className="flex transition-transform duration-300 ease-in-out"
//                 style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
//               >
//                 {books.map((book) => (
//                   <div
//                     key={book._id}
//                     className="bg-card border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex-shrink-0 mx-2 cursor-pointer"
//                     style={{ width: '33.33%' }}
//                   >
//                     <div className="relative w-full h-0 pb-[100%] overflow-hidden">
//                       <img
//                         src={book.imageUrl}
//                         alt={book.title}
//                         className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
//                       {book.distance !== null && book.distance !== undefined && (
//                         <Badge className="absolute top-2 left-2 bg-black/70 text-white border-0 backdrop-blur-sm text-xs font-medium">
//                           <MapPin className="w-3 h-3 mr-1" />
//                           {formatDistance(book.distance)}
//                         </Badge>
//                       )}
//                       <Button
//                         size="icon"
//                         variant="ghost"
//                         onClick={(e) => handleWishlistToggle(e, book._id)}
//                         className="absolute top-2 right-4 w-8 h-8 bg-black/70 hover:bg-black/80 rounded-full border-0" // Increased right spacing to 4
//                       >
//                         <Heart className={cn("w-4 h-4 text-white transition-colors", wishlistItems.some(item => item.type === 'book' && item.item._id === book._id) && "fill-red-500 text-red-500")} />
//                       </Button>
//                     </div>
//                     <CardContent className="p-3 flex flex-col justify-between h-auto min-h-[180px]">
//                       <div className="flex items-center justify-between mb-2">
//                         <span className="text-xs text-muted-foreground capitalize font-medium truncate w-1/2">
//                           {book.subcategory}
//                         </span>
//                         <Badge 
//                           className="text-white text-xs px-2 py-0.5 font-semibold flex-shrink-0"
//                           style={{ backgroundColor: book.listingType === 'sell' ? '#2563eb' : '#7c3aed' }}
//                         >
//                           {book.listingType === 'sell' ? 'SALE' : 'RENT'}
//                         </Badge>
//                       </div>
//                       <h3 className="font-bold text-xs sm:text-sm leading-tight line-clamp-3 text-foreground mb-2">
//                         {book.title}
//                       </h3>
//                       {book.author && (
//                         <p className="text-xs text-muted-foreground truncate mb-2">
//                           by {book.author}
//                         </p>
//                       )}
//                       <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
//                         <p className="font-bold text-primary text-xs md:text-sm">
//                           {formatPrice(book.listingType === 'sell' ? book.price : book.rentPricePerMonth, book.listingType)}
//                         </p>
//                         <Button
//                           size="sm"
//                           onClick={(e) => handleContactSeller(e, book.whatsappNumber, book.title)}
//                           className="ml-2 h-6 px-1 text-[9px] font-medium flex-shrink-0" // Further reduced height and font size
//                         >
//                           <MessageSquare className="w-3 h-3 mr-1.5" />
//                           <span className="hidden sm:inline">Contact</span>
//                           <span className="sm:hidden">View</span>
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <button
//               onClick={handleNext}
//               className="absolute right-0 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full z-10"
//               disabled={currentIndex === 5}
//             >
//               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M9 18L15 12L9 6V18Z" fill="white"/>
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Layout */}
//       <div className="md:hidden">
//         {/* Featured Banner */}
//         <div className="mb-6">
//           <div className="bg-gray-800 rounded-lg overflow-hidden relative">
//             <div className="w-full" style={{ paddingTop: '65%' }}>
//               <img
//                 src="/book.png"
//                 alt="Book Bundle"
//                 className="absolute top-0 left-0 w-full h-full object-cover"
//               />
//               <div className="absolute bottom-4 left-4 text-white">
//                 <div className='flex items-center'>
//                   <button 
//                     className="bg-[#5593f7] hover:bg-blue-600 text-white text-xs py-2 px-4 rounded text-sm ml-1" 
//                     onClick={() => router.push('/books')}
//                   >
//                     Visit now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Horizontal Scroll */}
//         <div className="w-full overflow-x-auto pb-4" style={{ 
//           scrollbarWidth: 'none', 
//           msOverflowStyle: 'none',
//           WebkitOverflowScrolling: 'touch' 
//         }}>
//           <div className="flex gap-3 pl-1 min-w-max">
//             {books.map((book) => (
//               <div
//                 key={book._id}
//                 className="bg-card border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex-shrink-0"
//                 style={{ width: '160px' }}
//                 onClick={() => handleCardClick(book)}
//               >
//                 <div className="relative w-full h-0 pb-[100%] overflow-hidden">
//                   <img
//                     src={book.imageUrl}
//                     alt={book.title}
//                     className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
//                   {book.distance !== null && book.distance !== undefined && (
//                     <Badge className="absolute top-2 left-2 bg-black/70 text-white border-0 backdrop-blur-sm text-xs font-medium">
//                       <MapPin className="w-3 h-3 mr-1" />
//                       {formatDistance(book.distance)}
//                     </Badge>
//                   )}
//                   <Button
//                     size="icon"
//                     variant="ghost"
//                     onClick={(e) => handleWishlistToggle(e, book._id)}
//                     className="absolute top-2 right-1 w-6 h-6 bg-black/70 hover:bg-black/80 rounded-full border-0" // Increased right spacing to 4
//                   >
//                     <Heart className={cn("w-3 h-3 text-white transition-colors", wishlistItems.some(item => item.type === 'book' && item.item._id === book._id) && "fill-red-500 text-red-500")} />
//                   </Button>
//                 </div>
//                 <CardContent className="p-3 flex flex-col justify-between h-auto min-h-[180px]">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-xs text-muted-foreground capitalize font-medium w-1/2">
//                       {book.subcategory}
//                     </span>
//                     <Badge 
//                       className="text-white text-xs px-2 py-0.5 font-semibold flex-shrink-0"
//                       style={{ backgroundColor: book.listingType === 'sell' ? '#2563eb' : '#7c3aed' }}
//                     >
//                       {book.listingType === 'sell' ? 'SALE' : 'RENT'}
//                     </Badge>
//                   </div>
//                   <h3 className="font-bold text-xs sm:text-sm leading-tight line-clamp-3 text-foreground mb-2">
//                     {book.title}
//                   </h3>
//                   {book.author && (
//                     <p className="text-xs text-muted-foreground truncate mb-2">
//                       by {book.author}
//                     </p>
//                   )}
//                   <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
//                     <p className="font-bold text-primary text-xs md:text-sm">
//                       {formatPrice(book.listingType === 'sell' ? book.price : book.rentPricePerMonth, book.listingType)}
//                     </p>
//                     <Button
//                       size="sm"
//                       onClick={(e) => handleContactSeller(e, book.whatsappNumber, book.title)}
//                       className="ml-2 h-6 px-1 text-[9px] font-medium flex-shrink-0" // Further reduced height and font size
//                     >
//                       <MessageSquare className="w-3 h-3 mr-1.5" />
//                       <span className="hidden sm:inline">Contact</span>
//                       <span className="sm:hidden -ml-2">View</span>
//                     </Button>
//                   </div>
//                 </CardContent>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Video3;

"use client";

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageSquare, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useWishlist } from '@/components/AppProviders';

const Video3 = () => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const { toast } = useToast();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();

  const handleNext = () => {
    if (currentIndex < 5) {
      setCurrentIndex(currentIndex + 1);
      carouselRef.current.style.transform = `translateX(-${(currentIndex + 1) * 33.33}%)`;
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      carouselRef.current.style.transform = `translateX(-${(currentIndex - 1) * 33.33}%)`;
    }
  };

  const handleCardClick = (book) => {
    router.push('/books'); // Redirect to /books page
  };

  const handleWishlistToggle = (e, bookId) => {
    e.preventDefault();
    e.stopPropagation();
    const isBookInWishlist = wishlistItems.some(item => item.type === 'book' && item.item._id === bookId);
    if (isBookInWishlist) {
      removeFromWishlist(bookId, 'book');
      toast({ title: "Removed from Wishlist", description: `"${bookId}" has been removed.` });
    } else {
      addToWishlist({ _id: bookId, title: bookId }, 'book');
      toast({ title: "Added to Wishlist", description: `"${bookId}" has been added.` });
    }
  };

  const handleContactSeller = (e, whatsappNumber, title) => {
    e.preventDefault();
    e.stopPropagation();
    router.push('/books'); // Redirect to /books page
  };

  const formatDistance = (dist) => {
    if (dist < 1) return <><EyeOff className="w-3 h-3 mr-1 inline" />{Math.round(dist * 1000)}m away</>;
    return <><EyeOff className="w-3 h-3 mr-1 inline" />{dist.toFixed(1)}km away</>;
  };

  const formatPrice = (price, listingType) => {
    if (listingType === 'sell') return `₹${price?.toLocaleString() || '0'}`;
    return `₹${price?.toLocaleString() || '0'}/month`;
  };

  const books = [
    // {
    //   _id: 'book1',
    //   imageUrl: 'https://via.placeholder.com/300x300',
    //   title: 'Introduction to Programming',
    //   subcategory: 'Computer Science',
    //   listingType: 'sell',
    //   price: 300,
    //   author: 'John Doe',
    //   whatsappNumber: '9876543210',
    //   distance: 1.5,
    // },
    // {
    //   _id: 'book2',
    //   imageUrl: 'https://via.placeholder.com/300x300',
    //   title: 'Data Structures and Algorithms',
    //   subcategory: 'Computer Science',
    //   listingType: 'rent',
    //   rentPricePerMonth: 150,
    //   author: 'Jane Smith',
    //   whatsappNumber: '8765432109',
    //   distance: 0.8,
    // },
    // {
    //   _id: 'book3',
    //   imageUrl: 'https://via.placeholder.com/300x300',
    //   title: 'Physics for Beginners',
    //   subcategory: 'Science',
    //   listingType: 'sell',
    //   price: 250,
    //   author: 'Robert Brown',
    //   whatsappNumber: '7654321098',
    //   distance: 2.3,
    // },
    // {
    //   _id: 'book4',
    //   imageUrl: 'https://via.placeholder.com/300x300',
    //   title: 'Calculus Made Easy',
    //   subcategory: 'Mathematics',
    //   listingType: 'rent',
    //   rentPricePerMonth: 120,
    //   author: 'Alice Johnson',
    //   whatsappNumber: '6543210987',
    //   distance: 0.5,
    // },
    // {
    //   _id: 'book5',
    //   imageUrl: 'https://via.placeholder.com/300x300',
    //   title: 'History of the World',
    //   subcategory: 'History',
    //   listingType: 'sell',
    //   price: 400,
    //   author: 'Michael Lee',
    //   whatsappNumber: '5432109876',
    //   distance: 3.0,
    // },
    // {
    //   _id: 'book6',
    //   imageUrl: 'https://via.placeholder.com/300x300',
    //   title: 'Biology Basics',
    //   subcategory: 'Science',
    //   listingType: 'rent',
    //   rentPricePerMonth: 180,
    //   author: 'Sarah Davis',
    //   whatsappNumber: '4321098765',
    //   distance: 1.2,
    // },

    {
      _id: 'book3',
      imageUrl: 'https://m.media-amazon.com/images/I/51UVidw1-8L.jpg',
      title: 'GATE Electronics & Communication by ACE',
      subcategory: 'GATE',
      listingType: 'sell',
      price: 180,
      author: 'ACE Engineering Academy',
      whatsappNumber: '6501234567',
      distance: 2.8,
    }, 
    {
      _id: 'book2',
      imageUrl: 'https://images.indialisted.com/nlarge/rd_sharma_mathematics_for_class_12_volume_1_2010_5220732.jpg',
      title: 'RD Sharma Mathematics Class 12th Vol I',
      subcategory: '12th Class',
      listingType: 'rent',
      rentPricePerMonth: 60,
      author: 'R.D. Sharma',
      whatsappNumber: '4012345679',
      distance: 0.7,
    }, 
    {
      _id: 'book6',
      imageUrl: 'https://m.media-amazon.com/images/I/71SGYuEXLlL._AC_UC200,200_CACC,200,200_QL85_.jpg?aicid=community-reviews',
      title: 'Arihant 41 Years JEE Advanced Physics',
      subcategory: 'JEE Advanced',
      listingType: 'rent',
      rentPricePerMonth: 70,
      author: 'Arihant Publications',
      whatsappNumber: '5432109876',
      distance: 0.8,
    },
    {
      _id: 'book1',
      imageUrl: 'https://myphysicsatwork.wordpress.com/wp-content/uploads/2020/03/images-464036328914565746994..jpg?w=750',
      title: 'Concepts of Physics by H.C. Verma (Set of 2 Volumes)',
      subcategory: 'JEE Main',
      listingType: 'sell',
      price: 200,
      author: 'H.C. Verma',
      whatsappNumber: '9876543210',
      distance: 1.2,
    },
    {
      _id: 'book4',
      imageUrl: 'https://www.shopmarg.com/assets/uploads/products/thumb/Objective_Biology_Set_Vol_1_3_with_free_Previous_Years_Competitive_Examination_Papers_5687.png',
      title: 'Objective Biology by Dinesh',
      subcategory: 'NEET',
      listingType: 'sell',
      price: 120,
      author: 'Dinesh Publications',
      whatsappNumber: '2109876543',
      distance: 0.3,
    },
    {
      _id: 'book5',
      imageUrl: 'https://assets.booksbybsf.com/products/JeeMainMathematicsPart1.webp',
      title: 'Cengage Mathematics for JEE Main & Advanced',
      subcategory: 'JEE Main',
      listingType: 'rent',
      rentPricePerMonth: 80,
      author: 'G. Tewani',
      whatsappNumber: '8765432109',
      distance: 0.5,
    },
    // {
    //   _id: 'book3',
    //   imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/81J8+fqNvBL.jpg',
    //   title: 'NCERT Exemplar Problems Physics Class 12',
    //   subcategory: 'JEE Main',
    //   listingType: 'sell',
    //   price: 250,
    //   author: 'NCERT',
    //   whatsappNumber: '7654321098',
    //   distance: 2.1,
    // },
    
    // // JEE Advanced Books
    // {
    //   _id: 'book4',
    //   imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/81QnN8dGJgL.jpg',
    //   title: 'Problems in General Physics by I.E. Irodov',
    //   subcategory: 'JEE Advanced',
    //   listingType: 'sell',
    //   price: 450,
    //   author: 'I.E. Irodov',
    //   whatsappNumber: '6543210987',
    //   distance: 1.8,
    // },
    
    // {
    //   _id: 'book6',
    //   imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71Qxc8qU6HL.jpg',
    //   title: 'TMH Mathematics for JEE Advanced',
    //   subcategory: 'JEE Advanced',
    //   listingType: 'sell',
    //   price: 650,
    //   author: 'Tata McGraw Hill',
    //   whatsappNumber: '4321098765',
    //   distance: 2.5,
    // },
    
    // // NEET Books
    // {
    //   _id: 'book7',
    //   imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/81kNzLp6lPL.jpg',
    //   title: 'NCERT Biology Class 11 & 12 Set',
    //   subcategory: 'NEET',
    //   listingType: 'sell',
    //   price: 400,
    //   author: 'NCERT',
    //   whatsappNumber: '3210987654',
    //   distance: 1.0,
    // },
    
    // {
    //   _id: 'book9',
    //   imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71YjY5oGt7L.jpg',
    //   title: 'Trueman Biology for NEET (Set of 2 Volumes)',
    //   subcategory: 'NEET',
    //   listingType: 'sell',
    //   price: 850,
    //   author: 'Trueman',
    //   whatsappNumber: '1098765432',
    //   distance: 1.7,
    // },
    // {
    //   _id: 'book10',
    //   imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/81tMN4XmNlL.jpg',
    //   title: 'Aakash NEET Chemistry Study Material',
    //   subcategory: 'NEET',
    //   listingType: 'rent',
    //   rentPricePerMonth: 250,
    //   author: 'Aakash Institute',
    //   whatsappNumber: '9876501234',
    //   distance: 2.2,
    // },
    
    // // GATE Books
    // {
    //   _id: 'book11',
    //   imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71JoqzDt7sL.jpg',
    //   title: 'GATE Computer Science & IT by Made Easy',
    //   subcategory: 'GATE',
    //   listingType: 'sell',
    //   price: 950,
    //   author: 'Made Easy Publications',
    //   whatsappNumber: '8765012345',
    //   distance: 1.5,
    // },
    // {
    //   _id: 'book12',
    //   imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/81YwKJ5YQLL.jpg',
    //   title: 'GATE Mechanical Engineering by GKP',
    //   subcategory: 'GATE',
    //   listingType: 'rent',
    //   rentPricePerMonth: 300,
    //   author: 'GK Publications',
    //   whatsappNumber: '7650123456',
    //   distance: 0.9,
    // },
    
    // {
    //   _id: 'book14',
    //   imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/81fV6KdTpqL.jpg',
    //   title: 'GATE Civil Engineering Previous Years Papers',
    //   subcategory: 'GATE',
    //   listingType: 'rent',
    //   rentPricePerMonth: 150,
    //   author: 'Arihant Publications',
    //   whatsappNumber: '5012345678',
    //   distance: 1.3,
    // },
    
    // Additional Popular Books
    
    // {
    //   _id: 'book16',
    //   imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/81mJ5KcN4cL.jpg',
    //   title: 'Allen NEET Biology Study Material',
    //   subcategory: 'NEET',
    //   listingType: 'rent',
    //   rentPricePerMonth: 220,
    //   author: 'Allen Career Institute',
    //   whatsappNumber: '3012345670',
    //   distance: 1.9,
    // },
    // {
    //   _id: 'book17',
    //   imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71qRvB2qJfL.jpg',
    //   title: 'S.L. Loney Coordinate Geometry',
    //   subcategory: 'JEE Advanced',
    //   listingType: 'sell',
    //   price: 320,
    //   author: 'S.L. Loney',
    //   whatsappNumber: '2012345671',
    //   distance: 2.4,
    // },
    // {
    //   _id: 'book18',
    //   imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/81VPyKcOTVL.jpg',
    //   title: 'Morrison & Boyd Organic Chemistry',
    //   subcategory: 'NEET',
    //   listingType: 'sell',
    //   price: 890,
    //   author: 'Morrison & Boyd',
    //   whatsappNumber: '1012345672',
    //   distance: 3.1,
    // },
    // {
    //   _id: 'book19',
    //   imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71xM8gKDl7L.jpg',
    //   title: 'GATE Electrical Engineering Handbook',
    //   subcategory: 'GATE',
    //   listingType: 'rent',
    //   rentPricePerMonth: 280,
    //   author: 'Made Easy Publications',
    //   whatsappNumber: '9012345673',
    //   distance: 1.1,
    // },
    // {
    //   _id: 'book20',
    //   imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/81jgHCnE1UL.jpg',
    //   title: 'DC Pandey Physics for JEE Main & Advanced',
    //   subcategory: 'JEE Main',
    //   listingType: 'sell',
    //   price: 720,
    //   author: 'D.C. Pandey',
    //   whatsappNumber: '8012345674',
    //   distance: 0.6,
    // }
  ];

  return (
    <div className="bg-gray-900 text-white p-3 md:p-6 mt-3">
      <h2 className="text-2xl font-bold mb-4">Buy/Rent/Donate Books</h2>
      <p className="text-sm mb-4 text-gray-400">Discover Great Deals <a href="/books" className="text-blue-400 underline">View All</a></p>
      
      {/* Desktop Layout */}
      <div className="hidden md:flex">
        {/* Left Banner */}
        <div className="w-2/3 pr-4">
          <div className="bg-gray-800 rounded-lg overflow-hidden relative">
            <div className="w-full" style={{ paddingTop: '65%' }}>
              <img
                src="/book.png"
                alt="Book Bundle"
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 text-white">
                <button 
                  className="mt-2 bg-[#5593f7] hover:bg-blue-600 text-white py-2 px-4 rounded" 
                  onClick={() => router.push('/books')}
                >
                  Shop now
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Carousel */}
        <div className="w-1/2 relative">
          <div className="flex items-center justify-center h-full">
            <button
              onClick={handlePrev}
              className="absolute left-0 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full z-10"
              disabled={currentIndex === 0}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6V18Z" fill="white"/>
              </svg>
            </button>
            <div className="w-full overflow-hidden">
              <div
                ref={carouselRef}
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
              >
                {books.map((book) => (
                  <div
                    key={book._id}
                    className="bg-card border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex-shrink-0 mx-2 cursor-pointer"
                    style={{ width: '33.33%' }}
                    onClick={() => handleCardClick(book)} // Redirect on card click
                  >
                    <div className="relative w-full h-0 pb-[100%] overflow-hidden">
                      <img
                        src={book.imageUrl}
                        alt={book.title}
                        className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      {book.distance !== null && book.distance !== undefined && (
                        <Badge className="absolute top-2 left-2 bg-black/70 text-white border-0 backdrop-blur-sm text-xs font-medium">
                          {formatDistance(book.distance)}
                        </Badge>
                      )}
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={(e) => handleWishlistToggle(e, book._id)}
                        className="absolute top-2 right-4 w-8 h-8 bg-black/70 hover:bg-black/80 rounded-full border-0"
                      >
                        <Heart className={cn("w-4 h-4 text-white transition-colors", wishlistItems.some(item => item.type === 'book' && item.item._id === book._id) && "fill-red-500 text-red-500")} />
                      </Button>
                    </div>
                    <CardContent className="p-3 flex flex-col justify-between h-auto min-h-[180px]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground capitalize font-medium truncate w-1/2">
                          {book.subcategory}
                        </span>
                        <Badge 
                          className="text-white text-xs px-2 py-0.5 font-semibold flex-shrink-0"
                          style={{ backgroundColor: book.listingType === 'sell' ? '#2563eb' : '#7c3aed' }}
                        >
                          {book.listingType === 'sell' ? 'SALE' : 'RENT'}
                        </Badge>
                      </div>
                      <h3 className="font-bold text-xs sm:text-sm leading-tight line-clamp-3 text-foreground mb-2">
                        {book.title}
                      </h3>
                      {book.author && (
                        <p className="text-xs text-muted-foreground truncate mb-2">
                          by {book.author}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
                        <p className="font-bold text-primary text-xs md:text-sm">
                          {formatPrice(book.listingType === 'sell' ? book.price : book.rentPricePerMonth, book.listingType)}
                        </p>
                        <Button
  onClick={(e) => handleContactSeller(e, book.whatsappNumber, book.title)}
  className="mt-3 w-15 h-9 text-sm font-semibold flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all duration-200"
>
  <MessageSquare className="w-4 h-4 mr-2 text-white" />
  <span>View</span>
</Button>

                        {/* <Button
                          size="md"
                          onClick={(e) => handleContactSeller(e, book.whatsappNumber, book.title)}
                          className="ml-2 h-6 px-1 text-[9px] font-medium flex-shrink-0"
                        >
                          <MessageSquare className="w-3 h-3 mr-1.5 text-white" />
                          <span className="hidden sm:inline text-white">View</span>
                          <span className="sm:hidden -ml-2 text-white">View</span>
                        </Button> */}
                      </div>
                    </CardContent>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={handleNext}
              className="absolute right-0 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full z-10"
              disabled={currentIndex === 5}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6V18Z" fill="white"/>
              </svg>
            </button>
          </div>
        </div>
        
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Featured Banner */}
        <div className="mb-6">
          <div className="bg-gray-800 rounded-lg overflow-hidden relative">
            <div className="w-full" style={{ paddingTop: '65%' }}>
              <img
                src="/book.png"
                alt="Book Bundle"
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 text-white">
                <div className='flex items-center'>
                  <button 
                    className="bg-[#5593f7] hover:bg-blue-600 text-white text-xs py-2 px-4 rounded text-sm ml-1" 
                    onClick={() => router.push('/books')}
                  >
                    Visit now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="w-full overflow-x-auto pb-4" style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch' 
        }}>
          <div className="flex gap-3 pl-1 min-w-max">
            {books.map((book) => (
              <div
                key={book._id}
                className="bg-card border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex-shrink-0"
                style={{ width: '160px' }}
                onClick={() => handleCardClick(book)} // Redirect on card click
              >
                <div className="relative w-full h-0 pb-[100%] overflow-hidden">
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  {book.distance !== null && book.distance !== undefined && (
                    <Badge className="absolute top-2 left-2 bg-black/70 text-white border-0 backdrop-blur-sm text-xs font-medium">
                      {formatDistance(book.distance)}
                    </Badge>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={(e) => handleWishlistToggle(e, book._id)}
                    className="absolute top-2 right-1 w-6 h-6 bg-black/70 hover:bg-black/80 rounded-full border-0"
                  >
                    <Heart className={cn("w-3 h-3 text-white transition-colors", wishlistItems.some(item => item.type === 'book' && item.item._id === book._id) && "fill-red-500 text-red-500")} />
                  </Button>
                </div>
                <CardContent className="p-3 flex flex-col justify-between h-auto min-h-[180px]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground capitalize font-medium w-1/2">
                      {book.subcategory}
                    </span>
                    <Badge 
                      className="text-white text-xs px-2 py-0.5 font-semibold flex-shrink-0"
                      style={{ backgroundColor: book.listingType === 'sell' ? '#2563eb' : '#7c3aed' }}
                    >
                      {book.listingType === 'sell' ? 'SALE' : 'RENT'}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm leading-tight line-clamp-3 text-foreground mb-2">
                    {book.title}
                  </h3>
                  {book.author && (
                    <p className="text-xs text-muted-foreground truncate mb-2">
                      by {book.author}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
                    <p className="font-bold text-primary text-xs md:text-sm">
                      {formatPrice(book.listingType === 'sell' ? book.price : book.rentPricePerMonth, book.listingType)}
                    </p>
                    <Button
                      size="sm"
                      onClick={(e) => handleContactSeller(e, book.whatsappNumber, book.title)}
                      className="ml-2 h-6 px-1 text-[9px] font-medium flex-shrink-0"
                    >
                      <MessageSquare className="w-3 h-3 mr-1.5 text-white" />
                      <span className="hidden sm:inline text-white">View</span>
                      <span className="sm:hidden -ml-2 text-white">View</span>
                    </Button>
                  </div>
                </CardContent>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video3;