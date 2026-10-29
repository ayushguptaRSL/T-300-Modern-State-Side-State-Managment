import type { Product, CheckoutResult } from '../types';

export async function getProducts(): Promise<Product[]> {
  const res = await fetch('/api/products');
  if (!res.ok) {
    throw new Error(`Failed to fetch products (${res.status} ${res.statusText})`);
  }
  return res.json();
}

export async function createOrder(orderPayload: {
  items: unknown[];
  total: number;
}): Promise<CheckoutResult> {
  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderPayload),
  });

  if (!res.ok) {
    throw new Error(`Failed to submit order (${res.status} ${res.statusText})`);
  }

  return res.json();
}
