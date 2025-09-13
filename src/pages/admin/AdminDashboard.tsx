import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Package, 
  Calendar, 
  Activity, 
  BookOpen, 
  Users, 
  ShoppingCart,
  LogOut,
  Settings,
  Camera,
  MessageSquare,
  MapPin,
  Star,
  Map,
  Wine
} from "lucide-react";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    products: 0,
    activities: 0,
    events: 0,
    blogPosts: 0,
    orders: 0,
    bookings: 0,
    reviews: 0,
    islandTours: 0,
    wineTastings: 0
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAdminAccess();
    loadStats();
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
      toast({
        variant: "destructive",
        title: "Доступ запрещен",
        description: "У вас нет прав администратора",
      });
      navigate("/admin");
      return;
    }

    setLoading(false);
  };

  const loadStats = async () => {
    try {
      const [products, activities, events, blogPosts, orders, bookings, reviews, islandTours, wineTastings] = await Promise.all([
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("activities").select("id", { count: "exact", head: true }),
        supabase.from("events").select("id", { count: "exact", head: true }),
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        supabase.from("orders").select("id", { count: "exact", head: true }),
        supabase.from("bookings").select("id", { count: "exact", head: true }),
        supabase.from("customer_reviews").select("id", { count: "exact", head: true }),
        supabase.from("island_tours").select("id", { count: "exact", head: true }).eq("is_active", true),
        supabase.from("wine_tastings").select("id", { count: "exact", head: true }).eq("is_active", true)
      ]);

      setStats({
        products: products.count || 0,
        activities: activities.count || 0,
        events: events.count || 0,
        blogPosts: blogPosts.count || 0,
        orders: orders.count || 0,
        bookings: bookings.count || 0,
        reviews: reviews.count || 0,
        islandTours: islandTours.count || 0,
        wineTastings: wineTastings.count || 0
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Загрузка...</div>;
  }

  const menuItems = [
    {
      title: "Товары",
      description: "Управление каталогом товаров",
      icon: Package,
      link: "/admin/products",
      count: stats.products
    },
    {
      title: "Активности",
      description: "Управление активностями",
      icon: Activity,
      link: "/admin/activities",
      count: stats.activities
    },
    {
      title: "События",
      description: "Управление событиями",
      icon: Calendar,
      link: "/admin/events",
      count: stats.events
    },
    {
      title: "Туры по островам",
      description: "Управление турами по островам",
      icon: Map,
      link: "/admin/island-tours",
      count: stats.islandTours
    },
    {
      title: "Винные дегустации",
      description: "Управление винными дегустациями",
      icon: Wine,
      link: "/admin/wine-tastings",
      count: stats.wineTastings
    },
    {
      title: "Блог",
      description: "Управление статьями блога",
      icon: BookOpen,
      link: "/admin/blog",
      count: stats.blogPosts
    },
    {
      title: "Instagram Галерея",
      description: "Управление 'Follow Our Journey'",
      icon: Camera,
      link: "/admin/instagram-gallery",
      count: 0
    },
    {
      title: "Hero Слайды", 
      description: "Управление главными слайдами страниц",
      icon: Settings,
      link: "/admin/hero-slides",
      count: 0
    },
    {
      title: "Testimonials",
      description: "Управление отзывами клиентов",
      icon: MessageSquare,
      link: "/admin/testimonials",
      count: 0
    },
    {
      title: "Заказы",
      description: "Просмотр заказов",
      icon: ShoppingCart,
      link: "/admin/orders",
      count: stats.orders
    },
    {
      title: "Бронирования",
      description: "Управление бронированиями",
      icon: Users,
      link: "/admin/bookings",
      count: stats.bookings
    },
    {
      title: "Отзывы клиентов",
      description: "Модерация отзывов клиентов",
      icon: Star,
      link: "/admin/reviews",
      count: stats.reviews
    },
    {
      title: "Локации",
      description: "Управление точками на карте",
      icon: MapPin,
      link: "/admin/locations",
      count: 0
    },
    {
      title: "Настройки сайта",
      description: "Управление настройками и конфигурацией",
      icon: Settings,
      link: "/admin/settings",
      count: 0
    }
  ];

  return (
    <div className="min-h-screen bg-muted/50">
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Админ-панель</h1>
          <div className="flex gap-2">
            <Link to="/admin/settings">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Настройки
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.link} to={item.link}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {item.title}
                    </CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{item.count}</div>
                    <CardDescription className="text-xs">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;