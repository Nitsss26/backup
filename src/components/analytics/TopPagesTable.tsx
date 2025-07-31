
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, TrendingUp, Link as LinkIcon, Clock } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';

interface TopPage {
    path: string;
    views: number;
    avgDuration: number;
}

export default function TopPagesTable() {
    const [topPages, setTopPages] = useState<TopPage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTopPages = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/analytics/top-pages');
                if (!response.ok) {
                    throw new Error('Failed to fetch top pages data');
                }
                const data = await response.json();
                setTopPages(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTopPages();
    }, []);

    const formatDuration = (seconds: number) => {
        if (isNaN(seconds) || seconds < 0) return '0s';
        if (seconds < 60) return `${Math.round(seconds)}s`;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.round(seconds % 60);
        return `${minutes}m ${remainingSeconds}s`;
    };

    return (
        <Card className="bg-[#1E293B] border-slate-700 shadow-lg">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                    <TrendingUp className="text-pink-400" />
                    Top Visited Pages
                </CardTitle>
                <CardDescription className="text-slate-400">Your most visited pages by unique sessions.</CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-96">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-full text-slate-400">
                            <Loader2 className="h-6 w-6 animate-spin mr-2" />
                            Loading top pages...
                        </div>
                    ) : error ? (
                        <div className="text-red-400 text-center py-10">{error}</div>
                    ) : topPages.length === 0 ? (
                        <div className="text-slate-400 text-center py-10">No page view data recorded yet.</div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="border-slate-600 hover:bg-slate-800/20">
                                    <TableHead className="text-slate-300">Page Path</TableHead>
                                    <TableHead className="text-slate-300 text-right">Views</TableHead>
                                    <TableHead className="text-slate-300 text-right">Avg. Time</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {topPages.map((page) => (
                                    <TableRow key={page.path} className="border-slate-700 hover:bg-slate-800/20">
                                        <TableCell className="font-mono text-cyan-400 text-xs">
                                            <Link href={page.path} target="_blank" className="hover:underline flex items-center gap-2">
                                                <LinkIcon className="h-3 w-3" />
                                                <span className="truncate max-w-[200px] sm:max-w-[350px]">{page.path}</span>
                                            </Link>
                                        </TableCell>
                                        <TableCell className="text-right font-medium text-white">{page.views.toLocaleString()}</TableCell>
                                        <TableCell className="text-right text-xs text-slate-400">
                                            <div className="flex items-center justify-end gap-1">
                                                <Clock className="h-3 w-3" />
                                                {formatDuration(page.avgDuration)}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
