
import { cookies } from "next/headers";
import { Icon } from "@iconify/react";
import { redirect } from "next/navigation";
import TypingButton from "./_components/typing-btn";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/profile`,
    {
      headers: {
        Cookie: `token=${token}`, // manually forward the cookie
      },
    },
  );

  if (response.status === 401) {
    redirect("/login");
  }

  const data = await response.json();
  console.log("User profile:", data.user);

  return (
    <section className="m-10 font-mono">
      <TypingButton />
      <h3 className="font-bold text-2xl my-10 ">Welcome, {data.user.name}!</h3>
      <div className="border border-amber-950 rounded-md p-5 w-full h-full max-w-sm">
        <p className="flex mb-5 text-yellow-950">
          Your Coffee Profile
          <Icon
            icon="streamline-pixel:food-drink-coffee"
            width="20"
            height="20"
            className="ml-3"
          />
        </p>
        <p>Email: {data.user.email}</p>
        <p>
          Member since: {new Date(data.user.createdAt).toLocaleDateString()}
        </p>
      </div>
    </section>
  );
}
