
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminUser {
  id: string;
  email: string;
}

interface AdminLoginResponse {
  id: string;
  email: string;
}

export const useAdminAuth = () => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is logged in from localStorage
    const adminData = localStorage.getItem('admin_user');
    if (adminData) {
      setAdmin(JSON.parse(adminData));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Call the edge function directly
      const { data, error } = await supabase.functions.invoke('verify-admin-login', {
        body: { email, password }
      });

      if (error) throw error;

      if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
        const adminUser = { id: data.data[0].id, email: data.data[0].email };
        setAdmin(adminUser);
        localStorage.setItem('admin_user', JSON.stringify(adminUser));
        return { success: true };
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('admin_user');
  };

  return { admin, login, logout, loading };
};
