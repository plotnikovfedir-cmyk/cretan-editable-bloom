-- Add SEO fields to all relevant tables

-- Add SEO fields to products table
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS meta_title text,
ADD COLUMN IF NOT EXISTS meta_description text,
ADD COLUMN IF NOT EXISTS meta_keywords text[];

-- Add SEO fields to activities table  
ALTER TABLE public.activities
ADD COLUMN IF NOT EXISTS meta_title text,
ADD COLUMN IF NOT EXISTS meta_description text,
ADD COLUMN IF NOT EXISTS meta_keywords text[];

-- Add SEO fields to events table
ALTER TABLE public.events
ADD COLUMN IF NOT EXISTS meta_title text,
ADD COLUMN IF NOT EXISTS meta_description text,
ADD COLUMN IF NOT EXISTS meta_keywords text[];

-- Add SEO fields to island_tours table
ALTER TABLE public.island_tours
ADD COLUMN IF NOT EXISTS meta_title text,
ADD COLUMN IF NOT EXISTS meta_description text,
ADD COLUMN IF NOT EXISTS meta_keywords text[];

-- Add SEO fields to wine_tastings table
ALTER TABLE public.wine_tastings
ADD COLUMN IF NOT EXISTS meta_title text,
ADD COLUMN IF NOT EXISTS meta_description text,
ADD COLUMN IF NOT EXISTS meta_keywords text[];

-- Update blog_posts to ensure it has proper SEO fields (it already has them but let's make sure)
-- The blog_posts table already has meta_description and meta_keywords
-- Add meta_title if not exists
ALTER TABLE public.blog_posts
ADD COLUMN IF NOT EXISTS meta_title text;