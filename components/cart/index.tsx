'use client';

import { useCallback, useEffect, useState } from 'react';
import type { Cart } from 'lib/shopify/types';
import CartModal from './modal';

export default function Cart() {
  const [cart, setCart] = useState<Cart | undefined>();

  const fetchCart = useCallback(async () => {
    try {
      const response = await fetch('/api/cart', { cache: 'no-store' });
      if (!response.ok) {
        return;
      }
      const data = (await response.json()) as { cart?: Cart | null };
      setCart(data.cart ?? undefined);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    const handleCartUpdated = () => {
      fetchCart();
    };

    window.addEventListener('cart:updated', handleCartUpdated);
    return () => {
      window.removeEventListener('cart:updated', handleCartUpdated);
    };
  }, [fetchCart]);

  return <CartModal cart={cart} />;
}
