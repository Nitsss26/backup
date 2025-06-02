
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { APP_NAME } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MessageSquare, Users, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function ForumsPage() {
  const forumCategories = [
    { name: "General Discussion", description: "Talk about anything related to online learning.", topics: 120, posts: 1500 },
    { name: "Course Specific Q&A", description: "Ask questions and share insights about specific courses.", topics: 85, posts: 980 },
    { name: "Study Groups", description: "Find or form study groups for courses.", topics: 45, posts: 300 },
    { name: "Career Advice", description: "Discuss career paths and job opportunities.", topics: 60, posts: 750 },
    { name: "Platform Feedback", description: `Share your feedback about ${APP_NAME}.`, topics: 30, posts: 200 },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="bg-primary/10 py-16 md:py-24">
          <div className="container text-center">
            <Users className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">{APP_NAME} Forums</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Connect with fellow learners and instructors. Share knowledge, ask questions, and join discussions.
            </p>
            <form className="max-w-xl mx-auto relative">
              <Input type="search" placeholder="Search forums..." className="h-12 pl-12 text-base" />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 h-9">Search</Button>
            </form>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold font-headline">Forum Categories</h2>
                <Button>Start New Topic</Button>
            </div>
            
            <div className="bg-card rounded-lg shadow-md">
              {forumCategories.map((category, index) => (
                <div key={category.name} className={`p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${index < forumCategories.length - 1 ? 'border-b' : ''}`}>
                  <div>
                    <h3 className="text-xl font-semibold text-primary hover:underline mb-1">
                      <Link href="#">{/* Placeholder link to category */}
                        {category.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground md:text-right shrink-0">
                    <div>
                        <p className="font-medium text-foreground">{category.topics}</p>
                        <p>Topics</p>
                    </div>
                    <div>
                        <p className="font-medium text-foreground">{category.posts}</p>
                        <p>Posts</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-secondary/30 text-center">
            <div className="container">
                <MessageSquare className="h-10 w-10 text-primary mx-auto mb-3"/>
                <h2 className="text-2xl font-bold mb-3 font-headline">Join the Conversation!</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">Sign up or log in to participate in the forums, ask questions, and share your knowledge.</p>
                <div className="flex gap-4 justify-center">
                    <Button asChild><Link href="/auth/login">Login</Link></Button>
                    <Button variant="outline" asChild><Link href="/auth/register">Sign Up</Link></Button>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
