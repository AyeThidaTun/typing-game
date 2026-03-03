import { Icon } from "@iconify/react";
import Footer from "./_components/footer";
import LoginButton from "./_components/login-btn";
import TypingGame from "./_components/typing-game";
import { cookies } from "next/headers";

export default async function HomePage() {
  const cookieStore = await cookies();
  const isLoggedIn = !!cookieStore.get("token")?.value;

  return (
    <main className="">
      <LoginButton isLoggedIn={isLoggedIn} />
      <p className="flex justify-center pt-20 text-xl font-mono text-yellow-950">
        Coffee Type {""}
        <Icon
          icon="streamline-pixel:food-drink-coffee"
          width="32"
          height="32"
          className="ml-3"
        />
      </p>
      <TypingGame />
      <Footer />
    </main>
  );
}
