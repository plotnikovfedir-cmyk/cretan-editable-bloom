import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
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
import AdminTestimonials from "./pages/admin/AdminTestimonials";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
            <Route path="/blog" element={<Blog />} />
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
            <Route path="/admin/testimonials" element={<AdminTestimonials />} />
            <Route path="/admin/locations" element={<AdminLocations />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
