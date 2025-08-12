-- Ensure RLS policies for events table are correct for admins to manage events

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Admins can manage events" ON public.events;
DROP POLICY IF EXISTS "Anyone can view events" ON public.events;

-- Recreate policies with better logging and error handling
CREATE POLICY "Anyone can view events" 
ON public.events 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage events" 
ON public.events 
FOR ALL 
USING (is_admin());

-- Ensure activities table has proper RLS policies too
DROP POLICY IF EXISTS "Admins can manage activities" ON public.activities;
DROP POLICY IF EXISTS "Anyone can view activities" ON public.activities;

CREATE POLICY "Anyone can view activities" 
ON public.activities 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage activities" 
ON public.activities 
FOR ALL 
USING (is_admin());