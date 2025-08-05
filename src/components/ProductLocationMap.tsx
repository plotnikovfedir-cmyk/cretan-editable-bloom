import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Mountain, Thermometer, Droplets, Calendar } from "lucide-react";

interface ProductLocationMapProps {
  origin: string;
  coordinates: [number, number];
  productName: string;
}

const ProductLocationMap = ({ origin, coordinates, productName }: ProductLocationMapProps) => {
  const [showDetails, setShowDetails] = useState(false);

  // Chania Hills specific data
  const locationData = {
    altitude: "150-300m",
    soilType: "Rich limestone with minerals",
    climate: "Mediterranean with sea breeze",
    harvestTime: "May - September",
    temperature: "18-28°C",
    rainfall: "600mm annually"
  };

  return (
    <div className="space-y-4">
      {/* Interactive Map Container */}
      <div className="relative w-full h-80 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-lg overflow-hidden border border-border/50">
        {/* Map Background - Chania Hills Visualization */}
        <div className="absolute inset-0">
          {/* Terrain Pattern */}
          <svg className="w-full h-full opacity-20" viewBox="0 0 400 300">
            {/* Hills silhouette */}
            <path
              d="M0,200 Q50,150 100,160 T200,140 T300,155 T400,150 L400,300 L0,300 Z"
              fill="url(#hillGradient)"
            />
            <path
              d="M0,250 Q80,200 150,220 T250,200 T350,210 T400,200 L400,300 L0,300 Z"
              fill="url(#hillGradient2)"
            />
            
            {/* Gradient definitions */}
            <defs>
              <linearGradient id="hillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="hillGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity="0.2" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.05" />
              </linearGradient>
            </defs>
          </svg>

          {/* Production Zone Highlight */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-24 h-24 bg-primary/20 rounded-full animate-pulse border-2 border-primary/40 flex items-center justify-center">
              <div className="w-12 h-12 bg-primary/30 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary animate-bounce" />
              </div>
            </div>
          </div>

          {/* Climate Indicators */}
          <div className="absolute top-4 right-4 flex gap-2">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
              <Droplets className="w-4 h-4 text-blue-600" />
            </div>
            <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
              <Thermometer className="w-4 h-4 text-orange-600" />
            </div>
          </div>

          {/* Mountains in background */}
          <div className="absolute top-8 left-4">
            <Mountain className="w-6 h-6 text-muted-foreground/40" />
          </div>
          <div className="absolute top-12 right-16">
            <Mountain className="w-4 h-4 text-muted-foreground/30" />
          </div>
        </div>

        {/* Coordinates Display */}
        <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-md px-2 py-1 text-xs text-muted-foreground">
          {coordinates[0].toFixed(4)}°N, {coordinates[1].toFixed(4)}°E
        </div>

        {/* Interactive Details Toggle */}
        <div className="absolute bottom-4 right-4">
          <Button
            size="sm"
            variant={showDetails ? "default" : "outline"}
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs"
          >
            {showDetails ? "Hide Details" : "Show Details"}
          </Button>
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