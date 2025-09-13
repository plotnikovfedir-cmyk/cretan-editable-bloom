import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Save, Trash2 } from 'lucide-react';

interface Setting {
  id: string;
  setting_key: string;
  setting_value: string;
  setting_type: string;
  category: string;
  description?: string;
  is_public: boolean;
}

interface SettingsFormProps {
  category: string;
  settings: Setting[];
  onSettingsUpdate: () => void;
}

const defaultSettings: Record<string, Array<Omit<Setting, 'id'>>> = {
  general: [
    { setting_key: 'site_name', setting_value: 'Cretan Guru', setting_type: 'text', category: 'general', description: 'Site name displayed in header', is_public: true },
    { setting_key: 'site_description', setting_value: 'Discover authentic Crete experiences', setting_type: 'textarea', category: 'general', description: 'Site description for meta tags', is_public: true },
    { setting_key: 'contact_email', setting_value: '', setting_type: 'email', category: 'general', description: 'Main contact email', is_public: true },
    { setting_key: 'contact_phone', setting_value: '', setting_type: 'text', category: 'general', description: 'Contact phone number', is_public: true },
  ],
  seo: [
    { setting_key: 'google_analytics_id', setting_value: '', setting_type: 'text', category: 'seo', description: 'Google Analytics tracking ID', is_public: false },
    { setting_key: 'meta_title_suffix', setting_value: ' - Cretan Guru', setting_type: 'text', category: 'seo', description: 'Default suffix for page titles', is_public: true },
    { setting_key: 'default_meta_description', setting_value: '', setting_type: 'textarea', category: 'seo', description: 'Default meta description', is_public: true },
  ],
  email: [
    { setting_key: 'smtp_host', setting_value: '', setting_type: 'text', category: 'email', description: 'SMTP server host', is_public: false },
    { setting_key: 'smtp_port', setting_value: '587', setting_type: 'number', category: 'email', description: 'SMTP server port', is_public: false },
    { setting_key: 'from_email', setting_value: '', setting_type: 'email', category: 'email', description: 'Default from email address', is_public: false },
  ],
  payments: [
    { setting_key: 'currency', setting_value: 'EUR', setting_type: 'select', category: 'payments', description: 'Default currency', is_public: true },
    { setting_key: 'tax_rate', setting_value: '0.24', setting_type: 'number', category: 'payments', description: 'Tax rate (0.24 = 24%)', is_public: true },
  ],
  blog: [
    { setting_key: 'posts_per_page', setting_value: '6', setting_type: 'number', category: 'blog', description: 'Number of posts per page', is_public: true },
    { setting_key: 'enable_comments', setting_value: 'true', setting_type: 'boolean', category: 'blog', description: 'Enable comments on blog posts', is_public: true },
  ],
  social: [
    { setting_key: 'instagram_url', setting_value: '', setting_type: 'text', category: 'social', description: 'Instagram profile URL', is_public: true },
    { setting_key: 'facebook_url', setting_value: '', setting_type: 'text', category: 'social', description: 'Facebook page URL', is_public: true },
    { setting_key: 'whatsapp_number', setting_value: '', setting_type: 'text', category: 'social', description: 'WhatsApp contact number', is_public: true },
    { setting_key: 'telegram_username', setting_value: '', setting_type: 'text', category: 'social', description: 'Telegram username', is_public: true },
    { setting_key: 'youtube_url', setting_value: '', setting_type: 'text', category: 'social', description: 'YouTube channel URL', is_public: true },
    { setting_key: 'tiktok_url', setting_value: '', setting_type: 'text', category: 'social', description: 'TikTok profile URL', is_public: true },
  ],
  map: [
    { setting_key: 'map_center_lat', setting_value: '35.2401', setting_type: 'number', category: 'map', description: 'Default map center latitude', is_public: true },
    { setting_key: 'map_center_lng', setting_value: '24.8093', setting_type: 'number', category: 'map', description: 'Default map center longitude', is_public: true },
    { setting_key: 'map_default_zoom', setting_value: '9', setting_type: 'number', category: 'map', description: 'Default map zoom level', is_public: true },
    { setting_key: 'mapbox_style', setting_value: 'outdoors-v12', setting_type: 'select', category: 'map', description: 'Default Mapbox style', is_public: true },
  ],
  delivery: [
    { setting_key: 'delivery_zones', setting_value: 'Chania,Rethymno,Heraklion', setting_type: 'textarea', category: 'delivery', description: 'Delivery zones (comma separated)', is_public: true },
    { setting_key: 'delivery_fee', setting_value: '5.00', setting_type: 'number', category: 'delivery', description: 'Standard delivery fee', is_public: true },
    { setting_key: 'free_delivery_threshold', setting_value: '50.00', setting_type: 'number', category: 'delivery', description: 'Free delivery threshold amount', is_public: true },
    { setting_key: 'delivery_time_min', setting_value: '30', setting_type: 'number', category: 'delivery', description: 'Minimum delivery time (minutes)', is_public: true },
    { setting_key: 'delivery_time_max', setting_value: '90', setting_type: 'number', category: 'delivery', description: 'Maximum delivery time (minutes)', is_public: true },
  ],
  booking: [
    { setting_key: 'booking_advance_days', setting_value: '2', setting_type: 'number', category: 'booking', description: 'Minimum days in advance for bookings', is_public: true },
    { setting_key: 'max_participants', setting_value: '12', setting_type: 'number', category: 'booking', description: 'Maximum participants per booking', is_public: true },
    { setting_key: 'deposit_percentage', setting_value: '0.30', setting_type: 'number', category: 'booking', description: 'Deposit percentage (0.30 = 30%)', is_public: true },
    { setting_key: 'cancellation_policy', setting_value: '24 hours', setting_type: 'text', category: 'booking', description: 'Cancellation policy description', is_public: true },
  ],
  analytics: [
    { setting_key: 'google_tag_manager_id', setting_value: '', setting_type: 'text', category: 'analytics', description: 'Google Tag Manager ID', is_public: false },
    { setting_key: 'facebook_pixel_id', setting_value: '', setting_type: 'text', category: 'analytics', description: 'Facebook Pixel ID', is_public: false },
    { setting_key: 'hotjar_id', setting_value: '', setting_type: 'text', category: 'analytics', description: 'Hotjar tracking ID', is_public: false },
  ],
  maintenance: [
    { setting_key: 'maintenance_mode', setting_value: 'false', setting_type: 'boolean', category: 'maintenance', description: 'Enable maintenance mode', is_public: true },
    { setting_key: 'maintenance_message', setting_value: 'We are currently updating our website. Please check back soon!', setting_type: 'textarea', category: 'maintenance', description: 'Maintenance mode message', is_public: true },
    { setting_key: 'backup_frequency', setting_value: 'daily', setting_type: 'select', category: 'maintenance', description: 'Backup frequency', is_public: false },
  ]
};

export const SettingsForm: React.FC<SettingsFormProps> = ({
  category,
  settings,
  onSettingsUpdate
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initialize form data with existing settings
    const data: Record<string, any> = {};
    settings.forEach(setting => {
      if (setting.setting_type === 'boolean') {
        data[setting.setting_key] = setting.setting_value === 'true';
      } else {
        data[setting.setting_key] = setting.setting_value;
      }
    });
    setFormData(data);
  }, [settings]);

  const createDefaultSettings = async () => {
    if (!defaultSettings[category]) return;

    const settingsToCreate = defaultSettings[category].filter(
      defaultSetting => !settings.find(s => s.setting_key === defaultSetting.setting_key)
    );

    if (settingsToCreate.length === 0) return;

    try {
      const { error } = await supabase
        .from('settings')
        .insert(settingsToCreate);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Created ${settingsToCreate.length} default settings`,
      });

      onSettingsUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create default settings",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updates = Object.entries(formData).map(([key, value]) => {
        const setting = settings.find(s => s.setting_key === key);
        if (!setting) return null;

        return {
          id: setting.id,
          setting_value: setting.setting_type === 'boolean' ? value.toString() : value
        };
      }).filter(Boolean);

      if (updates.length > 0) {
        for (const update of updates) {
          const { error } = await supabase
            .from('settings')
            .update({ setting_value: update!.setting_value })
            .eq('id', update!.id);

          if (error) throw error;
        }
      }

      toast({
        title: "Success",
        description: "Settings saved successfully",
      });

      onSettingsUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const renderInput = (setting: Setting) => {
    const value = formData[setting.setting_key] ?? '';

    switch (setting.setting_type) {
      case 'textarea':
        return (
          <Textarea
            value={value}
            onChange={(e) => handleInputChange(setting.setting_key, e.target.value)}
            placeholder={setting.description}
          />
        );
      
      case 'boolean':
        return (
          <Switch
            checked={value}
            onCheckedChange={(checked) => handleInputChange(setting.setting_key, checked)}
          />
        );
      
      case 'select':
        if (setting.setting_key === 'currency') {
          return (
            <Select value={value} onValueChange={(val) => handleInputChange(setting.setting_key, val)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
              </SelectContent>
            </Select>
          );
        }
        return (
          <Input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(setting.setting_key, e.target.value)}
            placeholder={setting.description}
          />
        );
      
      case 'number':
        return (
          <Input
            type="number"
            step="0.01"
            value={value}
            onChange={(e) => handleInputChange(setting.setting_key, e.target.value)}
            placeholder={setting.description}
          />
        );
      
      case 'email':
        return (
          <Input
            type="email"
            value={value}
            onChange={(e) => handleInputChange(setting.setting_key, e.target.value)}
            placeholder={setting.description}
          />
        );
      
      default:
        return (
          <Input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(setting.setting_key, e.target.value)}
            placeholder={setting.description}
          />
        );
    }
  };

  if (settings.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">No settings found for this category.</p>
        <Button onClick={createDefaultSettings} variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Create Default Settings
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4">
        {settings.map((setting) => (
          <div key={setting.id} className="grid gap-2">
            <Label htmlFor={setting.setting_key} className="text-sm font-medium">
              {setting.setting_key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </Label>
            {renderInput(setting)}
            {setting.description && (
              <p className="text-xs text-muted-foreground">{setting.description}</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>
          <Save className="mr-2 h-4 w-4" />
          {loading ? 'Saving...' : 'Save Settings'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={createDefaultSettings}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Defaults
        </Button>
      </div>
    </form>
  );
};