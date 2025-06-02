
"use client";

import React, { useState, useEffect } from 'react';
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
import { Loader2, Settings, Percent, ShieldCheck, Mail, Palette, UploadCloud, Bell, Briefcase, CreditCard, Globe } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from 'next/image';
import Link from 'next/link'; // Import Link

const generalSettingsSchema = z.object({
  platformName: z.string().min(3, "Platform name must be at least 3 characters"),
  platformDescription: z.string().max(200, "Description too long").optional(),
  adminEmail: z.string().email("Invalid admin email"),
  logoUrl: z.string().url("Invalid URL for logo").optional().or(z.literal('')),
  faviconUrl: z.string().url("Invalid URL for favicon").optional().or(z.literal('')),
  contactEmail: z.string().email("Invalid contact email for support").optional(),
  contactPhone: z.string().optional(),
});

const financialSettingsSchema = z.object({
  commissionRate: z.coerce.number().min(0).max(100, "Commission rate must be between 0 and 100"),
  payoutSchedule: z.enum(['monthly', 'bi-weekly', 'weekly']),
  currency: z.enum(['INR', 'USD', 'EUR']), 
  paymentGatewayApiKey: z.string().optional(), // Placeholder for API Key
});

const securitySettingsSchema = z.object({
  enable2FA: z.boolean().default(false),
  contentModerationLevel: z.enum(['low', 'medium', 'high']),
  autoApproveSellers: z.boolean().default(false),
  autoApproveCourses: z.boolean().default(false), // New
});

const themeSettingsSchema = z.object({ 
  primaryColor: z.string().regex(/^#[0-9A-F]{6}$/i, "Must be a valid hex color (e.g. #3B82F6)"),
  fontFamily: z.enum(['Inter', 'Roboto', 'Open Sans', 'Lato']).default('Inter'),
});

type GeneralSettingsValues = z.infer<typeof generalSettingsSchema>;
type FinancialSettingsValues = z.infer<typeof financialSettingsSchema>;
type SecuritySettingsValues = z.infer<typeof securitySettingsSchema>;
type ThemeSettingsValues = z.infer<typeof themeSettingsSchema>;

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general"); // For conditional rendering if needed later
  
  const currentSettings = { 
    general: { platformName: "EdTechCart", platformDescription: "Your premier marketplace for online courses!", adminEmail: "admin@edtechcart.com", logoUrl: "https://placehold.co/200x50/EBF4FF/3B82F6?text=EdTechCart", faviconUrl: "https://placehold.co/32x32/3B82F6/FFFFFF?text=E", contactEmail: "support@edtechcart.com", contactPhone: "+91-9876543210" },
    financial: { commissionRate: 15, payoutSchedule: 'monthly', currency: 'INR', paymentGatewayApiKey: "pk_test_************************" },
    security: { enable2FA: false, contentModerationLevel: 'medium', autoApproveSellers: false, autoApproveCourses: false },
    theme: { primaryColor: "#3B82F6", fontFamily: 'Inter'}, 
  };

  const generalForm = useForm<GeneralSettingsValues>({ resolver: zodResolver(generalSettingsSchema), defaultValues: currentSettings.general });
  const financialForm = useForm<FinancialSettingsValues>({ resolver: zodResolver(financialSettingsSchema), defaultValues: currentSettings.financial });
  const securityForm = useForm<SecuritySettingsValues>({ resolver: zodResolver(securitySettingsSchema), defaultValues: currentSettings.security });
  const themeForm = useForm<ThemeSettingsValues>({ resolver: zodResolver(themeSettingsSchema), defaultValues: currentSettings.theme }); 

  const [isSubmittingGeneral, setIsSubmittingGeneral] = useState(false);
  const [isSubmittingFinancial, setIsSubmittingFinancial] = useState(false);
  const [isSubmittingSecurity, setIsSubmittingSecurity] = useState(false);
  const [isSubmittingTheme, setIsSubmittingTheme] = useState(false);


  const onSubmit = async (data: any, formName: string, setSubmitting: React.Dispatch<React.SetStateAction<boolean>>) => {
    setSubmitting(true);
    console.log(`${formName} settings update:`, data);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    toast({ title: `${formName} Settings Updated`, description: `Your ${formName.toLowerCase()} settings have been saved.` });
    setSubmitting(false);
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg border bg-card">
        <CardHeader>
            <div className="flex items-center gap-3">
                <Settings className="h-8 w-8 text-primary"/>
                <div>
                    <CardTitle className="text-2xl font-headline">Platform Settings</CardTitle>
                    <CardDescription>Configure global settings for {process.env.NEXT_PUBLIC_APP_NAME || "EdTechCart"}.</CardDescription>
                </div>
            </div>
        </CardHeader>
      </Card>
      
      <Tabs defaultValue="general" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:auto-cols-fr mb-6">
          <TabsTrigger value="general"><Globe className="mr-2 h-4 w-4 inline-block"/>General</TabsTrigger>
          <TabsTrigger value="financial"><Percent className="mr-2 h-4 w-4 inline-block"/>Financial</TabsTrigger>
          <TabsTrigger value="security"><ShieldCheck className="mr-2 h-4 w-4 inline-block"/>Security</TabsTrigger>
          <TabsTrigger value="theme"><Palette className="mr-2 h-4 w-4 inline-block"/>Theme & Customization</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-0">
          <Card className="shadow-md border bg-card">
            <CardHeader>
              <CardTitle className="text-xl">General Platform Settings</CardTitle>
              <CardDescription>Manage basic information, branding, and contact details for the platform.</CardDescription>
            </CardHeader>
            <form onSubmit={generalForm.handleSubmit(data => onSubmit(data, "General", setIsSubmittingGeneral))}>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="platformName">Platform Name *</Label>
                    <Input id="platformName" {...generalForm.register('platformName')} />
                    {generalForm.formState.errors.platformName && <p className="text-sm text-destructive mt-1">{generalForm.formState.errors.platformName.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="adminEmail">Default Admin Email *</Label>
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
                        {generalForm.watch('logoUrl') && <Image src={generalForm.watch('logoUrl')!} alt="Logo Preview" width={150} height={40} className="mt-2 rounded border p-1 object-contain h-12 bg-muted" data-ai-hint="platform logo preview admin settings"/>}
                        {generalForm.formState.errors.logoUrl && <p className="text-sm text-destructive mt-1">{generalForm.formState.errors.logoUrl.message}</p>}
                    </div>
                     <div>
                        <Label htmlFor="faviconUrl">Favicon URL (.ico, .png)</Label>
                         <div className="flex items-center gap-2">
                            <Input id="faviconUrl" {...generalForm.register('faviconUrl')} placeholder="https://example.com/favicon.ico" />
                            <Button type="button" variant="outline" size="icon" disabled><UploadCloud className="h-4 w-4"/></Button>
                        </div>
                        {generalForm.watch('faviconUrl') && <Image src={generalForm.watch('faviconUrl')!} alt="Favicon Preview" width={32} height={32} className="mt-2 rounded border p-1 bg-muted" data-ai-hint="website favicon preview admin settings"/>}
                        {generalForm.formState.errors.faviconUrl && <p className="text-sm text-destructive mt-1">{generalForm.formState.errors.faviconUrl.message}</p>}
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="contactEmail">Public Contact Email</Label>
                        <Input id="contactEmail" type="email" {...generalForm.register('contactEmail')} placeholder="support@example.com"/>
                        {generalForm.formState.errors.contactEmail && <p className="text-sm text-destructive mt-1">{generalForm.formState.errors.contactEmail.message}</p>}
                    </div>
                     <div>
                        <Label htmlFor="contactPhone">Public Contact Phone</Label>
                        <Input id="contactPhone" type="tel" {...generalForm.register('contactPhone')} placeholder="+91 000 000 0000"/>
                        {generalForm.formState.errors.contactPhone && <p className="text-sm text-destructive mt-1">{generalForm.formState.errors.contactPhone.message}</p>}
                    </div>
                </div>
                 <div>
                    <Label>Other Static Info (Managed Separately)</Label>
                    <p className="text-xs text-muted-foreground">Footer links, About Us, etc. are managed under "Platform Content".</p>
                    <Button variant="link" className="p-0 h-auto text-sm" asChild><Link href="/admin/content">Go to Content Editor</Link></Button>
                 </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button type="submit" disabled={isSubmittingGeneral}>
                  {isSubmittingGeneral && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save General Settings
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="mt-0">
          <Card className="shadow-md border bg-card">
            <CardHeader>
              <CardTitle className="text-xl">Financial Settings</CardTitle>
              <CardDescription>Configure commission rates, payout schedules, currency, and payment gateways.</CardDescription>
            </CardHeader>
            <form onSubmit={financialForm.handleSubmit(data => onSubmit(data, "Financial", setIsSubmittingFinancial))}>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <Label htmlFor="commissionRate">Platform Commission Rate (%) *</Label>
                            <Input id="commissionRate" type="number" {...financialForm.register('commissionRate')} />
                            {financialForm.formState.errors.commissionRate && <p className="text-sm text-destructive mt-1">{financialForm.formState.errors.commissionRate.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="payoutSchedule">Seller Payout Schedule *</Label>
                            <Controller name="payoutSchedule" control={financialForm.control} render={({field}) => (
                                <select {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                    <option value="monthly">Monthly (e.g., 15th of each month)</option>
                                    <option value="bi-weekly">Bi-Weekly (e.g., 1st and 15th)</option>
                                    <option value="weekly">Weekly (e.g., every Friday)</option>
                                </select>
                            )}/>
                            {financialForm.formState.errors.payoutSchedule && <p className="text-sm text-destructive mt-1">{financialForm.formState.errors.payoutSchedule.message}</p>}
                        </div>
                         <div>
                            <Label htmlFor="currency">Default Platform Currency *</Label>
                            <Controller name="currency" control={financialForm.control} render={({field}) => (
                            <select {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                    <option value="INR">Indian Rupee (₹)</option>
                                    <option value="USD">US Dollar ($)</option>
                                    <option value="EUR">Euro (€)</option>
                                </select>
                            )}/>
                            {financialForm.formState.errors.currency && <p className="text-sm text-destructive mt-1">{financialForm.formState.errors.currency.message}</p>}
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="paymentGatewayApiKey">Payment Gateway API Key (Test/Live)</Label>
                        <Input id="paymentGatewayApiKey" type="password" {...financialForm.register('paymentGatewayApiKey')} placeholder="Enter API Key (e.g. pk_live_..., sk_test_...)"/>
                        <p className="text-xs text-muted-foreground mt-1">Securely store your payment gateway API keys here. Ensure you use the correct key for your environment.</p>
                    </div>
                    <div>
                        <Label>Payment Gateway Configuration</Label>
                        <Card className="p-4 bg-muted/30 border-dashed">
                            <CardDescription className="mb-3">Connect and manage payment gateways. (Conceptual - requires backend integration)</CardDescription>
                            <div className="flex flex-wrap gap-3">
                                <Button variant="outline" disabled><CreditCard className="mr-2"/>Connect Stripe</Button>
                                <Button variant="outline" disabled><CreditCard className="mr-2"/>Connect Razorpay</Button>
                                <Button variant="outline" disabled><CreditCard className="mr-2"/>Connect PayPal</Button>
                            </div>
                            <Image src="https://placehold.co/400x80/EBF4FF/3B82F6?text=Payment+Gateway+Logos" alt="Payment gateway logos" width={400} height={80} className="mt-4 rounded object-contain" data-ai-hint="stripe razorpay paypal logos"/>
                        </Card>
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button type="submit" disabled={isSubmittingFinancial}>
                        {isSubmittingFinancial && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Financial Settings
                    </Button>
                </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="mt-0">
          <Card className="shadow-md border bg-card">
            <CardHeader>
              <CardTitle className="text-xl">Security & Moderation</CardTitle>
              <CardDescription>Manage platform security features, content moderation policies, and approval workflows.</CardDescription>
            </CardHeader>
            <form onSubmit={securityForm.handleSubmit(data => onSubmit(data, "Security", setIsSubmittingSecurity))}>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 border rounded-md bg-background hover:border-primary/30 transition-colors">
                        <div>
                            <Label htmlFor="enable2FA" className="font-medium">Enable Two-Factor Authentication (2FA) for Admins</Label>
                            <p className="text-xs text-muted-foreground">Enhance security for admin and staff accounts.</p>
                        </div>
                        <Controller name="enable2FA" control={securityForm.control} render={({ field }) => <Switch id="enable2FA" checked={field.value} onCheckedChange={field.onChange} />} />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-md bg-background hover:border-primary/30 transition-colors">
                        <div>
                            <Label htmlFor="autoApproveSellers" className="font-medium">Auto-Approve New Sellers</Label>
                            <p className="text-xs text-muted-foreground">If disabled, admins must manually verify each new seller application.</p>
                        </div>
                        <Controller name="autoApproveSellers" control={securityForm.control} render={({ field }) => <Switch id="autoApproveSellers" checked={field.value} onCheckedChange={field.onChange} />} />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-md bg-background hover:border-primary/30 transition-colors">
                        <div>
                            <Label htmlFor="autoApproveCourses" className="font-medium">Auto-Approve New Courses (from Verified Sellers)</Label>
                            <p className="text-xs text-muted-foreground">If disabled, all courses require admin review, even from verified sellers.</p>
                        </div>
                        <Controller name="autoApproveCourses" control={securityForm.control} render={({ field }) => <Switch id="autoApproveCourses" checked={field.value} onCheckedChange={field.onChange} />} />
                    </div>
                     <div>
                        <Label htmlFor="contentModerationLevel">Content Moderation Level (Courses & Reviews) *</Label>
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
                            <CardDescription className="mb-3">Manage API keys for third-party services, analytics, or custom integrations. (Conceptual)</CardDescription>
                            <Button variant="outline" className="mt-2" disabled><Settings className="mr-2"/>Manage API Keys & Webhooks</Button>
                        </Card>
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button type="submit" disabled={isSubmittingSecurity}>
                        {isSubmittingSecurity && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Security Settings
                    </Button>
                </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="theme" className="mt-0">
          <Card className="shadow-md border bg-card">
            <CardHeader>
              <CardTitle className="text-xl">Theme & Customization</CardTitle>
              <CardDescription>Customize the look and feel of the platform. (Changes may require CSS updates).</CardDescription>
            </CardHeader>
            <form onSubmit={themeForm.handleSubmit(data => onSubmit(data, "Theme", setIsSubmittingTheme))}>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="primaryColor">Primary Theme Color (Hex) *</Label>
                            <div className="flex items-center gap-2">
                                <Input id="primaryColor" {...themeForm.register('primaryColor')} placeholder="#3B82F6" />
                                <div style={{ backgroundColor: themeForm.watch('primaryColor') || '#ffffff' }} className="h-10 w-10 rounded-md border"/>
                            </div>
                            {themeForm.formState.errors.primaryColor && <p className="text-sm text-destructive mt-1">{themeForm.formState.errors.primaryColor.message}</p>}
                            <p className="text-xs text-muted-foreground mt-1">Changes require updating HSL variables in `globals.css` and potentially a theme rebuild.</p>
                        </div>
                        <div>
                            <Label htmlFor="fontFamily">Default Font Family *</Label>
                            <Controller name="fontFamily" control={themeForm.control} render={({field}) => (
                                <select {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                    <option value="Inter">Inter (Default)</option>
                                    <option value="Roboto">Roboto</option>
                                    <option value="Open Sans">Open Sans</option>
                                    <option value="Lato">Lato</option>
                                </select>
                            )}/>
                            {themeForm.formState.errors.fontFamily && <p className="text-sm text-destructive mt-1">{themeForm.formState.errors.fontFamily.message}</p>}
                        </div>
                    </div>
                     <div>
                        <Label>Notification Email Templates</Label>
                        <Card className="p-4 bg-muted/30 border-dashed">
                            <CardDescription className="mb-3">Customize templates for welcome emails, order confirmations, course updates, etc. (Conceptual)</CardDescription>
                            <Button variant="outline" disabled><Bell className="mr-2"/>Edit Email Templates</Button>
                        </Card>
                    </div>
                     <div>
                        <Label>Seller Store Customization Options</Label>
                        <Card className="p-4 bg-muted/30 border-dashed">
                            <CardDescription className="mb-3">Define what aspects of their store page sellers can customize (e.g., banner, featured courses). (Conceptual)</CardDescription>
                            <Button variant="outline" disabled><Briefcase className="mr-2"/>Seller Store Settings</Button>
                        </Card>
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button type="submit" disabled={isSubmittingTheme}>
                        {isSubmittingTheme && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
