"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TestTube, CheckCircle, XCircle } from 'lucide-react';

export default function SimpleTest() {
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const testNewAPIs = async () => {
    setIsLoading(true);
    setTestResult('Testing...');

    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7); // Last 7 days

      // Test Route Analytics API
      const routeResponse = await fetch(
        `/api/analytics/route-analytics?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
      );
      
      if (routeResponse.ok) {
        const routeData = await routeResponse.json();
        setTestResult(`✅ SUCCESS! Route Analytics API working. Found ${routeData.data?.length || 0} routes.`);
      } else {
        setTestResult(`❌ Route Analytics API failed: ${routeResponse.status}`);
      }

    } catch (error) {
      setTestResult(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-[#1E293B] border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <TestTube className="h-5 w-5 text-green-400" />
          Quick API Test
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button
            onClick={testNewAPIs}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {isLoading ? 'Testing...' : 'Test New Analytics APIs'}
          </Button>

          {testResult && (
            <div className={`p-4 rounded-lg border ${
              testResult.includes('✅') 
                ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}>
              {testResult}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}