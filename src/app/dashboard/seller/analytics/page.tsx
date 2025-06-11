
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import Image from "next/image";

export default function SellerAnalyticsPage() {
  return (
    <div className="space-y-8 w-full">
      <Card className="shadow-xl border-l-4 border-primary">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-md">
            <BarChart3 className="h-8 w-8 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl font-headline text-primary">Seller Course Analytics</CardTitle>
            <CardDescription>Track performance of your courses, student engagement, and revenue details.</CardDescription>
          </div>
        </CardHeader>
      </Card>

      <Card className="shadow-lg border bg-card">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Detailed Analytics (Coming Soon)</CardTitle>
          <CardDescription>
            This section will provide detailed insights specific to your courses, including enrollment trends,
            student progress, revenue per course, and review statistics.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          <Image 
            src="https://placehold.co/600x350/EBF4FF/3B82F6?text=Seller+Analytics+Placeholder" 
            alt="Seller analytics charts placeholder" 
            width={600} 
            height={350}
            className="mx-auto rounded-lg shadow-md"
            data-ai-hint="seller dashboard course performance charts interface"
          />
          <p className="mt-6 text-muted-foreground">
            Detailed course-specific analytics are under development.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
