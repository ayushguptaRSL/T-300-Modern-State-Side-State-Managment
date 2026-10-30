import { useShallow } from 'zustand/react/shallow';
import { useCartStore } from '../store/cartStore';

export function useCartState() {
  return useCartStore((state) => state.items);
}

export function useCartDispatch() {
  return useCartStore((state) => state.dispatch);
}

export function useCartActions() {
  return useCartStore(
    useShallow(({ addItem, removeItem, updateQuantity, clearCart }) => ({
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    })),
  );
}

export function useCart() {
  return useCartStore(
    useShallow(({ items, dispatch }) => ({ items, dispatch })),
  );
}
