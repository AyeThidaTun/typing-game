"use client";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Icon } from "@iconify/react";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      toast.error("Invalid Login");
      return;
    }

    window.location.href = "/";
  }

  return (
    <section className="font-mono flex items-center justify-center h-screen">
      <div className="w-full max-w-md border rounded-sm p-10 space-y-8 text-yellow-850">
        <p className="flex items-center justify-center text-md text-yellow-950">
          Login to Coffee Type
          <Icon
            icon="streamline-pixel:food-drink-coffee"
            width="32"
            height="32"
            className="ml-3"
          />
        </p>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
            <Input
              id="name"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="fieldgroup-password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
          <Field
            orientation="horizontal"
            className="flex flex-col justify-center"
          >
            <Button
              type="button"
              variant="brown"
              className="cursor-pointer"
              onClick={handleLogin}
            >
              Login
            </Button>
            <Link href="/signup">
              <p className="underline text-yellow-700 text-xs">
                Don&apos;t have an account? Sign up here.
              </p>
            </Link>
          </Field>
        </FieldGroup>
      </div>
    </section>
  );
}
