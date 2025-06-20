import { z } from "npm:zod@3.22.4";

export const QuestTypeEnum = z.enum(["walk", "explore", "walk_to"]);

export const QuestSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  type: QuestTypeEnum,
  metric: z.union([
    z.number().describe("kills for combat or distance for exploration"),
    z.string().describe("solution for puzzle")
  ]),
  description: z.string(),
  xp: z.number().int().positive(),
  points: z.array(z.tuple([z.number(), z.number()])).optional(),
});

export type Quest = z.infer<typeof QuestSchema>; 