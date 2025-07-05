// Platform colors for consistent theming
export const platformColors = {
    'Google Ads': '#4285F4',
    'Meta Ads': '#4267B2',
    'LinkedIn': '#0077B5',
    'Snapchat': '#FFFC00',
    'TikTok': '#000000',
    'Instagram': '#E1306C',
    'Facebook': '#4267B2',
    'Bing Ads': '#F25022',
    'Twitter': '#1DA1F2'
  };
  
  // Enhanced dummy data with platform breakdown
  export const analyticsData = {
    metrics: {
      totalUsers: { value: "4.4K", change: "+12.5%", icon: "Users", bgColor: "bg-blue-50" },
      sessions: { value: "5.4K", change: "+8.3%", icon: "MousePointer", bgColor: "bg-green-50" },
      purchases: { value: "813", change: "+18.2%", icon: "ShoppingCart", bgColor: "bg-purple-50" },
      sales: { value: "₹2.8K", change: "+15.7%", icon: "DollarSign", bgColor: "bg-yellow-50" },
      roas: { value: "185.38%", change: "+22.4%", icon: "TrendingUp", bgColor: "bg-teal-50" },
      ctr: { value: "1.22%", change: "+3.1%", icon: "MousePointer", bgColor: "bg-pink-50" },
      cpm: { value: "₹3.30", change: "-1.5%", icon: "DollarSign", bgColor: "bg-red-50" },
      avgTime: { value: "0:44", change: "+0.8%", icon: "Clock", bgColor: "bg-orange-50" }
    },
    
    trafficByChannel: [
      { name: 'Google Ads', value: 7.76, color: '#4285F4' },
      { name: 'Facebook', value: 14.96, color: '#4267B2' },
      { name: 'Instagram', value: 12.34, color: '#E1306C' },
      { name: 'LinkedIn', value: 8.91, color: '#0077B5' },
      { name: 'Snapchat', value: 5.43, color: '#FFFC00' },
      { name: 'TikTok', value: 9.87, color: '#000000' },
    ],
    
    weeklyAdSpend: [
      { week: 'Week 1', 'Google Ads': 400, 'Meta Ads': 600, 'LinkedIn': 200, 'Snapchat': 150, 'TikTok': 300 },
      { week: 'Week 2', 'Google Ads': 450, 'Meta Ads': 650, 'LinkedIn': 220, 'Snapchat': 180, 'TikTok': 350 },
      { week: 'Week 3', 'Google Ads': 380, 'Meta Ads': 700, 'LinkedIn': 250, 'Snapchat': 200, 'TikTok': 400 },
      { week: 'Week 4', 'Google Ads': 420, 'Meta Ads': 750, 'LinkedIn': 280, 'Snapchat': 220, 'TikTok': 450 },
    ],
    
    weeklyCPC: [
      { week: 'Week 1', 'Google Ads': 0.25, 'Meta Ads': 0.31, 'LinkedIn': 0.35, 'Snapchat': 0.29, 'TikTok': 0.25 },
      { week: 'Week 2', 'Google Ads': 0.27, 'Meta Ads': 0.33, 'LinkedIn': 0.37, 'Snapchat': 0.31, 'TikTok': 0.27 },
      { week: 'Week 3', 'Google Ads': 0.26, 'Meta Ads': 0.35, 'LinkedIn': 0.38, 'Snapchat': 0.32, 'TikTok': 0.26 },
      { week: 'Week 4', 'Google Ads': 0.28, 'Meta Ads': 0.36, 'LinkedIn': 0.40, 'Snapchat': 0.33, 'TikTok': 0.28 },
    ],
    
    sessionSources: [
      { source: 'Google Ads', users: 703, sessions: 870, engaged: 419, purchases: 429, rate: '18.21%', trend: 'up' },
      { source: 'Instagram', users: 654, sessions: 727, engaged: 431, purchases: 410, rate: '19.11%', trend: 'up' },
      { source: 'LinkedIn', users: 432, sessions: 454, engaged: 339, purchases: 231, rate: '19.47%', trend: 'up' },
      { source: 'Facebook', users: 587, sessions: 654, engaged: 498, purchases: 378, rate: '17.84%', trend: 'down' },
      { source: 'Bing Ads', users: 321, sessions: 339, engaged: 210, purchases: 125, rate: '16.92%', trend: 'down' },
      { source: 'TikTok', users: 456, sessions: 512, engaged: 345, purchases: 289, rate: '20.12%', trend: 'up' },
    ],
    
    adSources: [
      { source: 'Google Ads', spend: 1200, impressions: 45380, clicks: 651, cpc: 0.27, cpm: 3.3, ctr: '1.22%', roas: '185%' },
      { source: 'Meta Ads', spend: 1800, impressions: 62450, clicks: 892, cpc: 0.31, cpm: 3.45, ctr: '1.35%', roas: '160%' },
      { source: 'LinkedIn', spend: 900, impressions: 19870, clicks: 287, cpc: 0.35, cpm: 4.1, ctr: '1.45%', roas: '210%' },
      { source: 'Snapchat', spend: 750, impressions: 15780, clicks: 213, cpc: 0.29, cpm: 3.8, ctr: '1.38%', roas: '195%' },
      { source: 'TikTok', spend: 1100, impressions: 38760, clicks: 521, cpc: 0.25, cpm: 3.2, ctr: '1.18%', roas: '225%' },
      { source: 'Twitter', spend: 850, impressions: 24560, clicks: 345, cpc: 0.33, cpm: 3.65, ctr: '1.28%', roas: '175%' },
    ],
    
    conversionFunnel: [
      { stage: 'Impressions', value: 10000, fill: '#8884d8' },
      { stage: 'Clicks', value: 4000, fill: '#83a6ed' },
      { stage: 'Leads', value: 1000, fill: '#8dd1e1' },
      { stage: 'Customers', value: 200, fill: '#82ca9d' }
    ],
    
    platformPerformance: [
      { metric: 'ROAS', 'Google Ads': 185, 'Meta Ads': 160, 'TikTok': 225, 'LinkedIn': 210, 'Snapchat': 195 },
      { metric: 'CTR', 'Google Ads': 1.22, 'Meta Ads': 1.35, 'TikTok': 1.18, 'LinkedIn': 1.45, 'Snapchat': 1.38 },
      { metric: 'CPC', 'Google Ads': 0.27, 'Meta Ads': 0.31, 'TikTok': 0.25, 'LinkedIn': 0.35, 'Snapchat': 0.29 },
      { metric: 'Conv. Rate', 'Google Ads': 18.21, 'Meta Ads': 17.84, 'TikTok': 20.12, 'LinkedIn': 19.47, 'Snapchat': 18.5 },
      { metric: 'Avg. Time', 'Google Ads': 44, 'Meta Ads': 38, 'TikTok': 48, 'LinkedIn': 52, 'Snapchat': 41 }
    ],
    
    activityHeatmap: [
      { day: 'Mon', hour: '8-10', value: 45 },
      { day: 'Mon', hour: '10-12', value: 78 },
      // ... (rest of heatmap data)
    ]
  };
  
  // Chart type options
  export const CHART_TYPES = [
    { value: 'pie', label: 'Pie Chart', icon: "PieChart" },
    { value: 'bar', label: 'Bar Chart', icon: "BarChart" },
    { value: 'stacked', label: 'Stacked Bar', icon: "BarChart" },
    { value: 'line', label: 'Line Chart', icon: "LineChart" },
    { value: 'area', label: 'Area Chart', icon: "AreaChart" }
  ];