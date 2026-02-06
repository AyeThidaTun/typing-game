import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

export default function LoginButton() {
  return (
    <section className="fixed flex justify-end top-3 right-5">
      <Button
        variant="outline"
        className="group p-5 cursor-pointer hover:bg-yellow-950 hover:text-white"
        onClick={() => window.location.href = "/login"}
      >
        <div className="flex items-center gap-2">
          <Icon icon="bxs:user" width="24" height="24" />
          Login / Sign up
        </div>
      </Button>
    </section>
  );
}
