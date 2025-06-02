"use client";

import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/components/AppProviders'; // Assuming this hook provides user data
import { Loader2, UserCircle, Lock, Bell, Upload } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  bio: z.string().max(200, "Bio must be less than 200 characters").optional(),
  avatarUrl: z.string().url("Invalid URL for avatar").optional().or(z.literal('')),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(6, "Password must be at least 6 characters"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
  confirmNewPassword: z.string().min(6),
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: "New passwords do not match",
  path: ["confirmNewPassword"],
});

const notificationSchema = z.object({
  courseUpdates: z.boolean().default(true),
  promotions: z.boolean().default(false),
  platformAnnouncements: z.boolean().default(true),
});


type ProfileFormValues = z.infer<typeof profileSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;
type NotificationFormValues = z.infer<typeof notificationSchema>;

export default function ProfilePage() {
  const { user, isLoading: authLoading, /* updateUser, updatePassword - mock functions */ } = useAuth();
  const { toast } = useToast();
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);
  const [isSubmittingNotifications, setIsSubmittingNotifications] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });
  const notificationForm = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationSchema),
    defaultValues: { // Mock notification settings
        courseUpdates: true,
        promotions: false,
        platformAnnouncements: true,
    }
  });

  useEffect(() => {
    setIsClient(true);
    if (user) {
      profileForm.reset({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '', // Assuming bio and avatarUrl are part of user object
        avatarUrl: user.avatarUrl || '',
      });
      // Potentially fetch and set notification preferences
    }
  }, [user, profileForm.reset]);

  const onProfileSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    setIsSubmittingProfile(true);
    console.log("Profile update:", data);
    // await updateUser(data); // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({ title: "Profile Updated", description: "Your profile information has been saved." });
    setIsSubmittingProfile(false);
  };

  const onPasswordSubmit: SubmitHandler<PasswordFormValues> = async (data) => {
    setIsSubmittingPassword(true);
    console.log("Password change request for:", data.currentPassword.substring(0,1) + "***"); // Don't log actual passwords
    // await updatePassword(data); // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({ title: "Password Updated", description: "Your password has been changed successfully." });
    passwordForm.reset();
    setIsSubmittingPassword(false);
  };
  
  const onNotificationsSubmit: SubmitHandler<NotificationFormValues> = async (data) => {
    setIsSubmittingNotifications(true);
    console.log("Notification settings updated:", data);
    // await updateNotificationPreferences(data); // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({ title: "Notification Settings Updated", description: "Your preferences have been saved." });
    setIsSubmittingNotifications(false);
  };

  if (authLoading || !isClient) {
    return <div className="flex items-center justify-center min-h-[calc(100vh-200px)]"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }
  if (!user) {
    return <div className="text-center py-10">Please log in to view your profile.</div>;
  }

  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline">Account Settings</h1>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:w-auto">
          <TabsTrigger value="profile"><UserCircle className="mr-2 h-4 w-4 inline-block"/>Profile</TabsTrigger>
          <TabsTrigger value="password"><Lock className="mr-2 h-4 w-4 inline-block"/>Password</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="mr-2 h-4 w-4 inline-block"/>Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and avatar.</CardDescription>
            </CardHeader>
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profileForm.watch('avatarUrl') || user.avatarUrl} alt={user.name} />
                    <AvatarFallback>{userInitial}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <Label htmlFor="avatarUrl">Avatar URL (or upload)</Label>
                    <div className="flex gap-2">
                        <Input id="avatarUrl" {...profileForm.register('avatarUrl')} placeholder="https://example.com/avatar.png" />
                        <Button type="button" variant="outline" size="icon" className="shrink-0"><Upload className="h-4 w-4"/></Button>
                    </div>
                    {profileForm.formState.errors.avatarUrl && <p className="text-sm text-destructive mt-1">{profileForm.formState.errors.avatarUrl.message}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" {...profileForm.register('name')} />
                  {profileForm.formState.errors.name && <p className="text-sm text-destructive mt-1">{profileForm.formState.errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" {...profileForm.register('email')} readOnly className="bg-muted/50 cursor-not-allowed"/>
                   {profileForm.formState.errors.email && <p className="text-sm text-destructive mt-1">{profileForm.formState.errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="bio">Bio (Optional)</Label>
                  <Textarea id="bio" {...profileForm.register('bio')} placeholder="Tell us a little about yourself..." rows={3} />
                  {profileForm.formState.errors.bio && <p className="text-sm text-destructive mt-1">{profileForm.formState.errors.bio.message}</p>}
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button type="submit" disabled={isSubmittingProfile}>
                  {isSubmittingProfile && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="password" className="mt-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your account password. Choose a strong one!</CardDescription>
            </CardHeader>
             <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" {...passwordForm.register('currentPassword')} />
                        {passwordForm.formState.errors.currentPassword && <p className="text-sm text-destructive mt-1">{passwordForm.formState.errors.currentPassword.message}</p>}
                    </div>
                     <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" {...passwordForm.register('newPassword')} />
                        {passwordForm.formState.errors.newPassword && <p className="text-sm text-destructive mt-1">{passwordForm.formState.errors.newPassword.message}</p>}
                    </div>
                     <div>
                        <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                        <Input id="confirmNewPassword" type="password" {...passwordForm.register('confirmNewPassword')} />
                        {passwordForm.formState.errors.confirmNewPassword && <p className="text-sm text-destructive mt-1">{passwordForm.formState.errors.confirmNewPassword.message}</p>}
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button type="submit" disabled={isSubmittingPassword}>
                        {isSubmittingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Update Password
                    </Button>
                </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive updates from EdTechCart.</CardDescription>
            </CardHeader>
             <form onSubmit={notificationForm.handleSubmit(onNotificationsSubmit)}>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                            <Label htmlFor="courseUpdates" className="font-medium">Course Updates</Label>
                            <p className="text-xs text-muted-foreground">Get notified about new content or announcements in your enrolled courses.</p>
                        </div>
                        <Controller name="courseUpdates" control={notificationForm.control} render={({ field }) => <Switch id="courseUpdates" checked={field.value} onCheckedChange={field.onChange} />} />
                    </div>
                     <div className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                            <Label htmlFor="promotions" className="font-medium">Promotions & Offers</Label>
                            <p className="text-xs text-muted-foreground">Receive emails about new course sales and special offers.</p>
                        </div>
                        <Controller name="promotions" control={notificationForm.control} render={({ field }) => <Switch id="promotions" checked={field.value} onCheckedChange={field.onChange} />} />
                    </div>
                     <div className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                            <Label htmlFor="platformAnnouncements" className="font-medium">Platform Announcements</Label>
                            <p className="text-xs text-muted-foreground">Get important updates about EdTechCart features and policies.</p>
                        </div>
                        <Controller name="platformAnnouncements" control={notificationForm.control} render={({ field }) => <Switch id="platformAnnouncements" checked={field.value} onCheckedChange={field.onChange} />} />
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button type="submit" disabled={isSubmittingNotifications}>
                        {isSubmittingNotifications && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Preferences
                    </Button>
                </CardFooter>
            </form>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
