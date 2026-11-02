import { CheckoutContext } from '../../context/CheckoutContext';

interface PaymentPanelProps {
  isOpen?: boolean;
  onClose?: () => void;
  onBackToCart?: () => void;
}

export function PaymentPanel({
  isOpen = false,
  onClose,
  onBackToCart,
}: PaymentPanelProps) {
  const actorRef = CheckoutContext.useActorRef();
  const stateValue = CheckoutContext.useSelector((state) => state.value);
  const isSubmitting = CheckoutContext.useSelector((state) =>
    state.matches('submitting'),
  );
  const isSuccess = CheckoutContext.useSelector((state) =>
    state.matches('success'),
  );
  const canSubmit = CheckoutContext.useSelector((state) =>
    state.can({ type: 'SUBMIT' }),
  );
  const errorMessage = CheckoutContext.useSelector(
    (state) => state.context.errorMessage,
  );
  const lastOrder = CheckoutContext.useSelector(
    (state) => state.context.lastOrder,
  );
  const contextTotal = CheckoutContext.useSelector(
    (state) => state.context.total,
  );
  const contextItems = CheckoutContext.useSelector(
    (state) => state.context.items,
  );

  const displayItems =
    isSuccess && lastOrder?.items && lastOrder.items.length > 0
      ? lastOrder.items
      : contextItems;
  const displayTotal =
    isSuccess && lastOrder?.total !== undefined
      ? lastOrder.total
      : contextTotal;
  const displayCount = displayItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  const handleCancel = () => {
    actorRef.send({ type: 'CANCEL' });
  };

  const handleSubmit = () => {
    actorRef.send({ type: 'SUBMIT' });
  };

  const handleReset = () => {
    actorRef.send({ type: 'RESET' });
    onClose?.();
  };

  return (
    <>
      <div
        className={`drawer-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`cart-drawer payment-drawer ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-label="Payment Gateway Drawer"
        aria-modal="true"
      >
        <div className="drawer-header">
          <div className="payment-header-left">
            <h3 className="drawer-title">Payment & Checkout</h3>
            <span
              className={`status-pill status-${String(stateValue)}`}
              aria-live="polite"
            >
              {isSubmitting && 'In-Flight'}
              {isSuccess && 'Confirmed'}
              {!isSubmitting && !isSuccess && 'Review'}
            </span>
          </div>
          {onClose && (
            <button
              type="button"
              className="drawer-close-btn"
              onClick={onClose}
              aria-label="Close payment panel"
            >
              &times;
            </button>
          )}
        </div>

        <div className="drawer-body">
          {errorMessage && (
            <div className="payment-alert payment-alert-error" role="alert">
              <span className="payment-alert-icon" aria-hidden="true">
                !
              </span>
              <span className="payment-alert-message">{errorMessage}</span>
            </div>
          )}

          {isSuccess && lastOrder && (
            <div className="payment-alert payment-alert-success" role="status">
              <span className="payment-alert-icon" aria-hidden="true">
                ✓
              </span>
              <div className="payment-success-details">
                <strong>Payment Successful!</strong>
                <p>Order #{String(lastOrder.id)} created.</p>
              </div>
            </div>
          )}

          {isSubmitting && (
            <div className="payment-processing-box">
              <div className="spinner" />
              <p className="processing-title">Processing Payment</p>
              <p className="processing-subtitle">
                Sending order to mock server...
              </p>
            </div>
          )}

          <div className="payment-summary">
            <div className="summary-row">
              <span className="summary-label">
                {isSuccess ? 'Ordered Items:' : 'Items Count:'}
              </span>
              <span className="summary-value">{displayCount}</span>
            </div>
            {displayItems.length > 0 && (
              <ul className="payment-items-preview">
                {displayItems.map((item) => (
                  <li key={item.id} className="payment-item-preview-row">
                    <span>
                      {item.name} &times; {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="summary-row summary-total-row">
              <span className="summary-label">
                {isSuccess ? 'Paid Total:' : 'Total Amount:'}
              </span>
              <span className="summary-value amount">
                ${displayTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="drawer-footer">
          <div className="payment-actions">
            {isSubmitting ? (
              <button
                type="button"
                className="cancel-payment-btn"
                onClick={handleCancel}
              >
                Cancel Payment
              </button>
            ) : isSuccess ? (
              <button
                type="button"
                className="reset-payment-btn"
                onClick={handleReset}
              >
                Start New Order
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="submit-payment-btn"
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                >
                  Submit Payment
                </button>
                {onBackToCart && (
                  <button
                    type="button"
                    className="back-to-cart-btn"
                    onClick={onBackToCart}
                  >
                    &larr; Back to Cart
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
