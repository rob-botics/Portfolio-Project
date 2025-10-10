'use client'

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react'

type Product = {
  id: string
  price: string
  desc: string
  img: string 
}

type CartItem = Product & { quantity: number };
type CartState = { items: CartItem[] };
type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'SUBTRACT_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        const updatedItems = [...state.items];
        updatedItems[index] = {
          ...updatedItems[index],
          quantity: updatedItems[index].quantity + 1,
        };
        return { items: updatedItems };
      }
      return { items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case 'SUBTRACT_ITEM': {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        const updatedItems = [...state.items];
        updatedItems[index] = {
          ...updatedItems[index],
          quantity: updatedItems[index].quantity - 1,
        };
        return { items: updatedItems };
      }
      return state;
    }
    case 'REMOVE_ITEM':
      return { items: state.items.filter(item => item.id !== action.payload) };
    case 'CLEAR_CART':
      return { items: [] };
    default:
      return state;
  }
};

const CartContext = createContext<{state: CartState; dispatch: React.Dispatch<CartAction>;}>({
  state: { items: [] },
  dispatch: () => null,
});

// Lazy initializer function for useReducer
const getInitialCart = (): CartState => {
  if (typeof window !== 'undefined') {
    const stored = sessionStorage.getItem('cart');
    if (stored) {
      try {
        return { items: JSON.parse(stored) };
      } catch {
        console.error('Failed to parse cart from sessionStorage');
      }
    }
  }
  return { items: [] };
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Use lazy initialization here
  const [state, dispatch] = useReducer(cartReducer, undefined, getInitialCart);

  // Sync state.items to sessionStorage whenever items change
  useEffect(() => {
    if (typeof window !== 'undefined') 
      sessionStorage.setItem('cart', JSON.stringify(state.items));
    
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
