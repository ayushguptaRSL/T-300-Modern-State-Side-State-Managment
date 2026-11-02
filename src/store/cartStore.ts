import { create } from 'zustand';
import { createOrder } from '../api';
import { cartReducer, initialCartState, type CartAction } from '../reducers/cartReducer';
import type { CartItem, CheckoutResult, Product } from '../types';

export type CheckoutStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface CartStore {
  items: CartItem[];
  checkoutStatus: CheckoutStatus;
  dispatch: (action: CartAction) => void;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setCheckoutStatus: (status: CheckoutStatus) => void;
  checkout: () => Promise<CheckoutResult>;
}

export const selectCartTotal = (state: Pick<CartStore, 'items'>): number =>
  state.items.reduce((total, item) => total + item.price * item.quantity, 0);

export const useCartStore = create<CartStore>()((set, get) => {
  const dispatch = (action: CartAction) =>
    set((state) => ({ items: cartReducer(state.items, action) }));

  return {
    items: initialCartState,
    checkoutStatus: 'idle',
    dispatch,
    addItem: (product) => dispatch({ type: 'ADD_ITEM', payload: product }),
    removeItem: (productId) => dispatch({ type: 'REMOVE_ITEM', payload: productId }),
    updateQuantity: (productId, quantity) =>
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    setCheckoutStatus: (checkoutStatus) => set({ checkoutStatus }),
    checkout: async () => {
      const { items } = get();
      set({ checkoutStatus: 'submitting' });

      try {
        const order = await createOrder({
          items,
          total: selectCartTotal({ items }),
        });
        set({ checkoutStatus: 'success' });
        return order;
      } catch (error) {
        set({ checkoutStatus: 'error' });
        throw error;
      }
    },
  };
});
