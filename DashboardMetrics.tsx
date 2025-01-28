import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, TrendingUp, DollarSign } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { monitoring } from '../lib/api';
import { formatDistanceToNow } from 'date-fns';

export const DashboardMetrics = () => {
  const { data: metrics } = useQuery({
    queryKey: ['metrics'],
    queryFn: () => monitoring.getMetrics('1h'),
  });

  const cards = [
    {
      title: 'TPS',
      value: metrics?.[metrics.length - 1]?.tps.toFixed(2) || '0',
      icon: <Activity className="w-6 h-6" />,
    },
    {
      title: 'Success Rate',
      value: `${(metrics?.[metrics.length - 1]?.successRate || 0) * 100}%`,
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      title: 'Gas Price',
      value: metrics?.[metrics.length - 1]?.gasPrice || '0',
      icon: <DollarSign className="w-6 h-6" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div key={card.title} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <p className="text-2xl font-semibold">{card.value}</p>
              </div>
              <div className="text-blue-500">{card.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium mb-4">Performance Metrics</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={metrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(value) => formatDistanceToNow(new Date(value))}
              />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="tps" stroke="#3b82f6" />
              <Line type="monotone" dataKey="latency" stroke="#ef4444" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};