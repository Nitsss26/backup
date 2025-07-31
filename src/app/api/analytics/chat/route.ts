// src/app/api/analytics/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';

// This is a mock API endpoint. In a real application, you would integrate with an AI service like OpenAI or Vertex AI.
export async function POST(request: NextRequest) {
  try {
    const { query, startDate, endDate } = await request.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    // Mock responses based on keywords in the query
    if (query.toLowerCase().includes('sales')) {
      const mockSalesData = [
        { label: 'Mon', value: 1200 },
        { label: 'Tue', value: 1500 },
        { label: 'Wed', value: 1100 },
        { label: 'Thu', value: 1800 },
        { label: 'Fri', value: 2100 },
        { label: 'Sat', value: 2500 },
        { label: 'Sun', value: 2300 },
      ];
      return NextResponse.json({
        content: `Here are the sales from ${new Date(startDate).toLocaleDateString()} to ${new Date(endDate).toLocaleDateString()}.`,
        chart: { type: 'bar', dataKey: 'sales', data: mockSalesData },
      });
    } else if (query.toLowerCase().includes('users')) {
      const mockUserData = [
        { label: 'Mon', value: 150 },
        { label: 'Tue', value: 160 },
        { label: 'Wed', value: 175 },
        { label: 'Thu', value: 180 },
        { label: 'Fri', value: 200 },
        { label: 'Sat', value: 220 },
        { label: 'Sun', value: 210 },
      ];
      return NextResponse.json({
        content: `Here's an overview of user activity in the selected period.`,
        chart: { type: 'line', dataKey: 'users', data: mockUserData },
      });
    }

    return NextResponse.json({
      content: "I'm sorry, I can only provide information about sales and users at the moment.",
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
