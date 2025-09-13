import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Star, Quote } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Testimonial {
  id: string;
  customer_name: string;
  customer_location: string | null;
  testimonial_text: string;
  rating: number | null;
  customer_image_url: string | null;
}

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const fallbackTestimonials = [
    {
      id: "1",
      customer_name: "Maria K.",
      customer_location: "Athens, Greece",
      testimonial_text: "The olive oil from Cretan Guru is absolutely exceptional! You can taste the authenticity in every drop. It reminds me of my grandmother's cooking.",
      rating: 5,
      customer_image_url: "https://images.unsplash.com/photo-1494790108755-2616b612b287?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: "2",
      customer_name: "James Wilson",
      customer_location: "London, UK", 
      testimonial_text: "Amazing experience with the herb foraging tour! The guides were knowledgeable and passionate. Learned so much about Cretan culture.",
      rating: 5,
      customer_image_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: "3",
      customer_name: "Sofia R.",
      customer_location: "Munich, Germany",
      testimonial_text: "Their delivery service to the beach was perfect for our sunset picnic. Everything was fresh and beautifully presented. Highly recommend!",
      rating: 5,
      customer_image_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: "4",
      customer_name: "Andreas M.",
      customer_location: "Stockholm, Sweden",
      testimonial_text: "The wine tasting experience was extraordinary! The local wines paired perfectly with traditional Cretan mezze. A must-do activity!",
      rating: 5,
      customer_image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: "5",
      customer_name: "Isabella F.",
      customer_location: "Milan, Italy",
      testimonial_text: "The taxi service was punctual and comfortable. Our driver was very friendly and gave us great recommendations for local spots!",
      rating: 5,
      customer_image_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: "6",
      customer_name: "David L.",
      customer_location: "Paris, France",
      testimonial_text: "Exceptional island tour with breathtaking views! The hidden beaches were absolutely stunning. Great value for money.",
      rating: 5,
      customer_image_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face"
    }
  ];

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .order('order_position', { ascending: true });

      if (error) {
        console.error('Error loading testimonials:', error);
        setTestimonials(fallbackTestimonials);
      } else if (data && data.length > 0) {
        setTestimonials(data);
      } else {
        setTestimonials(fallbackTestimonials);
      }
    } catch (error) {
      console.error('Error loading testimonials:', error);
      setTestimonials(fallbackTestimonials);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number | null) => {
    const starCount = rating || 5;
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < starCount ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real experiences from people who discovered the authentic taste of Crete
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-64 animate-pulse bg-muted/50" />
            ))}
          </div>
        ) : (
          <Carousel
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3 flex">
                  <Card className="hover:shadow-lg transition-shadow duration-300 bg-card border border-border/50 h-full w-full flex flex-col">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-center mb-4">
                        <Quote className="w-8 h-8 text-primary mr-3" />
                        <div className="flex">{renderStars(testimonial.rating)}</div>
                      </div>
                      
                      <p className="text-muted-foreground mb-6 italic leading-relaxed flex-grow">
                        "{testimonial.testimonial_text}"
                      </p>
                      
                      <div className="flex items-center mt-auto">
                        <img 
                          src={testimonial.customer_image_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"} 
                          alt={testimonial.customer_name}
                          className="w-12 h-12 rounded-full mr-4 object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-foreground">{testimonial.customer_name}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.customer_location || "Valued Customer"}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;