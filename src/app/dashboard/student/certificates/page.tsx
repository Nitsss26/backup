"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { placeholderCertificates } from "@/lib/placeholder-data";
import type { Certificate } from '@/lib/types';
import { Award, Download, Eye } from 'lucide-react';

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Mock fetching certificates for the logged-in student
    setCertificates(placeholderCertificates); 
  }, []);

  if (!isClient) {
    return <div className="text-center py-10">Loading your certificates...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-headline">My Certificates</h1>
        <Button variant="outline" asChild>
          <Link href="/courses">Explore More Courses</Link>
        </Button>
      </div>

      {certificates.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map(cert => (
            <Card key={cert.id} className="shadow-sm hover:shadow-lg transition-shadow">
              <CardHeader className="bg-primary/10 p-6">
                <div className="flex items-center gap-3">
                  <Award className="h-10 w-10 text-primary" />
                  <div>
                    <CardTitle className="text-lg font-semibold line-clamp-2">{cert.courseTitle}</CardTitle>
                    <p className="text-xs text-muted-foreground">Issued on: {new Date(cert.issueDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <p className="text-sm text-muted-foreground">
                  This certificate acknowledges your successful completion of the course: <span className="font-medium text-foreground">{cert.courseTitle}</span>.
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="default" asChild>
                    <Link href={cert.certificateUrl} target="_blank" rel="noopener noreferrer"> {/* Placeholder PDF link */}
                      <Download className="mr-2 h-4 w-4" /> Download PDF
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                     <Link href={`/courses/${cert.courseId}`}> {/* Link back to course */}
                       <Eye className="mr-2 h-4 w-4" /> View Course
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Certificates Yet</h2>
          <p className="text-muted-foreground mb-4">Complete courses to earn certificates and showcase your skills.</p>
          <Button asChild>
            <Link href="/dashboard/student/courses">View My Courses</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
