import { useEffect } from 'react';
import { CheckoutContext } from '../../context/CheckoutContext';
import { useCartStore } from '../../store/cartStore';

export function OrderCompletionBridge() {
  const actorRef = CheckoutContext.useActorRef();
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    const subscription = actorRef.on('orderCompleted', () => {
      clearCart();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [actorRef, clearCart]);

  return null;
}
