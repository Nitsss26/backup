
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { renderChart } from './analyticsUtils'; // Import renderChart for dynamic rendering

interface Message {
  role: 'user' | 'assistant';
  content: string;
  chart?: { type: 'line' | 'bar' | 'pie'; dataKey: string; data: { label: string; value: number }[] };
}

interface AiAnalyticsBotProps {
  startDate?: Date;
  endDate?: Date;
}

const AiAnalyticsBot: React.FC<AiAnalyticsBotProps> = ({ startDate, endDate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const handleSendQuery = async () => {
    if (!query.trim()) return;

    const newMessage: Message = { role: 'user', content: query };
    setMessages((prev) => [...prev, newMessage]);
    setQuery('');
    setIsLoading(true);

    try {
      if (!startDate || !endDate) {
        throw new Error("Date range is not selected.");
      }
      
      const response = await fetch('/api/analytics/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, startDate: startDate.toISOString(), endDate: endDate.toISOString() }),
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
        className="fixed bottom-4 right-4 rounded-full p-4 bg-blue-600 hover:bg-blue-700 shadow-lg text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Sparkles className="h-6 w-6" />
      </Button>
      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-96 bg-white text-slate-800 shadow-xl border border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-600"/>
              <CardTitle className="text-lg text-slate-900">Ask Shriya</CardTitle>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5 text-slate-500" />
            </Button>
          </CardHeader>
          <CardContent className="p-4">
            <ScrollArea className="h-64 mb-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 p-3 rounded-lg text-sm ${
                    msg.role === 'user' ? 'bg-blue-600 text-white ml-auto' : 'bg-slate-100 text-slate-800'
                  }`}
                  style={{ maxWidth: '85%'}}
                >
                  <p>{msg.content}</p>
                  {msg.chart && (
                    <div className="h-64 mt-2 bg-white p-2 rounded">
                       {renderChart(msg.chart.dataKey, msg.chart.type, msg.chart.dataKey, msg.chart.data)}
                    </div>
                  )}
                </div>
              ))}
              {isLoading && <p className="text-center text-slate-400">Loading...</p>}
            </ScrollArea>
            <div className="flex space-x-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about your data..."
                className="bg-white border-slate-300 text-slate-800"
                onKeyPress={(e) => e.key === 'Enter' && handleSendQuery()}
              />
              <Button onClick={handleSendQuery} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white">
                Send
              </Button>
            </div>
            <Button
              variant="outline"
              className="mt-2 w-full border-slate-300 text-slate-600"
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
