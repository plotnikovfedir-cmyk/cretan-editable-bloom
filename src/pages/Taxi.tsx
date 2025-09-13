import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Car, Shield, MapPin, MessageCircle } from "lucide-react";
import { 
  Building2, 
  Waves, 
  Utensils, 
  Phone, 
  Mail, 
  Zap, 
  Award 
} from "lucide-react";
import Navigation from "@/components/Navigation";
import PriceTable from "@/components/PriceTable";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
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

      {/* Custom Routes Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-primary/10 rounded-full px-6 py-3 mb-6">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold">Custom Travel Solutions</span>
            </div>
            
            <div className="bg-gradient-to-r from-card via-card/80 to-card backdrop-blur-sm border border-border/50 rounded-2xl p-8 mb-12 shadow-xl">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Need a Custom Route?
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Planning to visit multiple hidden gems or need a personalized island itinerary? 
                Our local experts craft custom routes tailored to your interests, schedule, and budget.
              </p>
            </div>
          </div>

          {/* Service Types */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="group bg-card border border-border/50 rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Building2 className="w-8 h-8 text-orange-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Cultural Routes</h4>
              <p className="text-muted-foreground">Monasteries, archaeological sites, traditional villages</p>
            </div>
            
            <div className="group bg-card border border-border/50 rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Waves className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Beach Hopping</h4>
              <p className="text-muted-foreground">Secret coves, pristine beaches, crystal waters</p>
            </div>
            
            <div className="group bg-card border border-border/50 rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Utensils className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Culinary Tours</h4>
              <p className="text-muted-foreground">Wineries, local tavernas, organic farms</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              asChild 
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all group"
            >
              <a href="tel:+4917857738346" className="flex items-center gap-3">
                <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Call for Instant Quote
              </a>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-2 border-primary/20 hover:border-primary/40 px-8 py-6 text-lg font-semibold rounded-full transition-all group"
            >
              <a href="mailto:hello@cretan.guru" className="flex items-center gap-3">
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Send Email Request
              </a>
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 bg-card/50 backdrop-blur-sm border border-border/30 rounded-lg p-4">
              <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-green-600" />
              </div>
              <p className="font-medium">Quick Response</p>
            </div>
            <div className="flex items-center gap-3 bg-card/50 backdrop-blur-sm border border-border/30 rounded-lg p-4">
              <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <p className="font-medium">Licensed & Insured</p>
            </div>
            <div className="flex items-center gap-3 bg-card/50 backdrop-blur-sm border border-border/30 rounded-lg p-4 md:col-span-1 col-span-2 md:mx-0 mx-auto">
              <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-amber-600" />
              </div>
              <p className="font-medium">Local Experts</p>
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