
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google'; // Changed back to Poppins
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import AppProviders from '@/components/AppProviders';
import { ThemeProvider } from "@/components/ThemeProvider";

// Configure Poppins font
const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700', '800'], // Common weights for Poppins
  variable: '--font-poppins' // Define CSS variable
});

export const metadata: Metadata = {
  title: 'EdTechCart - All-in-One Marketplace for Online Courses',
  description: 'Discover, compare, and enroll in the best online courses from top educators.',
  icons: {
    icon: '/favicon.ico',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-body antialiased flex flex-col min-h-screen`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <AppProviders>
            {children}
            <Toaster />
          </AppProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
