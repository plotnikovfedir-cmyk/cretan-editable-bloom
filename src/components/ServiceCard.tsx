import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
  buttonText: string;
  bgGradient: string;
  iconColor: string;
}

const ServiceCard = ({ 
  icon: Icon, 
  title, 
  description, 
  link, 
  buttonText, 
  bgGradient,
  iconColor 
}: ServiceCardProps) => {
  return (
    <Card className={`group overflow-hidden hover:shadow-xl transition-all duration-500 hover:scale-105 ${bgGradient} border-0 text-white`}>
      <CardContent className="p-6 text-center relative">
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className={`relative z-10 w-16 h-16 ${iconColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
          <Icon className="w-8 h-8" />
        </div>
        
        <div className="relative z-10">
          <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-white/90 transition-colors">
            {title}
          </h3>
          <p className="text-white/80 mb-6 text-sm leading-relaxed group-hover:text-white/70 transition-colors">
            {description}
          </p>
          <Button 
            asChild 
            variant="secondary" 
            className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transition-all duration-300 group-hover:shadow-lg"
          >
            <Link to={link}>{buttonText}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;