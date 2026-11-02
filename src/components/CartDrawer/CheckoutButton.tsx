import { CheckoutContext } from '../../context/CheckoutContext';

interface CheckoutButtonProps {
  onTrigger?: () => void;
}

export function CheckoutButton({ onTrigger }: CheckoutButtonProps) {
  const actorRef = CheckoutContext.useActorRef();
  const canSubmit = CheckoutContext.useSelector((state) =>
    state.can({ type: 'SUBMIT' }),
  );
  const isSubmitting = CheckoutContext.useSelector((state) =>
    state.matches('submitting'),
  );

  const handleClick = () => {
    actorRef.send({ type: 'SUBMIT' });
    onTrigger?.();
  };

  return (
    <button
      type="button"
      className="checkout-btn"
      onClick={handleClick}
      disabled={!canSubmit || isSubmitting}
    >
      {isSubmitting ? 'Processing Payment...' : 'Proceed to Checkout'}
    </button>
  );
}
