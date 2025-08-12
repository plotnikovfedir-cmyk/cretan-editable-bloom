import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, Edit, Trash2, Star, MessageSquare, MapPin } from "lucide-react";
import AdminNavigation from "@/components/admin/AdminNavigation";
import MapSelector from "@/components/admin/MapSelector";
import ImageUploader from "@/components/admin/ImageUploader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  in_stock: boolean;
  latitude?: number;
  longitude?: number;
  created_at: string;
}

interface ProductReviewStats {
  count: number;
  averageRating: number;
}

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productReviews, setProductReviews] = useState<{[key: string]: ProductReviewStats}>({});
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    category: "",
    image_url: "",
    latitude: null as number | null,
    longitude: null as number | null,
    in_stock: true
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAdminAccess();
    loadProducts();
    loadProductReviews();
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

  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось загрузить товары",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadProductReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("customer_reviews")
        .select("product_id, rating")
        .eq("is_approved", true);

      if (error) throw error;

      const reviewStats: {[key: string]: ProductReviewStats} = {};
      
      (data || []).forEach(review => {
        if (!review.product_id) return;
        
        if (!reviewStats[review.product_id]) {
          reviewStats[review.product_id] = { count: 0, averageRating: 0 };
        }
        
        const current = reviewStats[review.product_id];
        const newCount = current.count + 1;
        const newAverage = ((current.averageRating * current.count) + review.rating) / newCount;
        
        reviewStats[review.product_id] = {
          count: newCount,
          averageRating: newAverage
        };
      });

      setProductReviews(reviewStats);
    } catch (error) {
      console.error("Failed to load product reviews:", error);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const productData = {
        name: formData.name,
        slug: formData.slug || generateSlug(formData.name),
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        image_url: formData.image_url,
        latitude: formData.latitude,
        longitude: formData.longitude,
        in_stock: formData.in_stock
      };

      if (editingProduct) {
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", editingProduct.id);

        if (error) throw error;
        
        toast({
          title: "Успех",
          description: "Товар обновлен",
        });
      } else {
        const { error } = await supabase
          .from("products")
          .insert([productData]);

        if (error) throw error;
        
        toast({
          title: "Успех",
          description: "Товар создан",
        });
      }

      setIsDialogOpen(false);
      setEditingProduct(null);
      resetForm();
      loadProducts();
      loadProductReviews();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось сохранить товар",
      });
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      description: product.description || "",
      price: product.price?.toString() || "",
      category: product.category || "",
      image_url: product.image_url || "",
      latitude: product.latitude || null,
      longitude: product.longitude || null,
      in_stock: product.in_stock
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (productId: string) => {
    if (!confirm("Вы уверены, что хотите удалить этот товар?")) return;

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

      if (error) throw error;

      toast({
        title: "Успех",
        description: "Товар удален",
      });
      
      loadProducts();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось удалить товар",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
      price: "",
      category: "",
      image_url: "",
      latitude: null,
      longitude: null,
      in_stock: true
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const openCreateDialog = () => {
    resetForm();
    setEditingProduct(null);
    setIsDialogOpen(true);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Загрузка...</div>;
  }

  return (
    <div className="min-h-screen bg-muted/50">
      <AdminNavigation 
        title="Управление товарами"
      />
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-end">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreateDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Добавить товар
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingProduct ? "Редактировать товар" : "Создать товар"}
                </DialogTitle>
                <DialogDescription>
                  Заполните информацию о товаре
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Название</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Слаг (URL)</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="Автоматически из названия"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Описание</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Цена (€)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Категория</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image_url">Изображение товара</Label>
                  <ImageUploader
                    currentImage={formData.image_url}
                    onImageUploaded={(url) => setFormData({ ...formData, image_url: url })}
                    bucket="admin-uploads"
                    folder="products"
                    label="Загрузить изображение товара"
                  />
                  {formData.image_url && (
                    <div className="mt-2">
                      <img 
                        src={formData.image_url} 
                        alt="Product preview" 
                        className="w-32 h-32 object-cover rounded-md border"
                      />
                    </div>
                  )}
                </div>
                
                {/* Map selector for coordinates */}
                <MapSelector
                  latitude={formData.latitude}
                  longitude={formData.longitude}
                  onCoordinatesChange={(lat, lng) => {
                    setFormData({ 
                      ...formData, 
                      latitude: lat || null, 
                      longitude: lng || null 
                    });
                  }}
                />

                <div className="flex items-center space-x-2">
                  <Switch
                    id="in_stock"
                    checked={formData.in_stock}
                    onCheckedChange={(checked) => setFormData({ ...formData, in_stock: checked })}
                  />
                  <Label htmlFor="in_stock">В наличии</Label>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Отмена
                  </Button>
                  <Button type="submit">
                    {editingProduct ? "Обновить" : "Создать"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {product.image_url && (
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <p className="text-sm text-muted-foreground mb-2">
                  {product.description?.substring(0, 100)}...
                </p>
                
                {/* Product reviews and location info */}
                <div className="space-y-2 mb-3">
                  {productReviews[product.id] && (
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-muted-foreground" />
                      <div className="flex items-center gap-1">
                        {renderStars(Math.round(productReviews[product.id].averageRating))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {productReviews[product.id].averageRating.toFixed(1)} 
                        ({productReviews[product.id].count} отзывов)
                      </span>
                    </div>
                  )}
                  
                  {product.latitude && product.longitude && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {product.latitude.toFixed(4)}, {product.longitude.toFixed(4)}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="font-bold">€{product.price}</span>
                  <span className={`text-sm ${product.in_stock ? 'text-green-600' : 'text-red-600'}`}>
                    {product.in_stock ? 'В наличии' : 'Нет в наличии'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Слаг: {product.slug}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminProducts;