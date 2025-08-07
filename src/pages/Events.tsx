import Navigation from "@/components/Navigation";
import EventCard from "@/components/EventCard";
import Footer from "@/components/Footer";
import sunsetBbqImage from "@/assets/sunset-bbq.jpg";
import boatTripImage from "@/assets/boat-trip.jpg";
import musicNightImage from "@/assets/music-night.jpg";

const Events = () => {
  const events = [
    {
      title: "Sunset BBQ",
      description: "Join us every Friday for a spectacular sunset BBQ experience. Enjoy grilled specialties while watching the sun dip into the Mediterranean horizon.",
      image: sunsetBbqImage,
      frequency: "Every Friday",
      frequencyColor: "bg-sunset",
      slug: "sunset-bbq"
    },
    {
      title: "Full Moon Boat Trip",
      description: "Experience the magic of Crete under the full moon. Our monthly boat excursions offer a unique perspective of the coastline bathed in moonlight.",
      image: boatTripImage,
      frequency: "Once a Month",
      frequencyColor: "bg-moonlight",
      slug: "boat-trip"
    },
    {
      title: "Local Music Night",
      description: "Immerse yourself in traditional Cretan culture every Saturday. Local musicians perform authentic folk music in an intimate taverna setting.",
      image: musicNightImage,
      frequency: "Every Saturday",
      frequencyColor: "bg-terracotta",
      slug: "music-night"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Upcoming Events
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience the vibrant social life of Crete. Good food, great music, and unforgettable memories 
            await you at our carefully curated events that celebrate the authentic spirit of the island.
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {events.map((event, index) => (
              <EventCard
                key={index}
                title={event.title}
                description={event.description}
                image={event.image}
                frequency={event.frequency}
                frequencyColor={event.frequencyColor}
                slug={event.slug}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join Us?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Don't miss out on these authentic Cretan experiences. Contact us for reservations 
            and become part of our community of culture enthusiasts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/1234567890" 
              className="bg-gold hover:bg-gold/90 text-gold-foreground px-8 py-3 rounded-full font-semibold transition-colors inline-flex items-center justify-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Us
            </a>
            <a 
              href="tel:+1234567890" 
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3 rounded-full font-semibold transition-colors inline-flex items-center justify-center"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Events;