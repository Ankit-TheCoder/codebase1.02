
import { useEffect } from 'react';
import { usePageTracking } from './usePageTracking';

export const useAnalytics = () => {
  usePageTracking();
};
