import React from 'react';
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {locationTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedTypes.includes(type.value);
            
            return (
              <div 
                key={type.value}
                className={`group relative flex flex-col items-center p-4 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  isSelected 
                    ? 'bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary/40 shadow-lg shadow-primary/20 scale-105' 
                    : 'bg-muted/20 hover:bg-muted/40 border-2 border-border/30 hover:border-primary/30 hover:shadow-md'
                }`}
                onClick={() => onTypeToggle(type.value)}
                style={{
                  boxShadow: isSelected 
                    ? `0 8px 25px -8px ${type.color}40` 
                    : undefined
                }}
              >
                {/* Icon Container with enhanced effects */}
                <div 
                  className={`relative w-16 h-16 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 ${
                    isSelected 
                      ? 'animate-pulse shadow-lg' 
                      : 'group-hover:scale-110 group-hover:shadow-md'
                  }`}
                  style={{ 
                    backgroundColor: isSelected ? type.color : `${type.color}20`,
                    boxShadow: isSelected ? `0 4px 15px ${type.color}40` : undefined
                  }}
                >
                  <Icon 
                    className={`transition-all duration-300 ${
                      isSelected 
                        ? 'w-8 h-8 text-white drop-shadow-sm' 
                        : 'w-7 h-7 group-hover:w-8 group-hover:h-8'
                    }`}
                    style={{ 
                      color: isSelected ? 'white' : type.color 
                    }}
                  />
                  
                  {/* Selection indicator */}
                  {isSelected && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center shadow-md animate-bounce">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
                
                {/* Text Content */}
                <div className="text-center space-y-1">
                  <h3 className={`font-semibold text-sm transition-colors duration-300 ${
                    isSelected ? 'text-primary' : 'text-foreground group-hover:text-primary'
                  }`}>
                    {type.label}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-tight line-clamp-2">
                    {type.description}
                  </p>
                </div>
                
                {/* Hover effect overlay */}
                <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
                  isSelected 
                    ? 'bg-gradient-to-t from-primary/5 to-transparent opacity-100' 
                    : 'bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100'
                }`} />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationFilter;