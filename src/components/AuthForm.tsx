
"use client";

import React, { useState, useEffect } from 'react';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, UserPlus, LogIn, Key, Shield, User, Mail, Smartphone, Check, Building, GraduationCap, ToggleLeft, ToggleRight, Phone, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/components/AppProviders';
import { useRouter, useSearchParams } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';
import type { FirebaseUser, ConfirmationResult } from 'firebase/auth';
import { 
  signUpWithEmailPassword, 
  sendEmailVerificationLink,
  signInWithEmailPassword,
  sendOtpToPhone,
  verifyOtp,
  setupRecaptcha,
} from '@/lib/firebase';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\d{10}$/, "Please enter a valid 10-digit phone number."),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  isSeller: z.boolean().default(false),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
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
  const [authStep, setAuthStep] = useState<'details' | 'verifyOtp' | 'verified'>('details');
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [pendingSignUpData, setPendingSignUpData] = useState<SignUpFormValues | null>(null);
  const [otp, setOtp] = useState('');

  const loginForm = useForm<LoginFormValues>({ 
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const signUpForm = useForm<SignUpFormValues>({ 
    resolver: zodResolver(signUpSchema), 
    defaultValues: { 
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      isSeller: false 
    }
  });
  
  const roleFromQuery = searchParams.get('role') as 'student' | 'provider' | null;

  useEffect(() => {
    if (roleFromQuery === 'provider' && mode === 'register') {
      signUpForm.setValue('isSeller', true);
    }
  }, [roleFromQuery, mode, signUpForm]);

  const onLoginSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setIsLoading(true);
    try {
      const firebaseUser = await signInWithEmailPassword(data.email, data.password);
      if (firebaseUser) {
        if (!firebaseUser.emailVerified) {
          toast({
            title: "Email Not Verified",
            description: "Please check your inbox for a verification link.",
            variant: "destructive"
          });
          await sendEmailVerificationLink(firebaseUser);
          setIsLoading(false);
          return;
        }
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
      const appVerifier = setupRecaptcha('recaptcha-container');
      if (!appVerifier) {
        throw new Error("Could not set up reCAPTCHA. Please ensure the container element exists.");
      }
      const phoneNumber = `+91${data.phone}`;
      const confirmation = await sendOtpToPhone(phoneNumber, appVerifier);
      setConfirmationResult(confirmation);
      setPendingSignUpData(data);
      setAuthStep('verifyOtp');
      toast({ title: "OTP Sent", description: "Please check your phone for the verification code." });
    } catch (error: any) {
      toast({ title: "Failed to Send OTP", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const onOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || !confirmationResult || !pendingSignUpData) {
      toast({ title: "Error", description: "Something went wrong. Please try signing up again.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      // Step 1: Verify the phone OTP. This signs the user into Firebase Phone Auth.
      const phoneUserCredential = await confirmationResult.confirm(otp);
      
      if(phoneUserCredential.user) {
          // Step 2: Now that phone is verified, create the final account with Email/Password.
          const { email, password, name, isSeller, phone } = pendingSignUpData;
          const finalUser = await signUpWithEmailPassword(email, password);
          
          if (finalUser) {
            // Step 3: Send the email verification link.
            await sendEmailVerificationLink(finalUser);

            // Step 4: Create the user in our MongoDB database via our API
            await login({
              firebaseUser: finalUser,
              role: isSeller ? 'provider' : 'student',
              isNewUser: true,
              name: name,
              phone: `+91${phone}`,
            });

            // Step 5: Show success and move to the next step in the UI
            setAuthStep('verified');
          } else {
             throw new Error("Could not finalize account creation with email and password.");
          }
      }
    } catch (error: any) {
      toast({ title: "OTP Verification Failed", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (authStep === 'verified') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/10 p-4">
        <Card className="w-full max-w-md shadow-2xl rounded-xl border-primary/20">
          <CardHeader className="text-center p-6">
            <Check className="h-12 w-12 text-green-500 mx-auto mb-4"/>
            <CardTitle className="text-2xl font-bold font-headline text-primary">Registration Successful!</CardTitle>
            <CardDescription className="text-base text-muted-foreground mt-2">
              Your account has been created. A verification link has been sent to your email. Please verify your email to complete the process.
            </CardDescription>
          </CardHeader>
          <CardFooter className="p-6">
            <Button className="w-full" onClick={() => router.push('/auth/login')}>
              Proceed to Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (authStep === 'verifyOtp') {
     return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/10 p-4">
        <Card className="w-full max-w-md shadow-2xl rounded-xl border-primary/20">
          <CardHeader className="text-center p-6 pb-4">
            <Smartphone className="h-12 w-12 text-primary mx-auto mb-4"/>
            <CardTitle className="text-2xl font-bold font-headline text-primary">Verify Your Phone</CardTitle>
            <CardDescription className="text-base text-muted-foreground mt-2">
              Enter the 6-digit code sent to your mobile number to complete your registration.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <form onSubmit={onOtpSubmit} className="space-y-4">
                <div className="space-y-1.5">
                    <Label htmlFor="otp">Verification Code</Label>
                    <Input id="otp" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter 6-digit OTP" maxLength={6} />
                </div>
                 <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Check className="mr-2 h-5 w-5"/>}
                    Verify & Create Account
                </Button>
             </form>
          </CardContent>
           <CardFooter className="flex justify-center p-6 border-t">
              <Button variant="link" onClick={() => setAuthStep('details')} className="text-muted-foreground text-sm">
                <ArrowLeft className="h-4 w-4 mr-1"/> Back to details
              </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/10 p-4">
       <div id="recaptcha-container" className="fixed bottom-0 right-0"></div>
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
                <Label htmlFor="email">Email</Label>
                <Input id="email" {...loginForm.register('email')} placeholder="you@example.com" />
                {loginForm.formState.errors.email && <p className="text-sm text-destructive">{loginForm.formState.errors.email.message}</p>}
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
                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <LogIn className="mr-2 h-5 w-5"/>}
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
                <div className="flex items-center">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm h-10">+91</span>
                    <Input id="phone" {...signUpForm.register('phone')} placeholder="9876543210" className="rounded-l-none" />
                </div>
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
        </CardContent>
        <CardFooter className="flex justify-center p-6 border-t">
            <p className="text-sm text-muted-foreground">
                {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                <Button variant="link" onClick={() => {
                  setMode(mode === 'login' ? 'register' : 'login');
                  setAuthStep('details'); 
                  }} className="font-semibold text-primary">
                    {mode === 'login' ? 'Sign Up' : 'Sign In'}
                </Button>
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
