import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { carts } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const cartItems = await db.select().from(carts);
  return { cartItems };
}

/** @type {import('./$types').Actions} */
export const actions = {
  removeItem: async ({ request }) => {
    const data      = await request.formData();
    const item_name = String(data.get('item_name')).trim();

    try {
      await db.delete(carts).where(eq(carts.item_name, item_name));
      return { message: `🗑️ ${item_name} removed from cart!`, messageType: 'success' };
    } catch (e) {
      return fail(500, { message: 'Could not remove item. Try again.', messageType: 'error' });
    }
  },

  clearCart: async () => {
    try {
      await db.delete(carts);
      return { message: '🛒 Cart cleared successfully!', messageType: 'success' };
    } catch (e) {
      return fail(500, { message: 'Could not clear cart. Try again.', messageType: 'error' });
    }
  }
};
