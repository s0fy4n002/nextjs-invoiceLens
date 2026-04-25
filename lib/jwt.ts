// lib/jwt.ts
import { jwtVerify, SignJWT, JWTPayload as JoseJWTPayload } from "jose"; // jose mendukung Web Crypto API (Edge-ready)
import type { NextRequest } from "next/server";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);


export interface CustomJWTPayload extends JoseJWTPayload {
  userId?: number;
  role?: string;
}

export async function signToken(payload: CustomJWTPayload): Promise<string> {
  console.log('payload ', payload)
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<CustomJWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as CustomJWTPayload;
  } catch {
    return null;
  }
}

// Versi khusus middleware
export async function getCurrentUser(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  if (!token) return null;

  const payload = await verifyToken(token);
  return payload;
}
