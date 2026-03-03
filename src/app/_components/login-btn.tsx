"use client";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginButton({ isLoggedIn }: { isLoggedIn: boolean }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    toast.success("Logged out successfully!");

    setTimeout(() => {
      router.push("/login");
      router.refresh();
    }, 1000);
  }

  return (
    <div className="fixed flex justify-end top-3 right-5 gap-2">
      {isLoggedIn ? (
        <>
          <Button
            variant="outline"
            className="p-5 cursor-pointer hover:bg-yellow-950 hover:text-white"
            onClick={() => router.push("/profile")}
          >
            <div className="flex items-center gap-2">
              <Icon icon="bxs:user" width="24" height="24" />
              Profile
            </div>
          </Button>
          <Button
            variant="typing"
            className="p-5 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </>
      ) : (
        <Button
          variant="outline"
          className="p-5 cursor-pointer hover:bg-yellow-950 hover:text-white"
          onClick={() => router.push("/login")}
        >
          <div className="flex items-center gap-2">
            <Icon icon="bxs:user" width="24" height="24" />
            Login / Sign up
          </div>
        </Button>
      )}
    </div>
  );
}
