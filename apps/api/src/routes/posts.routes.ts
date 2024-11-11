import { Elysia, t } from "elysia";

import { eq } from "@dojo/db";
import { db } from "@dojo/db/client";
import { InsertPostSchema, posts } from "@dojo/db/schema";

const routes = new Elysia({ detail: { tags: ["App"] }, prefix: "/posts" })
  .get("/", () => {
    return db.query.posts.findMany({
      columns: {
        id: true,
        content: true,
        createdAt: true,
      },
      with: { author: { columns: { id: true, name: true } } },
    });
  })
  .post(
    "/",
    ({ body }) => {
      return db.insert(posts).values(body).returning({
        id: posts.id,
        content: posts.content,
        authorId: posts.authorId,
        createdAt: posts.createdAt,
      });
    },
    {
      body: t.Omit(InsertPostSchema, ["id", "createdAt"]),
    },
  )
  .guard({
    params: t.Object({
      id: t.String({ format: "uuid" }),
    }),
  })
  .get("/:id", ({ params }) => {
    return db.query.posts.findFirst({
      where: (model, { eq }) => eq(model.id, params.id),
      columns: {
        id: true,
        content: true,
        createdAt: true,
      },
      with: { author: { columns: { id: true, name: true } } },
    });
  })
  .delete("/:id", ({ params }) => {
    return db.delete(posts).where(eq(posts.id, params.id));
  });

export default routes;
