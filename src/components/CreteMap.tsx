import { MapPin, Leaf, Mountain, Waves } from "lucide-react";
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import MapboxMap from './MapboxMap';

const CreteMap = () => {
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    try {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (data && !error) {
        setLocations(data);
      }
    } catch (err) {
      console.error('Error loading locations:', err);
    } finally {
      setLoading(false);
    }
  };

  const getMarkerColor = (type: string) => {
    switch(type) {
      case 'production': return '#059669';
      case 'farm': return '#7c3aed';
      default: return '#dc2626';
    }
  };

  const markers = locations.map(location => ({
    latitude: location.latitude,
    longitude: location.longitude,
    title: location.name,
    description: location.description,
    color: getMarkerColor(location.location_type)
  }));

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">
            Our Crete
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover where our authentic products come from across the beautiful island of Crete
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Real Interactive Mapbox Map of Crete */}
          <div className="relative">
            <MapboxMap
              latitude={35.2401}
              longitude={24.8093}
              zoom={9}
              markers={markers}
              height="500px"
              className="rounded-2xl shadow-2xl"
              style="mapbox://styles/mapbox/outdoors-v12"
            />
            
            {/* Island label overlay */}
            <div className="absolute bottom-6 right-6 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-border/50">
              <div className="text-foreground font-display font-bold text-lg">
                ΚΡΗΤΗ
                <div className="text-xs font-sans font-normal text-muted-foreground">CRETE</div>
              </div>
            </div>
            
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-2xl">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                  <p className="text-sm text-muted-foreground">Loading locations...</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Enhanced Legend */}
          <div className="mt-12 bg-background/60 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
            <h3 className="font-display font-semibold text-center mb-6 text-foreground">Production Regions</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: '#059669' }}>
                  <Mountain className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm text-muted-foreground">Production Facilities</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: '#7c3aed' }}>
                  <Leaf className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm text-muted-foreground">Farms & Groves</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: '#dc2626' }}>
                  <MapPin className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm text-muted-foreground">Other Locations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreteMap;