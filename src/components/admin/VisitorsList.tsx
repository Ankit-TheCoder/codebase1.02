
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { Globe, Monitor, Smartphone } from 'lucide-react';

const VisitorsList = () => {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    try {
      const { data } = await supabase
        .from('page_views')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      setVisitors(data || []);
    } catch (error) {
      console.error('Error fetching visitors:', error);
    }
  };

  const getDeviceIcon = (userAgent) => {
    if (userAgent?.toLowerCase().includes('mobile')) {
      return <Smartphone className="w-4 h-4" />;
    }
    return <Monitor className="w-4 h-4" />;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Globe className="w-5 h-5 mr-2" />
          Recent Visitors
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/20">
                <TableHead className="text-white/80">Page</TableHead>
                <TableHead className="text-white/80">IP Address</TableHead>
                <TableHead className="text-white/80">Device</TableHead>
                <TableHead className="text-white/80">Referrer</TableHead>
                <TableHead className="text-white/80">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visitors.map((visitor) => (
                <TableRow key={visitor.id} className="border-white/10">
                  <TableCell className="text-white">{visitor.page_path}</TableCell>
                  <TableCell className="text-white/70">{visitor.ip_address || 'Unknown'}</TableCell>
                  <TableCell className="text-white/70">
                    <div className="flex items-center">
                      {getDeviceIcon(visitor.user_agent)}
                      <span className="ml-2">{visitor.device_type || 'Desktop'}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-white/70">{visitor.referrer || 'Direct'}</TableCell>
                  <TableCell className="text-white/70">{formatDate(visitor.created_at)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisitorsList;
