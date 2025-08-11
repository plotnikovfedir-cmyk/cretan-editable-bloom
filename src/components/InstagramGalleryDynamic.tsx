import { useState, useEffect } from 'react';
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from '@/integrations/supabase/client';

interface InstagramImage {
  id: string;
  image_url: string;
  alt_text: string | null;
  caption: string | null;
  link_url: string | null;
  order_position: number;
}

const InstagramGalleryDynamic = () => {
  const [images, setImages] = useState<InstagramImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInstagramImages();
  }, []);

  const fetchInstagramImages = async () => {
    try {
      const { data, error } = await supabase
        .from('instagram_gallery')
        .select('*')
        .eq('is_active', true)
        .order('order_position', { ascending: true });

      if (error) throw error;

      setImages(data || []);
    } catch (error) {
      console.error('Error fetching Instagram images:', error);
      // Fallback to static images if database fails
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  // Fallback static images if no database images
  const fallbackImages = [
    {
      id: '1',
      image_url: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop",
      alt_text: "Olive harvest in Crete",
      caption: null,
      link_url: null,
      order_position: 1
    },
    {
      id: '2',
      image_url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop",
      alt_text: "Wild herbs collection",
      caption: null,
      link_url: null,
      order_position: 2
    },
    {
      id: '3',
      image_url: "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?w=400&h=400&fit=crop",
      alt_text: "Traditional olive oil production",
      caption: null,
      link_url: null,
      order_position: 3
    },
    {
      id: '4',
      image_url: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop",
      alt_text: "Cretan sunset dinner",
      caption: null,
      link_url: null,
      order_position: 4
    },
    {
      id: '5',
      image_url: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=400&fit=crop",
      alt_text: "Fresh herbs and ingredients",
      caption: null,
      link_url: null,
      order_position: 5
    },
    {
      id: '6',
      image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
      alt_text: "Beautiful Cretan landscape",
      caption: null,
      link_url: null,
      order_position: 6
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
            <Button 
              variant="outline" 
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:from-purple-600 hover:to-pink-600"
            >
              <Instagram className="w-4 h-4 mr-2" />
              Follow @cretan_guru
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-muted rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

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
          <Button 
            variant="outline" 
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:from-purple-600 hover:to-pink-600"
          >
            <Instagram className="w-4 h-4 mr-2" />
            Follow @cretan_guru
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {displayImages.slice(0, 6).map((image) => {
            const ImageComponent = (
              <div 
                key={image.id}
                className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
              >
                <img 
                  src={image.image_url}
                  alt={image.alt_text || 'Instagram image'}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            );

            return image.link_url ? (
              <a 
                key={image.id}
                href={image.link_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                {ImageComponent}
              </a>
            ) : ImageComponent;
          })}
        </div>
      </div>
    </section>
  );
};

export default InstagramGalleryDynamic;