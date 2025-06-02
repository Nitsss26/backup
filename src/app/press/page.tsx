
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { APP_NAME } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Newspaper, Download } from 'lucide-react';
import Image from 'next/image';

export default function PressPage() {
  const pressReleases = [
    { date: "October 26, 2023", title: `${APP_NAME} Launches New Platform to Revolutionize Online Learning`, link: "#" },
    { date: "November 15, 2023", title: `${APP_NAME} Partners with Leading Universities to Expand Course Catalog`, link: "#" },
    { date: "December 05, 2023", title: `Over 10,000 Students Enroll on ${APP_NAME} in First Month`, link: "#" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="bg-primary/10 py-16 md:py-24">
          <div className="container text-center">
            <Newspaper className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Press & Media</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay updated with the latest news, announcements, and media resources from {APP_NAME}.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 font-headline">Recent Press Releases</h2>
            <div className="space-y-6">
              {pressReleases.map((release, index) => (
                <div key={index} className="bg-card p-6 rounded-lg shadow-md">
                  <p className="text-sm text-muted-foreground mb-1">{release.date}</p>
                  <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                    <Link href={release.link}>{release.title}</Link>
                  </h3>
                  <Button variant="link" asChild className="p-0 h-auto">
                    <Link href={release.link}>Read More &rarr;</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-secondary/30">
            <div className="container grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-bold mb-4 font-headline">Media Kit</h2>
                    <p className="text-muted-foreground mb-6">
                        Download our official logos, brand guidelines, and other media assets. For any media inquiries, please contact us.
                    </p>
                    <div className="flex gap-4">
                        <Button>
                            <Download className="mr-2 h-4 w-4" /> Download Media Kit
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/contact">Contact Media Team</Link>
                        </Button>
                    </div>
                </div>
                <div className="flex justify-center">
                     <Image src="https://placehold.co/500x300.png" alt="EdTechCart logo and brand assets" width={500} height={300} className="rounded-lg shadow-lg" data-ai-hint="brand logo assets" />
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
