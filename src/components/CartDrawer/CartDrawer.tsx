import { useAtomValue } from 'jotai';
import type { CartItem } from '../../types';
import { cartItemsAtom, totalCartPriceAtom } from '../../atoms';
import { CartItemsList } from './CartItemsList';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items?: CartItem[];
  onRemove?: (productId: string) => void;
  onUpdateQuantity?: (productId: string, quantity: number) => void;
  onCheckout?: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onRemove,
  onUpdateQuantity,
  onCheckout,
}: CartDrawerProps) {
  const defaultItems = useAtomValue(cartItemsAtom);
  const derivedTotal = useAtomValue(totalCartPriceAtom);

  const cartItems = items ?? defaultItems;
  const total = items
    ? items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : derivedTotal;

  return (
    <>
      <div
        className={`drawer-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`cart-drawer ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-label="Shopping Cart Drawer"
        aria-modal="true"
      >
        <div className="drawer-header">
          <h3 className="drawer-title">Shopping Cart</h3>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={onClose}
            aria-label="Close cart drawer"
          >
            &times;
          </button>
        </div>

        <div className="drawer-body">
          <CartItemsList
            items={cartItems}
            onRemove={onRemove}
            onUpdateQuantity={onUpdateQuantity}
          />
        </div>

        {cartItems.length > 0 && (
          <div className="drawer-footer">
            <div className="drawer-total-row">
              <span className="total-label">Total:</span>
              <span className="total-amount">${total.toFixed(2)}</span>
            </div>
            <button
              type="button"
              className="checkout-btn"
              onClick={onCheckout}
            >
              Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
