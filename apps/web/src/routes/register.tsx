import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Fingerprint, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, buttonVariants } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";

export const Route = createFileRoute("/register")({
  component: Register,
});

const RegisterSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(32, { message: "Name must be at most 32 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(32, { message: "Password must be at most 32 characters" }),
});

type FormData = z.infer<typeof RegisterSchema>;

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(RegisterSchema) });

  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(data: FormData) {
    setIsLoading(true);

    console.log("Register form submitted with data:", data);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className="items-centner container relative grid h-screen w-screen flex-col justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        to="/login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "text-bold absolute right-4 top-4 md:right-8 md:top-8",
        )}
      >
        Login
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="temple-pattern absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center space-x-2 text-lg font-medium">
          <Fingerprint />
          <p>dojo</p>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than ever
              before.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="my-auto lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <Label className="sr-only" htmlFor="name">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    minLength={3}
                    maxLength={32}
                    pattern="^[a-zA-Z0-9_]*$"
                    disabled={isLoading}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="px-1 text-xs text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                  <Label className="sr-only" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="name@dojo.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="px-1 text-xs text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                  <Label className="sr-only" htmlFor="password">
                    Password
                  </Label>
                  <Input
                    id="password"
                    placeholder="Password"
                    type="password"
                    autoComplete="current-password"
                    disabled={isLoading}
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="px-1 text-xs text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <Button disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sign Up
                </Button>
              </div>
            </form>
          </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              to="/"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>

    /*
        <main className="grid lg:grid-cols-2">
            <section className="grid place-items-center">
                <h1 className="text-3xl lg:text-6xl font-semibold">dojo</h1>
            </section>
            <aside className="grid place-items-center">
                <div className="sm:w-420 flex-center flex-col">
                    <img src="/assets/images/logo.svg" alt="logo" />

                    <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
                        Log in to your account
                    </h2>
                    <p className="text-light-3 small-medium md:base-regular mt-2">
                        Welcome back! Please enter your details.
                    </p>
                    <form
                        onSubmit={e => e.preventDefault()}
                        className="flex flex-col gap-5 w-full mt-4">
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Mot de passe</label>
                            <input
                                type="password"
                                name="password"
                            />
                        </div>

                        <button className="">Se connecter</button>

                        <p className="text-small-regular text-light-2 text-center mt-2">
                            Vous n'avez pas de compte ?
                            <Link
                                to="/signup"
                                className="text-primary-500 text-small-semibold ml-1">
                                S'inscrire
                            </Link>
                        </p>
                    </form>
                </div>
            </aside>
        </main>
        */
  );
}
