import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import type { RouterContext } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { db } from "../dbUtils/sqlite.ts";
import { authMiddleware } from "../auth/auth.middleware.ts";

const router = new Router();

// GET /events/:id/quests
export const getQuestsForEventEndpoint = (
  ctx: RouterContext<"/events/:id/quests">
) => {
  const eventId = parseInt(ctx.params.id);
  if (isNaN(eventId)) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Invalid event ID" };
    return;
  }
  const quests = Array.from(
    db.query(
      "SELECT id, eventId, name, type, metric, description, xp, points FROM quests WHERE eventId = ?",
      [eventId]
    )
  ).map(([id, eventId, name, type, metric, description, xp, points]) => ({
    id,
    eventId,
    name,
    type,
    metric,
    description,
    xp,
    points: points ? JSON.parse(points as string) : null,
  }));
  ctx.response.body = quests;
};

// todo: move fetching quests here
//       if token is provided, check if user has completed the quest

router.post("/quests/:id/complete", authMiddleware,  (
  ctx: RouterContext<"/quests/:id/complete", { id: string }>
) => {
  const questId = parseInt(ctx.params.id);
  const userId = ctx.state.userId as string;

  if (isNaN(questId)) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Invalid quest ID" };
    return;
  }

  // Check if quest exists
  const questRows = Array.from(
    db.query("SELECT id FROM quests WHERE id = ?", [questId])
  );
  if (questRows.length === 0) {
    ctx.response.status = 404;
    ctx.response.body = { error: "Quest not found" };
    return;
  }

  // Check if already completed
  const completionRows = Array.from(
    db.query("SELECT questId FROM user_quests WHERE userId = ? AND questId = ?", [
      userId,
      questId,
    ])
  );
  if (completionRows.length > 0) {
    ctx.response.status = 409; // Conflict
    ctx.response.body = { message: "Quest already completed" };
    return;
  }

  // Mark as completed
  try {
    db.query(
      "INSERT INTO user_quests (userId, questId, completedAt) VALUES (?, ?, ?)",
      [userId, questId, new Date().toISOString()]
    );
    ctx.response.status = 200;
    ctx.response.body = { message: "Quest completed successfully" };
  } catch (e) {
    ctx.response.status = 500;
    ctx.response.body = { error: "Failed to complete quest" };
    console.error(e);
  }
});


export default router;