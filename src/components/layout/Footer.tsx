import Link from 'next/link';
import { GraduationCap, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { APP_NAME, FOOTER_LINKS } from '@/lib/constants';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12 px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="font-bold text-2xl text-primary">{APP_NAME}</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Empowering learners and educators worldwide. Discover your next skill with {APP_NAME}.
            </p>
            <div className="flex gap-3 mt-4">
              <Link href="#" aria-label="Facebook"><Facebook className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
              <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
              <Link href="#" aria-label="LinkedIn"><Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
              <Link href="#" aria-label="Instagram"><Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              {FOOTER_LINKS.company.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">For Sellers</h3>
            <ul className="space-y-2 text-sm">
                 <li>
                  <Link href="/sell-courses" className="text-muted-foreground hover:text-primary transition-colors">
                    Sell on {APP_NAME}
                  </Link>
                </li>
                <li>
                  <Link href="/help/seller-verification" className="text-muted-foreground hover:text-primary transition-colors">
                    Seller Verification
                  </Link>
                </li>
                 <li>
                  <Link href="/help/seller-faq" className="text-muted-foreground hover:text-primary transition-colors"> {/* Placeholder FAQ */}
                    Seller FAQ
                  </Link>
                </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              {FOOTER_LINKS.support.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
        <div className="mt-10 border-t pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
