import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: ({ location }) => {
    throw redirect({
      to: "/register",
      search: {
        redirect: location.href,
      },
    });
  },
  component: Home,
});

function Home() {
  return (
    <div>
      <h1>dojo</h1>
    </div>
  );
}
