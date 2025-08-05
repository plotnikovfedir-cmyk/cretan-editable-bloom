import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import { Link } from "react-router-dom";
import oliveOilImage from "@/assets/olive-oil-product.jpg";
import herbsImage from "@/assets/herbs-product.jpg";

const Products = () => {
  const products = [
    {
      id: "extra-virgin-olive-oil",
      title: "Extra Virgin Olive Oil",
      image: oliveOilImage,
      description: "Cold-pressed from the finest Cretan olives, our olive oil is rich in antioxidants and flavor.",
      price: "12.90"
    },
    {
      id: "wild-mountain-herbs",
      title: "Wild Mountain Herbs",
      image: herbsImage,
      description: "Hand-picked herbs from the Cretan mountains, dried naturally to preserve their intense aroma.",
      price: "8.90"
    },
    {
      id: "oil-st-johns-wort",
      title: "Oil With St John's Wort",
      image: oliveOilImage,
      description: "Premium olive oil infused with wild St John's Wort, known for its healing properties.",
      price: "18.90"
    },
    {
      id: "wild-oregano-oil",
      title: "Wild Oregano Olive Oil",
      image: herbsImage,
      description: "Extra virgin olive oil infused with wild Cretan oregano, perfect for Mediterranean cuisine.",
      price: "16.90"
    },
    {
      id: "agios-konstantinos-oil",
      title: "Olive Oil – Agios Konstantinos",
      image: oliveOilImage,
      description: "Single-origin olive oil from the blessed groves of Agios Konstantinos monastery.",
      price: "24.90"
    },
    {
      id: "koxare-oil",
      title: "Olive Oil – Koxaré",
      image: oliveOilImage,
      description: "Exceptional olive oil from the ancient village of Koxaré, with notes of pepper and herbs.",
      price: "26.90"
    },
    {
      id: "myxorouma-oil",
      title: "Olive Oil – Myxorouma",
      image: herbsImage,
      description: "Premium estate oil from Myxorouma, with a rich golden color and fruity aroma.",
      price: "28.90"
    },
    {
      id: "preveli-oil",
      title: "Olive Oil – Preveli",
      image: oliveOilImage,
      description: "Artisanal olive oil from the famous Preveli monastery, a true taste of Cretan heritage.",
      price: "32.90"
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
            <Link key={index} to={`/products/${product.id}`}>
              <ProductCard
                title={product.title}
                image={product.image}
                description={product.description}
                price={product.price}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;