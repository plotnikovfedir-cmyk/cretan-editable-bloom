-- Fix INSERT policy for orders table to allow guest orders
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;

CREATE POLICY "Users can create orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (
  -- Authenticated users can create orders for themselves
  (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR
  -- Guest users can create orders without user_id
  (auth.uid() IS NULL AND user_id IS NULL)
);