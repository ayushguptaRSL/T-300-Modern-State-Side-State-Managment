import { setup, fromPromise, assign, emit } from 'xstate';
import { createOrder } from '../api';
import { selectCartTotal } from '../store/cartStore';
import type { CartItem, CheckoutResult } from '../types';

export interface CheckoutContextType {
  items: CartItem[];
  total: number;
  errorMessage: string | null;
  lastOrder: CheckoutResult | null;
}

export type CheckoutEvent =
  | { type: 'SYNC_CART'; items: CartItem[] }
  | { type: 'SUBMIT' }
  | { type: 'CANCEL' }
  | { type: 'RESET' };

export type CheckoutEmitted = {
  type: 'orderCompleted';
  order: CheckoutResult;
};

export const checkoutMachine = setup({
  types: {
    context: {} as CheckoutContextType,
    events: {} as CheckoutEvent,
    emitted: {} as CheckoutEmitted,
  },
  guards: {
    hasItems: ({ context }) => context.items.length > 0,
  },
  actors: {
    processPayment: fromPromise(
      async ({
        input,
        signal,
      }: {
        input: { items: CartItem[]; total: number };
        signal: AbortSignal;
      }) => {
        return createOrder(input, signal);
      },
    ),
  },
}).createMachine({
  id: 'checkout',
  initial: 'reviewing',
  context: {
    items: [],
    total: 0,
    errorMessage: null,
    lastOrder: null,
  },
  states: {
    reviewing: {
      on: {
        SYNC_CART: {
          actions: assign({
            items: ({ event }) => event.items,
            total: ({ event }) => selectCartTotal({ items: event.items }),
          }),
        },
        SUBMIT: {
          guard: 'hasItems',
          target: 'submitting',
          actions: assign({
            errorMessage: null,
          }),
        },
      },
    },
    submitting: {
      invoke: {
        id: 'paymentGateway',
        src: 'processPayment',
        input: ({ context }) => ({
          items: context.items,
          total: context.total,
        }),
        onDone: {
          target: 'success',
          actions: [
            assign({
              lastOrder: ({ event }) => event.output,
              errorMessage: null,
            }),
            emit(({ event }) => ({
              type: 'orderCompleted',
              order: event.output,
            })),
          ],
        },
        onError: {
          target: 'reviewing',
          actions: assign({
            errorMessage: ({ event }) =>
              event.error instanceof Error
                ? event.error.message
                : 'Payment submission failed. Please try again.',
          }),
        },
      },
      on: {
        CANCEL: {
          target: 'reviewing',
          actions: assign({
            errorMessage: null,
          }),
        },
      },
    },
    success: {
      on: {
        RESET: {
          target: 'reviewing',
          actions: assign({
            lastOrder: null,
            errorMessage: null,
            items: [],
            total: 0,
          }),
        },
      },
    },
  },
});
