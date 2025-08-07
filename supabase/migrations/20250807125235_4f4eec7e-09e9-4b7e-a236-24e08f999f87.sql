-- Create an admin user in the admin_users table
-- First, we need to insert a user into auth.users table (this would normally be done through signup)
-- For demo purposes, we'll create an admin user record that can be linked later

-- Insert admin user record (you'll need to replace the user_id with actual UUID after creating auth user)
INSERT INTO public.admin_users (user_id, role, is_active) 
VALUES ('00000000-0000-0000-0000-000000000000', 'admin', true)
ON CONFLICT (user_id) DO NOTHING;

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