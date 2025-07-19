
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { Mail, MessageSquare, User, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ContactSubmissions = ({ onUpdate }) => {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      await fetchSubmissions();
      onUpdate();
      toast({
        title: "Status Updated",
        description: `Message marked as ${status}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const saveNotes = async (id) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ admin_notes: adminNotes })
        .eq('id', id);

      if (error) throw error;

      await fetchSubmissions();
      toast({
        title: "Notes Saved",
        description: "Admin notes have been saved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save notes",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Submissions List */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            Contact Submissions ({submissions.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 max-h-96 overflow-y-auto">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                selectedSubmission?.id === submission.id
                  ? 'bg-white/20 border-purple-400'
                  : 'bg-white/5 border-white/20 hover:bg-white/10'
              }`}
              onClick={() => {
                setSelectedSubmission(submission);
                setAdminNotes(submission.admin_notes || '');
              }}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-white/60" />
                  <span className="text-white font-medium">{submission.name}</span>
                </div>
                <Badge
                  variant={submission.status === 'read' ? 'secondary' : 'destructive'}
                  className="text-xs"
                >
                  {submission.status}
                </Badge>
              </div>
              <p className="text-white/70 text-sm mb-2">{submission.email}</p>
              <p className="text-white/60 text-sm truncate">{submission.message}</p>
              <div className="flex items-center text-white/50 text-xs mt-2">
                <Clock className="w-3 h-3 mr-1" />
                {formatDate(submission.created_at)}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Submission Details */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Message Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedSubmission ? (
            <div className="space-y-4">
              <div>
                <label className="text-white/80 text-sm font-medium">From</label>
                <p className="text-white">{selectedSubmission.name}</p>
                <p className="text-white/70 text-sm">{selectedSubmission.email}</p>
              </div>

              <div>
                <label className="text-white/80 text-sm font-medium">Message</label>
                <div className="bg-white/10 p-3 rounded-lg mt-1">
                  <p className="text-white">{selectedSubmission.message}</p>
                </div>
              </div>

              <div>
                <label className="text-white/80 text-sm font-medium">Received</label>
                <p className="text-white/70">{formatDate(selectedSubmission.created_at)}</p>
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={() => updateStatus(selectedSubmission.id, 'read')}
                  size="sm"
                  variant={selectedSubmission.status === 'read' ? 'secondary' : 'default'}
                >
                  Mark as Read
                </Button>
                <Button
                  onClick={() => updateStatus(selectedSubmission.id, 'unread')}
                  size="sm"
                  variant={selectedSubmission.status === 'unread' ? 'secondary' : 'outline'}
                >
                  Mark as Unread
                </Button>
              </div>

              <div>
                <label className="text-white/80 text-sm font-medium">Admin Notes</label>
                <Textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add your notes here..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 mt-1"
                  rows={3}
                />
                <Button
                  onClick={() => saveNotes(selectedSubmission.id)}
                  size="sm"
                  className="mt-2"
                >
                  Save Notes
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-white/60 text-center py-8">
              Select a submission to view details
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactSubmissions;
