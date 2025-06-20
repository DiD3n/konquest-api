import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { db } from "../../dbUtils/sqlite.ts";
import { createJwt } from "../jwt.ts";
import { OAuth2Client } from "google-auth-library";
import { Context } from "oak";
import { config } from "../../config.ts";

const router = new Router();
const client = new OAuth2Client();

router.post("/auth/google", async (ctx: Context) => {
  const { token: googleToken } = await ctx.request.body({ type: "json" }).value;

  if (!googleToken) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Token required" };
    return;
  }

  try {
    const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: config.googleClientId,
    });
    const payload = ticket.getPayload();

    if (!payload) {
      ctx.response.status = 401;
      ctx.response.body = { error: "Invalid token" };
      return;
    }

    // Find or create user in DB
    const googleId = payload.sub;
    const email = payload.email;
    const name = payload.name || email || "GoogleUser";
    
    const userRow = Array.from(db.query("SELECT id, username, appleId, googleId FROM users WHERE googleId = ?", [googleId]))[0];
    let user;
    if (userRow) {
      const [id, username, appleId, googleIdVal] = userRow;
      user = { id, username, appleId: appleId ?? null, googleId: googleIdVal ?? null };
    } else {
      const id = crypto.randomUUID();
      db.query("INSERT INTO users (id, username, googleId) VALUES (?, ?, ?)", [id, name, googleId]);
      user = { id, username: name, appleId: null, googleId };
    }
    
    const jwt = await createJwt(user.id as string);
    console.log("Google auth success", user);
    ctx.response.body = { user, token: jwt };

  } catch (e) {
    console.error("Google auth error", e);
    ctx.response.status = 401;
    ctx.response.body = { error: "Invalid token" };
    return;
  }
});

export default router; 