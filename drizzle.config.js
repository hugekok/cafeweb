import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';
config();

if (!process.env.TURSO_DB_URL) throw new Error('TURSO_DB_URL is not set');

export default defineConfig({
	schema: './src/lib/server/db/schema.js',
	dialect: 'turso',
	dbCredentials: { url: process.env.TURSO_DB_URL, authToken: process.env.TURSO_DB_AUTH },
	verbose: true,
	strict: false
});
