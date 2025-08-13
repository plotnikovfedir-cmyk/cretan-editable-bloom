-- Update activities to use null image_url so fallback images work
UPDATE activities 
SET image_url = NULL 
WHERE image_url = '/api/placeholder/600/400';

-- Update events to use null image_url so fallback images work  
UPDATE events 
SET image_url = NULL 
WHERE image_url = '/api/placeholder/600/400';

-- Let's also set proper image URLs for activities using asset images
UPDATE activities 
SET image_url = CASE 
  WHEN slug = 'olive-oil-tasting-experience' THEN '/src/assets/tasting-activity.jpg'
  WHEN slug = 'wild-herb-foraging-tour' THEN '/src/assets/foraging-activity.jpg'
  WHEN slug = 'sunset-mountain-hike' THEN '/src/assets/tasting-activity.jpg'
  ELSE NULL
END;

-- Set proper image URLs for events
UPDATE events 
SET image_url = CASE 
  WHEN slug LIKE '%music%' OR title LIKE '%Music%' THEN '/src/assets/music-night.jpg'
  WHEN slug LIKE '%bbq%' OR title LIKE '%BBQ%' OR title LIKE '%Beach%' THEN '/src/assets/sunset-bbq.jpg'
  WHEN slug LIKE '%festival%' OR title LIKE '%Festival%' THEN '/src/assets/music-night.jpg'
  ELSE NULL
END;