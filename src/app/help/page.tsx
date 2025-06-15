
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { APP_NAME } from '@/lib/constants';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Search, LifeBuoy } from 'lucide-react';

export default function HelpCenterPage() {
  const faqs = [
    { q: "How do I enroll in a course?", a: `To enroll, simply browse our course catalog, select a course you're interested in, and click the "Add to Cart" or "Enroll Now" button. Follow the checkout process to complete your enrollment.` },
    { q: "What payment methods are accepted?", a: "We accept various payment methods including credit/debit cards, UPI, net banking, and popular digital wallets. All transactions are secure." },
    { q: "Can I get a refund if I'm not satisfied?", a: `Yes, we offer a 30-day money-back guarantee on most courses. Please check the specific course page and our <a href="/terms#refunds" class="text-primary hover:underline">Refund Policy</a> for details.` },
    { q: "How do I access my enrolled courses?", a: `Once enrolled, you can access your courses from your <a href="/dashboard/student/courses" class="text-primary hover:underline">Student Dashboard</a> under the "My Courses" section.` },
    { q: "How does seller verification work?", a: `Sellers need to submit required documents for verification. Our admin team reviews these to ensure the quality and legitimacy of course providers on ${APP_NAME}. You can find more info on our <a href="/help/seller-verification" class="text-primary hover:underline">Seller Verification Guide</a>.` },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="bg-primary/10 py-16 md:py-24">
          <div className="container text-center">
            <LifeBuoy className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Help Center</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Welcome to the {APP_NAME} Help Center. Find answers to common questions and get support.
            </p>
            <form className="max-w-xl mx-auto relative">
              <Input type="search" placeholder="Search for help articles..." className="h-12 pl-12 text-base" />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 h-9">Search</Button>
            </form>
          </div>
        </section>

        <section className="py-16">
          <div className="container max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 font-headline text-center md:text-left">Frequently Asked Questions</h2>
            <Accordion type="multiple" className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-lg text-left hover:no-underline">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-base">
                    <div dangerouslySetInnerHTML={{ __html: faq.a }} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
        
        <section className="py-16 bg-secondary/30 text-center">
            <div className="container">
                <h2 className="text-2xl font-bold mb-4 font-headline">Can't find what you're looking for?</h2>
                <p className="text-muted-foreground mb-6">Our support team is here to help. Reach out to us for any assistance.</p>
                <Button asChild size="lg">
                    <Link href="/contact">Contact Support</Link>
                </Button>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
