import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EventCardProps {
  title: string;
  description: string;
  image: string;
  frequency: string;
  frequencyColor?: string;
}

const EventCard = ({ title, description, image, frequency, frequencyColor = "bg-primary" }: EventCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <CardHeader className="p-0 relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className={`absolute top-4 right-4 ${frequencyColor} text-white px-3 py-1 rounded-full text-sm font-medium`}>
          {frequency}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-foreground">{title}</h3>
        <p className="text-muted-foreground mb-4 leading-relaxed">{description}</p>
        <Button 
          variant="outline" 
          className="w-full hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;