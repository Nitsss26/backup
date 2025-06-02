
"use client";

import { useState, useEffect } from 'react';
import { placeholderUsers } from '@/lib/placeholder-data';
import type { User } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoreHorizontal, Search, CheckCircle, XCircle, ShieldCheck, UserCog, FileText, ShieldAlert, ShieldQuestion, Mail, UserPlus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
} from "@/components/ui/alert-dialog"

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const [userToVerify, setUserToVerify] = useState<User | null>(null);
  const [verificationAction, setVerificationAction] = useState<'verified' | 'rejected' | null>(null);


  useEffect(() => {
    // In a real app, fetch users from API
    setUsers(placeholderUsers);
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getVerificationStatusBadge = (status?: 'pending' | 'verified' | 'rejected' | 'unverified') => {
    switch (status) {
      case 'pending': return <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-300"><ShieldQuestion className="mr-1 h-3 w-3"/>Pending</Badge>;
      case 'verified': return <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-200 border-green-300"><ShieldCheck className="mr-1 h-3 w-3"/>Verified</Badge>;
      case 'rejected': return <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-200 border-red-300"><ShieldAlert className="mr-1 h-3 w-3"/>Rejected</Badge>;
      case 'unverified': return <Badge variant="outline">Unverified</Badge>;
      default: return null;
    }
  };

  const confirmVerificationAction = () => {
    if (!userToVerify || !verificationAction) return;

    setUsers(prevUsers => prevUsers.map(u => u.id === userToVerify.id ? { ...u, verificationStatus: verificationAction } : u));
    toast({
        title: `Seller ${verificationAction === 'verified' ? 'Approved' : 'Rejected'}`,
        description: `User ${userToVerify.name} (${userToVerify.email}) has been ${verificationAction}.`
    });
    setUserToVerify(null);
    setVerificationAction(null);
  };


  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold font-headline">User Management</h1>
        <Button variant="outline" disabled>
            <UserPlus className="mr-2 h-4 w-4"/> Add New User (Manual)
        </Button>
      </div>
      
      <Card className="shadow-lg border">
        <CardHeader>
          <CardTitle className="text-2xl">All Users ({filteredUsers.length})</CardTitle>
          <CardDescription>Manage user accounts, roles, and seller verification statuses. Admins can manually approve or reject seller applications here.</CardDescription>
           <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search users by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full md:w-2/3 lg:w-1/2 bg-background"
            />
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {filteredUsers.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
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
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={`${user.role} user avatar`} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {user.name}
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell><Badge variant={user.role === 'admin' ? 'default' : (user.role === 'provider' ? 'secondary' : 'outline')} className={user.role === 'admin' ? 'bg-primary/80' : ''}>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</Badge></TableCell>
                    <TableCell>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</TableCell>
                    <TableCell>
                      {user.role === 'provider' ? getVerificationStatusBadge(user.verificationStatus) : <span className="text-muted-foreground">-</span>}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
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
                          <DropdownMenuItem disabled className="text-orange-600 focus:text-orange-700 focus:bg-orange-50">
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
             <div className="text-center py-10 text-muted-foreground">
                No users found matching your criteria.
            </div>
          )}
        </CardContent>
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
