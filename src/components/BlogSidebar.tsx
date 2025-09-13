import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Search, Calendar, TrendingUp, Hash, Folder } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  post_count?: number;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
  post_count?: number;
}

interface PopularPost {
  id: string;
  title: string;
  slug: string;
  published_at: string;
  featured_image_url?: string;
}

interface BlogSidebarProps {
  onSearch?: (query: string) => void;
  onCategorySelect?: (categorySlug: string) => void;
  onTagSelect?: (tagSlug: string) => void;
}

export const BlogSidebar: React.FC<BlogSidebarProps> = ({
  onSearch,
  onCategorySelect,
  onTagSelect
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [popularPosts, setPopularPosts] = useState<PopularPost[]>([]);
  const [recentPosts, setRecentPosts] = useState<PopularPost[]>([]);

  useEffect(() => {
    loadSidebarData();
  }, []);

  const loadSidebarData = async () => {
    try {
      // Load categories
      const { data: categoriesData } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name');

      if (categoriesData) {
        setCategories(categoriesData);
      }

      // Load tags (limit to most used)
      const { data: tagsData } = await supabase
        .from('blog_tags')
        .select('*')
        .order('name')
        .limit(10);

      if (tagsData) {
        setTags(tagsData);
      }

      // Load recent posts
      const { data: recentPostsData } = await supabase
        .from('blog_posts')
        .select('id, title, slug, published_at, featured_image_url')
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(5);

      if (recentPostsData) {
        setRecentPosts(recentPostsData);
        // For now, popular posts are the same as recent (will be real analytics later)
        setPopularPosts(recentPostsData);
      }
    } catch (error) {
      console.error('Error loading sidebar data:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Search className="h-5 w-5" />
            Search Blog
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" size="sm">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Folder className="h-5 w-5" />
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.length === 0 ? (
              <p className="text-muted-foreground text-sm">No categories yet</p>
            ) : (
              categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/blog/category/${category.slug}`}
                  className="block p-2 rounded hover:bg-muted transition-colors"
                  onClick={() => onCategorySelect?.(category.slug)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{category.name}</span>
                    {category.post_count && (
                      <Badge variant="secondary" className="text-xs">
                        {category.post_count}
                      </Badge>
                    )}
                  </div>
                </Link>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Hash className="h-5 w-5" />
            Popular Tags
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.length === 0 ? (
              <p className="text-muted-foreground text-sm">No tags yet</p>
            ) : (
              tags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => onTagSelect?.(tag.slug)}
                >
                  #{tag.name}
                </Badge>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="h-5 w-5" />
            Recent Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentPosts.length === 0 ? (
              <p className="text-muted-foreground text-sm">No posts yet</p>
            ) : (
              recentPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="flex gap-3 p-2 rounded hover:bg-muted transition-colors"
                >
                  {post.featured_image_url && (
                    <img
                      src={post.featured_image_url}
                      alt={post.title}
                      className="w-12 h-12 object-cover rounded flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium line-clamp-2 mb-1">
                      {post.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(post.published_at)}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Popular Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5" />
            Popular Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {popularPosts.length === 0 ? (
              <p className="text-muted-foreground text-sm">No posts yet</p>
            ) : (
              popularPosts.map((post, index) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="flex gap-3 p-2 rounded hover:bg-muted transition-colors"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium line-clamp-2">
                      {post.title}
                    </h4>
                  </div>
                </Link>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};