-- Fix critical security issue: Newsletter subscribers table should not be publicly readable
-- Remove the public read policy and allow only admins to view subscriber emails

-- Drop the existing public read policy
DROP POLICY IF EXISTS "Users can view their own subscription" ON public.newsletter_subscribers;

-- Create new policy allowing only admins to view newsletter subscribers
CREATE POLICY "Only admins can view newsletter subscribers" 
ON public.newsletter_subscribers 
FOR SELECT 
USING (is_admin());

-- Keep the insert policy for new subscriptions
-- The existing "Anyone can subscribe to newsletter" policy remains unchanged

-- Add policy for admins to manage newsletter subscribers
CREATE POLICY "Admins can manage newsletter subscribers" 
ON public.newsletter_subscribers 
FOR ALL 
USING (is_admin());

-- Fix storage policies for image uploads in CMS
-- Create comprehensive storage policies for the admin-uploads bucket

-- Allow admins to upload files
CREATE POLICY "Admins can upload files"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'admin-uploads' 
  AND is_admin()
);

-- Allow admins to view files
CREATE POLICY "Admins can view files"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'admin-uploads' 
  AND is_admin()
);

-- Allow admins to update files
CREATE POLICY "Admins can update files"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'admin-uploads' 
  AND is_admin()
);

-- Allow admins to delete files
CREATE POLICY "Admins can delete files"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'admin-uploads' 
  AND is_admin()
);

-- Allow public access to view uploaded images (for website display)
CREATE POLICY "Public can view admin uploaded images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'admin-uploads');