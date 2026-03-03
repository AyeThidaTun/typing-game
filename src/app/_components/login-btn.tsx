"use client";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

export default function LoginButton({ isLoggedIn }: { isLoggedIn: boolean }) {
  const router = useRouter();

  return (
    <div className="fixed flex justify-end top-3 right-5">
      <Button
        variant="outline"
        className="group p-5 cursor-pointer hover:bg-yellow-950 hover:text-white"
        onClick={() => router.push(isLoggedIn ? "/profile" : "/login")}
      >
        <div className="flex items-center gap-2">
          <Icon icon="bxs:user" width="24" height="24" />
          {isLoggedIn ? "Profile" : "Login / Sign up"}
        </div>
      </Button>
    </div>
  );
}
