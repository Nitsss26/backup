import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { APP_NAME } from '@/lib/constants';
import { CheckCircle, DollarSign, Edit3, Users, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function TeachPage() {
  const benefits = [
    { icon: Edit3, title: "Create Your Course", description: "Share your expertise and build engaging courses with our easy-to-use tools." },
    { icon: Users, title: "Reach Global Students", description: "Connect with learners from around the world and expand your impact." },
    { icon: DollarSign, title: "Earn Revenue", description: "Monetize your knowledge and skills. Set your own prices and earn competitive revenue." },
    { icon: Lightbulb, title: "Inspire Learners", description: "Make a difference by helping students achieve their personal and professional goals." },
  ];

  const steps = [
    { title: "1. Plan Your Curriculum", description: "Outline your course structure and learning objectives. Decide what skills you'll teach." },
    { title: "2. Record Your Content", description: "Create high-quality videos, presentations, and supporting materials for your lessons." },
    { title: "3. Build Your Course Page", description: "Use our tools to upload content, set pricing, and create an attractive course landing page." },
    { title: "4. Submit for Review", description: "Our team will review your course to ensure it meets quality standards." },
    { title: "5. Launch & Promote", description: "Once approved, publish your course and start enrolling students!" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary/90 text-primary-foreground py-16 md:py-24">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-6">
              Become an Instructor on {APP_NAME}
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Share your knowledge, reach a global audience, and earn money by teaching what you love.
            </p>
            <Button size="lg" className="bg-background text-primary hover:bg-background/90" asChild>
              <Link href="/auth/register?role=provider">Get Started Today</Link>
            </Button>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12 font-headline">Why Teach With Us?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-card p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                  <benefit.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 font-headline">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12 font-headline">How to Get Started</h2>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-10 items-center">
                <div className="space-y-8">
                    {steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0 h-10 w-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                        {index + 1}
                        </div>
                        <div>
                        <h3 className="text-xl font-semibold mb-1 font-headline">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                        </div>
                    </div>
                    ))}
                </div>
                 <div className="hidden md:flex justify-center items-center">
                    <Image 
                        src="https://placehold.co/500x550.png" 
                        alt="Instructor teaching online" 
                        width={500} 
                        height={550} 
                        className="rounded-lg shadow-xl"
                        data-ai-hint="online teaching instructor"
                    />
                </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 text-center">
          <div className="container">
            <h2 className="text-3xl font-bold mb-6 font-headline">Ready to Share Your Passion?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join our community of instructors and start making an impact. We provide the tools and support you need to succeed.
            </p>
            <Button size="lg" asChild>
              <Link href="/auth/register?role=provider">Sign Up as an Instructor</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
