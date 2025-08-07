import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import CartIcon from "@/components/CartIcon";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  
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

  // For tablet view - show fewer items in main nav
  const primaryNavItems = navItems.slice(0, 4);
  const secondaryNavItems = navItems.slice(4);

  return (
    <nav className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 lg:py-4">
        <div className="flex items-center justify-between">
          {/* Logo - always on the left */}
          <Link to="/" className="text-xl lg:text-2xl font-bold text-primary flex-shrink-0">
            Cretan Guru
          </Link>
          
          {/* Desktop Navigation - full menu on large screens */}
          <div className="hidden xl:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-foreground hover:text-primary transition-colors duration-200 font-medium whitespace-nowrap",
                  location.pathname === item.path && "text-primary border-b-2 border-primary"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Tablet Navigation - partial menu + more button */}
          <div className="hidden md:flex xl:hidden items-center space-x-4">
            {primaryNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 whitespace-nowrap",
                  location.pathname === item.path && "text-primary border-b-2 border-primary"
                )}
              >
                {item.label}
              </Link>
            ))}
            
            {/* More menu for tablet */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
                  <Menu className="h-4 w-4 mr-1" />
                  More
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <div className="flex flex-col gap-4 mt-6">
                  <h3 className="text-lg font-semibold text-primary mb-2">More Options</h3>
                  {secondaryNavItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-base font-medium text-foreground hover:text-primary transition-colors duration-200 py-2 px-3 rounded-md hover:bg-muted",
                        location.pathname === item.path && "text-primary bg-muted"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          {/* Right side - Cart and Mobile Menu */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Cart - properly positioned on the right */}
            <div className="order-1">
              <CartIcon />
            </div>
            
            {/* Mobile menu button - only on mobile */}
            <div className="md:hidden order-2">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-foreground hover:text-primary h-9 w-9">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                  <div className="flex flex-col gap-6 mt-6">
                    <Link to="/" className="text-xl font-bold text-primary mb-2" onClick={() => setIsOpen(false)}>
                      Cretan Guru
                    </Link>
                    
                    <div className="flex flex-col gap-2">
                      {navItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "text-base font-medium text-foreground hover:text-primary transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-muted",
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