
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { supabase } from '@/integrations/supabase/client';
import { LogOut, Users, Eye, Mail, TrendingUp } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import AnalyticsOverview from '@/components/admin/AnalyticsOverview';
import VisitorsList from '@/components/admin/VisitorsList';
import ContactSubmissions from '@/components/admin/ContactSubmissions';
import ProjectAnalytics from '@/components/admin/ProjectAnalytics';

const AdminDashboard = () => {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalViews: 0,
    uniqueVisitors: 0,
    contactSubmissions: 0,
    projectViews: 0
  });

  useEffect(() => {
    if (!admin) {
      navigate('/admin/login');
      return;
    }
    fetchStats();
  }, [admin, navigate]);

  const fetchStats = async () => {
    try {
      const [viewsResult, contactsResult, projectsResult] = await Promise.all([
        supabase.from('page_views').select('*', { count: 'exact' }),
        supabase.from('contact_submissions').select('*', { count: 'exact' }),
        supabase.from('project_views').select('*', { count: 'exact' })
      ]);

      // Count unique visitors based on IP
      const { data: uniqueIPs } = await supabase
        .from('page_views')
        .select('ip_address')
        .not('ip_address', 'is', null);

      const uniqueVisitors = new Set(uniqueIPs?.map(v => v.ip_address)).size;

      setStats({
        totalViews: viewsResult.count || 0,
        uniqueVisitors,
        contactSubmissions: contactsResult.count || 0,
        projectViews: projectsResult.count || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast({
        title: "Error",
        description: "Failed to fetch dashboard statistics",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  if (!admin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-white/70">Welcome back, {admin.email}</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalViews}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Unique Visitors</CardTitle>
              <Users className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.uniqueVisitors}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Contact Messages</CardTitle>
              <Mail className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.contactSubmissions}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Project Views</CardTitle>
              <TrendingUp className="h-4 w-4 text-pink-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.projectViews}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white/10 border-white/20">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-white/20">Overview</TabsTrigger>
            <TabsTrigger value="visitors" className="text-white data-[state=active]:bg-white/20">Visitors</TabsTrigger>
            <TabsTrigger value="projects" className="text-white data-[state=active]:bg-white/20">Projects</TabsTrigger>
            <TabsTrigger value="contacts" className="text-white data-[state=active]:bg-white/20">Contacts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <AnalyticsOverview />
          </TabsContent>

          <TabsContent value="visitors">
            <VisitorsList />
          </TabsContent>

          <TabsContent value="projects">
            <ProjectAnalytics />
          </TabsContent>

          <TabsContent value="contacts">
            <ContactSubmissions onUpdate={fetchStats} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
