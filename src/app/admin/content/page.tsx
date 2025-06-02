"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit3, FileText, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function AdminContentPage() {
  // Mock data for manageable content types
  const contentTypes = [
    { name: "FAQs", description: "Manage Frequently Asked Questions.", icon: FileText, editLink: "/admin/content/faqs" },
    { name: "Terms of Service", description: "Update platform terms and conditions.", icon: FileText, editLink: "/admin/content/terms" },
    { name: "Privacy Policy", description: "Modify the privacy policy.", icon: FileText, editLink: "/admin/content/privacy" },
    { name: "Homepage Banners", description: "Update promotional banners on the homepage.", icon: Edit3, editLink: "/admin/content/banners" },
    { name: "Blog Posts", description: "Create and manage blog articles.", icon: Edit3, editLink: "/admin/content/blog" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-headline">Platform Content Management</h1>
        <Button><PlusCircle className="mr-2 h-4 w-4"/> Add New Content Block</Button>
      </div>
      
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Manageable Content Areas</CardTitle>
          <CardDescription>
            Edit various text-based and promotional content across the platform. 
            This section is a placeholder for a more robust CMS.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contentTypes.map((type) => (
            <Card key={type.name} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <type.icon className="h-8 w-8 text-primary" />
                <CardTitle className="text-lg">{type.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{type.description}</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href={type.editLink}><Edit3 className="mr-2 h-3 w-3"/> Edit {type.name}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
            <CardTitle>Static Page Editor (Conceptual)</CardTitle>
            <CardDescription>A simplified interface to edit predefined static pages like 'About Us' or 'Contact Us'. In a real system, this would involve rich text editors and versioning.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">
                Future functionality: Select a page (e.g., About Us, Contact Info) and edit its content using a WYSIWYG editor.
            </p>
             <Button className="mt-4" disabled>Load Page Editor (Coming Soon)</Button>
        </CardContent>
      </Card>

    </div>
  );
}
