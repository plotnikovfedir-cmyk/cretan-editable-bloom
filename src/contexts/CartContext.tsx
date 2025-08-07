import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  product_price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction = 
  | { type: 'SET_ITEMS'; items: CartItem[] }
  | { type: 'ADD_ITEM'; item: CartItem }
  | { type: 'UPDATE_QUANTITY'; product_id: string; quantity: number }
  | { type: 'REMOVE_ITEM'; product_id: string }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  addToCart: (product: any) => Promise<void>;
  updateQuantity: (product_id: string, quantity: number) => Promise<void>;
  removeFromCart: (product_id: string) => Promise<void>;
  clearCart: () => Promise<void>;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'SET_ITEMS':
      const total = action.items.reduce((sum, item) => sum + (item.product_price * item.quantity), 0);
      const itemCount = action.items.reduce((sum, item) => sum + item.quantity, 0);
      return { items: action.items, total, itemCount };
    
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.product_id === action.item.product_id);
      let newItems;
      if (existingItem) {
        newItems = state.items.map(item =>
          item.product_id === action.item.product_id
            ? { ...item, quantity: item.quantity + action.item.quantity }
            : item
        );
      } else {
        newItems = [...state.items, action.item];
      }
      const newTotal = newItems.reduce((sum, item) => sum + (item.product_price * item.quantity), 0);
      const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      return { items: newItems, total: newTotal, itemCount: newItemCount };
    
    case 'UPDATE_QUANTITY':
      const updatedItems = state.items.map(item =>
        item.product_id === action.product_id
          ? { ...item, quantity: action.quantity }
          : item
      );
      const updatedTotal = updatedItems.reduce((sum, item) => sum + (item.product_price * item.quantity), 0);
      const updatedItemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      return { items: updatedItems, total: updatedTotal, itemCount: updatedItemCount };
    
    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter(item => item.product_id !== action.product_id);
      const filteredTotal = filteredItems.reduce((sum, item) => sum + (item.product_price * item.quantity), 0);
      const filteredItemCount = filteredItems.reduce((sum, item) => sum + item.quantity, 0);
      return { items: filteredItems, total: filteredTotal, itemCount: filteredItemCount };
    
    case 'CLEAR_CART':
      return { items: [], total: 0, itemCount: 0 };
    
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0
  });
  const { toast } = useToast();

  const getSessionId = () => {
    let sessionId = localStorage.getItem('cart_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('cart_session_id', sessionId);
    }
    return sessionId;
  };

  const loadCart = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      const sessionId = getSessionId();
      
      let query = supabase
        .from('cart_items')
        .select(`
          id,
          product_id,
          quantity,
          products (
            name,
            image_url,
            price
          )
        `);

      if (user.user) {
        query = query.eq('user_id', user.user.id);
      } else {
        query = query.eq('session_id', sessionId);
      }

      const { data, error } = await query;
      
      if (error) throw error;

      const cartItems: CartItem[] = data?.map(item => ({
        id: item.id,
        product_id: item.product_id,
        product_name: item.products?.name || '',
        product_image: item.products?.image_url || '',
        product_price: Number(item.products?.price) || 0,
        quantity: item.quantity
      })) || [];

      dispatch({ type: 'SET_ITEMS', items: cartItems });
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const addToCart = async (product: any) => {
    try {
      const { data: user } = await supabase.auth.getUser();
      const sessionId = getSessionId();

      const cartData: any = {
        product_id: product.id,
        quantity: 1
      };

      if (user.user) {
        cartData.user_id = user.user.id;
        cartData.session_id = null;
      } else {
        cartData.session_id = sessionId;
        cartData.user_id = null;
      }

      const { error } = await supabase
        .from('cart_items')
        .upsert(cartData, {
          onConflict: user.user ? 'user_id,product_id' : 'session_id,product_id'
        });

      if (error) throw error;

      const cartItem: CartItem = {
        id: '',
        product_id: product.id,
        product_name: product.name,
        product_image: product.image_url,
        product_price: Number(product.price),
        quantity: 1
      };

      dispatch({ type: 'ADD_ITEM', item: cartItem });
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive"
      });
    }
  };

  const updateQuantity = async (product_id: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(product_id);
      return;
    }

    try {
      const { data: user } = await supabase.auth.getUser();
      const sessionId = getSessionId();

      let query = supabase
        .from('cart_items')
        .update({ quantity });

      if (user.user) {
        query = query.eq('user_id', user.user.id);
      } else {
        query = query.eq('session_id', sessionId);
      }

      const { error } = await query.eq('product_id', product_id);

      if (error) throw error;

      dispatch({ type: 'UPDATE_QUANTITY', product_id, quantity });
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: "Error",
        description: "Failed to update quantity. Please try again.",
        variant: "destructive"
      });
    }
  };

  const removeFromCart = async (product_id: string) => {
    try {
      const { data: user } = await supabase.auth.getUser();
      const sessionId = getSessionId();

      let query = supabase
        .from('cart_items')
        .delete();

      if (user.user) {
        query = query.eq('user_id', user.user.id);
      } else {
        query = query.eq('session_id', sessionId);
      }

      const { error } = await query.eq('product_id', product_id);

      if (error) throw error;

      dispatch({ type: 'REMOVE_ITEM', product_id });
      toast({
        title: "Removed from cart",
        description: "Item has been removed from your cart."
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast({
        title: "Error",
        description: "Failed to remove item. Please try again.",
        variant: "destructive"
      });
    }
  };

  const clearCart = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      const sessionId = getSessionId();

      let query = supabase
        .from('cart_items')
        .delete();

      if (user.user) {
        query = query.eq('user_id', user.user.id);
      } else {
        query = query.eq('session_id', sessionId);
      }

      // Delete all items for this user/session
      const { error } = await query.neq('id', '00000000-0000-0000-0000-000000000000');

      if (error) throw error;

      dispatch({ type: 'CLEAR_CART' });
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <CartContext.Provider value={{
      state,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};