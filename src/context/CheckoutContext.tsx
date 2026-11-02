import { createActorContext } from '@xstate/react';
import { checkoutMachine } from '../machines/checkoutMachine';

export const CheckoutContext = createActorContext(checkoutMachine);
