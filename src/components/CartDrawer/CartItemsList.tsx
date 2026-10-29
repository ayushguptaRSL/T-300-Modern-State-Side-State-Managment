import type { CartItem } from '../../types';
import { useCartDispatch, useCartState } from '../../context';

interface CartItemsListProps {
  items?: CartItem[];
  onRemove?: (productId: string) => void;
  onUpdateQuantity?: (productId: string, quantity: number) => void;
}

export function CartItemsList({
  items,
  onRemove,
  onUpdateQuantity,
}: CartItemsListProps) {
  const contextItems = useCartState();
  const dispatch = useCartDispatch();

  const cartItems = items ?? contextItems;

  const handleRemove = (id: string) => {
    if (onRemove) {
      onRemove(id);
    } else {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    }
  };

  const handleUpdate = (id: string, quantity: number) => {
    if (onUpdateQuantity) {
      onUpdateQuantity(id, quantity);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId: id, quantity } });
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-message">
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <ul className="cart-items-list">
      {cartItems.map((item) => (
        <li key={item.id} className="cart-item-row">
          <div className="cart-item-info">
            <span className="cart-item-name">{item.name}</span>
            <span className="cart-item-price">${item.price.toFixed(2)} each</span>
          </div>

          <div className="cart-item-actions">
            <div className="cart-quantity-selector">
              <button
                type="button"
                className="qty-btn"
                onClick={() => handleUpdate(item.id, item.quantity - 1)}
                aria-label={`Decrease quantity of ${item.name}`}
              >
                &minus;
              </button>
              <span className="qty-value">{item.quantity}</span>
              <button
                type="button"
                className="qty-btn"
                onClick={() => handleUpdate(item.id, item.quantity + 1)}
                aria-label={`Increase quantity of ${item.name}`}
              >
                +
              </button>
            </div>

            <span className="cart-item-subtotal">
              ${(item.price * item.quantity).toFixed(2)}
            </span>

            <button
              type="button"
              className="remove-btn"
              onClick={() => handleRemove(item.id)}
              aria-label={`Remove ${item.name} from cart`}
            >
              Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
