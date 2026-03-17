import { db } from '$lib/server/db';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  event.locals.db = db;
  return resolve(event);
}
