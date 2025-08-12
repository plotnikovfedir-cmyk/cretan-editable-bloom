import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, RotateCcw } from 'lucide-react';

interface MapSelectorProps {
  latitude?: number | null;
  longitude?: number | null;
  onCoordinatesChange: (lat: number, lng: number) => void;
  className?: string;
}

const MapSelector: React.FC<MapSelectorProps> = ({
  latitude,
  longitude,
  onCoordinatesChange,
  className = ""
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [currentLat, setCurrentLat] = useState<string>(latitude?.toString() || '');
  const [currentLng, setCurrentLng] = useState<string>(longitude?.toString() || '');
  const [isMapReady, setIsMapReady] = useState(false);

  // Default to Crete center if no coordinates provided
  const defaultLat = 35.2401;
  const defaultLng = 24.7665;

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map centered on Crete
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
    
    const initLat = latitude || defaultLat;
    const initLng = longitude || defaultLng;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [initLng, initLat],
      zoom: 9
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      setIsMapReady(true);
      
      // Add initial marker if coordinates are provided
      if (latitude && longitude) {
        addMarker(latitude, longitude);
      }
    });

    // Add click event to set marker
    map.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      addMarker(lat, lng);
      setCurrentLat(lat.toFixed(6));
      setCurrentLng(lng.toFixed(6));
      onCoordinatesChange(lat, lng);
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  const addMarker = (lat: number, lng: number) => {
    if (!map.current) return;

    // Remove existing marker
    if (marker.current) {
      marker.current.remove();
    }

    // Add new marker
    marker.current = new mapboxgl.Marker({
      color: '#ef4444',
      draggable: true
    })
      .setLngLat([lng, lat])
      .addTo(map.current);

    // Handle marker drag
    marker.current.on('dragend', () => {
      if (!marker.current) return;
      const lngLat = marker.current.getLngLat();
      setCurrentLat(lngLat.lat.toFixed(6));
      setCurrentLng(lngLat.lng.toFixed(6));
      onCoordinatesChange(lngLat.lat, lngLat.lng);
    });

    // Fly to marker location
    map.current.flyTo({
      center: [lng, lat],
      zoom: 12,
      duration: 1000
    });
  };

  const handleManualCoordinates = () => {
    const lat = parseFloat(currentLat);
    const lng = parseFloat(currentLng);
    
    if (isNaN(lat) || isNaN(lng)) {
      alert('Пожалуйста, введите корректные координаты');
      return;
    }

    addMarker(lat, lng);
    onCoordinatesChange(lat, lng);
  };

  const resetToDefault = () => {
    setCurrentLat('');
    setCurrentLng('');
    if (marker.current) {
      marker.current.remove();
      marker.current = null;
    }
    if (map.current) {
      map.current.flyTo({
        center: [defaultLng, defaultLat],
        zoom: 9,
        duration: 1000
      });
    }
    onCoordinatesChange(0, 0);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Местоположение происхождения
        </CardTitle>
        <CardDescription>
          Кликните на карту или введите координаты для указания места происхождения товара
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Manual coordinate input */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="latitude">Широта</Label>
            <Input
              id="latitude"
              type="number"
              step="0.000001"
              value={currentLat}
              onChange={(e) => setCurrentLat(e.target.value)}
              placeholder="35.2401"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="longitude">Долгота</Label>
            <Input
              id="longitude"
              type="number"
              step="0.000001"
              value={currentLng}
              onChange={(e) => setCurrentLng(e.target.value)}
              placeholder="24.7665"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={handleManualCoordinates}
            disabled={!currentLat || !currentLng}
          >
            Установить координаты
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={resetToDefault}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Сбросить
          </Button>
        </div>

        {/* Map container */}
        <div className="h-80 w-full rounded-lg overflow-hidden border">
          <div ref={mapContainer} className="w-full h-full" />
          {!isMapReady && (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <div className="text-center">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                <p className="text-sm text-muted-foreground">Загрузка карты...</p>
              </div>
            </div>
          )}
        </div>

        {currentLat && currentLng && (
          <div className="text-sm text-muted-foreground">
            Выбранные координаты: {parseFloat(currentLat).toFixed(6)}, {parseFloat(currentLng).toFixed(6)}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MapSelector;