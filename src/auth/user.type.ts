import { z } from "npm:zod@3.22.4";

export const UserSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  appleId: z.string().optional(),
  googleId: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>; 