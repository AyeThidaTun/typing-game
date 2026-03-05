// app/api/user/wpm/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "../../auth/middleware/verifyToken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
  // Check if user is authenticated
  const user = getUserFromRequest(request);

  if (!user) {
    // No token or invalid token
    return NextResponse.json(
      { message: "Unauthorized - Please login" },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();
    const { wpm } = body;

    if (wpm === undefined) {
      return NextResponse.json({ message: "WPM is required" }, { status: 400 });
    }

    const userData = await prisma.user.update({
      where: { id: user.id },
      data: { wpm : wpm.toString() },
      select: { id: true, name: true, email: true, wpm: true },
    });

    return NextResponse.json(
      {
        message: "WPM updated successfully",
        user: userData,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("WPM update error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
