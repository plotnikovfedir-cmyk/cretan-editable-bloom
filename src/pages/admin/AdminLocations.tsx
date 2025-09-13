import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Plus, Edit, Trash2, MapPin } from 'lucide-react';
import { FormDialog } from '@/components/admin/FormDialog';
import MapboxMap from '@/components/MapboxMap';
import { useToast } from '@/hooks/use-toast';

type LocationType = 'production' | 'farm' | 'beaches' | 'canyons' | 'monasteries' | 'villages' | 'viewpoints' | 'caves';

interface Location {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  location_type: LocationType;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const AdminLocations = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    latitude: '',
    longitude: '',
    location_type: 'production' as LocationType,
    is_active: true
  });

  useEffect(() => {
    checkAdminAccess();
    loadLocations();
  }, []);

  const checkAdminAccess = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/admin/login');
      return;
    }

    const { data: isAdmin } = await supabase.rpc('is_admin');
    if (!isAdmin) {
      navigate('/');
      return;
    }
  };

  const loadLocations = async () => {
    try {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .order('name');

      if (error) throw error;
      setLocations(data || []);
    } catch (error) {
      console.error('Error loading locations:', error);
      toast({
        title: "Error",
        description: "Failed to load locations",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const locationData = {
        name: formData.name,
        description: formData.description,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        location_type: formData.location_type as LocationType,
        is_active: formData.is_active
      };

      if (editingLocation) {
        const { error } = await supabase
          .from('locations')
          .update(locationData)
          .eq('id', editingLocation.id);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Location updated successfully"
        });
      } else {
        const { error } = await supabase
          .from('locations')
          .insert([locationData]);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Location created successfully"
        });
      }

      setIsDialogOpen(false);
      resetForm();
      loadLocations();
    } catch (error) {
      console.error('Error saving location:', error);
      toast({
        title: "Error",
        description: "Failed to save location",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (location: Location) => {
    setEditingLocation(location);
    setFormData({
      name: location.name,
      description: location.description || '',
      latitude: location.latitude.toString(),
      longitude: location.longitude.toString(),
      location_type: location.location_type,
      is_active: location.is_active
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this location?')) return;

    try {
      const { error } = await supabase
        .from('locations')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Location deleted successfully"
      });
      
      loadLocations();
    } catch (error) {
      console.error('Error deleting location:', error);
      toast({
        title: "Error",
        description: "Failed to delete location",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      latitude: '',
      longitude: '',
      location_type: 'production' as LocationType,
      is_active: true
    });
    setEditingLocation(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

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

  const markers = locations
    .filter(loc => loc.is_active)
    .map(location => ({
      latitude: location.latitude,
      longitude: location.longitude,
      title: location.name,
      description: location.description,
      color: getMarkerColor(location.location_type)
    }));

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Manage Locations</h1>
        </div>
        <Button onClick={openCreateDialog} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Location
        </Button>
      </div>

      {/* Map Preview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Map Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MapboxMap
            latitude={35.2401}
            longitude={24.8093}
            zoom={9}
            markers={markers}
            height="400px"
            className="rounded-lg"
          />
        </CardContent>
      </Card>

      <FormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title={editingLocation ? 'Edit Location' : 'Add New Location'}
        className="max-w-3xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Location name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location_type">Type</Label>
              <Select 
                value={formData.location_type} 
                onValueChange={(value: LocationType) => setFormData(prev => ({ ...prev, location_type: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="farm">Farm</SelectItem>
                  <SelectItem value="beaches">Beaches</SelectItem>
                  <SelectItem value="canyons">Canyons</SelectItem>
                  <SelectItem value="monasteries">Monasteries</SelectItem>
                  <SelectItem value="villages">Villages</SelectItem>
                  <SelectItem value="viewpoints">Viewpoints</SelectItem>
                  <SelectItem value="caves">Caves</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Location description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude *</Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                value={formData.latitude}
                onChange={(e) => setFormData(prev => ({ ...prev, latitude: e.target.value }))}
                placeholder="35.2401"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude *</Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                value={formData.longitude}
                onChange={(e) => setFormData(prev => ({ ...prev, longitude: e.target.value }))}
                placeholder="24.8093"
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
            />
            <Label htmlFor="is_active">Active</Label>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit">
              {editingLocation ? 'Update Location' : 'Create Location'}
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </FormDialog>

      {/* Locations List */}
      <div className="grid gap-4">
        {locations.map((location) => (
          <Card key={location.id} className={`${!location.is_active ? 'opacity-60' : ''}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{location.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      (() => {
                        switch(location.location_type) {
                          case 'beaches': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
                          case 'canyons': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
                          case 'monasteries': return 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200';
                          case 'villages': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
                          case 'viewpoints': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200';
                          case 'caves': return 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200';
                          case 'production': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
                          case 'farm': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
                          default: return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
                        }
                      })()
                    }`}>
                      {location.location_type}
                    </span>
                    {!location.is_active && (
                      <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                        Inactive
                      </span>
                    )}
                  </div>
                  {location.description && (
                    <p className="text-muted-foreground mb-2">{location.description}</p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Coordinates: {location.latitude.toFixed(4)}°N, {location.longitude.toFixed(4)}°E
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(location)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(location.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminLocations;