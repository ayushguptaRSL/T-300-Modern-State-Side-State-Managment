import { createContext, useContext, useMemo, type Dispatch } from 'react';
import type { CartItem, Product } from '../types';
import type { CartAction } from '../reducers/cartReducer';

export const CartStateContext = createContext<CartItem[] | undefined>(undefined);
export const CartDispatchContext = createContext<Dispatch<CartAction> | undefined>(undefined);

export function useCartState(): CartItem[] {
  const context = useContext(CartStateContext);
  if (context === undefined) {
    throw new Error(
      'useCartState must be used within a <CartProvider>. Please wrap your component tree in <CartProvider>.',
    );
  }
  return context;
}

export function useCartDispatch(): Dispatch<CartAction> {
  const context = useContext(CartDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useCartDispatch must be used within a <CartProvider>. Please wrap your component tree in <CartProvider>.',
    );
  }
  return context;
}

export function useCartActions() {
  const dispatch = useCartDispatch();

  return useMemo(
    () => ({
      addItem: (product: Product) =>
        dispatch({ type: 'ADD_ITEM', payload: product }),
      removeItem: (productId: string) =>
        dispatch({ type: 'REMOVE_ITEM', payload: productId }),
      updateQuantity: (productId: string, quantity: number) =>
        dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } }),
      clearCart: () =>
        dispatch({ type: 'CLEAR_CART' }),
    }),
    [dispatch],
  );
}

export function useCart() {
  const items = useCartState();
  const dispatch = useCartDispatch();
  return { items, dispatch };
}
