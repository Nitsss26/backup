
"use client";

import React, { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import emailjs from 'emailjs-com';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Mail, KeyRound, ShieldQuestion } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { APP_NAME } from '@/lib/constants';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

// Step 1: Enter email
const emailSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

// Step 2: Enter OTP and new password
const resetSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});


type EmailFormValues = z.infer<typeof emailSchema>;
type ResetFormValues = z.infer<typeof resetSchema>;

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1 for email, 2 for OTP/reset
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
  });

  const resetForm = useForm<ResetFormValues>({
      resolver: zodResolver(resetSchema),
  });

  const sendOtpEmail = async (userEmail: string, userName: string) => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    
    const templateParams = {
        name: userName, // Assuming name is not available, using email instead
        email: userEmail,
        otp: newOtp
    };

    try {
      await emailjs.send(
        'service_28cc2rw', // Your Service ID
        'template_gc6r48o', // Your Template ID
        templateParams,
        'g1Wv1-bHMbYU_OURY' // Your Public Key
      );
      toast({ 
        title: "Verification Email Sent",
        description: `An OTP has been sent to ${userEmail}. Please check your inbox.`,
      });
      setStep(2); // Move to OTP step
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast({
        title: "Failed to Send Email",
        description: "There was an error sending the verification email. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleEmailSubmit: SubmitHandler<EmailFormValues> = async (data) => {
    setIsLoading(true);
    setEmail(data.email);
    // In a real app, you'd first check if the user exists.
    // For now, we'll just send the email.
    await sendOtpEmail(data.email, data.email);
    setIsLoading(false);
  };
  
  const handleResetSubmit: SubmitHandler<ResetFormValues> = async (data) => {
      if(otp !== generatedOtp) {
          toast({ title: "Invalid OTP", description: "The OTP you entered is incorrect. Please try again.", variant: "destructive" });
          return;
      }
      setIsLoading(true);
      console.log("Password reset for:", email, "New password:", data.password);
      // Mock API call to reset password
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({ title: "Password Reset Successfully", description: "You can now log in with your new password." });
      setIsLoading(false);
      router.push('/auth/login');
  };

  const router = useRouter();


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/20 p-4 md:p-8 w-full">
      <Card className="w-full max-w-4xl shadow-2xl rounded-xl md:grid md:grid-cols-2 md:gap-0 overflow-hidden border-primary/20">
        <div className="hidden md:block relative">
          <Image
            src="https://images.unsplash.com/photo-1554774853-719586f82d77?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Abstract representation of security and password recovery"
            width={600}
            height={800}
            className="object-cover w-full h-full"
            priority
            data-ai-hint="password recovery security interface lock key abstract"
          />
          <div className="absolute inset-0 bg-primary/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
            <h2 className="text-3xl font-bold mb-3 leading-tight font-headline">Regain Access to Your Account</h2>
            <p className="text-base opacity-90">
              {step === 2 ? "Follow the instructions sent to your email to securely reset your password." : "Enter your email to receive a secure link to reset your password. We're here to help you get back on track."}
            </p>
          </div>
        </div>
        <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
          <CardHeader className="text-center md:text-left p-0 mb-6">
            <div className="mx-auto md:mx-0 mb-3 inline-block p-3 bg-primary/10 rounded-full">
             {step === 2 ? <KeyRound className="h-8 w-8 text-green-500" /> : <ShieldQuestion className="h-8 w-8 text-primary" />}
            </div>
            <CardTitle className="text-3xl font-bold font-headline text-primary">
              {step === 2 ? 'Reset Your Password' : 'Forgot Your Password?'}
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground mt-1">
              {step === 2 
                ? `We've sent a verification code to ${email}. Please enter it below.`
                : "No worries! Enter your email address below and we'll send you a code to reset your password."
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {step === 1 ? (
              <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" {...emailForm.register('email')} placeholder="email@example.com" />
                  {emailForm.formState.errors.email && <p className="text-sm text-destructive">{emailForm.formState.errors.email.message}</p>}
                </div>
                <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                  Send Reset Code
                </Button>
              </form>
            ) : (
                <form onSubmit={resetForm.handleSubmit(handleResetSubmit)} className="space-y-5">
                    <div className="space-y-1.5">
                        <Label>Verification Code</Label>
                        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                            <InputOTPGroup className="w-full justify-center">
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>
                     <div className="space-y-1.5">
                        <Label htmlFor="password">New Password</Label>
                        <Input id="password" type="password" {...resetForm.register('password')} />
                        {resetForm.formState.errors.password && <p className="text-sm text-destructive">{resetForm.formState.errors.password.message}</p>}
                    </div>
                     <div className="space-y-1.5">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" {...resetForm.register('confirmPassword')} />
                        {resetForm.formState.errors.confirmPassword && <p className="text-sm text-destructive">{resetForm.formState.errors.confirmPassword.message}</p>}
                    </div>
                    <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
                      {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                      Reset Password
                    </Button>
                </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-2 mt-6 p-0">
            <Button variant="link" asChild className="p-0 h-auto text-primary hover:text-primary/80 font-medium">
              <Link href="/auth/login">Back to Sign In</Link>
            </Button>
             <Button variant="link" size="sm" asChild className="mt-4 text-xs text-muted-foreground hover:text-primary">
                <Link href="/">← Back to Home</Link>
            </Button>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
