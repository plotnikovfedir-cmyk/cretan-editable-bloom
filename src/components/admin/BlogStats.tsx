import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Eye, FileText, Calendar, TrendingUp, Users, Clock } from 'lucide-react';

interface BlogStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalViews: number;
  avgReadTime: number;
  postsThisMonth: number;
}

interface PopularPost {
  id: string;
  title: string;
  views: number;
  published_at: string;
}

export const BlogStats: React.FC = () => {
  const [stats, setStats] = useState<BlogStats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalViews: 0,
    avgReadTime: 0,
    postsThisMonth: 0
  });
  const [popularPosts, setPopularPosts] = useState<PopularPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Get basic post stats
      const { data: allPosts } = await supabase
        .from('blog_posts')
        .select('is_published, created_at, read_time_minutes');

      if (allPosts) {
        const publishedPosts = allPosts.filter(post => post.is_published);
        const draftPosts = allPosts.filter(post => !post.is_published);
        
        // Posts this month
        const thisMonth = new Date();
        thisMonth.setDate(1);
        const postsThisMonth = allPosts.filter(post => 
          new Date(post.created_at) >= thisMonth
        ).length;

        // Average read time
        const avgReadTime = publishedPosts.reduce((acc, post) => 
          acc + (post.read_time_minutes || 0), 0
        ) / publishedPosts.length || 0;

        setStats({
          totalPosts: allPosts.length,
          publishedPosts: publishedPosts.length,
          draftPosts: draftPosts.length,
          totalViews: 0, // Will be implemented with analytics
          avgReadTime: Math.round(avgReadTime),
          postsThisMonth
        });
      }

      // Get popular posts (mock data for now, will be real when analytics implemented)
      const { data: posts } = await supabase
        .from('blog_posts')
        .select('id, title, published_at')
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(5);

      if (posts) {
        setPopularPosts(posts.map((post, index) => ({
          ...post,
          views: Math.floor(Math.random() * 1000) + 100 // Mock views for now
        })));
      }
    } catch (error) {
      console.error('Error loading blog stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Posts',
      value: stats.totalPosts,
      icon: FileText,
      description: `${stats.publishedPosts} published, ${stats.draftPosts} drafts`
    },
    {
      title: 'This Month',
      value: stats.postsThisMonth,
      icon: Calendar,
      description: 'New posts created'
    },
    {
      title: 'Avg. Read Time',
      value: `${stats.avgReadTime}m`,
      icon: Clock,
      description: 'Average reading time'
    },
    {
      title: 'Total Views',
      value: stats.totalViews || 'Coming Soon',
      icon: Eye,
      description: 'Analytics in development'
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-muted rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                </div>
                <stat.icon className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Popular Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Popular Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {popularPosts.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No published posts yet
              </p>
            ) : (
              popularPosts.map((post, index) => (
                <div key={post.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex-1">
                    <p className="font-medium text-sm truncate">{post.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(post.published_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm">{post.views}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};