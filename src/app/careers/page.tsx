
// import { Header } from '@/components/layout/Header';
// import { Footer } from '@/components/layout/Footer';
// import { APP_NAME } from '@/lib/constants';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Briefcase, Lightbulb, Users } from 'lucide-react';

// export default function CareersPage() {
//   const openPositions = [
//     { title: "Senior Frontend Engineer", location: "Remote", department: "Engineering" },
//     { title: "Marketing Specialist", location: "New York, NY", department: "Marketing" },
//     { title: "Customer Support Lead", location: "Remote", department: "Support" },
//   ];

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
//       <main className="flex-grow">
//         <section className="bg-primary/10 py-16 md:py-24">
//           <div className="container text-center">
//             <Briefcase className="h-16 w-16 text-primary mx-auto mb-4" />
//             <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Careers at {APP_NAME}</h1>
//             <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
//               Join our passionate team and help us revolutionize online education. We're looking for talented individuals to contribute to our mission.
//             </p>
//           </div>
//         </section>

//         <section className="py-16">
//           <div className="container">
//             <h2 className="text-3xl font-bold text-center mb-12 font-headline">Why Work With Us?</h2>
//             <div className="grid md:grid-cols-3 gap-8 text-center">
//               <div>
//                 <Lightbulb className="h-12 w-12 text-primary mx-auto mb-3" />
//                 <h3 className="text-xl font-semibold mb-2">Make an Impact</h3>
//                 <p className="text-muted-foreground text-sm">Contribute to a platform that empowers learners and educators globally.</p>
//               </div>
//               <div>
//                 <Users className="h-12 w-12 text-primary mx-auto mb-3" />
//                 <h3 className="text-xl font-semibold mb-2">Collaborative Culture</h3>
//                 <p className="text-muted-foreground text-sm">Work with a diverse, talented, and supportive team passionate about education technology.</p>
//               </div>
//               <div>
//                 <Briefcase className="h-12 w-12 text-primary mx-auto mb-3" />
//                 <h3 className="text-xl font-semibold mb-2">Growth Opportunities</h3>
//                 <p className="text-muted-foreground text-sm">Develop your skills and advance your career in a dynamic and fast-growing environment.</p>
//               </div>
//             </div>
//              <div className="mt-12 flex justify-center">
//                  <Image src="https://placehold.co/700x400.png" alt="Team working together in a modern office" width={700} height={400} className="rounded-lg shadow-xl" data-ai-hint="office team collaboration" />
//             </div>
//           </div>
//         </section>

//         <section className="py-16 bg-secondary/30">
//           <div className="container">
//             <h2 className="text-3xl font-bold text-center mb-10 font-headline">Current Openings</h2>
//             {openPositions.length > 0 ? (
//               <div className="space-y-6 max-w-2xl mx-auto">
//                 {openPositions.map((position, index) => (
//                   <div key={index} className="bg-card p-6 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//                     <div>
//                       <h3 className="text-xl font-semibold text-primary">{position.title}</h3>
//                       <p className="text-sm text-muted-foreground">{position.department} &bull; {position.location}</p>
//                     </div>
//                     <Button variant="outline" asChild>
//                       <Link href="#">Apply Now</Link> {/* Placeholder link */}
//                     </Button>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-center text-muted-foreground">
//                 We don't have any open positions at the moment, but we're always looking for talent. Feel free to <Link href="/contact" className="text-primary hover:underline">contact us</Link> with your resume.
//               </p>
//             )}
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </div>
//   );
// }

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { APP_NAME } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Briefcase, Lightbulb, Users } from 'lucide-react';

export default function CareersPage() {
  const openPositions = [
    { title: "Senior Frontend Engineer", location: "Remote", department: "Engineering" },
    { title: "Marketing Specialist", location: "New York, NY", department: "Marketing" },
    { title: "Customer Support Lead", location: "Remote", department: "Support" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="bg-primary/10 py-16 md:py-24">
          <div className="container text-center">
            <Briefcase className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Careers at {APP_NAME}</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Join our passionate team and help us revolutionize online education. We're looking for talented individuals to contribute to our mission.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12 font-headline">Why Work With Us?</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <Lightbulb className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="text-xl font-semibold mb-2">Make an Impact</h3>
                <p className="text-muted-foreground text-sm">Contribute to a platform that empowers learners and educators globally.</p>
              </div>
              <div>
                <Users className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="text-xl font-semibold mb-2">Collaborative Culture</h3>
                <p className="text-muted-foreground text-sm">Work with a diverse, talented, and supportive team passionate about education technology.</p>
              </div>
              <div>
                <Briefcase className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="text-xl font-semibold mb-2">Growth Opportunities</h3>
                <p className="text-muted-foreground text-sm">Develop your skills and advance your career in a dynamic and fast-growing environment.</p>
              </div>
            </div>
            <div className="mt-12 flex justify-center">
              <Image src="https://img.freepik.com/free-vector/man-search-hiring-job-online-from-laptop_1150-52728.jpg?uid=R120730963&ga=GA1.1.1385959138.1748893744&semt=ais_hybrid&w=740" alt="Team working together in a modern office" width={700} height={400} className="rounded-lg shadow-xl" data-ai-hint="office team collaboration" />
            </div>
          </div>
        </section>

        <section className="py-16 bg-secondary/30">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-10 font-headline">Current Openings</h2>
            {openPositions.length > 0 ? (
              <div className="space-y-6 max-w-2xl mx-auto">
                {openPositions.map((position, index) => (
                  <div key={index} className="bg-card p-6 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-primary">{position.title}</h3>
                      <p className="text-sm text-muted-foreground">{position.department} • {position.location}</p>
                    </div>
                    <Button variant="outline">
                      <Link href={`/careers/apply/${position.title.toLowerCase().replace(/\s+/g, '-')}`}>
                       Coming Soon
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                We don't have any open positions at the moment, but we're always looking for talent. Feel free to <Link href="/contact" className="text-primary hover:underline">contact us</Link> with your resume.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
