import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import oliveOilImage from "@/assets/olive-oil-product.jpg";
import herbsImage from "@/assets/herbs-product.jpg";

const Products = () => {
  const products = [
    {
      title: "Extra Virgin Olive Oil",
      image: oliveOilImage,
      description: "Cold-pressed, organic olive oil from the finest Cretan groves. Rich in antioxidants and bursting with authentic Mediterranean flavor.",
      price: "12.90"
    },
    {
      title: "Herbal Infused Oil", 
      image: herbsImage,
      description: "Our premium olive oil infused with wild Cretan herbs including oregano, thyme, and rosemary. A perfect blend of tradition and flavor.",
      price: "14.90"
    },
    {
      title: "Premium Gift Set",
      image: oliveOilImage,
      description: "A beautiful gift set containing our finest olive oils, herbs, and traditional Cretan honey. Perfect for food lovers.",
      price: "24.90"
    },
    {
      title: "Wild Mountain Herbs",
      image: herbsImage, 
      description: "Hand-picked wild herbs from the Cretan mountains. Dried naturally and packaged to preserve their intense flavor and aroma.",
      price: "8.90"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Our Products</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated selection of authentic Cretan products, 
            from premium olive oils to wild mountain herbs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;