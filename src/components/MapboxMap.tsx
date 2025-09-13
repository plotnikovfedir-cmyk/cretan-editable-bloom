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
import { useTheme } from 'next-themes';

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
    icon?: React.ComponentType<any>;
    type?: string;
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
  const { theme } = useTheme();

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

    // Choose map style based on theme
    const mapStyle = theme === 'dark' 
      ? 'mapbox://styles/mapbox/dark-v11' 
      : (style || 'mapbox://styles/mapbox/outdoors-v12');

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapStyle,
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

    // Add markers with custom SVG icons
    markers.forEach((marker) => {
      const el = document.createElement('div');
      el.className = 'mapbox-marker';
      el.style.cursor = 'pointer';
      el.style.transform = 'translate(-50%, -50%)';
      
      // Create SVG icon
      if (marker.icon) {
        const IconComponent = marker.icon;
        el.innerHTML = `
          <div style="
            width: 32px; 
            height: 32px; 
            background: ${marker.color || '#059669'}; 
            border-radius: 50%; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            border: 3px solid white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            transition: transform 0.2s ease;
          " 
          onmouseover="this.style.transform='scale(1.1)'" 
          onmouseout="this.style.transform='scale(1)'"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              ${getIconPath(marker.type || 'default')}
            </svg>
          </div>
        `;
      } else {
        // Fallback to simple circle
        el.style.backgroundColor = marker.color || '#059669';
        el.style.width = '16px';
        el.style.height = '16px';
        el.style.borderRadius = '50%';
        el.style.border = '3px solid white';
        el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
      }

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

  // Helper function to get SVG paths for icons
  const getIconPath = (type: string) => {
    const paths = {
      beaches: '<path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2H2v2z"/><path d="M20 16c0-2-2-4-4-4s-4 2-4 4h8z"/><path d="M8 16c0-2-2-4-4-4s-4 2-4 4h8z"/>',
      canyons: '<path d="m8 3 4 8 5-5v7H6V8l2-5z"/><path d="M2 20h20v2H2z"/>',
      monasteries: '<path d="m5 8 6-3 6 3v13H5V8z"/><path d="M9 21V12h6v9"/>',
      villages: '<path d="M6 22V4l3-3 2 3h4l3-3v18z"/><path d="M6 12h4v6H6z"/><path d="M14 12h4v6h-4z"/>',
      viewpoints: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
      caves: '<path d="M6 3h12l4 6-10 13L2 9l4-6z"/><path d="m12 22 4-7.5L20 9"/>',
      production: '<path d="m8 3 4 8 5-5v7H6V8l2-5z"/><path d="M2 20h20v2H2z"/>',
      farm: '<path d="M7 20c0-1.5 1.5-3 4-3s4 1.5 4 3m-4-8V3l2 2h6v6l-2 2v5"/><circle cx="16" cy="8" r="2"/>',
      default: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>'
    };
    return paths[type as keyof typeof paths] || paths.default;
  };

  useEffect(() => {
    if (mapboxToken) {
      initializeMap(mapboxToken);
    }
  }, [latitude, longitude, zoom, style, markers, mapboxToken, theme]);

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