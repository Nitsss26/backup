"use client";

import React from 'react';
import DashboardLayout from '@/app/dashboard/layout';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout wraps the generic DashboardLayout to ensure consistent styling
  // for all admin pages.
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}
