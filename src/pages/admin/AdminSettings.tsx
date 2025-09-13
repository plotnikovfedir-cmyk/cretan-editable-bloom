import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Settings, Globe, Mail, CreditCard, Map, FileText, Users, ArrowLeft } from 'lucide-react';
import { SettingsForm } from '@/components/admin/SettingsForm';

interface Setting {
  id: string;
  setting_key: string;
  setting_value: string;
  setting_type: string;
  category: string;
  description?: string;
  is_public: boolean;
}

const AdminSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<Setting[]>([]);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    checkAdminAccess();
    loadSettings();
  }, []);

  const checkAdminAccess = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate('/admin');
      return;
    }

    const { data: isAdminUser } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .single();

    if (!isAdminUser) {
      navigate('/admin');
      return;
    }
  };

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .order('category', { ascending: true });

      if (error) throw error;
      setSettings(data || []);
    } catch (error) {
      console.error('Error loading settings:', error);
      toast({
        title: "Error",
        description: "Failed to load settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const settingCategories = [
    { 
      id: 'general', 
      label: 'General', 
      icon: Globe,
      description: 'Site name, description, contact info' 
    },
    { 
      id: 'seo', 
      label: 'SEO', 
      icon: FileText,
      description: 'Meta tags, Analytics, Search settings' 
    },
    { 
      id: 'email', 
      label: 'Email', 
      icon: Mail,
      description: 'SMTP settings, email templates' 
    },
    { 
      id: 'payments', 
      label: 'Payments', 
      icon: CreditCard,
      description: 'Stripe, currency, tax settings' 
    },
    { 
      id: 'maps', 
      label: 'Maps', 
      icon: Map,
      description: 'Mapbox tokens, location settings' 
    },
    { 
      id: 'blog', 
      label: 'Blog', 
      icon: FileText,
      description: 'Pagination, comments, categories' 
    },
    { 
      id: 'users', 
      label: 'Users', 
      icon: Users,
      description: 'User management, roles, permissions' 
    }
  ];

  const getSettingsByCategory = (category: string) => {
    return settings.filter(setting => setting.category === category);
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button
            variant="ghost"
            onClick={() => navigate('/admin/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">
            Manage your site configuration and preferences
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7 lg:w-auto lg:flex">
          {settingCategories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="flex items-center gap-2"
            >
              <category.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{category.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {settingCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <category.icon className="h-5 w-5" />
                  {category.label} Settings
                </CardTitle>
                <p className="text-muted-foreground">{category.description}</p>
              </CardHeader>
              <CardContent>
                <SettingsForm
                  category={category.id}
                  settings={getSettingsByCategory(category.id)}
                  onSettingsUpdate={loadSettings}
                />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AdminSettings;