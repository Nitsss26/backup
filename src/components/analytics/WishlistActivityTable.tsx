
"use client";

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, Heart, User, MapPin, ChevronLeft, ChevronRight, Clock, Mail, Timer } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

interface WishlistEvent {
    _id: string;
    timestamp: string;
    sessionId: string;
    userName: string;
    userEmail: string;
    details: {
        itemTitle?: string;
        path?: string;
    };
    geoData?: {
        city: string;
        country: string;
    };
}

interface WishlistActivityTableProps {
    startDate?: Date;
    endDate?: Date;
}

export default function WishlistActivityTable({ startDate, endDate }: WishlistActivityTableProps) {
    const [wishlistEvents, setWishlistEvents] = useState<WishlistEvent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState<any>(null);

    const fetchWishlistEvents = useCallback(async () => {
        if (!startDate || !endDate) return;
        setIsLoading(true);
        try {
            const params = new URLSearchParams({
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                page: currentPage.toString()
            });
            const response = await fetch(`/api/analytics/add-to-wishlist?${params.toString()}`);
            if (!response.ok) {
                throw new Error('Failed to fetch wishlist activity');
            }
            const result = await response.json();
            setWishlistEvents(result.data || result);
            setPagination(result.pagination);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [startDate, endDate, currentPage]);

    useEffect(() => {
        fetchWishlistEvents();
    }, [fetchWishlistEvents]);

    return (
        <Card className="bg-[#1E293B] border-slate-700 shadow-lg">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                    <Heart className="text-pink-400" />
                    Wishlist Additions
                    <span className="text-sm text-gray-400 font-normal">
                        ({pagination?.totalItems || wishlistEvents.length} total entries)
                    </span>
                </CardTitle>
                <CardDescription className="text-slate-400">ALL wishlist additions from day 1 with user session details and pagination.</CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-96">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-full text-slate-400">
                            <Loader2 className="h-6 w-6 animate-spin mr-2" />
                            Loading wishlist events...
                        </div>
                    ) : error ? (
                        <div className="text-red-400 text-center py-10">{error}</div>
                    ) : wishlistEvents.length === 0 ? (
                        <div className="text-slate-400 text-center py-10">No recent wishlist activities for this period.</div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="border-slate-600 hover:bg-slate-800/20">
                                    <TableHead className="text-slate-300">
                                        <div className="flex items-center gap-2">
                                            <Timer className="h-4 w-4" />
                                            Session ID
                                        </div>
                                    </TableHead>
                                    <TableHead className="text-slate-300">
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4" />
                                            User Details
                                        </div>
                                    </TableHead>
                                    <TableHead className="text-slate-300">Item Details</TableHead>
                                    <TableHead className="text-slate-300">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4" />
                                            Time
                                        </div>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {wishlistEvents.map((event) => (
                                    <TableRow key={event._id} className="border-slate-700 hover:bg-slate-800/20">
                                        <TableCell>
                                            <div className="text-white font-mono text-sm">
                                                {event.sessionId?.substring(0, 8)}...
                                            </div>
                                            <div className="text-xs text-gray-400">
                                                Session ID
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-white font-medium">
                                                {event.userName || 'Guest'}
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                                                <Mail className="h-3 w-3" />
                                                {event.userEmail || 'guest'}
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                                                <MapPin className="h-3 w-3"/>
                                                {event.geoData?.city || 'Unknown'}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-white font-medium">
                                                {event.details?.itemTitle || 'Unknown Item'}
                                            </div>
                                            <div className="text-xs text-blue-400 font-mono mt-1">
                                                {event.details?.path || '/'}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-white text-sm">
                                                {new Date(event.timestamp).toLocaleString()}
                                            </div>
                                        </TableCell>
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
                            ({pagination.totalItems.toLocaleString()} total wishlist additions from day 1)
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
