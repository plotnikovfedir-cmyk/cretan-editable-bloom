import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Users, Wine, Grape, Award, Sun, Mountain } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { TelegramIcon } from "@/components/icons/TelegramIcon";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface WineTasting {
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
  wines: string[];
  image_url: string;
  gallery_images?: string[];
}

const WineTastingsDynamic = () => {
  const [experiences, setExperiences] = useState<WineTasting[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const { data, error } = await supabase
        .from('wine_tastings')
        .select('*')
        .eq('is_active', true)
        .order('order_position', { ascending: true });

      if (error) {
        console.error('Error fetching wine tastings:', error);
        toast({
          title: "Error loading experiences",
          description: "Failed to load wine tasting experiences. Please try again later.",
          variant: "destructive",
        });
      } else if (data) {
        setExperiences(data);
      }
    } catch (error) {
      console.error('Error fetching wine tastings:', error);
      toast({
        title: "Error loading experiences", 
        description: "Failed to load wine tasting experiences. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const whatsappMessage = "Hi! I'm interested in booking a Wine Tasting experience with Cretan Guru. Could you provide more information?";

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
                Wine Tastings
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Discover the rich heritage of Cretan winemaking through authentic tastings at traditional wineries. 
                Experience indigenous grape varieties that have been cultivated for over 4,000 years.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="secondary" className="px-4 py-2 text-lg">
                  <Grape className="w-4 h-4 mr-2" />
                  Indigenous Varieties
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-lg">
                  <Mountain className="w-4 h-4 mr-2" />
                  Historic Wineries
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-lg">
                  <Award className="w-4 h-4 mr-2" />
                  Expert Sommeliers
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Wine Culture Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                  4,000 Years of Wine Heritage
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Crete is home to Europe's oldest wine production, with archaeological evidence dating back to 2000 BC. 
                    Our island's unique terroir, combining Mediterranean climate with mineral-rich soils, creates wines with 
                    distinctive character.
                  </p>
                  <p>
                    The indigenous grape varieties like Kotsifali, Mandilaria, and Vilana have adapted to Crete's landscape 
                    over millennia, producing wines that truly capture the essence of our island.
                  </p>
                  <p>
                    Join us to taste these living pieces of history while learning about traditional winemaking methods 
                    that have been preserved by local families for generations.
                  </p>
                </div>
              </div>
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
                <Wine className="w-24 h-24 text-primary opacity-50" />
              </div>
            </div>
          </div>
        </section>

        {/* Experiences Grid */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Wine Tasting Experiences
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From intimate cellar visits to sunset tastings, choose the perfect wine experience for your palate.
              </p>
            </div>

            {experiences.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No wine tasting experiences available at the moment. Please check back later!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {experiences.map((experience) => (
                  <Card 
                    key={experience.id} 
                    className={`group hover:shadow-xl transition-all duration-300 cursor-pointer ${
                      selectedExperience === experience.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedExperience(selectedExperience === experience.id ? null : experience.id)}
                  >
                    <CardHeader>
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-4 flex items-center justify-center">
                        {experience.image_url && experience.image_url !== '/placeholder.svg' ? (
                          <img 
                            src={experience.image_url} 
                            alt={experience.title}
                            className="w-full h-full object-cover rounded-lg"
                            loading="lazy"
                          />
                        ) : (
                          <Wine className="w-12 h-12 text-primary opacity-50" />
                        )}
                      </div>
                      <CardTitle className="text-xl font-display">{experience.title}</CardTitle>
                      <CardDescription className="text-base">{experience.short_description || experience.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-primary">€{experience.price}</span>
                        <span className="text-sm text-muted-foreground">per person</span>
                      </div>

                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <span>{experience.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          <span>{experience.group_size}</span>
                        </div>
                        {experience.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span>{experience.location}</span>
                          </div>
                        )}
                      </div>

                      {experience.highlights && experience.highlights.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Experience Highlights:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {experience.highlights.map((highlight, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <Grape className="w-3 h-3 text-gold mt-0.5 flex-shrink-0" />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {selectedExperience === experience.id && experience.wines && experience.wines.length > 0 && (
                        <div className="space-y-3 pt-4 border-t">
                          <h4 className="font-semibold text-sm">Wines You'll Taste:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {experience.wines.map((wine, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                                {wine}
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

        {/* Indigenous Grapes Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Indigenous Grape Varieties
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover the unique character of Crete's native grape varieties, each telling a story of our island's terroir.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Kotsifali",
                  type: "Red Wine",
                  character: "Medium-bodied with cherry and herb notes",
                  color: "text-red-600"
                },
                {
                  name: "Vilana", 
                  type: "White Wine",
                  character: "Crisp and fresh with citrus undertones",
                  color: "text-yellow-500"
                },
                {
                  name: "Mandilaria",
                  type: "Red Wine", 
                  character: "Full-bodied with deep color and tannins",
                  color: "text-red-800"
                },
                {
                  name: "Thrapsathiri",
                  type: "White Wine",
                  character: "Aromatic with floral and fruit notes",
                  color: "text-green-600"
                }
              ].map((grape, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <Grape className={`w-8 h-8 mx-auto mb-4 ${grape.color}`} />
                    <h3 className="text-lg font-display font-semibold mb-2">{grape.name}</h3>
                    <p className="text-sm text-primary mb-2">{grape.type}</p>
                    <p className="text-sm text-muted-foreground">{grape.character}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Ready to Taste Authentic Crete?
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Book your wine tasting experience today. We'll arrange everything from transportation to expert sommeliers 
              to make your wine journey unforgettable.
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
              All experiences include expert sommelier • Transportation arranged • Flexible scheduling
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default WineTastingsDynamic;