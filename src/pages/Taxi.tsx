import { useState } from "react";
import Navigation from "@/components/Navigation";
import PriceTable from "@/components/PriceTable";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
import { Button } from "@/components/ui/button";
import { Car, Shield, MapPin, MessageCircle } from "lucide-react";
import BookingModal from "@/components/BookingModal";
import taxiHeroImage from "@/assets/taxi-service.jpg";

const Taxi = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  const destinations = [
    { destination: "Rethymno", price: "45-55 €" },
    { destination: "Chania Airport", price: "110-140 €" },
    { destination: "Heraklion Airport", price: "130-150 €" },
    { destination: "Hora Sfakion", price: "70-80 €" },
    { destination: "Preveli Beach", price: "15-20 €" },
    { destination: "Kourtaliotto Waterfalls", price: "15-20 €" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSlider pageType="taxi" />

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Fixed Prices from Plakias
              </h2>
              <p className="text-lg text-muted-foreground">
                Transparent pricing with no hidden fees
              </p>
            </div>
            
            <PriceTable
              title="Destinations & Prices"
              subtitle="All prices are estimates and may vary depending on exact location and time"
              prices={destinations}
            />
            
            <div className="mt-8 text-center">
              <Button 
                size="lg" 
                className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-10 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0"
                asChild
              >
                <a 
                  href="https://wa.me/4917857738346?text=Hi! I need a taxi transfer from Plakias" 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                  Book Taxi via WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Service */}
      <section className="py-20 px-4 bg-gradient-to-br from-secondary/10 to-primary/5">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Why Choose Our Service?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Experience the difference with our premium taxi service designed for comfort, safety, and reliability.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group text-center p-8 bg-background rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border/50">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">Reliable & Safe</h3>
              <p className="text-muted-foreground leading-relaxed">Professional drivers with years of experience and fully insured vehicles for your peace of mind. Your safety is our top priority.</p>
            </div>
            <div className="group text-center p-8 bg-background rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border/50">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-secondary to-secondary/80 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">Local Knowledge</h3>
              <p className="text-muted-foreground leading-relaxed">Our drivers know every corner of Crete and can take you to hidden gems tourists never see. Discover authentic local experiences.</p>
            </div>
            <div className="group text-center p-8 bg-background rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border/50">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-accent to-accent/80 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <Car className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">Fair Pricing</h3>
              <p className="text-muted-foreground leading-relaxed">Transparent, fixed prices with no hidden fees. What you see is what you pay. Quality service at honest rates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need a Custom Route?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Planning to visit multiple locations or need a custom itinerary? 
            Contact us for personalized quotes and tour arrangements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <a href="tel:+4917857738346" className="flex items-center gap-2">
                📞 Call Directly
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-primary/10 hover:bg-primary/20 text-primary-foreground border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <a href="mailto:hello@cretan.guru" className="flex items-center gap-2">
                ✉️ Send Email
              </a>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
      
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        type="taxi"
        title="Taxi Transfer"
      />
    </div>
  );
};

export default Taxi;