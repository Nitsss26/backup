
"use client";

import React, { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
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
import axios from 'axios';

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export function AuthForm({ mode: initialMode }: { mode: 'login' | 'register' }) {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [mode, setMode] = useState(initialMode);
  const [isLoading, setIsLoading] = useState(false);

  const loginForm = useForm<LoginFormValues>({ 
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'kaushik.learning@example.com',
      password: 'password123',
    }
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onLoginSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setIsLoading(true);
    try {
      const user = await login({ email: data.email, password: data.password });
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
      }
    } catch (error: any) {
      toast({ title: "Login Failed", description: error.message || "Invalid credentials. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };
  
  const onRegisterSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/users', data);
      if (response.status === 201) {
        toast({ title: "Registration Successful", description: "You can now log in with your credentials." });
        setMode('login'); // Switch to login form after successful registration
        loginForm.reset({ email: data.email, password: '' });
      }
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.response?.data?.message || "An error occurred. Please try again.",
        variant: "destructive"
      });
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
            {mode === 'login' ? 'Sign In' : 'Create an Account'}
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground mt-1">
            {mode === 'login' ? 'Enter your credentials to access your account.' : `Join ${APP_NAME} to start your learning journey.`}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {mode === 'login' ? (
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="login-email">Email</Label>
                <Input id="login-email" {...loginForm.register('email')} placeholder="you@example.com" />
                {loginForm.formState.errors.email && <p className="text-sm text-destructive">{loginForm.formState.errors.email.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="login-password">Password</Label>
                <Input id="login-password" type="password" {...loginForm.register('password')} placeholder="••••••••" />
                {loginForm.formState.errors.password && <p className="text-sm text-destructive">{loginForm.formState.errors.password.message}</p>}
              </div>
              <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <LogIn className="mr-2 h-5 w-5"/>}
                Sign In
              </Button>
            </form>
          ) : (
            <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="register-name">Full Name</Label>
                <Input id="register-name" {...registerForm.register('name')} placeholder="Priya Sharma" />
                {registerForm.formState.errors.name && <p className="text-sm text-destructive">{registerForm.formState.errors.name.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="register-email">Email</Label>
                <Input id="register-email" {...registerForm.register('email')} placeholder="you@example.com" />
                {registerForm.formState.errors.email && <p className="text-sm text-destructive">{registerForm.formState.errors.email.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="register-password">Password</Label>
                <Input id="register-password" type="password" {...registerForm.register('password')} placeholder="6+ characters" />
                {registerForm.formState.errors.password && <p className="text-sm text-destructive">{registerForm.formState.errors.password.message}</p>}
              </div>
              <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <UserPlus className="mr-2 h-5 w-5"/>}
                Create Account
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-center p-6 border-t gap-2">
            <Button variant="link" onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="p-0 h-auto text-primary hover:text-primary/80 font-medium">
              {mode === 'login' ? 'Don\'t have an account? Sign Up' : 'Already have an account? Sign In'}
            </Button>
            {mode === 'login' && (
              <Link href="/auth/forgot-password" className="text-sm text-muted-foreground hover:text-primary">
                Forgot your password?
              </Link>
            )}
        </CardFooter>
      </Card>
    </div>
  );
}
