-- Add default settings for improved admin configuration
INSERT INTO public.settings (setting_key, setting_value, setting_type, category, description, is_public) 
VALUES 
  ('site_name', 'Cretan Guru', 'text', 'general', 'Site name displayed in header', true),
  ('site_description', 'Discover authentic Crete experiences', 'textarea', 'general', 'Site description for meta tags', true),
  ('contact_email', 'info@cretanguru.com', 'email', 'general', 'Main contact email', true),
  ('contact_phone', '+30 694 123 4567', 'text', 'general', 'Contact phone number', true),
  ('google_analytics_id', '', 'text', 'seo', 'Google Analytics tracking ID', false),
  ('meta_title_suffix', ' - Cretan Guru', 'text', 'seo', 'Default suffix for page titles', true),
  ('default_meta_description', 'Discover the authentic beauty of Crete with our local tours, activities, and products', 'textarea', 'seo', 'Default meta description', true),
  ('currency', 'EUR', 'select', 'payments', 'Default currency', true),
  ('tax_rate', '0.24', 'number', 'payments', 'Tax rate (0.24 = 24%)', true),
  ('posts_per_page', '6', 'number', 'blog', 'Number of posts per page', true),
  ('enable_comments', 'false', 'boolean', 'blog', 'Enable comments on blog posts', true)
ON CONFLICT (setting_key) DO NOTHING;