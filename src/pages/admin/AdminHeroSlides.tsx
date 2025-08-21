import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FormDialog } from '@/components/admin/FormDialog';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const heroSlideSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().optional(),
  image_url: z.string().min(1, 'Image is required'),
  cta_text: z.string().optional(),
  cta_link: z.string().optional(),
  page_type: z.string().min(1, 'Page type is required'),
  order_position: z.number().int().min(0).optional(),
  is_active: z.boolean().optional(),
});

type HeroSlideFormData = z.infer<typeof heroSlideSchema>;

interface HeroSlide {
  id: string;
  title: string;
  subtitle?: string;
  image_url: string;
  cta_text?: string;
  cta_link?: string;
  page_type: string;
  order_position?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const pageTypeOptions = [
  { value: 'home', label: 'Homepage' },
  { value: 'delivery', label: 'Delivery' },
  { value: 'taxi', label: 'Taxi' },
];

const AdminHeroSlides = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [deleteSlideId, setDeleteSlideId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPageType, setFilterPageType] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<HeroSlideFormData>({
    resolver: zodResolver(heroSlideSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      image_url: '',
      cta_text: '',
      cta_link: '',
      page_type: 'home',
      order_position: 0,
      is_active: true,
    },
  });

  const { data: slides, isLoading } = useQuery({
    queryKey: ['admin-hero-slides'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hero_slides')
        .select('*')
        .order('page_type, order_position');
      
      if (error) throw error;
      return data as HeroSlide[];
    },
  });

  const createSlideMutation = useMutation({
    mutationFn: async (data: HeroSlideFormData) => {
      const { error } = await supabase
        .from('hero_slides')
        .insert({
          title: data.title,
          subtitle: data.subtitle || null,
          image_url: data.image_url,
          cta_text: data.cta_text || null,
          cta_link: data.cta_link || null,
          page_type: data.page_type,
          order_position: data.order_position || 0,
          is_active: data.is_active || true,
        });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-hero-slides'] });
      setIsDialogOpen(false);
      form.reset();
      toast({ title: 'Hero slide created successfully' });
    },
    onError: (error) => {
      toast({ title: 'Error creating slide', description: error.message, variant: 'destructive' });
    },
  });

  const updateSlideMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: HeroSlideFormData }) => {
      const { error } = await supabase
        .from('hero_slides')
        .update({
          title: data.title,
          subtitle: data.subtitle || null,
          image_url: data.image_url,
          cta_text: data.cta_text || null,
          cta_link: data.cta_link || null,
          page_type: data.page_type,
          order_position: data.order_position || 0,
          is_active: data.is_active || true,
        })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-hero-slides'] });
      setIsDialogOpen(false);
      setEditingSlide(null);
      form.reset();
      toast({ title: 'Hero slide updated successfully' });
    },
    onError: (error) => {
      toast({ title: 'Error updating slide', description: error.message, variant: 'destructive' });
    },
  });

  const deleteSlideMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('hero_slides')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-hero-slides'] });
      setDeleteSlideId(null);
      toast({ title: 'Hero slide deleted successfully' });
    },
    onError: (error) => {
      toast({ title: 'Error deleting slide', description: error.message, variant: 'destructive' });
    },
  });

  const openCreateDialog = () => {
    setEditingSlide(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const openEditDialog = (slide: HeroSlide) => {
    setEditingSlide(slide);
    form.reset({
      title: slide.title,
      subtitle: slide.subtitle || '',
      image_url: slide.image_url,
      cta_text: slide.cta_text || '',
      cta_link: slide.cta_link || '',
      page_type: slide.page_type,
      order_position: slide.order_position || 0,
      is_active: slide.is_active,
    });
    setIsDialogOpen(true);
  };

  const onSubmit = (data: HeroSlideFormData) => {
    if (editingSlide) {
      updateSlideMutation.mutate({ id: editingSlide.id, data });
    } else {
      createSlideMutation.mutate(data);
    }
  };

  const filteredSlides = slides?.filter(slide => {
    const matchesSearch = slide.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPageType = filterPageType === '' || slide.page_type === filterPageType;
    return matchesSearch && matchesPageType;
  }) || [];

  if (isLoading) {
    return <div className="p-6">Loading hero slides...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Hero Slides Management</span>
            <Button onClick={openCreateDialog} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Hero Slide
            </Button>
          </CardTitle>
          <CardDescription>
            Manage hero slides for different pages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search slides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={filterPageType} onValueChange={setFilterPageType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Pages</SelectItem>
                {pageTypeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Page</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSlides.map((slide) => (
                <TableRow key={slide.id}>
                  <TableCell className="font-medium">{slide.title}</TableCell>
                  <TableCell>
                    {pageTypeOptions.find(opt => opt.value === slide.page_type)?.label || slide.page_type}
                  </TableCell>
                  <TableCell>{slide.order_position || 0}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      slide.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {slide.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(slide.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(slide)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDeleteSlideId(slide.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <FormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title={editingSlide ? 'Edit Hero Slide' : 'Create New Hero Slide'}
        className="max-w-4xl"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="page_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Page Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select page type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {pageTypeOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cta_text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CTA Text</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cta_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CTA Link</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="order_position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order Position</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtitle</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={2} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hero Image</FormLabel>
                  <FormControl>
                    <ImageUploader
                      onImageUploaded={field.onChange}
                      currentImage={field.value}
                      bucket="admin-uploads"
                      folder="hero-slides"
                      label="Upload Hero Image"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={createSlideMutation.isPending || updateSlideMutation.isPending}
              >
                {editingSlide ? 'Update Slide' : 'Create Slide'}
              </Button>
            </div>
          </form>
        </Form>
      </FormDialog>

      <AlertDialog open={!!deleteSlideId} onOpenChange={() => setDeleteSlideId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the hero slide.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteSlideId && deleteSlideMutation.mutate(deleteSlideId)}
              disabled={deleteSlideMutation.isPending}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminHeroSlides;