import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BookingModal from "@/components/BookingModal";
import sunsetBbqImage from "@/assets/sunset-bbq.jpg";
import boatTripImage from "@/assets/boat-trip.jpg";
import musicNightImage from "@/assets/music-night.jpg";

interface EventData {
  title: string;
  description: string;
  image: string;
  frequency: string;
  time: string;
  duration: string;
  price: string;
  location: string;
  includes: string[];
  highlights: string[];
  schedule: string[];
  detailedDescription: string;
  nextDates: string[];
}

const EventDetail = () => {
  const { slug } = useParams();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Fetch event from database
  const { data: dbEvent } = useQuery({
    queryKey: ['event', slug],
    queryFn: async () => {
      if (!slug) return null;
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching event:', error);
        return null;
      }
      return data;
    },
    enabled: !!slug,
  });

  const events: Record<string, EventData> = {
    "sunset-bbq": {
      title: "Sunset BBQ",
      description: "Join us every Friday for a spectacular sunset BBQ experience. Enjoy grilled specialties while watching the sun dip into the Mediterranean horizon.",
      image: sunsetBbqImage,
      frequency: "Every Friday",
      time: "7:00 PM - 11:00 PM",
      duration: "4 hours",
      price: "€35 per person",
      location: "Balos Beach Terrace",
      includes: [
        "Welcome drink and appetizers",
        "Grilled seafood and meat selection",
        "Traditional Cretan side dishes",
        "Unlimited local wine and beer",
        "Live acoustic music",
        "Spectacular sunset views"
      ],
      highlights: [
        "Prime sunset viewing location",
        "Fresh seafood grilled to perfection",
        "Traditional Cretan atmosphere",
        "Live local musicians",
        "Unlimited drinks included",
        "Meet fellow travelers and locals"
      ],
      schedule: [
        "7:00 PM - Welcome drinks and mingling",
        "7:30 PM - First course and appetizers served",
        "8:00 PM - Main BBQ service begins",
        "8:45 PM - Sunset viewing (prime time)",
        "9:30 PM - Live music performance starts",
        "11:00 PM - Event concludes"
      ],
      detailedDescription: "Every Friday, as the sun begins its descent toward the Mediterranean horizon, we transform our seaside terrace into a magical dining experience that captures the essence of Cretan hospitality. Our Sunset BBQ isn't just a meal – it's a celebration of the island's bounty, featuring fresh seafood caught that morning by local fishermen and meats from family farms in the mountains. The evening unfolds naturally, with guests gathering as strangers and leaving as friends, united by the shared experience of one of nature's most beautiful displays. Our chefs prepare everything over traditional charcoal grills, while local musicians provide the soundtrack to an unforgettable evening.",
      nextDates: [
        "January 12, 2024",
        "January 19, 2024", 
        "January 26, 2024",
        "February 2, 2024"
      ]
    },
    "boat-trip": {
      title: "Full Moon Boat Trip",
      description: "Experience the magic of Crete under the full moon. Our monthly boat excursions offer a unique perspective of the coastline bathed in moonlight.",
      image: boatTripImage,
      frequency: "Once a Month",
      time: "8:00 PM - 1:00 AM",
      duration: "5 hours",
      price: "€65 per person",
      location: "Chania Harbor departure",
      includes: [
        "Traditional wooden boat charter",
        "Professional captain and crew",
        "Welcome champagne toast",
        "Gourmet dinner on board",
        "Swimming stops in secluded bays",
        "Traditional music and stories"
      ],
      highlights: [
        "Sail under the full moon",
        "Secluded swimming spots",
        "Gourmet dinner with local wines",
        "Traditional Cretan boat",
        "Small group experience (max 20 people)",
        "Professional crew with local knowledge"
      ],
      schedule: [
        "8:00 PM - Departure from Chania Harbor",
        "8:30 PM - Welcome toast and appetizers",
        "9:00 PM - First swimming stop",
        "10:00 PM - Dinner service begins",
        "11:30 PM - Moonlight sailing and stories",
        "1:00 AM - Return to harbor"
      ],
      detailedDescription: "Once each month, when the moon reaches its full brilliance, we set sail on a journey that connects you with the timeless magic of the Cretan coastline. Our traditional wooden boat, lovingly maintained by local craftsmen, carries you along shores that have witnessed thousands of years of history. As moonlight transforms the sea into liquid silver, you'll discover hidden coves accessible only by boat, where the water is so clear you can see the sandy bottom even in the lunar glow. This isn't just a boat trip – it's a passage into the mystical side of Crete, where ancient stories come alive under the star-filled Mediterranean sky.",
      nextDates: [
        "January 25, 2024 (Full Moon)",
        "February 24, 2024 (Full Moon)",
        "March 25, 2024 (Full Moon)",
        "April 23, 2024 (Full Moon)"
      ]
    },
    "music-night": {
      title: "Local Music Night",
      description: "Immerse yourself in traditional Cretan culture every Saturday. Local musicians perform authentic folk music in an intimate taverna setting.",
      image: musicNightImage,
      frequency: "Every Saturday",
      time: "9:00 PM - 2:00 AM",
      duration: "5 hours",
      price: "€25 per person",
      location: "Traditional Taverna, Old Town",
      includes: [
        "Live traditional music performance",
        "Mezze platters with local specialties",
        "Traditional Cretan raki tasting",
        "Dancing lessons (optional)",
        "Cultural storytelling",
        "Late-night atmosphere"
      ],
      highlights: [
        "Authentic local musicians",
        "Traditional Cretan instruments (lyra, laouto)",
        "Interactive cultural experience",
        "Learn traditional dances",
        "Stories and folklore",
        "Intimate taverna setting"
      ],
      schedule: [
        "9:00 PM - Welcome and traditional mezze",
        "9:30 PM - First music set begins",
        "10:30 PM - Cultural stories and raki tasting",
        "11:00 PM - Interactive dancing session",
        "12:00 AM - Late night music and singing",
        "2:00 AM - Traditional farewell"
      ],
      detailedDescription: "Step into an authentic piece of Cretan culture that has remained unchanged for generations. Every Saturday night, our traditional taverna becomes a living museum where music, stories, and community spirit intertwine. The musicians aren't performers – they're keepers of tradition, playing songs that their grandfathers taught them, on instruments crafted by local artisans. As the evening progresses, the boundary between audience and performer dissolves, creating the spontaneous magic that defines authentic Cretan social life. You'll hear songs that celebrate the island's history, from ancient Byzantine chants to resistance songs from WWII, each telling a piece of the Cretan story.",
      nextDates: [
        "January 13, 2024",
        "January 20, 2024",
        "January 27, 2024",
        "February 3, 2024"
      ]
    }
  };

  // Use database event if available, otherwise fallback to static data
  const staticEvent = slug ? events[slug] : null;
  const event = dbEvent ? {
    title: dbEvent.title,
    description: dbEvent.description || dbEvent.short_description || "",
    image: dbEvent.image_url || (staticEvent?.image || sunsetBbqImage),
    frequency: staticEvent?.frequency || "Regular",
    time: staticEvent?.time || "Evening",
    duration: staticEvent?.duration || "Several hours",
    price: dbEvent.price ? `€${dbEvent.price} per person` : "Contact for pricing",
    location: dbEvent.location || "Various locations",
    includes: staticEvent?.includes || ["Professional service", "Local expertise", "Memorable experience"],
    highlights: staticEvent?.highlights || ["Authentic experience", "Local culture", "Great atmosphere"],
    schedule: staticEvent?.schedule || ["Flexible scheduling available"],
    detailedDescription: dbEvent.description || staticEvent?.detailedDescription || "Contact us for more details about this amazing event.",
    nextDates: staticEvent?.nextDates || ["Contact us for upcoming dates"]
  } : staticEvent;

  if (!event) {
    return <Navigate to="/events" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-end">
          <div className="container mx-auto px-4 pb-16">
            <div className="max-w-4xl">
              <Badge variant="secondary" className="mb-4 bg-white/20 text-white">
                {event.frequency}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {event.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {event.time}
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.location}
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  {event.price}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link to="/events" className="text-primary hover:text-primary/80 font-medium">
            ← Back to Events
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">About This Event</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {event.detailedDescription}
              </p>
            </section>

            {/* Highlights */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Event Highlights</h2>
              <ul className="space-y-3">
                {event.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-muted-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Schedule */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Event Schedule</h2>
              <div className="space-y-4">
                {event.schedule.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* What's Included */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">What's Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {event.includes.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Booking Card */}
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-foreground mb-2">{event.price}</div>
                  <div className="text-muted-foreground">per person</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">When:</span>
                    <span className="font-medium text-foreground">{event.frequency}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Time:</span>
                    <span className="font-medium text-foreground">{event.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium text-foreground">{event.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium text-foreground">{event.location}</span>
                  </div>
                </div>

                <Button 
                  className="w-full mb-4"
                  onClick={() => setIsBookingModalOpen(true)}
                >
                  Reserve Your Spot
                </Button>

                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Questions? Contact us directly
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      WhatsApp
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Call
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Dates */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Upcoming Dates</h3>
                <div className="space-y-3">
                  {event.nextDates.map((date, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-foreground font-medium">{date}</span>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setIsBookingModalOpen(true)}
                      >
                        Book
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Important Information</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Advance booking recommended</li>
                  <li>• Cancellation up to 12h before</li>
                  <li>• Weather-dependent events</li>
                  <li>• Minimum age requirements may apply</li>
                  <li>• Group discounts available</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
      
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        type="event"
        title={event.title}
        price={event.price}
        referenceId={slug}
      />
    </div>
  );
};

export default EventDetail;