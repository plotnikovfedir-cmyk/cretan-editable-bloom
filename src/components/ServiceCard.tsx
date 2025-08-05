import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
  buttonText: string;
  bgGradient: string;
}

const ServiceCard = ({ 
  image, 
  title, 
  description, 
  link, 
  buttonText, 
  bgGradient
}: ServiceCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 hover:scale-105 border-0 relative">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className={`absolute inset-0 ${bgGradient} opacity-80 group-hover:opacity-90 transition-opacity duration-300`}></div>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300"></div>
      </div>
      
      <CardContent className="absolute inset-0 p-6 text-center flex flex-col justify-center text-white">
        <div className="relative z-10">
          <h3 className="text-2xl font-display font-bold mb-3 text-white group-hover:text-white/95 transition-colors">
            {title}
          </h3>
          <p className="text-white/90 mb-6 text-sm leading-relaxed group-hover:text-white/95 transition-colors">
            {description}
          </p>
          <Button 
            asChild 
            variant="secondary" 
            className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transition-all duration-300 group-hover:shadow-lg group-hover:scale-105"
          >
            <Link to={link}>{buttonText}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;