import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import CartIcon from "@/components/CartIcon";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
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
          
          <div className="flex items-center gap-4">
            <CartIcon />
            
            {/* Mobile menu */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col gap-6 mt-6">
                    <Link to="/" className="text-2xl font-bold text-primary mb-4">
                      Cretan Guru
                    </Link>
                    
                    <div className="flex flex-col gap-4">
                      {navItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "text-lg font-medium text-foreground hover:text-primary transition-colors duration-200 py-2 px-4 rounded-md hover:bg-muted",
                            location.pathname === item.path && "text-primary bg-muted"
                          )}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;