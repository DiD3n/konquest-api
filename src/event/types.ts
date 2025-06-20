export interface GeoJsonPolygon {
  type: 'Polygon';
  coordinates: number[][][];
}

export interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
  type: 'competition' | 'workshop' | 'game';
  maxParticipants: number;
  geometry: GeoJsonPolygon;
}

export type EventType = Event['type']; 