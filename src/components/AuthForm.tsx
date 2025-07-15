
"use client";

import React, { useState, useEffect } from 'react';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, UserPlus, LogIn } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/components/AppProviders';
import { useRouter, useSearchParams } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function AuthForm({ mode: initialMode }: { mode: 'login' | 'register' }) {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const loginForm = useForm<LoginFormValues>({ 
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'kaushik.learning@example.com', // Default to seller email
    }
  });

  const onLoginSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setIsLoading(true);
    try {
      const user = await login({ email: data.email });
      if (user) {
        toast({ title: "Login Successful", description: `Welcome back, ${user.name}!` });
        const redirectUrl = searchParams.get('redirect');
        if (redirectUrl) {
          router.push(redirectUrl);
        } else {
            const dashboardLink = user.role === 'admin' ? '/admin' : 
                                  user.role === 'provider' ? '/dashboard/seller' : 
                                  '/dashboard/student';
            router.push(dashboardLink);
        }
      } else {
        throw new Error("Login failed. User not found.");
      }
    } catch (error: any) {
      toast({ title: "Login Failed", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/10 p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-xl border-primary/20">
        <CardHeader className="text-center p-6 pb-4">
          <Image src="/logoo.png" alt={APP_NAME} width={150} height={50} className="mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold font-headline text-primary">
            Sign In
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground mt-1">
            Enter an email from our records to log in.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" {...loginForm.register('email')} placeholder="you@example.com" />
                {loginForm.formState.errors.email && <p className="text-sm text-destructive">{loginForm.formState.errors.email.message}</p>}
              </div>
              <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <LogIn className="mr-2 h-5 w-5"/>}
                Sign In
              </Button>
            </form>
        </CardContent>
        <CardFooter className="flex justify-center p-6 border-t">
            <p className="text-sm text-muted-foreground">
                This is a simplified login for demonstration.
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
