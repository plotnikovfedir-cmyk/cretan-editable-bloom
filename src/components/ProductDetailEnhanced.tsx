import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Heart, ShoppingCart } from "lucide-react";
import ProductLocationMap from "@/components/ProductLocationMap";
import CustomerReviews from "@/components/CustomerReviews";
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";

interface ProductDetailEnhancedProps {
  productId: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  category?: string;
  image_url?: string;
  in_stock: boolean;
  latitude?: number;
  longitude?: number;
}

const ProductDetailEnhanced = ({ productId }: ProductDetailEnhancedProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

      if (error) throw error;
      setProduct(data);
    } catch (error) {
      console.error("Failed to load product:", error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось загрузить товар",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url || '',
      description: product.description || ''
    };
    
    for (let i = 0; i < quantity; i++) {
      addToCart(cartProduct);
    }
    
    toast({
      title: "Добавлено в корзину",
      description: `${quantity}x ${product.name} добавлено в корзину.`,
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Товар не найден</h1>
          <p className="text-muted-foreground">Товар, который вы ищете, не существует.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg">
              {product.image_url ? (
                <img 
                  src={product.image_url} 
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">Нет изображения</span>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
              {product.description && (
                <p className="text-lg text-muted-foreground mb-4">{product.description}</p>
              )}
              
              {product.category && (
                <Badge variant="secondary" className="mb-4">
                  {product.category}
                </Badge>
              )}

              {/* Origin - show coordinates if available */}
              {product.latitude && product.longitude && (
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Координаты: {product.latitude.toFixed(4)}, {product.longitude.toFixed(4)}
                  </span>
                </div>
              )}
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Количество</h3>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="px-4 py-2 border rounded">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Price & Actions */}
            <div className="space-y-4">
              <div className="text-3xl font-bold text-primary">
                €{(product.price * quantity).toFixed(2)}
              </div>
              
              <div className="flex gap-3">
                <Button 
                  size="lg" 
                  className="flex-1 bg-primary hover:bg-primary/90"
                  onClick={handleAddToCart}
                  disabled={!product.in_stock}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {product.in_stock ? "Добавить в корзину" : "Нет в наличии"}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="px-4"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
              
              {!product.in_stock && (
                <p className="text-sm text-red-600">Товар временно отсутствует на складе</p>
              )}
            </div>
          </div>
        </div>

        {/* Description & Reviews */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Location Map - only show if coordinates are available */}
          {product.latitude && product.longitude && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Место происхождения</h2>
              <ProductLocationMap 
                origin={`${product.latitude.toFixed(4)}, ${product.longitude.toFixed(4)}`}
                coordinates={[product.longitude, product.latitude]}
                productName={product.name}
              />
            </div>
          )}

          {/* Reviews */}
          <div className={product.latitude && product.longitude ? "" : "lg:col-span-2"}>
            <CustomerReviews 
              productId={product.id}
              showAddReview={true}
              limit={10}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailEnhanced;