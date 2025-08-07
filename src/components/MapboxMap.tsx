import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MapPin } from 'lucide-react';

interface MapboxMapProps {
  latitude?: number;
  longitude?: number;
  zoom?: number;
  style?: string;
  markers?: Array<{
    latitude: number;
    longitude: number;
    title?: string;
    description?: string;
    color?: string;
  }>;
  height?: string;
  className?: string;
}

const MapboxMap: React.FC<MapboxMapProps> = ({
  latitude = 35.2401,
  longitude = 24.8093,
  zoom = 10,
  style = 'mapbox://styles/mapbox/outdoors-v12',
  markers = [],
  height = '400px',
  className = ''
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [tokenInput, setTokenInput] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    checkAdminStatus();
    loadMapboxToken();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data, error } = await supabase.rpc('is_admin');
      if (!error) {
        setIsAdmin(data);
      }
    } catch (err) {
      console.error('Error checking admin status:', err);
    }
  };

  const loadMapboxToken = async () => {
    try {
      // Try to get token from Supabase secrets through an edge function
      const { data, error } = await supabase.functions.invoke('get-mapbox-token');
      if (!error && data?.token) {
        setMapboxToken(data.token);
        initializeMap(data.token);
      } else {
        setError('Mapbox API key not configured');
      }
    } catch (err) {
      setError('Mapbox API key not configured');
    }
  };

  const saveMapboxToken = async () => {
    if (!isAdmin || !tokenInput.trim()) return;

    try {
      const { error } = await supabase.functions.invoke('save-mapbox-token', {
        body: { token: tokenInput.trim() }
      });

      if (!error) {
        setMapboxToken(tokenInput.trim());
        setTokenInput('');
        setError('');
        initializeMap(tokenInput.trim());
      } else {
        setError('Failed to save Mapbox token');
      }
    } catch (err) {
      setError('Failed to save Mapbox token');
    }
  };

  const initializeMap = (token: string) => {
    if (!mapContainer.current || !token) return;

    mapboxgl.accessToken = token;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: style,
      center: [longitude, latitude],
      zoom: zoom,
      attributionControl: false
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add custom attribution
    map.current.addControl(
      new mapboxgl.AttributionControl({
        customAttribution: '© Cretan Guru'
      })
    );

    // Add markers
    markers.forEach((marker) => {
      const el = document.createElement('div');
      el.className = 'mapbox-marker';
      el.style.backgroundColor = marker.color || '#059669';
      el.style.width = '12px';
      el.style.height = '12px';
      el.style.borderRadius = '50%';
      el.style.border = '2px solid white';
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
      el.style.cursor = 'pointer';

      const mapboxMarker = new mapboxgl.Marker(el)
        .setLngLat([marker.longitude, marker.latitude])
        .addTo(map.current!);

      if (marker.title || marker.description) {
        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: false,
          className: 'mapbox-popup'
        }).setHTML(`
          <div class="p-2">
            ${marker.title ? `<h3 class="font-semibold text-sm">${marker.title}</h3>` : ''}
            ${marker.description ? `<p class="text-xs text-muted-foreground mt-1">${marker.description}</p>` : ''}
          </div>
        `);

        mapboxMarker.setPopup(popup);
      }
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  };

  useEffect(() => {
    if (mapboxToken) {
      initializeMap(mapboxToken);
    }
  }, [latitude, longitude, zoom, style, markers, mapboxToken]);

  if (error && isAdmin) {
    return (
      <Card className={`w-full ${className}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Configure Mapbox
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription>
              Mapbox API key is required to display maps. Please enter your Mapbox token below.
            </AlertDescription>
          </Alert>
          <div className="space-y-2">
            <Label htmlFor="mapbox-token">Mapbox API Token</Label>
            <Input
              id="mapbox-token"
              type="password"
              placeholder="pk.eyJ1..."
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
            />
          </div>
          <Button onClick={saveMapboxToken} disabled={!tokenInput.trim()}>
            Save Token
          </Button>
          <p className="text-xs text-muted-foreground">
            Get your free Mapbox token at{' '}
            <a
              href="https://account.mapbox.com/access-tokens/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              mapbox.com
            </a>
          </p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <div 
        className={`w-full bg-muted rounded-lg flex items-center justify-center ${className}`}
        style={{ height }}
      >
        <div className="text-center p-4">
          <MapPin className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Map unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={mapContainer} 
      className={`w-full rounded-lg shadow-sm ${className}`}
      style={{ height }}
    />
  );
};

export default MapboxMap;