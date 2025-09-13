import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import AdminNavigation from "@/components/admin/AdminNavigation";
import { Trash2, Edit, Plus, Save, X, MapPin } from "lucide-react";

interface IslandTour {
  id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  duration: string;
  group_size: string;
  price: number;
  location: string;
  highlights: string[];
  includes: string[];
  image_url: string;
  is_active: boolean;
  order_position: number;
}

const AdminIslandTours = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tours, setTours] = useState<IslandTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTour, setEditingTour] = useState<IslandTour | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const emptyTour: Omit<IslandTour, 'id'> = {
    title: '',
    slug: '',
    description: '',
    short_description: '',
    duration: '',
    group_size: '',
    price: 0,
    location: '',
    highlights: [],
    includes: [],
    image_url: '',
    is_active: true,
    order_position: 0
  };

  useEffect(() => {
    if (user) {
      fetchTours();
    }
  }, [user]);

  const fetchTours = async () => {
    try {
      const { data, error } = await supabase
        .from('island_tours')
        .select('*')
        .order('order_position', { ascending: true });

      if (error) throw error;
      setTours(data || []);
    } catch (error: any) {
      console.error('Error fetching tours:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleSave = async (tour: IslandTour | Omit<IslandTour, 'id'>) => {
    try {
      const tourData = {
        ...tour,
        slug: tour.slug || generateSlug(tour.title),
        highlights: Array.isArray(tour.highlights) ? tour.highlights : (tour.highlights as string).split(',').map(h => h.trim()),
        includes: Array.isArray(tour.includes) ? tour.includes : (tour.includes as string).split(',').map(i => i.trim())
      };

      if ('id' in tour) {
        // Update existing
        const { error } = await supabase
          .from('island_tours')
          .update(tourData)
          .eq('id', tour.id);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Tour updated successfully",
        });
      } else {
        // Create new
        const { error } = await supabase
          .from('island_tours')
          .insert([tourData]);
        
        if (error) throw error;
        
        toast({
          title: "Success", 
          description: "Tour created successfully",
        });
        setIsAddingNew(false);
      }
      
      setEditingTour(null);
      fetchTours();
    } catch (error: any) {
      console.error('Error saving tour:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tour?')) return;

    try {
      const { error } = await supabase
        .from('island_tours')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Tour deleted successfully",
      });
      fetchTours();
    } catch (error: any) {
      console.error('Error deleting tour:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const TourForm = ({ tour, onSave, onCancel }: {
    tour: IslandTour | Omit<IslandTour, 'id'>;
    onSave: (tour: IslandTour | Omit<IslandTour, 'id'>) => void;
    onCancel: () => void;
  }) => {
    const [formData, setFormData] = useState(tour);
    const [highlightsText, setHighlightsText] = useState(
      Array.isArray(tour.highlights) ? tour.highlights.join(', ') : (tour.highlights as string) || ''
    );
    const [includesText, setIncludesText] = useState(
      Array.isArray(tour.includes) ? tour.includes.join(', ') : (tour.includes as string) || ''
    );

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave({
        ...formData,
        highlights: highlightsText.split(',').map(h => h.trim()).filter(h => h),
        includes: includesText.split(',').map(i => i.trim()).filter(i => i)
      });
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Slug</label>
            <Input
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="Auto-generated from title"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Short Description</label>
          <Input
            value={formData.short_description}
            onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
            placeholder="Brief description for cards"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Full Description</label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">Duration</label>
            <Input
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="e.g., Full Day (8 hours)"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Group Size</label>
            <Input
              value={formData.group_size}
              onChange={(e) => setFormData({ ...formData, group_size: e.target.value })}
              placeholder="e.g., 2-8 people"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Price (€)</label>
            <Input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Location</label>
          <Input
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="e.g., Western Crete"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Tour Highlights (comma-separated)</label>
          <Textarea
            value={highlightsText}
            onChange={(e) => setHighlightsText(e.target.value)}
            placeholder="Balos Lagoon visit, Traditional lunch, Local guide"
            rows={2}
          />
        </div>

        <div>
          <label className="text-sm font-medium">What's Included (comma-separated)</label>
          <Textarea
            value={includesText}
            onChange={(e) => setIncludesText(e.target.value)}
            placeholder="Transportation, Guide, Meals, Entrance fees"
            rows={2}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Image URL</label>
          <Input
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
            />
            <label className="text-sm font-medium">Active</label>
          </div>
          <div>
            <label className="text-sm font-medium mr-2">Order Position</label>
            <Input
              type="number"
              value={formData.order_position}
              onChange={(e) => setFormData({ ...formData, order_position: parseInt(e.target.value) || 0 })}
              className="w-20 inline-block"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button type="submit">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      </form>
    );
  };

  if (!user) {
    return <div>Please log in to access the admin panel.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNavigation title="Island Tours Management" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Island Tours Management</h1>
            <p className="text-muted-foreground">Manage your island tour offerings</p>
          </div>
          <Button onClick={() => setIsAddingNew(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add New Tour
          </Button>
        </div>

        {isAddingNew && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add New Tour</CardTitle>
            </CardHeader>
            <CardContent>
              <TourForm
                tour={emptyTour}
                onSave={handleSave}
                onCancel={() => setIsAddingNew(false)}
              />
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 gap-6">
          {tours.map((tour) => (
            <Card key={tour.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {tour.title}
                      {!tour.is_active && <Badge variant="secondary">Inactive</Badge>}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {tour.location}
                      </span>
                      <span>€{tour.price}</span>
                      <span>{tour.duration}</span>
                      <span>{tour.group_size}</span>
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingTour(tour)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(tour.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {editingTour?.id === tour.id ? (
                <CardContent>
                  <TourForm
                    tour={editingTour}
                    onSave={handleSave}
                    onCancel={() => setEditingTour(null)}
                  />
                </CardContent>
              ) : (
                <CardContent>
                  <p className="text-muted-foreground mb-4">{tour.short_description}</p>
                  
                  {tour.highlights.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Highlights:</h4>
                      <div className="flex flex-wrap gap-2">
                        {tour.highlights.map((highlight, index) => (
                          <Badge key={index} variant="outline">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {tour.includes.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Includes:</h4>
                      <div className="flex flex-wrap gap-2">
                        {tour.includes.map((item, index) => (
                          <Badge key={index} variant="secondary">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminIslandTours;