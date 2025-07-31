
"use client";

import { useState } from 'react';
import KpiCards from '@/components/analytics/KpiCards';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';
import SessionDetailsTable from '@/components/analytics/SessionDetailsTable';
import RouteAnalyticsTable from '@/components/analytics/RouteAnalyticsTable';
import DebugAnalytics from '@/components/analytics/DebugAnalytics';
import SimpleTest from '@/components/analytics/SimpleTest';
import TrafficChannels from '@/components/analytics/TrafficChannels';
import RecentActivityTable from '@/components/analytics/RecentActivityTable';
import TopPagesTable from '@/components/analytics/TopPagesTable';
import ClicksTable from '@/components/analytics/ClicksTable';
import CartActivityTable from '@/components/analytics/CartActivityTable';
import WishlistActivityTable from '@/components/analytics/WishlistActivityTable';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import type { DateRange } from 'react-day-picker';
import { BarChart3, Users, Award, Zap, MapPin } from 'lucide-react';
import GeoAnalytics from '@/components/analytics/GeoAnalytics';
import ChartCard from '@/components/analytics/ChartCard';
import AiAnalyticsBot from '@/components/analytics/AiAnalyticsBot';
import NewAnalyticsCharts from '@/components/analytics/NewAnalyticsCharts';
import ComprehensiveAnalytics from '@/components/analytics/ComprehensiveAnalytics';
import UltimateAnalyticsDashboard from '@/components/analytics/UltimateAnalyticsDashboard';
import EnhancedIndiaMap from '@/components/analytics/EnhancedIndiaMap';

export default function AnalyticsDashboardPage() {
  
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 6, 1), // July 1st of the current year
    to: new Date(),
  });

  // State for each chart's type
  const [usersChartType, setUsersChartType] = useState('line');
  const [registeredUsersChartType, setRegisteredUsersChartType] = useState('bar');
  const [sessionsChartType, setSessionsChartType] = useState('line');
  const [salesChartType, setSalesChartType] = useState('bar');
  const [enrollmentsChartType, setEnrollmentsChartType] = useState('bar');
  const [conversionChartType, setConversionChartType] = useState('line');
  const [avgTimeChartType, setAvgTimeChartType] = useState('line');
  const [engagementsChartType, setEngagementsChartType] = useState('area');
  const [impressionsChartType, setImpressionsChartType] = useState('area');


  return (
    <div className="bg-[#101727] min-h-screen p-4 md:p-6 text-[#E2E8F0]">
      <div className="w-full">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold leading-tight text-white flex items-center gap-3">
              <BarChart3 className="text-blue-400" />
              Analytics Dashboard
            </h1>
            <p className="text-gray-400 text-base mt-1">
              Comprehensive analysis of your platform's performance.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <DateRangePicker date={date} onDateChange={setDate} />
          </div>
        </div>

        <div className="mb-6">
          <KpiCards startDate={date?.from?.toISOString()} endDate={date?.to?.toISOString()} />
        </div>

        {/* NEW: Enhanced Analytics Dashboard Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="text-emerald-400 h-6 w-6" />
            <h2 className="text-2xl font-bold text-white">Enhanced Analytics Dashboard</h2>
            <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded-full">NEW</span>
          </div>
          <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 p-4 rounded-lg border border-emerald-500/20 mb-4">
            <p className="text-emerald-400 text-sm">
              🚀 This is the new comprehensive analytics system that processes data from your existing MongoDB collections with enhanced error handling and better visualizations.
            </p>
          </div>
          <AnalyticsDashboard startDate={date?.from} endDate={date?.to} />
        </div>

        {/* DEBUG: Analytics API Testing */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SimpleTest />
            <DebugAnalytics />
          </div>
        </div>

        {/* NEW: Session & Route Analytics Tables */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Users className="text-purple-400 h-6 w-6" />
            <h2 className="text-2xl font-bold text-white">Session & Route Analytics</h2>
            <span className="bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded-full">NEW</span>
          </div>
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-lg border border-purple-500/20 mb-4">
            <p className="text-purple-400 text-sm">
              📊 Detailed session tracking and route performance analytics with user identification and engagement metrics.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <SessionDetailsTable startDate={date?.from} endDate={date?.to} />
            <RouteAnalyticsTable startDate={date?.from} endDate={date?.to} />
          </div>
        </div>


        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
           <ChartCard
            title="Unique Visitors"
            dataKeys={['desktop', 'mobile']}
            endpoint="users"
            chartType={usersChartType}
            setChartType={setUsersChartType}
            startDate={date?.from}
            endDate={date?.to}
          />
           <ChartCard
            title="Registered Users"
            dataKey="count"
            endpoint="registered-users"
            chartType={registeredUsersChartType}
            setChartType={setRegisteredUsersChartType}
            startDate={date?.from}
            endDate={date?.to}
          />
          <ChartCard
            title="Sessions Overview"
            dataKey="count"
            endpoint="sessions"
            chartType={sessionsChartType}
            setChartType={setSessionsChartType}
            startDate={date?.from}
            endDate={date?.to}
          />
          <ChartCard
            title="Sales Performance"
            dataKeys={["count", "revenue"]}
            endpoint="sales"
            chartType={salesChartType}
            setChartType={setSalesChartType}
            startDate={date?.from}
            endDate={date?.to}
          />
          <ChartCard
            title="Add to Cart vs Purchase"
            dataKeys={['addToCart', 'purchases']}
            endpoint="cart-vs-purchase"
            chartType={enrollmentsChartType}
            setChartType={setEnrollmentsChartType}
            startDate={date?.from}
            endDate={date?.to}
          />
           <ChartCard
            title="Bounce Rate"
            dataKey="bounceRate"
            endpoint="bounce-rate"
            chartType={conversionChartType}
            setChartType={setConversionChartType}
            startDate={date?.from}
            endDate={date?.to}
          />
           <ChartCard
            title="Average Session Duration"
            dataKey="avgTime"
            endpoint="avg-time"
            chartType={avgTimeChartType}
            setChartType={setAvgTimeChartType}
            startDate={date?.from}
            endDate={date?.to}
          />
           <ChartCard
            title="Engagements"
            dataKey="count"
            endpoint="engagements"
            chartType={engagementsChartType}
            setChartType={setEngagementsChartType}
            startDate={date?.from}
            endDate={date?.to}
          />
           <ChartCard
            title="Impressions"
            dataKey="count"
            endpoint="impressions"
            chartType={impressionsChartType}
            setChartType={setImpressionsChartType}
            startDate={date?.from}
            endDate={date?.to}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
            <div className="xl:col-span-2">
                <TrafficChannels startDate={date?.from?.toISOString()} endDate={date?.to?.toISOString()} />
            </div>
            <RecentActivityTable />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <TopPagesTable />
          <ClicksTable startDate={date?.from} endDate={date?.to} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <CartActivityTable startDate={date?.from} endDate={date?.to} />
          <WishlistActivityTable startDate={date?.from} endDate={date?.to} />
        </div>

        {/* NEW: Advanced Analytics Charts */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="text-emerald-400 h-6 w-6" />
            <h2 className="text-2xl font-bold text-white">Advanced Analytics Charts</h2>
            <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded-full">NEW</span>
          </div>
          <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-4 rounded-lg border border-emerald-500/20 mb-4">
            <p className="text-emerald-400 text-sm">
              📊 Brand new comprehensive analytics with proper calculations: Registered Users Growth, Sessions Overview, Bounce Rate Analysis, Average Session Duration, User Engagements, and Page Impressions.
            </p>
          </div>
          <NewAnalyticsCharts startDate={date?.from} endDate={date?.to} />
        </div>

        {/* NEW: Comprehensive Analytics */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Award className="text-purple-400 h-6 w-6" />
            <h2 className="text-2xl font-bold text-white">Comprehensive Analytics Suite</h2>
            <span className="bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded-full">NEW</span>
          </div>
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-lg border border-purple-500/20 mb-4">
            <p className="text-purple-400 text-sm">
              🏆 Advanced analytics suite with user growth trends, engagement analysis, conversion funnel, and comprehensive KPI summaries with trend indicators.
            </p>
          </div>
          <ComprehensiveAnalytics startDate={date?.from} endDate={date?.to} />
        </div>

        {/* NEW: Ultimate Analytics Dashboard */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="text-yellow-400 h-6 w-6" />
            <h2 className="text-2xl font-bold text-white">Ultimate Analytics Dashboard</h2>
            <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded-full">ULTIMATE</span>
          </div>
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-4 rounded-lg border border-yellow-500/20 mb-4">
            <p className="text-yellow-400 text-sm">
              ⚡ Complete analytics solution with 12 different chart types, each with 4 visualization options (Line, Bar, Area, Scatter). Switch between chart types instantly for any metric!
            </p>
          </div>
          <UltimateAnalyticsDashboard startDate={date?.from} endDate={date?.to} />
        </div>

        {/* NEW: Enhanced India Map */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="text-green-400 h-6 w-6" />
            <h2 className="text-2xl font-bold text-white">Enhanced India Analytics Map</h2>
            <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">ENHANCED</span>
          </div>
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-4 rounded-lg border border-green-500/20 mb-4">
            <p className="text-green-400 text-sm">
              🗺️ Professional India map with accurate state boundaries, proper data calculations, interactive features, and comprehensive state rankings with performance indicators.
            </p>
          </div>
          <EnhancedIndiaMap startDate={date?.from?.toISOString()} endDate={date?.to?.toISOString()} />
        </div>

        {/* OLD: Geo Analytics Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="text-orange-400 h-6 w-6" />
            <h2 className="text-2xl font-bold text-white">Geo Analytics - India Distribution (Legacy)</h2>
            <span className="bg-orange-500/20 text-orange-400 text-xs px-2 py-1 rounded-full">LEGACY</span>
          </div>
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-4 rounded-lg border border-orange-500/20 mb-4">
            <p className="text-orange-400 text-sm">
              🗺️ Original geographical analysis - kept for comparison purposes.
            </p>
          </div>
          <GeoAnalytics startDate={date?.from?.toISOString()} endDate={date?.to?.toISOString()} />
        </div>
        
        {/* <AiAnalyticsBot startDate={date?.from} endDate={date?.to} /> */}

      </div>
    </div>
  );
}
