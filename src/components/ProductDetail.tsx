import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, MapPin, Heart, ShoppingCart } from "lucide-react";
import ProductLocationMap from "@/components/ProductLocationMap";
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";

interface ProductDetailProps {
  id: string;
  title: string;
  image: string;
  description: string;
  longDescription: string;
  price: string;
  rating: number;
  reviewCount: number;
  origin: string;
  coordinates: [number, number];
  volumes: Array<{ size: string; price: string; popular?: boolean }>;
  reviews: Array<{
    name: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}

const ProductDetail = ({ 
  id,
  title, 
  image, 
  description, 
  longDescription,
  price, 
  rating, 
  reviewCount,
  origin,
  coordinates,
  volumes,
  reviews 
}: ProductDetailProps) => {
  const [selectedVolume, setSelectedVolume] = useState(volumes[0]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = async () => {
    // First check if this is a database product by slug
    try {
      const { data: dbProduct } = await supabase
        .from('products')
        .select('id, name, price, image_url, description')
        .eq('slug', id)
        .single();
      
      if (dbProduct) {
        // Use database product data
        for (let i = 0; i < quantity; i++) {
          addToCart(dbProduct);
        }
        toast({
          title: "Added to cart",
          description: `${quantity}x ${dbProduct.name} (${selectedVolume.size}) added to your cart.`,
        });
        return;
      }
    } catch {
      // Product not in database, use hardcoded data
    }
    
    // Fallback to hardcoded product logic
    const product = {
      id: id, // Use slug as ID for hardcoded products
      name: title,
      price: parseFloat(selectedVolume.price),
      image_url: image,
      description: description
    };
    
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast({
      title: "Added to cart",
      description: `${quantity}x ${title} (${selectedVolume.size}) added to your cart.`,
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img 
                src={image} 
                alt={title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
              <p className="text-lg text-muted-foreground mb-4">{description}</p>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(rating)}
                </div>
                <span className="text-sm text-muted-foreground">
                  {rating}/5 ({reviewCount} reviews)
                </span>
              </div>

              {/* Origin */}
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Origin: {origin}</span>
              </div>
            </div>

            {/* Volume Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Choose Volume</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {volumes.map((volume, index) => (
                  <Card 
                    key={index}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedVolume.size === volume.size 
                        ? 'ring-2 ring-primary border-primary' 
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedVolume(volume)}
                  >
                    <CardContent className="p-4 text-center relative">
                      {volume.popular && (
                        <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground">
                          Popular
                        </Badge>
                      )}
                      <div className="font-semibold">{volume.size}</div>
                      <div className="text-primary font-bold">€{volume.price}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Quantity</h3>
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
                €{(parseFloat(selectedVolume.price) * quantity).toFixed(2)}
              </div>
              
              <div className="flex gap-3">
                <Button 
                  size="lg" 
                  className="flex-1 bg-primary hover:bg-primary/90"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="px-4"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Description & Reviews */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Description */}
          <div>
            <h2 className="text-2xl font-bold mb-4">About This Product</h2>
            <p className="text-muted-foreground leading-relaxed">{longDescription}</p>
            
            {/* Interactive Location Map */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Origin Location</h3>
              <ProductLocationMap 
                origin={origin}
                coordinates={coordinates}
                productName={title}
              />
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{review.name}</span>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;