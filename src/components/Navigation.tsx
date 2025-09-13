import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, ChevronDown, ShoppingBag, MapPin, Coffee, Car, LucideIcon } from "lucide-react";
import CartIcon from "@/components/CartIcon";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

// Type definitions for better maintainability
interface NavItem {
  path: string;
  label: string;
  description?: string;
}

interface DropdownMenu {
  trigger: string;
  icon: LucideIcon;
  items: NavItem[];
}

const Navigation = () => {
  // Navigation component with multi-level menu structure
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // New multi-level menu structure
  const menuStructure = {
    mainItems: [
      { path: "/", label: "Home" },
      { path: "/about", label: "About Us" },
    ],
    dropdownMenus: [
      {
        trigger: "Products & Services",
        icon: ShoppingBag,
        items: [
          { path: "/products", label: "Our Products", description: "Local Cretan specialties" },
          { path: "/delivery", label: "Delivery Service", description: "Fast island-wide delivery" },
        ]
      },
      {
        trigger: "Experiences",
        icon: MapPin,
        items: [
          { path: "/activities", label: "Activities", description: "Outdoor adventures & nature" },
          { path: "/events", label: "Events", description: "Cultural events & festivals" },
          { path: "/island-tours", label: "Island Tours", description: "Discover hidden gems" },
          { path: "/wine-tastings", label: "Wine Tastings", description: "Local vineyard experiences" },
        ]
      },
      {
        trigger: "Services",
        icon: Car,
        items: [
          { path: "/taxi", label: "Taxi Service", description: "Reliable transportation" },
        ]
      }
    ],
    endItems: [
      { path: "/blog", label: "Blog" }
    ]
  };

  // Flatten all items for mobile menu
  const allNavItems = [
    ...menuStructure.mainItems,
    ...menuStructure.dropdownMenus.flatMap(menu => menu.items),
    ...menuStructure.endItems
  ];

  // Check if any item in a dropdown is active
  const isDropdownActive = (items: Array<{path: string}>) => 
    items.some(item => location.pathname === item.path);

  return (
    <nav className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-50 nav-enhanced">
      <div className="container mx-auto px-4 py-3 lg:py-4">
        <div className="flex items-center justify-between">
          {/* Logo - always on the left */}
          <Link to="/" className="text-xl lg:text-2xl font-bold text-primary flex-shrink-0">
            Cretan Guru
          </Link>
          
          {/* Desktop Navigation - multi-level menu on large screens */}
          <div className="hidden xl:flex">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center space-x-2">
                {/* Main items */}
                {menuStructure.mainItems.map((item) => (
                  <NavigationMenuItem key={item.path}>
                    <Link
                      to={item.path}
                      className={cn(
                        "px-4 py-2 text-foreground hover:text-primary transition-colors duration-200 font-medium whitespace-nowrap rounded-md hover:bg-muted/50",
                        location.pathname === item.path && "text-primary bg-muted"
                      )}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuItem>
                ))}

                {/* Dropdown menus */}
                {menuStructure.dropdownMenus.map((menu) => (
                  <NavigationMenuItem key={menu.trigger}>
                    <NavigationMenuTrigger
                      className={cn(
                        "text-foreground hover:text-primary font-medium",
                        isDropdownActive(menu.items) && "text-primary"
                      )}
                    >
                      <menu.icon className="h-4 w-4 mr-2" />
                      {menu.trigger}
                    </NavigationMenuTrigger>
                     <NavigationMenuContent>
                      <div className="p-4 w-96">
                        <div className="mb-4 pb-3 border-b">
                          <h3 className="font-semibold text-sm uppercase tracking-wide text-primary flex items-center gap-2">
                            <menu.icon className="h-4 w-4" />
                            {menu.trigger}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {menu.trigger === "Products & Services" 
                              ? "Authentic Cretan products and convenient services"
                              : menu.trigger === "Experiences" 
                              ? "Unforgettable adventures and cultural experiences"
                              : "Professional transportation and support services"}
                          </p>
                        </div>
                        <div className="grid gap-2">
                          {menu.items.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              className={cn(
                                "block p-3 rounded-md hover:bg-muted transition-colors duration-200",
                                location.pathname === item.path && "bg-muted text-primary"
                              )}
                            >
                              <div className="font-medium">{item.label}</div>
                              <div className="text-sm text-muted-foreground mt-1">
                                {item.description}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}

                {/* End items */}
                {menuStructure.endItems.map((item) => (
                  <NavigationMenuItem key={item.path}>
                    <Link
                      to={item.path}
                      className={cn(
                        "px-4 py-2 text-foreground hover:text-primary transition-colors duration-200 font-medium whitespace-nowrap rounded-md hover:bg-muted/50",
                        location.pathname === item.path && "text-primary bg-muted"
                      )}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Tablet Navigation - simplified version */}
          <div className="hidden md:flex xl:hidden items-center space-x-4">
            {/* Show only main items and first few dropdown items */}
            {menuStructure.mainItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 whitespace-nowrap px-3 py-2 rounded-md hover:bg-muted/50",
                  location.pathname === item.path && "text-primary bg-muted"
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
                  {menuStructure.dropdownMenus.map((menu) => (
                    <div key={menu.trigger} className="space-y-2">
                      <h4 className="font-medium text-foreground flex items-center gap-2">
                        <menu.icon className="h-4 w-4" />
                        {menu.trigger}
                      </h4>
                      {menu.items.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "text-sm text-muted-foreground hover:text-primary transition-colors duration-200 py-2 px-4 rounded-md hover:bg-muted ml-6 block",
                            location.pathname === item.path && "text-primary bg-muted"
                          )}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                  {menuStructure.endItems.map((item) => (
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
          
          {/* Right side - Theme Toggle, Cart and Mobile Menu */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Theme Toggle */}
            <div className="order-0">
              <ThemeToggle />
            </div>
            
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
                      <div className="flex items-center justify-between">
                        <Link to="/" className="text-xl font-bold text-primary" onClick={() => setIsOpen(false)}>
                          Cretan Guru
                        </Link>
                        <ThemeToggle />
                      </div>
                    
                    <div className="flex flex-col gap-2">
                      {menuStructure.mainItems.map((item) => (
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
                      
                      {/* Grouped menu items */}
                      {menuStructure.dropdownMenus.map((menu) => (
                        <div key={menu.trigger} className="space-y-2 mt-4">
                          <div className="font-semibold text-primary text-sm uppercase tracking-wide px-4 flex items-center gap-2">
                            <menu.icon className="h-4 w-4" />
                            {menu.trigger}
                          </div>
                          {menu.items.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              onClick={() => setIsOpen(false)}
                              className={cn(
                                "text-base font-medium text-foreground hover:text-primary transition-colors duration-200 py-3 px-6 rounded-lg hover:bg-muted ml-2 block border-l-2 border-transparent hover:border-primary/20",
                                location.pathname === item.path && "text-primary bg-muted border-primary"
                              )}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                      
                      {menuStructure.endItems.map((item) => (
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