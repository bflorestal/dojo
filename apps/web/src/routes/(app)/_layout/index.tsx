import { createFileRoute } from "@tanstack/react-router";

import { DefaultCatchBoundary } from "~/components/default-catch-boundary";
import { PostCard } from "~/components/post-card";
import { Skeleton } from "~/components/ui/skeleton";
import { PostsSchema } from "~/lib/validations/posts";

async function fetchPosts() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`, {
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data: unknown = await res.json();
    const validatedPosts = PostsSchema.safeParse(data);

    if (!validatedPosts.success) {
      throw new Error("Failed to validate posts");
    }

    return validatedPosts.data;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      throw err;
    }
  }
}

export const Route = createFileRoute("/(app)/_layout/")({
  // beforeLoad: ({ location }) => {
  //   throw redirect({
  //     to: "/register",
  //     search: {
  //       redirect: location.href,
  //     },
  //   });
  // },
  component: Home,
  errorComponent: DefaultCatchBoundary,
  loader: () => fetchPosts(),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl">
      <p>Not found</p>
    </div>
  ),
});

function Home() {
  const posts = Route.useLoaderData();
  if (!posts) {
    return <Skeleton className="mx-auto max-w-2xl" />;
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
