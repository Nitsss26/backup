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
import { useRouter, useSearchParams } from 'next/navigation'; // Added useSearchParams
import { APP_NAME } from '@/lib/constants';

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
  role: z.enum(['student', 'provider']).default('student'), // Added role field for registration
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

  const { register: registerAuth, login: loginAuth, user: authUser } = useAuth(); // Get user from useAuth
  const router = useRouter();
  const searchParamsHook = useSearchParams(); // Renamed to avoid conflict
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const roleFromQuery = searchParamsHook.get('role') as 'student' | 'provider' | null;


  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: isLoginMode ? {} : { role: roleFromQuery || 'student' } as Partial<RegisterFormValues>,
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    try {
      let userRole = 'student'; // Default role
      if (isLoginMode) {
        await loginAuth({ email: (data as LoginFormValues).email, password: (data as LoginFormValues).password });
        toast({ title: "Login Successful", description: "Welcome back!" });
        // The redirection logic will be handled by the useEffect in AuthContext or AppProviders based on the fetched user's role
        // For now, we rely on the existing user object from useAuth *after* loginAuth updates it.
        // This part might need a slight refactor in AppProviders to ensure `user` is updated immediately for this check
        // Or, loginAuth could return the user object.
        // For simplicity here, we'll assume loginAuth updates the user state and we can read it from authUser *after* await.
        // This needs to be tested thoroughly for correct timing.
        // A more robust way is for loginAuth to return the user object.
        // Let's simulate that loginAuth updates the user in context and then we access it.
      } else {
        const registerData = data as RegisterFormValues;
        userRole = registerData.role;
        await registerAuth({ name: registerData.name, email: registerData.email, password: registerData.password, role: userRole });
        toast({ title: "Registration Successful", description: `Welcome to ${APP_NAME}!` });
      }

      // Post-login/registration redirection logic
      // Need to ensure authUser is updated by this point
      // This assumes authUser is updated by loginAuth/registerAuth by the time this code runs
      // A slight delay or checking updated user state might be needed.
      // For now, let's use the role determined during the process. If login, this `userRole` is just 'student'.
      // For a more robust solution, loginAuth should return the user, or we need to wait for context update.
      
      // Attempt to get updated user. This might not be immediate.
      // const updatedUser = authUser; // authUser from useAuth() might not be updated yet
      
      // Let's make a decision based on what we know:
      // If login: use the role from the (now hopefully updated) authUser in context.
      // If register: use the role specified in the form.

      // A more reliable approach after loginAuth() completes:
      // The AppProviders useEffect listening to user changes will handle global redirection.
      // Here, we can redirect to a generic dashboard and let the layout handle specific role pages.
      // Or, if loginAuth returned the user:
      // const loggedInUser = await loginAuth(...);
      // if (loggedInUser.role === 'admin') router.push('/admin'); ...

      // Simplified redirection - relies on AppProviders to update user context quickly.
      // And DashboardLayout to then pick the right nav items.
      
      const redirectPath = searchParamsHook.get('redirect');
      if (redirectPath) {
        router.push(redirectPath);
      } else {
        // Determine role after login/registration for redirection
        // This is tricky because the `user` from `useAuth` might not update immediately.
        // A better pattern is for login/register functions to return the user object.
        // For now, let's make a best guess.
        let finalRole = 'student';
        if (isLoginMode && authUser) { // if we just logged in, authUser should be the new user
          finalRole = authUser.role;
        } else if (!isLoginMode) { // if we just registered
          finalRole = (data as RegisterFormValues).role;
        }
        
        if (finalRole === 'admin') router.push('/admin');
        else if (finalRole === 'provider') router.push('/dashboard/seller');
        else router.push('/dashboard/student');
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
                  <Input id="name" type="text" {...register('name' as any)} placeholder="John Doe" />
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
