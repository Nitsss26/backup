
"use client";

import React, { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Mail, KeyRound, ShieldQuestion } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { APP_NAME } from '@/lib/constants';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormValues> = async (data) => {
    setIsLoading(true);
    console.log("Forgot password request for:", data.email); 
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    setIsLoading(false);
    setIsSubmitted(true);
    toast({ 
      title: "Password Reset Email Sent",
      description: `If an account exists for ${data.email}, you will receive an email with instructions to reset your password.`,
    });
  };

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
              {isSubmitted ? "Follow the instructions sent to your email to securely reset your password." : "Enter your email to receive a secure link to reset your password. We're here to help you get back on track."}
            </p>
          </div>
        </div>
        <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
          <CardHeader className="text-center md:text-left p-0 mb-6">
            <div className="mx-auto md:mx-0 mb-3 inline-block p-3 bg-primary/10 rounded-full">
             {isSubmitted ? <Mail className="h-8 w-8 text-green-500" /> : <ShieldQuestion className="h-8 w-8 text-primary" />}
            </div>
            <CardTitle className="text-3xl font-bold font-headline text-primary">
              {isSubmitted ? 'Check Your Email' : 'Forgot Your Password?'}
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground mt-1">
              {isSubmitted 
                ? `We've sent password reset instructions to the email address you provided, if it's associated with an account on ${APP_NAME}.`
                : "No worries! Enter your email address below and we'll send you a link to reset your password."
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {!isSubmitted && (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" {...register('email')} placeholder="email@example.com" />
                  {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                </div>
                <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                  Send Reset Link
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

    