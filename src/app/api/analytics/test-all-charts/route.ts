import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  const endpoints = [
    'registered-users',
    'sessions', 
    'sales',
    'bounce-rate',
    'avg-time',
    'engagements',
    'impressions',
    'traffic-sources'
  ];

  const results = [];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${baseUrl}/api/analytics/${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        results.push({
          endpoint,
          status: 'SUCCESS',
          dataLength: Array.isArray(data) ? data.length : 0,
          sampleData: Array.isArray(data) ? data.slice(0, 2) : data
        });
      } else {
        results.push({
          endpoint,
          status: 'ERROR',
          error: `HTTP ${response.status}`
        });
      }
    } catch (error) {
      results.push({
        endpoint,
        status: 'ERROR',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    message: 'Chart APIs Test Results',
    totalEndpoints: endpoints.length,
    successCount: results.filter(r => r.status === 'SUCCESS').length,
    errorCount: results.filter(r => r.status === 'ERROR').length,
    results
  });
}