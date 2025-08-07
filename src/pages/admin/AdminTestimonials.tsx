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
import { ArrowLeft, Plus, Edit, Trash2, Star } from 'lucide-react';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { FormDialog } from '@/components/admin/FormDialog';

interface Testimonial {
  id: string;
  customer_name: string;
  customer_location: string | null;
  customer_image_url: string | null;
  testimonial_text: string;
  rating: number | null;
  is_featured: boolean;
  is_active: boolean;
  order_position: number;
  created_at: string;
  updated_at: string;
}

const AdminTestimonials: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_location: '',
    customer_image_url: '',
    testimonial_text: '',
    rating: '5',
    is_featured: false,
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

      loadTestimonials();
    } catch (error) {
      console.error('Error checking admin access:', error);
      navigate('/admin');
    }
  };

  const loadTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('order_position', { ascending: true });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error loading testimonials:', error);
      toast({
        title: "Error loading testimonials",
        description: "Failed to load testimonials. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const testimonialData = {
        customer_name: formData.customer_name,
        customer_location: formData.customer_location || null,
        customer_image_url: formData.customer_image_url || null,
        testimonial_text: formData.testimonial_text,
        rating: parseInt(formData.rating) || null,
        is_featured: formData.is_featured,
        is_active: formData.is_active,
        order_position: parseInt(formData.order_position) || 0,
      };

      if (editingTestimonial) {
        const { error } = await supabase
          .from('testimonials')
          .update(testimonialData)
          .eq('id', editingTestimonial.id);

        if (error) throw error;
        
        toast({
          title: "Testimonial updated",
          description: "Testimonial has been updated successfully"
        });
      } else {
        const { error } = await supabase
          .from('testimonials')
          .insert([testimonialData]);

        if (error) throw error;
        
        toast({
          title: "Testimonial added",
          description: "New testimonial has been added successfully"
        });
      }

      resetForm();
      setDialogOpen(false);
      loadTestimonials();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      toast({
        title: "Error saving testimonial",
        description: "Failed to save testimonial. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      customer_name: testimonial.customer_name,
      customer_location: testimonial.customer_location || '',
      customer_image_url: testimonial.customer_image_url || '',
      testimonial_text: testimonial.testimonial_text,
      rating: testimonial.rating?.toString() || '5',
      is_featured: testimonial.is_featured,
      is_active: testimonial.is_active,
      order_position: testimonial.order_position.toString()
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Testimonial deleted",
        description: "Testimonial has been deleted successfully"
      });
      
      loadTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast({
        title: "Error deleting testimonial",
        description: "Failed to delete testimonial. Please try again.",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      customer_name: '',
      customer_location: '',
      customer_image_url: '',
      testimonial_text: '',
      rating: '5',
      is_featured: false,
      is_active: true,
      order_position: '0'
    });
    setEditingTestimonial(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setDialogOpen(true);
  };

  const renderStars = (rating: number | null) => {
    if (!rating) return null;
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
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
          <h1 className="text-3xl font-bold">Manage Testimonials</h1>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      <FormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customer_name">Customer Name</Label>
              <Input
                id="customer_name"
                value={formData.customer_name}
                onChange={(e) => setFormData(prev => ({ ...prev, customer_name: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="customer_location">Location</Label>
              <Input
                id="customer_location"
                value={formData.customer_location}
                onChange={(e) => setFormData(prev => ({ ...prev, customer_location: e.target.value }))}
                placeholder="e.g., London, UK"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="testimonial_text">Testimonial</Label>
            <Textarea
              id="testimonial_text"
              value={formData.testimonial_text}
              onChange={(e) => setFormData(prev => ({ ...prev, testimonial_text: e.target.value }))}
              rows={4}
              required
            />
          </div>

          <ImageUploader
            currentImage={formData.customer_image_url}
            onImageUploaded={(url) => setFormData(prev => ({ ...prev, customer_image_url: url }))}
            label="Customer Photo (Optional)"
          />

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="rating">Rating</Label>
              <Input
                id="rating"
                type="number"
                min="1"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData(prev => ({ ...prev, rating: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="order_position">Order Position</Label>
              <Input
                id="order_position"
                type="number"
                value={formData.order_position}
                onChange={(e) => setFormData(prev => ({ ...prev, order_position: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: !!checked }))}
                />
                <Label htmlFor="is_featured">Featured</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: !!checked }))}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingTestimonial ? 'Update Testimonial' : 'Add Testimonial'}
            </Button>
          </div>
        </form>
      </FormDialog>

      <div className="grid gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className={!testimonial.is_active ? 'opacity-50' : ''}>
            <CardHeader className="flex flex-row items-start justify-between">
              <div className="flex items-center gap-4">
                {testimonial.customer_image_url && (
                  <img
                    src={testimonial.customer_image_url}
                    alt={testimonial.customer_name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {testimonial.customer_name}
                    {testimonial.is_featured && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Featured</span>
                    )}
                    {!testimonial.is_active && (
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Inactive</span>
                    )}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {testimonial.customer_location && (
                      <p className="text-sm text-muted-foreground">{testimonial.customer_location}</p>
                    )}
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(testimonial)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(testimonial.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{testimonial.testimonial_text}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Order: #{testimonial.order_position}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminTestimonials;