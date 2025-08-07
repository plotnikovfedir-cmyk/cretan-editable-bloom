-- Add coordinates to products table
ALTER TABLE public.products 
ADD COLUMN latitude numeric,
ADD COLUMN longitude numeric;

-- Create locations table for managing map locations
CREATE TABLE public.locations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  latitude numeric NOT NULL,
  longitude numeric NOT NULL,
  location_type text NOT NULL DEFAULT 'production', -- production, office, farm, etc.
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on locations table
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;

-- Create policies for locations
CREATE POLICY "Anyone can view active locations" 
ON public.locations 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage locations" 
ON public.locations 
FOR ALL 
USING (is_admin());

-- Add map settings to settings table
INSERT INTO public.settings (setting_key, setting_value, setting_type, category, description, is_public) VALUES
('mapbox_default_style', 'mapbox://styles/mapbox/outdoors-v12', 'text', 'map', 'Default Mapbox map style', true),
('mapbox_zoom_level', '10', 'number', 'map', 'Default zoom level for maps', true),
('mapbox_center_lat', '35.2401', 'number', 'map', 'Default center latitude for Crete', true),
('mapbox_center_lng', '24.8093', 'number', 'map', 'Default center longitude for Crete', true);

-- Insert real Crete locations
INSERT INTO public.locations (name, description, latitude, longitude, location_type) VALUES
('Rethymno Production', 'Main production facility in Rethymno', 35.3662, 24.4747, 'production'),
('Chania Olive Groves', 'Premium olive groves in Chania region', 35.5138, 24.0180, 'farm'),
('Heraklion Processing Center', 'Modern processing and packaging facility', 35.3387, 25.1442, 'production'),
('Agios Nikolaos Herb Gardens', 'Organic herb cultivation facility', 35.1908, 25.7205, 'farm'),
('Archanes Vineyard', 'Traditional vineyard in Archanes', 35.2480, 25.1675, 'farm'),
('Ierapetra Greenhouses', 'Modern greenhouse complex', 35.0103, 25.7393, 'farm');

-- Create trigger for updating timestamps
CREATE TRIGGER update_locations_updated_at
BEFORE UPDATE ON public.locations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();