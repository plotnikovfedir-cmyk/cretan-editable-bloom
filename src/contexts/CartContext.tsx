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

      // Validate product ID is a valid UUID
      const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidPattern.test(product.id)) {
        throw new Error(`Invalid product ID format: ${product.id}. Expected UUID format.`);
      }

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

      

      // First check if item already exists
      let existingQuery = supabase
        .from('cart_items')
        .select('id, quantity')
        .eq('product_id', product.id);

      if (user.user) {
        existingQuery = existingQuery.eq('user_id', user.user.id);
      } else {
        existingQuery = existingQuery.eq('session_id', sessionId);
      }

      const { data: existingItems, error: queryError } = await existingQuery;
      
      if (queryError) {
        throw queryError;
      }

      let result;
      if (existingItems && existingItems.length > 0) {
        // Update existing item
        const newQuantity = existingItems[0].quantity + 1;
        
        result = await supabase
          .from('cart_items')
          .update({ quantity: newQuantity })
          .eq('id', existingItems[0].id);
      } else {
        // Insert new item
        result = await supabase
          .from('cart_items')
          .insert([cartData]);
      }

      if (result.error) {
        throw result.error;
      }

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
    } catch (error: any) {
      
      let errorMessage = "Failed to add item to cart. Please try again.";
      if (error.message?.includes('Invalid product ID format')) {
        errorMessage = "Invalid product selected. Please try again.";
      } else if (error.message?.includes('row-level security policy')) {
        errorMessage = "Authentication issue. Please refresh the page and try again.";
      } else if (error.code === '23505') {
        errorMessage = "Item already in cart. Please check your cart.";
      }
      
      toast({
        title: "Error",
        description: errorMessage,
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
      // Error handling without console log
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
    console.error('useCart must be used within a CartProvider');
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};