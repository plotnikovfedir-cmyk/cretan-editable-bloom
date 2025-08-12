import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import ProductDetail from "@/components/ProductDetail";
import ProductDetailEnhanced from "@/components/ProductDetailEnhanced";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import oliveOilImage from "@/assets/olive-oil-product.jpg";
import herbsImage from "@/assets/herbs-product.jpg";

const ProductPage = () => {
  const { id } = useParams();
  const [isDbProduct, setIsDbProduct] = useState<boolean | null>(null);

  useEffect(() => {
    checkIfDbProduct();
  }, [id]);

  const checkIfDbProduct = async () => {
    if (!id) {
      setIsDbProduct(false);
      return;
    }

    // First check if it's a UUID (database product)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (uuidRegex.test(id)) {
      setIsDbProduct(true);
      return;
    }

    // Otherwise check if it exists in database by slug
    try {
      const { data, error } = await supabase
        .from("products")
        .select("id")
        .eq("slug", id)
        .single();
      
      setIsDbProduct(!error && !!data);
    } catch {
      setIsDbProduct(false);
    }
  };

  const products = {
    "extra-virgin-olive-oil": {
      id: "extra-virgin-olive-oil",
      title: "Extra Virgin Olive Oil",
      image: oliveOilImage,
      description: "Cold-pressed from the finest Cretan olives, our olive oil is rich in antioxidants and flavor.",
      longDescription: "Our Extra Virgin Olive Oil is produced from carefully selected olives grown in the fertile valleys of Crete. The olives are harvested at optimal ripeness and cold-pressed within hours to preserve their exceptional flavor and nutritional value. This premium oil features a bright golden color with hints of green, offering a perfect balance of fruity and peppery notes. Rich in antioxidants and healthy monounsaturated fats, it's ideal for both cooking and drizzling over finished dishes.",
      price: "12.90",
      rating: 4.8,
      reviewCount: 127,
      origin: "Rethymno Valley, Crete",
      coordinates: [35.3662, 24.4777] as [number, number],
      volumes: [
        { size: "250ml", price: "12.90" },
        { size: "500ml", price: "22.90", popular: true },
        { size: "1L", price: "42.90" }
      ],
      reviews: [
        {
          name: "Maria K.",
          rating: 5,
          comment: "Absolutely amazing! The taste is incredible and you can really taste the quality.",
          date: "2024-01-15"
        },
        {
          name: "John D.",
          rating: 4,
          comment: "Great olive oil, very fresh and aromatic. Perfect for salads.",
          date: "2024-01-10"
        },
        {
          name: "Elena S.",
          rating: 5,
          comment: "This is the best olive oil I've ever tasted. Worth every euro!",
          date: "2024-01-05"
        }
      ]
    },
    "wild-mountain-herbs": {
      id: "wild-mountain-herbs",
      title: "Wild Mountain Herbs",
      image: herbsImage,
      description: "Hand-picked herbs from the Cretan mountains, dried naturally to preserve their intense aroma.",
      longDescription: "Our Wild Mountain Herbs are carefully foraged from the pristine mountains of Crete, where they grow wild in their natural habitat. Each herb is hand-picked at the perfect time of day when essential oils are at their peak concentration. The herbs are then naturally dried using traditional methods passed down through generations, preserving their potent aroma and medicinal properties. This blend includes oregano, thyme, sage, and other indigenous Cretan herbs known for their exceptional flavor and health benefits.",
      price: "8.90",
      rating: 4.9,
      reviewCount: 93,
      origin: "Psiloritis Mountains, Crete",
      coordinates: [35.2401, 24.7665] as [number, number],
      volumes: [
        { size: "50g", price: "8.90", popular: true },
        { size: "100g", price: "15.90" },
        { size: "200g", price: "28.90" }
      ],
      reviews: [
        {
          name: "Andreas P.",
          rating: 5,
          comment: "The aroma is incredible! You can smell the mountains in these herbs.",
          date: "2024-01-20"
        },
        {
          name: "Sophie L.",
          rating: 5,
          comment: "Perfect for Greek cooking. The quality is outstanding.",
          date: "2024-01-18"
        },
        {
          name: "Dimitris N.",
          rating: 4,
          comment: "Authentic wild herbs, exactly what I was looking for.",
          date: "2024-01-12"
        }
      ]
    },
    "oil-st-johns-wort": {
      id: "oil-st-johns-wort",
      title: "Oil With St John's Wort",
      image: oliveOilImage,
      description: "Premium olive oil infused with wild St John's Wort, known for its healing properties.",
      longDescription: "This exceptional oil combines our finest extra virgin olive oil with wild St John's Wort (Hypericum perforatum) that grows abundantly in the Cretan countryside. St John's Wort has been valued since ancient times for its therapeutic properties and is traditionally used in Mediterranean folk medicine. The yellow flowers are carefully harvested at peak potency and slowly infused in our premium olive oil for several weeks, creating a golden-red oil with remarkable properties. Perfect for topical use and traditional remedies.",
      price: "18.90",
      rating: 4.7,
      reviewCount: 64,
      origin: "Lasithi Plateau, Crete",
      coordinates: [35.1833, 25.4833] as [number, number],
      volumes: [
        { size: "100ml", price: "18.90", popular: true },
        { size: "250ml", price: "42.90" },
        { size: "500ml", price: "78.90" }
      ],
      reviews: [
        {
          name: "Katerina M.",
          rating: 5,
          comment: "Amazing for skin care! Traditional recipe that really works.",
          date: "2024-01-22"
        },
        {
          name: "George T.",
          rating: 4,
          comment: "High quality infused oil. Very satisfied with the results.",
          date: "2024-01-14"
        }
      ]
    },
    "wild-oregano-oil": {
      id: "wild-oregano-oil",
      title: "Wild Oregano Olive Oil",
      image: herbsImage,
      description: "Extra virgin olive oil infused with wild Cretan oregano, perfect for Mediterranean cuisine.",
      longDescription: "Our Wild Oregano Olive Oil features the intense flavor of authentic Cretan oregano (Origanum vulgare hirtum), considered the finest oregano in the world. The wild oregano is harvested from the sun-drenched hillsides of Crete where it grows naturally, developing an extraordinarily high concentration of essential oils. This aromatic herb is then carefully infused into our premium extra virgin olive oil, creating a versatile culinary oil that brings authentic Mediterranean flavors to any dish. Perfect for pizza, pasta, grilled meats, and traditional Greek salads.",
      price: "16.90",
      rating: 4.9,
      reviewCount: 85,
      origin: "Chania Hills, Crete",
      coordinates: [35.5138, 23.8711] as [number, number],
      volumes: [
        { size: "250ml", price: "16.90", popular: true },
        { size: "500ml", price: "31.90" },
        { size: "1L", price: "58.90" }
      ],
      reviews: [
        {
          name: "Yiannis K.",
          rating: 5,
          comment: "This oregano oil is fantastic! Brings authentic Greek taste to everything.",
          date: "2024-01-19"
        },
        {
          name: "Isabella R.",
          rating: 5,
          comment: "Perfect for Mediterranean cooking. The oregano flavor is amazing.",
          date: "2024-01-16"
        }
      ]
    },
    "agios-konstantinos-oil": {
      id: "agios-konstantinos-oil",
      title: "Olive Oil – Agios Konstantinos",
      image: oliveOilImage,
      description: "Single-origin olive oil from the blessed groves of Agios Konstantinos monastery.",
      longDescription: "This exceptional single-origin olive oil comes from the ancient olive groves surrounding the historic Agios Konstantinos monastery in Crete. These centuries-old trees have been lovingly tended by the monastic community, who follow traditional organic farming methods passed down through generations. The olives are harvested by hand at optimal ripeness and pressed using time-honored techniques that preserve the oil's distinctive character. This premium oil offers complex flavors with notes of fresh grass, almonds, and a gentle peppery finish, reflecting the unique terroir of this sacred place.",
      price: "24.90",
      rating: 4.8,
      reviewCount: 45,
      origin: "Agios Konstantinos Monastery, Crete",
      coordinates: [35.2889, 24.6214] as [number, number],
      volumes: [
        { size: "500ml", price: "24.90", popular: true },
        { size: "750ml", price: "36.90" },
        { size: "1L", price: "47.90" }
      ],
      reviews: [
        {
          name: "Father Michael",
          rating: 5,
          comment: "Blessed oil from a blessed place. Truly exceptional quality.",
          date: "2024-01-21"
        },
        {
          name: "Anna C.",
          rating: 5,
          comment: "You can taste the history and tradition in this oil. Magnificent!",
          date: "2024-01-17"
        }
      ]
    },
    "koxare-oil": {
      id: "koxare-oil",
      title: "Olive Oil – Koxaré",
      image: oliveOilImage,
      description: "Exceptional olive oil from the ancient village of Koxaré, with notes of pepper and herbs.",
      longDescription: "From the ancient village of Koxaré, nestled in the mountains of Crete, comes this exceptional olive oil with a character as unique as its homeland. The village's olive trees, some over 800 years old, grow in rocky, limestone-rich soil that imparts distinctive mineral notes to the oil. The traditional stone mills still used in Koxaré preserve the oil's natural complexity, resulting in a robust oil with pronounced peppery notes and herbaceous undertones. This is an oil for connoisseurs who appreciate the full expression of Cretan terroir.",
      price: "26.90",
      rating: 4.9,
      reviewCount: 38,
      origin: "Village of Koxaré, Crete",
      coordinates: [35.1742, 24.9244] as [number, number],
      volumes: [
        { size: "500ml", price: "26.90", popular: true },
        { size: "750ml", price: "39.90" },
        { size: "1L", price: "51.90" }
      ],
      reviews: [
        {
          name: "Michalis P.",
          rating: 5,
          comment: "This oil represents the true spirit of Cretan tradition. Incredible depth of flavor.",
          date: "2024-01-23"
        },
        {
          name: "Elena V.",
          rating: 5,
          comment: "Complex and powerful. Perfect for those who love robust olive oils.",
          date: "2024-01-11"
        }
      ]
    },
    "myxorouma-oil": {
      id: "myxorouma-oil",
      title: "Olive Oil – Myxorouma",
      image: herbsImage,
      description: "Premium estate oil from Myxorouma, with a rich golden color and fruity aroma.",
      longDescription: "Myxorouma Estate produces some of Crete's most sought-after olive oil from a pristine valley where ancient olive varieties have been cultivated for millennia. The estate's commitment to excellence is evident in every bottle, from the careful hand-harvesting of olives at dawn to the gentle pressing within hours of picking. This premium oil showcases the elegant side of Cretan olive oil, with a beautiful golden color, delicate fruity aroma, and a smooth, well-balanced flavor profile with hints of green apple and fresh herbs. Perfect for those who appreciate refined, sophisticated olive oils.",
      price: "28.90",
      rating: 4.8,
      reviewCount: 52,
      origin: "Myxorouma Estate, Crete",
      coordinates: [35.3021, 25.1234] as [number, number],
      volumes: [
        { size: "500ml", price: "28.90", popular: true },
        { size: "750ml", price: "42.90" },
        { size: "1L", price: "54.90" }
      ],
      reviews: [
        {
          name: "Kostas D.",
          rating: 5,
          comment: "Elegance in a bottle. This oil is simply sublime.",
          date: "2024-01-24"
        },
        {
          name: "Maria T.",
          rating: 4,
          comment: "Beautiful fruity notes and perfect balance. Highly recommended.",
          date: "2024-01-13"
        }
      ]
    },
    "preveli-oil": {
      id: "preveli-oil",
      title: "Olive Oil – Preveli",
      image: oliveOilImage,
      description: "Artisanal olive oil from the famous Preveli monastery, a true taste of Cretan heritage.",
      longDescription: "The renowned Preveli Monastery, perched dramatically above the Libyan Sea, has been producing exceptional olive oil for over 400 years. This artisanal oil represents the pinnacle of Cretan olive oil tradition, made from ancient olive trees that grow in the unique microclimate of the monastery's coastal location. The sea breeze and Mediterranean sun create optimal conditions for developing complex flavors. Each bottle is a testament to centuries of monastic dedication to quality, offering a sophisticated oil with marine mineral notes, bright acidity, and a long, elegant finish that speaks of its remarkable provenance.",
      price: "32.90",
      rating: 5.0,
      reviewCount: 29,
      origin: "Preveli Monastery, Crete",
      coordinates: [35.1592, 24.4764] as [number, number],
      volumes: [
        { size: "500ml", price: "32.90", popular: true },
        { size: "750ml", price: "48.90" },
        { size: "1L", price: "62.90" }
      ],
      reviews: [
        {
          name: "Brother Andreas",
          rating: 5,
          comment: "Four centuries of tradition in every drop. This is our heritage.",
          date: "2024-01-25"
        },
        {
          name: "Alexandra M.",
          rating: 5,
          comment: "Absolutely exceptional. The best olive oil I've ever experienced.",
          date: "2024-01-15"
        }
      ]
    }
  };

  const product = id ? products[id as keyof typeof products] : null;

  if (isDbProduct === null) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Загрузка товара...</p>
        </div>
      </div>
    );
  }

  if (isDbProduct) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад к товарам
            </Link>
          </Button>
        </div>

        <ProductDetailEnhanced productId={id!} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/products">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </Button>
      </div>

      <ProductDetail {...product} />
    </div>
  );
};

export default ProductPage;