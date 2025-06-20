import { randomPoint, bbox, type AllGeoJSON } from "npm:@turf/turf@7.2.0";

export function getPolygonCentroid(polygon: number[][]): [number, number] {
  let area = 0, x = 0, y = 0;
  const points = polygon;
  const n = points.length;
  for (let i = 0; i < n - 1; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    const a = x0 * y1 - x1 * y0;
    area += a;
    x += (x0 + x1) * a;
    y += (y0 + y1) * a;
  }
  area *= 0.5;
  if (area === 0) return points[0] && points[0].length === 2 ? [points[0][0], points[0][1]] : [0, 0];
  x /= 6 * area;
  y /= 6 * area;
  return [x, y];
}

export function generateRandomPointsInPolygon(polygon: AllGeoJSON, count: number): [number, number][] {

  const turfPoly = bbox(polygon);
  const points: [number, number][] = [];
  
  for (let i = 0; i < count; i++) {
    const randomPt = randomPoint(1, { bbox: turfPoly });
    const coords = randomPt.features[0].geometry.coordinates;
    points.push([coords[0], coords[1]]);
  }
  
  return points;
} 