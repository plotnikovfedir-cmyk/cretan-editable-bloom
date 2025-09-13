import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import BlogCard from '@/components/BlogCard';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Link } from 'react-router-dom';
import oliveOilImage from '@/assets/olive-oil-product.jpg';
import herbsImage from '@/assets/herbs-product.jpg';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  featured_image_url?: string;
  published_at: string;
}

const BlogSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, excerpt, slug, featured_image_url, published_at')
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      
      if (data && data.length > 0) {
        setPosts(data);
      } else {
        // Fallback to static blog cards if no posts found
        setPosts([]);
      }
    } catch (error) {
      console.error('Error loading blog posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const fallbackPosts = [
    {
      title: "The Health Benefits of Cretan Olive Oil",
      excerpt: "Explore the remarkable health benefits and centuries-old heritage behind our premium olive oils that make them truly special.",
      image: oliveOilImage,
      url: "/blog/cretan-olive-oil"
    },
    {
      title: "Wild Herbs of Crete: A Forager's Guide",
      excerpt: "Discover which herbs thrive naturally on our island and how local families have used them for generations.",
      image: herbsImage,
      url: "/blog/wild-herbs"
    },
    {
      title: "Traditional Cretan Recipes Using Our Products",
      excerpt: "Learn authentic Cretan recipes that showcase the incredible flavors of our premium olive oils and wild herbs.",
      image: oliveOilImage,
      url: "/blog/traditional-recipes"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">
            Latest From Our Blog
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover stories, recipes, and insights from Crete
          </p>
        </div>
        
        <div className="mb-12">
          {loading ? (
            <Carousel className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="animate-pulse">
                      <div className="bg-muted rounded-lg h-48 mb-4"></div>
                      <div className="h-6 bg-muted rounded mb-2"></div>
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          ) : (
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {(posts.length > 0 ? posts : fallbackPosts).map((post, index) => (
                  <CarouselItem key={posts.length > 0 ? post.id : index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <BlogCard
                      title={post.title}
                      excerpt={posts.length > 0 ? (post as BlogPost).excerpt || '' : (post as any).excerpt}
                      image={posts.length > 0 ? (post as BlogPost).featured_image_url || oliveOilImage : (post as any).image}
                      url={posts.length > 0 ? `/blog/${(post as BlogPost).slug}` : (post as any).url}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          )}
        </div>
        
        <div className="text-center">
          <Button asChild size="lg" variant="outline" className="bg-background hover:bg-muted border-primary text-primary hover:text-primary">
            <Link to="/blog">Read All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;