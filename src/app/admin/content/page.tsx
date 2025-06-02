
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit3, FileText, PlusCircle, LayoutList, Image as ImageIcon, Info, FileQuestion, Settings, Link2, Palette, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from 'next/image'; // Import next/image

export default function AdminContentPage() {
  const contentTypes = [
    { name: "FAQs", description: "Manage Frequently Asked Questions for the Help Center.", icon: FileQuestion, editLink: "/admin/content/faqs", imageHint: "faq help content management interface" },
    { name: "Terms of Service", description: "Update platform terms and conditions documentation.", icon: FileText, editLink: "/admin/content/terms", imageHint: "legal document terms of service editing" },
    { name: "Privacy Policy", description: "Modify the privacy policy content and statements.", icon: Info, editLink: "/admin/content/privacy", imageHint: "privacy policy document management" },
    { name: "Homepage Banners", description: "Update promotional banners and hero section content.", icon: ImageIcon, editLink: "/admin/content/banners", imageHint: "website banner promotion design" },
    { name: "Blog Posts & Categories", description: "Create, edit, and manage blog articles and their categories.", icon: Edit3, editLink: "/admin/content/blog", imageHint: "blog writing content creation interface" },
    { name: "Platform Announcements", description: "Post sitewide announcements or important notifications.", icon: LayoutList, editLink: "/admin/content/announcements", imageHint: "announcement megaphone system broadcast" },
    { name: "Footer Links", description: "Manage links displayed in the website footer sections.", icon: Link2, editLink: "/admin/content/footer-links", imageHint: "website footer link management editor" },
    { name: "Email Templates", description: "Customize system-generated email templates (e.g., welcome, password reset).", icon: MessageSquare, editLink: "/admin/content/email-templates", imageHint: "email template editor design tool" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold font-headline">Platform Content Management</h1>
        <Button variant="default" disabled> {/* Placeholder for a more complex "add content" flow */}
            <PlusCircle className="mr-2 h-4 w-4"/> Add New Custom Block
        </Button>
      </div>
      
      <Card className="shadow-lg border bg-card">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Manageable Content Areas</CardTitle>
          <CardDescription>
            Edit various text-based, promotional, and informational content across the platform. 
            Select a content type below to manage its entries or settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {contentTypes.map((type) => (
            <Card key={type.name} className="hover:shadow-xl transition-shadow duration-300 flex flex-col border bg-background hover:border-primary/50">
                <CardHeader className="flex-row items-center gap-4 space-y-0 pb-3">
                    <type.icon className="h-10 w-10 text-primary shrink-0" />
                    <CardTitle className="text-lg font-semibold">{type.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground mb-4 h-16 line-clamp-3">{type.description}</p>
                    <div className="aspect-[16/9] w-full rounded-md overflow-hidden mb-4 bg-muted">
                        <Image src={`https://placehold.co/300x170.png`} alt={type.name} width={300} height={170} className="object-cover w-full h-full" data-ai-hint={type.imageHint} />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href={type.editLink}><Edit3 className="mr-2 h-3.5 w-3.5"/> Edit {type.name}</Link>
                    </Button>
              </CardFooter>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-lg border bg-card">
        <CardHeader>
            <CardTitle  className="text-2xl font-headline">Static Page Editor (Conceptual)</CardTitle>
            <CardDescription>A simplified interface to edit predefined static pages like 'About Us' or 'Contact Us'. In a real system, this would involve rich text editors, versioning, and more granular controls.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                 <div>
                    <Label htmlFor="pageSelect">Select Page to Edit</Label>
                    <select id="pageSelect" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option value="">-- Select a Page --</option>
                        <option value="about">About Us</option>
                        <option value="contact">Contact Page Details</option>
                        <option value="help-overview">Help Center Overview</option>
                        <option value="sell-courses">Sell on EdTechCart Page</option>
                    </select>
                </div>
                 <div>
                    <Label htmlFor="pageTitle">Page Title (Meta)</Label>
                    <Input id="pageTitle" placeholder="Enter page meta title"/>
                </div>
            </div>
            <div>
                <Label htmlFor="pageContent">Page Content (Markdown Supported)</Label>
                <Textarea id="pageContent" rows={10} placeholder="Enter page content here... Use Markdown for formatting." className="min-h-[200px]"/>
            </div>
             <Button className="mt-4" disabled>Load Page Editor (Coming Soon)</Button>
        </CardContent>
      </Card>

       <Card className="shadow-lg border bg-card">
        <CardHeader>
            <CardTitle className="text-2xl font-headline">SEO & Metadata Management</CardTitle>
            <CardDescription>Configure default SEO settings, meta tags for key pages, and social sharing information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <Label htmlFor="metaTitle">Default Meta Title Suffix</Label>
                    <Input id="metaTitle" defaultValue={` | ${process.env.NEXT_PUBLIC_APP_NAME || 'EdTechCart'}`}/>
                </div>
                 <div>
                    <Label htmlFor="defaultKeywords">Default Meta Keywords</Label>
                    <Input id="defaultKeywords" placeholder="e.g., online courses, e-learning, education"/>
                </div>
            </div>
            <div>
                <Label htmlFor="metaDescription">Default Meta Description</Label>
                <Textarea id="metaDescription" rows={3} placeholder="Enter default meta description for pages... (max 160 characters)"/>
            </div>
            <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="mt-2" disabled><Settings className="mr-2 h-4 w-4"/>Advanced SEO Settings</Button>
                <Button variant="outline" className="mt-2" disabled><Palette className="mr-2 h-4 w-4"/>Social Sharing Defaults</Button>
            </div>
        </CardContent>
      </Card>

    </div>
  );
}
