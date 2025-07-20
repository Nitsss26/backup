
"use client";

import React, { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, UserPlus, LogIn, KeyRound } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/components/AppProviders';
import { useRouter, useSearchParams } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';
import axios from 'axios';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"


const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
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
  const [showOtp, setShowOtp] = useState(false);
  const [formData, setFormData] = useState<RegisterFormValues | null>(null);
  const [otpValue, setOtpValue] = useState("");

  const loginForm = useForm<LoginFormValues>({ 
    resolver: zodResolver(loginSchema),
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
    setFormData(data);
    setShowOtp(true);
    toast({ title: "Verify Your Account", description: "An OTP has been sent to your email (use 123456)." });
  };
  
  const handleOtpSubmit = async () => {
      if (otpValue !== '123456') {
          toast({ title: "Invalid OTP", description: "Please enter the correct OTP.", variant: "destructive" });
          return;
      }
      if (!formData) return;

      setIsLoading(true);
      try {
        const response = await axios.post('/api/users', formData);
        if (response.status === 201) {
          toast({ title: "Registration Successful", description: "You can now log in with your credentials." });
          setShowOtp(false);
          setMode('login'); 
          loginForm.reset({ email: formData.email, password: '' });
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
  }

  const renderContent = () => {
    if (showOtp) {
      return (
        <div className="space-y-6 text-center">
            <KeyRound className="mx-auto h-12 w-12 text-primary" />
            <h3 className="text-xl font-semibold">Enter Verification Code</h3>
            <p className="text-muted-foreground text-sm">Please enter the 6-digit code sent to your email. (Hint: it's 123456)</p>
            <div className="flex justify-center">
                <InputOTP maxLength={6} value={otpValue} onChange={setOtpValue}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
            </div>
            <Button onClick={handleOtpSubmit} className="w-full" disabled={isLoading || otpValue.length < 6}>
                {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                Verify & Create Account
            </Button>
            <Button variant="link" size="sm" onClick={() => setShowOtp(false)}>Back to Signup</Button>
        </div>
      );
    }
    
    if (mode === 'login') {
      return (
        <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="login-email">Email</Label>
            <Input id="login-email" {...loginForm.register('email')} placeholder="name@example.com" />
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
      );
    }
    
    return (
       <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="register-name">Full Name</Label>
            <Input id="register-name" {...registerForm.register('name')} placeholder="Name" />
            {registerForm.formState.errors.name && <p className="text-sm text-destructive">{registerForm.formState.errors.name.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="register-email">Email</Label>
            <Input id="register-email" {...registerForm.register('email')} placeholder="Email" />
            {registerForm.formState.errors.email && <p className="text-sm text-destructive">{registerForm.formState.errors.email.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="register-password">Password</Label>
            <Input id="register-password" type="password" {...registerForm.register('password')} placeholder="Password" />
            {registerForm.formState.errors.password && <p className="text-sm text-destructive">{registerForm.formState.errors.password.message}</p>}
          </div>
           <div className="space-y-1.5">
            <Label htmlFor="register-confirm-password">Confirm Password</Label>
            <Input id="register-confirm-password" type="password" {...registerForm.register('confirmPassword')} placeholder="Confirm Password" />
            {registerForm.formState.errors.confirmPassword && <p className="text-sm text-destructive">{registerForm.formState.errors.confirmPassword.message}</p>}
          </div>
          <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <UserPlus className="mr-2 h-5 w-5"/>}
            Create Account
          </Button>
        </form>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-gray-200 dark:border-gray-700">
          <CardHeader className="text-center p-6">
             <Link href="/" className="inline-block mb-4">
              <Image src="/logoo.png" alt={APP_NAME} width={150} height={50} className="mx-auto" />
             </Link>
            <CardTitle className="text-3xl font-bold font-headline text-primary">
              {showOtp ? 'Verification' : (mode === 'login' ? 'Sign In' : 'Create an Account')}
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground mt-1">
               {showOtp ? 'Verify your email to continue.' : (mode === 'login' ? 'Enter your credentials to access your account.' : `Join ${APP_NAME} to start your learning journey.`)}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {renderContent()}
          </CardContent>
          {!showOtp && (
            <CardFooter className="flex flex-col items-center p-6 border-t dark:border-gray-700 gap-2">
                <Button variant="link" onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="p-0 h-auto text-primary hover:text-primary/80 font-medium">
                  {mode === 'login' ? 'Don\'t have an account? Sign Up' : 'Already have an account? Sign In'}
                </Button>
                {mode === 'login' && (
                  <Link href="/auth/forgot-password" className="text-sm text-muted-foreground hover:text-primary">
                    Forgot your password?
                  </Link>
                )}
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
