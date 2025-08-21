import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import deliveryHeroImage from "@/assets/delivery-hero.jpg";
import picnicBoxImage from "@/assets/picnic-box.jpg";
import ammoudiBeachImage from "@/assets/ammoudi-beach.jpg";
import schinariaBeachImage from "@/assets/schinaria-beach.jpg";
import preveliBeachImage from "@/assets/preveli-beach.jpg";
import triopetraBeachImage from "@/assets/triopetra-beach.jpg";
import agiosPavlosBeachImage from "@/assets/agios-pavlos-beach.jpg";
import monasteryBeachImage from "@/assets/monastery-beach.jpg";

const Delivery = () => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToOrder = (item: any) => {
    const product = {
      id: `delivery-${item.title.toLowerCase().replace(/\s+/g, '-')}`,
      name: item.title,
      price: parseFloat(item.price.replace('€', '')),
      image_url: item.image,
      description: item.description
    };

    addToCart(product);
    toast({
      title: "Added to order",
      description: `${item.title} has been added to your order.`
    });
  };

  const menuItems = [
    {
      title: "Mediterranean Picnic Box",
      description: "Artisanal cheeses, local olives, fresh bread, seasonal fruits",
      price: "35€",
      image: picnicBoxImage
    },
    {
      title: "Cretan Wine Selection",
      description: "Curated local wines perfectly paired with your meal",
      price: "25€",
      image: picnicBoxImage
    },
    {
      title: "Sunset Gourmet Box",
      description: "Premium delicacies for the perfect romantic evening",
      price: "65€",
      image: picnicBoxImage
    }
  ];

  const beaches = [
    { name: "Ammoudi Beach", image: ammoudiBeachImage },
    { name: "Schinaria Beach", image: schinariaBeachImage },
    { name: "Preveli Beach", image: preveliBeachImage },
    { name: "Triopetra Beach", image: triopetraBeachImage },
    { name: "Agios Pavlos", image: agiosPavlosBeachImage },
    { name: "Monastery Beach", image: monasteryBeachImage }
  ];

  const testimonials = [
    {
      text: "Amazing service! They delivered our picnic to the most remote beach. The food was exceptional and the experience unforgettable.",
      author: "Sofia M., Tourist from Athens"
    },
    {
      text: "As a local, I can say this service brings luxury to places I thought impossible. Perfect for special occasions.",
      author: "Nikos P., Plakias Resident"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSlider pageType="delivery" />

      {/* About Us */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-bold text-stone-800 mb-6">About Our Service</h2>
            <p className="text-lg text-stone-600 mb-8 leading-relaxed">
              We specialize in delivering curated gourmet experiences to the most spectacular and 
              hard-to-reach locations along Crete's southern coast. From hidden beaches accessible 
              only by foot to remote sunset viewpoints, we bring the finest local delicacies directly 
              to where memories are made. Our mission is to enhance your exploration of Crete's wild 
              beauty with exceptional food that honors local traditions and Mediterranean flavors.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-stone-800 mb-4">How It Works</h2>
            <p className="text-lg text-stone-600">Three simple steps to your perfect adventure</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3 text-stone-800">Choose Your Location</h3>
              <p className="text-stone-600">
                Select from our curated list of remote beaches and scenic spots, or suggest your own hidden gem.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3 text-stone-800">Select Your Box</h3>
              <p className="text-stone-600">
                Choose from our carefully crafted picnic boxes featuring local specialties and wine pairings.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3 text-stone-800">Enjoy & Explore</h3>
              <p className="text-stone-600">
                Relax and savor exceptional food in extraordinary places while we handle all the logistics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Preview */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-stone-800 mb-4">Our Signature Boxes</h2>
            <p className="text-lg text-stone-600">Curated experiences for every taste</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {menuItems.map((item, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="p-0">
                  <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-2 text-stone-800">{item.title}</CardTitle>
                  <p className="text-stone-600 mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">{item.price}</span>
                    <Button 
                      variant="outline" 
                      className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                      onClick={() => handleAddToOrder(item)}
                    >
                      Add to Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Areas */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-stone-800 mb-4">Delivery Areas</h2>
            <p className="text-lg text-stone-600">We deliver to these stunning locations near Plakias</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {beaches.map((beach, index) => (
              <Card key={index} className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <CardHeader className="p-0 relative">
                  <img 
                    src={beach.image} 
                    alt={beach.name}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold drop-shadow-lg">{beach.name}</h3>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-stone-800 mb-4">What Our Customers Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-none shadow-md">
                <CardContent className="p-8">
                  <p className="text-stone-600 italic mb-4 text-lg leading-relaxed">"{testimonial.text}"</p>
                  <p className="font-semibold text-stone-800">— {testimonial.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Order */}
      <section id="order" className="py-20 bg-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">Ready for Your Adventure?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Contact us via WhatsApp or Telegram to place your order. We recommend booking 
            at least 2 hours in advance for the best experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold rounded-full"
              asChild
            >
              <a 
                href="https://wa.me/4917857738346?text=Hi! I'd like to place an order for delivery to a remote location" 
                target="_blank"
                rel="noopener noreferrer"
              >
                📱 Order via WhatsApp
              </a>
            </Button>
            <Button 
              size="lg" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-full"
              asChild
            >
              <a 
                href="https://t.me/cretanguru" 
                target="_blank"
                rel="noopener noreferrer"
              >
                📨 Order via Telegram
              </a>
            </Button>
          </div>
          <p className="text-sm mt-6 opacity-75">
            Delivery fee varies by location. Minimum order: 25€
          </p>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Delivery;