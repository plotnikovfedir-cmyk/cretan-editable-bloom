-- Create island_tours table
CREATE TABLE public.island_tours (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  short_description TEXT,
  duration TEXT,
  group_size TEXT,
  price NUMERIC,
  location TEXT,
  highlights TEXT[],
  includes TEXT[],
  image_url TEXT,
  gallery_images TEXT[],
  is_active BOOLEAN NOT NULL DEFAULT true,
  order_position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create wine_tastings table  
CREATE TABLE public.wine_tastings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  short_description TEXT,
  duration TEXT,
  group_size TEXT,
  price NUMERIC,
  location TEXT,
  highlights TEXT[],
  wines TEXT[],
  image_url TEXT,
  gallery_images TEXT[],
  is_active BOOLEAN NOT NULL DEFAULT true,
  order_position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.island_tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wine_tastings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for island_tours
CREATE POLICY "Anyone can view active island tours"
  ON public.island_tours
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage island tours"
  ON public.island_tours
  FOR ALL
  USING (is_admin());

-- Create RLS policies for wine_tastings
CREATE POLICY "Anyone can view active wine tastings"
  ON public.wine_tastings
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage wine tastings"
  ON public.wine_tastings
  FOR ALL
  USING (is_admin());

-- Add triggers for updated_at columns
CREATE TRIGGER update_island_tours_updated_at
  BEFORE UPDATE ON public.island_tours
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_wine_tastings_updated_at
  BEFORE UPDATE ON public.wine_tastings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for island_tours
INSERT INTO public.island_tours (title, slug, description, short_description, duration, group_size, price, location, highlights, includes, image_url, order_position) VALUES
('Western Crete Adventure', 'western-crete-adventure', 'Discover the wild beauty of western Crete with pristine beaches, traditional villages, and stunning landscapes.', 'Explore pristine beaches and traditional villages in western Crete', 'Full Day (8-9 hours)', '2-8 people', 85, 'Western Crete', ARRAY['Balos Lagoon & Gramvousa Island', 'Falassarna Beach sunset', 'Traditional Cretan lunch', 'Local guide expertise'], ARRAY['Professional local guide', 'Comfortable transportation', 'Traditional Cretan meal', 'Entrance fees included', 'Photography stops'], '/placeholder.svg', 1),
('Southern Secrets Tour', 'southern-secrets-tour', 'Explore the hidden gems of southern Crete, from secluded beaches to ancient monasteries.', 'Uncover hidden gems and ancient monasteries of southern Crete', 'Full Day (7-8 hours)', '2-6 people', 75, 'Southern Crete', ARRAY['Preveli Beach & Palm Forest', 'Arkadi Monastery visit', 'Rethymno Old Town', 'Local wine tasting'], ARRAY['Expert local guide', 'Air-conditioned vehicle', 'Wine tasting session', 'Monastery entrance', 'Beach time & swimming'], '/placeholder.svg', 2),
('Eastern Expedition', 'eastern-expedition', 'Journey through eastern Crete''s diverse landscapes, from mountains to crystal-clear waters.', 'Adventure through diverse landscapes from mountains to crystal waters', 'Full Day (9 hours)', '2-10 people', 90, 'Eastern Crete', ARRAY['Spinalonga Island fortress', 'Elounda luxury coastal town', 'Agios Nikolaos & Lake Voulismeni', 'Traditional pottery workshop'], ARRAY['Boat trip to Spinalonga', 'Professional guide', 'Pottery workshop experience', 'Seafood lunch included', 'All transportation'], '/placeholder.svg', 3);

-- Insert sample data for wine_tastings  
INSERT INTO public.wine_tastings (title, slug, description, short_description, duration, group_size, price, location, highlights, wines, image_url, order_position) VALUES
('Traditional Winery Experience', 'traditional-winery-experience', 'Visit a family-owned winery and learn about traditional Cretan winemaking methods passed down through generations.', 'Experience traditional winemaking at a family-owned winery', '3-4 hours', '2-12 people', 45, 'Archanes Valley', ARRAY['5-wine tasting flight', 'Traditional winery tour', 'Meet the winemaker', 'Cheese & olive pairing', 'Vineyard walk'], ARRAY['Kotsifali (indigenous red)', 'Mandilaria (robust red)', 'Vilana (crisp white)', 'Thrapsathiri (aromatic white)', 'Liatiko (sweet dessert wine)'], '/placeholder.svg', 1),
('Vineyard Sunset Tasting', 'vineyard-sunset-tasting', 'Experience the magic of Cretan wines while watching the sunset over ancient vineyards in the Heraklion wine region.', 'Magical sunset wine tasting in ancient vineyards', '2-3 hours', '2-8 people', 35, 'Peza Wine Region', ARRAY['Golden hour timing', '4-wine selection', 'Local mezze platter', 'Vineyard photography', 'Sommelier insights'], ARRAY['Dafni (rare indigenous white)', 'Kotsifali rosé', 'Aged Mandilaria reserve', 'Malvasia Aromatica'], '/placeholder.svg', 2),
('Premium Cellar Experience', 'premium-cellar-experience', 'Exclusive tasting in historic wine cellars featuring premium aged wines and rare Cretan grape varieties.', 'Exclusive tasting in historic cellars with premium wines', '4-5 hours', '2-6 people', 75, 'Dafnes Village', ARRAY['Historic cellar tour', '7 premium wine tastings', 'Artisan cheese selection', 'Wine & food pairing lunch', 'Take home wine bottle'], ARRAY['20-year aged Kotsifali', 'Barrel-aged Vilana', 'Limited edition blends', 'Dessert wine collection', 'Vintage reserves', 'Organic selections', 'Amphora-aged wines'], '/placeholder.svg', 3);