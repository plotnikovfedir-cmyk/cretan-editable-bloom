import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Plus, Edit, Trash2, Move } from 'lucide-react';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { FormDialog } from '@/components/admin/FormDialog';

interface InstagramImage {
  id: string;
  image_url: string;
  alt_text: string | null;
  caption: string | null;
  link_url: string | null;
  is_active: boolean;
  order_position: number;
  created_at: string;
  updated_at: string;
}

const AdminInstagramGallery: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [images, setImages] = useState<InstagramImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<InstagramImage | null>(null);
  const [formData, setFormData] = useState({
    image_url: '',
    alt_text: '',
    caption: '',
    link_url: '',
    is_active: true,
    order_position: '0'
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

      loadImages();
    } catch (error) {
      console.error('Error checking admin access:', error);
      navigate('/admin');
    }
  };

  const loadImages = async () => {
    try {
      const { data, error } = await supabase
        .from('instagram_gallery')
        .select('*')
        .order('order_position', { ascending: true });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error loading images:', error);
      toast({
        title: "Error loading images",
        description: "Failed to load gallery images. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const imageData = {
        image_url: formData.image_url,
        alt_text: formData.alt_text || null,
        caption: formData.caption || null,
        link_url: formData.link_url || null,
        is_active: formData.is_active,
        order_position: parseInt(formData.order_position) || 0,
      };

      if (editingImage) {
        const { error } = await supabase
          .from('instagram_gallery')
          .update(imageData)
          .eq('id', editingImage.id);

        if (error) throw error;
        
        toast({
          title: "Image updated",
          description: "Gallery image has been updated successfully"
        });
      } else {
        const { error } = await supabase
          .from('instagram_gallery')
          .insert([imageData]);

        if (error) throw error;
        
        toast({
          title: "Image added",
          description: "New gallery image has been added successfully"
        });
      }

      resetForm();
      setDialogOpen(false);
      loadImages();
    } catch (error) {
      console.error('Error saving image:', error);
      toast({
        title: "Error saving image",
        description: "Failed to save gallery image. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (image: InstagramImage) => {
    setEditingImage(image);
    setFormData({
      image_url: image.image_url,
      alt_text: image.alt_text || '',
      caption: image.caption || '',
      link_url: image.link_url || '',
      is_active: image.is_active,
      order_position: image.order_position.toString()
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const { error } = await supabase
        .from('instagram_gallery')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Image deleted",
        description: "Gallery image has been deleted successfully"
      });
      
      loadImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      toast({
        title: "Error deleting image",
        description: "Failed to delete gallery image. Please try again.",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      image_url: '',
      alt_text: '',
      caption: '',
      link_url: '',
      is_active: true,
      order_position: '0'
    });
    setEditingImage(null);
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
          <h1 className="text-3xl font-bold">Follow Our Journey Gallery</h1>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Add Image
        </Button>
      </div>

      <FormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={editingImage ? 'Edit Gallery Image' : 'Add New Gallery Image'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <ImageUploader
            currentImage={formData.image_url}
            onImageUploaded={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
            label="Gallery Image"
          />

          <div>
            <Label htmlFor="alt_text">Alt Text</Label>
            <Input
              id="alt_text"
              value={formData.alt_text}
              onChange={(e) => setFormData(prev => ({ ...prev, alt_text: e.target.value }))}
              placeholder="Descriptive text for the image"
            />
          </div>

          <div>
            <Label htmlFor="caption">Caption</Label>
            <Textarea
              id="caption"
              value={formData.caption}
              onChange={(e) => setFormData(prev => ({ ...prev, caption: e.target.value }))}
              placeholder="Optional caption for the image"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="link_url">Link URL</Label>
            <Input
              id="link_url"
              type="url"
              value={formData.link_url}
              onChange={(e) => setFormData(prev => ({ ...prev, link_url: e.target.value }))}
              placeholder="Optional link when image is clicked"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="order_position">Order Position</Label>
              <Input
                id="order_position"
                type="number"
                value={formData.order_position}
                onChange={(e) => setFormData(prev => ({ ...prev, order_position: e.target.value }))}
              />
            </div>
            <div className="flex items-center space-x-2 mt-6">
              <Checkbox
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: !!checked }))}
              />
              <Label htmlFor="is_active">Active</Label>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingImage ? 'Update Image' : 'Add Image'}
            </Button>
          </div>
        </form>
      </FormDialog>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <Card key={image.id} className={!image.is_active ? 'opacity-50' : ''}>
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div className="flex items-center gap-2">
                <Move className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">#{image.order_position}</span>
                {!image.is_active && (
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Inactive</span>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(image)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(image.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <img
                src={image.image_url}
                alt={image.alt_text || 'Gallery image'}
                className="w-full h-48 object-cover rounded mb-4"
              />
              {image.caption && (
                <p className="text-sm text-muted-foreground mb-2">{image.caption}</p>
              )}
              {image.link_url && (
                <p className="text-xs text-blue-600 truncate">
                  Link: {image.link_url}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminInstagramGallery;