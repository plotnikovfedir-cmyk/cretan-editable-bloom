import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  title: string;
  image: string;
  description: string;
  price: string;
}

const ProductCard = ({ title, image, description, price }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <img 
          src={image} 
          alt={title}
          className="w-full h-64 object-cover"
        />
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <p className="text-2xl font-bold text-primary">€{price}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;