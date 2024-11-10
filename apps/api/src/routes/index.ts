import { Elysia } from "elysia";

import postRoutes from "./posts.routes";
import userRoutes from "./users.routes";

const routes = new Elysia({ prefix: "/api" }).use(userRoutes).use(postRoutes);

export default routes;
