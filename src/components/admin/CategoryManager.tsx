import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit2, Trash2, Folder, Hash } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export const CategoryManager: React.FC = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Category | Tag | null>(null);
  const [activeTab, setActiveTab] = useState<'categories' | 'tags'>('categories');
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [categoriesResponse, tagsResponse] = await Promise.all([
        supabase.from('blog_categories').select('*').order('name'),
        supabase.from('blog_tags').select('*').order('name')
      ]);

      if (categoriesResponse.data) setCategories(categoriesResponse.data);
      if (tagsResponse.data) setTags(tagsResponse.data);
    } catch (error) {
      console.error('Error loading categories/tags:', error);
      toast({
        title: "Error",
        description: "Failed to load categories and tags",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Name is required",
        variant: "destructive",
      });
      return;
    }

    try {
      const slug = generateSlug(formData.name);
      const table = activeTab === 'categories' ? 'blog_categories' : 'blog_tags';
      
      const data = activeTab === 'categories' 
        ? { name: formData.name, slug, description: formData.description }
        : { name: formData.name, slug };

      if (editingItem) {
        // Update existing
        const { error } = await supabase
          .from(table)
          .update(data)
          .eq('id', editingItem.id);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: `${activeTab === 'categories' ? 'Category' : 'Tag'} updated successfully`,
        });
      } else {
        // Create new
        const { error } = await supabase
          .from(table)
          .insert([data]);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: `${activeTab === 'categories' ? 'Category' : 'Tag'} created successfully`,
        });
      }

      resetForm();
      loadData();
    } catch (error) {
      console.error('Error saving:', error);
      toast({
        title: "Error",
        description: `Failed to save ${activeTab === 'categories' ? 'category' : 'tag'}`,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string, type: 'categories' | 'tags') => {
    if (!confirm(`Are you sure you want to delete this ${type.slice(0, -1)}?`)) return;

    try {
      const table = type === 'categories' ? 'blog_categories' : 'blog_tags';
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `${type === 'categories' ? 'Category' : 'Tag'} deleted successfully`,
      });

      loadData();
    } catch (error) {
      console.error('Error deleting:', error);
      toast({
        title: "Error",
        description: `Failed to delete ${type.slice(0, -1)}`,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (item: Category | Tag) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: 'description' in item ? item.description || '' : ''
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({ name: '', description: '' });
    setEditingItem(null);
    setDialogOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === 'categories' ? 'default' : 'outline'}
          onClick={() => setActiveTab('categories')}
          className="flex items-center gap-2"
        >
          <Folder className="h-4 w-4" />
          Categories
        </Button>
        <Button
          variant={activeTab === 'tags' ? 'default' : 'outline'}
          onClick={() => setActiveTab('tags')}
          className="flex items-center gap-2"
        >
          <Hash className="h-4 w-4" />
          Tags
        </Button>
      </div>

      {/* Categories */}
      {activeTab === 'categories' && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Folder className="h-5 w-5" />
              Blog Categories
            </CardTitle>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => { setActiveTab('categories'); resetForm(); }}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingItem ? 'Edit Category' : 'Add Category'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Category name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Description (optional)"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">
                      {editingItem ? 'Update' : 'Create'}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {categories.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No categories yet. Create your first category!
                </p>
              ) : (
                categories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{category.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {category.description || 'No description'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Slug: {category.slug}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(category)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(category.id, 'categories')}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tags */}
      {activeTab === 'tags' && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Hash className="h-5 w-5" />
              Blog Tags
            </CardTitle>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => { setActiveTab('tags'); resetForm(); }}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Tag
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingItem ? 'Edit Tag' : 'Add Tag'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Tag name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">
                      {editingItem ? 'Update' : 'Create'}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {tags.length === 0 ? (
                <p className="text-muted-foreground text-center py-4 w-full">
                  No tags yet. Create your first tag!
                </p>
              ) : (
                tags.map((tag) => (
                  <div key={tag.id} className="flex items-center gap-2 p-2 border rounded-lg">
                    <Badge variant="secondary">{tag.name}</Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(tag)}
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(tag.id, 'tags')}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};