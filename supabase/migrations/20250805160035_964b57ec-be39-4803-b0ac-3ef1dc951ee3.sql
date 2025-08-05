-- Insert sample blog categories
INSERT INTO public.blog_categories (name, slug, description) VALUES
('Travel Tips', 'travel-tips', 'Essential tips for exploring Crete'),
('Local Culture', 'local-culture', 'Discover authentic Cretan traditions'),
('Food & Recipes', 'food-recipes', 'Traditional Cretan cuisine and recipes'),
('Activities', 'activities', 'Outdoor adventures and experiences');

-- Insert sample blog tags
INSERT INTO public.blog_tags (name, slug) VALUES
('Olive Oil', 'olive-oil'),
('Herbs', 'herbs'),
('Tourism', 'tourism'),
('Culture', 'culture'),
('Food', 'food'),
('Adventure', 'adventure');

-- Insert sample blog posts
INSERT INTO public.blog_posts (title, slug, content, excerpt, featured_image_url, is_published, read_time_minutes, published_at, author_name, meta_description, meta_keywords) VALUES
('The Ultimate Guide to Cretan Olive Oil', 'ultimate-guide-cretan-olive-oil', 
'<p>Discover the secrets behind Crete''s world-renowned olive oil. From ancient groves to modern production methods, learn what makes Cretan olive oil truly special...</p><p>Crete has been producing olive oil for over 4,000 years. The island''s unique climate and soil conditions create the perfect environment for olive cultivation...</p>',
'Discover the secrets behind Crete''s world-renowned olive oil and learn what makes it truly special.',
'/api/placeholder/800/400',
true, 8, NOW() - INTERVAL '2 days', 'Maria Konstantinaki', 
'Learn about authentic Cretan olive oil production, history, and health benefits in this comprehensive guide.',
ARRAY['olive oil', 'crete', 'mediterranean', 'health']),

('Wild Herbs of Crete: A Forager''s Paradise', 'wild-herbs-crete-foragers-paradise',
'<p>Crete is home to over 200 endemic plant species. Join us on a journey through the island''s mountains and valleys to discover the medicinal and culinary treasures that grow wild...</p><p>From dittany to sage, these herbs have been used for centuries by locals for both cooking and healing...</p>',
'Explore the rich world of Cretan wild herbs and their traditional uses in medicine and cuisine.',
'/api/placeholder/800/400',
true, 6, NOW() - INTERVAL '5 days', 'Nikos Papadakis',
'Discover the wild herbs of Crete, their traditional uses, and where to find them on the island.',
ARRAY['herbs', 'foraging', 'crete', 'traditional medicine']),

('Best Hidden Beaches in Crete', 'best-hidden-beaches-crete',
'<p>Beyond the popular tourist destinations, Crete hides countless secluded beaches waiting to be discovered. Here are our top picks for the most beautiful hidden gems...</p><p>From the pink sands of Elafonisi to the wild beauty of Seitan Limania, each beach offers a unique experience...</p>',
'Discover Crete''s most beautiful hidden beaches away from the crowds.',
'/api/placeholder/800/400',
true, 5, NOW() - INTERVAL '1 week', 'Elena Markou',
'Find the best hidden beaches in Crete with our insider guide to secluded paradises.',
ARRAY['beaches', 'crete', 'travel', 'hidden gems']);

-- Insert sample hero slides
INSERT INTO public.hero_slides (title, subtitle, image_url, cta_text, cta_link, order_position, is_active) VALUES
('Discover Authentic Crete', 'Premium olive oils, wild herbs, and unforgettable experiences await you', '/api/placeholder/1920/1080', 'Explore Products', '/products', 1, true),
('Wild Herbs & Nature Tours', 'Join our foraging expeditions and learn about Crete''s medicinal plants', '/api/placeholder/1920/1080', 'Book Tour', '/activities', 2, true),
('Taste the Mediterranean', 'From our groves to your table - experience the finest Cretan flavors', '/api/placeholder/1920/1080', 'Shop Now', '/products', 3, true);

-- Insert sample products
INSERT INTO public.products (name, slug, description, price, category, image_url, in_stock) VALUES
('Extra Virgin Olive Oil - Premium', 'extra-virgin-olive-oil-premium',
'Our finest cold-pressed olive oil from centuries-old groves in the mountains of Crete. Rich in antioxidants and bursting with flavor.',
24.99, 'Olive Oil', '/api/placeholder/400/300', true),

('Wild Mountain Herbs Mix', 'wild-mountain-herbs-mix',
'A carefully curated blend of wild herbs hand-picked from Crete''s mountains. Perfect for teas, cooking, and natural remedies.',
16.50, 'Herbs', '/api/placeholder/400/300', true),

('Cretan Honey - Thyme Blossom', 'cretan-honey-thyme-blossom',
'Pure thyme honey harvested from the wild thyme that covers Crete''s hillsides. Known for its distinctive aroma and therapeutic properties.',
18.99, 'Honey', '/api/placeholder/400/300', true),

('Dittany of Crete - Dried', 'dittany-crete-dried',
'The legendary herb of Crete, known since ancient times for its healing properties. Hand-picked from the White Mountains.',
28.00, 'Herbs', '/api/placeholder/400/300', true),

('Organic Olive Oil Soap', 'organic-olive-oil-soap',
'Handmade soap crafted with our premium olive oil. Gentle on skin and enriched with natural Cretan herbs.',
8.50, 'Cosmetics', '/api/placeholder/400/300', true);

-- Insert sample activities
INSERT INTO public.activities (title, slug, short_description, description, price, duration, max_participants, difficulty, image_url, gallery_images) VALUES
('Wild Herb Foraging Tour', 'wild-herb-foraging-tour',
'Discover and harvest wild herbs in the Cretan mountains with our expert guides.',
'Join our experienced botanist guides for an unforgettable journey through Crete''s mountains to discover and learn about wild herbs. You''ll learn to identify medicinal plants, understand their traditional uses, and enjoy a traditional Cretan lunch prepared with foraged ingredients. Perfect for nature lovers and those interested in traditional medicine.',
45.00, '4 hours', 12, 'Easy', '/api/placeholder/600/400',
ARRAY['/api/placeholder/600/400', '/api/placeholder/600/400', '/api/placeholder/600/400']),

('Olive Oil Tasting Experience', 'olive-oil-tasting-experience',
'Learn about olive oil production and taste premium varieties from local producers.',
'Immerse yourself in the world of Cretan olive oil with this comprehensive tasting experience. Visit traditional olive groves, learn about harvesting and pressing techniques, and taste different varieties while learning to identify quality indicators. Includes visit to a family-run mill and traditional Cretan meze.',
38.00, '3 hours', 15, 'Easy', '/api/placeholder/600/400',
ARRAY['/api/placeholder/600/400', '/api/placeholder/600/400', '/api/placeholder/600/400']),

('Sunset Mountain Hike', 'sunset-mountain-hike',
'Experience breathtaking sunset views from Crete''s mountain peaks.',
'Hike through scenic mountain trails to reach spectacular viewpoints for the perfect Cretan sunset. Our guides will share stories about local flora, fauna, and legends while you enjoy panoramic views over the Libyan Sea. Includes light refreshments and traditional raki tasting.',
32.00, '3.5 hours', 10, 'Moderate', '/api/placeholder/600/400',
ARRAY['/api/placeholder/600/400', '/api/placeholder/600/400', '/api/placeholder/600/400']);

-- Insert sample events
INSERT INTO public.events (title, slug, description, short_description, event_date, location, price, max_attendees, image_url) VALUES
('Traditional Music Night', 'traditional-music-night',
'Experience authentic Cretan music and dance in a traditional taverna setting. Local musicians will perform traditional songs while you enjoy Cretan cuisine and local wine. Learn basic dance steps and immerse yourself in the island''s rich cultural heritage.',
'Authentic Cretan music and dance evening with traditional food and drinks.',
NOW() + INTERVAL '1 week', 'Traditional Taverna, Chania Old Town', 35.00, 40, '/api/placeholder/600/400'),

('Harvest Festival Celebration', 'harvest-festival-celebration',
'Join locals in celebrating the annual olive harvest with traditional festivities, food tastings, live music, and cultural demonstrations. Participate in olive picking, oil pressing demonstrations, and enjoy a feast prepared by local families.',
'Celebrate the olive harvest with locals - traditional festivities and authentic experiences.',
NOW() + INTERVAL '2 weeks', 'Mountain Village of Archanes', 28.00, 60, '/api/placeholder/600/400'),

('Full Moon Beach BBQ', 'full-moon-beach-bbq',
'A magical evening under the full moon with fresh seafood BBQ, local wine, and traditional music on a secluded beach. Swimming and stargazing included. Transportation from major hotels provided.',
'Magical full moon beach BBQ with fresh seafood, wine, and traditional music.',
NOW() + INTERVAL '3 weeks', 'Secret Beach, South Coast', 42.00, 25, '/api/placeholder/600/400');