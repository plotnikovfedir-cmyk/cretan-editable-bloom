import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-bg.jpg";

interface HeroProps {
  heading?: string;
  subheading?: string;
  ctaText?: string;
  ctaLink?: string;
}

const Hero = ({ 
  heading = "Welcome to Cretan Guru",
  subheading = "Discover the best of Crete: olive oil, herbs, nature tours, and more.",
  ctaText = "Explore Products",
  ctaLink = "/products"
}: HeroProps) => {
  return (
    <div 
      className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
          {heading}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md">
          {subheading}
        </p>
        <Button 
          asChild 
          size="lg" 
          className="bg-primary hover:bg-primary-light text-primary-foreground px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Link to={ctaLink}>{ctaText}</Link>
        </Button>
      </div>
    </div>
  );
};

export default Hero;