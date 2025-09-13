import { MapPin, Leaf, Mountain, Waves, Church, Building, Eye, Gem } from "lucide-react";
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import MapboxMap from './MapboxMap';
import LocationFilter from './LocationFilter';

const CreteMap = () => {
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    'beaches', 'canyons', 'monasteries', 'villages', 'viewpoints', 'caves', 'production', 'farm'
  ]);

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
      case 'beaches': return '#0ea5e9';
      case 'canyons': return '#f59e0b';
      case 'monasteries': return '#8b5cf6';
      case 'villages': return '#f97316';
      case 'viewpoints': return '#06b6d4';
      case 'caves': return '#64748b';
      case 'production': return '#059669';
      case 'farm': return '#7c3aed';
      default: return '#dc2626';
    }
  };

  const getMarkerIcon = (type: string) => {
    switch(type) {
      case 'beaches': return Waves;
      case 'canyons': return Mountain;
      case 'monasteries': return Church;
      case 'villages': return Building;
      case 'viewpoints': return Eye;
      case 'caves': return Gem;
      case 'production': return Mountain;
      case 'farm': return Leaf;
      default: return MapPin;
    }
  };

  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const filteredLocations = locations.filter(location => 
    selectedTypes.includes(location.location_type)
  );

  const markers = filteredLocations.map(location => ({
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
          {/* Location Filter */}
          <div className="mb-8">
            <LocationFilter 
              selectedTypes={selectedTypes}
              onTypeToggle={handleTypeToggle}
            />
          </div>

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
            <h3 className="font-display font-semibold text-center mb-6 text-foreground">
              Location Legend ({filteredLocations.length} of {locations.length} shown)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { type: 'beaches', label: 'Beaches', icon: Waves, color: '#0ea5e9' },
                { type: 'canyons', label: 'Canyons', icon: Mountain, color: '#f59e0b' },
                { type: 'monasteries', label: 'Monasteries', icon: Church, color: '#8b5cf6' },
                { type: 'villages', label: 'Villages', icon: Building, color: '#f97316' },
                { type: 'viewpoints', label: 'Viewpoints', icon: Eye, color: '#06b6d4' },
                { type: 'caves', label: 'Caves', icon: Gem, color: '#64748b' },
                { type: 'production', label: 'Production', icon: Mountain, color: '#059669' },
                { type: 'farm', label: 'Farms', icon: Leaf, color: '#7c3aed' },
              ].map(({ type, label, icon: Icon, color }) => {
                const count = locations.filter(loc => loc.location_type === type).length;
                if (count === 0) return null;
                
                return (
                  <div key={type} className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: color }}>
                      <Icon className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {label} ({count})
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreteMap;