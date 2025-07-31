
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, ListOrdered, User, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import type { UserActionType } from '@/models/UserActionEvent';

interface ActionEvent {
  _id: string;
  timestamp: string;
  actionType: UserActionType;
  userId?: {
    name: string;
  };
  details?: {
    path?: string;
  };
  geoData?: {
    city?: string;
    country?: string;
  };
}

const getBadgeVariant = (actionType: UserActionType): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (actionType) {
        case 'login':
        case 'signup':
        case 'order_completed':
            return 'default'; // Uses primary color from theme
        case 'add_to_cart':
        case 'start_checkout':
        case 'add_to_wishlist':
            return 'secondary'; // Uses secondary color
        case 'remove_from_cart':
        case 'order_failed':
        case 'logout':
            return 'destructive'; // Uses destructive color
        default:
            return 'outline';
    }
}

export default function RecentActivityTable() {
    const [actions, setActions] = useState<ActionEvent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState<any>(null);

    useEffect(() => {
        const fetchActions = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/analytics/recent-actions?page=${currentPage}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch recent actions');
                }
                const result = await response.json();
                setActions(result.data || result); // Handle both new and old API response formats
                setPagination(result.pagination);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchActions();
    }, [currentPage]);

    return (
        <Card className="bg-[#1E293B] border-slate-700 shadow-lg">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                    <ListOrdered className="text-purple-400" />
                    Recent Activity
                </CardTitle>
                <CardDescription className="text-slate-400">A live feed of the latest user actions on the platform.</CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-96">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-full text-slate-400">
                            <Loader2 className="h-6 w-6 animate-spin mr-2" />
                            Loading activities...
                        </div>
                    ) : error ? (
                        <div className="text-red-400 text-center py-10">{error}</div>
                    ) : actions.length === 0 ? (
                        <div className="text-slate-400 text-center py-10">No recent activities recorded.</div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="border-slate-600 hover:bg-slate-800/20">
                                    <TableHead className="text-slate-300">Action</TableHead>
                                    <TableHead className="text-slate-300">User</TableHead>
                                    <TableHead className="text-slate-300">Details</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {actions.map((action) => (
                                    <TableRow key={action._id} className="border-slate-700 hover:bg-slate-800/20">
                                        <TableCell>
                                            <Badge variant={getBadgeVariant(action.actionType)} className="capitalize mb-1">
                                                {action.actionType.replace(/_/g, ' ')}
                                            </Badge>
                                            <p className="text-xs text-slate-500">{new Date(action.timestamp).toLocaleTimeString()}</p>
                                        </TableCell>
                                        <TableCell className="text-sm text-slate-300">
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4 text-slate-500"/>
                                                <span>{action.userId?.name || 'Anonymous'}</span>
                                            </div>
                                             <div className="flex items-center gap-2 mt-1 text-slate-400">
                                                <MapPin className="h-4 w-4"/>
                                                <span className="text-xs">{action.geoData?.city || 'Unknown City'}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-xs text-cyan-400 font-mono">{action.details?.path || '/'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </ScrollArea>
                
                {/* Pagination Controls for ALL entries */}
                {pagination && pagination.totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700">
                        <div className="text-sm text-gray-400">
                            Page {pagination.currentPage} of {pagination.totalPages} 
                            ({pagination.totalItems.toLocaleString()} total activities from day 1)
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={!pagination.hasPrevPage}
                                className="bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => prev + 1)}
                                disabled={!pagination.hasNextPage}
                                className="bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
                            >
                                Next
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
