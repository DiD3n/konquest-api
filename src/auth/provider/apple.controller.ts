import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";

const router = new Router();

router.post("/auth/apple", async (ctx) => {
  ctx.response.body = { error: "Apple auth not implemented (stub)" };
});

export default router; 