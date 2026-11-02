import { atom } from 'jotai';
import type { CartItem, Product } from './types';

export const cartItemsAtom = atom<CartItem[]>([]);
export const cartAtom = cartItemsAtom;

export const totalItemCountAtom = atom((get) =>
  get(cartItemsAtom).reduce((total, item) => total + item.quantity, 0)
);
export const itemCountAtom = totalItemCountAtom;
export const cartCountAtom = totalItemCountAtom;

export const totalCartPriceAtom = atom((get) =>
  get(cartItemsAtom).reduce((total, item) => total + item.price * item.quantity, 0)
);
export const totalPriceAtom = totalCartPriceAtom;
export const cartTotalAtom = totalCartPriceAtom;

export const addItemAtom = atom(
  null,
  (get, set, product: Product) => {
    const current = get(cartItemsAtom);
    const existing = current.find((item) => item.id === product.id);
    if (existing) {
      set(
        cartItemsAtom,
        current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      set(cartItemsAtom, [...current, { ...product, quantity: 1 }]);
    }
  }
);

export const removeItemAtom = atom(
  null,
  (get, set, productId: string) => {
    set(
      cartItemsAtom,
      get(cartItemsAtom).filter((item) => item.id !== productId)
    );
  }
);

export const updateQuantityAtom = atom(
  null,
  (get, set, { productId, quantity }: { productId: string; quantity: number }) => {
    if (quantity <= 0) {
      set(
        cartItemsAtom,
        get(cartItemsAtom).filter((item) => item.id !== productId)
      );
    } else {
      set(
        cartItemsAtom,
        get(cartItemsAtom).map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  }
);

export const clearCartAtom = atom(
  null,
  (_get, set) => {
    set(cartItemsAtom, []);
  }
);
