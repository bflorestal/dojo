import { Type } from "@sinclair/typebox";
import { relations, sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";

export const users = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar("name", { length: 32 }).notNull(),
  email: text("email").notNull(),
  password: varchar("password", { length: 32 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
    withTimezone: true,
  }).$onUpdateFn(() => sql`now()`),
});

export const InsertUserSchema = createInsertSchema(users, {
  name: Type.String({ minLength: 1, maxLength: 32 }),
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 8, maxLength: 32 }),
});

export const SelectUserSchema = createSelectSchema(users);

export const UsersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const posts = pgTable("posts", {
  id: uuid().defaultRandom().primaryKey(),
  content: text("content").notNull(),
  authorId: integer("author_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const InsertPostSchema = createInsertSchema(posts, {
  content: Type.String({ minLength: 1, maxLength: 255 }),
  authorId: Type.String({ format: "uuid" }),
});

export const SelectPostSchema = createSelectSchema(posts);

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));
