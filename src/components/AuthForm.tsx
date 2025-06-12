"use client";

import React, { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, UserPlusIcon, LogInIcon, Eye, EyeOff, Mail, Lock, User, Shield } from 'lucide-react';
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/10 to-primary/5 dark:from-background dark:via-secondary/5 dark:to-primary/10 p-4">
      <Card className="w-full max-w-5xl shadow-xl rounded-xl md:grid md:grid-cols-5 overflow-hidden border dark:border-border">
        {/* Left Side - Image and Content */}
        <div className="hidden md:flex md:col-span-3 relative overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Professional learning environment with diverse students collaborating"
            width={800}
            height={600}
            className="object-cover w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-secondary/70"></div>
          
          {/* Floating Elements */}
          <div className="absolute top-6 left-6 w-12 h-12 bg-white/10 rounded-full blur-lg"></div>
          <div className="absolute top-16 right-12 w-6 h-6 bg-yellow-400/20 rounded-full blur-sm"></div>
          <div className="absolute bottom-20 left-12 w-8 h-8 bg-pink-400/15 rounded-full blur-md"></div>
          
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-8">
            <div className="mb-6 p-4 bg-white/10 rounded-full backdrop-blur-sm">
              <Shield className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-white leading-tight">
              {isLoginMode ? "Welcome Back to" : "Join"} <span className="text-yellow-300">{APP_NAME}</span>
            </h2>
            <p className="text-lg text-white/90 mb-6 leading-relaxed max-w-sm">
              {isLoginMode 
                ? "Continue your learning journey with expert instructors." 
                : "Transform your future with our comprehensive learning platform."}
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Secure Platform</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Expert Instructors</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:col-span-2 p-6 md:p-8 flex flex-col justify-center bg-card">
          <CardHeader className="text-center md:text-left p-0 mb-6">
            <div className="mx-auto md:mx-0 mb-3 inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl">
              {isLoginMode ? <LogInIcon className="h-6 w-6 text-primary" /> : <UserPlusIcon className="h-6 w-6 text-primary" />}
            </div>
            <CardTitle className="text-2xl font-bold text-foreground mb-1">
              {isLoginMode ? 'Welcome Back!' : 'Create Account'}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {isLoginMode 
                ? `Sign in to access your ${APP_NAME} dashboard` 
                : `Join ${APP_NAME} to start learning`}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {!isLoginMode && (
                <>
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Full Name
                    </Label>
                    <Input 
                      id="name" 
                      type="text" 
                      {...register('name' as any)} 
                      placeholder="Enter your full name"
                      className="h-10"
                    />
                    {errors.name && <p className="text-sm text-destructive flex items-center gap-1">
                      <span className="w-1 h-1 bg-destructive rounded-full"></span>
                      {(errors.name as any).message}
                    </p>}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="role" className="text-sm font-medium flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Account Type
                    </Label>
                    <select 
                      id="role" 
                      {...register('role' as any)} 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      defaultValue={roleFromQuery || 'student'}
                    >
                      <option value="student">🎓 Student - Learn & Grow</option>
                      <option value="provider">👨‍🏫 Instructor - Teach & Share</option>
                    </select>
                    {(errors as any).role && <p className="text-sm text-destructive flex items-center gap-1">
                      <span className="w-1 h-1 bg-destructive rounded-full"></span>
                      {(errors as any).role.message}
                    </p>}
                  </div>
                </>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  {...register('email')} 
                  placeholder="Enter you email"
                  className="h-10"
                />
                {errors.email && <p className="text-sm text-destructive flex items-center gap-1">
                  <span className="w-1 h-1 bg-destructive rounded-full"></span>
                  {errors.email.message}
                </p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Password
                </Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    {...register('password')} 
                    placeholder="Enter your password"
                    className="h-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-destructive flex items-center gap-1">
                  <span className="w-1 h-1 bg-destructive rounded-full"></span>
                  {errors.password.message}
                </p>}
              </div>

              {!isLoginMode && (
                <div className="space-y-1.5">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input 
                      id="confirmPassword" 
                      type={showConfirmPassword ? "text" : "password"} 
                      {...register('confirmPassword' as any)} 
                      placeholder="Confirm your password"
                      className="h-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-sm text-destructive flex items-center gap-1">
                    <span className="w-1 h-1 bg-destructive rounded-full"></span>
                    {(errors.confirmPassword as any).message}
                  </p>}
                </div>
              )}

              {isLoginMode && (
                <div className="text-right">
                  <Button variant="link" size="sm" asChild className="p-0 h-auto text-primary hover:text-primary/80 font-medium">
                    <Link href="/auth/forgot-password">Forgot password?</Link>
                  </Button>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-10 font-medium" 
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoginMode ? 'Sign In' : 'Create Account'}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col items-center space-y-3 mt-6 p-0">
            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                {isLoginMode ? "Don't have an account?" : 'Already have an account?'}
              </span>
              <Button variant="link" asChild className="ml-1 p-0 h-auto text-primary hover:text-primary/80 font-medium">
                <Link href={isLoginMode ? `/auth/register${roleFromQuery ? `?role=${roleFromQuery}` : ''}` : '/auth/login'}>
                  {isLoginMode ? 'Sign Up' : 'Sign In'}
                </Link>
              </Button>
            </div>
            
            <Button variant="link" size="sm" asChild className="text-muted-foreground hover:text-foreground transition-colors">
              <Link href="/">← Back to Home</Link>
            </Button>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}