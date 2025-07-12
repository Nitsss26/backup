
"use client";

import React, { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, UserPlusIcon, LogInIcon, Phone, Key, Shield, User, Mail, Smartphone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/components/AppProviders';
import { useRouter, useSearchParams } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';
import type { User as AppUser } from '@/lib/types';
import type { ConfirmationResult } from 'firebase/auth';
import { signInWithGoogle, sendOtpToPhone, verifyOtp } from '@/lib/firebase';

const phoneSchema = z.object({
  phone: z.string().regex(/^\+[1-9]\d{1,14}$/, "Please enter a valid phone number with country code (e.g., +919876543210)."),
});

const otpSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits"),
});

type PhoneFormValues = z.infer<typeof phoneSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;

export function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [authStep, setAuthStep] = useState<'method' | 'phone' | 'otp'>('method');
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  const phoneForm = useForm<PhoneFormValues>({ resolver: zodResolver(phoneSchema) });
  const otpForm = useForm<OtpFormValues>({ resolver: zodResolver(otpSchema) });

  const roleFromQuery = (searchParams.get('role') as 'student' | 'provider' | null) || 'student';

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const firebaseUser = await signInWithGoogle();
      if (firebaseUser) {
        await login({ firebaseUser, role: roleFromQuery, isNewUser: !firebaseUser.metadata.lastSignInTime });
        toast({ title: "Sign In Successful", description: "Welcome back!" });
        router.push(searchParams.get('redirect') || '/');
      }
    } catch (error: any) {
      toast({ title: "Google Sign-In Failed", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const onPhoneSubmit: SubmitHandler<PhoneFormValues> = async (data) => {
    setIsLoading(true);
    try {
      setPhoneNumber(data.phone);
      const result = await sendOtpToPhone(data.phone);
      setConfirmationResult(result);
      setAuthStep('otp');
      toast({ title: "OTP Sent", description: `An OTP has been sent to ${data.phone}.` });
    } catch (error: any) {
      toast({ title: "Failed to Send OTP", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const onOtpSubmit: SubmitHandler<OtpFormValues> = async (data) => {
    if (!confirmationResult) {
      toast({ title: "Error", description: "Confirmation result not found. Please try again.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      const firebaseUser = await verifyOtp(confirmationResult, data.otp);
      if (firebaseUser) {
        await login({ firebaseUser, role: roleFromQuery, isNewUser: !firebaseUser.metadata.lastSignInTime });
        toast({ title: "Sign In Successful", description: "Welcome!" });
        router.push(searchParams.get('redirect') || '/');
      }
    } catch (error: any) {
      toast({ title: "OTP Verification Failed", description: "The OTP you entered is incorrect. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/10 to-primary/5 p-4">
      <Card className="w-full max-w-lg shadow-xl rounded-xl border">
        <CardHeader className="text-center p-6">
          <div className="mx-auto mb-3 inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl">
            <LogInIcon className="h-7 w-7 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">Sign In / Sign Up</CardTitle>
          <CardDescription className="text-muted-foreground">Welcome to {APP_NAME}. Choose your sign-in method.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {authStep === 'method' && (
            <div className="space-y-4">
              <Button onClick={handleGoogleSignIn} variant="outline" className="w-full h-12 text-base" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-5 w-5" />} Continue with Google
              </Button>
              <Button onClick={() => setAuthStep('phone')} className="w-full h-12 text-base" disabled={isLoading}>
                <Smartphone className="mr-2 h-5 w-5" /> Continue with Phone
              </Button>
            </div>
          )}
          {authStep === 'phone' && (
            <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" {...phoneForm.register('phone')} placeholder="+91 98765 43210" />
                {phoneForm.formState.errors.phone && <p className="text-sm text-destructive">{phoneForm.formState.errors.phone.message}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Send OTP'}
              </Button>
              <Button variant="link" onClick={() => setAuthStep('method')}>Back</Button>
            </form>
          )}
          {authStep === 'otp' && (
            <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="otp">Enter OTP sent to {phoneNumber}</Label>
                <Input id="otp" {...otpForm.register('otp')} placeholder="••••••" maxLength={6} />
                {otpForm.formState.errors.otp && <p className="text-sm text-destructive">{otpForm.formState.errors.otp.message}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Verify OTP'}
              </Button>
              <Button variant="link" onClick={() => setAuthStep('phone')}>Change Number</Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex-col p-6 border-t">
          <p className="text-xs text-muted-foreground text-center">
            By continuing, you agree to EdTechCart's <Link href="/terms" className="underline hover:text-primary">Terms of Service</Link> and <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
          </p>
          <div id="recaptcha-container"></div>
        </CardFooter>
      </Card>
    </div>
  );
}
