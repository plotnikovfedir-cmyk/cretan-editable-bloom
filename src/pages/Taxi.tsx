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

      {/* Enhanced Custom Route Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary/95 to-secondary text-primary-foreground relative overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0" 
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M50 50m-30 0a30 30 0 1 1 60 0a30 30 0 1 1 -60 0'/%3E%3Cpath d='M50 20l5 10h10l-8 6 3 10-10-7-10 7 3-10-8-6h10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
               }}></div>
          <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-2xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Enhanced Header */}
            <div className="mb-8 animate-fade-in">
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium rounded-full mb-4 border border-white/20">
                🗺️ Custom Travel Solutions
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display leading-tight">
                Need a 
                <span className="block bg-gradient-to-r from-gold via-gold/90 to-accent bg-clip-text text-transparent">
                  Custom Route?
                </span>
              </h2>
            </div>

            {/* Enhanced Description */}
            <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-90 leading-relaxed">
              Planning to visit multiple hidden gems or need a personalized island itinerary? 
              Our local experts craft custom routes tailored to your interests, schedule, and budget.
            </p>

            {/* Enhanced Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="text-3xl mb-3">🏛️</div>
                <h4 className="font-semibold mb-2">Cultural Routes</h4>
                <p className="text-sm opacity-80">Monasteries, archaeological sites, traditional villages</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="text-3xl mb-3">🏖️</div>
                <h4 className="font-semibold mb-2">Beach Hopping</h4>
                <p className="text-sm opacity-80">Secret coves, pristine beaches, crystal waters</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="text-3xl mb-3">🍷</div>
                <h4 className="font-semibold mb-2">Culinary Tours</h4>
                <p className="text-sm opacity-80">Wineries, local tavernas, organic farms</p>
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg" 
                className="group bg-gold hover:bg-gold/90 text-gold-foreground shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold rounded-xl"
                asChild
              >
                <a href="tel:+4917857738346" className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    📞
                  </div>
                  Call for Instant Quote
                </a>
              </Button>
              <Button 
                size="lg"
                className="group bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold rounded-xl"
                asChild
              >
                <a href="mailto:hello@cretan.guru" className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    ✉️
                  </div>
                  Send Email Request
                </a>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-white/70 text-sm">
              <div className="flex items-center gap-2">
                <span>⚡</span>
                <span>Quick Response</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🛡️</span>
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🏆</span>
                <span>Local Experts</span>
              </div>
            </div>
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