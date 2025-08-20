import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, GripVertical, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ListItem {
  id: string;
  item_text: string;
  order_position: number;
}

interface ActivityListManagerProps {
  activityId: string;
  listType: 'schedule' | 'includes' | 'highlights';
  title: string;
  description?: string;
}

const ActivityListManager: React.FC<ActivityListManagerProps> = ({
  activityId,
  listType,
  title,
  description
}) => {
  const [items, setItems] = useState<ListItem[]>([]);
  const [newItemText, setNewItemText] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const getTableName = () => {
    switch (listType) {
      case 'schedule': return 'activity_schedule_items';
      case 'includes': return 'activity_includes_items';
      case 'highlights': return 'activity_highlights_items';
    }
  };

  useEffect(() => {
    if (activityId) {
      loadItems();
    }
  }, [activityId]);

  const loadItems = async () => {
    try {
      setLoading(true);
      let query;
      
      switch (listType) {
        case 'schedule':
          query = supabase
            .from('activity_schedule_items')
            .select('*')
            .eq('activity_id', activityId);
          break;
        case 'includes':
          query = supabase
            .from('activity_includes_items')
            .select('*')
            .eq('activity_id', activityId);
          break;
        case 'highlights':
          query = supabase
            .from('activity_highlights_items')
            .select('*')
            .eq('activity_id', activityId);
          break;
      }
      
      const { data, error } = await query.order('order_position', { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error(`Error loading ${listType} items:`, error);
      toast({
        title: "Error",
        description: `Failed to load ${listType} items`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addItem = async () => {
    if (!newItemText.trim()) return;

    try {
      const maxPosition = items.length > 0 ? Math.max(...items.map(item => item.order_position)) : 0;
      let query;
      
      switch (listType) {
        case 'schedule':
          query = supabase
            .from('activity_schedule_items')
            .insert([{
              activity_id: activityId,
              item_text: newItemText.trim(),
              order_position: maxPosition + 1
            }]);
          break;
        case 'includes':
          query = supabase
            .from('activity_includes_items')
            .insert([{
              activity_id: activityId,
              item_text: newItemText.trim(),
              order_position: maxPosition + 1
            }]);
          break;
        case 'highlights':
          query = supabase
            .from('activity_highlights_items')
            .insert([{
              activity_id: activityId,
              item_text: newItemText.trim(),
              order_position: maxPosition + 1
            }]);
          break;
      }
      
      const { data, error } = await query.select().single();

      if (error) throw error;

      setItems([...items, data]);
      setNewItemText('');
      
      toast({
        title: "Success",
        description: `${listType} item added successfully`
      });
    } catch (error) {
      console.error(`Error adding ${listType} item:`, error);
      toast({
        title: "Error",
        description: `Failed to add ${listType} item`,
        variant: "destructive"
      });
    }
  };

  const updateItem = async (itemId: string, newText: string) => {
    try {
      let query;
      
      switch (listType) {
        case 'schedule':
          query = supabase
            .from('activity_schedule_items')
            .update({ item_text: newText })
            .eq('id', itemId);
          break;
        case 'includes':
          query = supabase
            .from('activity_includes_items')
            .update({ item_text: newText })
            .eq('id', itemId);
          break;
        case 'highlights':
          query = supabase
            .from('activity_highlights_items')
            .update({ item_text: newText })
            .eq('id', itemId);
          break;
      }

      const { error } = await query;

      if (error) throw error;

      setItems(items.map(item => 
        item.id === itemId ? { ...item, item_text: newText } : item
      ));

      toast({
        title: "Success",
        description: `${listType} item updated successfully`
      });
    } catch (error) {
      console.error(`Error updating ${listType} item:`, error);
      toast({
        title: "Error",
        description: `Failed to update ${listType} item`,
        variant: "destructive"
      });
    }
  };

  const deleteItem = async (itemId: string) => {
    try {
      let query;
      
      switch (listType) {
        case 'schedule':
          query = supabase
            .from('activity_schedule_items')
            .delete()
            .eq('id', itemId);
          break;
        case 'includes':
          query = supabase
            .from('activity_includes_items')
            .delete()
            .eq('id', itemId);
          break;
        case 'highlights':
          query = supabase
            .from('activity_highlights_items')
            .delete()
            .eq('id', itemId);
          break;
      }

      const { error } = await query;

      if (error) throw error;

      setItems(items.filter(item => item.id !== itemId));
      
      toast({
        title: "Success",
        description: `${listType} item deleted successfully`
      });
    } catch (error) {
      console.error(`Error deleting ${listType} item:`, error);
      toast({
        title: "Error",
        description: `Failed to delete ${listType} item`,
        variant: "destructive"
      });
    }
  };

  const moveItem = async (itemId: string, direction: 'up' | 'down') => {
    const currentIndex = items.findIndex(item => item.id === itemId);
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === items.length - 1)
    ) {
      return;
    }

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const reorderedItems = [...items];
    [reorderedItems[currentIndex], reorderedItems[newIndex]] = [reorderedItems[newIndex], reorderedItems[currentIndex]];

    // Update order positions
    const updates = reorderedItems.map((item, index) => ({
      id: item.id,
      order_position: index + 1
    }));

    try {
      for (const update of updates) {
        let query;
        
        switch (listType) {
          case 'schedule':
            query = supabase
              .from('activity_schedule_items')
              .update({ order_position: update.order_position })
              .eq('id', update.id);
            break;
          case 'includes':
            query = supabase
              .from('activity_includes_items')
              .update({ order_position: update.order_position })
              .eq('id', update.id);
            break;
          case 'highlights':
            query = supabase
              .from('activity_highlights_items')
              .update({ order_position: update.order_position })
              .eq('id', update.id);
            break;
        }

        const { error } = await query;
        if (error) throw error;
      }

      setItems(reorderedItems.map((item, index) => ({
        ...item,
        order_position: index + 1
      })));

      toast({
        title: "Success",
        description: `${listType} items reordered successfully`
      });
    } catch (error) {
      console.error(`Error reordering ${listType} items:`, error);
      toast({
        title: "Error",
        description: `Failed to reorder ${listType} items`,
        variant: "destructive"
      });
    }
  };

  if (!activityId) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Save the activity first to manage {listType} items.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {title}
          <Badge variant="outline">{items.length} items</Badge>
        </CardTitle>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add new item */}
        <div className="flex gap-2">
          <Input
            placeholder={`Add new ${listType} item...`}
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addItem()}
          />
          <Button onClick={addItem} disabled={!newItemText.trim()}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Items list */}
        {loading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item, index) => (
              <div key={item.id} className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                <div className="flex flex-col gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveItem(item.id, 'up')}
                    disabled={index === 0}
                    className="h-4 w-4 p-0"
                  >
                    ↑
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveItem(item.id, 'down')}
                    disabled={index === items.length - 1}
                    className="h-4 w-4 p-0"
                  >
                    ↓
                  </Button>
                </div>
                <GripVertical className="w-4 h-4 text-muted-foreground" />
                <Input
                  value={item.item_text}
                  onChange={(e) => updateItem(item.id, e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteItem(item.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            {items.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No {listType} items yet. Add some items above.
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityListManager;