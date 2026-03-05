"use client";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { Icon } from "@iconify/react";
import { loginSchema } from "../zod/login/schema";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginPage() {
  type LoginFormData = z.infer<typeof loginSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(data: LoginFormData) {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      toast.error("Invalid Login");
      return;
    }

    toast.success("Login Successful!");

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  }

  return (
    <section className="font-mono flex items-center justify-center h-screen">
      <div className="w-full max-w-md border rounded-sm p-10 space-y-8 text-yellow-850">
        <p className="flex items-center justify-center text-md text-yellow-950">
          Login to Coffee Type!
          <Icon
            icon="streamline-pixel:food-drink-coffee"
            width="32"
            height="32"
            className="ml-3"
          />
        </p>
        <form onSubmit={handleSubmit(handleLogin)}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </Field>
          <Field
            orientation="horizontal"
            className="flex flex-col justify-center"
          >
            <Button
              type="submit"
              variant="brown"
              className="cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
            <Link href="/signup">
              <p className="underline text-yellow-700 text-xs">
                Don&apos;t have an account? Sign up here.
              </p>
            </Link>
          </Field>
        </FieldGroup>
        </form>
      </div>
    </section>
  );
}
