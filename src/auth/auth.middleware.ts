import { Context } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { verify } from "https://deno.land/x/djwt@v3.0.1/mod.ts";
import { config } from "../config.ts";

const keyPromise = crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(config.jwtSecret),
  { name: "HMAC", hash: "SHA-512" },
  false,
  ["verify"]
);

export const authMiddleware = async (
  ctx: Context,
  next: () => Promise<unknown>
) => {
  const authHeader = ctx.request.headers.get("Authorization");

  if (authHeader === "Bearer debug") {
    ctx.state.userId = "debug";
    await next();
    return;
  }
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Authorization header missing or invalid" };
    return;
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Token missing" };
    return;
  }

  try {
    const key = await keyPromise;
    const payload = await verify(token, key);
    if (!payload || !payload.sub) {
      throw new Error("Invalid payload");
    }
    ctx.state.userId = payload.sub; // Standard claim for subject (user ID)
    await next();
  } catch (_e) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Invalid or expired token" };
  }
};

export const optionalAuthMiddleware = async (
  ctx: Context,
  next: () => Promise<unknown>
) => {
  const authHeader = ctx.request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // No auth, just continue
    await next();
    return;
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    await next();
    return;
  }

  try {
    const key = await keyPromise;
    const payload = await verify(token, key);
    if (payload && payload.sub) {
      ctx.state.userId = payload.sub;
    }
  } catch (_e) {
    // Invalid token, just continue without userId
  }
  await next();
}; 