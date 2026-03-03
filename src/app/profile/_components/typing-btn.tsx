"use client";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { Icon } from "@iconify/react";
export default function TypingButton() {
  return (
    <section className="">
      <Button
        variant="typing"
        className="group cursor-pointer"
        onClick={() => redirect("/")}
      >
        <div className="flex items-center gap-2">
          <Icon icon="solar:keyboard-linear" width="24" height="24" />
          Start Typing!
        </div>
      </Button>
    </section>
  );
}
