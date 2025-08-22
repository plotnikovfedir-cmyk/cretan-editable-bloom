import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ActivityListManager from './ActivityListManager';
import { Activity, RefreshCw, Eye, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Activity {
  id: string;
  title: string;
  slug: string;
}

interface ListManagerData {
  listType: 'schedule' | 'includes' | 'highlights';
  title: string;
  description: string;
}

const EnhancedActivityManager: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivityId, setSelectedActivityId] = useState<string>('');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const listManagers: ListManagerData[] = [
    {
      listType: 'schedule',
      title: 'Schedule Items',
      description: 'Manage the schedule for this activity'
    },
    {
      listType: 'includes',
      title: "What's Included",
      description: "Manage what's included in this activity"
    },
    {
      listType: 'highlights',
      title: 'Activity Highlights',
      description: 'Manage the highlights for this activity'
    }
  ];

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('activities')
        .select('id, title, slug')
        .order('title');

      if (error) throw error;
      setActivities(data || []);
      
      // Auto-select first activity if none selected
      if (data && data.length > 0 && !selectedActivityId) {
        setSelectedActivityId(data[0].id);
        setSelectedActivity(data[0]);
      }
    } catch (error) {
      console.error('Error loading activities:', error);
      toast({
        title: "Error",
        description: "Failed to load activities",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleActivitySelect = (activityId: string) => {
    const activity = activities.find(a => a.id === activityId);
    setSelectedActivityId(activityId);
    setSelectedActivity(activity || null);
    
    toast({
      title: "Activity Selected",
      description: `Now managing: ${activity?.title}`,
    });
  };

  const filteredActivities = activities.filter(activity =>
    activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Activity Selection Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Activity Management Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Search Activities</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search by title or slug..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={loadActivities}
                disabled={loading}
                className="mt-6"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Select Activity to Manage</label>
              <Select value={selectedActivityId} onValueChange={handleActivitySelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an activity to manage" />
                </SelectTrigger>
                <SelectContent>
                  {filteredActivities.map((activity) => (
                    <SelectItem key={activity.id} value={activity.id}>
                      {activity.title} ({activity.slug})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedActivity && (
              <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg border">
                <Eye className="w-4 h-4 text-primary" />
                <span className="font-medium">Currently Managing:</span>
                <Badge variant="secondary">{selectedActivity.title}</Badge>
                <Badge variant="outline" className="text-xs">
                  ID: {selectedActivity.id}
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Activity List Managers */}
      {selectedActivityId ? (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
          {listManagers.map((manager) => (
            <ActivityListManager
              key={`${selectedActivityId}-${manager.listType}`}
              activityId={selectedActivityId}
              listType={manager.listType}
              title={manager.title}
              description={manager.description}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Activity Selected</h3>
            <p className="text-muted-foreground">
              Please select an activity above to manage its schedule, inclusions, and highlights.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedActivityManager;