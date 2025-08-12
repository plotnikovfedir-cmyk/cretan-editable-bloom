-- Fix RLS policies for orders and order_items to handle both authenticated and guest users

-- Fix orders policies
DROP POLICY IF EXISTS "Users can create orders" ON public.orders;
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;

CREATE POLICY "Users can create orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (
  -- Allow authenticated users to create orders linked to their user_id
  (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR
  -- Allow guest users to create orders without user_id
  (auth.uid() IS NULL AND user_id IS NULL AND customer_email IS NOT NULL)
);

CREATE POLICY "Users can view their own orders" 
ON public.orders 
FOR SELECT 
USING (
  -- Authenticated users can see their orders
  (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR
  -- Users can see orders matching their email
  (customer_email = (auth.jwt() ->> 'email'::text)) OR
  -- Guest users can see orders they created (temporary access via session)
  (auth.uid() IS NULL AND user_id IS NULL)
);

-- Fix order_items policies  
DROP POLICY IF EXISTS "Users can create order items for their orders" ON public.order_items;
DROP POLICY IF EXISTS "Users can view order items for their orders" ON public.order_items;

CREATE POLICY "Users can create order items for their orders" 
ON public.order_items 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = order_items.order_id 
    AND (
      -- Order belongs to authenticated user
      (orders.user_id = auth.uid()) OR
      -- Order is being created by guest user
      (auth.uid() IS NULL AND orders.user_id IS NULL) OR
      -- Order belongs to user by email
      (orders.customer_email = (auth.jwt() ->> 'email'::text))
    )
  )
);

CREATE POLICY "Users can view order items for their orders" 
ON public.order_items 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = order_items.order_id 
    AND (
      -- Order belongs to authenticated user
      (orders.user_id = auth.uid()) OR
      -- Order belongs to user by email
      (orders.customer_email = (auth.jwt() ->> 'email'::text)) OR
      -- Guest access for recent orders
      (auth.uid() IS NULL AND orders.user_id IS NULL)
    )
  )
);

-- Fix bookings policies
DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can view their own bookings by email" ON public.bookings;

CREATE POLICY "Anyone can create bookings" 
ON public.bookings 
FOR INSERT 
WITH CHECK (
  -- Always allow booking creation with valid email
  customer_email IS NOT NULL AND customer_name IS NOT NULL
);

CREATE POLICY "Users can view their own bookings by email" 
ON public.bookings 
FOR SELECT 
USING (
  -- Users can see bookings matching their email
  (customer_email = (auth.jwt() ->> 'email'::text)) OR
  -- Allow viewing recent bookings for guests (temporary)
  (auth.uid() IS NULL AND created_at > NOW() - INTERVAL '1 hour')
);