import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, Star, Camera, Mountain, Waves } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { TelegramIcon } from "@/components/icons/TelegramIcon";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface IslandTour {
  id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  duration: string;
  group_size: string;
  price: number;
  location: string;
  highlights: string[];
  includes: string[];
  image_url: string;
  gallery_images?: string[];
}

const IslandToursDynamic = () => {
  const [tours, setTours] = useState<IslandTour[]>([]);
  const [selectedTour, setSelectedTour] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const { data, error } = await supabase
        .from('island_tours')
        .select('*')
        .eq('is_active', true)
        .order('order_position', { ascending: true });

      if (error) {
        console.error('Error fetching tours:', error);
        toast({
          title: "Error loading tours",
          description: "Failed to load island tours. Please try again later.",
          variant: "destructive",
        });
      } else if (data) {
        setTours(data);
      }
    } catch (error) {
      console.error('Error fetching tours:', error);
      toast({
        title: "Error loading tours",
        description: "Failed to load island tours. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const whatsappMessage = "Hi! I'm interested in booking an Island Tour with Cretan Guru. Could you provide more information?";

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-20">
            <div className="animate-pulse space-y-8">
              <div className="h-32 bg-muted rounded-lg"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-96 bg-muted rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
                Island Tours
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Discover the authentic beauty of Crete with our carefully crafted island tours. 
                From hidden beaches to ancient monasteries, experience the real Crete with local experts.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="secondary" className="px-4 py-2 text-lg">
                  <Mountain className="w-4 h-4 mr-2" />
                  Mountain Adventures
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-lg">
                  <Waves className="w-4 h-4 mr-2" />
                  Coastal Escapes
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-lg">
                  <Camera className="w-4 h-4 mr-2" />
                  Photography Tours
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Tours Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Choose Your Adventure
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Each tour is designed to showcase the unique beauty and culture of different regions of Crete.
              </p>
            </div>

            {tours.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No tours available at the moment. Please check back later!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {tours.map((tour) => (
                  <Card 
                    key={tour.id} 
                    className={`group hover:shadow-xl transition-all duration-300 cursor-pointer ${
                      selectedTour === tour.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedTour(selectedTour === tour.id ? null : tour.id)}
                  >
                    <CardHeader>
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-4 flex items-center justify-center">
                        {tour.image_url && tour.image_url !== '/placeholder.svg' ? (
                          <img 
                            src={tour.image_url} 
                            alt={tour.title}
                            className="w-full h-full object-cover rounded-lg"
                            loading="lazy"
                          />
                        ) : (
                          <Camera className="w-12 h-12 text-primary opacity-50" />
                        )}
                      </div>
                      <CardTitle className="text-xl font-display">{tour.title}</CardTitle>
                      <CardDescription className="text-base">{tour.short_description || tour.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-primary">€{tour.price}</span>
                        <span className="text-sm text-muted-foreground">per person</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <span>{tour.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          <span>{tour.group_size}</span>
                        </div>
                        {tour.location && (
                          <div className="flex items-center gap-2 col-span-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span>{tour.location}</span>
                          </div>
                        )}
                      </div>

                      {tour.highlights && tour.highlights.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Tour Highlights:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {tour.highlights.map((highlight, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <Star className="w-3 h-3 text-gold mt-0.5 flex-shrink-0" />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {selectedTour === tour.id && tour.includes && tour.includes.length > 0 && (
                        <div className="space-y-3 pt-4 border-t">
                          <h4 className="font-semibold text-sm">What's Included:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {tour.includes.map((item, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Booking Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Ready to Explore Crete?
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Contact us to book your personalized island tour. We'll customize the experience based on your interests and preferences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button 
                size="lg" 
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold rounded-full flex items-center gap-3 flex-1"
                asChild
              >
                <a 
                  href={`https://wa.me/4917857738346?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  Book via WhatsApp
                </a>
              </Button>
              <Button 
                size="lg" 
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-full flex items-center gap-3 flex-1"
                asChild
              >
                <a 
                  href="https://t.me/cretanguru" 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TelegramIcon className="w-5 h-5" />
                  Book via Telegram
                </a>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-8">
              All tours include professional local guides • Small group sizes • Flexible scheduling
            </p>
          </div>
        </section>

        {/* Why Choose Our Tours */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Why Choose Our Island Tours?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="pt-8">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-display font-semibold mb-4">Local Expertise</h3>
                  <p className="text-muted-foreground">
                    Born and raised in Crete, our guides know every hidden gem, local story, and secret spot that makes each tour unique.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-8">
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-display font-semibold mb-4">Small Groups</h3>
                  <p className="text-muted-foreground">
                    Maximum 10 people per tour ensures a personalized experience and allows us to visit places larger groups can't access.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-8">
                  <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-display font-semibold mb-4">Flexible Scheduling</h3>
                  <p className="text-muted-foreground">
                    We adapt to your schedule and preferences. Want to focus more on beaches or history? We'll customize your tour accordingly.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default IslandToursDynamic;