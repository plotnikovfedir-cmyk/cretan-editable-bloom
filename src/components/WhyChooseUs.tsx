import { CheckCircle, Leaf, Award, Heart } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: Leaf,
      title: "100% Natural",
      description: "All our products are sourced directly from nature, without any artificial additives or preservatives."
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Handpicked by local experts who have been perfecting their craft for generations."
    },
    {
      icon: CheckCircle,
      title: "Authentic Heritage",
      description: "Traditional methods passed down through centuries, preserving the true taste of Crete."
    },
    {
      icon: Heart,
      title: "Family Made",
      description: "Every product tells a story of local families and their passionate dedication to quality."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">
            Why Choose Cretan Guru
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover what makes our products and experiences truly exceptional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <feature.icon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;