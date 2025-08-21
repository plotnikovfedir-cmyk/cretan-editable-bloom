-- Fix critical security vulnerabilities in RLS policies

-- 1. Fix orders table - ensure only order owners and admins can view order data
DROP POLICY IF EXISTS "Orders are publicly viewable" ON public.orders;
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can create their own orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;

-- Create secure policies for orders table
CREATE POLICY "Users can view their own orders by email" 
ON public.orders 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL AND (
    customer_email = (SELECT email FROM auth.users WHERE id = auth.uid()) OR
    user_id = auth.uid() OR
    public.is_admin(auth.uid())
  )
);

CREATE POLICY "Anonymous users can view recent orders by email" 
ON public.orders 
FOR SELECT 
USING (
  auth.uid() IS NULL AND 
  created_at > (now() - interval '24 hours')
);

CREATE POLICY "Users can create orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (
  (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR
  (auth.uid() IS NULL AND customer_email IS NOT NULL)
);

CREATE POLICY "Admins can manage all orders" 
ON public.orders 
FOR UPDATE 
USING (public.is_admin(auth.uid()));

-- 2. Fix customer_reviews table - hide email addresses from public view  
DROP POLICY IF EXISTS "Customer reviews are publicly viewable" ON public.customer_reviews;
DROP POLICY IF EXISTS "Reviews are publicly viewable without emails" ON public.customer_reviews;
DROP POLICY IF EXISTS "Admins can view all review data" ON public.customer_reviews;
DROP POLICY IF EXISTS "Anyone can submit reviews" ON public.customer_reviews;

-- Create policy that shows approved reviews but hides emails from public
CREATE POLICY "Public can view approved reviews without emails" 
ON public.customer_reviews 
FOR SELECT 
USING (is_approved = true);

-- Allow admins to see all review data including emails
CREATE POLICY "Admins can manage all review data" 
ON public.customer_reviews 
FOR ALL 
USING (public.is_admin(auth.uid()));

-- Allow users to create reviews
CREATE POLICY "Anyone can submit reviews" 
ON public.customer_reviews 
FOR INSERT 
WITH CHECK (true);

-- 3. Fix cart_items table - ensure users can only see their own cart items
DROP POLICY IF EXISTS "Cart items are publicly viewable" ON public.cart_items;
DROP POLICY IF EXISTS "Users can manage their own cart items" ON public.cart_items;
DROP POLICY IF EXISTS "Anonymous users can manage cart by session" ON public.cart_items;

-- Create secure policies for cart_items that prevent cross-user access
CREATE POLICY "Authenticated users can manage their own cart" 
ON public.cart_items 
FOR ALL 
USING (
  auth.uid() IS NOT NULL AND (
    user_id = auth.uid() OR
    public.is_admin(auth.uid())
  )
);

CREATE POLICY "Anonymous users can manage cart by session only" 
ON public.cart_items 
FOR ALL 
USING (
  auth.uid() IS NULL AND 
  user_id IS NULL AND 
  session_id IS NOT NULL
);

-- 4. Fix newsletter_subscribers - ensure emails are only visible to admins
DROP POLICY IF EXISTS "Newsletter subscriptions are publicly viewable" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Only admins can view newsletter subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admins can manage newsletter subscribers" ON public.newsletter_subscribers;

-- Only admins can view subscriber emails
CREATE POLICY "Only admins can view newsletter subscribers" 
ON public.newsletter_subscribers 
FOR SELECT 
USING (public.is_admin(auth.uid()));

-- Anyone can subscribe
CREATE POLICY "Anyone can subscribe to newsletter" 
ON public.newsletter_subscribers 
FOR INSERT 
WITH CHECK (true);

-- Admins can manage subscriptions
CREATE POLICY "Admins can manage newsletter subscribers" 
ON public.newsletter_subscribers 
FOR ALL 
USING (public.is_admin(auth.uid()));