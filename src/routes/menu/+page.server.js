import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { carts } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

/** @type {import('./$types').Actions} */
export const actions = {
  addToCart: async ({ request }) => {
    const data = await request.formData();
    const item_name  = String(data.get('item_name')).trim();
    const item_price = parseInt(data.get('item_price'), 10);

    try {
      const existing = await db.select().from(carts).where(eq(carts.item_name, item_name)).limit(1);
      
      if (existing.length > 0) {
        await db.update(carts).set({ quantity: existing[0].quantity + 1 }).where(eq(carts.item_name, item_name));
      } else {
        await db.insert(carts).values({ item_name, item_price, quantity: 1 });
      }

      return { message: `☕ ${item_name} added to cart!`, messageType: 'success' };
    } catch (e) {
      return fail(500, { message: 'Could not add to cart. Try again.', messageType: 'error' });
    }
  }
};

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  return {};
}
