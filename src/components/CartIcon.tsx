import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

const CartIcon = () => {
  try {
    const { state } = useCart();

    return (
      <Button asChild variant="ghost" size="sm" className="relative">
        <Link to="/cart">
          <ShoppingCart className="h-5 w-5" />
          {state.itemCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {state.itemCount}
            </Badge>
          )}
        </Link>
      </Button>
    );
  } catch (error) {
    // Fallback UI when cart context is not available
    return (
      <Button asChild variant="ghost" size="sm" className="relative">
        <Link to="/cart">
          <ShoppingCart className="h-5 w-5" />
        </Link>
      </Button>
    );
  }
};

export default CartIcon;