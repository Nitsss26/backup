"use client";

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
import { Loader2, Settings, Percent, ShieldCheck, Mail } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const generalSettingsSchema = z.object({
  platformName: z.string().min(3, "Platform name must be at least 3 characters"),
  platformDescription: z.string().max(200, "Description too long").optional(),
  adminEmail: z.string().email("Invalid admin email"),
});

const financialSettingsSchema = z.object({
  commissionRate: z.coerce.number().min(0).max(100, "Commission rate must be between 0 and 100"),
  payoutSchedule: z.enum(['monthly', 'bi-weekly', 'weekly']),
});

const securitySettingsSchema = z.object({
  enable2FA: z.boolean().default(false),
  contentModerationLevel: z.enum(['low', 'medium', 'high']),
});

type GeneralSettingsValues = z.infer<typeof generalSettingsSchema>;
type FinancialSettingsValues = z.infer<typeof financialSettingsSchema>;
type SecuritySettingsValues = z.infer<typeof securitySettingsSchema>;

export default function AdminSettingsPage() {
  const { toast } = useToast();
  // Mock current settings - in a real app, these would be fetched
  const currentSettings = {
    general: { platformName: "EdTechCart", platformDescription: "Your favorite learning place!", adminEmail: "admin@edtechcart.com" },
    financial: { commissionRate: 15, payoutSchedule: 'monthly' },
    security: { enable2FA: false, contentModerationLevel: 'medium' },
  };

  const generalForm = useForm<GeneralSettingsValues>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: currentSettings.general,
  });
  const financialForm = useForm<FinancialSettingsValues>({
    resolver: zodResolver(financialSettingsSchema),
    defaultValues: currentSettings.financial,
  });
  const securityForm = useForm<SecuritySettingsValues>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues: currentSettings.security,
  });

  const [isSubmittingGeneral, setIsSubmittingGeneral] = React.useState(false);
  const [isSubmittingFinancial, setIsSubmittingFinancial] = React.useState(false);
  const [isSubmittingSecurity, setIsSubmittingSecurity] = React.useState(false);

  const onGeneralSubmit = async (data: GeneralSettingsValues) => {
    setIsSubmittingGeneral(true);
    console.log("General settings update:", data);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API
    toast({ title: "General Settings Updated" });
    setIsSubmittingGeneral(false);
  };
  const onFinancialSubmit = async (data: FinancialSettingsValues) => {
    setIsSubmittingFinancial(true);
    console.log("Financial settings update:", data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({ title: "Financial Settings Updated" });
    setIsSubmittingFinancial(false);
  };
  const onSecuritySubmit = async (data: SecuritySettingsValues) => {
    setIsSubmittingSecurity(true);
    console.log("Security settings update:", data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({ title: "Security Settings Updated" });
    setIsSubmittingSecurity(false);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline flex items-center"><Settings className="mr-3 h-8 w-8"/>Platform Settings</h1>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:w-auto">
          <TabsTrigger value="general"><Settings className="mr-2 h-4 w-4 inline-block"/>General</TabsTrigger>
          <TabsTrigger value="financial"><Percent className="mr-2 h-4 w-4 inline-block"/>Financial</TabsTrigger>
          <TabsTrigger value="security"><ShieldCheck className="mr-2 h-4 w-4 inline-block"/>Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>General Platform Settings</CardTitle>
              <CardDescription>Manage basic information and contact details for the platform.</CardDescription>
            </CardHeader>
            <form onSubmit={generalForm.handleSubmit(onGeneralSubmit)}>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="platformName">Platform Name</Label>
                  <Input id="platformName" {...generalForm.register('platformName')} />
                  {generalForm.formState.errors.platformName && <p className="text-sm text-destructive mt-1">{generalForm.formState.errors.platformName.message}</p>}
                </div>
                <div>
                  <Label htmlFor="platformDescription">Platform Tagline/Description</Label>
                  <Textarea id="platformDescription" {...generalForm.register('platformDescription')} rows={3} />
                  {generalForm.formState.errors.platformDescription && <p className="text-sm text-destructive mt-1">{generalForm.formState.errors.platformDescription.message}</p>}
                </div>
                <div>
                  <Label htmlFor="adminEmail">Default Admin Email</Label>
                  <Input id="adminEmail" type="email" {...generalForm.register('adminEmail')} />
                   {generalForm.formState.errors.adminEmail && <p className="text-sm text-destructive mt-1">{generalForm.formState.errors.adminEmail.message}</p>}
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

        <TabsContent value="financial" className="mt-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Financial Settings</CardTitle>
              <CardDescription>Configure commission rates, payout schedules, and payment gateways.</CardDescription>
            </CardHeader>
            <form onSubmit={financialForm.handleSubmit(onFinancialSubmit)}>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="commissionRate">Platform Commission Rate (%)</Label>
                        <Input id="commissionRate" type="number" {...financialForm.register('commissionRate')} />
                        {financialForm.formState.errors.commissionRate && <p className="text-sm text-destructive mt-1">{financialForm.formState.errors.commissionRate.message}</p>}
                    </div>
                     <div>
                        <Label htmlFor="payoutSchedule">Seller Payout Schedule</Label>
                        {/* <Controller name="payoutSchedule" control={financialForm.control} render/> Replace with Select */}
                        <select {...financialForm.register('payoutSchedule')} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                            <option value="monthly">Monthly</option>
                            <option value="bi-weekly">Bi-Weekly</option>
                            <option value="weekly">Weekly</option>
                        </select>
                        {financialForm.formState.errors.payoutSchedule && <p className="text-sm text-destructive mt-1">{financialForm.formState.errors.payoutSchedule.message}</p>}
                    </div>
                    <div>
                        <Label>Payment Gateway Configuration (Placeholder)</Label>
                        <p className="text-sm text-muted-foreground">API Keys and settings for Stripe, PayPal, etc. would go here.</p>
                        <Button variant="outline" className="mt-2" disabled>Configure Payment Gateways</Button>
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
        
        <TabsContent value="security" className="mt-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Security & Moderation</CardTitle>
              <CardDescription>Manage platform security features and content moderation policies.</CardDescription>
            </CardHeader>
            <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)}>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                            <Label htmlFor="enable2FA" className="font-medium">Enable Two-Factor Authentication (2FA) for Admins</Label>
                            <p className="text-xs text-muted-foreground">Enhance security for admin accounts.</p>
                        </div>
                        <Controller name="enable2FA" control={securityForm.control} render={({ field }) => <Switch id="enable2FA" checked={field.value} onCheckedChange={field.onChange} />} />
                    </div>
                     <div>
                        <Label htmlFor="contentModerationLevel">Content Moderation Level</Label>
                        {/* <Controller name="contentModerationLevel" control={securityForm.control} render/> Replace with Select */}
                        <select {...securityForm.register('contentModerationLevel')} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                            <option value="low">Low (Manual for reported content)</option>
                            <option value="medium">Medium (Automated checks + manual review)</option>
                            <option value="high">High (Strict automated checks + mandatory manual review)</option>
                        </select>
                        {securityForm.formState.errors.contentModerationLevel && <p className="text-sm text-destructive mt-1">{securityForm.formState.errors.contentModerationLevel.message}</p>}
                    </div>
                    <div>
                        <Label>API Access & Integrations (Placeholder)</Label>
                        <p className="text-sm text-muted-foreground">Manage API keys for third-party services.</p>
                         <Button variant="outline" className="mt-2" disabled>Manage API Keys</Button>
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

      </Tabs>
    </div>
  );
}
