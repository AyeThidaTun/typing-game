import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// Define what data is in the JWT token
export interface AuthUser {
  id: number;
  email: string;
}

// Function to verify and decode JWT token
export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthUser;
    return decoded; // Returns { id: "...", email: "..." }
  } catch (error) {
    console.error("Token verification failed:", error);
    return null; // Token is invalid or expired
  }
}

// Function to get user from request (check cookie or header)
export function getUserFromRequest(request: NextRequest): AuthUser | null {
  // Option 1: Get token from cookie
  const tokenFromCookie = request.cookies.get("token")?.value;
  console.log("Token from cookie:", tokenFromCookie);
  
  // Option 2: Get token from Authorization header (Bearer token)
  const authHeader = request.headers.get("authorization");
  const tokenFromHeader = authHeader?.startsWith("Bearer ")
    ? authHeader.substring(7)
    : null;

  // Use whichever token is available
  const token = tokenFromCookie || tokenFromHeader;

  if (!token) {
    return null;
  }

  // Verify and return user data
  return verifyToken(token);
}