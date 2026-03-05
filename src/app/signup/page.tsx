"use client";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { Icon } from "@iconify/react";
import { redirect } from "next/navigation";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../zod/signup/schema";
import { useForm } from "react-hook-form";

export default function SignUpPage() {
  type SignupFormData = z.infer<typeof signupSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  async function handleSignup(data: SignupFormData) {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      toast.error("Failed to sign up. Please try again.");
      return;
    }

    redirect("/");
  }

  return (
    <section className="font-mono flex items-center justify-center h-screen">
      <div className="w-full max-w-md border rounded-sm p-10 space-y-8 text-yellow-850">
        <p className="flex items-center justify-center text-md text-yellow-950">
          Sign up for Coffee Type!
          <Icon
            icon="streamline-pixel:food-drink-coffee"
            width="32"
            height="32"
            className="ml-3"
          />
        </p>
        <form onSubmit={handleSubmit(handleSignup)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
              <Input
                id="name"
                placeholder="Enter your name"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
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
              <FieldLabel htmlFor="fieldgroup-password">Password</FieldLabel>
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
                Sign Up
              </Button>
              <Link href="/login">
                <p className="underline text-yellow-700 text-xs">
                  Already have an account? Login here.
                </p>
              </Link>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </section>
  );
}
