import { z } from "npm:zod@3.22.4";

export const GeoJsonPolygonSchema = z.object({
  type: z.literal("Polygon"),
  coordinates: z.array(z.array(z.tuple([z.number(), z.number()]))),
});

export const EventSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  description: z.string(),
  date: z.string(),
  location: z.string(),
  type: z.enum(["competition", "workshop", "game"]),
  maxParticipants: z.number().int().positive(),
  geometry: z.string(),
  imageUrl: z.string().nullable(),
});

export type Event = z.infer<typeof EventSchema>;

export type EventType = Event['type']; 