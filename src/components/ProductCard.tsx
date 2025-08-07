import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  id: string;
  title: string;
  image: string;
  description: string;
  price: string;
  rating?: number;
  organic?: boolean;
}

const ProductCard = ({ id, title, image, description, price, rating = 4.7, organic = true }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    // Map slug to UUID - need to get the correct UUID for the product
    const productUuidMap: { [key: string]: string } = {
      'wild-mountain-herbs': '08f10350-3e4d-4896-a68c-96f1151eeb78',
      'extra-virgin-olive-oil': '55b40246-9fe5-4654-87cf-c4387a462701',
      'cretan-honey': '87140e39-5756-49c3-bba2-3dcc609884fb',
      'dittany-crete': '9f1e8bd0-7e3a-4c22-9ec1-87229fa1a659',
      'olive-oil-soap': '4553460b-62a6-4aea-a82f-7e40379436ab'
    };
    
    const productUuid = productUuidMap[id] || id;
    
    const product = {
      id: productUuid,
      name: title,
      price: parseFloat(price),
      image_url: image,
      description
    };

    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${title} has been added to your cart.`
    });
  };
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  };
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 hover:scale-[1.02] bg-card border border-border/50 h-full flex flex-col">
      <CardHeader className="p-0 relative">
        <div className="relative overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {organic && (
            <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg">
              <Leaf className="w-3 h-3" />
              Organic
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4 flex-grow flex flex-col">
        <div className="flex-grow">
          <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {title}
          </h3>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              {renderStars(rating)}
            </div>
            <span className="text-sm text-muted-foreground">({rating})</span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{description}</p>
        </div>
        
        <div className="pt-2">
          <p className="text-2xl font-bold text-primary">€{price}</p>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 mt-auto">
        <div className="flex gap-2 w-full">
          <Button 
            asChild
            variant="outline"
            className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            <Link to={`/products/${id}`}>View Details</Link>
          </Button>
          <Button 
            onClick={handleAddToCart}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300"
          >
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;