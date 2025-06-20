import { Context, RouterContext } from "oak";
import { db } from "../dbUtils/sqlite.ts";
import { getPolygonCentroid } from "../helpers/geometry.ts";
import { fetchWeather } from "../weather/weather.service.ts";

export const getEvents = (ctx: Context) => {
  const events = Array.from(db.query("SELECT * FROM events")).map(([id, name, description, date, location, type, maxParticipants, geometry, imageUrl]) => ({
    id, name, description, date, location, type, maxParticipants, geometry, imageUrl
  }));
  // Fetch quests for each event
  const eventsWithQuests = events.map(event => {
    const quests = Array.from(db.query("SELECT * FROM quests WHERE eventId = ?", [Number(event.id)])).map(([id, eventId, name, type, metric, description, xp, points]) => ({
      id, eventId, name, type, metric, description, xp, points: points ? JSON.parse(points as string) : null,
    }));
    return { ...event, quests };
  });
  ctx.response.body = eventsWithQuests;
};

export const getEventById = async (ctx: RouterContext<"/events/:id">) => {
  const id = parseInt(ctx.params.id);
  if (isNaN(id)) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Invalid event ID" };
    return;
  }
  const eventRows = Array.from(db.query("SELECT * FROM events WHERE id = ?", [id]));
  if (!eventRows.length) {
    ctx.response.status = 404;
    ctx.response.body = { error: "Event not found" };
    return;
  }
  const [eventId, name, description, date, location, type, maxParticipants, geometry, imageUrl] = eventRows[0];
  const quests = Array.from(db.query("SELECT * FROM quests WHERE eventId = ?", [id])).map(([id, eventId, name, type, metric, description, xp, points]) => ({
    id, eventId, name, type, metric, description, xp, points: points ? JSON.parse(points as string) : null,
  }));

  // Parse geometry and get centroid
  let centroid: [number, number] | null = null;
  try {
    const geomObj = typeof geometry === "string" ? JSON.parse(geometry) : {};
    // Support FeatureCollection or Polygon
    let coords: number[][] = [];
    if (geomObj.type === "FeatureCollection") {
      const feature = geomObj.features[0];
      coords = feature.geometry.coordinates[0];
    } else if (geomObj.type === "Polygon") {
      coords = geomObj.coordinates[0];
    }
    centroid = getPolygonCentroid(coords);
  } catch (e) {
    centroid = null;
  }

  let weather = null;
  if (centroid) {
    // centroid is [lng, lat], Open-Meteo expects lat, lng
    weather = await fetchWeather(centroid[1], centroid[0]);
  }

  ctx.response.body = { id: eventId, name, description, date, location, type, maxParticipants, geometry, imageUrl, quests, weather };
};