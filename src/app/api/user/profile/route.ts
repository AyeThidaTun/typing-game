// app/api/user/profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "../../auth/middleware/verifyToken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  // Check if user is authenticated
  const user = getUserFromRequest(request);

  if (!user) {
    // No token or invalid token
    return NextResponse.json(
      { message: "Unauthorized - Please login" },
      { status: 401 }
    );
  }

  try {
    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    if (!userData) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: "Profile fetched successfully",
        user: userData 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
