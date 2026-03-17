import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client'
import * as schema from './schema';
import { env } from '$env/dynamic/private';

const client = createClient({
    url: env.TURSO_DB_URL,
    authToken: env.TURSO_DB_AUTH
});

export const db = drizzle(client, { schema });
