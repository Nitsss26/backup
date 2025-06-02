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
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
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
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    try {
      if (isLoginMode) {
        await loginAuth({ email: (data as LoginFormValues).email, password: (data as LoginFormValues).password });
        toast({ title: "Login Successful", description: "Welcome back!" });
        router.push('/dashboard/student'); // Or redirect based on role
      } else {
        await registerAuth({ name: (data as RegisterFormValues).name, email: (data as RegisterFormValues).email, password: (data as RegisterFormValues).password });
        toast({ title: "Registration Successful", description: "Welcome to EdTechCart!" });
        router.push('/dashboard/student'); // Or redirect based on role
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
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold font-headline">{isLoginMode ? 'Welcome Back!' : 'Create an Account'}</CardTitle>
          <CardDescription>
            {isLoginMode ? 'Sign in to continue your learning journey.' : 'Join EdTechCart to access thousands of courses.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {!isLoginMode && (
              <div className="space-y-1">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" {...register('name' as any)} placeholder="John Doe" />
                {errors.name && <p className="text-sm text-destructive">{(errors.name as any).message}</p>}
              </div>
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
                <Button variant="link" size="sm" asChild className="p-0 h-auto">
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
            <Button variant="link" asChild className="ml-1 p-0 h-auto">
              <Link href={isLoginMode ? '/auth/register' : '/auth/login'}>
                {isLoginMode ? 'Sign Up' : 'Sign In'}
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
