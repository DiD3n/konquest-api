import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { db } from "../../dbUtils/sqlite.ts";
import { createJwt } from "../jwt.ts";

const router = new Router();

router.post("/auth/login", async (ctx) => {
  const { username } = await ctx.request.body({ type: "json" }).value;
  if (!username) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Username required" };
    return;
  }
  let user;
  const userRows = Array.from(db.query<[string, string, string | null, string | null]>("SELECT id, username, appleId, googleId FROM users WHERE username = ?", [username]));
  if (userRows.length > 0) {
    const [id, name, appleId, googleId] = userRows[0];
    user = { id, username: name, appleId, googleId };
  } else {
    user = { id: crypto.randomUUID(), username, appleId: null, googleId: null };
    db.query("INSERT INTO users (id, username) VALUES (?, ?)", [user.id, user.username]);
  }
  const jwt = await createJwt(user.id);
  ctx.response.body = { user, token: jwt };
});

export default router; 