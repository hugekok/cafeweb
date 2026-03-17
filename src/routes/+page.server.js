import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { contacts } from '$lib/server/db/schema';

/** @type {import('./$types').Actions} */
export const actions = {
  contact: async ({ request }) => {
    const data = await request.formData();
    const name    = data.get('name');
    const email   = data.get('email');
    const message = data.get('message');

    try {
      await db.insert(contacts).values({ name, email, message });
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
