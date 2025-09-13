import Navigation from "@/components/Navigation";
import HeroSlider from "@/components/HeroSlider";
import FeaturedProductCard from "@/components/FeaturedProductCard";
import ServiceCard from "@/components/ServiceCard";
import WhyChooseUs from "@/components/WhyChooseUs";
import TestimonialsSection from "@/components/TestimonialsSection";
import InstagramGalleryEnhanced from "@/components/InstagramGalleryEnhanced";
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
      <InstagramGalleryEnhanced />

      {/* Experience Authentic Crete - Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary/95 to-secondary text-primary-foreground relative overflow-hidden">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" 
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='40' cy='40' r='3'/%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3Ccircle cx='60' cy='20' r='2'/%3E%3Ccircle cx='20' cy='60' r='2'/%3E%3Ccircle cx='60' cy='60' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
               }}></div>
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-white/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Enhanced Header */}
            <div className="mb-8 animate-fade-in">
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium rounded-full mb-4 border border-white/20">
                ✨ Authentic Cretan Experience
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-display leading-tight">
                Experience 
                <span className="block bg-gradient-to-r from-gold via-gold/90 to-accent bg-clip-text text-transparent">
                  Authentic Crete
                </span>
              </h2>
            </div>

            {/* Enhanced Description */}
            <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-90 leading-relaxed">
              From premium artisan products to unforgettable cultural experiences - discover the authentic soul 
              of Crete through our carefully curated collection. Let us be your guide to the island's hidden treasures.
            </p>

            {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="group bg-gold hover:bg-gold/90 text-gold-foreground shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold rounded-xl">
                <Link to="/products" className="flex items-center gap-2">
                  <span>🫒</span>
                  Shop Premium Products
                </Link>
              </Button>
              <Button asChild size="lg" className="group bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold rounded-xl">
                <Link to="/activities" className="flex items-center gap-2">
                  <span>🏛️</span>
                  Book Experiences
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/70 text-sm">
              <div className="flex items-center gap-2">
                <span>🌟</span>
                <span>4.9/5 Customer Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📦</span>
                <span>Island-wide Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🛡️</span>
                <span>Authentic Guarantee</span>
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
