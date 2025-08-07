import Navigation from "@/components/Navigation";
import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";
import oliveOilImage from "@/assets/olive-oil-product.jpg";
import herbsImage from "@/assets/herbs-product.jpg";

const Blog = () => {
  const posts = [
    {
      title: "Why Cretan Olive Oil is Unique",
      excerpt: "Explore the health benefits and centuries-old heritage behind our premium olive oils. Learn what makes Cretan olive oil stand apart from the rest.",
      image: oliveOilImage,
      url: "/blog/cretan-olive-oil"
    },
    {
      title: "Top 5 Herbs Growing Wild in Crete",
      excerpt: "Discover which herbs thrive naturally on our island and how local families have used them for generations in cooking and traditional medicine.",
      image: herbsImage,
      url: "/blog/wild-herbs"
    },
    {
      title: "The Ancient Art of Olive Oil Production",
      excerpt: "Journey through time as we explore traditional olive oil production methods that have been preserved on Crete for over 4,000 years.",
      image: oliveOilImage,
      url: "/blog/olive-oil-production"
    },
    {
      title: "Seasonal Guide to Cretan Foraging",
      excerpt: "Learn when and where to find the best wild herbs, greens, and edible plants throughout the changing seasons on the island of Crete.",
      image: herbsImage,
      url: "/blog/seasonal-foraging"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Dive deep into Cretan culture, traditions, and the stories behind our products. 
            Discover the wisdom passed down through generations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Blog;