-- Add image storage table for website assets
CREATE TABLE public.website_images (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  filename text NOT NULL,
  original_path text NOT NULL,
  public_url text NOT NULL,
  alt_text text,
  usage_type text NOT NULL DEFAULT 'general', -- hero, product, activity, background, etc.
  is_active boolean NOT NULL DEFAULT true,
  file_size bigint,
  mime_type text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on website_images table
ALTER TABLE public.website_images ENABLE ROW LEVEL SECURITY;

-- Create policies for website_images
CREATE POLICY "Anyone can view active images" 
ON public.website_images 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage images" 
ON public.website_images 
FOR ALL 
USING (is_admin());

-- Insert existing images into the database
INSERT INTO public.website_images (filename, original_path, public_url, alt_text, usage_type) VALUES
('hero-bg.jpg', 'src/assets/hero-bg.jpg', '/src/assets/hero-bg.jpg', 'Hero background image', 'hero'),
('crete-island.jpg', 'src/assets/crete-island.jpg', '/src/assets/crete-island.jpg', 'Crete island aerial view', 'background'),
('olive-oil-product.jpg', 'src/assets/olive-oil-product.jpg', '/src/assets/olive-oil-product.jpg', 'Premium olive oil bottle', 'product'),
('herbs-product.jpg', 'src/assets/herbs-product.jpg', '/src/assets/herbs-product.jpg', 'Organic herbs collection', 'product'),
('delivery-hero.jpg', 'src/assets/delivery-hero.jpg', '/src/assets/delivery-hero.jpg', 'Delivery service hero image', 'hero'),
('delivery-service.jpg', 'src/assets/delivery-service.jpg', '/src/assets/delivery-service.jpg', 'Professional delivery service', 'service'),
('taxi-service.jpg', 'src/assets/taxi-service.jpg', '/src/assets/taxi-service.jpg', 'Taxi service in Crete', 'service'),
('activities-service.jpg', 'src/assets/activities-service.jpg', '/src/assets/activities-service.jpg', 'Adventure activities', 'service'),
('events-service.jpg', 'src/assets/events-service.jpg', '/src/assets/events-service.jpg', 'Cultural events', 'service'),
('boat-trip.jpg', 'src/assets/boat-trip.jpg', '/src/assets/boat-trip.jpg', 'Boat trip activity', 'activity'),
('foraging-activity.jpg', 'src/assets/foraging-activity.jpg', '/src/assets/foraging-activity.jpg', 'Wild foraging experience', 'activity'),
('tasting-activity.jpg', 'src/assets/tasting-activity.jpg', '/src/assets/tasting-activity.jpg', 'Olive oil tasting', 'activity'),
('sunset-bbq.jpg', 'src/assets/sunset-bbq.jpg', '/src/assets/sunset-bbq.jpg', 'Sunset BBQ event', 'activity'),
('music-night.jpg', 'src/assets/music-night.jpg', '/src/assets/music-night.jpg', 'Traditional music night', 'activity'),
('picnic-box.jpg', 'src/assets/picnic-box.jpg', '/src/assets/picnic-box.jpg', 'Gourmet picnic box', 'product'),
('agios-pavlos-beach.jpg', 'src/assets/agios-pavlos-beach.jpg', '/src/assets/agios-pavlos-beach.jpg', 'Agios Pavlos beach', 'location'),
('ammoudi-beach.jpg', 'src/assets/ammoudi-beach.jpg', '/src/assets/ammoudi-beach.jpg', 'Ammoudi beach', 'location'),
('monastery-beach.jpg', 'src/assets/monastery-beach.jpg', '/src/assets/monastery-beach.jpg', 'Monastery beach', 'location'),
('preveli-beach.jpg', 'src/assets/preveli-beach.jpg', '/src/assets/preveli-beach.jpg', 'Preveli beach', 'location'),
('schinaria-beach.jpg', 'src/assets/schinaria-beach.jpg', '/src/assets/schinaria-beach.jpg', 'Schinaria beach', 'location'),
('triopetra-beach.jpg', 'src/assets/triopetra-beach.jpg', '/src/assets/triopetra-beach.jpg', 'Triopetra beach', 'location');

-- Create trigger for updating timestamps
CREATE TRIGGER update_website_images_updated_at
BEFORE UPDATE ON public.website_images
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();