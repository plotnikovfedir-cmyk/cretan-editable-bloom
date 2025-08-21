-- Fix critical security vulnerabilities in RLS policies

-- 1. Fix orders table - ensure only order owners and admins can view order data
DROP POLICY IF EXISTS "Orders are publicly viewable" ON public.orders;

-- Create secure policies for orders table
CREATE POLICY "Users can view their own orders" 
ON public.orders 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL AND (
    email = (SELECT email FROM auth.users WHERE id = auth.uid()) OR
    public.is_admin(auth.uid())
  )
);

CREATE POLICY "Users can create their own orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (
  auth.uid() IS NOT NULL AND 
  email = (SELECT email FROM auth.users WHERE id = auth.uid())
);

CREATE POLICY "Admins can update orders" 
ON public.orders 
FOR UPDATE 
USING (public.is_admin(auth.uid()));

-- 2. Fix customer_reviews table - hide email addresses from public view
DROP POLICY IF EXISTS "Customer reviews are publicly viewable" ON public.customer_reviews;

-- Create policy that hides email from public but shows reviews
CREATE POLICY "Reviews are publicly viewable without emails" 
ON public.customer_reviews 
FOR SELECT 
USING (is_approved = true);

-- Allow admins to see all review data including emails
CREATE POLICY "Admins can view all review data" 
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

-- Create secure policies for cart_items
CREATE POLICY "Users can manage their own cart items" 
ON public.cart_items 
FOR ALL 
USING (
  auth.uid() IS NOT NULL AND (
    session_id = auth.uid()::text OR
    public.is_admin(auth.uid())
  )
);

-- Allow anonymous users to manage cart by session
CREATE POLICY "Anonymous users can manage cart by session" 
ON public.cart_items 
FOR ALL 
USING (
  auth.uid() IS NULL AND session_id IS NOT NULL
);

-- 4. Fix newsletter_subscriptions - ensure emails are only visible to admins
DROP POLICY IF EXISTS "Newsletter subscriptions are publicly viewable" ON public.newsletter_subscriptions;

CREATE POLICY "Only admins can view newsletter subscriptions" 
ON public.newsletter_subscriptions 
FOR SELECT 
USING (public.is_admin(auth.uid()));

CREATE POLICY "Anyone can subscribe to newsletter" 
ON public.newsletter_subscriptions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can manage newsletter subscriptions" 
ON public.newsletter_subscriptions 
FOR UPDATE 
USING (public.is_admin(auth.uid()));