import { CheckoutContext } from '../../context/CheckoutContext';

export function CartErrorBanner() {
  const errorMessage = CheckoutContext.useSelector(
    (state) => state.context.errorMessage,
  );

  if (!errorMessage) {
    return null;
  }

  return (
    <div className="cart-error-banner" role="alert">
      <span className="cart-error-icon" aria-hidden="true">
        !
      </span>
      <span className="cart-error-text">{errorMessage}</span>
    </div>
  );
}
