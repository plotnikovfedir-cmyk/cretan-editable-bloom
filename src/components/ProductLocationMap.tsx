import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Mountain, Thermometer, Droplets, Calendar } from "lucide-react";
import MapboxMap from './MapboxMap';
import { supabase } from '@/integrations/supabase/client';

interface ProductLocationMapProps {
  origin: string;
  coordinates: [number, number];
  productName: string;
}

const ProductLocationMap = ({ origin, coordinates, productName }: ProductLocationMapProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [locationData, setLocationData] = useState({
    altitude: "150-300m",
    soilType: "Rich limestone with minerals",
    climate: "Mediterranean with sea breeze",
    harvestTime: "May - September",
    temperature: "18-28°C",
    rainfall: "600mm annually"
  });

  useEffect(() => {
    // Load location-specific data based on coordinates
    const loadLocationData = async () => {
      try {
        const { data, error } = await supabase
          .from('locations')
          .select('*')
          .eq('latitude', coordinates[0])
          .eq('longitude', coordinates[1])
          .single();

        if (data && !error) {
          // Update location data if found in database
          setLocationData(prev => ({
            ...prev,
            // Could expand with more detailed data from the database
          }));
        }
      } catch (err) {
        console.error('Error loading location data:', err);
      }
    };

    loadLocationData();
  }, [coordinates]);

  const markers = [
    {
      latitude: coordinates[0],
      longitude: coordinates[1],
      title: origin,
      description: `Production location for ${productName}`,
      color: '#059669'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Real Mapbox Map */}
      <div className="relative">
        <MapboxMap
          latitude={coordinates[0]}
          longitude={coordinates[1]}
          zoom={12}
          markers={markers}
          height="320px"
          className="rounded-lg border border-border/50"
          style="mapbox://styles/mapbox/satellite-streets-v12"
        />
        
        {/* Overlay Controls */}
        <div className="absolute bottom-4 right-4">
          <Button
            size="sm"
            variant={showDetails ? "default" : "outline"}
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs bg-background/80 backdrop-blur-sm"
          >
            {showDetails ? "Hide Details" : "Show Details"}
          </Button>
        </div>
        
        {/* Coordinates Display */}
        <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-md px-2 py-1 text-xs text-muted-foreground border border-border/50">
          {coordinates[0].toFixed(4)}°N, {coordinates[1].toFixed(4)}°E
        </div>
      </div>

      {/* Location Details Panel */}
      {showDetails && (
        <Card className="border border-border/50 bg-muted/30">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">{origin} - Production Details</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mountain className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      <span className="font-medium">Altitude:</span> {locationData.altitude}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      <span className="font-medium">Temperature:</span> {locationData.temperature}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      <span className="font-medium">Annual Rainfall:</span> {locationData.rainfall}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      <span className="font-medium">Harvest Season:</span> {locationData.harvestTime}
                    </span>
                  </div>
                  
                  <div className="text-sm">
                    <span className="font-medium">Soil:</span> {locationData.soilType}
                  </div>
                  
                  <div className="text-sm">
                    <span className="font-medium">Climate:</span> {locationData.climate}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-primary/10 rounded-md border border-primary/20">
                <p className="text-sm text-foreground">
                  <span className="font-medium">Why this location?</span> The unique microclimate of Chania Hills, 
                  combined with limestone-rich soil and perfect Mediterranean conditions, creates the ideal 
                  environment for wild oregano to develop its distinctive aroma and therapeutic properties.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-primary/30 rounded-full"></div>
          <span>Production Zone</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          <span>Origin Point</span>
        </div>
        <div className="flex items-center gap-1">
          <Mountain className="w-3 h-3" />
          <span>Hills Terrain</span>
        </div>
      </div>
    </div>
  );
};

export default ProductLocationMap;