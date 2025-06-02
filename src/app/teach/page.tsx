
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { APP_NAME } from '@/lib/constants';
import { CheckCircle, DollarSign, Edit3, Users, Lightbulb, Store, UploadCloud, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function SellCoursesPage() {
  const benefits = [
    { icon: Edit3, title: "Create Your Course", description: "Share your expertise and build engaging courses with our easy-to-use tools." },
    { icon: Users, title: "Reach Global Students", description: "Connect with learners from around the world and expand your impact." },
    { icon: DollarSign, title: "Earn Revenue", description: "Monetize your knowledge and skills. Set your own prices and earn competitive revenue." },
    { icon: BarChart3, title: "Powerful Analytics", description: "Track your course performance, student engagement, and earnings with detailed analytics." },
  ];

  const steps = [
    { title: "1. Register as a Seller", description: "Sign up and complete your seller profile. Submit necessary documents for verification." },
    { title: "2. Plan Your Curriculum", description: "Outline your course structure and learning objectives. Decide what skills you'll teach." },
    { title: "3. Record Your Content", description: "Create high-quality videos, presentations, and supporting materials for your lessons." },
    { title: "4. Build Your Course Page", description: "Use our tools to upload content, set pricing, and create an attractive course landing page." },
    { title: "5. Submit for Review", description: "Our admin team will review your course to ensure it meets quality standards." },
    { title: "6. Launch & Promote", description: "Once approved, publish your course and start enrolling students!" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary/90 text-primary-foreground py-16 md:py-24">
          <div className="container text-center">
            <Store className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-6">
              Sell Your Courses on {APP_NAME}
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Partner with {APP_NAME} to share your expertise, reach a global audience, and earn by selling your online courses.
            </p>
            <Button size="lg" className="bg-background text-primary hover:bg-background/90" asChild>
              <Link href="/auth/register?role=provider">Become a Seller</Link>
            </Button>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12 font-headline">Why Sell With Us?</h2>
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
                        src="https://placehold.co/500x600.png" 
                        alt="Seller dashboard interface showing course creation tools" 
                        width={500} 
                        height={600} 
                        className="rounded-lg shadow-xl"
                        data-ai-hint="course creation dashboard"
                    />
                </div>
            </div>
          </div>
        </section>
        
        {/* Seller Verification Info */}
        <section className="py-16">
            <div className="container text-center">
                 <UploadCloud className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4 font-headline">Seller Verification</h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                    To maintain a high-quality marketplace, all sellers undergo a verification process. This typically involves submitting identification and proof of expertise or institutional legitimacy.
                </p>
                <Button variant="outline" asChild>
                    <Link href="/help/seller-verification">Learn More About Verification</Link>
                </Button>
            </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 text-center bg-primary/5">
          <div className="container">
            <h2 className="text-3xl font-bold mb-6 font-headline">Ready to Share Your Courses?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join our community of educators and institutions. We provide the platform and tools you need to succeed.
            </p>
            <Button size="lg" asChild>
              <Link href="/auth/register?role=provider">Sign Up as a Seller</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
