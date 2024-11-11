import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import {
  Bell,
  Home,
  MessageCircle,
  PenSquare,
  Search,
  Settings,
  User,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import { Textarea } from "~/components/ui/textarea";

export const Route = createFileRoute("/(app)/_layout")({
  component: LayoutComponent,
});

const NewPostSchema = z.object({
  content: z.string().min(1),
});
type NewPost = z.infer<typeof NewPostSchema>;

function LayoutComponent() {
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewPost>({ resolver: zodResolver(NewPostSchema) });

  function onSubmit(data: { content: string }) {
    console.dir(data);

    reset();
    setIsNewPostModalOpen(false);
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen flex-1 overflow-hidden">
        <Sidebar>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    <span>John Doe</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button variant="ghost" className="w-full justify-start">
                    <Home className="mr-2 h-4 w-4" />
                    <span>Home</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button variant="ghost" className="w-full justify-start">
                    <Search className="mr-2 h-4 w-4" />
                    <span>Search</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button variant="ghost" className="w-full justify-start">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    <span>Messages</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button variant="ghost" className="w-full justify-start">
                    <Bell className="mr-2 h-4 w-4" />
                    <span>Notifications</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Dialog
                  open={isNewPostModalOpen}
                  onOpenChange={setIsNewPostModalOpen}
                >
                  <DialogTrigger asChild>
                    <SidebarMenuButton asChild>
                      <Button variant="ghost" className="w-full justify-start">
                        <PenSquare className="mr-2 h-4 w-4" />
                        <span>New Post</span>
                      </Button>
                    </SidebarMenuButton>
                  </DialogTrigger>
                  <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <DialogHeader>
                        <DialogTitle>Create New Post</DialogTitle>
                        <DialogDescription>
                          Share your thoughts with the world
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="post-content" className="col-span-4">
                            Content
                          </Label>
                          <div className="col-span-4 space-y-2">
                            <Textarea
                              id="post-content"
                              placeholder="What's on your mind?"
                              className="resize-none"
                              rows={4}
                              minLength={1}
                              maxLength={255}
                              required
                              disabled={isSubmitting}
                              {...register("content", {
                                required: "Content is required",
                                minLength: {
                                  value: 1,
                                  message: "Content must not be empty",
                                },
                              })}
                            />
                            {errors.content && (
                              <p className="text-sm text-red-500">
                                {errors.content.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" disabled={isSubmitting}>
                          Post
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <Link to={"/"}>
              <h1 className="text-xl font-semibold">dojo</h1>
            </Link>
          </header>
          <main className="flex flex-1 overflow-hidden">
            <div className="flex-1 overflow-auto p-6">
              <Outlet />
            </div>
            <aside className="hidden w-80 overflow-auto border-l p-6 lg:block">
              <div className="space-y-6">
                {/*
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Trending Topics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {trendingTopics.map((topic) => (
                        <li key={topic.id} className="flex justify-between">
                          <span className="font-medium">{topic.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {topic.posts} posts
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      Suggested Friends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {suggestedFriends.map((friend) => (
                        <li
                          key={friend.id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-2">
                            <div>
                              <p className="text-sm font-medium">
                                {friend.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {friend.mutualFriends} mutual friends
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Add
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                */}
              </div>
            </aside>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
