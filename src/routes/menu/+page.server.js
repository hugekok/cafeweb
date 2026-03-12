import { fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
  addToCart: async ({ request, locals }) => {
    const data = await request.formData();
    const item_name  = String(data.get('item_name')).trim();
    const item_price = parseInt(data.get('item_price'), 10);

    try {
      const conn = locals.db;
      conn.prepare(`
        INSERT INTO carts (item_name, item_price, quantity)
        VALUES (?, ?, 1)
        ON DUPLICATE KEY UPDATE quantity = quantity + 1
      `).run(item_name, item_price);

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
