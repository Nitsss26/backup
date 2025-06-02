
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit3, FileText, PlusCircle, LayoutList, Image as ImageIcon, Info, FileQuestion } from "lucide-react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminContentPage() {
  // Mock data for manageable content types
  const contentTypes = [
    { name: "FAQs", description: "Manage Frequently Asked Questions for the Help Center.", icon: FileQuestion, editLink: "/admin/content/faqs", imageHint: "faq help content management" },
    { name: "Terms of Service", description: "Update platform terms and conditions.", icon: FileText, editLink: "/admin/content/terms", imageHint: "legal document terms" },
    { name: "Privacy Policy", description: "Modify the privacy policy content.", icon: Info, editLink: "/admin/content/privacy", imageHint: "privacy policy document" },
    { name: "Homepage Banners", description: "Update promotional banners and hero section content.", icon: ImageIcon, editLink: "/admin/content/banners", imageHint: "website banner promotion" },
    { name: "Blog Posts", description: "Create and manage blog articles and categories.", icon: Edit3, editLink: "/admin/content/blog", imageHint: "blog writing content" },
    { name: "Platform Announcements", description: "Post sitewide announcements or notifications.", icon: LayoutList, editLink: "/admin/content/announcements", imageHint: "announcement megaphone system" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold font-headline">Platform Content Management</h1>
        <Button variant="default" disabled> {/* Placeholder for a more complex "add content" flow */}
            <PlusCircle className="mr-2 h-4 w-4"/> Add New Custom Block
        </Button>
      </div>
      
      <Card className="shadow-lg border">
        <CardHeader>
          <CardTitle className="text-2xl">Manageable Content Areas</CardTitle>
          <CardDescription>
            Edit various text-based, promotional, and informational content across the platform. 
            Select a content type below to manage its entries or settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contentTypes.map((type) => (
            <Card key={type.name} className="hover:shadow-xl transition-shadow flex flex-col border">
                <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-3">
                    <type.icon className="h-8 w-8 text-primary" />
                    <CardTitle className="text-lg font-semibold">{type.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground mb-4">{type.description}</p>
                    <img src={`https://placehold.co/300x150.png`} alt={type.name} className="rounded-md mb-4 object-cover w-full h-24" data-ai-hint={type.imageHint} />
                </CardContent>
                <CardFooter>
                    <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href={type.editLink}><Edit3 className="mr-2 h-3 w-3"/> Edit {type.name}</Link>
                    </Button>
              </CardFooter>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-lg border">
        <CardHeader>
            <CardTitle  className="text-2xl">Static Page Editor (Conceptual)</CardTitle>
            <CardDescription>A simplified interface to edit predefined static pages like 'About Us' or 'Contact Us'. In a real system, this would involve rich text editors, versioning, and more granular controls.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
                 <div>
                    <Label htmlFor="pageSelect">Select Page to Edit</Label>
                    <select id="pageSelect" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option value="">-- Select a Page --</option>
                        <option value="about">About Us</option>
                        <option value="contact">Contact Page Details</option>
                        <option value="help-overview">Help Center Overview</option>
                    </select>
                </div>
                 <div>
                    <Label htmlFor="pageTitle">Page Title</Label>
                    <Input id="pageTitle" placeholder="Enter page title"/>
                </div>
            </div>
            <div>
                <Label htmlFor="pageContent">Page Content (Markdown Supported)</Label>
                <Textarea id="pageContent" rows={10} placeholder="Enter page content here... Use Markdown for formatting."/>
            </div>
             <Button className="mt-4" disabled>Load Page Editor (Coming Soon)</Button>
        </CardContent>
      </Card>

       <Card className="shadow-lg border">
        <CardHeader>
            <CardTitle className="text-2xl">SEO & Metadata Management</CardTitle>
            <CardDescription>Configure default SEO settings, meta tags for key pages, and social sharing information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div>
                <Label htmlFor="metaTitle">Default Meta Title Suffix</Label>
                <Input id="metaTitle" defaultValue={` | ${process.env.NEXT_PUBLIC_APP_NAME || 'EdTechCart'}`}/>
            </div>
            <div>
                <Label htmlFor="metaDescription">Default Meta Description</Label>
                <Textarea id="metaDescription" rows={3} placeholder="Enter default meta description for pages..."/>
            </div>
            <Button variant="outline" className="mt-2" disabled>Advanced SEO Settings</Button>
        </CardContent>
      </Card>

    </div>
  );
}
