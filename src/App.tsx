import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { ScrollToTop } from "@/components/ScrollToTop";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import Products from "./pages/Products";
import ProductPage from "./pages/ProductPage";
import Activities from "./pages/Activities";
import ActivityDetail from "./pages/ActivityDetail";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Taxi from "./pages/Taxi";
import Delivery from "./pages/Delivery";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminActivities from "./pages/admin/AdminActivities";
import AdminInstagramGallery from "./pages/admin/AdminInstagramGallery";
import AdminHeroSlides from "./pages/admin/AdminHeroSlides";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminLocations from "./pages/admin/AdminLocations";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminReviews from "./pages/admin/AdminReviews";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminActivityManager from "./pages/admin/AdminActivityManager";
import AdminIslandTours from "./pages/admin/AdminIslandTours";
import AdminWineTastings from "./pages/admin/AdminWineTastings";
import AdminSettings from "./pages/admin/AdminSettings";
import BlogCategory from "./pages/BlogCategory";
import BlogTag from "./pages/BlogTag";
import IslandTours from "./pages/IslandTours";
import WineTastings from "./pages/WineTastings";
import IslandToursDynamic from "./pages/IslandToursDynamic";
import WineTastingsDynamic from "./pages/WineTastingsDynamic";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <AuthProvider>
          <CartProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductPage />} />
                  <Route path="/activities" element={<Activities />} />
                  <Route path="/activities/:slug" element={<ActivityDetail />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/events/:slug" element={<EventDetail />} />
                  <Route path="/taxi" element={<Taxi />} />
                  <Route path="/delivery" element={<Delivery />} />
                  <Route path="/island-tours" element={<IslandToursDynamic />} />
                  <Route path="/wine-tastings" element={<WineTastingsDynamic />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/category/:slug" element={<BlogCategory />} />
                  <Route path="/blog/tag/:slug" element={<BlogTag />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-confirmation" element={<OrderConfirmation />} />
                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminLogin />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/products" element={<AdminProducts />} />
                  <Route path="/admin/activities" element={<AdminActivities />} />
                  <Route path="/admin/instagram-gallery" element={<AdminInstagramGallery />} />
                  <Route path="/admin/hero-slides" element={<AdminHeroSlides />} />
                  <Route path="/admin/testimonials" element={<AdminTestimonials />} />
                  <Route path="/admin/locations" element={<AdminLocations />} />
                  <Route path="/admin/orders" element={<AdminOrders />} />
                  <Route path="/admin/bookings" element={<AdminBookings />} />
                  <Route path="/admin/reviews" element={<AdminReviews />} />
                  <Route path="/admin/blog" element={<AdminBlog />} />
                  <Route path="/admin/events" element={<AdminEvents />} />
                  <Route path="/admin/activity-manager" element={<AdminActivityManager />} />
                  <Route path="/admin/island-tours" element={<AdminIslandTours />} />
                  <Route path="/admin/wine-tastings" element={<AdminWineTastings />} />
                  <Route path="/admin/settings" element={<AdminSettings />} />
                  {/* Legal Pages */}
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="/cookie-policy" element={<CookiePolicy />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
