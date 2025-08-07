-- Create instagram_gallery table for "Follow Our Journey" section
CREATE TABLE public.instagram_gallery (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  caption TEXT,
  link_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  order_position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.instagram_gallery ENABLE ROW LEVEL SECURITY;

-- Create policies for instagram_gallery
CREATE POLICY "Anyone can view active gallery images" 
ON public.instagram_gallery 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage gallery images" 
ON public.instagram_gallery 
FOR ALL 
USING (public.is_admin());

-- Create testimonials table (different from customer_reviews)
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_location TEXT,
  customer_image_url TEXT,
  testimonial_text TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  order_position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Create policies for testimonials
CREATE POLICY "Anyone can view active testimonials" 
ON public.testimonials 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage testimonials" 
ON public.testimonials 
FOR ALL 
USING (public.is_admin());

-- Create settings table for global site settings
CREATE TABLE public.settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value TEXT,
  setting_type TEXT NOT NULL DEFAULT 'text', -- text, number, boolean, json, image
  description TEXT,
  category TEXT DEFAULT 'general',
  is_public BOOLEAN NOT NULL DEFAULT false, -- if true, can be accessed without admin
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Create policies for settings
CREATE POLICY "Anyone can view public settings" 
ON public.settings 
FOR SELECT 
USING (is_public = true);

CREATE POLICY "Admins can manage all settings" 
ON public.settings 
FOR ALL 
USING (public.is_admin());

-- Add triggers for updated_at columns
CREATE TRIGGER update_instagram_gallery_updated_at
BEFORE UPDATE ON public.instagram_gallery
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
BEFORE UPDATE ON public.testimonials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_settings_updated_at
BEFORE UPDATE ON public.settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some default settings
INSERT INTO public.settings (setting_key, setting_value, setting_type, description, category, is_public) VALUES
('site_title', 'Cretan Guru', 'text', 'Main site title', 'general', true),
('site_description', 'Discover the authentic flavors and hidden gems of Crete', 'text', 'Site meta description', 'general', true),
('contact_email', 'info@cretanguru.com', 'text', 'Main contact email', 'contact', true),
('contact_phone', '+30 123 456 7890', 'text', 'Main contact phone', 'contact', true),
('instagram_url', 'https://instagram.com/cretanguru', 'text', 'Instagram profile URL', 'social', true),
('facebook_url', 'https://facebook.com/cretanguru', 'text', 'Facebook page URL', 'social', true),
('telegram_chat_id', '@cretanguru', 'text', 'Telegram chat ID for bookings', 'contact', true);