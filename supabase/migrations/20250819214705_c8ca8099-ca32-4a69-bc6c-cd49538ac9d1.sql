-- Add missing RLS policies for bookings table to allow admin management
CREATE POLICY "Admins can manage bookings" 
ON public.bookings 
FOR ALL 
USING (is_admin());

-- Also make sure admins can update and delete order_items
DROP POLICY IF EXISTS "Admins can manage all order items" ON public.order_items;
CREATE POLICY "Admins can manage all order items" 
ON public.order_items 
FOR ALL 
USING (is_admin());