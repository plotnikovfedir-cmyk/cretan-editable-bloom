import { useState, useEffect } from "react";
import { Instagram, Heart, MessageCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface InstagramImage {
  id: string;
  image_url: string;
  alt_text?: string;
  caption?: string;
  link_url?: string;
  order_position: number;
}

const InstagramGalleryEnhanced = () => {
  const [images, setImages] = useState<InstagramImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  useEffect(() => {
    fetchInstagramImages();
  }, []);

  const fetchInstagramImages = async () => {
    try {
      const { data, error } = await supabase
        .from('instagram_gallery')
        .select('*')
        .eq('is_active', true)
        .order('order_position', { ascending: true })
        .limit(12);

      if (error) {
        console.error('Error fetching Instagram images:', error);
        setImages(fallbackImages);
      } else if (data) {
        setImages(data.length > 0 ? data : fallbackImages);
      }
    } catch (error) {
      console.error('Error fetching Instagram images:', error);
      setImages(fallbackImages);
    } finally {
      setLoading(false);
    }
  };

  // Fallback images for when database is empty or unavailable
  const fallbackImages: InstagramImage[] = [
    {
      id: '1',
      image_url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop',
      alt_text: 'Olive harvest in Crete',
      caption: 'Traditional olive harvest season begins! 🫒 #CretanOlives #Harvest',
      link_url: 'https://www.instagram.com/cretan_guru',
      order_position: 1
    },
    {
      id: '2',
      image_url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop',
      alt_text: 'Wild herbs collection',
      caption: 'Collecting wild herbs from the Cretan mountains 🌿 #WildHerbs #Crete',
      link_url: 'https://www.instagram.com/cretan_guru',
      order_position: 2
    },
    {
      id: '3',
      image_url: 'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?w=400&h=400&fit=crop',
      alt_text: 'Traditional olive oil production',
      caption: 'Fresh pressed extra virgin olive oil ✨ #OliveOil #Traditional',
      link_url: 'https://www.instagram.com/cretan_guru',
      order_position: 3
    },
    {
      id: '4',
      image_url: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop',
      alt_text: 'Cretan sunset dinner',
      caption: 'Sunset dinner with local delicacies 🌅 #CretanCuisine #Sunset',
      link_url: 'https://www.instagram.com/cretan_guru',
      order_position: 4
    },
    {
      id: '5',
      image_url: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=400&fit=crop',
      alt_text: 'Fresh herbs and ingredients',
      caption: 'Fresh from our garden to your table 🌱 #Fresh #Organic',
      link_url: 'https://www.instagram.com/cretan_guru',
      order_position: 5
    },
    {
      id: '6',
      image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
      alt_text: 'Beautiful Cretan landscape',
      caption: 'The breathtaking landscapes of Crete 🏔️ #CretanNature #Landscape',
      link_url: 'https://www.instagram.com/cretan_guru',
      order_position: 6
    },
    {
      id: '7',
      image_url: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=400&fit=crop',
      alt_text: 'Traditional Cretan pottery',
      caption: 'Handmade ceramic treasures 🏺 #CretanCrafts #Pottery',
      link_url: 'https://www.instagram.com/cretan_guru',
      order_position: 7
    },
    {
      id: '8',
      image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=400&fit=crop',
      alt_text: 'Cretan beach sunset',
      caption: 'Another magical Cretan sunset 🌊 #CretanBeaches #Paradise',
      link_url: 'https://www.instagram.com/cretan_guru',
      order_position: 8
    }
  ];

  const displayImages = images.length > 0 ? images : fallbackImages;

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">
              Follow Our Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              See the beauty of Crete through our lens - from olive groves to herb gardens
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="aspect-square bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const generateRandomEngagement = () => ({
    likes: Math.floor(Math.random() * 200) + 50,
    comments: Math.floor(Math.random() * 30) + 5
  });

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">
            Follow Our Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Experience the authentic beauty of Crete through our daily adventures - from ancient olive groves to hidden mountain herbs
          </p>
          <Button 
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            asChild
          >
            <a href="https://www.instagram.com/cretan_guru" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-5 h-5 mr-3" />
              Follow @cretan_guru
            </a>
          </Button>
        </div>

        {/* Instagram-style Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
          {displayImages.slice(0, 12).map((image) => {
            const engagement = generateRandomEngagement();
            const isHovered = hoveredImage === image.id;
            
            return (
              <div 
                key={image.id}
                className="relative aspect-square group cursor-pointer overflow-hidden rounded-xl bg-muted"
                onMouseEnter={() => setHoveredImage(image.id)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                {/* Image */}
                <img 
                  src={image.image_url}
                  alt={image.alt_text || 'Cretan experience'}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Instagram-style Overlay */}
                <div className={`
                  absolute inset-0 bg-black/60 flex items-center justify-center transition-all duration-300
                  ${isHovered ? 'opacity-100' : 'opacity-0'}
                `}>
                  <div className="text-white text-center space-y-4">
                    {/* Engagement Stats */}
                    <div className="flex items-center justify-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <Heart className="w-5 h-5 fill-white" />
                        <span className="font-semibold">{engagement.likes}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MessageCircle className="w-5 h-5 fill-white" />
                        <span className="font-semibold">{engagement.comments}</span>
                      </div>
                    </div>
                    
                    {/* Caption preview */}
                    {image.caption && (
                      <p className="text-sm px-4 line-clamp-2 opacity-90">
                        {image.caption}
                      </p>
                    )}
                    
                    {/* View on Instagram */}
                    <div className="flex items-center justify-center space-x-2 text-sm opacity-80">
                      <ExternalLink className="w-4 h-4" />
                      <span>View on Instagram</span>
                    </div>
                  </div>
                </div>
                
                {/* Click overlay for navigation */}
                {image.link_url && (
                  <a
                    href={image.link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10"
                    aria-label={`View ${image.alt_text} on Instagram`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Follow CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Join our community of <span className="font-semibold text-primary">10k+</span> followers discovering authentic Crete
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="outline" 
              className="group hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              asChild
            >
              <a href="https://www.instagram.com/cretan_guru" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Follow for Daily Updates
              </a>
            </Button>
            <span className="text-sm text-muted-foreground">
              • Daily stories • Behind the scenes • Exclusive offers
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramGalleryEnhanced;