import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("body: ", body);
    const { email, password } = body;

    //if email and password are empty
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 },
      );
    }

    //find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    //if user not found
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }

    //compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 },
      );
    }

    const response = NextResponse.json(
      {
        message: "Login successful",
      },
      { status: 200 },
    );

    //generate jwt token
    // const token = jwt.sign(
    //   {
    //     userId: user.id,
    //     email: user.email,
    //     password: user.password,
    //   },
    //   process.env.JWT_SECRET!,
    //   {
    //     expiresIn: "1d",
    //   },
    // );

    //set cookie for sec
    // response.cookies.set({
    //   name: "token",
    //   value: token,
    //   httpOnly: true,
    //   sameSite: "strict",
    //   maxAge: 24 * 60 * 60, // 1 day
    //   path: "/",
    // });

    return response;
  } catch (error) {
    console.error("Login error: ", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
