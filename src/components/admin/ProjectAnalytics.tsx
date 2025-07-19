
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Eye } from 'lucide-react';

const ProjectAnalytics = () => {
  const [projectStats, setProjectStats] = useState([]);
  const [recentViews, setRecentViews] = useState([]);

  useEffect(() => {
    fetchProjectAnalytics();
  }, []);

  const fetchProjectAnalytics = async () => {
    try {
      // Fetch project views stats
      const { data: views } = await supabase
        .from('project_views')
        .select('*');

      // Group by project name
      const projectCounts: Record<string, number> = {};
      views?.forEach(view => {
        projectCounts[view.project_name] = (projectCounts[view.project_name] || 0) + 1;
      });

      const chartData = Object.entries(projectCounts)
        .sort(([,a], [,b]) => Number(b) - Number(a))
        .map(([project, views]) => ({ project, views: Number(views) }));

      setProjectStats(chartData);

      // Get recent project views
      const { data: recent } = await supabase
        .from('project_views')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      setRecentViews(recent || []);
    } catch (error) {
      console.error('Error fetching project analytics:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Project Views
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={projectStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="project" 
                stroke="rgba(255,255,255,0.7)" 
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis stroke="rgba(255,255,255,0.7)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="views" fill="#ec4899" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Eye className="w-5 h-5 mr-2" />
            Recent Project Views
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {recentViews.map((view) => (
              <div
                key={view.id}
                className="p-3 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white font-medium">{view.project_name}</p>
                    <p className="text-white/60 text-sm">{view.project_url}</p>
                    <p className="text-white/50 text-xs">{view.ip_address}</p>
                  </div>
                  <span className="text-white/70 text-xs">
                    {formatDate(view.created_at)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectAnalytics;
