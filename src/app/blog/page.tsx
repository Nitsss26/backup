
"use client";

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { APP_NAME } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Rss, Edit } from 'lucide-react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';

export default function BlogPage() {
  const blogPosts = [
    { id: "1", title: "Top 5 Skills to Learn in 2024 for Career Growth", date: "October 15, 2023", excerpt: "Discover the most in-demand skills that can boost your career prospects in the coming year...", imageUrl: "https://placehold.co/600x400.png", category: "Career Development", dataAiHint: "career skills future" },
    { id: "2", title: "The Ultimate Guide to Choosing an Online Course", date: "October 10, 2023", excerpt: "Not sure how to pick the right online course? This guide will walk you through the key factors to consider...", imageUrl: "https://placehold.co/600x400.png", category: "Learning Tips", dataAiHint: "online course selection" },
    { id: "3", title: "How Online Learning is Shaping the Future of Education", date: "October 05, 2023", excerpt: "Explore the trends and transformations in the education sector driven by online learning platforms.", imageUrl: "https://placehold.co/600x400.png", category: "Education Trends", dataAiHint: "future education online" },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <main className="flex-grow">
        <section className="bg-primary/10 py-16 md:py-24">
          <div className="container text-center">
            <Edit className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">{APP_NAME} Blog</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Insights, tips, and updates on online learning, skill development, and the future of education.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <div key={post.id} className="bg-card rounded-lg shadow-lg overflow-hidden flex flex-col">
                  <Link href={`/blog/${post.id}`}>
                    <Image src={post.imageUrl} alt={post.title} width={600} height={400} className="w-full h-56 object-cover" data-ai-hint={post.dataAiHint} />
                  </Link>
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-sm text-primary font-medium mb-1">{post.category}</p>
                    <h2 className="text-xl font-semibold mb-2 font-headline hover:text-primary transition-colors">
                      <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </h2>
                    <p className="text-sm text-muted-foreground mb-3">{post.date}</p>
                    <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-3">{post.excerpt}</p>
                    <Button variant="outline" asChild className="mt-auto w-fit">
                      <Link href={`/blog/${post.id}`}>Read More</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            {/* Placeholder for Pagination */}
            <div className="mt-12 text-center">
              <Button variant="default" size="lg">Load More Posts</Button>
            </div>
          </div>
        </section>

        <section className="py-12 bg-secondary/30 text-center">
            <div className="container">
                <Rss className="h-10 w-10 text-primary mx-auto mb-3"/>
                <h2 className="text-2xl font-bold mb-3 font-headline">Subscribe to Our Newsletter</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">Get the latest blog posts, course updates, and special offers delivered to your inbox.</p>
                <form className="flex max-w-md mx-auto gap-2">
                    <Input type="email" placeholder="Enter your email" className="flex-1"/>
                    <Button type="submit">Subscribe</Button>
                </form>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
