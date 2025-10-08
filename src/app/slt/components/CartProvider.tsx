'use client'

import React, { createContext, useContext, useReducer, ReactNode } from 'react'
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
    case 'ADD_ITEM':
       const addExistingIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (addExistingIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[addExistingIndex] = {
          ...updatedItems[addExistingIndex],
          quantity: updatedItems[addExistingIndex].quantity + 1,
        };
        return { items: updatedItems };
      }
      return { items: [...state.items, { ...action.payload, quantity: 1 }] };
    case 'SUBTRACT_ITEM':
       const subExistingIndex = state.items.findIndex(item => item.id === action.payload.id);
       if (subExistingIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[subExistingIndex] = {
          ...updatedItems[subExistingIndex],
          quantity: updatedItems[subExistingIndex].quantity - 1,
        };
        return { items: updatedItems };
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

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);