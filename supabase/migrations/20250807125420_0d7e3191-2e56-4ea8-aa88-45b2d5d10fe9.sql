-- Remove the problematic admin user insert and create RLS policies only
-- Add RLS policies to allow admins to manage products, activities, events, and blog posts
CREATE POLICY "Admins can manage products" 
ON public.products 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM admin_users 
  WHERE admin_users.user_id = auth.uid() 
  AND admin_users.is_active = true
));

CREATE POLICY "Admins can manage activities" 
ON public.activities 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM admin_users 
  WHERE admin_users.user_id = auth.uid() 
  AND admin_users.is_active = true
));

CREATE POLICY "Admins can manage events" 
ON public.events 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM admin_users 
  WHERE admin_users.user_id = auth.uid() 
  AND admin_users.is_active = true
));

CREATE POLICY "Admins can manage blog posts" 
ON public.blog_posts 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM admin_users 
  WHERE admin_users.user_id = auth.uid() 
  AND admin_users.is_active = true
));

-- Create storage bucket for admin uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES ('admin-uploads', 'admin-uploads', true)
ON CONFLICT (id) DO NOTHING;