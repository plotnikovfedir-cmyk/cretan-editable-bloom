import { MapPin, Leaf, Mountain, Waves } from "lucide-react";
import creteIslandImage from "@/assets/crete-island.jpg";

const CreteMap = () => {
  const locations = [
    {
      name: "Agios Konstantinos",
      description: "Sacred monastery olive groves where monks have cultivated olives for centuries",
      details: "Premium extra virgin olive oil from 800-year-old trees",
      x: "25%",
      y: "35%",
      type: "monastery",
      icon: Mountain
    },
    {
      name: "Preveli",
      description: "Heritage olive oil production with traditional stone mills",
      details: "Coastal region known for its distinctive mineral-rich soil",
      x: "45%",
      y: "75%",
      type: "coastal",
      icon: Waves
    },
    {
      name: "Koxaré",
      description: "Ancient village preserving traditional production methods",
      details: "Family-owned groves passed down through generations",
      x: "65%", 
      y: "40%",
      type: "village",
      icon: MapPin
    },
    {
      name: "Mountain Herbs",
      description: "Wild foraging areas in the Cretan highlands",
      details: "Oregano, thyme, and sage growing wild at 1000m altitude",
      x: "35%",
      y: "25%",
      type: "herbs",
      icon: Leaf
    },
    {
      name: "Rethymno Coast",
      description: "Seaside olive groves with unique terroir",
      details: "Sea-influenced microclimate creates distinctive flavor profile",
      x: "55%",
      y: "30%",
      type: "coastal",
      icon: Waves
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

        <div className="max-w-5xl mx-auto relative">
          {/* Real Crete Island Image */}
          <div className="relative w-full h-96 shadow-2xl overflow-hidden rounded-2xl"
               style={{
                 backgroundImage: `url(${creteIslandImage})`,
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
               }}>
            {/* Overlay for better marker visibility */}
            <div className="absolute inset-0 bg-black/20"></div>
            
            {/* Production zones overlay */}
            <div className="absolute top-0 left-0 w-1/3 h-2/3 bg-yellow-400/20 rounded-full blur-xl opacity-60"></div>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-green-400/30 rounded-full blur-xl opacity-60"></div>
            
            {/* Location markers */}
            {locations.map((location, index) => {
              const IconComponent = location.icon;
              const getMarkerColor = () => {
                switch(location.type) {
                  case 'monastery': return 'bg-amber-500';
                  case 'coastal': return 'bg-blue-500';
                  case 'village': return 'bg-green-600';
                  case 'herbs': return 'bg-purple-500';
                  default: return 'bg-red-500';
                }
              };
              
              return (
                <div 
                  key={index}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  style={{ left: location.x, top: location.y }}
                >
                  <div className="relative">
                    {/* Marker pin with glow */}
                    <div className={`w-8 h-8 ${getMarkerColor()} rounded-full border-3 border-white shadow-xl group-hover:scale-125 transition-all duration-300 flex items-center justify-center relative overflow-hidden`}>
                      <IconComponent className="w-4 h-4 text-white z-10" />
                      <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-colors"></div>
                    </div>
                    
                    {/* Enhanced Tooltip */}
                    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-900 px-4 py-3 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-20 border border-gray-200 dark:border-gray-700 min-w-64">
                      <div className="space-y-2">
                        <h4 className="font-display font-bold text-sm text-foreground">{location.name}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{location.description}</p>
                        <p className="text-xs text-primary font-medium">{location.details}</p>
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white dark:border-t-gray-900"></div>
                    </div>
                    
                    {/* Pulse animation with matching color */}
                    <div className={`absolute inset-0 w-8 h-8 ${getMarkerColor()} rounded-full animate-ping opacity-40`}></div>
                    
                    {/* Glow effect */}
                    <div className={`absolute inset-0 w-8 h-8 ${getMarkerColor()} rounded-full blur-sm opacity-60 group-hover:opacity-80 transition-opacity`}></div>
                  </div>
                </div>
              );
            })}
            
            {/* Island label */}
            <div className="absolute bottom-6 right-6 text-white font-display font-bold text-2xl drop-shadow-xl">
              ΚΡΗΤΗ
              <div className="text-xs font-sans font-normal opacity-80">CRETE</div>
            </div>
          </div>
          
          {/* Enhanced Legend */}
          <div className="mt-12 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="font-display font-semibold text-center mb-6 text-foreground">Production Regions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                  <Mountain className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm text-muted-foreground">Monastery Groves</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <Waves className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm text-muted-foreground">Coastal Regions</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                  <MapPin className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm text-muted-foreground">Traditional Villages</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
                  <Leaf className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm text-muted-foreground">Wild Herbs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreteMap;