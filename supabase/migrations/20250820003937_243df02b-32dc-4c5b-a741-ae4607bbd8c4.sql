-- Create tables for dynamic Activity and Event content management

-- Activity schedule items table
CREATE TABLE public.activity_schedule_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  activity_id UUID NOT NULL,
  item_text TEXT NOT NULL,
  order_position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Activity includes items table  
CREATE TABLE public.activity_includes_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  activity_id UUID NOT NULL,
  item_text TEXT NOT NULL,
  order_position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Activity highlights items table
CREATE TABLE public.activity_highlights_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  activity_id UUID NOT NULL,
  item_text TEXT NOT NULL,
  order_position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Event schedule items table
CREATE TABLE public.event_schedule_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL,
  item_text TEXT NOT NULL,
  order_position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Event includes items table
CREATE TABLE public.event_includes_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL,
  item_text TEXT NOT NULL,
  order_position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Event highlights items table
CREATE TABLE public.event_highlights_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL,
  item_text TEXT NOT NULL,
  order_position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.activity_schedule_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_includes_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_highlights_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_schedule_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_includes_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_highlights_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public read access and admin management
CREATE POLICY "Anyone can view activity schedule items" ON public.activity_schedule_items FOR SELECT USING (true);
CREATE POLICY "Admins can manage activity schedule items" ON public.activity_schedule_items FOR ALL USING (is_admin());

CREATE POLICY "Anyone can view activity includes items" ON public.activity_includes_items FOR SELECT USING (true);
CREATE POLICY "Admins can manage activity includes items" ON public.activity_includes_items FOR ALL USING (is_admin());

CREATE POLICY "Anyone can view activity highlights items" ON public.activity_highlights_items FOR SELECT USING (true);
CREATE POLICY "Admins can manage activity highlights items" ON public.activity_highlights_items FOR ALL USING (is_admin());

CREATE POLICY "Anyone can view event schedule items" ON public.event_schedule_items FOR SELECT USING (true);
CREATE POLICY "Admins can manage event schedule items" ON public.event_schedule_items FOR ALL USING (is_admin());

CREATE POLICY "Anyone can view event includes items" ON public.event_includes_items FOR SELECT USING (true);
CREATE POLICY "Admins can manage event includes items" ON public.event_includes_items FOR ALL USING (is_admin());

CREATE POLICY "Anyone can view event highlights items" ON public.event_highlights_items FOR SELECT USING (true);
CREATE POLICY "Admins can manage event highlights items" ON public.event_highlights_items FOR ALL USING (is_admin());

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_activity_schedule_items_updated_at
BEFORE UPDATE ON public.activity_schedule_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_activity_includes_items_updated_at
BEFORE UPDATE ON public.activity_includes_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_activity_highlights_items_updated_at
BEFORE UPDATE ON public.activity_highlights_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_event_schedule_items_updated_at
BEFORE UPDATE ON public.event_schedule_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_event_includes_items_updated_at
BEFORE UPDATE ON public.event_includes_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_event_highlights_items_updated_at
BEFORE UPDATE ON public.event_highlights_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();