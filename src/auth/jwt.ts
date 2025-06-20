import { create } from "https://deno.land/x/djwt@v3.0.1/mod.ts";
import { config } from "../config.ts";

const keyPromise = crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(config.jwtSecret),
  { name: "HMAC", hash: "SHA-512" },
  false,
  ["sign"]
);

export async function createJwt(userId: string): Promise<string> {
  const key = await keyPromise;
  const payload = {
    sub: userId,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
  };
  return create({ alg: "HS512", typ: "JWT" }, payload, key);
} 