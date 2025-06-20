import { Application, Router, Context, send } from "oak";
import { getEvents, getEventById } from "./event/event.controller.ts";
import authRouter from "./auth/auth.controller.ts";
import questRouter, { getQuestsForEventEndpoint } from "./quest/quest.controller.ts";

const app = new Application();
const router = new Router();

// Logging middleware (logs every request)
app.use(async (ctx: Context, next: () => Promise<unknown>) => {
  if (ctx.request.url.pathname.startsWith("/static/")) {
    await send(ctx, ctx.request.url.pathname, {
      root: `${Deno.cwd()}`,
    });
    return;
  }
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`[${new Date().toISOString()}] ${ctx.request.method} ${ctx.request.url.pathname} - ${ms}ms`);
});

router.get("/", (ctx: Context) => {
  ctx.response.body = { message: "Welcome to Kon Quest Fan Convention API!" };
});

router.get("/events", getEvents);
router.get("/events/:id", getEventById);
router.get("/events/:id/quests", getQuestsForEventEndpoint);

// Error handling
app.use(async (ctx: Context, next: () => Promise<unknown>) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal Server Error" };
    console.error(err);
  }
});

app.use(router.routes());
app.use(router.allowedMethods());
app.use(authRouter.routes());
app.use(authRouter.allowedMethods());
app.use(questRouter.routes());
app.use(questRouter.allowedMethods());

// Start server
const port = 8000;
console.log(`Server running on http://localhost:${port}`);
await app.listen({ port });