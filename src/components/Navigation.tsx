import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Our Products" },
    { path: "/activities", label: "Activities" },
    { path: "/events", label: "Events" },
    { path: "/taxi", label: "Taxi" },
    { path: "/delivery", label: "Delivery" },
    { path: "/blog", label: "Blog" },
  ];

  return (
    <nav className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            Cretan Guru
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-foreground hover:text-primary transition-colors duration-200 font-medium",
                  location.pathname === item.path && "text-primary border-b-2 border-primary"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          {/* Mobile menu - simplified for this example */}
          <div className="md:hidden">
            <button className="text-foreground hover:text-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;