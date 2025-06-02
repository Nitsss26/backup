
"use client";

import { useState, useEffect } from 'react';
import { placeholderUsers } from '@/lib/placeholder-data';
import type { User } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoreHorizontal, Search, CheckCircle, XCircle, ShieldCheck, UserCog, FileText, ShieldAlert, ShieldQuestion, Mail, UserPlus, Download, Filter, Users as UsersIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const [userToVerify, setUserToVerify] = useState<User | null>(null);
  const [verificationAction, setVerificationAction] = useState<'verified' | 'rejected' | null>(null);
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    setUsers(placeholderUsers);
  }, []);

  const filteredUsers = users.filter(user =>
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterRole === 'all' || user.role === filterRole) &&
    (filterStatus === 'all' || (user.role === 'provider' && user.verificationStatus === filterStatus))
  );
  
  const getVerificationStatusBadge = (status?: 'pending' | 'verified' | 'rejected' | 'unverified') => {
    switch (status) {
      case 'pending': return <Badge variant="warning"><ShieldQuestion />Pending</Badge>;
      case 'verified': return <Badge variant="success"><ShieldCheck />Verified</Badge>;
      case 'rejected': return <Badge variant="destructive"><ShieldAlert />Rejected</Badge>;
      case 'unverified': return <Badge variant="info"><ShieldQuestion />Unverified</Badge>; // Use info for unverified
      default: return null;
    }
  };

  const confirmVerificationAction = () => {
    if (!userToVerify || !verificationAction) return;

    setUsers(prevUsers => prevUsers.map(u => u.id === userToVerify.id ? { ...u, verificationStatus: verificationAction } : u));
    toast({
        title: `Seller ${verificationAction === 'verified' ? 'Approved' : 'Rejected'}`,
        description: `User ${userToVerify.name} (${userToVerify.email}) has been ${verificationAction}.`,
        variant: verificationAction === 'rejected' ? 'destructive' : 'success'
    });
    setUserToVerify(null);
    setVerificationAction(null);
  };

  const getRoleBadgeVariant = (role: User['role']): "default" | "secondary" | "info" => {
    if (role === 'admin') return 'default'; // Primary color
    if (role === 'provider') return 'secondary'; // Secondary theme color
    return 'info'; // Neutral/info blue for student
  }

  return (
    <div className="space-y-8">
       <Card className="shadow-xl border-l-4 border-primary">
        <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-md">
                 <UsersIcon className="h-8 w-8 text-primary"/>
            </div>
            <div>
                <CardTitle className="text-2xl font-headline text-primary">User Management</CardTitle>
                <CardDescription>View, manage user accounts, roles, and seller verification statuses. Total Users: {users.length}</CardDescription>
            </div>
        </CardHeader>
        <CardContent className="pt-0">
            <div className="flex flex-col md:flex-row gap-4 mt-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full bg-background"
                    />
                </div>
                <div className="flex gap-2 flex-shrink-0">
                    <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="flex h-10 w-full md:w-auto rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option value="all">All Roles</option>
                        <option value="student">Student</option>
                        <option value="provider">Provider</option>
                        <option value="admin">Admin</option>
                    </select>
                    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="flex h-10 w-full md:w-auto rounded-md border border-input bg-background px-3 py-2 text-sm" disabled={filterRole !== 'provider'}>
                        <option value="all">All Statuses</option>
                        <option value="verified">Verified</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                        <option value="unverified">Unverified</option>
                    </select>
                </div>
                 <Button variant="outline" disabled className="flex-shrink-0">
                    <UserPlus className="mr-2 h-4 w-4"/> Add New User
                </Button>
            </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardContent className="p-0">
          {filteredUsers.length > 0 ? (
            <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead>Verification Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map(user => (
                  <TableRow key={user.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border">
                          <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={`${user.role} user avatar admin panel`}/>
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                           <span className="text-sm font-semibold text-foreground">{user.name}</span>
                           <span className="text-xs text-muted-foreground">ID: {user.id.substring(0,6)}...</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{user.email}</TableCell>
                    <TableCell>
                        <Badge variant={getRoleBadgeVariant(user.role)} className="capitalize">
                            {user.role}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</TableCell>
                    <TableCell>
                      {user.role === 'provider' ? getVerificationStatusBadge(user.verificationStatus) : <span className="text-muted-foreground text-sm">-</span>}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions for {user.name}</DropdownMenuLabel>
                          <DropdownMenuSeparator/>
                          {user.role === 'provider' && user.documentsSubmitted && (
                            <DropdownMenuItem disabled> {/* Placeholder for view documents modal */}
                              <FileText className="mr-2 h-4 w-4" /> View Submitted Documents
                            </DropdownMenuItem>
                          )}
                          {user.role === 'provider' && user.verificationStatus === 'pending' && (
                            <>
                              <DropdownMenuItem onClick={() => {setUserToVerify(user); setVerificationAction('verified')}} className="text-success-foreground focus:text-success-foreground focus:bg-success/20">
                                <CheckCircle className="mr-2 h-4 w-4 text-success" /> Approve Seller
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {setUserToVerify(user); setVerificationAction('rejected')}} className="text-destructive-foreground focus:text-destructive-foreground focus:bg-destructive/20">
                                <XCircle className="mr-2 h-4 w-4 text-destructive" /> Reject Seller
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                            </>
                          )}
                          <DropdownMenuItem disabled>
                            <UserCog className="mr-2 h-4 w-4" /> Edit User Details
                          </DropdownMenuItem>
                          <DropdownMenuItem disabled>
                            <Mail className="mr-2 h-4 w-4" /> Send Message
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem disabled className="text-destructive-foreground focus:text-destructive-foreground focus:bg-destructive/20">
                            <ShieldAlert className="mr-2 h-4 w-4 text-destructive" /> Suspend User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
          ) : (
             <div className="text-center py-16 text-muted-foreground">
                <UsersIcon className="h-16 w-16 mx-auto mb-4 text-border"/>
                <p className="font-semibold text-lg">No users found matching your criteria.</p>
                <p className="text-sm">Try adjusting your search or filters, or check back later.</p>
                <Image src="https://placehold.co/400x250/EBF4FF/3B82F6?text=No+Users+Illustration" alt="Illustration for no users found" width={400} height={250} className="mt-6 mx-auto rounded-md" data-ai-hint="empty state no data users list"/>
            </div>
          )}
        </CardContent>
        <CardFooter className="border-t pt-4">
            <p className="text-xs text-muted-foreground">Showing {filteredUsers.length} of {users.length} total users.</p>
             <Button variant="outline" disabled className="ml-auto"><Download className="mr-2 h-4 w-4"/> Export Users</Button>
        </CardFooter>
      </Card>

      {userToVerify && verificationAction && (
        <AlertDialog open onOpenChange={() => {setUserToVerify(null); setVerificationAction(null);}}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Seller Verification</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to <span className={cn("font-semibold", verificationAction === 'verified' ? "text-success" : "text-destructive")}>{verificationAction}</span> the seller account for "{userToVerify.name}"?
                This action will update their verification status.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => {setUserToVerify(null); setVerificationAction(null);}}>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmVerificationAction} 
                className={cn(verificationAction === 'verified' ? "bg-success hover:bg-success/90" : "bg-destructive hover:bg-destructive/90")}
              >
                Yes, {verificationAction === 'verified' ? 'Approve' : 'Reject'} Seller
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
