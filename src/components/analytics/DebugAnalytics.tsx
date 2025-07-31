"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bug, Play, CheckCircle, XCircle } from 'lucide-react';

export default function DebugAnalytics() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const testEndpoints = async () => {
    setIsLoading(true);
    setResults(null);

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7); // Last 7 days

    const endpoints = [
      {
        name: 'Session Details',
        url: `/api/analytics/session-details?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&page=1&limit=5`
      },
      {
        name: 'Route Analytics',
        url: `/api/analytics/route-analytics?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
      },
      {
        name: 'Dashboard Data',
        url: `/api/analytics/dashboard?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
      }
    ];

    const testResults = [];

    for (const endpoint of endpoints) {
      try {
        console.log(`Testing ${endpoint.name}...`);
        const response = await fetch(endpoint.url);
        const data = await response.json();
        
        testResults.push({
          name: endpoint.name,
          status: response.ok ? 'success' : 'error',
          statusCode: response.status,
          data: data,
          error: response.ok ? null : data.message || data.error
        });
      } catch (error) {
        testResults.push({
          name: endpoint.name,
          status: 'error',
          statusCode: 0,
          data: null,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    setResults(testResults);
    setIsLoading(false);
  };

  return (
    <Card className="bg-[#1E293B] border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Bug className="h-5 w-5 text-orange-400" />
          Analytics Debug Tool
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button
            onClick={testEndpoints}
            disabled={isLoading}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            <Play className="h-4 w-4 mr-2" />
            {isLoading ? 'Testing...' : 'Test Analytics APIs'}
          </Button>

          {results && (
            <div className="space-y-4">
              {results.map((result: any, index: number) => (
                <div key={index} className="border border-slate-600 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {result.status === 'success' ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400" />
                    )}
                    <h3 className="text-white font-medium">{result.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${
                      result.status === 'success' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {result.statusCode}
                    </span>
                  </div>

                  {result.error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded p-3 mb-3">
                      <div className="text-red-400 text-sm font-medium">Error:</div>
                      <div className="text-red-300 text-sm">{result.error}</div>
                    </div>
                  )}

                  {result.data && (
                    <div className="bg-slate-800 rounded p-3">
                      <div className="text-gray-400 text-xs mb-2">Response Data:</div>
                      <pre className="text-xs text-gray-300 overflow-x-auto">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}