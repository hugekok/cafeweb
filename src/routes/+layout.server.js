/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
  const conn = locals.db;
  const cartItems = conn.prepare('SELECT * FROM carts ORDER BY id ASC').all();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  return { cartCount };
}
