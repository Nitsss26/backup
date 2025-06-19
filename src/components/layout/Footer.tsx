// import Link from 'next/link';
// import { GraduationCap, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
// import { APP_NAME, FOOTER_LINKS } from '@/lib/constants';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';

// export function Footer() {
//   return (
//     <footer className="bg-muted/50 border-t">
//       <div className="container py-12 px-4 md:px-6">
//         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
//           <div className='ml-5'>
//             {/* <Link href="/" className="flex items-center gap-2 mb-4">
//               <GraduationCap className="h-8 w-8 text-primary" />
//               <span className="font-bold text-2xl text-primary">{APP_NAME}</span>
//             </Link> */}
//             <Link href="/" className="flex items-center gap-2">
//   <img
//     src="/logoo.png"
//     alt="Logo"
//     width={160}
//     height={160}
//     className="w-100 h-100 object-contain"
//   />
// </Link>
//             <p className="text-muted-foreground text-sm">
//               Empowering learners and educators worldwide. Discover your next skill with {APP_NAME}.
//             </p>
//             <div className="flex gap-3 mt-4">
//               <Link href="#" aria-label="Facebook"><Facebook className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
//               <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
//               <Link href="#" aria-label="LinkedIn"><Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
//               <Link href="#" aria-label="Instagram"><Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
//             </div>
//           </div>
          
//           <div className='ml-20'>
//             <h3 className="text-lg font-semibold mb-3">Company</h3>
//             <ul className="space-y-2 text-sm">
//               {FOOTER_LINKS.company.map(link => (
//                 <li key={link.name}>
//                   <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className='ml-5'>
//             <h3 className="text-lg font-semibold mb-3">For Sellers</h3>
//             <ul className="space-y-2 text-sm">
//                  <li>
//                   <Link href="/sell-courses" className="text-muted-foreground hover:text-primary transition-colors">
//                     Sell on {APP_NAME}
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/help/seller-verification" className="text-muted-foreground hover:text-primary transition-colors">
//                     Seller Verification
//                   </Link>
//                 </li>
//                  <li>
//                   <Link href="/help/seller-faq" className="text-muted-foreground hover:text-primary transition-colors"> {/* Placeholder FAQ */}
//                     Seller FAQ
//                   </Link>
//                 </li>
//             </ul>
//           </div>
          
//           <div className='ml-5'>
//             <h3 className="text-lg font-semibold mb-3">Support</h3>
//             <ul className="space-y-2 text-sm">
//               {FOOTER_LINKS.support.map(link => (
//                 <li key={link.name}>
//                   <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//         </div>
//         <div className="mt-10 border-t pt-8 text-center text-sm text-muted-foreground">
//           &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
//         </div>
//       </div>
//     </footer>
//   );
// }

// // // components/layout/Footer.tsx
// // import Link from 'next/link';
// // import { GraduationCap, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
// // import { APP_NAME } from '@/lib/constants';
// // import Image from 'next/image';

// // export function Footer() {
// //   const footerLinks = {
// //     company: [
// //       { name: 'About', href: '/about' },
// //       { name: 'Contact Us', href: '/contact' },
// //       { name: 'Product List', href: '/courses' },
// //     ],
// //     buy: [
// //       { name: 'Collections', href: '/categories' },
// //       { name: 'Activation Guides', href: '/help/guides' },
// //     ],
// //     help: [
// //       { name: 'Create a Ticket', href: '/help/ticket' },
// //     ],
// //     community: [
// //       { name: 'Blog', href: '/blog' },
// //       { name: 'Become an Affiliate', href: '/affiliate' },
// //     ],
// //     business: [
// //       { name: 'Sell on EdTechCart', href: '/sell-courses' },
// //     ],
// //   };

// //   return (
// //     <footer className="bg-gray-800 py-8 px-6 border-t border-gray-700">
// //       <div className="container grid grid-cols-2 md:grid-cols-5 gap-8">
// //         <div>
// //           <Link href="/" className="flex items-center gap-2 mb-4">
// //             <GraduationCap className="h-8 w-8 text-blue-400" />
// //             <span className="font-bold text-2xl text-white">{APP_NAME}</span>
// //           </Link>
// //           <p className="text-gray-400 text-sm">Empowering learners and educators worldwide with top online courses.</p>
// //         </div>
// //         {Object.entries(footerLinks).map(([key, links]) => (
// //           <div key={key}>
// //             <h3 className="text-lg font-bold mb-4 capitalize text-white">{key}</h3>
// //             <ul className="space-y-2">
// //               {links.map((link) => (
// //                 <li key={link.name}>
// //                   <Link href={link.href} className="text-gray-400 hover:text-blue-400 transition-colors">
// //                     {link.name}
// //                   </Link>
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //         ))}
// //       </div>
// //       <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
// //         <div className="flex space-x-4 mb-4 md:mb-0">
// //           <Image src="/images/visa.png" alt="Visa" width={40} height={40} /> {/* Download from https://www.flaticon.com/free-icon/visa_3490546 */}
// //           <Image src="/images/mastercard.png" alt="MasterCard" width={40} height={40} /> {/* Download from https://www.flaticon.com/free-icon/mastercard_3490548 */}
// //           <Image src="/images/paypal.png" alt="PayPal" width={40} height={40} /> {/* Download from https://www.flaticon.com/free-icon/paypal_3490552 */}
// //         </div>
// //         <div className="flex space-x-4">
// //           <Link href="#" aria-label="Facebook"><Facebook className="w-6 h-6 text-gray-400 hover:text-blue-400" /></Link>
// //           <Link href="#" aria-label="Twitter"><Twitter className="w-6 h-6 text-gray-400 hover:text-blue-400" /></Link>
// //           <Link href="#" aria-label="Instagram"><Instagram className="w-6 h-6 text-gray-400 hover:text-blue-400" /></Link>
// //           <Link href="#" aria-label="YouTube"><Youtube className="w-6 h-6 text-gray-400 hover:text-blue-400" /></Link>
// //         </div>
// //       </div>
// //       <p className="text-center text-gray-400 mt-4 text-sm">
// //         EdTechCart is owned and operated by EdTechCart Inc., 123 Education Lane, Bangalore, India.
// //       </p>
// //     </footer>
// //   );
// // }

import Link from 'next/link';
import { GraduationCap, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { APP_NAME, FOOTER_LINKS } from '@/lib/constants';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-8 px-4 sm:px-6">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="ml-2 sm:ml-5">
            <Link href="/" className="flex items-center gap-2 mb-2 sm:mb-4">
              <img
                src="/logoo.png"
                alt="Logo"
                width={120}
                height={120}
                className="w-20 h-10 sm:w-24 sm:h-12 object-contain"
              />
            </Link>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Empowering learners and educators worldwide. Discover your next skill with {APP_NAME}.
            </p>
            <div className="flex gap-2 sm:gap-3 mt-2 sm:mt-4">
              <Link href="#" aria-label="Facebook"><Facebook className="h-4 sm:h-5 w-4 sm:w-5 text-muted-foreground hover:text-primary" /></Link>
              <Link href="#" aria-label="Twitter"><Twitter className="h-4 sm:h-5 w-4 sm:w-5 text-muted-foreground hover:text-primary" /></Link>
              <Link href="#" aria-label="LinkedIn"><Linkedin className="h-4 sm:h-5 w-4 sm:w-5 text-muted-foreground hover:text-primary" /></Link>
              <Link href="#" aria-label="Instagram"><Instagram className="h-4 sm:h-5 w-4 sm:w-5 text-muted-foreground hover:text-primary" /></Link>
            </div>
          </div>
          
          <div className="ml-4 sm:ml-20">
            <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Company</h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              {FOOTER_LINKS.company.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="ml-2 sm:ml-5">
            <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">For Sellers</h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/sell-courses" className="text-muted-foreground hover:text-primary transition-colors">
                  Sell on {APP_NAME}
                </Link>
              </li>
              <li>
                <Link href="/help/seller-verification" className="text-muted-foreground hover:text-primary transition-colors">
                  Seller Verification
                </Link>
              </li>
              <li>
                <Link href="/help/seller-faq" className="text-muted-foreground hover:text-primary transition-colors">
                  Seller FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="ml-2 sm:ml-5">
            <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Support</h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              {FOOTER_LINKS.support.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6 sm:mt-10 border-t pt-4 sm:pt-8 text-center text-xs sm:text-sm text-muted-foreground">
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}