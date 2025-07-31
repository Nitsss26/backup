"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, Clock, Route, ChevronLeft, ChevronRight, Search, User, Mail, Timer
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';

interface SessionDetailsTableProps {
  startDate?: Date;
  endDate?: Date;
}

interface SessionDetail {
  sessionId: string;
  name: string;
  email: string;
  route: string;
  timeSpend: string;
  timeSpendSeconds: number;
  visitCount: number;
  firstVisit: string;
  lastVisit: string;
}

interface SessionDetailsData {
  data: SessionDetail[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

const LoadingSkeleton = () => (
  <div className="space-y-4">
    {[...Array(10)].map((_, i) => (
      <div key={i} className="flex items-center space-x-4 p-4 border-b border-slate-700">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>
    ))}
  </div>
);

export default function SessionDetailsTable({ startDate, endDate }: SessionDetailsTableProps) {
  const [data, setData] = useState<SessionDetailsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<SessionDetail[]>([]);

  useEffect(() => {
    if (!startDate || !endDate) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `/api/analytics/session-details?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&page=${currentPage}&limit=50`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.error) {
          throw new Error(result.message || result.error);
        }
        
        setData(result);
        setFilteredData(result.data);
      } catch (error) {
        console.error("Error fetching session details:", error);
        setError(error instanceof Error ? error.message : 'Failed to load session details');
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [startDate, endDate, currentPage]);

  // Filter data based on search term
  useEffect(() => {
    if (!data) return;
    
    if (!searchTerm) {
      setFilteredData(data.data);
    } else {
      const filtered = data.data.filter(item =>
        item.sessionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.route.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [data, searchTerm]);

  if (isLoading) {
    return (
      <Card className="bg-[#1E293B] border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-400" />
            Session Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LoadingSkeleton />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-[#1E293B] border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-400" />
            Session Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-red-400 mb-2">Error loading session details</div>
            <div className="text-gray-400 text-sm">{error}</div>
            {error.includes('timeout') && (
              <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="text-yellow-400 text-sm">
                  💡 Try selecting a smaller date range to improve query performance
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="bg-[#1E293B] border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-400" />
            Session Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-400">
            No session details available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[#1E293B] border-slate-700">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-400" />
            Session Details
            <span className="text-sm text-gray-400 font-normal">
              ({data.pagination.totalItems} total sessions)
            </span>
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search sessions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-600 text-white placeholder-gray-400 w-64"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  <div className="flex items-center gap-2">
                    <Timer className="h-4 w-4" />
                    Session ID
                  </div>
                </th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Name
                  </div>
                </th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </div>
                </th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  <div className="flex items-center gap-2">
                    <Route className="h-4 w-4" />
                    Route
                  </div>
                </th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Time Spend
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((session, index) => (
                <tr key={`${session.sessionId}-${session.route}-${index}`} className="border-b border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="text-white font-mono text-sm">
                      {session.sessionId.substring(0, 8)}...
                    </div>
                    <div className="text-xs text-gray-400">
                      {session.visitCount} visit{session.visitCount > 1 ? 's' : ''}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-white">
                      {session.name}
                    </div>
                    {session.name !== 'Guest' && (
                      <div className="text-xs text-green-400">Registered</div>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-white">
                      {session.email}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-blue-400 font-mono text-sm">
                      {session.route}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-white font-medium">
                      {session.timeSpend}
                    </div>
                    <div className="text-xs text-gray-400">
                      {session.timeSpendSeconds}s total
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data.pagination.totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-700">
            <div className="text-sm text-gray-400">
              Page {data.pagination.currentPage} of {data.pagination.totalPages}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={!data.pagination.hasPrevPage}
                className="bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={!data.pagination.hasNextPage}
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