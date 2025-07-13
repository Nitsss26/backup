
"use client";

import React, { useState, useEffect } from 'react';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, UserPlus, LogIn, Phone, Key, Shield, User, Mail, Smartphone, Check, Building, GraduationCap, ToggleLeft, ToggleRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/components/AppProviders';
import { useRouter, useSearchParams } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';
import type { User as AppUser } from '@/lib/types';
import type { ConfirmationResult, User as FirebaseUser } from 'firebase/auth';
import { 
  signInWithGoogle, 
  sendOtpToPhone, 
  verifyOtp, 
  signUpWithEmailPassword, 
  sendEmailVerificationLink,
  signInWithEmailPassword
} from '@/lib/firebase';
import { Switch } from '@/components/ui/switch';

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+[1-9]\d{1,14}$/, "Please enter a valid phone number with country code (e.g., +919876543210)."),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  isSeller: z.boolean().default(false),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const loginSchema = z.object({
  emailOrPhone: z.string().min(3, "Please enter a valid email or phone number."),
  password: z.string().min(1, "Password is required."),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;
type LoginFormValues = z.infer<typeof loginSchema>;

export function AuthForm({ mode: initialMode }: { mode: 'login' | 'register' }) {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [mode, setMode] = useState(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  
  const loginForm = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });
  const signUpForm = useForm<SignUpFormValues>({ resolver: zodResolver(signUpSchema), defaultValues: { isSeller: false }});
  
  const roleFromQuery = searchParams.get('role') as 'student' | 'provider' | null;

  useEffect(() => {
    if (roleFromQuery === 'provider') {
      signUpForm.setValue('isSeller', true);
    }
  }, [roleFromQuery, signUpForm]);

  const onLoginSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setIsLoading(true);
    try {
      const firebaseUser = await signInWithEmailPassword(data.emailOrPhone, data.password);
      if (firebaseUser) {
        await login({ firebaseUser });
        toast({ title: "Login Successful", description: "Welcome back!" });
        router.push(searchParams.get('redirect') || '/');
      }
    } catch (error: any) {
      toast({ title: "Login Failed", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const onSignUpSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    setIsLoading(true);
    try {
      const firebaseUser = await signUpWithEmailPassword(data.email, data.password);
      if (firebaseUser) {
        await sendEmailVerificationLink(firebaseUser);

        // Now, we'll login this user to MongoDB in an "unverified" state
        const appUser = await login({ 
            firebaseUser, 
            role: data.isSeller ? 'provider' : 'student',
            isNewUser: true,
            // Pass extra data to store immediately
            name: data.name,
            phone: data.phone,
        });

        if (appUser) {
            toast({
                title: "Account Created!",
                description: "A verification link has been sent to your email. Please verify to continue.",
                duration: 8000
            });
            // Redirect user to a page that tells them to verify their email
            // Or, you can handle this state in the dashboard directly
            router.push('/dashboard/profile'); // A good place to show verification status
        } else {
            throw new Error("Could not sync your account with our database.");
        }
      }
    } catch (error: any) {
      toast({ title: "Sign-Up Failed", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const firebaseUser = await signInWithGoogle();
      if (firebaseUser) {
        await login({ firebaseUser, role: roleFromQuery || 'student' });
        toast({ title: "Sign In Successful", description: "Welcome!" });
        router.push(searchParams.get('redirect') || '/');
      }
    } catch (error: any) {
      toast({ title: "Google Sign-In Failed", description: error.message, variant: "destructive" });
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
            {mode === 'login' ? 'Welcome Back!' : 'Create an Account'}
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground mt-1">
            {mode === 'login' ? 'Sign in to continue your learning journey.' : 'Join our community of learners and educators.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {mode === 'login' ? (
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="emailOrPhone">Email or Phone</Label>
                <Input id="emailOrPhone" {...loginForm.register('emailOrPhone')} placeholder="you@example.com or +91..." />
                {loginForm.formState.errors.emailOrPhone && <p className="text-sm text-destructive">{loginForm.formState.errors.emailOrPhone.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" {...loginForm.register('password')} />
                {loginForm.formState.errors.password && <p className="text-sm text-destructive">{loginForm.formState.errors.password.message}</p>}
              </div>
              <div className="flex items-center justify-end">
                <Button variant="link" size="sm" asChild className="p-0 h-auto text-xs text-primary hover:text-primary/80 font-medium">
                  <Link href="/auth/forgot-password">Forgot Password?</Link>
                </Button>
              </div>
              <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <LogInIcon className="mr-2 h-5 w-5"/>}
                Sign In
              </Button>
            </form>
          ) : ( // Sign Up Form
            <form onSubmit={signUpForm.handleSubmit(onSignUpSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" {...signUpForm.register('name')} placeholder="Priya Sharma" />
                {signUpForm.formState.errors.name && <p className="text-sm text-destructive">{signUpForm.formState.errors.name.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" {...signUpForm.register('email')} placeholder="you@example.com" />
                {signUpForm.formState.errors.email && <p className="text-sm text-destructive">{signUpForm.formState.errors.email.message}</p>}
              </div>
               <div className="space-y-1.5">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" {...signUpForm.register('phone')} placeholder="+919876543210" />
                {signUpForm.formState.errors.phone && <p className="text-sm text-destructive">{signUpForm.formState.errors.phone.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" {...signUpForm.register('password')} />
                    {signUpForm.formState.errors.password && <p className="text-sm text-destructive">{signUpForm.formState.errors.password.message}</p>}
                </div>
                 <div className="space-y-1.5">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" {...signUpForm.register('confirmPassword')} />
                    {signUpForm.formState.errors.confirmPassword && <p className="text-sm text-destructive">{signUpForm.formState.errors.confirmPassword.message}</p>}
                </div>
              </div>
              <Controller
                name="isSeller"
                control={signUpForm.control}
                render={({ field }) => (
                  <div className="flex items-center justify-between p-3 border rounded-md bg-secondary/50">
                    <div className="flex items-center gap-2">
                      {field.value ? <Building className="h-5 w-5 text-primary"/> : <GraduationCap className="h-5 w-5 text-primary"/>}
                       <Label htmlFor="isSeller" className="font-medium cursor-pointer">
                           {field.value ? "I'm signing up as a Seller/Institute" : "I'm signing up as a Student"}
                       </Label>
                    </div>
                    <Switch id="isSeller" checked={field.value} onCheckedChange={field.onChange} />
                  </div>
                )}
               />
              <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <UserPlus className="mr-2 h-5 w-5" />}
                Create Account
              </Button>
            </form>
          )}
          <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">OR CONTINUE WITH</span>
              </div>
          </div>
          <Button onClick={handleGoogleSignIn} variant="outline" className="w-full h-11 text-base" disabled={isLoading}>
              <svg role="img" viewBox="0 0 24 24" className="mr-2 h-4 w-4"><path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 3.28-7.84 3.28-4.74 0-8.28-3.91-8.28-8.28s3.54-8.28 8.28-8.28c2.62 0 4.37 1.02 5.31 1.95l2.42-2.42C19.04 1.82 16.33 0 12.48 0 5.88 0 .02 5.88.02 12.48s5.86 12.48 12.46 12.48c3.54 0 6.28-1.18 8.35-3.37 2.15-2.15 2.84-5.22 2.84-7.38 0-.61-.05-.91-.12-1.24h-11.2z"></path></svg>
               Google
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center p-6 border-t">
            <p className="text-sm text-muted-foreground">
                {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                <Button variant="link" onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="font-semibold text-primary">
                    {mode === 'login' ? 'Sign Up' : 'Sign In'}
                </Button>
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
