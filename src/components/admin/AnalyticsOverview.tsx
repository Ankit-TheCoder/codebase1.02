
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const AnalyticsOverview = () => {
  const [dailyStats, setDailyStats] = useState([]);
  const [topPages, setTopPages] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Fetch daily views for last 7 days
      const { data: views } = await supabase
        .from('page_views')
        .select('created_at')
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

      // Group by day
      const dailyData: Record<string, number> = {};
      views?.forEach(view => {
        const date = new Date(view.created_at).toLocaleDateString();
        dailyData[date] = (dailyData[date] || 0) + 1;
      });

      const chartData = Object.entries(dailyData).map(([date, views]) => ({
        date,
        views: Number(views)
      }));

      setDailyStats(chartData);

      // Fetch top pages
      const { data: pageViews } = await supabase
        .from('page_views')
        .select('page_path');

      const pageCounts: Record<string, number> = {};
      pageViews?.forEach(view => {
        pageCounts[view.page_path] = (pageCounts[view.page_path] || 0) + 1;
      });

      const topPagesData = Object.entries(pageCounts)
        .sort(([,a], [,b]) => Number(b) - Number(a))
        .slice(0, 5)
        .map(([page, views]) => ({ page, views: Number(views) }));

      setTopPages(topPagesData);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Daily Views (Last 7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.7)" />
              <YAxis stroke="rgba(255,255,255,0.7)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px'
                }}
              />
              <Line type="monotone" dataKey="views" stroke="#8b5cf6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Top Pages</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topPages}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="page" stroke="rgba(255,255,255,0.7)" />
              <YAxis stroke="rgba(255,255,255,0.7)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="views" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsOverview;
