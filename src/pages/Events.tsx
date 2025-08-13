import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import EventCard from "@/components/EventCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone } from "lucide-react";
import musicNightImage from "@/assets/music-night.jpg";
import sunsetBbqImage from "@/assets/sunset-bbq.jpg";

interface Event {
  id: string;
  title: string;
  slug: string;
  short_description?: string;
  description?: string;
  image_url?: string;
  event_date?: string;
  location?: string;
  max_attendees?: number;
  price?: number;
}

const Events = () => {
  // Fetch events from database
  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });
      
      if (error) {
        console.error('Error fetching events:', error);
        throw error;
      }
      return data as Event[];
    },
  });

  // Fallback static events if database is empty
  const staticEvents = [
    {
      title: "Traditional Music Night",
      description: "Join us for an authentic evening of traditional Cretan music and local wine in our beautiful courtyard.",
      image: musicNightImage,
      frequency: "Every Friday",
      frequencyColor: "bg-blue-100 text-blue-800",
      slug: "music-night"
    },
    {
      title: "Sunset BBQ Experience",
      description: "Enjoy grilled specialties prepared with our olive oil while watching the magnificent Cretan sunset.",
      image: sunsetBbqImage,
      frequency: "Every Saturday",
      frequencyColor: "bg-orange-100 text-orange-800",
      slug: "sunset-bbq"
    },
    {
      title: "Herb Workshop",
      description: "Learn about wild Cretan herbs, their uses in cooking and traditional medicine, and how to harvest them sustainably.",
      image: musicNightImage,
      frequency: "Monthly",
      frequencyColor: "bg-green-100 text-green-800",
      slug: "herb-workshop"
    }
  ];

  // Convert database events to EventCard format
  const dbEventCards = events.map(event => ({
    title: event.title,
    description: event.short_description || event.description || "Join us for this special event",
    image: event.image_url || musicNightImage,
    frequency: event.event_date ? new Date(event.event_date).toLocaleDateString() : "Date TBD",
    frequencyColor: "bg-purple-100 text-purple-800",
    slug: event.slug,
    price: event.price
  }));

  // Show database events if available, otherwise show static events
  const displayEvents = dbEventCards.length > 0 ? dbEventCards : staticEvents;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Upcoming Events</h1>
            <p className="text-xl text-muted-foreground">Loading events...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Upcoming Events</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join us for unforgettable experiences that celebrate Cretan culture, 
            tradition, and the authentic flavors of our island.
          </p>
          {events.length > 0 && (
            <p className="text-sm text-muted-foreground mt-4">
              Showing {events.length} upcoming events
            </p>
          )}
        </div>
        
        {/* Events Grid */}
        {displayEvents.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">
              No events scheduled at the moment. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayEvents.map((event, index) => (
              <EventCard key={`${event.slug}-${index}`} {...event} />
            ))}
          </div>
        )}
      </div>

      {/* Call to Action Section */}
      <div className="bg-muted/50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Join Us?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contact us to reserve your spot or ask any questions about our upcoming events.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="flex items-center gap-2">
              <a href="https://wa.me/306972234567" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="flex items-center gap-2">
              <a href="tel:+306972234567">
                <Phone className="h-5 w-5" />
                Call Us
              </a>
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Events;