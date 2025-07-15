
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import KpiCards from '@/components/analytics/KpiCards';
import ChartCard from '@/components/analytics/ChartCard';
import TrafficChannels from '@/components/analytics/TrafficChannels';
import AdPerformance from '@/components/analytics/AdPerformance';
import PerformanceMetricsTable from '@/components/analytics/PerformanceMetricsTable';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { chartTypes } from '@/components/analytics/analyticsUtils';
import AiAnalyticsBot from '@/components/analytics/AiAnalyticsBot';

export default function AdvancedAnalyticsDashboard() {
  const [usersChartType, setUsersChartType] = useState('line');
  const [sessionsChartType, setSessionsChartType] = useState('line');
  const [salesChartType, setSalesChartType] = useState('line');
  const [enrollmentsChartType, setEnrollmentsChartType] = useState('line');
  const [conversionChartType, setConversionChartType] = useState('line');
  const [avgTimeChartType, setAvgTimeChartType] = useState('line');
  const [engagementsChartType, setEngagementsChartType] = useState('line');
  const [impressionsChartType, setImpressionsChartType] = useState('line');

  const [startDate, setStartDate] = useState(() => {
    const date = new Date('2025-06-01');
    return date.toISOString().split('T')[0];
  });

  const [endDate, setEndDate] = useState(() => {
    const date = new Date('2025-06-30');
    return date.toISOString().split('T')[0];
  });

  const formatDateRange = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`;
  };

  return (
    <div className="bg-gray-900 min-h-screen p-3 sm:p-4 md:p-6">
      <div className="max-w-screen-2xl mx-auto">
        {/* Header Section - Mobile Responsive */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-4">
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
              Analytics Dashboard
            </h1>
            <p className="text-gray-400 text-sm sm:text-base mt-1">
              Track and analyze platform performance metrics
            </p>
          </div>
          
          {/* Date Range Display - Mobile Responsive */}
          <div className="flex items-center">
            <div className="bg-gray-800 rounded-lg px-3 py-2 sm:px-4">
              <span className="text-gray-400 text-xs sm:text-sm block sm:inline">Report Date:</span>
              <span className="text-white text-xs sm:text-sm sm:ml-2 block sm:inline mt-1 sm:mt-0">
                {formatDateRange()}
              </span>
            </div>
          </div>
        </div>

        {/* Date Picker Section - Mobile Responsive */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 sm:flex-none">
              <Label htmlFor="startDate" className="text-gray-400 text-sm block mb-1">
                Start Date:
              </Label>
              <Input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white w-full"
              />
            </div>
            <div className="flex-1 sm:flex-none">
              <Label htmlFor="endDate" className="text-gray-400 text-sm block mb-1">
                End Date:
              </Label>
              <Input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white w-full"
              />
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="mb-4 sm:mb-6">
          <KpiCards startDate={startDate} endDate={endDate} />
        </div>

        {/* Traffic Channels */}
        <div className="mb-4 sm:mb-6">
          <TrafficChannels startDate={startDate} endDate={endDate} />
        </div>

        {/* Charts Grid - Responsive Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <ChartCard
            title="Total Users"
            dataKey="users"
            chartType={usersChartType}
            setChartType={setUsersChartType}
            startDate={new Date(startDate)}
            endDate={new Date(endDate)}
          />
          <ChartCard
            title="Sessions"
            dataKey="sessions"
            chartType={sessionsChartType}
            setChartType={setSessionsChartType}
            startDate={new Date(startDate)}
            endDate={new Date(endDate)}
          />
          <ChartCard
            title="Sales"
            dataKey="sales"
            chartType={salesChartType}
            setChartType={setSalesChartType}
            startDate={new Date(startDate)}
            endDate={new Date(endDate)}
          />
          <ChartCard
            title="Enrollments"
            dataKey="enrollments"
            chartType={enrollmentsChartType}
            setChartType={setEnrollmentsChartType}
            startDate={new Date(startDate)}
            endDate={new Date(endDate)}
          />
          <ChartCard
            title="Conversion %"
            dataKey="conversion"
            chartType={conversionChartType}
            setChartType={setConversionChartType}
            startDate={new Date(startDate)}
            endDate={new Date(endDate)}
          />
          <ChartCard
            title="Avg Time"
            dataKey="avgTime"
            chartType={avgTimeChartType}
            setChartType={setAvgTimeChartType}
            startDate={new Date(startDate)}
            endDate={new Date(endDate)}
          />
          <ChartCard
            title="Engagements"
            dataKey="engagements"
            chartType={engagementsChartType}
            setChartType={setEngagementsChartType}
            startDate={new Date(startDate)}
            endDate={new Date(endDate)}
          />
          <ChartCard
            title="Impressions"
            dataKey="impressions"
            chartType={impressionsChartType}
            setChartType={setImpressionsChartType}
            startDate={new Date(startDate)}
            endDate={new Date(endDate)}
          />
        </div>

        {/* Ad Performance and Metrics Table - Mobile Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="lg:col-span-1">
            <AdPerformance />
          </div>
          <div className="lg:col-span-2">
            <PerformanceMetricsTable />
          </div>
        </div>

        {/* AI Analytics Bot */}
        <div className="mb-4 sm:mb-6">
          <AiAnalyticsBot
            startDate={new Date(startDate)}
            endDate={new Date(endDate)}
          />
        </div>
      </div>
    </div>
  );
}
