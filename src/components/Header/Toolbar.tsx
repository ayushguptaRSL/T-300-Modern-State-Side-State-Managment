import { CartBadge } from './CartBadge';
import { CheckoutContext } from '../../context/CheckoutContext';

interface ToolbarProps {
  cartCount?: number;
  onOpenCart: () => void;
  onOpenPayment?: () => void;
}

export function Toolbar({
  cartCount,
  onOpenCart,
  onOpenPayment,
}: ToolbarProps) {
  const isSubmitting = CheckoutContext.useSelector((state) =>
    state.matches('submitting'),
  );
  const isSuccess = CheckoutContext.useSelector((state) =>
    state.matches('success'),
  );

  return (
    <div className="toolbar">
      <div className="toolbar-brand">
        <h2 className="brand-title">TechStore</h2>
      </div>
      <div className="toolbar-actions">
        {onOpenPayment && (isSubmitting || isSuccess) && (
          <button
            type="button"
            className="toolbar-payment-indicator"
            onClick={onOpenPayment}
          >
            {isSubmitting ? 'Payment in Progress...' : 'View Order Status'}
          </button>
        )}
        <CartBadge count={cartCount} onClick={onOpenCart} />
      </div>
    </div>
  );
}
