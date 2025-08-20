import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BookingModal from "@/components/BookingModal";
import tastingImage from "@/assets/tasting-activity.jpg";
import foragingImage from "@/assets/foraging-activity.jpg";

interface ActivityData {
  title: string;
  description: string;
  image: string;
  duration: string;
  price: string;
  groupSize: string;
  includes: string[];
  schedule: string[];
  highlights: string[];
  difficulty: string;
  location: string;
  detailedDescription: string;
}

const ActivityDetail = () => {
  const { slug } = useParams();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Fetch activity from database with dynamic lists
  const { data: dbActivity, isLoading } = useQuery({
    queryKey: ['activity', slug],
    queryFn: async () => {
      if (!slug) return null;
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching activity:', error);
        return null;
      }
      return data;
    },
    enabled: !!slug,
  });

  // Fetch dynamic lists for the activity
  const { data: scheduleItems } = useQuery({
    queryKey: ['activity-schedule', dbActivity?.id],
    queryFn: async () => {
      if (!dbActivity?.id) return [];
      const { data, error } = await supabase
        .from('activity_schedule_items')
        .select('*')
        .eq('activity_id', dbActivity.id)
        .order('order_position', { ascending: true });
      
      if (error) {
        console.error('Error fetching schedule items:', error);
        return [];
      }
      return data;
    },
    enabled: !!dbActivity?.id,
  });

  const { data: includesItems } = useQuery({
    queryKey: ['activity-includes', dbActivity?.id],
    queryFn: async () => {
      if (!dbActivity?.id) return [];
      const { data, error } = await supabase
        .from('activity_includes_items')
        .select('*')
        .eq('activity_id', dbActivity.id)
        .order('order_position', { ascending: true });
      
      if (error) {
        console.error('Error fetching includes items:', error);
        return [];
      }
      return data;
    },
    enabled: !!dbActivity?.id,
  });

  const { data: highlightsItems } = useQuery({
    queryKey: ['activity-highlights', dbActivity?.id],
    queryFn: async () => {
      if (!dbActivity?.id) return [];
      const { data, error } = await supabase
        .from('activity_highlights_items')
        .select('*')
        .eq('activity_id', dbActivity.id)
        .order('order_position', { ascending: true });
      
      if (error) {
        console.error('Error fetching highlights items:', error);
        return [];
      }
      return data;
    },
    enabled: !!dbActivity?.id,
  });

  const activities: Record<string, ActivityData> = {
    "olive-oil-tasting": {
      title: "Olive Oil Tasting Experience",
      description: "Join our experts for a guided tasting experience where you'll learn about the nuances of premium Cretan olive oil and its health benefits.",
      image: tastingImage,
      duration: "2 hours",
      price: "€45 per person",
      groupSize: "8-12 people",
      includes: [
        "Guided tasting of 6 premium olive oils",
        "Traditional Cretan snacks",
        "Educational materials about olive oil production",
        "Take-home bottle of your favorite oil",
        "Certificate of completion"
      ],
      schedule: [
        "Welcome and introduction (15 minutes)",
        "History of Cretan olive cultivation (20 minutes)", 
        "Guided tasting session (60 minutes)",
        "Q&A and discussion (20 minutes)",
        "Shopping and certificates (25 minutes)"
      ],
      highlights: [
        "Learn to identify different olive varieties",
        "Understand quality indicators",
        "Discover health benefits of extra virgin olive oil",
        "Meet local olive oil producers",
        "Taste oils from century-old olive groves"
      ],
      difficulty: "Easy - suitable for all ages",
      location: "Chania Old Town Tasting Room",
      detailedDescription: "Immerse yourself in the world of Cretan liquid gold with our comprehensive olive oil tasting experience. Led by certified olive oil sommeliers, this journey takes you through the fascinating world of extra virgin olive oil production, from ancient groves to your table. You'll discover how soil, climate, and traditional methods create oils with distinct personalities, and learn to appreciate the subtle differences that make Cretan olive oil world-renowned. Our intimate tasting room in Chania's atmospheric old town provides the perfect setting for this sensory adventure."
    },
    "herb-foraging": {
      title: "Wild Herb Foraging Tour",
      description: "Explore Crete's mountainous terrain with local guides who will teach you to identify and harvest wild herbs used in traditional cuisine.",
      image: foragingImage,
      duration: "4 hours",
      price: "€65 per person",
      groupSize: "6-10 people",
      includes: [
        "Professional foraging guide",
        "Traditional herbal tea tasting",
        "Foraging basket and tools",
        "Identification guide booklet",
        "Fresh herbs to take home",
        "Light mountain snack"
      ],
      schedule: [
        "Meet at village square (9:00 AM)",
        "Hike to foraging areas (45 minutes)",
        "Guided foraging experience (2 hours)",
        "Traditional tea preparation (30 minutes)",
        "Return hike with herb processing tips (45 minutes)"
      ],
      highlights: [
        "Learn from third-generation foragers",
        "Discover 15+ edible wild plants",
        "Traditional preparation methods",
        "Sustainable harvesting practices",
        "Mountain views and pristine nature"
      ],
      difficulty: "Moderate - requires walking on mountain trails",
      location: "White Mountains foothills",
      detailedDescription: "Join experienced local foragers on an authentic journey through Crete's wild landscapes, where knowledge passed down through generations comes alive. This isn't just a nature walk – it's a deep dive into traditional Cretan wisdom about the healing and culinary properties of wild plants. Your guide, whose family has foraged these mountains for over a century, will teach you to recognize, harvest, and use the herbs that have sustained local communities for millennia. The experience combines gentle hiking through beautiful terrain with hands-on learning about sustainable practices and traditional uses of wild plants."
    },
    "cooking-class": {
      title: "Traditional Cooking Class",
      description: "Learn to prepare authentic Cretan dishes using our olive oils and herbs in a hands-on cooking experience with local chefs.",
      image: tastingImage,
      duration: "3.5 hours",
      price: "€75 per person",
      groupSize: "8-12 people",
      includes: [
        "Professional chef instruction",
        "All ingredients and cooking equipment",
        "Recipe booklet to take home",
        "Full meal with wine pairing",
        "Apron and cooking certificates",
        "Market tour (optional)"
      ],
      schedule: [
        "Welcome and market tour (30 minutes)",
        "Cooking preparation and techniques (45 minutes)",
        "Hands-on cooking session (2 hours)",
        "Dining and wine pairing (45 minutes)",
        "Recipe discussion and farewell (30 minutes)"
      ],
      highlights: [
        "Cook 4-5 traditional Cretan dishes",
        "Learn family recipes passed down for generations",
        "Master the use of local herbs and olive oil",
        "Understand Cretan dietary traditions",
        "Take home authentic recipes"
      ],
      difficulty: "Easy to moderate - all cooking levels welcome",
      location: "Traditional Cretan kitchen, Rethymno",
      detailedDescription: "Step into an authentic Cretan kitchen where tradition meets passion, and learn to create the dishes that have nourished families for generations. Our cooking class is more than just instruction – it's cultural immersion where you'll understand how food connects to land, seasons, and community in Cretan life. Using ingredients sourced from local producers, including our own olive oils and foraged herbs, you'll master techniques that transform simple ingredients into extraordinary flavors. The experience culminates in sharing the meal you've created, accompanied by carefully selected local wines."
    },
    "olive-grove-tour": {
      title: "Olive Grove Tour",
      description: "Visit our family-owned olive groves and witness the traditional methods of olive cultivation and oil production that have been passed down for generations.",
      image: foragingImage,
      duration: "3 hours",
      price: "€55 per person",
      groupSize: "10-15 people",
      includes: [
        "Transportation to olive groves",
        "Expert guide and olive farmer",
        "Olive oil mill demonstration",
        "Fresh bread and olive oil tasting",
        "Bottle of estate olive oil",
        "Traditional Cretan breakfast"
      ],
      schedule: [
        "Departure from meeting point (9:00 AM)",
        "Olive grove tour and history (60 minutes)",
        "Traditional mill demonstration (45 minutes)",
        "Tasting session with local products (45 minutes)",
        "Return journey with Q&A (30 minutes)"
      ],
      highlights: [
        "Walk among 800-year-old olive trees",
        "See traditional stone mills in operation",
        "Meet multi-generation olive farming families",
        "Learn about sustainable farming practices",
        "Taste fresh oil straight from the press"
      ],
      difficulty: "Easy - minimal walking required",
      location: "Family estate near Kolymvari",
      detailedDescription: "Journey to a working olive estate where ancient trees tell stories of generations past, and traditional methods still reign supreme. This isn't a tourist attraction – it's a living, breathing farm where the same families have tended olive groves for centuries. You'll walk among trees that may have witnessed the rise and fall of empires, and understand how the unique Cretan approach to olive cultivation creates oils of exceptional quality. The experience includes meeting the farmers themselves, who will share stories, techniques, and passion that have been passed down through their families."
    }
  };

  // Use database activity if available, otherwise fallback to static data
  const staticActivity = slug ? activities[slug] : null;
  const activity = dbActivity ? {
    title: dbActivity.title,
    description: dbActivity.description || dbActivity.short_description || "",
    image: dbActivity.image_url || (staticActivity?.image || tastingImage),
    duration: dbActivity.duration || "Various",
    price: dbActivity.price ? `€${dbActivity.price} per person` : "Contact for pricing",
    groupSize: dbActivity.max_participants ? `Up to ${dbActivity.max_participants} people` : "Various",
    includes: includesItems?.map(item => item.item_text) || staticActivity?.includes || ["Professional guidance", "All necessary equipment", "Local expertise"],
    schedule: scheduleItems?.map(item => item.item_text) || staticActivity?.schedule || ["Flexible scheduling available"],
    highlights: highlightsItems?.map(item => item.item_text) || staticActivity?.highlights || ["Authentic experience", "Expert guidance", "Local insights"],
    difficulty: dbActivity.difficulty || "Suitable for all levels",
    location: staticActivity?.location || "Various locations",
    detailedDescription: dbActivity.description || staticActivity?.detailedDescription || "Contact us for more details about this amazing activity."
  } : staticActivity;

  // Show loading while data is being fetched
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="animate-pulse">
            <div className="h-64 bg-muted rounded-lg mb-8"></div>
            <div className="h-8 bg-muted rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!activity) {
    return <Navigate to="/activities" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={activity.image} 
          alt={activity.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-end">
          <div className="container mx-auto px-4 pb-16">
            <div className="max-w-4xl">
              <Badge variant="secondary" className="mb-4 bg-white/20 text-white">
                {activity.difficulty}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {activity.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {activity.duration}
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {activity.groupSize}
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  {activity.price}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link to="/activities" className="text-primary hover:text-primary/80 font-medium">
            ← Back to Activities
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">About This Experience</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {activity.detailedDescription}
              </p>
            </section>

            {/* Highlights */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Experience Highlights</h2>
              <ul className="space-y-3">
                {activity.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-muted-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Schedule */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">What to Expect</h2>
              <div className="space-y-4">
                {activity.schedule.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* What's Included */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">What's Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activity.includes.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Booking Card */}
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-foreground mb-2">{activity.price}</div>
                  <div className="text-muted-foreground">per person</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium text-foreground">{activity.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Group Size:</span>
                    <span className="font-medium text-foreground">{activity.groupSize}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium text-foreground">{activity.location}</span>
                  </div>
                </div>

                <Button 
                  className="w-full mb-4"
                  onClick={() => setIsBookingModalOpen(true)}
                >
                  Book Now
                </Button>

                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Questions? Contact us directly
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      WhatsApp
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Call
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Important Information</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Advance booking required</li>
                  <li>• Cancellation up to 24h before</li>
                  <li>• Weather-dependent activities</li>
                  <li>• Comfortable shoes recommended</li>
                  <li>• Suitable for most fitness levels</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
      
                  <BookingModal
                    isOpen={isBookingModalOpen}
                    onClose={() => setIsBookingModalOpen(false)}
                    type="activity"
                    title={activity.title}
                    price={activity.price}
                    referenceId={dbActivity?.id}
                  />
    </div>
  );
};

export default ActivityDetail;