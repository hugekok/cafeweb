import { db } from '$lib/server/db';
import { carts } from '$lib/server/db/schema';

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
  const cartItems = await db.select().from(carts);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  return { cartCount };
}
