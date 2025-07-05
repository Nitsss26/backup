"use client";

import { useState, useEffect } from 'react';
import { Globe, Clock, Loader2 } from 'lucide-react';

interface VisitData {
  _id: string;
  sessionId: string;
  path: string;
  timestamp: string;
  duration?: number;
  clickEvents: {
    _id: string;
    elementText: string;
    href?: string;
    timestamp: string;
  }[];
}

export default function TotalVisitsPage() {
  const [visits, setVisits] = useState<VisitData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        setLoading(true);
        // Fetch visit events with click events
        const response = await fetch('/api/analytics/total-visits');
        const data = await response.json();
        setVisits(data);
      } catch (err) {
        setError('Failed to load visit data.');
        console.error('Error fetching visits:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVisits();
  }, []);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const getSessionName = (sessionId: string) => {
    return `Session-${sessionId.substring(0, 8)}`;
  };

  const getLinksClicked = (clickEvents: VisitData['clickEvents']) => {
    const links = clickEvents
      .filter(click => click.href)
      .map(click => click.elementText || click.href)
      .slice(0, 3); // Show max 3 links
    
    if (links.length === 0) return 'No links clicked';
    if (clickEvents.filter(click => click.href).length > 3) {
      return links.join(', ') + '...';
    }
    return links.join(', ');
  };

  return (
    <div className="space-y-6 p-4 max-w-screen-xl mx-auto">
      {/* Header Card */}
      <div className="bg-white shadow-lg border-l-4 border-blue-500 rounded-lg">
        <div className="p-6 flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-md">
            <Globe className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-blue-600">Total Visits</h1>
            <p className="text-gray-600">Complete overview of all site visits with session details and click activity</p>
          </div>
        </div>
      </div>

      {/* Visits Table */}
      <div className="bg-white shadow-lg rounded-lg">
        <div className="p-6 border-b flex items-center gap-3">
          <div className="p-2.5 bg-green-100 rounded-md">
            <Clock className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h2 className="font-semibold text-xl">All Site Visits</h2>
            <p className="text-gray-600">Time, Session Names, and Links Clicked</p>
          </div>
        </div>
        <div className="p-0">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <span className="ml-2">Loading visits...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 text-lg">{error}</p>
            </div>
          ) : visits.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No visit data available.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left p-4 font-semibold">Time</th>
                    <th className="text-left p-4 font-semibold">Session ID</th>
                    <th className="text-left p-4 font-semibold">Session Name</th>
                    <th className="text-left p-4 font-semibold">Links Clicked</th>
                  </tr>
                </thead>
                <tbody>
                  {visits.map((visit) => (
                    <tr key={visit._id} className="hover:bg-gray-50 border-b">
                      <td className="p-4 text-sm">
                        {formatTime(visit.timestamp)}
                      </td>
                      <td className="p-4 text-sm font-mono text-gray-600">
                        {visit.sessionId.substring(0, 12)}...
                      </td>
                      <td className="p-4 text-sm font-medium text-blue-600">
                        {getSessionName(visit.sessionId)}
                      </td>
                      <td className="p-4 text-sm max-w-md">
                        <div className="truncate" title={getLinksClicked(visit.clickEvents)}>
                          {getLinksClicked(visit.clickEvents)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg">
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{visits.length}</div>
            <div className="text-sm text-blue-600">Total Visits</div>
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg">
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {new Set(visits.map(v => v.sessionId)).size}
            </div>
            <div className="text-sm text-green-600">Unique Sessions</div>
          </div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg">
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {visits.reduce((total, visit) => total + visit.clickEvents.length, 0)}
            </div>
            <div className="text-sm text-purple-600">Total Clicks</div>
          </div>
        </div>
      </div>
    </div>
  );
}