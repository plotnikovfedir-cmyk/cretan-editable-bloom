-- Add RLS policies for blog post categories and tags
ALTER TABLE public.blog_post_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_post_tags ENABLE ROW LEVEL SECURITY;

-- Allow admins to manage blog post categories
CREATE POLICY "Admins can manage blog post categories" 
ON public.blog_post_categories 
FOR ALL 
USING (is_admin());

-- Allow admins to manage blog post tags
CREATE POLICY "Admins can manage blog post tags" 
ON public.blog_post_tags 
FOR ALL 
USING (is_admin());

-- Create blog_post_views table for analytics
CREATE TABLE public.blog_post_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on blog_post_views
ALTER TABLE public.blog_post_views ENABLE ROW LEVEL SECURITY;

-- Anyone can create views (for tracking)
CREATE POLICY "Anyone can create blog post views" 
ON public.blog_post_views 
FOR INSERT 
WITH CHECK (true);

-- Only admins can view analytics data
CREATE POLICY "Admins can view blog post views" 
ON public.blog_post_views 
FOR SELECT 
USING (is_admin());

-- Create function to get post counts by category
CREATE OR REPLACE FUNCTION public.get_category_post_counts()
RETURNS TABLE (
  category_id UUID,
  category_name TEXT,
  category_slug TEXT,
  post_count BIGINT
) 
LANGUAGE sql 
STABLE SECURITY DEFINER 
SET search_path TO 'public'
AS $function$
  SELECT 
    c.id as category_id,
    c.name as category_name,
    c.slug as category_slug,
    COUNT(bpc.post_id) as post_count
  FROM blog_categories c
  LEFT JOIN blog_post_categories bpc ON c.id = bpc.category_id
  LEFT JOIN blog_posts p ON bpc.post_id = p.id AND p.is_published = true
  GROUP BY c.id, c.name, c.slug
  ORDER BY c.name;
$function$;

-- Create function to get post counts by tag
CREATE OR REPLACE FUNCTION public.get_tag_post_counts()
RETURNS TABLE (
  tag_id UUID,
  tag_name TEXT,
  tag_slug TEXT,
  post_count BIGINT
) 
LANGUAGE sql 
STABLE SECURITY DEFINER 
SET search_path TO 'public'
AS $function$
  SELECT 
    t.id as tag_id,
    t.name as tag_name,
    t.slug as tag_slug,
    COUNT(bpt.post_id) as post_count
  FROM blog_tags t
  LEFT JOIN blog_post_tags bpt ON t.id = bpt.tag_id
  LEFT JOIN blog_posts p ON bpt.post_id = p.id AND p.is_published = true
  GROUP BY t.id, t.name, t.slug
  ORDER BY t.name;
$function$;

-- Create function to get popular posts based on views
CREATE OR REPLACE FUNCTION public.get_popular_posts(limit_count INTEGER DEFAULT 5)
RETURNS TABLE (
  id UUID,
  title TEXT,
  slug TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  view_count BIGINT
) 
LANGUAGE sql 
STABLE SECURITY DEFINER 
SET search_path TO 'public'
AS $function$
  SELECT 
    p.id,
    p.title,
    p.slug,
    p.published_at,
    COALESCE(COUNT(v.id), 0) as view_count
  FROM blog_posts p
  LEFT JOIN blog_post_views v ON p.id = v.post_id
  WHERE p.is_published = true
  GROUP BY p.id, p.title, p.slug, p.published_at
  ORDER BY view_count DESC, p.published_at DESC
  LIMIT limit_count;
$function$;