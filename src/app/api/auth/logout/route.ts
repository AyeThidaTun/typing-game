import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { message: "Logged out" },
    { status: 200 },
  );
  response.cookies.set({
    name: "token",
    value: "",
    httpOnly: true,
    maxAge: 0, // immediately expires the cookie
    path: "/",
  });
  return response;
}
