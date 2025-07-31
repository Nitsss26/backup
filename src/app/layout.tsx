
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import AppProviders from '@/components/AppProviders';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
title: 'EdTechCart - All-in-One Marketplace and Premier Educational Mall',
description: 'Explore, purchase, and subscribe to a wide range of old books, new books, online courses, and subscriptions, all under one roof at the ultimate educational marketplace.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-body antialiased flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <AppProviders>
            {children}
            <AnalyticsTracker />
            <Toaster />
          </AppProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
