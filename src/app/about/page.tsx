
"use client";

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { APP_NAME } from '@/lib/constants';
import { Users, Zap, Target } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="bg-primary/10 py-16 md:py-24">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 ">About <span className='text-primary'>{APP_NAME}</span></h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {APP_NAME} is your premier destination for discovering and enrolling in high-quality online courses from a diverse range of educators and institutions.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 font-headline">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                Our mission is to make quality education accessible to everyone, everywhere. We strive to connect passionate learners with expert instructors and institutions, fostering a global community dedicated to lifelong learning and skill development.
              </p>
              <p className="text-muted-foreground">
                We believe in the transformative power of education and aim to provide a platform that is intuitive, comprehensive, and supportive for both students and course sellers.
              </p>
            </div>
            <div className="flex justify-center">
              <Image src="https://img.freepik.com/free-vector/online-tutorials-concept_52683-37481.jpg?uid=R120730963&ga=GA1.1.1385959138.1748893744&w=740" alt="Diverse group of people collaborating" width={500} height={400} className="rounded-lg shadow-xl" data-ai-hint="teamwork collaboration diverse" />
            </div>
          </div>
        </section>

        <section className="py-16 bg-secondary/30">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12 font-headline">What We Offer</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg shadow-md text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 font-headline">For Learners</h3>
                <p className="text-sm text-muted-foreground">Access a vast catalog of courses, compare options, track progress, and earn certificates. Enjoy a personalized learning experience tailored to your goals.</p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-md text-center">
                <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 font-headline">For Sellers</h3>
                <p className="text-sm text-muted-foreground">Reach a global audience, manage your courses effectively with powerful tools, and grow your educational business on a trusted platform.</p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-md text-center">
                <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 font-headline">Quality & Trust</h3>
                <p className="text-sm text-muted-foreground">We are committed to quality through seller verification, course reviews, and secure payment processing to ensure a trustworthy environment.</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-6 font-headline">Join Our Community</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Whether you're looking to learn a new skill or share your expertise, {APP_NAME} is the place for you.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" asChild>
                    <Link href="/courses"><span>Explore Courses</span></Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                    <Link href="/sell-courses"><span>Become a Seller</span></Link>
                </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
