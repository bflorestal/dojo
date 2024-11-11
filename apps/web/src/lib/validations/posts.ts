import { z } from "zod";

export const PostSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),
  createdAt: z.string().datetime(),
  author: z.object({
    id: z.string().uuid(),
    name: z.string(),
  }),
});
export type Post = z.infer<typeof PostSchema>;
export const PostsSchema = z.array(PostSchema);
