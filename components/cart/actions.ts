'use server';

import { TAGS } from 'lib/constants';
import { addToCart, createCart, getCart, removeFromCart, updateCart, updateCartNote } from 'lib/shopify';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

type CartActionState = {
  error?: string;
  updatedAt?: number;
};

export async function addItem(
  prevState: CartActionState,
  selectedVariantId: string | undefined
): Promise<CartActionState> {
  const cookieStore = await cookies();
  let cartId = cookieStore.get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  if (!cartId || !cart) {
    cart = await createCart();
    cartId = cart.id;
    cookieStore.set('cartId', cartId);
  }

  if (!selectedVariantId) {
    return { error: 'Missing product variant ID' };
  }

  try {
    await addToCart(cartId, [{ merchandiseId: selectedVariantId, quantity: 1 }]);
    revalidateTag(TAGS.cart, 'max');
    return { updatedAt: Date.now() };
  } catch (e) {
    return { error: 'Error adding item to cart' };
  }
}

export async function removeItem(
  prevState: CartActionState,
  lineId: string
): Promise<CartActionState> {
  const cookieStore = await cookies();
  const cartId = cookieStore.get('cartId')?.value;

  if (!cartId) {
    return { error: 'Missing cart ID' };
  }

  try {
    await removeFromCart(cartId, [lineId]);
    revalidateTag(TAGS.cart, 'max');
    return { updatedAt: Date.now() };
  } catch (e) {
    return { error: 'Error removing item from cart' };
  }
}

export async function updateItemQuantity(
  prevState: CartActionState,
  payload: {
    lineId: string;
    variantId: string;
    quantity: number;
  }
): Promise<CartActionState> {
  const cookieStore = await cookies();
  const cartId = cookieStore.get('cartId')?.value;

  if (!cartId) {
    return { error: 'Missing cart ID' };
  }

  const { lineId, variantId, quantity } = payload;

  try {
    if (quantity === 0) {
      await removeFromCart(cartId, [lineId]);
      revalidateTag(TAGS.cart, 'max');
      return { updatedAt: Date.now() };
    }

    await updateCart(cartId, [
      {
        id: lineId,
        merchandiseId: variantId,
        quantity
      }
    ]);
    revalidateTag(TAGS.cart, 'max');
    return { updatedAt: Date.now() };
  } catch (e) {
    return { error: 'Error updating item quantity' };
  }
}


export async function updateCartNotes(notes: string) {
  const cookieStore = await cookies();
  const cartId = cookieStore.get('cartId')?.value;

  if (!cartId) {
    return { error: 'Missing cart ID' };
  }

  try {
    const updatedCart = await updateCartNote(cartId, notes);
    revalidateTag(TAGS.cart, 'max');
    return { success: true, cart: updatedCart };
  } catch (e) {
    console.error('Error updating cart notes:', e);
    return { error: 'Error updating cart notes' };
  }
}
