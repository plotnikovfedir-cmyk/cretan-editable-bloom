import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-bg.jpg";
import oliveGroveImage from "@/assets/olive-oil-product.jpg";
import herbsImage from "@/assets/herbs-product.jpg";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={heroImage} 
          alt="Beautiful Crete landscape" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About Cretan Guru</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto px-4">
              Preserving the authentic taste and traditions of Crete for generations to come
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Our Story */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-foreground mb-8">Our Story</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Born from a deep love for Cretan culture and traditions, Cretan Guru was founded to share 
              the authentic flavors and experiences that make our island so special. We believe that every 
              product tells a story – from the ancient olive groves that have witnessed centuries of history 
              to the wild herbs that grow freely in our pristine mountain landscapes.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our journey began with a simple mission: to connect people with the true essence of Crete 
              through carefully curated products and unforgettable experiences that honor our heritage 
              while embracing sustainable practices for future generations.
            </p>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center text-foreground mb-12">Our Mission & Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <CardContent className="p-0">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Authenticity</h3>
                <p className="text-muted-foreground">
                  Every product we offer is sourced directly from local producers who maintain 
                  traditional methods passed down through generations.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent className="p-0">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Sustainability</h3>
                <p className="text-muted-foreground">
                  We are committed to preserving Crete's natural beauty and supporting 
                  eco-friendly practices that protect our environment.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent className="p-0">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Community</h3>
                <p className="text-muted-foreground">
                  We work closely with local families and communities, ensuring that traditional 
                  knowledge and practices continue to thrive.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Our Products */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center text-foreground mb-12">What Makes Our Products Special</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={oliveGroveImage} 
                alt="Traditional olive grove in Crete" 
                className="rounded-lg shadow-lg w-full h-80 object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">Premium Olive Oil</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Our olive oil comes from ancient groves where trees have been producing fruit for over 
                800 years. These centenarian trees, deeply rooted in Cretan soil, produce olives with 
                an unmatched depth of flavor and nutritional value.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Each bottle represents not just a product, but a piece of Cretan history, harvested 
                using time-honored methods that preserve both quality and tradition.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-16">
            <div className="order-2 lg:order-1">
              <h3 className="text-2xl font-semibold text-foreground mb-6">Wild Mountain Herbs</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Hand-picked from the pristine mountains of Crete, our herbs grow wild and free, 
                absorbing the unique minerals and Mediterranean climate that give them their 
                distinctive aroma and healing properties.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From mountain tea to oregano, each herb is carefully selected by experienced 
                foragers who know exactly when and where to find the finest specimens.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <img 
                src={herbsImage} 
                alt="Wild herbs from Cretan mountains" 
                className="rounded-lg shadow-lg w-full h-80 object-cover"
              />
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center text-foreground mb-12">Our Team</h2>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our team consists of passionate locals who have deep roots in Cretan culture. 
              From third-generation olive farmers to expert foragers who learned from their 
              grandparents, each team member brings authentic knowledge and genuine love for our island.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We work hand-in-hand with local producers, maintaining relationships built on trust, 
              respect, and a shared commitment to preserving the authentic flavors of Crete for 
              future generations to discover and enjoy.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="p-12 bg-primary/5">
            <CardContent className="p-0">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Ready to Experience Authentic Crete?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join us on a journey of discovery. Whether through our premium products, 
                immersive activities, or memorable events, let us share the true spirit of Crete with you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/products" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-medium transition-colors inline-block">
                  Shop Our Products
                </a>
                <a href="/activities" className="border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 rounded-lg font-medium transition-colors inline-block">
                  Book an Experience
                </a>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;