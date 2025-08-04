import Navigation from "@/components/Navigation";
import ActivityCard from "@/components/ActivityCard";
import tastingImage from "@/assets/tasting-activity.jpg";
import foragingImage from "@/assets/foraging-activity.jpg";

const Activities = () => {
  const activities = [
    {
      title: "Olive Oil Tasting Experience",
      description: "Join our experts for a guided tasting experience where you'll learn about the nuances of premium Cretan olive oil and its health benefits.",
      image: tastingImage
    },
    {
      title: "Wild Herb Foraging Tour",
      description: "Explore Crete's mountainous terrain with local guides who will teach you to identify and harvest wild herbs used in traditional cuisine.",
      image: foragingImage
    },
    {
      title: "Traditional Cooking Class",
      description: "Learn to prepare authentic Cretan dishes using our olive oils and herbs in a hands-on cooking experience with local chefs.",
      image: tastingImage
    },
    {
      title: "Olive Grove Tour",
      description: "Visit our family-owned olive groves and witness the traditional methods of olive cultivation and oil production that have been passed down for generations.",
      image: foragingImage
    }
  ];

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
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <ActivityCard key={index} {...activity} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activities;