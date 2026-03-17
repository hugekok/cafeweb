import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const carts = sqliteTable('carts', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	item_name: text('title').notNull(),
	item_price: integer('item_price').notNull().default(1),
	quantity: integer('quantity').notNull().default(1)
});

export const contacts = sqliteTable('contacts', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	email: text('email').notNull(),
	message: text('message').notNull(),
	created_at: text('created_at').notNull().$defaultFn(() => new Date().toISOString())
});
