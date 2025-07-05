import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChartCard from './ChartCard';
import { MessageCircle, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast'; // Updated import path

interface Message {
  role: 'user' | 'assistant';
  content: string;
  chart?: { type: 'line' | 'bar' | 'pie'; dataKey: string; data: { label: string; value: number }[] };
}

interface AiAnalyticsBotProps {
  startDate: Date;
  endDate: Date;
}

const AiAnalyticsBot: React.FC<AiAnalyticsBotProps> = ({ startDate, endDate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendQuery = async () => {
    if (!query.trim()) return;

    const newMessage: Message = { role: 'user', content: query };
    setMessages((prev) => [...prev, newMessage]);
    setQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/analytics/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, startDate, endDate }),
      });

      if (!response.ok) throw new Error('Failed to fetch data');

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.content, chart: data.chart }]);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch data. Please try again.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearConversation = () => {
    setMessages([]);
  };

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 rounded-full p-4 bg-blue-600 hover:bg-blue-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
      {isOpen && (
        <Card className="fixed bottom-16 right-4 w-96 bg-gray-900 text-white shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Ask Shriya</CardTitle>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64 mb-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 p-3 rounded-lg ${
                    msg.role === 'user' ? 'bg-blue-800 text-right' : 'bg-gray-800'
                  }`}
                >
                  <p>{msg.content}</p>
                  {msg.chart && (
                    <ChartCard
                      title={msg.chart.dataKey}
                      data={msg.chart.data}
                      type={msg.chart.type}
                      dataKey={msg.chart.dataKey}
                    />
                  )}
                </div>
              ))}
              {isLoading && <p className="text-center text-gray-400">Loading...</p>}
            </ScrollArea>
            <div className="flex space-x-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about sales, courses, or traffic..."
                className="bg-gray-800 text-white border-gray-700"
                onKeyPress={(e) => e.key === 'Enter' && handleSendQuery()}
              />
              <Button onClick={handleSendQuery} disabled={isLoading}>
                Send
              </Button>
            </div>
            <Button
              variant="outline"
              className="mt-2 w-full border-gray-700 text-white"
              onClick={handleClearConversation}
            >
              Clear Conversation
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default AiAnalyticsBot;