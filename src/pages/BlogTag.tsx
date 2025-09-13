import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { BlogSidebar } from "@/components/BlogSidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image_url: string;
  published_at: string;
  author_name: string;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}

const BlogTag = () => {
  const { slug } = useParams<{ slug: string }>();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [tag, setTag] = useState<Tag | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (slug) {
      loadTagAndPosts();
    }
  }, [slug]);

  const loadTagAndPosts = async () => {
    try {
      // Load tag
      const { data: tagData, error: tagError } = await supabase
        .from("blog_tags")
        .select("*")
        .eq("slug", slug)
        .single();

      if (tagError || !tagData) {
        setNotFound(true);
        return;
      }

      setTag(tagData);

      // Load posts with this tag
      const { data: postsData, error: postsError } = await supabase
        .from("blog_posts")
        .select(`
          id,
          title,
          slug,
          excerpt,
          featured_image_url,
          published_at,
          author_name,
          blog_post_tags!inner(
            tag_id
          )
        `)
        .eq("is_published", true)
        .eq("blog_post_tags.tag_id", tagData.id)
        .order("published_at", { ascending: false });

      if (postsError) throw postsError;
      setPosts(postsData || []);
    } catch (error) {
      // Error handling without console log
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <HelmetProvider>
        <Navigation />
        <main className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center">Loading...</div>
          </div>
        </main>
        <Footer />
      </HelmetProvider>
    );
  }

  if (notFound || !tag) {
    return (
      <HelmetProvider>
        <Navigation />
        <main className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-4xl font-bold mb-4">Tag Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The tag you're looking for doesn't exist.
            </p>
            <Link to="/blog">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </HelmetProvider>
    );
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>{tag.name} - Blog - Cretan Guru</title>
        <meta name="description" content={`Browse all blog posts tagged with ${tag.name} on Cretan Guru`} />
        <meta name="keywords" content={`${tag.name}, Crete, blog, articles`} />
        <link rel="canonical" href={`https://cretanguru.com/blog/tag/${tag.slug}`} />
      </Helmet>
      
      <Navigation />
      
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="flex gap-8">
            {/* Main Content */}
            <div className="flex-1">
              <div className="mb-8">
                <Link to="/blog">
                  <Button variant="outline" className="mb-4">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Blog
                  </Button>
                </Link>
                <h1 className="text-4xl font-bold mb-4">#{tag.name}</h1>
                <p className="text-sm text-muted-foreground">
                  {posts.length} {posts.length === 1 ? 'article' : 'articles'} tagged with "{tag.name}"
                </p>
              </div>

              {posts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No articles found with this tag yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {posts.map((post) => (
                    <BlogCard
                      key={post.id}
                      title={post.title}
                      excerpt={post.excerpt || ""}
                      image={post.featured_image_url || "/placeholder.svg"}
                      url={`/blog/${post.slug}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="w-80">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </HelmetProvider>
  );
};

export default BlogTag;