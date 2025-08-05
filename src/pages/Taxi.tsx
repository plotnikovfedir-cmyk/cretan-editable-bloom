import Navigation from "@/components/Navigation";
import PriceTable from "@/components/PriceTable";
import { Button } from "@/components/ui/button";

const Taxi = () => {
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
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Taxi & Transfers
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Travel around Crete with ease. We offer reliable, friendly, and safe transfers 
            from Plakias to major destinations across the island. Experience comfort and 
            convenience with our professional drivers who know the local roads like the back of their hand.
          </p>
        </div>
      </section>

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
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <a 
                  href="https://wa.me/1234567890?text=Hi! I need a taxi transfer from Plakias" 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📱 Book Taxi via WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Our Service?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                🚗
              </div>
              <h3 className="text-xl font-semibold mb-2">Reliable & Safe</h3>
              <p className="text-muted-foreground">
                Professional drivers with years of experience navigating Crete's roads safely.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                📍
              </div>
              <h3 className="text-xl font-semibold mb-2">Local Knowledge</h3>
              <p className="text-muted-foreground">
                Our drivers know the best routes and can share local insights about your destination.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                💰
              </div>
              <h3 className="text-xl font-semibold mb-2">Fair Pricing</h3>
              <p className="text-muted-foreground">
                Transparent, fixed prices with no surprises. You know exactly what you'll pay.
              </p>
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
              variant="secondary" 
              className="bg-gold hover:bg-gold/90 text-gold-foreground"
              asChild
            >
              <a href="tel:+1234567890">📞 Call Directly</a>
            </Button>
            <Button 
              size="lg" 
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
              asChild
            >
              <a href="mailto:info@cretanguru.com">✉️ Send Email</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Taxi;