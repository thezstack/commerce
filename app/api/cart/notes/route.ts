import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { updateCartNote, getCart } from 'lib/shopify';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const cartId = cookieStore.get('cartId')?.value;

    if (!cartId) {
      return NextResponse.json(
        { error: 'Cart not found' },
        { status: 404 }
      );
    }

    const { notes } = await request.json();
    
    if (!notes) {
      return NextResponse.json(
        { error: 'Notes are required' },
        { status: 400 }
      );
    }

    const updatedCart = await updateCartNote(cartId, notes);
    
    return NextResponse.json({ 
      success: true, 
      cart: updatedCart 
    });
  } catch (error) {
    console.error('Error updating cart notes:', error);
    return NextResponse.json(
      { error: 'Failed to update cart notes' },
      { status: 500 }
    );
  }
}
