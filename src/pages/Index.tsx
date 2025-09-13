import { 
  Sparkles, 
  Droplets, 
  Calendar, 
  Star, 
  Package, 
  Shield, 
  Award 
} from "lucide-react";
import Navigation from "@/components/Navigation";
import HeroSlider from "@/components/HeroSlider";
import FeaturedProductCard from "@/components/FeaturedProductCard";
import ServiceCard from "@/components/ServiceCard";
import WhyChooseUs from "@/components/WhyChooseUs";
import TestimonialsSection from "@/components/TestimonialsSection";
import InstagramGalleryEnhanced from "@/components/InstagramGalleryEnhanced";
import CreteMap from "@/components/CreteMap";
import BlogSection from "@/components/BlogSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import oliveOilImage from "@/assets/olive-oil-product.jpg";
import herbsImage from "@/assets/herbs-product.jpg";
import activitiesServiceImage from "@/assets/activities-service.jpg";
import eventsServiceImage from "@/assets/events-service.jpg";
import taxiServiceImage from "@/assets/taxi-service.jpg";
import deliveryServiceImage from "@/assets/delivery-service.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <HeroSlider pageType="home" />
      
      {/* About Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-display">About Cretan Guru</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Cretan Guru is your authentic guide to the finest products and experiences that Crete has to offer. 
              From premium olive oils and wild herbs to immersive cultural activities, we bring you the genuine 
              taste and spirit of this ancient Mediterranean island. Our products are sourced directly from local 
              producers who have maintained traditional methods for generations.
            </p>
            <Button asChild size="lg" className="bg-terracotta hover:bg-terracotta/90 text-terracotta-foreground shadow-lg hover:shadow-xl transition-all duration-300">
              <Link to="/products">Discover Our Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">Featured Products</h2>
            <p className="text-lg text-muted-foreground">Taste the authentic flavors of Crete</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <FeaturedProductCard
              title="Extra Virgin Olive Oil"
              image={oliveOilImage}
              description="Cold-pressed from the finest Cretan olives, rich in antioxidants and flavor."
              price="12.90"
              rating={4.9}
              badge="BESTSELLER"
              id="extra-virgin-olive-oil"
            />
            
            <FeaturedProductCard
              title="Wild Mountain Herbs"
              image={herbsImage}
              description="Hand-picked herbs from Cretan mountains, dried naturally to preserve aroma."
              price="8.90"
              rating={4.8}
              badge="NEW"
              id="wild-mountain-herbs"
            />
            
            <FeaturedProductCard
              title="Oil With St John's Wort"
              image={oliveOilImage}
              description="Premium olive oil infused with wild St John's Wort, known for healing properties."
              price="18.90"
              rating={4.7}
              badge="PREMIUM"
              id="oil-st-johns-wort"
            />
            
            <FeaturedProductCard
              title="Wild Oregano Olive Oil"
              image={herbsImage}
              description="Extra virgin olive oil infused with wild Cretan oregano, perfect for cuisine."
              price="16.90"
              rating={4.8}
              id="wild-oregano-oil"
            />
            
            <FeaturedProductCard
              title="Olive Oil – Agios Konstantinos"
              image={oliveOilImage}
              description="Single-origin olive oil from the blessed groves of Agios Konstantinos monastery."
              price="24.90"
              rating={4.9}
              badge="PREMIUM"
              id="agios-konstantinos-oil"
            />
            
            <FeaturedProductCard
              title="Olive Oil – Preveli"
              image={oliveOilImage}
              description="Artisanal olive oil from famous Preveli monastery, true taste of heritage."
              price="32.90"
              rating={5.0}
              badge="PREMIUM"
              id="preveli-oil"
            />
          </div>
          
          <div className="text-center">
            <Button asChild size="lg" variant="outline" className="bg-background hover:bg-muted border-primary text-primary hover:text-primary">
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">Our Services</h2>
            <p className="text-lg text-muted-foreground">Complete Cretan experience at your fingertips</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard
              image={activitiesServiceImage}
              title="Activities"
              description="Discover authentic Cretan experiences from olive oil tastings to herb foraging adventures"
              link="/activities"
              buttonText="Explore Activities"
              bgGradient="bg-gradient-to-br from-green-500/80 to-emerald-600/80"
            />
            
            <ServiceCard
              image={eventsServiceImage}
              title="Events"
              description="Join our sunset BBQs, boat trips and traditional music nights under the stars"
              link="/events"
              buttonText="View Events"
              bgGradient="bg-gradient-to-br from-orange-500/80 to-red-500/80"
            />
            
            <ServiceCard
              image={taxiServiceImage}
              title="Taxi Service"
              description="Reliable transfers to airports, beaches and attractions across beautiful Crete"
              link="/taxi"
              buttonText="Book Ride"
              bgGradient="bg-gradient-to-br from-yellow-500/80 to-orange-500/80"
            />
            
            <ServiceCard
              image={deliveryServiceImage}
              title="Beach Delivery"
              description="Premium picnic boxes delivered to remote beaches and stunning sunset spots"
              link="/delivery"
              buttonText="Order Now"
              bgGradient="bg-gradient-to-br from-blue-500/80 to-cyan-500/80"
            />
          </div>
        </div>
      </section>

      {/* Latest From Our Blog */}
      <BlogSection />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Crete Map */}
      <CreteMap />

      {/* Instagram Gallery */}
      <InstagramGalleryEnhanced />

      {/* Experience Authentic Crete Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-primary/10 rounded-full px-6 py-3 mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold">Authentic Cretan Experience</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Experience<br />Authentic Crete
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From premium artisan products to unforgettable cultural experiences - discover the authentic soul of Crete through our carefully curated collection. Let us be your guide to the island's hidden treasures.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="group bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Droplets className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Shop Premium Products</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Discover authentic Cretan olive oils, herbs, and artisan products sourced directly from local producers.
              </p>
              <Button asChild size="lg" className="w-full">
                <Link to="/products">Explore Products</Link>
              </Button>
            </div>
            
            <div className="group bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Book Experiences</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Immerse yourself in Crete's culture with guided tours, wine tastings, and authentic local experiences.
              </p>
              <Button asChild variant="secondary" size="lg" className="w-full">
                <Link to="/activities">Book Now</Link>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="group">
              <div className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-xl p-6 group-hover:bg-card/70 transition-colors">
                <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="text-2xl font-bold text-primary mb-1">4.9/5</div>
                <p className="text-sm text-muted-foreground">Customer Rating</p>
              </div>
            </div>
            <div className="group">
              <div className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-xl p-6 group-hover:bg-card/70 transition-colors">
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-sm font-medium mb-1">Island-wide</div>
                <p className="text-sm text-muted-foreground">Delivery</p>
              </div>
            </div>
            <div className="group">
              <div className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-xl p-6 group-hover:bg-card/70 transition-colors">
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-sm font-medium mb-1">Authentic</div>
                <p className="text-sm text-muted-foreground">Guarantee</p>
              </div>
            </div>
            <div className="group">
              <div className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-xl p-6 group-hover:bg-card/70 transition-colors">
                <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-sm font-medium mb-1">Premium</div>
                <p className="text-sm text-muted-foreground">Quality</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
