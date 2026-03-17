import { drizzle } from 'drizzle-orm/better-sqlite3';
// import Database from 'better-sqlite3';
import { createClient } from '@libsql/client'
import * as schema from './schema';
import { env } from '$env/dynamic/private';

const client = createClient({
    url: "file:local.db"
});

export const db = drizzle(client, { schema });
