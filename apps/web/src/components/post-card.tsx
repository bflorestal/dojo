import type { Post } from "~/lib/validations/posts";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

function randomNumber() {
  return Math.floor(Math.random() * 100);
}

export function PostCard({ post }: { post: Post }) {
  return (
    <Card key={post.id}>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <div>
            <CardTitle>{post.author.name}</CardTitle>
            <CardDescription>{post.createdAt}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p>{post.content}</p>
      </CardContent>
      <CardFooter>
        <div className="flex space-x-4">
          <Button variant="ghost" disabled>
            Like ({randomNumber()})
          </Button>
          <Button variant="ghost" disabled>
            Comment ({randomNumber()})
          </Button>
          <Button variant="ghost" disabled>
            Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
