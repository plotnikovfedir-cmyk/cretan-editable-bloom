import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Waves, Mountain, Church, Building, Eye, Gem, MapPin, Leaf } from 'lucide-react';

interface LocationFilterProps {
  selectedTypes: string[];
  onTypeToggle: (type: string) => void;
}

const LocationFilter: React.FC<LocationFilterProps> = ({ selectedTypes, onTypeToggle }) => {
  const locationTypes = [
    { 
      value: 'beaches', 
      label: 'Beaches', 
      icon: Waves, 
      color: '#0ea5e9',
      description: 'Crystal clear waters and pristine shores'
    },
    { 
      value: 'canyons', 
      label: 'Canyons', 
      icon: Mountain, 
      color: '#f59e0b',
      description: 'Dramatic gorges and hiking paths'
    },
    { 
      value: 'monasteries', 
      label: 'Monasteries', 
      icon: Church, 
      color: '#8b5cf6',
      description: 'Historic religious sites'
    },
    { 
      value: 'villages', 
      label: 'Villages', 
      icon: Building, 
      color: '#f97316',
      description: 'Traditional Cretan settlements'
    },
    { 
      value: 'viewpoints', 
      label: 'Viewpoints', 
      icon: Eye, 
      color: '#06b6d4',
      description: 'Scenic overlooks and sunset spots'
    },
    { 
      value: 'caves', 
      label: 'Caves', 
      icon: Gem, 
      color: '#64748b',
      description: 'Underground wonders and formations'
    },
    { 
      value: 'production', 
      label: 'Production', 
      icon: Mountain, 
      color: '#059669',
      description: 'Local production facilities'
    },
    { 
      value: 'farm', 
      label: 'Farms', 
      icon: Leaf, 
      color: '#7c3aed',
      description: 'Agricultural sites and groves'
    }
  ];

  return (
    <Card className="bg-background/60 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <MapPin className="w-5 h-5" />
          Filter Locations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {locationTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedTypes.includes(type.value);
            
            return (
              <div 
                key={type.value}
                className={`flex items-center space-x-2 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  isSelected 
                    ? 'bg-primary/10 border border-primary/20' 
                    : 'bg-muted/30 hover:bg-muted/50 border border-border/30'
                }`}
                onClick={() => onTypeToggle(type.value)}
              >
                <Checkbox
                  id={type.value}
                  checked={isSelected}
                  onChange={() => onTypeToggle(type.value)}
                  className="pointer-events-none"
                />
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div 
                    className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" 
                    style={{ backgroundColor: type.color }}
                  >
                    <Icon className="w-2.5 h-2.5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm font-medium text-foreground block truncate">
                      {type.label}
                    </span>
                    <span className="text-xs text-muted-foreground block truncate">
                      {type.description}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationFilter;