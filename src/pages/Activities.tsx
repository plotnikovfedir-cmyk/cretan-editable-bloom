import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import ActivityCard from "@/components/ActivityCard";
import Footer from "@/components/Footer";
import tastingImage from "@/assets/tasting-activity.jpg";
import foragingImage from "@/assets/foraging-activity.jpg";

interface Activity {
  id: string;
  title: string;
  slug: string;
  short_description?: string;
  description?: string;
  image_url?: string;
  price?: number;
  max_participants?: number;
  difficulty?: string;
  duration?: string;
}

interface Event {
  id: string;
  title: string;
  slug: string;
  short_description?: string;
  description?: string;
  image_url?: string;
  event_date?: string;
  location?: string;
  max_attendees?: number;
  price?: number;
}

const Activities = () => {
  // Fetch activities from database
  const { data: activities = [], isLoading: activitiesLoading } = useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching activities:', error);
        throw error;
      }
      return data as Activity[];
    },
  });


  // Fallback static activities if database is empty
  const staticActivities = [
    {
      title: "Olive Oil Tasting Experience",
      description: "Join our experts for a guided tasting experience where you'll learn about the nuances of premium Cretan olive oil and its health benefits.",
      image: tastingImage,
      slug: "olive-oil-tasting"
    },
    {
      title: "Wild Herb Foraging Tour",
      description: "Explore Crete's mountainous terrain with local guides who will teach you to identify and harvest wild herbs used in traditional cuisine.",
      image: foragingImage,
      slug: "herb-foraging"
    },
    {
      title: "Traditional Cooking Class",
      description: "Learn to prepare authentic Cretan dishes using our olive oils and herbs in a hands-on cooking experience with local chefs.",
      image: tastingImage,
      slug: "cooking-class"
    },
    {
      title: "Olive Grove Tour",
      description: "Visit our family-owned olive groves and witness the traditional methods of olive cultivation and oil production that have been passed down for generations.",
      image: foragingImage,
      slug: "olive-grove-tour"
    }
  ];


  // Convert database activities to card format
  const dbActivities = activities.map(activity => ({
    title: activity.title,
    description: activity.short_description || activity.description || "",
    image: activity.image_url || tastingImage,
    slug: activity.slug,
    price: activity.price,
    difficulty: activity.difficulty,
    duration: activity.duration,
    max_participants: activity.max_participants
  }));

  // Combine database activities with static activities if needed
  const allActivities = [
    ...dbActivities,
    // Show static activities if no database content
    ...(dbActivities.length === 0 ? staticActivities : [])
  ];

  if (activitiesLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Activities</h1>
            <p className="text-xl text-muted-foreground">Loading activities...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Activities</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Immerse yourself in authentic Cretan culture through our unique experiences 
            that connect you with the land and its traditions.
          </p>
          {activities.length > 0 && (
            <p className="text-sm text-muted-foreground mt-4">
              Showing {activities.length} activities
            </p>
          )}
        </div>
        
        {allActivities.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">
              No activities available at the moment. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allActivities.map((activity, index) => (
              <ActivityCard key={`${activity.slug}-${index}`} {...activity} />
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Activities;