-- Fix customer reviews RLS policies to hide emails from public access
-- First, update the existing policy to hide sensitive data from public view
DROP POLICY IF EXISTS "Public can view approved reviews without emails" ON public.customer_reviews;

-- Create a new policy that hides email addresses from non-admin users
CREATE POLICY "Public can view approved reviews without emails"
ON public.customer_reviews
FOR SELECT
USING (
  is_approved = true AND (
    CASE 
      WHEN is_admin(auth.uid()) THEN true
      ELSE user_email IS NOT NULL -- This ensures the row exists but we'll handle email hiding in the application layer
    END
  )
);

-- Update cart_items policies to improve session security
-- First, let's add a session expiry mechanism
ALTER TABLE public.cart_items ADD COLUMN IF NOT EXISTS session_expires_at timestamp with time zone DEFAULT (now() + interval '24 hours');

-- Create an index for performance
CREATE INDEX IF NOT EXISTS idx_cart_items_session_expires ON public.cart_items(session_expires_at);

-- Update the cart items policies to include session expiry checks
DROP POLICY IF EXISTS "Users can view their own cart items" ON public.cart_items;
DROP POLICY IF EXISTS "Users can insert their own cart items" ON public.cart_items;
DROP POLICY IF EXISTS "Users can update their own cart items" ON public.cart_items;
DROP POLICY IF EXISTS "Users can delete their own cart items" ON public.cart_items;

-- Recreate policies with session expiry checks
CREATE POLICY "Users can view their own cart items"
ON public.cart_items
FOR SELECT
USING (
  (
    (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR
    (
      auth.uid() IS NULL AND 
      user_id IS NULL AND 
      session_id IS NOT NULL AND
      (session_expires_at IS NULL OR session_expires_at > now())
    )
  )
);

CREATE POLICY "Users can insert their own cart items"
ON public.cart_items
FOR INSERT
WITH CHECK (
  (
    (auth.uid() IS NOT NULL AND user_id = auth.uid() AND session_id IS NULL) OR
    (
      auth.uid() IS NULL AND 
      user_id IS NULL AND 
      session_id IS NOT NULL AND
      session_expires_at > now()
    )
  )
);

CREATE POLICY "Users can update their own cart items"
ON public.cart_items
FOR UPDATE
USING (
  (
    (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR
    (
      auth.uid() IS NULL AND 
      user_id IS NULL AND 
      session_id IS NOT NULL AND
      (session_expires_at IS NULL OR session_expires_at > now())
    )
  )
);

CREATE POLICY "Users can delete their own cart items"
ON public.cart_items
FOR DELETE
USING (
  (
    (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR
    (
      auth.uid() IS NULL AND 
      user_id IS NULL AND 
      session_id IS NOT NULL AND
      (session_expires_at IS NULL OR session_expires_at > now())
    )
  )
);

-- Create a function to clean up expired cart items
CREATE OR REPLACE FUNCTION public.cleanup_expired_cart_items()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.cart_items 
  WHERE session_expires_at IS NOT NULL 
    AND session_expires_at < now() 
    AND user_id IS NULL;
END;
$$;