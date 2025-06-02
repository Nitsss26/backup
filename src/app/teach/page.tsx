
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { APP_NAME } from '@/lib/constants';
import { CheckCircle, DollarSign, Edit3, Users, Lightbulb, Store, UploadCloud, BarChart3, Sparkles, Verified } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';


export default function SellCoursesPage() {
  const benefits = [
    { icon: Edit3, title: "Intuitive Course Builder", description: "Effortlessly create engaging courses with our user-friendly tools and multimedia support." },
    { icon: Users, title: "Vast Student Network", description: "Tap into a global community of eager learners actively seeking new skills and knowledge." },
    { icon: DollarSign, title: "Competitive Revenue Share", description: "Monetize your expertise effectively. Set your pricing and enjoy attractive earnings." },
    { icon: BarChart3, title: "Actionable Analytics", description: "Gain insights into your course performance, student engagement, and revenue trends." },
  ];

  const steps = [
    { title: "1. Register as a Seller", description: "Sign up quickly and create your seller profile. Tell us about yourself or your institution." },
    { title: "2. Submit Verification Documents", description: "Provide necessary documents for identity and expertise verification to build trust." },
    { title: "3. Plan Your Course", description: "Define your target audience, learning outcomes, and structure your curriculum for maximum impact." },
    { title: "4. Create & Upload Content", description: "Develop high-quality video lectures, presentations, quizzes, and supplementary materials." },
    { title: "5. Set Pricing & Details", description: "Choose your course price, write a compelling description, and upload a captivating thumbnail." },
    { title: "6. Get Approved & Launch", description: "Our team reviews your course. Once approved, publish it and start reaching students worldwide!" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/80 via-primary to-indigo-600 text-primary-foreground py-16 md:py-24">
          <div className="container grid md:grid-cols-2 items-center gap-12">
            <div className="space-y-6 text-center md:text-left">
                <Store className="h-16 w-16 mx-auto md:mx-0 mb-4 text-yellow-300" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline leading-tight">
                Share Your Knowledge. Grow Your Reach.
                </h1>
                <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-xl mx-auto md:mx-0">
                Become a seller on {APP_NAME} – the premier marketplace for online courses. We provide the tools and audience you need to succeed.
                </p>
                <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-primary-foreground dark:text-slate-900" asChild>
                <Link href="/auth/register?role=provider">Start Selling Today</Link>
                </Button>
            </div>
            <div className="hidden md:flex justify-center">
                 <Image
                    src="https://placehold.co/550x450/EBF4FF/60A5FA?text=Empower+Students+Globally"
                    alt="Diverse group of students learning online happily"
                    width={550}
                    height={450}
                    className="rounded-xl shadow-2xl"
                    data-ai-hint="happy students online learning diverse"
                />
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12 font-headline">Why Sell on {APP_NAME}?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow border-t-4 border-primary">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                        <benefit.icon className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-semibold font-headline">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-slate-50 dark:bg-slate-800/30">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-16 font-headline">Simple Steps to Start Selling</h2>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 items-center">
                <div className="relative hidden md:flex justify-center items-center p-8 bg-gradient-to-tr from-indigo-500 to-primary rounded-xl shadow-2xl">
                    <Image
                        src="https://placehold.co/500x600/FFFFFF/3B82F6?text=Your+Teaching+Journey+Starts+Here"
                        alt="Seller dashboard interface showing course creation tools and analytics"
                        width={450}
                        height={550}
                        className="rounded-lg shadow-xl"
                        data-ai-hint="course creation dashboard screenshot"
                    />
                </div>
                <div className="space-y-8">
                    {steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0 h-10 w-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                        {index + 1}
                        </div>
                        <div>
                        <h3 className="text-xl font-semibold mb-1 font-headline">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
          </div>
        </section>
        
        {/* Seller Verification Info */}
        <section className="py-16">
            <div className="container text-center max-w-3xl mx-auto">
                <div className="mx-auto bg-green-100 dark:bg-green-900/30 p-4 rounded-full w-fit mb-6">
                    <Verified className="h-12 w-12 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-3xl font-bold mb-4 font-headline">Trusted Platform, Verified Sellers</h2>
                <p className="text-muted-foreground mb-6 text-lg">
                    To maintain a high-quality and trustworthy marketplace for learners, all sellers undergo a verification process. This ensures authenticity and quality.
                    It typically involves submitting identification and proof of expertise or institutional legitimacy.
                </p>
                <Button variant="outline" asChild>
                    <Link href="/help/seller-verification">Learn About Seller Verification</Link>
                </Button>
            </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 text-center bg-primary/10">
          <div className="container">
            <Sparkles className="h-12 w-12 text-primary mx-auto mb-4"/>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-headline">Ready to Inspire Millions?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-lg">
              Join our growing community of esteemed educators and institutions. We provide the platform, tools, and support you need to thrive.
            </p>
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/auth/register?role=provider">Become a Seller on {APP_NAME}</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
