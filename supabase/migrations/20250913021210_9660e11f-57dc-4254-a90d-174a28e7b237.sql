-- Remove default value and convert to enum
ALTER TABLE locations ALTER COLUMN location_type DROP DEFAULT;

-- Create location_type enum and update existing table
CREATE TYPE location_type AS ENUM (
  'production',
  'farm', 
  'beaches',
  'canyons',
  'monasteries',
  'villages',
  'viewpoints',
  'caves'
);

-- Update the locations table to use the new enum
ALTER TABLE locations ALTER COLUMN location_type TYPE location_type USING location_type::location_type;

-- Insert some sample locations for the new categories
INSERT INTO locations (name, description, latitude, longitude, location_type, is_active) VALUES
  ('Balos Beach', 'Famous lagoon with turquoise waters and white sand', 35.5944, 23.5914, 'beaches', true),
  ('Elafonissi Beach', 'Pink sand beach with crystal clear waters', 35.2722, 23.5394, 'beaches', true),
  ('Samaria Gorge', 'The longest gorge in Europe, UNESCO Biosphere Reserve', 35.3089, 23.9608, 'canyons', true),
  ('Imbros Gorge', 'Beautiful narrow gorge with dramatic limestone walls', 35.2547, 24.1342, 'canyons', true),
  ('Arkadi Monastery', 'Historic monastery symbol of Cretan resistance', 35.3131, 24.6331, 'monasteries', true),
  ('Preveli Monastery', 'Seaside monastery with palm forest beach', 35.1642, 24.4775, 'monasteries', true),
  ('Chania Old Town', 'Venetian harbor town with stunning architecture', 35.5138, 24.0180, 'villages', true),
  ('Rethymno Old Town', 'Medieval town with Venetian and Ottoman architecture', 35.3713, 24.4739, 'villages', true),
  ('Falassarna Sunset Point', 'Best sunset viewpoint in western Crete', 35.4986, 23.5647, 'viewpoints', true),
  ('Spinalonga Fortress', 'Venetian fortress on small island', 35.2908, 25.7408, 'viewpoints', true),
  ('Dikteon Cave', 'Birthplace of Zeus according to mythology', 35.1647, 25.4486, 'caves', true),
  ('Melidoni Cave', 'Historic cave with impressive stalactites', 35.3019, 24.8775, 'caves', true);