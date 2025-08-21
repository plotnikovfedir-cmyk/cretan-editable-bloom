-- Add page_type field to hero_slides table to support different pages
ALTER TABLE public.hero_slides 
ADD COLUMN page_type text DEFAULT 'home' NOT NULL;

-- Add index for better performance
CREATE INDEX idx_hero_slides_page_type_active ON public.hero_slides(page_type, is_active) WHERE is_active = true;

-- Update RLS policy to allow admins to manage hero slides
DROP POLICY IF EXISTS "Anyone can view active hero slides" ON public.hero_slides;

CREATE POLICY "Anyone can view active hero slides" 
ON public.hero_slides 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage hero slides" 
ON public.hero_slides 
FOR ALL 
USING (is_admin());