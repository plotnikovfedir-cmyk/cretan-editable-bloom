import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ActivityCardProps {
  title: string;
  description: string;
  image: string;
  slug: string;
}

const ActivityCard = ({ title, description, image, slug }: ActivityCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover"
        />
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-foreground">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <Link to={`/activities/${slug}`}>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            Learn More
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;