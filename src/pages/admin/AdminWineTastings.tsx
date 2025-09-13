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
import { Trash2, Edit, Plus, Save, X, MapPin, Wine } from "lucide-react";

interface WineTasting {
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
  wines: string[];
  image_url: string;
  is_active: boolean;
  order_position: number;
}

const AdminWineTastings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [experiences, setExperiences] = useState<WineTasting[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingExperience, setEditingExperience] = useState<WineTasting | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const emptyExperience: Omit<WineTasting, 'id'> = {
    title: '',
    slug: '',
    description: '',
    short_description: '',
    duration: '',
    group_size: '',
    price: 0,
    location: '',
    highlights: [],
    wines: [],
    image_url: '',
    is_active: true,
    order_position: 0
  };

  useEffect(() => {
    if (user) {
      fetchExperiences();
    }
  }, [user]);

  const fetchExperiences = async () => {
    try {
      const { data, error } = await supabase
        .from('wine_tastings')
        .select('*')
        .order('order_position', { ascending: true });

      if (error) throw error;
      setExperiences(data || []);
    } catch (error: any) {
      console.error('Error fetching experiences:', error);
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

  const handleSave = async (experience: WineTasting | Omit<WineTasting, 'id'>) => {
    try {
      const experienceData = {
        ...experience,
        slug: experience.slug || generateSlug(experience.title),
        highlights: Array.isArray(experience.highlights) ? experience.highlights : (experience.highlights as string).split(',').map(h => h.trim()),
        wines: Array.isArray(experience.wines) ? experience.wines : (experience.wines as string).split(',').map(w => w.trim())
      };

      if ('id' in experience) {
        // Update existing
        const { error } = await supabase
          .from('wine_tastings')
          .update(experienceData)
          .eq('id', experience.id);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Wine tasting updated successfully",
        });
      } else {
        // Create new
        const { error } = await supabase
          .from('wine_tastings')
          .insert([experienceData]);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Wine tasting created successfully",
        });
        setIsAddingNew(false);
      }
      
      setEditingExperience(null);
      fetchExperiences();
    } catch (error: any) {
      console.error('Error saving experience:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this wine tasting?')) return;

    try {
      const { error } = await supabase
        .from('wine_tastings')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Wine tasting deleted successfully",
      });
      fetchExperiences();
    } catch (error: any) {
      console.error('Error deleting experience:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const ExperienceForm = ({ experience, onSave, onCancel }: {
    experience: WineTasting | Omit<WineTasting, 'id'>;
    onSave: (experience: WineTasting | Omit<WineTasting, 'id'>) => void;
    onCancel: () => void;
  }) => {
    const [formData, setFormData] = useState(experience);
    const [highlightsText, setHighlightsText] = useState(
      Array.isArray(experience.highlights) ? experience.highlights.join(', ') : (experience.highlights as string) || ''
    );
    const [winesText, setWinesText] = useState(
      Array.isArray(experience.wines) ? experience.wines.join(', ') : (experience.wines as string) || ''
    );

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave({
        ...formData,
        highlights: highlightsText.split(',').map(h => h.trim()).filter(h => h),
        wines: winesText.split(',').map(w => w.trim()).filter(w => w)
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
              placeholder="e.g., 3-4 hours"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Group Size</label>
            <Input
              value={formData.group_size}
              onChange={(e) => setFormData({ ...formData, group_size: e.target.value })}
              placeholder="e.g., 2-12 people"
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
            placeholder="e.g., Archanes Valley"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Experience Highlights (comma-separated)</label>
          <Textarea
            value={highlightsText}
            onChange={(e) => setHighlightsText(e.target.value)}
            placeholder="5-wine tasting flight, Winery tour, Meet the winemaker"
            rows={2}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Wines You'll Taste (comma-separated)</label>
          <Textarea
            value={winesText}
            onChange={(e) => setWinesText(e.target.value)}
            placeholder="Kotsifali red, Vilana white, Mandilaria robust red"
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
      <AdminNavigation title="Wine Tastings Management" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Wine Tastings Management</h1>
            <p className="text-muted-foreground">Manage your wine tasting experiences</p>
          </div>
          <Button onClick={() => setIsAddingNew(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add New Experience
          </Button>
        </div>

        {isAddingNew && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add New Wine Tasting Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <ExperienceForm
                experience={emptyExperience}
                onSave={handleSave}
                onCancel={() => setIsAddingNew(false)}
              />
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 gap-6">
          {experiences.map((experience) => (
            <Card key={experience.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Wine className="w-5 h-5" />
                      {experience.title}
                      {!experience.is_active && <Badge variant="secondary">Inactive</Badge>}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {experience.location}
                      </span>
                      <span>€{experience.price}</span>
                      <span>{experience.duration}</span>
                      <span>{experience.group_size}</span>
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingExperience(experience)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(experience.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {editingExperience?.id === experience.id ? (
                <CardContent>
                  <ExperienceForm
                    experience={editingExperience}
                    onSave={handleSave}
                    onCancel={() => setEditingExperience(null)}
                  />
                </CardContent>
              ) : (
                <CardContent>
                  <p className="text-muted-foreground mb-4">{experience.short_description}</p>
                  
                  {experience.highlights.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Highlights:</h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.highlights.map((highlight, index) => (
                          <Badge key={index} variant="outline">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {experience.wines.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Wines:</h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.wines.map((wine, index) => (
                          <Badge key={index} variant="secondary">
                            {wine}
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

export default AdminWineTastings;