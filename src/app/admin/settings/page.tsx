
"use client";

import React, { useState } from 'react'; // Explicitly import React
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Settings, Percent, ShieldCheck, Mail, Palette, UploadCloud, Bell, Briefcase } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from 'next/image'; // Import Image component

const generalSettingsSchema = z.object({
  platformName: z.string().min(3, "Platform name must be at least 3 characters"),
  platformDescription: z.string().max(200, "Description too long").optional(),
  adminEmail: z.string().email("Invalid admin email"),
  logoUrl: z.string().url("Invalid URL for logo").optional().or(z.literal('')),
  faviconUrl: z.string().url("Invalid URL for favicon").optional().or(z.literal('')),
});

const financialSettingsSchema = z.object({
  commissionRate: z.coerce.number().min(0).max(100, "Commission rate must be between 0 and 100"),
  payoutSchedule: z.enum(['monthly', 'bi-weekly', 'weekly']),
  currency: z.enum(['INR', 'USD', 'EUR']), // Added currency
});

const securitySettingsSchema = z.object({
  enable2FA: z.boolean().default(false),
  contentModerationLevel: z.enum(['low', 'medium', 'high']),
  autoApproveSellers: z.boolean().default(false),
});

const themeSettingsSchema = z.object({ // New schema for theme
  primaryColor: z.string().regex(/^#[0-9A-F]{6}$/i, "Must be a valid hex color"),
  // More theme options can be added here
});

type GeneralSettingsValues = z.infer<typeof generalSettingsSchema>;
type FinancialSettingsValues = z.infer<typeof financialSettingsSchema>;
type SecuritySettingsValues = z.infer<typeof securitySettingsSchema>;
type ThemeSettingsValues = z.infer<typeof themeSettingsSchema>; // New type

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const currentSettings = { // Mock current settings
    general: { platformName: "EdTechCart", platformDescription: "Your favorite learning place!", adminEmail: "admin@edtechcart.com", logoUrl: "https://placehold.co/200x50.png?text=EdTechCart", faviconUrl: "https://placehold.co/32x32.png"},
    financial: { commissionRate: 15, payoutSchedule: 'monthly', currency: 'INR' },
    security: { enable2FA: false, contentModerationLevel: 'medium', autoApproveSellers: false },
    theme: { primaryColor: "#60A5FA" }, // Mock theme
  };

  const generalForm = useForm<GeneralSettingsValues>({ resolver: zodResolver(generalSettingsSchema), defaultValues: currentSettings.general });
  const financialForm = useForm<FinancialSettingsValues>({ resolver: zodResolver(financialSettingsSchema), defaultValues: currentSettings.financial });
  const securityForm = useForm<SecuritySettingsValues>({ resolver: zodResolver(securitySettingsSchema), defaultValues: currentSettings.security });
  const themeForm = useForm<ThemeSettingsValues>({ resolver: zodResolver(themeSettingsSchema), defaultValues: currentSettings.theme }); // New form

  const [isSubmitting, setIsSubmitting] = useState(false); // Single submitting state

  const onSubmit = async (data: any, formName: string) => {
    setIsSubmitting(true);
    console.log(`${formName} settings update:`, data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({ title: `${formName} Settings Updated` });
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Settings className="h-8 w-8 text-primary"/>
        <h1 className="text-3xl font-bold font-headline">Platform Settings</h1>
      </div>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-auto">
          <TabsTrigger value="general"><Settings className="mr-2 h-4 w-4 inline-block"/>General</TabsTrigger>
          <TabsTrigger value="financial"><Percent className="mr-2 h-4 w-4 inline-block"/>Financial</TabsTrigger>
          <TabsTrigger value="security"><ShieldCheck className="mr-2 h-4 w-4 inline-block"/>Security</TabsTrigger>
          <TabsTrigger value="theme"><Palette className="mr-2 h-4 w-4 inline-block"/>Theme</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <Card className="shadow-lg border">
            <CardHeader>
              <CardTitle className="text-xl">General Platform Settings</CardTitle>
              <CardDescription>Manage basic information, branding, and contact details for the platform.</CardDescription>
            </CardHeader>
            <form onSubmit={generalForm.handleSubmit(data => onSubmit(data, "General"))}>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="platformName">Platform Name</Label>
                    <Input id="platformName" {...generalForm.register('platformName')} />
                    {generalForm.formState.errors.platformName && <p className="text-sm text-destructive mt-1">{generalForm.formState.errors.platformName.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="adminEmail">Default Admin Email</Label>
                    <Input id="adminEmail" type="email" {...generalForm.register('adminEmail')} />
                    {generalForm.formState.errors.adminEmail && <p className="text-sm text-destructive mt-1">{generalForm.formState.errors.adminEmail.message}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="platformDescription">Platform Tagline/Description (Max 200 chars)</Label>
                  <Textarea id="platformDescription" {...generalForm.register('platformDescription')} rows={3} />
                  {generalForm.formState.errors.platformDescription && <p className="text-sm text-destructive mt-1">{generalForm.formState.errors.platformDescription.message}</p>}
                </div>
                <div className="grid md:grid-cols-2 gap-6 items-end">
                    <div>
                        <Label htmlFor="logoUrl">Platform Logo URL</Label>
                        <div className="flex items-center gap-2">
                            <Input id="logoUrl" {...generalForm.register('logoUrl')} placeholder="https://example.com/logo.png" />
                            <Button type="button" variant="outline" size="icon" disabled><UploadCloud className="h-4 w-4"/></Button>
                        </div>
                        {generalForm.watch('logoUrl') && <Image src={generalForm.watch('logoUrl')!} alt="Logo Preview" width={150} height={40} className="mt-2 rounded border p-1 object-contain h-12" data-ai-hint="platform logo preview"/>}
                        {generalForm.formState.errors.logoUrl && <p className="text-sm text-destructive mt-1">{generalForm.formState.errors.logoUrl.message}</p>}
                    </div>
                     <div>
                        <Label htmlFor="faviconUrl">Favicon URL (.ico, .png)</Label>
                         <div className="flex items-center gap-2">
                            <Input id="faviconUrl" {...generalForm.register('faviconUrl')} placeholder="https://example.com/favicon.ico" />
                            <Button type="button" variant="outline" size="icon" disabled><UploadCloud className="h-4 w-4"/></Button>
                        </div>
                        {generalForm.watch('faviconUrl') && <Image src={generalForm.watch('faviconUrl')!} alt="Favicon Preview" width={32} height={32} className="mt-2 rounded border p-1" data-ai-hint="website favicon preview"/>}
                        {generalForm.formState.errors.faviconUrl && <p className="text-sm text-destructive mt-1">{generalForm.formState.errors.faviconUrl.message}</p>}
                    </div>
                </div>
                 <div>
                    <Label>Default Contact Information (Placeholder)</Label>
                    <p className="text-xs text-muted-foreground">Displayed in footer/contact page. Managed under "Platform Content".</p>
                    <Button variant="link" className="p-0 h-auto text-sm" asChild><Link href="/admin/content/contact-info">Edit Contact Info</Link></Button>
                 </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save General Settings
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="mt-6">
          <Card className="shadow-lg border">
            <CardHeader>
              <CardTitle className="text-xl">Financial Settings</CardTitle>
              <CardDescription>Configure commission rates, payout schedules, currency, and payment gateways.</CardDescription>
            </CardHeader>
            <form onSubmit={financialForm.handleSubmit(data => onSubmit(data, "Financial"))}>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="commissionRate">Platform Commission Rate (%)</Label>
                            <Input id="commissionRate" type="number" {...financialForm.register('commissionRate')} />
                            {financialForm.formState.errors.commissionRate && <p className="text-sm text-destructive mt-1">{financialForm.formState.errors.commissionRate.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="payoutSchedule">Seller Payout Schedule</Label>
                            <Controller name="payoutSchedule" control={financialForm.control} render={({field}) => (
                                <select {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                    <option value="monthly">Monthly (e.g., 15th of each month)</option>
                                    <option value="bi-weekly">Bi-Weekly (e.g., 1st and 15th)</option>
                                    <option value="weekly">Weekly (e.g., every Friday)</option>
                                </select>
                            )}/>
                            {financialForm.formState.errors.payoutSchedule && <p className="text-sm text-destructive mt-1">{financialForm.formState.errors.payoutSchedule.message}</p>}
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="currency">Default Platform Currency</Label>
                        <Controller name="currency" control={financialForm.control} render={({field}) => (
                           <select {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                <option value="INR">Indian Rupee (₹)</option>
                                <option value="USD">US Dollar ($)</option>
                                <option value="EUR">Euro (€)</option>
                            </select>
                        )}/>
                        {financialForm.formState.errors.currency && <p className="text-sm text-destructive mt-1">{financialForm.formState.errors.currency.message}</p>}
                    </div>
                    <div>
                        <Label>Payment Gateway Configuration</Label>
                        <Card className="p-4 bg-muted/30 border-dashed">
                            <CardDescription className="mb-2">Connect and manage payment gateways like Stripe, Razorpay, PayPal. (Conceptual - requires backend integration)</CardDescription>
                            <div className="flex flex-wrap gap-2">
                                <Button variant="outline" disabled>Connect Stripe</Button>
                                <Button variant="outline" disabled>Connect Razorpay</Button>
                                <Button variant="outline" disabled>Connect PayPal</Button>
                            </div>
                        </Card>
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Financial Settings
                    </Button>
                </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="mt-6">
          <Card className="shadow-lg border">
            <CardHeader>
              <CardTitle className="text-xl">Security & Moderation</CardTitle>
              <CardDescription>Manage platform security features, content moderation policies, and seller approval workflows.</CardDescription>
            </CardHeader>
            <form onSubmit={securityForm.handleSubmit(data => onSubmit(data, "Security"))}>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 border rounded-md bg-background hover:border-primary/50 transition-colors">
                        <div>
                            <Label htmlFor="enable2FA" className="font-medium">Enable Two-Factor Authentication (2FA) for Admins</Label>
                            <p className="text-xs text-muted-foreground">Enhance security for admin and staff accounts.</p>
                        </div>
                        <Controller name="enable2FA" control={securityForm.control} render={({ field }) => <Switch id="enable2FA" checked={field.value} onCheckedChange={field.onChange} />} />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-md bg-background hover:border-primary/50 transition-colors">
                        <div>
                            <Label htmlFor="autoApproveSellers" className="font-medium">Auto-Approve New Sellers</Label>
                            <p className="text-xs text-muted-foreground">If disabled, admins must manually verify each new seller application.</p>
                        </div>
                        <Controller name="autoApproveSellers" control={securityForm.control} render={({ field }) => <Switch id="autoApproveSellers" checked={field.value} onCheckedChange={field.onChange} />} />
                    </div>
                     <div>
                        <Label htmlFor="contentModerationLevel">Content Moderation Level (Courses & Reviews)</Label>
                         <Controller name="contentModerationLevel" control={securityForm.control} render={({field}) => (
                            <select {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                <option value="low">Low (Manual for reported content only)</option>
                                <option value="medium">Medium (Automated checks + admin review for sensitive content)</option>
                                <option value="high">High (Strict automated checks + mandatory admin review for all new content)</option>
                            </select>
                         )}/>
                        {securityForm.formState.errors.contentModerationLevel && <p className="text-sm text-destructive mt-1">{securityForm.formState.errors.contentModerationLevel.message}</p>}
                    </div>
                    <div>
                        <Label>API Access & Integrations</Label>
                         <Card className="p-4 bg-muted/30 border-dashed">
                            <CardDescription className="mb-2">Manage API keys for third-party services, analytics, or custom integrations. (Conceptual)</CardDescription>
                            <Button variant="outline" className="mt-2" disabled>Manage API Keys & Webhooks</Button>
                        </Card>
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Security Settings
                    </Button>
                </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="theme" className="mt-6">
          <Card className="shadow-lg border">
            <CardHeader>
              <CardTitle className="text-xl">Theme & Customization</CardTitle>
              <CardDescription>Customize the look and feel of the platform. (Basic options for now)</CardDescription>
            </CardHeader>
            <form onSubmit={themeForm.handleSubmit(data => onSubmit(data, "Theme"))}>
                <CardContent className="space-y-6">
                    <div>
                        <Label htmlFor="primaryColor">Primary Theme Color (Hex)</Label>
                        <div className="flex items-center gap-2">
                            <Input id="primaryColor" {...themeForm.register('primaryColor')} placeholder="#60A5FA" />
                            <div style={{ backgroundColor: themeForm.watch('primaryColor') || '#ffffff' }} className="h-10 w-10 rounded-md border"/>
                        </div>
                        {themeForm.formState.errors.primaryColor && <p className="text-sm text-destructive mt-1">{themeForm.formState.errors.primaryColor.message}</p>}
                        <p className="text-xs text-muted-foreground mt-1">Changes require updating CSS variables in `globals.css` and potentially a theme rebuild.</p>
                    </div>
                     <div>
                        <Label>Notification Email Templates</Label>
                        <Card className="p-4 bg-muted/30 border-dashed">
                            <CardDescription className="mb-2">Customize templates for welcome emails, order confirmations, course updates, etc. (Conceptual)</CardDescription>
                            <Button variant="outline" disabled><Bell className="mr-2 h-4 w-4"/>Edit Email Templates</Button>
                        </Card>
                    </div>
                     <div>
                        <Label>Seller Store Customization Options</Label>
                        <Card className="p-4 bg-muted/30 border-dashed">
                            <CardDescription className="mb-2">Define what aspects of their store page sellers can customize (e.g., banner, featured courses). (Conceptual)</CardDescription>
                            <Button variant="outline" disabled><Briefcase className="mr-2 h-4 w-4"/>Seller Store Settings</Button>
                        </Card>
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Theme Settings
                    </Button>
                </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
