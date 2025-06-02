
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { APP_NAME } from '@/lib/constants';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="bg-primary/10 py-16 md:py-20">
          <div className="container text-center">
            <ShieldCheck className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Privacy Policy</h1>
            <p className="text-lg text-muted-foreground">Last Updated: {new Date().toLocaleDateString()}</p>
          </div>
        </section>

        <section className="py-12">
          <div className="container max-w-3xl mx-auto prose dark:prose-invert">
            <p>Welcome to {APP_NAME}'s Privacy Policy. This policy describes how we collect, use, process, and disclose your information, including personal information, in conjunction with your access to and use of the {APP_NAME} platform.</p>

            <h2>1. Information We Collect</h2>
            <p>There are three general categories of information we collect.</p>
            <h3>1.1 Information You Give to Us.</h3>
            <p>This includes information necessary for the use of the {APP_NAME} Platform, such as your name, email address, password, and payment information when you make a purchase. It also includes profile information you choose to provide, and communications between you and {APP_NAME} or other users.</p>
            <h3>1.2 Information We Automatically Collect from Your Use of the Platform.</h3>
            <p>When you use the {APP_NAME} Platform, we automatically collect information, including personal information, about the services you use and how you use them. This information may include usage details, IP address, and information collected through cookies and other tracking technologies.</p>
            <h3>1.3 Information We Collect from Third Parties.</h3>
            <p>We may collect information, including personal information, that others provide about you when they use the {APP_NAME} Platform, or obtain information from other sources and combine that with information we collect through the {APP_NAME} Platform.</p>

            <h2>2. How We Use Information We Collect</h2>
            <p>We use, store, and process information, including personal information, about you to provide, understand, improve, and develop the {APP_NAME} Platform, create and maintain a trusted and safer environment and comply with our legal obligations.</p>
            <ul>
              <li>Provide, personalize, and improve our services.</li>
              <li>Process transactions and send notices about your transactions.</li>
              <li>Communicate with you about products, services, offers, promotions, and events.</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our Services.</li>
            </ul>

            <h2>3. Sharing & Disclosure</h2>
            <p>We may share your information with third-party vendors, service providers, contractors or agents who perform services for us or on our behalf and require access to such information to do that work.</p>
            <p>We may also share information when legally required or to protect rights.</p>
            
            <h2>4. Your Rights</h2>
            <p>You may exercise any of the rights described in this section by sending an email to privacy@{APP_NAME.toLowerCase().replace(/\s/g, '')}.com. Please note that we may ask you to verify your identity before taking further action on your request.</p>
            <p>You have the right to access, update, or delete the information we have on you. Whenever made possible, you can access, update, or request deletion of your Personal Data directly within your account settings section.</p>

            <h2>5. Data Security</h2>
            <p>We are continuously implementing and updating administrative, technical, and physical security measures to help protect your information against unauthorized access, loss, destruction, or alteration.</p>

            <h2>6. Changes to this Privacy Policy</h2>
            <p>{APP_NAME} reserves the right to modify this Privacy Policy at any time in accordance with this provision. If we make changes to this Privacy Policy, we will post the revised Privacy Policy on the {APP_NAME} Platform and update the “Last Updated” date at the top of this Privacy Policy.</p>

            <h2>7. Contact Us</h2>
            <p>If you have any questions or complaints about this Privacy Policy or {APP_NAME}’s information handling practices, you may email us at privacy@{APP_NAME.toLowerCase().replace(/\s/g, '')}.com or contact us via our <a href="/contact" className="text-primary hover:underline">contact page</a>.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
