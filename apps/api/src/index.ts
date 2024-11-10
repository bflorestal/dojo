import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";

import routes from "./routes";

const app = new Elysia()
  .use(cors())
  .use(
    swagger({
      path: "/api/docs",
      documentation: {
        info: {
          title: "dojo Documentation",
          description: "dojo API Documentation",
          version: "1.0.0",
        },
        tags: [{ name: "App", description: "General endpoints" }],
      },
    }),
  )
  .get("/", () => "Hello Elysia", {
    detail: { tags: ["App"] },
  })
  .onTransform(function log({ body, params, path, request: { method } }) {
    console.log(`${method} ${path}`, {
      body,
      params,
    });
  })
  .use(routes)
  .listen(3000);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
