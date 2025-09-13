import { Link } from "react-router-dom";
import { Instagram, Facebook, Phone, Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { TelegramIcon } from "@/components/icons/TelegramIcon";
import { YouTubeIcon } from "@/components/icons/YouTubeIcon";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
import { PinterestIcon } from "@/components/icons/PinterestIcon";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('newsletter-subscribe', {
        body: { email }
      });

      if (error) throw error;

      toast({
        title: "Successfully subscribed!",
        description: data.message || "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Subscription failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-primary/5 to-secondary/5 border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                Cretan Guru
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Your authentic guide to the finest Cretan products and experiences. 
                Discover the true taste of Crete with our premium olive oils, wild herbs, and unforgettable activities.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                asChild
              >
                <a href="https://www.instagram.com/cretan_guru" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-4 h-4" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                asChild
              >
                <a href="https://facebook.com/cretanguru" target="_blank" rel="noopener noreferrer">
                  <Facebook className="w-4 h-4" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="hover:bg-red-500 hover:text-white transition-all duration-300 hover:scale-110"
                asChild
              >
                <a href="https://youtube.com/@cretanguru" target="_blank" rel="noopener noreferrer">
                  <YouTubeIcon className="w-4 h-4" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 hover:scale-110"
                asChild
              >
                <a href="https://tiktok.com/@cretanguru" target="_blank" rel="noopener noreferrer">
                  <TikTokIcon className="w-4 h-4" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="hover:bg-red-600 hover:text-white transition-all duration-300 hover:scale-110"
                asChild
              >
                <a href="https://pinterest.com/cretanguru" target="_blank" rel="noopener noreferrer">
                  <PinterestIcon className="w-4 h-4" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="hover:bg-green-500 hover:text-white transition-all duration-300 hover:scale-110"
                asChild
              >
                <a href="https://wa.me/4917857738346" target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="w-4 h-4" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-110"
                asChild
              >
                <a href="https://t.me/cretanguru" target="_blank" rel="noopener noreferrer">
                  <TelegramIcon className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-display font-semibold text-foreground">Quick Links</h4>
            <nav className="space-y-3">
              <Link to="/products" className="block text-muted-foreground hover:text-primary transition-colors">
                Products
              </Link>
              <Link to="/activities" className="block text-muted-foreground hover:text-primary transition-colors">
                Activities
              </Link>
              <Link to="/events" className="block text-muted-foreground hover:text-primary transition-colors">
                Events
              </Link>
              <Link to="/blog" className="block text-muted-foreground hover:text-primary transition-colors">
                Blog
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-lg font-display font-semibold text-foreground">Services</h4>
            <nav className="space-y-3">
              <Link to="/taxi" className="block text-muted-foreground hover:text-primary transition-colors">
                Taxi Service
              </Link>
              <Link to="/delivery" className="block text-muted-foreground hover:text-primary transition-colors">
                Delivery
              </Link>
              <Link to="/island-tours" className="block text-muted-foreground hover:text-primary transition-colors">
                Island Tours
              </Link>
              <Link to="/wine-tastings" className="block text-muted-foreground hover:text-primary transition-colors">
                Wine Tastings
              </Link>
            </nav>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <h4 className="text-lg font-display font-semibold text-foreground">Stay Connected</h4>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <a 
                  href="tel:+4917857738346" 
                  className="text-sm hover:text-primary transition-colors cursor-pointer"
                >
                  +49 178 5773846
                </a>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <a 
                  href="mailto:hello@cretan.guru" 
                  className="text-sm hover:text-primary transition-colors cursor-pointer"
                >
                  hello@cretan.guru
                </a>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm">Crete, Greece</span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Subscribe to our newsletter</p>
              <form onSubmit={handleNewsletterSubmit} className="flex space-x-2">
                <Input 
                  type="email"
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 text-sm"
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  size="sm" 
                  className="px-4 group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2024 Cretan Guru. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/cookie-policy" className="hover:text-primary transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;