import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
  const conn = locals.db;
  const cartItems = conn.prepare('SELECT * FROM carts ORDER BY id ASC').all();
  return { cartItems };
}

/** @type {import('./$types').Actions} */
export const actions = {
  removeItem: async ({ request, locals }) => {
    const data      = await request.formData();
    const item_name = String(data.get('item_name')).trim();

    try {
      locals.db.prepare('DELETE FROM carts WHERE item_name = ?').run(item_name);
      return { message: `🗑️ ${item_name} removed from cart!`, messageType: 'success' };
    } catch (e) {
      return fail(500, { message: 'Could not remove item. Try again.', messageType: 'error' });
    }
  },

  clearCart: async ({ locals }) => {
    try {
      locals.db.prepare('DELETE FROM carts').run();
      return { message: '🛒 Cart cleared successfully!', messageType: 'success' };
    } catch (e) {
      return fail(500, { message: 'Could not clear cart. Try again.', messageType: 'error' });
    }
  }
};
