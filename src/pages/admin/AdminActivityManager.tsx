import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import EnhancedActivityManager from '@/components/admin/EnhancedActivityManager';

const AdminActivityManager: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/admin');
        return;
      }

      const { data: adminUser } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      if (!adminUser) {
        navigate('/admin');
        return;
      }
    } catch (error) {
      console.error('Error checking admin access:', error);
      navigate('/admin');
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/admin/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Activity Content Manager</h1>
            <p className="text-muted-foreground">Manage schedule items, inclusions, and highlights for activities</p>
          </div>
        </div>
      </div>

      <EnhancedActivityManager />
    </div>
  );
};

export default AdminActivityManager;