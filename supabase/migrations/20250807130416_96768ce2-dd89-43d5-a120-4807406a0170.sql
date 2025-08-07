-- Fix infinite recursion in admin_users RLS policies
-- First, drop existing problematic policies
DROP POLICY IF EXISTS "Admins can view admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can manage admin users" ON public.admin_users;

-- Create security definer function to check admin status without recursion
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE admin_users.user_id = is_admin.user_id 
    AND admin_users.is_active = true
  );
$$;

-- Create simple RLS policies for admin_users using the security definer function
CREATE POLICY "Users can view their own admin status" 
ON public.admin_users 
FOR SELECT 
USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all admin users" 
ON public.admin_users 
FOR ALL 
USING (public.is_admin());

-- Clear existing admin user data and recreate properly
DELETE FROM public.admin_users WHERE user_id = 'acd9cabd-35cf-40de-a0e6-5425aed7bb7a';

-- Insert the admin user with correct structure
INSERT INTO public.admin_users (user_id, is_active, created_at) 
VALUES ('acd9cabd-35cf-40de-a0e6-5425aed7bb7a', true, now());

-- Update existing policies to use the new is_admin function
DROP POLICY IF EXISTS "Admins can manage products" ON public.products;
DROP POLICY IF EXISTS "Admins can manage activities" ON public.activities; 
DROP POLICY IF EXISTS "Admins can manage events" ON public.events;
DROP POLICY IF EXISTS "Admins can manage blog posts" ON public.blog_posts;

CREATE POLICY "Admins can manage products" 
ON public.products 
FOR ALL 
USING (public.is_admin());

CREATE POLICY "Admins can manage activities" 
ON public.activities 
FOR ALL 
USING (public.is_admin());

CREATE POLICY "Admins can manage events" 
ON public.events 
FOR ALL 
USING (public.is_admin());

CREATE POLICY "Admins can manage blog posts" 
ON public.blog_posts 
FOR ALL 
USING (public.is_admin());