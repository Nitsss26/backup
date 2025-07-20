
"use client";

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { EbookCard } from '@/components/EbookCard';
import { placeholderEBooks } from '@/lib/ebook-placeholder-data';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export default function EbooksPage() {

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'E-Books' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container py-8 px-4 md:px-6">
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="text-3xl md:text-4xl font-bold mb-8 font-headline text-center">All E-Books</h1>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {placeholderEBooks.map(ebook => (
                <EbookCard key={ebook.id} ebook={ebook} />
            ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
