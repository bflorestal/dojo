import { Elysia } from "elysia";

import postRoutes from "./api/posts.routes";
import userRoutes from "./api/users.routes";

const routes = new Elysia({ prefix: "/api" }).use(userRoutes).use(postRoutes);

export default routes;
