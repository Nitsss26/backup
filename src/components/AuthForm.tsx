
"use client";

import React, { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/components/AppProviders';
import { useRouter, useSearchParams } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';
import type { User as AppUser } from '@/lib/types'; // Import AppUser type

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
        } else {
          throw new Error("Login failed. Please check your credentials.");
        }
      } else {
        const registerData = data as RegisterFormValues;
        authenticatedUser = await registerAuth({ name: registerData.name, email: registerData.email, password: registerData.password, role: registerData.role });
        if (authenticatedUser) {
          toast({ title: "Registration Successful", description: `Welcome to ${APP_NAME}!` });
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
        router.push('/'); // Fallback
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
    <div className="flex items-center justify-center min-h-screen bg-secondary/50 p-4">
      <Card className="w-full max-w-md shadow-xl border-primary/30">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold font-headline text-primary">{isLoginMode ? 'Welcome Back!' : 'Create an Account'}</CardTitle>
          <CardDescription>
            {isLoginMode ? `Sign in to continue your learning journey on ${APP_NAME}.` : `Join ${APP_NAME} to access thousands of courses or start selling.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {!isLoginMode && (
              <>
                <div className="space-y-1">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" type="text" {...register('name' as any)} placeholder="Priya Sharma" />
                  {errors.name && <p className="text-sm text-destructive">{(errors.name as any).message}</p>}
                </div>
                <div className="space-y-1">
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
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register('email')} placeholder="you@example.com" />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register('password')} placeholder="••••••••" />
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>
            {!isLoginMode && (
              <div className="space-y-1">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" {...register('confirmPassword' as any)} placeholder="••••••••" />
                {errors.confirmPassword && <p className="text-sm text-destructive">{(errors.confirmPassword as any).message}</p>}
              </div>
            )}
            {isLoginMode && (
              <div className="text-right">
                <Button variant="link" size="sm" asChild className="p-0 h-auto text-primary hover:text-primary/80">
                  <Link href="/auth/forgot-password">Forgot password?</Link>
                </Button>
              </div>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoginMode ? 'Sign In' : 'Create Account'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <div className="text-sm text-muted-foreground">
            {isLoginMode ? "Don't have an account?" : 'Already have an account?'}
            <Button variant="link" asChild className="ml-1 p-0 h-auto text-primary hover:text-primary/80">
              <Link href={isLoginMode ? `/auth/register${roleFromQuery ? `?role=${roleFromQuery}` : ''}` : '/auth/login'}>
                {isLoginMode ? 'Sign Up' : 'Sign In'}
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
