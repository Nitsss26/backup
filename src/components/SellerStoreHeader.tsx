// "use client";

// import Image from 'next/image';
// import { motion } from 'framer-motion';

// interface SellerStoreHeaderProps {
//   name: string;
//   logo: string;
//   tagline: string;
//   bannerImage: string;
// }

// export function SellerStoreHeader({ name, logo, tagline, bannerImage }: SellerStoreHeaderProps) {
//   return (
//     <div className="relative h-[300px] bg-[--bg-dark] rounded-xl shadow-2xl overflow-hidden">
//       <Image
//         src={bannerImage}
//         alt={`${name} Banner`}
//         width={1200}
//         height={300}
//         className="w-full h-full object-cover opacity-50"
//       />
//       <div className="absolute inset-0 flex items-center justify-center flex-col p-6">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <Image src={logo} alt={`${name} Logo`} width={80} height={80} className="rounded-full mb-4" />
//           <h1 className="text-4xl font-bold text-[--text-light]">{name}</h1>
//           <p className="text-lg font-semibold text-white mt-2">{tagline}</p>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

interface SellerStoreHeaderProps {
  name: string;
  logo: string;
  tagline: string;
  bannerImage: string;
  mobileBannerImage?: string;
}

export function SellerStoreHeader({
  name,
  logo,
  tagline,
  bannerImage,
  mobileBannerImage,
}: SellerStoreHeaderProps) {
  return (
    <div className="relative w-full h-[300px] md:h-[400px] bg-[--bg-dark] shadow-2xl overflow-hidden rounded-none md:rounded-xl">
      {/* Desktop Banner */}
      <div className="hidden md:block h-full w-full">
        <Image
          src={bannerImage}
          alt={`${name} Banner`}
          width={1920}
          height={400}
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      {/* Mobile Banner */}
      <div className="block md:hidden h-full w-full">
        <Image
          src={mobileBannerImage || bannerImage}
          alt={`${name} Mobile Banner`}
          width={800}
          height={300}
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center flex-col text-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image src={logo} alt={`${name} Logo`} width={80} height={80} className="rounded-full mb-4" />
          <h1 className="text-3xl md:text-5xl font-bold text-[--text-light]">{name}</h1>
          <p className="text-md md:text-lg font-semibold text-white mt-2">{tagline}</p>
        </motion.div>
      </div>
    </div>
  );
}
