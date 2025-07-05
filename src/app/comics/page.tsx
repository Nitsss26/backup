// import React from 'react';

// const ComicsPage: React.FC = () => {
//   const tiers = [
//     {
//       name: 'Tier 1 - Pay $1.00',
//       products: [
//         { id: 1, name: 'Hellboy', value: '$10.99', image: 'https://placehold.co/206x250?text=Hellboy+1' },
//         { id: 2, name: 'Giant Robot', value: '$3.99', image: 'https://placehold.co/206x250?text=Giant+Robot' },
//         { id: 3, name: 'Hellboy Krampus', value: '$3.99', image: 'https://placehold.co/206x250?text=Hellboy+Krampus' },
//         { id: 4, name: 'Ghost/Hellboy', value: '$2.99', image: 'https://placehold.co/206x250?text=Ghost/Hellboy' },
//         { id: 5, name: 'Hellboy Winter Special', value: '$3.99', image: 'https://placehold.co/206x250?text=Hellboy+Winter+Special' },
//       ],
//     },
//     {
//       name: 'Tier 2 - Pay $6.99 - Including products above',
//       products: [
//         { id: 6, name: 'Hellboy Strange Places', value: '$10.99', image: 'https://placehold.co/206x250?text=Hellboy+Strange+Places' },
//         { id: 7, name: 'Hellboy Mike Mignola', value: '$10.99', image: 'https://placehold.co/206x250?text=Hellboy+Mike+Mignola' },
//         { id: 8, name: 'Hellboy Mike Mignola 2', value: '$10.99', image: 'https://placehold.co/206x250?text=Hellboy+Mike+Mignola+2' },
//         { id: 9, name: 'Hellboy Mike Mignola 3', value: '$10.99', image: 'https://placehold.co/206x250?text=Hellboy+Mike+Mignola+3' },
//         { id: 10, name: 'Hellboy Winter Special 2', value: '$8.99', image: 'https://placehold.co/206x250?text=Hellboy+Winter+Special+2' },
//         { id: 11, name: 'Hellboy Weird Tales', value: '$8.99', image: 'https://placehold.co/206x250?text=Hellboy+Weird+Tales' },
//         { id: 12, name: 'Hellboy The Hidden Land', value: '$6.99', image: 'https://placehold.co/206x250?text=Hellboy+Hidden+Land' },
//         { id: 13, name: 'Hellboy Giant Robot 2', value: '$3.99', image: 'https://placehold.co/206x250?text=Hellboy+Giant+Robot+2' },
//         { id: 14, name: 'Hellboy 50 Years Covers', value: '$3.99', image: 'https://placehold.co/206x250?text=Hellboy+50+Years+Covers' },
//         { id: 15, name: 'Hellboy Winter Special 3', value: '$3.99', image: 'https://placehold.co/206x250?text=Hellboy+Winter+Special+3' },
//       ],
//     },
//     {
//       name: 'Tier 3 - Pay $11.99 - Including products above',
//       products: [
//         { id: 16, name: 'Hellboy Seed of Destruction', value: '$10.99', image: 'https://placehold.co/263x320?text=Hellboy+Seed+Destruction' },
//         { id: 17, name: 'Hellboy Strange Places 2', value: '$10.99', image: 'https://placehold.co/263x320?text=Hellboy+Strange+Places+2' },
//         { id: 18, name: 'Hellboy The Third Wish', value: '$10.99', image: 'https://placehold.co/263x320?text=Hellboy+Third+Wish' },
//         { id: 19, name: 'Hellboy The Crooked Man', value: '$10.99', image: 'https://placehold.co/263x320?text=Hellboy+Crooked+Man' },
//         { id: 20, name: 'Hellboy Into the Silent Sea', value: '$10.99', image: 'https://placehold.co/263x320?text=Hellboy+Silent+Sea' },
//         { id: 21, name: 'Hellboy Dark Horse', value: '$10.99', image: 'https://placehold.co/263x320?text=Hellboy+Dark+Horse' },
//         { id: 22, name: 'Hellboy Conqueror Worm', value: '$10.99', image: 'https://placehold.co/263x320?text=Hellboy+Conqueror+Worm' },
//         { id: 23, name: 'Hellboy The Storm and the Fury', value: '$10.99', image: 'https://placehold.co/263x320?text=Hellboy+Storm+Fury' },
//         { id: 24, name: 'Hellboy in Hell The Descent', value: '$10.99', image: 'https://placehold.co/263x320?text=Hellboy+Descent' },
//         { id: 25, name: 'Hellboy Weird Tales 2', value: '$4.99', image: 'https://placehold.co/263x320?text=Hellboy+Weird+Tales+2' },
//         { id: 26, name: 'Hellboy The Hidden Land 2', value: '$4.99', image: 'https://placehold.co/263x320?text=Hellboy+Hidden+Land+2' },
//         { id: 27, name: 'Hellboy Giant Robot 3', value: '$3.99', image: 'https://placehold.co/263x320?text=Hellboy+Giant+Robot+3' },
//         { id: 28, name: 'Hellboy Winter Special 4', value: '$3.99', image: 'https://placehold.co/263x320?text=Hellboy+Winter+Special+4' },
//         { id: 29, name: 'Hellboy 50 Years Covers 2', value: '$3.99', image: 'https://placehold.co/263x320?text=Hellboy+50+Years+Covers+2' },
//         { id: 30, name: 'Hellboy Mike Mignola 4', value: '$3.99', image: 'https://placehold.co/263x320?text=Hellboy+Mike+Mignola+4' },
//         { id: 31, name: 'Hellboy Strange Places 3', value: '$3.99', image: 'https://placehold.co/263x320?text=Hellboy+Strange+Places+3' },
//         { id: 32, name: 'Hellboy The Third Wish 2', value: '$3.99', image: 'https://placehold.co/263x320?text=Hellboy+Third+Wish+2' },
//         { id: 33, name: 'Hellboy The Crooked Man 2', value: '$3.99', image: 'https://placehold.co/263x320?text=Hellboy+Crooked+Man+2' },
//       ],
//     },
//   ];

//   return (
//     <div className="w-[1440px] h-[7013.86px] relative bg-[#1c1c1c]">
//       {/* Header Section */}
//       <div className="w-[1440px] h-[50px] absolute top-0 bg-[#e0e0e0]">
//         <div className="w-[1140px] h-[50px] absolute left-[150px] top-0">
//           <div className="w-[263.17px] h-[22.39px] absolute left-[8px] top-[13.80px]">
//             <div className="w-[12.25px] h-3.5 absolute left-0 top-[3.75px] bg-[#212121]" />
//             <div className="w-[243.31px] h-[17px] absolute left-[20.25px] top-[2px] text-center justify-center text-[#212121] text-sm font-bold font-['Lato'] leading-snug">Download this Product & Keep Forever</div>
//           </div>
//           <div className="w-[210px] h-[17px] absolute left-[312.55px] top-[19.30px]">
//             <div className="w-[200px] h-[23px] absolute left-0 top-[-9px] overflow-hidden">
//               <div className="w-[200px] h-[23px] absolute left-0 top-0 overflow-hidden">
//                 <div className="w-[197.35px] h-[23px] absolute left-[1.33px] top-0 overflow-hidden">
//                   <div className="w-[93.20px] h-[17.47px] absolute left-[104.15px] top-[5.53px] bg-[#00b67a]" />
//                   <div className="w-[12.23px] h-[11.58px] absolute left-[106.77px] top-[8.47px] bg-white" />
//                   <div className="w-[12.23px] h-[11.58px] absolute left-[125.70px] top-[8.47px] bg-white" />
//                   <div className="w-[50.09px] h-[11.58px] absolute left-[144.64px] top-[8.47px] bg-white" />
//                   <div className="w-[74.27px] h-[17.47px] absolute left-[104.15px] top-[5.53px] bg-[#00b67a]" />
//                   <div className="w-[8.74px] h-[17.47px] absolute left-[188.61px] top-[5.53px] bg-[#dcdce6]" />
//                   <div className="w-[8.74px] h-[17.47px] absolute left-[179.87px] top-[5.53px] bg-[#00b67a]" />
//                   <div className="w-[87.95px] h-[11.58px] absolute left-[106.77px] top-[8.47px] bg-white" />
//                   <div className="w-[68.95px] h-[14.83px] absolute left-[24.56px] top-[8.14px] bg-[#191919]" />
//                   <div className="w-[22.39px] h-[21.30px] absolute left-0 top-0 bg-[#00b67a]" />
//                   <div className="w-[4.87px] h-[3.10px] absolute left-[11.20px] top-[13.17px] bg-[#005128]" />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="w-[263.50px] h-4 absolute left-[522.55px] top-[16.98px]">
//             <div className="w-[264.42px] h-4 absolute left-0 top-0 justify-center text-[#212121] text-[13px] font-bold font-['Lato'] leading-[18px]">Rated 'EXCELLENT' Based on 79,814 Reviews</div>
//           </div>
//           <div className="w-[330.95px] h-[22.39px] absolute left-[801.05px] top-[13.80px]">
//             <div className="w-3.5 h-3.5 absolute left-0 top-[3.75px]">
//               <div className="w-3.5 h-3.5 absolute left-0 top-0 bg-[#212121]" />
//             </div>
//             <div className="w-[291.60px] h-[17px] absolute left-[22px] top-[2px] text-center justify-center text-[#212121] text-sm font-bold font-['Lato'] leading-snug">14 Day Money Back Guarantee on this Product</div>
//             <div className="w-3.5 h-2.5 absolute left-[316.95px] top-[6.68px]">
//               <div className="w-[8.75px] h-[5px] absolute left-[2.62px] top-[3.12px] bg-[#333333]" />
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="w-[1440px] h-[50px] absolute top-[50px] bg-[#e0e0e0]">
//         <div className="w-[1140px] h-[50px] absolute left-[150px] top-0">
//           <div className="w-[175.30px] h-[22.39px] absolute left-[8px] top-[13.80px]">
//             <div className="w-[12.25px] h-3.5 absolute left-0 top-[3.75px] bg-[#212121]" />
//             <div className="w-[138.21px] h-[17px] absolute left-[20.25px] top-[2px] text-center justify-center text-[#212121] text-sm font-bold font-['Lato'] leading-snug">100% Safe and Secure</div>
//             <div className="w-3.5 h-2.5 absolute left-[161.30px] top-[6.68px]">
//               <div className="w-[8.75px] h-[5px] absolute left-[2.62px] top-[3.12px] bg-[#333333]" />
//             </div>
//           </div>
//           <div className="w-[210px] h-[17px] absolute left-[328.25px] top-[19.30px]">
//             <div className="w-[200px] h-[23px] absolute left-0 top-[-9px] overflow-hidden">
//               <div className="w-[200px] h-[23px] absolute left-0 top-0 overflow-hidden">
//                 <div className="w-[197.35px] h-[23px] absolute left-[1.33px] top-0 overflow-hidden">
//                   <div className="w-[93.20px] h-[17.47px] absolute left-[104.15px] top-[5.53px] bg-[#00b67a]" />
//                   <div className="w-[12.23px] h-[11.58px] absolute left-[106.77px] top-[8.47px] bg-white" />
//                   <div className="w-[12.23px] h-[11.58px] absolute left-[125.70px] top-[8.47px] bg-white" />
//                   <div className="w-[50.09px] h-[11.58px] absolute left-[144.64px] top-[8.47px] bg-white" />
//                   <div className="w-[74.27px] h-[17.47px] absolute left-[104.15px] top-[5.53px] bg-[#00b67a]" />
//                   <div className="w-[8.74px] h-[17.47px] absolute left-[188.61px] top-[5.53px] bg-[#dcdce6]" />
//                   <div className="w-[8.74px] h-[17.47px] absolute left-[179.87px] top-[5.53px] bg-[#00b67a]" />
//                   <div className="w-[87.95px] h-[11.58px] absolute left-[106.77px] top-[8.47px] bg-white" />
//                   <div className="w-[68.95px] h-[14.83px] absolute left-[24.56px] top-[8.14px] bg-[#191919]" />
//                   <div className="w-[22.39px] h-[21.30px] absolute left-0 top-0 bg-[#00b67a]" />
//                   <div className="w-[4.87px] h-[3.10px] absolute left-[11.20px] top-[13.17px] bg-[#005128]" />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="w-[263.50px] h-4 absolute left-[538.25px] top-[16.98px]">
//             <div className="w-[264.42px] h-4 absolute left-0 top-0 justify-center text-[#212121] text-[13px] font-bold font-['Lato'] leading-[18px]">Rated 'EXCELLENT' Based on 79,814 Reviews</div>
//           </div>
//           <div className="w-[185.30px] h-[22.39px] absolute left-[946.70px] top-[13.80px]">
//             <div className="w-3.5 h-3.5 absolute left-0 top-[3.75px]">
//               <div className="w-3.5 h-3.5 absolute left-0 top-0 bg-[#212121]" />
//             </div>
//             <div className="w-[145.61px] h-[17px] absolute left-[22px] top-[2px] text-center justify-center text-[#212121] text-sm font-bold font-['Lato'] leading-snug">Instant Digital Delivery</div>
//             <div className="w-3.5 h-2.5 absolute left-[171.30px] top-[6.68px]">
//               <div className="w-[8.75px] h-[5px] absolute left-[2.62px] top-[3.12px] bg-[#333333]" />
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="w-[1440px] h-10 absolute top-[182px] bg-black">
//         <div className="w-[1124px] h-10 absolute left-[158px] top-0">
//           <img className="w-[143.50px] h-10 absolute left-[432.25px] top-0" src="https://placehold.co/143x40?text=Red+Hot+Sale" />
//           <div className="w-[100px] h-[22px] absolute left-[591.75px] top-[9px] bg-white rounded-sm">
//             <div className="w-[59.58px] h-3 absolute left-[20.39px] top-[5px] text-center justify-center text-black text-[10px] font-bold font-['Lato'] uppercase leading-none">View Deals</div>
//           </div>
//         </div>
//       </div>
//       <div className="w-[1440px] h-[132px] absolute top-[50px] bg-[radial-gradient(ellipse_50.83%_554.55%_at_50.00%_0.00%,_#2B2B2B_0%,_#212121_70%)] shadow-[0px_0px_10px_8px_rgba(17,17,17,0.10)] overflow-hidden">
//         <div className="w-[1410px] h-px absolute left-[15px] top-[84px] border-t border-[#212121]" />
//         <div className="w-[1140px] h-[47px] absolute left-[150px] top-[85px]">
//           <div className="w-[80.27px] h-[47px] absolute left-[8px] top-0">
//             <div className="w-[65.57px] h-[19px] absolute left-0 top-[13.70px] justify-center text-[#eeeeee] text-base font-normal font-['Lato'] leading-relaxed tracking-wide">Discover</div>
//             <div className="w-3 h-1.5 absolute left-[68.27px] top-[20.50px] border-l-[6px] border-r-[6px] border-t-[6px] border-[#eeeeee]" />
//           </div>
//           <div className="w-[95.38px] h-[47px] absolute left-[116.27px] top-0">
//             <div className="w-[80.70px] h-[19px] absolute left-0 top-[13.70px] justify-center text-[#eeeeee] text-base font-normal font-['Lato'] leading-relaxed tracking-wide">Categories</div>
//             <div className="w-3 h-1.5 absolute left-[83.37px] top-[20.50px] border-l-[6px] border-r-[6px] border-t-[6px] border-[#eeeeee]" />
//           </div>
//           <div className="w-[74.31px] h-[47px] absolute left-[239.64px] top-0">
//             <div className="w-[59.69px] h-[19px] absolute left-0 top-[13.70px] justify-center text-[#eeeeee] text-base font-normal font-['Lato'] leading-relaxed tracking-wide">Bundles</div>
//             <div className="w-3 h-1.5 absolute left-[62.31px] top-[20.50px] border-l-[6px] border-r-[6px] border-t-[6px] border-[#eeeeee]" />
//           </div>
//           <div className="w-[128.20px] h-[25.59px] absolute left-[341.95px] top-[10.70px]">
//             <div className="w-[128.80px] h-[19px] absolute left-0 top-[3px] justify-center text-[#eeeeee] text-base font-normal font-['Lato'] leading-relaxed tracking-wide">Upcoming Games</div>
//           </div>
//           <div className="w-[102.19px] h-[25.59px] absolute left-[498.16px] top-[10.70px]">
//             <div className="w-[102.55px] h-[19px] absolute left-0 top-[3px] justify-center text-[#eeeeee] text-base font-normal font-['Lato'] leading-relaxed tracking-wide">New Releases</div>
//           </div>
//           <div className="w-[61.66px] h-[25.59px] absolute left-[628.34px] top-[10.70px]">
//             <div className="w-[62.05px] h-[19px] absolute left-0 top-[3px] justify-center text-[#eeeeee] text-base font-normal font-['Lato'] leading-relaxed tracking-wide">Mystery</div>
//           </div>
//           <div className="w-[115.20px] h-[47px] absolute left-[718px] top-0">
//             <div className="w-[100.56px] h-[19px] absolute left-0 top-[13.70px] justify-center text-[#eeeeee] text-base font-normal font-['Lato'] leading-relaxed tracking-wide">FantasyVerse</div>
//             <div className="w-3 h-1.5 absolute left-[103.20px] top-[20.50px] border-l-[6px] border-r-[6px] border-t-[6px] border-[#eeeeee]" />
//           </div>
//           <div className="w-[91.25px] h-[25.59px] absolute left-[861.20px] top-[10.70px]">
//             <div className="w-5 h-5 absolute left-0 top-0 bg-[#26c6da]" />
//             <div className="w-[69.56px] h-[19px] absolute left-[22px] top-[3px] justify-center text-[#eeeeee] text-base font-normal font-['Lato'] leading-relaxed tracking-wide">Star Deal</div>
//           </div>
//           <div className="w-[59.16px] h-[25.59px] absolute left-[1011.72px] top-[10.70px]">
//             <div className="w-[59.54px] h-[19px] absolute left-0 top-[3px] justify-center text-[#eeeeee] text-base font-normal font-['Lato'] leading-relaxed tracking-wide">Support</div>
//           </div>
//           <div className="w-[33.13px] h-[25.59px] absolute left-[1098.88px] top-[10.70px]">
//             <div className="w-[33.43px] h-[19px] absolute left-0 top-[3px] justify-center text-[#eeeeee] text-base font-normal font-['Lato'] leading-relaxed tracking-wide">Blog</div>
//           </div>
//         </div>
//         <div className="w-[1140px] h-[84px] absolute left-[150px] top-0">
//           <div className="w-[220px] h-[50px] absolute left-[8px] top-[17px]">
//             <div className="w-[220px] h-[50px] absolute left-0 top-0 overflow-hidden">
//               <div className="w-[220px] h-[49.22px] absolute left-0 top-[0.39px] overflow-hidden">
//                 <div className="w-[49.19px] h-[49.22px] absolute left-0 top-0 bg-[#ff9800]" />
//                 <div className="w-[158.36px] h-[20.20px] absolute left-[61.61px] top-[14.53px] bg-white" />
//               </div>
//             </div>
//           </div>
//           <div className="w-[500px] h-10 absolute left-[260px] top-[22px] rounded-[5px]">
//             <div className="w-[457px] h-10 absolute left-0 top-0 bg-white rounded-tl rounded-bl overflow-hidden">
//               <div className="w-[433px] h-[19px] absolute left-[12px] top-[10.50px] overflow-hidden">
//                 <div className="w-[207.37px] h-[19px] absolute left-0 top-0 justify-center text-[#bdbdbd] text-base font-normal font-['Lato']">Search PC, Mac, Linux Games</div>
//               </div>
//             </div>
//             <div className="w-11 h-10 absolute left-[456px] top-0 bg-white rounded-tr rounded-br">
//               <div className="w-3.5 h-3.5 absolute left-[15px] top-[12.55px]">
//                 <div className="w-3.5 h-3.5 absolute left-0 top-0 bg-[#bdbdbd]" />
//               </div>
//             </div>
//           </div>
//           <div className="w-[256.73px] h-[60px] absolute left-[875.27px] top-[12px]">
//             <div className="w-[75.73px] h-[39.59px] absolute left-[10px] top-[10.20px] rounded">
//               <div className="w-[46.63px] h-[19px] absolute left-[15px] top-[10px] text-center justify-center text-[#ff9800] text-base font-normal font-['Lato'] leading-relaxed">Sign in</div>
//             </div>
//             <div className="w-11 h-10 absolute left-[93.73px] top-[10px] bg-[#333333] rounded">
//               <div className="w-5 h-4 absolute left-[12px] top-[12.50px]">
//                 <div className="w-4 h-[13.68px] absolute left-[2px] top-[1.32px] bg-[#eeeeee]" />
//               </div>
//               <div className="w-[17px] h-[17px] absolute left-[31px] top-[-5px] bg-[#ff9800] rounded-[17px]">
//                 <div className="w-[7.32px] h-[15px] absolute left-[5.02px] top-[1px] text-center justify-center text-[#212121] text-xs font-bold font-['Lato'] leading-[17px]">0</div>
//               </div>
//             </div>
//             <div className="w-[107px] h-10 absolute left-[149.73px] top-[10px] bg-[#333333] rounded">
//               <div className="w-5 h-4 absolute left-[12px] top-[12.50px]">
//                 <div className="w-[17.85px] h-4 absolute left-[1px] top-0 bg-[#eeeeee]" />
//               </div>
//               <div className="w-[37.76px] h-3.5 absolute left-[57.55px] top-[13.50px] text-right justify-center text-[#eeeeee] text-sm font-normal font-['Lato'] leading-[14px] tracking-wide">$0.00</div>
//               <div className="w-[17px] h-[17px] absolute left-[94px] top-[-5px] bg-[#ff9800] rounded-[17px]">
//                 <div className="w-[7.32px] h-[15px] absolute left-[5.02px] top-[1px] text-center justify-center text-[#212121] text-xs font-bold font-['Lato'] leading-[17px]">0</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="w-[1140px] h-[486.58px] absolute left-[150px] top-[222px]">
//         <div className="w-[566.15px] h-[38px] absolute left-[8px] top-[13.50px] justify-center text-[#eeeeee] text-[32px] font-bold font-['Lato'] leading-[38px]">The World According to Hellboy Bundle</div>
//         <div className="w-[562px] h-[316.13px] absolute left-[8px] top-[77px] overflow-hidden">
//           <img className="w-[562px] h-[316.13px] absolute left-0 top-0 rounded-lg" src="https://placehold.co/562x316?text=World+According+to+Hellboy" />
//         </div>
//         <div className="w-[138.17px] h-[29px] absolute left-[602px] top-[97.80px] justify-center text-[#ff9800] text-2xl font-bold font-['Lato'] uppercase leading-[38.40px]">From $1.00</div>
//         <div className="w-[60px] h-10 absolute left-[753.86px] top-[93px] bg-black rounded">
//           <div className="w-[26.22px] h-[9px] absolute left-[17.06px] top-[6px] justify-center text-[#eeeeee] text-[9px] font-normal font-['Lato'] uppercase leading-[9px]">Up to</div>
//           <div className="w-[42.11px] h-[22px] absolute left-[9.36px] top-[14px] justify-center text-[#eeeeee] text-lg font-normal font-['Lato'] leading-[18px]">-96%</div>
//         </div>
//         <div className="w-[530px] h-[132.78px] absolute left-[602px] top-[149px]">
//           <div className="w-[450px] h-[41.59px] absolute left-0 top-0 bg-[#2b2b2b] rounded">
//             <div className="w-[418px] h-[25.59px] absolute left-[16px] top-[8px]">
//               <div className="w-[151.89px] h-[19px] absolute left-[30px] top-[3px] justify-center text-[#eeeeee] text-base font-normal font-['Lato'] leading-relaxed">Buy tier 1: 5 Products</div>
//               <div className="w-[50.35px] h-[19px] absolute left-[315.27px] top-[3px] justify-center text-[#9e9e9e] text-base font-bold font-['Lato'] line-through leading-relaxed">$25.95</div>
//               <div className="w-[41.05px] h-[19px] absolute left-[377.27px] top-[3px] justify-center text-[#eeeeee] text-base font-bold font-['Lato'] leading-relaxed">$1.00</div>
//               <div className="w-5 h-5 absolute left-0 top-[2.80px] rounded-[10px] border border-[#9e9e9e]" />
//             </div>
//           </div>
//           <div className="w-[450px] h-[41.59px] absolute left-0 top-[45.59px] bg-[#2b2b2b] rounded">
//             <div className="w-[418px] h-[25.59px] absolute left-[16px] top-[8px]">
//               <div className="w-[161.24px] h-[19px] absolute left-[30px] top-[3px] justify-center text-[#eeeeee] text-base font-normal font-['Lato'] leading-relaxed">Buy tier 2: 15 Products</div>
//               <div className="w-[59.66px] h-[19px] absolute left-[305.98px] top-[3px] justify-center text-[#9e9e9e] text-base font-bold font-['Lato'] line-through leading-relaxed">$106.85</div>
//               <div className="w-[41.05px] h-[19px] absolute left-[377.27px] top-[3px] justify-center text-[#eeeeee] text-base font-bold font-['Lato'] leading-relaxed">$6.99</div>
//               <div className="w-5 h-5 absolute left-0 top-[2.80px] rounded-[10px] border border-[#9e9e9e]" />
//             </div>
//           </div>
//           <div className="w-[450px] h-[41.59px] absolute left-0 top-[91.19px] bg-[#2b2b2b] rounded">
//             <div className="w-[418px] h-[25.59px] absolute left-[16px] top-[8px]">
//               <div className="w-[161.24px] h-[19px] absolute left-[30px] top-[3px] justify-center text-[#eeeeee] text-base font-normal font-['Lato'] leading-relaxed">Buy tier 3: 33 Products</div>
//               <div className="w-[59.66px] h-[19px] absolute left-[296.72px] top-[3px] justify-center text-[#9e9e9e] text-base font-bold font-['Lato'] line-through leading-relaxed">$321.67</div>
//               <div className="w-[50.35px] h-[19px] absolute left-[368px] top-[3px] justify-center text-[#eeeeee] text-base font-bold font-['Lato'] leading-relaxed">$11.99</div>
//               <div className="w-5 h-5 absolute left-0 top-[2.79px] rounded-[10px] outline outline-1 outline-offset-[-1px] outline-[#ff9800]">
//                 <div className="w-3 h-3 absolute left-[4px] top-[4px] bg-[#ff9800] rounded-md" />
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="w-[300px] h-[52px] absolute left-[602px] top-[301.78px] bg-[#ff9800] rounded outline outline-1 outline-offset-[-1px] outline-[#ff9800]">
//           <div className="w-10 h-10 absolute left-[6px] top-[6px] bg-[#1c1c1c] rounded">
//             <div className="w-[16.88px] h-[15px] absolute left-[11.56px] top-[12.50px]">
//               <div className="w-[16.74px] h-[15px] absolute left-0 top-0 bg-[#eeeeee]" />
//             </div>
//           </div>
//           <div className="w-[119.55px] h-[22px] absolute left-[115.05px] top-[15px] text-center justify-center text-[#212121] text-lg font-bold font-['Lato'] uppercase">Add to cart</div>
//         </div>
//         <div className="w-[121.97px] h-[51px] absolute left-[918px] top-[302.28px] rounded">
//           <div className="w-[42px] h-[49px] absolute left-[1px] top-[1px] bg-[#2b2b2b] rounded outline outline-1 outline-offset-[-1px] outline-[#2b2b2b]">
//             <div className="w-3.5 h-3.5 absolute left-[14px] top-[17.75px]">
//               <div className="w-3.5 h-3 absolute left-0 top-[1.17px] bg-[#eeeeee]" />
//             </div>
//           </div>
//           <div className="w-[70.28px] h-[17px] absolute left-[51px] top-[16.30px] justify-center text-[#eeeeee] text-sm font-normal font-['Lato'] leading-snug">Remind Me</div>
//         </div>
//         <div className="w-[304.63px] h-[22px] absolute left-[602px] top-[372.78px] justify-center text-[#eeeeee] text-lg font-bold font-['Lato'] uppercase leading-7">Get 33 products worth $321.67</div>
//         <div className="w-5 h-5 absolute left-[602px] top-[416.58px]">
//           <div className="w-5 h-5 absolute left-0 top-0 bg-[#4caf50]" />
//         </div>
//         <div className="w-[186.01px] h-[17px] absolute left-[626px] top-[417.58px] text-center justify-center text-white text-sm font-normal font-['Lato'] leading-none">This product activates in Israel</div>
//         <img className="w-6 h-6 absolute left-[815.52px] top-[414.58px]" src="https://placehold.co/24x24?text=Check" />
//         <div className="w-[90.03px] h-[22.39px] absolute left-[843.52px] top-[415.38px]">
//           <div className="w-[90.37px] h-[17px] absolute left-0 top-[2px] text-center justify-center text-[#ff9800] text-sm font-normal font-['Lato'] leading-snug">Check Regions</div>
//         </div>
//         <div className="w-[73.11px] h-[19px] absolute left-[602px] top-[460.78px] justify-center text-[#eeeeee] text-base font-normal font-['Lato'] leading-relaxed">Payments:</div>
//         <div className="w-[46px] h-7 absolute left-[681.80px] top-[457.53px] overflow-hidden">
//           <div className="w-[46px] h-7 absolute left-0 top-0 overflow-hidden">
//             <div className="w-[46px] h-[28.09px] absolute left-0 top-[-0.05px] overflow-hidden">
//               <div className="w-[46px] h-[28.09px] absolute left-0 top-0 bg-white" />
//               <div className="w-[14.42px] h-[6.98px] absolute left-[15.09px] top-[11.81px] bg-[#253b80]" />
//               <div className="w-[12.10px] h-[5.58px] absolute left-[29.51px] top-[11.81px] bg-[#179bd7]" />
//               <div className="w-[6.98px] h-[8.37px] absolute left-[4.85px] top-[9.95px] bg-[#253b80]" />
//               <div className="w-[5.58px] h-[6.51px] absolute left-[6.25px] top-[11.81px] bg-[#179bd7]" />
//               <div className="w-[4.65px] h-[3.72px] absolute left-[6.71px] top-[11.34px] bg-[#222d65]" />
//               <div className="w-[6.98px] h-[7.91px] absolute left-[4.39px] top-[9.48px] bg-[#253b80]" />
//             </div>
//           </div>
//         </div>
//         <div className="w-[46px] h-7 absolute left-[731.80px] top-[457.53px] overflow-hidden">
//           <div className="w-[46px] h-7 absolute left-0 top-0 overflow-hidden">
//             <div className="w-[46px] h-[28.09px] absolute left-0 top-[-0.05px] overflow-hidden">
//               <div className="w-[46px] h-[28.09px] absolute left-0 top-0 bg-white" />
//               <div className="w-[25.86px] h-[9.16px] absolute left-[10.11px] top-[9.48px] bg-[#26337a]" />
//               <div className="w-[5.56px] h-[4.83px] absolute left-[7.73px] top-[9.64px] bg-[#ec982d]" />
//             </div>
//           </div>
//         </div>
//         <div className="w-[46px] h-7 absolute left-[781.80px] top-[457.53px] overflow-hidden">
//           <div className="w-[46px] h-7 absolute left-0 top-0 overflow-hidden">
//             <div className="w-[46px] h-[28.09px] absolute left-0 top-[-0.05px] overflow-hidden">
//               <div className="w-[46px] h-[28.09px] absolute left-0 top-0 bg-white" />
//               <div className="w-[22.33px] h-[2.79px] absolute left-[12.26px] top-[20.37px] bg-[#231f20]" />
//               <div className="w-[6.39px] h-[11.55px] absolute left-[19.98px] top-[6.61px] bg-[#ff5f00]" />
//               <div className="w-[11.81px] h-[14.68px] absolute left-[11.36px] top-[5.04px] bg-[#eb001b]" />
//               <div className="w-[11.81px] h-[14.69px] absolute left-[23.18px] top-[5.04px] bg-[#f79e1b]" />
//             </div>
//           </div>
//         </div>
//         <div className="w-[46px] h-7 absolute left-[831.80px] top-[457.53px] overflow-hidden">
//           <div className="w-[46px] h-7 absolute left-0 top-0 overflow-hidden">
//             <div className="w-[46px] h-[28.09px] absolute left-0 top-[-0.05px] overflow-hidden">
//               <div className="w-[46px] h-[28.09px] absolute left-0 top-0 bg-white" />
//               <div className="w-[21.07px] h-[13.87px] absolute left-[20.54px] top-[8.60px] bg-[#5f6368]" />
//               <div className="w-1.5 h-[5.79px] absolute left-[10.54px] top-[12.64px] bg-[#4285f4]" />
//               <div className="w-[9.66px] h-[4.92px] absolute left-[5.09px] top-[14.92px] bg-[#34a853]" />
//               <div className="w-[2.81px] h-[5.44px] absolute left-[4.39px] top-[11.06px] bg-[#fbbc04]" />
//               <div className="w-[9.66px] h-[4.92px] absolute left-[5.09px] top-[7.73px] bg-[#ea4335]" />
//             </div>
//           </div>
//         </div>
//         <div className="w-[46px] h-7 absolute left-[881.80px] top-[457.53px] overflow-hidden">
//           <div className="w-[46px] h-7 absolute left-0 top-0 overflow-hidden">
//             <div className="w-[46px] h-[28.09px] absolute left-0 top-[-0.05px] overflow-hidden">
//               <div className="w-[46px] h-[28.09px] absolute left-0 top-0 bg-white" />
//               <div className="w-[13.03px] h-[13.03px] absolute left-[4.39px] top-[7.55px] bg-[#00a1e9]" />
//               <div className="w-[22.33px] h-[11.17px] absolute left-[19.28px] top-[8.48px] bg-[#3f3b3a]" />
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="w-[1140px] h-[5068px] absolute left-[150px] top-[558.58px]">
//         <div className="w-[1124px] h-[141.19px] absolute left-[8px] top-0 bg-[#2b2b2b] rounded-lg">
//           <div className="w-[281px] h-[141.19px] absolute left-0 top-0">
//             <div className="w-[55px] h-[55px] absolute left-[16px] top-[43.09px] overflow-hidden">
//               <div className="w-[55px] h-[55px] absolute left-0 top-0 overflow-hidden">
//                 <div className="w-[55px] h-[55px] absolute left-0 top-0 bg-[#ff9800]" />
//                 <div className="w-[35.75px] h-4 absolute left-[9.62px] top-[29.79px] bg-[#ff9800]" />
//                 <div className="w-[13.69px] h-[9.07px] absolute left-[9.15px] top-[13.86px] bg-[#ff9800]" />
//                 <div className="w-[13.69px] h-[9.07px] absolute left-[32.06px] top-[13.86px] bg-[#ff9800]" />
//               </div>
//             </div>
//             <div className="w-[170px] h-[58px] absolute left-[95px] top-[16px]">
//               <div className="w-[97.18px] h-12 absolute left-0 top-[5px] justify-center text-[#eeeeee] text-base font-bold font-['Lato'] uppercase leading-[29px]">Lifetime<br/>Ownership</div>
//             </div>
//             <div className="w-[155.20px] h-[44.59px] absolute left-[95px] top-[77px] justify-center text-[#eeeeee] text-base font-normal font-['Lato'] leading-relaxed">Download and keep<br/>your products forever.</div>
//           </div>
//           <div className="w-[281px] h-[112.19px] absolute left-[281px] top-[14.50px]">
//             <div className="w-[55px] h-[55px] absolute left-[16px] top-[28.59px] overflow-hidden">
//               <div className="w-[55px] h-[55px] absolute left-0 top-0 overflow-hidden">
//                 <div className="w-4 h-[2.29px] absolute left-0 top-[32.08px] bg-[#ff9800]" />
//                 <div className="w-[11.46px] h-[2.29px] absolute left-[2.29px] top-[27.50px] bg-[#ff9800]" />
//                 <div className="w-[11.46px] h-[2.29px] absolute left-0 top-[22.92px] bg-[#ff9800]" />
//                 <div className="w-[52.71px] h-[29.79px] absolute left-[2.29px] top-[6.88px] bg-[#ff9800]" />
//                 <div className="w-[9.17px] h-[9.17px] absolute left-[20.62px] top-[38.96px] bg-[#ff9800]" />
//                 <div className="w-[9.17px] h-[9.17px] absolute left-[38.96px] top-[38.96px] bg-[#ff9800]" />
//               </div>
//             </div>
//             <div className="w-[146.31px] h-[29px] absolute left-[95px] top-[16px] justify-center text-[#eeeeee] text-base font-bold font-['Lato'] uppercase leading-[29px]">Instant Delivery</div>
//             <div className="w-[141.31px] h-[44.59px] absolute left-[95px] top-[48px] justify-center text-[#eeeeee] text-base font-normal font-['Lato'] leading-relaxed">Your products are<br/>available in minutes.</div>
//           </div>
//           <div className="w-[281px] h-[112.19px] absolute left-[562px] top-[14.50px]">
//             <div className="w-[55px] h-[55px] absolute left-[16px] top-[28.59px] overflow-hidden">
//               <div className="w-[55px] h-[55px] absolute left-0 top-0 overflow-hidden">
//                 <div className="w-[41.25px] h-[55px] absolute left-[6.88px] top-0 bg-[#ff9800]" />
//                 <div className="w-[36.67px] h-[2.29px] absolute left-[11.46px] top-[4.58px] bg-[#ff9800]" />
//                 <div className="w-[25.40px] h-[27.27px] absolute left-[18.24px] top-[18.33px] bg-[#ff9800]" />
//               </div>
//             </div>
//             <div className="w-[117.40px] h-[29px] absolute left-[95px] top-[16px] justify-center text-[#eeeeee] text-base font-bold font-['Lato'] uppercase leading-[29px]">pdf file types</div>
//             <div className="w-[135.56px] h-[44.59px] absolute left-[95px] top-[48px] justify-center">
//               <span className="text-[#eeeeee] text-base font-normal font-['Lato'] leading-relaxed">All your eBooks are<br/>provided as </span>
//               <span className="text-[#eeeeee] text-base font-normal font-['Lato'] uppercase leading-relaxed">pdf</span>
//               <span className="text-[#eeeeee] text-base font-normal font-['Lato'] leading-relaxed">s.</span>
//             </div>
//           </div>
//           <div className="w-[281px] h-[112.19px] absolute left-[843px] top-[14.50px]">
//             <div className="w-[55px] h-[55px] absolute left-[16px] top-[28.59px] overflow-hidden">
//               <div className="w-[55px] h-[55px] absolute left-0 top-0 overflow-hidden">
//                 <div className="w-[48.12px] h-[55px] absolute left-[3.44px] top-0 overflow-hidden">
//                   <div className="w-[48.12px] h-[55px] absolute left-0 top-0 bg-[#ff9800]" />
//                   <div className="w-[29.79px] h-[23.03px] absolute left-[9.28px] top-[13.64px] bg-[#ff9800]" />
//                 </div>
//               </div>
//             </div>
//             <div className="w-[79.24px] h-[29px] absolute left-[95px] top-[16px] justify-center text-[#eeeeee] text-base font-bold font-['Lato'] uppercase leading-[29px]">DRM Free</div>
//             <div className="w-[141.29px] h-[44.59px] absolute left-[95px] top-[48px] justify-center text-[#eeeeee] text-base font-normal font-['Lato'] leading-relaxed">All eBooks are DRM<br/>free.</div>
//           </div>
//         </div>
//         {tiers.map((tier, index) => (
//           <div key={index} className="w-[1124px] h-auto absolute left-[8px] top-[189.19px]">
//             <div className="w-[1124px] h-6 absolute left-0 top-0">
//               <div className="w-[156.44px] h-6 absolute left-0 top-0 justify-center text-[#eeeeee] text-xl font-bold font-['Lato'] leading-normal">{tier.name}</div>
//             </div>
//             <div className="grid grid-cols-5 gap-6 mt-10">
//               {tier.products.map((product) => (
//                 <div key={product.id} className="w-[205.59px] h-[293px] bg-[#2b2b2b] rounded-lg">
//                   <div className="w-[205.59px] h-[250px] rounded-tl-lg rounded-tr-lg overflow-hidden relative">
//                     <img className="w-[226.15px] h-[275px] absolute left-[-10.28px] top-[-12.50px] blur-[10px]" src={product.image} />
//                     <img className="w-[205.59px] h-[250px] absolute left-0 top-0" src={product.image} />
//                   </div>
//                   <div className="w-[78.87px] h-4 absolute left-[63.36px] top-[263.09px] justify-center text-[#bdbdbd] text-[13px] font-normal font-['Lato'] leading-tight">Value: {product.value}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ComicsPage;


import React from 'react';

const EdTechComicsPage: React.FC = () => {
  const tiers = [
    {
      name: 'Tier 1 - Pay $1.00',
      products: [
        { id: 1, name: 'Hellboy', value: '$10.99', image: 'https://placehold.co/206x250?text=Hellboy+1' },
        { id: 2, name: 'Giant Robot', value: '$3.99', image: 'https://placehold.co/206x250?text=Giant+Robot' },
        { id: 3, name: 'Hellboy Krampus', value: '$3.99', image: 'https://placehold.co/206x250?text=Hellboy+Krampus' },
        { id: 4, name: 'Ghost/Hellboy', value: '$2.99', image: 'https://placehold.co/206x250?text=Ghost/Hellboy' },
        { id: 5, name: 'Hellboy Winter Special', value: '$3.99', image: 'https://placehold.co/206x250?text=Hellboy+Winter+Special' },
      ],
    },
    {
      name: 'Tier 2 - Pay $6.99 - Including products above',
      products: [
        { id: 6, name: 'Hellboy Strange Places', value: '$10.99', image: 'https://placehold.co/206x250?text=Hellboy+Strange+Places' },
        { id: 7, name: 'Hellboy Mike Mignola', value: '$10.99', image: 'https://placehold.co/206x250?text=Hellboy+Mike+Mignola' },
        { id: 8, name: 'Hellboy Mike Mignola 2', value: '$10.99', image: 'https://placehold.co/206x250?text=Hellboy+Mike+Mignola+2' },
        { id: 9, name: 'Hellboy Mike Mignola 3', value: '$10.99', image: 'https://placehold.co/206x250?text=Hellboy+Mike+Mignola+3' },
        { id: 10, name: 'Hellboy Winter Special 2', value: '$8.99', image: 'https://placehold.co/206x250?text=Hellboy+Winter+Special+2' },
        { id: 11, name: 'Hellboy Weird Tales', value: '$8.99', image: 'https://placehold.co/206x250?text=Hellboy+Weird+Tales' },
        { id: 12, name: 'Hellboy The Hidden Land', value: '$6.99', image: 'https://placehold.co/206x250?text=Hellboy+Hidden+Land' },
        { id: 13, name: 'Hellboy Giant Robot 2', value: '$3.99', image: 'https://placehold.co/206x250?text=Hellboy+Giant+Robot+2' },
        { id: 14, name: 'Hellboy 50 Years Covers', value: '$3.99', image: 'https://placehold.co/206x250?text=Hellboy+50+Years+Covers' },
        { id: 15, name: 'Hellboy Winter Special 3', value: '$3.99', image: 'https://placehold.co/206x250?text=Hellboy+Winter+Special+3' },
      ],
    },
    {
      name: 'Tier 3 - Pay $11.99 - Including products above',
      products: [
        { id: 16, name: 'Hellboy Seed of Destruction', value: '$10.99', image: 'https://placehold.co/263x320?text=Hellboy+Seed+Destruction' },
        { id: 17, name: 'Hellboy Strange Places 2', value: '$10.99', image: 'https://placehold.co/263x320?text=Hellboy+Strange+Places+2' },
        { id: 18, name: 'Hellboy The Third Wish', value: '$10.99', image: 'https://placehold.co/263x320?text=Hellboy+Third+Wish' },
        { id: 19, name: 'Hellboy The Crooked Man', value: '$10.99', image: 'https://placehold.co/263x320?text=Hellboy+Crooked+Man' },
        { id: 20, name: 'Hellboy Into the Silent Sea', value: '$10.99', image: 'https://placehold.co/263x320?text=Hellboy+Silent+Sea' },
        { id: 21, name: 'Hellboy Dark Horse', value: '$10.99', image: 'https://placehold.co/263x320?text=Hellboy+Dark+Horse' },
        { id: 22, name: 'Hellboy Conqueror Worm', value: '$10.99', image: 'https://placehold.co/263x320?text=Hellboy+Conqueror+Worm' },
        { id: 23, name: 'Hellboy The Storm and the Fury', value: '$10.99', image: 'https://placehold.co/263x320?text=Hellboy+Storm+Fury' },
        { id: 24, name: 'Hellboy in Hell The Descent', value: '$10.99', image: 'https://placehold.co/263x320?text=Hellboy+Descent' },
        { id: 25, name: 'Hellboy Weird Tales 2', value: '$4.99', image: 'https://placehold.co/263x320?text=Hellboy+Weird+Tales+2' },
        { id: 26, name: 'Hellboy The Hidden Land 2', value: '$4.99', image: 'https://placehold.co/263x320?text=Hellboy+Hidden+Land+2' },
        { id: 27, name: 'Hellboy Giant Robot 3', value: '$3.99', image: 'https://placehold.co/263x320?text=Hellboy+Giant+Robot+3' },
        { id: 28, name: 'Hellboy Winter Special 4', value: '$3.99', image: 'https://placehold.co/263x320?text=Hellboy+Winter+Special+4' },
        { id: 29, name: 'Hellboy 50 Years Covers 2', value: '$3.99', image: 'https://placehold.co/263x320?text=Hellboy+50+Years+Covers+2' },
        { id: 30, name: 'Hellboy Mike Mignola 4', value: '$3.99', image: 'https://placehold.co/263x320?text=Hellboy+Mike+Mignola+4' },
        { id: 31, name: 'Hellboy Strange Places 3', value: '$3.99', image: 'https://placehold.co/263x320?text=Hellboy+Strange+Places+3' },
        { id: 32, name: 'Hellboy The Third Wish 2', value: '$3.99', image: 'https://placehold.co/263x320?text=Hellboy+Third+Wish+2' },
        { id: 33, name: 'Hellboy The Crooked Man 2', value: '$3.99', image: 'https://placehold.co/263x320?text=Hellboy+Crooked+Man+2' },
      ],
    },
  ];

  return (
    <div className="w-[1440px] h-[7013.86px] relative bg-[#f5f7fa]">
      {/* Header Section */}
      <div className="w-[1440px] h-[50px] absolute top-0 bg-[#ffffff]">
        <div className="w-[1140px] h-[50px] absolute left-[150px] top-0">
          <div className="w-[263.17px] h-[22.39px] absolute left-[8px] top-[13.80px]">
            <div className="w-[12.25px] h-3.5 absolute left-0 top-[3.75px] bg-[#2c3e50]" />
            <div className="w-[243.31px] h-[17px] absolute left-[20.25px] top-[2px] text-center justify-center text-[#2c3e50] text-sm font-bold font-['Lato'] leading-snug">Download this Course & Keep Forever</div>
          </div>
          <div className="w-[210px] h-[17px] absolute left-[312.55px] top-[19.30px]">
            <div className="w-[200px] h-[23px] absolute left-0 top-[-9px] overflow-hidden">
              <div className="w-[200px] h-[23px] absolute left-0 top-0 overflow-hidden">
                <div className="w-[197.35px] h-[23px] absolute left-[1.33px] top-0 overflow-hidden">
                  <div className="w-[93.20px] h-[17.47px] absolute left-[104.15px] top-[5.53px] bg-[#3498db]" />
                  <div className="w-[12.23px] h-[11.58px] absolute left-[106.77px] top-[8.47px] bg-white" />
                  <div className="w-[12.23px] h-[11.58px] absolute left-[125.70px] top-[8.47px] bg-white" />
                  <div className="w-[50.09px] h-[11.58px] absolute left-[144.64px] top-[8.47px] bg-white" />
                  <div className="w-[74.27px] h-[17.47px] absolute left-[104.15px] top-[5.53px] bg-[#3498db]" />
                  <div className="w-[8.74px] h-[17.47px] absolute left-[188.61px] top-[5.53px] bg-[#bdc3c7]" />
                  <div className="w-[8.74px] h-[17.47px] absolute left-[179.87px] top-[5.53px] bg-[#3498db]" />
                  <div className="w-[87.95px] h-[11.58px] absolute left-[106.77px] top-[8.47px] bg-white" />
                  <div className="w-[68.95px] h-[14.83px] absolute left-[24.56px] top-[8.14px] bg-[#1a252f]" />
                  <div className="w-[22.39px] h-[21.30px] absolute left-0 top-0 bg-[#3498db]" />
                  <div className="w-[4.87px] h-[3.10px] absolute left-[11.20px] top-[13.17px] bg-[#1a252f]" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[263.50px] h-4 absolute left-[522.55px] top-[16.98px]">
            <div className="w-[264.42px] h-4 absolute left-0 top-0 justify-center text-[#2c3e50] text-[13px] font-bold font-['Lato'] leading-[18px]">Rated 'EXCELLENT' Based on 79,814 Reviews</div>
          </div>
          <div className="w-[330.95px] h-[22.39px] absolute left-[801.05px] top-[13.80px]">
            <div className="w-3.5 h-3.5 absolute left-0 top-[3.75px]">
              <div className="w-3.5 h-3.5 absolute left-0 top-0 bg-[#2c3e50]" />
            </div>
            <div className="w-[291.60px] h-[17px] absolute left-[22px] top-[2px] text-center justify-center text-[#2c3e50] text-sm font-bold font-['Lato'] leading-snug">14 Day Money Back Guarantee on this Course</div>
            <div className="w-3.5 h-2.5 absolute left-[316.95px] top-[6.68px]">
              <div className="w-[8.75px] h-[5px] absolute left-[2.62px] top-[3.12px] bg-[#34495e]" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[1440px] h-[50px] absolute top-[50px] bg-[#ffffff]">
        <div className="w-[1140px] h-[50px] absolute left-[150px] top-0">
          <div className="w-[175.30px] h-[22.39px] absolute left-[8px] top-[13.80px]">
            <div className="w-[12.25px] h-3.5 absolute left-0 top-[3.75px] bg-[#2c3e50]" />
            <div className="w-[138.21px] h-[17px] absolute left-[20.25px] top-[2px] text-center justify-center text-[#2c3e50] text-sm font-bold font-['Lato'] leading-snug">100% Safe and Secure</div>
            <div className="w-3.5 h-2.5 absolute left-[161.30px] top-[6.68px]">
              <div className="w-[8.75px] h-[5px] absolute left-[2.62px] top-[3.12px] bg-[#34495e]" />
            </div>
          </div>
          <div className="w-[210px] h-[17px] absolute left-[328.25px] top-[19.30px]">
            <div className="w-[200px] h-[23px] absolute left-0 top-[-9px] overflow-hidden">
              <div className="w-[200px] h-[23px] absolute left-0 top-0 overflow-hidden">
                <div className="w-[197.35px] h-[23px] absolute left-[1.33px] top-0 overflow-hidden">
                  <div className="w-[93.20px] h-[17.47px] absolute left-[104.15px] top-[5.53px] bg-[#3498db]" />
                  <div className="w-[12.23px] h-[11.58px] absolute left-[106.77px] top-[8.47px] bg-white" />
                  <div className="w-[12.23px] h-[11.58px] absolute left-[125.70px] top-[8.47px] bg-white" />
                  <div className="w-[50.09px] h-[11.58px] absolute left-[144.64px] top-[8.47px] bg-white" />
                  <div className="w-[74.27px] h-[17.47px] absolute left-[104.15px] top-[5.53px] bg-[#3498db]" />
                  <div className="w-[8.74px] h-[17.47px] absolute left-[188.61px] top-[5.53px] bg-[#bdc3c7]" />
                  <div className="w-[8.74px] h-[17.47px] absolute left-[179.87px] top-[5.53px] bg-[#3498db]" />
                  <div className="w-[87.95px] h-[11.58px] absolute left-[106.77px] top-[8.47px] bg-white" />
                  <div className="w-[68.95px] h-[14.83px] absolute left-[24.56px] top-[8.14px] bg-[#1a252f]" />
                  <div className="w-[22.39px] h-[21.30px] absolute left-0 top-0 bg-[#3498db]" />
                  <div className="w-[4.87px] h-[3.10px] absolute left-[11.20px] top-[13.17px] bg-[#1a252f]" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[263.50px] h-4 absolute left-[538.25px] top-[16.98px]">
            <div className="w-[264.42px] h-4 absolute left-0 top-0 justify-center text-[#2c3e50] text-[13px] font-bold font-['Lato'] leading-[18px]">Rated 'EXCELLENT' Based on 79,814 Reviews</div>
          </div>
          <div className="w-[185.30px] h-[22.39px] absolute left-[946.70px] top-[13.80px]">
            <div className="w-3.5 h-3.5 absolute left-0 top-[3.75px]">
              <div className="w-3.5 h-3.5 absolute left-0 top-0 bg-[#2c3e50]" />
            </div>
            <div className="w-[145.61px] h-[17px] absolute left-[22px] top-[2px] text-center justify-center text-[#2c3e50] text-sm font-bold font-['Lato'] leading-snug">Instant Digital Delivery</div>
            <div className="w-3.5 h-2.5 absolute left-[171.30px] top-[6.68px]">
              <div className="w-[8.75px] h-[5px] absolute left-[2.62px] top-[3.12px] bg-[#34495e]" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[1440px] h-10 absolute top-[182px] bg-[#2c3e50]">
        <div className="w-[1124px] h-10 absolute left-[158px] top-0">
          <img className="w-[143.50px] h-10 absolute left-[432.25px] top-0" src="https://placehold.co/143x40?text=Special+Offer" />
          <div className="w-[100px] h-[22px] absolute left-[591.75px] top-[9px] bg-white rounded-sm">
            <div className="w-[59.58px] h-3 absolute left-[20.39px] top-[5px] text-center justify-center text-[#2c3e50] text-[10px] font-bold font-['Lato'] uppercase leading-none">View Deals</div>
          </div>
        </div>
      </div>
      <div className="w-[1440px] h-[132px] absolute top-[50px] bg-[radial-gradient(ellipse_50.83%_554.55%_at_50.00%_0.00%,_#ecf0f1_0%,_#dfe6e9_70%)] shadow-[0px_0px_10px_8px_rgba(44,62,80,0.10)] overflow-hidden">
        <div className="w-[1410px] h-px absolute left-[15px] top-[84px] border-t border-[#bdc3c7]" />
        <div className="w-[1140px] h-[47px] absolute left-[150px] top-[85px]">
          <div className="w-[80.27px] h-[47px] absolute left-[8px] top-0">
            <div className="w-[65.57px] h-[19px] absolute left-0 top-[13.70px] justify-center text-[#2c3e50] text-base font-normal font-['Lato'] leading-relaxed tracking-wide">Discover</div>
            <div className="w-3 h-1.5 absolute left-[68.27px] top-[20.50px] border-l-[6px] border-r-[6px] border-t-[6px] border-[#2c3e50]" />
          </div>
          <div className="w-[95.38px] h-[47px] absolute left-[116.27px] top-0">
            <div className="w-[80.70px] h-[19px] absolute left-0 top-[13.70px] justify-center text-[#2c3e50] text-base font-normal font-['Lato'] leading-relaxed tracking-wide">Categories</div>
            <div className="w-3 h-1.5 absolute left-[83.37px] top-[20.50px] border-l-[6px] border-r-[6px] border-t-[6px] border-[#2c3e50]" />
          </div>
          <div className="w-[74.31px] h-[47px] absolute left-[239.64px] top-0">
            <div className="w-[59.69px] h-[19px] absolute left-0 top-[13.70px] justify-center text-[#2c3e50] text-base font-normal font-['Lato'] leading-relaxed tracking-wide">Bundles</div>
            <div className="w-3 h-1.5 absolute left-[62.31px] top-[20.50px] border-l-[6px] border-r-[6px] border-t-[6px] border-[#2c3e50]" />
          </div>
          <div className="w-[128.20px] h-[25.59px] absolute left-[341.95px] top-[10.70px]">
            <div className="w-[128.80px] h-[19px] absolute left-0 top-[3px] justify-center text-[#2c3e50] text-base font-normal font-['Lato'] leading-relaxed tracking-wide">Upcoming Courses</div>
          </div>
          <div className="w-[102.19px] h-[25.59px] absolute left-[498.16px] top-[10.70px]">
            <div className="w-[102.55px] h-[19px] absolute left-0 top-[3px] justify-center text-[#2c3e50] text-base font-normal font-['Lato'] leading-relaxed tracking-wide">New Releases</div>
          </div>
          <div className="w-[61.66px] h-[25.59px] absolute left-[628.34px] top-[10.70px]">
            <div className="w-[62.05px] h-[19px] absolute left-0 top-[3px] justify-center text-[#2c3e50] text-base font-normal font-['Lato'] leading-relaxed tracking-wide">Mystery</div>
          </div>
          <div className="w-[115.20px] h-[47px] absolute left-[718px] top-0">
            <div className="w-[100.56px] h-[19px] absolute left-0 top-[13.70px] justify-center text-[#2c3e50] text-base font-normal font-['Lato'] leading-relaxed tracking-wide">EduVerse</div>
            <div className="w-3 h-1.5 absolute left-[103.20px] top-[20.50px] border-l-[6px] border-r-[6px] border-t-[6px] border-[#2c3e50]" />
          </div>
          <div className="w-[91.25px] h-[25.59px] absolute left-[861.20px] top-[10.70px]">
            <div className="w-5 h-5 absolute left-0 top-0 bg-[#3498db]" />
            <div className="w-[69.56px] h-[19px] absolute left-[22px] top-[3px] justify-center text-[#2c3e50] text-base font-normal font-['Lato'] leading-relaxed tracking-wide">Star Deal</div>
          </div>
          <div className="w-[59.16px] h-[25.59px] absolute left-[1011.72px] top-[10.70px]">
            <div className="w-[59.54px] h-[19px] absolute left-0 top-[3px] justify-center text-[#2c3e50] text-base font-normal font-['Lato'] leading-relaxed tracking-wide">Support</div>
          </div>
          <div className="w-[33.13px] h-[25.59px] absolute left-[1098.88px] top-[10.70px]">
            <div className="w-[33.43px] h-[19px] absolute left-0 top-[3px] justify-center text-[#2c3e50] text-base font-normal font-['Lato'] leading-relaxed tracking-wide">Blog</div>
          </div>
        </div>
        <div className="w-[1140px] h-[84px] absolute left-[150px] top-0">
          <div className="w-[220px] h-[50px] absolute left-[8px] top-[17px]">
            <div className="w-[220px] h-[50px] absolute left-0 top-0 overflow-hidden">
              <div className="w-[220px] h-[49.22px] absolute left-0 top-[0.39px] overflow-hidden">
                <div className="w-[49.19px] h-[49.22px] absolute left-0 top-0 bg-[#3498db]" />
                <div className="w-[158.36px] h-[20.20px] absolute left-[61.61px] top-[14.53px] bg-white" />
              </div>
            </div>
          </div>
          <div className="w-[500px] h-10 absolute left-[260px] top-[22px] rounded-[5px]">
            <div className="w-[457px] h-10 absolute left-0 top-0 bg-white rounded-tl rounded-bl overflow-hidden">
              <div className="w-[433px] h-[19px] absolute left-[12px] top-[10.50px] overflow-hidden">
                <div className="w-[207.37px] h-[19px] absolute left-0 top-0 justify-center text-[#bdc3c7] text-base font-normal font-['Lato']">Search Courses, eBooks, Tutorials</div>
              </div>
            </div>
            <div className="w-11 h-10 absolute left-[456px] top-0 bg-white rounded-tr rounded-br">
              <div className="w-3.5 h-3.5 absolute left-[15px] top-[12.55px]">
                <div className="w-3.5 h-3.5 absolute left-0 top-0 bg-[#bdc3c7]" />
              </div>
            </div>
          </div>
          <div className="w-[256.73px] h-[60px] absolute left-[875.27px] top-[12px]">
            <div className="w-[75.73px] h-[39.59px] absolute left-[10px] top-[10.20px] rounded">
              <div className="w-[46.63px] h-[19px] absolute left-[15px] top-[10px] text-center justify-center text-[#3498db] text-base font-normal font-['Lato'] leading-relaxed">Sign in</div>
            </div>
            <div className="w-11 h-10 absolute left-[93.73px] top-[10px] bg-[#34495e] rounded">
              <div className="w-5 h-4 absolute left-[12px] top-[12.50px]">
                <div className="w-4 h-[13.68px] absolute left-[2px] top-[1.32px] bg-[#ecf0f1]" />
              </div>
              <div className="w-[17px] h-[17px] absolute left-[31px] top-[-5px] bg-[#3498db] rounded-[17px]">
                <div className="w-[7.32px] h-[15px] absolute left-[5.02px] top-[1px] text-center justify-center text-[#1a252f] text-xs font-bold font-['Lato'] leading-[17px]">0</div>
              </div>
            </div>
            <div className="w-[107px] h-10 absolute left-[149.73px] top-[10px] bg-[#34495e] rounded">
              <div className="w-5 h-4 absolute left-[12px] top-[12.50px]">
                <div className="w-[17.85px] h-4 absolute left-[1px] top-0 bg-[#ecf0f1]" />
              </div>
              <div className="w-[37.76px] h-3.5 absolute left-[57.55px] top-[13.50px] text-right justify-center text-[#ecf0f1] text-sm font-normal font-['Lato'] leading-[14px] tracking-wide">$0.00</div>
              <div className="w-[17px] h-[17px] absolute left-[94px] top-[-5px] bg-[#3498db] rounded-[17px]">
                <div className="w-[7.32px] h-[15px] absolute left-[5.02px] top-[1px] text-center justify-center text-[#1a252f] text-xs font-bold font-['Lato'] leading-[17px]">0</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[1140px] h-[486.58px] absolute left-[150px] top-[222px]">
        <div className="w-[566.15px] h-[38px] absolute left-[8px] top-[13.50px] justify-center text-[#2c3e50] text-[32px] font-bold font-['Lato'] leading-[38px]">The World According to Hellboy Bundle</div>
        <div className="w-[562px] h-[316.13px] absolute left-[8px] top-[77px] overflow-hidden">
          <img className="w-[562px] h-[316.13px] absolute left-0 top-0 rounded-lg" src="https://placehold.co/562x316?text=World+According+to+Hellboy" />
        </div>
        <div className="w-[138.17px] h-[29px] absolute left-[602px] top-[97.80px] justify-center text-[#3498db] text-2xl font-bold font-['Lato'] uppercase leading-[38.40px]">From $1.00</div>
        <div className="w-[60px] h-10 absolute left-[753.86px] top-[93px] bg-[#2c3e50] rounded">
          <div className="w-[26.22px] h-[9px] absolute left-[17.06px] top-[6px] justify-center text-[#ecf0f1] text-[9px] font-normal font-['Lato'] uppercase leading-[9px]">Up to</div>
          <div className="w-[42.11px] h-[22px] absolute left-[9.36px] top-[14px] justify-center text-[#ecf0f1] text-lg font-normal font-['Lato'] leading-[18px]">-96%</div>
        </div>
        <div className="w-[530px] h-[132.78px] absolute left-[602px] top-[149px]">
          <div className="w-[450px] h-[41.59px] absolute left-0 top-0 bg-[#ecf0f1] rounded">
            <div className="w-[418px] h-[25.59px] absolute left-[16px] top-[8px]">
              <div className="w-[151.89px] h-[19px] absolute left-[30px] top-[3px] justify-center text-[#2c3e50] text-base font-normal font-['Lato'] leading-relaxed">Buy tier 1: 5 Products</div>
              <div className="w-[50.35px] h-[19px] absolute left-[315.27px] top-[3px] justify-center text-[#7f8c8d] text-base font-bold font-['Lato'] line-through leading-relaxed">$25.95</div>
              <div className="w-[41.05px] h-[19px] absolute left-[377.27px] top-[3px] justify-center text-[#2c3e50] text-base font-bold font-['Lato'] leading-relaxed">$1.00</div>
              <div className="w-5 h-5 absolute left-0 top-[2.80px] rounded-[10px] border border-[#7f8c8d]" />
            </div>
          </div>
          <div className="w-[450px] h-[41.59px] absolute left-0 top-[45.59px] bg-[#ecf0f1] rounded">
            <div className="w-[418px] h-[25.59px] absolute left-[16px] top-[8px]">
              <div className="w-[161.24px] h-[19px] absolute left-[30px] top-[3px] justify-center text-[#2c3e50] text-base font-normal font-['Lato'] leading-relaxed">Buy tier 2: 15 Products</div>
              <div className="w-[59.66px] h-[19px] absolute left-[305.98px] top-[3px] justify-center text-[#7f8c8d] text-base font-bold font-['Lato'] line-through leading-relaxed">$106.85</div>
              <div className="w-[41.05px] h-[19px] absolute left-[377.27px] top-[3px] justify-center text-[#2c3e50] text-base font-bold font-['Lato'] leading-relaxed">$6.99</div>
              <div className="w-5 h-5 absolute left-0 top-[2.80px] rounded-[10px] border border-[#7f8c8d]" />
            </div>
          </div>
          <div className="w-[450px] h-[41.59px] absolute left-0 top-[91.19px] bg-[#ecf0f1] rounded">
            <div className="w-[418px] h-[25.59px] absolute left-[16px] top-[8px]">
              <div className="w-[161.24px] h-[19px] absolute left-[30px] top-[3px] justify-center text-[#2c3e50] text-base font-normal font-['Lato'] leading-relaxed">Buy tier 3: 33 Products</div>
              <div className="w-[59.66px] h-[19px] absolute left-[296.72px] top-[3px] justify-center text-[#7f8c8d] text-base font-bold font-['Lato'] line-through leading-relaxed">$321.67</div>
              <div className="w-[50.35px] h-[19px] absolute left-[368px] top-[3px] justify-center text-[#2c3e50] text-base font-bold font-['Lato'] leading-relaxed">$11.99</div>
              <div className="w-5 h-5 absolute left-0 top-[2.79px] rounded-[10px] outline outline-1 outline-offset-[-1px] outline-[#3498db]">
                <div className="w-3 h-3 absolute left-[4px] top-[4px] bg-[#3498db] rounded-md" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[300px] h-[52px] absolute left-[602px] top-[301.78px] bg-[#3498db] rounded outline outline-1 outline-offset-[-1px] outline-[#3498db]">
          <div className="w-10 h-10 absolute left-[6px] top-[6px] bg-[#2c3e50] rounded">
            <div className="w-[16.88px] h-[15px] absolute left-[11.56px] top-[12.50px]">
              <div className="w-[16.74px] h-[15px] absolute left-0 top-0 bg-[#ecf0f1]" />
            </div>
          </div>
          <div className="w-[119.55px] h-[22px] absolute left-[115.05px] top-[15px] text-center justify-center text-[#ecf0f1] text-lg font-bold font-['Lato'] uppercase">Add to Cart</div>
        </div>
        <div className="w-[121.97px] h-[51px] absolute left-[918px] top-[302.28px] rounded">
          <div className="w-[42px] h-[49px] absolute left-[1px] top-[1px] bg-[#ecf0f1] rounded outline outline-1 outline-offset-[-1px] outline-[#ecf0f1]">
            <div className="w-3.5 h-3.5 absolute left-[14px] top-[17.75px]">
              <div className="w-3.5 h-3 absolute left-0 top-[1.17px] bg-[#2c3e50]" />
            </div>
          </div>
          <div className="w-[70.28px] h-[17px] absolute left-[51px] top-[16.30px] justify-center text-[#2c3e50] text-sm font-normal font-['Lato'] leading-snug">Remind Me</div>
        </div>
        <div className="w-[304.63px] h-[22px] absolute left-[602px] top-[372.78px] justify-center text-[#2c3e50] text-lg font-bold font-['Lato'] uppercase leading-7">Get 33 products worth $321.67</div>
        <div className="w-5 h-5 absolute left-[602px] top-[416.58px]">
          <div className="w-5 h-5 absolute left-0 top-0 bg-[#2ecc71]" />
        </div>
        <div className="w-[186.01px] h-[17px] absolute left-[626px] top-[417.58px] text-center justify-center text-[#2c3e50] text-sm font-normal font-['Lato'] leading-none">This course activates in Israel</div>
        <img className="w-6 h-6 absolute left-[815.52px] top-[414.58px]" src="https://placehold.co/24x24?text=Check" />
        <div className="w-[90.03px] h-[22.39px] absolute left-[843.52px] top-[415.38px]">
          <div className="w-[90.37px] h-[17px] absolute left-0 top-[2px] text-center justify-center text-[#3498db] text-sm font-normal font-['Lato'] leading-snug">Check Regions</div>
        </div>
        <div className="w-[73.11px] h-[19px] absolute left-[602px] top-[460.78px] justify-center text-[#2c3e50] text-base font-normal font-['Lato'] leading-relaxed">Payments:</div>
        <div className="w-[46px] h-7 absolute left-[681.80px] top-[457.53px] overflow-hidden">
          <div className="w-[46px] h-7 absolute left-0 top-0 overflow-hidden">
            <div className="w-[46px] h-[28.09px] absolute left-0 top-[-0.05px] overflow-hidden">
              <div className="w-[46px] h-[28.09px] absolute left-0 top-0 bg-white" />
              <div className="w-[14.42px] h-[6.98px] absolute left-[15.09px] top-[11.81px] bg-[#253b80]" />
              <div className="w-[12.10px] h-[5.58px] absolute left-[29.51px] top-[11.81px] bg-[#179bd7]" />
              <div className="w-[6.98px] h-[8.37px] absolute left-[4.85px] top-[9.95px] bg-[#253b80]" />
              <div className="w-[5.58px] h-[6.51px] absolute left-[6.25px] top-[11.81px] bg-[#179bd7]" />
              <div className="w-[4.65px] h-[3.72px] absolute left-[6.71px] top-[11.34px] bg-[#222d65]" />
              <div className="w-[6.98px] h-[7.91px] absolute left-[4.39px] top-[9.48px] bg-[#253b80]" />
            </div>
          </div>
        </div>
        <div className="w-[46px] h-7 absolute left-[731.80px] top-[457.53px] overflow-hidden">
          <div className="w-[46px] h-7 absolute left-0 top-0 overflow-hidden">
            <div className="w-[46px] h-[28.09px] absolute left-0 top-[-0.05px] overflow-hidden">
              <div className="w-[46px] h-[28.09px] absolute left-0 top-0 bg-white" />
              <div className="w-[25.86px] h-[9.16px] absolute left-[10.11px] top-[9.48px] bg-[#26337a]" />
              <div className="w-[5.56px] h-[4.83px] absolute left-[7.73px] top-[9.64px] bg-[#ec982d]" />
            </div>
          </div>
        </div>
        <div className="w-[46px] h-7 absolute left-[781.80px] top-[457.53px] overflow-hidden">
          <div className="w-[46px] h-7 absolute left-0 top-0 overflow-hidden">
            <div className="w-[46px] h-[28.09px] absolute left-0 top-[-0.05px] overflow-hidden">
              <div className="w-[46px] h-[28.09px] absolute left-0 top-0 bg-white" />
              <div className="w-[22.33px] h-[2.79px] absolute left-[12.26px] top-[20.37px] bg-[#231f20]" />
              <div className="w-[6.39px] h-[11.55px] absolute left-[19.98px] top-[6.61px] bg-[#ff5f00]" />
              <div className="w-[11.81px] h-[14.68px] absolute left-[11.36px] top-[5.04px] bg-[#eb001b]" />
              <div className="w-[11.81px] h-[14.69px] absolute left-[23.18px] top-[5.04px] bg-[#f79e1b]" />
            </div>
          </div>
        </div>
        <div className="w-[46px] h-7 absolute left-[831.80px] top-[457.53px] overflow-hidden">
          <div className="w-[46px] h-7 absolute left-0 top-0 overflow-hidden">
            <div className="w-[46px] h-[28.09px] absolute left-0 top-[-0.05px] overflow-hidden">
              <div className="w-[46px] h-[28.09px] absolute left-0 top-0 bg-white" />
              <div className="w-[21.07px] h-[13.87px] absolute left-[20.54px] top-[8.60px] bg-[#5f6368]" />
              <div className="w-1.5 h-[5.79px] absolute left-[10.54px] top-[12.64px] bg-[#4285f4]" />
              <div className="w-[9.66px] h-[4.92px] absolute left-[5.09px] top-[14.92px] bg-[#34a853]" />
              <div className="w-[2.81px] h-[5.44px] absolute left-[4.39px] top-[11.06px] bg-[#fbbc04]" />
              <div className="w-[9.66px] h-[4.92px] absolute left-[5.09px] top-[7.73px] bg-[#ea4335]" />
            </div>
          </div>
        </div>
        <div className="w-[46px] h-7 absolute left-[881.80px] top-[457.53px] overflow-hidden">
          <div className="w-[46px] h-7 absolute left-0 top-0 overflow-hidden">
            <div className="w-[46px] h-[28.09px] absolute left-0 top-[-0.05px] overflow-hidden">
              <div className="w-[46px] h-[28.09px] absolute left-0 top-0 bg-white" />
              <div className="w-[13.03px] h-[13.03px] absolute left-[4.39px] top-[7.55px] bg-[#00a1e9]" />
              <div className="w-[22.33px] h-[11.17px] absolute left-[19.28px] top-[8.48px] bg-[#3f3b3a]" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[1140px] h-[5068px] absolute left-[150px] top-[558.58px]">
        <div className="w-[1124px] h-[141.19px] absolute left-[8px] top-0 bg-[#ecf0f1] rounded-lg">
          <div className="w-[281px] h-[141.19px] absolute left-0 top-0">
            <div className="w-[55px] h-[55px] absolute left-[16px] top-[43.09px] overflow-hidden">
              <div className="w-[55px] h-[55px] absolute left-0 top-0 overflow-hidden">
                <div className="w-[55px] h-[55px] absolute left-0 top-0 bg-[#3498db]" />
                <div className="w-[35.75px] h-4 absolute left-[9.62px] top-[29.79px] bg-[#3498db]" />
                <div className="w-[13.69px] h-[9.07px] absolute left-[9.15px] top-[13.86px] bg-[#3498db]" />
                <div className="w-[13.69px] h-[9.07px] absolute left-[32.06px] top-[13.86px] bg-[#3498db]" />
              </div>
            </div>
            <div className="w-[170px] h-[58px] absolute left-[95px] top-[16px]">
              <div className="w-[97.18px] h-12 absolute left-0 top-[5px] justify-center text-[#2c3e50] text-base font-bold font-['Lato'] uppercase leading-[29px]">Lifetime<br/>Access</div>
            </div>
            <div className="w-[155.20px] h-[44.59px] absolute left-[95px] top-[77px] justify-center text-[#2c3e50] text-base font-normal font-['Lato'] leading-relaxed">Access your courses<br/>forever.</div>
          </div>
          <div className="w-[281px] h-[112.19px] absolute left-[281px] top-[14.50px]">
            <div className="w-[55px] h-[55px] absolute left-[16px] top-[28.59px] overflow-hidden">
              <div className="w-[55px] h-[55px] absolute left-0 top-0 overflow-hidden">
                <div className="w-4 h-[2.29px] absolute left-0 top-[32.08px] bg-[#3498db]" />
                <div className="w-[11.46px] h-[2.29px] absolute left-[2.29px] top-[27.50px] bg-[#3498db]" />
                <div className="w-[11.46px] h-[2.29px] absolute left-0 top-[22.92px] bg-[#3498db]" />
                <div className="w-[52.71px] h-[29.79px] absolute left-[2.29px] top-[6.88px] bg-[#3498db]" />
                <div className="w-[9.17px] h-[9.17px] absolute left-[20.62px] top-[38.96px] bg-[#3498db]" />
                <div className="w-[9.17px] h-[9.17px] absolute left-[38.96px] top-[38.96px] bg-[#3498db]" />
              </div>
            </div>
            <div className="w-[146.31px] h-[29px] absolute left-[95px] top-[16px] justify-center text-[#2c3e50] text-base font-bold font-['Lato'] uppercase leading-[29px]">Instant Access</div>
            <div className="w-[141.31px] h-[44.59px] absolute left-[95px] top-[48px] justify-center text-[#2c3e50] text-base font-normal font-['Lato'] leading-relaxed">Start learning in<br/>minutes.</div>
          </div>
          <div className="w-[281px] h-[112.19px] absolute left-[562px] top-[14.50px]">
            <div className="w-[55px] h-[55px] absolute left-[16px] top-[28.59px] overflow-hidden">
              <div className="w-[55px] h-[55px] absolute left-0 top-0 overflow-hidden">
                <div className="w-[41.25px] h-[55px] absolute left-[6.88px] top-0 bg-[#3498db]" />
                <div className="w-[36.67px] h-[2.29px] absolute left-[11.46px] top-[4.58px] bg-[#3498db]" />
                <div className="w-[25.40px] h-[27.27px] absolute left-[18.24px] top-[18.33px] bg-[#3498db]" />
              </div>
            </div>
            <div className="w-[117.40px] h-[29px] absolute left-[95px] top-[16px] justify-center text-[#2c3e50] text-base font-bold font-['Lato'] uppercase leading-[29px]">PDF Materials</div>
            <div className="w-[135.56px] h-[44.59px] absolute left-[95px] top-[48px] justify-center">
              <span className="text-[#2c3e50] text-base font-normal font-['Lato'] leading-relaxed">All materials provided<br/>as </span>
              <span className="text-[#2c3e50] text-base font-normal font-['Lato'] uppercase leading-relaxed">pdf</span>
              <span className="text-[#2c3e50] text-base font-normal font-['Lato'] leading-relaxed">s.</span>
            </div>
          </div>
          <div className="w-[281px] h-[112.19px] absolute left-[843px] top-[14.50px]">
            <div className="w-[55px] h-[55px] absolute left-[16px] top-[28.59px] overflow-hidden">
              <div className="w-[55px] h-[55px] absolute left-0 top-0 overflow-hidden">
                <div className="w-[48.12px] h-[55px] absolute left-[3.44px] top-0 overflow-hidden">
                  <div className="w-[48.12px] h-[55px] absolute left-0 top-0 bg-[#3498db]" />
                  <div className="w-[29.79px] h-[23.03px] absolute left-[9.28px] top-[13.64px] bg-[#3498db]" />
                </div>
              </div>
            </div>
            <div className="w-[79.24px] h-[29px] absolute left-[95px] top-[16px] justify-center text-[#2c3e50] text-base font-bold font-['Lato'] uppercase leading-[29px]">DRM Free</div>
            <div className="w-[141.29px] h-[44.59px] absolute left-[95px] top-[48px] justify-center text-[#2c3e50] text-base font-normal font-['Lato'] leading-relaxed">All materials are DRM<br/>free.</div>
          </div>
        </div>
        {tiers.map((tier, index) => (
          <div key={index} className="w-[1124px] h-auto absolute left-[8px] top-[189.19px]">
            <div className="w-[1124px] h-6 absolute left-0 top-0">
              <div className="w-[156.44px] h-6 absolute left-0 top-0 justify-center text-[#2c3e50] text-xl font-bold font-['Lato'] leading-normal">{tier.name}</div>
            </div>
            <div className="grid grid-cols-5 gap-6 mt-10">
              {tier.products.map((product) => (
                <div key={product.id} className="w-[205.59px] h-[293px] bg-[#ffffff] rounded-lg shadow-md">
                  <div className="w-[205.59px] h-[250px] rounded-tl-lg rounded-tr-lg overflow-hidden relative">
                    <img className="w-[226.15px] h-[275px] absolute left-[-10.28px] top-[-12.50px] blur-[10px]" src={product.image} />
                    <img className="w-[205.59px] h-[250px] absolute left-0 top-0" src={product.image} />
                  </div>
                  <div className="w-[78.87px] h-4 absolute left-[63.36px] top-[263.09px] justify-center text-[#7f8c8d] text-[13px] font-normal font-['Lato'] leading-tight">Value: {product.value}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EdTechComicsPage;