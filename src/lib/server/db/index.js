import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client'
import * as schema from './schema';
import { env } from '$env/dynamic/private';

const client = createClient({
    url: "libsql://gulator-hugekok.aws-ap-south-1.turso.io",
    authToken: env.DB_AUTH
});

export const db = drizzle(client, { schema });
