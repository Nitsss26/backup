"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Users, Activity, Monitor, Smartphone, TrendingUp, BarChart3, UserPlus
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

interface UniqueUsersDashboardProps {
    startDate?: Date;
    endDate?: Date;
}

interface UniqueUsersData {
    summary: {
        totalUniqueUsers: number;
        totalSessions: number;
        desktopUsers: number;
        mobileUsers: number;
        avgSessionsPerUser: string;
    };
    uniqueUsersChart: Array<{
        date: string;
        desktop: number;
        mobile: number;
        total: number;
    }>;
    sessionsChart: Array<{
        date: string;
        sessions: number;
    }>;
    deviceBreakdown: {
        desktop: number;
        mobile: number;
        desktopPercentage: string;
        mobilePercentage: string;
    };
}

interface RegisteredUsersData {
    totalRegisteredUsers: number;
    allTimeTotal: number;
    chartData: Array<{
        date: string;
        registrations: number;
    }>;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

const LoadingSkeleton = () => (
    <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
                <Card key={i} className="bg-[#1E293B] border-slate-700">
                    <CardHeader className="pb-2">
                        <Skeleton className="h-4 w-20" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-8 w-16 mb-2" />
                        <Skeleton className="h-3 w-12" />
                    </CardContent>
                </Card>
            ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-[#1E293B] border-slate-700">
                <CardHeader>
                    <Skeleton className="h-6 w-40" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-64 w-full" />
                </CardContent>
            </Card>
            <Card className="bg-[#1E293B] border-slate-700">
                <CardHeader>
                    <Skeleton className="h-6 w-40" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-64 w-full" />
                </CardContent>
            </Card>
        </div>
    </div>
);

export default function UniqueUsersDashboard({ startDate, endDate }: UniqueUsersDashboardProps) {
    const [data, setData] = useState<UniqueUsersData | null>(null);
    const [registeredUsersData, setRegisteredUsersData] = useState<RegisteredUsersData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!startDate || !endDate) return;

        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Fetch both unique users and registered users data
                const [uniqueUsersResponse, registeredUsersResponse] = await Promise.all([
                    fetch(`/api/analytics/unique-users?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`),
                    fetch(`/api/analytics/registered-users?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`)
                ]);

                if (!uniqueUsersResponse.ok) throw new Error('Failed to fetch unique users data');
                if (!registeredUsersResponse.ok) throw new Error('Failed to fetch registered users data');

                const [uniqueUsersResult, registeredUsersResult] = await Promise.all([
                    uniqueUsersResponse.json(),
                    registeredUsersResponse.json()
                ]);

                setData(uniqueUsersResult);
                setRegisteredUsersData(registeredUsersResult);
            } catch (error) {
                console.error("Error fetching analytics data:", error);
                setData(null);
                setRegisteredUsersData(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [startDate, endDate]);

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    if (!data) {
        return (
            <div className="text-center py-8 text-gray-400">
                Failed to load unique users data
            </div>
        );
    }

    const pieData = [
        { name: 'Desktop', value: data.deviceBreakdown.desktop, color: '#3B82F6' },
        { name: 'Mobile', value: data.deviceBreakdown.mobile, color: '#10B981' }
    ];

    return (
        <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <Card className="bg-[#1E293B] border-slate-700 hover:border-blue-500 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 p-3">
                        <CardTitle className="text-xs font-medium text-gray-400">Unique Users</CardTitle>
                        <Users className="h-4 w-4 text-blue-400" />
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                        <div className="text-2xl font-bold text-white">
                            {data.summary.totalUniqueUsers.toLocaleString()}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Total unique visitors</p>
                    </CardContent>
                </Card>

                <Card className="bg-[#1E293B] border-slate-700 hover:border-green-500 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 p-3">
                        <CardTitle className="text-xs font-medium text-gray-400">Total Sessions</CardTitle>
                        <Activity className="h-4 w-4 text-green-400" />
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                        <div className="text-2xl font-bold text-white">
                            {data.summary.totalSessions.toLocaleString()}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">All user sessions</p>
                    </CardContent>
                </Card>

                <Card className="bg-[#1E293B] border-slate-700 hover:border-purple-500 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 p-3">
                        <CardTitle className="text-xs font-medium text-gray-400">Desktop Users</CardTitle>
                        <Monitor className="h-4 w-4 text-purple-400" />
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                        <div className="text-2xl font-bold text-white">
                            {data.summary.desktopUsers.toLocaleString()}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            {data.deviceBreakdown.desktopPercentage}% of total
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-[#1E293B] border-slate-700 hover:border-cyan-500 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 p-3">
                        <CardTitle className="text-xs font-medium text-gray-400">Mobile Users</CardTitle>
                        <Smartphone className="h-4 w-4 text-cyan-400" />
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                        <div className="text-2xl font-bold text-white">
                            {data.summary.mobileUsers.toLocaleString()}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            {data.deviceBreakdown.mobilePercentage}% of total
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-[#1E293B] border-slate-700 hover:border-pink-500 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 p-3">
                        <CardTitle className="text-xs font-medium text-gray-400">Sessions/User</CardTitle>
                        <TrendingUp className="h-4 w-4 text-pink-400" />
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                        <div className="text-2xl font-bold text-white">
                            {data.summary.avgSessionsPerUser}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Average per user</p>
                    </CardContent>
                </Card>

                <Card className="bg-[#1E293B] border-slate-700 hover:border-teal-500 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 p-3">
                        <CardTitle className="text-xs font-medium text-gray-400">Registered Users</CardTitle>
                        <UserPlus className="h-4 w-4 text-teal-400" />
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                        <div className="text-2xl font-bold text-white">
                            {registeredUsersData ? registeredUsersData.totalRegisteredUsers.toLocaleString() : 'Loading...'}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">New in period</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Unique Users by Device Chart */}
                <Card className="bg-[#1E293B] border-slate-700">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Users className="h-5 w-5 text-blue-400" />
                            Unique Users by Device
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={data.uniqueUsersChart}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis
                                    dataKey="date"
                                    stroke="#9CA3AF"
                                    fontSize={12}
                                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                />
                                <YAxis stroke="#9CA3AF" fontSize={12} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1E293B',
                                        border: '1px solid #374151',
                                        borderRadius: '8px',
                                        color: '#E2E8F0'
                                    }}
                                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                                />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="desktop"
                                    stroke="#3B82F6"
                                    strokeWidth={2}
                                    name="Desktop"
                                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="mobile"
                                    stroke="#10B981"
                                    strokeWidth={2}
                                    name="Mobile"
                                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Device Breakdown Pie Chart */}
                <Card className="bg-[#1E293B] border-slate-700">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-green-400" />
                            Device Distribution
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(1)}%)`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1E293B',
                                        border: '1px solid #374151',
                                        borderRadius: '8px',
                                        color: '#E2E8F0'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sessions Chart */}
                <Card className="bg-[#1E293B] border-slate-700">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Activity className="h-5 w-5 text-purple-400" />
                            Total Sessions Over Time
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data.sessionsChart}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis
                                    dataKey="date"
                                    stroke="#9CA3AF"
                                    fontSize={12}
                                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                />
                                <YAxis stroke="#9CA3AF" fontSize={12} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1E293B',
                                        border: '1px solid #374151',
                                        borderRadius: '8px',
                                        color: '#E2E8F0'
                                    }}
                                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                                />
                                <Bar
                                    dataKey="sessions"
                                    fill="#8B5CF6"
                                    name="Sessions"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Registered Users Chart */}
                <Card className="bg-[#1E293B] border-slate-700">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <UserPlus className="h-5 w-5 text-teal-400" />
                            Registered Users Over Time
                        </CardTitle>
                        <p className="text-sm text-gray-400 mt-1">
                            {registeredUsersData ? `${registeredUsersData.totalRegisteredUsers} new registrations in period` : 'Loading...'}
                        </p>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={registeredUsersData?.chartData || []}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis
                                    dataKey="date"
                                    stroke="#9CA3AF"
                                    fontSize={12}
                                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                />
                                <YAxis stroke="#9CA3AF" fontSize={12} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1E293B',
                                        border: '1px solid #374151',
                                        borderRadius: '8px',
                                        color: '#E2E8F0'
                                    }}
                                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                                />
                                <Bar
                                    dataKey="registrations"
                                    fill="#14B8A6"
                                    name="New Registrations"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}