import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { BlogSidebar } from "@/components/BlogSidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Helmet, HelmetProvider } from "react-helmet-async";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  featured_image_url?: string;
  published_at: string;
  author_name: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'popular' | 'recent'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [posts, filter, searchQuery, selectedCategory, selectedTag]);

  const loadPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, featured_image_url, published_at, author_name')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error loading blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = async () => {
    let filtered = [...posts];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (selectedCategory) {
      try {
        const { data: categoryPosts } = await supabase
          .from('blog_posts')
          .select(`
            id, title, slug, excerpt, featured_image_url, published_at, author_name,
            blog_post_categories!inner(
              blog_categories!inner(slug)
            )
          `)
          .eq('is_published', true)
          .eq('blog_post_categories.blog_categories.slug', selectedCategory);
        
        if (categoryPosts) {
          const categoryPostIds = categoryPosts.map(p => p.id);
          filtered = filtered.filter(post => categoryPostIds.includes(post.id));
        }
      } catch (error) {
        console.error('Error filtering by category:', error);
      }
    }

    // Apply tag filter
    if (selectedTag) {
      try {
        const { data: tagPosts } = await supabase
          .from('blog_posts')
          .select(`
            id, title, slug, excerpt, featured_image_url, published_at, author_name,
            blog_post_tags!inner(
              blog_tags!inner(slug)
            )
          `)
          .eq('is_published', true)
          .eq('blog_post_tags.blog_tags.slug', selectedTag);
        
        if (tagPosts) {
          const tagPostIds = tagPosts.map(p => p.id);
          filtered = filtered.filter(post => tagPostIds.includes(post.id));
        }
      } catch (error) {
        console.error('Error filtering by tag:', error);
      }
    }

    // Apply sorting based on filter
    switch (filter) {
      case 'recent':
        filtered = filtered.slice(0, 6);
        break;
      case 'popular':
        try {
          const { data: popularPosts } = await supabase.rpc('get_popular_posts', { limit_count: 10 });
          if (popularPosts) {
            const popularIds = popularPosts.map(p => p.id);
            filtered.sort((a, b) => popularIds.indexOf(a.id) - popularIds.indexOf(b.id));
          }
        } catch (error) {
          console.error('Error sorting by popularity:', error);
        }
        break;
      default:
        break;
    }

    setFilteredPosts(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory('');
    setSelectedTag('');
  };

  const handleCategorySelect = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    setSearchQuery('');
    setSelectedTag('');
  };

  const handleTagSelect = (tagSlug: string) => {
    setSelectedTag(tagSlug);
    setSearchQuery('');
    setSelectedCategory('');
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedTag('');
    setFilter('all');
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Blog - Cretan Guru</title>
        <meta name="description" content="Discover authentic Crete through our blog. Learn about traditional olive oil production, wild herbs, local culture, and sustainable practices." />
        <meta name="keywords" content="Crete blog, olive oil, herbs, traditional, culture, sustainable" />
      </Helmet>

      <Navigation />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the authentic flavors, traditions, and stories of Crete through our carefully curated articles.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content */}
            <div className="lg:w-3/4">
              {/* Filter buttons */}
              <div className="flex gap-2 mb-8">
                <Button
                  variant={filter === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilter('all')}
                >
                  All Posts
                </Button>
                <Button
                  variant={filter === 'recent' ? 'default' : 'outline'}
                  onClick={() => setFilter('recent')}
                >
                  Recent
                </Button>
                <Button
                  variant={filter === 'popular' ? 'default' : 'outline'}
                  onClick={() => setFilter('popular')}
                >
                  Popular
                </Button>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-48 bg-muted rounded-lg mb-4"></div>
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No blog posts found. Check back soon!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post) => (
                    <BlogCard
                      key={post.id}
                      title={post.title}
                      excerpt={post.excerpt || ''}
                      image={post.featured_image_url || '/placeholder.svg'}
                      url={`/blog/${post.slug}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/4">
              <BlogSidebar 
                onSearch={handleSearch}
                onCategorySelect={handleCategorySelect}
                onTagSelect={handleTagSelect}
              />
              
              {/* Active Filters */}
              {(searchQuery || selectedCategory || selectedTag) && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Active Filters:</h4>
                  {searchQuery && (
                    <Badge variant="secondary" className="mr-2 mb-2">
                      Search: {searchQuery}
                    </Badge>
                  )}
                  {selectedCategory && (
                    <Badge variant="secondary" className="mr-2 mb-2">
                      Category: {selectedCategory}
                    </Badge>
                  )}
                  {selectedTag && (
                    <Badge variant="secondary" className="mr-2 mb-2">
                      Tag: {selectedTag}
                    </Badge>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={clearFilters}
                    className="mt-2"
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </HelmetProvider>
  );
};

export default Blog;