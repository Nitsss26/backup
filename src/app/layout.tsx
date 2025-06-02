import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import AppProviders from '@/components/AppProviders'; // For context, theme, etc.

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'EdTechCart - All-in-One Marketplace for Online Courses',
  description: 'Discover, compare, and enroll in the best online courses from top educators.',
  icons: {
    icon: '/favicon.ico', // Placeholder, actual favicon not generated
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Fonts link already present for Inter, no change needed based on instruction to NOT use next/font package for additional fonts.
            If other fonts were requested, their <link> tags would go here.
        */}
      </head>
      <body className={`${inter.variable} font-body antialiased flex flex-col min-h-screen`}>
        <AppProviders>
          {children}
          <Toaster />
        </AppProviders>
      </body>
    </html>
  );
}
