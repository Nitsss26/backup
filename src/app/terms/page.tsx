
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { APP_NAME } from '@/lib/constants';
import { FileText } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="bg-primary/10 py-16 md:py-20">
          <div className="container text-center">
            <FileText className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Terms of Service</h1>
            <p className="text-lg text-muted-foreground">Last Updated: {new Date().toLocaleDateString()}</p>
          </div>
        </section>

        <section className="py-12">
          <div className="container max-w-3xl mx-auto prose dark:prose-invert">
            <p>Welcome to {APP_NAME}! These Terms of Service ("Terms") govern your use of our website, applications, and services (collectively, the "Services"). Please read these Terms carefully.</p>

            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, do not use our Services.</p>

            <h2>2. User Accounts</h2>
            <p>To access certain features, you may need to create an account. You are responsible for safeguarding your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.</p>

            <h2>3. Course Enrollment and Access</h2>
            <p>When you enroll in a course, you are granted a limited, non-exclusive, non-transferable license to access and view the course content for which you have paid all required fees, solely for your personal, non-commercial, educational purposes.</p>

            <h2>4. Seller Terms (For Course Providers)</h2>
            <p>If you are a seller or course provider on {APP_NAME}, you agree to additional terms specific to sellers, which include responsibilities regarding course content, quality, student interactions, and revenue sharing. Sellers must undergo a verification process before their courses can be published.</p>
            
            <h2>5. Payments, Credits, and Refunds</h2>
            <p>You agree to pay the fees for courses that you purchase, and you authorize us to charge your debit or credit card or process other means of payment for those fees. We offer a 30-day refund or credit for most courses if requested within the specified period. Some restrictions may apply. Please see our Refund Policy (section embedded or linked) for more details.</p>

            <h2>6. Content and Conduct</h2>
            <p>You are responsible for all content that you post or otherwise contribute to the Services. You agree not to use the Services to post or transmit any content that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.</p>
            <p>{APP_NAME} reserves the right to remove content and terminate accounts for users who violate these terms.</p>

            <h2>7. Intellectual Property</h2>
            <p>The Services and their original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of {APP_NAME} and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of {APP_NAME}.</p>

            <h2>8. Disclaimers</h2>
            <p>The Services are provided on an "AS IS" and "AS AVAILABLE" basis. {APP_NAME} makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

            <h2>9. Limitation of Liability</h2>
            <p>In no event shall {APP_NAME}, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Services.</p>
            
            <h2>10. Changes to Terms</h2>
            <p>{APP_NAME} reserves the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>

            <h2>11. Contact Us</h2>
            <p>If you have any questions about these Terms, please <a href="/contact" className="text-primary hover:underline">contact us</a>.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
