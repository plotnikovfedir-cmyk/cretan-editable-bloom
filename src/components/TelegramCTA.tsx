import { Button } from '@/components/ui/button';
import { MessageCircle, Gift, Bell, Users } from 'lucide-react';

const TelegramCTA = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 border border-white/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-white/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-32 w-40 h-40 border border-white/10 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 border border-white/25 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
        {/* Main Content */}
        <div className="mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
              <MessageCircle className="w-16 h-16" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Join Our Telegram Channel
          </h2>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
            Stay connected with exclusive offers, travel tips, and insider knowledge about Crete's hidden gems
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <Gift className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
            <h3 className="text-xl font-semibold mb-2">Exclusive Offers</h3>
            <p className="text-white/80">Get first access to special discounts and limited-time deals on our products and tours</p>
          </div>
          
          <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <Bell className="w-12 h-12 mx-auto mb-4 text-green-300" />
            <h3 className="text-xl font-semibold mb-2">Instant Updates</h3>
            <p className="text-white/80">Be the first to know about new products, events, and seasonal activities in Crete</p>
          </div>
          
          <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <Users className="w-12 h-12 mx-auto mb-4 text-blue-300" />
            <h3 className="text-xl font-semibold mb-2">Community Tips</h3>
            <p className="text-white/80">Connect with fellow travelers and locals sharing authentic Cretan experiences</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="space-y-4">
          <Button 
            asChild
            size="lg"
            className="bg-white text-blue-600 hover:bg-white/90 text-xl px-12 py-6 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <a 
              href="https://t.me/cretanguru" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-3"
            >
              <MessageCircle className="w-6 h-6" />
              <span>Join Telegram Channel</span>
            </a>
          </Button>
          
          <p className="text-white/70 text-sm">
            Join over 1,000+ travelers already in our community
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <p className="text-white/60 text-sm mb-4">Trusted by travelers worldwide</p>
          <div className="flex justify-center items-center space-x-8 text-white/40">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">1000+</div>
              <div className="text-xs">Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">50+</div>
              <div className="text-xs">Daily Tips</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-xs">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TelegramCTA;