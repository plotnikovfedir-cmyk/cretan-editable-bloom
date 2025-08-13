-- Add activity/event title to bookings table for better admin display
ALTER TABLE public.bookings 
ADD COLUMN activity_title text,
ADD COLUMN pickup_location text,
ADD COLUMN destination text;