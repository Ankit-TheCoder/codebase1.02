
import { supabase } from '@/integrations/supabase/client';

export const useProjectTracking = () => {
  const trackProjectView = async (projectName: string, projectUrl?: string) => {
    try {
      const userAgent = navigator.userAgent;
      const referrer = document.referrer || null;

      const { error } = await supabase
        .from('project_views')
        .insert([
          {
            project_name: projectName,
            project_url: projectUrl,
            user_agent: userAgent,
            referrer: referrer,
          }
        ]);

      if (error) {
        console.error('Project tracking error:', error);
      }
    } catch (error) {
      console.error('Project tracking error:', error);
    }
  };

  return { trackProjectView };
};
