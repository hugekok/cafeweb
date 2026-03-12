import { fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
  contact: async ({ request, locals }) => {
    const data = await request.formData();
    const name    = data.get('name');
    const email   = data.get('email');
    const message = data.get('message');

    try {
      const conn = locals.db; // inject via hooks.server.js
      const stmt = conn.prepare('INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)');
      stmt.run(name, email, message);
      return { message: 'Message sent successfully!', messageType: 'success' };
    } catch (e) {
      return fail(500, { message: 'Something went wrong. Please try again.', messageType: 'error' });
    }
  }
};

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
  return {};
}
