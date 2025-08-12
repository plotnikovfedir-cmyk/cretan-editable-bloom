-- Fix missing INSERT policy for order_items
CREATE POLICY "Users can create order items for their orders" 
ON public.order_items 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 
    FROM orders 
    WHERE orders.id = order_items.order_id 
    AND (
      orders.user_id = auth.uid() OR 
      orders.customer_email = (auth.jwt() ->> 'email'::text)
    )
  )
);