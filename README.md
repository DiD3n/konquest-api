# Kon Quest API

A kinda RESTful API for KonQuest Demo App.

## Features

- **Event Management**: Create and manage fan conventions with location data
- **Quest System**: Interactive quests with multiple types (walk, explore, walk_to)
- **Authentication**: Google OAuth integration with JWT tokens
- **Weather Integration**: Real-time weather data for event locations
- **Geospatial Support**: Polygon-based event areas with coordinate validation
- **Static File Serving**: Serve images and static content

## Tech Stack

- **Runtime**: Deno
- **Framework**: Oak (HTTP server)
- **Database**: SQLite
- **Authentication**: Google OAuth2 + JWT
- **Validation**: Zod
- **Weather**: Open-Meteo API

## Quick Start

### Prerequisites

- [Deno](https://deno.land/) installed
- Google OAuth credentials

### Running
```bash
# Development mode with auto-reload
deno task dev

# Production mode
deno task start
```

### Mock data
```bash
deno task generate-mock-data
```

The server will be running at `http://localhost:8000`