import Navigation from "@/components/Navigation";
import HeroSlider from "@/components/HeroSlider";
import FeaturedProductCard from "@/components/FeaturedProductCard";
import ServiceCard from "@/components/ServiceCard";
import WhyChooseUs from "@/components/WhyChooseUs";
import TestimonialsSection from "@/components/TestimonialsSection";
import InstagramCarousel from "@/components/InstagramCarousel";
import CreteMap from "@/components/CreteMap";
import BlogCard from "@/components/BlogCard";
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
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">Latest From Our Blog</h2>
            <p className="text-lg text-muted-foreground">Discover stories, recipes, and insights from Crete</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <BlogCard
              title="The Health Benefits of Cretan Olive Oil"
              excerpt="Explore the remarkable health benefits and centuries-old heritage behind our premium olive oils that make them truly special."
              image={oliveOilImage}
              url="/blog/cretan-olive-oil"
            />
            
            <BlogCard
              title="Wild Herbs of Crete: A Forager's Guide"
              excerpt="Discover which herbs thrive naturally on our island and how local families have used them for generations."
              image={herbsImage}
              url="/blog/wild-herbs"
            />
            
            <BlogCard
              title="Traditional Cretan Recipes Using Our Products"
              excerpt="Learn authentic Cretan recipes that showcase the incredible flavors of our premium olive oils and wild herbs."
              image={oliveOilImage}
              url="/blog/traditional-recipes"
            />
          </div>
          
          <div className="text-center">
            <Button asChild size="lg" variant="outline" className="bg-background hover:bg-muted border-primary text-primary hover:text-primary">
              <Link to="/blog">Read All Articles</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Crete Map */}
      <CreteMap />

      {/* Instagram Gallery */}
      <InstagramCarousel />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
             }}></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">Experience Authentic Crete</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed">
            From premium products to unforgettable experiences - discover everything 
            that makes Crete special with Cretan Guru.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-gold hover:bg-gold/90 text-gold-foreground shadow-lg hover:shadow-xl transition-all duration-300">
              <Link to="/products">Shop Products</Link>
            </Button>
            <Button asChild size="lg" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <Link to="/activities">Book Experience</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
