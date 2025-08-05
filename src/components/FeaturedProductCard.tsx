import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

interface FeaturedProductCardProps {
  title: string;
  image: string;
  description: string;
  price: string;
  rating?: number;
  badge?: "NEW" | "PREMIUM" | "BESTSELLER";
  id?: string;
}

const FeaturedProductCard = ({ 
  title, 
  image, 
  description, 
  price, 
  rating = 4.8,
  badge,
  id = "product"
}: FeaturedProductCardProps) => {
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

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "NEW": return "bg-emerald-500 hover:bg-emerald-600 text-white";
      case "PREMIUM": return "bg-purple-500 hover:bg-purple-600 text-white";
      case "BESTSELLER": return "bg-orange-500 hover:bg-orange-600 text-white";
      default: return "default";
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 hover:scale-[1.02] bg-card border border-border/50">
      <CardHeader className="p-0 relative">
        <div className="relative overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {badge && (
            <Badge className={`absolute top-3 left-3 ${getBadgeVariant(badge)} shadow-lg font-medium`}>
              {badge}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              {renderStars(rating)}
            </div>
            <span className="text-sm text-muted-foreground">({rating})</span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>
        
        <div className="flex justify-between items-center pt-2">
          <span className="text-2xl font-bold text-primary font-serif">€{price}</span>
          <Button 
            asChild 
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Link to={`/products/${id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturedProductCard;