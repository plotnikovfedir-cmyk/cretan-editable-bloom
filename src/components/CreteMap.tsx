import { MapPin, Leaf, Mountain, Waves, Church, Building, Eye, Gem } from "lucide-react";
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import MapboxMap from './MapboxMap';

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
    color: getMarkerColor(location.location_type),
    icon: getMarkerIcon(location.location_type),
    type: location.location_type
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
          
          {/* Interactive Location Filter & Legend */}
          <div className="mt-12 bg-background/60 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
            <div className="text-center mb-6">
              <h3 className="font-display font-bold text-xl text-foreground mb-2">
                Explore Locations
              </h3>
              <p className="text-sm text-muted-foreground">
                {filteredLocations.length} of {locations.length} locations visible • Click to filter by type
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { type: 'beaches', label: 'Beaches', icon: Waves, color: '#0ea5e9', description: 'Crystal clear waters and pristine shores' },
                { type: 'canyons', label: 'Canyons', icon: Mountain, color: '#f59e0b', description: 'Dramatic gorges and hiking paths' },
                { type: 'monasteries', label: 'Monasteries', icon: Church, color: '#8b5cf6', description: 'Historic religious sites' },
                { type: 'villages', label: 'Villages', icon: Building, color: '#f97316', description: 'Traditional Cretan settlements' },
                { type: 'viewpoints', label: 'Viewpoints', icon: Eye, color: '#06b6d4', description: 'Scenic overlooks and sunset spots' },
                { type: 'caves', label: 'Caves', icon: Gem, color: '#64748b', description: 'Underground wonders and formations' },
                { type: 'production', label: 'Production', icon: Mountain, color: '#059669', description: 'Local production facilities' },
                { type: 'farm', label: 'Farms', icon: Leaf, color: '#7c3aed', description: 'Agricultural sites and groves' },
              ].map(({ type, label, icon: Icon, color, description }) => {
                const count = locations.filter(loc => loc.location_type === type).length;
                const isSelected = selectedTypes.includes(type);
                if (count === 0) return null;
                
                return (
                  <div 
                    key={type} 
                    onClick={() => handleTypeToggle(type)}
                    className={`
                      cursor-pointer p-2 rounded-lg transition-colors
                      ${isSelected 
                        ? 'bg-primary/10' 
                        : 'hover:bg-background/60 bg-background/40'
                      }
                    `}
                  >
                    <div className="flex flex-col items-center text-center space-y-1">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-background/80"
                      >
                        <Icon 
                          className="w-4 h-4"
                          style={{ color: color }}
                        />
                      </div>
                      <div>
                        <h4 className={`text-xs font-medium ${
                          isSelected ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {label}
                        </h4>
                        <div className="text-xs opacity-60">
                          ({count})
                        </div>
                      </div>
                    </div>
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