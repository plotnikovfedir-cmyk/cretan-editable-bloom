import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Settings, Globe, Mail, FileText, Users, Map, Truck, Calendar as CalendarIcon, BarChart3, Wrench } from "lucide-react";
import { SettingsForm } from "@/components/admin/SettingsForm";

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
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<Setting[]>([]);
  const [activeTab, setActiveTab] = useState("general");
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAccess();
    loadSettings();
  }, []);

  const checkAdminAccess = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/admin");
      return;
    }

    const { data: adminData, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("user_id", user.id)
      .eq("is_active", true)
      .single();

    if (error || !adminData) {
      navigate("/admin");
      return;
    }
  };

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("settings")
        .select("*")
        .order("category", { ascending: true });

      if (error) throw error;
      setSettings(data || []);
    } finally {
      setLoading(false);
    }
  };

  const settingCategories = [
    {
      id: "general",
      label: "General",
      icon: Settings,
      description: "Basic website settings and configuration"
    },
    {
      id: "seo",
      label: "SEO",
      icon: Globe,
      description: "Search engine optimization settings"
    },
    {
      id: "email",
      label: "Email",
      icon: Mail,
      description: "Email configuration and templates"
    },
    {
      id: "blog",
      label: "Blog",
      icon: FileText,
      description: "Blog and content management settings"
    },
    {
      id: "social",
      label: "Social",
      icon: Users,
      description: "Social media and sharing settings"
    },
    {
      id: "map",
      label: "Map",
      icon: Map,
      description: "Map and location settings"
    },
    {
      id: "delivery",
      label: "Delivery",
      icon: Truck,
      description: "Delivery zones and settings"
    },
    {
      id: "booking",
      label: "Booking",
      icon: CalendarIcon,
      description: "Booking and reservation settings"
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      description: "Analytics and tracking settings"
    },
    {
      id: "maintenance",
      label: "Maintenance",
      icon: Wrench,
      description: "System maintenance settings"
    }
  ];

  const getSettingsByCategory = (category: string) => {
    return settings.filter(setting => setting.category === category);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-muted/50">
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Website Settings</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10">
            {settingCategories.map((category) => {
              const Icon = category.icon;
              return (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {category.label}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {settingCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="w-5 h-5" />
                    {category.label} Settings
                  </CardTitle>
                  <CardDescription>{category.description}</CardDescription>
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
      </main>
    </div>
  );
};

export default AdminSettings;