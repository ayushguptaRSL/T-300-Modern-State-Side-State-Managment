import { useEffect } from 'react';
import { CheckoutContext } from '../../context/CheckoutContext';
import { useCartStore } from '../../store/cartStore';

export function CartSynchronizer() {
  const items = useCartStore((state) => state.items);
  const actorRef = CheckoutContext.useActorRef();

  useEffect(() => {
    actorRef.send({ type: 'SYNC_CART', items });
  }, [items, actorRef]);

  return null;
}
