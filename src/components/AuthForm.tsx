
"use client";

import React, { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, KeyRound, UserPlusIcon, LogInIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/components/AppProviders';
import { useRouter, useSearchParams } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';
import type { User as AppUser } from '@/lib/types';
import axios from 'axios';

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
  role: z.enum(['student', 'provider']).default('student'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

interface AuthFormProps {
  mode: 'login' | 'register';
}

export function AuthForm({ mode }: AuthFormProps) {
  const isLoginMode = mode === 'login';
  const schema = isLoginMode ? loginSchema : registerSchema;
  type FormValues = typeof schema extends typeof loginSchema ? LoginFormValues : RegisterFormValues;

  const { register: registerAuth, login: loginAuth } = useAuth();
  const router = useRouter();
  const searchParamsHook = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const roleFromQuery = searchParamsHook.get('role') as 'student' | 'provider' | null;

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: isLoginMode ? {} : { role: roleFromQuery || 'student' } as Partial<RegisterFormValues>,
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    try {
      let authenticatedUser: AppUser | null = null;

      if (isLoginMode) {
        authenticatedUser = await loginAuth({ email: (data as LoginFormValues).email, password: (data as LoginFormValues).password });
        if (authenticatedUser) {
          toast({ title: "Login Successful", description: "Welcome back!" });
          try {
            await axios.post('/api/track/user-action', {
              userId: authenticatedUser.id,
              actionType: 'login',
              details: { email: authenticatedUser.email },
            });
          } catch (trackingError) {
            console.error("Failed to track login action:", trackingError);
          }
        } else {
          throw new Error("Login failed. Please check your credentials.");
        }
      } else {
        const registerData = data as RegisterFormValues;
        authenticatedUser = await registerAuth({ name: registerData.name, email: registerData.email, password: registerData.password, role: registerData.role });
        if (authenticatedUser) {
          toast({ title: "Registration Successful", description: `Welcome to ${APP_NAME}!` });
          try {
            await axios.post('/api/track/user-action', {
              userId: authenticatedUser.id,
              actionType: 'signup',
              details: { email: authenticatedUser.email, role: authenticatedUser.role },
            });
          } catch (trackingError) {
            console.error("Failed to track signup action:", trackingError);
          }
        } else {
          throw new Error("Registration failed. Please try again.");
        }
      }

      const redirectPath = searchParamsHook.get('redirect');
      if (redirectPath) {
        router.push(redirectPath);
      } else if (authenticatedUser) {
        if (authenticatedUser.role === 'admin') router.push('/admin');
        else if (authenticatedUser.role === 'provider') router.push('/dashboard/seller');
        else router.push('/dashboard/student');
      } else {
        router.push('/');
      }

    } catch (error: any) {
      toast({
        title: "Authentication Failed",
        description: error.message || `An error occurred during ${mode}.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/20 p-4 md:p-8">
      <Card className="w-full max-w-4xl shadow-2xl rounded-xl md:grid md:grid-cols-2 md:gap-0 overflow-hidden border-primary/20">
        <div className="hidden md:block relative">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c7da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Learning community engaging with technology"
            width={600}
            height={800}
            className="object-cover w-full h-full"
            priority
            data-ai-hint="secure login community learning platform interface students technology"
          />
          <div className="absolute inset-0 bg-primary/30 mix-blend-multiply"></div>
           <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
            <h2 className="text-3xl font-bold mb-3 leading-tight font-headline">Unlock Your Potential with {APP_NAME}</h2>
            <p className="text-base opacity-90">
              {isLoginMode ? "Access a world of knowledge and opportunities. Your learning journey continues here." : "Join a vibrant community of learners and educators. Start your adventure today!"}
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
          <CardHeader className="text-center md:text-left p-0 mb-6">
            <div className="mx-auto md:mx-0 mb-3 inline-block p-3 bg-primary/10 rounded-full">
              {isLoginMode ? <LogInIcon className="h-8 w-8 text-primary" /> : <UserPlusIcon className="h-8 w-8 text-primary" />}
            </div>
            <CardTitle className="text-3xl font-bold font-headline text-primary">{isLoginMode ? 'Welcome Back!' : 'Create Your Account'}</CardTitle>
            <CardDescription className="text-base text-muted-foreground mt-1">
              {isLoginMode ? `Sign in to continue your learning journey on ${APP_NAME}.` : `Join ${APP_NAME} to access thousands of courses or start selling.`}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {!isLoginMode && (
                <>
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" type="text" {...register('name' as any)} placeholder="Enter your full name" />
                    {errors.name && <p className="text-sm text-destructive">{(errors.name as any).message}</p>}
                  </div>
                  <div className="space-y-1.5">
                      <Label htmlFor="role">I want to:</Label>
                      <select 
                          id="role" 
                          {...register('role' as any)} 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          defaultValue={roleFromQuery || 'student'}
                      >
                          <option value="student">Learn - Enroll in Courses</option>
                          <option value="provider">Sell - Offer Courses</option>
                      </select>
                      {(errors as any).role && <p className="text-sm text-destructive">{(errors as any).role.message}</p>}
                  </div>
                </>
              )}
              <div className="space-y-1.5">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" {...register('email')} placeholder="email@example.com" />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" {...register('password')} placeholder="Enter your password" />
                {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
              </div>
              {!isLoginMode && (
                <div className="space-y-1.5">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" {...register('confirmPassword' as any)} placeholder="Confirm your password" />
                  {errors.confirmPassword && <p className="text-sm text-destructive">{(errors.confirmPassword as any).message}</p>}
                </div>
              )}
              {isLoginMode && (
                <div className="text-right">
                  <Button variant="link" size="sm" asChild className="p-0 h-auto text-primary hover:text-primary/80 font-medium">
                    <Link href="/auth/forgot-password">Forgot password?</Link>
                  </Button>
                </div>
              )}
              <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                {isLoginMode ? 'Sign In' : 'Create Account'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-2 mt-6 p-0">
            <div className="text-sm text-muted-foreground">
              {isLoginMode ? "Don't have an account?" : 'Already have an account?'}
              <Button variant="link" asChild className="ml-1 p-0 h-auto text-primary hover:text-primary/80 font-medium">
                <Link href={isLoginMode ? `/auth/register${roleFromQuery ? `?role=${roleFromQuery}` : ''}` : '/auth/login'}>
                  {isLoginMode ? 'Sign Up' : 'Sign In'}
                </Link>
              </Button>
            </div>
             <Button variant="link" size="sm" asChild className="mt-4 text-xs text-muted-foreground hover:text-primary">
                <Link href="/">← Back to Home</Link>
            </Button>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}

    