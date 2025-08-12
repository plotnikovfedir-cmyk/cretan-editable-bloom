-- Fix cart_items RLS policy to be more permissive for legitimate operations
DROP POLICY IF EXISTS "Authenticated users can manage their own cart" ON public.cart_items;

-- Create separate policies for better control
CREATE POLICY "Users can view their own cart items" 
ON public.cart_items 
FOR SELECT 
USING (
  (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR
  (auth.uid() IS NULL AND user_id IS NULL AND session_id IS NOT NULL)
);

CREATE POLICY "Users can insert their own cart items" 
ON public.cart_items 
FOR INSERT 
WITH CHECK (
  (auth.uid() IS NOT NULL AND user_id = auth.uid() AND session_id IS NULL) OR
  (auth.uid() IS NULL AND user_id IS NULL AND session_id IS NOT NULL)
);

CREATE POLICY "Users can update their own cart items" 
ON public.cart_items 
FOR UPDATE 
USING (
  (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR
  (auth.uid() IS NULL AND user_id IS NULL AND session_id IS NOT NULL)
);

CREATE POLICY "Users can delete their own cart items" 
ON public.cart_items 
FOR DELETE 
USING (
  (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR
  (auth.uid() IS NULL AND user_id IS NULL AND session_id IS NOT NULL)
);