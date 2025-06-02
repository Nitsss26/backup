
"use client";

import { useState, useEffect } from 'react';
import { placeholderUsers } from '@/lib/placeholder-data';
import type { User } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoreHorizontal, Search, CheckCircle, XCircle, ShieldCheck, UserCog, FileText, ShieldAlert, ShieldQuestion, Mail, UserPlus, Download, Filter } from 'lucide-react';
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
      case 'pending': return <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200"><ShieldQuestion className="mr-1 h-3.5 w-3.5"/>Pending</Badge>;
      case 'verified': return <Badge variant="default" className="bg-green-100 text-green-700 border-green-300 hover:bg-green-200"><ShieldCheck className="mr-1 h-3.5 w-3.5"/>Verified</Badge>;
      case 'rejected': return <Badge variant="destructive" className="bg-red-100 text-red-700 border-red-300 hover:bg-red-200"><ShieldAlert className="mr-1 h-3.5 w-3.5"/>Rejected</Badge>;
      case 'unverified': return <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-slate-300">Unverified</Badge>;
      default: return null;
    }
  };

  const confirmVerificationAction = () => {
    if (!userToVerify || !verificationAction) return;

    setUsers(prevUsers => prevUsers.map(u => u.id === userToVerify.id ? { ...u, verificationStatus: verificationAction } : u));
    toast({
        title: `Seller ${verificationAction === 'verified' ? 'Approved' : 'Rejected'}`,
        description: `User ${userToVerify.name} (${userToVerify.email}) has been ${verificationAction}.`,
        variant: verificationAction === 'rejected' ? 'destructive' : 'default'
    });
    setUserToVerify(null);
    setVerificationAction(null);
  };

  const getRoleBadgeVariant = (role: User['role']) => {
    if (role === 'admin') return 'default';
    if (role === 'provider') return 'secondary';
    return 'outline';
  }
  const getRoleBadgeColorClass = (role: User['role']) => {
    if (role === 'admin') return 'bg-primary/80 text-primary-foreground';
    if (role === 'provider') return 'bg-blue-100 text-blue-700 border-blue-300';
    return 'bg-slate-100 text-slate-700 border-slate-300';
  }


  return (
    <div className="space-y-8">
      <Card className="shadow-lg border bg-card">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-headline">User Management</CardTitle>
              <CardDescription>View, manage user accounts, roles, and seller verification statuses.</CardDescription>
            </div>
            <div className="flex gap-2 flex-wrap">
                <Button variant="outline" disabled>
                    <UserPlus className="mr-2 h-4 w-4"/> Add New User
                </Button>
                 <Button variant="outline" disabled>
                    <Download className="mr-2 h-4 w-4"/> Export Users
                </Button>
            </div>
          </div>
          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full bg-background"
                />
            </div>
            <div className="flex gap-2">
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
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {filteredUsers.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead>Verification Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map(user => (
                  <TableRow key={user.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={`${user.role} user avatar admin panel`}/>
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                           <span className="text-sm font-semibold">{user.name}</span>
                           <span className="text-xs text-muted-foreground">ID: {user.id.substring(0,6)}...</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{user.email}</TableCell>
                    <TableCell>
                        <Badge variant={getRoleBadgeVariant(user.role)} className={cn("capitalize", getRoleBadgeColorClass(user.role))}>
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
                              <DropdownMenuItem onClick={() => {setUserToVerify(user); setVerificationAction('verified')}} className="text-green-600 focus:text-green-700 focus:bg-green-50">
                                <CheckCircle className="mr-2 h-4 w-4" /> Approve Seller
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {setUserToVerify(user); setVerificationAction('rejected')}} className="text-red-600 focus:text-red-700 focus:bg-red-50">
                                <XCircle className="mr-2 h-4 w-4" /> Reject Seller
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
                          <DropdownMenuItem disabled className="text-orange-600 focus:text-orange-700 focus:bg-orange-50"> {/* Example of another destructive action style */}
                            <ShieldAlert className="mr-2 h-4 w-4" /> Suspend User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
             <div className="text-center py-16 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-3 text-border"/>
                <p className="font-semibold">No users found matching your criteria.</p>
                <p className="text-sm">Try adjusting your search or filters.</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
            <p className="text-xs text-muted-foreground">Showing {filteredUsers.length} of {users.length} total users.</p>
            {/* Pagination placeholder */}
        </CardFooter>
      </Card>

      {userToVerify && verificationAction && (
        <AlertDialog open onOpenChange={() => {setUserToVerify(null); setVerificationAction(null);}}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Seller Verification</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to <span className={cn("font-semibold", verificationAction === 'verified' ? "text-green-600" : "text-red-600")}>{verificationAction}</span> the seller account for "{userToVerify.name}"?
                This action will update their verification status.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => {setUserToVerify(null); setVerificationAction(null);}}>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmVerificationAction} 
                className={cn(verificationAction === 'verified' ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700")}
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
