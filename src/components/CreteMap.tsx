import { MapPin, Leaf } from "lucide-react";

const CreteMap = () => {
  const locations = [
    {
      name: "Agios Konstantinos",
      description: "Sacred monastery olive groves",
      x: "25%",
      y: "35%"
    },
    {
      name: "Preveli",
      description: "Heritage olive oil production",
      x: "45%",
      y: "75%"
    },
    {
      name: "Koxaré",
      description: "Ancient village traditions",
      x: "65%", 
      y: "40%"
    },
    {
      name: "Mountain Herbs",
      description: "Wild foraging areas",
      x: "35%",
      y: "25%"
    }
  ];

  const islandTextureStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">
            Our Crete
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover where our authentic products come from across the beautiful island of Crete
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Crete Island Shape (simplified) */}
          <div className="relative w-full h-80 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl shadow-2xl overflow-hidden">
            {/* Island texture overlay */}
            <div className="absolute inset-0 opacity-30" style={islandTextureStyle}></div>
            
            {/* Coastline effect */}
            <div className="absolute inset-0 border-4 border-blue-300/50 rounded-3xl"></div>
            
            {/* Location markers */}
            {locations.map((location, index) => (
              <div 
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{ left: location.x, top: location.y }}
              >
                <div className="relative">
                  {/* Marker pin */}
                  <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg group-hover:scale-125 transition-transform duration-300 flex items-center justify-center">
                    {location.name.includes('Herbs') ? (
                      <Leaf className="w-3 h-3 text-white" />
                    ) : (
                      <MapPin className="w-3 h-3 text-white" />
                    )}
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                    <h4 className="font-semibold text-sm text-foreground">{location.name}</h4>
                    <p className="text-xs text-muted-foreground">{location.description}</p>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white dark:border-t-gray-800"></div>
                  </div>
                  
                  {/* Pulse animation */}
                  <div className="absolute inset-0 w-6 h-6 bg-red-500 rounded-full animate-ping opacity-75"></div>
                </div>
              </div>
            ))}
            
            {/* Island label */}
            <div className="absolute bottom-4 right-4 text-white font-bold text-lg drop-shadow-lg">
              CRETE
            </div>
          </div>
          
          {/* Legend */}
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <MapPin className="w-2 h-2 text-white" />
              </div>
              <span className="text-sm text-muted-foreground">Olive Oil Origins</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <Leaf className="w-2 h-2 text-white" />
              </div>
              <span className="text-sm text-muted-foreground">Wild Herbs Areas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreteMap;