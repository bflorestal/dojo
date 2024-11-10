import { Elysia, t } from "elysia";

import { eq } from "@dojo/db";
import { db } from "@dojo/db/client";
import { users } from "@dojo/db/schema";

const routes = new Elysia({ detail: { tags: ["App"] }, prefix: "/users" })
  .get("/", () => {
    return db.query.users.findMany({
      columns: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  })
  .guard({
    params: t.Object({
      id: t.String({ format: "uuid" }),
    }),
  })
  .get("/:id", ({ params }) => {
    return db.query.users.findFirst({
      where: (model, { eq }) => eq(model.id, params.id),
      columns: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  })
  .delete("/:id", ({ params }) => {
    return db.delete(users).where(eq(users.id, params.id));
  });

export default routes;
