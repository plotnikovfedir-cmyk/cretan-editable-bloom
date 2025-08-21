import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Plus, Edit, Trash2 } from 'lucide-react';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { FormDialog } from '@/components/admin/FormDialog';
import ActivityListManager from '@/components/admin/ActivityListManager';

interface Activity {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  price: number | null;
  duration: string | null;
  difficulty: string | null;
  max_participants: number | null;
  image_url: string | null;
  gallery_images: string[] | null;
  created_at: string;
  updated_at: string;
}

const AdminActivities: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    short_description: '',
    price: '',
    duration: '',
    difficulty: '',
    max_participants: '',
    image_url: '',
    gallery_images: [] as string[]
  });

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/admin');
        return;
      }

      const { data: adminUser } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      if (!adminUser) {
        navigate('/admin');
        return;
      }

      loadActivities();
    } catch (error) {
      console.error('Error checking admin access:', error);
      navigate('/admin');
    }
  };

  const loadActivities = async () => {
    try {
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error loading activities:', error);
      toast({
        title: "Error loading activities",
        description: "Failed to load activities. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const slug = formData.slug || generateSlug(formData.title);
      
      const activityData = {
        title: formData.title,
        slug,
        description: formData.description || null,
        short_description: formData.short_description || null,
        price: formData.price ? parseFloat(formData.price) : null,
        duration: formData.duration || null,
        difficulty: formData.difficulty || null,
        max_participants: formData.max_participants ? parseInt(formData.max_participants) : null,
        image_url: formData.image_url || null,
        gallery_images: formData.gallery_images.length > 0 ? formData.gallery_images : null,
      };

      if (editingActivity) {
        const { error } = await supabase
          .from('activities')
          .update(activityData)
          .eq('id', editingActivity.id);

        if (error) throw error;
        
        toast({
          title: "Activity updated",
          description: "Activity has been updated successfully"
        });
      } else {
        const { error } = await supabase
          .from('activities')
          .insert([activityData]);

        if (error) throw error;
        
        toast({
          title: "Activity created",
          description: "New activity has been created successfully"
        });
      }

      resetForm();
      setDialogOpen(false);
      loadActivities();
    } catch (error) {
      console.error('Error saving activity:', error);
      toast({
        title: "Error saving activity",
        description: "Failed to save activity. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity);
    setFormData({
      title: activity.title,
      slug: activity.slug,
      description: activity.description || '',
      short_description: activity.short_description || '',
      price: activity.price?.toString() || '',
      duration: activity.duration || '',
      difficulty: activity.difficulty || '',
      max_participants: activity.max_participants?.toString() || '',
      image_url: activity.image_url || '',
      gallery_images: activity.gallery_images || []
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this activity?')) return;

    try {
      const { error } = await supabase
        .from('activities')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Activity deleted",
        description: "Activity has been deleted successfully"
      });
      
      loadActivities();
    } catch (error) {
      console.error('Error deleting activity:', error);
      toast({
        title: "Error deleting activity",
        description: "Failed to delete activity. Please try again.",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      description: '',
      short_description: '',
      price: '',
      duration: '',
      difficulty: '',
      max_participants: '',
      image_url: '',
      gallery_images: []
    });
    setEditingActivity(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setDialogOpen(true);
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/admin/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold">Manage Activities</h1>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Add Activity
        </Button>
      </div>

      <FormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={editingActivity ? 'Edit Activity' : 'Create New Activity'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => {
                  setFormData(prev => ({
                    ...prev,
                    title: e.target.value,
                    slug: generateSlug(e.target.value)
                  }));
                }}
                required
              />
            </div>
            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="short_description">Short Description</Label>
            <Textarea
              id="short_description"
              value={formData.short_description}
              onChange={(e) => setFormData(prev => ({ ...prev, short_description: e.target.value }))}
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price (€)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="e.g., 2 hours, Half day"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="difficulty">Difficulty</Label>
              <Input
                id="difficulty"
                value={formData.difficulty}
                onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
                placeholder="e.g., Easy, Moderate, Hard"
              />
            </div>
            <div>
              <Label htmlFor="max_participants">Max Participants</Label>
              <Input
                id="max_participants"
                type="number"
                value={formData.max_participants}
                onChange={(e) => setFormData(prev => ({ ...prev, max_participants: e.target.value }))}
              />
            </div>
          </div>

          <ImageUploader
            currentImage={formData.image_url}
            onImageUploaded={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
            label="Main Image"
          />

          <div className="space-y-6 pt-6 border-t">
            <h3 className="text-lg font-semibold">Activity Details</h3>
            <p className="text-sm text-muted-foreground">
              {editingActivity ? 'Manage activity details below' : 'Save the activity first to manage details'}
            </p>
            
            {editingActivity ? (
              <>
                <ActivityListManager
                  activityId={editingActivity.id}
                  listType="schedule"
                  title="Schedule Items"
                  description="Manage the schedule for this activity"
                />
                
                <ActivityListManager
                  activityId={editingActivity.id}
                  listType="includes"
                  title="What's Included"
                  description="Manage what's included in this activity"
                />
                
                <ActivityListManager
                  activityId={editingActivity.id}
                  listType="highlights"
                  title="Activity Highlights"
                  description="Manage the highlights for this activity"
                />
              </>
            ) : (
              <div className="text-sm text-muted-foreground space-y-2">
                <div>• Schedule Items - Will be available after creating</div>
                <div>• What's Included - Will be available after creating</div>
                <div>• Activity Highlights - Will be available after creating</div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingActivity ? 'Update Activity' : 'Create Activity'}
            </Button>
          </div>
        </form>
      </FormDialog>

      <div className="grid gap-6">
        {activities.map((activity) => (
          <Card key={activity.id}>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>{activity.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {activity.duration} • {activity.difficulty} • Max {activity.max_participants} people
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(activity)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(activity.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                {activity.image_url && (
                  <img
                    src={activity.image_url}
                    alt={activity.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-2">
                    {activity.short_description}
                  </p>
                  {activity.price && (
                    <p className="font-semibold">€{activity.price}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminActivities;