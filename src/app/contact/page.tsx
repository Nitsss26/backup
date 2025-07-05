
"use client";

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { APP_NAME } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, MessageSquare, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

const contactSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject is too short"),
  message: z.string().min(10, "Message is too short"),
});
type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log(data); // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Thanks for contacting us. We'll get back to you soon.",
    });
    reset();
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <main className="flex-grow">
        <section className="bg-primary/10 py-16 md:py-8">
          <div className="container text-center">
            <Mail className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Contact Us</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions or need support? We're here to help. Reach out to us through the form below or via our contact details.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container grid md:grid-cols-2 gap-12 items-start">
            <div className="bg-card p-8 pb-14 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6 font-headline">Send us a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 ">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" {...register("name")} />
                  {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" {...register("email")} />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" {...register("subject")} />
                  {errors.subject && <p className="text-sm text-destructive mt-1">{errors.subject.message}</p>}
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" rows={5} {...register("message")} />
                  {errors.message && <p className="text-sm text-destructive mt-1">{errors.message.message}</p>}
                </div>
                <Button type="submit" className="w-full mt-20">Send Message</Button>
              </form>
            </div>
            <div className="space-y-8">
              <div className="flex gap-24">

              <div>
                <h3 className="text-xl font-semibold mb-3 font-headline flex items-center"><Phone className="mr-2 h-5 w-5 text-primary"/> Phone Support</h3>
                <p className="text-muted-foreground">For urgent inquiries, call us at:</p>
                <a href="tel:+917009090762" className="text-primary text-lg hover:underline">+91 700-909-0762</a>
                <p className="text-xs text-muted-foreground">(Mon-Fri, 9 AM - 11 PM EST)</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 font-headline flex items-center"><MessageSquare className="mr-2 h-5 w-5 text-primary"/> General Inquiries</h3>
                <p className="text-muted-foreground">Email us directly at:</p>
                <a href="mailto:support@edtechcart.com" className="text-primary text-lg hover:underline">support@edtechcart.com</a>
              </div>
              </div>
              <div className="mt-6">
  <Image 
    src="https://img.freepik.com/free-vector/customer-support-illustration_23-2148903319.jpg?uid=R120730963&ga=GA1.1.1385959138.1748893744&semt=ais_hybrid&w=740" 
    alt="Customer support representative illustration" 
    width={600} 
    height={500} 
    className="rounded-lg shadow-md h-[500px] object-cover" 
    data-ai-hint="customer support contact" 
  />
</div>
          
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
