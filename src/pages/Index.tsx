import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import oliveOilImage from "@/assets/olive-oil-product.jpg";
import herbsImage from "@/assets/herbs-product.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <Hero />
      
      {/* About Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">About Cretan Guru</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Cretan Guru is your authentic guide to the finest products and experiences that Crete has to offer. 
              From premium olive oils and wild herbs to immersive cultural activities, we bring you the genuine 
              taste and spirit of this ancient Mediterranean island. Our products are sourced directly from local 
              producers who have maintained traditional methods for generations.
            </p>
            <Button asChild size="lg" className="bg-terracotta hover:bg-terracotta/90 text-terracotta-foreground">
              <Link to="/products">Discover Our Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Products</h2>
            <p className="text-lg text-muted-foreground">Taste the authentic flavors of Crete</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-0">
                <img src={oliveOilImage} alt="Extra Virgin Olive Oil" className="w-full h-64 object-cover" />
              </CardHeader>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Extra Virgin Olive Oil</h3>
                <p className="text-muted-foreground mb-4">
                  Cold-pressed from the finest Cretan olives, our olive oil is rich in antioxidants and flavor.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">€12.90</span>
                  <Button variant="outline" asChild>
                    <Link to="/products">View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-0">
                <img src={herbsImage} alt="Wild Mountain Herbs" className="w-full h-64 object-cover" />
              </CardHeader>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Wild Mountain Herbs</h3>
                <p className="text-muted-foreground mb-4">
                  Hand-picked herbs from the Cretan mountains, dried naturally to preserve their intense aroma.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">€8.90</span>
                  <Button variant="outline" asChild>
                    <Link to="/products">View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground">Complete Cretan experience at your fingertips</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl group-hover:bg-terracotta transition-colors">
                  🎯
                </div>
                <h3 className="text-xl font-semibold mb-2">Activities</h3>
                <p className="text-muted-foreground mb-4">Discover authentic Cretan experiences from olive oil tastings to herb foraging</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/activities">Explore</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl group-hover:bg-sunset transition-colors">
                  🎪
                </div>
                <h3 className="text-xl font-semibold mb-2">Events</h3>
                <p className="text-muted-foreground mb-4">Join our sunset BBQs, boat trips and traditional music nights</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/events">View Events</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl group-hover:bg-gold transition-colors">
                  🚗
                </div>
                <h3 className="text-xl font-semibold mb-2">Taxi</h3>
                <p className="text-muted-foreground mb-4">Reliable transfers to airports, beaches and attractions across Crete</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/taxi">Book Ride</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl group-hover:bg-secondary transition-colors">
                  🏖️
                </div>
                <h3 className="text-xl font-semibold mb-2">Beach Delivery</h3>
                <p className="text-muted-foreground mb-4">Premium picnic boxes delivered to remote beaches and sunset spots</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/delivery">Order Now</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience Authentic Crete</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            From premium products to unforgettable experiences - discover everything 
            that makes Crete special with Cretan Guru.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-gold hover:bg-gold/90 text-gold-foreground">
              <Link to="/products">Shop Products</Link>
            </Button>
            <Button asChild size="lg" className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
              <Link to="/activities">Book Experience</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
