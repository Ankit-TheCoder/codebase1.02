
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const usePageTracking = () => {
  useEffect(() => {
    const trackPageView = async () => {
      try {
        // Get user's IP and other info
        const userAgent = navigator.userAgent;
        const referrer = document.referrer || null;
        
        // Detect device type
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        const deviceType = isMobile ? 'mobile' : 'desktop';

        // Extract browser info
        const browser = userAgent.includes('Chrome') ? 'Chrome' : 
                      userAgent.includes('Firefox') ? 'Firefox' : 
                      userAgent.includes('Safari') ? 'Safari' : 'Other';

        const { error } = await supabase
          .from('page_views')
          .insert([
            {
              page_path: window.location.pathname,
              user_agent: userAgent,
              referrer: referrer,
              device_type: deviceType,
              browser: browser,
            }
          ]);

        if (error) {
          console.error('Page tracking error:', error);
        }
      } catch (error) {
        console.error('Page tracking error:', error);
      }
    };

    trackPageView();
  }, []);
};
