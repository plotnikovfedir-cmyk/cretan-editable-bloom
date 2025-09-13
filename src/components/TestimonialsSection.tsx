import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Maria K.",
      location: "Athens, Greece",
      text: "The olive oil from Cretan Guru is absolutely exceptional! You can taste the authenticity in every drop. It reminds me of my grandmother's cooking.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b287?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "James Wilson",
      location: "London, UK",
      text: "Amazing experience with the herb foraging tour! The guides were knowledgeable and passionate. Learned so much about Cretan culture.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Sofia R.",
      location: "Munich, Germany",
      text: "Their delivery service to the beach was perfect for our sunset picnic. Everything was fresh and beautifully presented. Highly recommend!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
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

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="hover:shadow-lg transition-shadow duration-300 bg-card border border-border/50 h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center mb-4">
                      <Quote className="w-8 h-8 text-primary mr-3" />
                      <div className="flex">{renderStars(testimonial.rating)}</div>
                    </div>
                    
                    <p className="text-muted-foreground mb-6 italic leading-relaxed flex-grow">
                      "{testimonial.text}"
                    </p>
                    
                    <div className="flex items-center mt-auto">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
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
      </div>
    </section>
  );
};

export default TestimonialsSection;