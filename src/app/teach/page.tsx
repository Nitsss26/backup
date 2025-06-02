
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { APP_NAME } from '@/lib/constants';
import { CheckCircle, DollarSign, Edit3, Users, Lightbulb, Store, UploadCloud, BarChart3, Sparkles, Verified, TrendingUp, Globe } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function SellCoursesPage() {
  const benefits = [
    { icon: Edit3, title: "Intuitive Course Builder", description: "Effortlessly create engaging courses with our user-friendly tools and multimedia support. Upload videos, PDFs, quizzes, and more." },
    { icon: Globe, title: "Global Student Network", description: "Tap into a vast community of eager learners actively seeking new skills and knowledge from around the world." },
    { icon: TrendingUp, title: "Competitive Revenue Share", description: "Monetize your expertise effectively. Set your pricing and enjoy attractive earnings with transparent payout systems." },
    { icon: BarChart3, title: "Actionable Analytics", description: "Gain insights into your course performance, student enrollment trends, engagement levels, and revenue." },
  ];

  const steps = [
    { title: "1. Sign Up & Create Profile", description: "Register as a seller in minutes. Build your profile to showcase your expertise or your institution's credentials." },
    { title: "2. Get Verified", description: "Submit necessary documents for identity and expertise verification. This builds trust and ensures quality on our platform." },
    { title: "3. Design Your Course", description: "Define clear learning outcomes, structure your curriculum logically, and plan engaging content for your target audience." },
    { title: "4. Upload Your Content", description: "Use our tools to upload video lectures, presentations, downloadable resources, quizzes, and assignments." },
    { title: "5. Set Pricing & Publish", description: "Determine your course price, add compelling marketing copy, and set your course live after a quick review by our team." },
    { title: "6. Engage & Earn", description: "Interact with your students, monitor your sales and analytics, and receive regular payouts for your hard work." },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/80 via-blue-600 to-blue-700 text-primary-foreground py-16 md:py-24">
          <div className="container grid md:grid-cols-2 items-center gap-12">
            <div className="space-y-6 text-center md:text-left">
                <Store className="h-16 w-16 mx-auto md:mx-0 mb-4 text-yellow-300" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline leading-tight">
                Share Your Knowledge. Grow Your Reach.
                </h1>
                <p className="text-lg md:text-xl text-blue-100/90 mb-8 max-w-xl mx-auto md:mx-0">
                Become a seller on {APP_NAME} – the premier marketplace for online courses. We provide the tools, audience, and support you need to succeed.
                </p>
                <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-primary-foreground dark:text-slate-900 text-lg px-8 py-6" asChild>
                <Link href="/auth/register?role=provider">Start Selling Today</Link>
                </Button>
            </div>
            <div className="hidden md:flex justify-center">
                 <Image
                    src="https://placehold.co/550x450/EBF4FF/3B82F6?text=Empower+Learners+Worldwide"
                    alt="Teacher presenting online course content to diverse students on a virtual platform"
                    width={550}
                    height={450}
                    className="rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                    data-ai-hint="online teaching instructor global students virtual classroom"
                />
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-20">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 font-headline">Why Sell on {APP_NAME}?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-primary bg-card flex flex-col">
                  <CardHeader className="items-center pt-8">
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-5">
                        <benefit.icon className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-semibold font-headline">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-8 flex-grow">
                    <p className="text-sm text-muted-foreground px-3 leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 md:py-20 bg-secondary/50">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-headline">Simple Steps to Start Selling Your Courses</h2>
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 items-center">
                <div className="relative hidden md:flex justify-center items-center p-8 bg-gradient-to-tr from-blue-500 to-primary rounded-xl shadow-2xl">
                    <Image
                        src="https://placehold.co/500x600/FFFFFF/3B82F6?text=Your+Teaching+Journey"
                        alt="Seller dashboard interface mockup showing course creation tools and analytics graphs"
                        width={450}
                        height={550}
                        className="rounded-lg shadow-xl"
                        data-ai-hint="seller dashboard course creation analytics mockup"
                    />
                </div>
                <div className="space-y-10">
                    {steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-5">
                        <div className="flex-shrink-0 h-12 w-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                        {index + 1}
                        </div>
                        <div>
                        <h3 className="text-xl font-semibold mb-1.5 font-headline">{step.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 md:py-20">
            <div className="container text-center max-w-3xl mx-auto">
                <div className="mx-auto bg-green-100 dark:bg-green-800/30 p-4 rounded-full w-fit mb-6">
                    <Verified className="h-12 w-12 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 font-headline">A Platform Built on Trust & Quality</h2>
                <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                    To maintain a high-quality and trustworthy marketplace for learners, all sellers undergo a verification process. This helps ensure the authenticity of course providers and the quality of educational content. The process typically involves submitting identification and proof of expertise or institutional legitimacy. Our team is here to guide you through it.
                </p>
                <Button variant="outline" size="lg" asChild>
                    <Link href="/help/seller-verification" className="text-base">Learn About Seller Verification</Link>
                </Button>
            </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 md:py-24 text-center bg-gradient-to-r from-primary/10 to-secondary/20">
          <div className="container">
            <Sparkles className="h-14 w-14 text-primary mx-auto mb-5"/>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-headline">Ready to Inspire Learners Worldwide?</h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-lg leading-relaxed">
              Join our growing community of esteemed educators, institutions, and individual experts. We provide the platform, tools, and dedicated support you need to turn your passion into a thriving online teaching business.
            </p>
            <Button size="lg" className="text-lg px-10 py-7" asChild>
              <Link href="/auth/register?role=provider">Become a Seller on {APP_NAME} Today!</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
